const Footer = () => {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="container-app flex flex-col gap-3 py-8 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
        <p>© 2026 DevFolio. Proyecto académico de Ingeniería en Sistemas.</p>
        <p>React · Vite · TailwindCSS · Firebase</p>
      </div>
    </footer>
  );
};

export default Footer;