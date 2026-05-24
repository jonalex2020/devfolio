import profileImage from "../../assets/profile-jonalex.jpg";

const Hero = ({ data }) => {
  const fullName = data?.displayName || "Jonny Mérida";
  const headline = data?.headline || "Estudiante de Ingeniería en Sistemas";
  const bio =
    data?.bio ||
    "Emprendedor y amante de la tecnología, estudiante de Ingeniería en Sistemas y desarrollador en formación.";

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-border bg-background-primary"
    >
      <div className="pointer-events-none absolute left-[-10%] top-[-15%] h-80 w-80 rounded-full bg-accent-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] top-[20%] h-96 w-96 rounded-full bg-accent-purple/10 blur-3xl" />

      <div className="container-app relative grid gap-14 py-24 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-background-secondary/80 px-4 py-2 text-xs font-medium text-text-secondary backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent-green shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
            Portafolio profesional disponible en producción
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
            Portafolio profesional
          </p>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Hola, soy{" "}
            <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
              {fullName}
            </span>
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
            <div className="card group transition-transform duration-300 hover:-translate-y-1">
              <p className="text-3xl font-bold text-accent-blue">React</p>
              <p className="mt-2 text-sm text-text-secondary">
                Frontend moderno y modular
              </p>
            </div>

            <div className="card group transition-transform duration-300 hover:-translate-y-1">
              <p className="text-3xl font-bold text-accent-green">Firebase</p>
              <p className="mt-2 text-sm text-text-secondary">
                Backend serverless y base de datos
              </p>
            </div>

            <div className="card group transition-transform duration-300 hover:-translate-y-1">
              <p className="text-3xl font-bold text-accent-purple">CI/CD</p>
              <p className="mt-2 text-sm text-text-secondary">
                Despliegue automatizado en Vercel
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent-blue/25 via-accent-purple/10 to-accent-green/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-background-secondary p-4 shadow-2xl">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-border">
              <img
                src={profileImage}
                alt={`Foto profesional de ${fullName}`}
                className="h-[520px] w-full object-cover object-center"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background-primary via-background-primary/70 to-transparent p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-blue">
                  Ingeniero en Sistemas
                </p>
                <h2 className="mt-2 text-2xl font-bold text-text-primary">
                  {fullName}
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  React · Firebase · Vercel · CI/CD
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border bg-background-primary p-4">
                <p className="text-2xl font-bold text-accent-blue">2FA</p>
                <p className="mt-1 text-xs text-text-secondary">
                  Panel protegido
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background-primary p-4">
                <p className="text-2xl font-bold text-accent-green">CRUD</p>
                <p className="mt-1 text-xs text-text-secondary">
                  Firestore activo
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -left-6 top-10 hidden rounded-2xl border border-border bg-background-secondary/90 p-4 shadow-xl backdrop-blur md:block">
            <p className="text-xs uppercase tracking-[0.25em] text-text-muted">
              Deploy
            </p>
            <p className="mt-1 text-sm font-semibold text-accent-green">
              Vercel Ready
            </p>
          </div>

          <div className="absolute -right-6 bottom-24 hidden rounded-2xl border border-border bg-background-secondary/90 p-4 shadow-xl backdrop-blur md:block">
            <p className="text-xs uppercase tracking-[0.25em] text-text-muted">
              Stack
            </p>
            <p className="mt-1 text-sm font-semibold text-accent-blue">
              React + Firebase
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;