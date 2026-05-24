import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getSiteConfig,
  updateSiteConfig,
} from "../../services/firestore.service";

const SiteConfigPage = () => {
  const initialForm = {
    displayName: "",
    headline: "",
    bio: "",
    aboutIntro: "",
    aboutDescription: "",
    email: "",
    googleEmail: "",
    githubUser: "",
    githubUrl: "",
    facebookUrl: "",
    location: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadConfig = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    const config = await getSiteConfig();

    if (config) {
      setFormData({
        displayName: config.displayName || "",
        headline: config.headline || "",
        bio: config.bio || "",
        aboutIntro: config.aboutIntro || "",
        aboutDescription: config.aboutDescription || "",
        email: config.email || "",
        googleEmail: config.googleEmail || "",
        githubUser: config.githubUser || "",
        githubUrl: config.githubUrl || "",
        facebookUrl: config.facebookUrl || "",
        location: config.location || "",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const handleChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = String(value || "").trim();
      return acc;
    }, {});

    const response = await updateSiteConfig(payload);

    if (!response.success) {
      setError(response.error || "No se pudo actualizar la configuración.");
      setSaving(false);
      return;
    }

    setSuccess("Configuración del sitio actualizada correctamente.");
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <header className="border-b border-border bg-background-secondary">
        <div className="container-app flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Admin
            </p>

            <h1 className="text-4xl font-bold">Configuración del sitio</h1>

            <p className="mt-3 text-text-secondary">
              Actualiza datos personales, enlaces principales y textos de la
              landing.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/admin/dashboard" className="btn-secondary">
              Dashboard
            </Link>

            <Link to="/" className="btn-secondary">
              Ver sitio
            </Link>
          </div>
        </div>
      </header>

      <main className="container-app py-10">
        <section className="mx-auto max-w-5xl rounded-3xl border border-border bg-background-secondary p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Datos generales</h2>

              <p className="mt-2 text-sm text-text-secondary">
                Estos campos alimentan el Hero, la sección Sobre mí y el
                contacto público.
              </p>
            </div>

            <button type="button" onClick={loadConfig} className="btn-secondary">
              Recargar
            </button>
          </div>

          {loading ? (
            <p className="mt-8 text-text-secondary">
              Cargando configuración...
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              {error && (
                <div className="rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                  {success}
                </div>
              )}

              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent-blue">
                  Hero principal
                </p>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                      Nombre público
                    </label>
                    <input
                      type="text"
                      value={formData.displayName}
                      onChange={(event) =>
                        handleChange("displayName", event.target.value)
                      }
                      placeholder="Jonny Mérida"
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                      Titular profesional
                    </label>
                    <input
                      type="text"
                      value={formData.headline}
                      onChange={(event) =>
                        handleChange("headline", event.target.value)
                      }
                      placeholder="Estudiante de Ingeniería en Sistemas"
                      className="input-field w-full"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                      Biografía corta
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(event) =>
                        handleChange("bio", event.target.value)
                      }
                      rows={4}
                      placeholder="Texto breve mostrado en el Hero."
                      className="input-field w-full resize-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent-blue">
                  Sobre mí
                </p>

                <div className="grid gap-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                      Introducción
                    </label>
                    <textarea
                      value={formData.aboutIntro}
                      onChange={(event) =>
                        handleChange("aboutIntro", event.target.value)
                      }
                      rows={5}
                      placeholder="Texto principal de la sección Sobre mí."
                      className="input-field w-full resize-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                      Descripción profesional
                    </label>
                    <textarea
                      value={formData.aboutDescription}
                      onChange={(event) =>
                        handleChange("aboutDescription", event.target.value)
                      }
                      rows={5}
                      placeholder="Resumen profesional o académico."
                      className="input-field w-full resize-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-accent-blue">
                  Contacto y enlaces
                </p>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                      Correo principal
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) =>
                        handleChange("email", event.target.value)
                      }
                      placeholder="correo@hotmail.com"
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                      Correo Google / Firebase
                    </label>
                    <input
                      type="email"
                      value={formData.googleEmail}
                      onChange={(event) =>
                        handleChange("googleEmail", event.target.value)
                      }
                      placeholder="correo@gmail.com"
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                      Usuario GitHub
                    </label>
                    <input
                      type="text"
                      value={formData.githubUser}
                      onChange={(event) =>
                        handleChange("githubUser", event.target.value)
                      }
                      placeholder="jonalex2020"
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                      URL GitHub
                    </label>
                    <input
                      type="text"
                      value={formData.githubUrl}
                      onChange={(event) =>
                        handleChange("githubUrl", event.target.value)
                      }
                      placeholder="https://github.com/jonalex2020"
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                      URL Facebook
                    </label>
                    <input
                      type="text"
                      value={formData.facebookUrl}
                      onChange={(event) =>
                        handleChange("facebookUrl", event.target.value)
                      }
                      placeholder="https://facebook.com/jonalexmerida"
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(event) =>
                        handleChange("location", event.target.value)
                      }
                      placeholder="Huehuetenango, Guatemala"
                      className="input-field w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-border pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Guardando..." : "Guardar configuración"}
                </button>

                <Link to="/admin/dashboard" className="btn-secondary">
                  Cancelar
                </Link>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
};

export default SiteConfigPage;