import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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