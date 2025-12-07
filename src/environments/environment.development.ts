export const environment = {
  production: false,
  // В деве тоже используем относительный путь и прокси-конфиг для обхода CORS.
  apiUrl: '/api',
  // Endpoint Cloudflare Worker/Pages Functions для формы контакта
  contactEndpoint: '/api/contact'
};
