import { Link } from "react-router-dom";

const PresentationPage = () => {
  const pptPath = "/docs/DevFolio-Presentacion.pptx";

  const publicPptUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${pptPath}`
      : "";

  const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    publicPptUrl
  )}`;

  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  return (
    <main className="min-h-screen bg-background-primary text-text-primary">
      <section className="border-b border-border bg-background-secondary">
        <div className="container-app py-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
            Presentación
          </p>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Presentación técnica de DevFolio
              </h1>

              <p className="mt-4 max-w-3xl leading-7 text-text-secondary">
                Visualiza la presentación del proyecto, donde se explica la
                arquitectura, tecnologías, base de datos, autenticación,
                funcionalidades principales y despliegue CI/CD.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={pptPath} download className="btn-primary">
                Descargar PPTX
              </a>

              <Link to="/" className="btn-secondary">
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-app py-10">
        {isLocalhost ? (
          <div className="rounded-3xl border border-border bg-background-secondary p-8 text-center">
            <h2 className="text-2xl font-bold">
              Vista previa no disponible en localhost
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-text-secondary">
              El visor de PowerPoint necesita una URL pública para cargar el
              archivo. Cuando publiques el proyecto en Vercel, esta presentación
              podrá visualizarse directamente aquí.
            </p>

            <a href={pptPath} download className="btn-primary mt-6 inline-flex">
              Descargar presentación
            </a>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-border bg-background-secondary shadow-sm">
            <iframe
              src={officeViewerUrl}
              title="Presentación técnica DevFolio"
              className="h-[80vh] w-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default PresentationPage;