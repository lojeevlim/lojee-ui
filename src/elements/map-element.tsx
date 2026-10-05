import { Map, type MapProps } from "../components/ui/Map/Map";

// Wrapper for `<l-map>`: full width and 480px tall by default; set the `width` / `height` attributes (e.g. `height="500"` or `height="60vh"`) to resize it, and flattens
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
      className={className}
      onLoad={onLoad ? () => onLoad() : undefined}
      onMarkerDragEnd={onMarkerDragEnd ? (m, p) => onMarkerDragEnd({ ...m, ...p }) : undefined}
    />
  );
}
