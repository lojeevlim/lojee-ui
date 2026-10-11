/** `<l-top>` / `<l-side>` / `<l-main>` / `<l-foot>`: the sections of `<l-app>`. Each one just files itself into the
 * matching slot of its parent `<l-app>` (so you never write `slot="…"`), and lays out as a block. */
export function defineAppSections() {
  const sections: [string, string | null][] = [
    ["l-top", "top"],
    ["l-side", "side"],
    ["l-main", null], // the default slot
    ["l-foot", "foot"],
  ];
  for (const [tag, slot] of sections) {
    if (customElements.get(tag)) continue;
    customElements.define(
      tag,
      class extends HTMLElement {
        connectedCallback() {
          if (slot) this.slot = slot;
          this.style.display = "block";
          this.style.minWidth = "0";
          // The side cell has a definite height; fill it so a `height="100%"` sidebar inside doesn't overflow and scroll away.
          if (tag === "l-side") this.style.height = "100%";
        }
      }
    );
  }
}
