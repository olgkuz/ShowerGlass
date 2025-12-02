export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve the built Angular assets first; fall back to index.html for SPA routes.
    let response = await env.ASSETS.fetch(request);

    if (response.status === 404 && !url.pathname.includes(".")) {
      const indexRequest = new Request(new URL("/index.html", url), request);
      response = await env.ASSETS.fetch(indexRequest);
    }

    return response;
  },
};
