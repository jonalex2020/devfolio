import { createContext, useContext, useEffect, useState } from "react";
import {
  subscribeToAuthChanges,
  logout as authLogout,
} from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [twoFactorVerified, setTwoFactorVerified] = useState(false);

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

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const storedValue = sessionStorage.getItem(`2fa_verified_${user.uid}`);

    if (storedValue === "true") {
      setTwoFactorVerified(true);
    }
  }, [user]);

  const markTwoFactorVerified = () => {
    if (!user) return;

    sessionStorage.setItem(`2fa_verified_${user.uid}`, "true");
    setTwoFactorVerified(true);
  };

  const logout = async () => {
    if (user) {
      sessionStorage.removeItem(`2fa_verified_${user.uid}`);
    }

    await authLogout();

    setUser(null);
    setTwoFactorVerified(false);
  };

  const isFullyAuthenticated = Boolean(user && twoFactorVerified);

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

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider.");
  }

  return context;
};