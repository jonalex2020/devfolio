import { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { label: "Inicio", href: "#home" },
    { label: "Sobre mí", href: "#about" },
    { label: "Educación", href: "#education" },
    { label: "Experiencia", href: "#experience" },
    { label: "Habilidades", href: "#soft-skills" },
    { label: "Idiomas", href: "#languages" },
    { label: "Formación", href: "#certifications" },
    { label: "Tecnologías", href: "#technologies" },
    { label: "Proyectos", href: "#projects" },
    { label: "GitHub", href: "#github" },
    { label: "Contacto", href: "#contact" },
  ];

  useEffect(() => {
    const storedTheme = localStorage.getItem("devfolio-theme");

    const preferredTheme =
      storedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(preferredTheme);

    if (preferredTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    localStorage.setItem("devfolio-theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background-primary/80 backdrop-blur-xl">
      <nav className="container-app flex h-16 items-center justify-between">
        <a
          href="#home"
          onClick={closeMenu}
          className="text-lg font-bold tracking-tight"
        >
          <span className="text-accent-blue">Dev</span>Folio
        </a>

        <div className="hidden items-center gap-4 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background-secondary text-text-primary transition-all duration-200 hover:border-accent-blue hover:text-accent-blue"
            aria-label={
              theme === "dark"
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
            title={
              theme === "dark"
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <a href="#contact" className="btn-primary inline-flex">
            Contactar
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background-secondary text-text-primary transition-all duration-200 hover:border-accent-blue hover:text-accent-blue"
            aria-label={
              theme === "dark"
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background-secondary text-text-primary transition-all duration-200 hover:border-accent-blue hover:text-accent-blue"
            aria-label="Abrir menú de navegación"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-border bg-background-primary/95 backdrop-blur-xl lg:hidden">
          <div className="container-app py-4">
            <div className="grid gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-xl border border-border bg-background-secondary px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-accent-blue hover:text-accent-blue"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              onClick={closeMenu}
              className="btn-primary mt-4 inline-flex w-full justify-center"
            >
              Contactar
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;