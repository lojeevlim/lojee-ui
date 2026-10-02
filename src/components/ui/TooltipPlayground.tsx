import { useState } from "react";
import { Tooltip, type TooltipPosition } from "./Tooltip/Tooltip";
import { Button } from "./Buttons/Button";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const POSITIONS: TooltipPosition[] = ["top", "bottom", "left", "right"];
const DELAYS = [0, 150, 300, 500] as const;
const TOGGLE = ["off", "on"] as const;
const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

export default function TooltipPlayground() {
  const motion = useMotion({ hover: false });
  const [position, setPosition] = useState<TooltipPosition>("top");
  const [color, setColor] = useState<ColorName>("accent");
  const [delayMs, setDelayMs] = useState<(typeof DELAYS)[number]>(150);
  const [content, setContent] = useState("Tooltip text");
  const [size, setSize] = useState<(typeof SIZES)[number]>("md");
  // "Active" keeps the bubble showing without hovering, so every setting is visible right away.
  const [active, setActive] = useState<(typeof TOGGLE)[number]>("off");

  const preview = (
    // `overflow-visible` — the tooltip bubble needs to escape the window
    // frame's rounded corners instead of getting clipped by them.
    <AppWindowFrame className="overflow-visible">
      <AppWindowBody>
        <Tooltip {...motion.props} content={content || "Tooltip text"} position={position} size={size} color={color} delayMs={delayMs} open={active === "on"}>
          <Button variant="outline" label="Hover me" />
        </Tooltip>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Tooltip content="${content || "Tooltip text"}" position="${position}"${
    color !== "accent" ? ` color="${color}"` : ""
  }${size !== "md" ? ` size="${size}"` : ""}${delayMs !== 150 ? ` delayMs={${delayMs}}` : ""}${active === "on" ? " open" : ""}${motion.attrs}>
  <Button variant="outline" label="Hover me" />
</Tooltip>`;

  // Custom-element markup for the current configuration — l-tooltip's
  // trigger is the default slot, so the trigger element nests as a plain
  // child, mirroring how the React code nests <Button> inside <Tooltip>.
  const htmlMarkup = `<l-Tooltip content="${content || "Tooltip text"}" position="${position}"${
    color !== "accent" ? ` color="${color}"` : ""
  }${size !== "md" ? ` size="${size}"` : ""}${delayMs !== 150 ? ` delayMs="${delayMs}"` : ""}${active === "on" ? ' open="true"' : ""}${motion.attrs}>
  <l-Button variant="outline" label="Hover me" />
</l-Tooltip>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Content</span>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Tooltip text"
        />
      </div>

      <OptionGroup label="Position" options={POSITIONS} value={position} onChange={setPosition} />
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <OptionGroup
        label="Delay"
        options={DELAYS.map(String)}
        value={String(delayMs)}
        onChange={(v) => setDelayMs(Number(v) as (typeof DELAYS)[number])}
        render={(o) => (o === "0" ? "No delay" : `${o}ms`)}
      />
      <OptionGroup label="Active (always visible)" options={TOGGLE} value={active} onChange={setActive} />
      <ColorSwatches value={color} onChange={setColor} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
