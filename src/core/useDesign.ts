import { useCallback, useState, useSyncExternalStore } from "react";
import { isDesign, type DesignName } from "./theme";

/**
 * Which design ("bento" | "clay") applies at an element — the nearest ancestor carrying `data-design`, which is `<html>`,
 * an isolated `ThemeProvider` / `App` wrapper, or the mirrored wrapper inside a Web Component's shadow root.
 * Returns `[ref, design]`: attach `ref` to any element of the component. For components that need to *draw* differently
 * under a design (SVG shapes), where CSS alone can't reach.
 */
export function useDesign(): [(el: HTMLElement | null) => void, DesignName] {
  const [el, setEl] = useState<HTMLElement | null>(null);

  const subscribe = useCallback(
    (notify: () => void) => {
      if (!el) return () => {};
      const obs = new MutationObserver(notify);
      obs.observe(el.getRootNode(), { attributes: true, attributeFilter: ["data-design"], subtree: true });
      return () => obs.disconnect();
    },
    [el]
  );
  const getSnapshot = useCallback((): DesignName => {
    const v = el?.closest("[data-design]")?.getAttribute("data-design");
    return isDesign(v) ? v : "bento";
  }, [el]);

  const design = useSyncExternalStore(subscribe, getSnapshot, () => "bento" as DesignName);
  return [setEl, design];
}
