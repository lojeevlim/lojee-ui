import { useState } from "react";
import { Rating, type RatingSize } from "./Rating/Rating";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { wcCode } from "./webComponentCode";

const MAXES = ["5", "10"] as const;
const SIZES: RatingSize[] = ["sm", "md", "lg"];
const TOGGLE = ["off", "on"] as const;

export default function RatingPlayground() {
  const [max, setMax] = useState<(typeof MAXES)[number]>("5");
  const [size, setSize] = useState<RatingSize>("md");
  const [half, setHalf] = useState<(typeof TOGGLE)[number]>("off");
  const [readOnly, setReadOnly] = useState<(typeof TOGGLE)[number]>("off");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Rating key={max} value={3} max={Number(max)} size={size} allowHalf={half === "on"} readOnly={readOnly === "on"} />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const common = (max !== "5" ? ` max="${max}"` : "") + (size !== "md" ? ` size="${size}"` : "");
  const flag = (on: boolean, f: (n: string) => string, n: string) => (on ? ` ${f(n)}` : "");
  const flags = (f: (n: string) => string) => flag(half === "on", f, "allow-half") + flag(readOnly === "on", f, "read-only");

  return (
    <PlaygroundLayout
      preview={preview}
      variants={wcCode({
        react: `<Rating value={3}${common.replace(/ max="(\d+)"/, " max={$1}")}${half === "on" ? " allowHalf" : ""}${readOnly === "on" ? " readOnly" : ""} />`,
        html: `<l-Rating value="3"${common}${flags((n) => `${n}="true"`)}></l-Rating>`,
        vueHtml: `<l-Rating :value="3"${common}${flags((n) => `:${n}="true"`)}></l-Rating>`,
        angularHtml: `<l-Rating [value]="3"${common}${flags((n) => `[${n.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())}]="true"`)}></l-Rating>`,
      })}
    >
      <OptionGroup label="Stars" options={MAXES} value={max} onChange={setMax} />
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <OptionGroup label="Half stars" options={TOGGLE} value={half} onChange={setHalf} />
      <OptionGroup label="Read-only" options={TOGGLE} value={readOnly} onChange={setReadOnly} />
    </PlaygroundLayout>
  );
}
