// Utilidades de configuración de cliente
// En desarrollo usamos el backend en localhost:4011
// En producción usamos el dominio público
export const API_BASE: string = (() => {
  const mode = import.meta.env.MODE;
  // import.meta.env.MODE viene de Vite ('development' o 'production')
  if (mode === 'production') return 'https://deseos-tally.enflujo.com';
  return 'http://localhost:4011';
})();

export function apiUrl(path: string) {
  if (!path) return API_BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE.replace(/\/$/, '')}${p}`;
}
