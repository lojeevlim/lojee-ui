import { cloneElement, isValidElement, memo, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { HeroCard as Card } from "./HeroCard";
import { BASIC_REELS } from "./heroCardsBasic";
import { FORMS_REELS } from "./heroCardsForms";
import { FEEDBACK_REELS } from "./heroCardsFeedback";
import { DATA_REELS } from "./heroCardsData";
import { Alert } from "../ui/Alert/Alert";
import { Avatar } from "../ui/Avatar/Avatar";
import { Badge } from "../ui/Badge/Badge";
import { Button } from "../ui/Buttons/Button";
import { Checkbox } from "../ui/Checkbox/Checkbox";
import { Chart } from "../ui/Chart/Chart";
import { Input } from "../ui/Input/Input";
import { Notification } from "../ui/Notification/Notification";
import { Pagination } from "../ui/Pagination/Pagination";
import { ProgressBar } from "../ui/ProgressBar/ProgressBar";
import { Radio } from "../ui/Radio/Radio";
import { SearchInput } from "../ui/SearchInput/SearchInput";
import { Select } from "../ui/Select/Select";
import { Slider } from "../ui/Slider/Slider";
import { Spinner } from "../ui/Spinner/Spinner";
import { Stat } from "../ui/Stat/Stat";
import { Switch } from "../ui/Switch/Switch";
import { Tabs } from "../ui/Tabs/Tabs";
import { Textarea } from "../ui/Textarea/Textarea";
import { useTheme } from "../../core/theme";

const CHART = [
  { label: "Mon", value: 32 },
  { label: "Tue", value: 54 },
  { label: "Wed", value: 41 },
  { label: "Thu", value: 72 },
  { label: "Fri", value: 63 },
];

function ThemeSwitch() {
  const { mode, setMode } = useTheme();
  return <Switch size="sm" label={mode === "dark" ? "Dark mode" : "Light mode"} checked={mode === "dark"} onChange={(e) => setMode(e.target.checked ? "dark" : "light")} />;
}

function Deploying() {
  const [p, setP] = useState(34);
  useEffect(() => {
    const id = setInterval(() => setP((v) => (v >= 100 ? 10 : Math.min(100, v + 6))), 900);
    return () => clearInterval(id);
  }, []);
  return <ProgressBar value={p} showLabel />;
}

function Pager() {
  const [page, setPage] = useState(3);
  const [compact, setCompact] = useState(2);
  return (
    <div className="space-y-3">
      <Pagination page={page} totalPages={8} siblingCount={0} onPageChange={setPage} />
      <Pagination page={compact} totalPages={5} siblingCount={0} color="violet" onPageChange={setCompact} />
    </div>
  );
}

const ROW_1: ReactNode[] = [
  <Card key="button" name="Button"><div className="flex flex-wrap gap-2"><Button size="sm" label="Deploy" icon="zap" /><Button size="sm" variant="outline" label="Preview" /></div></Card>,
  <Card key="badge" name="Badge"><div className="flex flex-wrap gap-2"><Badge variant="soft" color="emerald" label="Live" animated="pulse" /><Badge variant="solid" label="New" /><Badge variant="outline" label="Beta" /></div></Card>,
  <Card key="switch" name="Switch"><ThemeSwitch /></Card>,
  <Card key="progress" name="ProgressBar"><Deploying /></Card>,
  <Card key="stat" name="Stat"><Stat label="Weekly installs" value={12400} change="18.2%" trend="up" /></Card>,
  <Card key="chart" name="Chart" w="w-72"><Chart countUp={false} type="bar" data={CHART} height={90} /></Card>,
  <Card key="alert" name="Alert" w="w-72"><Alert variant="success" title="Deployed" closable={false}>Build #248 is live.</Alert></Card>,
];

const ROW_2: ReactNode[] = [
  <Card key="input" name="Input"><Input placeholder="you@company.com" leadingIcon="mail" /></Card>,
  <Card key="search" name="SearchInput"><SearchInput placeholder="Search components…" /></Card>,
  <Card key="select" name="Select"><Select placeholder="Pick a framework" options={[{ label: "React", value: "react" }, { label: "Vue", value: "vue" }, { label: "Angular", value: "angular" }]} /></Card>,
  <Card key="tabs" name="Tabs" w="w-72"><Tabs tabs={[{ label: "Install", content: <p className="pt-2 text-xs text-fg-muted">npm install lojee-ui</p> }, { label: "Style", content: <p className="pt-2 text-xs text-fg-muted">Light, dark, 12 accents.</p> }, { label: "Ship", content: <p className="pt-2 text-xs text-fg-muted">Web Components too.</p> }]} /></Card>,
  <Card key="slider" name="Slider"><Slider defaultValue={60} showValue /></Card>,
  <Card key="pagination" name="Pagination" w="w-96"><Pager /></Card>,
  <Card key="textarea" name="Textarea"><Textarea rows={2} placeholder="Write a message…" /></Card>,
];

const ROW_3: ReactNode[] = [
  <Card key="avatar" name="Avatar"><div className="flex items-center gap-2"><Avatar initials="LL" status="online" /><Avatar initials="AB" color="violet" /><Avatar initials="CD" color="emerald" status="busy" /></div></Card>,
  <Card key="checkbox" name="Checkbox"><div className="space-y-2"><Checkbox defaultChecked label="Ship it" /><Checkbox label="Write tests" /></div></Card>,
  <Card key="radio" name="Radio"><div className="space-y-2"><Radio name="hero-r" defaultChecked label="Monthly" /><Radio name="hero-r" label="Yearly" /></div></Card>,
  <Card key="spinner" name="Spinner"><div className="flex items-center gap-3"><Spinner /><Spinner variant="dots" /><Spinner variant="ring" /></div></Card>,
  <Card key="notification" name="Notification" w="w-80"><Notification icon="bell" title="New comment" timestamp="2m ago" unread>Anna replied to your thread.</Notification></Card>,
  <Card key="chart-line" name="Chart · line" w="w-72"><Chart countUp={false} type="line" data={CHART} height={90} /></Card>,
  <Card key="chart-donut" name="Chart · donut"><Chart countUp={false} type="donut" data={CHART} height={90} /></Card>,
];

const INTERACTIVE = "input,textarea,select,button,a,label,[role='slider'],[role='tab'],[contenteditable]";

/**
 * One reel of cards. It glides on its own (`dir` -1 = left, 1 = right), pauses while the pointer is over it, and can be
 * dragged left / right with the mouse or a finger — releasing keeps a little momentum before it settles back into gliding.
 */
const Reel = memo(function Reel({ items, dir, speed, style }: { items: ReactNode[]; dir: 1 | -1; speed: number; style?: CSSProperties }) {
  const track = useRef<HTMLDivElement>(null);
  const st = useRef({ x: 0, vel: 0, pressed: false, drag: false, moved: false, startX: 0, startPos: 0, lastX: 0, lastT: 0, id: -1 });
  const [grabbing, setGrabbing] = useState(false);

  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    const wrap = root.current;
    if (!el || !wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let half = 0;
    let visible = true;
    const measure = () => (half = el.scrollWidth / 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const tick = (now: number) => {
      const t = st.current;
      const dt = Math.min(64, now - last);
      last = now;
      const moving = !t.drag && (Math.abs(t.vel) > 0.0005 || (!t.pressed && !reduce));
      if (t.drag || moving) {
        if (!t.drag) {
          t.x += t.vel * dt;
          t.vel = Math.abs(t.vel) < 0.0005 ? 0 : t.vel * Math.pow(0.94, dt / 16);
          if (!t.pressed && !reduce) t.x += dir * speed * dt;
        }
        if (half > 0) t.x = ((t.x % half) - half) % half; // keep it in (-half, 0] so the doubled list loops seamlessly
        el.style.transform = `translate3d(${t.x}px,0,0)`;
      }
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    // Only run the frame loop while the reel is on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(wrap);
    const release = () => (st.current.pressed = false);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      io.disconnect();
      ro.disconnect();
    };
  }, [dir, speed]);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    // The reel keeps gliding while the pointer merely hovers it; pressing (a click, or a hold to drag) stops it until the button is released.
    st.current.pressed = true;
    if ((e.target as HTMLElement).closest(INTERACTIVE)) return; // let inputs, sliders and buttons work normally
    const t = st.current;
    t.drag = true;
    t.moved = false;
    t.startX = t.lastX = e.clientX;
    t.startPos = t.x;
    t.lastT = performance.now();
    t.vel = 0;
    t.id = e.pointerId;
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const t = st.current;
    if (!t.drag) return;
    if (!t.moved && Math.abs(e.clientX - t.startX) > 4) {
      t.moved = true;
      e.currentTarget.setPointerCapture(t.id);
      setGrabbing(true);
    }
    if (!t.moved) return;
    t.x = t.startPos + (e.clientX - t.startX);
    const now = performance.now();
    const dt = Math.max(1, now - t.lastT);
    // Smooth the release velocity over several samples so one jittery event can't fling the reel.
    t.vel = t.vel * 0.6 + ((e.clientX - t.lastX) / dt) * 0.4;
    t.lastX = e.clientX;
    t.lastT = now;
  };
  const onUp = () => {
    const t = st.current;
    if (!t.drag) return;
    t.drag = false;
    // Held still before letting go: no momentum. Otherwise cap it so a flick stays controlled.
    t.vel = performance.now() - t.lastT > 80 ? 0 : Math.max(-2.5, Math.min(2.5, t.vel));
    if (t.id >= 0 && root.current?.hasPointerCapture(t.id)) root.current.releasePointerCapture(t.id);
    setGrabbing(false);
  };

  return (
    <div
      ref={root}
      data-hero-reel
      className={`overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [touch-action:pan-y] ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
      style={style}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onLostPointerCapture={onUp}
      onDragStart={(e) => e.preventDefault()}
      onClickCapture={(e) => {
        if (st.current.moved) {
          e.stopPropagation();
          st.current.moved = false;
        }
      }}
    >
      {/* Doubled so wrapping at half the width loops seamlessly. */}
      <div ref={track} className={`flex w-max gap-4 will-change-transform select-none ${grabbing ? "pointer-events-none" : ""}`}>
        {items}
        {items.map((c, i) => (
          <div key={`dup-${i}`} aria-hidden="true" className="contents">{c}</div>
        ))}
      </div>
    </div>
  );
});

// Every card, dealt out across the two reels in turn so each row mixes small and large components.
// The card files each pick their own keys ("search", "progress"…), so the same key shows up in several of them — re-key by position.
const ALL_CARDS: ReactNode[] = [...ROW_1, ...ROW_2, ...ROW_3, ...BASIC_REELS.flat(), ...FORMS_REELS.flat(), ...FEEDBACK_REELS.flat(), ...DATA_REELS.flat()].map((c, i) =>
  isValidElement(c) ? cloneElement(c, { key: `card-${i}` }) : c
);
const REELS: ReactNode[][] = [0, 1].map((r) => ALL_CARDS.filter((_, i) => i % 2 === r));

// Each reel drifts a little with the cursor, at its own depth (--px / --py are set on the stage without re-rendering).
const drift = (d: number): CSSProperties => ({ transform: `translate3d(calc(var(--px, 0) * ${d}px), calc(var(--py, 0) * ${d * 0.6}px), 0)`, transition: "transform 0.4s ease-out" });
const DRIFT_A = drift(-10);
const DRIFT_B = drift(6);

/** Premium hero stage: two reels of live, interactive components gliding left, under a light beam. */
export default function HeroPremium() {
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = stage.current;
    if (!el) return;
    const cx = e.clientX;
    const cy = e.clientY;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--px", String(((cx - r.left) / r.width - 0.5) * 2));
      el.style.setProperty("--py", String(((cy - r.top) / r.height - 0.5) * 2));
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    stage.current?.style.setProperty("--px", "0");
    stage.current?.style.setProperty("--py", "0");
  };
  return (
    <div ref={stage} className="relative mt-16 text-left" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="lp-beam pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[70%] -translate-x-1/2" aria-hidden="true" />
      <div className="space-y-2">
        <Reel items={REELS[0]} dir={-1} speed={0.045} style={DRIFT_A} />
        <Reel items={REELS[1]} dir={1} speed={0.036} style={DRIFT_B} />
      </div>
    </div>
  );
}
