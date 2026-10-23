// The lojeeUI logo as SVG markup: a "LUI" monogram drawn as ONE continuous stroke. The L's foot sweeps up into the U, the U's right stem swoops down into the I.
// Shared by the <LogoMark> component, the runtime tab icon and the static favicon, so they always match. `colors` are gradient stops left to right
// (any CSS color, e.g. `var(--color-accent-500)`); `id` keeps the gradient id unique per copy on a page.

export const LOGO_VIEWBOX = "0 0 68 32"; // the full monogram
export const LOGO_GLYPH_VIEWBOX = "3 -6 44 44"; // the L-into-U part, centered in a square (for the tab icon)

const L_TO_U = "M6 4V22Q6 28 12 28C22 28 26 16 28 4V20A8 8 0 0 0 44 20V4";
const U_TO_I = "C44 20 50 28 58 28Q62 28 62 24V4";

function build(path: string, colors: string[], id: string, x2: number): string {
  const last = Math.max(1, colors.length - 1);
  const stops = colors.map((c, i) => `<stop offset="${(i / last).toFixed(2)}" stop-color="${c}"/>`).join("");
  return `<defs><linearGradient id="${id}g" gradientUnits="userSpaceOnUse" x1="6" y1="0" x2="${x2}" y2="0">${stops}</linearGradient></defs><path d="${path}" stroke="url(#${id}g)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
}

export function logoMarkMarkup(colors: string[], id: string): string {
  return build(L_TO_U + U_TO_I, colors, id, 62);
}

/** Just the L and U, sized to fit a square icon. */
export function logoGlyphMarkup(colors: string[], id: string): string {
  return build(L_TO_U, colors, id, 44);
}
