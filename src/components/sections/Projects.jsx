const Projects = ({ data = [] }) => {
  const projects = data;

  return (
    <section id="projects" className="border-t border-border bg-background-secondary py-24">
      <div className="container-app">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
            Proyectos
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Proyectos destacados y soluciones desarrolladas.
          </h2>

          <p className="mt-6 text-lg leading-8 text-text-secondary">
            Estos proyectos reflejan mi avance como desarrollador, aplicando
            análisis, programación, estructura modular, control de versiones y
            construcción de soluciones orientadas a necesidades reales.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="card flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
            >
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">
                    {project.type}
                  </span>

                  <span className="rounded-full bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue">
                    {project.status}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-text-primary">
                  {project.title}
                </h3>

                <p className="mt-4 leading-7 text-text-secondary">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techStack?.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-background-primary px-3 py-1 text-xs text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                {project.isPrivate ? (
                  <span className="btn-secondary cursor-not-allowed opacity-70">
                    Proyecto privado
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
      </div>
    </section>
  );
};

export default Projects;