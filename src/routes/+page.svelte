<script>
  import '$lib/board/board.css';
  import Logo from '$lib/Logo.svelte';
  import Board from '$lib/board/Board.svelte';
  import Node from '$lib/board/Node.svelte';
  import PlanRoom from '$lib/board/PlanRoom.svelte';
  import CaptureRoom from '$lib/board/CaptureRoom.svelte';
  import BetaForm from '$lib/BetaForm.svelte';
  import Manifesto from '$lib/Manifesto.svelte';
  import { audioIcon, midiIcon } from '$lib/board/icons.js';

  const testflight = 'https://testflight.apple.com/join/8TDpgyAt';
  const adc = 'https://conference.audio.dev/session/2026/spaces-outside-the-daw/';

  const rooms = [
    { id: 'capture', name: 'Capture', colour: '#ff5b4d' },
    { id: 'play', name: 'Play', colour: '#00d19b' },
    { id: 'plan', name: 'Plan', colour: '#1f6f8b' }
  ];
  let room = 'play';
  /** @type {Manifesto} */
  let manifesto;
</script>

<svelte:head>
  <title>Noodlr Studio · A musical space to Play &amp; Plan</title>
  <meta name="description" content="Noodlr is a creative board for musicians: play before production, plan what comes next, and bring your web plugins along. Join the beta." />
  <meta property="og:title" content="Noodlr · A musical space to Play &amp; Plan" />
  <meta property="og:description" content="A board for everything around the DAW. Play before. Plan after. Make more music together." />
</svelte:head>

<header class="wrap">
  <div class="inner">
    <Logo />
    <nav class="steps" aria-label="Sections">
      <a href="#input">Input</a><a href="#play">Play</a><a href="#aux">Plugins</a><a href="#daw">DAW</a><a href="#plan">Plan</a><a href="#values">Values</a><a href="#adc">ADC</a>
    </nav>
    <a class="btn line hide-sm" href={testflight} target="_blank" rel="noopener">TestFlight</a>
    <a class="btn ink" href="#join">Beta access</a>
  </div>
</header>

<main id="top">
  <section class="hero wrap">
    <div class="inner">
      <span class="k slug"><b>noodlr studio</b> your space to play + plan music.</span>
      <h1>A musical space to <span class="w-play">Play</span> &amp; <span class="w-plan">Plan</span></h1>
      <div class="hero-row">
        <p>Before production there's play: hums, loops, jams. After it there's planning: the release, the artwork, the gig. Noodlr gives both a proper home.</p>
        <div class="ctas">
          <a class="btn coral" href="#join">Sign up for beta access</a>
          <a class="btn line" href={testflight} target="_blank" rel="noopener">iOS &amp; Mac TestFlight</a>
        </div>
      </div>

      <div class="stage-frame">
        <div class="frame-bar">
          <div class="rooms" role="tablist" aria-label="Rooms">
            {#each rooms as r}
              <button role="tab" aria-selected={room === r.id} aria-controls="room-{r.id}" style="--c:{r.colour}" on:click={() => (room = r.id)}><i></i>{r.name}</button>
            {/each}
          </div>
          <span class="frame-hint">{room === 'play' ? 'Drag nodes · tap the kalimba or strum plate (sound on)' : room === 'plan' ? 'The Plan room: release + gig' : 'Capture: a quick recorder for your phone'}</span>
        </div>

        <div id="room-play" role="tabpanel" hidden={room !== 'play'}>
          <Board width={1560} height={1100} minScale={0.62} focus={0.55} label="Play room demo board"
            cables={['tape.out>looper.in1', 'whistler.mout>bass.in', 'bass.out>looper.in2', 'seq.out>kal.in', 'kal.out>looper.in3', 'web.out>beat.in', 'beat.out>looper.in4', 'strum.out>wam.in']}>
            <div class="nb-group" style="--g:#f4c64b;left:650px;top:40px;width:870px;height:440px"><span>Noodle · EP sketch</span></div>
            <Node type="tape" id="tape" x={690} y={90} sel />
            <Node type="whistler" id="whistler" x={690} y={300} />
            <Node type="synth" id="bass" x={1010} y={260} label="Bass synth" />
            <Node type="cam" id="ant" x={1050} y={80} who="Ant" tint="#52e2b8" backdrop="#1d3b34" />
            <Node type="cam" id="chris" x={1270} y={80} who="Chris" tint="#ff8652" backdrop="#3b241a" />
            <Node type="seq" id="seq" x={60} y={110} />
            <Node type="kalimba" id="kal" x={340} y={100} />
            <Node type="notepad" id="note" x={60} y={430} w={250} text="Ant: tweak the filter?<br>Chris: on it, listen now" />
            <Node type="beatbox" id="beat" x={760} y={560} />
            <Node type="looper" id="looper" x={1230} y={540} />
            <Node type="strum" id="strum" x={40} y={640} w={230} />
            <Node type="webapp" id="web" x={330} y={620} />
            <Node type="wam" id="wam" x={700} y={840} />
            <Node type="xy" id="xy" x={1280} y={800} />
            <Node type="radio" id="radio" x={960} y={870} w={260} />
          </Board>
        </div>
        <div id="room-plan" class="room-pane" role="tabpanel" hidden={room !== 'plan'}>
          <PlanRoom />
        </div>
        <div id="room-capture" class="room-pane capture-pane" role="tabpanel" hidden={room !== 'capture'}>
          <p><strong>Catch it before it disappears.</strong> Record on your phone, tag the take, add a photo or a note. It lands on the board as a Tape Loop.</p>
          <CaptureRoom />
        </div>
      </div>
    </div>
  </section>

  <div class="chain wrap">
    <div class="inner">
      <section class="stage" id="input">
        <span class="jack">{@html audioIcon}</span>
        <div class="stage-h">
          <div><span class="k">Input</span><h2>A hum. A tap on the table. A radio snippet.</h2></div>
          <p class="lede">Ideas show up anywhere. Capture them on your phone in seconds, whistle a melody into MIDI, or grab a clip off the radio.</p>
        </div>
        <div class="inputs">
          <CaptureRoom />
          <div class="stack">
            <Node type="whistler" id="in-whistler" w={300} standalone />
            <Node type="radio" id="in-radio" w={300} standalone />
          </div>
        </div>
      </section>

      <section class="stage" id="play">
        <span class="jack">{@html audioIcon}</span>
        <div class="stage-h">
          <div><span class="k">Play · before the DAW</span><h2>Shrink the time to sound.</h2></div>
          <p class="lede">An infinite canvas of instruments, loops and effects. Patch a cable and you hear it, with no setup. Invite your bandmate and play together, live, from different cities.</p>
        </div>
        <div class="boxed">
          <Board width={1100} height={520} minScale={0.6} focus={0.2} label="Live session demo board" cables={['live-bass.out>live-loop.in1', 'live-seq.out>live-bass.in']}>
            <Node type="cam" id="live-ant" x={40} y={40} who="Ant" tint="#52e2b8" backdrop="#1d3b34" />
            <Node type="cam" id="live-chris" x={250} y={40} who="Chris" tint="#ff8652" backdrop="#3b241a" />
            <Node type="seq" id="live-seq" x={40} y={240} w={200} />
            <Node type="synth" id="live-bass" x={330} y={260} label="Chris is tweaking" sel />
            <Node type="looper" id="live-loop" x={760} y={120} />
          </Board>
        </div>
        <div class="pills">
          <span><b>12</b> people in a live session</span><span>Voice + video on the board</span><span>Tape Loops play in sync</span><span>Audio + MIDI cables</span><span>25 built-in nodes</span>
        </div>
      </section>

      <section class="stage" id="aux">
        <span class="jack">{@html midiIcon}</span>
        <div class="stage-h">
          <div><span class="k">Aux in · open plugins</span><h2>Every web plugin can join the jam.</h2></div>
          <p class="lede">Noodlr is open by default. Web Audio plugins and web apps patch into the same board as ours, with the same cables.</p>
        </div>
        <div class="aux">
          <div><div class="aux-stage"><Node type="wam" id="aux-wam" standalone /></div><h3>WAM 2</h3><p>Web Audio Modules route audio through the board.</p></div>
          <div><div class="aux-stage"><Node type="cmajor" id="aux-cmajor" standalone /></div><h3>Cmajor</h3><p>Cmajor WebAudio instruments and effects, cabled like any node.</p></div>
          <div><div class="aux-stage"><Node type="webapp" id="aux-web" w={260} url="808-in-a-browser.app" standalone /></div><h3>Any web app</h3><p>The humble iframe plus <code>@noodlr/plugin-sdk</code>: board MIDI in and out, with its state saved.</p></div>
        </div>
      </section>

      <section class="stage" id="daw">
        <span class="jack">{@html audioIcon}</span>
        <div class="stage-h">
          <div><span class="k">Your DAW</span><h2>Timelines are brilliant. They're just not the only way.</h2></div>
          <p class="lede">We love DAWs, and we'll happily lose an afternoon to automation lanes. Noodlr boards will get mini timelines of their own too. But music also happens in loops, sketches, conversations and plans, so Noodlr makes space for those, either side of your DAW.</p>
        </div>
        <div class="boxed">
          <Board width={1480} height={560} minScale={0.5} focus={0} label="Play to DAW to Plan" cables={['flow-tape.out>flow-daw.in', 'flow-bass.out>flow-daw.in', 'flow-kal.out>flow-daw.in', 'flow-daw.out>flow-plan.in']}>
            <span class="tag" style="left:40px;top:28px">● Play · before</span>
            <span class="tag" style="left:730px;top:28px">Your DAW</span>
            <span class="tag" style="left:1050px;top:28px">● Plan · after</span>
            <Node type="tape" id="flow-tape" x={40} y={70} />
            <Node type="synth" id="flow-bass" x={40} y={300} label="Bass synth" />
            <Node type="kalimba" id="flow-kal" x={390} y={190} w={260} />
            <div class="nb-node daw-node" data-id="flow-daw" style="left:730px;top:200px;width:260px">
              <span class="nb-port l" data-port="in" data-type="audio" style="top:50%">{@html audioIcon}</span>
              <span class="nb-port r" data-port="out" data-type="audio" style="top:50%">{@html audioIcon}</span>
              <div class="ruler"><span>1</span><span>5</span><span>9</span><span>13</span><span>17</span></div>
              <div class="tl">
                <div><i style="left:4%;width:60%;--c:#ff8652"></i></div>
                <div><i style="left:20%;width:70%;--c:#8b82ff"></i></div>
                <div><i style="left:10%;width:30%;--c:#52e2b8"></i><i style="left:50%;width:40%;--c:#52e2b8"></i></div>
              </div>
              <div class="fname">EP track 1 FINAL FINAL v4.1</div>
            </div>
            <div class="nb-node plan-node" data-id="flow-plan" style="left:1050px;top:70px;width:400px">
              <span class="nb-port l" data-port="in" data-type="audio" style="top:50%">{@html audioIcon}</span>
              <PlanRoom keep compact />
            </div>
          </Board>
        </div>
      </section>

      <section class="stage" id="plan">
        <span class="jack">{@html audioIcon}</span>
        <div class="stage-h">
          <div><span class="k">Plan · after the DAW</span><h2>Get the music out into the world.</h2></div>
          <p class="lede">The release, the artwork vote, the gig, the setlist and the crew, on one board next to the music. No more scattering it across chats, email and whiteboards.</p>
        </div>
        <div class="boxed"><PlanRoom theme="tour" title="Release + live show" /></div>
      </section>

      <section class="stage" id="values">
        <span class="jack">{@html audioIcon}</span>
        <span class="k">Values</span>
        <h2 class="wide">Songs, shows, records, or something nobody has named yet.</h2>
        <div class="manifesto">
          <p>Unfinished ideas have value.<small>We believe</small></p>
          <p>Collaboration should feel like playing together, not managing files.<small>We believe</small></p>
          <p>Serious music can come from playful tools.<small>We believe</small></p>
          <p>Creative tech should invite more people in.<small>We believe</small></p>
        </div>
        <button class="btn ink read" on:click={() => manifesto.open()}>Read our manifesto <span aria-hidden="true">↗</span></button>
      </section>
    </div>
  </div>

  <section class="talk wrap" id="adc">
    <div class="inner talk-grid">
      <div>
        <span class="k">Audio Developer Conference 2026</span>
        <h2>Spaces outside <span>the DAW</span></h2>
        <p>What would a creative tool look like if it treated play, conversation and planning as part of making music, rather than the admin around it? Ant and Chris share their own jam-to-EP-to-gig journey, and demo two musicians in different places tweaking the same bass synth in real time.</p>
        <a class="btn coral" href={adc} target="_blank" rel="noopener">See the session on audio.dev</a>
      </div>
      <ul class="keys">
        <li><span>→</span>Minimising the time to sound</li>
        <li><span>→</span>Music is made on timelines and off them: spatial, visual, non-linear</li>
        <li><span>→</span>The spaces outside the DAW are underserved</li>
        <li><span>→</span>A web plugin ecosystem, ready to grow</li>
        <li><span>→</span>Project planning that's linked to the music</li>
      </ul>
    </div>
  </section>

  <section class="join wrap" id="join">
    <div class="inner">
      <span class="k">Private beta</span>
      <h2>Let's make more space for music.</h2>
      <div class="join-grid">
        <div class="card">
          <h3>Sign up for beta access</h3>
          <p>We're inviting musicians, educators and plugin developers in waves. Low volume, no spam.</p>
          <BetaForm />
        </div>
        <div class="card dark">
          <h3>iPhone, iPad and Mac</h3>
          <p>The same board in a native app, with CoreMIDI for your controllers. Try it today on TestFlight.</p>
          <a class="btn coral" href={testflight} target="_blank" rel="noopener">Join the TestFlight beta</a>
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="wrap">
  <div class="inner">
    <span>© 2026 Noodlr Studio Ltd · Built with love in Bristol</span>
    <span class="links"><button on:click={() => manifesto.open()}>Manifesto</button><a href="mailto:noodlr.music@gmail.com">Get in touch</a></span>
  </div>
</footer>

<Manifesto bind:this={manifesto} />

<style>
  /* Signal chain: one cable runs down the page, Input → Play → DAW → Plan → Values. */
  :global(:root) {
    --cream: #eee4d0; --cream-2: #e4d8c0; --ink: #1b1a17; --soft: #5f574b; --coral: #ff8652; --green: #00704f; --mint: #00d19b;
    --display: 'Unbounded', 'Avenir Next', sans-serif; --body: 'Figtree', 'Avenir Next', 'Segoe UI', sans-serif; --mono: 'IBM Plex Mono', 'SF Mono', Menlo, monospace;
    /* Logo.svelte's wordmark dot */
    --orange: var(--coral);
    color-scheme: light;
  }
  :global(*) { box-sizing: border-box; }
  :global([hidden]) { display: none !important; }
  :global(html) { scroll-behavior: smooth; background: var(--cream); }
  :global(body) { margin: 0; background: var(--cream); color: var(--ink); font: 400 17px/1.55 var(--body); overflow-x: hidden; }
  :global(button), :global(input), :global(select) { font: inherit; }
  :global(:focus-visible) { outline: 2px solid var(--coral); outline-offset: 3px; }
  a { color: inherit; }
  .wrap { padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
  .inner { max-width: 1240px; margin: 0 auto; }
  .k { font: 600 12px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--coral); }
  .btn { display: inline-flex; align-items: center; gap: 9px; height: 48px; padding: 0 22px; border-radius: 24px; font: 600 15px/1 var(--body); text-decoration: none; border: 2px solid var(--ink); white-space: nowrap; transition: transform .2s; }
  .btn:hover { transform: translateY(-2px); }
  .btn.ink { background: var(--ink); color: var(--cream); }
  .btn.line { background: transparent; color: var(--ink); }
  .btn.coral { background: var(--coral); border-color: var(--coral); color: var(--ink); }

  header { position: sticky; top: 0; z-index: 20; background: color-mix(in srgb, var(--cream) 90%, transparent); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
  header .inner { height: 72px; display: flex; align-items: center; gap: 16px; max-width: none; }
  .steps { display: flex; gap: 4px; margin-left: auto; font: 600 11px/1 var(--mono); }
  .steps a { padding: 9px 11px; border-radius: 16px; text-decoration: none; text-transform: uppercase; letter-spacing: .06em; }
  .steps a:hover { background: var(--cream-2); }
  @media (max-width: 1060px) { .steps { display: none; } header .inner { justify-content: space-between; } }
  @media (max-width: 520px) { .hide-sm { display: none; } header .btn { height: 40px; padding: 0 16px; font-size: 14px; } }

  /* hero */
  .hero { padding-block: clamp(30px, 5vw, 64px) 30px; }
  .hero .k { color: var(--soft); display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
  .hero .k b { background: var(--ink); color: var(--cream); padding: 6px 9px; border-radius: 12px; font-weight: 600; }
  .hero .slug { text-transform: none; letter-spacing: .02em; font-size: 13px; }
  h1 { font: 800 clamp(2.6rem, 7.4vw, 7.2rem)/1.02 var(--display); letter-spacing: -.045em; margin: 18px 0 0; text-wrap: balance; max-width: 15ch; }
  /* Play is a mint node-like sticker; Plan is coral with a hand-drawn underline. */
  .w-play { display: inline-block; background: var(--mint); padding: 0 .18em .06em; border-radius: .22em; transform: rotate(-3deg); box-shadow: .06em .06em 0 var(--ink); }
  .w-plan { color: var(--coral); background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 20' preserveAspectRatio='none'%3E%3Cpath d='M3 13 C 40 4, 70 18, 105 9 S 170 4, 197 12' fill='none' stroke='%231b1a17' stroke-width='5' stroke-linecap='round'/%3E%3C/svg%3E") bottom / 100% .22em no-repeat; padding-bottom: .1em; }
  .hero-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; margin-top: 22px; }
  .hero-row p { max-width: 46ch; margin: 0; font-size: clamp(1.05rem, 1.5vw, 1.25rem); color: var(--soft); }
  .ctas { display: flex; gap: 10px; flex-wrap: wrap; }
  .stage-frame { margin-top: 36px; border-radius: 28px; overflow: hidden; border: 2px solid var(--ink); background: #0c0c0f; }
  .frame-bar { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; padding: 12px; border-bottom: 1px solid rgba(255, 255, 255, .08); background: #151518; }
  .rooms { display: flex; gap: 3px; padding: 4px; border-radius: 26px; background: #0c0c0f; }
  .rooms button { border: 0; background: none; color: #93969e; font: 650 14px/1 var(--body); height: 36px; padding: 0 16px; border-radius: 20px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
  .rooms button i { width: 8px; height: 8px; border-radius: 50%; background: currentColor; opacity: .6; }
  .rooms button[aria-selected='true'] { background: #2a2a30; color: #f1f2f4; }
  .rooms button[aria-selected='true'] i { background: var(--c); opacity: 1; }
  .frame-hint { font: 500 12px/1.3 var(--mono); color: #93969e; }
  .room-pane { padding: clamp(16px, 3vw, 40px); }
  .capture-pane { display: flex; gap: 40px; align-items: center; justify-content: center; flex-wrap: wrap; background: radial-gradient(circle at 20% 20%, rgba(255, 91, 77, .14), transparent 50%), #0c0c0f; }
  .capture-pane p { max-width: 32ch; color: #b9bbc2; margin: 0; }
  .capture-pane strong { display: block; font: 800 1.5rem/1.15 var(--display); letter-spacing: -.03em; color: var(--cream); margin-bottom: 10px; }

  /* chain */
  .chain { position: relative; }
  .chain .inner { position: relative; }
  .chain .inner::before { content: ''; position: absolute; left: 11px; top: 0; bottom: 0; width: 3px; border-radius: 2px; background: linear-gradient(var(--coral), var(--coral) 52%, #6a6f7d 52%, #6a6f7d 62%, var(--coral) 62%); }
  .stage { position: relative; padding-block: clamp(56px, 8vw, 100px); padding-left: 48px; }
  .jack { position: absolute; left: 1px; top: clamp(56px, 8vw, 100px); width: 24px; height: 24px; border-radius: 50%; background: var(--ink); color: var(--cream); display: grid; place-items: center; box-shadow: 0 0 0 6px var(--cream); }
  .jack :global(svg) { width: 13px; height: 13px; }
  .stage-h { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap; }
  .stage h2 { font: 800 clamp(2rem, 4.8vw, 4.2rem)/1 var(--display); letter-spacing: -.04em; margin: 12px 0 0; max-width: 15ch; text-wrap: balance; }
  .stage h2.wide { max-width: 20ch; }
  .lede { max-width: 44ch; margin: 0; color: var(--soft); }
  .boxed { margin-top: 36px; border-radius: 24px; overflow: hidden; border: 2px solid var(--ink); }
  .pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
  .pills span { font: 600 13px/1 var(--body); padding: 10px 14px; border-radius: 20px; background: var(--cream-2); }
  .pills b { color: var(--green); }
  .inputs { display: flex; gap: 28px; align-items: center; flex-wrap: wrap; margin-top: 40px; }
  .stack { display: grid; gap: 18px; min-width: 0; }
  .aux { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 36px; }
  .aux > div { border-radius: 22px; background: var(--ink); color: var(--cream); padding: 22px; display: flex; flex-direction: column; gap: 14px; }
  .aux-stage { min-height: 250px; display: grid; place-items: center; }
  .aux h3 { margin: 0; font: 800 1.3rem/1 var(--display); letter-spacing: -.03em; }
  .aux p { margin: 0; color: #c9bfa9; font-size: 15px; }
  .aux code { font: 500 .9em var(--mono); color: var(--mint); }
  @media (max-width: 960px) { .aux { grid-template-columns: 1fr; } }
  #daw { background: repeating-linear-gradient(90deg, transparent 0 79px, rgba(27, 26, 23, .07) 79px 80px); }
  .tag { position: absolute; font: 600 12px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: #93969e; }
  .daw-node { background: #d9d6cf !important; color: #3a3a3a !important; border: 0 !important; padding: 14px !important; }
  .daw-node .nb-port { background: #d9d6cf; color: #55524b; }
  .ruler { display: flex; justify-content: space-between; font: 600 9px/1 var(--nb-mono); color: #7a776f; border-bottom: 1px solid #b8b5ad; padding-bottom: 5px; }
  .tl { display: grid; gap: 5px; margin-top: 10px; }
  .tl div { height: 24px; border-radius: 5px; background: #c5c2ba; position: relative; overflow: hidden; }
  .tl i { position: absolute; top: 3px; bottom: 3px; border-radius: 4px; background: var(--c); opacity: .85; }
  .fname { font: 600 11px/1.2 var(--nb-mono); margin-top: 10px; color: #55524b; }
  .plan-node { padding: 8px !important; background: #f3eee6 !important; border: 0 !important; }
  .plan-node .nb-port { background: #f3eee6; }
  .plan-node :global(.pr) { padding: 0; gap: 8px; background: transparent; }
  .plan-node :global(.pw) { padding: .7rem; grid-column: span 6; }
  .plan-node :global(.pw-banner) { min-height: 6rem; }
  .manifesto { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-top: 40px; }
  .manifesto p { margin: 0; padding: 20px; border-radius: 20px; background: var(--ink); color: var(--cream); font: 600 1.05rem/1.3 var(--body); min-height: 140px; display: flex; flex-direction: column; justify-content: space-between; gap: 16px; }
  .read { margin-top: 28px; cursor: pointer; }
  .manifesto small { font: 600 11px/1 var(--mono); color: var(--coral); letter-spacing: .08em; text-transform: uppercase; }
  @media (max-width: 960px) { .manifesto { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 520px) { .manifesto { grid-template-columns: 1fr; } .manifesto p { min-height: 0; } .stage { padding-left: 40px; } }

  /* talk */
  .talk { background: var(--ink); color: var(--cream); padding-block: clamp(64px, 9vw, 110px); }
  .talk-grid { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: 40px; align-items: start; }
  .talk h2 { font: 800 clamp(2.4rem, 6vw, 5.4rem)/.95 var(--display); letter-spacing: -.045em; margin: 16px 0 0; }
  .talk h2 span { color: var(--coral); }
  .talk p { color: #c9bfa9; max-width: 52ch; margin-bottom: 24px; }
  .keys { list-style: none; margin: 0; padding: 0; border-top: 1px solid rgba(238, 228, 208, .2); }
  .keys li { display: grid; grid-template-columns: 28px 1fr; gap: 10px; padding: 14px 0; border-bottom: 1px solid rgba(238, 228, 208, .2); font-weight: 600; }
  .keys span { font: 600 11px/1.6 var(--mono); color: var(--coral); }
  @media (max-width: 860px) { .talk-grid { grid-template-columns: 1fr; } }

  /* join */
  .join { padding-block: clamp(64px, 9vw, 110px); }
  .join h2 { font: 800 clamp(2.2rem, 5vw, 4.4rem)/1 var(--display); letter-spacing: -.045em; margin: 12px 0 0; max-width: 16ch; }
  .join-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 18px; margin-top: 36px; align-items: start; }
  .card { border: 2px solid var(--ink); border-radius: 24px; padding: 26px; }
  .card h3 { margin: 0 0 6px; font: 800 1.5rem/1.1 var(--display); letter-spacing: -.03em; }
  .card p { margin: 0 0 18px; color: var(--soft); }
  .card.dark { background: var(--ink); color: var(--cream); }
  .card.dark p { color: #c9bfa9; }
  @media (max-width: 860px) { .join-grid { grid-template-columns: 1fr; } }

  footer { padding-block: 30px; font: 500 13px/1.5 var(--mono); color: var(--soft); }
  footer .inner { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  footer .links { display: flex; gap: 18px; }
  footer button { border: 0; background: none; padding: 0; color: inherit; font: inherit; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
  @media (prefers-reduced-motion: reduce) { :global(html) { scroll-behavior: auto; } .btn { transition: none; } }
</style>
