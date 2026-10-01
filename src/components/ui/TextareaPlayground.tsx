import { useState } from "react";
import { Textarea, type TextareaResize } from "./Textarea/Textarea";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const RESIZE_OPTIONS: TextareaResize[] = ["none", "vertical", "both"];

export default function TextareaPlayground() {
  const motion = useMotion();
  const [resize, setResize] = useState<TextareaResize>("vertical");
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState("Write something…");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="max-w-sm w-full">
          <Textarea key={motion.replayKey} {...motion.props} resize={resize} invalid={invalid} disabled={disabled} placeholder={placeholder || "Write something…"} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Textarea resize="${resize}"${invalid ? " invalid" : ""}${disabled ? " disabled" : ""}${motion.attrs} placeholder="${
    placeholder || "Write something…"
  }" />`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = `<l-Textarea resize="${resize}"${invalid ? ` invalid` : ""}${
    disabled ? ` disabled` : ""
  }${motion.attrs} placeholder="${placeholder || "Write something…"}" />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Placeholder</span>
        <input
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Placeholder text"
        />
      </div>

      <OptionGroup label="Resize" options={RESIZE_OPTIONS} value={resize} onChange={setResize} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setInvalid((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (invalid ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Invalid
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
