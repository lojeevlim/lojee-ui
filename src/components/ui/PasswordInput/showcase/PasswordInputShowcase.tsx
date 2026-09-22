import { useState } from "react";
import { PasswordInput } from "../PasswordInput";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function PasswordInputShowcase() {
  const [password, setPassword] = useState("hunter2");

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">PasswordInput</h1>
          <p className="text-sm text-slate-500 mt-1">A password field with a show/hide toggle button.</p>
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
              js: `<l-PasswordInput id="password" placeholder="Password" />

<script type="module">
  import "lojee-ui/elements";

  const password = document.getElementById("password");
  password.value = "hunter2";
  password.addEventListener("input", (e) => { /* e.target.value */ });
</script>`,
              vue: `<template>
  <l-PasswordInput :value="password" @input="password = $event.target.value" placeholder="Password" />
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
    <l-PasswordInput [value]="password" (input)="password = $any($event.target).value" placeholder="Password" />
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
              js: `<l-PasswordInput size="sm" placeholder="Small" />
<l-PasswordInput size="md" placeholder="Medium" />
<l-PasswordInput size="lg" placeholder="Large" />`,
              vue: `<template>
  <l-PasswordInput size="sm" placeholder="Small" />
  <l-PasswordInput size="md" placeholder="Medium" />
  <l-PasswordInput size="lg" placeholder="Large" />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-PasswordInput size="sm" placeholder="Small" />
<l-PasswordInput size="md" placeholder="Medium" />
<l-PasswordInput size="lg" placeholder="Large" />`,
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
              js: `<l-PasswordInput invalid placeholder="Password" />`,
              vue: `<l-PasswordInput invalid placeholder="Password" />`,
              angular: `<l-PasswordInput invalid placeholder="Password" />`,
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
              js: `<l-PasswordInput disabled placeholder="Disabled" />`,
              vue: `<l-PasswordInput disabled placeholder="Disabled" />`,
              angular: `<l-PasswordInput disabled placeholder="Disabled" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
