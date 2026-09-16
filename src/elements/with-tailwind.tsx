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
