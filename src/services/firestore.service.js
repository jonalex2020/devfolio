import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Obtiene todos los documentos de una colección.
 * Si existe el campo order, ordena por ese valor.
 */
const getCollectionData = async (collectionName, errorMessage) => {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    return querySnapshot.docs
      .map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }))
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.error(errorMessage, error);
    return [];
  }
};

/**
 * Configuración principal del sitio.
 * Usa documento fijo: siteConfig/main
 */
export const getSiteConfig = async () => {
  try {
    const docRef = doc(db, "siteConfig", "main");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    console.error("Error al obtener siteConfig:", error);
    return null;
  }
};

/**
 * Actualiza o crea la configuración principal del sitio.
 * setDoc con merge permite crear o actualizar sin borrar campos existentes.
 */
export const updateSiteConfig = async (configData) => {
  try {
    const configRef = doc(db, "siteConfig", "main");

    await setDoc(
      configRef,
      {
        ...configData,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Error al actualizar siteConfig:", error);

    return {
      success: false,
      error: "No se pudo actualizar la configuración del sitio.",
    };
  }
};

/* =====================================================================
   CRUD ESPECÍFICO PARA PROYECTOS
   Se mantiene porque ya está funcionando correctamente.
===================================================================== */

export const deleteProject = async (projectId) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    await deleteDoc(projectRef);

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Error al eliminar proyecto:", error);

    return {
      success: false,
      error: "No se pudo eliminar el proyecto.",
    };
  }
};

export const getProjectById = async (projectId) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
      return null;
    }

    return {
      id: projectSnap.id,
      ...projectSnap.data(),
    };
  } catch (error) {
    console.error("Error al obtener proyecto:", error);
    return null;
  }
};

export const createProject = async (projectData) => {
  try {
    const projectsRef = collection(db, "projects");

    const docRef = await addDoc(projectsRef, {
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return {
      success: true,
      id: docRef.id,
      error: null,
    };
  } catch (error) {
    console.error("Error al crear proyecto:", error);

    return {
      success: false,
      id: null,
      error: "No se pudo crear el proyecto.",
    };
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const projectRef = doc(db, "projects", projectId);

    await updateDoc(projectRef, {
      ...projectData,
      updatedAt: new Date().toISOString(),
    });

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Error al actualizar proyecto:", error);

    return {
      success: false,
      error: "No se pudo actualizar el proyecto.",
    };
  }
};

/* =====================================================================
   CRUD GENÉRICO PARA CUALQUIER COLECCIÓN SIMPLE
   Se usará para technologies, education, experience, languages,
   softSkills y certifications.
===================================================================== */

export const getCollectionItems = async (collectionName) => {
  return getCollectionData(
    collectionName,
    `Error al obtener colección ${collectionName}:`
  );
};

export const getCollectionItemById = async (collectionName, itemId) => {
  try {
    const itemRef = doc(db, collectionName, itemId);
    const itemSnap = await getDoc(itemRef);

    if (!itemSnap.exists()) {
      return null;
    }

    return {
      id: itemSnap.id,
      ...itemSnap.data(),
    };
  } catch (error) {
    console.error(
      `Error al obtener documento ${itemId} de ${collectionName}:`,
      error
    );

    return null;
  }
};

export const createCollectionItem = async (collectionName, itemData) => {
  try {
    const collectionRef = collection(db, collectionName);

    const docRef = await addDoc(collectionRef, {
      ...itemData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return {
      success: true,
      id: docRef.id,
      error: null,
    };
  } catch (error) {
    console.error(`Error al crear documento en ${collectionName}:`, error);

    return {
      success: false,
      id: null,
      error: "No se pudo crear el registro.",
    };
  }
};

export const updateCollectionItem = async (
  collectionName,
  itemId,
  itemData
) => {
  try {
    const itemRef = doc(db, collectionName, itemId);

    await updateDoc(itemRef, {
      ...itemData,
      updatedAt: new Date().toISOString(),
    });

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(
      `Error al actualizar documento ${itemId} en ${collectionName}:`,
      error
    );

    return {
      success: false,
      error: "No se pudo actualizar el registro.",
    };
  }
};

export const deleteCollectionItem = async (collectionName, itemId) => {
  try {
    const itemRef = doc(db, collectionName, itemId);
    await deleteDoc(itemRef);

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(
      `Error al eliminar documento ${itemId} en ${collectionName}:`,
      error
    );

    return {
      success: false,
      error: "No se pudo eliminar el registro.",
    };
  }
};

/* =====================================================================
   FUNCIONES DE LECTURA PARA LANDING PÚBLICA
   Se mantienen para no romper los componentes públicos existentes.
===================================================================== */

export const getProjects = async () =>
  getCollectionData("projects", "Error al obtener proyectos:");

export const getTechnologies = async () =>
  getCollectionData("technologies", "Error al obtener tecnologías:");

export const getEducation = async () =>
  getCollectionData("education", "Error al obtener educación:");

export const getExperience = async () =>
  getCollectionData("experience", "Error al obtener experiencia:");

export const getSoftSkills = async () =>
  getCollectionData("softSkills", "Error al obtener habilidades blandas:");

export const getLanguages = async () =>
  getCollectionData("languages", "Error al obtener idiomas:");

export const getCertifications = async () =>
  getCollectionData("certifications", "Error al obtener certificaciones:");