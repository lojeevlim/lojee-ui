import type { LngLat } from "./mapTypes";

export interface RouteResult {
  coordinates: LngLat[];
  /** Metres. */
  distance: number;
  /** Seconds. */
  duration: number;
}

export type RouteProfile = "driving" | "cycling" | "walking";
export type RoutePreference = "shortest" | "fastest";

// The OSRM demo server only knows cars; the openstreetmap.de (FOSSGIS) servers add bike and foot routing. (Their path always says "driving".)
const PROFILE_URL: Record<RouteProfile, string> = {
  driving: "https://router.project-osrm.org/route/v1/driving",
  cycling: "https://routing.openstreetmap.de/routed-bike/route/v1/driving",
  walking: "https://routing.openstreetmap.de/routed-foot/route/v1/driving",
};

/**
 * Fetches road routes through `waypoints` from the public OSRM demo servers. With `alternatives` it can return more than
 * one route (`true` = one extra, a number = up to that many). Throws if the request fails — fine for demos; for production,
 * point it at your own OSRM instance with the `baseUrl` option.
 */
export async function fetchRoutes(
  waypoints: LngLat[],
  options: { alternatives?: boolean | number; baseUrl?: string; profile?: RouteProfile; signal?: AbortSignal } = {}
): Promise<RouteResult[]> {
  if (waypoints.length < 2) return [];
  const path = waypoints.map((p) => `${p[0]},${p[1]}`).join(";");
  const base = options.baseUrl ?? PROFILE_URL[options.profile ?? "driving"];
  const url = `${base}/${path}?overview=full&geometries=geojson&alternatives=${options.alternatives ? String(options.alternatives) : "false"}`;
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

/**
 * The best road route from the first waypoint to the last (through any in between): it asks for the alternatives too and picks
 * the one with the least distance (`prefer: "shortest"`, the default) or the least travel time (`"fastest"`).
 */
export async function fetchBestRoute(
  waypoints: LngLat[],
  options: { prefer?: RoutePreference; baseUrl?: string; profile?: RouteProfile; signal?: AbortSignal } = {}
): Promise<RouteResult | null> {
  const routes = await fetchRoutes(waypoints, { alternatives: 3, baseUrl: options.baseUrl, profile: options.profile, signal: options.signal });
  if (!routes.length) return null;
  const key = options.prefer === "fastest" ? (r: RouteResult) => r.duration : (r: RouteResult) => r.distance;
  return routes.reduce((best, r) => (key(r) < key(best) ? r : best));
}
