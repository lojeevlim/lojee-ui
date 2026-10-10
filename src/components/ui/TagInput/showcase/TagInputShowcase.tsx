import { useState } from "react";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";
import { wcCode } from "../../webComponentCode";
import { TagInput } from "../TagInput";

function Controlled() {
  const [tags, setTags] = useState(["react", "design"]);
  return (
    <div className="max-w-md space-y-2">
      <TagInput value={tags} onChange={setTags} />
      <p className="text-xs text-fg-subtle">
        Value: <span className="font-mono text-fg-muted">{JSON.stringify(tags)}</span>
      </p>
    </div>
  );
}

export default function TagInputShowcase() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-fg">Tag Input</h1>
        <p className="mt-1 text-sm text-fg-subtle">A text field that turns what you type into removable tags. Enter or a comma adds one; Backspace on an empty field removes the last.</p>
      </div>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="It keeps its own list, so it works with nothing wired up. Pass `value` and `onChange` to follow or control it.">Basic</SectionLabel>
        <Controlled />
        <CodeBlock
          variants={wcCode({
            react: `const [tags, setTags] = useState(["react", "design"]);

<TagInput value={tags} onChange={setTags} />`,
            html: `<l-tag-input id="tags" placeholder="Add a tag…"></l-tag-input>`,
            vueHtml: `<l-tag-input :value="tags" @change="tags = $event.detail"></l-tag-input>`,
            angularHtml: `<l-tag-input [value]="tags" (change)="tags = $event.detail"></l-tag-input>`,
            script: `const el = document.getElementById("tags");
el.value = ["react", "design"];
el.addEventListener("change", (e) => console.log(e.detail)); // string[]`,
            vueScript: `const tags = ref(["react", "design"]);`,
            angularClass: `tags = ["react", "design"];`,
          })}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`maxTags` caps the list (typing stops once it is reached); `allowDuplicates` lets the same tag in twice.">Limits</SectionLabel>
        <div className="max-w-md space-y-3">
          <TagInput value={["one", "two"]} maxTags={3} placeholder="Up to 3 tags" />
          <TagInput allowDuplicates placeholder="Duplicates allowed" />
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<TagInput maxTags={3} />
<TagInput allowDuplicates />`,
            html: `<l-tag-input max-tags="3"></l-tag-input>
<l-tag-input allow-duplicates="true"></l-tag-input>`,
            vueHtml: `<l-tag-input :max-tags="3"></l-tag-input>
<l-tag-input :allow-duplicates="true"></l-tag-input>`,
            angularHtml: `<l-tag-input [maxTags]="3"></l-tag-input>
<l-tag-input [allowDuplicates]="true"></l-tag-input>`,
          })}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`color` tints the tags (same palette as Button), `invalid` draws the red error border and `disabled` locks it.">Color and states</SectionLabel>
        <div className="max-w-md space-y-3">
          <TagInput value={["rose", "tags"]} color="rose" />
          <TagInput value={["invalid"]} invalid />
          <TagInput value={["disabled"]} disabled />
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<TagInput color="rose" />
<TagInput invalid />
<TagInput disabled />`,
            html: `<l-tag-input color="rose"></l-tag-input>
<l-tag-input invalid="true"></l-tag-input>
<l-tag-input disabled="true"></l-tag-input>`,
            vueHtml: `<l-tag-input color="rose"></l-tag-input>
<l-tag-input :invalid="true"></l-tag-input>
<l-tag-input :disabled="true"></l-tag-input>`,
            angularHtml: `<l-tag-input color="rose"></l-tag-input>
<l-tag-input [invalid]="true"></l-tag-input>
<l-tag-input [disabled]="true"></l-tag-input>`,
          })}
        />
      </section>
    </div>
  );
}
