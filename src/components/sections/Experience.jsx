const Experience = () => {
  const experiences = [
    {
      organization: "Cooperativa Inmaculada Concepción R.L.",
      role: "Experiencia en entorno organizacional",
      location: "Huehuetenango, Guatemala",
      period: "Experiencia actual",
      type: "Sector cooperativo",
      description:
        "Participación en un entorno organizacional real, fortaleciendo la comprensión de procesos administrativos, operación institucional y necesidades tecnológicas aplicadas a usuarios y áreas de trabajo.",
      responsibilities: [
        "Comprensión de procesos internos en una organización real.",
        "Identificación de oportunidades de mejora mediante soluciones tecnológicas.",
        "Aplicación de pensamiento analítico para resolver necesidades operativas.",
        "Fortalecimiento de habilidades de comunicación, responsabilidad y trabajo en equipo.",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="relative overflow-hidden border-t border-border bg-background-secondary py-24"
    >
      <div className="pointer-events-none absolute bottom-10 right-[-10rem] h-80 w-80 rounded-full bg-accent-purple/10 blur-3xl" />

      <div className="container-app relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-background-primary/70 px-4 py-2 text-xs font-medium text-text-secondary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent-green" />
              Experiencia aplicada
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Experiencia
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Experiencia aplicada en{" "}
              <span className="bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
                contextos reales.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-text-secondary">
              La experiencia en entornos organizacionales permite comprender
              mejor las necesidades de los usuarios, los procesos internos y el
              valor que aporta la tecnología al funcionamiento de una
              institución.
            </p>
          </div>

          <div className="space-y-6">
            {experiences.map((item) => (
              <article
                key={item.organization}
                className="group relative overflow-hidden rounded-3xl border border-border bg-background-primary/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/50"
              >
                <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-accent-green/10 transition-colors group-hover:bg-accent-green/20" />

                <div className="relative">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <span className="rounded-full border border-border bg-background-secondary px-3 py-1 text-xs font-medium text-accent-blue">
                        {item.type}
                      </span>

                      <h3 className="mt-5 text-3xl font-bold text-text-primary">
                        {item.role}
                      </h3>

                      <p className="mt-2 text-lg font-medium text-text-secondary">
                        {item.organization}
                      </p>

                      <p className="mt-1 text-sm text-text-muted">
                        {item.location} · {item.period}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background-secondary px-4 py-3 text-sm font-medium text-text-secondary">
                      Procesos reales + tecnología
                    </div>
                  </div>

                  <p className="mt-6 leading-8 text-text-secondary">
                    {item.description}
                  </p>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {item.responsibilities.map((responsibility) => (
                      <div
                        key={responsibility}
                        className="rounded-2xl border border-border bg-background-secondary/80 p-4 text-sm leading-6 text-text-secondary"
                      >
                        {responsibility}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;