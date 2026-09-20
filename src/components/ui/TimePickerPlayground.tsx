import { useState } from "react";
import { TimePicker, type TimePickerSize } from "./TimePicker/TimePicker";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const SIZES: TimePickerSize[] = ["sm", "md", "lg"];

export default function TimePickerPlayground() {
  const [size, setSize] = useState<TimePickerSize>("md");
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <TimePicker size={size} invalid={invalid} disabled={disabled} />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<TimePicker size="${size}"${invalid ? " invalid" : ""}${disabled ? " disabled" : ""} />`;

  // No json props on <TimePicker> — plain attributes only. Booleans need
  // an explicit "true" since r2wc parses a bare attribute as false.
  const htmlMarkup = `<TimePicker size="${size}"${invalid ? ` invalid` : ""}${
    disabled ? ` disabled` : ""
  } />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />

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
