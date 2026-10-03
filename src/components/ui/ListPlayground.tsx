import { useState } from "react";
import { List, type ListVariant } from "./List/List";
import { ListItem } from "./List/ListItem";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const VARIANTS: ListVariant[] = ["plain", "divided", "bordered"];

export default function ListPlayground() {
  const motion = useMotion({ hover: false });
  const [variant, setVariant] = useState<ListVariant>("divided");
  const [ordered, setOrdered] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [headerText, setHeaderText] = useState("Files");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-72">
          <List key={motion.replayKey} {...motion.props} variant={variant} ordered={ordered} header={showHeader ? headerText || "Files" : undefined}>
            <ListItem icon="file">Project brief.pdf</ListItem>
            <ListItem icon="image">Cover photo.png</ListItem>
            <ListItem icon="folder">Archive</ListItem>
          </List>
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const headerAttr = showHeader ? ` header="${headerText || "Files"}"` : "";
  const code = `<List variant="${variant}"${headerAttr}${motion.attrs}${ordered ? " ordered" : ""}>
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
  const htmlMarkup = `<l-List variant="${variant}"${motion.attrs}${ordered ? ` ordered` : ""}>${showHeader ? `\n  <span slot="header">${headerText || "Files"}</span>` : ""}
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
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setOrdered((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (ordered ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Ordered
          </button>
          <button
            type="button"
            onClick={() => setShowHeader((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (showHeader ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Header
          </button>
        </div>
      </div>
      {showHeader && (
        <div>
          <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Header text</span>
          <input
            value={headerText}
            onChange={(e) => setHeaderText(e.target.value)}
            className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          />
        </div>
      )}
      {motion.controls}
    </PlaygroundLayout>
  );
}
