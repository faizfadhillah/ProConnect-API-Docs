# Architecture

A deeper look at how this documentation site is built, generated, and kept in sync.
For the high-level overview and commands, see [README.md](./README.md).

## Big picture

This is a **Docusaurus static site** whose API-reference pages are **generated from the
ProConnect OpenAPI specification** rather than written by hand. The generation and publishing
are automated with GitHub Actions, so the site tracks the backend over time.

```
┌─────────────────────┐     deploy      ┌──────────────────────────┐
│ ProConnect API      │ ───────────────►│ /api-json                │
│ (NestJS + Swagger)  │                 │ live OpenAPI 3.0 document │
└─────────────────────┘                 └────────────┬─────────────┘
                                                      │ fetch
            cron (6h) │ manual │ repository_dispatch  │
                                                      ▼
                              ┌───────────────────────────────────┐
                              │ sync-api.yml                       │
                              │  npm run generate-docs             │
                              │   → scripts/fetch-swagger.js       │
                              │  commit docs/ if changed           │
                              └──────────────┬────────────────────┘
                                             │ workflow_run: completed (success)
                                             ▼
                              ┌───────────────────────────────────┐
                              │ deploy-pages.yml                   │
                              │  npm run build → upload → deploy   │
                              └──────────────┬────────────────────┘
                                             ▼
                                   GitHub Pages (static hosting)
```

## Components

### 1. The OpenAPI spec (source of truth)
- Served live at `https://api.proconnectcareer.com/api-json` — standard **OpenAPI 3.0.0**.
- Contains `paths` (operations), `components.schemas` (DTOs), and resource `tags`.
- The docs never hard-code endpoints; they are always derived from this document.

### 2. The generator — `scripts/fetch-swagger.js`
A plain Node.js script (no build step, only Node core modules). Pipeline:

1. **Load spec** — fetch `/api-json`, or read a local file via `--local <file>`.
2. **`buildEndpoints(spec)`** — iterate `spec.paths`; for each path + HTTP method, emit a
   normalized operation `{ method, path, summary, description, tags, parameters, requestBody, responses }`.
3. **`$ref` / `allOf` resolution** — `resolveSchema()` follows `$ref` pointers into
   `components.schemas` and merges `allOf` compositions, with cycle protection and a depth cap.
   `simplifyProp()` turns each property into a display-friendly `{ type, items, enum, description }`.
4. **Group by tag** — `TAG_MAP` maps each spec tag to a destination
   (`{ dir, file, title, desc }`). Operations are sorted GET → POST → PUT → PATCH → DELETE.
5. **Render Markdown** — `generateTagPage()` / `generateEndpointSection()` produce:
   overview table, method badges, parameter tables, request-body tables, response tables,
   collapsible example responses, and `curl` examples.
6. **MDX safety** — `mdxSafe()` escapes `<`, `>`, `{`, `}` in all free text (summaries,
   descriptions, table cells). This is essential: Docusaurus 3 parses Markdown as **MDX**,
   so an un-escaped `<` or `{` in a spec description is interpreted as JSX and **fails the build**.

> **Why the generator was rewritten:** the live `/api-json` is standard OpenAPI with a top-level
> `paths` object. An earlier version expected a non-standard `endpoints` array, so a sync against
> the real endpoint would have produced empty output. The current version parses `paths` directly.

### 3. Presentation — Docusaurus theme
- `docusaurus.config.js` wires the navbar, footer, search, syntax themes, and site URLs.
- `sidebars.js` defines the manual navigation tree (`apiSidebar`).
- `src/css/custom.css` applies the ProConnect design system via CSS variables + component overrides.
- `src/theme/Footer/index.js` is a **swizzled** Footer replaced with the branded version.
- Search is fully client-side (`@easyops-cn/docusaurus-search-local`) — no external dependency.

### 4. Automation — GitHub Actions

**`sync-api.yml`** (keep docs current)
- Triggers: `schedule` (every 6h), `workflow_dispatch`, `repository_dispatch: [api-updated]`.
- Steps: checkout → Node 20 → `npm install` → `npm run generate-docs` →
  diff `docs/` → commit & push **only when changed**.
- Permissions: `contents: write`.

**`deploy-pages.yml`** (build & publish)
- Triggers: `push` to `main`, `workflow_run` after *Sync API Documentation* completes, `workflow_dispatch`.
- Guard: on a `workflow_run` trigger it builds only if the sync **succeeded**.
- Steps: checkout `main` → Node 20 → `npm install` → `npm run build` →
  `configure-pages` → upload artifact → `deploy-pages`.
- Permissions: `pages: write`, `id-token: write`.

#### The workflow-chaining detail
A commit pushed by the Sync job uses the built-in `GITHUB_TOKEN`. GitHub deliberately prevents
such pushes from triggering further workflows (loop protection). Therefore the deploy is linked
to the sync via `workflow_run` rather than relying on the `push` trigger.

## Data flow for a typical change

1. A backend endpoint is added/changed and the API is deployed.
2. `/api-json` now reflects the change.
3. The next sync (cron, manual, or `api-updated` dispatch) runs `generate-docs`.
4. If the generated Markdown differs, the bot commits it to `main`.
5. The successful sync triggers `deploy-pages.yml`, which rebuilds and republishes.
6. The live site shows the updated reference — no manual editing.

## Constraints & decisions

- **Auto-generated pages are disposable.** Never hand-edit them; change the generator or the API.
- **MDX strictness** drives the `mdxSafe()` escaping — see above.
- **Pages hosting** requires a public repo (free plan) or a paid plan for private hosting.
- **`baseUrl`** must equal `/<repo-name>/` for a GitHub project site, or `/` for a custom domain.

## Where to look

| You want to… | File |
|--------------|------|
| Change how endpoints are rendered | `scripts/fetch-swagger.js` |
| Map a new API tag to a page | `TAG_MAP` in `scripts/fetch-swagger.js` + `sidebars.js` |
| Edit hand-written pages | `docs/intro.md`, `docs/getting-started/*` |
| Change colors / fonts / layout | `src/css/custom.css` |
| Change navbar / footer / URLs | `docusaurus.config.js`, `src/theme/Footer/index.js` |
| Change sync cadence or deploy | `.github/workflows/*.yml` |
