<script>
  import { audioIcon, midiIcon, icon, bars } from './icons.js';
  import { pluck, strum, step } from './audio.js';

  /** @type {string} */
  export let type;
  /** Used by cables to find this node's ports. */
  export let id = type;
  export let x = 0;
  export let y = 0;
  /** @type {number | undefined} */
  export let w = undefined;
  export let sel = false;
  /** Render outside a board (no absolute position, no chip). */
  export let standalone = false;
  /** @type {string | undefined} */
  export let label = undefined;
  // Per-node content
  export let file = 'bassline_hum.m4a';
  export let text = 'Chorus wants to lift.<br>Try the bassline up a 4th?<br><s>new hi-hat sample</s>';
  export let url = 'your-drum-machine.app';
  export let who = 'Ant';
  export let tint = '#52e2b8';
  export let backdrop = '#1d3b34';

  // Accent colours, default widths, names and ports, taken from the board's node definitions.
  /** @type {Record<string, {a: string, w: number, name: string, ports: [string, string, string, number][]}>} */
  const defs = {
    tape: { a: '#ffb08f', w: 300, name: 'Tape Loop', ports: [['r', 'audio', 'out', 50]] },
    kalimba: { a: '#d5b66f', w: 300, name: 'Kalimba', ports: [['l', 'midi', 'in', 50], ['r', 'audio', 'out', 50]] },
    seq: { a: '#f59d22', w: 230, name: 'Endless Sequencer', ports: [['l', 'midi', 'in', 50], ['r', 'midi', 'out', 50]] },
    synth: { a: '#695cff', w: 300, name: 'PolySynth', ports: [['l', 'midi', 'in', 50], ['r', 'audio', 'out', 50]] },
    strum: { a: '#ff7fbf', w: 240, name: 'Strum', ports: [['l', 'midi', 'in', 50], ['r', 'audio', 'out', 50]] },
    xy: { a: '#b07cff', w: 200, name: 'XY Pad', ports: [] },
    beatbox: { a: '#ff8652', w: 360, name: 'BeatBox', ports: [['l', 'midi', 'in', 34], ['l', 'audio', 'sin', 70], ['r', 'midi', 'mout', 34], ['r', 'audio', 'out', 70]] },
    webapp: { a: '#9aa0aa', w: 300, name: 'Web App', ports: [['l', 'midi', 'in', 40], ['r', 'midi', 'out', 40]] },
    wam: { a: '#00d19b', w: 220, name: 'WAM Gain', ports: [['l', 'audio', 'in', 40], ['l', 'midi', 'min', 66], ['r', 'audio', 'out', 50]] },
    cmajor: { a: '#5fd8ff', w: 220, name: 'CMajor Sine', ports: [['l', 'midi', 'in', 50], ['r', 'audio', 'out', 50]] },
    radio: { a: '#ffbd5d', w: 270, name: 'Radio Sampler', ports: [['r', 'audio', 'out', 50]] },
    whistler: { a: '#00d19b', w: 240, name: 'Whistler', ports: [['r', 'midi', 'mout', 36], ['r', 'audio', 'out', 70]] },
    looper: { a: '#52e2b8', w: 280, name: 'Looper', ports: [['l', 'audio', 'in1', 30], ['l', 'audio', 'in2', 45], ['l', 'audio', 'in3', 60], ['l', 'audio', 'in4', 75], ['r', 'audio', 'out', 50]] },
    notepad: { a: '#f4c64b', w: 250, name: 'NotePad', ports: [] },
    cam: { a: '#52e2b8', w: 190, name: 'Live', ports: [] }
  };

  const def = defs[type];
  const accent = type === 'cam' ? tint : def.a;
  const chipName = label ?? (type === 'cam' ? `${who} · live` : def.name);
  const pos = standalone ? '' : `left:${x}px;top:${y}px;`;

  // 17-tine kalimba, laid out centre-out like the real thing
  const tines = [86, 83, 79, 76, 72, 69, 65, 62, 60, 64, 67, 71, 74, 77, 81, 84, 88];
  /** @type {number | null} */
  let hit = null;
  /** @param {number} note */
  function tap(note) {
    pluck(note);
    hit = note;
    setTimeout(() => hit === note && (hit = null), 160);
  }

  const chordNames = ['C', 'Am7', 'F', 'G', 'Em', 'Dm', 'Fmaj7', 'Am'];
  let chord = 'Am7';

  // Same Euclidean rhythm (9 hits over 16 steps) the live Endless Sequencer starts with
  const seqOn = Array.from({ length: 16 }, (_, i) => i).filter((i) => (i * 9) % 16 < 9);
  const ring = Array.from({ length: 16 }, (_, i) => ({
    cx: 80 + 60 * Math.sin((i / 16) * Math.PI * 2),
    cy: 80 - 60 * Math.cos((i / 16) * Math.PI * 2)
  }));
  const seqShape = seqOn.map((i) => `${ring[i].cx},${ring[i].cy}`).join(' ');

  /** @type {[string, string, number[]][]} */
  const drums = [
    ['KICK', '#ff8652', [0, 4, 8, 11, 12]],
    ['SNARE', '#f4c64b', [4, 12]],
    ['CLAP', '#ffb253', [12, 13]],
    ['HAT', '#52e2b8', [0, 2, 4, 6, 8, 10, 12, 14]],
    ['OPEN', '#5fd8ff', [7, 15]],
    ['TOM', '#8b82ff', [14]],
    ['RIM', '#b07cff', [3, 10]],
    ['COW', '#ff7fbf', [6]]
  ];
  const sixteen = Array.from({ length: 16 }, (_, i) => i);
  const webPads = Array.from({ length: 32 }, (_, i) =>
    [0, 4, 10, 18, 20, 28].includes(i) ? 'on' : [8, 12, 24, 30].includes(i) ? 'on2' : ''
  );
  const knobs = [['Cutoff', 170], ['Res', 70], ['Attack', 30], ['Release', 200], ['Arp', 120]];
  const lanes = ['#ffb08f', '#8b82ff', '#52e2b8', '#f4c64b'];
</script>

<div
  class="nb-node"
  class:sel
  class:static={standalone}
  class:cam={type === 'cam'}
  data-id={id}
  style="{pos}width:{w ?? def.w}px;--a:{accent}{type === 'cam' ? ';height:150px' : ''}"
>
  <div class="nb-chip" style="--a:{accent}"><b><i></i>{chipName}</b><span class="on">⏻</span><span>S</span><span>M</span></div>
  {#each def.ports as [side, signal, port, top]}
    <span class="nb-port {side}" data-port={port} data-type={signal} style="top:{top}%" title="{signal.toUpperCase()} {side === 'l' ? 'in' : 'out'}">{@html signal === 'audio' ? audioIcon : midiIcon}</span>
  {/each}

  {#if type === 'tape'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('repeat')}</span><em>TAPE LOOP</em></div>
    <div class="nb-name">{file}</div>
    <div class="nb-wave">
      {#each bars(46, id) as h, i}<i style="height:{h}%" class:dim={i < 5 || i > 39}></i>{/each}
      <span class="trim" style="left:12%"></span><span class="trim" style="left:86%"></span>
    </div>
    <div class="nb-row"><span class="nb-mono">0:03.2 → 0:11.8 · loop</span><span class="nb-btn">{@html icon('play')}</span></div>
  {:else if type === 'kalimba'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('harp')}</span><em>KALIMBA · 17 TINES</em></div>
    <div class="nb-kal">
      {#each tines as note}
        <span class="nb-tine" class:hit={hit === note} data-play role="button" tabindex="-1" aria-label="Kalimba note" style="height:{108 - (note - 60) * 2.1}px" on:pointerdown={() => tap(note)}></span>
      {/each}
    </div>
  {:else if type === 'seq'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('list')}</span><em>ENDLESS SEQUENCER</em></div>
    <svg class="nb-seq" viewBox="0 0 160 160" aria-hidden="true">
      <circle cx="80" cy="80" r="40" fill="none" stroke="#2a2a30" stroke-width="1.5" stroke-dasharray="3 5" />
      <polygon class="shape" points={seqShape} />
      {#each ring as dot, i}<circle class="st" class:on={seqOn.includes(i)} class:now={$step % 16 === i} cx={dot.cx} cy={dot.cy} r="7" />{/each}
      <text x="80" y="78" text-anchor="middle" fill="#f1f2f4" font-size="16" font-weight="650" font-family="SF Pro Display,Avenir Next,sans-serif">E4</text>
      <text x="80" y="94" text-anchor="middle" fill="#93969e" font-size="8" font-family="IBM Plex Mono,monospace">9/16 · 1/16 · forward</text>
    </svg>
  {:else if type === 'synth'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('wave')}</span><em>POLYSYNTH</em></div>
    <div class="nb-scope">
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 30 Q12 6 25 18 T50 30 T75 42 T100 30 Q112 6 125 18 T150 30 T175 42 T200 30" fill="none" stroke="#8b82ff" stroke-width="2" />
        <path d="M0 30 Q12 6 25 18 T50 30 T75 42 T100 30 Q112 6 125 18 T150 30 T175 42 T200 30 V60 H0Z" fill="#695cff" opacity=".18" />
      </svg>
    </div>
    <div class="nb-knobs">{#each knobs as [k, v]}<div class="nb-knob"><i style="--v:{v}deg"></i>{k}</div>{/each}</div>
  {:else if type === 'strum'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('harp')}</span><em>STRUM</em></div>
    <div class="nb-plate" data-play role="button" tabindex="-1" aria-label="Strum plate" on:pointerdown={() => strum(chord)}>
      {#each [10, 21, 32, 43, 54, 65, 76, 87, 98] as t}<i style="top:{t}%"></i>{/each}
    </div>
    <div class="nb-chords">
      {#each chordNames as c}<span data-play class:on={c === chord} role="button" tabindex="-1" on:pointerdown={() => { chord = c; strum(c); }}>{c}</span>{/each}
    </div>
  {:else if type === 'xy'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('pad')}</span><em>XY PAD</em></div>
    <div class="nb-xy"><i></i></div>
    <div class="nb-row" style="margin-top:8px"><span class="nb-mono">X cutoff</span><span class="nb-mono">Y grain</span></div>
  {:else if type === 'beatbox'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('drum')}</span><em>BEATBOX · 8 VOICES · PATTERN A</em></div>
    <div class="nb-grid">
      {#each drums as [name, colour, hits]}
        <b>{name}</b>{#each sixteen as s}<i class:on={hits.includes(s)} class:now={$step % 16 === s} style="--c:{colour}"></i>{/each}
      {/each}
    </div>
  {:else if type === 'webapp'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('globe')}</span><em>WEB APP</em></div>
    <div class="nb-chrome">{@html icon('globe')}<span>{url}</span></div>
    <div class="nb-frame">{#each webPads as p}<i class={p}></i>{/each}</div>
    <div style="margin-top:10px"><span class="nb-badge" style="--a:#00d19b">● Noodlr bridge · MIDI</span></div>
  {:else if type === 'wam'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('sliders')}</span><em>WAM 2 · CURATED</em></div>
    <div class="nb-bigknob" style="--v:190deg"></div>
    <div class="nb-center"><div class="nb-name" style="margin:0">WAM Gain</div><span class="nb-mono">+3.4 dB</span></div>
  {:else if type === 'cmajor'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('wave')}</span><em>CMAJOR · CURATED</em></div>
    <div class="nb-scope" style="height:70px">
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 C 16 -2, 34 -2, 50 30 S 84 62, 100 30 S 134 -2, 150 30 S 184 62, 200 30" fill="none" stroke="#5fd8ff" stroke-width="2" /></svg>
    </div>
    <div class="nb-row"><div class="nb-name" style="margin:0">CMajor Sine</div><span class="nb-mono">A3 · 220 Hz</span></div>
  {:else if type === 'radio'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('radio')}</span><em>RADIO SAMPLER</em></div>
    <div class="nb-name">Late-night jazz · live</div>
    <div class="nb-dial"><i></i></div>
    <div class="nb-row"><span class="nb-mono">clip 00:07 saved to Tape Pool</span><span class="nb-btn" style="background:#ef4444;color:#fff">●</span></div>
  {:else if type === 'whistler'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('mic')}</span><em>WHISTLER · PITCH → MIDI</em></div>
    <div class="nb-pitch">
      <svg viewBox="0 0 200 46" preserveAspectRatio="none" aria-hidden="true"><path d="M0 34 C20 34 22 18 40 18 S60 26 80 26 S100 10 120 10 S150 30 170 22 S190 14 200 14" fill="none" stroke="#00d19b" stroke-width="2.4" stroke-linecap="round" /></svg>
    </div>
    <div class="nb-notes">{#each ['E3', 'G3', 'A3', 'C4', 'A3'] as n}<span>{n}</span>{/each}</div>
  {:else if type === 'looper'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('repeat')}</span><em>LOOPER · 4 TRACKS</em></div>
    <div class="nb-lanes">
      {#each lanes as c}<div style="--c:{c}">{#each bars(40, id + c, 0.1) as h}<i style="height:{h}%"></i>{/each}</div>{/each}
    </div>
  {:else if type === 'notepad'}
    <div class="nb-hd"><span class="nb-ico">{@html icon('note')}</span><em>NOTEPAD</em></div>
    <div class="nb-paper">{@html text}</div>
  {:else if type === 'cam'}
    <div class="nb-cam" style="background:linear-gradient(150deg,{backdrop},#151518 75%)"><strong style="background:{tint}">{who[0]}</strong><small>{who}</small></div>
  {/if}
</div>
