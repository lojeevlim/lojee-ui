import { useEffect, type RefObject } from "react";

/**
 * When scrolling stops inside a pinned section, glide to the nearest "rest" position so the stage settles on a clear step (centered, one
 * framework / one look / one group of cards) instead of stopping half way between two. `positions` are scroll progress values 0..1 along the pinned
 * range. Optional `boundaries` (ascending, one fewer than positions) replace nearest-rest: p below boundaries[0] settles on positions[0], and so on. Nothing happens outside the pinned range, so the page scrolls normally everywhere else.
 */
export function useStepSnap(track: RefObject<HTMLElement | null>, stage: RefObject<HTMLElement | null>, positions: number[], boundaries?: number[]) {
  useEffect(() => {
    const el = track.current;
    const card = stage.current;
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    const settle = () => {
      const top = parseFloat(getComputedStyle(card).top) || 0;
      const r = el.getBoundingClientRect();
      const span = r.height - card.offsetHeight;
      if (span <= 1) return;
      const p = (top - r.top) / span;
      if (p <= 0.001 || p >= 0.999) return; // not pinned
      const nearest = boundaries
        ? positions[boundaries.filter((x) => p >= x).length]
        : positions.reduce((a, b) => (Math.abs(b - p) < Math.abs(a - p) ? b : a), positions[0]);
      const delta = (nearest - p) * span;
      if (Math.abs(delta) < 6) return;
      window.scrollBy({ top: delta, behavior: reduce ? "auto" : "smooth" });
    };
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- positions is a constant list per section
  }, [track, stage]);
}
