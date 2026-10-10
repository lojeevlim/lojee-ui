import { useState } from "react";
import { Breadcrumbs } from "./Breadcrumbs/Breadcrumbs";
import { BreadcrumbItem } from "./Breadcrumbs/BreadcrumbItem";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const VARIANTS = ["text", "solid", "outline", "soft"] as const;

export default function BreadcrumbsPlayground() {
  const motion = useMotion({ hover: false });
  const [lastIcon, setLastIcon] = useState(false);
  const [color, setColor] = useState<string>("accent");
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>("text");

  // "accent" / "text" are the defaults, so they are only written out when changed.
  const attrs = [color !== "accent" ? `color="${color}"` : null, variant !== "text" ? `variant="${variant}"` : null]
    .filter(Boolean)
    .join(" ");
  const attrStr = (attrs ? ` ${attrs}` : "") + motion.attrs;

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Breadcrumbs key={motion.replayKey} {...motion.props} color={color} variant={variant}>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
          <BreadcrumbItem icon={lastIcon ? "circle-user" : undefined}>Profile</BreadcrumbItem>
        </Breadcrumbs>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Breadcrumbs${attrStr}>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
  <BreadcrumbItem${lastIcon ? ` icon="circle-user"` : ""}>Profile</BreadcrumbItem>
</Breadcrumbs>`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = `<l-breadcrumbs${attrStr}>
  <l-breadcrumb-item href="/">Home</l-breadcrumb-item>
  <l-breadcrumb-item href="/projects">Projects</l-breadcrumb-item>
  <l-breadcrumb-item${lastIcon ? ` icon="circle-user"` : ""}>Profile</l-breadcrumb-item>
</l-breadcrumbs>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <ColorSwatches value={color} onChange={setColor} custom />
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setLastIcon((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (lastIcon ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Icon on last item
          </button>
        </div>
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
