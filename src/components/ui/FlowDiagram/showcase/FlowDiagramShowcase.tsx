import { useState, type ReactNode } from "react";
import { FlowDiagram, type FlowEdge, type FlowNode, type FlowVariant } from "../FlowDiagram";
import { AUTH_FLOW, DATA_FLOW, FRAMEWORK_FLOW, PIPELINE_FLOW, SAMPLES, TREE_FLOW, type FlowSample } from "../samples";
import CodeBlock, { type CodeBlockVariants } from "../../CodeBlock";
import { Button } from "../../Buttons/Button";
import { Badge } from "../../Badge/Badge";
import { SectionLabel } from "../../ShowcaseHelpers";

const indent = (s: string, n: number) => s.replace(/\n/g, "\n" + " ".repeat(n));

// The same diagram in every language. `attrs` is the extra attribute text (without leading space).
function codeFor(s: FlowSample, attrs = ""): CodeBlockVariants {
  const a = attrs ? `\n  ${attrs}` : "";
  const captions = `${s.captionTop ? ` captionTop="${s.captionTop}"` : ""}${s.captionBottom ? ` captionBottom="${s.captionBottom}"` : ""}`;
  const capAttr = `${s.captionTop ? ` caption-top="${s.captionTop}"` : ""}${s.captionBottom ? ` caption-bottom="${s.captionBottom}"` : ""}`;
  const htmlAttrs = attrs.replace(/(\w)([A-Z])/g, (_, x, y) => `${x}-${y.toLowerCase()}`).replace(/=\{([^}]*)\}/g, '="$1"');
  const html = `${htmlAttrs ? " " + htmlAttrs : ""}${capAttr}`;
  return {
    react: `const nodes = ${s.nodesCode};

const edges = ${s.edgesCode};

<FlowDiagram
  nodes={nodes}
  edges={edges}${a}${captions ? `\n ${captions}` : ""}
/>`,
    js: `<l-flow-diagram id="flow"${html}></l-flow-diagram>

<script type="module">
  import "lojee-ui/elements";

  const flow = document.getElementById("flow");
  flow.nodes = ${indent(s.nodesCode, 2)};
  flow.edges = ${indent(s.edgesCode, 2)};
  flow.addEventListener("nodeclick", (e) => console.log(e.detail.id));
</script>`,
    vue: `<template>
  <l-flow-diagram :nodes="nodes" :edges="edges"${html} @nodeclick="(e: CustomEvent) => console.log(e.detail.id)" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const nodes = ${s.nodesCode};

const edges = ${s.edgesCode};
</script>`,
    angular: `<l-flow-diagram [nodes]="nodes" [edges]="edges"${html} (nodeclick)="onNode($event.detail)"></l-flow-diagram>

nodes = ${s.nodesCode};

edges = ${s.edgesCode};`,
  };
}

function Frame({ children, title, className = "" }: { children: ReactNode; title?: string; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-surface p-3 ${className}`}>
      {title && <p className="mb-1 px-1 font-mono text-[11px] uppercase tracking-wide text-fg-subtle">{title}</p>}
      {children}
    </div>
  );
}

const SHAPE_NODES: FlowNode[] = [
  { id: "rect", label: "Rectangle", shape: "rect", icon: "box" },
  { id: "pill", label: "Rounded", shape: "pill", tone: "accent" },
  { id: "circle", label: "Circle", shape: "circle" },
  { id: "diamond", label: "Diamond", shape: "diamond" },
  { id: "hexagon", label: "Hexagon", shape: "hexagon", layer: 1 },
  { id: "parallelogram", label: "Data", sublabel: "parallelogram", shape: "parallelogram", layer: 1 },
  { id: "cylinder", label: "Database", shape: "cylinder", layer: 1, tone: "muted" },
];
const SHAPE_EDGES: FlowEdge[] = [
  { from: "rect", to: "hexagon" },
  { from: "circle", to: "parallelogram" },
  { from: "diamond", to: "cylinder" },
];
const SHAPE_CODE = SHAPE_NODES.map((n) => `  ${JSON.stringify(n).replace(/"(\w+)":/g, "$1: ").replace(/,/g, ", ").replace(/^\{/, "{ ").replace(/\}$/, " }")},`).join("\n");

const VARIANTS: FlowVariant[] = ["schematic", "blueprint", "minimal", "solid", "outline", "glow"];

// ---- Live-editable diagram ----------------------------------------------------------------------------------
function DynamicDemo() {
  const [nodes, setNodes] = useState<FlowNode[]>([
    { id: "n1", label: "Start", shape: "pill", tone: "accent" },
    { id: "n2", label: "Step 2" },
  ]);
  const [edges, setEdges] = useState<FlowEdge[]>([{ from: "n1", to: "n2" }]);
  const [active, setActive] = useState("n2");
  const [counter, setCounter] = useState(3);

  const add = () => {
    const id = `n${counter}`;
    setNodes((ns) => [...ns, { id, label: `Step ${counter}` }]);
    setEdges((es) => [...es, { from: active, to: id }]);
    setActive(id);
    setCounter((c) => c + 1);
  };
  const remove = () => {
    if (nodes.length <= 1 || active === "n1") return;
    setNodes((ns) => ns.filter((n) => n.id !== active));
    setEdges((es) => es.filter((e) => e.from !== active && e.to !== active));
    setActive("n1");
  };
  const branch = () => {
    // a second child of the selected node makes the layer wider — the layout adapts.
    add();
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" icon="plus" label="Add after selected" onClick={add} />
        <Button size="sm" variant="outline" icon="git-branch" label="Add branch" onClick={branch} />
        <Button size="sm" variant="outline" color="rose" icon="trash-2" label="Remove selected" onClick={remove} disabled={active === "n1"} />
        <Badge variant="soft" label={`${nodes.length} nodes · ${edges.length} wires`} />
      </div>
      <Frame>
        <FlowDiagram nodes={nodes} edges={edges} activeNode={active} onNodeClick={(n) => setActive(n.id)} curve="smooth" />
      </Frame>
    </div>
  );
}

function ControlledDemo() {
  const [active, setActive] = useState<string | undefined>("worker");
  const node = DATA_FLOW.nodes.find((n) => n.id === active);
  return (
    <div className="space-y-3">
      <Frame>
        <FlowDiagram nodes={DATA_FLOW.nodes} edges={DATA_FLOW.edges} activeNode={active} onNodeClick={(n) => setActive(n.id)} />
      </Frame>
      <p className="text-sm text-fg-subtle">
        Selected: <span className="font-medium text-fg">{node?.label ?? "none"}</span> — connected wires are highlighted and everything else fades.
      </p>
    </div>
  );
}

function EditorDemo() {
  const [counts, setCounts] = useState({ nodes: PIPELINE_FLOW.nodes.length, edges: PIPELINE_FLOW.edges.length });
  return (
    <div className="space-y-3">
      <Frame>
        <FlowDiagram
          nodes={PIPELINE_FLOW.nodes}
          edges={PIPELINE_FLOW.edges}
          editable
          arrows
          nodeWidth={112}
          gap={80}
          onDiagramChange={(d) => setCounts({ nodes: d.nodes.length, edges: d.edges.length })}
        />
      </Frame>
      <p className="font-mono text-xs text-fg-subtle">
        {counts.nodes} elements · {counts.edges} wires — try: choose a type and press Add, Connect two elements, double-click a label, Ctrl/⌘ + scroll to zoom.
      </p>
    </div>
  );
}

function MovableDemo() {
  const [last, setLast] = useState<{ id: string; x: number; y: number } | null>(null);
  const [resets, setResets] = useState(0);
  return (
    <div className="space-y-3">
      <Frame>
        <FlowDiagram key={resets} nodes={AUTH_FLOW.nodes} edges={AUTH_FLOW.edges} movable arrows variant="blueprint" onNodeMove={setLast} nodeWidth={112} gap={78} />
      </Frame>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm" variant="outline" icon="refresh-cw" label="Reset positions" onClick={() => setResets((r) => r + 1)} />
        <span className="font-mono text-xs text-fg-subtle">{last ? `${last.id}: x ${last.x}, y ${last.y}` : "drag any node"}</span>
      </div>
    </div>
  );
}

export default function FlowDiagramShowcase() {
  return (
    <div>
      <div className="space-y-14">
        <header>
          <h1 className="text-2xl font-semibold text-fg">Flow Diagram</h1>
          <p className="mt-1 text-sm text-fg-subtle">
            A data-driven SVG diagram. Give it <code className="font-mono text-fg">nodes</code> and <code className="font-mono text-fg">edges</code> and it lays itself out in layers, draws animated wires,
            highlights connections on hover and reports clicks. Six visual variants, three wire styles, two directions.
          </p>
        </header>

        <section>
          <SectionLabel sub="Nodes are placed in layers derived from the edges — add or remove data and the layout follows. Hover a node to follow its wires; click to select it.">Basic</SectionLabel>
          <Frame>
            <FlowDiagram direction="auto" nodes={FRAMEWORK_FLOW.nodes} edges={FRAMEWORK_FLOW.edges} captionTop={FRAMEWORK_FLOW.captionTop} captionBottom={FRAMEWORK_FLOW.captionBottom} defaultActiveNode="element" />
          </Frame>
          <CodeBlock variants={codeFor(FRAMEWORK_FLOW, 'direction="auto"\n  defaultActiveNode="element"')} />
        </section>

        <section>
          <SectionLabel sub={'variant="schematic" (default), "blueprint", "minimal", "solid", "outline" or "glow".'}>Variants</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2">
            {VARIANTS.map((v) => (
              <Frame key={v} title={v} className={v === "glow" ? "bg-surface-muted" : ""}>
                <FlowDiagram nodes={PIPELINE_FLOW.nodes} edges={PIPELINE_FLOW.edges} variant={v} nodeWidth={104} gap={64} nodeHeight={48} defaultActiveNode="test" />
              </Frame>
            ))}
          </div>
          <CodeBlock variants={codeFor(PIPELINE_FLOW, 'variant="blueprint"')} />
        </section>

        <section>
          <SectionLabel sub={'curve="smooth" (default), "step" for right angles, or "straight".'}>Wire styles</SectionLabel>
          <div className="grid gap-4 md:grid-cols-3">
            {(["smooth", "step", "straight"] as const).map((c) => (
              <Frame key={c} title={c}>
                <FlowDiagram nodes={AUTH_FLOW.nodes} edges={AUTH_FLOW.edges} curve={c} nodeWidth={92} nodeHeight={44} gap={52} spacing={14} label={`${c} wires`} />
              </Frame>
            ))}
          </div>
          <CodeBlock variants={codeFor(AUTH_FLOW, 'curve="step"')} />
        </section>

        <section>
          <SectionLabel sub={'direction="vertical" flows top to bottom — ideal for trees, funnels and decision flows. Edge labels sit on the wire.'}>Direction</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2">
            <Frame title="horizontal">
              <FlowDiagram nodes={AUTH_FLOW.nodes} edges={AUTH_FLOW.edges} arrows nodeWidth={104} gap={70} />
            </Frame>
            <Frame title="vertical">
              <FlowDiagram nodes={TREE_FLOW.nodes} edges={TREE_FLOW.edges} direction="vertical" curve="step" arrows nodeWidth={118} nodeHeight={44} gap={54} spacing={26} />
            </Frame>
          </div>
          <CodeBlock variants={codeFor(TREE_FLOW, 'direction="vertical"\n  curve="step"\n  arrows')} />
        </section>

        <section>
          <SectionLabel sub={'Per node: shape="rect" | "pill" | "circle" | "diamond" | "hexagon" | "parallelogram" | "cylinder", tone="default" | "accent" | "muted", an icon and a sublabel.'}>Shapes and tones</SectionLabel>
          <Frame>
            <FlowDiagram
              direction="vertical"
              nodes={SHAPE_NODES}
              edges={SHAPE_EDGES}
              nodeWidth={120}
              gap={46}
              spacing={18}
              label="All node shapes"
            />
          </Frame>
          <CodeBlock
            variants={{
              react: `<FlowDiagram
  direction="vertical"
  nodes={[
${SHAPE_CODE}
  ]}
  edges={[{ from: "rect", to: "hexagon" }, { from: "circle", to: "parallelogram" }, { from: "diamond", to: "cylinder" }]}
/>`,
              js: `<l-flow-diagram id="shapes" direction="vertical"></l-flow-diagram>

<script type="module">
  import "lojee-ui/elements";

  const el = document.getElementById("shapes");
  el.nodes = [
${SHAPE_CODE}
  ];
  el.edges = [{ from: "rect", to: "hexagon" }, { from: "circle", to: "parallelogram" }, { from: "diamond", to: "cylinder" }];
</script>`,
              vue: `<template>
  <l-flow-diagram direction="vertical" :nodes="nodes" :edges="edges" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const nodes = [
${SHAPE_CODE}
];
const edges = [{ from: "rect", to: "hexagon" }, { from: "circle", to: "parallelogram" }, { from: "diamond", to: "cylinder" }];
</script>`,
              angular: `<l-flow-diagram direction="vertical" [nodes]="nodes" [edges]="edges"></l-flow-diagram>

nodes = [
${SHAPE_CODE}
];
edges = [{ from: "rect", to: "hexagon" }, { from: "circle", to: "parallelogram" }, { from: "diamond", to: "cylinder" }];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="color takes a built-in color name (or any CSS color) and defaults to the theme accent.">Colors</SectionLabel>
          <div className="grid gap-4 md:grid-cols-3">
            {(["emerald", "rose", "violet"] as const).map((c) => (
              <Frame key={c} title={c}>
                <FlowDiagram nodes={PIPELINE_FLOW.nodes} edges={PIPELINE_FLOW.edges} color={c} variant="outline" nodeWidth={84} nodeHeight={44} gap={40} spacing={12} defaultActiveNode="build" />
              </Frame>
            ))}
          </div>
          <CodeBlock variants={codeFor(PIPELINE_FLOW, 'color="emerald"\n  variant="outline"')} />
        </section>

        <section>
          <SectionLabel sub="Control the selected node and react to clicks — the connected wires light up and the rest fades.">Interactive and controlled</SectionLabel>
          <ControlledDemo />
          <CodeBlock
            variants={{
              react: `const [active, setActive] = useState("worker");

<FlowDiagram
  nodes={nodes}
  edges={edges}
  activeNode={active}
  onNodeClick={(node) => setActive(node.id)}
  onNodeHover={(node) => console.log(node?.label)}
/>`,
              js: `const flow = document.getElementById("flow");
flow.activeNode = "worker";
flow.addEventListener("nodeclick", (e) => (flow.activeNode = e.detail.id));
flow.addEventListener("nodehover", (e) => console.log(e.detail?.label));`,
              vue: `<l-flow-diagram
  :nodes="nodes"
  :edges="edges"
  :activeNode="active"
  @nodeclick="(e: CustomEvent) => (active = e.detail.id)"
/>`,
              angular: `<l-flow-diagram
  [nodes]="nodes"
  [edges]="edges"
  [activeNode]="active"
  (nodeclick)="active = $event.detail.id"
></l-flow-diagram>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="autoPlay walks through the nodes in order — great for explaining a flow. It pauses while you hover.">Auto-play walkthrough</SectionLabel>
          <Frame>
            <FlowDiagram nodes={DATA_FLOW.nodes} edges={DATA_FLOW.edges} autoPlay={1400} variant="glow" className="rounded-lg bg-surface-muted" />
          </Frame>
          <CodeBlock variants={codeFor(DATA_FLOW, 'variant="glow"\n  autoPlay={1400}')} />
        </section>

        <section>
          <SectionLabel sub="packets, animated and speed control the motion. Everything stops for visitors who prefer reduced motion.">Motion</SectionLabel>
          <div className="grid gap-4 md:grid-cols-3">
            <Frame title="default">
              <FlowDiagram nodes={PIPELINE_FLOW.nodes} edges={PIPELINE_FLOW.edges} nodeWidth={84} nodeHeight={44} gap={40} spacing={12} defaultActiveNode="build" />
            </Frame>
            <Frame title="speed={0.9}">
              <FlowDiagram nodes={PIPELINE_FLOW.nodes} edges={PIPELINE_FLOW.edges} speed={0.9} nodeWidth={84} nodeHeight={44} gap={40} spacing={12} defaultActiveNode="build" />
            </Frame>
            <Frame title="packets={false}">
              <FlowDiagram nodes={PIPELINE_FLOW.nodes} edges={PIPELINE_FLOW.edges} packets={false} animated={false} nodeWidth={84} nodeHeight={44} gap={40} spacing={12} defaultActiveNode="build" />
            </Frame>
          </div>
          <CodeBlock variants={codeFor(PIPELINE_FLOW, 'speed={0.9}\n  packets={false}\n  animated={false}')} />
        </section>

        <section>
          <SectionLabel sub="editable turns the diagram into a small editor. Pick an element type and Add it (it is connected to the selected element), use Connect to wire two elements together, double-click — or Rename — to edit a label (wires too), select and Delete to remove, and Reset to start over. zoomable adds the − / % / + controls; Ctrl/⌘ + scroll zooms too.">Editor and zoom</SectionLabel>
          <EditorDemo />
          <CodeBlock
            variants={{
              react: `<FlowDiagram
  nodes={nodes}
  edges={edges}
  editable                       // toolbar: Add, Connect, Rename, Delete, Reset + zoom
  nodeTypes={[                   // optional — the element types to choose from
    { key: "step", label: "Step", shape: "rect", icon: "box" },
    { key: "gate", label: "Gate", shape: "circle" },
  ]}
  onDiagramChange={({ nodes, edges }) => save(nodes, edges)}
/>

// Zoom controls without the editor
<FlowDiagram nodes={nodes} edges={edges} zoomable />`,
              js: `<l-flow-diagram id="flow" editable="true"></l-flow-diagram>

<script type="module">
  import "lojee-ui/elements";

  const flow = document.getElementById("flow");
  flow.nodes = nodes;
  flow.edges = edges;
  flow.nodeTypes = [{ key: "step", label: "Step", shape: "rect", icon: "box" }]; // optional
  flow.addEventListener("diagramchange", (e) => save(e.detail.nodes, e.detail.edges));
</script>`,
              vue: `<l-flow-diagram
  :nodes="nodes"
  :edges="edges"
  editable="true"
  @diagramchange="(e: CustomEvent) => save(e.detail.nodes, e.detail.edges)"
/>`,
              angular: `<l-flow-diagram
  [nodes]="nodes"
  [edges]="edges"
  editable="true"
  (diagramchange)="save($event.detail.nodes, $event.detail.edges)"
></l-flow-diagram>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="movable lets you drag nodes with the mouse or touch (or nudge the focused node with the arrow keys — hold Shift for bigger steps). The wires follow, nodes stay inside the diagram, and onNodeMove reports every position.">Draggable nodes</SectionLabel>
          <MovableDemo />
          <CodeBlock
            variants={{
              react: `<FlowDiagram
  nodes={nodes}
  edges={edges}
  movable
  onNodeMove={({ id, x, y }) => console.log(id, x, y)}
/>`,
              js: `<l-flow-diagram id="flow" movable="true"></l-flow-diagram>

<script type="module">
  import "lojee-ui/elements";

  const flow = document.getElementById("flow");
  flow.nodes = nodes;
  flow.edges = edges;
  flow.addEventListener("nodemove", (e) => {
    const { id, x, y } = e.detail;
    console.log(id, x, y);
  });
</script>`,
              vue: `<l-flow-diagram
  :nodes="nodes"
  :edges="edges"
  movable="true"
  @nodemove="(e: CustomEvent) => console.log(e.detail)"
/>`,
              angular: `<l-flow-diagram
  [nodes]="nodes"
  [edges]="edges"
  movable="true"
  (nodemove)="onMove($event.detail)"
></l-flow-diagram>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Because the data is just arrays, the diagram can change at runtime — the layout re-flows as nodes and wires come and go.">Dynamic data</SectionLabel>
          <DynamicDemo />
          <CodeBlock
            variants={{
              react: `const [nodes, setNodes] = useState([{ id: "n1", label: "Start" }]);
const [edges, setEdges] = useState([]);

const add = (from) => {
  const id = "n" + (nodes.length + 1);
  setNodes([...nodes, { id, label: "Step " + (nodes.length + 1) }]);
  setEdges([...edges, { from, to: id }]);
};

<FlowDiagram nodes={nodes} edges={edges} />`,
              js: `const flow = document.getElementById("flow");
const nodes = [{ id: "n1", label: "Start" }];
const edges = [];

function add(from) {
  const id = "n" + (nodes.length + 1);
  nodes.push({ id, label: "Step " + nodes.length });
  edges.push({ from, to: id });
  // assign new array copies so the element re-renders
  flow.nodes = [...nodes];
  flow.edges = [...edges];
}`,
              vue: `<script setup lang="ts">
import { ref } from "vue";

const nodes = ref([{ id: "n1", label: "Start" }]);
const edges = ref<{ from: string; to: string }[]>([]);

function add(from: string) {
  const id = "n" + (nodes.value.length + 1);
  nodes.value = [...nodes.value, { id, label: "Step " + nodes.value.length }];
  edges.value = [...edges.value, { from, to: id }];
}
</script>

<template>
  <l-flow-diagram :nodes="nodes" :edges="edges" />
</template>`,
              angular: `nodes = [{ id: "n1", label: "Start" }];
edges: { from: string; to: string }[] = [];

add(from: string) {
  const id = "n" + (this.nodes.length + 1);
  this.nodes = [...this.nodes, { id, label: "Step " + this.nodes.length }];
  this.edges = [...this.edges, { from, to: id }];
}

// <l-flow-diagram [nodes]="nodes" [edges]="edges"></l-flow-diagram>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Ready-made shapes for common diagrams — copy the data and swap in your own.">Templates</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2">
            {SAMPLES.filter((s) => s.name !== "Frameworks").map((s, i) => (
              <Frame key={s.name} title={s.name} className={s.name === "Data pipeline" ? "md:col-span-2" : ""}>
                <FlowDiagram
                  nodes={s.nodes}
                  edges={s.edges}
                  variant={(["blueprint", "schematic", "solid", "outline"] as FlowVariant[])[i % 4]}
                  direction={s.name === "Decision tree" ? "vertical" : "horizontal"}
                  curve={s.name === "Decision tree" ? "step" : "smooth"}
                  nodeWidth={s.name === "Decision tree" ? 112 : 104}
                  nodeHeight={46}
                  gap={s.name === "Decision tree" ? 50 : 64}
                  arrows
                />
              </Frame>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
