import { useState } from "react";
import { Divider, type DividerOrientation } from "./Divider/Divider";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout } from "./PlaygroundHelpers";

const ORIENTATIONS: DividerOrientation[] = ["horizontal", "vertical"];

export default function DividerPlayground() {
  const [orientation, setOrientation] = useState<DividerOrientation>("horizontal");
  const [label, setLabel] = useState("");
  const [color, setColor] = useState<ColorName>("slate");
  const [resizable, setResizable] = useState(false);

  const isVertical = orientation === "vertical";

  const preview = isVertical ? (
    <div className="flex h-24 items-center gap-3">
      <div className="text-xs text-slate-400">Left</div>
      <Divider orientation="vertical" color={color} resizable={resizable} />
      <div className="text-xs text-slate-400">Right</div>
    </div>
  ) : (
    <div className="w-64">
      <Divider color={color} label={label || undefined} resizable={resizable} />
    </div>
  );

  const attrs = [
    isVertical ? `orientation="vertical"` : null,
    color !== "slate" ? `color="${color}"` : null,
    !isVertical && !resizable && label ? `label="${label}"` : null,
    resizable ? "resizable" : null,
  ]
    .filter(Boolean)
    .join(" ");
  const code = attrs ? `<Divider ${attrs} />` : `<Divider />`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <OptionGroup label="Orientation" options={ORIENTATIONS} value={orientation} onChange={setOrientation} />
      <ColorSwatches value={color} onChange={setColor} />

      {!isVertical && !resizable && (
        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-slate-500">Label</span>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
            placeholder="OR"
          />
        </div>
      )}

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Resizable</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setResizable((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (resizable ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            {resizable ? "On" : "Off"}
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
