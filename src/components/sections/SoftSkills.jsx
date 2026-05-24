const SoftSkills = ({ data = [] }) => {
  const fallbackSkills = [
    {
      id: "adaptabilidad",
      title: "Adaptabilidad",
      description:
        "Capacidad para ajustarme a nuevos entornos, herramientas y necesidades del proyecto.",
    },
    {
      id: "trabajo-equipo",
      title: "Trabajo en equipo",
      description:
        "Disposición para colaborar, comunicar ideas y aportar de forma positiva dentro de un equipo.",
    },
    {
      id: "responsabilidad",
      title: "Responsabilidad",
      description:
        "Compromiso con el cumplimiento de tareas, tiempos y objetivos establecidos.",
    },
    {
      id: "aprendizaje-autodidacta",
      title: "Aprendizaje autodidacta",
      description:
        "Capacidad para investigar, practicar y adquirir nuevos conocimientos técnicos de forma constante.",
    },
    {
      id: "resolucion-problemas",
      title: "Resolución de problemas",
      description:
        "Enfoque analítico para identificar errores, buscar soluciones y mejorar procesos.",
    },
    {
      id: "comunicacion",
      title: "Comunicación",
      description:
        "Habilidad para expresar ideas con claridad y mantener una interacción efectiva en contextos académicos y profesionales.",
    },
  ];

  const skills = (Array.isArray(data) && data.length > 0
    ? data
    : fallbackSkills
  ).map((item, index) => ({
    id: item.id || `soft-skill-${index}`,
    title: item.title || item.name || item.label || item.skill || "Sin título",
    description:
      item.description ||
      item.text ||
      item.summary ||
      item.desc ||
      "Sin descripción",
  }));

  return (
    <section
      id="soft-skills"
      className="relative overflow-hidden border-t border-border bg-background-primary py-24"
    >
      <div className="pointer-events-none absolute left-[-10rem] bottom-20 h-80 w-80 rounded-full bg-accent-green/10 blur-3xl" />

      <div className="container-app relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-background-secondary/70 px-4 py-2 text-xs font-medium text-text-secondary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent-green" />
              Competencias humanas
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Habilidades blandas
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Competencias personales para trabajar en{" "}
              <span className="bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
                proyectos reales.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-text-secondary">
              Además de las habilidades técnicas, considero importantes las
              competencias humanas que permiten colaborar, aprender y aportar
              valor dentro de equipos de desarrollo y organizaciones.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-background-secondary/80 p-6 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-green">
              Perfil colaborativo
            </p>

            <p className="mt-4 leading-8 text-text-secondary">
              La ingeniería de software no depende únicamente del código:
              también requiere comunicación, análisis, disciplina y capacidad
              de adaptación.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((item) => (
            <article
              key={item.id}
              className="group relative min-h-[210px] overflow-hidden rounded-3xl border border-border bg-background-secondary/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/50"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-accent-green/10 transition-colors group-hover:bg-accent-green/20" />

              <div className="relative">
                <span className="rounded-full border border-border bg-background-primary px-3 py-1 text-xs font-medium text-accent-blue">
                  Competencia
                </span>

                <h3 className="mt-5 text-2xl font-bold text-text-primary">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-text-secondary">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftSkills;