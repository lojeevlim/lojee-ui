import { useEffect, useState } from "react";

/** Keeps an element mounted for `exitMs` after `open` turns false so its exit transition can play.
 * Render while `mounted` is true and pass `open` to `motionState` for the element's `data-state`. */
export function usePresence(open: boolean, exitMs: number): { mounted: boolean } {
  const [mounted, setMounted] = useState(open);
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setMounted(true);
  }
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => setMounted(false), exitMs);
    return () => clearTimeout(t);
  }, [open, exitMs]);
  return { mounted: open || mounted };
}
