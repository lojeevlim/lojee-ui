/** `<l-sidebar-header>` / `<l-sidebar-footer>`: each files itself into the matching slot of its parent `<l-sidebar>` (so you never write
 * `slot="…"`), and lays out as a block. */
export function sidebarRegionClass(slot: "header" | "footer") {
  return class extends HTMLElement {
    connectedCallback() {
      this.slot = slot;
      this.style.display = "block";
    }
  };
}
