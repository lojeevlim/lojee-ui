import { useState } from "react";
import { TagInput } from "./TagInput/TagInput";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { wcCode } from "./webComponentCode";
import type { ColorName } from "../../core/tokens";

const MAXES = ["none", "3", "5"] as const;
const TOGGLE = ["off", "on"] as const;

export default function TagInputPlayground() {
  const [color, setColor] = useState<ColorName>("accent");
  const [max, setMax] = useState<(typeof MAXES)[number]>("none");
  const [dupes, setDupes] = useState<(typeof TOGGLE)[number]>("off");
  const [invalid, setInvalid] = useState<(typeof TOGGLE)[number]>("off");
  const [disabled, setDisabled] = useState<(typeof TOGGLE)[number]>("off");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-sm">
          <TagInput
            key={`${max}`}
            value={["design", "react"]}
            color={color}
            maxTags={max === "none" ? undefined : Number(max)}
            allowDuplicates={dupes === "on"}
            invalid={invalid === "on"}
            disabled={disabled === "on"}
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const react =
    (color !== "accent" ? ` color="${color}"` : "") +
    (max !== "none" ? ` maxTags={${max}}` : "") +
    (dupes === "on" ? " allowDuplicates" : "") +
    (invalid === "on" ? " invalid" : "") +
    (disabled === "on" ? " disabled" : "");
  const attr = (on: boolean, name: string, b: (n: string) => string) => (on ? ` ${b(name)}` : "");
  const html = (b: (n: string, v?: string) => string) =>
    (color !== "accent" ? ` color="${color}"` : "") +
    (max !== "none" ? ` ${b("max-tags", max)}` : "") +
    attr(dupes === "on", "allow-duplicates", (n) => b(n, "true")) +
    attr(invalid === "on", "invalid", (n) => b(n, "true")) +
    attr(disabled === "on", "disabled", (n) => b(n, "true"));
  const plain = (n: string, v = "true") => `${n}="${v}"`;
  const vue = (n: string, v = "true") => `:${n}="${v}"`;
  const ng = (n: string, v = "true") => `[${n.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())}]="${v}"`;

  return (
    <PlaygroundLayout
      preview={preview}
      variants={wcCode({
        react: `<TagInput${react} />`,
        html: `<l-Tag-Input${html(plain)}></l-Tag-Input>`,
        vueHtml: `<l-Tag-Input${html(vue)}></l-Tag-Input>`,
        angularHtml: `<l-Tag-Input${html(ng)}></l-Tag-Input>`,
      })}
    >
      <ColorSwatches label="Color" value={color} onChange={setColor} />
      <OptionGroup label="Max tags" options={MAXES} value={max} onChange={setMax} />
      <OptionGroup label="Allow duplicates" options={TOGGLE} value={dupes} onChange={setDupes} />
      <OptionGroup label="Invalid" options={TOGGLE} value={invalid} onChange={setInvalid} />
      <OptionGroup label="Disabled" options={TOGGLE} value={disabled} onChange={setDisabled} />
    </PlaygroundLayout>
  );
}
