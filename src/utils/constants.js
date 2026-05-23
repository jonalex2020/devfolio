// =====================================================================
// constants.js — Constantes globales de la aplicación
// =====================================================================
// Centraliza valores constantes para evitar "magic numbers/strings"
// dispersos en el código. Facilita el mantenimiento y la documentación.
// =====================================================================

// Nombre y branding del sistema
export const APP_NAME = 'DevFolio';
export const APP_DESCRIPTION = 'Portafolio profesional de desarrollador';
export const APP_VERSION = '1.0.0';

// Sesión y seguridad
export const SESSION_INACTIVITY_TIMEOUT_MIN = 30;
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOGIN_LOCKOUT_MIN = 15;

// Categorías predefinidas
export const PROJECT_CATEGORIES = [
  { value: 'web', label: 'Aplicación Web' },
  { value: 'mobile', label: 'Aplicación Móvil' },
  { value: 'desktop', label: 'Aplicación de Escritorio' },
  { value: 'api', label: 'API / Backend' },
  { value: 'library', label: 'Librería / Paquete' },
  { value: 'other', label: 'Otro' },
];

export const PROJECT_STATUSES = [
  { value: 'active', label: 'Activo', color: 'accent-green' },
  { value: 'in-progress', label: 'En desarrollo', color: 'accent-amber' },
  { value: 'paused', label: 'Pausado', color: 'text-muted' },
  { value: 'archived', label: 'Archivado', color: 'text-secondary' },
];

export const METHODOLOGIES = [
  { value: 'scrum', label: 'Scrum' },
  { value: 'kanban', label: 'Kanban' },
  { value: 'waterfall', label: 'Cascada' },
  { value: 'xp', label: 'Extreme Programming' },
  { value: 'lean', label: 'Lean' },
  { value: 'rad', label: 'RAD' },
  { value: 'other', label: 'Otro' },
];

export const TECH_CATEGORIES = [
  { value: 'language', label: 'Lenguaje de programación' },
  { value: 'framework', label: 'Framework / Librería' },
  { value: 'database', label: 'Base de datos' },
  { value: 'tool', label: 'Herramienta' },
  { value: 'platform', label: 'Plataforma / Cloud' },
  { value: 'other', label: 'Otro' },
];

export const LANGUAGE_LEVELS = [
  { value: 'native', label: 'Nativo' },
  { value: 'fluent', label: 'Avanzado / Fluido' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'basic', label: 'Básico' },
  { value: 'beginner', label: 'Principiante' },
];

// Configuración de UI
export const ITEMS_PER_PAGE = 10;
export const DEBOUNCE_DELAY_MS = 300;

// Mensajes de toast estándar
export const TOAST_MESSAGES = {
  CREATED: 'Registro creado correctamente.',
  UPDATED: 'Cambios guardados.',
  DELETED: 'Registro eliminado.',
  ERROR_GENERIC: 'Ocurrió un error. Intenta de nuevo.',
  ERROR_NETWORK: 'Error de red. Verifica tu conexión.',
  ERROR_PERMISSION: 'No tienes permisos para esta acción.',
};

// Rutas de la aplicación (centralizadas para evitar typos)
export const ROUTES = {
  HOME: '/',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_2FA: '/admin/verify-2fa',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PROJECTS: '/admin/projects',
  ADMIN_PROJECT_NEW: '/admin/projects/new',
  ADMIN_PROJECT_EDIT: (id) => `/admin/projects/edit/${id}`,
  ADMIN_TECHNOLOGIES: '/admin/technologies',
  ADMIN_EXPERIENCES: '/admin/experiences',
  ADMIN_EDUCATION: '/admin/education',
  ADMIN_CERTIFICATIONS: '/admin/certifications',
  ADMIN_LANGUAGES: '/admin/languages',
  ADMIN_SOFT_SKILLS: '/admin/soft-skills',
  ADMIN_SITE_CONFIG: '/admin/settings',
};
