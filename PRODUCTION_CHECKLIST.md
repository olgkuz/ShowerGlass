# Production Ready Checklist

Status: [ ] pending  [x] done  [n/a]

## Build & Deploy
- [ ] `wrangler.toml` removed from repo (Pages only).
- [ ] `npm run build` succeeds locally.
- [ ] `dist/` is not committed (ignored).
- [ ] Cloudflare Pages deploy succeeds on `main`/`master`.
- [ ] No build warnings in Pages logs.

## Domain & Redirects
- [ ] `http://steklodush-spb.ru` redirects to `https://www.steklodush-spb.ru/` (301).
- [ ] `https://steklodush-spb.ru` redirects to `https://www.steklodush-spb.ru/` (301).
- [ ] `https://www.steklodush-spb.ru` returns 200.
- [ ] `www` certificate is valid and not expiring soon.

## SEO & Indexing
- [ ] `robots.txt` reachable at `/robots.txt`.
- [ ] `sitemap.xml` reachable at `/sitemap.xml`.
- [ ] `<title>` and meta description set for key pages.
- [ ] Canonical URL set for main pages.

## API & Forms
- [ ] Contact form submits successfully to `https://api.steklodush-spb.ru/api/contact`.
- [ ] Designer form (file upload) submits to `https://api.steklodush-spb.ru/api/designers/upload`.
- [ ] Cards upload form submits to `https://api.steklodush-spb.ru/api/cards/upload`.
- [ ] Articles upload form submits to `https://api.steklodush-spb.ru/api/articles`.
- [ ] Validation errors show correct messages.
- [ ] API endpoints return expected JSON (no 4xx/5xx).
- [ ] Rate limits / abuse protection configured if needed.

## Analytics & Monitoring
- [ ] Analytics tag present and firing (GA/CF/Webvisor).
- [ ] Error tracking configured (Sentry or equivalent) if used.
- [ ] Uptime check configured for main domain.

## Performance
- [ ] Lighthouse Performance >= 90 on home page (mobile).
- [ ] Largest images are optimized and lazy-loaded.
- [ ] Fonts are self-hosted or preloaded if needed.

## Content QA
- [ ] All phone numbers, addresses, and prices verified.
- [ ] Primary CTAs lead to correct sections/pages.
- [ ] No placeholder text remains.
