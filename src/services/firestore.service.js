import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

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