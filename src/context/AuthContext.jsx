// =====================================================================
// AuthContext.jsx — Contexto global de autenticación
// =====================================================================
// Provee el estado de autenticación (usuario actual, si está logueado,
// si pasó el 2FA, etc.) a toda la aplicación mediante Context API.
//
// Principio aplicado: Single Source of Truth — el estado de auth vive
// en un único lugar, evitando inconsistencias entre componentes.
//
// Defensa académica: el uso de Context API es preferible a prop-drilling
// (pasar props a través de múltiples niveles) y es la solución
// recomendada por React para estado global de baja-mediana complejidad.
// Para estados más complejos se recomendaría Redux o Zustand.
// =====================================================================

import { createContext, useContext, useState, useEffect } from 'react';
import {
  subscribeToAuthChanges,
  logout as authLogout,
} from '../services/auth.service';

// Creamos el contexto con un valor por defecto.
const AuthContext = createContext(null);

/**
 * Proveedor de autenticación. Debe envolver el árbol de componentes
 * en App.jsx o main.jsx.
 */
export const AuthProvider = ({ children }) => {
  // Estado del usuario actualmente autenticado en Firebase
  const [user, setUser] = useState(null);

  // Flag de carga inicial mientras Firebase verifica el estado
  const [loading, setLoading] = useState(true);

  // Flag específico del 2FA: indica si pasó la verificación del segundo
  // factor. Aunque Firebase diga que el usuario está autenticado, no
  // consideramos la sesión válida hasta que pase el 2FA.
  const [twoFactorVerified, setTwoFactorVerified] = useState(false);

  // Suscripción al cambio de estado de auth de Firebase
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          emailVerified: firebaseUser.emailVerified,
        });
      } else {
        setUser(null);
        setTwoFactorVerified(false);
      }
      setLoading(false);
    });

    // Limpieza: cuando el componente se desmonta, cancelamos la suscripción
    // para evitar memory leaks.
    return () => unsubscribe();
  }, []);

  // Recuperamos el estado de 2FA desde sessionStorage al recargar la
  // página, para que el usuario no tenga que verificar OTP en cada
  // refresco mientras la pestaña esté abierta.
  useEffect(() => {
    if (user) {
      const stored = sessionStorage.getItem(`2fa_verified_${user.uid}`);
      if (stored === 'true') {
        setTwoFactorVerified(true);
      }
    }
  }, [user]);

  /**
   * Marca el 2FA como verificado. Se llama desde TwoFactorPage tras
   * validar el OTP correctamente.
   */
  const markTwoFactorVerified = () => {
    if (user) {
      sessionStorage.setItem(`2fa_verified_${user.uid}`, 'true');
      setTwoFactorVerified(true);
    }
  };

  /**
   * Cierra la sesión y limpia el estado de 2FA.
   */
  const logout = async () => {
    if (user) {
      sessionStorage.removeItem(`2fa_verified_${user.uid}`);
    }
    await authLogout();
    setUser(null);
    setTwoFactorVerified(false);
  };

  /**
   * Calcula si el usuario tiene una sesión "completa" (auth + 2FA).
   * Esta es la propiedad que las rutas protegidas deben verificar.
   */
  const isFullyAuthenticated = Boolean(user && twoFactorVerified);

  // Valor que se expone a los consumidores del contexto
  const value = {
    user,
    loading,
    twoFactorVerified,
    isFullyAuthenticated,
    markTwoFactorVerified,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook para consumir el contexto de auth desde cualquier
 * componente. Throws si se usa fuera del AuthProvider.
 *
 * Uso:
 *   const { user, isFullyAuthenticated, logout } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      'useAuth debe usarse dentro de un AuthProvider. ' +
      'Asegúrate de envolver tu app con <AuthProvider>.'
    );
  }

  return context;
};
