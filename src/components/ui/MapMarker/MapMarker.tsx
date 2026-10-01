import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type * as MapLibre from "maplibre-gl";
import { cx, type ColorName } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { useMap } from "../Map/mapContext";
import { cssColor } from "../Map/mapUtils";

export interface MapMarkerProps {
  /** Longitude. */
  lng: number;
  /** Latitude. */
  lat: number;
  /** Text shown beside the pin. */
  label?: string;
  /** Pin color: a built-in color name (default "accent", which follows the theme) or any CSS color. */
  color?: ColorName | (string & {});
  /** Icon name from the library's icon set, drawn inside the pin (e.g. "home"). */
  icon?: string;
  /** Content of a popup opened by clicking the marker — text or any React content. */
  popup?: ReactNode;
  /** Short text shown in a small bubble while the pointer is over the marker. */
  tooltip?: string;
  /** Let the user drag the marker (default false). */
  draggable?: boolean;
  /** Replace the default pin with your own content. */
  children?: ReactNode;
  /** Called when the marker is clicked. */
  onClick?: () => void;
  /** Called with the new position when a drag ends. */
  onDragEnd?: (position: { lng: number; lat: number }) => void;
  /** Extra class names applied to the default pin. */
  className?: string;
}

/** A pin on the map. Render it inside `<Map>`. */
export function MapMarker({ lng, lat, label, color = "accent", icon, popup, tooltip, draggable = false, children, onClick, onDragEnd, className }: MapMarkerProps) {
  const { map, maplibre } = useMap();
  // The marker's DOM element and popup body are created once; React content is portalled into them.
  const [el] = useState(() => document.createElement("div"));
  const [popupEl] = useState(() => document.createElement("div"));
  const markerRef = useRef<MapLibre.Marker | null>(null);
  const handlers = useRef({ onClick, onDragEnd });
  useEffect(() => {
    handlers.current = { onClick, onDragEnd };
  });
  const hasPopup = popup !== undefined && popup !== null && popup !== false;

  useEffect(() => {
    if (!map || !maplibre) return;
    const marker = new maplibre.Marker({ element: el, draggable, anchor: children ? "center" : "bottom" }).setLngLat([lng, lat]).addTo(map);
    markerRef.current = marker;
    const click = () => handlers.current.onClick?.();
    el.addEventListener("click", click);
    marker.on("dragend", () => {
      const p = marker.getLngLat();
      handlers.current.onDragEnd?.({ lng: p.lng, lat: p.lat });
    });
    return () => {
      el.removeEventListener("click", click);
      marker.remove();
      markerRef.current = null;
    };
    // lng / lat are applied by the effect below, so moving a marker doesn't recreate it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, maplibre, el, draggable, !!children]);

  useEffect(() => {
    markerRef.current?.setLngLat([lng, lat]);
  }, [lng, lat, map, maplibre]);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker || !maplibre) return;
    if (!hasPopup) {
      marker.setPopup(null);
      return;
    }
    marker.setPopup(new maplibre.Popup({ offset: children ? 14 : [0, -34], maxWidth: "260px" }).setDOMContent(popupEl));
    return () => {
      marker.setPopup(null);
    };
  }, [map, maplibre, hasPopup, popupEl, children]);

  useEffect(() => {
    const marker = markerRef.current;
    if (!map || !maplibre || !marker || !tooltip) return;
    const bubble = new maplibre.Popup({ closeButton: false, closeOnClick: false, offset: children ? 14 : [0, -34], className: "lojee-map-tooltip" });
    const show = () => {
      if (!marker.getPopup()?.isOpen()) bubble.setLngLat(marker.getLngLat()).setText(tooltip).addTo(map);
    };
    const hide = () => bubble.remove();
    el.addEventListener("mouseenter", show);
    el.addEventListener("mouseleave", hide);
    return () => {
      el.removeEventListener("mouseenter", show);
      el.removeEventListener("mouseleave", hide);
      bubble.remove();
    };
  }, [map, maplibre, el, tooltip, children]);

  const fill = cssColor(color);
  const pin = (
    <div className={cx("relative flex cursor-pointer flex-col items-center", className)} style={{ width: 28, height: 36 }}>
      <svg width="28" height="36" viewBox="0 0 28 36" fill="none" className="drop-shadow-md" aria-hidden="true">
        <path d="M14 0C6.3 0 0 6.1 0 13.7 0 24 14 36 14 36s14-12 14-22.3C28 6.1 21.7 0 14 0Z" fill={fill} />
        <circle cx="14" cy="13.5" r="9" fill="white" fillOpacity={icon ? 0.18 : 0.9} />
      </svg>
      {icon && (
        <span className="absolute left-1/2 top-[7px] -translate-x-1/2 text-white">
          <Icon name={icon} size={14} />
        </span>
      )}
      {label && (
        <span className="pointer-events-none absolute left-full top-1.5 ml-1.5 whitespace-nowrap rounded-md bg-surface px-1.5 py-0.5 text-xs font-medium text-fg shadow-md ring-1 ring-black/5">
          {label}
        </span>
      )}
    </div>
  );

  return (
    <>
      {createPortal(children ?? pin, el)}
      {hasPopup && createPortal(popup, popupEl)}
    </>
  );
}
