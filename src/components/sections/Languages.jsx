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

  const languages = (data.length > 0 ? data : fallbackLanguages).map(
    (language, index) => ({
      id: language.id || `language-${index}`,
      name: language.name || "Idioma",
      level: language.level || "Nivel no especificado",
      description:
        language.description ||
        "Competencia comunicativa aplicada al entorno académico y profesional.",
    })
  );

  return (
    <section
      id="languages"
      className="relative overflow-hidden border-t border-border bg-background-secondary py-24"
    >
      <div className="pointer-events-none absolute right-[-10rem] top-20 h-80 w-80 rounded-full bg-accent-green/10 blur-3xl" />

      <div className="container-app relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-background-primary/70 px-4 py-2 text-xs font-medium text-text-secondary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent-green" />
              Comunicación profesional
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Idiomas
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Comunicación aplicada al{" "}
              <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
                entorno técnico.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-text-secondary">
              El dominio del idioma español y el aprendizaje del inglés técnico
              fortalecen la comprensión de documentación, herramientas y
              recursos usados en el desarrollo de software.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {languages.map((language) => (
              <article
                key={language.id}
                className="group relative overflow-hidden rounded-3xl border border-border bg-background-primary/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/50"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-accent-blue/10 transition-colors group-hover:bg-accent-blue/20" />

                <div className="relative">
                  <span className="rounded-full bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue">
                    {language.level}
                  </span>

                  <h3 className="mt-5 text-2xl font-bold text-text-primary">
                    {language.name}
                  </h3>

                  <p className="mt-4 leading-7 text-text-secondary">
                    {language.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Languages;