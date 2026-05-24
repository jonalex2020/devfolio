import { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");

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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background-primary/80 backdrop-blur-xl">
      <nav className="container-app flex h-16 items-center justify-between">
        <a href="#home" className="text-lg font-bold tracking-tight">
          <span className="text-accent-blue">Dev</span>Folio
        </a>

        <div className="hidden items-center gap-4 md:flex">
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

        <div className="hidden items-center gap-3 md:flex">
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
      </nav>
    </header>
  );
};

export default Navbar;