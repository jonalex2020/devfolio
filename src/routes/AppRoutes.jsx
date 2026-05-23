// =====================================================================
// AppRoutes.jsx — Configuración central de rutas
// =====================================================================
// Define todas las rutas de la aplicación en un solo lugar.
// Separación entre rutas públicas y privadas.
//
// Defensa académica: centralizar el ruteo facilita el mantenimiento,
// la auditoría de qué rutas existen y la implementación de funcionalidad
// transversal (analytics, logging) en un único punto.
//
// Nota: este archivo importa componentes que se crearán en los bloques
// siguientes. Mientras esos componentes no existan, comenta sus líneas
// o usa placeholders simples para que el proyecto compile.
// =====================================================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

// Páginas públicas (se implementan en Bloque 2)
import LandingPage from '../pages/public/LandingPage';

// Páginas administrativas (se implementan en Bloques 3 y 4)
import LoginPage from '../pages/admin/LoginPage';
import TwoFactorPage from '../pages/admin/TwoFactorPage';
import DashboardPage from '../pages/admin/DashboardPage';
import ProjectsPage from '../pages/admin/ProjectsPage';
import ProjectFormPage from '../pages/admin/ProjectFormPage';

/**
 * Componente principal de rutas. Debe envolverse en AuthProvider
 * (en main.jsx) para que las rutas privadas funcionen.
 */
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============================================================
            RUTAS PÚBLICAS
            Accesibles sin autenticación. La landing page muestra el
            contenido público del portafolio.
        ============================================================ */}
        <Route path="/" element={<LandingPage />} />

        {/* ============================================================
            RUTAS DE AUTENTICACIÓN
            Login y 2FA son públicas en cuanto a acceso URL, pero
            redirigen al dashboard si el usuario ya está autenticado.
        ============================================================ */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/verify-2fa" element={<TwoFactorPage />} />

        {/* ============================================================
            RUTAS PRIVADAS — ADMIN
            Cada ruta privada se envuelve en <PrivateRoute> para
            verificar autenticación + 2FA antes de renderizar.
        ============================================================ */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <PrivateRoute>
              <ProjectsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/projects/new"
          element={
            <PrivateRoute>
              <ProjectFormPage mode="create" />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/projects/edit/:id"
          element={
            <PrivateRoute>
              <ProjectFormPage mode="edit" />
            </PrivateRoute>
          }
        />

        {/* ============================================================
            RUTAS DE GESTIÓN DE OTRAS COLECCIONES
            (Se irán agregando conforme se implementen los CRUDs)
        ============================================================ */}
        {/* <Route path="/admin/technologies" element={<PrivateRoute><TechnologiesPage /></PrivateRoute>} /> */}
        {/* <Route path="/admin/experiences" element={<PrivateRoute><ExperiencesPage /></PrivateRoute>} /> */}
        {/* <Route path="/admin/education" element={<PrivateRoute><EducationPage /></PrivateRoute>} /> */}

        {/* ============================================================
            CATCH-ALL: redirección a la landing para rutas no definidas
        ============================================================ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
