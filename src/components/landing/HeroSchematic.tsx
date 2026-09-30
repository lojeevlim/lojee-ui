import { useEffect, useState, type PointerEvent } from "react";
import { Badge } from "../ui/Badge/Badge";
import { Button } from "../ui/Buttons/Button";
import { Switch } from "../ui/Switch/Switch";
import { ProgressBar } from "../ui/ProgressBar/ProgressBar";
import { Icon } from "../ui/Icons/Icon";
import { useTheme } from "../../core/theme";

const STEPS = ["Install", "Style", "Ship"];

/** Blueprint-style hero visual: real lojee-ui components on an annotated grid. Everything on it is live. */
export default function HeroSchematic() {
  const { mode, setMode } = useTheme();
  const [progress, setProgress] = useState(28);
  const [step, setStep] = useState(1);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 8 : Math.min(100, p + 4 + ((p * 7) % 5)))), 900);
    return () => clearInterval(id);
  }, []);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
  };
  const layer = (depth: number) => ({ transform: `translate3d(${tilt.x * depth}px, ${tilt.y * depth}px, 0)` });

  return (
    <div
      className="relative mx-auto aspect-[1/0.92] w-full max-w-[560px] select-none max-sm:aspect-[1/0.72]"
      onPointerMove={onMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      {/* blueprint plate */}
      <div className="lp-grid-fine absolute inset-0 rounded-3xl border border-dashed border-border-strong/70" />
      {["left-3 top-3", "right-3 top-3 rotate-90", "bottom-3 right-3 rotate-180", "bottom-3 left-3 -rotate-90"].map((pos) => (
        <span key={pos} className={`absolute h-3 w-3 border-l-2 border-t-2 border-accent-500 ${pos}`} />
      ))}

      {/* connector lines + dimension marks */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full max-sm:hidden" viewBox="0 0 560 515" fill="none" aria-hidden="true">
        <path className="lp-dash" d="M120 118 C 120 70, 160 62, 214 62" stroke="var(--color-accent-500)" strokeWidth="1.4" />
        <path className="lp-dash" d="M452 178 C 500 178, 504 130, 504 92" stroke="var(--color-accent-500)" strokeWidth="1.4" />
        <path className="lp-dash" d="M112 402 C 60 402, 58 350, 58 318" stroke="var(--color-accent-500)" strokeWidth="1.4" />
        <path className="lp-dash" d="M430 372 C 470 372, 490 400, 490 440" stroke="var(--color-accent-500)" strokeWidth="1.4" />
        {[[120, 118], [452, 178], [112, 402], [430, 372]].map(([cx, cy]) => (
          <g key={`${cx}${cy}`}>
            <circle cx={cx} cy={cy} r="3.5" fill="var(--color-accent-500)" />
            <circle className="lp-ping" cx={cx} cy={cy} r="3.5" fill="var(--color-accent-500)" />
          </g>
        ))}
        {/* dimension line */}
        <g stroke="var(--color-fg-subtle)" strokeWidth="1">
          <path d="M70 486 H490" />
          <path d="M70 480 V492 M490 480 V492" />
        </g>
        <text x="280" y="480" textAnchor="middle" fontSize="10" fill="var(--color-fg-subtle)" fontFamily="ui-monospace, monospace">
          fluid · container-query grid
        </text>
      </svg>

      {/* annotations */}
      <Tag className="left-[22%] top-[5%]" style={layer(4)}>{"<Badge variant=\"soft\" />"}</Tag>
      <Tag className="right-[3%] top-[10%] max-sm:hidden" style={layer(5)}>{"<Stat />"}</Tag>
      <Tag className="left-[2%] top-[56%] max-sm:hidden" style={layer(4)}>{"<Stepper />"}</Tag>
      <Tag className="bottom-[13%] right-[4%] max-sm:hidden" style={layer(6)}>{"<l-switch>"}</Tag>

      {/* main window */}
      <div className="lp-float-a absolute left-[4%] right-[4%] top-[20%] sm:left-[7%] sm:right-[9%] sm:top-[17%]" style={layer(10)}>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-black/5 ring-1 ring-black/5">
          <div className="flex items-center gap-1.5 border-b border-border bg-surface-muted px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 font-mono text-[10px] text-fg-subtle">app.tsx</span>
          </div>
          <div className="space-y-3.5 p-4">
            <div className="flex items-center justify-between">
              <Badge variant="soft" color="emerald" label="Deployed" />
              <span className="text-[11px] text-fg-subtle">build #248</span>
            </div>
            <ProgressBar value={progress} showLabel />
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" label="Deploy" icon="zap" />
              <Button size="sm" variant="outline" label="Preview" />
            </div>
            <Switch size="sm" label={mode === "dark" ? "Dark mode" : "Light mode"} checked={mode === "dark"} onChange={(e) => setMode(e.target.checked ? "dark" : "light")} />
          </div>
        </div>
      </div>

      {/* stat card */}
      <div className="lp-float-b absolute right-[1%] top-[32%] w-[36%] max-sm:hidden" style={layer(18)}>
        <div className="rounded-xl border border-border bg-surface p-3 shadow-lg shadow-black/5">
          <p className="text-[10px] uppercase tracking-wide text-fg-subtle">Weekly installs</p>
          <p className="text-lg font-semibold text-fg">12.4k</p>
          <svg viewBox="0 0 100 32" className="mt-1 h-8 w-full" fill="none" aria-hidden="true">
            <path className="lp-draw" d="M0 26 L14 21 L28 24 L42 14 L56 17 L70 8 L84 11 L100 3" stroke="var(--color-accent-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* stepper card */}
      <div className="lp-float-c absolute bottom-[22%] left-[1%] w-[44%] max-sm:hidden" style={layer(16)}>
        <div className="rounded-xl border border-border bg-surface p-3 shadow-lg shadow-black/5">
          <div className="relative flex items-center justify-between px-1">
            <span className="absolute left-3 right-3 top-3 h-px bg-border-strong" />
            <span className="absolute left-3 top-3 h-px bg-accent-600 transition-all duration-500" style={{ width: `calc(${(step / (STEPS.length - 1)) * 100}% - 1.5rem)` }} />
            {STEPS.map((s, i) => (
              <button key={s} type="button" onClick={() => setStep(i)} className="relative z-10 flex flex-col items-center gap-1" aria-label={s}>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold transition-all duration-300 ${
                    i <= step ? "border-accent-600 bg-accent-600 text-white" : "border-border-strong bg-surface text-fg-subtle"
                  } ${i === step ? "scale-110 ring-4 ring-accent-500/20" : ""}`}
                >
                  {i < step ? <Icon name="check" size={12} /> : i + 1}
                </span>
                <span className={`text-[10px] ${i === step ? "font-medium text-fg" : "text-fg-subtle"}`}>{s}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ children, className, style }: { children: string; className: string; style?: React.CSSProperties }) {
  return (
    <span
      style={style}
      className={`absolute z-20 rounded-md border border-accent-500/40 bg-surface/90 px-1.5 py-0.5 font-mono text-[10px] text-accent-700 shadow-sm backdrop-blur transition-transform duration-200 dark:text-accent-300 ${className}`}
    >
      {children}
    </span>
  );
}
