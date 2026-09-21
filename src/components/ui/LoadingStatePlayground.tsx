import { useState } from "react";
import { LoadingState, type LoadingStateSize } from "./LoadingState/LoadingState";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const SIZES: LoadingStateSize[] = ["sm", "md", "lg"];

export default function LoadingStatePlayground() {
  const [title, setTitle] = useState("Loading…");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState<LoadingStateSize>("md");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[280px]">
        <LoadingState title={title || "Loading…"} size={size}>
          {description || undefined}
        </LoadingState>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const titleAttr = title && title !== "Loading…" ? ` title="${title}"` : "";
  const sizeAttr = size !== "md" ? ` size="${size}"` : "";
  const descriptionBlock = description ? `\n  ${description}\n` : "";

  const code = `<LoadingState${titleAttr}${sizeAttr}>${descriptionBlock}</LoadingState>`;

  // A self-closing tag when there's no description to project, matching how
  // the "react" variant collapses to `<LoadingState ... />` in the same case.
  const htmlMarkup = description
    ? `<l-LoadingState${titleAttr}${sizeAttr}>\n  ${description}\n</l-LoadingState>`
    : `<l-LoadingState${titleAttr}${sizeAttr} />`;

  const codeVariants: CodeBlockVariants = {
    react: description ? code : `<LoadingState${titleAttr}${sizeAttr} />`,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Loading…"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="This should only take a moment."
        />
      </div>
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
    </PlaygroundLayout>
  );
}
