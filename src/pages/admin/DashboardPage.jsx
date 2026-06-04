import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const modules = [
    {
      title: "Proyectos",
      description: "Crear, editar, eliminar y listar proyectos destacados.",
      path: "/admin/projects",
      status: "CRUD activo",
    },
    {
      title: "Tecnologías",
      description: "Administrar categorías y tecnologías utilizadas.",
      path: "/admin/technologies",
      status: "CRUD activo",
    },
    {
      title: "Educación",
      description: "Gestionar formación académica y áreas de estudio.",
      path: "/admin/education",
      status: "CRUD activo",
    },
    {
      title: "Experiencia",
      description: "Administrar experiencia laboral y académica.",
      path: "/admin/experience",
      status: "CRUD activo",
    },
    {
      title: "Habilidades blandas",
      description: "Gestionar competencias personales del portafolio.",
      path: "/admin/soft-skills",
      status: "CRUD activo",
    },
    {
      title: "Idiomas",
      description: "Administrar idiomas y niveles de dominio.",
      path: "/admin/languages",
      status: "CRUD activo",
    },
    {
      title: "Certificaciones",
      description: "Gestionar cursos, constancias y certificaciones.",
      path: "/admin/certifications",
      status: "CRUD activo",
    },
    {
  title: "Configuración del sitio",
  description: "Actualizar datos personales y enlaces principales.",
  path: "/admin/site-config",
  status: "CRUD activo",
},
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-background-primary text-text-primary">
      <section className="border-b border-border bg-background-secondary">
        <div className="container-app py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
                Admin
              </p>

              <h1 className="text-4xl font-bold tracking-tight">
                Panel Para Administracion
              </h1>

              <p className="mt-3 text-text-secondary">
                Gestión interna del contenido dinámico del portafolio.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/" className="btn-secondary">
                Ver sitio público
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="btn-primary"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-app py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="card lg:col-span-1">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-blue">
              Sesión
            </p>

            <h2 className="mt-4 text-2xl font-bold">Administrador activo</h2>

            <div className="mt-5 space-y-3 text-sm text-text-secondary">
              <p>
                <span className="text-text-primary">Correo:</span>{" "}
                {user?.email || "No disponible"}
              </p>

              <p>
                <span className="text-text-primary">Estado:</span> Autenticado
              </p>

              <p>
                <span className="text-text-primary">2FA:</span> Verificado
              </p>
            </div>
          </article>

          <article className="card lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-blue">
              Estado del proyecto
            </p>

            <h2 className="mt-4 text-2xl font-bold">
              Módulos administrativos activos
            </h2>

            <p className="mt-4 leading-7 text-text-secondary">
              El sistema cuenta con autenticación mediante Firebase Auth,
              verificación de segundo factor, rutas privadas protegidas y
              operaciones CRUD sobre las principales colecciones de Firestore.
            </p>
          </article>
        </div>

        <div className="mt-10">
          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-accent-blue">
              Módulos
            </p>

            <h2 className="text-3xl font-bold">Administración de contenido</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {modules.map((module) => {
              const isAvailable = module.path !== "#";

              const CardContent = (
                <article className="card h-full transition-transform duration-200 hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold">{module.title}</h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        isAvailable
                          ? "bg-accent-green/10 text-accent-green"
                          : "bg-accent-blue/10 text-accent-blue"
                      }`}
                    >
                      {module.status}
                    </span>
                  </div>

                  <p className="mt-4 leading-7 text-text-secondary">
                    {module.description}
                  </p>

                  <p className="mt-6 text-sm text-accent-blue">
                    {isAvailable ? "Abrir módulo →" : "Próximamente"}
                  </p>
                </article>
              );

              return isAvailable ? (
                <Link key={module.title} to={module.path}>
                  {CardContent}
                </Link>
              ) : (
                <div key={module.title} className="opacity-70">
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;