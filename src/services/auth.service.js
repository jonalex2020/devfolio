// =====================================================================
// auth.service.js — Capa de servicio para autenticación
// =====================================================================
// Encapsula toda la lógica de autenticación: login con email/password,
// generación y verificación de OTP para 2FA, y cierre de sesión.
//
// Principio aplicado: Service Layer Pattern — separamos la lógica de
// negocio de los componentes de UI, permitiendo testeo y reutilización.
//
// Nota didáctica: el 2FA real por correo requiere un backend (Cloud
// Function) para enviar emails. En esta versión implementamos la lógica
// del OTP del lado cliente con persistencia en Firestore. Para
// producción real, el envío de email debe hacerse desde un servidor.
// =====================================================================

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from './firebase';

// Email del único administrador autorizado (cargado desde .env).
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

// Configuración del OTP
const OTP_CONFIG = {
  LENGTH: 6,                  // Longitud del código numérico
  EXPIRATION_MINUTES: 5,      // Tiempo de vida del OTP
  MAX_ATTEMPTS: 3,            // Intentos antes de bloqueo
  LOCKOUT_MINUTES: 15,        // Tiempo de bloqueo tras exceder intentos
};

// =====================================================================
// LOGIN — Primer factor: email + contraseña
// =====================================================================
/**
 * Realiza el primer paso del login: valida email y contraseña contra
 * Firebase Authentication.
 *
 * @param {string} email - Correo del usuario
 * @param {string} password - Contraseña en texto plano
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export const loginWithEmailPassword = async (email, password) => {
  try {
    // Validación adicional: solo permitimos el email del admin
    // configurado en .env. Defensa en profundidad ante posibles
    // registros no autorizados directos en Firebase.
    if (email !== ADMIN_EMAIL) {
      return {
        success: false,
        error: 'Esta cuenta no tiene permisos administrativos.',
      };
    }

    const credential = await signInWithEmailAndPassword(auth, email, password);

    return {
      success: true,
      user: {
        uid: credential.user.uid,
        email: credential.user.email,
        emailVerified: credential.user.emailVerified,
      },
    };
  } catch (error) {
    // Traducimos los códigos de error de Firebase a mensajes amigables.
    const errorMessages = {
      'auth/invalid-credential': 'Correo o contraseña incorrectos.',
      'auth/user-not-found': 'No existe una cuenta con este correo.',
      'auth/wrong-password': 'Contraseña incorrecta.',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
      'auth/network-request-failed': 'Error de red. Verifica tu conexión.',
    };

    return {
      success: false,
      error: errorMessages[error.code] || 'Error al iniciar sesión.',
    };
  }
};

// =====================================================================
// OTP — Segundo factor: código de verificación
// =====================================================================
/**
 * Genera un OTP numérico aleatorio criptográficamente seguro.
 * Usamos crypto.getRandomValues en lugar de Math.random porque éste
 * último NO es seguro para usos criptográficos.
 *
 * @returns {string} Código OTP de 6 dígitos
 */
const generateOTP = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const code = (array[0] % 1000000).toString().padStart(OTP_CONFIG.LENGTH, '0');
  return code;
};

/**
 * Hashea el OTP antes de almacenarlo. Aún si la BD se viera
 * comprometida, los códigos no estarían en texto plano.
 *
 * @param {string} otp - El código a hashear
 * @returns {Promise<string>} Hash hexadecimal del OTP
 */
const hashOTP = async (otp) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(otp);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Genera un OTP, lo guarda hasheado en Firestore con expiración, y
 * (en producción) lo enviaría por correo electrónico vía Cloud Function.
 *
 * En esta versión académica, el OTP se muestra en consola para que el
 * estudiante pueda probarlo localmente. En producción, esto NUNCA debe
 * exponerse al cliente; el envío real debe hacerse desde el backend.
 *
 * @param {string} uid - UID del usuario autenticado en el primer paso
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const generateAndSendOTP = async (uid) => {
  try {
    const otp = generateOTP();
    const hashedOTP = await hashOTP(otp);

    const expiresAt = Timestamp.fromMillis(
      Date.now() + OTP_CONFIG.EXPIRATION_MINUTES * 60 * 1000
    );

    // Guardamos el OTP hasheado en Firestore (colección 'otpCodes').
    await setDoc(doc(db, 'otpCodes', uid), {
      hashedOTP,
      expiresAt,
      attempts: 0,
      createdAt: serverTimestamp(),
    });

    // ⚠️ SOLO PARA DESARROLLO: mostramos el OTP en consola.
    // En producción, esto se enviaría por email vía Cloud Function.
    if (import.meta.env.DEV) {
      console.log(
        `%c[DEV] OTP generado: ${otp}`,
        'background:#3B82F6;color:white;padding:4px 8px;border-radius:4px;font-weight:bold'
      );
      console.log(`Este código expira en ${OTP_CONFIG.EXPIRATION_MINUTES} minutos.`);
    }

    // TODO en producción: llamar a Cloud Function que envíe email con OTP
    // await httpsCallable(functions, 'sendOTPEmail')({ email, otp });

    return { success: true };
  } catch (error) {
    console.error('[Auth] Error al generar OTP:', error);
    return {
      success: false,
      error: 'No se pudo generar el código de verificación.',
    };
  }
};

/**
 * Verifica un OTP ingresado por el usuario contra el almacenado.
 * Incrementa el contador de intentos en caso de fallo, y aplica
 * bloqueo si se exceden los intentos máximos.
 *
 * @param {string} uid - UID del usuario
 * @param {string} otpInput - Código ingresado por el usuario
 * @returns {Promise<{success: boolean, error?: string, attemptsLeft?: number}>}
 */
export const verifyOTP = async (uid, otpInput) => {
  try {
    const otpDocRef = doc(db, 'otpCodes', uid);
    const otpDoc = await getDoc(otpDocRef);

    if (!otpDoc.exists()) {
      return {
        success: false,
        error: 'No hay un código activo. Solicita uno nuevo.',
      };
    }

    const otpData = otpDoc.data();

    // Verificación de expiración
    if (otpData.expiresAt.toMillis() < Date.now()) {
      await deleteDoc(otpDocRef);
      return {
        success: false,
        error: 'El código ha expirado. Solicita uno nuevo.',
      };
    }

    // Verificación de intentos máximos
    if (otpData.attempts >= OTP_CONFIG.MAX_ATTEMPTS) {
      return {
        success: false,
        error: `Has excedido los ${OTP_CONFIG.MAX_ATTEMPTS} intentos. Cuenta bloqueada temporalmente.`,
        locked: true,
      };
    }

    // Comparación segura usando hash
    const hashedInput = await hashOTP(otpInput);

    if (hashedInput !== otpData.hashedOTP) {
      // Incrementamos intentos fallidos
      await setDoc(otpDocRef, {
        ...otpData,
        attempts: otpData.attempts + 1,
      });

      const attemptsLeft = OTP_CONFIG.MAX_ATTEMPTS - (otpData.attempts + 1);

      return {
        success: false,
        error: 'Código incorrecto.',
        attemptsLeft,
      };
    }

    // Éxito: eliminamos el OTP (uso único garantizado)
    await deleteDoc(otpDocRef);

    return { success: true };
  } catch (error) {
    console.error('[Auth] Error al verificar OTP:', error);
    return {
      success: false,
      error: 'Error al verificar el código.',
    };
  }
};

// =====================================================================
// LOGOUT y gestión de sesión
// =====================================================================
/**
 * Cierra la sesión del usuario actual.
 */
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('[Auth] Error al cerrar sesión:', error);
    return { success: false, error: 'Error al cerrar sesión.' };
  }
};

/**
 * Suscribe a cambios de estado de autenticación.
 * Útil para sincronizar el estado del usuario en toda la app.
 *
 * @param {(user: object|null) => void} callback
 * @returns {() => void} Función para desuscribirse
 */
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Envía un correo de recuperación de contraseña.
 *
 * @param {string} email
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'No se pudo enviar el correo de recuperación.',
    };
  }
};

// Exportamos también la configuración por si la UI necesita leer valores
// como MAX_ATTEMPTS o EXPIRATION_MINUTES para mostrarlos al usuario.
export { OTP_CONFIG };
