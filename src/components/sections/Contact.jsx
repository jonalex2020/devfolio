const Contact = ({ data }) => {
  const normalizeUrl = (url) => {
    if (!url) return "#contact";

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    return `https://${url}`;
  };

  const email = data?.email || "alexmerida2007@hotmail.com";
  const googleEmail = data?.googleEmail || "alexmerida2007@gmail.com";
  const githubUser = data?.githubUser || "jonalex2020";

  const githubUrl = normalizeUrl(
    data?.githubUrl || `https://github.com/${githubUser}`
  );

  const facebookUrl = normalizeUrl(
    data?.facebookUrl || "https://facebook.com/jonalexmerida"
  );

  const location = data?.location || "Huehuetenango, Guatemala";

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  location
)}`;

  const contactMethods = [
    {
      label: "Correo electrónico",
      value: email,
      href: `mailto:${email}`,
      external: false,
    },
    {
      label: "GitHub",
      value: `github.com/${githubUser}`,
      href: githubUrl,
      external: true,
    },
    {
      label: "Facebook",
      value: "facebook.com/jonalexmerida",
      href: facebookUrl,
      external: true,
    },
    {
  label: "Ubicación",
  value: location,
  href: mapsUrl,
  external: true,
},
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-background-primary py-24"
    >
      <div className="pointer-events-none absolute left-[-12rem] top-20 h-80 w-80 rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-[-12rem] h-80 w-80 rounded-full bg-accent-green/10 blur-3xl" />

      <div className="container-app relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-background-secondary/70 px-4 py-2 text-xs font-medium text-text-secondary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent-green" />
              Disponible para colaborar
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Contacto
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              ¿Tienes una idea, proyecto o{" "}
              <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
                propuesta académica?
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-text-secondary">
              Estoy abierto a colaborar en proyectos académicos, prácticas
              profesionales y desarrollo de soluciones web enfocadas en resolver
              problemas reales mediante tecnología.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href={`mailto:${email}`} className="btn-primary">
                Enviar correo
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Ver GitHub
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-background-secondary/80 p-6 shadow-sm backdrop-blur">
            <h3 className="text-2xl font-bold text-text-primary">
              Información de contacto
            </h3>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Canales disponibles para comunicación académica, técnica o
              profesional.
            </p>

            <div className="mt-6 space-y-4">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noreferrer" : undefined}
                  className="block rounded-2xl border border-border bg-background-primary/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue"
                >
                  <p className="text-sm text-text-muted">{method.label}</p>
                  <p className="mt-1 font-medium text-text-primary">
                    {method.value}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-background-primary/80 p-4">
              <p className="text-sm text-text-muted">
                Correo para Google / Firebase
              </p>
              <p className="mt-1 font-medium text-text-primary">
                {googleEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;