// =====================================================================
// PrivateRoute.jsx — Componente para proteger rutas administrativas
// =====================================================================
// Verifica que el usuario esté autenticado Y haya pasado el 2FA antes
// de permitir el acceso a rutas administrativas. Si no, redirige al
// login o a la verificación 2FA según el caso.
//
// Defensa académica: este es un Higher-Order Component (HOC) que
// implementa el patrón "Route Guard" presente en frameworks modernos.
// Aplica el principio de "fail-secure": ante cualquier duda sobre la
// validez de la sesión, se niega el acceso.
//
// Capa de defensa: aunque las reglas de Firestore ya bloquean escrituras
// no autenticadas (defensa en el backend), proteger las rutas en el
// frontend mejora la UX y aplica defensa en profundidad.
// =====================================================================

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Envoltorio que protege rutas privadas.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Componente a renderizar si pasa la validación
 * @param {boolean} props.requireTwoFactor - Si requiere 2FA además de auth básico (default: true)
 */
const PrivateRoute = ({ children, requireTwoFactor = true }) => {
  const { user, loading, twoFactorVerified } = useAuth();
  const location = useLocation();

  // Mientras Firebase verifica el estado de auth, mostramos un loader
  // para evitar redirecciones prematuras (parpadeo de UI).
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-primary">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-text-secondary text-sm">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario autenticado, redirigimos al login
  // y guardamos la ruta que intentaba acceder para volver tras el login.
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Si el usuario está autenticado pero no completó 2FA, lo redirigimos
  // a la pantalla de verificación.
  if (requireTwoFactor && !twoFactorVerified) {
    return <Navigate to="/admin/verify-2fa" state={{ from: location }} replace />;
  }

  // Si pasa todas las validaciones, renderizamos el contenido protegido.
  return children;
};

export default PrivateRoute;
