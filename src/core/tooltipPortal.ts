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

// Portals into the nearest shadow root (falling back to `document.body` in
// plain React usage) so the tooltip renders as a SIBLING of any scrollable
// ancestor instead of a descendant of it — CSS `overflow: hidden`/`auto`
// clips absolutely-positioned descendants regardless of position scheme
// (including `position: fixed`), so a collapsed rail's scrollable body would
// otherwise force a choice between "scrolls" and "tooltip isn't cut off".
// Portaling out of that subtree entirely removes the tradeoff. Still
// correctly styled once wrapped as a Web Component since the injected
// Tailwind stylesheet is scoped to (and applies throughout) the whole shadow
// root, not just the specific subtree a component originally rendered into.
export function getTooltipPortalRoot(node: Node | null): Element | DocumentFragment {
  const root = node?.getRootNode();
  return root instanceof ShadowRoot ? root : document.body;
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
