import { readable } from 'svelte/store';

/** @type {AudioContext | undefined} */
let ctx;

/**
 * A short kalimba-ish pluck. The AudioContext is created on the first tap,
 * so browsers allow it to start.
 * @param {number} midi
 * @param {number} [delay]
 * @param {number} [velocity]
 */
export function pluck(midi, delay = 0, velocity = 1) {
  ctx ??= new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  const freq = 440 * Math.pow(2, (midi - 69) / 12);
  const t = ctx.currentTime + delay;
  const out = ctx.createGain();
  const body = ctx.createOscillator();
  const shimmer = ctx.createOscillator();
  const shimmerGain = ctx.createGain();
  body.frequency.value = freq;
  shimmer.frequency.value = freq * 5.4;
  shimmerGain.gain.value = 0.12;
  out.gain.setValueAtTime(0, t);
  out.gain.linearRampToValueAtTime(0.22 * velocity, t + 0.005);
  out.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
  body.connect(out);
  shimmer.connect(shimmerGain).connect(out);
  out.connect(ctx.destination);
  for (const osc of [body, shimmer]) {
    osc.start(t);
    osc.stop(t + 1.9);
  }
}

/** @type {Record<string, number[]>} */
export const chords = {
  C: [60, 64, 67, 72],
  Am7: [57, 60, 64, 67],
  F: [53, 57, 60, 65],
  G: [55, 59, 62, 67],
  Em: [52, 55, 59, 64],
  Dm: [50, 53, 57, 62],
  Fmaj7: [53, 57, 60, 64],
  Am: [57, 60, 64, 69]
};

/** @param {string} name */
export function strum(name) {
  const notes = chords[name];
  [...notes, notes[0] + 12].forEach((note, i) => pluck(note, i * 0.05, 0.75));
}

// Shared 16th-note clock for sequencer and drum-grid playheads. Stays put when motion is reduced.
export const step = readable(0, (set) => {
  if (typeof window === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let n = 0;
  const id = setInterval(() => set(++n), 160);
  return () => clearInterval(id);
});
