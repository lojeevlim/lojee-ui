import { useState } from "react";
import { Spinner, type SpinnerSize, type SpinnerVariant } from "./Spinner/Spinner";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout } from "./PlaygroundHelpers";

const SIZES: SpinnerSize[] = ["xs", "sm", "md", "lg", "xl"];
const VARIANTS: SpinnerVariant[] = ["circle", "dots", "ring", "bars", "pulse"];

export default function SpinnerPlayground() {
  const [size, setSize] = useState<SpinnerSize>("md");
  const [variant, setVariant] = useState<SpinnerVariant>("circle");
  const [color, setColor] = useState<ColorName>("slate");

  const preview = <Spinner size={size} variant={variant} color={color} />;
  const code = `<Spinner variant="${variant}" size="${size}" color="${color}" />`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <ColorSwatches value={color} onChange={setColor} />
    </PlaygroundLayout>
  );
}
