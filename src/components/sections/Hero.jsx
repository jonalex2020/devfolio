const Hero = ({ data }) => {
  const fullName = data?.displayName || "Jonny Mérida";
  const headline = data?.headline || "Estudiante de Ingeniería en Sistemas";
  const bio =
    data?.bio ||
    "Emprendedor y amante de la tecnología, estudiante de Ingeniería en Sistemas y desarrollador en formación.";

  return (
    <section id="home" className="container-app py-24 md:py-32">
      <div className="max-w-5xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
          Portafolio profesional
        </p>

        <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Hola, soy{" "}
          <span className="text-accent-blue">{fullName}</span>
          <br />
          {headline}.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
          {bio}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#projects" className="btn-primary">
            Ver proyectos
          </a>
          <a href="#contact" className="btn-secondary">
            Contactar
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="card">
            <p className="text-3xl font-bold text-accent-blue">React</p>
            <p className="mt-2 text-sm text-text-secondary">
              Frontend moderno y modular
            </p>
          </div>

          <div className="card">
            <p className="text-3xl font-bold text-accent-green">Firebase</p>
            <p className="mt-2 text-sm text-text-secondary">
              Backend serverless y base de datos
            </p>
          </div>

          <div className="card">
            <p className="text-3xl font-bold text-accent-purple">CI/CD</p>
            <p className="mt-2 text-sm text-text-secondary">
              Despliegue automatizado en Vercel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;