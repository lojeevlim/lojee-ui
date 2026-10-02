import { useState } from "react";
import { Video, type VideoFit, type VideoRadius, type VideoRatio } from "./Video/Video";
import { sampleImage } from "./Image/samples";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const SOURCES = ["file", "youtube", "vimeo", "broken link"] as const;
const URLS: Record<(typeof SOURCES)[number], string> = {
  file: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  youtube: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  vimeo: "https://vimeo.com/76979871",
  "broken link": "/this-video-does-not-exist.mp4",
};
const CODE_URLS: Record<(typeof SOURCES)[number], string> = { ...URLS, file: "/media/intro.mp4", "broken link": "/missing.mp4" };
const RATIOS: VideoRatio[] = ["16/9", "auto", "1/1", "4/3", "21/9"];
const FITS: VideoFit[] = ["contain", "cover", "fill"];
const RADII: VideoRadius[] = ["none", "sm", "md", "lg", "xl"];
const TOGGLE = ["off", "on"] as const;

export default function VideoPlayground() {
  const motion = useMotion();
  const [source, setSource] = useState<(typeof SOURCES)[number]>("file");
  const [ratio, setRatio] = useState<VideoRatio>("16/9");
  const [fit, setFit] = useState<VideoFit>("contain");
  const [rounded, setRounded] = useState<VideoRadius>("lg");
  const [controls, setControls] = useState<(typeof TOGGLE)[number]>("on");
  const [autoPlay, setAutoPlay] = useState<(typeof TOGGLE)[number]>("off");
  const [loop, setLoop] = useState<(typeof TOGGLE)[number]>("off");
  const [poster, setPoster] = useState<(typeof TOGGLE)[number]>("off");

  const isFile = source === "file";
  const posterOn = isFile && poster === "on";

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-md">
          <Video
            key={`${motion.replayKey}-${source}-${autoPlay}-${loop}-${controls}`}
            {...motion.props}
            src={URLS[source]}
            poster={posterOn ? sampleImage(1, 1280, 720) : undefined}
            label="Sample video"
            ratio={ratio}
            fit={fit}
            rounded={rounded}
            controls={controls === "on"}
            autoPlay={autoPlay === "on"}
            loop={loop === "on"}
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const reactAttrs =
    (ratio !== "16/9" ? ` ratio="${ratio}"` : "") +
    (fit !== "contain" ? ` fit="${fit}"` : "") +
    (rounded !== "lg" ? ` rounded="${rounded}"` : "") +
    (controls === "off" ? " controls={false}" : "") +
    (autoPlay === "on" ? " autoPlay" : "") +
    (loop === "on" ? " loop" : "") +
    (posterOn ? ' poster="/media/intro.jpg"' : "") +
    motion.attrs;
  const htmlAttr = (name: string, on: boolean, bind: (n: string, v: string) => string) => (on ? ` ${bind(name, "true")}` : "");
  const html = (bind: (n: string, v: string) => string) =>
    (ratio !== "16/9" ? ` ratio="${ratio}"` : "") +
    (fit !== "contain" ? ` fit="${fit}"` : "") +
    (rounded !== "lg" ? ` rounded="${rounded}"` : "") +
    (controls === "off" ? ` ${bind("controls", "false")}` : "") +
    htmlAttr("auto-play", autoPlay === "on", bind) +
    htmlAttr("loop", loop === "on", bind) +
    (posterOn ? ' poster="/media/intro.jpg"' : "") +
    motion.attrs;
  const plain = (n: string, v: string) => `${n}="${v}"`;
  const vue = (n: string, v: string) => `:${n}="${v}"`;
  const angular = (n: string, v: string) => `[${n.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())}]="${v}"`;
  const tag = (attrs: string) => `<l-Video src="${CODE_URLS[source]}" label="Sample video"${attrs}></l-Video>`;

  const codeVariants: CodeBlockVariants = {
    react: `<Video src="${CODE_URLS[source]}" label="Sample video"${reactAttrs} />`,
    js: `${tag(html(plain))}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: `<template>\n  ${tag(html(vue))}\n</template>\n\n<script setup lang="ts">\nimport "lojee-ui/elements";\n</script>`,
    angular: tag(html(angular)),
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Source" options={SOURCES} value={source} onChange={setSource} />
      <OptionGroup label="Ratio" options={RATIOS} value={ratio} onChange={setRatio} />
      <OptionGroup label="Fit (files)" options={FITS} value={fit} onChange={setFit} />
      <OptionGroup label="Rounded" options={RADII} value={rounded} onChange={setRounded} />
      <OptionGroup label="Controls" options={TOGGLE} value={controls} onChange={setControls} />
      <OptionGroup label="Autoplay (muted)" options={TOGGLE} value={autoPlay} onChange={setAutoPlay} />
      <OptionGroup label="Loop" options={TOGGLE} value={loop} onChange={setLoop} />
      <OptionGroup label="Poster (files)" options={TOGGLE} value={poster} onChange={setPoster} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
