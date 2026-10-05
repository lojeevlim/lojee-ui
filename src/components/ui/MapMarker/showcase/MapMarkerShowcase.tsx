import { useState } from "react";
import { Map } from "../../Map/Map";
import { MapMarker } from "../MapMarker";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";
import { mapCode } from "../../Map/showcase/mapCode";
import { CEBU, CEBU_STOPS } from "../../Map/samples";
import type { MapMarkerData } from "../../Map/mapTypes";

const json = (v: unknown) => JSON.stringify(v, null, 2).replace(/"(\w+)":/g, "$1:");
const center = { name: "center", value: "[123.895, 10.316]", kind: "json" as const };
const zoom = (z: number) => ({ name: "zoom", value: String(z), kind: "number" as const });
const markersProp = (m: MapMarkerData[]) => ({ name: "markers", value: json(m), kind: "json" as const });

const BASIC: MapMarkerData[] = CEBU_STOPS.slice(0, 3).map((s) => ({ lng: s.coord[0], lat: s.coord[1] }));
const COLORED: MapMarkerData[] = [
  { lng: 123.9054, lat: 10.2925, color: "accent", icon: "home" },
  { lng: 123.9049, lat: 10.3182, color: "rose", icon: "heart" },
  { lng: 123.9052, lat: 10.3287, color: "emerald", icon: "check" },
  { lng: 123.8793, lat: 10.3366, color: "amber", icon: "star" },
];
const LABELED: MapMarkerData[] = CEBU_STOPS.map((s) => ({ lng: s.coord[0], lat: s.coord[1], label: s.name }));
const POPUPS: MapMarkerData[] = [
  { lng: 123.9054, lat: 10.2925, label: "Fort San Pedro", popup: "Fort San Pedro — a 16th-century Spanish fortress, the oldest triangular bastion fort in the Philippines." },
  { lng: 123.9049, lat: 10.3182, label: "Ayala Center", popup: "Ayala Center Cebu · opened 1994 · shops, dining and cinemas", color: "rose" },
];
const TIPS: MapMarkerData[] = CEBU_STOPS.map((s) => ({ lng: s.coord[0], lat: s.coord[1], tooltip: s.name, color: "violet" }));

function DraggableDemo() {
  const [pos, setPos] = useState({ lng: 123.9049, lat: 10.3182 });
  return (
    <div className="space-y-3">
      <Map center={[123.9049, 10.3182]} zoom={13.5} height={420}>
        <MapMarker lng={pos.lng} lat={pos.lat} draggable color="rose" label="Drag me" onDragEnd={setPos} />
      </Map>
      <p className="font-mono text-xs text-fg-subtle">
        lng {pos.lng.toFixed(5)} · lat {pos.lat.toFixed(5)}
      </p>
    </div>
  );
}

function ClickDemo() {
  const [clicked, setClicked] = useState<string>("none");
  return (
    <div className="space-y-3">
      <Map center={[123.895, 10.316]} zoom={12} markers={LABELED} fitBounds onMarkerClick={(m) => setClicked(m.label ?? m.id ?? "")} height={420} />
      <p className="text-sm text-fg-subtle">
        Last clicked: <span className="font-medium text-fg">{clicked}</span>
      </p>
    </div>
  );
}

export default function MapMarkerShowcase() {
  return (
    <div>
      <div className="space-y-14">
        <header>
          <h1 className="text-2xl font-semibold text-fg">Map Markers</h1>
          <p className="mt-1 text-sm text-fg-subtle">
            Pins on the map. In React place <code className="font-mono text-fg">&lt;MapMarker&gt;</code> inside <code className="font-mono text-fg">&lt;Map&gt;</code>; everywhere (and in Vue, Angular and plain JS) you can pass
            plain data as <code className="font-mono text-fg">markers</code> instead. Colors follow the theme accent, and popups follow the light / dark theme.
          </p>
        </header>

        <section>
          <SectionLabel sub="A marker needs only lng and lat.">Basic</SectionLabel>
          <Map center={CEBU} zoom={12} height={420}>
            {BASIC.map((m, i) => (
              <MapMarker key={i} lng={m.lng} lat={m.lat} />
            ))}
          </Map>
          <CodeBlock
            variants={mapCode({
              props: [center, zoom(12), markersProp(BASIC)],
              reactProps: [center, zoom(12)],
              reactChildren: BASIC.map((m) => `  <MapMarker lng={${m.lng}} lat={${m.lat}} />`).join("\n"),
            })}
          />
        </section>

        <section>
          <SectionLabel sub="color takes a built-in color name (default accent — follows the theme) or any CSS color; icon draws an icon from the library's set inside the pin.">Colors and icons</SectionLabel>
          <Map center={[123.895, 10.318]} zoom={12} height={420}>
            {COLORED.map((m, i) => (
              <MapMarker key={i} lng={m.lng} lat={m.lat} color={m.color} icon={m.icon} />
            ))}
          </Map>
          <CodeBlock
            variants={mapCode({
              props: [center, zoom(12), markersProp(COLORED)],
              reactProps: [center, zoom(12)],
              reactChildren: COLORED.map((m) => `  <MapMarker lng={${m.lng}} lat={${m.lat}} color="${m.color}" icon="${m.icon}" />`).join("\n"),
            })}
          />
        </section>

        <section>
          <SectionLabel sub="label puts a small tag beside the pin.">Labels</SectionLabel>
          <Map center={[123.895, 10.318]} zoom={12} height={420}>
            {LABELED.map((m, i) => (
              <MapMarker key={i} lng={m.lng} lat={m.lat} label={m.label} />
            ))}
          </Map>
          <CodeBlock
            variants={mapCode({
              props: [center, zoom(12), markersProp(LABELED)],
              reactProps: [center, zoom(12)],
              reactChildren: LABELED.map((m) => `  <MapMarker lng={${m.lng}} lat={${m.lat}} label="${m.label}" />`).join("\n"),
            })}
          />
        </section>

        <section>
          <SectionLabel sub="popup opens on click. In React it can be any content; as data it is text.">Popups</SectionLabel>
          <Map center={[123.895, 10.315]} zoom={12.5} height={420}>
            <MapMarker lng={POPUPS[0].lng} lat={POPUPS[0].lat} label="Fort San Pedro" popup={POPUPS[0].popup} />
            <MapMarker
              lng={POPUPS[1].lng}
              lat={POPUPS[1].lat}
              label="Ayala Center"
              color="rose"
              popup={
                <div className="space-y-1">
                  <p className="font-semibold">Ayala Center Cebu</p>
                  <p className="text-xs opacity-70">Opened 1994 · shops &amp; dining</p>
                  <a className="text-xs underline" href="https://www.ayalamalls.com.ph" target="_blank" rel="noreferrer">
                    ayalamalls.com.ph
                  </a>
                </div>
              }
            />
          </Map>
          <CodeBlock
            variants={mapCode({
              props: [center, zoom(12.5), markersProp(POPUPS)],
              reactProps: [{ name: "center", value: "[123.895, 10.315]", kind: "json" }, zoom(12.5)],
              reactChildren: `  <MapMarker lng={123.9054} lat={10.2925} label="Fort San Pedro" popup="Fort San Pedro …" />
  <MapMarker lng={123.9049} lat={10.3182} color="rose" popup={<strong>Ayala Center Cebu</strong>} />`,
            })}
          />
        </section>

        <section>
          <SectionLabel sub="tooltip is a short bubble shown while hovering — handy when there are many markers.">Tooltips</SectionLabel>
          <Map center={[123.895, 10.318]} zoom={12} height={420}>
            {TIPS.map((m, i) => (
              <MapMarker key={i} lng={m.lng} lat={m.lat} tooltip={m.tooltip} color="violet" />
            ))}
          </Map>
          <CodeBlock
            variants={mapCode({
              props: [center, zoom(12), markersProp(TIPS)],
              reactProps: [center, zoom(12)],
              reactChildren: TIPS.map((m) => `  <MapMarker lng={${m.lng}} lat={${m.lat}} tooltip="${m.tooltip}" color="violet" />`).join("\n"),
            })}
          />
        </section>

        <section>
          <SectionLabel sub="draggable lets the user move a marker; onDragEnd reports the new position (the markerdragend event in Web Components).">Draggable</SectionLabel>
          <DraggableDemo />
          <CodeBlock
            variants={mapCode({
              props: [{ name: "center", value: "[123.9049, 10.3182]", kind: "json" }, zoom(13.5), markersProp([{ lng: 123.9049, lat: 10.3182, draggable: true, label: "Drag me" }])],
              reactProps: [{ name: "center", value: "[123.9049, 10.3182]", kind: "json" }, zoom(13.5)],
              reactChildren: `  <MapMarker lng={pos.lng} lat={pos.lat} draggable onDragEnd={(p) => setPos(p)} />`,
              events: [["markerdragend", "console.log(e.detail.id, e.detail.lng, e.detail.lat)"]],
            })}
          />
        </section>

        <section>
          <SectionLabel sub="Give MapMarker children to replace the pin with anything — an avatar, a badge, a price tag.">Custom markers</SectionLabel>
          <Map center={[123.895, 10.318]} zoom={12} height={420}>
            {CEBU_STOPS.map((s, i) => (
              <MapMarker key={s.name} lng={s.coord[0]} lat={s.coord[1]} popup={s.name}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-600 text-sm font-semibold text-white shadow-lg ring-4 ring-white/70">{i + 1}</span>
              </MapMarker>
            ))}
          </Map>
          <CodeBlock
            variants={mapCode({
              // Web Components take data, not children: a numbered label stands in for the custom badge.
              props: [{ name: "center", value: "[123.895, 10.318]", kind: "json" }, zoom(12), markersProp(CEBU_STOPS.map((s, i) => ({ lng: s.coord[0], lat: s.coord[1], label: String(i + 1), popup: s.name })))],
              reactProps: [{ name: "center", value: "[123.895, 10.318]", kind: "json" }, zoom(12)],
              reactChildren: `  {stops.map((s, i) => (
    <MapMarker key={s.name} lng={s.lng} lat={s.lat} popup={s.name}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-600 text-white">
        {i + 1}
      </span>
    </MapMarker>
  ))}`,
            })}
          />
        </section>

        <section>
          <SectionLabel sub="fitBounds zooms the map to show every marker. onMarkerClick receives the marker's data (markerclick in Web Components).">Data-driven and events</SectionLabel>
          <ClickDemo />
          <CodeBlock
            variants={mapCode({
              props: [center, zoom(12), { name: "fitBounds", value: "true", kind: "boolean" }, markersProp(LABELED)],
              extraReact: "onMarkerClick={(marker) => console.log(marker.label)}",
              events: [["markerclick", "console.log(e.detail.label)"]],
            })}
          />
        </section>
      </div>
    </div>
  );
}
