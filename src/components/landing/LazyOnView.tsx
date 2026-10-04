import { Suspense, startTransition, useEffect, useState, type ReactNode } from "react";
import { useInView } from "./hooks";

/** Mounts its children (a lazy chunk, usually) only once the placeholder is near the viewport, so offscreen sections cost nothing up front. */
export default function LazyOnView({ children, minHeight = 480 }: { children: ReactNode; minHeight?: number }) {
  const [ref, near] = useInView<HTMLDivElement>(0, "900px 0px 900px 0px");
  // Mounted inside a transition, so React renders the section in interruptible slices and keeps scrolling smooth instead of blocking a frame.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (near && !mounted) startTransition(() => setMounted(true));
  }, [near, mounted]);
  return (
    <div ref={ref} style={mounted ? undefined : { minHeight }}>
      {mounted && <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>}
    </div>
  );
}

let lastScrollAt = 0;
let scrollListening = false;
function trackScroll() {
  if (scrollListening) return;
  scrollListening = true;
  window.addEventListener("scroll", () => (lastScrollAt = performance.now()), { passive: true });
}

/** Mounts its children only once the box is on screen *and* the page has stopped scrolling for a moment and the browser is idle — for heavy
 * things like a WebGL map, whose set-up would otherwise land in the middle of a scroll and stutter it. The box keeps its size meanwhile
 * (give it `className`). Scrolling straight past never builds it at all. */
export function IdleMount({ children, className }: { children: ReactNode; className?: string }) {
  const [ref, visible] = useInView<HTMLDivElement>(0, "100px 0px 100px 0px");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!visible || ready) return;
    trackScroll();
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    let timer = 0;
    let idle = 0;
    const attempt = () => {
      if (performance.now() - lastScrollAt < 180) {
        timer = window.setTimeout(attempt, 90); // still scrolling — check again shortly
        return;
      }
      idle = w.requestIdleCallback ? w.requestIdleCallback(() => setReady(true), { timeout: 800 }) : window.setTimeout(() => setReady(true), 0);
    };
    timer = window.setTimeout(attempt, 120);
    return () => {
      window.clearTimeout(timer);
      if (idle) w.cancelIdleCallback?.(idle);
    };
  }, [visible, ready]);
  return (
    <div ref={ref} className={className}>
      {ready ? children : null}
    </div>
  );
}
