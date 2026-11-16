<script>
  import PatchFigure from '../PatchFigure.svelte';
  import RoutingChart from '../RoutingChart.svelte';
</script>

<div class="article-figure">
  <PatchFigure />
</div>

<p>A player heard distortion when sweeping across Strum in Chrome on a lower powered Windows laptop. Bongos and Cowbell played without distortion. A Strum sweep can start 13 notes. Its Omni preset adds chorus and reverb. We looked at how much work the board does during playback and editing.</p>

<h2>Before: one edit meant reconnecting the graph</h2>
<p>noodlr Board already mixes its built-in audio in a shared Web Audio context. A cable connects a source output to another node’s input. Changing a cable made the old router rebuild the playback connections for every output. Moving Strum from Delay to Reverb meant reconnecting the unrelated outputs too.</p>
<p>Browser session recording also kept a media stream destination connected during normal playback. The router created meter taps on first use and could leave them connected after readers stopped.</p>

<h2>After: keep the routes that still match</h2>
<p>The new router indexes the desired inputs by output port and compares that with what is already connected. It removes obsolete connections before adding new ones. The router updates gain or pan when the target changes. In the diagram, BeatBox and Tape Loop keep playing into the mix while Strum’s single route changes.</p>
<p>Browser session capture now connects when a recording needs it and ends its stream when the last consumer releases it. The arm buttons still decide what goes into a take. Level meters share recent readings, and taps detach after readers stop. The Apple app and Audio Unit keep their existing host capture paths.</p>

<h2>Measuring one cable edit</h2>
<p>We ran the old and new routing code in the same Mac Chrome session with synthetic graphs of 16, 64 and 128 audio routes. Each run alternated one cable between two input ports. We timed the synchronous routing update separately from replacing the test document and counted calls on the playback graph.</p>
<RoutingChart />
<p>At 128 routes, median routing time went from <strong>1.3 ms to 0.1 ms</strong>. Gain automation calls went from <strong>384 to zero</strong> because that edit left the gain targets alone. We report timings at the browser clock’s resolution. This measures how much work a cable edit causes on the main thread. We still need to test sustained playback on the Windows laptop.</p>

<h2>What we’ll test next</h2>
<p>Chromium captured an armed Strum and left it out when disarmed. Playwright WebKit produced a WAV and released the capture stream. Testing in Safari, the iOS app, and the Audio Unit is still on the list, as is sustained playback on a school laptop.</p>
<p>Strum’s experimental WASM renderer still needs sound and performance comparisons. A separate offline test found that eight identical reverb sends rendered in 82 ms through one shared return versus 758 ms through individual convolvers. We’ll compare shared and individual reverb in a live Space.</p>
