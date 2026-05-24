import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebase";

export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      success: true,
      user: userCredential.user,
      error: null,
    };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    return {
      success: false,
      user: null,
      error: "Credenciales inválidas o usuario no autorizado.",
    };
  }
};

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const logout = async () => {
  try {
    await signOut(auth);

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Error al cerrar sesión:", error);

    return {
      success: false,
      error: "No se pudo cerrar la sesión.",
    };
  }
};