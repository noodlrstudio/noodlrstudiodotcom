<script>
  import Logo from '$lib/Logo.svelte';
  import Board from '$lib/Board.svelte';
  let open = false;
  let menu = false;
</script>

<svelte:head>
  <title>Noodlr Studio — Play before. Plan after. Make more music together.</title>
  <meta name="description" content="Noodlr is a creative board for musicians — a playful place for ideas before the DAW, and a practical place for everything that comes after." />
  <meta property="og:title" content="Noodlr Studio — Music that lives outside the DAW" />
  <meta property="og:description" content="Play before. Plan after. Make more music together." />
</svelte:head>

<div id="top" class="page">
  <header>
    <Logo />
    <nav class:show={menu} aria-label="Main navigation">
      <a href="#play" on:click={() => menu=false}>Play</a>
      <a href="#plan" on:click={() => menu=false}>Plan</a>
      <a href="#studio" on:click={() => menu=false}>Studio</a>
    </nav>
    <button class="join small" on:click={() => open=true}>Join the crew <span>↗</span></button>
    <button class="menu" aria-label="Toggle menu" on:click={() => menu=!menu}>{menu ? '×' : '≡'}</button>
  </header>

  <main>
    <section class="hero">
      <div class="eyebrow"><span></span> Creative boards for musicians</div>
      <h1>Music that lives<br/><em>outside</em> the DAW.</h1>
      <p class="lede">A place to <b>play</b> before production.<br/>A place to <b>plan</b> what happens next.</p>
      <button class="join hero-cta" on:click={() => open=true}>Join the crew <span>↗</span></button>
      <div class="scroll">SCROLL TO NOODLE <span>↓</span></div>
    </section>

    <section class="board-stage" aria-label="Noodlr board concept preview">
      <Board />
      <div class="stamp">PRIVATE<br/>BETA<br/>2026</div>
    </section>

    <section class="statement">
      <p>DAWs are brilliant.</p>
      <h2>We’re building the missing space around them.</h2>
    </section>

    <section id="play" class="mode mode-play">
      <div class="mode-label"><b>01</b><span>PLAY</span></div>
      <div class="mode-copy">
        <div class="orbital" aria-hidden="true"><i></i><i></i><i></i></div>
        <h2>Catch the spark<br/>before it disappears.</h2>
        <p>Loops. Voice notes. Whistles. MIDI noodles.<br>Capture the Genius + Share with the people you trust.</p>
        <span class="micro">NO TIMELINE REQUIRED</span>
      </div>
    </section>

    <section id="plan" class="mode mode-plan">
      <div class="mode-label"><b>02</b><span>PLAN</span></div>
      <div class="mode-copy">
        <div class="plan-object" aria-hidden="true"><span>release</span><span>show</span><span>share</span></div>
        <h2>Get your music<br/>out into the world.</h2>
        <p>Shape the release. Find the room. Gather the assets. Keep artists + crew moving together.</p>
        <span class="micro">MORE CLIPPY, LESS CORPORATE</span>
      </div>
    </section>

    <section id="studio" class="studio">
      <div>
        <span class="kicker">NOODLR STUDIO LTD · BRISTOL</span>
        <h2>Built with love in Bristol</h2>
      </div>
      <p>Musicians, mates + long-time collaborators designing a more thoughtful approach to music making.</p>
    </section>

    <section class="finale">
      <span>PRIVATE BETA</span>
      <h2>Play more.<br/>Create more.<br/><i>Share more.</i></h2>
      <button class="join inverse" on:click={() => open=true}>Join the crew <span>↗</span></button>
    </section>
  </main>

  <footer>
    <Logo compact={true} />
    <p>© 2026 Noodlr Studio Ltd.</p>
    <a href="mailto:noodlr.music@gmail.com">Get in touch</a>
  </footer>
</div>

{#if open}
  <div class="modal-wrap" role="presentation" on:click={(e) => e.currentTarget === e.target && (open=false)}>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="join-title">
      <button class="close" aria-label="Close" on:click={() => open=false}>×</button>
      <span class="kicker">COME MAKE SOME NOISE</span>
      <h2 id="join-title">Join the crew.</h2>
      <p>Get private beta invitations, occasional studio notes and first dibs on Noodlr events.</p>
      <form action="https://formsubmit.co/noodlr.music@gmail.com" method="POST">
        <input type="hidden" name="_subject" value="New Noodlr crew signup" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <label>Name<input name="name" autocomplete="name" required placeholder="Your name" /></label>
        <label>Email<input name="email" type="email" autocomplete="email" required placeholder="you@example.com" /></label>
        <label>I’m interested in
          <select name="interest">
            <option>Private beta testing</option><option>Noodlr events</option><option>Both, obviously</option><option>Just keeping an eye on you</option>
          </select>
        </label>
        <button class="submit" type="submit">Count me in <span>↗</span></button>
      </form>
      <small>Low volume. No spam. Unsubscribe whenever.</small>
    </div>
  </div>
{/if}

<style>
  :global(*){box-sizing:border-box} :global(html){scroll-behavior:smooth} :global(body){margin:0;background:var(--paper);color:var(--ink);font-family:Inter,Arial,sans-serif} :global(:root){--paper:#efeee9;--ink:#171815;--orange:#ef633d;--yellow:#f0bd47;--green:#188b6a;--mono:"SFMono-Regular",Consolas,"Liberation Mono",monospace}
  :global(button),:global(input),:global(select){font:inherit} .page{overflow:hidden} header{height:86px;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(1.25rem,4vw,4rem);position:absolute;z-index:10;width:100%} nav{display:flex;gap:2rem} nav a,footer a{color:inherit;text-decoration:none;font:600 .68rem/1 var(--mono);text-transform:uppercase;letter-spacing:.08em} nav a:hover{text-decoration:underline;text-underline-offset:5px}.join{border:1px solid var(--ink);background:var(--ink);color:var(--paper);padding:.9rem 1.15rem;border-radius:999px;font:700 .68rem/1 var(--mono);text-transform:uppercase;letter-spacing:.045em;cursor:pointer;transition:transform .2s,box-shadow .2s}.join:hover{transform:translateY(-2px);box-shadow:0 6px 0 var(--orange)}.join span,.submit span{margin-left:.8rem}.menu{display:none;border:0;background:none;font-size:1.5rem}.hero{min-height:720px;height:100svh;padding:clamp(9rem,17vh,13rem) clamp(1.25rem,7vw,7rem) 4rem;position:relative}.eyebrow,.kicker,.micro,.scroll{font:650 .62rem/1 var(--mono);letter-spacing:.12em;text-transform:uppercase}.eyebrow{display:flex;align-items:center;gap:.6rem}.eyebrow span{width:8px;height:8px;border-radius:50%;background:var(--orange);box-shadow:0 0 0 5px rgba(239,99,61,.15)}h1{font-size:clamp(4.25rem,10.8vw,10.5rem);line-height:.78;letter-spacing:-.09em;margin:5vh 0 0;max-width:1150px;font-weight:720}h1 em{font-family:Georgia,serif;font-weight:400;color:var(--orange)}.lede{font-size:clamp(1rem,1.55vw,1.4rem);line-height:1.45;margin:3rem 0 2rem;max-width:470px;letter-spacing:-.025em}.hero-cta{display:none}.scroll{position:absolute;bottom:2.5rem;right:clamp(1.25rem,4vw,4rem);writing-mode:vertical-rl;display:flex;gap:.8rem}.board-stage{position:relative;padding:8vw clamp(1.2rem,8vw,9rem);background:#d5d4cd;min-height:760px;display:grid;place-items:center}.stamp{position:absolute;left:4vw;bottom:3vw;width:80px;height:80px;border:1px solid var(--ink);border-radius:50%;display:grid;place-items:center;text-align:center;font:700 .6rem/1.25 var(--mono);transform:rotate(-10deg)}.statement{padding:12vw max(1.25rem,8vw);display:grid;grid-template-columns:1fr 2fr;gap:3rem;align-items:start}.statement p{font:650 .68rem/1.5 var(--mono);text-transform:uppercase;max-width:220px}.statement h2,.mode h2,.studio h2,.finale h2,.modal h2{font-size:clamp(2.7rem,6vw,6.7rem);line-height:.92;letter-spacing:-.065em;margin:0}.mode{min-height:820px;display:grid;grid-template-columns:90px 1fr;border-top:1px solid rgba(23,24,21,.25)}.mode-label{border-right:1px solid rgba(23,24,21,.25);padding:2rem 0;display:flex;align-items:center;justify-content:space-between;flex-direction:column;font:700 .66rem/1 var(--mono)}.mode-label span{writing-mode:vertical-rl;letter-spacing:.2em}.mode-copy{position:relative;padding:clamp(5rem,12vw,10rem) clamp(1.5rem,10vw,11rem);overflow:hidden}.mode-copy h2{position:relative;z-index:2;max-width:820px}.mode-copy p{position:relative;z-index:2;font-size:clamp(1rem,1.5vw,1.25rem);line-height:1.55;max-width:520px;margin:2rem 0 4rem}.micro{position:relative;z-index:2;border:1px solid;padding:.55rem .7rem}.mode-play{background:var(--yellow)}.orbital{position:absolute;width:min(50vw,590px);aspect-ratio:1;right:-5%;top:50%;transform:translateY(-50%);border:1px solid;border-radius:50%}.orbital:before,.orbital:after{content:'';position:absolute;inset:16%;border:1px solid;border-radius:50%}.orbital:after{inset:34%}.orbital i{position:absolute;width:18px;height:18px;background:var(--orange);border-radius:50%;animation:orbit 12s linear infinite;left:calc(50% - 9px);top:-9px;transform-origin:9px calc(50% + 9px)}.orbital i:nth-child(2){animation-duration:17s;inset:16%;top:calc(16% - 9px);left:calc(50% - 9px)}.orbital i:nth-child(3){animation-duration:8s;animation-direction:reverse;top:calc(34% - 9px)}@keyframes orbit{to{transform:rotate(360deg)}}.mode-plan{background:#1c1d19;color:var(--paper)}.mode-plan .mode-label{border-color:rgba(239,238,233,.25)}.plan-object{position:absolute;right:8%;top:50%;transform:translateY(-50%) rotate(-6deg);width:min(38vw,430px);aspect-ratio:.77;background:#ecebe5;color:var(--ink);padding:2rem;border-radius:8px;box-shadow:18px 18px 0 var(--orange)}.plan-object span{display:block;padding:1.25rem 0;border-bottom:1px solid;font:700 1rem/1 var(--mono);text-transform:uppercase}.plan-object span:before{content:'□';margin-right:1rem}.studio{padding:10vw max(1.25rem,8vw);display:grid;grid-template-columns:1.5fr 1fr;gap:5rem;align-items:end}.studio .kicker{display:block;margin-bottom:2rem}.studio p{font-size:clamp(1.1rem,1.9vw,1.55rem);line-height:1.45;letter-spacing:-.03em;max-width:510px}.finale{background:var(--orange);min-height:750px;padding:10vw max(1.25rem,8vw);position:relative}.finale>span{font:700 .65rem/1 var(--mono);letter-spacing:.15em}.finale h2{font-size:clamp(4rem,10vw,10rem);margin:3rem 0 4rem}.finale h2 i{font-family:Georgia,serif;font-weight:400}.inverse{background:var(--paper);color:var(--ink)}footer{padding:2rem clamp(1.25rem,4vw,4rem);display:flex;align-items:center;justify-content:space-between;font:600 .65rem/1 var(--mono)}.modal-wrap{position:fixed;z-index:100;inset:0;background:rgba(23,24,21,.64);backdrop-filter:blur(8px);display:grid;place-items:center;padding:1rem}.modal{position:relative;width:min(100%,590px);max-height:94vh;overflow:auto;background:var(--paper);padding:clamp(2rem,6vw,4rem);border-radius:18px;box-shadow:12px 12px 0 var(--orange)}.modal h2{font-size:clamp(3rem,7vw,5rem);margin:1.2rem 0}.modal p{line-height:1.55}.close{position:absolute;right:1rem;top:1rem;border:1px solid;border-radius:50%;width:38px;height:38px;background:transparent;font-size:1.35rem;cursor:pointer}.modal form{display:grid;gap:1rem;margin:2rem 0 1rem}.modal label{font:700 .58rem/1 var(--mono);text-transform:uppercase;letter-spacing:.08em}.modal input,.modal select{display:block;width:100%;margin-top:.5rem;padding:1rem;border:1px solid;border-radius:8px;background:transparent}.submit{padding:1rem;background:var(--ink);color:var(--paper);border:0;border-radius:8px;font:700 .7rem/1 var(--mono);text-transform:uppercase;cursor:pointer}.modal small{font:500 .55rem/1.4 var(--mono);opacity:.6}
  @media(max-width:760px){header{height:72px}.small,header nav{display:none}.menu{display:block}.show{display:flex;position:absolute;top:65px;left:1rem;right:1rem;background:var(--paper);border:1px solid;padding:1.3rem;justify-content:space-around;border-radius:10px}.hero{min-height:650px}.hero-cta{display:inline-block}.scroll{display:none}.board-stage{min-height:530px}.stamp{display:none}.statement{grid-template-columns:1fr;padding-block:7rem}.mode{grid-template-columns:54px 1fr;min-height:700px}.mode-copy{padding:6rem 1.5rem}.orbital,.plan-object{opacity:.24;width:85vw;right:-35%}.mode-copy p{max-width:85%}.studio{grid-template-columns:1fr;gap:2rem;padding-block:7rem}.finale{min-height:650px;padding-top:7rem}footer{align-items:flex-start;gap:1rem;flex-wrap:wrap}}
  @media(prefers-reduced-motion:reduce){:global(html){scroll-behavior:auto}.orbital i{animation:none}.join{transition:none}}
</style>
