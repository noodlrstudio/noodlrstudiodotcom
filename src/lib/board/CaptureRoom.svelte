<script>
  import { bars } from './icons.js';

  // Take colours are Capture's ember, pool and lime swatches.
  const takes = [
    { name: 'bassline hum', time: '0:12', accent: '#ff5b4d', fill: '#2d1111', tags: ['#bass', 'kitchen'], floor: 0.15 },
    { name: 'table taps', time: '0:08', accent: '#63d8ff', fill: '#10232c', tags: ['#groove'], floor: 0.1 },
    { name: 'radio snippet', time: '0:05', accent: '#a8e85e', fill: '#182414', tags: ['#texture', 'photo'], floor: 0.2 }
  ];
</script>

<div class="cr" role="img" aria-label="The Capture room on a phone, showing three recorded takes">
  <div class="cr-in">
    <div class="cr-top"><span>CAPTURE</span><span>3 takes</span></div>
    {#each takes as take}
      <div class="cr-take" style="--ca:{take.accent};--cf:{take.fill}">
        <b>{take.name} <span>{take.time}</span></b>
        <div>{#each bars(34, take.name, take.floor) as h}<i style="height:{h}%"></i>{/each}</div>
        <small>{#each take.tags as tag}<span>{tag}</span>{/each}</small>
      </div>
    {/each}
    <div class="cr-rec"></div>
  </div>
</div>
