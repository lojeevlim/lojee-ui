import { useState } from "react";
import { Footer, type FooterVariant } from "./Footer/Footer";
import { OptionGroup, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const VARIANTS: FooterVariant[] = ["light", "dark", "minimal"];

export default function FooterPlayground() {
  const [copyright, setCopyright] = useState("© 2026 Lojee, Inc. All rights reserved.");
  const [showColumns, setShowColumns] = useState(true);
  const [variant, setVariant] = useState<FooterVariant>("light");
  const dark = variant === "dark";
  const headingClass = dark ? "text-white" : "text-slate-900";
  const linkClass = dark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900";

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
      <div className="flex flex-col justify-between bg-white" style={{ height: 320 }}>
        <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-300 m-6 mb-0">
          Page content
        </div>
        <Footer
          bottom={copyright ? <span className={dark ? "text-slate-400" : undefined}>{copyright}</span> : undefined}
          variant={variant}
        >
          {showColumns ? columns : undefined}
        </Footer>
      </div>
    </AppWindowFrame>
  );

  const bottomValue = copyright || "© 2026 Lojee, Inc. All rights reserved.";
  const variantAttr = variant !== "light" ? ` variant="${variant}"` : "";
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

  const htmlMarkup = code;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Bottom text</span>
        <input
          value={copyright}
          onChange={(e) => setCopyright(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="© 2026 Lojee, Inc. All rights reserved."
        />
      </div>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <input type="checkbox" checked={showColumns} onChange={(e) => setShowColumns(e.target.checked)} />
        Show link columns
      </label>
    </PlaygroundLayout>
  );
}
