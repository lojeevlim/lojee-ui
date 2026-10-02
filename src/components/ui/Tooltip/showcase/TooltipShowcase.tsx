import { Tooltip } from "../Tooltip";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function TooltipShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Tooltip</h1>
          <p className="text-sm text-fg-subtle mt-1">
            Hover-triggered floating text, positioned via pure CSS — no JS state, no positioning
            library.
          </p>
        </div>

        <section>
          <SectionLabel sub="Hover a button to see it.">Positions</SectionLabel>
          <Row>
            <Tooltip content="Tooltip on top" position="top">
              <Button variant="outline" label="Top" />
            </Tooltip>
            <Tooltip content="Tooltip on bottom" position="bottom">
              <Button variant="outline" label="Bottom" />
            </Tooltip>
            <Tooltip content="Tooltip on left" position="left">
              <Button variant="outline" label="Left" />
            </Tooltip>
            <Tooltip content="Tooltip on right" position="right">
              <Button variant="outline" label="Right" />
            </Tooltip>
          </Row>
          <CodeBlock
            variants={{
              react: `<Tooltip content="Tooltip on top" position="top">
  <Button variant="outline" label="Top" />
</Tooltip>`,
              js: `<l-Tooltip content="Tooltip on top" position="top">
  <l-Button variant="outline" label="Top"></l-Button>
</l-Tooltip>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Tooltip content="Tooltip on top" position="top">
    <l-Button variant="outline" label="Top" />
  </l-Tooltip>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// tooltip-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-tooltip-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Tooltip content="Tooltip on top" position="top">
      <l-Button variant="outline" label="Top" />
    </l-Tooltip>
  \`,
})
export class TooltipShowcaseComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'`size` sets the bubble\'s padding and text size: "xs" (10px), "sm" (11px), "md" (default, 12px), "lg" (14px) or "xl" (16px). The arrow stays the same size. Hover a button to see its tooltip.'}>Sizes</SectionLabel>
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip content="Extra small" size="xs">
              <Button variant="outline" label="xs" />
            </Tooltip>
            <Tooltip content="Small" size="sm">
              <Button variant="outline" label="sm" />
            </Tooltip>
            <Tooltip content="Medium" size="md">
              <Button variant="outline" label="md (default)" />
            </Tooltip>
            <Tooltip content="Large" size="lg">
              <Button variant="outline" label="lg" />
            </Tooltip>
            <Tooltip content="Extra large" size="xl">
              <Button variant="outline" label="xl" />
            </Tooltip>
          </div>
          <CodeBlock
            variants={{
              react: `<Tooltip content="Extra small" size="xs">
  <Button variant="outline" label="xs" />
</Tooltip>
<Tooltip content="Small" size="sm">
  <Button variant="outline" label="sm" />
</Tooltip>
<Tooltip content="Medium">
  <Button variant="outline" label="md (default)" />
</Tooltip>
<Tooltip content="Large" size="lg">
  <Button variant="outline" label="lg" />
</Tooltip>
<Tooltip content="Extra large" size="xl">
  <Button variant="outline" label="xl" />
</Tooltip>`,
              js: `<l-Tooltip content="Extra small" size="xs">
  <l-Button variant="outline" label="xs"></l-Button>
</l-Tooltip>
<l-Tooltip content="Small" size="sm">
  <l-Button variant="outline" label="sm"></l-Button>
</l-Tooltip>
<l-Tooltip content="Medium">
  <l-Button variant="outline" label="md (default)"></l-Button>
</l-Tooltip>
<l-Tooltip content="Large" size="lg">
  <l-Button variant="outline" label="lg"></l-Button>
</l-Tooltip>
<l-Tooltip content="Extra large" size="xl">
  <l-Button variant="outline" label="xl"></l-Button>
</l-Tooltip>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Tooltip content="Extra small" size="xs">
    <l-Button variant="outline" label="xs"></l-Button>
  </l-Tooltip>
  <l-Tooltip content="Small" size="sm">
    <l-Button variant="outline" label="sm"></l-Button>
  </l-Tooltip>
  <l-Tooltip content="Medium">
    <l-Button variant="outline" label="md (default)"></l-Button>
  </l-Tooltip>
  <l-Tooltip content="Large" size="lg">
    <l-Button variant="outline" label="lg"></l-Button>
  </l-Tooltip>
  <l-Tooltip content="Extra large" size="xl">
    <l-Button variant="outline" label="xl"></l-Button>
  </l-Tooltip>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `<l-Tooltip content="Extra small" size="xs">
  <l-Button variant="outline" label="xs"></l-Button>
</l-Tooltip>
<l-Tooltip content="Small" size="sm">
  <l-Button variant="outline" label="sm"></l-Button>
</l-Tooltip>
<l-Tooltip content="Medium">
  <l-Button variant="outline" label="md (default)"></l-Button>
</l-Tooltip>
<l-Tooltip content="Large" size="lg">
  <l-Button variant="outline" label="lg"></l-Button>
</l-Tooltip>
<l-Tooltip content="Extra large" size="xl">
  <l-Button variant="outline" label="xl"></l-Button>
</l-Tooltip>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'Same color palette as Button. The default is the theme accent color, so tooltips change with the accent picker; color="neutral" gives the theme-inverted bubble (dark in light mode, light in dark mode).'}>Colors</SectionLabel>
          <Row>
            <Tooltip content="Accent (default) — follows the theme">
              <Button variant="outline" label="Default" />
            </Tooltip>
            <Tooltip content="Neutral — inverts with the light / dark theme" color="neutral">
              <Button variant="outline" label="Neutral" />
            </Tooltip>
            <Tooltip content="Slate tooltip" color="slate">
              <Button variant="outline" label="Slate" />
            </Tooltip>
            <Tooltip content="Indigo tooltip" color="indigo">
              <Button variant="outline" label="Indigo" />
            </Tooltip>
            <Tooltip content="Emerald tooltip" color="emerald">
              <Button variant="outline" label="Emerald" />
            </Tooltip>
            <Tooltip content="Rose tooltip" color="rose">
              <Button variant="outline" label="Rose" />
            </Tooltip>
            <Tooltip content="Amber tooltip" color="amber">
              <Button variant="outline" label="Amber" />
            </Tooltip>
          </Row>
          <CodeBlock
            variants={{
              react: `<Tooltip content="Indigo tooltip" color="indigo">
  <Button variant="outline" label="Indigo" />
</Tooltip>`,
              js: `<l-Tooltip content="Indigo tooltip" color="indigo">
  <l-Button variant="outline" label="Indigo"></l-Button>
</l-Tooltip>`,
              vue: `<template>
  <l-Tooltip content="Indigo tooltip" color="indigo">
    <l-Button variant="outline" label="Indigo" />
  </l-Tooltip>
</template>`,
              angular: `<!-- reuses TooltipShowcaseComponent from above -->
<l-Tooltip content="Indigo tooltip" color="indigo">
  <l-Button variant="outline" label="Indigo" />
</l-Tooltip>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Snapped to the nearest Tailwind delay-* step.">Delay</SectionLabel>
          <Row>
            <Tooltip content="Instant" delayMs={0}>
              <Button variant="soft" label="No delay" />
            </Tooltip>
            <Tooltip content="Waits a bit" delayMs={500}>
              <Button variant="soft" label="500ms delay" />
            </Tooltip>
          </Row>
          <CodeBlock
            variants={{
              react: `<Tooltip content="Waits a bit" delayMs={500}>...</Tooltip>`,
              js: `<l-Tooltip content="Waits a bit" delayMs="500">...</l-Tooltip>`,
              vue: `<template>
  <l-Tooltip content="Waits a bit" delayMs="500">...</l-Tooltip>
</template>`,
              angular: `<!-- reuses TooltipShowcaseComponent from above -->
<l-Tooltip content="Waits a bit" delayMs="500">...</l-Tooltip>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Any element can be the trigger, not just Button.">Any trigger</SectionLabel>
          <Row>
            <Tooltip content="This works on plain text too">
              <span className="cursor-help underline decoration-dotted underline-offset-4">Hover this text</span>
            </Tooltip>
          </Row>
          <CodeBlock
            variants={{
              react: `<Tooltip content="This works on plain text too">
  <span>Hover this text</span>
</Tooltip>`,
              js: `<l-Tooltip content="This works on plain text too">
  <span>Hover this text</span>
</l-Tooltip>`,
              vue: `<template>
  <l-Tooltip content="This works on plain text too">
    <span>Hover this text</span>
  </l-Tooltip>
</template>`,
              angular: `<!-- reuses TooltipShowcaseComponent from above -->
<l-Tooltip content="This works on plain text too">
  <span>Hover this text</span>
</l-Tooltip>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`open` keeps the bubble showing — the active state — whether or not the trigger is hovered or focused. Handy for a hint that should be visible right away, like a scroll indicator. It doesn't work together with `portal`.">
            Active (always visible)
          </SectionLabel>
          <div className="flex min-h-[110px] items-end gap-6 pb-1">
            <Tooltip content="Always visible" position="top" open>
              <Button variant="outline" label="Active" />
            </Tooltip>
            <Tooltip content="Active, neutral" position="right" color="neutral" open>
              <Button variant="outline" label="Right" />
            </Tooltip>
          </div>
          <CodeBlock
            variants={{
              react: `<Tooltip content="Always visible" position="top" open>
  <Button variant="outline" label="Active" />
</Tooltip>`,
              js: `<l-Tooltip content="Always visible" position="top" open="true">
  <l-Button variant="outline" label="Active"></l-Button>
</l-Tooltip>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Tooltip content="Always visible" position="top" :open="true">
    <l-Button variant="outline" label="Active"></l-Button>
  </l-Tooltip>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `<l-Tooltip content="Always visible" position="top" [open]="true">
  <l-Button variant="outline" label="Active"></l-Button>
</l-Tooltip>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter/exit transitions via `transition` (with `transitionDuration` / `transitionDelay`) — hover or focus a button to see the bubble animate in and out.">Transitions</SectionLabel>
          <Row>
            <Tooltip transition="fade" content="Tooltip text">
              <Button variant="outline" label="Fade" />
            </Tooltip>
            <Tooltip transition="slide-up" content="Tooltip text">
              <Button variant="outline" label="Slide up" />
            </Tooltip>
            <Tooltip transition="slide-right" transitionDelay={100} content="Tooltip text">
              <Button variant="outline" label="Slide right" />
            </Tooltip>
            <Tooltip transition="zoom" content="Tooltip text">
              <Button variant="outline" label="Zoom" />
            </Tooltip>
            <Tooltip transition="flip" content="Tooltip text">
              <Button variant="outline" label="Flip" />
            </Tooltip>
            <Tooltip transition="blur" content="Tooltip text">
              <Button variant="outline" label="Blur" />
            </Tooltip>
            <Tooltip transition="bounce" content="Tooltip text">
              <Button variant="outline" label="Bounce" />
            </Tooltip>
            <Tooltip transition="drop" transitionDuration={700} content="Tooltip text">
              <Button variant="outline" label="Drop" />
            </Tooltip>
          </Row>
          <CodeBlock
            variants={{
              react: `<Tooltip transition="fade" content="Tooltip text">
  <Button variant="outline" label="Fade" />
</Tooltip>

<Tooltip transition="slide-up" content="Tooltip text">
  <Button variant="outline" label="Slide up" />
</Tooltip>

<Tooltip transition="slide-right" transitionDelay={100} content="Tooltip text">
  <Button variant="outline" label="Slide right" />
</Tooltip>

<Tooltip transition="zoom" content="Tooltip text">
  <Button variant="outline" label="Zoom" />
</Tooltip>

<Tooltip transition="flip" content="Tooltip text">
  <Button variant="outline" label="Flip" />
</Tooltip>

<Tooltip transition="blur" content="Tooltip text">
  <Button variant="outline" label="Blur" />
</Tooltip>

<Tooltip transition="bounce" content="Tooltip text">
  <Button variant="outline" label="Bounce" />
</Tooltip>

<Tooltip transition="drop" transitionDuration={700} content="Tooltip text">
  <Button variant="outline" label="Drop" />
</Tooltip>`,
              js: `<l-Tooltip transition="fade" content="Tooltip text">
  <l-Button variant="outline" label="Fade"></l-Button>
</l-Tooltip>

<l-Tooltip transition="slide-up" content="Tooltip text">
  <l-Button variant="outline" label="Slide up"></l-Button>
</l-Tooltip>

<l-Tooltip transition="slide-right" transitionDelay="100" content="Tooltip text">
  <l-Button variant="outline" label="Slide right"></l-Button>
</l-Tooltip>

<l-Tooltip transition="zoom" content="Tooltip text">
  <l-Button variant="outline" label="Zoom"></l-Button>
</l-Tooltip>

<l-Tooltip transition="flip" content="Tooltip text">
  <l-Button variant="outline" label="Flip"></l-Button>
</l-Tooltip>

<l-Tooltip transition="blur" content="Tooltip text">
  <l-Button variant="outline" label="Blur"></l-Button>
</l-Tooltip>

<l-Tooltip transition="bounce" content="Tooltip text">
  <l-Button variant="outline" label="Bounce"></l-Button>
</l-Tooltip>

<l-Tooltip transition="drop" transitionDuration="700" content="Tooltip text">
  <l-Button variant="outline" label="Drop"></l-Button>
</l-Tooltip>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Tooltip transition="fade" content="Tooltip text">
    <l-Button variant="outline" label="Fade"></l-Button>
  </l-Tooltip>

  <l-Tooltip transition="slide-up" content="Tooltip text">
    <l-Button variant="outline" label="Slide up"></l-Button>
  </l-Tooltip>

  <l-Tooltip transition="slide-right" transitionDelay="100" content="Tooltip text">
    <l-Button variant="outline" label="Slide right"></l-Button>
  </l-Tooltip>

  <l-Tooltip transition="zoom" content="Tooltip text">
    <l-Button variant="outline" label="Zoom"></l-Button>
  </l-Tooltip>

  <l-Tooltip transition="flip" content="Tooltip text">
    <l-Button variant="outline" label="Flip"></l-Button>
  </l-Tooltip>

  <l-Tooltip transition="blur" content="Tooltip text">
    <l-Button variant="outline" label="Blur"></l-Button>
  </l-Tooltip>

  <l-Tooltip transition="bounce" content="Tooltip text">
    <l-Button variant="outline" label="Bounce"></l-Button>
  </l-Tooltip>

  <l-Tooltip transition="drop" transitionDuration="700" content="Tooltip text">
    <l-Button variant="outline" label="Drop"></l-Button>
  </l-Tooltip>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Tooltip transition="fade" content="Tooltip text">
      <l-Button variant="outline" label="Fade"></l-Button>
    </l-Tooltip>

    <l-Tooltip transition="slide-up" content="Tooltip text">
      <l-Button variant="outline" label="Slide up"></l-Button>
    </l-Tooltip>

    <l-Tooltip transition="slide-right" transitionDelay="100" content="Tooltip text">
      <l-Button variant="outline" label="Slide right"></l-Button>
    </l-Tooltip>

    <l-Tooltip transition="zoom" content="Tooltip text">
      <l-Button variant="outline" label="Zoom"></l-Button>
    </l-Tooltip>

    <l-Tooltip transition="flip" content="Tooltip text">
      <l-Button variant="outline" label="Flip"></l-Button>
    </l-Tooltip>

    <l-Tooltip transition="blur" content="Tooltip text">
      <l-Button variant="outline" label="Blur"></l-Button>
    </l-Tooltip>

    <l-Tooltip transition="bounce" content="Tooltip text">
      <l-Button variant="outline" label="Bounce"></l-Button>
    </l-Tooltip>

    <l-Tooltip transition="drop" transitionDuration="700" content="Tooltip text">
      <l-Button variant="outline" label="Drop"></l-Button>
    </l-Tooltip>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
