import { useState } from "react";
import { ColorPicker } from "./ColorPicker/ColorPicker";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { wcCode } from "./webComponentCode";

const TOGGLE = ["on", "off"] as const;

export default function ColorPickerPlayground() {
  const [input, setInput] = useState<(typeof TOGGLE)[number]>("on");
  const [presets, setPresets] = useState<(typeof TOGGLE)[number]>("on");
  const [disabled, setDisabled] = useState<(typeof TOGGLE)[number]>("off");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <ColorPicker showInput={input === "on"} presets={presets === "on" ? undefined : []} disabled={disabled === "on"} />
      </AppWindowBody>
    </AppWindowFrame>
  );

  return (
    <PlaygroundLayout
      preview={preview}
      variants={wcCode({
        react: `<ColorPicker${input === "off" ? " showInput={false}" : ""}${presets === "off" ? " presets={[]}" : ""}${disabled === "on" ? " disabled" : ""} onChange={(color) => console.log(color)} />`,
        html: `<l-Color-Picker${input === "off" ? ' show-input="false"' : ""}${disabled === "on" ? ' disabled="true"' : ""}></l-Color-Picker>`,
        vueHtml: `<l-Color-Picker${input === "off" ? ' :show-input="false"' : ""}${presets === "off" ? ' :presets="[]"' : ""}${disabled === "on" ? ' :disabled="true"' : ""} @change="color = $event.detail"></l-Color-Picker>`,
        angularHtml: `<l-Color-Picker${input === "off" ? ' [showInput]="false"' : ""}${presets === "off" ? ' [presets]="[]"' : ""}${disabled === "on" ? ' [disabled]="true"' : ""} (change)="color = $event.detail"></l-Color-Picker>`,
        script: presets === "off" ? `document.querySelector("l-color-picker").presets = [];` : undefined,
      })}
    >
      <OptionGroup label="Hex input" options={TOGGLE} value={input} onChange={setInput} />
      <OptionGroup label="Presets" options={TOGGLE} value={presets} onChange={setPresets} />
      <OptionGroup label="Disabled" options={["off", "on"] as const} value={disabled} onChange={setDisabled} />
    </PlaygroundLayout>
  );
}
