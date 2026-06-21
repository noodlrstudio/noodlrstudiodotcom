<script lang="ts">
  import { base } from '$app/paths';

  export let compact = false;
</script>

<a href={`${base}/`} class:compact aria-label="Noodlr Studio home">
  <img src={`${base}/noodlr-icon.svg`} alt="" />

  <span class="wordmark">
    noodlr<span class="dot">.</span>
  </span>
</a>

<style>
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    width: 2.15rem;
    height: 2.15rem;
    border-radius: 0.48rem;
  }

  .wordmark {
    font-size: 1.35rem;
    font-weight: 680;
    letter-spacing: -0.055em;
  }

  .dot {
    color: var(--orange);
  }

  .compact .wordmark {
    display: none;
  }
</style>