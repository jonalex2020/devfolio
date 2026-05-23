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

  const skills =
    Array.isArray(data) && data.length > 0 ? data : fallbackSkills;

  return (
    <section
      id="soft-skills"
      className="border-t border-border bg-background-primary py-24"
    >
      <div className="container-app">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
            Habilidades blandas
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Competencias personales para trabajar en proyectos reales.
          </h2>

          <p className="mt-6 text-lg leading-8 text-text-secondary">
            Además de las habilidades técnicas, considero importantes las
            competencias humanas que permiten colaborar, aprender y aportar
            valor dentro de equipos de desarrollo y organizaciones.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((item, index) => {
            const title =
              item.title ||
              item.name ||
              item.label ||
              item.skill ||
              "Sin título";

            const description =
              item.description ||
              item.text ||
              item.summary ||
              item.desc ||
              "Sin descripción";

            return (
              <article key={item.id || index} className="card min-h-[170px]">
                <h3 className="text-2xl font-bold text-text-primary">
                  {title}
                </h3>

                <p className="mt-4 leading-8 text-text-secondary">
                  {description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SoftSkills;