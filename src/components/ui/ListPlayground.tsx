import { useState } from "react";
import { List, type ListVariant } from "./List/List";
import { ListItem } from "./List/ListItem";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const VARIANTS: ListVariant[] = ["plain", "divided", "bordered"];

export default function ListPlayground() {
  const [variant, setVariant] = useState<ListVariant>("divided");
  const [ordered, setOrdered] = useState(false);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-72">
          <List variant={variant} ordered={ordered}>
            <ListItem icon="file">Project brief.pdf</ListItem>
            <ListItem icon="image">Cover photo.png</ListItem>
            <ListItem icon="folder">Archive</ListItem>
          </List>
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<List variant="${variant}"${ordered ? " ordered" : ""}>
  <ListItem icon="file">Project brief.pdf</ListItem>
  <ListItem icon="image">Cover photo.png</ListItem>
  <ListItem icon="folder">Archive</ListItem>
</List>`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions. Note the
  // explicit `ordered="true"` — r2wc's boolean parser needs a non-empty
  // value, so a bare attribute would silently parse to false.
  const htmlMarkup = `<l-List variant="${variant}"${ordered ? ` ordered` : ""}>
  <l-ListItem icon="file">Project brief.pdf</l-ListItem>
  <l-ListItem icon="image">Cover photo.png</l-ListItem>
  <l-ListItem icon="folder">Archive</l-ListItem>
</l-List>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setOrdered((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (ordered ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Ordered
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
