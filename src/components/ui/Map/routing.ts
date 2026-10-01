import type { LngLat } from "./mapTypes";

export interface RouteResult {
  coordinates: LngLat[];
  /** Metres. */
  distance: number;
  /** Seconds. */
  duration: number;
}

const OSRM = "https://router.project-osrm.org/route/v1/driving";

/**
 * Fetches road routes through `waypoints` from the public OSRM demo server (driving profile). With
 * `alternatives: true` it can return more than one route. Throws if the request fails — fine for demos; for
 * production, point it at your own OSRM instance with the `baseUrl` option.
 */
export async function fetchRoutes(
  waypoints: LngLat[],
  options: { alternatives?: boolean; baseUrl?: string; signal?: AbortSignal } = {}
): Promise<RouteResult[]> {
  if (waypoints.length < 2) return [];
  const path = waypoints.map((p) => `${p[0]},${p[1]}`).join(";");
  const url = `${options.baseUrl ?? OSRM}/${path}?overview=full&geometries=geojson&alternatives=${options.alternatives ? "true" : "false"}`;
  const res = await fetch(url, { signal: options.signal });
  if (!res.ok) throw new Error(`Routing failed (${res.status})`);
  const data = await res.json();
  if (data.code !== "Ok") throw new Error(`Routing failed (${data.code})`);
  return (data.routes as { geometry: { coordinates: LngLat[] }; distance: number; duration: number }[]).map((r) => ({
    coordinates: r.geometry.coordinates,
    distance: r.distance,
    duration: r.duration,
  }));
}
