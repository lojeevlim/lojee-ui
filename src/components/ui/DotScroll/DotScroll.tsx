import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { HTMLAttributes, PointerEvent as ReactPointerEvent, Ref, UIEvent } from "react";
import { cx } from "../../../core/tokens";

// A scroll container with the library's overlay scrollbar: the browser's own bar is hidden and a glowing accent dot rides a
// dotted guide line instead. While the content scrolls the dot trails a comet tail (longer the faster you scroll, on the side it
// is travelling away from) and sheds a few glowing particles. The dot can be dragged. It takes no layout space (absolutely
// positioned over the edge), only shows while the content overflows, and auto-hides when idle.
// Shipped as a <style> next to the container, so it works the same in React, inside a Web Component's shadow root, and without
// theme.css. The Sidebar draws the same scrollbar with its own CSS (`SIDEBAR_SCROLLBAR_CSS`).

export type DotScrollAxis = "y" | "x";

export interface DotScrollProps extends Omit<HTMLAttributes<HTMLDivElement>, "className"> {
  /** Scroll direction (default: "y"). */
  axis?: DotScrollAxis;
  /** Classes for the OUTER box — put the size limit here (`max-h-60`, `h-full`, `min-h-0 flex-1`, `rounded-lg border`…). The scrolling viewport inside fills it. */
  className?: string;
  /** Classes for the scrolling viewport inside — padding, gaps (`space-y-2`, `p-6`, `py-1`…). */
  viewportClassName?: string;
  /** "auto" (default) follows the theme (`ThemeProvider scrollbar`: "dot" unless set to "native"); "dot" / "native" force one. */
  scrollbar?: "auto" | "dot" | "native";
  /** Ref to the scrolling viewport element (for `scrollIntoView`, `scrollTop`…). */
  viewportRef?: Ref<HTMLDivElement>;
  /** Any other attributes (`role`, `id`, `data-*`, `onKeyDown`, `aria-*`) are placed on the scrolling viewport. */
}

const INSET = 8;

export const DOT_SCROLL_CSS = `
.lojee-ds-view { scrollbar-width: none; max-height: inherit; }
.lojee-ds-view::-webkit-scrollbar { display: none; }
.lojee-ds-track { position: absolute; z-index: 5; touch-action: none; opacity: 0; transition: opacity 0.3s ease; }
.lojee-ds[data-axis="y"] > .lojee-ds-track { right: 0; top: 0; height: 100%; width: 12px; }
.lojee-ds[data-axis="x"] > .lojee-ds-track { left: 0; bottom: 0; width: 100%; height: 12px; }
.lojee-ds[data-scrolling] > .lojee-ds-track, .lojee-ds-track:hover, .lojee-ds-track[data-drag] { opacity: 1; }
.lojee-ds-guide { position: absolute; color: currentColor; opacity: 0.18; }
.lojee-ds[data-axis="y"] .lojee-ds-guide { right: 6px; width: 1px; top: ${INSET}px; bottom: ${INSET}px; background: repeating-linear-gradient(to bottom, currentColor 0 2px, transparent 2px 7px); }
.lojee-ds[data-axis="x"] .lojee-ds-guide { bottom: 6px; height: 1px; left: ${INSET}px; right: ${INSET}px; background: repeating-linear-gradient(to right, currentColor 0 2px, transparent 2px 7px); }
.lojee-ds-thumb { position: absolute; cursor: grab; }
.lojee-ds-thumb:active { cursor: grabbing; }
.lojee-ds[data-axis="y"] .lojee-ds-thumb { right: 0; width: 12px; }
.lojee-ds[data-axis="x"] .lojee-ds-thumb { bottom: 0; height: 12px; }
.lojee-ds-bar { position: relative; width: 100%; height: 100%; }
.lojee-ds-bar::after { content: ""; position: absolute; left: 50%; top: 50%; width: 8px; height: 8px; border-radius: 9999px; transform: translate(-50%, -50%); background: var(--color-accent-500, #8b5cf6); box-shadow: 0 0 0 0 transparent; transition: width 0.15s ease, height 0.15s ease, background-color 0.3s ease, box-shadow 0.3s ease; }
.lojee-ds[data-scrolling] .lojee-ds-bar::after, .lojee-ds-track[data-drag] .lojee-ds-bar::after { box-shadow: 0 0 6px 2px color-mix(in srgb, var(--color-accent-500, #8b5cf6) 70%, transparent), 0 0 14px 4px color-mix(in srgb, var(--color-accent-500, #8b5cf6) 40%, transparent); }
.lojee-ds-track:hover .lojee-ds-bar::after, .lojee-ds-track[data-drag] .lojee-ds-bar::after { width: 10px; height: 10px; }
.lojee-ds-track[data-drag] .lojee-ds-bar::after { background-color: var(--color-accent-600, #7c3aed); }
/* Tail: a comet trail behind the dot, on the side it is travelling away from (data-dir on the container). */
.lojee-ds-bar::before { content: ""; position: absolute; border-radius: 9999px; opacity: 0; pointer-events: none; transition: height 0.45s cubic-bezier(.22,1,.36,1), width 0.45s cubic-bezier(.22,1,.36,1), opacity 0.45s ease; }
.lojee-ds[data-axis="y"] .lojee-ds-bar::before { left: 50%; width: 4px; height: 0; margin-left: -2px; }
.lojee-ds[data-axis="x"] .lojee-ds-bar::before { top: 50%; height: 4px; width: 0; margin-top: -2px; }
.lojee-ds[data-dir="down"] .lojee-ds-bar::before { bottom: 50%; background: linear-gradient(to top, color-mix(in srgb, var(--color-accent-500, #8b5cf6) 85%, transparent), transparent); }
.lojee-ds[data-dir="up"] .lojee-ds-bar::before { top: 50%; background: linear-gradient(to bottom, color-mix(in srgb, var(--color-accent-500, #8b5cf6) 85%, transparent), transparent); }
.lojee-ds[data-dir="right"] .lojee-ds-bar::before { right: 50%; background: linear-gradient(to left, color-mix(in srgb, var(--color-accent-500, #8b5cf6) 85%, transparent), transparent); }
.lojee-ds[data-dir="left"] .lojee-ds-bar::before { left: 50%; background: linear-gradient(to right, color-mix(in srgb, var(--color-accent-500, #8b5cf6) 85%, transparent), transparent); }
.lojee-ds[data-axis="y"][data-scrolling] .lojee-ds-bar::before, .lojee-ds[data-axis="y"] .lojee-ds-track[data-drag] .lojee-ds-bar::before { height: var(--tail, 24px); opacity: 1; }
.lojee-ds[data-axis="x"][data-scrolling] .lojee-ds-bar::before, .lojee-ds[data-axis="x"] .lojee-ds-track[data-drag] .lojee-ds-bar::before { width: var(--tail, 24px); opacity: 1; }
/* Particles: a few specks shed from the dot while scrolling, drifting back along the tail and fading out. */
.lojee-ds-spark { position: absolute; left: 50%; top: 50%; width: 3px; height: 3px; margin: -1.5px 0 0 -1.5px; border-radius: 9999px; background: var(--color-accent-500, #8b5cf6); box-shadow: 0 0 5px 1px color-mix(in srgb, var(--color-accent-500, #8b5cf6) 70%, transparent); opacity: 0; pointer-events: none; }
.lojee-ds-spark:nth-child(1) { --dx: -5px; --dist: 26px; --d: 0s; }
.lojee-ds-spark:nth-child(2) { --dx: -9px; --dist: 38px; --d: 0.17s; }
.lojee-ds-spark:nth-child(3) { --dx: -3px; --dist: 20px; --d: 0.34s; }
.lojee-ds-spark:nth-child(4) { --dx: -11px; --dist: 46px; --d: 0.5s; }
.lojee-ds-spark:nth-child(5) { --dx: -6px; --dist: 32px; --d: 0.68s; }
.lojee-ds-spark:nth-child(6) { --dx: -7px; --dist: 30px; --d: 0.08s; }
.lojee-ds-spark:nth-child(7) { --dx: -2px; --dist: 42px; --d: 0.26s; }
.lojee-ds-spark:nth-child(8) { --dx: -10px; --dist: 24px; --d: 0.42s; }
.lojee-ds-spark:nth-child(9) { --dx: -4px; --dist: 50px; --d: 0.58s; }
.lojee-ds-spark:nth-child(10) { --dx: -8px; --dist: 36px; --d: 0.76s; }
/* Whole-page variant (PageScrollbar): the track is fixed to the window's right edge; the dot is a little larger than a container's. */
.lojee-ds-page { position: static; }
.lojee-ds-page > .lojee-ds-track { position: fixed; top: 0; right: 0; width: 20px; height: 100vh; z-index: 60; }
.lojee-ds-page .lojee-ds-thumb { width: 20px !important; }
.lojee-ds-page .lojee-ds-guide { right: 9px !important; width: 2px !important; }
.lojee-ds-page .lojee-ds-bar::after { width: 12px; height: 12px; }
.lojee-ds-page .lojee-ds-track:hover .lojee-ds-bar::after, .lojee-ds-page .lojee-ds-track[data-drag] .lojee-ds-bar::after { width: 15px; height: 15px; }
.lojee-ds-page .lojee-ds-bar::before { width: 6px; margin-left: -3px; }
.lojee-ds-page .lojee-ds-spark { width: 4px; height: 4px; margin: -2px 0 0 -2px; }
.lojee-ds-page .lojee-ds-ring { width: 12px; height: 12px; margin: -6px 0 0 -6px; }
.lojee-ds-page .lojee-ds-burst { width: 4px; height: 4px; margin: -2px 0 0 -2px; --c: var(--color-accent-500, #8b5cf6); }
.lojee-ds[data-dir="down"], .lojee-ds[data-dir="right"] { --s: -1; }
.lojee-ds[data-dir="up"], .lojee-ds[data-dir="left"] { --s: 1; }
.lojee-ds[data-axis="y"][data-scrolling] .lojee-ds-spark, .lojee-ds[data-axis="y"] .lojee-ds-track[data-drag] .lojee-ds-spark { animation: lojee-ds-spark-y 0.85s ease-out infinite; animation-delay: var(--d); }
.lojee-ds[data-axis="x"][data-scrolling] .lojee-ds-spark, .lojee-ds[data-axis="x"] .lojee-ds-track[data-drag] .lojee-ds-spark { animation: lojee-ds-spark-x 0.85s ease-out infinite; animation-delay: var(--d); }
@keyframes lojee-ds-spark-y {
  0% { opacity: 0; transform: translate(0, 0) scale(1); }
  15% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--dx), calc(var(--s, -1) * var(--dist))) scale(0.3); }
}
@keyframes lojee-ds-spark-x {
  0% { opacity: 0; transform: translate(0, 0) scale(1); }
  15% { opacity: 1; }
  100% { opacity: 0; transform: translate(calc(var(--s, -1) * var(--dist)), var(--dx)) scale(0.3); }
}
/* Reaching the end: a burst of specks flies out of the dot and a ripple ring expands from it (data-end, set for a moment when the content scrolls to its last edge). */
.lojee-ds-burst, .lojee-ds-ring { position: absolute; left: 50%; top: 50%; border-radius: 9999px; opacity: 0; pointer-events: none; }
.lojee-ds-burst { width: 3px; height: 3px; margin: -1.5px 0 0 -1.5px; background: var(--color-accent-500, #8b5cf6); --c: var(--color-accent-500, #8b5cf6); box-shadow: 0 -5px 0 0 var(--c), 0 5px 0 0 var(--c), 5px 0 0 0 var(--c), -5px 0 0 0 var(--c), 3.5px -3.5px 0 0 var(--c), -3.5px -3.5px 0 0 var(--c), 3.5px 3.5px 0 0 var(--c), -3.5px 3.5px 0 0 var(--c); }
.lojee-ds-ring { width: 8px; height: 8px; margin: -4px 0 0 -4px; border: 2px solid var(--color-accent-500, #8b5cf6); }
.lojee-ds[data-end] .lojee-ds-burst { animation: lojee-ds-burst 0.75s ease-out; }
.lojee-ds[data-end] .lojee-ds-ring { animation: lojee-ds-ring 0.8s ease-out; }
@keyframes lojee-ds-burst { 0% { opacity: 1; transform: scale(0.5); } 100% { opacity: 0; transform: scale(3.6); } }
@keyframes lojee-ds-ring { 0% { opacity: 0.85; transform: scale(1); } 100% { opacity: 0; transform: scale(4.5); } }
@media (prefers-reduced-motion: reduce) {
  .lojee-ds-spark, .lojee-ds-burst, .lojee-ds-ring { display: none; }
  .lojee-ds-bar::before { transition: none; }
}
`;

export function DotScroll({ axis = "y", className, viewportClassName, viewportRef, scrollbar = "auto", children, onScroll, ...rest }: DotScrollProps) {
  const vertical = axis === "y";
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const idleRef = useRef(0);
  const lastRef = useRef(0);
  const atEndRef = useRef(false);
  const atStartRef = useRef(true);
  const endTimerRef = useRef(0);
  const box = useRef({ size: 0, track: 0 });
  const [hasThumb, setHasThumb] = useState(false);
  // "auto" reads the nearest [data-scrollbar] (set by ThemeProvider, mirrored into web components); no attribute means "dot".
  const [themeMode, setThemeMode] = useState<"dot" | "native">("dot");
  const native = (scrollbar === "auto" ? themeMode : scrollbar) === "native";
  const [dragging, setDragging] = useState(false);

  const setViewRef = useCallback(
    (el: HTMLDivElement | null) => {
      viewRef.current = el;
      if (typeof viewportRef === "function") viewportRef(el);
      else if (viewportRef) (viewportRef as { current: HTMLDivElement | null }).current = el;
    },
    [viewportRef]
  );

  // Places the dot: size/offset from the viewport's scroll metrics, written straight to the DOM on every scroll frame.
  const measure = useCallback(() => {
    const el = viewRef.current;
    if (!el) return;
    const scrollLen = vertical ? el.scrollHeight : el.scrollWidth;
    const viewLen = vertical ? el.clientHeight : el.clientWidth;
    if (scrollLen <= viewLen + 1) {
      setHasThumb(false);
      return;
    }
    const track = viewLen - INSET * 2;
    const size = Math.max(24, (track * viewLen) / scrollLen);
    const pos = vertical ? el.scrollTop : el.scrollLeft;
    const offset = INSET + ((track - size) * pos) / (scrollLen - viewLen);
    box.current = { size, track };
    const t = thumbRef.current;
    if (t) {
      t.style[vertical ? "top" : "left"] = `${offset}px`;
      t.style[vertical ? "height" : "width"] = `${size}px`;
    }
    setHasThumb(true);
  }, [vertical]);

  useLayoutEffect(() => {
    const el = viewRef.current;
    if (!el || native) return;
    measure();
    let raf = 0;
    const later = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    const ro = new ResizeObserver(later);
    ro.observe(el);
    const mo = new MutationObserver(later);
    mo.observe(el, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
    };
  }, [measure, native]);
  useLayoutEffect(() => {
    if (scrollbar !== "auto") return;
    const host = wrapRef.current?.closest("[data-scrollbar]") ?? document.documentElement;
    const read = () => setThemeMode(host.getAttribute("data-scrollbar") === "native" ? "native" : "dot");
    read();
    const obs = new MutationObserver(read);
    obs.observe(host, { attributes: true, attributeFilter: ["data-scrollbar"] });
    return () => obs.disconnect();
  }, [scrollbar]);
  useEffect(
    () => () => {
      window.clearTimeout(idleRef.current);
      window.clearTimeout(endTimerRef.current);
    },
    []
  );

  // The thumb element mounts after the first measure said "overflowing" — place it once it exists.
  useLayoutEffect(() => {
    if (hasThumb) measure();
  }, [hasThumb, measure]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    onScroll?.(e);
    const el = e.currentTarget;
    const wrap = wrapRef.current;
    measure();
    const pos = vertical ? el.scrollTop : el.scrollLeft;
    const delta = pos - lastRef.current;
    lastRef.current = pos;
    if (delta !== 0) {
      wrap?.setAttribute("data-dir", vertical ? (delta > 0 ? "down" : "up") : delta > 0 ? "right" : "left");
      thumbRef.current?.style.setProperty("--tail", `${Math.min(64, 16 + Math.abs(delta) * 1.6)}px`);
    }
    // Reaching the first or last edge fires the edge effects (a burst of specks + a ripple ring) once per arrival.
    const atEnd = pos >= (vertical ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth) - 1;
    const atStart = pos <= 1;
    if (((atEnd && !atEndRef.current && delta > 0) || (atStart && !atStartRef.current && delta < 0)) && wrap) {
      wrap.removeAttribute("data-end");
      void wrap.offsetWidth; // restart the animations if one edge follows the other quickly
      wrap.setAttribute("data-end", "");
      window.clearTimeout(endTimerRef.current);
      endTimerRef.current = window.setTimeout(() => wrap.removeAttribute("data-end"), 900);
    }
    if (!atEnd && !atStart) wrap?.removeAttribute("data-end");
    atEndRef.current = atEnd;
    atStartRef.current = atStart;
    wrap?.setAttribute("data-scrolling", "");
    window.clearTimeout(idleRef.current);
    idleRef.current = window.setTimeout(() => wrap?.removeAttribute("data-scrolling"), 900);
  };

  // Dragging the dot scrolls the content by the same ratio the dot moves along its track.
  const startDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = viewRef.current;
    if (!el) return;
    e.preventDefault();
    const start = vertical ? e.clientY : e.clientX;
    const startScroll = vertical ? el.scrollTop : el.scrollLeft;
    const scrollLen = vertical ? el.scrollHeight : el.scrollWidth;
    const viewLen = vertical ? el.clientHeight : el.clientWidth;
    const ratio = (scrollLen - viewLen) / Math.max(1, box.current.track - box.current.size);
    setDragging(true);
    const move = (ev: PointerEvent) => {
      const next = startScroll + ((vertical ? ev.clientY : ev.clientX) - start) * ratio;
      if (vertical) el.scrollTop = next;
      else el.scrollLeft = next;
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div ref={wrapRef} data-axis={axis} className={cx("lojee-ds relative min-h-0 min-w-0", className)}>
      <style>{DOT_SCROLL_CSS}</style>
      <div
        {...rest}
        ref={setViewRef}
        onScroll={native ? onScroll : handleScroll}
        className={cx(native ? "h-full max-h-[inherit]" : "lojee-ds-view h-full", vertical ? "overflow-y-auto overflow-x-hidden" : "overflow-x-auto overflow-y-hidden", viewportClassName)}
      >
        {children}
      </div>
      {hasThumb && !native && (
        <div aria-hidden="true" className="lojee-ds-track" data-drag={dragging || undefined}>
          <div className="lojee-ds-guide" />
          <div ref={thumbRef} className="lojee-ds-thumb" onPointerDown={startDrag}>
            <div className="lojee-ds-bar">
              {[0, 1, 2, 3, 4].map((i) => (
                <i key={i} className="lojee-ds-spark" />
              ))}
              <b className="lojee-ds-ring" />
              <b className="lojee-ds-burst" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
