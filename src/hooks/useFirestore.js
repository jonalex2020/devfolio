// =====================================================================
// useFirestore.js — Custom hook para operaciones con Firestore
// =====================================================================
// Encapsula la lógica de carga de datos desde Firestore con manejo
// automático de estados (loading, error, data) para evitar repetir
// este patrón en cada componente.
//
// Defensa académica: los custom hooks son el mecanismo idiomático de
// React para reutilizar lógica con estado entre componentes (Hooks Rules
// y Composition API, introducido en React 16.8).
// =====================================================================

import { useState, useEffect, useCallback } from 'react';
import {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../services/firestore.service';

/**
 * Hook para consultar y manejar colecciones de Firestore.
 *
 * @param {string} collectionName - Nombre de la colección
 * @param {object} options - Opciones de consulta (filtros, orden, límite)
 * @param {boolean} autoFetch - Si carga automáticamente al montar
 *
 * @returns {{
 *   data: Array,
 *   loading: boolean,
 *   error: string|null,
 *   refresh: () => Promise<void>,
 *   create: (data) => Promise<object>,
 *   update: (id, data) => Promise<object>,
 *   remove: (id) => Promise<object>,
 * }}
 */
export const useCollection = (collectionName, options = {}, autoFetch = true) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  // useCallback evita recrear la función en cada render, lo que importa
  // si esta función va al array de dependencias de un useEffect.
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await getDocuments(collectionName, options);

    if (result.success) {
      setData(result.data);
    } else {
      setError(result.error);
      setData([]);
    }

    setLoading(false);
  }, [collectionName, JSON.stringify(options)]);

  // Carga automática al montar si autoFetch es true
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  // Operaciones CRUD que actualizan el estado local tras cada acción
  // para evitar tener que recargar todo desde el servidor.
  const create = useCallback(
    async (newData) => {
      const result = await createDocument(collectionName, newData);
      if (result.success) {
        await fetchData(); // refrescamos la lista
      }
      return result;
    },
    [collectionName, fetchData]
  );

  const update = useCallback(
    async (id, updates) => {
      const result = await updateDocument(collectionName, id, updates);
      if (result.success) {
        await fetchData();
      }
      return result;
    },
    [collectionName, fetchData]
  );

  const remove = useCallback(
    async (id) => {
      const result = await deleteDocument(collectionName, id);
      if (result.success) {
        // Actualizamos localmente sin re-fetch para UX más rápida
        setData((prev) => prev.filter((item) => item.id !== id));
      }
      return result;
    },
    [collectionName]
  );

  return {
    data,
    loading,
    error,
    refresh: fetchData,
    create,
    update,
    remove,
  };
};

/**
 * Hook para consultar un único documento por ID.
 *
 * @param {string} collectionName
 * @param {string} docId
 */
export const useDocument = (collectionName, docId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!docId) {
      setLoading(false);
      return;
    }

    const fetchDoc = async () => {
      setLoading(true);
      const result = await getDocumentById(collectionName, docId);

      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error);
        setData(null);
      }

      setLoading(false);
    };

    fetchDoc();
  }, [collectionName, docId]);

  return { data, loading, error };
};
