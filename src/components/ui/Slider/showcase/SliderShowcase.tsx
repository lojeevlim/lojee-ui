import { Slider, type SliderSize, type SliderThumbVariant } from "../Slider";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";
import { useFormEventsNote } from "../../../../core/bindingNotes";

const SIZES: SliderSize[] = ["sm", "md", "lg"];
const THUMBS: SliderThumbVariant[] = ["pill", "circle", "bar", "solid"];

export default function SliderShowcase() {
  const eventsNote = useFormEventsNote();
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Slider</h1>
          <p className="text-sm text-fg-subtle mt-1">A styled native range input for a single value.</p>
        </div>

        <section>
          <SectionLabel sub="A plain native range input.">Basic</SectionLabel>
          <div className="max-w-sm">
            <Slider defaultValue={40} />
          </div>
          <CodeBlock
            variants={{
              react: `<Slider defaultValue={40} />`,
              js: `<l-slider value="40"></l-slider>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-slider value="40" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}

<!-- app.component.html -->
<l-slider value="40" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Shows the current numeric value next to the track.">With value</SectionLabel>
          <div className="max-w-sm">
            <Slider defaultValue={65} showValue />
          </div>
          <CodeBlock
            variants={{
              react: `<Slider defaultValue={65} showValue />`,
              js: `<l-slider value="65" showValue></l-slider>`,
              vue: `<template>
  <l-slider value="65" showValue />
</template>`,
              angular: `<!-- app.component.html -->
<l-slider value="65" showValue />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Matches the shared color palette.">Colors</SectionLabel>
          <div className="max-w-sm space-y-4">
            <Slider defaultValue={30} color="indigo" showValue />
            <Slider defaultValue={55} color="emerald" showValue />
            <Slider defaultValue={80} color="rose" showValue />
          </div>
          <CodeBlock
            variants={{
              react: `<Slider defaultValue={30} color="indigo" showValue />`,
              js: `<l-slider value="30" color="indigo" showValue></l-slider>`,
              vue: `<template>
  <l-slider value="30" color="indigo" showValue />
</template>`,
              angular: `<!-- app.component.html -->
<l-slider value="30" color="indigo" showValue />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Three sizes via size. The track grows with the thumb.">Sizes</SectionLabel>
          <div className="max-w-sm space-y-5">
            {SIZES.map((sz) => (
              <div key={sz}>
                <p className="mb-1 font-mono text-xs text-fg-subtle">{sz}</p>
                <Slider defaultValue={45} size={sz} />
              </div>
            ))}
          </div>
          <CodeBlock
            variants={{
              react: `<Slider size="sm" />
<Slider size="md" />
<Slider size="lg" />`,
              js: `<l-slider size="lg" value="45"></l-slider>`,
              vue: `<l-slider size="lg" value="45" />`,
              angular: `<l-slider size="lg" value="45" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Pick the thumb with thumbVariant. Under the clay design the thumb is a puffy clay button and the track a pressed-in groove.">Thumb variants</SectionLabel>
          <div className="grid max-w-xl gap-6 sm:grid-cols-2">
            {THUMBS.map((v) => (
              <div key={v}>
                <p className="mb-1 font-mono text-xs text-fg-subtle">{v}</p>
                <Slider defaultValue={55} thumbVariant={v} size="lg" />
              </div>
            ))}
          </div>
          <CodeBlock
            variants={{
              react: `<Slider thumbVariant="circle" size="lg" />

// thumbVariant: "pill" (default) | "circle" | "bar" | "solid"`,
              js: `<l-slider thumbVariant="circle" size="lg" value="55"></l-slider>`,
              vue: `<l-slider thumbVariant="circle" size="lg" value="55" />`,
              angular: `<l-slider thumbVariant="circle" size="lg" value="55" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="valuePlacement=&quot;thumb&quot; puts the number inside the sliding button instead of beside the track. The number takes the slider color. Shown here with each thumb variant; use size md or lg so the number fits.">Value inside the thumb</SectionLabel>
          <div className="grid max-w-xl gap-6 sm:grid-cols-2">
            {THUMBS.map((v) => (
              <div key={v}>
                <p className="mb-1 font-mono text-xs text-fg-subtle">{v}</p>
                <Slider defaultValue={55} showValue valuePlacement="thumb" thumbVariant={v} size="lg" />
              </div>
            ))}
          </div>
          <CodeBlock
            variants={{
              react: `<Slider showValue valuePlacement="thumb" thumbVariant="circle" size="lg" />

// thumbVariant: "pill" (default) | "circle" | "bar" | "solid"`,
              js: `<l-slider showValue="true" valuePlacement="thumb" size="lg" value="40"></l-slider>`,
              vue: `<l-slider showValue="true" valuePlacement="thumb" size="lg" value="40" />`,
              angular: `<l-slider showValue="true" valuePlacement="thumb" size="lg" value="40" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="min/max/step pass through like any native range input.">Custom range</SectionLabel>
          <Row>
            <div className="max-w-sm w-full">
              <Slider min={0} max={10} step={1} defaultValue={5} showValue />
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<Slider min={0} max={10} step={1} defaultValue={5} showValue />`,
              js: `<l-slider min="0" max="10" step="1" value="5" showValue></l-slider>`,
              vue: `<template>
  <l-slider min="0" max="10" step="1" value="5" showValue />
</template>`,
              angular: `<!-- app.component.html -->
<l-slider min="0" max="10" step="1" value="5" showValue />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Standard disabled state.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <Slider defaultValue={40} disabled />
          </div>
          <CodeBlock
            variants={{
              react: `<Slider defaultValue={40} disabled />`,
              js: `<l-slider value="40" disabled></l-slider>`,
              vue: `<template>
  <l-slider value="40" disabled />
</template>`,
              angular: `<!-- app.component.html -->
<l-slider value="40" disabled />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="max-w-sm"><TransitionPreview cols={1}>
            <Slider transition="fade" defaultValue={40} />
            <Slider transition="slide-up" defaultValue={40} />
            <Slider transition="slide-right" transitionDelay={100} defaultValue={40} />
            <Slider transition="zoom" defaultValue={40} />
            <Slider transition="flip" defaultValue={40} />
            <Slider transition="blur" defaultValue={40} />
          </TransitionPreview></div>
          <div className="max-w-sm space-y-3">
            <Slider hoverEffect="lift" defaultValue={40} />
            <Slider hoverEffect="scale" defaultValue={40} />
            <Slider hoverEffect="glow" defaultValue={40} />
          </div>
          <CodeBlock
            variants={{
              react: `<Slider transition="fade" defaultValue={40} />
<Slider transition="slide-up" defaultValue={40} />
<Slider transition="slide-right" transitionDelay={100} defaultValue={40} />
<Slider transition="zoom" defaultValue={40} />
<Slider transition="flip" defaultValue={40} />
<Slider transition="blur" defaultValue={40} />

<Slider hoverEffect="lift" defaultValue={40} />
<Slider hoverEffect="scale" defaultValue={40} />
<Slider hoverEffect="glow" defaultValue={40} />`,
              js: `<l-slider transition="fade" value="40"></l-slider>
<l-slider transition="slide-up" value="40"></l-slider>
<l-slider transition="slide-right" transitionDelay="100" value="40"></l-slider>
<l-slider transition="zoom" value="40"></l-slider>
<l-slider transition="flip" value="40"></l-slider>
<l-slider transition="blur" value="40"></l-slider>

<l-slider hoverEffect="lift" value="40"></l-slider>
<l-slider hoverEffect="scale" value="40"></l-slider>
<l-slider hoverEffect="glow" value="40"></l-slider>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-slider transition="fade" value="40"></l-slider>
  <l-slider transition="slide-up" value="40"></l-slider>
  <l-slider transition="slide-right" transitionDelay="100" value="40"></l-slider>
  <l-slider transition="zoom" value="40"></l-slider>
  <l-slider transition="flip" value="40"></l-slider>
  <l-slider transition="blur" value="40"></l-slider>

  <l-slider hoverEffect="lift" value="40"></l-slider>
  <l-slider hoverEffect="scale" value="40"></l-slider>
  <l-slider hoverEffect="glow" value="40"></l-slider>
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
    <l-slider transition="fade" value="40"></l-slider>
    <l-slider transition="slide-up" value="40"></l-slider>
    <l-slider transition="slide-right" transitionDelay="100" value="40"></l-slider>
    <l-slider transition="zoom" value="40"></l-slider>
    <l-slider transition="flip" value="40"></l-slider>
    <l-slider transition="blur" value="40"></l-slider>

    <l-slider hoverEffect="lift" value="40"></l-slider>
    <l-slider hoverEffect="scale" value="40"></l-slider>
    <l-slider hoverEffect="glow" value="40"></l-slider>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={eventsNote}>Events</SectionLabel>
          <CodeBlock
            variants={{
              react: `<Slider min={0} max={100}
  onChange={(e) => console.log("update", Number(e.target.value))}
  onInput={(e) => console.log("input", Number(e.currentTarget.value))}
  onFocus={() => console.log("focus")}
  onInvalid={(e) => console.log("invalid", e.currentTarget.validationMessage)}
/>`,
              js: `<l-slider min="0" max="100"></l-slider>

<script type="module">
  import "lojee-ui/elements";

  const el = document.querySelector("l-slider");
  el.addEventListener("update", (e) => console.log("update", e.detail)); // number
  el.addEventListener("input", (e) => console.log("input", e.detail));
  el.addEventListener("focus", (e) => console.log("focus", e.detail));
  el.addEventListener("invalid", (e) => console.log("invalid", e.detail)); // the validation message
</script>`,
              vue: `<template>
  <l-slider min="0" max="100"
    @update="(e) => console.log('update', e.detail)"
    @input="(e) => console.log('input', e.detail)"
    @focus="(e) => console.log('focus', e.detail)"
    @invalid="(e) => console.log('invalid', e.detail)"
  />
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
    <l-slider min="0" max="100"
      (update)="onUpdate($any($event).detail)"
      (input)="onInput($any($event).detail)"
      (focus)="onFocus()"
      (invalid)="onInvalid($any($event).detail)"
    ></l-slider>
  \`,
})
export class AppComponent {
  onUpdate(value: number) {}
  onInput(value: number) {}
  onFocus() {}
  onInvalid(message: string) {}
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
