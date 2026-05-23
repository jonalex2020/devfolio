// =====================================================================
// github.service.js — Integración con la API pública de GitHub
// =====================================================================
// Consume endpoints públicos de la REST API de GitHub para obtener
// información del usuario, repositorios y actividad reciente.
//
// La API pública permite 60 requests por hora sin autenticación, lo cual
// es suficiente para un portafolio. Si necesitas más, podés usar un
// token personal (no recomendado en frontend por seguridad).
//
// Defensa académica: este servicio implementa el patrón "API Client",
// abstrayendo los detalles de la integración externa para que los
// componentes consumidores no conozcan la estructura de la API.
// =====================================================================

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

// Cache simple en memoria para evitar llamadas repetidas durante la
// misma sesión (mejora rendimiento y respeta el rate limit).
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

/**
 * Wrapper de fetch con manejo de errores y cache.
 *
 * @param {string} endpoint - Endpoint relativo (ej. '/users/...')
 * @returns {Promise<object|null>}
 */
const fetchGitHub = async (endpoint) => {
  const cacheKey = endpoint;
  const cached = cache.get(cacheKey);

  // Si hay cache vigente, lo devolvemos
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    // Guardamos en cache
    cache.set(cacheKey, { data, timestamp: Date.now() });

    return data;
  } catch (error) {
    console.error('[GitHub] Error en fetch:', error);
    return null;
  }
};

/**
 * Obtiene el perfil del usuario configurado en .env.
 */
export const getUserProfile = async () => {
  if (!GITHUB_USERNAME) {
    console.warn('[GitHub] VITE_GITHUB_USERNAME no configurado en .env');
    return null;
  }
  return fetchGitHub(`/users/${GITHUB_USERNAME}`);
};

/**
 * Obtiene los repositorios públicos del usuario, ordenados por
 * fecha de última actualización.
 *
 * @param {number} limit - Cantidad máxima de repos a retornar
 */
export const getUserRepos = async (limit = 6) => {
  if (!GITHUB_USERNAME) return [];

  const repos = await fetchGitHub(
    `/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${limit}`
  );

  if (!repos) return [];

  // Filtramos forks y mapeamos a un formato más amigable para la UI.
  return repos
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
    }));
};

/**
 * Obtiene los eventos públicos recientes del usuario (commits, etc.).
 *
 * @param {number} limit
 */
export const getUserActivity = async (limit = 10) => {
  if (!GITHUB_USERNAME) return [];

  const events = await fetchGitHub(
    `/users/${GITHUB_USERNAME}/events/public?per_page=${limit}`
  );

  if (!events) return [];

  return events.map((event) => ({
    id: event.id,
    type: event.type,
    repo: event.repo?.name,
    createdAt: event.created_at,
  }));
};

/**
 * Calcula estadísticas agregadas del perfil para mostrar en la landing.
 */
export const getProfileStats = async () => {
  const [profile, repos] = await Promise.all([
    getUserProfile(),
    getUserRepos(100), // pedimos hasta 100 para estadísticas
  ]);

  if (!profile) return null;

  // Calculamos lenguajes más usados
  const languageCount = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const topLanguages = Object.entries(languageCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  // Total de stars recibidas
  const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0);

  return {
    username: profile.login,
    name: profile.name,
    avatarUrl: profile.avatar_url,
    bio: profile.bio,
    publicRepos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
    topLanguages,
    totalStars,
    profileUrl: profile.html_url,
  };
};
