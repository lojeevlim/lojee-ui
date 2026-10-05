// Keeps the browser-tab icon in the theme's accent color: the logo tile is redrawn with `--color-accent-600` whenever the
// accent (or mode) changes on <html>. Browser-only; call once at startup.

const GLYPH =
  '<path d="M10 7.5a1.5 1.5 0 0 1 3 0V19h8.5a1.5 1.5 0 0 1 0 3H11.5A1.5 1.5 0 0 1 10 20.5v-13Z" fill="#fff"/>' +
  '<circle cx="21" cy="10.5" r="2.5" fill="#fff" fill-opacity="0.85"/>';

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
    const raw = getComputedStyle(root).getPropertyValue("--color-accent-600").trim();
    const hex = raw ? toHex(raw) : null;
    if (!hex || hex === last) return;
    last = hex;
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">` +
      `<rect width="32" height="32" rx="9" fill="${hex}"/>` +
      `<rect x="0.5" y="0.5" width="31" height="31" rx="8.5" stroke="#fff" stroke-opacity="0.18"/>${GLYPH}</svg>`;
    link!.href = "data:image/svg+xml," + encodeURIComponent(svg);
  };
  apply();
  const obs = new MutationObserver(apply);
  obs.observe(root, { attributes: true, attributeFilter: ["data-accent", "data-accent-color", "data-theme", "style"] });
  return () => obs.disconnect();
}
