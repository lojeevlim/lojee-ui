import { Switch } from "../Switch";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";
import { useFormEventsNote } from "../../../../core/bindingNotes";

export default function SwitchShowcase() {
  const eventsNote = useFormEventsNote();
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Switch</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A styled toggle switch — a native checkbox input under the hood.
          </p>
        </div>

        <section>
          <SectionLabel sub="Off and on (defaultChecked).">Default</SectionLabel>
          <Row>
            <Switch />
            <Switch defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch />
<Switch defaultChecked />`,
              js: `<l-switch ></l-switch>
<l-switch defaultChecked></l-switch>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-switch />
  <l-switch defaultChecked />
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
    <l-switch />
    <l-switch defaultChecked />
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <Row>
            <Switch size="sm" defaultChecked />
            <Switch size="md" defaultChecked />
            <Switch size="lg" defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch size="sm" defaultChecked />
<Switch size="md" defaultChecked />
<Switch size="lg" defaultChecked />`,
              js: `<l-switch size="sm" defaultChecked></l-switch>
<l-switch size="md" defaultChecked></l-switch>
<l-switch size="lg" defaultChecked></l-switch>`,
              vue: `<template>
  <l-switch size="sm" defaultChecked />
  <l-switch size="md" defaultChecked />
  <l-switch size="lg" defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-switch size="sm" defaultChecked />
<l-switch size="md" defaultChecked />
<l-switch size="lg" defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same palette as Button.">Colors</SectionLabel>
          <Row>
            <Switch color="slate" defaultChecked />
            <Switch color="indigo" defaultChecked />
            <Switch color="emerald" defaultChecked />
            <Switch color="rose" defaultChecked />
            <Switch color="amber" defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch color="indigo" defaultChecked />
<Switch color="emerald" defaultChecked />
<Switch color="rose" defaultChecked />`,
              js: `<l-switch color="indigo" defaultChecked></l-switch>
<l-switch color="emerald" defaultChecked></l-switch>
<l-switch color="rose" defaultChecked></l-switch>`,
              vue: `<template>
  <l-switch color="indigo" defaultChecked />
  <l-switch color="emerald" defaultChecked />
  <l-switch color="rose" defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-switch color="indigo" defaultChecked />
<l-switch color="emerald" defaultChecked />
<l-switch color="rose" defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Non-interactive via the native disabled attribute.">Disabled</SectionLabel>
          <Row>
            <Switch disabled />
            <Switch disabled defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch disabled />
<Switch disabled defaultChecked />`,
              js: `<l-switch disabled></l-switch>
<l-switch disabled defaultChecked></l-switch>`,
              vue: `<template>
  <l-switch disabled />
  <l-switch disabled defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-switch disabled />
<l-switch disabled defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="An optional label prop rendered alongside the track.">With label</SectionLabel>
          <Row>
            <Switch label="Enable notifications" />
            <Switch label="Dark mode" defaultChecked color="indigo" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Switch label="Enable notifications" />`,
              js: `<l-switch label="Enable notifications"></l-switch>`,
              vue: `<l-switch label="Enable notifications" />`,
              angular: `<l-switch label="Enable notifications" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <Switch transition="fade" label="Fade" defaultChecked />
            <Switch transition="slide-up" label="Slide up" defaultChecked />
            <Switch transition="slide-right" transitionDelay={100} label="Slide right" defaultChecked />
            <Switch transition="zoom" label="Zoom" defaultChecked />
            <Switch transition="flip" label="Flip" defaultChecked />
            <Switch transition="blur" label="Blur" defaultChecked />
            <Switch transition="bounce" label="Bounce" defaultChecked />
            <Switch transition="drop" transitionDuration={700} label="Drop" defaultChecked />
          
            <Switch className="rounded-md px-2 py-1" hoverEffect="lift" label="Lift" />
            <Switch className="rounded-md px-2 py-1" hoverEffect="scale" label="Scale" />
            <Switch className="rounded-md px-2 py-1" hoverEffect="glow" label="Glow" />
            <Switch className="rounded-md px-2 py-1" hoverEffect="shine" label="Shine" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Switch transition="fade" label="Fade" defaultChecked />
<Switch transition="slide-up" label="Slide up" defaultChecked />
<Switch transition="slide-right" transitionDelay={100} label="Slide right" defaultChecked />
<Switch transition="zoom" label="Zoom" defaultChecked />
<Switch transition="flip" label="Flip" defaultChecked />
<Switch transition="blur" label="Blur" defaultChecked />
<Switch transition="bounce" label="Bounce" defaultChecked />
<Switch transition="drop" transitionDuration={700} label="Drop" defaultChecked />

<Switch hoverEffect="lift" label="Lift" />
<Switch hoverEffect="scale" label="Scale" />
<Switch hoverEffect="glow" label="Glow" />
<Switch hoverEffect="shine" label="Shine" />`,
              js: `<l-switch transition="fade" label="Fade" defaultChecked></l-switch>
<l-switch transition="slide-up" label="Slide up" defaultChecked></l-switch>
<l-switch transition="slide-right" transitionDelay="100" label="Slide right" defaultChecked></l-switch>
<l-switch transition="zoom" label="Zoom" defaultChecked></l-switch>
<l-switch transition="flip" label="Flip" defaultChecked></l-switch>
<l-switch transition="blur" label="Blur" defaultChecked></l-switch>
<l-switch transition="bounce" label="Bounce" defaultChecked></l-switch>
<l-switch transition="drop" transitionDuration="700" label="Drop" defaultChecked></l-switch>

<l-switch hoverEffect="lift" label="Lift"></l-switch>
<l-switch hoverEffect="scale" label="Scale"></l-switch>
<l-switch hoverEffect="glow" label="Glow"></l-switch>
<l-switch hoverEffect="shine" label="Shine"></l-switch>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-switch transition="fade" label="Fade" defaultChecked></l-switch>
  <l-switch transition="slide-up" label="Slide up" defaultChecked></l-switch>
  <l-switch transition="slide-right" transitionDelay="100" label="Slide right" defaultChecked></l-switch>
  <l-switch transition="zoom" label="Zoom" defaultChecked></l-switch>
  <l-switch transition="flip" label="Flip" defaultChecked></l-switch>
  <l-switch transition="blur" label="Blur" defaultChecked></l-switch>
  <l-switch transition="bounce" label="Bounce" defaultChecked></l-switch>
  <l-switch transition="drop" transitionDuration="700" label="Drop" defaultChecked></l-switch>

  <l-switch hoverEffect="lift" label="Lift"></l-switch>
  <l-switch hoverEffect="scale" label="Scale"></l-switch>
  <l-switch hoverEffect="glow" label="Glow"></l-switch>
  <l-switch hoverEffect="shine" label="Shine"></l-switch>
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
    <l-switch transition="fade" label="Fade" defaultChecked></l-switch>
    <l-switch transition="slide-up" label="Slide up" defaultChecked></l-switch>
    <l-switch transition="slide-right" transitionDelay="100" label="Slide right" defaultChecked></l-switch>
    <l-switch transition="zoom" label="Zoom" defaultChecked></l-switch>
    <l-switch transition="flip" label="Flip" defaultChecked></l-switch>
    <l-switch transition="blur" label="Blur" defaultChecked></l-switch>
    <l-switch transition="bounce" label="Bounce" defaultChecked></l-switch>
    <l-switch transition="drop" transitionDuration="700" label="Drop" defaultChecked></l-switch>

    <l-switch hoverEffect="lift" label="Lift"></l-switch>
    <l-switch hoverEffect="scale" label="Scale"></l-switch>
    <l-switch hoverEffect="glow" label="Glow"></l-switch>
    <l-switch hoverEffect="shine" label="Shine"></l-switch>
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
              react: `<Switch label="Notifications"
  onChange={(e) => console.log("update", e.target.checked)}
  onInput={(e) => console.log("input", e.currentTarget.checked)}
  onFocus={() => console.log("focus")}
  onInvalid={(e) => console.log("invalid", e.currentTarget.validationMessage)}
/>`,
              js: `<l-switch label="Notifications"></l-switch>

<script type="module">
  import "lojee-ui/elements";

  const el = document.querySelector("l-switch");
  el.addEventListener("update", (e) => console.log("update", e.detail)); // boolean
  el.addEventListener("input", (e) => console.log("input", e.detail));
  el.addEventListener("focus", (e) => console.log("focus", e.detail));
  el.addEventListener("invalid", (e) => console.log("invalid", e.detail)); // the validation message
</script>`,
              vue: `<template>
  <l-switch label="Notifications"
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
    <l-switch label="Notifications"
      (update)="onUpdate($any($event).detail)"
      (input)="onInput($any($event).detail)"
      (focus)="onFocus()"
      (invalid)="onInvalid($any($event).detail)"
    ></l-switch>
  \`,
})
export class AppComponent {
  onUpdate(value: boolean) {}
  onInput(value: boolean) {}
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
