import { useState } from "react";
import { Footer, type FooterVariant } from "./Footer/Footer";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { ColorName } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const VARIANTS: FooterVariant[] = ["light", "dark", "minimal", "accent"];

export default function FooterPlayground() {
  const motion = useMotion({ hover: false });
  const [copyright, setCopyright] = useState("© 2026 Lojee, Inc. All rights reserved.");
  const [showColumns, setShowColumns] = useState(true);
  const [variant, setVariant] = useState<FooterVariant>("light");
  const [color, setColor] = useState<ColorName>("accent");
  // "dark" and "accent" both sit on a strong background, so their text is light.
  const dark = variant === "dark" || variant === "accent";
  const headingClass = dark ? "text-white" : "text-fg";
  const linkClass = variant === "accent" ? "text-white/70 hover:text-white" : dark ? "text-fg-subtle hover:text-white" : "text-fg-muted hover:text-fg";

  const columns = (
    <>
      <div>
        <h4 className={`text-sm font-semibold ${headingClass}`}>Product</h4>
        <ul className="mt-3 space-y-2">
          <li>
            <a href="#" className={`text-sm ${linkClass}`}>
              Features
            </a>
          </li>
          <li>
            <a href="#" className={`text-sm ${linkClass}`}>
              Pricing
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className={`text-sm font-semibold ${headingClass}`}>Company</h4>
        <ul className="mt-3 space-y-2">
          <li>
            <a href="#" className={`text-sm ${linkClass}`}>
              About
            </a>
          </li>
          <li>
            <a href="#" className={`text-sm ${linkClass}`}>
              Careers
            </a>
          </li>
        </ul>
      </div>
    </>
  );

  // Footer docks to the bottom of a page — shown with a little page content
  // above it so it reads as sitting at the bottom of a real page.
  const preview = (
    <AppWindowFrame>
      {/* Fills the (full-height) preview window with the footer pinned to its bottom edge. */}
      <div className="flex min-h-[320px] flex-1 flex-col justify-between bg-surface">
        <div className="m-6 mb-0 flex flex-1 items-center justify-center rounded-xl border border-dashed border-border text-sm text-fg-subtle">
          Page content
        </div>
        <Footer
          key={motion.replayKey}
          {...motion.props}
          bottom={copyright ? <span className={variant === "dark" ? "text-fg-subtle" : undefined}>{copyright}</span> : undefined}
          variant={variant}
          color={color}
        >
          {showColumns ? columns : undefined}
        </Footer>
      </div>
    </AppWindowFrame>
  );

  const bottomValue = copyright || "© 2026 Lojee, Inc. All rights reserved.";
  const variantAttr =
    (variant !== "light" ? ` variant="${variant}"` : "") + (variant === "accent" && color !== "accent" ? ` color="${color}"` : "") +
    motion.attrs;
  const columnsJsx = `
  <div>
    <h4>Product</h4>
    <ul>
      <li><a href="#">Features</a></li>
      <li><a href="#">Pricing</a></li>
    </ul>
  </div>
  <div>
    <h4>Company</h4>
    <ul>
      <li><a href="#">About</a></li>
      <li><a href="#">Careers</a></li>
    </ul>
  </div>
`;

  const code = showColumns
    ? `<Footer bottom="${bottomValue}"${variantAttr}>${columnsJsx}</Footer>`
    : `<Footer bottom="${bottomValue}"${variantAttr} />`;

  const htmlMarkup = showColumns
    ? `<l-Footer bottom="${bottomValue}"${variantAttr}>${columnsJsx}</l-Footer>`
    : `<l-Footer bottom="${bottomValue}"${variantAttr} />`;

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
      {variant === "accent" && <ColorSwatches label="Color" value={color} onChange={setColor} />}
      <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
        <input type="checkbox" checked={showColumns} onChange={(e) => setShowColumns(e.target.checked)} />
        Show link columns
      </label>
      {motion.controls}
    </PlaygroundLayout>
  );
}
