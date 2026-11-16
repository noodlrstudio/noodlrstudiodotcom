import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import { posts } from '$lib/blog/posts';
import type { PageLoad } from './$types';

const bodies = import.meta.glob<{ default: Component }>('/src/lib/blog/posts/*.svelte');

export const entries = () => posts.map(({ slug }) => ({ slug }));

export const load: PageLoad = async ({ params }) => {
  const post = posts.find(({ slug }) => slug === params.slug);
  if (!post) error(404, 'Devlog post not found');
  const body = bodies[`/src/lib/blog/posts/${post.slug}.svelte`];
  if (!body) throw new Error(`Missing Devlog article: ${post.slug}`);
  return { post, Body: (await body()).default };
};
