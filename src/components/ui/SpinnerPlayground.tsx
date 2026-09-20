import { useState } from "react";
import { Spinner, type SpinnerSize, type SpinnerVariant } from "./Spinner/Spinner";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const SIZES: SpinnerSize[] = ["xs", "sm", "md", "lg", "xl"];
const VARIANTS: SpinnerVariant[] = ["circle", "dots", "ring", "bars", "pulse"];

export default function SpinnerPlayground() {
  const [size, setSize] = useState<SpinnerSize>("md");
  const [variant, setVariant] = useState<SpinnerVariant>("circle");
  const [color, setColor] = useState<ColorName>("slate");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Spinner size={size} variant={variant} color={color} />
      </AppWindowBody>
    </AppWindowFrame>
  );
  const code = `<Spinner variant="${variant}" size="${size}" color="${color}" />`;

  const htmlMarkup = `<Spinner variant="${variant}" size="${size}" color="${color}" />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <ColorSwatches value={color} onChange={setColor} />
    </PlaygroundLayout>
  );
}
