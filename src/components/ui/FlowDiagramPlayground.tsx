import { useState } from "react";
import { FlowDiagram, type FlowCurve, type FlowVariant } from "./FlowDiagram/FlowDiagram";
import { SAMPLE_NAMES, sampleByName } from "./FlowDiagram/samples";
import { ColorSwatches, OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { ColorName } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";

const VARIANTS: FlowVariant[] = ["schematic", "blueprint", "minimal", "solid", "outline", "glow"];
const CURVES: FlowCurve[] = ["smooth", "step", "straight"];
const DIRECTIONS = ["auto", "horizontal", "vertical"] as const;
const SPEEDS = ["slow", "normal", "fast"] as const;
const SPEED_VALUE = { slow: 3.6, normal: 2.2, fast: 1.1 };

const Check = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    {label}
  </label>
);

export default function FlowDiagramPlayground() {
  const [sampleName, setSampleName] = useState(SAMPLE_NAMES[0]);
  const [variant, setVariant] = useState<FlowVariant>("schematic");
  const [curve, setCurve] = useState<FlowCurve>("smooth");
  const [direction, setDirection] = useState<(typeof DIRECTIONS)[number]>("auto");
  const [color, setColor] = useState<ColorName>("accent");
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>("normal");
  const [packets, setPackets] = useState(true);
  const [animated, setAnimated] = useState(true);
  const [arrows, setArrows] = useState(false);
  const [interactive, setInteractive] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [grid, setGrid] = useState(false);
  const [movable, setMovable] = useState(true);
  const [editable, setEditable] = useState(true);
  const [zoomable, setZoomable] = useState(false);
  // The tools live in the controls pane (right) — a callback ref hands their container to the diagram.
  const [toolsEl, setToolsEl] = useState<HTMLDivElement | null>(null);
  const [resets, setResets] = useState(0);

  const s = sampleByName(sampleName);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[360px] items-start justify-start p-3">
        <FlowDiagram
          key={`${sampleName}-${resets}`}
          nodes={s.nodes}
          edges={s.edges}
          variant={variant}
          curve={curve}
          direction={direction}
          color={color}
          packets={packets}
          animated={animated}
          arrows={arrows}
          interactive={interactive}
          movable={movable}
          editable={editable}
          zoomable={zoomable}
          toolbarTarget={editable || zoomable ? toolsEl : undefined}
          autoPlay={autoPlay ? 1500 : false}
          grid={grid || undefined}
          speed={SPEED_VALUE[speed]}
          captionTop={s.captionTop}
          captionBottom={s.captionBottom}
        />
      </AppWindowBody>
    </AppWindowFrame>
  );

  // Only non-default values are written out.
  const props: [string, string, string][] = [
    variant !== "schematic" ? ["variant", variant, `variant="${variant}"`] : null,
    curve !== "smooth" ? ["curve", curve, `curve="${curve}"`] : null,
    direction !== "horizontal" ? ["direction", direction, `direction="${direction}"`] : null,
    color !== "accent" ? ["color", color, `color="${color}"`] : null,
    !packets ? ["packets", "false", "packets={false}"] : null,
    !animated ? ["animated", "false", "animated={false}"] : null,
    arrows ? ["arrows", "", "arrows"] : null,
    !interactive ? ["interactive", "false", "interactive={false}"] : null,
    autoPlay ? ["autoPlay", "1500", "autoPlay={1500}"] : null,
    grid ? ["grid", "", "grid"] : null,
    editable ? ["editable", "", "editable"] : movable ? ["movable", "", "movable"] : null,
    zoomable && !editable ? ["zoomable", "", "zoomable"] : null,
    speed !== "normal" ? ["speed", String(SPEED_VALUE[speed]), `speed={${SPEED_VALUE[speed]}}`] : null,
  ].filter((x): x is [string, string, string] => x !== null);

  const jsx = props.map((p) => `  ${p[2]}`).join("\n");
  const caps = `${s.captionTop ? `\n  captionTop="${s.captionTop}"` : ""}${s.captionBottom ? `\n  captionBottom="${s.captionBottom}"` : ""}`;
  const kebab = (n: string) => n.replace(/([A-Z])/g, "-$1").toLowerCase();
  const htmlAttrs = props.map(([n, v]) => (v === "" ? ` ${kebab(n)}="true"` : ` ${kebab(n)}="${v}"`)).join("") +
    `${s.captionTop ? ` caption-top="${s.captionTop}"` : ""}${s.captionBottom ? ` caption-bottom="${s.captionBottom}"` : ""}`;
  const indent = (t: string, n: number) => t.replace(/\n/g, "\n" + " ".repeat(n));

  const codeVariants: CodeBlockVariants = {
    react: `const nodes = ${s.nodesCode};

const edges = ${s.edgesCode};

<FlowDiagram
  nodes={nodes}
  edges={edges}${jsx ? "\n" + jsx : ""}${caps}${editable ? "\n  onDiagramChange={({ nodes, edges }) => save(nodes, edges)}" : ""}
/>`,
    js: `<l-flow-diagram id="flow"${htmlAttrs}></l-flow-diagram>

<script type="module">
  import "lojee-ui/elements";

  const flow = document.getElementById("flow");
  flow.nodes = ${indent(s.nodesCode, 2)};
  flow.edges = ${indent(s.edgesCode, 2)};${editable ? '\n  flow.addEventListener("diagramchange", (e) => save(e.detail.nodes, e.detail.edges));' : ""}
</script>`,
    vue: `<template>
  <l-flow-diagram :nodes="nodes" :edges="edges"${htmlAttrs} />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const nodes = ${s.nodesCode};

const edges = ${s.edgesCode};
</script>`,
    angular: `<l-flow-diagram [nodes]="nodes" [edges]="edges"${htmlAttrs}></l-flow-diagram>

nodes = ${s.nodesCode};

edges = ${s.edgesCode};`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      {(editable || zoomable) && (
        <div className="sm:col-span-2">
          <p className="mb-1 text-xs font-medium text-fg-subtle">Diagram tools</p>
          <p className="mb-2 text-[11px] leading-snug text-fg-subtle">These tools modify the diagram in the preview: add an element of any shape, connect two elements, rename or delete the selected one, and zoom.</p>
          <div ref={setToolsEl} className="rounded-lg border border-dashed border-border p-2" />
        </div>
      )}
      <OptionGroup label="Diagram" options={SAMPLE_NAMES} value={sampleName} onChange={setSampleName} />
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="Wires" options={CURVES} value={curve} onChange={setCurve} />
      <OptionGroup label="Direction" options={DIRECTIONS} value={direction} onChange={setDirection} />
      <ColorSwatches value={color} onChange={setColor} />
      <OptionGroup label="Packet speed" options={SPEEDS} value={speed} onChange={setSpeed} />
      <Check label="Packets" checked={packets} onChange={setPackets} />
      <Check label="Animated wires" checked={animated} onChange={setAnimated} />
      <Check label="Arrows" checked={arrows} onChange={setArrows} />
      <Check label="Interactive (hover / click)" checked={interactive} onChange={setInteractive} />
      <Check label="Auto-play walkthrough" checked={autoPlay} onChange={setAutoPlay} />
      <Check label="Grid background" checked={grid} onChange={setGrid} />
      <Check label="Draggable nodes" checked={movable || editable} onChange={setMovable} />
      <Check label="Editor (add, connect, rename, delete)" checked={editable} onChange={setEditable} />
      <Check label="Zoom controls" checked={zoomable || editable} onChange={setZoomable} />
      {(movable || editable) && (
        <button
          type="button"
          onClick={() => setResets((r) => r + 1)}
          className="w-fit rounded-md border border-border px-2.5 py-1 text-xs font-medium text-fg-muted transition-colors hover:bg-surface-muted hover:text-fg"
        >
          Reset positions
        </button>
      )}
    </PlaygroundLayout>
  );
}
