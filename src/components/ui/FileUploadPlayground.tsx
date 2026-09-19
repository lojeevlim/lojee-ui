import { useState } from "react";
import { FileUpload } from "./FileUpload/FileUpload";
import { PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function FileUploadPlayground() {
  const [label, setLabel] = useState("Click to upload or drag and drop");
  const [multiple, setMultiple] = useState(false);
  const [lastFiles, setLastFiles] = useState<string[]>([]);

  const preview = (
    <div className="w-full max-w-sm">
      <FileUpload
        label={label || undefined}
        multiple={multiple}
        onFilesSelected={(files) => setLastFiles(files ? Array.from(files).map((f) => f.name) : [])}
      />
    </div>
  );

  const code = `<FileUpload
  label="${label || "Click to upload or drag and drop"}"${multiple ? "\n  multiple" : ""}
  onFilesSelected={(files) => console.log(files)}
/>`;

  // No json props on <FileUpload>, and `accept` isn't demoed by this
  // playground — just the plain attributes. `multiple` needs an explicit
  // "true" since r2wc parses a bare attribute as false.
  const htmlMarkup = `<FileUpload label="${label || "Click to upload or drag and drop"}"${
    multiple ? ` multiple` : ""
  } />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Label</span>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Click to upload or drag and drop"
        />
      </div>

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setMultiple((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (multiple ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Multiple files
          </button>
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Last selected</span>
        <div className="flex flex-wrap gap-1.5">
          {lastFiles.length === 0 && <span className="text-xs text-slate-400">None</span>}
          {lastFiles.map((name, i) => (
            <span key={`${name}-${i}`} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
              {name}
            </span>
          ))}
        </div>
      </div>
    </PlaygroundLayout>
  );
}
