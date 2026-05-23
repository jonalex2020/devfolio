const Languages = ({ data = [] }) => {
  const fallbackLanguages = [
    {
      id: "espanol",
      name: "Español",
      level: "Nativo",
      description:
        "Comunicación oral y escrita para entornos académicos, profesionales y organizacionales.",
    },
    {
      id: "ingles-tecnico",
      name: "Inglés técnico",
      level: "En desarrollo",
      description:
        "Lectura de documentación técnica, mensajes de error, guías de instalación y recursos de programación.",
    },
  ];

  const languages = data.length > 0 ? data : fallbackLanguages;

  return (
    <section
      id="languages"
      className="border-t border-border bg-background-secondary py-24"
    >
      <div className="container-app">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
            Idiomas
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Comunicación aplicada al entorno técnico.
          </h2>

          <p className="mt-6 text-lg leading-8 text-text-secondary">
            El dominio del idioma español y el aprendizaje del inglés técnico
            fortalecen la comprensión de documentación, herramientas y recursos
            usados en el desarrollo de software.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {languages.map((language) => (
            <article key={language.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">
                    {language.name}
                  </h3>

                  <p className="mt-2 leading-7 text-text-secondary">
                    {language.description}
                  </p>
                </div>

                <span className="rounded-full bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue">
                  {language.level}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;