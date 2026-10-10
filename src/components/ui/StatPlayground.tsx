import { useState } from "react";
import { Stat, type StatTrend } from "./Stat/Stat";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useAnimation } from "./playgroundAnimation";
import { useMotion } from "./playgroundMotion";

const TRENDS: StatTrend[] = ["neutral", "up", "down"];

export default function StatPlayground() {
  const anim = useAnimation();
  const motion = useMotion();
  const [label, setLabel] = useState("Revenue");
  const [value, setValue] = useState("$48,290");
  const [change, setChange] = useState("12.5%");
  const [trend, setTrend] = useState<StatTrend>("up");
  const [color, setColor] = useState<ColorName>("accent");
  const [icon, setIcon] = useState(true);
  const [countUp, setCountUp] = useState(false);
  // Bumped to remount the preview so the count-up can be replayed on demand.
  const [countKey, setCountKey] = useState(0);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-64">
          <Stat
            key={`${motion.replayKey}-${countKey}`}
            countUp={countUp}
            {...anim.props}
            {...motion.props}
            label={label || "Revenue"}
            value={value || "$48,290"}
            change={change || undefined}
            trend={trend}
            icon={icon ? "zap" : undefined}
            color={color}
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const labelValue = label || "Revenue";
  const valueValue = value || "$48,290";
  const changeAttr = change ? ` change="${change}"` : "";
  const trendAttr = change && trend !== "neutral" ? ` trend="${trend}"` : "";
  const iconAttr = icon ? ` icon="zap"` : "";
  const colorAttr = (icon && color !== "accent" ? ` color="${color}"` : "") + (countUp ? " countUp" : "") + anim.attrs + motion.attrs;

  const code = `<Stat label="${labelValue}" value="${valueValue}"${changeAttr}${trendAttr}${iconAttr}${colorAttr} />`;

  // Custom-element markup for the js/vue/angular tabs — identical to `code`
  // above except for the tag name, since Vue/Angular/plain HTML can only
  // ever consume the real `<l-stat>` custom element, never the bare
  // PascalCase tag React uses.
  const htmlMarkup = `<l-stat label="${labelValue}" value="${valueValue}"${changeAttr}${trendAttr}${iconAttr}${colorAttr.replace(" countUp", " count-up")} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Label</span>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Revenue"
        />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Value</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="$48,290"
        />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Change</span>
        <input
          value={change}
          onChange={(e) => setChange(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="12.5%"
        />
      </div>
      <OptionGroup label="Trend" options={TRENDS} value={trend} onChange={setTrend} />
      <ColorSwatches value={color} onChange={setColor} />
      <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
        <input type="checkbox" checked={icon} onChange={(e) => setIcon(e.target.checked)} />
        Show icon
      </label>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
          <input
            type="checkbox"
            checked={countUp}
            onChange={(e) => {
              setCountUp(e.target.checked);
              setCountKey((n) => n + 1);
            }}
          />
          Count up
        </label>
        {countUp && (
          <button
            type="button"
            onClick={() => setCountKey((n) => n + 1)}
            className="rounded-md bg-surface-muted px-2.5 py-1 text-xs font-medium text-fg-muted hover:bg-border"
          >
            Replay
          </button>
        )}
      </div>
      {anim.controls}
      {motion.controls}
    </PlaygroundLayout>
  );
}
