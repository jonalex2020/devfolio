import { Link } from "react-router-dom";

const PresentationPage = () => {
  const pdfPath = "/docs/DevFolio-Presentacion.pdf";
  const pptPath = "/docs/DevFolio-Presentacion.pptx";

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
                Visualiza la presentación técnica del proyecto DevFolio, donde
                se explica la arquitectura del sistema, tecnologías utilizadas,
                base de datos, autenticación, funcionalidades principales y
                despliegue CI/CD.
              </p>

              <p className="mt-4 text-sm text-text-muted">
                La presentación se muestra en formato PDF para garantizar una
                visualización estable en navegador.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={pdfPath}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Abrir PDF
              </a>

              <a href={pdfPath} download className="btn-secondary">
                Descargar PDF
              </a>

              <a href={pptPath} download className="btn-secondary">
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
        <div className="overflow-hidden rounded-3xl border border-border bg-background-secondary shadow-sm">
          <iframe
            src={pdfPath}
            title="Presentación técnica DevFolio"
            className="h-[85vh] w-full bg-white"
          />
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-background-secondary p-5">
          <h2 className="text-xl font-bold">Nota técnica</h2>

          <p className="mt-3 leading-7 text-text-secondary">
            Si el documento visualizado no corresponde a las diapositivas de la
            presentación técnica, se debe reemplazar el archivo PDF ubicado en{" "}
            <span className="font-semibold text-text-primary">
              public/docs/DevFolio-Presentacion.pdf
            </span>{" "}
            por el PDF exportado correctamente desde PowerPoint.
          </p>
        </div>
      </section>
    </main>
  );
};

export default PresentationPage;