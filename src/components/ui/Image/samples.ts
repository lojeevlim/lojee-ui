// Demo pictures drawn on the fly as SVG data URIs, so the docs need no network and no image files.
const PALETTES: [string, string][] = [
  ["#6366f1", "#ec4899"],
  ["#0ea5e9", "#22c55e"],
  ["#f59e0b", "#ef4444"],
  ["#14b8a6", "#6366f1"],
];

export function sampleImage(seed = 0, width = 800, height = 500): string {
  const [a, b] = PALETTES[seed % PALETTES.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><circle cx="${width * 0.78}" cy="${height * 0.28}" r="${height * 0.14}" fill="#fff" fill-opacity=".35"/><path d="M0 ${height} L${width * 0.32} ${height * 0.46} L${width * 0.55} ${height * 0.78} L${width * 0.72} ${height * 0.58} L${width} ${height} Z" fill="#fff" fill-opacity=".28"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
