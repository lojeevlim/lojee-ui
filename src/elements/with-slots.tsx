import { Fragment, useEffect, useRef, useState, type ComponentType } from "react";

/**
 * Many components only render a region (a footer, an actions row, the body) when they are given a React node for
 * it. As a custom element those regions arrive as light-DOM nodes instead, so the component would draw nothing.
 * `withSlots` looks at what the host actually contains and, for each region that has content, passes an empty
 * placeholder so the component renders it — the real nodes are then projected through the component's own
 * `<slot>`s. A prop the page set explicitly (e.g. a `bottom="…"` attribute) is left alone.
 *
 * `slots` maps a prop name to its slot name; `""` is the default slot (the element's unnamed children).
 */
export function withSlots<Props extends object>(Component: ComponentType<Props>, slots: Record<string, string>) {
  return function WithSlots(props: Props) {
    const ref = useRef<HTMLSpanElement>(null);
    const [present, setPresent] = useState<string>("");

    useEffect(() => {
      const root = ref.current?.getRootNode();
      const host = root instanceof ShadowRoot ? root.host : null;
      if (!host) return;
      const sync = () => {
        const names = new Set<string>();
        host.childNodes.forEach((n) => {
          if (n instanceof Element) names.add(n.getAttribute("slot") ?? "");
          else if (n.nodeType === Node.TEXT_NODE && n.textContent?.trim()) names.add("");
        });
        setPresent(Array.from(names).sort().join("|"));
      };
      sync();
      const obs = new MutationObserver(sync);
      obs.observe(host, { childList: true, characterData: true, subtree: true });
      return () => obs.disconnect();
    }, []);

    const names = present.split("|");
    const extra: Record<string, unknown> = {};
    for (const [prop, slot] of Object.entries(slots)) {
      if ((props as Record<string, unknown>)[prop] == null && names.includes(slot)) extra[prop] = <Fragment />;
    }
    return (
      <>
        <span ref={ref} hidden />
        <Component {...props} {...(extra as Partial<Props>)} />
      </>
    );
  };
}
