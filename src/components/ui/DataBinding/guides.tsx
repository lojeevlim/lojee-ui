import type { ReactNode } from "react";
import CodeBlock from "../CodeBlock";
import { Step, P, Code } from "../DocsHelpers";
import type { CodeFramework } from "../../../core/codeFramework";
import { VALUE_ACCESSOR_FILE, VALUE_ACCESSOR_SOURCE, VALUE_ACCESSOR_TAGS } from "./valueAccessorSource";

// A step-by-step data-binding guide per language. Every guide has the same steps so the languages read in parallel.
type GuideStep = { title: string; body: ReactNode; code?: string };

const REACT: GuideStep[] = [
  {
    title: "Set up",
    body: <P>Install <Code>lojee-ui</Code> and import the components. They are plain React components, so there is nothing else to register.</P>,
    code: `import { Input, Checkbox, Modal, Tabs } from "lojee-ui";`,
  },
  {
    title: "Set the state",
    body: <P>Pass the state as a prop: <Code>value</Code> for fields, <Code>checked</Code> for a checkbox, radio or switch, <Code>open</Code> for overlays and <Code>index</Code> for tabs.</P>,
    code: `<Input value={name} />
<Checkbox label="Agree" checked={agree} />
<Modal open={open} heading="Hello" />
<Tabs tabs={tabs} index={tab} />`,
  },
  {
    title: "Read the changes",
    body: <P>Handle the callback and write the new state back. Fields give you the event (<Code>e.target.value</Code> or <Code>e.target.checked</Code>); overlays and navigation give you the state itself.</P>,
    code: `<Input value={name} onChange={(e) => setName(e.target.value)} />
<Checkbox label="Agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
<Modal open={open} onClose={() => setOpen(false)} heading="Hello" />
<Tabs tabs={tabs} index={tab} onChange={setTab} />`,
  },
  {
    title: "Controlled or uncontrolled",
    body: <P>Pass <Code>value</Code> (or <Code>checked</Code>, <Code>open</Code>, <Code>index</Code>) and a callback to own the state. Pass <Code>defaultValue</Code> (or <Code>defaultChecked</Code>, <Code>defaultOpen</Code>, <Code>defaultIndex</Code>) to let the component keep it, and only read changes.</P>,
    code: `<Input defaultValue="Ada" onChange={(e) => save(e.target.value)} />`,
  },
  {
    title: "Worked example",
    body: <P>A field, a checkbox, an overlay and a tab strip in one component, with a live readout of the state.</P>,
    code: `import { useState } from "react";
import { Input, Checkbox, Modal, Tabs, Button } from "lojee-ui";

export default function Example() {
  const [name, setName] = useState("Ada");
  const [agree, setAgree] = useState(false);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const tabs = [{ label: "One", content: "…" }, { label: "Two", content: "…" }];

  return (
    <>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Checkbox label="Agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onClose={() => setOpen(false)} heading="Hello" />
      <Tabs tabs={tabs} index={tab} onChange={setTab} />
      <pre>{JSON.stringify({ name, agree, open, tab })}</pre>
    </>
  );
}`,
  },
  {
    title: "Gotchas",
    body: (
      <ul className="list-disc space-y-1 pl-5 text-sm text-fg-muted">
        <li>Checkbox, Switch and Radio bind <Code>checked</Code>, not <Code>value</Code>.</li>
        <li>Fields hand you the event; Range Slider, Number Input and Tabs hand you the value directly. Range Slider's value is <Code>[low, high]</Code>.</li>
        <li>Passing <Code>value</Code> without a callback makes the field read-only from the user's point of view.</li>
      </ul>
    ),
  },
];

const JS: GuideStep[] = [
  {
    title: "Set up",
    body: <P>Install <Code>lojee-ui</Code> and import <Code>lojee-ui/elements</Code> once. It registers every <Code>&lt;l-*&gt;</Code> element. Boolean attributes need an explicit value, like <Code>required="true"</Code>.</P>,
    code: `import "lojee-ui/elements";`,
  },
  {
    title: "Set the state",
    body: <P>Assign the property on the element: <Code>value</Code>, <Code>checked</Code>, <Code>open</Code> or <Code>index</Code>. Objects and arrays (like <Code>tabs</Code>) are assigned as real values, not attributes.</P>,
    code: `const input = document.querySelector("l-input");
input.value = "Ada";

const modal = document.querySelector("l-modal");
modal.open = true;

const tabs = document.querySelector("l-tabs");
tabs.tabs = [{ label: "One", content: "…" }, { label: "Two", content: "…" }];
tabs.index = 1;`,
  },
  {
    title: "Read the changes",
    body: <P>Listen for the <Code>update</Code> event. Its <Code>detail</Code> is the new state: the value, a boolean, or an index. Form fields also fire <Code>input</Code>, <Code>focus</Code> and <Code>invalid</Code>.</P>,
    code: `input.addEventListener("update", (e) => (state.name = e.detail));
modal.addEventListener("update", (e) => (state.open = e.detail)); // false when it is closed
tabs.addEventListener("update", (e) => (state.tab = e.detail));`,
  },
  {
    title: "Controlled or uncontrolled",
    body: <P>The element keeps its own state, so you can ignore it and only listen. Assign the property again whenever you want to move it from outside.</P>,
    code: `tabs.index = 0; // jump back to the first tab`,
  },
  {
    title: "Worked example",
    body: <P>The same four controls as the other guides, with a small <Code>render()</Code> that shows the state.</P>,
    code: `<l-input></l-input>
<l-checkbox label="Agree"></l-checkbox>
<l-button id="open">Open</l-button>
<l-modal heading="Hello"></l-modal>
<l-tabs></l-tabs>
<pre id="out"></pre>

<script type="module">
  import "lojee-ui/elements";

  const $ = (s) => document.querySelector(s);
  const state = { name: "Ada", agree: false, open: false, tab: 0 };
  const render = () => ($("#out").textContent = JSON.stringify(state));

  $("l-input").value = state.name;
  $("l-input").addEventListener("update", (e) => { state.name = e.detail; render(); });

  $("l-checkbox").checked = state.agree;
  $("l-checkbox").addEventListener("update", (e) => { state.agree = e.detail; render(); });

  $("#open").addEventListener("click", () => { $("l-modal").open = true; state.open = true; render(); });
  $("l-modal").addEventListener("update", (e) => { state.open = e.detail; render(); });

  $("l-tabs").tabs = [{ label: "One", content: "…" }, { label: "Two", content: "…" }];
  $("l-tabs").addEventListener("update", (e) => { state.tab = e.detail; render(); });

  render();
</script>`,
  },
  {
    title: "Gotchas",
    body: (
      <ul className="list-disc space-y-1 pl-5 text-sm text-fg-muted">
        <li>Checkbox, Switch and Radio bind <Code>checked</Code>, not <Code>value</Code>.</li>
        <li>Set objects and arrays as properties, never as attributes.</li>
        <li><Code>detail</Code> is the new state; Range Slider's is <Code>[low, high]</Code>.</li>
      </ul>
    ),
  },
];

const VUE: GuideStep[] = [
  {
    title: "Set up",
    body: <P>Import <Code>lojee-ui/elements</Code> once, and tell Vue that <Code>l-*</Code> tags are custom elements so it does not try to resolve them as components.</P>,
    code: `// vite.config.ts
import vue from "@vitejs/plugin-vue";
export default {
  plugins: [vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith("l-") } } })],
};

// main.ts
import "lojee-ui/elements";`,
  },
  {
    title: "Set the state",
    body: <P>Bind with <Code>:prop.prop</Code> so Vue sets the DOM property (a real value) instead of an attribute (a string). This matters for objects, arrays, numbers and booleans.</P>,
    code: `<l-input :value.prop="name" />
<l-checkbox label="Agree" :checked.prop="agree" />
<l-modal heading="Hello" :open.prop="open" />
<l-tabs :tabs.prop="tabs" :index.prop="tab" />`,
  },
  {
    title: "Read the changes",
    body: <P>Listen with <Code>@update</Code> and write <Code>e.detail</Code> back into your state.</P>,
    code: `<l-input :value.prop="name" @update="(e) => (name = e.detail)" />
<l-checkbox label="Agree" :checked.prop="agree" @update="(e) => (agree = e.detail)" />
<l-modal heading="Hello" :open.prop="open" @update="(e) => (open = e.detail)" />
<l-tabs :tabs.prop="tabs" :index.prop="tab" @update="(e) => (tab = e.detail)" />`,
  },
  {
    title: "v-model shortcut",
    body: <P><Code>v-model</Code> works on the text-style fields (Input, Textarea, Password Input, Search Input). For everything else, bind <Code>:prop.prop</Code> and listen to <Code>@update</Code>.</P>,
    code: `<l-input v-model="name" />`,
  },
  {
    title: "Worked example",
    body: <P>A single-file component with the four controls and a live readout.</P>,
    code: `<template>
  <l-input v-model="name" />
  <l-checkbox label="Agree" :checked.prop="agree" @update="(e) => (agree = e.detail)" />
  <l-button @click="open = true">Open</l-button>
  <l-modal heading="Hello" :open.prop="open" @update="(e) => (open = e.detail)" />
  <l-tabs :tabs.prop="tabs" :index.prop="tab" @update="(e) => (tab = e.detail)" />
  <pre>{{ { name, agree, open, tab } }}</pre>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const name = ref("Ada");
const agree = ref(false);
const open = ref(false);
const tab = ref(0);
const tabs = [{ label: "One", content: "…" }, { label: "Two", content: "…" }];
</script>`,
  },
  {
    title: "Gotchas",
    body: (
      <ul className="list-disc space-y-1 pl-5 text-sm text-fg-muted">
        <li>Always use <Code>.prop</Code> for anything that is not a plain string.</li>
        <li>Checkbox, Switch and Radio bind <Code>checked</Code>, not <Code>value</Code>, so <Code>v-model</Code> does not apply to them.</li>
        <li>Boolean attributes need an explicit value, like <Code>required="true"</Code>.</li>
      </ul>
    ),
  },
];

const ANGULAR: GuideStep[] = [
  {
    title: "Set up",
    body: <P>Import <Code>lojee-ui/elements</Code> once and add <Code>CUSTOM_ELEMENTS_SCHEMA</Code> to every component (or module) that uses <Code>&lt;l-*&gt;</Code> tags.</P>,
    code: `import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({ selector: "app-root", standalone: true, schemas: [CUSTOM_ELEMENTS_SCHEMA], template: \`…\` })
export class AppComponent {}`,
  },
  {
    title: "Set the state",
    body: <P>Bind with <Code>[prop]</Code>. Angular sets the DOM property, so objects, arrays, numbers and booleans pass through as real values.</P>,
    code: `<l-input [value]="name"></l-input>
<l-checkbox label="Agree" [checked]="agree"></l-checkbox>
<l-modal heading="Hello" [open]="open"></l-modal>
<l-tabs [tabs]="tabs" [index]="tab"></l-tabs>`,
  },
  {
    title: "Read the changes",
    body: <P>Listen with <Code>(update)</Code> and write <Code>$any($event).detail</Code> back into your state. <Code>$any</Code> is needed because Angular types the event as a plain <Code>Event</Code>.</P>,
    code: `<l-input [value]="name" (update)="name = $any($event).detail"></l-input>
<l-checkbox label="Agree" [checked]="agree" (update)="agree = $any($event).detail"></l-checkbox>
<l-modal heading="Hello" [open]="open" (update)="open = $any($event).detail"></l-modal>
<l-tabs [tabs]="tabs" [index]="tab" (update)="tab = $any($event).detail"></l-tabs>`,
  },
  {
    title: "ngModel and forms",
    body: (
      <>
        <P>
          For <Code>[(ngModel)]</Code>, <Code>[formControl]</Code> and <Code>formControlName</Code>, copy this small directive into your app and add it to the component's <Code>imports</Code>. Angular only compiles directives that belong to the app, so it cannot ship in the package. It works on: {VALUE_ACCESSOR_TAGS.join(", ")}.
        </P>
      </>
    ),
    code: `// ${VALUE_ACCESSOR_FILE}\n${VALUE_ACCESSOR_SOURCE}\n// template:\n//   <l-input [(ngModel)]="name"></l-input>\n//   <l-checkbox label="Agree" [(ngModel)]="agree"></l-checkbox>\n//   <l-input [formControl]="control"></l-input>`,
  },
  {
    title: "Worked example",
    body: <P>A standalone component with the four controls and a live readout.</P>,
    code: `import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { JsonPipe } from "@angular/common";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [JsonPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-input [value]="name" (update)="name = $any($event).detail"></l-input>
    <l-checkbox label="Agree" [checked]="agree" (update)="agree = $any($event).detail"></l-checkbox>
    <l-button (click)="open = true">Open</l-button>
    <l-modal heading="Hello" [open]="open" (update)="open = $any($event).detail"></l-modal>
    <l-tabs [tabs]="tabs" [index]="tab" (update)="tab = $any($event).detail"></l-tabs>
    <pre>{{ { name, agree, open, tab } | json }}</pre>
  \`,
})
export class AppComponent {
  name = "Ada";
  agree = false;
  open = false;
  tab = 0;
  tabs = [{ label: "One", content: "…" }, { label: "Two", content: "…" }];
}`,
  },
  {
    title: "Gotchas",
    body: (
      <ul className="list-disc space-y-1 pl-5 text-sm text-fg-muted">
        <li>Without <Code>CUSTOM_ELEMENTS_SCHEMA</Code>, Angular rejects the <Code>l-*</Code> tags and their bindings.</li>
        <li>Checkbox, Switch and Radio bind <Code>checked</Code>, not <Code>value</Code>.</li>
        <li><Code>detail</Code> is the new state; Range Slider's is <Code>[low, high]</Code>. Boolean attributes need an explicit value, like <Code>required="true"</Code>.</li>
      </ul>
    ),
  },
];

const GUIDES: Record<CodeFramework, { title: string; sub: string; steps: GuideStep[] }> = {
  react: { title: "React guide", sub: "Controlled props and callbacks.", steps: REACT },
  js: { title: "Plain JS/TS guide", sub: "Properties and the update event on the <l-*> elements.", steps: JS },
  vue: { title: "Vue guide", sub: "Custom elements with :prop.prop, @update and v-model.", steps: VUE },
  angular: { title: "Angular guide", sub: "Custom elements with [prop], (update) and ngModel.", steps: ANGULAR },
};

export function guideTitle(framework: CodeFramework): { title: string; sub: string } {
  return GUIDES[framework];
}

export default function BindingGuide({ framework }: { framework: CodeFramework }) {
  const { steps } = GUIDES[framework];
  return (
    <div className="space-y-8">
      {steps.map((s, i) => (
        <Step key={s.title} n={i + 1} title={s.title}>
          {s.body}
          {s.code && <CodeBlock variants={{ [framework]: s.code }} />}
        </Step>
      ))}
    </div>
  );
}
