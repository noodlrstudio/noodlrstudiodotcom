<script>
  import { onMount } from 'svelte';

  const scriptUrl = 'https://eocampaign1.com/form/8a288f50-d60d-11f1-ba1c-2be2e501fef4.js';
  const formId = '8a288f50-d60d-11f1-ba1c-2be2e501fef4';

  /** @type {HTMLDivElement} */
  let mount;

  onMount(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = scriptUrl;
    script.dataset.form = formId;
    mount.appendChild(script);

    return () => script.remove();
  });
</script>

<div class="email-octopus-shell" bind:this={mount} aria-label="Early access signup"></div>

<style>
  .email-octopus-shell { min-height: 140px; }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"].inline-container) { max-width: none !important; width: 100%; background: transparent !important; }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] .nurture-container) { display: block !important; background: transparent !important; }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] .nurture-container > .align-mid:first-child),
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] .nurture-container > .align-mid:first-child > .p-3) { padding: 0 !important; background: transparent !important; }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] .nurture-container > .align-mid:nth-child(2)) { display: none !important; }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] [eo-block="title"]),
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] [eo-block="text"]),
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] [eo-block="social-follow"]),
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] [eo-block="powered-by"]) { display: none !important; }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] .emailoctopus-form-wrapper) { margin: 0 !important; }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] form) { display: grid; gap: 10px; }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] .emailoctopus-form-row) { margin: 0 !important; }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] input:not([type="submit"])) { width: 100%; box-sizing: border-box; font: 500 16px/1.2 var(--body) !important; color: var(--ink) !important; background: #f6efe1 !important; border: 2px solid var(--ink) !important; border-radius: 14px !important; padding: 12px 14px !important; }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] input:not([type="submit"]):focus) { outline: 3px solid color-mix(in srgb, var(--mint) 55%, transparent); outline-offset: 2px; }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] input[type="submit"]) { height: 48px !important; border-radius: 24px !important; border: 2px solid var(--ink) !important; background: var(--ink) !important; color: var(--cream) !important; font: 600 15px/1 var(--body) !important; cursor: pointer; }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] input[type="submit"]:hover) { background: var(--green) !important; border-color: var(--green) !important; }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] .emailoctopus-success-message) { padding: 14px; border-radius: 14px; background: var(--mint); color: var(--ink); font: 600 15px/1.3 var(--body); }
  :global([data-form="8a288f50-d60d-11f1-ba1c-2be2e501fef4"] .emailoctopus-error-message) { margin: 0; color: #c2412b; font: 500 13px/1.3 var(--body); }
</style>
