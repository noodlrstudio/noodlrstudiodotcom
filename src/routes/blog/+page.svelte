<script>
  import { base } from '$app/paths';
  import { posts, formatDate } from '$lib/blog/posts';
  import PatchFigure from '$lib/blog/PatchFigure.svelte';
</script>

<svelte:head>
  <title>Devlog · noodlr Studio</title>
  <meta name="description" content="Notes from building noodlr Board, with measurements, diagrams and the trade-offs behind the work." />
  <link rel="canonical" href="https://noodlr.studio/blog/" />
</svelte:head>

<main class="log-wrap log-index">
  <p class="kicker">noodlr Board</p>
  <h1>Devlog</h1>
  <p class="intro">Notes from building noodlr Board. What changed, what we measured, and what we’re trying next.</p>
  <div class="featured"><PatchFigure /></div>
  <section aria-label="Devlog posts">
    {#each posts as post (post.slug)}
      <article class="post-row">
        <p class="kicker"><time datetime={post.date}>{formatDate(post.date)}</time> · {post.topic}</p>
        <h2><a href={`${base}/blog/${post.slug}/`}>{post.title} <span aria-hidden="true">↗</span></a></h2>
        <p>{post.summary}</p>
      </article>
    {/each}
  </section>
</main>
