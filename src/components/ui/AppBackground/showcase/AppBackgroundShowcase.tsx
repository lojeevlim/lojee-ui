import { useState } from "react";
import { AppBackground, type AppBackgroundSide, type AppBackgroundVariant } from "../AppBackground";
import { APP_BACKGROUND_HAS_MOTES, APP_BACKGROUND_VARIANTS } from "../variants";
import { Button } from "../../Buttons/Button";
import { Switch } from "../../Switch/Switch";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

const SIDES: AppBackgroundSide[] = ["both", "left", "right"];

const GROUPS: { title: string; sub: string; variants: AppBackgroundVariant[] }[] = [
  { title: "Glows", sub: "Light that falls into the page.", variants: ["side-glow", "top-glow", "bottom-glow", "pinch-glow", "horizon", "aurora", "spotlight", "mesh", "vortex"] },
  { title: "Motion", sub: "Light that rises or flows.", variants: ["embers", "waves"] },
  { title: "Patterns", sub: "Quiet textures that fade out toward the edges.", variants: ["grid", "dots"] },
];

const DESCRIPTIONS: Record<AppBackgroundVariant, string> = {
  "side-glow": "Wedges of accent light pointing in from the sides — the landing page hero.",
  "top-glow": "The same glowing wedge, pointing down from the top edge.",
  "bottom-glow": "The glowing wedge rising from the bottom edge.",
  "pinch-glow": "The bottom-glow wedge held in the bend a resting pointer leaves in the light: it rises into a rounded arch with an opening inside, and tiny particles climb its curve to the tip. Hover it and the light bends around the pointer like smoke.",
  horizon: "An arc of light rising along the bottom edge, like a planet's horizon, fading out toward both sides.",
  aurora: "Three blurred blobs of accent light drifting slowly.",
  spotlight: "A cone of light falling from the top centre.",
  mesh: "Soft overlapping gradients pooled in the corners.",
  vortex: "Two blurred conic gradients turning against each other.",
  embers: "Sparks rising from a glowing floor.",
  waves: "Three layers of waves drifting along the bottom.",
  grid: "Fine accent lines that fade out toward the edges.",
  dots: "A dot matrix that fades out toward the edges.",
};

export default function AppBackgroundShowcase() {
  const [variant, setVariant] = useState<AppBackgroundVariant>("side-glow");
  const [side, setSide] = useState<AppBackgroundSide>("both");
  const [animated, setAnimated] = useState(true);
  const [hover, setHover] = useState(true);
  const [motes, setMotes] = useState(true);
  const [progress, setProgress] = useState(0);
  const isGlow = variant === "side-glow";
  const hasMotes = APP_BACKGROUND_HAS_MOTES.includes(variant);

  const react = [
    variant !== "side-glow" ? `variant="${variant}"` : null,
    isGlow && side !== "both" ? `side="${side}"` : null,
    !animated ? "animated={false}" : null,
    !hover ? "hover={false}" : null,
    hasMotes && !motes ? "motes={false}" : null,
    progress > 0 ? `progress={${progress}}` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const wc = [
    variant !== "side-glow" ? `variant="${variant}"` : null,
    isGlow && side !== "both" ? `side="${side}"` : null,
    !animated ? `animated="false"` : null,
    !hover ? `hover="false"` : null,
    hasMotes && !motes ? `motes="false"` : null,
    progress > 0 ? `progress="${progress}"` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-semibold text-fg">App Background</h1>
        <p className="mt-1 text-sm text-fg-subtle">
          A decorative background for an app, page or section, in {APP_BACKGROUND_VARIANTS.length} designs. It is the container: put your content inside and it sits on top. Hover any of them: the light bends around the pointer like smoke and flows back. Every design follows the theme accent and light / dark mode.
        </p>
      </div>

      <section>
        <SectionLabel sub="The root is already relative, isolated and clipped (relative isolate overflow-hidden). Give it a size and a background color with className, and put your content inside.">Basic usage</SectionLabel>
        <AppBackground variant="aurora" className="flex h-56 items-center justify-center rounded-2xl border border-border bg-surface">
          <p className="text-lg font-semibold text-fg">Content sits on top</p>
        </AppBackground>
        <CodeBlock
          variants={{
            react: `<AppBackground variant="aurora" className="flex h-56 items-center justify-center bg-surface">
  <h1>Content sits on top</h1>
</AppBackground>`,
            js: `<l-app-background variant="aurora" style="height: 14rem">
  <h1>Content sits on top</h1>
</l-app-background>

<script type="module">
  import "lojee-ui/elements";
</script>`,
            vue: `<template>
  <l-app-background variant="aurora" style="height: 14rem">
    <h1>Content sits on top</h1>
  </l-app-background>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
            angular: `// background.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-background-demo",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-app-background variant="aurora" style="height: 14rem">
    <h1>Content sits on top</h1>
  </l-app-background>\`,
})
export class BackgroundDemoComponent {}`,
          }}
        />
      </section>

      {GROUPS.map((g) => (
        <section key={g.title}>
          <SectionLabel sub={g.sub}>{g.title}</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.variants.map((v) => (
              <div key={v}>
                <AppBackground variant={v} className="flex h-44 items-center justify-center rounded-2xl border border-border bg-surface">
                  <p className="text-sm font-semibold text-fg">{v}</p>
                </AppBackground>
                <p className="mt-2 text-xs text-fg-subtle">{DESCRIPTIONS[v]}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section>
        <SectionLabel sub="Pick a variant, then try the options. Side only applies to side-glow; motes to the glows with points of light and embers.">Options</SectionLabel>
        <div className="mb-4 flex flex-wrap gap-2">
          {APP_BACKGROUND_VARIANTS.map((v) => (
            <Button key={v} size="sm" variant={v === variant ? "solid" : "outline"} label={v} onClick={() => setVariant(v)} />
          ))}
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          {isGlow && (
            <div className="flex gap-2">
              {SIDES.map((s) => (
                <Button key={s} size="sm" variant={s === side ? "solid" : "outline"} label={s} onClick={() => setSide(s)} />
              ))}
            </div>
          )}
          <label className="inline-flex items-center gap-2 text-sm text-fg-muted">
            <Switch checked={animated} onChange={(e) => setAnimated(e.target.checked)} /> Animated
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-fg-muted">
            <Switch checked={hover} onChange={(e) => setHover(e.target.checked)} /> Hover effect
          </label>
          {hasMotes && (
            <label className="inline-flex items-center gap-2 text-sm text-fg-muted">
              <Switch checked={motes} onChange={(e) => setMotes(e.target.checked)} /> Motes
            </label>
          )}
          <label className="inline-flex items-center gap-2 text-sm text-fg-muted">
            Fade
            <input type="range" min={0} max={1} step={0.01} value={progress} onChange={(e) => setProgress(Number(e.target.value))} aria-label="Fade amount" />
          </label>
        </div>
        <AppBackground variant={variant} side={side} animated={animated} hover={hover} motes={motes} progress={progress} className="flex h-72 items-center justify-center rounded-2xl border border-border bg-surface">
          <p className="text-lg font-semibold text-fg">{variant}</p>
        </AppBackground>
        <CodeBlock
          variants={{
            react: `<AppBackground${react ? ` ${react}` : ""} className="h-72 bg-surface">\n  {/* your content */}\n</AppBackground>`,
            js: `<l-app-background${wc ? ` ${wc}` : ""} style="height: 18rem">\n  <!-- your content -->\n</l-app-background>`,
            vue: `<template>\n  <l-app-background${wc ? ` ${wc}` : ""} style="height: 18rem">\n    <!-- your content -->\n  </l-app-background>\n</template>`,
            angular: `<!-- reuses BackgroundDemoComponent from above -->\n<l-app-background${wc ? ` ${wc}` : ""} style="height: 18rem">\n  <!-- your content -->\n</l-app-background>`,
          }}
        />
      </section>

      <section>
        <SectionLabel sub="With scrollFade the background eases out as the page scrolls past it, and a --sp CSS variable (0 to 1) is set on the root for your own content to use. Or drive it yourself with progress (0 = shown, 1 = gone).">Fade on scroll</SectionLabel>
        <CodeBlock
          variants={{
            react: `<AppBackground scrollFade>
  <h1 style={{ opacity: "calc(1 - var(--sp) * 1.2)" }}>Fades with the page</h1>
</AppBackground>

{/* or drive it from your own state */}
<AppBackground progress={scrollProgress} />`,
            js: `<l-app-background scroll-fade="true">
  <h1>Fades with the page</h1>
</l-app-background>`,
            vue: `<template>\n  <l-app-background scroll-fade="true">\n    <h1>Fades with the page</h1>\n  </l-app-background>\n</template>`,
            angular: `<l-app-background scroll-fade="true">\n  <h1>Fades with the page</h1>\n</l-app-background>`,
          }}
        />
      </section>
    </div>
  );
}
