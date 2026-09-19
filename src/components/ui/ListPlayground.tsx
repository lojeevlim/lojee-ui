import { useState } from "react";
import { List, type ListVariant } from "./List/List";
import { ListItem } from "./List/ListItem";
import { OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";

const VARIANTS: ListVariant[] = ["plain", "divided", "bordered"];

export default function ListPlayground() {
  const [variant, setVariant] = useState<ListVariant>("divided");
  const [ordered, setOrdered] = useState(false);

  const preview = (
    <div className="w-72">
      <List variant={variant} ordered={ordered}>
        <ListItem icon="file">Project brief.pdf</ListItem>
        <ListItem icon="image">Cover photo.png</ListItem>
        <ListItem icon="folder">Archive</ListItem>
      </List>
    </div>
  );

  const code = `<List variant="${variant}"${ordered ? " ordered" : ""}>
  <ListItem icon="file">Project brief.pdf</ListItem>
  <ListItem icon="image">Cover photo.png</ListItem>
  <ListItem icon="folder">Archive</ListItem>
</List>`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
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
