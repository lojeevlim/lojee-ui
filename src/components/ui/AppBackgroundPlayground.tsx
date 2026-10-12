import { useState } from "react";
import { AppBackground, type AppBackgroundSide, type AppBackgroundVariant } from "./AppBackground/AppBackground";
import { APP_BACKGROUND_HAS_MOTES, APP_BACKGROUND_VARIANTS } from "./AppBackground/variants";
import { OptionGroup, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const SIDES: AppBackgroundSide[] = ["both", "left", "right"];

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-fg-subtle">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={"rounded-md px-2.5 py-1 text-xs font-medium transition-colors " + (value ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")}
      >
        {value ? "On" : "Off"}
      </button>
    </div>
  );
}

export default function AppBackgroundPlayground() {
  const [variant, setVariant] = useState<AppBackgroundVariant>("side-glow");
  const [side, setSide] = useState<AppBackgroundSide>("both");
  const [animated, setAnimated] = useState(true);
  const [hover, setHover] = useState(true);
  const [motes, setMotes] = useState(true);
  const [progress, setProgress] = useState(0);

  const isGlow = variant === "side-glow";
  const hasMotes = APP_BACKGROUND_HAS_MOTES.includes(variant);

  const preview = (
    <AppWindowFrame>
      <AppBackground variant={variant} side={side} animated={animated} hover={hover} motes={motes} progress={progress} className="flex min-h-[260px] flex-1 items-center justify-center bg-surface">
        <div className="text-center">
          <p className="text-lg font-semibold text-fg">{variant}</p>
          <p className="mt-1 text-xs text-fg-subtle">Content sits on top of the background</p>
        </div>
      </AppBackground>
    </AppWindowFrame>
  );

  const attrs = [
    variant !== "side-glow" ? `variant="${variant}"` : null,
    isGlow && side !== "both" ? `side="${side}"` : null,
    !animated ? "animated={false}" : null,
    !hover ? "hover={false}" : null,
    hasMotes && !motes ? "motes={false}" : null,
    progress > 0 ? `progress={${progress}}` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const code = `<AppBackground${attrs ? ` ${attrs}` : ""} className="h-72 bg-surface">\n  {/* your content */}\n</AppBackground>`;

  // Boolean props on the custom element need an explicit ="true" / ="false" (a bare attribute reads as false).
  const htmlAttrs = [
    variant !== "side-glow" ? `variant="${variant}"` : null,
    isGlow && side !== "both" ? `side="${side}"` : null,
    !animated ? `animated="false"` : null,
    !hover ? `hover="false"` : null,
    hasMotes && !motes ? `motes="false"` : null,
    progress > 0 ? `progress="${progress}"` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const htmlMarkup = `<l-app-background${htmlAttrs ? ` ${htmlAttrs}` : ""} style="height: 18rem">\n  <!-- your content -->\n</l-app-background>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <OptionGroup label="Variant" options={APP_BACKGROUND_VARIANTS} value={variant} onChange={setVariant} />
      </div>
      {isGlow && <OptionGroup label="Side" options={SIDES} value={side} onChange={setSide} />}
      <Toggle label="Animated" value={animated} onChange={setAnimated} />
      <Toggle label="Hover effect" value={hover} onChange={setHover} />
      {hasMotes && <Toggle label="Motes" value={motes} onChange={setMotes} />}
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Fade ({progress.toFixed(2)})</span>
        <input type="range" min={0} max={1} step={0.01} value={progress} onChange={(e) => setProgress(Number(e.target.value))} aria-label="Fade amount" className="w-full" />
      </div>
    </PlaygroundLayout>
  );
}
