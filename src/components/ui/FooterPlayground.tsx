import { useState } from "react";
import { PREVIEW_PAGE_BG } from "./playgroundUtils";
import { Footer } from "./Footer/Footer";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

export default function FooterPlayground() {
  const motion = useMotion({ hover: false });
  const [copyright, setCopyright] = useState("© 2026 Lojee, Inc. All rights reserved.");
  const [color, setColor] = useState<string>("accent");
  const [useColor, setUseColor] = useState(false);
  const effColor = useColor ? color : undefined;
  // Footer docks to the bottom of a page — shown with a little page content
  // above it so it reads as sitting at the bottom of a real page.
  const preview = (
    <AppWindowFrame>
      {/* Fills the (full-height) preview window with the footer pinned to its bottom edge. */}
      <div className={`flex min-h-[320px] flex-1 flex-col justify-between ${PREVIEW_PAGE_BG}`}>
        <div className="m-6 mb-0 flex flex-1 items-center justify-center rounded-xl border border-dashed border-border text-sm text-fg-subtle">
          Page content
        </div>
        <Footer
          key={motion.replayKey}
          {...motion.props}
          bottom={copyright || undefined}
          color={effColor}
        >
          <div className="col-span-2 sm:col-span-4">
            <h4 className={`text-sm font-semibold ${effColor ? "text-white" : "text-fg"}`}>Lojee</h4>
            <p className={`mt-1 text-sm ${effColor ? "text-white/70" : "text-fg-muted"}`}>
              Build interfaces faster with a small, themeable component library.
            </p>
          </div>
        </Footer>
      </div>
    </AppWindowFrame>
  );

  const bottomValue = copyright || "© 2026 Lojee, Inc. All rights reserved.";
  const variantAttr = (effColor ? ` color="${effColor}"` : "") + motion.attrs;
  const body = "<h4>Lojee</h4>\n  <p>Build interfaces faster with a small, themeable component library.</p>";
  const code = `<Footer bottom="${bottomValue}"${variantAttr}>\n  ${body}\n</Footer>`;
  const htmlMarkup = `<l-footer bottom="${bottomValue}"${variantAttr}>\n  ${body}\n</l-footer>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Bottom text</span>
        <input
          value={copyright}
          onChange={(e) => setCopyright(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="© 2026 Lojee, Inc. All rights reserved."
        />
      </div>
      <OptionGroup label="Fill" options={["neutral", "color"] as const} value={useColor ? "color" : "neutral"} onChange={(v) => setUseColor(v === "color")} />
      {useColor && <ColorSwatches label="Color" value={color} onChange={setColor} custom />}
      {motion.controls}
    </PlaygroundLayout>
  );
}
