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
      description:
        "Estudiante de último año de Ingeniería en Sistemas en la Universidad de Occidente, con enfoque en desarrollo de software, bases de datos y arquitectura web.",
    },
    {
      title: "Perfil técnico",
      description:
        "Experiencia práctica construyendo interfaces modernas con React, integración con Firebase y despliegue de aplicaciones en la nube.",
    },
    {
      title: "Visión profesional",
      description:
        "Orientado a crear soluciones escalables, mantenibles y alineadas a necesidades reales del usuario y del negocio.",
    },
  ];

  return (
    <section
      id="about"
      className="border-t border-border bg-background-secondary py-24"
    >
      <div className="container-app">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Sobre mí
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Construyendo mi camino como ingeniero de software.
            </h2>

            <p className="mt-6 text-lg leading-8 text-text-secondary">
              {aboutIntro}
            </p>
          </div>

          <div className="space-y-5">
            <p className="leading-8 text-text-secondary">
              {aboutDescription}
            </p>

            <div className="grid gap-4">
              {highlights.map((item) => (
                <article key={item.title} className="card">
                  <h3 className="text-xl font-semibold text-text-primary">
                    {item.title}
                  </h3>

                  <p className="mt-2 leading-7 text-text-secondary">
                    {item.description}
                  </p>
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