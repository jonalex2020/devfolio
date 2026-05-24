import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/auth.service";

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    const response = await loginAdmin(formData.email, formData.password);

    setIsLoading(false);

    if (!response.success) {
      setErrorMessage(response.error);
      return;
    }

    sessionStorage.setItem("admin_first_factor", "verified");
    navigate("/admin/verify");
  };

  return (
    <main className="min-h-screen bg-background-primary text-text-primary">
      <section className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-background-secondary p-8 shadow-xl">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Admin
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Iniciar sesión
            </h1>

            <p className="mt-4 leading-7 text-text-secondary">
              Acceso privado para administrar el contenido del portafolio.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-text-secondary"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full rounded-lg border border-border bg-background-primary px-4 py-3 text-text-primary outline-none transition-colors focus:border-accent-blue"
                placeholder="admin@correo.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-text-secondary"
              >
                Contraseña
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-border bg-background-primary px-4 py-3 text-text-primary outline-none transition-colors focus:border-accent-blue"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            {errorMessage && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                <p className="text-sm text-red-300">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Validando..." : "Continuar"}
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-border bg-background-primary p-4">
            <p className="text-sm leading-6 text-text-muted">
              Este acceso utiliza Firebase Authentication como primer factor de
              seguridad.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminLoginPage;