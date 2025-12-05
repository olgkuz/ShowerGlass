export const environment = {
  production: false,
  // В деве тоже используем относительный путь и прокси-конфиг для обхода CORS.
  apiUrl: '/api',
  contactEndpoint: '/.netlify/functions/contact'
};
