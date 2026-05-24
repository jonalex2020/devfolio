const Certifications = ({ data = [] }) => {
  const fallbackCertifications = [
    {
      id: "react-frontend",
      title: "Desarrollo Frontend con React",
      issuer: "Formación práctica",
      status: "Aplicado en proyectos",
      description:
        "Construcción de interfaces web modernas mediante componentes, props, estado, rutas y organización modular del frontend.",
      topics: ["React", "Vite", "Componentes", "SPA"],
    },
    {
      id: "firebase-serverless",
      title: "Firebase y Backend Serverless",
      issuer: "Autoformación técnica",
      status: "En desarrollo",
      description:
        "Uso de Firebase Authentication y Firestore para autenticación, almacenamiento de datos y administración de contenido.",
      topics: ["Firebase", "Auth", "Firestore", "Serverless"],
    },
    {
      id: "git-github",
      title: "Control de versiones con Git y GitHub",
      issuer: "Práctica profesional",
      status: "Aplicado en repositorios",
      description:
        "Gestión de código fuente mediante commits, repositorios remotos y flujo básico de colaboración para proyectos web.",
      topics: ["Git", "GitHub", "Commits", "Repositorios"],
    },
    {
      id: "ingenieria-software",
      title: "Ingeniería de Software",
      issuer: "Formación universitaria",
      status: "Base académica",
      description:
        "Aplicación de análisis de requerimientos, documentación técnica, modelado UML, arquitectura y planificación de proyectos.",
      topics: ["RUP", "UML", "Requerimientos", "Arquitectura"],
    },
  ];

  const normalizeTopics = (topics) => {
    if (Array.isArray(topics)) {
      return topics
        .flatMap((topic) =>
          String(topic)
            .split(/,|;|\n/)
            .map((value) => value.trim())
        )
        .filter(Boolean);
    }

    if (typeof topics === "string") {
      return topics
        .split(/,|;|\n/)
        .map((value) => value.trim())
        .filter(Boolean);
    }

    return [];
  };

  const certifications = (data.length > 0 ? data : fallbackCertifications).map(
    (item, index) => ({
      id: item.id || `certification-${index}`,
      title: item.title || "Formación técnica",
      issuer: item.issuer || "Aprendizaje continuo",
      status: item.status || "En desarrollo",
      description:
        item.description ||
        "Área de formación complementaria aplicada al desarrollo de software.",
      topics: normalizeTopics(item.topics),
    })
  );

  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-border bg-background-primary py-24"
    >
      <div className="pointer-events-none absolute left-[-12rem] top-16 h-80 w-80 rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-12rem] bottom-16 h-80 w-80 rounded-full bg-accent-purple/10 blur-3xl" />

      <div className="container-app relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-background-secondary/70 px-4 py-2 text-xs font-medium text-text-secondary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent-blue" />
              Aprendizaje continuo
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Formación complementaria
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Aprendizaje continuo aplicado al{" "}
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                desarrollo de software.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-text-secondary">
              Esta sección reúne áreas de aprendizaje técnico y académico que
              fortalecen mi perfil como desarrollador en formación e ingeniero
              en sistemas.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-background-secondary/80 p-6 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-green">
              Ruta de formación
            </p>

            <p className="mt-4 leading-8 text-text-secondary">
              Combino formación universitaria, autoaprendizaje técnico y
              práctica aplicada para fortalecer mi perfil profesional.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {certifications.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-3xl border border-border bg-background-secondary/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/50"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-accent-blue/10 transition-colors group-hover:bg-accent-blue/20" />

              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-accent-blue">
                      {item.issuer}
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-text-primary">
                      {item.title}
                    </h3>
                  </div>

                  <span className="rounded-full bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue">
                    {item.status}
                  </span>
                </div>

                <p className="mt-4 leading-7 text-text-secondary">
                  {item.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.topics.length > 0 ? (
                    item.topics.map((topic, index) => (
                      <span
                        key={`${topic}-${index}`}
                        className="rounded-xl border border-border bg-background-primary px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-accent-blue hover:text-accent-blue"
                      >
                        {topic}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-xl border border-border bg-background-primary px-3 py-2 text-xs text-text-muted">
                      Sin temas registrados
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;