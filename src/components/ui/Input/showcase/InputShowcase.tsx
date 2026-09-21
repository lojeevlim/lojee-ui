import { useState } from "react";
import { Input } from "../Input";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function InputShowcase() {
  const [email, setEmail] = useState("");
  const isInvalidEmail = email.length > 0 && !email.includes("@");

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Input</h1>
          <p className="text-sm text-slate-500 mt-1">A text input wrapping the native &lt;input&gt; element.</p>
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
              js: `<l-Input size="sm" placeholder="Small" />
<l-Input size="md" placeholder="Medium" />
<l-Input size="lg" placeholder="Large" />

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Input size="sm" placeholder="Small" />
  <l-Input size="md" placeholder="Medium" />
  <l-Input size="lg" placeholder="Large" />
</template>

<script setup>
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
    <l-Input size="sm" placeholder="Small" />
    <l-Input size="md" placeholder="Medium" />
    <l-Input size="lg" placeholder="Large" />
  \`,
})
export class AppComponent {}`,
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
              js: `<l-Input leadingIcon="mail" placeholder="Email address" />
<l-Input trailingIcon="eye" type="password" placeholder="Password" />
<l-Input leadingIcon="user" trailingIcon="circle-check" placeholder="Username" />`,
              vue: `<template>
  <l-Input leadingIcon="mail" placeholder="Email address" />
  <l-Input trailingIcon="eye" type="password" placeholder="Password" />
  <l-Input leadingIcon="user" trailingIcon="circle-check" placeholder="Username" />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-Input leadingIcon="mail" placeholder="Email address" />
<l-Input trailingIcon="eye" type="password" placeholder="Password" />
<l-Input leadingIcon="user" trailingIcon="circle-check" placeholder="Username" />`,
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
              js: `<l-Input invalid value="not-an-email" leadingIcon="mail" />`,
              vue: `<l-Input invalid value="not-an-email" leadingIcon="mail" />`,
              angular: `<l-Input invalid value="not-an-email" leadingIcon="mail" />`,
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
            {isInvalidEmail && <p className="mt-1.5 text-xs text-rose-600">Must contain an "@".</p>}
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
              js: `<l-Input id="email-input" size="md" placeholder="Type something…" />
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
  <l-Input
    size="md"
    :invalid="isInvalidEmail"
    :value="email"
    @input="email = $event.target.value"
    placeholder="Type something…"
  />
  <p v-if="isInvalidEmail">Must contain an "@".</p>
</template>

<script setup>
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
<l-Input
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
              js: `<l-Input disabled placeholder="Disabled" />`,
              vue: `<l-Input disabled placeholder="Disabled" />`,
              angular: `<l-Input disabled placeholder="Disabled" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
