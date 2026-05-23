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

  const educationItems = data.length > 0 ? data : fallbackEducation;

  return (
    <section
      id="education"
      className="border-t border-border bg-background-primary py-24"
    >
      <div className="container-app">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
            Educación
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Formación académica orientada a soluciones tecnológicas.
          </h2>

          <p className="mt-6 text-lg leading-8 text-text-secondary">
            Mi formación universitaria fortalece la capacidad de analizar
            problemas, diseñar sistemas y desarrollar soluciones de software
            aplicables a contextos reales.
          </p>
        </div>

        <div className="mt-12 grid gap-6">
          {educationItems.map((item) => (
            <article key={item.id} className="card">
              <p className="text-sm font-medium text-accent-blue">
                {item.status}
              </p>

              <h3 className="mt-3 text-2xl font-bold text-text-primary">
                {item.title}
              </h3>

              <p className="mt-1 text-lg text-text-secondary">
                {item.institution}
              </p>

              <p className="mt-2 text-sm text-text-muted">{item.location}</p>

              <div className="mt-6 rounded-lg border border-border bg-background-primary p-4">
                <p className="text-sm text-text-secondary">
                  {item.currentProject}
                </p>
              </div>

              <p className="mt-6 leading-7 text-text-secondary">
                {item.description}
              </p>

         <div className="mt-6 flex flex-wrap gap-3">
  {(Array.isArray(item.areas) ? item.areas : []).map((area, index) => (
    <span
      key={`${area}-${index}`}
      className="inline-flex items-center rounded-full border border-border bg-background-primary px-4 py-2 text-sm leading-none text-text-secondary"
    >
      {area}
    </span>
  ))}
</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;