const GithubActivity = () => {
  const githubUser = "jonalex2020";
  const githubUrl = `https://github.com/${githubUser}`;

  const repositories = [
    {
      name: "tpv-minimarket",
      description:
        "Proyecto orientado a punto de venta para minimarket, enfocado en gestión comercial y operaciones básicas.",
      url: "",
      isPrivate: true,
      tech: ["Frontend", "Gestión", "Web"],
    },
    {
      name: "sistema-citas",
      description:
        "Sistema para gestión de citas, aplicando conceptos de organización de datos, usuarios y flujo de atención.",
      url: "",
      isPrivate: true,
      tech: ["Sistema web", "CRUD", "Gestión"],
    },
    {
      name: "breadflis",
      description:
        "Aplicación web trabajada con estructura modular, componentes y funcionalidades orientadas a contenido.",
      url: "https://github.com/SJ4cques/breadflis",
      isPrivate: false,
      tech: ["React", "Componentes", "Frontend"],
    },
    {
      name: "gestionhabitos-frontend",
      description:
        "Frontend para aplicación de gestión de hábitos, enfocado en interfaz, experiencia de usuario y consumo de datos.",
      url: `${githubUrl}/gestionhabitos-frontend`,
      isPrivate: false,
      tech: ["Frontend", "React", "UX"],
    },
  ];

  return (
    <section id="github" className="border-t border-border bg-background-secondary py-24">
      <div className="container-app">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
            GitHub
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Evidencia de práctica y desarrollo en repositorios.
          </h2>

          <p className="mt-6 text-lg leading-8 text-text-secondary">
            Mis repositorios y proyectos reflejan el avance práctico en
            desarrollo web, estructuración de proyectos, control de versiones y
            construcción de soluciones aplicadas.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Ver perfil de GitHub
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {repositories.map((repo) => (
            <article
              key={repo.name}
              className="card transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-text-primary">
                  {repo.name}
                </h3>

                <span className="rounded-full bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue">
                  {repo.isPrivate ? "Privado" : "Repo"}
                </span>
              </div>

              <p className="mt-4 leading-7 text-text-secondary">
                {repo.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {repo.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border bg-background-primary px-3 py-1 text-xs text-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {repo.isPrivate ? (
                <span className="mt-6 inline-flex text-sm font-medium text-text-muted">
                  Repositorio privado
                </span>
              ) : (
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex text-sm font-medium text-accent-blue hover:underline"
                >
                  Abrir repositorio →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;