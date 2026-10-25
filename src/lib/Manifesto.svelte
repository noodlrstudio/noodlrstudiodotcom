<script>
  /** @type {HTMLDialogElement} */
  let dialog;

  export function open() {
    dialog.showModal();
  }

  /** Close when the click lands on the backdrop rather than the sheet. */
  /** @param {MouseEvent} e */
  function backdrop(e) {
    if (e.target === dialog) dialog.close();
  }

  const beliefs = [
    ['Unfinished ideas', 'have value.'],
    ['Collaboration should feel like playful interaction,', 'not managing files.'],
    ['Serious music', 'can come from playful tools.'],
    ['Creative technology should invite more people in,', 'not remind them what they don’t know.']
  ];
  const places = ['A place to play before production.', 'A place to learn by making.', 'A place to plan what comes next.'];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:click={backdrop} aria-labelledby="manifesto-title">
  <article>
    <form method="dialog"><button class="close" aria-label="Close the manifesto">×</button></form>

    <span class="k">The noodlr manifesto</span>
    <h2 id="manifesto-title">Musical ideas don’t spring into existence arranged on a timeline.</h2>
    <p class="lead">They begin with a hum, a tap on the table, a randomly named voice note, a radio snippet, a sample, or someone saying ‘hang on play that riff again…’</p>

    <p><strong>That early stage of music-making matters.</strong> It is playful, messy, social and full of possibility. It can be chaotic and liberating. But most DAWs overlook that early ideation phase, and overlook music creators who love spending time in that messy chaotic stage of music making. Instead DAWs try to rapidly funnel ideas through a rigid process of arrangement and production, before the idea has even had a chance to breathe.</p>
    <p><strong>Noodlr</strong> exists to build a better space for what happens around the ‘serious music production’ phase.</p>

    <div class="rooms">
      <div class="play"><span>Before the DAW</span><b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg>Play</b>A place to capture fragments, connect ideas, experiment with sound and collaborate without getting buried in setup.</div>
      <div class="plan"><span>After the DAW</span><b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>Plan</b>A place to organise releases, performances, artwork, collaborators and everything involved in getting music out into the world.</div>
    </div>

    <p>We love DAWs. We are the kind of music nerds who lose an afternoon to automation and MIDI routing. But DAWs can’t do everything.</p>
    <p>Music-making is not always linear. Ideas branch, collide, disappear, return and become something unexpected. Creative tools should support that. They should feel visual, flexible, joyful and a little bit toy-like.</p>
    <p>They should also be open and understandable by default: welcoming to experienced musicians, useful in education, and approachable for people still finding their way into music.</p>

    <ul class="beliefs">
      {#each beliefs as [head, tail]}<li><span>We believe</span><strong>{head}</strong> {tail}</li>{/each}
    </ul>

    <p>noodlr is a creative board for musicians: a home for musical fragments, shared experiments and the glorious mess that surrounds making something real.</p>
    <ul class="places">
      {#each places as place}<li>{place}</li>{/each}
      <li>A place for ideas to become songs, shows, records, or something nobody has named yet.</li>
    </ul>

    <p class="close-line">Music can thrive in the spaces outside the DAW. <em>Let’s make more space for it.</em></p>
  </article>
</dialog>

<style>
  dialog { width: min(760px, calc(100% - 32px)); max-height: min(88vh, 1000px); padding: 0; border: 2px solid var(--ink); border-radius: 28px; background: var(--cream); color: var(--ink); box-shadow: 18px 18px 0 var(--coral); overflow: auto; overscroll-behavior: contain; }
  dialog::backdrop { background: rgba(27, 26, 23, .62); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
  dialog[open] { animation: rise .35s cubic-bezier(.2, .9, .3, 1.2); }
  dialog[open]::backdrop { animation: fade .25s ease; }
  @keyframes rise { from { opacity: 0; transform: translateY(24px) rotate(-1deg) scale(.98); } }
  @keyframes fade { from { opacity: 0; } }
  article { position: relative; padding: clamp(28px, 6vw, 60px); background: radial-gradient(circle at 100% 0, rgba(255, 134, 82, .16), transparent 40%), radial-gradient(circle at 0 100%, rgba(0, 209, 155, .12), transparent 45%); }
  .close { position: absolute; right: 18px; top: 18px; width: 42px; height: 42px; border-radius: 50%; border: 2px solid var(--ink); background: var(--cream); font-size: 24px; line-height: 1; cursor: pointer; }
  .close:hover { background: var(--ink); color: var(--cream); }
  .k { font: 600 12px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--coral); }
  h2 { font: 800 clamp(1.9rem, 5vw, 3.2rem)/1 var(--display); letter-spacing: -.045em; margin: 14px 0 18px; max-width: 16ch; text-wrap: balance; }
  p { font-size: 1.08rem; line-height: 1.6; margin: 0 0 16px; max-width: 60ch; }
  .lead { font-size: clamp(1.15rem, 2.2vw, 1.4rem); line-height: 1.45; color: var(--soft); margin-bottom: 28px; }
  .rooms { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 28px 0; }
  .rooms div { border-radius: 20px; padding: 18px; font-size: .98rem; line-height: 1.45; }
  .rooms span { display: block; font: 600 11px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; opacity: .75; }
  .rooms b { display: flex; align-items: center; gap: 10px; font: 800 2rem/1 var(--display); letter-spacing: -.04em; margin: 8px 0 10px; }
  .rooms svg { width: 28px; height: 28px; flex: none; }
  .play { background: var(--mint); transform: rotate(-1deg); }
  .plan { background: var(--ink); color: var(--cream); transform: rotate(.8deg); }
  .plan b { color: var(--coral); }
  .beliefs { list-style: none; padding: 0; margin: 28px 0; display: grid; gap: 0; border-top: 2px solid var(--ink); }
  .beliefs li { padding: 14px 0; border-bottom: 2px solid var(--ink); font-size: 1.15rem; line-height: 1.35; }
  .beliefs span { display: block; font: 600 11px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--coral); margin-bottom: 6px; }
  .beliefs strong { font-family: var(--display); font-weight: 800; letter-spacing: -.03em; }
  .places { list-style: none; padding: 0; margin: 8px 0 28px; display: grid; gap: 6px; }
  .places li { font: 600 1.1rem/1.35 var(--body); padding-left: 26px; position: relative; }
  .places li::before { content: ''; position: absolute; left: 0; top: .45em; width: 12px; height: 12px; border-radius: 50%; background: var(--coral); box-shadow: 0 0 0 4px rgba(255, 134, 82, .22); }
  .close-line { font: 800 clamp(1.5rem, 3.6vw, 2.3rem)/1.1 var(--display); letter-spacing: -.04em; margin: 0; max-width: 20ch; }
  .close-line em { font-style: normal; color: var(--coral); }
  @media (max-width: 560px) { .rooms { grid-template-columns: 1fr; } dialog { box-shadow: 8px 8px 0 var(--coral); } }
  @media (prefers-reduced-motion: reduce) { dialog[open], dialog[open]::backdrop { animation: none; } }
</style>
