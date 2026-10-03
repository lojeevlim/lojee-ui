import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

export type TooltipPortalPosition = "top" | "bottom" | "left" | "right";

// Portaling to `document.body` makes the tooltip a SIBLING of whatever else
// is on the page (including a Modal, which sits at `z-[100]`) rather than a
// descendant of its trigger — so its own z-index has to outrank anything it
// could plausibly render inside (a Playground's Modal included), not just
// look high enough in isolation.
export const TOOLTIP_PORTAL_Z_CLASS = "z-[200]";

export interface TooltipPortalState {
  rect: DOMRect;
  root: Element | DocumentFragment;
}

// Inside a Web Component a tooltip must not stay in the component's own shadow root: ancestors in the page can
// establish a containing block for `position: fixed` (a transformed or container-query `<l-App>` section, a
// `contain`ed panel) and clip it, so the bubble would land in the wrong place or be cut off. Instead it is drawn in
// one shared, body-level shadow root — a plain fixed layer — which gets its own copy of the compiled stylesheet
// (registered by the elements bundle through `setTooltipPortalCss`) and mirrors the page's theme attributes.
// Plain React usage has no shadow root and simply portals to `document.body`.
let tooltipCss = "";
export function setTooltipPortalCss(css: string) {
  tooltipCss = css;
}

const THEME_ATTRS = ["data-theme", "data-accent", "data-accent-color", "data-active-variant", "data-design"] as const;

function getBodyTooltipRoot(): Element {
  let host = document.querySelector<HTMLElement>("[data-lojee-tooltip-layer]");
  if (!host) {
    host = document.createElement("div");
    host.setAttribute("data-lojee-tooltip-layer", "");
    // Zero-size fixed box at the viewport origin: the portal content inside is positioned in viewport coordinates.
    host.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;z-index:2147483647;pointer-events:none";
    const shadow = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = tooltipCss;
    const root = document.createElement("div");
    root.setAttribute("data-lojee-tooltip-root", "");
    root.style.display = "contents";
    shadow.append(style, root);
    document.body.appendChild(host);
  }
  const root = host.shadowRoot!.querySelector("[data-lojee-tooltip-root]") as HTMLElement;
  // Keep the layer in step with the page's current theme (light/dark, accent) every time a tooltip opens.
  for (const attr of THEME_ATTRS) {
    const value = document.documentElement.getAttribute(attr);
    if (value == null) root.removeAttribute(attr);
    else root.setAttribute(attr, value);
  }
  return root;
}

export function getTooltipPortalRoot(node: Node | null): Element | DocumentFragment {
  const root = node?.getRootNode();
  if (root instanceof ShadowRoot) return tooltipCss ? getBodyTooltipRoot() : root;
  return document.body;
}

// Where the tooltip bubble is positioned relative to `rect` (the trigger's
// viewport-relative bounding box), computed in JS since this renders through
// a portal instead of relying on CSS to anchor it to its trigger.
export function tooltipPortalPositionStyle(
  rect: DOMRect,
  position: TooltipPortalPosition
): { top: number; left: number; transform: string } {
  const GAP = 8;
  switch (position) {
    case "bottom":
      return { top: rect.bottom + GAP, left: rect.left + rect.width / 2, transform: "translate(-50%, 0)" };
    case "left":
      return { top: rect.top + rect.height / 2, left: rect.left - GAP, transform: "translate(-100%, -50%)" };
    case "right":
      return { top: rect.top + rect.height / 2, left: rect.right + GAP, transform: "translate(0, -50%)" };
    case "top":
    default:
      return { top: rect.top - GAP, left: rect.left + rect.width / 2, transform: "translate(-50%, -100%)" };
  }
}

export interface UseTooltipPortalResult<T extends HTMLElement> {
  ref: RefObject<T | null>;
  state: TooltipPortalState | null;
  show: () => void;
  hide: () => void;
}

// Shared show/hide/positioning logic for a hover/focus-triggered portal
// tooltip on a single trigger element. Each call site (e.g. each nav item in
// a list) needs its own hook instance, so this can't be called from inside a
// `.map()` in the parent — extract a small per-item component instead.
export function useTooltipPortal<T extends HTMLElement>(): UseTooltipPortalResult<T> {
  const ref = useRef<T>(null);
  // Ref values can't be read during render (only in effects/handlers), so the
  // portal target is captured into state alongside the rect at the moment of
  // hover/focus, rather than re-reading `ref.current` during render.
  const [state, setState] = useState<TooltipPortalState | null>(null);

  const show = () => {
    const el = ref.current;
    if (!el) return;
    setState({ rect: el.getBoundingClientRect(), root: getTooltipPortalRoot(el) });
  };
  const hide = () => setState(null);

  // `scroll` events don't bubble, so an ancestor (e.g. a collapsed sidebar's
  // scrollable nav body) scrolling wouldn't reach a plain `onScroll` here — a
  // capture-phase listener on `window` is the standard way to still catch it,
  // since capture fires top-down through every ancestor of the actual
  // scrolling element regardless of bubbling. Only attached while the
  // tooltip is actually showing, and only for as long as that.
  useEffect(() => {
    if (!state) return;
    window.addEventListener("scroll", hide, { capture: true, passive: true });
    return () => window.removeEventListener("scroll", hide, { capture: true });
  }, [state]);

  return { ref, state, show, hide };
}
