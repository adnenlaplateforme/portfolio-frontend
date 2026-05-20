type FetchOptions = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
};

export async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  const base = import.meta.env.VITE_API_URL as string;
  const token = localStorage.getItem('token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${base}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err: any = await response.json().catch(() => ({}));
    throw new Error(err.message || err.errors?.[0]?.msg || response.statusText);
  }

  if (response.status === 204) return null;

  return response.json();
}

export default function useFetch(_path: string) {
  // TODO
}
