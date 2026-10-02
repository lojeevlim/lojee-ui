import { useState } from "react";
import { PREVIEW_PAGE_BG } from "./playgroundUtils";
import { Footer, type FooterVariant } from "./Footer/Footer";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const VARIANTS: FooterVariant[] = ["light", "dark", "minimal", "accent"];

export default function FooterPlayground() {
  const motion = useMotion({ hover: false });
  const [copyright, setCopyright] = useState("© 2026 Lojee, Inc. All rights reserved.");
  const [variant, setVariant] = useState<FooterVariant>("light");
  const [color, setColor] = useState<string>("accent");
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
          bottom={copyright ? <span className={variant === "dark" ? "text-fg-subtle" : undefined}>{copyright}</span> : undefined}
          variant={variant}
          color={color}
        />
      </div>
    </AppWindowFrame>
  );

  const bottomValue = copyright || "© 2026 Lojee, Inc. All rights reserved.";
  const variantAttr =
    (variant !== "light" ? ` variant="${variant}"` : "") + (variant === "accent" && color !== "accent" ? ` color="${color}"` : "") +
    motion.attrs;
  const code = `<Footer bottom="${bottomValue}"${variantAttr} />`;
  const htmlMarkup = `<l-Footer bottom="${bottomValue}"${variantAttr}></l-Footer>`;

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
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      {variant === "accent" && <ColorSwatches label="Color" value={color} onChange={setColor} custom />}
      {motion.controls}
    </PlaygroundLayout>
  );
}
