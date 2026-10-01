import { highlightCode } from "../../core/highlightCode";
import { useState } from "react";
import { Map } from "../ui/Map/Map";
import { MapMarker } from "../ui/MapMarker/MapMarker";
import { MapRoute } from "../ui/MapRoute/MapRoute";
import { CITIES, CEBU_STOPS, CEBU_LOOP } from "../ui/Map/samples";

/** Interactive map demo: fly between cities, tilt to 3D, and drive a route with markers. */
export default function MapLab() {
  const [city, setCity] = useState(CITIES[0]);
  const [tilt, setTilt] = useState(false);
  const [progress, setProgress] = useState(0.45);
  const [animated, setAnimated] = useState(true);
  const isCebu = city.name === "Cebu City";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <div className="space-y-5 rounded-2xl border border-border bg-surface p-5">
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
        <pre className="overflow-x-auto rounded-lg bg-surface-muted p-3 font-mono text-[11px] leading-relaxed text-fg-muted"><code>{highlightCode(`<Map center={[${city.center.join(", ")}]} zoom={${city.zoom}}${tilt ? " pitch={60}" : ""} controls>
  <MapMarker lng={…} lat={…} label="…" />
  <MapRoute coordinates={route}${isCebu ? ` progress={${progress.toFixed(2)}}` : ""}${animated ? " animated" : ""} />
</Map>`)}</code></pre>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <Map center={city.center} zoom={city.zoom} pitch={tilt ? 60 : 0} bearing={tilt ? -20 : 0} controls className="h-[420px] rounded-none border-0">
          {isCebu && (
            <>
              <MapRoute coordinates={CEBU_LOOP} progress={progress} animated={animated} width={5} />
              {CEBU_STOPS.map((s, i) => (
                <MapMarker key={s.name} lng={s.coord[0]} lat={s.coord[1]} label={s.name} tooltip={s.name} popup={`Stop ${i + 1}: ${s.name}`} color={i === 0 ? "emerald" : "accent"} />
              ))}
            </>
          )}
        </Map>
      </div>
    </div>
  );
}
