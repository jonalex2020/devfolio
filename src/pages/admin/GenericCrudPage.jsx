import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createCollectionItem,
  deleteCollectionItem,
  getCollectionItems,
  updateCollectionItem,
} from "../../services/firestore.service";

const MODULES = {
  technologies: {
    collectionName: "technologies",
    title: "Tecnologías",
    description: "Administra categorías y tecnologías utilizadas en el proyecto.",
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      { name: "label", label: "Etiqueta", type: "text" },
      { name: "description", label: "Descripción", type: "textarea" },
      {
        name: "items",
        label: "Tecnologías",
        type: "tags",
        placeholder: "React, Vite, TailwindCSS",
      },
    ],
  },
  education: {
    collectionName: "education",
    title: "Educación",
    description: "Administra la información académica mostrada en la landing.",
    fields: [
      { name: "status", label: "Estado", type: "text" },
      { name: "title", label: "Título", type: "text", required: true },
      { name: "institution", label: "Institución", type: "text" },
      { name: "location", label: "Ubicación", type: "text" },
      { name: "currentProject", label: "Proyecto actual", type: "text" },
      { name: "description", label: "Descripción", type: "textarea" },
      {
        name: "areas",
        label: "Áreas",
        type: "tags",
        placeholder: "Programación, Bases de datos, Redes",
      },
    ],
  },
  experience: {
    collectionName: "experience",
    title: "Experiencia",
    description: "Administra experiencia laboral, académica u organizacional.",
    fields: [
      { name: "type", label: "Tipo", type: "text" },
      { name: "role", label: "Rol", type: "text", required: true },
      { name: "organization", label: "Organización", type: "text" },
      { name: "location", label: "Ubicación", type: "text" },
      { name: "period", label: "Periodo", type: "text" },
      { name: "description", label: "Descripción", type: "textarea" },
      {
        name: "responsibilities",
        label: "Responsabilidades",
        type: "tags",
        placeholder: "Responsabilidad 1, Responsabilidad 2",
      },
    ],
  },
  "soft-skills": {
    collectionName: "softSkills",
    title: "Habilidades blandas",
    description: "Administra competencias personales del portafolio.",
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      { name: "label", label: "Etiqueta", type: "text" },
      { name: "description", label: "Descripción", type: "textarea" },
    ],
  },
  languages: {
    collectionName: "languages",
    title: "Idiomas",
    description: "Administra idiomas y niveles de dominio.",
    fields: [
      { name: "name", label: "Idioma", type: "text", required: true },
      { name: "level", label: "Nivel", type: "text" },
      { name: "description", label: "Descripción", type: "textarea" },
    ],
  },
  certifications: {
    collectionName: "certifications",
    title: "Certificaciones / Formación",
    description: "Administra formación complementaria y certificaciones.",
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      { name: "issuer", label: "Emisor", type: "text" },
      { name: "status", label: "Estado", type: "text" },
      { name: "description", label: "Descripción", type: "textarea" },
      {
        name: "topics",
        label: "Temas",
        type: "tags",
        placeholder: "React, Firebase, GitHub",
      },
    ],
  },
};

const parseTags = (value) => {
  if (Array.isArray(value)) return value;

  return String(value || "")
    .split(/,|;|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const stringifyTags = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  return value || "";
};

const buildInitialForm = (fields) => {
  return fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
};

const GenericCrudPage = () => {
  const { moduleId } = useParams();

  const moduleConfig = MODULES[moduleId];

  const initialForm = useMemo(() => {
    if (!moduleConfig) return {};
    return buildInitialForm(moduleConfig.fields);
  }, [moduleConfig]);

  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadItems = async () => {
    if (!moduleConfig) return;

    setLoading(true);
    const response = await getCollectionItems(moduleConfig.collectionName);
    setItems(response);
    setLoading(false);
  };

  useEffect(() => {
    setFormData(initialForm);
    setEditingId(null);
    setError("");
    setSuccess("");
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId, initialForm]);

  if (!moduleConfig) {
    return (
      <div className="min-h-screen bg-background-primary px-6 py-16 text-text-primary">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-background-secondary p-8">
          <h1 className="text-2xl font-bold">Módulo no encontrado</h1>
          <p className="mt-3 text-text-secondary">
            La ruta administrativa solicitada no existe.
          </p>
          <Link
            to="/admin/dashboard"
            className="btn-primary mt-6 inline-flex"
          >
            Volver al dashboard
          </Link>
        </div>
      </div>
    );
  }

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  const handleChange = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field.name]: value,
    }));
  };

  const buildPayload = () => {
    return moduleConfig.fields.reduce((acc, field) => {
      const value = formData[field.name];

      if (field.type === "tags") {
        acc[field.name] = parseTags(value);
      } else {
        acc[field.name] = String(value || "").trim();
      }

      return acc;
    }, {});
  };

  const validatePayload = (payload) => {
    const requiredField = moduleConfig.fields.find(
      (field) => field.required && !payload[field.name]
    );

    if (requiredField) {
      return `El campo "${requiredField.label}" es obligatorio.`;
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = buildPayload();
    const validationError = validatePayload(payload);

    if (validationError) {
      setError(validationError);
      setSaving(false);
      return;
    }

    const response = editingId
      ? await updateCollectionItem(
          moduleConfig.collectionName,
          editingId,
          payload
        )
      : await createCollectionItem(moduleConfig.collectionName, payload);

    if (!response.success) {
      setError(response.error || "No se pudo guardar el registro.");
      setSaving(false);
      return;
    }

    setSuccess(
      editingId
        ? "Registro actualizado correctamente."
        : "Registro creado correctamente."
    );

    resetForm();
    await loadItems();
    setSaving(false);
  };

  const handleEdit = (item) => {
    const nextForm = moduleConfig.fields.reduce((acc, field) => {
      const value = item[field.name];

      acc[field.name] =
        field.type === "tags" ? stringifyTags(value) : value || "";

      return acc;
    }, {});

    setFormData(nextForm);
    setEditingId(item.id);
    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este registro?"
    );

    if (!confirmDelete) return;

    setError("");
    setSuccess("");

    const response = await deleteCollectionItem(
      moduleConfig.collectionName,
      itemId
    );

    if (!response.success) {
      setError(response.error || "No se pudo eliminar el registro.");
      return;
    }

    setSuccess("Registro eliminado correctamente.");
    await loadItems();
  };

  const getItemTitle = (item) => {
    return (
      item.title ||
      item.name ||
      item.role ||
      item.institution ||
      item.organization ||
      "Registro sin título"
    );
  };

  const getItemDescription = (item) => {
    return (
      item.description ||
      item.aboutDescription ||
      item.currentProject ||
      "Sin descripción registrada."
    );
  };

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <header className="border-b border-border bg-background-secondary">
        <div className="container-app flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Admin
            </p>
            <h1 className="text-4xl font-bold">{moduleConfig.title}</h1>
            <p className="mt-3 text-text-secondary">
              {moduleConfig.description}
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

      <main className="container-app grid gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-3xl border border-border bg-background-secondary p-6 shadow-sm">
          <h2 className="text-2xl font-bold">
            {editingId ? "Editar registro" : "Nuevo registro"}
          </h2>

          <p className="mt-2 text-sm text-text-secondary">
            Completa los campos del módulo seleccionado. Los campos tipo lista
            se pueden separar por coma.
          </p>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-5 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-300">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {moduleConfig.fields.map((field) => (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-medium text-text-secondary">
                  {field.label}
                  {field.required && (
                    <span className="ml-1 text-accent-blue">*</span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    value={formData[field.name] || ""}
                    onChange={(event) =>
                      handleChange(field, event.target.value)
                    }
                    rows={5}
                    placeholder={field.placeholder}
                    className="input-field w-full resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[field.name] || ""}
                    onChange={(event) =>
                      handleChange(field, event.target.value)
                    }
                    placeholder={field.placeholder}
                    className="input-field w-full"
                  />
                )}

                {field.type === "tags" && (
                  <p className="mt-2 text-xs text-text-muted">
                    Separa los valores con coma. Ejemplo: React, Firebase,
                    Vercel
                  </p>
                )}
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-3">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Guardando..."
                  : editingId
                  ? "Actualizar"
                  : "Crear registro"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary"
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-border bg-background-secondary p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Registros existentes</h2>
              <p className="mt-2 text-sm text-text-secondary">
                Total: {items.length} registros
              </p>
            </div>

            <button type="button" onClick={loadItems} className="btn-secondary">
              Recargar
            </button>
          </div>

          {loading ? (
            <p className="mt-8 text-text-secondary">Cargando registros...</p>
          ) : items.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-border bg-background-primary p-6 text-text-secondary">
              No hay registros en esta colección.
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-border bg-background-primary p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">
                        {getItemTitle(item)}
                      </h3>

                      <p className="mt-2 leading-7 text-text-secondary">
                        {getItemDescription(item)}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {Object.entries(item)
                          .filter(
                            ([key, value]) =>
                              ![
                                "id",
                                "description",
                                "createdAt",
                                "updatedAt",
                              ].includes(key) &&
                              value
                          )
                          .slice(0, 5)
                          .map(([key, value]) => (
                            <span
                              key={key}
                              className="rounded-xl border border-border bg-background-secondary px-3 py-1 text-xs text-text-secondary"
                            >
                              {key}:{" "}
                              {Array.isArray(value)
                                ? value.join(", ")
                                : String(value)}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="btn-secondary"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg border border-red-400/50 px-5 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default GenericCrudPage;