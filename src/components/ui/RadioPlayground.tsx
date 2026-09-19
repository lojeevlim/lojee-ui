import { useState } from "react";
import { Radio } from "./Radio/Radio";
import { RadioGroup, type RadioGroupOrientation } from "./Radio/RadioGroup";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout } from "./PlaygroundHelpers";

const ORIENTATIONS: RadioGroupOrientation[] = ["vertical", "horizontal"];
const OPTIONS = ["Free", "Pro", "Enterprise"];

export default function RadioPlayground() {
  const [orientation, setOrientation] = useState<RadioGroupOrientation>("vertical");
  const [color, setColor] = useState<ColorName>("slate");
  const [selected, setSelected] = useState(OPTIONS[0]);

  const preview = (
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
  );

  const code = `<RadioGroup orientation="${orientation}">
${OPTIONS.map(
  (option) => `  <Radio name="playground" color="${color}" label="${option}"${option === selected ? " defaultChecked" : ""} />`
).join("\n")}
</RadioGroup>`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <OptionGroup label="Orientation" options={ORIENTATIONS} value={orientation} onChange={setOrientation} />
      <ColorSwatches value={color} onChange={setColor} />
    </PlaygroundLayout>
  );
}
