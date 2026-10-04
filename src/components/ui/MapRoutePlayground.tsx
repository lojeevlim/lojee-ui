import { useEffect, useState } from "react";
import { Button } from "./Buttons/Button";
import { Map } from "./Map/Map";
import { MapMarker } from "./MapMarker/MapMarker";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { mapCode, type CodeProp } from "./Map/showcase/mapCode";
import { CITY_HALL, CEBU_LOOP, CEBU_STOPS, AIRPORT } from "./Map/samples";
import type { MapRouteData } from "./Map/mapTypes";

// "Road" follows the real roads through several points (A → B → C → D); "Drawn line" is a custom line from your own coordinates.
const SOURCES = ["Road (OSRM)", "Drawn line"] as const;
const TRIP = [CITY_HALL, CEBU_STOPS[1].coord, CEBU_STOPS[2].coord, AIRPORT];
const LINES = ["solid", "dashed"] as const;
const ANIMATIONS = ["none", "flow", "draw", "pulse", "trail", "glow", "shimmer"] as const;
const SPEEDS = ["0.5x", "1x", "2x"] as const;
const DIRECTIONS = ["forward", "reverse"] as const;
const WIDTHS = ["3", "5", "8"] as const;

export default function MapRoutePlayground() {
  const [source, setSource] = useState<(typeof SOURCES)[number]>("Road (OSRM)");
  const [color, setColor] = useState<string>("accent");
  const [line, setLine] = useState<(typeof LINES)[number]>("solid");
  const [animation, setAnimation] = useState<(typeof ANIMATIONS)[number]>("none");
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>("1x");
  const [direction, setDirection] = useState<(typeof DIRECTIONS)[number]>("forward");
  const [width, setWidth] = useState<(typeof WIDTHS)[number]>("5");
  const [progressOn, setProgressOn] = useState(false);
  const [progress, setProgress] = useState(0.4);

  // "Track" drives the progress from where it is to the end (time-based, so it is smooth on any screen).
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

  const road = source === "Road (OSRM)";
  const route: MapRouteData = {
    ...(road ? { waypoints: TRIP } : { coordinates: CEBU_LOOP }),
    ...(color !== "accent" ? { color } : {}),
    width: Number(width),
    ...(line === "dashed" && !progressOn ? { dashArray: [2, 2] as [number, number] } : {}),
    ...(animation !== "none" ? { animated: animation === "flow" ? (true as const) : animation } : {}),
    ...(animation !== "none" && speed !== "1x" ? { animationSpeed: parseFloat(speed) } : {}),
    ...(animation !== "none" && direction === "reverse" ? { animationDirection: "reverse" as const } : {}),
    ...(progressOn ? { progress } : {}),
  };
  // Start and end markers, for both route kinds (a drawn line's are its first and last points).
  const start = road ? CITY_HALL : CEBU_LOOP[0];
  const end = road ? AIRPORT : CEBU_LOOP[CEBU_LOOP.length - 1];
  const startLabel = road ? "A · Cebu City Hall" : "Start";
  const endLabel = road ? "D · Mactan Airport" : "End";
  const center = road ? [123.94, 10.31] : [123.895, 10.31];
  const zoom = road ? 11.5 : 12.8;

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[360px] !items-stretch !p-3">
        <Map key={source} center={[center[0], center[1]]} zoom={zoom} routes={[route]} fitBounds className="!h-auto min-h-[340px] flex-1">
          <MapMarker lng={start[0]} lat={start[1]} label={startLabel} color="emerald" />
          {road && TRIP.slice(1, -1).map((c, i) => <MapMarker key={i} lng={c[0]} lat={c[1]} label={String.fromCharCode(66 + i)} />)}
          <MapMarker lng={end[0]} lat={end[1]} label={endLabel} color="rose" />
        </Map>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const json = (v: unknown) => JSON.stringify(v, null, 2).replace(/"(\w+)":/g, "$1:");
  const attrs = [
    road ? `waypoints={[${TRIP.map((c) => `[${c.join(", ")}]`).join(", ")}]}` : "coordinates={loop}",
    color !== "accent" && `color="${color}"`,
    `width={${width}}`,
    route.dashArray && "dashArray={[2, 2]}",
    route.animated && (route.animated === true ? "animated" : `animated="${route.animated}"`),
    route.animationSpeed && `animationSpeed={${route.animationSpeed}}`,
    route.animationDirection && `animationDirection="reverse"`,
    progressOn && `progress={${progress}}`,
    road && "fit",
  ].filter(Boolean).join("\n    ");

  const dataRoute = json({ ...route, ...(route.coordinates ? { coordinates: "LOOP" } : {}) }).replace('"LOOP"', `[${CEBU_LOOP.map((c) => `[${c.join(", ")}]`).join(", ")}]`);
  const props: CodeProp[] = [
    { name: "center", value: `[${center.join(", ")}]`, kind: "json" },
    { name: "zoom", value: String(zoom), kind: "number" },
    { name: "fitBounds", value: "true", kind: "boolean" },
    { name: "routes", value: `[${dataRoute}]`, kind: "json" },
    {
      name: "markers",
      value: `[{ lng: ${start[0]}, lat: ${start[1]}, label: "${startLabel}", color: "emerald" }, { lng: ${end[0]}, lat: ${end[1]}, label: "${endLabel}", color: "rose" }]`,
      kind: "json",
    },
  ];

  return (
    <PlaygroundLayout
      preview={preview}
      variants={mapCode({
        props,
        reactProps: props.filter((p) => p.name !== "routes" && p.name !== "fitBounds" && p.name !== "markers"),
        reactChildren: `  <MapRoute\n    ${attrs}\n  />\n  <MapMarker lng={${start[0]}} lat={${start[1]}} label="${startLabel}" color="emerald" />\n  <MapMarker lng={${end[0]}} lat={${end[1]}} label="${endLabel}" color="rose" />`,
      })}
    >
      <div className="flex items-center gap-3 sm:col-span-2">
        <Button
          size="sm"
          label={tracking ? "Stop" : "Track"}
          icon={tracking ? "square" : "map-pin"}
          onClick={() => {
            setProgressOn(true);
            if (!tracking && progress >= 1) setProgress(0);
            setTracking((t) => !t);
          }}
        />
        <span className="rounded-full bg-surface-muted px-2.5 py-1 font-mono text-xs text-fg-muted">{Math.round(progress * 100)}% travelled</span>
      </div>
      <OptionGroup label="Route" options={SOURCES} value={source} onChange={setSource} />
      <OptionGroup label="Line" options={LINES} value={line} onChange={setLine} />
      <OptionGroup label="Animation" options={ANIMATIONS} value={animation} onChange={setAnimation} />
      {animation !== "none" && <OptionGroup label="Speed" options={SPEEDS} value={speed} onChange={setSpeed} />}
      {animation !== "none" && <OptionGroup label="Direction" options={DIRECTIONS} value={direction} onChange={setDirection} />}
      <ColorSwatches value={color} onChange={setColor} custom />
      <OptionGroup label="Width" options={WIDTHS} value={width} onChange={setWidth} />
      <div className="sm:col-span-2">
        <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
          <input type="checkbox" checked={progressOn} onChange={(e) => { setProgressOn(e.target.checked); if (!e.target.checked) setTracking(false); }} />
          Show progress ({Math.round(progress * 100)}%)
        </label>
        {progressOn && <input type="range" min={0} max={1} step={0.01} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="mt-2 w-full" aria-label="Progress" />}
      </div>
    </PlaygroundLayout>
  );
}
