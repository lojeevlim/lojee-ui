import { useState } from "react";
import { TimePicker, type TimePickerSize } from "./TimePicker/TimePicker";
import { OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";

const SIZES: TimePickerSize[] = ["sm", "md", "lg"];

export default function TimePickerPlayground() {
  const [size, setSize] = useState<TimePickerSize>("md");
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const preview = <TimePicker size={size} invalid={invalid} disabled={disabled} />;

  const code = `<TimePicker size="${size}"${invalid ? " invalid" : ""}${disabled ? " disabled" : ""} />`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
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
