const Technologies = ({ data = [] }) => {
  const fallbackCategories = [
    {
      id: "frontend",
      title: "Frontend",
      description:
        "Tecnologías utilizadas para construir interfaces modernas, responsivas y basadas en componentes.",
      items: ["React", "Vite", "TailwindCSS"],
    },
    {
      id: "backend",
      title: "Backend / Serverless",
      description:
        "Servicios utilizados para autenticación, base de datos y administración de información en la nube.",
      items: ["Firebase Auth", "Cloud Firestore", "Firebase Hosting"],
    },
    {
      id: "tools",
      title: "Herramientas",
      description:
        "Herramientas de desarrollo, control de versiones y despliegue utilizadas durante el proyecto.",
      items: ["Git", "GitHub", "VS Code", "Vercel"],
    },
  ];

  const categories = data.length > 0 ? data : fallbackCategories;

  return (
    <section
      id="technologies"
      className="border-t border-border bg-background-primary py-24"
    >
      <div className="container-app">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
            Tecnologías
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Stack técnico utilizado en el proyecto.
          </h2>

          <p className="mt-6 text-lg leading-8 text-text-secondary">
            Estas tecnologías permiten construir una aplicación moderna,
            modular, escalable y preparada para despliegue en la nube.
          </p>
        </div>

        <div className="mt-12 grid gap-6">
          {categories.map((category) => (
            <article key={category.id} className="card">
              <h3 className="text-2xl font-bold text-accent-blue">
                {category.title}
              </h3>

              <p className="mt-3 leading-7 text-text-secondary">
                {category.description}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {(Array.isArray(category.items) ? category.items : []).map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-border bg-background-primary p-4"
                    >
                      <p className="font-semibold text-text-primary">{item}</p>
                    </div>
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

export default Technologies;