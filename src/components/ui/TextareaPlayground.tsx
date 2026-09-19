import { useState } from "react";
import { Textarea, type TextareaResize } from "./Textarea/Textarea";
import { OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";

const RESIZE_OPTIONS: TextareaResize[] = ["none", "vertical", "both"];

export default function TextareaPlayground() {
  const [resize, setResize] = useState<TextareaResize>("vertical");
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState("Write something…");

  const preview = (
    <div className="max-w-sm w-full">
      <Textarea resize={resize} invalid={invalid} disabled={disabled} placeholder={placeholder || "Write something…"} />
    </div>
  );

  const code = `<Textarea resize="${resize}"${invalid ? " invalid" : ""}${disabled ? " disabled" : ""} placeholder="${
    placeholder || "Write something…"
  }" />`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Placeholder</span>
        <input
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Placeholder text"
        />
      </div>

      <OptionGroup label="Resize" options={RESIZE_OPTIONS} value={resize} onChange={setResize} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setInvalid((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (invalid ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Invalid
          </button>
          <button
            type="button"
            onClick={() => setDisabled((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (disabled ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Disabled
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
