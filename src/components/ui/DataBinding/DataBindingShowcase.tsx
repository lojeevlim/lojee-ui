import CodeBlock from "../CodeBlock";
import { useCodeFramework, type CodeFramework } from "../../../core/codeFramework";
import { SectionLabel } from "../ShowcaseHelpers";
import { VALUE_ACCESSOR_FILE, VALUE_ACCESSOR_SOURCE, VALUE_ACCESSOR_TAGS } from "./valueAccessorSource";

// One row per component: how to set its state from outside and how to read it back — in React, and as a web component (Vue / Angular / JS).
// "Set" is a prop (attribute or property on the element); "read" is the callback in React and the event on the element.
type Row = { component: string; set: string; react: string; event: string };

const GROUPS: { title: string; note: string; rows: Row[] }[] = [
  {
    title: "Fields — the value",
    note: "Set value (checked for a checkbox, radio or switch) to push a value in; the field is still editable. Read it back from update (the value was committed) or input (while it changes). detail is the new value.",
    rows: [
      { component: "Input · Textarea · Password Input · Search Input", set: "value / defaultValue", react: "onChange(e) → e.target.value", event: "update · input — detail: string" },
      { component: "Checkbox · Switch / Toggle", set: "checked / defaultChecked", react: "onChange(e) → e.target.checked", event: "update · input — detail: boolean" },
      { component: "Radio Group", set: "checked (per radio) · name", react: "onChange(e) → e.target.value", event: "update · input — detail: the radio's value" },
      { component: "Select", set: "value · options", react: "onChange(e) → e.target.value", event: "update — detail: string" },
      { component: "Date Picker · Time Picker", set: "value", react: "onChange(e) → e.target.value", event: "update · input — detail: string" },
      { component: "Slider", set: "value", react: "onChange(e) → Number(e.target.value)", event: "update · input — detail: number" },
      { component: "Range Slider", set: "value: [low, high]", react: "onChange([low, high])", event: "update (and change) — detail: [number, number]" },
      { component: "Number Input", set: "value", react: "onChange(number)", event: "update (and change) — detail: number" },
      { component: "Combobox · Multi Select · Tag Input · OTP Input · Rating · Color Picker", set: "value", react: "onChange(value)", event: "update (and change) — detail: the value (string, string[], number or #rrggbb)" },
      { component: "File Upload", set: "—", react: "onFilesSelected(files)", event: "filesselected — detail: FileList" },
    ],
  },
  {
    title: "Overlays — open / closed",
    note: "Set open to show or hide it. When the user closes it (X button, Escape, outside click) it reports it, so you can set your own state back to false.",
    rows: [
      { component: "Modal / Dialog · Drawer · Sheet · Alert Dialog · Command Menu", set: "open", react: "onClose()", event: "close · update — update's detail is false" },
      { component: "Toast", set: "open", react: "onClose()", event: "close · update — detail: false" },
      { component: "Popover · Dropdown Menu · Context Menu", set: "open", react: "onOpenChange(open)", event: "openchange · update — detail: boolean" },
      { component: "Accordion (each item)", set: "open / defaultOpen", react: "onOpenChange(open)", event: "openchange · update — detail: boolean" },
      { component: "Tooltip", set: "open (keeps it showing)", react: "—", event: "—" },
      { component: "Theme Switcher", set: "open", react: "onOpenChange(open)", event: "openchange" },
    ],
  },
  {
    title: "Navigation and selection",
    note: "The component tracks the current item itself, so clicking works with nothing wired up. Set the prop to move it from outside, and listen to read the change.",
    rows: [
      { component: "Tabs", set: "index / defaultIndex", react: "onChange(index)", event: "change · update — detail: number" },
      { component: "Carousel", set: "index", react: "onChange(index)", event: "change · update — detail: number (arrows, dots and autoplay)" },
      { component: "Stepper", set: "currentStep / defaultStep", react: "onStepChange(step)", event: "stepchange · update — detail: number" },
      { component: "Pagination", set: "page", react: "onPageChange(page)", event: "pagechange · update — detail: number" },
      { component: "Sidebar · Navigation Menu · Bottom Navigation", set: "defaultActiveItem · items[].active", react: "onActiveItemChange(item)", event: "activeitemchange · update — detail: the item" },
      { component: "Sidebar (collapse)", set: "collapsed", react: "onCollapsedChange(collapsed)", event: "collapsedchange — detail: boolean" },
      { component: "Table · Grid View", set: "selected · items", react: "onSelectionChange(keys, rows) · onViewChange · onReorder …", event: "selectionchange · update (keys) — detail: the selected keys" },
      { component: "Calendar", set: "selected · open", react: "onSelect(date) · onRangeSelect", event: "select · update — detail: the date" },
      { component: "Theme Switcher", set: "mode · accent · design · activeVariant", react: "onModeChange · onAccentChange · onDesignChange · onActiveVariantChange", event: "modechange · accentchange · designchange · activevariantchange" },
    ],
  },
  {
    title: "Data — lists, messages and the map",
    note: "These show data you pass in; a change from the user is reported through the matching event.",
    rows: [
      { component: "List · Timeline · Activity Feed · User Menu", set: "items", react: "onItemSelect(item) (User Menu)", event: "itemselect (User Menu)" },
      { component: "Chat Box", set: "messages · thinking", react: "onSend(text)", event: "send — detail: string" },
      { component: "Map · Map Markers · Map Routes", set: "center · zoom · markers · routes · waypoints", react: "onMove(view) · onMarkerDragEnd(position) · onRouteLoad(summary)", event: "move · markerdragend · routeload" },
      { component: "Flow Diagram", set: "nodes · edges", react: "onNodeMove · onDiagramChange", event: "nodemove · diagramchange" },
      { component: "Videos", set: "src · muted · loop …", react: "onPlay · onPause · onEnded", event: "play · pause · ended" },
      { component: "Login Form · Signup Form · Account Settings · Profile Settings · Plan & Billing", set: "initial values as props", react: "onSubmit(values) · onSave · onAction …", event: "submit · save · action — detail: the values" },
    ],
  },
];

const PATTERN_NOTES: Record<CodeFramework, string> = {
  react: "Pass the state and handle the callback (controlled), or pass a default and only read changes (uncontrolled).",
  js: "Push the value in by assigning the property, and read changes from the update event — its detail is the new state.",
  vue: "Use v-model on text-style fields, or bind :prop.prop and write changes back from @update — its detail is the new state.",
  angular: "Bind [prop] and write changes back from (update) — its detail is the new state. [(ngModel)] works with the LojeeValueAccessor directive below.",
};

function Group({ title, note, rows }: (typeof GROUPS)[number]) {
  return (
    <section>
      <SectionLabel sub={note}>{title}</SectionLabel>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-surface-muted text-xs uppercase tracking-wide text-fg-subtle">
              <th className="px-3 py-2 font-medium">Component</th>
              <th className="px-3 py-2 font-medium">Set it (prop / attribute)</th>
              <th className="px-3 py-2 font-medium">React: read it</th>
              <th className="px-3 py-2 font-medium">Web component: read it</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.component} className="align-top">
                <td className="px-3 py-2 font-medium text-fg">{r.component}</td>
                <td className="px-3 py-2 font-mono text-xs text-fg-muted">{r.set}</td>
                <td className="px-3 py-2 font-mono text-xs text-fg-muted">{r.react}</td>
                <td className="px-3 py-2 font-mono text-xs text-fg-muted">{r.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function DataBindingShowcase() {
  const { framework } = useCodeFramework();
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Data Binding</h1>
          <p className="mt-1 text-sm text-fg-subtle">
            Every stateful component works the same way: you <strong className="text-fg">set</strong> its state through a prop, and it <strong className="text-fg">tells you</strong> when the user changes it.
            It also tracks that state itself, so it works with nothing wired up.
          </p>
        </div>

        <section>
          <SectionLabel sub={PATTERN_NOTES[framework]}>The pattern</SectionLabel>
          <CodeBlock
            variants={{
              react: `// value
const [name, setName] = useState("Ada");
<Input value={name} onChange={(e) => setName(e.target.value)} />

// open
const [open, setOpen] = useState(false);
<Modal open={open} onClose={() => setOpen(false)} />

// selection
const [tab, setTab] = useState(0);
<Tabs tabs={tabs} index={tab} onChange={setTab} />`,
              js: `<l-input></l-input>
<l-modal heading="Hello"></l-modal>
<l-tabs></l-tabs>

<script type="module">
  import "lojee-ui/elements";

  const input = document.querySelector("l-input");
  input.value = "Ada"; // set
  input.addEventListener("update", (e) => (state.name = e.detail)); // read

  const modal = document.querySelector("l-modal");
  modal.open = true;
  modal.addEventListener("update", (e) => (state.open = e.detail)); // false when it is closed

  const tabs = document.querySelector("l-tabs");
  tabs.tabs = [{ label: "One", content: "…" }, { label: "Two", content: "…" }];
  tabs.index = 1;
  tabs.addEventListener("update", (e) => (state.tab = e.detail));
</script>`,
              vue: `<template>
  <l-input :value.prop="name" @update="(e) => (name = e.detail)" />
  <l-modal heading="Hello" :open.prop="open" @update="(e) => (open = e.detail)" />
  <l-tabs :tabs.prop="tabs" :index.prop="tab" @update="(e) => (tab = e.detail)" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";
const name = ref("Ada");
const open = ref(false);
const tab = ref(0);
const tabs = [{ label: "One", content: "…" }, { label: "Two", content: "…" }];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-input [value]="name" (update)="name = $any($event).detail"></l-input>
    <l-modal heading="Hello" [open]="open" (update)="open = $any($event).detail"></l-modal>
    <l-tabs [tabs]="tabs" [index]="tab" (update)="tab = $any($event).detail"></l-tabs>
  \`,
})
export class AppComponent {
  name = "Ada";
  open = false;
  tab = 0;
  tabs = [{ label: "One", content: "…" }, { label: "Two", content: "…" }];
}`,
            }}
          />
        </section>

        {framework === "angular" && (
        <section>
          <SectionLabel sub="Angular needs one small directive for [(ngModel)], [formControl] and formControlName — copy it into your app (Angular only compiles directives that belong to the app) and add it to the component's imports. It covers every form control below.">Angular ngModel</SectionLabel>
          <p className="mb-2 text-xs text-fg-subtle">Works on: {VALUE_ACCESSOR_TAGS.join(", ")}.</p>
          <CodeBlock
            variants={{
              angular: `// ${VALUE_ACCESSOR_FILE}\n${VALUE_ACCESSOR_SOURCE}\n// app.component.ts — add LojeeValueAccessor to the component's imports\n// template:\n//   <l-input [(ngModel)]="name"></l-input>\n//   <l-checkbox label="Agree" [(ngModel)]="agree"></l-checkbox>\n//   <l-input [formControl]="control"></l-input>`,
            }}
          />
        </section>
        )}

        {framework === "vue" && (
          <section>
            <SectionLabel sub={'v-model works on the text-style fields (Input, Textarea, Password Input, Search Input …): <l-input v-model="name" />. For everything else, bind :prop.prop and listen to @update.'}>Vue v-model</SectionLabel>
          </section>
        )}

        {GROUPS.map((g) => (
          <Group key={g.title} {...g} />
        ))}

        <section>
          <SectionLabel sub="The four events every form field also reports. update: committed — detail is the value. input: as the user edits. focus: gained focus. invalid: failed validation — detail is the message.">Field events</SectionLabel>
          <CodeBlock
            variants={{
              react: `<Input
  required
  onChange={(e) => console.log("update", e.target.value)}
  onInput={(e) => console.log("input", e.currentTarget.value)}
  onFocus={() => console.log("focus")}
  onInvalid={(e) => console.log("invalid", e.currentTarget.validationMessage)}
/>`,
              js: `const field = document.querySelector("l-input");
for (const name of ["update", "input", "focus", "invalid"]) {
  field.addEventListener(name, (e) => console.log(name, e.detail));
}`,
              vue: `<l-input
  required="true"
  @update="(e) => console.log('update', e.detail)"
  @input="(e) => console.log('input', e.detail)"
  @focus="(e) => console.log('focus', e.detail)"
  @invalid="(e) => console.log('invalid', e.detail)"
/>`,
              angular: `<l-input
  required="true"
  (update)="onUpdate($any($event).detail)"
  (input)="onInput($any($event).detail)"
  (focus)="onFocus()"
  (invalid)="onInvalid($any($event).detail)"
></l-input>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
