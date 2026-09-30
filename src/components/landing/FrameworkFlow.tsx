import { useState } from "react";
import { highlightCode } from "../../core/highlightCode";
import { Icon } from "../ui/Icons/Icon";

type Fw = "react" | "vue" | "angular" | "js";

const FRAMEWORKS: { key: Fw; label: string; x: number; y: number }[] = [
  { key: "react", label: "React", x: 640, y: 40 },
  { key: "vue", label: "Vue", x: 640, y: 110 },
  { key: "angular", label: "Angular", x: 640, y: 180 },
  { key: "js", label: "Plain JS", x: 640, y: 250 },
];

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

// Where each packet travels: source → r2wc node → custom element → framework.
const trunk = "M170 145 H300 M420 145 H480";
const branch = (y: number) => `M480 145 C 540 145, 540 ${y}, 610 ${y}`;

/** Schematic: one React component → Web Component → every framework, with packets flowing along the wires. */
export default function FrameworkFlow() {
  const [fw, setFw] = useState<Fw>("react");

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.35fr_1fr]">
      <div className="lp-grid-fine overflow-x-auto rounded-2xl border border-border bg-surface p-3">
        <svg viewBox="0 0 800 290" className="h-auto min-w-[560px] w-full" fill="none" role="img" aria-label="lojee-ui React component wrapped as a Web Component and used in React, Vue, Angular and plain JS">
          {/* wires */}
          <path d={trunk} stroke="var(--color-border-strong)" strokeWidth="2" />
          {FRAMEWORKS.map((f) => (
            <path key={f.key} d={branch(f.y)} stroke={fw === f.key ? "var(--color-accent-500)" : "var(--color-border-strong)"} strokeWidth={fw === f.key ? 2.4 : 2} style={{ transition: "stroke 0.3s" }} />
          ))}
          <path className="lp-dash" d="M170 145 H300 M420 145 H480" stroke="var(--color-accent-500)" strokeWidth="2" />
          {FRAMEWORKS.map((f) => (
            <path key={`d${f.key}`} className={fw === f.key ? "lp-dash" : ""} d={branch(f.y)} stroke="var(--color-accent-500)" strokeWidth="2" opacity={fw === f.key ? 1 : 0} style={{ transition: "opacity 0.3s" }} />
          ))}

          {/* packets */}
          <circle r="4.5" fill="var(--color-accent-500)">
            <animateMotion dur="2.6s" repeatCount="indefinite" path="M170 145 H300 M420 145 H480" />
          </circle>
          {FRAMEWORKS.map((f, i) => (
            <circle key={`p${f.key}`} r="4" fill="var(--color-accent-400)" opacity={fw === f.key ? 1 : 0.35}>
              <animateMotion dur="2.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" path={branch(f.y)} />
            </circle>
          ))}

          {/* source */}
          <g>
            <rect x="20" y="105" width="150" height="80" rx="14" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
            <text x="95" y="135" textAnchor="middle" fontSize="11" fill="var(--color-fg-subtle)" fontFamily="ui-monospace, monospace">React component</text>
            <text x="95" y="160" textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--color-fg)" fontFamily="ui-monospace, monospace">{"<Button />"}</text>
          </g>

          {/* r2wc */}
          <g>
            <rect x="300" y="115" width="120" height="60" rx="30" fill="var(--color-accent-600)" />
            <text x="360" y="141" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">r2wc</text>
            <text x="360" y="158" textAnchor="middle" fontSize="9.5" fill="#fff" opacity="0.85">+ Shadow DOM</text>
          </g>

          {/* custom element */}
          <g>
            <circle cx="480" cy="145" r="26" fill="var(--color-surface)" stroke="var(--color-accent-500)" strokeWidth="2" />
            <text x="480" y="143" textAnchor="middle" fontSize="8.5" fill="var(--color-fg-subtle)" fontFamily="ui-monospace, monospace">custom</text>
            <text x="480" y="155" textAnchor="middle" fontSize="8.5" fill="var(--color-fg)" fontFamily="ui-monospace, monospace">element</text>
          </g>

          {/* frameworks */}
          {FRAMEWORKS.map((f) => {
            const active = fw === f.key;
            return (
              <g key={f.key} className="cursor-pointer" onClick={() => setFw(f.key)} onMouseEnter={() => setFw(f.key)}>
                <rect
                  x={f.x - 30}
                  y={f.y - 22}
                  width="150"
                  height="44"
                  rx="12"
                  fill={active ? "var(--color-accent-600)" : "var(--color-surface)"}
                  stroke={active ? "var(--color-accent-600)" : "var(--color-border-strong)"}
                  strokeWidth="1.5"
                  style={{ transition: "all 0.3s" }}
                />
                <text x={f.x + 45} y={f.y + 5} textAnchor="middle" fontSize="14" fontWeight="600" fill={active ? "#fff" : "var(--color-fg)"} style={{ transition: "fill 0.3s" }}>
                  {f.label}
                </text>
              </g>
            );
          })}
          <text x="400" y="40" textAnchor="middle" fontSize="10" fill="var(--color-fg-subtle)" fontFamily="ui-monospace, monospace">write once</text>
          <text x="400" y="272" textAnchor="middle" fontSize="10" fill="var(--color-fg-subtle)" fontFamily="ui-monospace, monospace">use anywhere</text>
        </svg>
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
