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

  const certifications = data.length > 0 ? data : fallbackCertifications;

  return (
    <section
      id="certifications"
      className="border-t border-border bg-background-primary py-24"
    >
      <div className="container-app">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
            Formación complementaria
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Aprendizaje continuo aplicado al desarrollo de software.
          </h2>

          <p className="mt-6 text-lg leading-8 text-text-secondary">
            Esta sección reúne áreas de aprendizaje técnico y académico que
            fortalecen mi perfil como desarrollador en formación e ingeniero en
            sistemas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {certifications.map((item) => (
            <article key={item.id} className="card">
              <div className="flex items-start justify-between gap-4">
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
                {(Array.isArray(item.topics) ? item.topics : []).map(
                  (topic, index) => (
                    <span
                      key={`${topic}-${index}`}
                      className="rounded-md border border-border bg-background-secondary px-3 py-1 text-xs text-text-secondary"
                    >
                      {topic}
                    </span>
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;