<script>
  import { base } from '$app/paths';
  import { formatDate } from '$lib/blog/posts';
  let { data } = $props();
  let post = $derived(data.post);
  let Body = $derived(data.Body);
</script>

<svelte:head>
  <title>{post.title} · Noodlr Devlog</title>
  <meta name="description" content={post.summary} />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.summary} />
  <meta property="og:type" content="article" />
  <link rel="canonical" href={`https://noodlr.studio/blog/${post.slug}/`} />
</svelte:head>

<main class="log-wrap log-article">
  <article>
    <a class="back-link" href={`${base}/blog/`}>← All posts</a>
    <p class="kicker">Devlog {String(post.number).padStart(2, '0')} · <time datetime={post.date}>{formatDate(post.date)}</time> · {post.topic}</p>
    <h1>{post.title}</h1>
    <p class="intro">{post.summary}</p>
    <div class="log-prose"><Body /></div>
  </article>
</main>
