const Education = ({ data = [] }) => {
  const fallbackEducation = [
    {
      id: "ingenieria-sistemas",
      status: "Estudiante de último año",
      title: "Ingeniería en Sistemas",
      institution: "Universidad de Occidente",
      location: "Huehuetenango, Guatemala",
      currentProject: "Proyecto actual: DevFolio",
      description:
        "Formación orientada al análisis, diseño, desarrollo e implementación de soluciones tecnológicas, con énfasis en programación, bases de datos, redes, ingeniería de software y arquitectura de sistemas.",
      areas: [
        "Programación",
        "Bases de datos",
        "Ingeniería de software",
        "Redes",
        "Arquitectura web",
      ],
    },
  ];

  const normalizeAreas = (areas) => {
    if (Array.isArray(areas)) {
      return areas
        .flatMap((area) =>
          String(area)
            .split(/,|;|\n/)
            .map((value) => value.trim())
        )
        .filter(Boolean);
    }

    if (typeof areas === "string") {
      return areas
        .split(/,|;|\n/)
        .map((value) => value.trim())
        .filter(Boolean);
    }

    return [];
  };

  const educationItems = (data.length > 0 ? data : fallbackEducation).map(
    (item, index) => ({
      id: item.id || `education-${index}`,
      status: item.status || "Formación académica",
      title: item.title || "Programa académico",
      institution: item.institution || "Institución educativa",
      location: item.location || "Guatemala",
      currentProject: item.currentProject || "Proyecto académico activo",
      description:
        item.description ||
        "Formación enfocada en el desarrollo de competencias técnicas, análisis de sistemas y resolución de problemas mediante tecnología.",
      areas: normalizeAreas(item.areas),
    })
  );

  return (
    <section
      id="education"
      className="relative overflow-hidden border-t border-border bg-background-primary py-24"
    >
      <div className="pointer-events-none absolute left-[-10rem] top-20 h-80 w-80 rounded-full bg-accent-blue/10 blur-3xl" />

      <div className="container-app relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-background-secondary/70 px-4 py-2 text-xs font-medium text-text-secondary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent-blue" />
              Base académica en sistemas
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Educación
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Formación académica orientada a{" "}
              <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
                soluciones tecnológicas.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-text-secondary">
              Mi formación universitaria fortalece la capacidad de analizar
              problemas, diseñar sistemas y desarrollar soluciones de software
              aplicables a contextos reales.
            </p>
          </div>

          <div className="space-y-6">
            {educationItems.map((item) => (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-3xl border border-border bg-background-secondary/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/50"
              >
                <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-accent-blue/10 transition-colors group-hover:bg-accent-blue/20" />

                <div className="relative">
                  <span className="rounded-full border border-border bg-background-primary px-3 py-1 text-xs font-medium text-accent-blue">
                    {item.status}
                  </span>

                  <h3 className="mt-5 text-3xl font-bold text-text-primary">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-lg font-medium text-text-secondary">
                    {item.institution}
                  </p>

                  <p className="mt-1 text-sm text-text-muted">
                    {item.location}
                  </p>

                  <div className="mt-6 rounded-2xl border border-border bg-background-primary/80 p-4">
                    <p className="text-sm font-medium text-accent-green">
                      {item.currentProject}
                    </p>
                  </div>

                  <p className="mt-6 leading-8 text-text-secondary">
                    {item.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.areas.map((area, index) => (
                      <span
                        key={`${area}-${index}`}
                        className="rounded-xl border border-border bg-background-primary px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent-blue hover:text-accent-blue"
                      >
                        {area}
                      </span>
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

export default Education;