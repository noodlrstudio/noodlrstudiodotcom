<script>
  /** 'tour' switches to the Tour Wall theme. */
  export let theme = '';
  export let title = 'Gig at the Dareshack';
  /** Keep the desktop grid on small screens (for scaled-down previews). */
  export let keep = false;
  /** Show only the banner and the first few widgets. */
  export let compact = false;

  const days = Array.from({ length: 28 }, (_, i) => i + 1);
</script>

<div class="pr {theme}" class:keep class:compact>
  <div class="pw-banner"><small>Plan · Noodlr EP</small><strong>{title}</strong></div>
  <div class="pw" style="--span:4">
    <h4>Calendar <span>Nov</span></h4>
    <div class="pw-cal">
      {#each ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as d}<span class="hd">{d}</span>{/each}
      {#each days as d}<span class:ev={d === 7 || d === 14} class:ev2={d === 21}>{d}</span>{/each}
    </div>
  </div>
  <div class="pw" style="--span:4">
    <h4>Setlist <span>24 min</span></h4>
    <ol class="pw-set">
      <li>Hang On, Play That Again<span>4:12</span></li>
      <li>Voice Note 37<span>3:48</span></li>
      <li>Radio Snippet<span>5:05</span></li>
      <li>FINAL FINAL v4.1<span>4:30</span></li>
    </ol>
  </div>
  {#if !compact}
    <div class="pw" style="--span:4">
      <h4>Crew</h4>
      <div class="pw-crew">
        <div><i style="background:#1f6f8b">A</i><span>Ant<small>Bass, synths, the hum</small></span></div>
        <div><i style="background:#d85d4a">C</i><span>Chris<small>Drums, mix, arp randomness</small></span></div>
        <div><i style="background:#5b8f55">J</i><span>Jo<small>Artwork + projections</small></span></div>
      </div>
    </div>
    <div class="pw" style="--span:5">
      <h4>Timeline</h4>
      <div class="pw-tl">
        <div>Jam<b style="--s:0%;--w:30%;--c:#f2b84b"></b></div>
        <div>Produce<b style="--s:22%;--w:42%"></b></div>
        <div>Artwork<b style="--s:40%;--w:30%;--c:#5b8f55"></b></div>
        <div>Release<b style="--s:72%;--w:26%;--c:#d85d4a"></b></div>
      </div>
    </div>
    <div class="pw" style="--span:3">
      <h4>List</h4>
      <ul class="pw-list"><li class="done">Master 3 tracks</li><li class="done">Pick distributor</li><li>Confirm projector</li><li>Send set times</li></ul>
    </div>
    <div class="pw" style="--span:4">
      <h4>Poll · EP cover</h4>
      <div class="pw-poll">
        <div>Tape photo<b style="--w:72%"></b></div>
        <div>Hand-drawn noodle<b style="--w:48%"></b></div>
        <div>Whiteboard scan<b style="--w:20%"></b></div>
      </div>
    </div>
  {/if}
</div>
