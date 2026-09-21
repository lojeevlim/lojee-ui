import { useState } from "react";
import { Checkbox } from "./Checkbox/Checkbox";
import type { ColorName } from "../../core/tokens";
import { ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function CheckboxPlayground() {
  const [checked, setChecked] = useState(true);
  const [color, setColor] = useState<ColorName>("slate");
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState("Accept terms and conditions");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          color={color}
          disabled={disabled}
          label={label || undefined}
        />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Checkbox color="${color}"${checked ? " defaultChecked" : ""}${disabled ? " disabled" : ""}${
    label ? ` label="${label}"` : ""
  } />`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = `<l-Checkbox color="${color}"${checked ? ` defaultChecked` : ""}${
    disabled ? ` disabled` : ""
  }${label ? ` label="${label}"` : ""} />`;

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
          placeholder="Checkbox label"
        />
      </div>

      <ColorSwatches value={color} onChange={setColor} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setChecked((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (checked ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Checked
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
