// =====================================================================
// validators.js — Funciones de validación reutilizables
// =====================================================================
// Centraliza la lógica de validación de inputs para que sea consistente
// en toda la aplicación. Cada validador retorna null si es válido o
// un mensaje de error si no lo es.
//
// Defensa académica: centralizar validaciones aplica el principio DRY
// y facilita auditorías de seguridad. Las validaciones se ejecutan
// tanto en el frontend (UX) como en Firestore Rules (seguridad real).
// La validación cliente NUNCA debe ser la única; siempre debe haber
// validación servidor.
// =====================================================================

/**
 * Valida que un campo no esté vacío.
 */
export const required = (value, fieldName = 'Este campo') => {
  if (value === null || value === undefined) return `${fieldName} es requerido.`;
  if (typeof value === 'string' && value.trim() === '') {
    return `${fieldName} es requerido.`;
  }
  if (Array.isArray(value) && value.length === 0) {
    return `${fieldName} debe tener al menos un elemento.`;
  }
  return null;
};

/**
 * Valida formato de email usando expresión regular conforme a RFC 5322.
 */
export const email = (value) => {
  if (!value) return null; // Permitimos vacío, combinar con required si es obligatorio
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Ingresa un correo electrónico válido.';
  }
  return null;
};

/**
 * Valida formato de URL.
 */
export const url = (value) => {
  if (!value) return null;
  try {
    new URL(value);
    return null;
  } catch {
    return 'Ingresa una URL válida (con http:// o https://).';
  }
};

/**
 * Valida longitud mínima de una cadena.
 */
export const minLength = (min) => (value, fieldName = 'Este campo') => {
  if (!value) return null;
  if (value.length < min) {
    return `${fieldName} debe tener al menos ${min} caracteres.`;
  }
  return null;
};

/**
 * Valida longitud máxima de una cadena.
 */
export const maxLength = (max) => (value, fieldName = 'Este campo') => {
  if (!value) return null;
  if (value.length > max) {
    return `${fieldName} no puede tener más de ${max} caracteres.`;
  }
  return null;
};

/**
 * Valida que el valor sea numérico.
 */
export const numeric = (value) => {
  if (value === null || value === undefined || value === '') return null;
  if (isNaN(Number(value))) {
    return 'Debe ser un número válido.';
  }
  return null;
};

/**
 * Valida que el valor esté dentro de un rango numérico.
 */
export const range = (min, max) => (value) => {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  if (num < min || num > max) {
    return `Debe estar entre ${min} y ${max}.`;
  }
  return null;
};

/**
 * Valida que una fecha sea posterior a otra.
 */
export const dateAfter = (otherDate, otherDateName = 'la fecha de inicio') => (value) => {
  if (!value || !otherDate) return null;
  if (new Date(value) <= new Date(otherDate)) {
    return `Debe ser posterior a ${otherDateName}.`;
  }
  return null;
};

/**
 * Valida que el archivo no exceda un tamaño máximo (en MB).
 */
export const maxFileSize = (maxMB) => (file) => {
  if (!file) return null;
  const maxBytes = maxMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return `El archivo no puede pesar más de ${maxMB} MB.`;
  }
  return null;
};

/**
 * Valida que el archivo tenga una extensión permitida.
 */
export const fileType = (allowedTypes) => (file) => {
  if (!file) return null;
  const ext = file.name.split('.').pop().toLowerCase();
  if (!allowedTypes.includes(ext)) {
    return `Solo se permiten archivos: ${allowedTypes.join(', ')}.`;
  }
  return null;
};

/**
 * Valida que el OTP tenga exactamente 6 dígitos numéricos.
 */
export const otp = (value) => {
  if (!value) return 'Ingresa el código.';
  if (!/^\d{6}$/.test(value)) {
    return 'El código debe tener 6 dígitos numéricos.';
  }
  return null;
};

/**
 * Combina múltiples validadores. Devuelve el primer error encontrado.
 *
 * Ejemplo:
 *   const error = combine(required, email)(value);
 */
export const combine = (...validators) => (value, fieldName) => {
  for (const validator of validators) {
    const error = validator(value, fieldName);
    if (error) return error;
  }
  return null;
};

/**
 * Genera un slug URL-friendly a partir de un string.
 * Ej: "Mi Proyecto Genial!" → "mi-proyecto-genial"
 */
export const generateSlug = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')                    // Separa caracteres con acentos
    .replace(/[\u0300-\u036f]/g, '')     // Elimina marcas diacríticas
    .replace(/[^a-z0-9\s-]/g, '')        // Solo alfanuméricos, espacios y guiones
    .trim()
    .replace(/\s+/g, '-')                // Espacios → guiones
    .replace(/-+/g, '-');                // Múltiples guiones → uno solo
};

/**
 * Sanitiza HTML para prevenir XSS al renderizar texto del usuario.
 * Nota: React ya escapa por defecto al usar {value}, pero si usás
 * dangerouslySetInnerHTML, debés sanitizar primero.
 */
export const sanitizeHTML = (str) => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
