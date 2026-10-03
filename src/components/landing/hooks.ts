import { useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";

/** True once the element has scrolled into view (and stays true). */
export function useInView<T extends Element>(threshold = 0.2, rootMargin = "0px 0px -8% 0px"): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setSeen(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold, rootMargin]);
  return [ref, seen];
}

/** Counts from 0 to `target` once `active` turns true. */
export function useCountUp(target: number, active: boolean, duration = 1400): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setValue(target), 0);
      return () => clearTimeout(t);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

/** onPointerMove handler that writes the pointer position (px) into --x / --y on the element — used for card spotlights. Batched to one write per frame. */
export function spotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const cx = e.clientX;
  const cy = e.clientY;
  if (pending.has(el)) {
    pending.set(el, [cx, cy]);
    return;
  }
  pending.set(el, [cx, cy]);
  requestAnimationFrame(() => {
    const p = pending.get(el);
    pending.delete(el);
    if (!p) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${p[0] - r.left}px`);
    el.style.setProperty("--y", `${p[1] - r.top}px`);
  });
}
const pending = new Map<HTMLElement, [number, number]>();
