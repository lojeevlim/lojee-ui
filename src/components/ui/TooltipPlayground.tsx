import { useState } from "react";
import { Tooltip, type TooltipPosition } from "./Tooltip/Tooltip";
import { Button } from "./Buttons/Button";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout } from "./PlaygroundHelpers";

const POSITIONS: TooltipPosition[] = ["top", "bottom", "left", "right"];
const DELAYS = [0, 150, 300, 500] as const;

export default function TooltipPlayground() {
  const [position, setPosition] = useState<TooltipPosition>("top");
  const [color, setColor] = useState<ColorName>("slate");
  const [delayMs, setDelayMs] = useState<(typeof DELAYS)[number]>(150);
  const [content, setContent] = useState("Tooltip text");

  const preview = (
    <Tooltip content={content || "Tooltip text"} position={position} color={color} delayMs={delayMs}>
      <Button variant="outline" label="Hover me" />
    </Tooltip>
  );

  const code = `<Tooltip content="${content || "Tooltip text"}" position="${position}"${
    color !== "slate" ? ` color="${color}"` : ""
  }${delayMs !== 150 ? ` delayMs={${delayMs}}` : ""}>
  <Button variant="outline" label="Hover me" />
</Tooltip>`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Content</span>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Tooltip text"
        />
      </div>

      <OptionGroup label="Position" options={POSITIONS} value={position} onChange={setPosition} />
      <OptionGroup
        label="Delay"
        options={DELAYS.map(String)}
        value={String(delayMs)}
        onChange={(v) => setDelayMs(Number(v) as (typeof DELAYS)[number])}
        render={(o) => (o === "0" ? "No delay" : `${o}ms`)}
      />
      <ColorSwatches value={color} onChange={setColor} />
    </PlaygroundLayout>
  );
}
