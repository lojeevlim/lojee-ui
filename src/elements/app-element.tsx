import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { App, Top, Side, Main, Foot, type MainPadding } from "../components/ui/AppLayout/App";
import { useAppLayout } from "../components/ui/AppLayout/appLayoutContext";
import { ThemeProvider } from "../components/ui/Theme/ThemeProvider";
import type { AppTheme, GridLayout } from "../components/ui/AppLayout/appLayout";
import type { AppBreakpoint } from "../components/ui/AppLayout/breakpoints";
import { isHexColor, isDesign, type Accent, type DesignName } from "../core/theme";
import type { ActiveVariant } from "../core/activeVariant";

const TOGGLE_EVENT = "lojee-side-toggle";

/** The custom element whose shadow root this React tree is mounted in, if any. */
function hostOf(node: Element | null): HTMLElement | null {
  const root = node?.getRootNode();
  return root instanceof ShadowRoot ? (root.host as HTMLElement) : null;
}

/** Lives inside <App> to bridge its React state to the host element: `<l-side-toggle>` events open/close the
 * drawer, and the host gets a `data-collapsed` attribute while the drawer layout is showing. */
function HostBridge() {
  const ref = useRef<HTMLSpanElement>(null);
  const { isCollapsed, sideOpen, setSideOpen } = useAppLayout();
  const state = useRef({ sideOpen, setSideOpen });
  useEffect(() => {
    state.current = { sideOpen, setSideOpen };
  }, [sideOpen, setSideOpen]);

  useEffect(() => {
    const host = hostOf(ref.current);
    if (!host) return;
    const toggle = () => state.current.setSideOpen(!state.current.sideOpen);
    host.addEventListener(TOGGLE_EVENT, toggle);
    return () => host.removeEventListener(TOGGLE_EVENT, toggle);
  }, []);

  useEffect(() => {
    const host = hostOf(ref.current);
    if (!host) return;
    host.toggleAttribute("data-collapsed", isCollapsed);
    host.toggleAttribute("data-side-open", sideOpen);
  }, [isCollapsed, sideOpen]);

  return <span ref={ref} hidden />;
}

export interface AppElementProps {
  theme?: AppTheme;
  accent?: Accent;
  design?: DesignName;
  activeVariant?: ActiveVariant;
  layout?: GridLayout;
  collapseBelow?: AppBreakpoint;
}

const html = (name: string) => document.documentElement.getAttribute(name) ?? undefined;

/** The accent <html> carries: a built-in name, or the hex behind a custom one. */
function pageAccent(): Accent | undefined {
  const name = html("data-accent");
  const color = html("data-accent-color");
  return name === "custom" && isHexColor(color) ? color : (name as Accent | undefined);
}

/** `<l-app>`: the App shell. Its sections are the child elements `<l-top>`, `<l-side>`, `<l-main>` and `<l-foot>`
 * (which assign themselves to the matching slots below). With no `theme` / `accent` / `active-variant` it follows the page's own theme (<html data-*>). */
export function AppElement({ theme, accent, design, activeVariant, layout, collapseBelow }: AppElementProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [mainPadding, setMainPadding] = useState<MainPadding | undefined>();
  // `<l-main padding="lg">`: the panel belongs to <Main> inside this shadow root, so mirror the child's attribute.
  useEffect(() => {
    const root = ref.current?.getRootNode();
    const host = root instanceof ShadowRoot ? root.host : null;
    if (!host) return;
    const sync = () => setMainPadding((host.querySelector(":scope > l-main")?.getAttribute("padding") as MainPadding | null) ?? undefined);
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(host, { childList: true, attributes: true, attributeFilter: ["padding"], subtree: true });
    return () => obs.disconnect();
  }, []);

  return (
    <App
      theme={theme ?? (html("data-theme") as AppTheme | undefined)}
      accent={accent ?? pageAccent()}
      design={design ?? (isDesign(html("data-design")) ? (html("data-design") as DesignName) : undefined)}
      activeVariant={activeVariant ?? (html("data-active-variant") as ActiveVariant | undefined)}
      layout={layout}
      collapseBelow={collapseBelow}
      className="h-full"
    >
      <span ref={ref} hidden />
      <HostBridge />
      <Top>
        <slot name="top" />
      </Top>
      <Side>
        <slot name="side" />
      </Side>
      <Main padding={mainPadding}>
        <slot />
      </Main>
      <Foot>
        <slot name="foot" />
      </Foot>
    </App>
  );
}

/** `<l-side-toggle>`: the menu button for `<l-app>`'s drawer. Put it in the `top` slot; it shows only while the
 * app is in its collapsed (single-column) layout. */
export function SideToggleElement({ label = "Open navigation" }: { label?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const app = hostOf(ref.current)?.closest("l-app");
    if (!app) return;
    const sync = () => setVisible(app.hasAttribute("data-collapsed"));
    const obs = new MutationObserver(sync);
    obs.observe(app, { attributes: true, attributeFilter: ["data-collapsed"] });
    sync();
    return () => obs.disconnect();
  }, []);

  if (!visible) return null;
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      onClick={() => hostOf(ref.current)?.dispatchEvent(new CustomEvent(TOGGLE_EVENT, { bubbles: true, composed: true }))}
      className="rounded-md p-1.5 text-fg-muted"
    >
      <Menu size={20} />
    </button>
  );
}

/** `<l-theme-provider>`: sets the page theme (or, with `isolated`, only its own subtree) and projects its children. */
export function ThemeProviderElement(props: {
  defaultMode?: "light" | "dark";
  defaultAccent?: Accent;
  defaultActiveVariant?: ActiveVariant;
  defaultDesign?: DesignName;
  isolated?: boolean;
  mode?: "light" | "dark";
  accent?: Accent;
  activeVariant?: ActiveVariant;
  design?: DesignName;
}) {
  return (
    <ThemeProvider {...props}>
      <slot />
    </ThemeProvider>
  );
}
