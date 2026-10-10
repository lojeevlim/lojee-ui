import { useState } from "react";
import { Image, type ImageFit, type ImageRadius, type ImageRatio } from "./Image/Image";
import { sampleImage } from "./Image/samples";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const RATIOS: ImageRatio[] = ["auto", "1/1", "4/3", "3/2", "16/9", "21/9"];
const FITS: ImageFit[] = ["cover", "contain", "fill", "none"];
const RADII: ImageRadius[] = ["none", "sm", "md", "lg", "xl", "full"];
const SOURCES = ["picture", "broken link"] as const;
const LOADINGS = ["lazy", "eager"] as const;

export default function ImagePlayground() {
  const motion = useMotion();
  const [ratio, setRatio] = useState<ImageRatio>("4/3");
  const [fit, setFit] = useState<ImageFit>("cover");
  const [rounded, setRounded] = useState<ImageRadius>("lg");
  const [source, setSource] = useState<(typeof SOURCES)[number]>("picture");
  const [loading, setLoading] = useState<(typeof LOADINGS)[number]>("lazy");
  const [caption, setCaption] = useState("");

  const src = source === "picture" ? sampleImage(0) : "/this-image-does-not-exist.jpg";
  const codeSrc = source === "picture" ? "/photos/landscape.jpg" : "/missing.jpg";

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-sm">
          <Image key={`${motion.replayKey}-${source}`} {...motion.props} src={src} alt="Sample picture" ratio={ratio} fit={fit} rounded={rounded} loading={loading} caption={caption || undefined} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const attrs =
    (ratio !== "auto" ? ` ratio="${ratio}"` : "") +
    (fit !== "cover" ? ` fit="${fit}"` : "") +
    (rounded !== "lg" ? ` rounded="${rounded}"` : "") +
    (loading !== "lazy" ? ` loading="${loading}"` : "") +
    (caption ? ` caption="${caption}"` : "") +
    motion.attrs;

  const markup = `<l-image src="${codeSrc}" alt="Sample picture"${attrs}></l-image>`;
  const codeVariants: CodeBlockVariants = {
    react: `<Image src="${codeSrc}" alt="Sample picture"${attrs} />`,
    js: `${markup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: `<template>\n  ${markup}\n</template>\n\n<script setup lang="ts">\nimport "lojee-ui/elements";\n</script>`,
    angular: markup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Source" options={SOURCES} value={source} onChange={setSource} />
      <OptionGroup label="Ratio" options={RATIOS} value={ratio} onChange={setRatio} />
      <OptionGroup label="Fit" options={FITS} value={fit} onChange={setFit} />
      <OptionGroup label="Rounded" options={RADII} value={rounded} onChange={setRounded} />
      <OptionGroup label="Loading" options={LOADINGS} value={loading} onChange={setLoading} />
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Caption</span>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Optional caption"
        />
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
