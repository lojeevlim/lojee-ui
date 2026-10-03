import { useEffect, useState, type ComponentType } from "react";
import tailwindCss from "./tailwind-css";
import { setTooltipPortalCss } from "../core/tooltipPortal";
import { customAccentVars } from "../core/theme";

// Tooltips drawn through a portal live in a shared body-level layer (see core/tooltipPortal.ts); give it the stylesheet.
setTooltipPortalCss(tailwindCss);

/**
 * Wraps a React component with a `<style>` tag carrying the compiled
 * Tailwind CSS. Used only when that component is mounted into a shadow
 * root (via r2wc's `shadow: "open"`) — the style tag scopes to that shadow
 * tree, same as `adoptedStyleSheets` would, just simpler to wire up.
 */
export function withTailwind<Props extends object>(Component: ComponentType<Props>) {
  return function WithTailwind(props: Props) {
    const { theme, accent, color, active, design } = useHtmlTheme();
    return (
      <>
        <style>{tailwindCss}</style>
        {/* Mirror <html>'s theme attributes: the `dark:` variant matches an ancestor
            [data-theme], and the accent palette variables resolve against the Tailwind
            palette that only exists inside this shadow root's own stylesheet. */}
        <div style={{ display: "contents", ...(color ? customAccentVars(color) : {}) }} data-theme={theme} data-accent={accent} data-accent-color={color} data-active-variant={active} data-design={design}>
          <Component {...props} />
        </div>
      </>
    );
  };
}

/** Tracks <html data-theme / data-accent>, which ThemeProvider / applyTheme keep current. */
function useHtmlTheme() {
  const read = () => ({
    theme: document.documentElement.getAttribute("data-theme") ?? undefined,
    accent: document.documentElement.getAttribute("data-accent") ?? undefined,
    color: document.documentElement.getAttribute("data-accent-color") ?? undefined,
    active: document.documentElement.getAttribute("data-active-variant") ?? undefined,
    design: document.documentElement.getAttribute("data-design") ?? undefined,
  });
  const [state, setState] = useState(read);
  useEffect(() => {
    const sync = () => {
      const next = read();
      setState((prev) => (prev.theme === next.theme && prev.accent === next.accent && prev.color === next.color && prev.active === next.active && prev.design === next.design ? prev : next));
    };
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-accent", "data-accent-color", "data-active-variant", "data-design"] });
    sync();
    return () => obs.disconnect();
  }, []);
  return state;
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
