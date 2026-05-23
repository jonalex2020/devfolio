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
    <section id="experience" className="border-t border-border bg-background-secondary py-24">
      <div className="container-app">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
            Experiencia
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Experiencia aplicada en contextos reales.
          </h2>

          <p className="mt-6 text-lg leading-8 text-text-secondary">
            La experiencia en entornos organizacionales permite comprender mejor
            las necesidades de los usuarios, los procesos internos y el valor que
            aporta la tecnología al funcionamiento de una institución.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {experiences.map((item) => (
            <article key={item.organization} className="card">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-medium text-accent-blue">
                    {item.type}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-text-primary">
                    {item.role}
                  </h3>

                  <p className="mt-1 text-lg text-text-secondary">
                    {item.organization}
                  </p>

                  <p className="mt-2 text-sm text-text-muted">
                    {item.location} · {item.period}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-background-primary px-4 py-3 text-sm text-text-secondary">
                  Enfoque: procesos reales + tecnología
                </div>
              </div>

              <p className="mt-6 leading-8 text-text-secondary">
                {item.description}
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {item.responsibilities.map((responsibility) => (
                  <div
                    key={responsibility}
                    className="rounded-lg border border-border bg-background-primary p-4 text-sm leading-6 text-text-secondary"
                  >
                    {responsibility}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;