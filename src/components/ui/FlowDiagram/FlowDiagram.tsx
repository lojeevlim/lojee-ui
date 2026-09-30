import { useEffect, useId, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { getIcon } from "../../../core/icons";
import { FlowToolbar } from "./FlowToolbar";
import {
  DEFAULT_NODE_TYPES,
  computeLayout,
  shapePath,
  edgeGeometry,
  type FlowCurve,
  type FlowDirection,
  type FlowEdgeData,
  type FlowNodeData,
  type FlowNodeType,
  type FlowShape,
  type FlowTone,
} from "./flowLayout";

export type { FlowCurve, FlowDirection, FlowEdgeData as FlowEdge, FlowNodeData as FlowNode, FlowNodeType, FlowShape, FlowTone };

export type FlowVariant = "schematic" | "blueprint" | "minimal" | "solid" | "outline" | "glow";

export interface FlowDiagramProps {
  /** The boxes of the diagram. Each has an `id`, a `label` and optionally a `sublabel`, `icon`, `shape` ("rect", "pill" or "circle"), `tone` ("default", "accent" or "muted") and a fixed `layer` (otherwise derived from the edges). */
  nodes: FlowNodeData[];
  /** Connections between nodes, by `from` / `to` node id, with an optional `label` drawn on the wire. Nodes are placed in layers automatically from these. */
  edges: FlowEdgeData[];
  /** Flow direction: "horizontal" (left → right, default), "vertical" (top → bottom) or "auto" — horizontal when there is room, vertical when the container is narrow (a phone). */
  direction?: FlowDirection | "auto";
  /** Visual style: "schematic" (default), "blueprint", "minimal", "solid", "outline" or "glow". */
  variant?: FlowVariant;
  /** Wire shape: "smooth" (default), "step" (right angles) or "straight". */
  curve?: FlowCurve;
  /** Accent color of active nodes, wires and packets (default "accent" — follows the theme). A built-in color name or any CSS color. */
  color?: ColorName | (string & {});
  /** Show small dots travelling along the wires (default true). Off automatically when the user prefers reduced motion. */
  packets?: boolean;
  /** Seconds a packet takes to cross one wire (default 2.2). */
  speed?: number;
  /** Animate the dashes of highlighted wires (default true). */
  animated?: boolean;
  /** Draw arrowheads at the end of each wire (default false). */
  arrows?: boolean;
  /** Hovering or selecting a node highlights its wires and dims the rest; clicking selects it (default true). */
  interactive?: boolean;
  /** Selected node id. Uncontrolled (internal state) unless both `activeNode` and `onNodeClick` are given. */
  activeNode?: string;
  /** Initially selected node id when `activeNode` isn't given. */
  defaultActiveNode?: string;
  /** Walk through the nodes automatically, selecting the next one every N milliseconds (`true` = 1600). Pauses while hovering; ignored when `activeNode` is controlled. */
  autoPlay?: boolean | number;
  /** Draw a blueprint grid behind the diagram (default: on for the "blueprint" variant). */
  grid?: boolean;
  /** Small monospace label above the diagram. */
  captionTop?: string;
  /** Small monospace label below the diagram. */
  captionBottom?: string;
  /** Node width in px (default 150). Circles use the node height plus a margin. */
  nodeWidth?: number;
  /** Node height in px (default 56). */
  nodeHeight?: number;
  /** Space between layers in px (default 110). */
  gap?: number;
  /** Space between nodes of the same layer in px (default 22). */
  spacing?: number;
  /** Let nodes be dragged with the mouse or touch (and nudged with the arrow keys — Shift for bigger steps). The wires follow; nodes stay inside the diagram (default false). */
  movable?: boolean;
  /** Called continuously while a node moves, with its id and its new top-left position in diagram units. */
  onNodeMove?: (move: { id: string; x: number; y: number }) => void;
  /** Turn the diagram into an editor: a toolbar to add elements (pick a type), connect two elements, rename the selected element or wire, delete it, and reset. Nodes become movable, double-click renames, and Delete removes the selection. The diagram keeps its own edited copy of `nodes` / `edges`, seeded from the props (pass stable arrays — a new array resets the edits). */
  editable?: boolean;
  /** Show zoom controls (− / % / +) and allow Ctrl/⌘ + scroll to zoom, from 50% to 250% (default false; always on with `editable`). */
  zoomable?: boolean;
  /** The kinds of element the editor can add — each has a `key`, `label` and optional `shape`, `tone` and `icon`. Defaults to Process, Start / End, Decision, Data, Service and Note. */
  nodeTypes?: FlowNodeType[];
  /** Editor: called with the full `{ nodes, edges }` after every edit (add, connect, rename, delete, reset). */
  onDiagramChange?: (data: { nodes: FlowNodeData[]; edges: FlowEdgeData[] }) => void;
  /** Where the editor / zoom toolbar goes: "top" (a row above the diagram, default) or "right" (a vertical column at the top right). */
  toolbarPosition?: "top" | "right";
  /** React only: render the toolbar into this element (for example a panel beside the diagram) instead of above it. Pass `null` while the element isn't mounted yet — nothing is rendered until it is. */
  toolbarTarget?: HTMLElement | null;
  /** Accessible description of the whole diagram. */
  label?: string;
  /** Called with the node when it is clicked or activated with the keyboard. */
  onNodeClick?: (node: FlowNodeData) => void;
  /** Called with the node when the pointer enters it, and with `null` when it leaves. */
  onNodeHover?: (node: FlowNodeData | null) => void;
  /** Extra class names applied to the root element. */
  className?: string;
  /** Per-part class overrides (`root`, `svg`) — merged after the built-in styling. */
  classNames?: { root?: string; svg?: string };
}

/** CSS color pieces for a color prop: main, stronger (fills behind white text), light (for wash fills / packets). */
function palette(color: string) {
  if (color === "accent") return { base: "var(--color-accent-500)", strong: "var(--color-accent-600)", light: "var(--color-accent-400)" };
  const base = isColorName(color) ? `var(--color-${color}-500)` : color;
  return { base, strong: `color-mix(in srgb, ${base} 82%, black)`, light: `color-mix(in srgb, ${base} 75%, white)` };
}

const wash = (c: string, pct = 14) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;

export function FlowDiagram({
  nodes,
  edges,
  direction = "horizontal",
  variant = "schematic",
  curve = "smooth",
  color = "accent",
  packets = true,
  speed = 2.2,
  animated = true,
  arrows = false,
  interactive = true,
  activeNode,
  defaultActiveNode,
  autoPlay = false,
  grid,
  captionTop,
  captionBottom,
  nodeWidth = 150,
  nodeHeight = 56,
  gap = 110,
  spacing = 22,
  label = "Flow diagram",
  movable: movableProp = false,
  onNodeMove,
  editable = false,
  zoomable: zoomableProp = false,
  toolbarPosition = "top",
  toolbarTarget,
  nodeTypes = DEFAULT_NODE_TYPES,
  onDiagramChange,
  onNodeClick,
  onNodeHover,
  className,
  classNames,
}: FlowDiagramProps) {
  const uid = useId().replace(/:/g, "");
  const movable = movableProp || editable;
  const zoomable = zoomableProp || editable;

  // Editor state: an edited copy of the data, re-seeded when the props change to a different array.
  const [data, setData] = useState({ nodes, edges });
  const [seed, setSeed] = useState({ nodes, edges });
  if (editable && (seed.nodes !== nodes || seed.edges !== edges)) {
    setSeed({ nodes, edges });
    setData({ nodes, edges });
  }
  const liveNodes = editable ? data.nodes : nodes;
  const liveEdges = editable ? data.edges : edges;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [rootWidth, setRootWidth] = useState(0);
  useEffect(() => {
    const el = rootRef.current;
    if (!el || direction !== "auto" || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => setRootWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [direction]);
  const dir: FlowDirection = direction === "auto" ? (rootWidth > 0 && rootWidth < 560 ? "vertical" : "horizontal") : direction;
  // Auto + narrow (a phone): vertical AND smaller boxes, so the whole diagram fits without scrolling.
  const compact = direction === "auto" && dir === "vertical";
  const boxW = compact ? Math.min(nodeWidth, 92) : nodeWidth;
  const boxGap = compact ? Math.min(gap, 64) : gap;
  const boxSpacing = compact ? Math.min(spacing, 12) : spacing;
  const pal = palette(color);
  const showGrid = grid ?? variant === "blueprint";

  const layout = useMemo(
    () =>
      computeLayout(liveNodes, liveEdges, {
        direction: dir,
        nodeWidth: boxW,
        nodeHeight,
        gap: boxGap,
        spacing: boxSpacing,
        padX: 28,
        padTop: captionTop ? 44 : 28,
        padBottom: captionBottom ? 44 : 28,
      }),
    [liveNodes, liveEdges, dir, boxW, nodeHeight, boxGap, boxSpacing, captionTop, captionBottom]
  );

  // Dragged positions are kept as offsets from the computed layout, so a data change still re-flows the rest.
  const [offsets, setOffsets] = useState<Record<string, { dx: number; dy: number }>>({});
  const placed = useMemo(() => {
    const m = new Map(layout.placed);
    for (const [id, o] of Object.entries(offsets)) {
      const p = m.get(id);
      if (p) m.set(id, { ...p, x: p.x + o.dx, y: p.y + o.dy });
    }
    return m;
  }, [layout, offsets]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const drag = useRef<{ id: string; sx: number; sy: number; base: { dx: number; dy: number }; moved: boolean } | null>(null);

  const toSvg = (e: { clientX: number; clientY: number }) => {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return { x: e.clientX, y: e.clientY };
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const r = pt.matrixTransform(ctm.inverse());
    return { x: r.x, y: r.y };
  };

  // Moves a node by a delta from the layout position, clamped so it can't leave the diagram.
  const moveTo = (id: string, dx: number, dy: number) => {
    const base = layout.placed.get(id);
    if (!base) return;
    const cdx = Math.min(Math.max(dx, -base.x), layout.width - base.w - base.x);
    const cdy = Math.min(Math.max(dy, -base.y), layout.height - base.h - base.y);
    setOffsets((o) => ({ ...o, [id]: { dx: cdx, dy: cdy } }));
    onNodeMove?.({ id, x: Math.round(base.x + cdx), y: Math.round(base.y + cdy) });
  };

  const onPointerDown = (e: ReactPointerEvent<SVGGElement>, id: string) => {
    if (!movable || e.button > 0) return;
    const p = toSvg(e);
    drag.current = { id, sx: p.x, sy: p.y, base: offsets[id] ?? { dx: 0, dy: 0 }, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<SVGGElement>) => {
    const d = drag.current;
    if (!d) return;
    const p = toSvg(e);
    const ddx = p.x - d.sx;
    const ddy = p.y - d.sy;
    if (!d.moved && Math.hypot(ddx, ddy) < 4) return;
    if (!d.moved) setDraggingId(d.id);
    d.moved = true;
    moveTo(d.id, d.base.dx + ddx, d.base.dy + ddy);
  };
  const onPointerUp = () => {
    setDraggingId(null);
    // keep `moved` until the click that follows a drag has been swallowed
    if (drag.current && !drag.current.moved) drag.current = null;
    else setTimeout(() => (drag.current = null), 0);
  };

  const controlled = activeNode !== undefined && onNodeClick !== undefined;
  const [internalActive, setInternalActive] = useState<string | undefined>(activeNode ?? defaultActiveNode);
  const active = controlled ? activeNode : internalActive;
  const [hovered, setHovered] = useState<string | null>(null);

  // autoPlay: step through the nodes in reading order (uncontrolled only, paused while hovering).
  const interval = autoPlay === true ? 1600 : autoPlay || 0;
  const orderKey = layout.order.join("|");
  useEffect(() => {
    if (!interval || controlled || hovered || !orderKey) return;
    const ids = orderKey.split("|");
    const id = setInterval(() => {
      setInternalActive((cur) => ids[(ids.indexOf(cur ?? "") + 1) % ids.length]);
    }, interval);
    return () => clearInterval(id);
  }, [interval, controlled, hovered, orderKey]);

  // In the editor only hovering dims the rest — a freshly added, unconnected node must not fade the whole diagram.
  const focus = editable ? hovered : interactive ? hovered ?? active ?? null : active ?? null;
  const validEdges = liveEdges.filter((e) => placed.has(e.from) && placed.has(e.to));
  const connected = useMemo(() => {
    const s = new Set<string>();
    if (focus) {
      s.add(focus);
      for (const e of validEdges) {
        if (e.from === focus) s.add(e.to);
        if (e.to === focus) s.add(e.from);
      }
    }
    return s;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- validEdges is derived from edges + layout
  }, [focus, liveEdges, placed]);

  const reducedMotion = typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const mono = variant === "blueprint";
  const font = mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : "inherit";

  // ---- editor ------------------------------------------------------------------------------------------------
  const [zoom, setZoomState] = useState(1);
  const setZoom = (z: number) => setZoomState(Math.min(2.5, Math.max(0.5, Math.round(z * 100) / 100)));
  const [typeKey, setTypeKey] = useState(nodeTypes[0]?.key ?? "");
  const [connectMode, setConnectMode] = useState(false);
  const [connectFrom, setConnectFrom] = useState<string | null>(null);
  const [selEdge, setSelEdge] = useState<number | null>(null);
  const [editing, setEditing] = useState<{ kind: "node" | "edge"; key: string } | null>(null);
  const editDone = useRef(false);

  const commit = (n: FlowNodeData[], e: FlowEdgeData[]) => {
    setData({ nodes: n, edges: e });
    onDiagramChange?.({ nodes: n, edges: e });
  };
  const beginEdit = (kind: "node" | "edge", key: string) => {
    editDone.current = false;
    setEditing({ kind, key });
  };
  const pickNode = (id: string | undefined) => {
    if (!controlled) setInternalActive(id);
  };

  const addNode = () => {
    const t = nodeTypes.find((x) => x.key === typeKey) ?? nodeTypes[0];
    if (!t) return;
    const ids = new Set(liveNodes.map((n) => n.id));
    let i = liveNodes.length + 1;
    while (ids.has(`n${i}`)) i++;
    const id = `n${i}`;
    const node: FlowNodeData = { id, label: t.label, shape: t.shape, tone: t.tone, icon: t.icon };
    const from = active && ids.has(active) ? active : undefined;
    commit([...liveNodes, node], from ? [...liveEdges, { from, to: id }] : liveEdges);
    pickNode(id);
    setSelEdge(null);
    beginEdit("node", id);
  };
  const deleteSelection = () => {
    if (selEdge !== null) {
      commit(liveNodes, liveEdges.filter((_, i) => i !== selEdge));
      setSelEdge(null);
    } else if (active && liveNodes.some((n) => n.id === active)) {
      commit(
        liveNodes.filter((n) => n.id !== active),
        liveEdges.filter((e) => e.from !== active && e.to !== active)
      );
      setOffsets((o) => {
        const next = { ...o };
        delete next[active];
        return next;
      });
      pickNode(undefined);
    }
  };
  const renameSelection = () => {
    if (selEdge !== null) beginEdit("edge", String(selEdge));
    else if (active) beginEdit("node", active);
  };
  const finishEdit = (value: string) => {
    if (editDone.current || !editing) return;
    editDone.current = true;
    const text = value.trim();
    if (editing.kind === "node") {
      if (text) commit(liveNodes.map((n) => (n.id === editing.key ? { ...n, label: text } : n)), liveEdges);
    } else {
      const idx = Number(editing.key);
      commit(liveNodes, liveEdges.map((e, i) => (i === idx ? { ...e, label: text || undefined } : e)));
    }
    setEditing(null);
  };
  const resetDiagram = () => {
    commit(nodes, edges);
    setOffsets({});
    setSelEdge(null);
    setConnectMode(false);
    setConnectFrom(null);
    setEditing(null);
    pickNode(defaultActiveNode);
  };
  const toggleConnect = () => {
    setConnectMode((m) => !m);
    setConnectFrom(null);
  };

  // Ctrl/⌘ + scroll zooms (needs a non-passive listener to stop the page from scrolling).
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !zoomable) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      setZoomState((z) => Math.min(2.5, Math.max(0.5, Math.round(z * (e.deltaY < 0 ? 1.1 : 0.9) * 100) / 100)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomable]);

  const select = (n: FlowNodeData) => {
    if (drag.current?.moved) return; // this click ended a drag
    if (editable && connectMode) {
      if (!connectFrom) {
        setConnectFrom(n.id);
        pickNode(n.id);
      } else if (connectFrom !== n.id) {
        if (!liveEdges.some((e) => e.from === connectFrom && e.to === n.id)) commit(liveNodes, [...liveEdges, { from: connectFrom, to: n.id }]);
        setConnectFrom(null);
        setConnectMode(false);
        pickNode(n.id);
      }
      return;
    }
    if (!interactive && !editable) return;
    setSelEdge(null);
    if (!controlled) setInternalActive(n.id);
    onNodeClick?.(n);
  };

  // ---- node appearance --------------------------------------------------------------------------------------
  const nodeLook = (n: FlowNodeData, hot: boolean) => {
    const accentTone = n.tone === "accent";
    const muted = n.tone === "muted";
    let fill = "var(--color-surface)";
    let stroke = "var(--color-border-strong)";
    let text = "var(--color-fg)";
    let sub = "var(--color-fg-subtle)";
    let strokeW = 1.5;
    let dash: string | undefined;
    let filter: string | undefined;

    switch (variant) {
      case "solid":
        fill = muted ? "var(--color-fg-muted)" : hot ? `color-mix(in srgb, ${pal.strong} 78%, black)` : pal.strong;
        stroke = fill;
        text = muted ? "var(--color-surface)" : "#fff";
        sub = muted ? "var(--color-surface)" : "rgba(255,255,255,.75)";
        break;
      case "outline":
        fill = accentTone || hot ? wash(pal.base, 16) : "transparent";
        stroke = accentTone || hot ? pal.base : "var(--color-border-strong)";
        strokeW = 1.8;
        if (muted) stroke = "var(--color-border)";
        break;
      case "glow":
        fill = `color-mix(in srgb, var(--color-surface) 88%, ${pal.base})`;
        stroke = accentTone || hot ? pal.base : "var(--color-border-strong)";
        filter = accentTone || hot ? `url(#${uid}-glow)` : undefined;
        break;
      case "blueprint":
        fill = accentTone || hot ? wash(pal.base, 14) : "transparent";
        stroke = accentTone || hot ? pal.base : "var(--color-fg-subtle)";
        dash = hot ? undefined : "5 4";
        strokeW = 1.4;
        break;
      case "minimal":
        fill = "transparent";
        stroke = "transparent";
        break;
      default: // schematic
        if (muted) fill = "var(--color-surface-muted)";
        if (accentTone || hot) {
          fill = pal.strong;
          stroke = pal.strong;
          text = "#fff";
          sub = "rgba(255,255,255,.8)";
        }
    }
    return { fill, stroke, text, sub, strokeW, dash, filter };
  };

  const arrowId = `${uid}-arrow`;
  const arrowActiveId = `${uid}-arrow-on`;

  const toolbarEl = (
    <FlowToolbar
          editable={editable}
          zoomable={zoomable}
          types={nodeTypes}
          typeKey={typeKey}
          onTypeChange={setTypeKey}
          onAdd={addNode}
          connectMode={connectMode}
          connectFrom={connectFrom}
          onToggleConnect={toggleConnect}
          canRename={selEdge !== null || !!active}
          onRename={renameSelection}
          canDelete={selEdge !== null || !!active}
          onDelete={deleteSelection}
          onReset={resetDiagram}
          zoom={zoom}
          onZoom={setZoom}
          vertical={toolbarPosition === "right" && !toolbarTarget}
        />
  );

  return (
    <div
      className={cx("w-full min-w-0 max-w-full", toolbarPosition === "right" && !toolbarTarget && (editable || zoomable) && "flex flex-row-reverse items-start gap-3", className, classNames?.root)}
      onKeyDown={(ev) => {
        if (editing || !editable) return;
        if ((ev.key === "Delete" || ev.key === "Backspace") && !(ev.target instanceof HTMLInputElement || ev.target instanceof HTMLSelectElement)) {
          ev.preventDefault();
          deleteSelection();
        } else if (ev.key === "Escape") {
          setConnectMode(false);
          setConnectFrom(null);
        }
      }}
    >
      {(editable || zoomable) && toolbarTarget !== null && (toolbarTarget ? createPortal(toolbarEl, toolbarTarget) : toolbarEl)}
      <div ref={rootRef} className="w-full min-w-0 flex-1 overflow-auto">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        className={cx("mx-auto block h-auto w-full", classNames?.svg)}
        style={{
          // At 100% the diagram always fits its container (scaling down if needed); zooming in grows it and the container scrolls.
          minWidth: zoom > 1 ? Math.round(layout.width * 0.72 * zoom) : undefined,
          maxWidth: layout.width * 1.4 * zoom,
          width: zoom !== 1 ? `${zoom * 100}%` : undefined,
          cursor: connectMode ? "crosshair" : undefined,
        }}
        fill="none"
        role="img"
        aria-label={label}
      >
        <defs>
          <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id={`${uid}-grid`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" stroke="var(--color-fg)" strokeOpacity="0.07" strokeWidth="1" />
          </pattern>
          <marker id={arrowId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 1 L9 5 L0 9 z" fill="var(--color-border-strong)" />
          </marker>
          <marker id={arrowActiveId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 1 L9 5 L0 9 z" fill={pal.base} />
          </marker>
        </defs>

        {showGrid && <rect width={layout.width} height={layout.height} fill={`url(#${uid}-grid)`} />}
        {variant === "blueprint" &&
          [[6, 6, 1, 1], [layout.width - 6, 6, -1, 1], [6, layout.height - 6, 1, -1], [layout.width - 6, layout.height - 6, -1, -1]].map(([x, y, sx, sy]) => (
            <path key={`${x}${y}`} d={`M${x} ${y + sy * 12} V${y} H${x + sx * 12}`} stroke={pal.base} strokeWidth="1.6" />
          ))}

        {captionTop && (
          <text x={layout.width / 2} y={22} textAnchor="middle" fontSize="10" fill="var(--color-fg-subtle)" fontFamily="ui-monospace, monospace">
            {captionTop}
          </text>
        )}

        {/* wires */}
        {validEdges.map((e, i) => {
          const a = placed.get(e.from)!;
          const b = placed.get(e.to)!;
          const g = edgeGeometry(a, b, dir, curve);
          const edgeIndex = liveEdges.indexOf(e);
          const selected = editable && selEdge === edgeIndex;
          const on = selected || (!!focus && (e.from === focus || e.to === focus));
          const dim = !!focus && !on && selEdge === null;
          const stroke = on ? pal.base : "var(--color-border-strong)";
          const flow = on && animated && !reducedMotion;
          return (
            <g key={`${e.from}-${e.to}-${i}`} style={{ opacity: dim ? 0.3 : 1, transition: "opacity .3s" }}>
              <path
                d={g.d}
                stroke={stroke}
                strokeWidth={variant === "minimal" ? 1.5 : on ? 2.4 : 2}
                strokeLinejoin="round"
                strokeDasharray={variant === "blueprint" ? "5 5" : flow ? "6 6" : undefined}
                filter={variant === "glow" && on ? `url(#${uid}-glow)` : undefined}
                markerEnd={arrows ? `url(#${on ? arrowActiveId : arrowId})` : undefined}
                style={{ transition: "stroke .3s, stroke-width .3s" }}
              >
                {flow && <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.2s" repeatCount="indefinite" />}
              </path>
              {packets && !reducedMotion && (
                <circle r={on ? 4.5 : 3.5} fill={on ? pal.base : pal.light} opacity={on || !focus ? 1 : 0.5}>
                  <animateMotion dur={`${speed}s`} begin={`${(i % 6) * 0.35}s`} repeatCount="indefinite" path={g.d} />
                </circle>
              )}
              {editable && (
                <path
                  d={g.d}
                  stroke="transparent"
                  strokeWidth="16"
                  fill="none"
                  tabIndex={0}
                  role="button"
                  aria-label={`Wire ${e.from} to ${e.to}`}
                  style={{ cursor: "pointer", outline: "none" }}
                  onClick={() => {
                    setSelEdge(edgeIndex);
                    pickNode(undefined);
                  }}
                  onDoubleClick={() => beginEdit("edge", String(edgeIndex))}
                />
              )}
              {e.label && (
                <g transform={`translate(${g.mid.x} ${g.mid.y})`}>
                  <rect x={-(e.label.length * 3 + 8)} y="-9" width={e.label.length * 6 + 16} height="18" rx="9" fill="var(--color-surface)" stroke="var(--color-border)" />
                  <text y="3.5" textAnchor="middle" fontSize="10" fill="var(--color-fg-muted)" fontFamily={font}>
                    {e.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* nodes */}
        {[...placed.values()].map(({ node: n, x, y, w, h }) => {
          const isActive = n.id === active;
          const hot = (interactive || movable) && (n.id === hovered || isActive || n.id === connectFrom);
          const look = nodeLook(n, hot);
          const dim = !!focus && !connected.has(n.id);
          const Icon = getIcon(n.icon);
          const cx0 = x + w / 2;
          const cy0 = y + h / 2;
          const outline = shapePath(n.shape, x, y, w, h);
          const rimY = y + 8;
          const hasSub = !!n.sublabel;
          const iconSize = 15;
          return (
            <g
              key={n.id}
              role={interactive || movable ? "button" : undefined}
              tabIndex={interactive || movable ? 0 : undefined}
              aria-pressed={interactive ? isActive : undefined}
              aria-label={n.label}
              style={{
                cursor: movable ? (draggingId === n.id ? "grabbing" : "grab") : interactive ? "pointer" : "default",
                opacity: dim ? 0.45 : 1,
                transition: "opacity .3s",
                outline: "none",
                touchAction: movable ? "none" : undefined,
              }}
              onClick={() => select(n)}
              onDoubleClick={() => editable && beginEdit("node", n.id)}
              onPointerDown={(ev) => onPointerDown(ev, n.id)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onKeyDown={(ev) => {
                const arrow = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[ev.key];
                if (movable && arrow) {
                  ev.preventDefault();
                  const step = ev.shiftKey ? 24 : 8;
                  const cur = offsets[n.id] ?? { dx: 0, dy: 0 };
                  moveTo(n.id, cur.dx + arrow[0] * step, cur.dy + arrow[1] * step);
                  return;
                }
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  select(n);
                }
              }}
              onMouseEnter={() => {
                setHovered(n.id);
                onNodeHover?.(n);
              }}
              onMouseLeave={() => {
                setHovered(null);
                onNodeHover?.(null);
              }}
              onFocus={() => setHovered(n.id)}
              onBlur={() => setHovered(null)}
            >
              {isActive && interactive && variant !== "minimal" && (
                <path d={outline} fill="none" stroke={pal.base} strokeOpacity="0.3" strokeWidth="8" strokeLinejoin="round" />
              )}
              <path
                d={outline}
                fill={look.fill}
                stroke={look.stroke}
                strokeWidth={look.strokeW}
                strokeDasharray={look.dash}
                filter={look.filter}
                strokeLinejoin="round"
                style={{ transition: "fill .3s, stroke .3s" }}
              />
              {n.shape === "cylinder" && variant !== "minimal" && (
                <path d={`M${x} ${rimY} A${w / 2} 8 0 0 0 ${x + w} ${rimY}`} fill="none" stroke={look.stroke} strokeWidth={look.strokeW} strokeDasharray={look.dash} style={{ transition: "stroke .3s" }} />
              )}
              {variant === "minimal" && (
                <line x1={x + 6} x2={x + w - 6} y1={y + h - 2} y2={y + h - 2} stroke={hot || n.tone === "accent" ? pal.base : "var(--color-border-strong)"} strokeWidth={hot ? 2.4 : 1.5} strokeLinecap="round" style={{ transition: "stroke .3s" }} />
              )}
              {Icon && (
                <Icon
                  x={cx0 - iconSize / 2}
                  y={hasSub ? cy0 - 22 : cy0 - 21}
                  width={iconSize}
                  height={iconSize}
                  stroke={look.text}
                  strokeWidth={2}
                  style={{ display: h >= 56 ? undefined : "none" }}
                />
              )}
              <text
                x={cx0}
                y={cy0 + (n.shape === "cylinder" ? 5 : 0) + (Icon && h >= 56 ? (hasSub ? 2 : 6) : hasSub ? -2 : 5)}
                textAnchor="middle"
                fontSize={n.shape === "circle" ? 11 : 13}
                fontWeight={600}
                fill={look.text}
                fontFamily={font}
                style={{ transition: "fill .3s" }}
              >
                {n.label}
              </text>
              {hasSub && (
                <text x={cx0} y={cy0 + (Icon && h >= 56 ? 16 : 14)} textAnchor="middle" fontSize="10" fill={look.sub} fontFamily={font} style={{ transition: "fill .3s" }}>
                  {n.sublabel}
                </text>
              )}
            </g>
          );
        })}

        {editing && (() => {
          const isNode = editing.kind === "node";
          const p = isNode ? placed.get(editing.key) : undefined;
          const edge = isNode ? undefined : liveEdges[Number(editing.key)];
          const ea = edge ? placed.get(edge.from) : undefined;
          const eb = edge ? placed.get(edge.to) : undefined;
          if (isNode && !p) return null;
          if (!isNode && !(edge && ea && eb)) return null;
          const mid = !isNode ? edgeGeometry(ea!, eb!, dir, curve).mid : { x: 0, y: 0 };
          const box = isNode ? { x: p!.x, y: p!.y + p!.h / 2 - 16, w: p!.w, h: 32 } : { x: mid.x - 60, y: mid.y - 14, w: 120, h: 28 };
          const initial = isNode ? p!.node.label : edge!.label ?? "";
          return (
            <foreignObject x={box.x} y={box.y} width={box.w} height={box.h}>
              <input
                autoFocus
                defaultValue={initial}
                aria-label="Label"
                onFocus={(ev) => ev.currentTarget.select()}
                onPointerDown={(ev) => ev.stopPropagation()}
                onClick={(ev) => ev.stopPropagation()}
                onDoubleClick={(ev) => ev.stopPropagation()}
                onKeyDown={(ev) => {
                  ev.stopPropagation();
                  if (ev.key === "Enter") finishEdit(ev.currentTarget.value);
                  else if (ev.key === "Escape") {
                    editDone.current = true;
                    setEditing(null);
                  }
                }}
                onBlur={(ev) => finishEdit(ev.currentTarget.value)}
                style={{
                  width: "100%",
                  height: "100%",
                  boxSizing: "border-box",
                  border: "2px solid " + pal.base,
                  borderRadius: 8,
                  padding: "0 8px",
                  font: "600 13px system-ui, sans-serif",
                  textAlign: "center",
                  color: "var(--color-fg)",
                  background: "var(--color-surface)",
                  outline: "none",
                }}
              />
            </foreignObject>
          );
        })()}

        {captionBottom && (
          <text x={layout.width / 2} y={layout.height - 16} textAnchor="middle" fontSize="10" fill="var(--color-fg-subtle)" fontFamily="ui-monospace, monospace">
            {captionBottom}
          </text>
        )}
      </svg>
      </div>
    </div>
  );
}
