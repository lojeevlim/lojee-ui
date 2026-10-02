import { useEffect, useMemo, useState } from "react";
import { Map } from "../../Map/Map";
import { MapMarker } from "../../MapMarker/MapMarker";
import { MapRoute } from "../MapRoute";
import CodeBlock from "../../CodeBlock";
import { Badge } from "../../Badge/Badge";
import { Button } from "../../Buttons/Button";
import { SectionLabel } from "../../ShowcaseHelpers";
import { mapCode } from "../../Map/showcase/mapCode";
import { fetchRoutes, type RouteResult } from "../../Map/routing";
import { CITY_HALL, CEBU_LOOP, CEBU_STOPS, AIRPORT } from "../../Map/samples";
import { formatDistance, formatDuration, pointAlong } from "../../Map/mapUtils";
import type { LngLat, MapRouteData, MapRouteSummary, RouteAnimation } from "../../Map/mapTypes";

const json = (v: unknown) => JSON.stringify(v).replace(/"(\w+)":/g, "$1:").replace(/,/g, ", ");
const coordsCode = (c: LngLat[]) => `[\n${c.map((p) => `    [${p[0]}, ${p[1]}]`).join(",\n")},\n  ]`;
const center = { name: "center", value: "[123.895, 10.318]", kind: "json" as const };
const zoom = (z: number) => ({ name: "zoom", value: String(z), kind: "number" as const });
const STOPS: LngLat[] = CEBU_STOPS.map((s) => s.coord);

function ProgressDemo() {
  const [progress, setProgress] = useState(0.35);
  const here = pointAlong(STOPS, progress);
  return (
    <div className="space-y-3">
      <Map center={[123.895, 10.318]} zoom={12.4} className="h-80">
        <MapRoute coordinates={STOPS} progress={progress} width={5} fit />
        <MapMarker lng={STOPS[0][0]} lat={STOPS[0][1]} label="Start" color="emerald" icon="flag" />
        <MapMarker lng={STOPS[3][0]} lat={STOPS[3][1]} label="End" color="rose" icon="flag" />
        <MapMarker lng={here[0]} lat={here[1]} icon="car" />
      </Map>
      <div className="flex items-center gap-3">
        <input type="range" min={0} max={1} step={0.01} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-full max-w-sm accent-[var(--color-accent-600)]" aria-label="Route progress" />
        <Badge variant="soft" label={`${Math.round(progress * 100)}% travelled`} />
      </div>
    </div>
  );
}

/** Drives a 0 – 1 progress value from its current position to the end over ~9s; time-based, so it is smooth on any screen. */
function useTrack(initial: number) {
  const [progress, setProgress] = useState(initial);
  const [tracking, setTracking] = useState(false);
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
  return { progress, tracking, toggle: () => setTracking((t) => !t) };
}

/** All animation variants on small maps, driven by one Track button that moves every route from start to end. */
function AnimationsDemo() {
  const { progress, tracking, toggle } = useTrack(0);
  const [started, setStarted] = useState(false);
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          label={tracking ? "Stop" : "Track"}
          icon={tracking ? "square" : "map-pin"}
          onClick={() => {
            setStarted(true);
            toggle();
          }}
        />
        {started && <Badge variant="soft" label={`${Math.round(progress * 100)}% travelled`} />}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {(["flow", "draw", "pulse", "trail", "glow", "shimmer"] as const).map((name: RouteAnimation) => (
          <div key={name}>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-fg-subtle">{name}</p>
            <Map center={[123.895, 10.31]} zoom={12.8} className="h-56">
              <MapRoute coordinates={CEBU_LOOP} fit width={5} animated={name} progress={started ? progress : undefined} />
            </Map>
          </div>
        ))}
      </div>
    </div>
  );
}

function WaypointDemo() {
  const [info, setInfo] = useState<MapRouteSummary | null>(null);
  return (
    <div className="space-y-3">
      <Map center={[123.94, 10.31]} zoom={11.5} className="h-80">
        <MapRoute waypoints={[CITY_HALL, AIRPORT]} fit onLoad={setInfo} />
        <MapMarker lng={CITY_HALL[0]} lat={CITY_HALL[1]} label="Cebu City Hall" color="emerald" />
        <MapMarker lng={AIRPORT[0]} lat={AIRPORT[1]} label="Mactan Airport" color="rose" />
      </Map>
      <p className="text-sm text-fg-subtle">
        {info ? (
          <>
            Road route: <span className="font-medium text-fg">{formatDistance(info.distance)}</span>
            {info.duration ? <> · about <span className="font-medium text-fg">{formatDuration(info.duration)}</span></> : null}
          </>
        ) : (
          "Fetching the route from OSRM…"
        )}
      </p>
    </div>
  );
}

function PlanningDemo() {
  const [routes, setRoutes] = useState<RouteResult[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    const ac = new AbortController();
    fetchRoutes([CITY_HALL, AIRPORT], { alternatives: true, signal: ac.signal })
      .then(setRoutes)
      .catch(() => !ac.signal.aborted && setFailed(true));
    return () => ac.abort();
  }, []);
  const ordered = useMemo(() => (routes ? routes.map((r, i) => ({ r, i })) : []), [routes]);
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_16rem]">
      <Map center={[123.94, 10.31]} zoom={11.5} className="h-80" fitBounds>
        {[...ordered]
          // the selected route is drawn last so it sits on top
          .sort((a, b) => Number(a.i === selected) - Number(b.i === selected))
          .map(({ r, i }) => (
            <MapRoute key={i} coordinates={r.coordinates} active={i === selected} opacity={0.45} width={4} activeWidth={7} color={i === selected ? "accent" : "slate"} onClick={() => setSelected(i)} fit={i === 0} />
          ))}
        <MapMarker lng={CITY_HALL[0]} lat={CITY_HALL[1]} label="Cebu City Hall" color="emerald" />
        <MapMarker lng={AIRPORT[0]} lat={AIRPORT[1]} label="Mactan Airport" color="rose" />
      </Map>
      <ul className="space-y-2">
        {failed && <li className="text-sm text-fg-subtle">Could not reach the routing server.</li>}
        {!routes && !failed && <li className="text-sm text-fg-subtle">Finding routes…</li>}
        {routes?.map((r, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setSelected(i)}
              className={`w-full rounded-lg border p-3 text-left transition-colors ${i === selected ? "border-accent-600 bg-accent-500/10" : "border-border hover:bg-surface-muted"}`}
            >
              <p className="text-sm font-semibold text-fg">{i === 0 ? "Fastest route" : `Alternative ${i}`}</p>
              <p className="text-xs text-fg-subtle">
                {formatDistance(r.distance)} · {formatDuration(r.duration)}
              </p>
            </button>
          </li>
        ))}
        {routes && <li className="text-xs text-fg-subtle">Click a route or a list item to select it.</li>}
      </ul>
    </div>
  );
}

export default function MapRouteShowcase() {
  const loopRoutes: MapRouteData[] = [{ coordinates: CEBU_LOOP, color: "accent", width: 5 }];
  return (
    <div>
      <div className="space-y-14">
        <header>
          <h1 className="text-2xl font-semibold text-fg">Map Routes</h1>
          <p className="mt-1 text-sm text-fg-subtle">
            Draw paths on a map: from your own coordinates, or let the component fetch the road route between stops from the free OSRM service. Lines can be dashed, animated, highlighted, clicked, and drawn partly complete.
            Use <code className="font-mono text-fg">&lt;MapRoute&gt;</code> inside <code className="font-mono text-fg">&lt;Map&gt;</code> in React, or pass <code className="font-mono text-fg">routes</code> data everywhere.
          </p>
        </header>

        <section>
          <SectionLabel sub="coordinates is a list of [lng, lat] pairs. Numbered markers mark each stop.">Basic route</SectionLabel>
          <Map center={[123.895, 10.318]} zoom={12.4} className="h-80">
            <MapRoute coordinates={STOPS} width={5} fit />
            {CEBU_STOPS.map((s, i) => (
              <MapMarker key={s.name} lng={s.coord[0]} lat={s.coord[1]} label={s.name}>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-600 text-xs font-semibold text-white shadow-lg ring-4 ring-white/70">{i + 1}</span>
              </MapMarker>
            ))}
          </Map>
          <CodeBlock
            variants={mapCode({
              props: [center, zoom(12.4), { name: "routes", value: `[{ coordinates: ${coordsCode(STOPS)}, width: 5 }]`, kind: "json" }, { name: "markers", value: json(CEBU_STOPS.map((s) => ({ lng: s.coord[0], lat: s.coord[1], label: s.name }))), kind: "json" }],
              reactProps: [center, zoom(12.4)],
              reactChildren: `  <MapRoute coordinates={stops} width={5} />\n  {stops.map(([lng, lat], i) => <MapMarker key={i} lng={lng} lat={lat} label={\`Stop \${i + 1}\`} />)}`,
            })}
          />
        </section>

        <section>
          <SectionLabel sub="color, width and opacity style the line; dashArray makes it dashed ([dash, gap] in line widths); animated makes the dashes flow.">Styles</SectionLabel>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "solid", props: { color: "violet" as const, width: 5 } },
              { name: "dashed", props: { color: "emerald" as const, width: 4, dashArray: [2, 2] as [number, number] } },
            ].map((v) => (
              <div key={v.name}>
                <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-fg-subtle">{v.name}</p>
                <Map center={[123.895, 10.31]} zoom={12.8} className="h-56">
                  <MapRoute coordinates={CEBU_LOOP} fit {...v.props} />
                </Map>
              </div>
            ))}
          </div>
          <SectionLabel sub={'animated takes "flow", "draw", "pulse", "trail", "glow" or "shimmer"; animationSpeed and animationDirection tune the motion. Press Track to drive every route from start to end — with progress set, only the travelled part animates, and the line eases to each new value so it stays smooth.'}>Animations</SectionLabel>
          <AnimationsDemo />
          <CodeBlock
            variants={mapCode({
              props: [center, zoom(12.4), { name: "routes", value: `[{ coordinates: ${coordsCode(STOPS)}, animated: "pulse", progress: 0.2, width: 5 }]`, kind: "json" }],
              reactProps: [center, zoom(12.4)],
              reactChildren: `  <MapRoute coordinates={stops} animated="pulse" progress={progress} width={5} />`,
              extraJs: "  // Track: ease progress from 0 to 1 over a few seconds:  map.routes = [{ ...map.routes[0], progress: 0.6 }];",
            })}
          />
          <CodeBlock
            variants={mapCode({
              props: [{ name: "center", value: "[123.895, 10.31]", kind: "json" }, zoom(12.8), { name: "routes", value: `[{ coordinates: ${coordsCode(CEBU_LOOP)}, color: "rose", width: 4, animated: "pulse" }]`, kind: "json" }],
              reactProps: [{ name: "center", value: "[123.895, 10.31]", kind: "json" }, zoom(12.8)],
              reactChildren: `  <MapRoute coordinates={loop} color="rose" width={4} animated="pulse" animationSpeed={1.5} />\n  <MapRoute coordinates={loop} color="emerald" dashArray={[2, 2]} />`,
            })}
          />
        </section>

        <section>
          <SectionLabel sub="progress (0 – 1) draws the first part solid and the rest faded — drive it from a slider, a timer or live position data.">Route progress</SectionLabel>
          <ProgressDemo />
          <CodeBlock
            variants={mapCode({
              props: [center, zoom(12.4), { name: "routes", value: `[{ coordinates: ${coordsCode(STOPS)}, progress: 0.35, width: 5 }]`, kind: "json" }],
              reactProps: [center, zoom(12.4)],
              reactChildren: `  <MapRoute coordinates={stops} progress={progress} width={5} />\n  <MapMarker lng={here[0]} lat={here[1]} icon="car" />`,
              extraJs: "  // update progress later:  map.routes = [{ ...map.routes[0], progress: 0.6 }];",
            })}
          />
        </section>

        <section>
          <SectionLabel sub="Give waypoints instead of coordinates and the road route between them is fetched from the free OSRM demo server. onLoad reports the distance and travel time.">Road route from waypoints</SectionLabel>
          <WaypointDemo />
          <CodeBlock
            variants={mapCode({
              props: [
                { name: "center", value: "[123.94, 10.31]", kind: "json" },
                zoom(11.5),
                { name: "fitBounds", value: "true", kind: "boolean" },
                { name: "routes", value: `[{ waypoints: [[${CITY_HALL.join(", ")}], [${AIRPORT.join(", ")}]] }]`, kind: "json" },
              ],
              reactProps: [{ name: "center", value: "[123.94, 10.31]", kind: "json" }, zoom(11.5)],
              reactChildren: `  <MapRoute\n    waypoints={[[${CITY_HALL.join(", ")}], [${AIRPORT.join(", ")}]]}\n    fit\n    onLoad={({ distance, duration }) => console.log(distance, duration)}\n  />`,
              events: [["routeload", "console.log(e.detail.distance, e.detail.duration)"]],
            })}
          />
        </section>

        <section>
          <SectionLabel sub="fetchRoutes() returns alternatives you can show side by side. The active route is drawn wider and brighter (active, activeWidth, activeOpacity); onClick lets users pick one.">Route planning</SectionLabel>
          <PlanningDemo />
          <CodeBlock
            variants={{
              react: `import { Map, MapRoute, fetchRoutes } from "lojee-ui";

const routes = await fetchRoutes([amsterdam, rotterdam], { alternatives: true });

<Map fitBounds>
  {routes.map((r, i) => (
    <MapRoute
      key={i}
      coordinates={r.coordinates}
      active={i === selected}
      activeWidth={7}
      opacity={0.45}
      onClick={() => setSelected(i)}
    />
  ))}
</Map>`,
              js: `import "lojee-ui/elements";
import { fetchRoutes } from "lojee-ui";   // or call the OSRM API yourself

const map = document.getElementById("map");
const found = await fetchRoutes([amsterdam, rotterdam], { alternatives: true });
let selected = 0;

const draw = () => {
  map.routes = found.map((r, i) => ({ coordinates: r.coordinates, active: i === selected, activeWidth: 7, opacity: 0.45 }));
};
map.addEventListener("routeclick", (e) => { selected = Number(e.detail.id.split("-")[1]); draw(); });
draw();`,
              vue: `<l-map style="height: 360px" :routes="routes" fit-bounds="true" @routeclick="(e: CustomEvent) => select(e.detail.id)" />`,
              angular: `<l-map style="height: 360px" [routes]="routes" fit-bounds="true" (routeclick)="select($event.detail.id)"></l-map>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Routes as plain data — one array describes every line on the map.">Data-driven routes</SectionLabel>
          <Map center={[123.895, 10.31]} zoom={12.8} routes={loopRoutes} fitBounds className="h-72" />
          <CodeBlock
            variants={mapCode({
              props: [{ name: "fitBounds", value: "true", kind: "boolean" }, { name: "routes", value: `[{ coordinates: ${coordsCode(CEBU_LOOP)}, color: "accent", width: 5 }]`, kind: "json" }],
            })}
          />
        </section>
      </div>
    </div>
  );
}
