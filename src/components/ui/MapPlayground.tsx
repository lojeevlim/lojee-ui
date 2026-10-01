import { useState } from "react";
import { Map } from "./Map/Map";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { mapCode, type CodeProp } from "./Map/showcase/mapCode";
import { CITIES } from "./Map/samples";
import type { MapControlName } from "./Map/mapTypes";
import { MAP_STYLE_NAMES, type MapStyleName } from "./Map/mapUtils";

const STYLES = MAP_STYLE_NAMES;
const CONTROLS: MapControlName[] = ["zoom", "compass", "locate", "fullscreen", "scale", "style"];

export default function MapPlayground() {
  const [cityName, setCityName] = useState(CITIES[0].name);
  const [zoomDelta, setZoomDelta] = useState(0);
  const [style, setStyle] = useState<MapStyleName>("auto");
  const [pitch, setPitch] = useState(0);
  const [bearing, setBearing] = useState(0);
  const [controls, setControls] = useState<MapControlName[]>(["zoom", "compass"]);
  const [interactive, setInteractive] = useState(true);

  const city = CITIES.find((c) => c.name === cityName) ?? CITIES[0];
  const zoom = Math.round((city.zoom + zoomDelta) * 10) / 10;

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[360px] !items-stretch !p-3">
        <Map center={city.center} zoom={zoom} pitch={pitch} bearing={bearing} mapStyle={style} controls={controls.length ? controls : false} interactive={interactive} className="!h-auto min-h-[340px] flex-1" />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const props: CodeProp[] = [
    { name: "center", value: `[${city.center.join(", ")}]`, kind: "json" },
    { name: "zoom", value: String(zoom), kind: "number" },
    ...(pitch ? [{ name: "pitch", value: String(pitch), kind: "number" as const }] : []),
    ...(bearing ? [{ name: "bearing", value: String(bearing), kind: "number" as const }] : []),
    ...(style !== "auto" ? [{ name: "mapStyle", value: `"${style}"`, kind: "string" as const }] : []),
    ...(controls.length ? [{ name: "controls", value: JSON.stringify(controls), kind: "json" as const }] : []),
    ...(!interactive ? [{ name: "interactive", value: "false", kind: "boolean" as const }] : []),
  ];

  const toggle = (c: MapControlName) => setControls((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));

  return (
    <PlaygroundLayout preview={preview} variants={mapCode({ props })}>
      <OptionGroup label="City" options={CITIES.map((c) => c.name)} value={cityName} onChange={setCityName} />
      <OptionGroup label="Base map" options={STYLES} value={style} onChange={setStyle} />
      <OptionGroup label="Zoom" options={["-2", "-1", "0", "+1", "+2"] as const} value={zoomDelta > 0 ? `+${zoomDelta}` : String(zoomDelta)} onChange={(v) => setZoomDelta(Number(v))} />
      <OptionGroup label="Tilt (pitch)" options={["0", "30", "60"] as const} value={String(pitch) as "0" | "30" | "60"} onChange={(v) => setPitch(Number(v))} />
      <OptionGroup label="Rotation (bearing)" options={["0", "-30", "45", "90"] as const} value={String(bearing) as "0"} onChange={(v) => setBearing(Number(v))} />
      <div className="sm:col-span-2">
        <p className="mb-1.5 text-xs font-medium text-fg-subtle">Controls</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {CONTROLS.map((c) => (
            <label key={c} className="flex items-center gap-1.5 text-xs text-fg-muted">
              <input type="checkbox" checked={controls.includes(c)} onChange={() => toggle(c)} />
              {c}
            </label>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
        <input type="checkbox" checked={interactive} onChange={(e) => setInteractive(e.target.checked)} />
        Interactive (pan / zoom)
      </label>
    </PlaygroundLayout>
  );
}
