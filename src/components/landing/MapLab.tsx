import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Badge } from "../ui/Badge/Badge";
import { Button } from "../ui/Buttons/Button";
import { Switch } from "../ui/Switch/Switch";
import { useTheme } from "../../core/theme";
import { Map } from "../ui/Map/Map";
import { MapMarker } from "../ui/MapMarker/MapMarker";
import { MapRoute } from "../ui/MapRoute/MapRoute";
import { IdleMount } from "./LazyOnView";
import { CITIES, CEBU_STOPS } from "../ui/Map/samples";

/** Interactive map demo: fly between cities, tilt to 3D, and drive a route with markers. */
export default function MapLab() {
  const [city, setCity] = useState(CITIES[0]);
  const [tilt, setTilt] = useState(false);
  const [progress, setProgress] = useState(0.45);
  const [animated, setAnimated] = useState(true);
  const isCebu = city.name === "Cebu City";
  const { mode } = useTheme();
  // The Dark / Light switch re-themes only the map (its own `data-theme` wrapper), not the page. It starts from, and follows, the page theme.
  const [mapDark, setMapDark] = useState(mode === "dark");
  useEffect(() => setMapDark(mode === "dark"), [mode]);
  // "Track" drives the route from the start to the end, like following a vehicle.
  const [tracking, setTracking] = useState(false);
  // Time-based, so it moves at a steady pace on any screen; the route eases to each value, so it never steps.
  useEffect(() => {
    if (!tracking) return;
    const from = progress >= 1 ? 0 : progress;
    const start = performance.now();
    const duration = 9000 * (1 - from);
    let raf = 0;
    let lastPush = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      if (now - lastPush > 60 || t >= 1) {
        lastPush = now;
        setProgress(from + (1 - from) * t);
      }
      if (t >= 1) setTracking(false);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracking]);
  // Pointer parallax is written to CSS variables so moving the mouse never re-renders the map.
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
  const layer = (d: number): CSSProperties => ({ transform: `translate3d(calc(var(--px, 0) * ${d}px), calc(var(--py, 0) * ${d}px), 0)` });

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
      <div className="space-y-4 rounded-2xl border border-border bg-surface p-4 lg:h-[392px] lg:overflow-y-auto">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fg-subtle">Fly to</p>
          <div className="grid grid-cols-2 gap-1.5">
            {CITIES.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setCity(c)}
                className={`rounded-md px-2.5 py-1.5 text-sm font-medium transition-all duration-200 ${city.name === c.name ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border"}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fg-subtle">Camera</p>
          <button
            type="button"
            onClick={() => setTilt((t) => !t)}
            className={`w-full rounded-md px-2.5 py-1.5 text-sm font-medium transition-all duration-200 ${tilt ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border"}`}
          >
            {tilt ? "3D tilt on" : "3D tilt off"}
          </button>
        </div>
        <div className={isCebu ? "" : "pointer-events-none opacity-40"}>
          <p className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-fg-subtle">
            <span>Route progress</span>
            <span className="font-mono normal-case">{Math.round(progress * 100)}%</span>
          </p>
          <input type="range" min={0} max={1} step={0.01} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-full accent-accent-600" aria-label="Route progress" />
          <label className="mt-3 flex items-center gap-2 text-sm text-fg-muted">
            <input type="checkbox" className="accent-accent-600" checked={animated} onChange={(e) => setAnimated(e.target.checked)} />
            Animate the line
          </label>
          {!isCebu && <p className="mt-2 text-xs text-fg-subtle">Markers and the route are drawn on Cebu City.</p>}
        </div>
      </div>

      <div ref={stage} className="relative flex select-none flex-col py-6 sm:py-8 lg:h-[392px] lg:py-0" onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="lp-aurora pointer-events-none absolute -inset-6 -z-10" aria-hidden="true" />
        <div className="lp-float-a flex flex-1 flex-col lg:absolute lg:inset-0" style={layer(8)}>
          <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-2xl shadow-accent-900/10 ring-1 ring-black/5">
            <div className="flex items-center gap-1.5 border-b border-border bg-surface-muted/80 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 font-mono text-[10px] text-fg-subtle">{"<Map controls={[\"zoom\", \"style\"]} />"}</span>
            </div>
            <div data-theme={mapDark ? "dark" : "light"} className="flex min-h-[400px] flex-1 flex-col lg:min-h-0">
            <IdleMount className="flex flex-1 flex-col">
            <Map center={city.center} zoom={city.zoom} pitch={tilt ? 60 : 0} bearing={tilt ? -20 : 0} controls={["zoom", "compass", "fullscreen", "style"]} className="!h-auto min-h-[400px] flex-1 rounded-none border-0 lg:min-h-0">
              {isCebu && (
                <>
                  <MapRoute waypoints={CEBU_STOPS.map((s) => s.coord)} progress={progress} animated={animated} width={5} />
                  {CEBU_STOPS.map((s, i) => (
                    <MapMarker key={s.name} lng={s.coord[0]} lat={s.coord[1]} label={s.name} tooltip={s.name} popup={`Stop ${i + 1}: ${s.name}`} color={i === 0 ? "emerald" : "accent"} />
                  ))}
                </>
              )}
            </Map>
            </IdleMount>
            </div>
          </div>
        </div>

        {/* Both floating cards sit in one row along the bottom of the map — same baseline, equal height, and inside the map frame. */}
        <div className="pointer-events-none absolute inset-x-4 bottom-10 flex items-stretch gap-2 max-sm:hidden sm:inset-x-5 lg:bottom-4 lg:right-auto lg:w-[72%]">
        <div className="lp-float-b min-w-0 flex-[1.4]" style={layer(20)}>
          <div className="pointer-events-auto h-full space-y-1.5 rounded-lg border border-border bg-surface/95 p-2.5 shadow-lg shadow-black/10">
            <Badge variant="soft" color="emerald" label="On route" />
            <div className="flex items-center justify-between gap-2">
              <Button
                size="xs"
                label={`${tracking ? "Stop" : "Track"} · ${Math.round(progress * 100)}%`}
                icon={tracking ? "square" : "map-pin"}
                onClick={() => {
                  if (!tracking) {
                    setCity(CITIES[0]); // the route is drawn on Cebu City
                    if (progress >= 1) setProgress(0);
                  }
                  setTracking((t) => !t);
                }}
              />
              <Switch size="sm" label={mapDark ? "Dark" : "Light"} checked={mapDark} onChange={(e) => setMapDark(e.target.checked)} />
            </div>
          </div>
        </div>

        <div className="lp-float-c min-w-0 flex-1" style={layer(14)}>
          <div className="h-full rounded-lg border border-border bg-surface/95 p-2.5 shadow-lg shadow-black/10">
            <p className="text-[9px] uppercase tracking-wide text-fg-subtle">Weekly installs</p>
            <p className="text-base font-semibold leading-tight text-fg">12.4k</p>
            <svg viewBox="0 0 100 32" className="mt-0.5 h-6 w-full" fill="none" aria-hidden="true">
              <path className="lp-draw" d="M0 26 L14 21 L28 24 L42 14 L56 17 L70 8 L84 11 L100 3" stroke="var(--color-accent-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
