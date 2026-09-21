import { useState } from "react";
import { Navbar, type NavbarVariant } from "./Navbar/Navbar";
import { Button } from "./Buttons/Button";
import { Avatar } from "./Avatar/Avatar";
import { OptionGroup, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const VARIANTS: NavbarVariant[] = ["light", "dark", "elevated"];

export default function NavbarPlayground() {
  const [brand, setBrand] = useState("Lojee");
  const [sticky, setSticky] = useState(false);
  const [bordered, setBordered] = useState(true);
  const [variant, setVariant] = useState<NavbarVariant>("light");
  const onDark = variant === "dark";
  const linkClass = onDark ? "text-white/80 hover:text-white hover:bg-white/10" : undefined;

  const navbar = (
    <Navbar
      brand={brand ? <span className={onDark ? "text-white" : undefined}>{brand}</span> : undefined}
      sticky={sticky}
      bordered={bordered}
      variant={variant}
      actions={<Avatar initials="JD" size="sm" />}
    >
      <Button variant="ghost" label="Home" className={linkClass} />
      <Button variant="ghost" label="Products" className={linkClass} />
    </Navbar>
  );

  // Navbar docks to the top of a page — shown with scrollable content below
  // it so toggling `sticky` demonstrates something real: pinned in place vs.
  // scrolling away with the rest of the page.
  const preview = (
    <AppWindowFrame>
      <div className="h-56 overflow-y-auto bg-white">
        {navbar}
        <div className="space-y-3 p-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <p key={i} className="text-sm text-slate-400">
              Scroll row {i + 1}
            </p>
          ))}
        </div>
      </div>
    </AppWindowFrame>
  );

  const brandAttr = brand ? ` brand="${brand}"` : "";
  const stickyAttr = sticky ? " sticky" : "";
  const borderedAttrJsx = bordered ? "" : " bordered={false}";
  const borderedAttrHtml = bordered ? "" : ` bordered="false"`;
  const variantAttr = variant !== "light" ? ` variant="${variant}"` : "";

  const code = `<Navbar${brandAttr}${stickyAttr}${borderedAttrJsx}${variantAttr} actions={<Avatar initials="JD" size="sm" />}>
  <Button variant="ghost" label="Home" />
  <Button variant="ghost" label="Products" />
</Navbar>`;

  // Custom-element markup: `brand` stays a plain snapshot attribute (simple
  // text), while `actions` (an Avatar component) is projected as light-DOM
  // content via slot="actions" — same treatment NotificationShowcase.tsx
  // gives its `actions` prop.
  const htmlMarkup = `<l-Navbar${brandAttr}${stickyAttr}${borderedAttrHtml}${variantAttr}>
  <l-Button variant="ghost" label="Home" />
  <l-Button variant="ghost" label="Products" />
  <div slot="actions">
    <l-Avatar initials="JD" size="sm" />
  </div>
</l-Navbar>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Brand</span>
        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Lojee"
        />
      </div>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <input type="checkbox" checked={sticky} onChange={(e) => setSticky(e.target.checked)} />
          Sticky
        </label>
        <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <input type="checkbox" checked={bordered} onChange={(e) => setBordered(e.target.checked)} />
          Bordered
        </label>
      </div>
    </PlaygroundLayout>
  );
}
