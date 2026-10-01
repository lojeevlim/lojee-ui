import { Map, type MapProps } from "../components/ui/Map/Map";

// Wrapper for `<l-map>`: fills the host element (set its height with CSS, e.g. `style="height:400px"`), and flattens
// the callbacks whose React signature takes two arguments into a single event payload.
export type MapElementProps = Omit<MapProps, "onLoad" | "onMarkerDragEnd" | "children"> & {
  onLoad?: () => void;
  /** Marker data with its new `lng` / `lat`. */
  onMarkerDragEnd?: (marker: { id?: string; lng: number; lat: number }) => void;
};

export function MapElement({ onLoad, onMarkerDragEnd, className, ...rest }: MapElementProps) {
  return (
    <Map
      {...rest}
      className={className ?? "h-full min-h-[320px]"}
      onLoad={onLoad ? () => onLoad() : undefined}
      onMarkerDragEnd={onMarkerDragEnd ? (m, p) => onMarkerDragEnd({ ...m, ...p }) : undefined}
    />
  );
}
