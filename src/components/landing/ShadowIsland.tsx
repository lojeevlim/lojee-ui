import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import tailwindCss from "../../elements/tailwind-css";

/**
 * Renders its children inside a shadow root with its own copy of the stylesheet, and puts `attrs` (data-theme, data-design, data-accent,
 * data-active-variant …) on the wrapper inside it. The page's own theme rules can't reach in — which matters for the design language:
 * theme.css styles Clay with `[data-design="clay"] …` descendant selectors, so a Bento island inside a Clay page would still be drawn as Clay.
 * Behind a shadow boundary it is the island's own attributes that count.
 */
export default function ShadowIsland({ attrs, children, className, style }: { attrs: Record<string, unknown>; children: ReactNode; className?: string; style?: CSSProperties }) {
  const host = useRef<HTMLDivElement>(null);
  const root = useRef<Root | null>(null);

  const render = () => {
    root.current?.render(
      <div {...attrs} className="h-full w-full bg-surface text-fg" style={attrs.style as CSSProperties | undefined}>
        {children}
      </div>
    );
  };

  useEffect(() => {
    const el = host.current;
    if (!el || root.current) return;
    const shadow = el.shadowRoot ?? el.attachShadow({ mode: "open" });
    const css = document.createElement("style");
    css.textContent = `:host{display:block}${tailwindCss}`;
    const mount = document.createElement("div");
    mount.style.height = "100%";
    shadow.replaceChildren(css, mount); // replaceChildren: a dev-mode double mount must not leave the first pair behind
    root.current = createRoot(mount);
    render();
    return () => {
      const r = root.current;
      root.current = null;
      // Unmounting while React is rendering is not allowed, so it is deferred a tick.
      setTimeout(() => r?.unmount());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mounted once; later renders go through the effect below
  }, []);

  useEffect(render);

  return <div ref={host} className={className} style={style} />;
}
