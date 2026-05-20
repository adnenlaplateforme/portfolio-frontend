export async function apiFetch(endpoint, options = {}) {
  const base = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${base}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || err.errors?.[0]?.msg || response.statusText);
  }

  if (response.status === 204) return null;

  return response.json();
}

export default function useFetch(path) {
  // TODO
}
