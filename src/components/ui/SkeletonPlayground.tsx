import { useState } from "react";
import { Skeleton, type SkeletonAnimation, type SkeletonVariant } from "./Skeleton/Skeleton";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { wcCode } from "./webComponentCode";
import { useMotion } from "./playgroundMotion";

const VARIANTS: SkeletonVariant[] = ["text", "rect", "circle"];
const ANIMATIONS: SkeletonAnimation[] = ["pulse", "shimmer", "wave", "none"];
const LINES = ["1", "2", "3", "5"] as const;

export default function SkeletonPlayground() {
  const motion = useMotion({ hover: false });
  const [variant, setVariant] = useState<SkeletonVariant>("text");
  const [animation, setAnimation] = useState<SkeletonAnimation>("pulse");
  const [lines, setLines] = useState<(typeof LINES)[number]>("3");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-xs">
          <Skeleton key={motion.replayKey} {...motion.props} variant={variant} animation={animation} lines={variant === "text" ? Number(lines) : undefined} size={variant === "circle" ? 64 : undefined} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const attrs =
    (variant !== "text" ? ` variant="${variant}"` : "") +
    (variant === "text" && lines !== "1" ? ` lines={${lines}}` : "") +
    (animation !== "pulse" ? ` animation="${animation}"` : "") +
    motion.attrs;
  const htmlAttrs = attrs.replace(/ lines=\{(\d+)\}/, ' lines="$1"');

  return (
    <PlaygroundLayout
      preview={preview}
      variants={wcCode({ react: `<Skeleton${attrs} />`, html: `<l-skeleton${htmlAttrs}></l-skeleton>` })}
    >
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="Animation" options={ANIMATIONS} value={animation} onChange={setAnimation} />
      {variant === "text" && <OptionGroup label="Lines" options={LINES} value={lines} onChange={setLines} />}
      {motion.controls}
    </PlaygroundLayout>
  );
}
