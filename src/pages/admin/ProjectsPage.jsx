import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProject, getProjects } from "../../services/firestore.service";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadProjects = async () => {
    setIsLoading(true);
    setErrorMessage("");

    const projectsData = await getProjects();

    setProjects(projectsData);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (projectId, projectTitle) => {
    const confirmDelete = window.confirm(
      `¿Seguro que deseas eliminar el proyecto "${projectTitle}"?`
    );

    if (!confirmDelete) return;

    const response = await deleteProject(projectId);

    if (!response.success) {
      setErrorMessage(response.error);
      return;
    }

    await loadProjects();
  };

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
                Gestión de proyectos
              </h1>

              <p className="mt-3 text-text-secondary">
                Administra los proyectos visibles en el portafolio público.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/admin/dashboard" className="btn-secondary">
                Volver al dashboard
              </Link>

              <Link to="/admin/projects/new" className="btn-primary">
                Nuevo proyecto
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-app py-10">
        {errorMessage && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm text-red-300">{errorMessage}</p>
          </div>
        )}

        {isLoading ? (
          <div className="card">
            <p className="text-text-secondary">Cargando proyectos...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="card">
            <h2 className="text-2xl font-bold">No hay proyectos registrados</h2>
            <p className="mt-3 text-text-secondary">
              Crea tu primer proyecto desde el panel administrativo.
            </p>

            <Link to="/admin/projects/new" className="btn-primary mt-6 inline-flex">
              Crear proyecto
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <article
                key={project.id}
                className="card flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold">
                      {project.title || "Sin título"}
                    </h2>

                    <span className="rounded-full bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue">
                      {project.status || "Sin estado"}
                    </span>

                    {project.isPrivate && (
                      <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">
                        Privado
                      </span>
                    )}
                  </div>

                  <p className="mt-3 max-w-3xl leading-7 text-text-secondary">
                    {project.description || "Sin descripción"}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(Array.isArray(project.techStack)
                      ? project.techStack
                      : []
                    ).map((tech, index) => (
                      <span
                        key={`${tech}-${index}`}
                        className="rounded-md border border-border bg-background-primary px-3 py-1 text-xs text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 text-sm text-text-muted">
                    <p>Orden: {project.order ?? "Sin orden"}</p>
                    <p>Tipo: {project.type || "Sin tipo"}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/admin/projects/edit/${project.id}`}
                    className="btn-secondary"
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(project.id, project.title)}
                    className="rounded-lg border border-red-500/40 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10"
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ProjectsPage;