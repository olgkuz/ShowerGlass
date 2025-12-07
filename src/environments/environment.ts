export const environment = {
  production: true,
  // Используем относительный путь, чтобы ходить к API через тот же домен (проксируется на onrender).
  apiUrl: '/api',
  // Endpoint Cloudflare Worker/Pages Functions для формы контакта
  contactEndpoint: '/api/contact'
};
