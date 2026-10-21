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

## Beta signup form

`src/lib/BetaForm.svelte` posts to Formspree (form `xrpewozr`). It works in two layers:

- **Without JavaScript** the form is a plain HTML `POST` to `https://formspree.io/f/xrpewozr`, so signups still arrive.
- **With JavaScript** `@formspree/ajax` takes over in `onMount`: it submits in the background, disables the button while sending, shows field errors next to the inputs, and swaps the fields for a success message.

The form sends `name`, `email` and `role`, plus Formspree's `_subject` (email subject line) and `_gotcha` (honeypot spam trap). Manage submissions, notification emails and spam settings in the Formspree dashboard. Add a privacy-policy link before collecting a larger mailing list.

## Board previews

The node previews on the homepage are Svelte recreations of Noodlr Board nodes, in `src/lib/board/`. Colours, ports and cable styling mirror the board app's own tokens. Edit `Node.svelte` to change a node, and `+page.svelte` to rearrange a board.

## Things to customise

- Replace `hello@noodlr.xyz` if that mailbox is not active.
- Add a real social preview image (`static/og-image.jpg`) and corresponding `og:image` meta tag.
- Update the Bristol / Newport line if you prefer a single company location.
- Connect analytics only after adding consent/privacy wording appropriate to your setup.
