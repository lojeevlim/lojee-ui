import { useState } from "react";
import { Loader, type LoaderShape, type LoaderVariant } from "./Loader/Loader";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const SHAPES: LoaderShape[] = ["text", "circle", "rect"];
const VARIANTS: LoaderVariant[] = ["pulse", "shimmer", "wave", "none"];

export default function LoaderPlayground() {
  const motion = useMotion({ hover: false });
  const [shape, setShape] = useState<LoaderShape>("text");
  const [variant, setVariant] = useState<LoaderVariant>("pulse");
  const [lines, setLines] = useState(3);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        {shape === "text" ? (
          <div className="w-64">
            <Loader key={motion.replayKey} {...motion.props} shape="text" variant={variant} lines={lines} />
          </div>
        ) : shape === "circle" ? (
          <Loader key={motion.replayKey} {...motion.props} shape="circle" variant={variant} width={56} />
        ) : (
          <Loader key={motion.replayKey} {...motion.props} shape="rect" variant={variant} width={200} height={100} />
        )}
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code =
    shape === "text"
      ? `<Loader shape="text" variant="${variant}" lines={${lines}}${motion.attrs} />`
      : shape === "circle"
        ? `<Loader shape="circle" variant="${variant}" width={56}${motion.attrs} />`
        : `<Loader shape="rect" variant="${variant}" width={200} height={100}${motion.attrs} />`;

  const htmlMarkup =
    shape === "text"
      ? `<l-Loader shape="text" variant="${variant}" lines="${lines}"${motion.attrs} />`
      : shape === "circle"
        ? `<l-Loader shape="circle" variant="${variant}" width="56"${motion.attrs} />`
        : `<l-Loader shape="rect" variant="${variant}" width="200" height="100"${motion.attrs} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Shape" options={SHAPES} value={shape} onChange={setShape} />
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />

      {shape === "text" && (
        <OptionGroup
          label="Lines"
          options={["2", "3", "4", "5"]}
          value={String(lines)}
          onChange={(v) => setLines(Number(v))}
        />
      )}
      {motion.controls}
    </PlaygroundLayout>
  );
}
