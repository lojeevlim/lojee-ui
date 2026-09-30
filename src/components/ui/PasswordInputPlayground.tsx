import { useState } from "react";
import { PasswordInput, type PasswordInputSize } from "./PasswordInput/PasswordInput";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const SIZES: PasswordInputSize[] = ["sm", "md", "lg"];

export default function PasswordInputPlayground() {
  const [size, setSize] = useState<PasswordInputSize>("md");
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [value, setValue] = useState("hunter2");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="max-w-sm w-full">
          <PasswordInput
            size={size}
            disabled={disabled}
            invalid={invalid}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Password"
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `const [password, setPassword] = useState("${value}");

<PasswordInput
  size="${size}"${disabled ? "\n  disabled" : ""}${invalid ? "\n  invalid" : ""}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
/>`;

  const htmlMarkup = `<l-PasswordInput size="${size}"${disabled ? ` disabled` : ""}${
    invalid ? ` invalid` : ""
  } value="${value}" placeholder="Password" />`;

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
          placeholder="Password value"
        />
      </div>

      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />

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
    </PlaygroundLayout>
  );
}
