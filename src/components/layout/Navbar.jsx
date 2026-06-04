import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Inicio", href: "#home", type: "anchor" },
  { label: "Sobre mí", href: "#about", type: "anchor" },
  { label: "Educación", href: "#education", type: "anchor" },
  { label: "Experiencia", href: "#experience", type: "anchor" },
  { label: "Habilidades", href: "#soft-skills", type: "anchor" },
  { label: "Idiomas", href: "#languages", type: "anchor" },
  { label: "Formación", href: "#certifications", type: "anchor" },
  { label: "Tecnologías", href: "#technologies", type: "anchor" },
  { label: "Proyectos", href: "#projects", type: "anchor" },
  { label: "GitHub", href: "#github", type: "anchor" },
  { label: "Presentación", href: "/presentacion", type: "route" },
  { label: "Contacto", href: "#contact", type: "anchor" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";

    return localStorage.getItem("devfolio-theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("devfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleAnchorNavigation = (href) => {
    closeMenu();

    if (location.pathname !== "/") {
      navigate(`/${href}`);

      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 250);

      return;
    }

    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderNavLink = (link, isMobile = false) => {
    const className = isMobile
      ? "block rounded-xl px-4 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-background-primary hover:text-accent-blue"
      : "text-sm font-medium text-text-secondary transition-colors hover:text-accent-blue";

    if (link.type === "route") {
      return (
        <Link
          key={link.label}
          to={link.href}
          onClick={closeMenu}
          className={className}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <button
        key={link.label}
        type="button"
        onClick={() => handleAnchorNavigation(link.href)}
        className={`${className} text-left`}
      >
        {link.label}
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background-primary/95 backdrop-blur">
      <nav className="container-app flex h-20 items-center justify-between gap-6">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl font-bold tracking-tight text-text-primary"
        >
          <span className="text-accent-blue">Dev</span>Folio
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => renderNavLink(link))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-border bg-background-secondary px-4 py-3 text-sm transition-colors hover:border-accent-blue"
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            type="button"
            onClick={() => handleAnchorNavigation("#contact")}
            className="btn-primary"
          >
            Contactar
          </button>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-border bg-background-secondary px-4 py-3 text-sm transition-colors hover:border-accent-blue"
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            className="rounded-lg border border-border bg-background-secondary px-4 py-3 text-sm font-medium text-text-primary transition-colors hover:border-accent-blue"
            aria-label="Abrir menú"
          >
            {isMenuOpen ? "Cerrar" : "Menú"}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-border bg-background-secondary xl:hidden">
          <div className="container-app space-y-2 py-4">
            {navLinks.map((link) => renderNavLink(link, true))}

            <button
              type="button"
              onClick={() => handleAnchorNavigation("#contact")}
              className="btn-primary mt-3 w-full justify-center"
            >
              Contactar
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;