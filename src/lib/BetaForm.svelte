<script>
  import { onMount } from 'svelte';

  export let formId = 'xrpewozr';

  /** @type {HTMLFormElement} */
  let form;
  let sent = false;

  // The form posts to Formspree as plain HTML. When JS is available,
  // @formspree/ajax takes over so people stay on the page.
  onMount(() => {
    /** @type {{ destroy: () => void } | undefined} */
    let handle;
    let gone = false;
    import('@formspree/ajax').then(({ initForm }) => {
      if (gone) return;
      handle = initForm({
        formElement: form,
        formId,
        useDefaultStyles: false,
        onSuccess: () => (sent = true)
      });
    });
    return () => {
      gone = true;
      handle?.destroy();
    };
  });
</script>

<form bind:this={form} action="https://formspree.io/f/{formId}" method="POST" class:sent>
  <input type="hidden" name="_subject" value="New Noodlr beta signup" />
  <label class="hp" aria-hidden="true">Leave this empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" /></label>

  <div class="fields">
    <label for="beta-name">Name
      <input id="beta-name" name="name" autocomplete="name" required placeholder="Your name" data-fs-field />
      <span class="err" data-fs-error="name"></span>
    </label>
    <label for="beta-email">Email
      <input id="beta-email" name="email" type="email" autocomplete="email" required placeholder="you@example.com" data-fs-field />
      <span class="err" data-fs-error="email"></span>
    </label>
    <label for="beta-role">I'm mostly a…
      <select id="beta-role" name="role" data-fs-field>
        <option>Musician or band</option>
        <option>Producer</option>
        <option>Educator</option>
        <option>Plugin developer</option>
        <option>Just curious</option>
      </select>
    </label>
    <button type="submit" data-fs-submit-btn>Count me in</button>
  </div>

  <div class="msg err-box" data-fs-error role="alert">That didn't go through. Check your details and try again.</div>
  <div class="msg ok" data-fs-success role="status">You're on the list. We'll email you when your invite is ready.</div>
</form>

<style>
  form { display: grid; gap: 10px; }
  .fields { display: grid; gap: 10px; }
  form.sent .fields { display: none; }
  label { display: grid; gap: 6px; font: 600 11px/1 var(--mono); letter-spacing: .06em; text-transform: uppercase; color: var(--soft); }
  input, select { font: 500 16px/1.2 var(--body); color: var(--ink); background: #f6efe1; border: 2px solid var(--ink); border-radius: 14px; padding: 12px 14px; }
  form :global(input[aria-invalid='true']) { border-color: #c2412b; }
  button { height: 48px; border-radius: 24px; border: 2px solid var(--ink); background: var(--ink); color: var(--cream); font: 600 15px/1 var(--body); cursor: pointer; }
  button:disabled { opacity: .6; cursor: progress; }
  .err { font: 500 13px/1.3 var(--body); text-transform: none; letter-spacing: 0; color: #c2412b; }
  .msg { padding: 14px; border-radius: 14px; font-weight: 600; }
  .err-box { background: #ffd9cf; color: #6b1d0f; }
  .ok { background: var(--mint); color: var(--ink); }
  [data-fs-error]:not([data-fs-active]), [data-fs-success]:not([data-fs-active]) { display: none; }
  .hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
</style>
