let lastScrollAt = 0;
let listening = false;
let settle = 0;

function listen() {
  listening = true;
  window.addEventListener(
    "scroll",
    () => {
      lastScrollAt = performance.now();
      // CSS hook (html[data-scrolling]) so purely decorative CSS animations can pause too.
      document.documentElement.dataset.scrolling = "";
      window.clearTimeout(settle);
      settle = window.setTimeout(() => delete document.documentElement.dataset.scrolling, 160);
    },
    { passive: true, capture: true },
  );
}

/** True while the page is being scrolled (and for a short moment after). Decorative per-frame effects pause on it so scrolling gets the whole frame budget. */
export function isScrolling(settleMs = 140): boolean {
  if (!listening) listen();
  return performance.now() - lastScrollAt < settleMs;
}
