const Contact = ({ data }) => {
  const email = data?.email || "alexmerida2007@hotmail.com";
  const googleEmail = data?.googleEmail || "alexmerida2007@gmail.com";
  const githubUser = data?.githubUser || "jonalex2020";
  const githubUrl = data?.githubUrl || `https://github.com/${githubUser}`;
  const facebookUrl =
    data?.facebookUrl || "https://facebook.com/jonalexmerida";
  const location = data?.location || "Huehuetenango, Guatemala";

  const contactMethods = [
    {
      label: "Correo electrónico",
      value: email,
      href: `mailto:${email}`,
    },
    {
      label: "GitHub",
      value: `github.com/${githubUser}`,
      href: githubUrl,
    },
    {
      label: "Facebook",
      value: "facebook.com/jonalexmerida",
      href: facebookUrl,
    },
    {
      label: "Ubicación",
      value: location,
      href: "#contact",
    },
  ];

  return (
    <section
      id="contact"
      className="border-t border-border bg-background-primary py-24"
    >
      <div className="container-app">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Contacto
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              ¿Tienes una idea, proyecto o propuesta académica?
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

          <div className="card">
            <h3 className="text-2xl font-bold">Información de contacto</h3>

            <div className="mt-6 space-y-5">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                  className="block rounded-lg border border-border bg-background-primary p-4 transition-colors hover:border-accent-blue"
                >
                  <p className="text-sm text-text-muted">{method.label}</p>
                  <p className="mt-1 font-medium text-text-primary">
                    {method.value}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-border bg-background-primary p-4">
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