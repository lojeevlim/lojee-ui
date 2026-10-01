import { useState } from "react";
import { SearchInput, type SearchInputSize } from "./SearchInput/SearchInput";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const SIZES: SearchInputSize[] = ["sm", "md", "lg"];

export default function SearchInputPlayground() {
  const motion = useMotion();
  const [size, setSize] = useState<SearchInputSize>("md");
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("lojee-ui");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="max-w-sm w-full">
          <SearchInput
            key={motion.replayKey}
            {...motion.props}
            size={size}
            disabled={disabled}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClear={() => setValue("")}
            placeholder="Search…"
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `const [value, setValue] = useState("${value}");

<SearchInput
  size="${size}"${disabled ? "\n  disabled" : ""}${motion.attrs}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onClear={() => setValue("")}
  placeholder="Search…"
/>`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = `<l-SearchInput size="${size}"${
    disabled ? ` disabled` : ""
  }${motion.attrs} value="${value}" placeholder="Search…" />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Value</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Search value"
        />
      </div>

      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setDisabled((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (disabled ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Disabled
          </button>
        </div>
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
