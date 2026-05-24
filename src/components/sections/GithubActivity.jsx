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

  const publicRepos = repositories.filter((repo) => !repo.isPrivate).length;
  const privateRepos = repositories.filter((repo) => repo.isPrivate).length;

  return (
    <section
      id="github"
      className="relative overflow-hidden border-t border-border bg-background-secondary py-24"
    >
      <div className="pointer-events-none absolute left-[-12rem] top-20 h-80 w-80 rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-[-12rem] h-80 w-80 rounded-full bg-accent-purple/10 blur-3xl" />

      <div className="container-app relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-background-primary/70 px-4 py-2 text-xs font-medium text-text-secondary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent-blue" />
              Control de versiones y evidencia técnica
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              GitHub
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Evidencia de práctica y desarrollo en{" "}
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                repositorios.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-text-secondary">
              Mis repositorios y proyectos reflejan el avance práctico en
              desarrollo web, estructuración de proyectos, control de versiones
              y construcción de soluciones aplicadas.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Ver perfil de GitHub
              </a>

              <a href="#projects" className="btn-secondary">
                Ver proyectos
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-border bg-background-primary/70 p-5 shadow-sm backdrop-blur">
              <p className="text-3xl font-bold text-accent-blue">
                {repositories.length}
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Repositorios destacados
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background-primary/70 p-5 shadow-sm backdrop-blur">
              <p className="text-3xl font-bold text-accent-green">
                {publicRepos}
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Públicos
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background-primary/70 p-5 shadow-sm backdrop-blur">
              <p className="text-3xl font-bold text-accent-purple">
                {privateRepos}
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Privados
              </p>
            </article>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {repositories.map((repo) => (
            <article
              key={repo.name}
              className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-background-primary/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/50"
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-accent-blue/10 transition-colors group-hover:bg-accent-blue/20" />

              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <span className="rounded-full border border-border bg-background-secondary px-3 py-1 text-xs font-medium text-text-secondary">
                    Repositorio
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      repo.isPrivate
                        ? "bg-accent-purple/10 text-accent-purple"
                        : "bg-accent-blue/10 text-accent-blue"
                    }`}
                  >
                    {repo.isPrivate ? "Privado" : "Público"}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-text-primary">
                  {repo.name}
                </h3>

                <p className="mt-4 leading-7 text-text-secondary">
                  {repo.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {repo.tech.map((item) => (
                    <span
                      key={`${repo.name}-${item}`}
                      className="rounded-xl border border-border bg-background-secondary px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-accent-blue hover:text-accent-blue"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-8">
                {repo.isPrivate || !repo.url ? (
                  <span className="btn-secondary inline-flex cursor-not-allowed opacity-70">
                    Repositorio privado
                  </span>
                ) : (
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary inline-flex"
                  >
                    Abrir repositorio
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;