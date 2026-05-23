const Navbar = () => {
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

        <a href="#contact" className="btn-primary hidden md:inline-flex">
          Contactar
        </a>
      </nav>
    </header>
  );
};

export default Navbar;