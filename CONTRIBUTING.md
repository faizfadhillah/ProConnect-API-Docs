# Contributing

How to make and ship changes to the ProConnect API documentation site.
For background, read [README.md](./README.md) and [ARCHITECTURE.md](./ARCHITECTURE.md) first.

## Setup

```bash
git clone https://github.com/faizfadhillah/ProConnect-API-Docs.git
cd ProConnect-API-Docs
npm install
npm start          # http://localhost:3000
```

Requires Node.js 18+ (CI uses Node 20).

## Golden rule

> **Do not hand-edit auto-generated pages.** Anything under `docs/` *except* `docs/intro.md`
> and `docs/getting-started/` is regenerated from the API spec and your edits will be overwritten
> by the next sync. To change that content, change the generator or the source API.

## Common changes

### Edit the intro or a Getting Started page
These are hand-authored. Edit the Markdown directly and open a PR:
- `docs/intro.md`
- `docs/getting-started/authentication.md`
- `docs/getting-started/base-url.md`
- `docs/getting-started/errors.md`
- `docs/getting-started/pagination.md`

### Refresh the API reference after a backend change
```bash
npm run generate-docs      # pulls the live spec and rewrites the generated pages
npm start                  # eyeball the result
```
(You usually don't need to do this manually — the scheduled sync handles it.)

### Add a new API section
1. Add an entry to `TAG_MAP` in `scripts/fetch-swagger.js`:
   ```js
   'spec-tag-name': { dir: 'folder', file: 'page', title: 'Human Title', desc: 'One-line description.' },
   ```
2. Add the page path to the right category in `sidebars.js` (e.g. `'folder/page'`).
3. Regenerate: `npm run generate-docs`.

### Change the look & feel
- Colors, fonts, spacing, badges: `src/css/custom.css` (CSS variables are at the top).
- Navbar / footer links, site title, URLs: `docusaurus.config.js`.
- Footer layout/content: `src/theme/Footer/index.js`.

## Before you open a PR

```bash
npm run build      # MUST pass — this is what CI runs and what blocks deploys
npm run serve      # preview the production build
```

A failed `npm run build` is almost always an **MDX** problem (a raw `<`, `>`, or `{` in content).
For generated pages this is handled by `mdxSafe()` in the generator; for hand-written pages,
wrap such characters in backticks or escape them.

## Branching & PRs

- Create a feature branch: `git checkout -b your-change`.
- Keep commits focused; write a clear message (e.g. `docs: clarify pagination defaults`).
- Open a PR against `main`. Merging to `main` triggers a build and (when Pages is enabled) a deploy.
- If your PR only touches generated pages, prefer changing the **generator** instead.

## Commit message style

Use a short, conventional prefix where it helps:
- `docs:` content changes
- `feat:` / `fix:` generator or site behavior
- `style:` design / CSS
- `ci:` workflow changes

## What not to commit

- **Secrets / tokens** of any kind. CI uses the built-in `GITHUB_TOKEN`; cross-repo triggers use
  GitHub Actions secrets configured in repo settings.
- Build artifacts (`build/`, `.docusaurus/`) and `node_modules/` — already git-ignored.
- `openapi-spec.json` — a local cache, intentionally git-ignored.

## Questions

cs@proconnectcareer.com
