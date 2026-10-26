/* Runs synchronously in <head>, before the page or ScrollTrigger can restore a position. */
(() => {
  'use strict';
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  // A fragment would otherwise request an independent late jump into the story.
  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
  const reset = () => window.scrollTo(0, 0);
  reset();

  let active = true, frame = 0;
  const release = () => {
    active = false;
    cancelAnimationFrame(frame);
    window.removeEventListener('wheel', release);
    window.removeEventListener('touchmove', release);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('pageshow', onShow);
    window.removeEventListener('pagehide', release);
  };
  function onKey(event) {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) release();
  }
  function onShow() {
    if (!active) return;
    reset();
    frame = requestAnimationFrame(() => {
      if (!active) return;
      reset();
      window.ScrollTrigger?.clearScrollMemory('manual');
      window.ScrollTrigger?.update();
      release();
    });
  }
  // If somebody already starts reading while resources load, never pull them back later.
  window.addEventListener('wheel', release, { passive: true });
  window.addEventListener('touchmove', release, { passive: true });
  window.addEventListener('keydown', onKey);
  window.addEventListener('pageshow', onShow, { once: true });
  window.addEventListener('pagehide', release, { once: true });
})();
