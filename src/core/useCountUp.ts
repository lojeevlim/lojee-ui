import { useEffect, useState } from "react";

// Splits a display value like "$48,290", "3.42%" or "12.5k" into its prefix, number and suffix so the
// number can be animated while the surrounding text stays put. Returns null when there's no number.
const NUMBER_RE = /^(\D*?)(-?\d[\d,]*(?:\.\d+)?)(.*)$/s;

function format(n: number, decimals: number, grouped: boolean): string {
  const fixed = n.toFixed(decimals);
  if (!grouped) return fixed;
  const [int, frac] = fixed.split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (frac ? `.${frac}` : "");
}

/** Animates the number inside `value` from 0 up to itself on mount (and from the previous value when it changes).
 * Non-numeric values and `enabled: false` are returned as-is; reduced-motion users get the final value immediately. */
export function useCountUp(value: string | number, enabled: boolean, durationMs = 1200): string {
  const text = String(value);
  const match = NUMBER_RE.exec(text);
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN;
  const [current, setCurrent] = useState(0);
  const animate = enabled && match !== null && Number.isFinite(target);

  useEffect(() => {
    if (!animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const done = requestAnimationFrame(() => setCurrent(target));
      return () => cancelAnimationFrame(done);
    }
    const from = 0;
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setCurrent(from + (target - from) * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [animate, target, durationMs]);

  if (!animate || !match) return text;
  const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
  return `${match[1]}${format(current, decimals, match[2].includes(","))}${match[3]}`;
}

/** Eased 0 → 1 progress over `durationMs` after mount, for charts that grow in from zero. Returns 1 when `enabled` is false
 * and, for reduced-motion users, jumps straight to 1. */
export function useProgress(enabled: boolean, durationMs = 1200): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const done = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(done);
    }
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / durationMs);
      setProgress(1 - Math.pow(1 - t, 3)); // ease-out cubic
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [enabled, durationMs]);

  return enabled ? progress : 1;
}
