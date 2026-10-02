import { useState } from "react";
import { NumberInput, type NumberInputSize } from "./NumberInput/NumberInput";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { wcCode } from "./webComponentCode";

const SIZES: NumberInputSize[] = ["sm", "md", "lg"];
const STEPS = ["1", "5", "0.5"] as const;
const BOUNDS = ["none", "0 – 10", "0 – 100"] as const;
const TOGGLE = ["off", "on"] as const;

export default function NumberInputPlayground() {
  const [size, setSize] = useState<NumberInputSize>("md");
  const [step, setStep] = useState<(typeof STEPS)[number]>("1");
  const [bounds, setBounds] = useState<(typeof BOUNDS)[number]>("none");
  const [invalid, setInvalid] = useState<(typeof TOGGLE)[number]>("off");
  const [disabled, setDisabled] = useState<(typeof TOGGLE)[number]>("off");

  const min = bounds === "none" ? undefined : 0;
  const max = bounds === "0 – 10" ? 10 : bounds === "0 – 100" ? 100 : undefined;
  const precision = step === "0.5" ? 1 : undefined;

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <NumberInput key={`${bounds}-${step}`} value={2} size={size} step={Number(step)} min={min} max={max} precision={precision} invalid={invalid === "on"} disabled={disabled === "on"} />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const common =
    (size !== "md" ? ` size="${size}"` : "") +
    (step !== "1" ? ` step="${step}"` : "") +
    (min !== undefined ? ` min="${min}"` : "") +
    (max !== undefined ? ` max="${max}"` : "") +
    (precision !== undefined ? ` precision="${precision}"` : "");
  const reactNum = (s: string) => s.replace(/ (step|min|max|precision)="([\d.]+)"/g, " $1={$2}");
  const flag = (on: boolean, f: (n: string) => string, n: string) => (on ? ` ${f(n)}` : "");

  return (
    <PlaygroundLayout
      preview={preview}
      variants={wcCode({
        react: `<NumberInput${reactNum(common)}${invalid === "on" ? " invalid" : ""}${disabled === "on" ? " disabled" : ""} />`,
        html: `<l-Number-Input${common}${flag(invalid === "on", (n) => `${n}="true"`, "invalid")}${flag(disabled === "on", (n) => `${n}="true"`, "disabled")}></l-Number-Input>`,
        vueHtml: `<l-Number-Input${common}${flag(invalid === "on", (n) => `:${n}="true"`, "invalid")}${flag(disabled === "on", (n) => `:${n}="true"`, "disabled")}></l-Number-Input>`,
        angularHtml: `<l-Number-Input${common}${flag(invalid === "on", (n) => `[${n}]="true"`, "invalid")}${flag(disabled === "on", (n) => `[${n}]="true"`, "disabled")}></l-Number-Input>`,
      })}
    >
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <OptionGroup label="Step" options={STEPS} value={step} onChange={setStep} />
      <OptionGroup label="Min – max" options={BOUNDS} value={bounds} onChange={setBounds} />
      <OptionGroup label="Invalid" options={TOGGLE} value={invalid} onChange={setInvalid} />
      <OptionGroup label="Disabled" options={TOGGLE} value={disabled} onChange={setDisabled} />
    </PlaygroundLayout>
  );
}
