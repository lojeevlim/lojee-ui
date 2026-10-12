import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShadowIsland from "./ShadowIsland";
import { useStepSnap } from "./useStepSnap";
import { Button } from "../ui/Buttons/Button";
import { Badge } from "../ui/Badge/Badge";
import { Avatar } from "../ui/Avatar/Avatar";
import { Switch } from "../ui/Switch/Switch";
import { Checkbox } from "../ui/Checkbox/Checkbox";
import { Card } from "../ui/Card/Card";
import { Navbar } from "../ui/Navbar/Navbar";
import { Sidebar } from "../ui/Sidebar/Sidebar";
import { Stat } from "../ui/Stat/Stat";
import { App, Top, Side, Main } from "../ui/AppLayout/App";
import type { GridLayout } from "../ui/AppLayout/appLayout";
import { pathFor } from "../../core/routes";
import { Heading } from "./HomeSections";
import Reveal from "./Reveal";
import { accentAttrs, type Accent, type DesignName } from "../../core/theme";
import type { ActiveVariant } from "../../core/activeVariant";

const SEMANTIC = [
  ["primary", "accent"],
  ["secondary", "violet"],
  ["accent", "pink"],
  ["neutral", "slate"],
  ["info", "blue"],
  ["success", "emerald"],
  ["warning", "amber"],
  ["error", "rose"],
] as const;

const BUTTONS = [
  ["Neutral", "slate"],
  ["Primary", "accent"],
  ["Secondary", "violet"],
  ["Accent", "pink"],
  ["Info", "blue"],
  ["Success", "emerald"],
  ["Warning", "amber"],
  ["Error", "rose"],
] as const;

// Sidebar first: it runs the full height down the left, and the top bar and main panel stack to its right.
const LAYOUT: GridLayout = [
  ["side", "top"],
  ["side", "main"],
];

// Without a sidebar (small screens) the top bar sits above the main panel.
const LAYOUT_NO_SIDE: GridLayout = [["top"], ["main"]];

/** How the sidebar is shown, by the width of the preview: a full sidebar on large screens, the icon-only rail on medium ones, none on small ones. */
type SideMode = "full" | "rail" | "none";
const sideModeFor = (width: number): SideMode => (width >= 900 ? "full" : width >= 560 ? "rail" : "none");

/** One full dashboard, laid out by the library's own App component (Top / Side / Main). It is drawn once per look. */
function Dashboard({ stage, onExplore, side }: { stage: Stage; onExplore: () => void; side: SideMode }) {
  return (
    <App theme={stage.mode} accent={stage.accent} design={stage.design} activeVariant={stage.items} layout={side === "none" ? LAYOUT_NO_SIDE : LAYOUT} className="h-full">
      <Top>
        <div className={side === "none" ? "" : "-ml-3"}>
        <Navbar
          variant="elevated"
          brand="Overview"
          defaultActiveItem="Inbox"
          items={[
            { label: "Inbox", icon: "mail" },
            { label: "Updates", icon: "bell" },
          ]}
          actions={<Avatar initials="JD" size="sm" />}
          classNames={{ root: "!px-4" }}
        />
        </div>
      </Top>

      {side !== "none" && (
      <Side>
        <Sidebar
          height="100%"
          variant="elevated"
          collapsed={side === "rail"}
          header="Admin panel"
          headerIcon="layout-dashboard"
          footer="Jordan Diaz"
          defaultActiveItem="Dashboard"
          items={[
            { label: "Dashboard", icon: "layout-dashboard" },
            { label: "Notifications", icon: "bell" },
            { label: "Messages", icon: "mail" },
            { label: "People", icon: "users" },
            { label: "Products", icon: "box" },
          ]}
        />
      </Side>
      )}

      {/* the margins are set so the sidebar, navbar and panel all sit the same distance (12px) from the frame on every side, and the same distance from each other */}
      <Main padding="sm" margin="lg" rounded="2xl" className={`!mt-1 !mr-3 !mb-3 ${side === "none" ? "!ml-3" : "!ml-0"}`}>
        <div className="grid gap-4 md:grid-cols-[1fr_13.5rem]">
          <div className="flex min-w-0 flex-col gap-3">
            <div className="flex flex-col items-center px-2 pt-2 text-center">
              <h3 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">
                Change the look,
                <span className="block text-xl font-medium opacity-70 md:text-3xl">keep the code</span>
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed opacity-70">Mode, design and accent are just attributes. Swap them and every component restyles itself — no new classes, no rewrite.</p>
              <div className="mt-4 flex items-center gap-2">
                <Button label="Explore theming" onClick={onExplore} />
                <Button variant="outline" label="Docs" onClick={onExplore} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <Stat label="Components" value="94+" icon="box" className="!p-2 md:!p-5" classNames={{ label: "truncate text-[10px] md:text-sm", icon: "!mb-2 md:!mb-3" }} />
              <Stat label="Frameworks" value="4" icon="shapes" color="violet" className="!p-2 md:!p-5" classNames={{ label: "truncate text-[10px] md:text-sm", icon: "!mb-2 md:!mb-3" }} />
              <Stat label="Accents" value="59" icon="palette" color="pink" className="!p-2 md:!p-5" classNames={{ label: "truncate text-[10px] md:text-sm", icon: "!mb-2 md:!mb-3" }} />
            </div>
            <Card variant="soft" padding="sm" className="mt-3" title={<span className="text-xs font-semibold opacity-70">Controls</span>}>
              <div className="flex flex-wrap items-center justify-around gap-3">
                <Switch size="sm" defaultChecked />
                <Switch size="sm" color="violet" defaultChecked />
                <Switch size="sm" color="blue" defaultChecked />
                <Checkbox defaultChecked />
                <Checkbox color="pink" defaultChecked />
                <Checkbox color="blue" defaultChecked />
              </div>
            </Card>
          </div>
          <div className="hidden min-w-0 flex-col gap-3 md:flex">
            <Card variant="soft" padding="sm" title={<span className="text-sm font-semibold">Semantic colors</span>}>
              <div className="flex flex-wrap gap-1.5">
                {SEMANTIC.map(([name, color]) => (
                  <Badge key={name} variant="solid" color={color} size="sm" label={name} />
                ))}
              </div>
            </Card>
            <Card variant="soft" padding="sm" title={<span className="text-sm font-semibold">Buttons</span>}>
              <div className="grid grid-cols-2 gap-2">
                {BUTTONS.map(([label, color]) => (
                  <Button key={label} size="xs" color={color} variant="solid" label={label} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Main>
    </App>
  );
}

type Stage = { mode: "light" | "dark"; design: DesignName; accent: Accent; items: ActiveVariant };

// The preview steps through these as you scroll, alternating dark and light every time; each step also changes the design language, the accent and how active items are drawn.
const STAGES: Stage[] = [
  { mode: "dark", design: "clay", accent: "violet", items: "solid" },
  { mode: "light", design: "bento", accent: "rose", items: "solid" },
  { mode: "dark", design: "bento", accent: "emerald", items: "outline" },
  { mode: "light", design: "clay", accent: "orange", items: "soft" },
  { mode: "dark", design: "clay", accent: "blue", items: "soft" },
  { mode: "light", design: "clay", accent: "violet", items: "solid" },
  { mode: "dark", design: "bento", accent: "orange", items: "outline" },
  { mode: "light", design: "bento", accent: "blue", items: "outline" },
];
const STAGE_REST = STAGES.map((_, i) => i / (STAGES.length - 1)); // each look, fully settled
const cap = (w: string) => w[0].toUpperCase() + w.slice(1);
const nameOf = (st: Stage) => `${cap(st.mode)} · ${cap(st.design)} · ${cap(st.accent)} · ${cap(st.items)} items`;
const layerProps = (st: Stage) => ({ "data-theme": st.mode, "data-design": st.design, "data-active-variant": st.items, ...accentAttrs(st.accent) });

const FEATHER = 9; // half-width (in % of the width) of the soft edge
const ANGLE = 104; // degrees — the edge leans a little, like the slanted one before
const HOLD = 0.18; // share of each step spent holding still on a finished theme before the next wipe starts (and again after it ends)
const SCALE = 0.86; // the dashboard is laid out larger and scaled down, so it reads as a compact preview
const STICKY_TOP = 80; // px — just under the navbar
const smooth = (x: number) => x * x * (3 - 2 * x);
const wipe = (f: number) => smooth(Math.min(1, Math.max(0, (f - HOLD) / (1 - HOLD * 2))));
// A feathered edge (a mask gradient, not a hard clip): the next look fades in across a soft band instead of being cut in.
const maskFor = (f: number) => {
  const x = -FEATHER * 2 + wipe(f) * (100 + FEATHER * 4);
  return `linear-gradient(${ANGLE}deg, #000 ${x - FEATHER}%, transparent ${x + FEATHER}%)`;
};
const setMask = (el: HTMLElement, f: number) => {
  const m = maskFor(f);
  el.style.maskImage = m;
  el.style.setProperty("-webkit-mask-image", m);
};

/** The same dashboard in several themes. It pins in place while you scroll, and a slanted wipe steps through light / dark, bento / clay, a new accent and a new active-item style each time. */
export default function ThemeWipe() {
  const navigate = useNavigate();
  const explore = () => navigate(pathFor("docs", "Theming"));
  const track = useRef<HTMLDivElement>(null);
  const pinned = useRef<HTMLDivElement>(null);
  useStepSnap(track, pinned, STAGE_REST);
  // Two layers that keep their looks and trade roles (even steps on one, odd on the other): at a step boundary the layer that was being
  // revealed simply becomes the base, and only the hidden layer gets new content. Swapping content between two layers instead left a frame
  // where one of them still showed the old look — a visible blink while scrolling on.
  const layer0 = useRef<HTMLDivElement>(null);
  const layer1 = useRef<HTMLDivElement>(null);
  const layers = [layer0, layer1];
  // The sidebar mode follows the width of the preview. It lives here, shared by both layers, so they never differ mid-wipe.
  const frame = useRef<HTMLDivElement>(null);
  const [side, setSide] = useState<SideMode>("full");
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const measure = () => setSide(sideModeFor(el.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const stageOf = (k: number) => Math.min(STAGES.length - 1, k === step % 2 ? step : step + 1);

  useEffect(() => {
    const el = track.current;
    const card = pinned.current;
    const [l0, l1] = [layer0.current, layer1.current];
    if (!el || !card || !l0 || !l1) return;
    let raf = 0;
    let target = 0;
    let current = -1;
    let last = 0;
    const apply = (p: number) => {
      const t = p * (STAGES.length - 1);
      const i = Math.min(STAGES.length - 2, Math.floor(t));
      if (i !== stepRef.current) {
        stepRef.current = i;
        setStep(i);
      }
      // Roles are set directly on the elements every frame (never through React state), so they can't lag behind the content.
      const over = (i + 1) % 2;
      [l0, l1].forEach((layer, k) => {
        if (k === over) {
          setMask(layer, t - i);
          layer.style.zIndex = "2";
          layer.inert = true;
        } else {
          layer.style.maskImage = "none";
          layer.style.setProperty("-webkit-mask-image", "none");
          layer.style.zIndex = "1";
          layer.inert = false;
        }
      });
      const a = wipe(t - i) > 0.5 ? i + 1 : i;
      if (a !== activeRef.current) {
        activeRef.current = a;
        setActive(a);
      }
    };
    // The scroll position only sets a target; the wipe eases toward it, so it glides instead of jumping with every wheel notch.
    const frame = (now: number) => {
      const dt = Math.min(64, now - (last || now));
      last = now;
      current += (target - current) * (1 - Math.exp(-dt / 320));
      if (Math.abs(target - current) < 0.0002) current = target;
      apply(current);
      raf = current === target ? 0 : requestAnimationFrame(frame);
      if (!raf) last = 0;
    };
    // While pinned the preview sits in the middle of the screen (never higher than just under the navbar), so it stays centered when scrolling stops.
    const update = () => {
      // Centered in the part of the screen below the navbar (64px), not in the whole window.
      const pin = Math.max(STICKY_TOP, Math.round((window.innerHeight + 64 - card.offsetHeight) / 2));
      card.style.top = `${pin}px`;
      const r = el.getBoundingClientRect();
      const span = Math.max(1, r.height - card.offsetHeight);
      target = Math.min(1, Math.max(0, (pin - r.top) / span));
      if (current < 0) current = target;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    update();
    window.addEventListener("scroll", update, { passive: true, capture: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 md:pt-24">
      <Reveal>
      <Heading eyebrow="Theming" title="Scroll to change the whole theme" body="The preview stays put while you scroll. Mode, design, accent and the active-item style change one after another, gliding between looks and holding on each so you can see it." />
      </Reveal>
      {/* Tall track: the preview sticks to the top of the screen for the whole of it. */}
      <div ref={track} style={{ height: `${(STAGES.length - 1) * 90 + 60}vh` }}>
        <div ref={pinned} className="sticky mx-auto max-w-5xl" style={{ top: STICKY_TOP }}>
          <Reveal delay={160} className="lp-theme-in">
          <div ref={frame} data-theme-wipe="" className="relative h-[34rem] overflow-hidden rounded-3xl border border-border bg-surface-muted shadow-xl shadow-black/5 md:h-[35rem]">
            {[0, 1].map((k) => (
              <div key={k} ref={layers[k]} className="absolute inset-3 overflow-hidden rounded-2xl">
                <ShadowIsland attrs={layerProps(STAGES[stageOf(k)])} className="absolute left-0 top-0" style={{ width: `${100 / SCALE}%`, height: `${100 / SCALE}%`, transform: `scale(${SCALE})`, transformOrigin: "0 0" }}>
                  <Dashboard stage={STAGES[stageOf(k)]} onExplore={explore} side={side} />
                </ShadowIsland>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-fg-muted md:hidden" aria-live="polite">{nameOf(STAGES[active])}</p>
          <ol className="mt-4 hidden flex-wrap justify-center gap-2 md:flex" aria-label="Looks in this preview">
            {STAGES.map((st, i) => (
              <li key={nameOf(st)} className={`rounded-full border px-3 py-1 text-xs transition-colors duration-300 ${i === active ? "border-accent-500 text-fg" : "border-border text-fg-subtle"}`}>
                {nameOf(st)}
              </li>
            ))}
          </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
