import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="container-app flex flex-col gap-4 py-8 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
        <div>
          <p>© 2026 DevFolio. Proyecto académico de Ingeniería en Sistemas.</p>
          <p className="mt-1 text-xs">
            React · Vite · TailwindCSS · Firebase · Vercel
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#home"
            className="transition-colors hover:text-accent-blue"
          >
            Inicio
          </a>

          <a
            href="#projects"
            className="transition-colors hover:text-accent-blue"
          >
            Proyectos
          </a>

          <a
            href="#contact"
            className="transition-colors hover:text-accent-blue"
          >
            Contacto
          </a>

          <Link
            to="/admin/login"
            className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:border-accent-blue hover:text-accent-blue"
          >
            Acceso admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;