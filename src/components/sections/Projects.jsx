const Projects = ({ data = [] }) => {
  const normalizeTechStack = (techStack) => {
    if (Array.isArray(techStack)) {
      return techStack
        .flatMap((tech) =>
          String(tech)
            .split(/,|;|\n/)
            .map((value) => value.trim())
        )
        .filter(Boolean);
    }

    if (typeof techStack === "string") {
      return techStack
        .split(/,|;|\n/)
        .map((value) => value.trim())
        .filter(Boolean);
    }

    return [];
  };

  const projects = data.map((project, index) => ({
    id: project.id || `project-${index}`,
    title: project.title || "Proyecto sin título",
    description:
      project.description ||
      "Proyecto desarrollado como parte del proceso de formación académica y técnica.",
    type: project.type || "Proyecto web",
    status: project.status || "En desarrollo",
    repoUrl: project.repoUrl || "",
    isPrivate: Boolean(project.isPrivate),
    techStack: normalizeTechStack(project.techStack),
  }));

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-border bg-background-secondary py-24"
    >
      <div className="pointer-events-none absolute left-[-12rem] top-20 h-80 w-80 rounded-full bg-accent-purple/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-[-12rem] h-80 w-80 rounded-full bg-accent-blue/10 blur-3xl" />

      <div className="container-app relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-background-primary/70 px-4 py-2 text-xs font-medium text-text-secondary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent-blue" />
              Portafolio conectado a Firestore
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Proyectos
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Proyectos destacados y{" "}
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                soluciones desarrolladas.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-text-secondary">
              Estos proyectos reflejan mi avance como desarrollador, aplicando
              análisis, programación, estructura modular, control de versiones y
              construcción de soluciones orientadas a necesidades reales.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-border bg-background-primary/70 p-5 shadow-sm backdrop-blur">
              <p className="text-3xl font-bold text-accent-blue">
                {projects.length}
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Proyectos registrados
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background-primary/70 p-5 shadow-sm backdrop-blur">
              <p className="text-3xl font-bold text-accent-green">CRUD</p>
              <p className="mt-2 text-sm text-text-secondary">
                Administración activa
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background-primary/70 p-5 shadow-sm backdrop-blur">
              <p className="text-3xl font-bold text-accent-purple">CI/CD</p>
              <p className="mt-2 text-sm text-text-secondary">
                GitHub + Vercel
              </p>
            </article>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-border bg-background-primary/70 p-8 text-center shadow-sm">
            <p className="text-lg font-semibold text-text-primary">
              Aún no hay proyectos registrados.
            </p>
            <p className="mt-2 text-text-secondary">
              Los proyectos aparecerán aquí cuando se agreguen desde el panel
              administrativo.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-background-primary/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/50"
              >
                <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-accent-blue/10 transition-colors group-hover:bg-accent-blue/20" />

                <div className="relative">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <span className="rounded-full border border-border bg-background-secondary px-3 py-1 text-xs font-medium text-text-secondary">
                      {project.type}
                    </span>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue">
                        {project.status}
                      </span>

                      {project.isPrivate && (
                        <span className="rounded-full bg-accent-purple/10 px-3 py-1 text-xs font-medium text-accent-purple">
                          Privado
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-text-primary md:text-3xl">
                    {project.title}
                  </h3>

                  <p className="mt-4 leading-7 text-text-secondary">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.length > 0 ? (
                      project.techStack.map((tech) => (
                        <span
                          key={`${project.id}-${tech}`}
                          className="rounded-xl border border-border bg-background-secondary px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-accent-blue hover:text-accent-blue"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-xl border border-border bg-background-secondary px-3 py-2 text-xs text-text-muted">
                        Stack no especificado
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative mt-8 flex flex-wrap gap-3">
                  {project.isPrivate || !project.repoUrl ? (
                    <span className="btn-secondary cursor-not-allowed opacity-70">
                      {project.isPrivate
                        ? "Proyecto privado"
                        : "Repositorio no disponible"}
                    </span>
                  ) : (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary"
                    >
                      Ver repositorio
                    </a>
                  )}

                  <a href="#contact" className="btn-secondary">
                    Consultar
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;