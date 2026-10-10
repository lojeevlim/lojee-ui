import { useState } from "react";
import { PasswordInput } from "../PasswordInput";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";
import { useFormEventsNote } from "../../../../core/bindingNotes";

export default function PasswordInputShowcase() {
  const eventsNote = useFormEventsNote();
  const [password, setPassword] = useState("hunter2");

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">PasswordInput</h1>
          <p className="text-sm text-fg-subtle mt-1">A password field with a show/hide toggle button.</p>
        </div>

        <section>
          <SectionLabel sub="Click the eye icon to reveal the value — internal state, no extra prop needed.">Basic</SectionLabel>
          <div className="max-w-sm">
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </div>
          <CodeBlock
            variants={{
              react: `const [password, setPassword] = useState("");

<PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />`,
              js: `<l-password-input id="password" placeholder="Password"></l-password-input>

<script type="module">
  import "lojee-ui/elements";

  const password = document.getElementById("password");
  password.value = "hunter2";
  password.addEventListener("input", (e) => { /* e.target.value */ });
</script>`,
              vue: `<template>
  <l-password-input :value="password" @input="password = $event.target.value" placeholder="Password" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const password = ref("hunter2");
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-password-input [value]="password" (input)="password = $any($event.target).value" placeholder="Password" />
  \`,
})
export class AppComponent {
  password = "hunter2";
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <div className="max-w-sm space-y-3">
            <PasswordInput size="sm" placeholder="Small" />
            <PasswordInput size="md" placeholder="Medium" />
            <PasswordInput size="lg" placeholder="Large" />
          </div>
          <CodeBlock
            variants={{
              react: `<PasswordInput size="sm" placeholder="Small" />
<PasswordInput size="md" placeholder="Medium" />
<PasswordInput size="lg" placeholder="Large" />`,
              js: `<l-password-input size="sm" placeholder="Small"></l-password-input>
<l-password-input size="md" placeholder="Medium"></l-password-input>
<l-password-input size="lg" placeholder="Large"></l-password-input>`,
              vue: `<template>
  <l-password-input size="sm" placeholder="Small" />
  <l-password-input size="md" placeholder="Medium" />
  <l-password-input size="lg" placeholder="Large" />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-password-input size="sm" placeholder="Small" />
<l-password-input size="md" placeholder="Medium" />
<l-password-input size="lg" placeholder="Large" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same red-border affordance as every other form field in this library.">Invalid</SectionLabel>
          <div className="max-w-sm">
            <PasswordInput invalid defaultValue="short" placeholder="Password" />
          </div>
          <CodeBlock
            variants={{
              react: `<PasswordInput invalid defaultValue="short" placeholder="Password" />`,
              js: `<l-password-input invalid placeholder="Password"></l-password-input>`,
              vue: `<l-password-input invalid placeholder="Password" />`,
              angular: `<l-password-input invalid placeholder="Password" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same disabled affordance as native inputs.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <PasswordInput disabled placeholder="Disabled" />
          </div>
          <CodeBlock
            variants={{
              react: `<PasswordInput disabled placeholder="Disabled" />`,
              js: `<l-password-input disabled placeholder="Disabled"></l-password-input>`,
              vue: `<l-password-input disabled placeholder="Disabled" />`,
              angular: `<l-password-input disabled placeholder="Disabled" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="max-w-2xl">
            <TransitionPreview cols={2}>
            <PasswordInput transition="fade" placeholder="Password" />
            <PasswordInput transition="slide-up" placeholder="Password" />
            <PasswordInput transition="slide-right" transitionDelay={100} placeholder="Password" />
            <PasswordInput transition="zoom" placeholder="Password" />
            <PasswordInput transition="flip" placeholder="Password" />
            <PasswordInput transition="blur" placeholder="Password" />
            <PasswordInput transition="bounce" placeholder="Password" />
            <PasswordInput transition="drop" transitionDuration={700} placeholder="Password" />
            </TransitionPreview>
          </div>
          <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
            <PasswordInput hoverEffect="lift" placeholder="Password" />
            <PasswordInput hoverEffect="glow" placeholder="Password" />
            <PasswordInput hoverEffect="ring" placeholder="Password" />
          </div>
          <CodeBlock
            variants={{
              react: `<PasswordInput transition="fade" placeholder="Password" />
<PasswordInput transition="slide-up" placeholder="Password" />
<PasswordInput transition="slide-right" transitionDelay={100} placeholder="Password" />
<PasswordInput transition="zoom" placeholder="Password" />
<PasswordInput transition="flip" placeholder="Password" />
<PasswordInput transition="blur" placeholder="Password" />
<PasswordInput transition="bounce" placeholder="Password" />
<PasswordInput transition="drop" transitionDuration={700} placeholder="Password" />

<PasswordInput hoverEffect="lift" placeholder="Password" />
<PasswordInput hoverEffect="glow" placeholder="Password" />
<PasswordInput hoverEffect="ring" placeholder="Password" />`,
              js: `<l-password-input transition="fade" placeholder="Password"></l-password-input>
<l-password-input transition="slide-up" placeholder="Password"></l-password-input>
<l-password-input transition="slide-right" transitionDelay="100" placeholder="Password"></l-password-input>
<l-password-input transition="zoom" placeholder="Password"></l-password-input>
<l-password-input transition="flip" placeholder="Password"></l-password-input>
<l-password-input transition="blur" placeholder="Password"></l-password-input>
<l-password-input transition="bounce" placeholder="Password"></l-password-input>
<l-password-input transition="drop" transitionDuration="700" placeholder="Password"></l-password-input>

<l-password-input hoverEffect="lift" placeholder="Password"></l-password-input>
<l-password-input hoverEffect="glow" placeholder="Password"></l-password-input>
<l-password-input hoverEffect="ring" placeholder="Password"></l-password-input>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-password-input transition="fade" placeholder="Password"></l-password-input>
  <l-password-input transition="slide-up" placeholder="Password"></l-password-input>
  <l-password-input transition="slide-right" transitionDelay="100" placeholder="Password"></l-password-input>
  <l-password-input transition="zoom" placeholder="Password"></l-password-input>
  <l-password-input transition="flip" placeholder="Password"></l-password-input>
  <l-password-input transition="blur" placeholder="Password"></l-password-input>
  <l-password-input transition="bounce" placeholder="Password"></l-password-input>
  <l-password-input transition="drop" transitionDuration="700" placeholder="Password"></l-password-input>

  <l-password-input hoverEffect="lift" placeholder="Password"></l-password-input>
  <l-password-input hoverEffect="glow" placeholder="Password"></l-password-input>
  <l-password-input hoverEffect="ring" placeholder="Password"></l-password-input>
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
    <l-password-input transition="fade" placeholder="Password"></l-password-input>
    <l-password-input transition="slide-up" placeholder="Password"></l-password-input>
    <l-password-input transition="slide-right" transitionDelay="100" placeholder="Password"></l-password-input>
    <l-password-input transition="zoom" placeholder="Password"></l-password-input>
    <l-password-input transition="flip" placeholder="Password"></l-password-input>
    <l-password-input transition="blur" placeholder="Password"></l-password-input>
    <l-password-input transition="bounce" placeholder="Password"></l-password-input>
    <l-password-input transition="drop" transitionDuration="700" placeholder="Password"></l-password-input>

    <l-password-input hoverEffect="lift" placeholder="Password"></l-password-input>
    <l-password-input hoverEffect="glow" placeholder="Password"></l-password-input>
    <l-password-input hoverEffect="ring" placeholder="Password"></l-password-input>
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
              react: `<PasswordInput required placeholder="Password"
  onChange={(e) => console.log("update", e.target.value)}
  onInput={(e) => console.log("input", e.currentTarget.value)}
  onFocus={() => console.log("focus")}
  onInvalid={(e) => console.log("invalid", e.currentTarget.validationMessage)}
/>`,
              js: `<l-password-input required="true" placeholder="Password"></l-password-input>

<script type="module">
  import "lojee-ui/elements";

  const el = document.querySelector("l-password-input");
  el.addEventListener("update", (e) => console.log("update", e.detail)); // string
  el.addEventListener("input", (e) => console.log("input", e.detail));
  el.addEventListener("focus", (e) => console.log("focus", e.detail));
  el.addEventListener("invalid", (e) => console.log("invalid", e.detail)); // the validation message
</script>`,
              vue: `<template>
  <l-password-input required="true" placeholder="Password"
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
    <l-password-input required="true" placeholder="Password"
      (update)="onUpdate($any($event).detail)"
      (input)="onInput($any($event).detail)"
      (focus)="onFocus()"
      (invalid)="onInvalid($any($event).detail)"
    ></l-password-input>
  \`,
})
export class AppComponent {
  onUpdate(value: string) {}
  onInput(value: string) {}
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
