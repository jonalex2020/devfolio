import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Hero from "../../components/sections/Hero";
import About from "../../components/sections/About";
import Education from "../../components/sections/Education";
import Experience from "../../components/sections/Experience";
import SoftSkills from "../../components/sections/SoftSkills";
import Languages from "../../components/sections/Languages";
import Certifications from "../../components/sections/Certifications";
import Technologies from "../../components/sections/Technologies";
import Projects from "../../components/sections/Projects";
import GithubActivity from "../../components/sections/GithubActivity";
import Contact from "../../components/sections/Contact";

import {
  getCertifications,
  getEducation,
  getExperience,
  getLanguages,
  getProjects,
  getSiteConfig,
  getSoftSkills,
  getTechnologies,
} from "../../services/firestore.service";

const LandingPage = () => {
  const [siteConfig, setSiteConfig] = useState(null);
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [
        siteConfigData,
        projectsData,
        technologiesData,
        educationData,
        experienceData,
        softSkillsData,
        languagesData,
        certificationsData,
      ] = await Promise.all([
        getSiteConfig(),
        getProjects(),
        getTechnologies(),
        getEducation(),
        getExperience(),
        getSoftSkills(),
        getLanguages(),
        getCertifications(),
      ]);

      setSiteConfig(siteConfigData);
      setProjects(projectsData);
      setTechnologies(technologiesData);
      setEducation(educationData);
      setExperience(experienceData);
      setSoftSkills(softSkillsData);
      setLanguages(languagesData);
      setCertifications(certificationsData);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Navbar />

      <main>
        <Hero data={siteConfig} />
        <About data={siteConfig} />
        <Education data={education} />
        <Experience data={experience} />
        <SoftSkills data={softSkills} />
        <Languages data={languages} />
        <Certifications data={certifications} />
        <Technologies data={technologies} />
        <Projects data={projects} />
        <GithubActivity />
        <Contact data={siteConfig} />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;