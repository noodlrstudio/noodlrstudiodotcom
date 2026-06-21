<script>
  import { onMount } from 'svelte';
  /** @type {HTMLDivElement | undefined} */
  let board;
  let x = 0;
  let y = 0;
  let reduced = false;

  onMount(() => {
    reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  /** @param {MouseEvent} event */
  function move(event) {
    if (reduced || !board) return;
    const r = board.getBoundingClientRect();
    x = (event.clientX - r.left) / r.width - 0.5;
    y = (event.clientY - r.top) / r.height - 0.5;
  }
</script>

<div class="board-shell" role="presentation" on:mousemove={move} on:mouseleave={() => { x = 0; y = 0; }} bind:this={board}>
  <div class="board" style={`--rx:${-y * 3}deg;--ry:${x * 4}deg`}>
    <div class="rail">
      <span class="active">P</span><span>N</span><span>+</span>
    </div>
    <div class="canvas">
      <div class="grid"></div>
      <div class="node play" style={`--tx:${x * -12}px;--ty:${y * -8}px`}>
        <small>PLAY / 01</small>
        <div class="wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <strong>midi noodle 14</strong>
        <span>00:08</span>
      </div>
      <svg class="cable" viewBox="0 0 600 420" preserveAspectRatio="none" aria-hidden="true">
        <path d="M180 172 C275 60 312 355 425 245" />
      </svg>
      <div class="node plan" style={`--tx:${x * 10}px;--ty:${y * 10}px`}>
        <small>PLAN / 02</small>
        <strong>tiny show, big room</strong>
        <ul><li class="done">master ready</li><li>confirm projector</li><li>invite the crew</li></ul>
      </div>
      <div class="note">before it becomes<br/>a project</div>
      <div class="cursor one">A</div><div class="cursor two">C</div>
    </div>
  </div>
</div>

<style>
  .board-shell { perspective: 1300px; width: min(100%, 780px); margin-inline: auto; }
  .board { --rx:0deg; --ry:0deg; aspect-ratio: 1.42; display: grid; grid-template-columns: 54px 1fr; background: #d7d5cd; border: 1px solid rgba(16,17,15,.2); border-radius: 22px; box-shadow: 0 30px 90px rgba(16,17,15,.16); overflow: hidden; transform: rotateX(var(--rx)) rotateY(var(--ry)); transition: transform .18s ease-out; }
  .rail { display:flex; flex-direction:column; align-items:center; gap:.65rem; padding:.75rem .45rem; background:#151613; color:#eeeee8; }
  .rail span { width:34px; height:34px; display:grid; place-items:center; border-radius:50%; font:700 .67rem/1 var(--mono); }
  .rail .active { background:var(--orange); color:#151613; }
  .canvas { position:relative; overflow:hidden; }
  .grid { position:absolute; inset:0; opacity:.34; background-image: radial-gradient(#66655f 1px,transparent 1px); background-size:19px 19px; }
  .node { position:absolute; z-index:2; border:1px solid #24251f; border-radius:13px; padding:1rem; transform:translate(var(--tx),var(--ty)); transition:transform .22s ease-out; box-shadow:4px 5px 0 rgba(16,17,15,.13); }
  .node small { display:block; font:650 .56rem/1 var(--mono); letter-spacing:.1em; margin-bottom:1.25rem; }
  .node strong { display:block; font-size:.84rem; letter-spacing:-.025em; }
  .node span { font:500 .55rem/1 var(--mono); opacity:.6; }
  .play { left:11%; top:18%; width:36%; background:#f0efea; }
  .plan { right:9%; bottom:14%; width:36%; background:#f0bd47; }
  .plan ul { list-style:none; padding:0; margin:.7rem 0 0; font:500 .58rem/1.7 var(--mono); }
  .plan li::before { content:'○'; margin-right:.4rem; }.plan .done::before { content:'●'; }
  .wave { height:50px; display:flex; align-items:center; gap:4px; margin-bottom:.7rem; }
  .wave i { flex:1; border-radius:3px; background:#171815; height:var(--h); }
  .wave i:nth-child(1){--h:22%}.wave i:nth-child(2){--h:65%}.wave i:nth-child(3){--h:39%}.wave i:nth-child(4){--h:87%}.wave i:nth-child(5){--h:52%}.wave i:nth-child(6){--h:74%}.wave i:nth-child(7){--h:31%}
  .cable { position:absolute; inset:0; width:100%; height:100%; z-index:1; pointer-events:none; }
  .cable path { fill:none; stroke:#ef633d; stroke-width:3; stroke-linecap:round; stroke-dasharray:5 8; animation:flow 8s linear infinite; }
  .note { position:absolute; right:11%; top:14%; background:#f4f0d5; padding:.65rem .8rem; transform:rotate(3deg); font:600 .58rem/1.35 var(--mono); box-shadow:2px 3px 0 rgba(16,17,15,.12); }
  .cursor { position:absolute; z-index:3; width:24px; height:24px; display:grid; place-items:center; border-radius:50% 50% 50% 3px; color:white; font:700 .55rem/1 var(--mono); }
  .one { left:56%; top:20%; background:#7057d9; animation:drift 7s ease-in-out infinite; }.two { left:29%; bottom:16%; background:#188b6a; animation:drift 8s ease-in-out -2s infinite reverse; }
  @keyframes flow { to { stroke-dashoffset:-100; } } @keyframes drift { 50% { transform:translate(18px,12px) rotate(5deg); } }
  @media (max-width:640px){ .board{grid-template-columns:40px 1fr;border-radius:14px}.rail span{width:28px;height:28px}.play,.plan{width:43%;padding:.72rem}.play{left:6%}.plan{right:5%}.note{display:none} }
  @media (prefers-reduced-motion:reduce){ .cable path,.cursor{animation:none}.board,.node{transition:none} }
</style>
