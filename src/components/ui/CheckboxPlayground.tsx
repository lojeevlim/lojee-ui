import { useState } from "react";
import { Checkbox } from "./Checkbox/Checkbox";
import type { ColorName } from "../../core/tokens";
import { ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

export default function CheckboxPlayground() {
  const motion = useMotion();
  const [checked, setChecked] = useState(true);
  const [color, setColor] = useState<ColorName>("accent");
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState("Accept terms and conditions");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Checkbox
          key={motion.replayKey}
          {...motion.props}
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
  }${motion.attrs} />`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = `<l-checkbox color="${color}"${checked ? ` defaultChecked` : ""}${
    disabled ? ` disabled` : ""
  }${label ? ` label="${label}"` : ""}${motion.attrs} />`;

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
          placeholder="Checkbox label"
        />
      </div>

      <ColorSwatches value={color} onChange={setColor} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setChecked((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (checked ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Checked
          </button>
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
