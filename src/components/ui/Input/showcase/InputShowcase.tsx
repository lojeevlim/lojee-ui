import { useState } from "react";
import { Input } from "../Input";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";
import { useFormEventsNote } from "../../../../core/bindingNotes";
import { useCodeFramework, type CodeFramework } from "../../../../core/codeFramework";

const BINDING_NOTES: Record<CodeFramework, string> = {
  react: "Two-way binding. The field is controlled (value + onChange) or uncontrolled (defaultValue).",
  js: "Two-way binding. Set value (attribute or property) to push a value in — the user can still type, and the field follows later changes — and listen to input / update to read changes back (detail = the value).",
  vue: "Two-way binding. v-model works, or bind :value.prop and write the change back from @update (detail = the value). The user can still type, and the field follows later changes.",
  angular: "Two-way binding. Bind [value] and write the change back from (update) (detail = the value) — or use [(ngModel)] with the LojeeValueAccessor directive from the Data Binding page. The user can still type, and the field follows later changes.",
};


export default function InputShowcase() {
  const eventsNote = useFormEventsNote();
  const { framework } = useCodeFramework();
  const [email, setEmail] = useState("");
  const isInvalidEmail = email.length > 0 && !email.includes("@");

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Input</h1>
          <p className="text-sm text-fg-subtle mt-1">A text input wrapping the native &lt;input&gt; element.</p>
        </div>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <div className="max-w-sm space-y-3">
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium" />
            <Input size="lg" placeholder="Large" />
          </div>
          <CodeBlock
            variants={{
              react: `<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`,
              js: `<l-input size="sm" placeholder="Small"></l-input>
<l-input size="md" placeholder="Medium"></l-input>
<l-input size="lg" placeholder="Large"></l-input>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-input size="sm" placeholder="Small" />
  <l-input size="md" placeholder="Medium" />
  <l-input size="lg" placeholder="Large" />
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
    <l-input size="sm" placeholder="Small" />
    <l-input size="md" placeholder="Medium" />
    <l-input size="lg" placeholder="Large" />
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub='outline (default), filled, underline, soft and plain (just the text, no box) — also on Textarea, PasswordInput and SearchInput.'>Variants</SectionLabel>
          <div className="max-w-sm space-y-3">
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">outline</p>
              <Input variant="outline" placeholder="Outline" />
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">filled</p>
              <Input variant="filled" placeholder="Filled" />
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">underline</p>
              <Input variant="underline" placeholder="Underline" />
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">soft</p>
              <Input variant="soft" placeholder="Soft" />
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">plain</p>
              <Input variant="plain" placeholder="Plain" />
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Input variant="outline" placeholder="Outline" />
<Input variant="filled" placeholder="Filled" />
<Input variant="underline" placeholder="Underline" />
<Input variant="soft" placeholder="Soft" />
<Input variant="plain" placeholder="Plain" />`,
              js: `<l-input variant="outline" placeholder="Outline"></l-input>
<l-input variant="filled" placeholder="Filled"></l-input>
<l-input variant="underline" placeholder="Underline"></l-input>
<l-input variant="soft" placeholder="Soft"></l-input>
<l-input variant="plain" placeholder="Plain"></l-input>`,
              vue: `<template>
  <l-input variant="outline" placeholder="Outline" />
  <l-input variant="filled" placeholder="Filled" />
  <l-input variant="underline" placeholder="Underline" />
  <l-input variant="soft" placeholder="Soft" />
  <l-input variant="plain" placeholder="Plain" />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-input variant="outline" placeholder="Outline" />
<l-input variant="filled" placeholder="Filled" />
<l-input variant="underline" placeholder="Underline" />
<l-input variant="soft" placeholder="Soft" />
<l-input variant="plain" placeholder="Plain" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="An optional icon on either side.">With icons</SectionLabel>
          <div className="max-w-sm space-y-3">
            <Input leadingIcon="mail" placeholder="Email address" />
            <Input trailingIcon="eye" type="password" placeholder="Password" />
            <Input leadingIcon="user" trailingIcon="circle-check" placeholder="Username" />
          </div>
          <CodeBlock
            variants={{
              react: `<Input leadingIcon="mail" placeholder="Email address" />
<Input trailingIcon="eye" type="password" placeholder="Password" />
<Input leadingIcon="user" trailingIcon="circle-check" placeholder="Username" />`,
              js: `<l-input leadingIcon="mail" placeholder="Email address"></l-input>
<l-input trailingIcon="eye" type="password" placeholder="Password"></l-input>
<l-input leadingIcon="user" trailingIcon="circle-check" placeholder="Username"></l-input>`,
              vue: `<template>
  <l-input leadingIcon="mail" placeholder="Email address" />
  <l-input trailingIcon="eye" type="password" placeholder="Password" />
  <l-input leadingIcon="user" trailingIcon="circle-check" placeholder="Username" />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-input leadingIcon="mail" placeholder="Email address" />
<l-input trailingIcon="eye" type="password" placeholder="Password" />
<l-input leadingIcon="user" trailingIcon="circle-check" placeholder="Username" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Swaps to a red border/ring, e.g. after failed validation.">Invalid state</SectionLabel>
          <div className="max-w-sm">
            <Input invalid defaultValue="not-an-email" leadingIcon="mail" />
          </div>
          <CodeBlock
            variants={{
              react: `<Input invalid defaultValue="not-an-email" leadingIcon="mail" />`,
              js: `<l-input invalid value="not-an-email" leadingIcon="mail"></l-input>`,
              vue: `<l-input invalid value="not-an-email" leadingIcon="mail" />`,
              angular: `<l-input invalid value="not-an-email" leadingIcon="mail" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="invalid is a plain boolean — pass any condition, it re-evaluates on every render.">
            Invalid as a live condition
          </SectionLabel>
          <div className="max-w-sm">
            <Input
              size="md"
              invalid={isInvalidEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type something…"
            />
            {isInvalidEmail && <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">Must contain an "@".</p>}
          </div>
          <CodeBlock
            variants={{
              react: `const [email, setEmail] = useState("");
const isInvalidEmail = email.length > 0 && !email.includes("@");

<Input
  size="md"
  invalid={isInvalidEmail}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Type something…"
/>`,
              js: `<l-input id="email-input" size="md" placeholder="Type something…"></l-input>
<p id="email-error" class="hidden">Must contain an "@".</p>

<script type="module">
  const input = document.getElementById("email-input");
  const error = document.getElementById("email-error");

  input.addEventListener("input", (e) => {
    const email = e.target.value;
    const isInvalidEmail = email.length > 0 && !email.includes("@");
    input.invalid = isInvalidEmail;
    error.classList.toggle("hidden", !isInvalidEmail);
  });
</script>`,
              vue: `<template>
  <l-input
    size="md"
    :invalid="isInvalidEmail"
    :value="email"
    @input="email = $event.target.value"
    placeholder="Type something…"
  />
  <p v-if="isInvalidEmail">Must contain an "@".</p>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const email = ref("");
const isInvalidEmail = computed(() => email.value.length > 0 && !email.value.includes("@"));
</script>`,
              angular: `// app.component.ts — add these members to the same AppComponent
email = "";
get isInvalidEmail() {
  return this.email.length > 0 && !this.email.includes("@");
}
onEmailInput(e: Event) {
  this.email = (e.target as HTMLInputElement).value;
}

<!-- app.component.html -->
<l-input
  size="md"
  [invalid]="isInvalidEmail"
  [value]="email"
  (input)="onEmailInput($event)"
  placeholder="Type something…"
 />
<p *ngIf="isInvalidEmail">Must contain an "@".</p>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same disabled affordance as native inputs.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <Input disabled placeholder="Disabled" />
          </div>
          <CodeBlock
            variants={{
              react: `<Input disabled placeholder="Disabled" />`,
              js: `<l-input disabled placeholder="Disabled"></l-input>`,
              vue: `<l-input disabled placeholder="Disabled" />`,
              angular: `<l-input disabled placeholder="Disabled" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="max-w-sm"><TransitionPreview cols={1}>
            <Input transition="fade" placeholder="Fade" />
            <Input transition="slide-up" placeholder="Slide up" />
            <Input transition="slide-right" transitionDelay={100} placeholder="Slide right" />
            <Input transition="zoom" placeholder="Zoom" />
            <Input transition="flip" placeholder="Flip" />
            <Input transition="blur" placeholder="Blur" />
            <Input transition="bounce" placeholder="Bounce" />
            <Input transition="drop" transitionDuration={700} placeholder="Drop" />
          </TransitionPreview></div>
          <div className="max-w-sm space-y-3">
            <Input hoverEffect="lift" placeholder="Lift" />
            <Input hoverEffect="scale" placeholder="Scale" />
            <Input hoverEffect="glow" placeholder="Glow" />
            <Input hoverEffect="ring" placeholder="Ring" />
            <Input hoverEffect="shine" leadingIcon="search" placeholder="Shine (needs an icon)" />
          </div>
          <CodeBlock
            variants={{
              react: `<Input transition="fade" placeholder="Fade" />
<Input transition="slide-up" placeholder="Slide up" />
<Input transition="slide-right" transitionDelay={100} placeholder="Slide right" />
<Input transition="zoom" placeholder="Zoom" />
<Input transition="flip" placeholder="Flip" />
<Input transition="blur" placeholder="Blur" />
<Input transition="bounce" placeholder="Bounce" />
<Input transition="drop" transitionDuration={700} placeholder="Drop" />

<Input hoverEffect="lift" placeholder="Lift" />
<Input hoverEffect="scale" placeholder="Scale" />
<Input hoverEffect="glow" placeholder="Glow" />
<Input hoverEffect="ring" placeholder="Ring" />
<Input hoverEffect="shine" leadingIcon="search" placeholder="Shine (needs an icon)" />`,
              js: `<l-input transition="fade" placeholder="Fade"></l-input>
<l-input transition="slide-up" placeholder="Slide up"></l-input>
<l-input transition="slide-right" transitionDelay="100" placeholder="Slide right"></l-input>
<l-input transition="zoom" placeholder="Zoom"></l-input>
<l-input transition="flip" placeholder="Flip"></l-input>
<l-input transition="blur" placeholder="Blur"></l-input>
<l-input transition="bounce" placeholder="Bounce"></l-input>
<l-input transition="drop" transitionDuration="700" placeholder="Drop"></l-input>

<l-input hoverEffect="lift" placeholder="Lift"></l-input>
<l-input hoverEffect="scale" placeholder="Scale"></l-input>
<l-input hoverEffect="glow" placeholder="Glow"></l-input>
<l-input hoverEffect="ring" placeholder="Ring"></l-input>
<l-input hoverEffect="shine" leadingIcon="search" placeholder="Shine (needs an icon)"></l-input>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-input transition="fade" placeholder="Fade"></l-input>
  <l-input transition="slide-up" placeholder="Slide up"></l-input>
  <l-input transition="slide-right" transitionDelay="100" placeholder="Slide right"></l-input>
  <l-input transition="zoom" placeholder="Zoom"></l-input>
  <l-input transition="flip" placeholder="Flip"></l-input>
  <l-input transition="blur" placeholder="Blur"></l-input>
  <l-input transition="bounce" placeholder="Bounce"></l-input>
  <l-input transition="drop" transitionDuration="700" placeholder="Drop"></l-input>

  <l-input hoverEffect="lift" placeholder="Lift"></l-input>
  <l-input hoverEffect="scale" placeholder="Scale"></l-input>
  <l-input hoverEffect="glow" placeholder="Glow"></l-input>
  <l-input hoverEffect="ring" placeholder="Ring"></l-input>
  <l-input hoverEffect="shine" leadingIcon="search" placeholder="Shine (needs an icon)"></l-input>
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
    <l-input transition="fade" placeholder="Fade"></l-input>
    <l-input transition="slide-up" placeholder="Slide up"></l-input>
    <l-input transition="slide-right" transitionDelay="100" placeholder="Slide right"></l-input>
    <l-input transition="zoom" placeholder="Zoom"></l-input>
    <l-input transition="flip" placeholder="Flip"></l-input>
    <l-input transition="blur" placeholder="Blur"></l-input>
    <l-input transition="bounce" placeholder="Bounce"></l-input>
    <l-input transition="drop" transitionDuration="700" placeholder="Drop"></l-input>

    <l-input hoverEffect="lift" placeholder="Lift"></l-input>
    <l-input hoverEffect="scale" placeholder="Scale"></l-input>
    <l-input hoverEffect="glow" placeholder="Glow"></l-input>
    <l-input hoverEffect="ring" placeholder="Ring"></l-input>
    <l-input hoverEffect="shine" leadingIcon="search" placeholder="Shine (needs an icon)"></l-input>
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
              react: `<Input required placeholder="Email"
  onChange={(e) => console.log("update", e.target.value)}
  onInput={(e) => console.log("input", e.currentTarget.value)}
  onFocus={() => console.log("focus")}
  onInvalid={(e) => console.log("invalid", e.currentTarget.validationMessage)}
/>`,
              js: `<l-input required="true" placeholder="Email"></l-input>

<script type="module">
  import "lojee-ui/elements";

  const el = document.querySelector("l-input");
  el.addEventListener("update", (e) => console.log("update", e.detail)); // string
  el.addEventListener("input", (e) => console.log("input", e.detail));
  el.addEventListener("focus", (e) => console.log("focus", e.detail));
  el.addEventListener("invalid", (e) => console.log("invalid", e.detail)); // the validation message
</script>`,
              vue: `<template>
  <l-input required="true" placeholder="Email"
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
    <l-input required="true" placeholder="Email"
      (update)="onUpdate($any($event).detail)"
      (input)="onInput($any($event).detail)"
      (focus)="onFocus()"
      (invalid)="onInvalid($any($event).detail)"
    ></l-input>
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

        <section>
          <SectionLabel sub={BINDING_NOTES[framework]}>Data binding</SectionLabel>
          <CodeBlock
            variants={{
              react: `const [name, setName] = useState("Ada");

// controlled: the state is the source of truth
<Input value={name} onChange={(e) => setName(e.target.value)} />

// or uncontrolled: it keeps its own value, you read it when you need it
<Input defaultValue="Ada" onChange={(e) => save(e.target.value)} />`,
              js: `<l-input value="Ada"></l-input>

<script type="module">
  import "lojee-ui/elements";

  const field = document.querySelector("l-input");
  field.addEventListener("input", (e) => (state.name = e.detail)); // read changes while typing (or "update" when committed)
  field.value = "Grace"; // push a value in at any time
</script>`,
              vue: `<template>
  <!-- value goes in as a property, changes come back through the event -->
  <l-input :value.prop="name" @input="(e) => (name = e.detail)" />
  <p>Hello {{ name }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";
const name = ref("Ada");
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-input [value]="name" (input)="name = $any($event).detail"></l-input>
    <p>Hello {{ name }}</p>
  \`,
})
export class AppComponent {
  name = "Ada";
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
