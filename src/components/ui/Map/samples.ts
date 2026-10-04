import type { LngLat } from "./mapTypes";

/** Cebu City, Philippines. */
export const CEBU: LngLat = [123.9, 10.305];

/** Four Cebu City landmarks, south to north. */
export const CEBU_STOPS: { name: string; coord: LngLat }[] = [
  { name: "Fort San Pedro", coord: [123.9054, 10.2925] },
  { name: "Ayala Center Cebu", coord: [123.9049, 10.3182] },
  { name: "Cebu IT Park", coord: [123.9052, 10.3287] },
  { name: "Taoist Temple", coord: [123.8793, 10.3366] },
];

/** A hand-drawn line through the city — only for demos of a custom `coordinates` line; real routes use `waypoints` / `from` + `to`. */
export const CEBU_LOOP: LngLat[] = [
  [123.9054, 10.2925],
  [123.9021, 10.2941],
  [123.8996, 10.3011],
  [123.8985, 10.3085],
  [123.9017, 10.3139],
  [123.9049, 10.3182],
  [123.9052, 10.3287],
];

/** Cebu City Hall and Mactan–Cebu International Airport — a road trip across the Mactan bridge. */
export const CITY_HALL: LngLat = [123.9022, 10.2927];
export const AIRPORT: LngLat = [123.9794, 10.3075];

export const CITIES: { name: string; center: LngLat; zoom: number }[] = [
  { name: "Cebu City", center: [123.9, 10.305], zoom: 12 },
  { name: "Manila", center: [120.9842, 14.5995], zoom: 11 },
  { name: "Davao", center: [125.4553, 7.1907], zoom: 11 },
  { name: "Tokyo", center: [139.6917, 35.6895], zoom: 10.5 },
];
