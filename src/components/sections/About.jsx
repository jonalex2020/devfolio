const About = ({ data }) => {
  const aboutIntro =
    data?.aboutIntro ||
    "Soy Jonalex Mérida, también conocido como Jonny Mérida en GitHub, estudiante de Ingeniería en Sistemas en la Universidad de Occidente, emprendedor y amante de la tecnología. Me interesa transformar ideas en soluciones funcionales mediante buenas prácticas de programación, análisis técnico y una mentalidad orientada a resolver problemas reales.";

  const aboutDescription =
    data?.aboutDescription ||
    "Actualmente desarrollo este portafolio profesional como una plataforma para presentar proyectos, tecnologías, experiencia académica y habilidades relacionadas con el desarrollo de software. Además, cuento con experiencia en un entorno organizacional dentro de Cooperativa Inmaculada Concepción R.L., lo que fortalece mi visión sobre sistemas aplicados a procesos reales.";

  const highlights = [
    {
      title: "Formación académica",
      label: "Universidad",
      description:
        "Estudiante de último año de Ingeniería en Sistemas en la Universidad de Occidente, con enfoque en desarrollo de software, bases de datos y arquitectura web.",
    },
    {
      title: "Perfil técnico",
      label: "Stack",
      description:
        "Experiencia práctica construyendo interfaces modernas con React, integración con Firebase y despliegue de aplicaciones en la nube.",
    },
    {
      title: "Visión profesional",
      label: "Enfoque",
      description:
        "Orientado a crear soluciones escalables, mantenibles y alineadas a necesidades reales del usuario y del negocio.",
    },
  ];

  const metrics = [
    {
      value: "5+",
      label: "Proyectos",
      description: "Aplicaciones académicas y personales",
    },
    {
      value: "10+",
      label: "Tecnologías",
      description: "Frontend, Firebase, Git y despliegue",
    },
    {
      value: "2FA",
      label: "Seguridad",
      description: "Panel administrativo protegido",
    },
    {
      value: "CI/CD",
      label: "Deploy",
      description: "Integración GitHub + Vercel",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-border bg-background-secondary py-24"
    >
      <div className="pointer-events-none absolute left-[-12rem] top-20 h-72 w-72 rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-[-10rem] h-72 w-72 rounded-full bg-accent-purple/10 blur-3xl" />

      <div className="container-app relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-background-primary/70 px-4 py-2 text-xs font-medium text-text-secondary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent-blue" />
              Perfil académico y profesional
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Sobre mí
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Construyendo mi camino como{" "}
              <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
                ingeniero de software.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-text-secondary">
              {aboutIntro}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {metrics.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-2xl border border-border bg-background-primary/70 p-5 shadow-sm backdrop-blur transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="text-3xl font-bold text-accent-blue">
                    {metric.value}
                  </p>
                  <h3 className="mt-2 font-semibold text-text-primary">
                    {metric.label}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-text-secondary">
                    {metric.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-background-primary/70 p-6 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-green">
                Resumen profesional
              </p>

              <p className="mt-4 leading-8 text-text-secondary">
                {aboutDescription}
              </p>
            </div>

            <div className="grid gap-4">
              {highlights.map((item) => (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-background-primary/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/50"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-accent-blue/10 transition-colors group-hover:bg-accent-blue/20" />

                  <div className="relative">
                    <span className="rounded-full border border-border bg-background-secondary px-3 py-1 text-xs font-medium text-accent-blue">
                      {item.label}
                    </span>

                    <h3 className="mt-4 text-xl font-semibold text-text-primary">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;