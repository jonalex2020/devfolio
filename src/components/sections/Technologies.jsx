const Technologies = ({ data = [] }) => {
  const fallbackCategories = [
    {
      id: "frontend",
      title: "Frontend",
      label: "Interfaz",
      description:
        "Tecnologías utilizadas para construir interfaces modernas, responsivas y basadas en componentes.",
      items: ["React", "Vite", "TailwindCSS"],
    },
    {
      id: "backend",
      title: "Backend / Serverless",
      label: "Nube",
      description:
        "Servicios utilizados para autenticación, base de datos y administración de información en la nube.",
      items: ["Firebase Auth", "Cloud Firestore", "Firebase Hosting"],
    },
    {
      id: "tools",
      title: "Herramientas",
      label: "DevOps",
      description:
        "Herramientas de desarrollo, control de versiones y despliegue utilizadas durante el proyecto.",
      items: ["Git", "GitHub", "VS Code", "Vercel"],
    },
  ];

  const normalizeItems = (items) => {
    if (Array.isArray(items)) {
      return items
        .flatMap((item) =>
          String(item)
            .split(/,|;|\n/)
            .map((value) => value.trim())
        )
        .filter(Boolean);
    }

    if (typeof items === "string") {
      return items
        .split(/,|;|\n/)
        .map((value) => value.trim())
        .filter(Boolean);
    }

    return [];
  };

  const getCategoryLabel = (category) => {
    const value = `${category.id || ""} ${category.title || ""}`.toLowerCase();

    if (value.includes("frontend")) return "Interfaz";
    if (value.includes("backend") || value.includes("serverless")) return "Nube";
    if (value.includes("tool") || value.includes("herramient")) return "DevOps";

    return "Stack";
  };

  const normalizeCategories = (categoriesData) => {
    return categoriesData.map((category, index) => ({
      id: category.id || `technology-category-${index}`,
      title: category.title || "Categoría técnica",
      label: category.label || getCategoryLabel(category),
      description:
        category.description ||
        "Tecnologías aplicadas en el desarrollo del proyecto.",
      items: normalizeItems(category.items),
    }));
  };

  const categories =
    data.length > 0
      ? normalizeCategories(data)
      : normalizeCategories(fallbackCategories);

  const categoryOrder = {
    frontend: 1,
    Frontend: 1,
    backend: 2,
    "Backend / Serverless": 2,
    tools: 3,
    Herramientas: 3,
  };

  const sortedCategories = [...categories].sort((a, b) => {
    const orderA = categoryOrder[a.id] || categoryOrder[a.title] || 99;
    const orderB = categoryOrder[b.id] || categoryOrder[b.title] || 99;

    return orderA - orderB;
  });

  const featuredStack = [
    {
      name: "React",
      description: "Componentes reutilizables",
    },
    {
      name: "Firebase",
      description: "Auth y Firestore",
    },
    {
      name: "Vercel",
      description: "Deploy automático",
    },
    {
      name: "GitHub",
      description: "Repositorio y CI/CD",
    },
  ];

  return (
    <section
      id="technologies"
      className="relative overflow-hidden border-t border-border bg-background-primary py-24"
    >
      <div className="pointer-events-none absolute left-[-10rem] top-24 h-80 w-80 rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] bottom-20 h-80 w-80 rounded-full bg-accent-green/10 blur-3xl" />

      <div className="container-app relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-background-secondary/70 px-4 py-2 text-xs font-medium text-text-secondary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent-green" />
              Stack aplicado en producción
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Tecnologías
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Stack técnico utilizado en el{" "}
              <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
                desarrollo del proyecto.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-text-secondary">
              Estas tecnologías permiten construir una aplicación moderna,
              modular, escalable y preparada para despliegue en la nube.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredStack.map((item) => (
              <article
                key={item.name}
                className="rounded-2xl border border-border bg-background-secondary/80 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/50"
              >
                <p className="text-2xl font-bold text-accent-blue">
                  {item.name}
                </p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {sortedCategories.map((category) => (
            <article
              key={category.id}
              className="group relative overflow-hidden rounded-3xl border border-border bg-background-secondary/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/50"
            >
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-accent-blue/10 transition-colors group-hover:bg-accent-blue/20" />

              <div className="relative flex h-full flex-col">
                <span className="w-fit rounded-full border border-border bg-background-primary px-3 py-1 text-xs font-medium text-accent-blue">
                  {category.label}
                </span>

                <h3 className="mt-5 text-2xl font-bold text-text-primary">
                  {category.title}
                </h3>

                <p className="mt-3 leading-7 text-text-secondary">
                  {category.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {category.items.length > 0 ? (
                    category.items.map((item) => (
                      <span
                        key={`${category.id}-${item}`}
                        className="rounded-xl border border-border bg-background-primary px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent-blue hover:text-accent-blue"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-xl border border-border bg-background-primary px-3 py-2 text-sm text-text-muted">
                      Sin tecnologías registradas
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

export default Technologies;