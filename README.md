# Noodlr Studio site

A static SvelteKit site for Noodlr Studio Ltd and Noodlr Board, designed for GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push a commit. The included workflow builds and deploys the site.

The Svelte config automatically adds the repository-name base path for project pages. Repositories named `username.github.io` use `/`.

## Early access signup form

`src/lib/BetaForm.svelte` renders the Noodlr-styled early-access form and submits to EmailOctopus form `8a288f50-d60d-11f1-ba1c-2be2e501fef4`. Manage subscribers, confirmation emails and spam settings in the EmailOctopus dashboard. Add a privacy-policy link before collecting a larger mailing list.

## Board previews

The node previews on the homepage are Svelte recreations of Noodlr Board nodes, in `src/lib/board/`. Colours, ports and cable styling mirror the board app's own tokens. Edit `Node.svelte` to change a node, and `+page.svelte` to rearrange a board.

## Things to customise

- Replace `hello@noodlr.xyz` if that mailbox is not active.
- Add a real social preview image (`static/og-image.jpg`) and corresponding `og:image` meta tag.
- Update the Bristol / Newport line if you prefer a single company location.
- Connect analytics only after adding consent/privacy wording appropriate to your setup.
