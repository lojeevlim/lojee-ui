import { useState } from "react";
import { Map } from "./Map/Map";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { mapCode, type CodeProp } from "./Map/showcase/mapCode";
import { CEBU_STOPS } from "./Map/samples";
import type { ColorName } from "../../core/tokens";
import type { MapMarkerData } from "./Map/mapTypes";

const ICONS = ["none", "home", "star", "heart", "flag", "store", "building-2"] as const;
const COUNTS = ["1", "2", "3", "4"] as const;

const Check = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    {label}
  </label>
);

export default function MapMarkerPlayground() {
  const [count, setCount] = useState<(typeof COUNTS)[number]>("3");
  const [color, setColor] = useState<ColorName>("accent");
  const [icon, setIcon] = useState<(typeof ICONS)[number]>("none");
  const [label, setLabel] = useState(true);
  const [popup, setPopup] = useState(true);
  const [tooltip, setTooltip] = useState(false);
  const [draggable, setDraggable] = useState(false);

  const markers: MapMarkerData[] = CEBU_STOPS.slice(0, Number(count)).map((s) => ({
    lng: s.coord[0],
    lat: s.coord[1],
    ...(color !== "accent" ? { color } : {}),
    ...(icon !== "none" ? { icon } : {}),
    ...(label ? { label: s.name } : {}),
    ...(popup ? { popup: `${s.name}, Cebu City` } : {}),
    ...(tooltip ? { tooltip: s.name } : {}),
    ...(draggable ? { draggable: true } : {}),
  }));

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[360px] !items-stretch !p-3">
        <Map center={[123.895, 10.318]} zoom={12} fitBounds={Number(count) > 1} markers={markers} className="!h-auto min-h-[340px] flex-1" />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const json = (v: unknown) => JSON.stringify(v, null, 2).replace(/"(\w+)":/g, "$1:");
  const attrs = (m: MapMarkerData) =>
    [`lng={${m.lng}}`, `lat={${m.lat}}`, m.color && `color="${m.color}"`, m.icon && `icon="${m.icon}"`, m.label && `label="${m.label}"`, m.popup && `popup="${m.popup}"`, m.tooltip && `tooltip="${m.tooltip}"`, m.draggable && "draggable"].filter(Boolean).join(" ");

  const props: CodeProp[] = [
    { name: "center", value: "[123.895, 10.318]", kind: "json" },
    { name: "zoom", value: "12", kind: "number" },
    ...(Number(count) > 1 ? [{ name: "fitBounds", value: "true", kind: "boolean" as const }] : []),
    { name: "markers", value: json(markers), kind: "json" },
  ];

  return (
    <PlaygroundLayout
      preview={preview}
      variants={mapCode({
        props,
        reactProps: props.filter((p) => p.name !== "markers"),
        reactChildren: markers.map((m) => `  <MapMarker ${attrs(m)} />`).join("\n"),
      })}
    >
      <OptionGroup label="Markers" options={COUNTS} value={count} onChange={setCount} />
      <OptionGroup label="Icon" options={ICONS} value={icon} onChange={setIcon} />
      <ColorSwatches value={color} onChange={setColor} />
      <div className="space-y-2">
        <Check label="Label" checked={label} onChange={setLabel} />
        <Check label="Popup (click)" checked={popup} onChange={setPopup} />
        <Check label="Tooltip (hover)" checked={tooltip} onChange={setTooltip} />
        <Check label="Draggable" checked={draggable} onChange={setDraggable} />
      </div>
    </PlaygroundLayout>
  );
}
