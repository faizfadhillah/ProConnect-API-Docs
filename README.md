# ProConnect API Docs

A static, Stripe-style reference for the ProConnect API. Generated from the
upstream NestJS source so the surface stays in sync with what the platform
ships.

## What's inside

- **`index.html`** – Single-page documentation site with a sticky 3-column
  layout (sidebar nav, content, code samples).
- **`css/styles.css`** – ProConnect-branded theme (deep navy + electric blue +
  emerald), Inter for prose, JetBrains Mono for code.
- **`js/app.js`** – Renders the API reference from the JSON dataset, plus
  client-side search (`/`), hash routing, code-tab switching, copy buttons,
  scroll-spy, and animated metrics.
- **`assets/endpoints.json`** – 423 endpoints across 72 controllers, pulled
  from the controller decorators in the upstream source.
- **`assets/logo.svg` / `assets/favicon.svg`** – ProConnect mark.

## Local preview

Because `js/app.js` fetches `assets/endpoints.json`, the site needs to be
served via HTTP (not opened from `file://`).

```bash
# Pick any static server
python3 -m http.server 4000
# or
npx serve .
```

Then open <http://localhost:4000>.

## Sections

1. **Get Started** – Introduction, Quickstart, Authentication, Response
   envelope, Errors, Search & pagination, Rate limits, Versioning.
2. **Core flows** – End-to-end recipes (sign up, multi-role accounts, apply
   for a job, publish a job).
3. **API Reference** – Every endpoint, grouped by domain (User, Job, Company,
   Master Data, Social, System).
4. **Resources** – SDKs, Webhooks, Changelog, Support.

## Regenerating `endpoints.json`

The dataset is produced by walking each `*.controller.ts` in the upstream
[ProConnect API](https://github.com/Ogah-Rugi/ProConnect-API) repo and
extracting `@Controller`, `@ApiTags`, `@Get/@Post/@Put/@Patch/@Delete` and
`@ApiOperation({ summary })` decorators. To rebuild:

```bash
node scripts/extract.js path/to/proconnect-api > assets/endpoints.json
```

## Deployment

The site is fully static — drop it into any host. It is configured to work on
GitHub Pages; the upstream API already allows the `https://faizfadhillah.github.io`
origin in CORS.
