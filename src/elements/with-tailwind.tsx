import type { ComponentType } from "react";
import tailwindCss from "./tailwind-css";

/**
 * Wraps a React component with a `<style>` tag carrying the compiled
 * Tailwind CSS. Used only when that component is mounted into a shadow
 * root (via r2wc's `shadow: "open"`) — the style tag scopes to that shadow
 * tree, same as `adoptedStyleSheets` would, just simpler to wire up.
 */
export function withTailwind<Props extends object>(Component: ComponentType<Props>) {
  return function WithTailwind(props: Props) {
    return (
      <>
        <style>{tailwindCss}</style>
        <Component {...props} />
      </>
    );
  };
}

/**
 * Forces the custom element's own host box to `display: block` — the
 * browser default for an unstyled custom element is `display: inline`,
 * which lets several same-level siblings (e.g. a row of `<l-sidebar-menu-item>`
 * projected into `<l-sidebar>`'s nav slot) sit side by side on one line
 * instead of stacking, no matter what layout classes the *inside* of their
 * own shadow root uses — `:host` is the only selector that reaches the
 * outer box from inside its own shadow tree. A no-op outside a shadow root
 * (plain React usage), since `:host` matches nothing there.
 */
export function withHostBlock<Props extends object>(Component: ComponentType<Props>) {
  return function WithHostBlock(props: Props) {
    return (
      <>
        <style>{":host{display:block}"}</style>
        <Component {...props} />
      </>
    );
  };
}
