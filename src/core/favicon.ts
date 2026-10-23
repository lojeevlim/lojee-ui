// Keeps the browser-tab icon in the theme's accent color: the logo stroke is redrawn with the `--color-accent-*` stops whenever the
// accent (or mode) changes on <html>. Browser-only; call once at startup.

import { LOGO_GLYPH_VIEWBOX, logoGlyphMarkup } from "./logoMark";

const SHADES = [400, 500, 600, 700];

// Any CSS color (the palette is oklch) as an #rrggbb string, resolved by the browser itself via a 1px canvas.
function toHex(color: string): string | null {
  const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.canvas.width = ctx.canvas.height = 1;
  ctx.fillStyle = "#000";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

export function syncFaviconWithTheme(): () => void {
  if (typeof document === "undefined") return () => {};
  const root = document.documentElement;
  let link = document.querySelector<HTMLLinkElement>('link[rel~="icon"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.type = "image/svg+xml";
  let last = "";
  const apply = () => {
    const style = getComputedStyle(root);
    const stop = (n: number) => {
      const raw = style.getPropertyValue(`--color-accent-${n}`).trim();
      return raw ? toHex(raw) : null;
    };
    const colors = SHADES.map(stop);
    if (colors.some((c) => !c)) return;
    const key = colors.join();
    if (key === last) return;
    last = key;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="${LOGO_GLYPH_VIEWBOX}" fill="none">${logoGlyphMarkup(colors as string[], "f")}</svg>`;
    link!.href = "data:image/svg+xml," + encodeURIComponent(svg);
  };
  apply();
  const obs = new MutationObserver(apply);
  obs.observe(root, { attributes: true, attributeFilter: ["data-accent", "data-accent-color", "data-theme", "style"] });
  return () => obs.disconnect();
}
