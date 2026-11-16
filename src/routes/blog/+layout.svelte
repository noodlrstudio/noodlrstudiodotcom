<script>
  import { base } from '$app/paths';
  import Logo from '$lib/Logo.svelte';
  import '$lib/blog/blog.css';
  let { children } = $props();
</script>

<div class="devlog">
  <header class="log-header log-wrap">
    <Logo />
    <nav aria-label="Studio"><a href={`${base}/blog/`}>Devlog</a><a href="https://noodlr.xyz">Open noodlr ↗</a></nav>
  </header>
  {@render children()}
  <footer class="log-footer log-wrap">
    <a href={`${base}/`}>noodlr Studio</a>
    <a href={`${base}/blog/`}>Devlog</a>
  </footer>
</div>
