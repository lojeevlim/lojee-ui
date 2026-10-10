import { useState } from "react";
import { Input, type InputSize } from "./Input/Input";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";
import { INPUT_VARIANTS, type InputVariant } from "../../core/inputVariants";

const VARIANTS = INPUT_VARIANTS.map((v) => v.value);

const SIZES: InputSize[] = ["sm", "md", "lg"];
const ICONS = ["none", "mail", "search", "user"] as const;
type IconOption = (typeof ICONS)[number];

export default function InputPlayground() {
  const motion = useMotion();
  const [size, setSize] = useState<InputSize>("md");
  const [variant, setVariant] = useState<InputVariant>("outline");
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [leadingIcon, setLeadingIcon] = useState<IconOption>("none");
  const [placeholder, setPlaceholder] = useState("Type something…");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="max-w-sm w-full">
          <Input
            key={motion.replayKey}
            {...motion.props}
            size={size}
            variant={variant}
            invalid={invalid}
            disabled={disabled}
            leadingIcon={leadingIcon === "none" ? undefined : leadingIcon}
            placeholder={placeholder || "Type something…"}
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Input size="${size}"${variant !== "outline" ? ` variant="${variant}"` : ""}${invalid ? " invalid" : ""}${disabled ? " disabled" : ""}${
    leadingIcon !== "none" ? ` leadingIcon="${leadingIcon}"` : ""
  }${motion.attrs} placeholder="${placeholder || "Type something…"}" />`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = `<l-input size="${size}"${variant !== "outline" ? ` variant="${variant}"` : ""}${invalid ? ` invalid` : ""}${disabled ? ` disabled` : ""}${
    leadingIcon !== "none" ? ` leadingIcon="${leadingIcon}"` : ""
  }${motion.attrs} placeholder="${placeholder || "Type something…"}" />`;

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

      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="Leading icon" options={ICONS} value={leadingIcon} onChange={setLeadingIcon} />

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
