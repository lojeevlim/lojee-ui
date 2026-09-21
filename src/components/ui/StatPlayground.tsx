import { useState } from "react";
import { Stat, type StatTrend } from "./Stat/Stat";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const TRENDS: StatTrend[] = ["neutral", "up", "down"];

export default function StatPlayground() {
  const [label, setLabel] = useState("Revenue");
  const [value, setValue] = useState("$48,290");
  const [change, setChange] = useState("12.5%");
  const [trend, setTrend] = useState<StatTrend>("up");
  const [color, setColor] = useState<ColorName>("indigo");
  const [icon, setIcon] = useState(true);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-64">
          <Stat
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
  const colorAttr = icon && color !== "slate" ? ` color="${color}"` : "";

  const code = `<Stat label="${labelValue}" value="${valueValue}"${changeAttr}${trendAttr}${iconAttr}${colorAttr} />`;

  // Custom-element markup for the js/vue/angular tabs — identical to `code`
  // above except for the tag name, since Vue/Angular/plain HTML can only
  // ever consume the real `<l-Stat>` custom element, never the bare
  // PascalCase tag React uses.
  const htmlMarkup = `<l-Stat label="${labelValue}" value="${valueValue}"${changeAttr}${trendAttr}${iconAttr}${colorAttr} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Label</span>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Revenue"
        />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Value</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="$48,290"
        />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Change</span>
        <input
          value={change}
          onChange={(e) => setChange(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="12.5%"
        />
      </div>
      <OptionGroup label="Trend" options={TRENDS} value={trend} onChange={setTrend} />
      <ColorSwatches value={color} onChange={setColor} />
      <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <input type="checkbox" checked={icon} onChange={(e) => setIcon(e.target.checked)} />
        Show icon
      </label>
    </PlaygroundLayout>
  );
}
