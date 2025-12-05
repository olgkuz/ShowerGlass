export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Proxy API and uploads to backend to keep same-origin and avoid CORS.
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/uploads/')) {
      const backendUrl = new URL(url.pathname + url.search, 'https://dushcabs.onrender.com');
      const proxiedResponse = await fetch(backendUrl.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
        redirect: 'follow',
      });

      // Clone response and ensure CORS is open for our origin (Cloudflare worker domain).
      const resHeaders = new Headers(proxiedResponse.headers);
      resHeaders.set('Access-Control-Allow-Origin', url.origin);
      resHeaders.set('Access-Control-Allow-Credentials', 'true');

      return new Response(proxiedResponse.body, {
        status: proxiedResponse.status,
        statusText: proxiedResponse.statusText,
        headers: resHeaders,
      });
    }

    // Serve the built Angular assets first; fall back to index.html for SPA routes.
    let response = await env.ASSETS.fetch(request);

    if (response.status === 404 && !url.pathname.includes(".")) {
      const indexRequest = new Request(new URL("/index.html", url), request);
      response = await env.ASSETS.fetch(indexRequest);
    }

    return response;
  },
};
