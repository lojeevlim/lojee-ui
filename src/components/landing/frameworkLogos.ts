// Brand logos for the framework diagram, as inline SVG data URIs (full colour, theme-independent).
const svg = (viewBox: string, body: string) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`)}`;

const REACT_RING = (rot: number) => `<ellipse rx="11" ry="4.2" transform="rotate(${rot})"/>`;

export const LOGOS: Record<string, string> = {
  react: svg(
    "-11.5 -10.2 23 20.4",
    `<circle r="2.05" fill="#61dafb"/><g fill="none" stroke="#61dafb" stroke-width="1">${REACT_RING(0)}${REACT_RING(60)}${REACT_RING(120)}</g>`
  ),
  // The source component: the React logo with the Tailwind CSS logo beside it (the component is a React + Tailwind component).
  reactTailwind: svg(
    "0 0 100 40",
    `<g transform="translate(19 20) scale(1.7)"><circle r="2.05" fill="#61dafb"/><g fill="none" stroke="#61dafb" stroke-width="1">${REACT_RING(0)}${REACT_RING(60)}${REACT_RING(120)}</g></g><g transform="translate(50 3.5) scale(0.85)"><path fill="#38bdf8" fill-rule="evenodd" clip-rule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"/></g>`
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
