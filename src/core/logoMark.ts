// The lojeeUI logo as SVG markup (a 32x32 viewBox): four clay petals in a pinwheel. Shared by the <LogoMark> component, the runtime tab icon and the static favicon,
// so they always match. `colors` are the four petal fills (any CSS color, e.g. `var(--color-accent-500)`); `id` keeps the gradient ids unique per copy on a page.

const PETAL = "M3 12A9 9 0 0 1 12 3H14a1 1 0 0 1 1 1V12.5a2.5 2.5 0 0 1-2.5 2.5H6a3 3 0 0 1-3-3Z";
const LIGHT = [-1, -1]; // the light comes from the top-left; the lit side of a petal is toward it
const P_RAD = (deg: number) => (deg * Math.PI) / 180;

export function logoMarkMarkup(colors: string[], id: string): string {
  const defs: string[] = [
    `<filter id="${id}b" x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur stdDeviation="0.95"/></filter>`,
    `<filter id="${id}e" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="0.7"/></filter>`,
    `<filter id="${id}g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="0.55"/></filter>`,
  ];
  const shadows: string[] = [];
  const petals: string[] = [];
  colors.forEach((color, i) => {
    const ang = i * 90;
    const unrot = `rotate(${-ang} 16 16)`; // turns a light gradient back against the petal's own rotation, so every petal is lit from the same side
    // a global (x, y) offset, seen from inside the rotated petal
    const local = (dx: number, dy: number) => {
      const c = Math.cos(P_RAD(-ang));
      const s = Math.sin(P_RAD(-ang));
      return `translate(${(dx * c - dy * s).toFixed(3)} ${(dx * s + dy * c).toFixed(3)})`;
    };
    defs.push(
      `<clipPath id="${id}c${i}"><path d="${PETAL}"/></clipPath>`,
      // body: the lit side bright, the far side deep
      `<linearGradient id="${id}s${i}" gradientUnits="userSpaceOnUse" x1="9" y1="8" x2="25" y2="28" gradientTransform="${unrot}"><stop offset="0.35" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.38"/></linearGradient>`,
      // broad soft light, and a small hot spot of it (the wet shine of clay)
      `<radialGradient id="${id}h${i}" gradientUnits="userSpaceOnUse" cx="9" cy="8" r="16" gradientTransform="${unrot}"><stop stop-color="#fff" stop-opacity="0.55"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.14"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`,
      `<radialGradient id="${id}x${i}" gradientUnits="userSpaceOnUse" cx="8" cy="7" r="5.5" gradientTransform="${unrot}"><stop stop-color="#fff" stop-opacity="0.85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`,
      // light bounced back from the surface onto the shaded underside
      `<radialGradient id="${id}r${i}" gradientUnits="userSpaceOnUse" cx="24" cy="29" r="9" gradientTransform="${unrot}"><stop stop-color="#fff" stop-opacity="0.2"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`,
    );
    shadows.push(`<path d="${PETAL}" fill="#000" transform="rotate(${ang} 16 16)"/>`);
    petals.push(
      `<g transform="rotate(${ang} 16 16)">` +
        `<path d="${PETAL}" fill="${color}"/>` +
        `<path d="${PETAL}" fill="url(#${id}s${i})"/>` +
        `<path d="${PETAL}" fill="url(#${id}r${i})"/>` +
        // the pillow: the edge darkens a little all the way round, and a thin rim of light catches the lit edge
        `<g clip-path="url(#${id}c${i})">` +
        `<path d="${PETAL}" fill="none" stroke="#000" stroke-opacity="0.3" stroke-width="2.4" filter="url(#${id}e)"/>` +
        `<g transform="${local(LIGHT[0] * -1.1, LIGHT[1] * -1.1)}"><path d="${PETAL}" fill="none" stroke="#fff" stroke-opacity="0.5" stroke-width="1.6" filter="url(#${id}e)" transform="${local(0, 0)}"/></g>` +
        `</g>` +
        `<path d="${PETAL}" fill="url(#${id}h${i})"/>` +
        `<path d="${PETAL}" fill="url(#${id}x${i})" filter="url(#${id}g)"/>` +
        `</g>`,
    );
  });
  return `<defs>${defs.join("")}</defs><g filter="url(#${id}b)" fill-opacity="0.32" transform="translate(0.4 1.5)">${shadows.join("")}</g>${petals.join("")}`;
}
