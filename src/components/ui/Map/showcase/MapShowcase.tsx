import { useState } from "react";
import { Map } from "../Map";
import { MapMarker } from "../../MapMarker/MapMarker";
import CodeBlock from "../../CodeBlock";
import { Button } from "../../Buttons/Button";
import { SectionLabel } from "../../ShowcaseHelpers";
import { CITIES, CEBU } from "../samples";
import { mapCode } from "./mapCode";
import type { MapViewState } from "../mapTypes";
import { MAP_STYLE_NAMES } from "../mapUtils";

function CameraDemo() {
  const [city, setCity] = useState(CITIES[0]);
  const [tilt, setTilt] = useState(false);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {CITIES.map((c) => (
          <Button key={c.name} size="sm" variant={c.name === city.name ? "solid" : "outline"} label={c.name} onClick={() => setCity(c)} />
        ))}
        <Button size="sm" variant={tilt ? "solid" : "soft"} icon="layout" label={tilt ? "3D tilt on" : "3D tilt"} onClick={() => setTilt((t) => !t)} />
      </div>
      <Map center={city.center} zoom={city.zoom} pitch={tilt ? 60 : 0} bearing={tilt ? -20 : 0} controls />
    </div>
  );
}

function EventsDemo() {
  const [view, setView] = useState<MapViewState | null>(null);
  const [click, setClick] = useState<{ lng: number; lat: number } | null>(null);
  return (
    <div className="space-y-3">
      <Map center={CEBU} zoom={11} controls={["zoom", "scale"]} onMove={setView} onMapClick={setClick}>
        {click && <MapMarker lng={click.lng} lat={click.lat} color="rose" label="Clicked" />}
      </Map>
      <p className="font-mono text-xs text-fg-subtle">
        {view ? `center ${view.center[0].toFixed(4)}, ${view.center[1].toFixed(4)} · zoom ${view.zoom.toFixed(2)}` : "move the map"} ·{" "}
        {click ? `click ${click.lng.toFixed(4)}, ${click.lat.toFixed(4)}` : "click the map"}
      </p>
    </div>
  );
}

export default function MapShowcase() {
  return (
    <div>
      <div className="space-y-14">
        <header>
          <h1 className="text-2xl font-semibold text-fg">Map</h1>
          <p className="mt-1 text-sm text-fg-subtle">
            An interactive vector map built on MapLibre GL with free CARTO basemaps — no API key. It follows the light / dark theme, loads MapLibre only when a map is shown, and works as{" "}
            <code className="font-mono text-fg">&lt;Map&gt;</code> in React and <code className="font-mono text-fg">&lt;l-map&gt;</code> in Vue, Angular and plain JS. Compose it with markers and routes, or pass them as data.
          </p>
          <p className="mt-2 text-xs text-fg-subtle">
            Install the engine once: <code className="font-mono text-fg">npm install maplibre-gl</code> (a peer dependency of lojee-ui for React; the Web Components bundle it).
          </p>
        </header>

        <section>
          <SectionLabel sub="center is [longitude, latitude]; zoom runs from 0 (the world) to 22 (buildings). Drag to pan, scroll to zoom, right-drag to rotate.">Basic</SectionLabel>
          <Map center={CEBU} zoom={12} />
          <CodeBlock variants={mapCode({ props: [{ name: "center", value: "[123.9, 10.305]", kind: "json" }, { name: "zoom", value: "12", kind: "number" }] })} />
        </section>

        <section>
          <SectionLabel sub={'controls={true} adds zoom, compass, locate-me and fullscreen. Pass a list to choose — "zoom" | "compass" | "locate" | "fullscreen" | "scale" | "style".'}>Controls</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2">
            <Map center={CEBU} zoom={11} controls className="h-72" />
            <Map center={CEBU} zoom={11} controls={["zoom", "scale"]} className="h-72" />
          </div>
          <CodeBlock
            variants={mapCode({
              props: [
                { name: "center", value: "[123.9, 10.305]", kind: "json" },
                { name: "zoom", value: "11", kind: "number" },
                { name: "controls", value: '["zoom", "scale"]', kind: "json" },
              ],
            })}
          />
        </section>

        <section>
          <SectionLabel sub={'mapStyle="auto" (default) follows the page theme — switch light / dark in the header and watch it change. Or pin one: "light", "dark", "voyager", "light-minimal", "dark-minimal", "osm", "satellite", or the URL of any MapLibre style. Add "style" to controls for a built-in picker.'}>Themes and styles</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MAP_STYLE_NAMES.map((s) => (
              <div key={s}>
                <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-fg-subtle">{s}</p>
                <Map center={CEBU} zoom={12} mapStyle={s} className="h-44" />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Map center={CEBU} zoom={12} controls={["zoom", "style"]} markers={[{ lng: CEBU[0], lat: CEBU[1], label: "Cebu City" }]} className="h-72" />
          </div>
          <CodeBlock variants={mapCode({ props: [{ name: "center", value: "[123.9, 10.305]", kind: "json" }, { name: "zoom", value: "12", kind: "number" }, { name: "mapStyle", value: '"voyager"', kind: "string" }, { name: "controls", value: '["zoom", "style"]', kind: "json" }] })} />
        </section>

        <section>
          <SectionLabel sub="Change center / zoom / pitch / bearing and the camera glides there. pitch tilts the map for a 3D view; bearing rotates it.">Camera</SectionLabel>
          <CameraDemo />
          <CodeBlock
            variants={mapCode({
              props: [
                { name: "center", value: "[139.6917, 35.6895]", kind: "json" },
                { name: "zoom", value: "11.5", kind: "number" },
                { name: "pitch", value: "60", kind: "number" },
                { name: "bearing", value: "-20", kind: "number" },
                { name: "controls", value: "true", kind: "json" },
              ],
            })}
          />
        </section>

        <section>
          <SectionLabel sub="onMove fires when the user stops moving the map; onMapClick reports where it was clicked. In Web Components they are the move and mapclick events.">Events</SectionLabel>
          <EventsDemo />
          <CodeBlock
            variants={mapCode({
              props: [
                { name: "center", value: "[123.9, 10.305]", kind: "json" },
                { name: "zoom", value: "11", kind: "number" },
              ],
              extraReact: "onMove={(view) => console.log(view.center, view.zoom)}\n  onMapClick={({ lng, lat }) => console.log(lng, lat)}",
              events: [["move", "console.log(e.detail.center, e.detail.zoom)"], ["mapclick", "console.log(e.detail.lng, e.detail.lat)"]],
            })}
          />
        </section>
      </div>
    </div>
  );
}
