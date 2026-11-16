<script>
  const rows = [
    { routes: 16, before: 32, after: 2 },
    { routes: 64, before: 128, after: 2 },
    { routes: 128, before: 256, after: 2 }
  ];
</script>

<figure class="chart">
  <h3>Connection calls per cable edit</h3>
  <p class="legend"><span>Before</span><span>After</span></p>
  {#each rows as row (row.routes)}
    <div class="metric">
      <span class="route-label">{row.routes} routes</span>
      <div class="bars">
        <div class="bar-row"><span class="bar before" style:width={`${row.before / 256 * 100}%`}></span><span>{row.before}</span></div>
        <div class="bar-row"><span class="bar after" style:width={`${row.after / 256 * 100}%`}></span><span>{row.after}</span></div>
      </div>
    </div>
  {/each}
  <figcaption>We changed one route in each graph and counted connects and disconnects on playback outputs.</figcaption>
</figure>

<style>
  figure { margin: 28px 0; background: #f7f0e3; padding: clamp(16px, 4vw, 28px); border: 1px solid #c9bda7; border-radius: 16px; }
  h3 { margin: 0; font-size: 1.2rem; }
  .legend { display: flex; gap: 18px; margin: 8px 0 16px; font-size: .88rem; }
  .legend span::before { content: ''; display: inline-block; width: .65em; height: .65em; margin-right: 6px; background: #8a634d; border-radius: 2px; }
  .legend span + span::before { background: #00704f; }
  .metric { display: grid; grid-template-columns: 6.4rem minmax(0, 1fr); gap: 8px; padding-block: 10px; border-top: 1px solid #dbcdb5; }
  .route-label, .bar-row { font: 500 .79rem/1.4 'IBM Plex Mono', monospace; }
  .bars { padding-right: 2.1rem; }
  .bar-row { display: flex; align-items: center; gap: 8px; }
  .bar { display: block; flex: none; min-width: 3px; height: 8px; border-radius: 2px; }
  .before { background: #8a634d; }
  .after { background: #00704f; }
  figcaption { margin-top: 8px; color: #5f574b; font-size: .875rem; }
</style>
