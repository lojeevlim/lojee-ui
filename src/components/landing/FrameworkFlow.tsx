import { useEffect, useRef, useState } from "react";
import { highlightCode } from "../../core/highlightCode";
import { Icon } from "../ui/Icons/Icon";
import { FlowDiagram } from "../ui/FlowDiagram/FlowDiagram";
import { FRAMEWORK_FLOW } from "../ui/FlowDiagram/samples";

type Fw = "react" | "vue" | "angular" | "js";

const FRAMEWORKS: { key: Fw; label: string }[] = [
  { key: "react", label: "React" },
  { key: "vue", label: "Vue" },
  { key: "angular", label: "Angular" },
  { key: "js", label: "Plain JS" },
];
const isFw = (id: string): id is Fw => FRAMEWORKS.some((f) => f.key === id);

const SNIPPETS: Record<Fw, string> = {
  react: `import { Button } from "lojee-ui";

<Button color="accent" label="Save" onClick={save} />`,
  vue: `<script setup lang="ts">
import "lojee-ui/elements";
</script>

<template>
  <l-button color="accent" label="Save" @click="save" />
</template>`,
  angular: `// main.ts
import "lojee-ui/elements";

<l-button color="accent" label="Save" (click)="save()"></l-button>`,
  js: `<l-button color="accent" label="Save"></l-button>

<script type="module">
  import "lojee-ui/elements";
</script>`,
};

/** Schematic: one React component → Web Component → every framework, with packets flowing along the wires. */
export default function FrameworkFlow() {
  const [fw, setFw] = useState<Fw>("react");
  // Flowing packets run in SMIL on the main thread, so only animate while the diagram is on screen.
  const boxRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <div ref={boxRef} className="lp-grid-fine overflow-hidden rounded-2xl border border-border bg-surface p-3">
        <FlowDiagram
          nodes={FRAMEWORK_FLOW.nodes}
          edges={FRAMEWORK_FLOW.edges}
          captionTop={FRAMEWORK_FLOW.captionTop}
          captionBottom={FRAMEWORK_FLOW.captionBottom}
          direction="auto"
          animated={onScreen}
          activeNode={fw}
          onNodeClick={(n) => isFw(n.id) && setFw(n.id)}
          onNodeHover={(n) => n && isFw(n.id) && setFw(n.id)}
          label="lojee-ui React component wrapped as a Web Component and used in React, Vue, Angular and plain JS"
        />
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {FRAMEWORKS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFw(f.key)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 ${
                fw === f.key ? "border-accent-600 bg-accent-600 text-white shadow-sm" : "border-border text-fg-muted hover:bg-surface-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-surface-muted">
          <div className="flex items-center gap-2 border-b border-border px-3 py-1.5 text-[11px] text-fg-subtle">
            <Icon name="chevron-right" size={12} />
            {fw === "react" ? "App.tsx" : fw === "vue" ? "App.vue" : fw === "angular" ? "app.component.html" : "index.html"}
          </div>
          {/* key remounts the block on change so the fade-in replays */}
          <pre key={fw} className="lp-enter overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-fg">
            {highlightCode(SNIPPETS[fw])}
          </pre>
        </div>
        <p className="text-xs text-fg-subtle">Same design, same props and the same theme in every framework — hover the diagram to switch.</p>
      </div>
    </div>
  );
}
