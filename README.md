# Noodlr Studio teaser site

A static SvelteKit site for Noodlr Studio Ltd, designed for GitHub Pages.

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

## Join the Crew form

The form currently posts to FormSubmit using `noodlr.music@gmail.com`. On the first submission, FormSubmit emails an activation link to that address. Activate it before sharing the site publicly.

For production, consider swapping the form action for Buttondown, Loops, Mailchimp, ConvertKit or a small Supabase Edge Function. Also add a privacy-policy link before collecting a larger mailing list.

## Things to customise

- Replace `hello@noodlr.xyz` if that mailbox is not active.
- Add a real social preview image (`static/og-image.jpg`) and corresponding `og:image` meta tag.
- Update the Bristol / Newport line if you prefer a single company location.
- Connect analytics only after adding consent/privacy wording appropriate to your setup.
