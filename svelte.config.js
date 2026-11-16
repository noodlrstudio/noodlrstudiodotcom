import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev');
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const defaultBase = repository && !repository.endsWith('.github.io') ? `/${repository}` : '';
const base = dev ? '' : (process.env.BASE_PATH ?? defaultBase);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ fallback: '404.html' }),
    paths: { base },
    prerender: { handleHttpError: 'warn' }
  }
};

export default config;
