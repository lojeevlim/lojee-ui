/**
 * Where `el` sits inside `container`, in layout pixels: its left / top offset and its width / height.
 *
 * Unlike `getBoundingClientRect()`, this ignores CSS transforms. A sliding "active" pill that measures its item with a
 * bounding rect lands in the wrong place whenever the component is mid enter-transition — "bounce" starts at `scale(0.3)`,
 * "zoom", "flip" and "rotate" distort the rect too — and then never corrects itself, because nothing re-measures once the
 * animation ends. Offsets are layout values, so they are right from the first frame.
 * Falls back to the bounding rect when `container` is not in `el`'s offsetParent chain.
 */
export function layoutBox(el: HTMLElement, container: HTMLElement): { left: number; top: number; width: number; height: number } {
  let left = 0;
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== container) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  if (node === container) return { left, top, width: el.offsetWidth, height: el.offsetHeight };
  const c = container.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { left: r.left - c.left, top: r.top - c.top, width: r.width, height: r.height };
}
