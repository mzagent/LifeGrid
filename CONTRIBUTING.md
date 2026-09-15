# Contributing

Thanks for your interest in contributing — this file explains how to work with the static frontend and Vercel Function backend in this repository.

Project layout (short):
- `index.html`, `app.js`, `styles.css` — frontend static UI and preview.
- `data/` — device and country presets (`devices.js`, `countries.js`).
- `api/` — Vercel Function entry point.
- `api/_lib/` — shared wallpaper generation and validation source.

## Quick start — clone & branch

1. Fork the repo on GitHub and clone your fork locally.
2. Create a branch with a descriptive name, e.g. `feat/add-device-preset` or `fix/svg-rendering`.

```bash
git checkout -b feat/your-feature
```

## Running the app locally

```bash
npm install
npm test
npx vercel dev
```

The UI loads presets from `data/devices.js` and `data/countries.js`.

You can exercise the function with the `/generate` endpoint. Example:

```
GET /generate?country=us&type=year&bg=000000&accent=FFFFFF&width=1179&height=2556
```

## Editing data presets

- `data/devices.js`: add or update device objects (name, width, height, dpi). Follow existing format and keep entries sorted when possible.
- `data/countries.js`: timezone / country presets. Ensure ISO codes match the API usage.

When changing presets, verify the UI loads them and the preview renders correctly (open `index.html`).

## Working on the generator code

- Main logic: `api/_lib/index.js`
- Utilities: `api/_lib/timezone.js`, `api/_lib/validation.js`
- SVG generation helpers: `api/_lib/svg.js` and `api/_lib/generators/*.js`

If you modify the generator, test locally via `npx vercel dev` and validate responses (SVG or PNG) using `curl` or the browser. Example:

```bash
curl "http://127.0.0.1:3000/generate?country=us&type=year&width=1179&height=2556" --output sample.png
```

## Tests

Run the centralized test suite with `npm test`.

## Pull request checklist

- [ ] Branch name describes the change (use `feat/` / `fix/` / `docs/`).
- [ ] Description explains the problem and solution.
- [ ] Small, focused commits with clear messages.
- [ ] Update `data/` or `README.md` if relevant.
- [ ] If you touched the generator, verify `npx vercel dev` and the `/generate` endpoint work.

## How to file good issues

A high-quality issue usually includes:

- Short title and description
- Steps to reproduce or sample URL for the `/generate` endpoint
- Expected vs actual behavior
- Screenshots, logs, or example params

Suggested labels: `good first issue`, `help wanted`, `area: frontend|api|data|docs`, `difficulty: easy|medium|hard`.

## Code style & best practices

- Keep changes small and focused.
- Follow existing JS style (ES modules, descriptive names).
- Add inline comments for non-obvious algorithmic code (especially in generators).
- When editing SVG output, include visual examples/screenshots in the PR description.

## Security & secrets

- Do not commit API keys or Vercel secrets. This project requires no application secrets by default.

```bash
# to set a future secret
npx vercel env add MY_SECRET
```

## Communication & Code of Conduct

Be respectful and follow `CODE_OF_CONDUCT.md`. If you have questions, open an issue and mention a maintainer.

## Thank you

Thanks for helping improve LifeGrid — every contribution is appreciated.
