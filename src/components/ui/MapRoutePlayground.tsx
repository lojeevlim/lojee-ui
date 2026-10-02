import { useState } from "react";
import { Map } from "./Map/Map";
import { MapMarker } from "./MapMarker/MapMarker";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { mapCode, type CodeProp } from "./Map/showcase/mapCode";
import { CITY_HALL, CEBU_LOOP, AIRPORT } from "./Map/samples";
import type { MapRouteData } from "./Map/mapTypes";

const SOURCES = ["Drawn line", "Road (OSRM)"] as const;
const LINES = ["solid", "dashed", "animated"] as const;
const WIDTHS = ["3", "5", "8"] as const;

export default function MapRoutePlayground() {
  const [source, setSource] = useState<(typeof SOURCES)[number]>("Drawn line");
  const [color, setColor] = useState<string>("accent");
  const [line, setLine] = useState<(typeof LINES)[number]>("solid");
  const [width, setWidth] = useState<(typeof WIDTHS)[number]>("5");
  const [progressOn, setProgressOn] = useState(false);
  const [progress, setProgress] = useState(0.4);

  const road = source === "Road (OSRM)";
  const route: MapRouteData = {
    ...(road ? { waypoints: [CITY_HALL, AIRPORT] } : { coordinates: CEBU_LOOP }),
    ...(color !== "accent" ? { color } : {}),
    width: Number(width),
    ...(line === "dashed" && !progressOn ? { dashArray: [2, 2] as [number, number] } : {}),
    ...(line === "animated" && !progressOn ? { animated: true } : {}),
    ...(progressOn ? { progress } : {}),
  };
  // Start and end markers, for both route kinds (a drawn line's are its first and last points).
  const start = road ? CITY_HALL : CEBU_LOOP[0];
  const end = road ? AIRPORT : CEBU_LOOP[CEBU_LOOP.length - 1];
  const startLabel = road ? "Cebu City Hall" : "Start";
  const endLabel = road ? "Mactan Airport" : "End";
  const center = road ? [123.94, 10.31] : [123.895, 10.31];
  const zoom = road ? 11.5 : 12.8;

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[360px] !items-stretch !p-3">
        <Map key={source} center={[center[0], center[1]]} zoom={zoom} routes={[route]} fitBounds className="!h-auto min-h-[340px] flex-1">
          <MapMarker lng={start[0]} lat={start[1]} label={startLabel} color="emerald" />
          <MapMarker lng={end[0]} lat={end[1]} label={endLabel} color="rose" />
        </Map>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const json = (v: unknown) => JSON.stringify(v, null, 2).replace(/"(\w+)":/g, "$1:");
  const attrs = [
    road ? `waypoints={[[${CITY_HALL.join(", ")}], [${AIRPORT.join(", ")}]]}` : "coordinates={loop}",
    color !== "accent" && `color="${color}"`,
    `width={${width}}`,
    route.dashArray && "dashArray={[2, 2]}",
    route.animated && "animated",
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
      <OptionGroup label="Route" options={SOURCES} value={source} onChange={setSource} />
      <OptionGroup label="Line" options={LINES} value={line} onChange={setLine} />
      <ColorSwatches value={color} onChange={setColor} custom />
      <OptionGroup label="Width" options={WIDTHS} value={width} onChange={setWidth} />
      <div className="sm:col-span-2">
        <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
          <input type="checkbox" checked={progressOn} onChange={(e) => setProgressOn(e.target.checked)} />
          Show progress ({Math.round(progress * 100)}%)
        </label>
        {progressOn && <input type="range" min={0} max={1} step={0.01} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="mt-2 w-full" aria-label="Progress" />}
      </div>
    </PlaygroundLayout>
  );
}
