// Brand logos for the framework diagram, as inline SVG data URIs (full colour, theme-independent).
const svg = (viewBox: string, body: string) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`)}`;

const REACT_RING = (rot: number) => `<ellipse rx="11" ry="4.2" transform="rotate(${rot})"/>`;

export const LOGOS: Record<string, string> = {
  react: svg(
    "-11.5 -10.2 23 20.4",
    `<circle r="2.05" fill="#61dafb"/><g fill="none" stroke="#61dafb" stroke-width="1">${REACT_RING(0)}${REACT_RING(60)}${REACT_RING(120)}</g>`
  ),
  vue: svg(
    "0 0 261.76 226.69",
    `<path fill="#41b883" d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z"/><path fill="#34495e" d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z"/>`
  ),
  angular: svg(
    "0 0 250 250",
    `<path fill="#dd0031" d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z"/><path fill="#c3002f" d="M125 30v22.2V230l78.9-43.7 14.2-123.1L125 30z"/><path fill="#fff" d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z"/>`
  ),
  // TypeScript and JavaScript side by side — the "plain" way to use the custom elements.
  js: svg(
    "0 0 270 128",
    `<rect width="128" height="128" rx="10" fill="#3178c6"/><text x="118" y="116" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="64" fill="#fff">TS</text><rect x="142" width="128" height="128" rx="10" fill="#f7df1e"/><text x="260" y="116" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="64" fill="#000">JS</text>`
  ),
};
