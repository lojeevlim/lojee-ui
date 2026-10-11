import { useEffect, useRef, useState } from "react";
import { Sidebar, SidebarFooter, SidebarHeader, type SidebarProps } from "../components/ui/Sidebar/Sidebar";

/**
 * `<l-sidebar>` with the two composed regions React gets as `<SidebarHeader>` / `<SidebarFooter>` children: put your own markup in
 * `<l-sidebar-header>` / `<l-sidebar-footer>` (or any element with `slot="header"` / `slot="footer"`) and it is docked above / below the nav rows. Only the regions the page actually
 * filled are rendered, so the plain `header` / `headerIcon` / `footer` attributes keep working when no slot is used.
 */
export function SidebarElement(props: SidebarProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [slots, setSlots] = useState({ header: false, footer: false });
  // Inside `<l-side>` (the app shell's side cell) the sidebar fills that cell instead of the 100vh default, which would overflow it and
  // let the cell scroll the sidebar's header out of view.
  const [inSide, setInSide] = useState(false);

  useEffect(() => {
    const root = ref.current?.getRootNode();
    const host = root instanceof ShadowRoot ? root.host : null;
    if (!host) return;
    if (host.closest("l-side")) {
      setInSide(true);
      host.style.height = "100%";
    }
    const sync = () => {
      const has = (name: string) => Array.from(host.children).some((n) => n.getAttribute("slot") === name);
      setSlots((prev) => {
        const next = { header: has("header"), footer: has("footer") };
        return prev.header === next.header && prev.footer === next.footer ? prev : next;
      });
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(host, { childList: true, subtree: true, attributes: true, attributeFilter: ["slot"] });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <span ref={ref} hidden />
      <Sidebar {...props} height={props.height ?? (inSide ? "100%" : undefined)}>
        {slots.header && (
          <SidebarHeader>
            <slot name="header" />
          </SidebarHeader>
        )}
        {slots.footer && (
          <SidebarFooter>
            <slot name="footer" />
          </SidebarFooter>
        )}
      </Sidebar>
    </>
  );
}
