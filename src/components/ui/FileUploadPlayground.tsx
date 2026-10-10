import { useState } from "react";
import { FileUpload } from "./FileUpload/FileUpload";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

export default function FileUploadPlayground() {
  const motion = useMotion();
  const [label, setLabel] = useState("Click to upload or drag and drop");
  const [multiple, setMultiple] = useState(false);
  const [lastFiles, setLastFiles] = useState<string[]>([]);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-sm">
          <FileUpload
            key={motion.replayKey}
            {...motion.props}
            label={label || undefined}
            multiple={multiple}
            onFilesSelected={(files) => setLastFiles(files ? Array.from(files).map((f) => f.name) : [])}
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<FileUpload
  label="${label || "Click to upload or drag and drop"}"${multiple ? "\n  multiple" : ""}${motion.attrs}
  onFilesSelected={(files) => console.log(files)}
/>`;

  // No json props on <FileUpload>, and `accept` isn't demoed by this
  // playground — just the plain attributes. `multiple` needs an explicit
  // "true" since r2wc parses a bare attribute as false.
  const htmlMarkup = `<l-file-upload label="${label || "Click to upload or drag and drop"}"${
    multiple ? ` multiple` : ""
  }${motion.attrs} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Label</span>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Click to upload or drag and drop"
        />
      </div>

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setMultiple((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (multiple ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Multiple files
          </button>
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Last selected</span>
        <div className="flex flex-wrap gap-1.5">
          {lastFiles.length === 0 && <span className="text-xs text-fg-subtle">None</span>}
          {lastFiles.map((name, i) => (
            <span key={`${name}-${i}`} className="rounded-md bg-surface-muted px-2 py-1 text-xs font-medium text-fg-muted">
              {name}
            </span>
          ))}
        </div>
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
