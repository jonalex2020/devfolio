import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TwoFactorPage = () => {
  const navigate = useNavigate();
  const { user, markTwoFactorVerified, logout } = useAuth();

  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/admin/login", { replace: true });
      return;
    }

    const temporalCode = String(Math.floor(100000 + Math.random() * 900000));

    sessionStorage.setItem(`2fa_code_${user.uid}`, temporalCode);
    setGeneratedCode(temporalCode);
  }, [user, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) return;

    const storedCode = sessionStorage.getItem(`2fa_code_${user.uid}`);

    if (code.trim() !== storedCode) {
      setErrorMessage("El código ingresado no es válido.");
      return;
    }

    sessionStorage.removeItem(`2fa_code_${user.uid}`);
    markTwoFactorVerified();
    navigate("/admin/dashboard", { replace: true });
  };

  const handleCancel = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-background-primary text-text-primary">
      <section className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-background-secondary p-8 shadow-xl">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              2FA
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Verificación de seguridad
            </h1>

            <p className="mt-4 leading-7 text-text-secondary">
              Ingresa el código temporal para completar el acceso al panel
              administrativo.
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-accent-blue/30 bg-accent-blue/10 p-4">
            <p className="text-sm text-text-secondary">
              Código temporal académico:
            </p>
            <p className="mt-2 text-2xl font-bold tracking-[0.35em] text-accent-blue">
              {generatedCode}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="code"
                className="mb-2 block text-sm font-medium text-text-secondary"
              >
                Código de verificación
              </label>

              <input
                id="code"
                type="text"
                inputMode="numeric"
                maxLength="6"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
                className="w-full rounded-lg border border-border bg-background-primary px-4 py-3 text-center text-xl tracking-[0.35em] text-text-primary outline-none transition-colors focus:border-accent-blue"
                placeholder="000000"
              />
            </div>

            {errorMessage && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                <p className="text-sm text-red-300">{errorMessage}</p>
              </div>
            )}

            <button type="submit" className="btn-primary w-full justify-center">
              Verificar y entrar
            </button>
          </form>

          <button
            type="button"
            onClick={handleCancel}
            className="mt-4 w-full rounded-lg border border-border px-4 py-3 text-sm text-text-secondary transition-colors hover:border-accent-blue hover:text-accent-blue"
          >
            Cancelar acceso
          </button>

          <div className="mt-6 rounded-lg border border-border bg-background-primary p-4">
            <p className="text-sm leading-6 text-text-muted">
              Esta implementación simula un segundo factor académico. En un
              ambiente productivo, el código puede enviarse por correo, SMS o
              integrarse con una aplicación autenticadora.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TwoFactorPage;