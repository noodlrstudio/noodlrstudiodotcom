<script>
  const states = [
    { label: 'Before', detail: 'Rebuild every connection', changed: [true, true, true], target: 'Delay' },
    { label: 'After', detail: 'Reconnect the edited route', changed: [false, true, false], target: 'Reverb' }
  ];
  const nodes = ['BeatBox', 'Strum', 'Tape Loop'];
</script>

<figure class="patch-figure">
  <div class="patch-panels">
    {#each states as state (state.label)}
      <div class="patch-panel">
        <p class="patch-label">{state.label}</p>
        <h2>{state.detail}</h2>
        <svg viewBox="0 0 360 170" role="img" aria-label={`${state.label}: ${state.detail}. Strum moves from Delay to Reverb.`}>
          {#each nodes as node, index (node)}
            {@const y = 24 + index * 57}
            <rect x="2" y={y} width="103" height="32" rx="6" />
            <rect x="248" y={y} width="108" height="32" rx="6" />
            <path class:edited={state.changed[index]} d={`M 105 ${y + 16} C 156 ${y + (index === 1 ? -6 : 16)}, 191 ${y + (index === 1 ? 38 : 16)}, 248 ${y + 16}`} />
            <circle class:edited={state.changed[index]} cx="105" cy={y + 16} r="4" />
            <circle class:edited={state.changed[index]} cx="248" cy={y + 16} r="4" />
            <text x="13" y={y + 21}>{node}</text>
            <text x="265" y={y + 21}>{index === 1 ? state.target : 'Mix'}</text>
          {/each}
        </svg>
      </div>
    {/each}
  </div>
  <figcaption><span class="legend-line"></span> Route reconnected <span class="legend-line quiet"></span> Route stays connected</figcaption>
</figure>

<style>
  figure { margin: 0; padding: clamp(16px, 3vw, 30px); background: #1b1a17; color: #eee4d0; border-radius: 18px; }
  .patch-panels { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(18px, 4vw, 42px); }
  .patch-panel { background: radial-gradient(#6a60534f 1px, transparent 1px) 0 0 / 13px 13px; }
  .patch-label { color: #7aebc1; font: 600 12px/1.3 'IBM Plex Mono', monospace; text-transform: uppercase; letter-spacing: .08em; margin: 0 0 5px; }
  h2 { color: inherit; font: 700 clamp(1rem, 2vw, 1.35rem)/1.3 Figtree, sans-serif; margin: 0; }
  svg { display: block; width: 100%; height: auto; font: 600 13px 'IBM Plex Mono', monospace; }
  rect { fill: #292723; stroke: #857a66; }
  path { fill: none; stroke: #9e9485; stroke-width: 2; }
  circle { fill: #9e9485; }
  path.edited { stroke: #7aebc1; stroke-width: 3; }
  circle.edited { fill: #7aebc1; }
  text { fill: #eee4d0; }
  figcaption { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; margin-top: 12px; font-size: .84rem; color: #dfd3c0; }
  .legend-line { width: 16px; height: 3px; background: #7aebc1; border-radius: 4px; }
  .quiet { background: #9e9485; margin-left: 10px; }
  @media (max-width: 620px) { .patch-panels { grid-template-columns: 1fr; } }
</style>
