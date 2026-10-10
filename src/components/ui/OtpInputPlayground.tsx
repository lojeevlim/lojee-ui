import { useState } from "react";
import { OtpInput, type OtpInputSize, type OtpInputType } from "./OtpInput/OtpInput";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { wcCode } from "./webComponentCode";

const LENGTHS = ["4", "6", "8"] as const;
const TYPES: OtpInputType[] = ["numeric", "alphanumeric"];
const SIZES: OtpInputSize[] = ["sm", "md", "lg"];
const TOGGLE = ["off", "on"] as const;

export default function OtpInputPlayground() {
  const [length, setLength] = useState<(typeof LENGTHS)[number]>("6");
  const [type, setType] = useState<OtpInputType>("numeric");
  const [size, setSize] = useState<OtpInputSize>("md");
  const [mask, setMask] = useState<(typeof TOGGLE)[number]>("off");
  const [invalid, setInvalid] = useState<(typeof TOGGLE)[number]>("off");
  const [disabled, setDisabled] = useState<(typeof TOGGLE)[number]>("off");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <OtpInput key={`${length}-${type}`} length={Number(length)} type={type} size={size} mask={mask === "on"} invalid={invalid === "on"} disabled={disabled === "on"} />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const common = (length !== "6" ? ` length="${length}"` : "") + (type !== "numeric" ? ` type="${type}"` : "") + (size !== "md" ? ` size="${size}"` : "");
  const flag = (on: boolean, f: (n: string) => string, n: string) => (on ? ` ${f(n)}` : "");
  const flags = (f: (n: string) => string) => flag(mask === "on", f, "mask") + flag(invalid === "on", f, "invalid") + flag(disabled === "on", f, "disabled");

  return (
    <PlaygroundLayout
      preview={preview}
      variants={wcCode({
        react: `<OtpInput${common.replace(/ length="(\d+)"/, " length={$1}")}${mask === "on" ? " mask" : ""}${invalid === "on" ? " invalid" : ""}${disabled === "on" ? " disabled" : ""} onComplete={(code) => verify(code)} />`,
        html: `<l-otp-input${common}${flags((n) => `${n}="true"`)}></l-otp-input>`,
        vueHtml: `<l-otp-input${common}${flags((n) => `:${n}="true"`)} @complete="verify($event.detail)"></l-otp-input>`,
        angularHtml: `<l-otp-input${common}${flags((n) => `[${n}]="true"`)} (complete)="verify($event.detail)"></l-otp-input>`,
      })}
    >
      <OptionGroup label="Length" options={LENGTHS} value={length} onChange={setLength} />
      <OptionGroup label="Type" options={TYPES} value={type} onChange={setType} />
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <OptionGroup label="Mask" options={TOGGLE} value={mask} onChange={setMask} />
      <OptionGroup label="Invalid" options={TOGGLE} value={invalid} onChange={setInvalid} />
      <OptionGroup label="Disabled" options={TOGGLE} value={disabled} onChange={setDisabled} />
    </PlaygroundLayout>
  );
}
