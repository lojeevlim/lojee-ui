import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { DOT_SCROLL_CSS } from "./DotScroll";

// The dotted glowing-dot scrollbar for the WHOLE PAGE (the browser window's own scroll), for pages that scroll the document instead of
// a container — a landing page, say. It hides the browser's scrollbar and draws a fixed track on the window's right edge with the same
// guide, dot, tail, particles (a few more of them) and top/bottom burst as `DotScroll`, only with a smaller dot. Mount it once.
// Follows `ThemeProvider scrollbar`: with "native" it renders nothing and leaves the browser's scrollbar alone.

const INSET = 8;
const SPARKS = 10;

export function PageScrollbar() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const idleRef = useRef(0);
  const endTimerRef = useRef(0);
  const lastRef = useRef(0);
  const atEndRef = useRef(false);
  const atStartRef = useRef(true);
  const box = useRef({ size: 0, track: 0 });
  const [hasThumb, setHasThumb] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [native, setNative] = useState(false);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const read = () => setNative(root.getAttribute("data-scrollbar") === "native");
    read();
    const obs = new MutationObserver(read);
    obs.observe(root, { attributes: true, attributeFilter: ["data-scrollbar"] });
    return () => obs.disconnect();
  }, []);

  // Hide the browser's own page scrollbar while ours is shown.
  useEffect(() => {
    if (native) return;
    const style = document.createElement("style");
    style.textContent = "html{scrollbar-width:none}html::-webkit-scrollbar{display:none}";
    document.head.appendChild(style);
    return () => style.remove();
  }, [native]);

  const measure = useCallback(() => {
    const el = document.scrollingElement ?? document.documentElement;
    const viewLen = window.innerHeight;
    const scrollLen = el.scrollHeight;
    if (scrollLen <= viewLen + 1) {
      setHasThumb(false);
      return;
    }
    const track = viewLen - INSET * 2;
    const size = Math.max(24, (track * viewLen) / scrollLen);
    const offset = INSET + ((track - size) * el.scrollTop) / (scrollLen - viewLen);
    box.current = { size, track };
    const t = thumbRef.current;
    if (t) {
      t.style.top = `${offset}px`;
      t.style.height = `${size}px`;
    }
    setHasThumb(true);
  }, []);

  useLayoutEffect(() => {
    if (native) return;
    measure();
    let raf = 0;
    const later = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    const ro = new ResizeObserver(later);
    ro.observe(document.documentElement);
    ro.observe(document.body);
    window.addEventListener("resize", later);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", later);
    };
  }, [measure, native]);

  useLayoutEffect(() => {
    if (hasThumb) measure();
  }, [hasThumb, measure]);

  useEffect(() => {
    if (native) return;
    const onScroll = () => {
      const el = document.scrollingElement ?? document.documentElement;
      const wrap = wrapRef.current;
      measure();
      const pos = el.scrollTop;
      const delta = pos - lastRef.current;
      lastRef.current = pos;
      if (delta !== 0) {
        wrap?.setAttribute("data-dir", delta > 0 ? "down" : "up");
        thumbRef.current?.style.setProperty("--tail", `${Math.min(56, 14 + Math.abs(delta) * 1.4)}px`);
      }
      // Reaching the top or bottom plays the edge effects (burst + ripple) once per arrival.
      const atEnd = pos >= el.scrollHeight - window.innerHeight - 1;
      const atStart = pos <= 1;
      if (((atEnd && !atEndRef.current && delta > 0) || (atStart && !atStartRef.current && delta < 0)) && wrap) {
        wrap.removeAttribute("data-end");
        void wrap.offsetWidth;
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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleRef.current);
      window.clearTimeout(endTimerRef.current);
    };
  }, [measure, native]);

  const startDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = document.scrollingElement ?? document.documentElement;
    e.preventDefault();
    const start = e.clientY;
    const startScroll = el.scrollTop;
    const ratio = (el.scrollHeight - window.innerHeight) / Math.max(1, box.current.track - box.current.size);
    setDragging(true);
    const move = (ev: PointerEvent) => window.scrollTo({ top: startScroll + (ev.clientY - start) * ratio });
    const up = () => {
      setDragging(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  if (native) return null;
  return (
    <div ref={wrapRef} data-axis="y" className="lojee-ds lojee-ds-page">
      <style>{DOT_SCROLL_CSS}</style>
      {hasThumb && (
        <div aria-hidden="true" className="lojee-ds-track" data-drag={dragging || undefined}>
          <div className="lojee-ds-guide" />
          <div ref={thumbRef} className="lojee-ds-thumb" onPointerDown={startDrag}>
            <div className="lojee-ds-bar">
              {Array.from({ length: SPARKS }, (_, i) => (
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
