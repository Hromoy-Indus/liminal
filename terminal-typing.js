/* Terminal text only. This controller never seeks, pauses or changes the scroll timeline. */
(() => {
  'use strict';
  // A repeated script mount finishes the previous instance rather than starting duplicate timers.
  window.liminalTerminalTyping?.destroy();
  const terminal = document.querySelector('.terminal');
  if (!terminal) return;
  const form = terminal.querySelector('.command-form');
  const rows = Array.from(terminal.querySelectorAll('.typing-row'), row => {
    const line = row.querySelector('.typing-line');
    const output = row.querySelector('.typing-text');
    const text = output.textContent;
    return { line, output, text, node: output.firstChild };
  });
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let timer, observer, removalObserver, done = false;
  const clear = () => {
    clearTimeout(timer);
    observer?.disconnect();
    removalObserver?.disconnect();
    window.removeEventListener('wheel', finish);
    window.removeEventListener('touchmove', finish);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('pagehide', finish);
    media.removeEventListener('change', onMotion);
  };
  function finish() {
    if (done) return;
    done = true;
    clear();
    rows.forEach(({ line, node, text }) => {
      node.nodeValue = text;
      line.style.removeProperty('visibility');
      line.removeAttribute('data-typing-active');
    });
    terminal.dataset.terminalTyping = 'complete';
    form.inert = false;
  }
  function onScroll() { if (window.scrollY > 0) finish(); }
  function onKey(event) {
    if (event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) finish();
  }
  function onMotion() { if (media.matches) finish(); }
  function typeRow(index) {
    if (done) return;
    const row = rows[index];
    row.line.style.removeProperty('visibility');
    row.line.setAttribute('data-typing-active', '');
    const characters = Array.from(row.text);
    let count = 0;
    const tick = () => {
      if (done) return;
      row.node.nodeValue = characters.slice(0, ++count).join('');
      if (count < characters.length) timer = setTimeout(tick, 40);
      else if (index === rows.length - 1) finish();
      else timer = setTimeout(() => {
        row.line.removeAttribute('data-typing-active');
        typeRow(index + 1);
      }, 600);
    };
    timer = setTimeout(tick, 40);
  }
  window.liminalTerminalTyping = { destroy: finish };
  if (!rows.length || media.matches || new URLSearchParams(location.search).get('motion') === 'reduce'
      || terminal.dataset.terminalTyping === 'complete' || window.scrollY > 0) {
    finish();
    return;
  }
  terminal.dataset.terminalTyping = 'running';
  form.inert = true;
  rows.forEach(({ line, node }) => {
    line.style.visibility = 'hidden';
    node.nodeValue = '';
  });
  window.addEventListener('wheel', finish, { passive: true });
  window.addEventListener('touchmove', finish, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('keydown', onKey);
  window.addEventListener('pagehide', finish);
  media.addEventListener('change', onMotion);
  removalObserver = new MutationObserver(() => { if (!terminal.isConnected) finish(); });
  removalObserver.observe(document.body, { childList: true, subtree: true });
  observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer.disconnect();
      typeRow(0);
    }
  });
  observer.observe(terminal);
})();
