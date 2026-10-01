import { useState } from "react";
import { Spinner, type SpinnerSize, type SpinnerVariant } from "./Spinner/Spinner";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const SIZES: SpinnerSize[] = ["xs", "sm", "md", "lg", "xl"];
const VARIANTS: SpinnerVariant[] = ["circle", "dots", "ring", "bars", "pulse"];

export default function SpinnerPlayground() {
  const motion = useMotion({ hover: false });
  const [size, setSize] = useState<SpinnerSize>("md");
  const [variant, setVariant] = useState<SpinnerVariant>("circle");
  const [color, setColor] = useState<ColorName>("accent");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Spinner key={motion.replayKey} {...motion.props} size={size} variant={variant} color={color} />
      </AppWindowBody>
    </AppWindowFrame>
  );
  const code = `<Spinner variant="${variant}" size="${size}" color="${color}"${motion.attrs} />`;

  const htmlMarkup = `<l-Spinner variant="${variant}" size="${size}" color="${color}"${motion.attrs} />`;

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
      {motion.controls}
    </PlaygroundLayout>
  );
}
