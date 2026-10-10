import { useState } from "react";
import { LoadingState, type LoadingStateSize } from "./LoadingState/LoadingState";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const SIZES: LoadingStateSize[] = ["sm", "md", "lg"];

export default function LoadingStatePlayground() {
  const motion = useMotion({ hover: false });
  const [title, setTitle] = useState("Loading…");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState<LoadingStateSize>("md");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[280px]">
        <LoadingState key={motion.replayKey} {...motion.props} title={title || "Loading…"} size={size}>
          {description || undefined}
        </LoadingState>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const titleAttr = title && title !== "Loading…" ? ` title="${title}"` : "";
  const sizeAttr = size !== "md" ? ` size="${size}"` : "";
  const descriptionBlock = description ? `\n  ${description}\n` : "";

  const code = `<LoadingState${titleAttr}${sizeAttr}${motion.attrs}>${descriptionBlock}</LoadingState>`;

  // A self-closing tag when there's no description to project, matching how
  // the "react" variant collapses to `<LoadingState ... />` in the same case.
  const htmlMarkup = description
    ? `<l-loading-state${titleAttr}${sizeAttr}${motion.attrs}>\n  ${description}\n</l-loading-state>`
    : `<l-loading-state${titleAttr}${sizeAttr}${motion.attrs} />`;

  const codeVariants: CodeBlockVariants = {
    react: description ? code : `<LoadingState${titleAttr}${sizeAttr}${motion.attrs} />`,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Loading…"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="This should only take a moment."
        />
      </div>
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
