// =====================================================================
// AppRoutes.jsx — Configuración central de rutas
// =====================================================================
// Define todas las rutas de la aplicación en un solo lugar.
// Separación entre rutas públicas y privadas.
//
// Defensa académica: centralizar el ruteo facilita el mantenimiento,
// la auditoría de qué rutas existen y la implementación de funcionalidad
// transversal en un único punto.
// =====================================================================

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Páginas públicas
import LandingPage from "../pages/public/LandingPage";
import PresentationPage from "../pages/public/PresentationPage";

// Páginas administrativas
import LoginPage from "../pages/admin/LoginPage";
import TwoFactorPage from "../pages/admin/TwoFactorPage";
import DashboardPage from "../pages/admin/DashboardPage";
import ProjectsPage from "../pages/admin/ProjectsPage";
import ProjectFormPage from "../pages/admin/ProjectFormPage";
import GenericCrudPage from "../pages/admin/GenericCrudPage";
import SiteConfigPage from "../pages/admin/SiteConfigPage";

/**
 * Componente principal de rutas.
 * Debe envolverse en AuthProvider en main.jsx.
 */
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============================================================
            RUTAS PÚBLICAS
        ============================================================ */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/presentacion" element={<PresentationPage />} />

        {/* ============================================================
            RUTAS DE AUTENTICACIÓN
        ============================================================ */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/verify-2fa" element={<TwoFactorPage />} />

        {/* ============================================================
            RUTAS PRIVADAS — DASHBOARD
        ============================================================ */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* ============================================================
            CRUD ESPECÍFICO DE PROYECTOS
        ============================================================ */}
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
            CONFIGURACIÓN DEL SITIO
        ============================================================ */}
        <Route
          path="/admin/site-config"
          element={
            <PrivateRoute>
              <SiteConfigPage />
            </PrivateRoute>
          }
        />

        {/* ============================================================
            CRUD GENÉRICO PARA COLECCIONES
        ============================================================ */}
        <Route
          path="/admin/:moduleId"
          element={
            <PrivateRoute>
              <GenericCrudPage />
            </PrivateRoute>
          }
        />

        {/* ============================================================
            CATCH-ALL
        ============================================================ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;