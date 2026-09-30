// Layered auto-layout for FlowDiagram: nodes are assigned to layers by their longest path from a source, layers
// are laid out along the main axis, and the nodes of a layer are centred along the cross axis.

export type FlowShape = "rect" | "pill" | "circle" | "diamond" | "hexagon" | "parallelogram" | "cylinder";
export type FlowTone = "default" | "accent" | "muted";
export type FlowDirection = "horizontal" | "vertical";
export type FlowCurve = "smooth" | "step" | "straight";

export interface FlowNodeData {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
  shape?: FlowShape;
  tone?: FlowTone;
  layer?: number;
}

export interface FlowEdgeData {
  from: string;
  to: string;
  label?: string;
}

export interface LayoutOptions {
  direction: FlowDirection;
  nodeWidth: number;
  nodeHeight: number;
  gap: number;
  spacing: number;
  padX: number;
  padTop: number;
  padBottom: number;
}

export interface PlacedNode {
  node: FlowNodeData;
  x: number;
  y: number;
  w: number;
  h: number;
  layer: number;
}

export interface Layout {
  placed: Map<string, PlacedNode>;
  order: string[];
  width: number;
  height: number;
}

export function computeLayout(nodes: FlowNodeData[], edges: FlowEdgeData[], o: LayoutOptions): Layout {
  const ids = new Set(nodes.map((n) => n.id));
  const validEdges = edges.filter((e) => ids.has(e.from) && ids.has(e.to) && e.from !== e.to);

  // Longest-path layering (bounded, so cycles can't loop forever).
  const depth = new Map<string, number>(nodes.map((n) => [n.id, n.layer ?? 0]));
  for (let pass = 0; pass < nodes.length; pass++) {
    let changed = false;
    for (const e of validEdges) {
      const target = nodes.find((n) => n.id === e.to)!;
      if (target.layer !== undefined) continue;
      const next = (depth.get(e.from) ?? 0) + 1;
      if (next > (depth.get(e.to) ?? 0)) {
        depth.set(e.to, next);
        changed = true;
      }
    }
    if (!changed) break;
  }

  const horizontal = o.direction === "horizontal";
  const circle = o.nodeHeight + 22;
  const size = (n: FlowNodeData) => {
    switch (n.shape) {
      case "circle":
        return { w: circle, h: circle };
      case "diamond":
        return { w: o.nodeWidth + 14, h: o.nodeHeight + 34 };
      case "cylinder":
        return { w: o.nodeWidth, h: o.nodeHeight + 16 };
      default:
        return { w: o.nodeWidth, h: o.nodeHeight };
    }
  };
  const main = (n: FlowNodeData) => (horizontal ? size(n).w : size(n).h);
  const cross = (n: FlowNodeData) => (horizontal ? size(n).h : size(n).w);

  const layerCount = Math.max(0, ...[...depth.values()]) + 1;
  const layers: FlowNodeData[][] = Array.from({ length: layerCount }, () => []);
  for (const n of nodes) layers[depth.get(n.id) ?? 0].push(n);

  const layerCross = layers.map((l) => l.reduce((sum, n, i) => sum + cross(n) + (i ? o.spacing : 0), 0));
  const maxCross = Math.max(0, ...layerCross);

  const placed = new Map<string, PlacedNode>();
  let mainPos = horizontal ? o.padX : o.padTop;
  layers.forEach((layer, li) => {
    const layerMain = Math.max(0, ...layer.map(main));
    let crossPos = (maxCross - layerCross[li]) / 2 + (horizontal ? o.padTop : o.padX);
    for (const n of layer) {
      const { w, h } = size(n);
      const m = mainPos + (layerMain - main(n)) / 2;
      placed.set(n.id, horizontal ? { node: n, x: m, y: crossPos, w, h, layer: li } : { node: n, x: crossPos, y: m, w, h, layer: li });
      crossPos += cross(n) + o.spacing;
    }
    mainPos += layerMain + o.gap;
  });

  const mainEnd = mainPos - o.gap;
  const width = horizontal ? mainEnd + o.padX : maxCross + o.padX * 2;
  const height = horizontal ? maxCross + o.padTop + o.padBottom : mainEnd + o.padBottom;

  // Reading order: layer by layer, top to bottom (used by autoPlay).
  const order = layers.flat().map((n) => n.id);
  return { placed, order, width, height };
}

export interface EdgeGeometry {
  d: string;
  mid: { x: number; y: number };
}

export function edgeGeometry(a: PlacedNode, b: PlacedNode, direction: FlowDirection, curve: FlowCurve): EdgeGeometry {
  const horizontal = direction === "horizontal";
  // A parallelogram's slanted sides sit a little inside its bounding box.
  const slant = (p: PlacedNode) => (p.node.shape === "parallelogram" ? p.h * 0.175 : 0);
  const ax = horizontal ? a.x + a.w - slant(a) : a.x + a.w / 2;
  const ay = horizontal ? a.y + a.h / 2 : a.y + a.h;
  const bx = horizontal ? b.x + slant(b) : b.x + b.w / 2;
  const by = horizontal ? b.y + b.h / 2 : b.y;
  const mid = { x: (ax + bx) / 2, y: (ay + by) / 2 };

  if (curve === "straight") return { d: `M${ax} ${ay} L${bx} ${by}`, mid };
  if (curve === "step") {
    return { d: horizontal ? `M${ax} ${ay} L${mid.x} ${ay} L${mid.x} ${by} L${bx} ${by}` : `M${ax} ${ay} L${ax} ${mid.y} L${bx} ${mid.y} L${bx} ${by}`, mid };
  }
  return {
    d: horizontal
      ? `M${ax} ${ay} C${mid.x} ${ay} ${mid.x} ${by} ${bx} ${by}`
      : `M${ax} ${ay} C${ax} ${mid.y} ${bx} ${mid.y} ${bx} ${by}`,
    mid,
  };
}

/** A kind of node the editor can add: its shape, tone, icon and default label. */
export interface FlowNodeType {
  key: string;
  label: string;
  shape?: FlowShape;
  tone?: FlowTone;
  icon?: string;
}

/** SVG path of a node's outline (also used for its selection halo). */
export function shapePath(shape: FlowShape | undefined, x: number, y: number, w: number, h: number): string {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const round = (r: number) =>
    `M${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h - r} A${r} ${r} 0 0 1 ${x + w - r} ${y + h} H${x + r} A${r} ${r} 0 0 1 ${x} ${y + h - r} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z`;
  switch (shape) {
    case "pill":
    case "circle":
      return round(Math.min(w, h) / 2);
    case "diamond":
      return `M${cx} ${y} L${x + w} ${cy} L${cx} ${y + h} L${x} ${cy} Z`;
    case "hexagon": {
      const i = Math.min(h * 0.5, w * 0.2);
      return `M${x + i} ${y} L${x + w - i} ${y} L${x + w} ${cy} L${x + w - i} ${y + h} L${x + i} ${y + h} L${x} ${cy} Z`;
    }
    case "parallelogram": {
      const s = h * 0.35;
      return `M${x + s} ${y} L${x + w} ${y} L${x + w - s} ${y + h} L${x} ${y + h} Z`;
    }
    case "cylinder": {
      const ry = 8;
      return `M${x} ${y + ry} A${w / 2} ${ry} 0 0 1 ${x + w} ${y + ry} V${y + h - ry} A${w / 2} ${ry} 0 0 1 ${x} ${y + h - ry} Z`;
    }
    default:
      return round(12);
  }
}

export const DEFAULT_NODE_TYPES: FlowNodeType[] = [
  { key: "process", label: "Rectangle", shape: "rect", icon: "box" },
  { key: "rounded", label: "Rounded", shape: "pill", tone: "accent" },
  { key: "circle", label: "Circle", shape: "circle" },
  { key: "decision", label: "Diamond", shape: "diamond" },
  { key: "hexagon", label: "Hexagon", shape: "hexagon" },
  { key: "data", label: "Parallelogram", shape: "parallelogram" },
  { key: "database", label: "Cylinder", shape: "cylinder", icon: "table-2" },
  { key: "service", label: "Service", shape: "rect", tone: "accent", icon: "settings" },
  { key: "note", label: "Note", shape: "rect", tone: "muted" },
];
