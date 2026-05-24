import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createProject,
  getProjectById,
  updateProject,
} from "../../services/firestore.service";

const ProjectFormPage = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = mode === "edit";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    status: "",
    repoUrl: "",
    techStack: "",
    isPrivate: false,
  });

  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      if (!isEditMode || !id) return;

      setIsLoading(true);

      const project = await getProjectById(id);

      if (!project) {
        setErrorMessage("No se encontró el proyecto solicitado.");
        setIsLoading(false);
        return;
      }

      setFormData({
        title: project.title || "",
        description: project.description || "",
        type: project.type || "",
        status: project.status || "",
        repoUrl: project.repoUrl || "",
        techStack: Array.isArray(project.techStack)
          ? project.techStack.join(", ")
          : "",
        isPrivate: Boolean(project.isPrivate),
      });

      setIsLoading(false);
    };

    loadProject();
  }, [id, isEditMode]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const normalizeProjectData = () => {
    return {
      title: formData.title.trim(),
      description: formData.description.trim(),
      type: formData.type.trim(),
      status: formData.status.trim(),
      repoUrl: formData.repoUrl.trim(),
      techStack: formData.techStack
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      isPrivate: formData.isPrivate,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setIsSaving(true);

    const projectData = normalizeProjectData();

    const response = isEditMode
      ? await updateProject(id, projectData)
      : await createProject(projectData);

    setIsSaving(false);

    if (!response.success) {
      setErrorMessage(response.error);
      return;
    }

    navigate("/admin/projects");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background-primary text-text-primary">
        <section className="container-app py-10">
          <div className="card">
            <p className="text-text-secondary">Cargando proyecto...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background-primary text-text-primary">
      <section className="border-b border-border bg-background-secondary">
        <div className="container-app py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
                Admin
              </p>

              <h1 className="text-4xl font-bold tracking-tight">
                {isEditMode ? "Editar proyecto" : "Nuevo proyecto"}
              </h1>

              <p className="mt-3 text-text-secondary">
                {isEditMode
                  ? "Actualiza la información del proyecto seleccionado."
                  : "Registra un nuevo proyecto para mostrarlo en el portafolio."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/admin/projects" className="btn-secondary">
                Volver a proyectos
              </Link>

              <Link to="/admin/dashboard" className="btn-secondary">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-app py-10">
        <form onSubmit={handleSubmit} className="card max-w-3xl space-y-6">
          {errorMessage && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm text-red-300">{errorMessage}</p>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Título del proyecto
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-border bg-background-primary px-4 py-3 text-text-primary outline-none focus:border-accent-blue"
              placeholder="Ejemplo: Sistema de citas"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full rounded-lg border border-border bg-background-primary px-4 py-3 text-text-primary outline-none focus:border-accent-blue"
              placeholder="Describe el objetivo, alcance y funcionalidad del proyecto."
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary">
                Tipo
              </label>
              <input
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background-primary px-4 py-3 text-text-primary outline-none focus:border-accent-blue"
                placeholder="Aplicación web"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary">
                Estado
              </label>
              <input
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background-primary px-4 py-3 text-text-primary outline-none focus:border-accent-blue"
                placeholder="Frontend funcional"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              URL del repositorio
            </label>
            <input
              name="repoUrl"
              value={formData.repoUrl}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background-primary px-4 py-3 text-text-primary outline-none focus:border-accent-blue"
              placeholder="https://github.com/usuario/repositorio"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Tecnologías
            </label>
            <input
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-background-primary px-4 py-3 text-text-primary outline-none focus:border-accent-blue"
              placeholder="React, Firebase, TailwindCSS"
            />
            <p className="mt-2 text-xs text-text-muted">
              Separa cada tecnología con coma.
            </p>
          </div>

          <label className="flex items-center gap-3 rounded-lg border border-border bg-background-primary p-4">
            <input
              type="checkbox"
              name="isPrivate"
              checked={formData.isPrivate}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm text-text-secondary">
              Marcar como proyecto privado
            </span>
          </label>

          <div className="flex flex-wrap gap-3 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving
                ? "Guardando..."
                : isEditMode
                ? "Guardar cambios"
                : "Crear proyecto"}
            </button>

            <Link to="/admin/projects" className="btn-secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ProjectFormPage;