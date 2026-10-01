import { useState } from "react";
import { Divider, type DividerOrientation } from "./Divider/Divider";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const ORIENTATIONS: DividerOrientation[] = ["horizontal", "vertical"];

export default function DividerPlayground() {
  const [orientation, setOrientation] = useState<DividerOrientation>("horizontal");
  const [label, setLabel] = useState("");
  const [color, setColor] = useState<ColorName>("accent");
  const [resizable, setResizable] = useState(false);
  const motion = useMotion({ hover: false });

  const isVertical = orientation === "vertical";

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        {isVertical ? (
          <div className="flex h-24 items-center gap-3">
            <div className="text-xs text-fg-subtle">Left</div>
            <Divider key={motion.replayKey} {...motion.props} orientation="vertical" color={color} resizable={resizable} />
            <div className="text-xs text-fg-subtle">Right</div>
          </div>
        ) : (
          <div className="w-64">
            <Divider key={motion.replayKey} {...motion.props} color={color} label={label || undefined} resizable={resizable} />
          </div>
        )}
      </AppWindowBody>
    </AppWindowFrame>
  );

  const attrs = [
    isVertical ? `orientation="vertical"` : null,
    color !== "accent" ? `color="${color}"` : null,
    !isVertical && !resizable && label ? `label="${label}"` : null,
    resizable ? "resizable" : null,
  ]
    .filter(Boolean)
    .join(" ");
  const code = attrs || motion.attrs ? `<Divider${attrs ? ` ${attrs}` : ""}${motion.attrs} />` : `<Divider />`;

  // Custom-element markup for the current configuration — `resizable` is a
  // boolean prop, so it must be written as an explicit `="true"` (a bare
  // attribute would parse to false via r2wc's boolean parser).
  const htmlAttrs = [
    isVertical ? `orientation="vertical"` : null,
    color !== "accent" ? `color="${color}"` : null,
    !isVertical && !resizable && label ? `label="${label}"` : null,
    resizable ? `resizable="true"` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const htmlMarkup = htmlAttrs || motion.attrs ? `<l-Divider${htmlAttrs ? ` ${htmlAttrs}` : ""}${motion.attrs} />` : `<l-Divider />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Orientation" options={ORIENTATIONS} value={orientation} onChange={setOrientation} />
      <ColorSwatches value={color} onChange={setColor} />

      {!isVertical && !resizable && (
        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Label</span>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
            placeholder="OR"
          />
        </div>
      )}

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Resizable</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setResizable((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (resizable ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            {resizable ? "On" : "Off"}
          </button>
        </div>
      </div>

      {motion.controls}
    </PlaygroundLayout>
  );
}
