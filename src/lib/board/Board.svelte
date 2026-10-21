<script>
  import { onMount, tick } from 'svelte';

  /** World size in board pixels; the world is scaled to fit the container. */
  /** @type {number} */
  export let width;
  /** @type {number} */
  export let height;
  /** Cables as "node.port>node.port" pairs. */
  /** @type {string[]} */
  export let cables = [];
  export let minScale = 0.6;
  export let maxScale = 1;
  /** Where to start the horizontal scroll when the board is wider than the screen (0–1). */
  export let focus = 0.5;
  /** Keep the container's own height instead of fitting it to the world. */
  export let fixedHeight = false;
  export let label = 'Noodlr board';

  const colours = { audio: '#ff8652', midi: '#6a6f7d' };

  /** @type {HTMLDivElement} */
  let board;
  /** @type {HTMLDivElement} */
  let world;
  let scale = 1;
  let panning = false;
  let reduced = false;
  let centred = false;
  /** @type {{key: string, d: string, colour: string, audio: boolean, dur: string}[]} */
  let paths = [];

  /** @param {string} ref */
  function portPoint(ref) {
    const [nodeId, portId] = ref.split('.');
    const node = /** @type {HTMLElement | null} */ (world.querySelector(`[data-id="${nodeId}"]`));
    const port = /** @type {HTMLElement | null} */ (node?.querySelector(`[data-port="${portId}"]`));
    if (!node || !port) return null;
    return { x: node.offsetLeft + port.offsetLeft + 11, y: node.offsetTop + port.offsetTop + 11, type: port.dataset.type };
  }

  // Same S-curve the board's cable renderer draws.
  function draw() {
    if (!board.clientWidth) return;
    paths = cables.flatMap((cable, i) => {
      const [from, to] = cable.split('>').map((s) => portPoint(s.trim()));
      if (!from || !to) return [];
      const bend = Math.max(60, Math.abs(to.x - from.x) * 0.42);
      const audio = from.type === 'audio';
      const d = `M${from.x} ${from.y} C${from.x + bend} ${from.y}, ${to.x - bend} ${to.y}, ${to.x} ${to.y}`;
      return [{
        // Re-key on every redraw so each motion dot restarts on its new path
        key: `${i}:${d}`,
        d,
        colour: audio ? colours.audio : colours.midi,
        audio,
        dur: `${(audio ? 2.2 : 1.6) + (i % 3) * 0.4}s`
      }];
    });
  }

  function fit() {
    if (!board.clientWidth) return;
    scale = Math.min(maxScale, Math.max(minScale, board.clientWidth / width));
    const overflow = width * scale - board.clientWidth;
    if (overflow > 0 && !centred) {
      board.scrollLeft = overflow * focus;
      centred = true;
    }
  }

  /** @param {PointerEvent} e */
  function down(e) {
    const target = /** @type {HTMLElement} */ (e.target);
    // Touch scrolls the page as normal; mouse and pen drag nodes and pan the canvas.
    if (e.pointerType === 'touch' || target.closest('[data-play],a,button,input,select,label')) return;
    const node = /** @type {HTMLElement | null} */ (target.closest('.nb-node'));
    const sx = e.clientX;
    const sy = e.clientY;
    if (node) {
      world.querySelectorAll('.nb-node.sel').forEach((n) => n !== node && n.classList.remove('sel'));
      node.classList.add('sel', 'drag');
      const left = node.offsetLeft;
      const top = node.offsetTop;
      e.preventDefault();
      track((ev) => {
        node.style.left = `${left + (ev.clientX - sx) / scale}px`;
        node.style.top = `${top + (ev.clientY - sy) / scale}px`;
        draw();
      }, () => node.classList.remove('drag'));
    } else {
      const left = board.scrollLeft;
      const top = board.scrollTop;
      panning = true;
      track((ev) => {
        board.scrollLeft = left - (ev.clientX - sx);
        board.scrollTop = top - (ev.clientY - sy);
      }, () => (panning = false));
    }
  }

  /**
   * @param {(e: PointerEvent) => void} move
   * @param {() => void} end
   */
  function track(move, end) {
    const up = () => {
      removeEventListener('pointermove', move);
      removeEventListener('pointerup', up);
      removeEventListener('pointercancel', up);
      end();
    };
    addEventListener('pointermove', move);
    addEventListener('pointerup', up);
    addEventListener('pointercancel', up);
  }

  onMount(() => {
    reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Also fires when a hidden board (another room) becomes visible.
    const resize = new ResizeObserver(() => {
      fit();
      draw();
    });
    resize.observe(board);
    document.fonts?.ready.then(draw);
    tick().then(draw);
    return () => resize.disconnect();
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="nb-board"
  class:panning
  bind:this={board}
  on:pointerdown={down}
  style={fixedHeight ? '' : `height:${height * scale}px`}
  role="region"
  aria-label={label}
>
  <div class="nb-sizer" style="width:{width * scale}px;height:{height * scale}px">
    <div class="nb-world" bind:this={world} style="width:{width}px;height:{height}px;transform:scale({scale})">
      <svg class="nb-cables" aria-hidden="true">
        {#each paths as p (p.key)}
          <path d={p.d} stroke={p.colour} />
          {#if !reduced}
            <circle r={p.audio ? 3.2 : 2.6} fill={p.audio ? '#ffb08f' : '#b9bbc2'}>
              <animateMotion dur={p.dur} repeatCount="indefinite" path={p.d} />
            </circle>
          {/if}
        {/each}
      </svg>
      <slot />
    </div>
  </div>
</div>
