import { Checkbox } from "../Checkbox";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";
import { useFormEventsNote, useCheckedBindingNote } from "../../../../core/bindingNotes";

export default function CheckboxShowcase() {
  const eventsNote = useFormEventsNote("the new value (true / false for a checkbox)");
  const checkedNote = useCheckedBindingNote();
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Checkbox</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A styled wrapper around a native checkbox input — fully keyboard/screen-reader operable.
          </p>
        </div>

        <section>
          <SectionLabel sub="Unchecked and checked (defaultChecked).">Default</SectionLabel>
          <Row>
            <Checkbox />
            <Checkbox defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Checkbox />
<Checkbox defaultChecked />`,
              js: `<l-Checkbox ></l-Checkbox>
<l-Checkbox defaultChecked></l-Checkbox>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Checkbox />
  <l-Checkbox defaultChecked />
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
    <l-Checkbox />
    <l-Checkbox defaultChecked />
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same palette as Button.">Colors</SectionLabel>
          <Row>
            <Checkbox color="slate" defaultChecked />
            <Checkbox color="indigo" defaultChecked />
            <Checkbox color="emerald" defaultChecked />
            <Checkbox color="rose" defaultChecked />
            <Checkbox color="amber" defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Checkbox color="indigo" defaultChecked />
<Checkbox color="emerald" defaultChecked />
<Checkbox color="rose" defaultChecked />`,
              js: `<l-Checkbox color="indigo" defaultChecked></l-Checkbox>
<l-Checkbox color="emerald" defaultChecked></l-Checkbox>
<l-Checkbox color="rose" defaultChecked></l-Checkbox>`,
              vue: `<template>
  <l-Checkbox color="indigo" defaultChecked />
  <l-Checkbox color="emerald" defaultChecked />
  <l-Checkbox color="rose" defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-Checkbox color="indigo" defaultChecked />
<l-Checkbox color="emerald" defaultChecked />
<l-Checkbox color="rose" defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Non-interactive via the native disabled attribute.">Disabled</SectionLabel>
          <Row>
            <Checkbox disabled />
            <Checkbox disabled defaultChecked />
          </Row>
          <CodeBlock
            variants={{
              react: `<Checkbox disabled />
<Checkbox disabled defaultChecked />`,
              js: `<l-Checkbox disabled></l-Checkbox>
<l-Checkbox disabled defaultChecked></l-Checkbox>`,
              vue: `<template>
  <l-Checkbox disabled />
  <l-Checkbox disabled defaultChecked />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-Checkbox disabled />
<l-Checkbox disabled defaultChecked />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="An optional label prop rendered alongside the box.">With label</SectionLabel>
          <Row>
            <Checkbox label="Accept terms and conditions" />
            <Checkbox label="Subscribe to newsletter" defaultChecked color="indigo" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Checkbox label="Accept terms and conditions" />`,
              js: `<l-Checkbox label="Accept terms and conditions"></l-Checkbox>`,
              vue: `<l-Checkbox label="Accept terms and conditions" />`,
              angular: `<l-Checkbox label="Accept terms and conditions" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={eventsNote}>Events</SectionLabel>
          <CodeBlock
            variants={{
              react: `<Checkbox
  label="I agree to the terms"
  required
  onChange={(e) => console.log("update", e.target.checked)}
  onInput={(e) => console.log("input", e.currentTarget.checked)}
  onFocus={() => console.log("focus")}
  onInvalid={(e) => console.log("invalid", e.currentTarget.validationMessage)}
/>`,
              js: `<l-Checkbox label="I agree to the terms" required="true"></l-Checkbox>

<script type="module">
  import "lojee-ui/elements";

  const box = document.querySelector("l-checkbox");
  box.addEventListener("update", (e) => console.log("update", e.detail)); // true | false
  box.addEventListener("input", (e) => console.log("input", e.detail));
  box.addEventListener("focus", (e) => console.log("focus", e.detail));
  box.addEventListener("invalid", (e) => console.log("invalid", e.detail)); // the validation message
</script>`,
              vue: `<template>
  <l-checkbox
    label="I agree to the terms"
    required="true"
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
    <l-checkbox
      label="I agree to the terms"
      required="true"
      (update)="onUpdate($any($event).detail)"
      (input)="onInput($any($event).detail)"
      (focus)="onFocus()"
      (invalid)="onInvalid($any($event).detail)"
    ></l-checkbox>
  \`,
})
export class AppComponent {
  onUpdate(checked: boolean) {}
  onInput(checked: boolean) {}
  onFocus() {}
  onInvalid(message: string) {}
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <Checkbox transition="fade" label="Fade" defaultChecked />
            <Checkbox transition="slide-up" label="Slide up" defaultChecked />
            <Checkbox transition="slide-right" transitionDelay={100} label="Slide right" defaultChecked />
            <Checkbox transition="zoom" label="Zoom" defaultChecked />
            <Checkbox transition="flip" label="Flip" defaultChecked />
            <Checkbox transition="blur" label="Blur" defaultChecked />
            <Checkbox transition="bounce" label="Bounce" defaultChecked />
            <Checkbox transition="drop" transitionDuration={700} label="Drop" defaultChecked />
          
            <Checkbox className="rounded-md px-2 py-1" hoverEffect="lift" label="Lift" />
            <Checkbox className="rounded-md px-2 py-1" hoverEffect="scale" label="Scale" />
            <Checkbox className="rounded-md px-2 py-1" hoverEffect="glow" label="Glow" />
            <Checkbox className="rounded-md px-2 py-1" hoverEffect="shine" label="Shine" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Checkbox transition="fade" label="Fade" defaultChecked />
<Checkbox transition="slide-up" label="Slide up" defaultChecked />
<Checkbox transition="slide-right" transitionDelay={100} label="Slide right" defaultChecked />
<Checkbox transition="zoom" label="Zoom" defaultChecked />
<Checkbox transition="flip" label="Flip" defaultChecked />
<Checkbox transition="blur" label="Blur" defaultChecked />
<Checkbox transition="bounce" label="Bounce" defaultChecked />
<Checkbox transition="drop" transitionDuration={700} label="Drop" defaultChecked />

<Checkbox hoverEffect="lift" label="Lift" />
<Checkbox hoverEffect="scale" label="Scale" />
<Checkbox hoverEffect="glow" label="Glow" />
<Checkbox hoverEffect="shine" label="Shine" />`,
              js: `<l-Checkbox transition="fade" label="Fade" defaultChecked></l-Checkbox>
<l-Checkbox transition="slide-up" label="Slide up" defaultChecked></l-Checkbox>
<l-Checkbox transition="slide-right" transitionDelay="100" label="Slide right" defaultChecked></l-Checkbox>
<l-Checkbox transition="zoom" label="Zoom" defaultChecked></l-Checkbox>
<l-Checkbox transition="flip" label="Flip" defaultChecked></l-Checkbox>
<l-Checkbox transition="blur" label="Blur" defaultChecked></l-Checkbox>
<l-Checkbox transition="bounce" label="Bounce" defaultChecked></l-Checkbox>
<l-Checkbox transition="drop" transitionDuration="700" label="Drop" defaultChecked></l-Checkbox>

<l-Checkbox hoverEffect="lift" label="Lift"></l-Checkbox>
<l-Checkbox hoverEffect="scale" label="Scale"></l-Checkbox>
<l-Checkbox hoverEffect="glow" label="Glow"></l-Checkbox>
<l-Checkbox hoverEffect="shine" label="Shine"></l-Checkbox>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Checkbox transition="fade" label="Fade" defaultChecked></l-Checkbox>
  <l-Checkbox transition="slide-up" label="Slide up" defaultChecked></l-Checkbox>
  <l-Checkbox transition="slide-right" transitionDelay="100" label="Slide right" defaultChecked></l-Checkbox>
  <l-Checkbox transition="zoom" label="Zoom" defaultChecked></l-Checkbox>
  <l-Checkbox transition="flip" label="Flip" defaultChecked></l-Checkbox>
  <l-Checkbox transition="blur" label="Blur" defaultChecked></l-Checkbox>
  <l-Checkbox transition="bounce" label="Bounce" defaultChecked></l-Checkbox>
  <l-Checkbox transition="drop" transitionDuration="700" label="Drop" defaultChecked></l-Checkbox>

  <l-Checkbox hoverEffect="lift" label="Lift"></l-Checkbox>
  <l-Checkbox hoverEffect="scale" label="Scale"></l-Checkbox>
  <l-Checkbox hoverEffect="glow" label="Glow"></l-Checkbox>
  <l-Checkbox hoverEffect="shine" label="Shine"></l-Checkbox>
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
    <l-Checkbox transition="fade" label="Fade" defaultChecked></l-Checkbox>
    <l-Checkbox transition="slide-up" label="Slide up" defaultChecked></l-Checkbox>
    <l-Checkbox transition="slide-right" transitionDelay="100" label="Slide right" defaultChecked></l-Checkbox>
    <l-Checkbox transition="zoom" label="Zoom" defaultChecked></l-Checkbox>
    <l-Checkbox transition="flip" label="Flip" defaultChecked></l-Checkbox>
    <l-Checkbox transition="blur" label="Blur" defaultChecked></l-Checkbox>
    <l-Checkbox transition="bounce" label="Bounce" defaultChecked></l-Checkbox>
    <l-Checkbox transition="drop" transitionDuration="700" label="Drop" defaultChecked></l-Checkbox>

    <l-Checkbox hoverEffect="lift" label="Lift"></l-Checkbox>
    <l-Checkbox hoverEffect="scale" label="Scale"></l-Checkbox>
    <l-Checkbox hoverEffect="glow" label="Glow"></l-Checkbox>
    <l-Checkbox hoverEffect="shine" label="Shine"></l-Checkbox>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={checkedNote}>Data binding</SectionLabel>
          <CodeBlock
            variants={{
              react: `const [agreed, setAgreed] = useState(false);

<Checkbox label="I agree" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />

// or uncontrolled
<Checkbox label="I agree" defaultChecked onChange={(e) => save(e.target.checked)} />`,
              js: `<l-Checkbox label="I agree"></l-Checkbox>

<script type="module">
  import "lojee-ui/elements";

  const box = document.querySelector("l-checkbox");
  box.addEventListener("update", (e) => (state.agreed = e.detail)); // true | false
  box.checked = true; // push a value in at any time
</script>`,
              vue: `<template>
  <l-checkbox label="I agree" :checked.prop="agreed" @update="(e) => (agreed = e.detail)" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";
const agreed = ref(false);
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-checkbox label="I agree" [checked]="agreed" (update)="agreed = $any($event).detail"></l-checkbox>\`,
})
export class AppComponent {
  agreed = false;
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
