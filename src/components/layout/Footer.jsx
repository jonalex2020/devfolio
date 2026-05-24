import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background-secondary">
      <div className="pointer-events-none absolute left-[-8rem] top-0 h-64 w-64 rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] bottom-0 h-64 w-64 rounded-full bg-accent-green/10 blur-3xl" />

      <div className="container-app relative py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#home" className="text-lg font-bold tracking-tight">
              <span className="text-accent-blue">Dev</span>Folio
            </a>

            <p className="mt-3 max-w-xl text-sm leading-6 text-text-muted">
              © {currentYear} DevFolio. Proyecto académico de Ingeniería en
              Sistemas, desarrollado con enfoque profesional, Firebase,
              autenticación y despliegue continuo.
            </p>

            <p className="mt-3 text-xs text-text-muted">
              React · Vite · TailwindCSS · Firebase · Vercel · GitHub
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:text-right">
            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              <a
                href="#home"
                className="text-sm text-text-muted transition-colors hover:text-accent-blue"
              >
                Inicio
              </a>

              <a
                href="#about"
                className="text-sm text-text-muted transition-colors hover:text-accent-blue"
              >
                Sobre mí
              </a>

              <a
                href="#projects"
                className="text-sm text-text-muted transition-colors hover:text-accent-blue"
              >
                Proyectos
              </a>

              <a
                href="#contact"
                className="text-sm text-text-muted transition-colors hover:text-accent-blue"
              >
                Contacto
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <Link
                to="/admin/login"
                className="rounded-full border border-border bg-background-primary px-4 py-2 text-xs font-medium text-text-secondary transition-all duration-200 hover:border-accent-blue hover:text-accent-blue"
              >
                Acceso admin
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-5 text-xs text-text-muted">
          <p>
            Portafolio personal orientado a presentación académica, evidencia
            técnica y administración de contenido mediante panel privado.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;