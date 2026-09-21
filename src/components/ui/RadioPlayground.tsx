import { useState } from "react";
import { Radio } from "./Radio/Radio";
import { RadioGroup, type RadioGroupOrientation } from "./Radio/RadioGroup";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const ORIENTATIONS: RadioGroupOrientation[] = ["vertical", "horizontal"];
const OPTIONS = ["Free", "Pro", "Enterprise"];

export default function RadioPlayground() {
  const [orientation, setOrientation] = useState<RadioGroupOrientation>("vertical");
  const [color, setColor] = useState<ColorName>("slate");
  const [selected, setSelected] = useState(OPTIONS[0]);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <RadioGroup orientation={orientation}>
          {OPTIONS.map((option) => (
            <Radio
              key={option}
              name="playground"
              label={option}
              color={color}
              checked={selected === option}
              onChange={() => setSelected(option)}
            />
          ))}
        </RadioGroup>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<RadioGroup orientation="${orientation}">
${OPTIONS.map(
  (option) => `  <Radio name="playground" color="${color}" label="${option}"${option === selected ? " defaultChecked" : ""} />`
).join("\n")}
</RadioGroup>`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = `<l-RadioGroup orientation="${orientation}">
${OPTIONS.map(
  (option) =>
    `  <l-Radio name="playground" color="${color}" label="${option}"${
      option === selected ? ` defaultChecked` : ""
    } />`
).join("\n")}
</l-RadioGroup>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Orientation" options={ORIENTATIONS} value={orientation} onChange={setOrientation} />
      <ColorSwatches value={color} onChange={setColor} />
    </PlaygroundLayout>
  );
}
