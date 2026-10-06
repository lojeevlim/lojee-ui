import { useEffect, useRef, useState } from "react";

/** When a glass Card / Button lights up (dark mode only): "hover" while the pointer is over it, "press" while it is pressed (fading out after), "scroll" while it is at the vertical centre of the viewport. */
export type GlassLighting = "hover" | "press" | "scroll";

/**
 * Wires the `lighting` prop of a glass component. Returns `[ref, attrs]`: a ref for its root element and the data attributes (spread onto it) that theme.css reads:
 * `data-lighting` names the mode, and `data-lit` is set by the "scroll" mode while the element's vertical centre is near the viewport's centre
 * ("hover" and "press" are plain CSS `:hover` / `:active`).
 */
export function useGlassLighting<T extends HTMLElement>(lighting: GlassLighting | undefined, active = true) {
  const ref = useRef<T>(null);
  const [lit, setLit] = useState(false);
  const scroll = active && lighting === "scroll";
  useEffect(() => {
    const el = ref.current;
    if (!scroll || !el) return;
    // Lit while the element's vertical centre is near the viewport's centre (within a quarter of the viewport height either side); scroll listeners
    // are on the capture phase so a scrolling panel (not just the window) drives it too.
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setLit(Math.abs(r.top + r.height / 2 - vh / 2) <= vh * 0.25);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
    };
  }, [scroll]);
  const attrs: { "data-lighting"?: GlassLighting; "data-lit"?: "" } = active && lighting ? { "data-lighting": lighting } : {};
  if (scroll && lit) attrs["data-lit"] = "";
  return [ref, attrs] as const;
}
