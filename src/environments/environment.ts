export const environment = {
  production: true,
  // Используем относительный путь, чтобы ходить к API через тот же домен (проксируется на onrender).
  apiUrl: '/api',
  contactEndpoint: '/.netlify/functions/contact'
};
