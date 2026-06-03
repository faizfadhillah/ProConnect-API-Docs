# ProConnect API Documentation

Documentation site for the **ProConnect API**, built with [Docusaurus 3](https://docusaurus.io/).
Most pages are **generated automatically** from the API's live OpenAPI (Swagger) specification and
kept in sync on a schedule, so the published reference stays current with the backend.

| | |
|---|---|
| **Live site** | https://faizfadhillah.github.io/ProConnect-API-Docs/ *(after the repo is public + Pages enabled)* |
| **API base URL** | https://api.proconnectcareer.com |
| **OpenAPI spec** | https://api.proconnectcareer.com/api-json |
| **Interactive Swagger UI** | https://api.proconnectcareer.com/api |
| **Spec version** | ProConnect API 0.2 · OpenAPI 3.0.0 |

ProConnect is a hospitality & career platform connecting job seekers and employers across ASEAN.
This repository is its **public API reference** — ~290 endpoints across 70+ resource groups
(users, jobs, companies, social, master data, RBAC, billing, and more).

---

## Table of contents

- [How it works](#how-it-works)
- [Tech stack](#tech-stack)
- [Repository structure](#repository-structure)
- [Local development](#local-development)
- [Content model: generated vs. hand-written](#content-model-generated-vs-hand-written)
- [The Swagger → Markdown generator](#the-swagger--markdown-generator)
- [Auto-update pipeline](#auto-update-pipeline)
- [Design system](#design-system)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Common tasks](#common-tasks)
- [Security notes](#security-notes)
- [Further reading](#further-reading)

---

## How it works

```
ProConnect API (NestJS)  ──deploy──►  /api-json  (live OpenAPI 3.0 spec)
                                            │
        triggers: every 6h cron  ·  manual  ·  repository_dispatch "api-updated"
                                            ▼
              .github/workflows/sync-api.yml   (regenerate docs)
                └─ npm run generate-docs   →   scripts/fetch-swagger.js
                └─ commit docs/  *only if the spec changed*
                                            │  on workflow completion (workflow_run)
                                            ▼
              .github/workflows/deploy-pages.yml   (rebuild + publish)
                └─ npm run build   →   upload artifact   →   deploy
                                            ▼
              GitHub Pages → https://faizfadhillah.github.io/ProConnect-API-Docs/
```

In short: when the API changes, the spec at `/api-json` changes, the scheduled (or triggered)
sync regenerates the Markdown, and a successful sync automatically rebuilds and republishes the site.

---

## Tech stack

- **[Docusaurus 3.7](https://docusaurus.io/)** — static-site generator (React 18 under the hood)
- **[@easyops-cn/docusaurus-search-local](https://github.com/easyops-cn/docusaurus-search-local)** — offline, client-side search (no external service)
- **[prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer)** — syntax highlighting (VS Code `vsLight` / `vsDark` themes)
- **Node.js 18+** (CI uses Node 20)
- **GitHub Actions** + **GitHub Pages** — sync, build, and hosting

---

## Repository structure

```
ProConnect-API-Docs/
├── .github/workflows/
│   ├── sync-api.yml          # Regenerate docs from the live Swagger spec (cron / manual / dispatch)
│   └── deploy-pages.yml      # Build the site and deploy to GitHub Pages
├── docs/                     # All documentation content (Markdown / MDX)
│   ├── intro.md              # Landing page                     (hand-authored)
│   ├── getting-started/      # Auth, base URL, errors, pagination (hand-authored)
│   ├── user-management/      # ┐
│   ├── job-management/       # │
│   ├── company-management/   # │
│   ├── social-communication/ # ├─ auto-generated from the OpenAPI spec
│   ├── master-data/          # │
│   ├── data-mappings/        # │
│   └── system-admin/         # ┘
├── scripts/
│   └── fetch-swagger.js      # OpenAPI 3.0 → Markdown generator (the heart of the repo)
├── src/
│   ├── css/custom.css        # ProConnect design system + Docusaurus theme overrides
│   └── theme/Footer/index.js # Custom branded footer (swizzled component)
├── static/img/               # Logos, favicons, social card
├── docusaurus.config.js      # Site configuration (title, navbar, footer, theme, URLs)
├── sidebars.js               # Left-hand navigation tree
├── babel.config.js
└── package.json
```

> `openapi-spec.json` is written locally by the generator for caching but is **git-ignored** — the
> source of truth is always the live `/api-json` endpoint.

---

## Local development

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server with hot reload (http://localhost:3000)
npm start

# 3. Regenerate the API docs from the live Swagger spec (optional)
npm run generate-docs

# 4. Produce a production build into ./build
npm run build

# 5. Preview the production build locally
npm run serve
```

| Script | What it does |
|--------|--------------|
| `npm start` | Dev server with hot reload |
| `npm run build` | Production build → `build/` |
| `npm run serve` | Serve the production build locally |
| `npm run generate-docs` | Fetch live spec + regenerate the auto-generated pages |
| `npm run clear` | Clear the Docusaurus cache |

To regenerate from a saved spec file instead of the network:

```bash
npm run generate-docs -- --local path/to/openapi.json
```

---

## Content model: generated vs. hand-written

There are **two kinds of pages**, and the difference matters:

| Type | Location | Edit by hand? |
|------|----------|---------------|
| **Hand-authored** | `docs/intro.md`, `docs/getting-started/*` | ✅ Yes — these are written and maintained manually |
| **Auto-generated** | every other folder under `docs/` | ❌ **No** — they are overwritten on every sync |

If you edit an auto-generated page directly, your change will be **lost** the next time the
sync workflow runs. To change generated content, update the **generator** or the **source API**
instead (see below).

The left-hand navigation is defined manually in [`sidebars.js`](./sidebars.js).

---

## The Swagger → Markdown generator

[`scripts/fetch-swagger.js`](./scripts/fetch-swagger.js) is what turns the OpenAPI spec into docs.

What it does, step by step:

1. **Fetch** the spec from `https://api.proconnectcareer.com/api-json` (or `--local <file>`).
2. **Flatten** `paths` → a list of operations, resolving `$ref` and `allOf` from
   `components.schemas` so request/response shapes are fully expanded.
3. **Group** operations by API tag using `TAG_MAP` — a table that maps each spec tag
   (e.g. `mst-companies`) to a folder, filename, human title, and description
   (e.g. `company-management/companies.md`, "Companies").
4. **Render** one Markdown page per group, including:
   - an endpoints overview table,
   - per-endpoint method badges, parameters, request-body and response tables,
   - example `curl` requests and example JSON responses.
5. **Escape** MDX-unsafe characters (`<`, `>`, `{`, `}`) in free text so spec descriptions
   like `open_date <= today` can't break the Docusaurus (MDX) build.

**Adding a new API section:** add an entry to `TAG_MAP` in `fetch-swagger.js` (tag → dir/file/title/desc),
add the file path to `sidebars.js`, and run `npm run generate-docs`.

---

## Auto-update pipeline

Two GitHub Actions workflows keep the published site in sync with the API.

### `sync-api.yml` — regenerate from Swagger
- **Triggers:** every 6 hours (cron), manual ("Run workflow"), and `repository_dispatch`
  with event type `api-updated`.
- **Does:** installs deps → `npm run generate-docs` → commits `docs/` **only if** something changed.

### `deploy-pages.yml` — build & publish
- **Triggers:** push to `main`, **after a successful Sync run** (`workflow_run`), and manual.
- **Does:** `npm run build` → upload artifact → deploy to GitHub Pages.

> **Why `workflow_run`?** When the Sync job commits with the built-in `GITHUB_TOKEN`, GitHub
> intentionally does **not** let that push trigger another workflow (to prevent loops). The
> `workflow_run` trigger is what links a successful sync to a redeploy.

### Instant updates from the ProConnect API repo (optional)
The docs repo listens for a `repository_dispatch` event named `api-updated`. To refresh the docs
the moment the API is deployed, add a step to the **API repo's** deploy workflow that calls the
GitHub dispatch API for this repo with event type `api-updated`, authenticated with a repo secret
(e.g. `DOCS_DISPATCH_TOKEN`). Store that token as a GitHub **Actions secret** — never commit it.

---

## Design system

The look is defined in [`src/css/custom.css`](./src/css/custom.css) and matches the ProConnect brand.

- **Primary color:** `#1560BD` (ProConnect blue) — with full light/dark palettes
- **Fonts:** Montserrat (headings), Roboto (body), Roboto Mono (code)
- **Dark mode:** supported, with a light/dark logo swap (`logo.svg` / `logo-white.svg`)
- **Method badges:** color-coded `GET` / `POST` / `PUT` / `PATCH` / `DELETE`
- **Status badges:** 2xx (green) / 4xx (amber) / 5xx (red)
- **Custom footer:** [`src/theme/Footer/index.js`](./src/theme/Footer/index.js) — brand logo, contact, and location
- **Code blocks:** VS Code `vsLight` / `vsDark` syntax themes
- Fully responsive (tablet, mobile, small-phone breakpoints) with print styles

---

## Configuration

Key fields in [`docusaurus.config.js`](./docusaurus.config.js):

| Field | Value | Notes |
|-------|-------|-------|
| `url` | `https://faizfadhillah.github.io` | Pages host |
| `baseUrl` | `/ProConnect-API-Docs/` | Project-site subpath — **must match the repo name** |
| `organizationName` / `projectName` | `faizfadhillah` / `ProConnect-API-Docs` | Used for deployment |
| `themeConfig.navbar` | logo, API Reference, OpenAPI Spec, GitHub, Website button | |
| `themeConfig.prism` | `vsLight` / `vsDark` | Code themes |
| search theme | `@easyops-cn/docusaurus-search-local` | Offline search |

> **Custom domain:** to serve from e.g. `docs.proconnectcareer.com`, set `url` to the domain,
> `baseUrl` to `/`, add a `static/CNAME` file, and configure the domain in repo Pages settings.

---

## Deployment

The site deploys to **GitHub Pages** via the `deploy-pages.yml` workflow (Actions build type).

**Requirement:** GitHub Pages serves a **private** repo only on a paid plan. On the free plan
the repository must be **public** for the site to publish. Once that condition is met:

1. Enable Pages with **Source: GitHub Actions** (Settings → Pages).
2. Push to `main` (or run the deploy workflow) — the site builds and publishes automatically.

After that, the auto-update pipeline keeps it fresh with no manual steps.

---

## Common tasks

- **Edit the intro or a Getting Started page:** edit the relevant file in `docs/` and commit. These are not overwritten by sync.
- **Refresh the API reference after a backend change:** run `npm run generate-docs` (or just wait for the 6-hour sync / trigger it manually).
- **Add a new API section:** add a `TAG_MAP` entry in `scripts/fetch-swagger.js`, list it in `sidebars.js`, regenerate.
- **Change branding/colors:** edit `src/css/custom.css` (CSS variables at the top).
- **Preview before publishing:** `npm run build && npm run serve`.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for step-by-step instructions and [ARCHITECTURE.md](./ARCHITECTURE.md) for a deeper technical walkthrough.

---

## Security notes

- **No secrets live in this repo.** The deploy workflow uses GitHub's built-in `GITHUB_TOKEN`.
- The optional cross-repo trigger uses a **GitHub Actions secret** (`DOCS_DISPATCH_TOKEN`) stored in the API repo — tokens must never be committed to source.
- The documented API uses **Bearer (Firebase) authentication**; all examples use placeholder tokens (`<your_access_token>`), never real credentials.
- If a token is ever exposed, rotate it in GitHub Settings → Developer settings.

---

## Further reading

- [ARCHITECTURE.md](./ARCHITECTURE.md) — how the generator and pipeline work in detail
- [CONTRIBUTING.md](./CONTRIBUTING.md) — how to make and ship changes
- [Docusaurus documentation](https://docusaurus.io/docs)

---

*Maintained for ProConnect · Questions: cs@proconnectcareer.com*
