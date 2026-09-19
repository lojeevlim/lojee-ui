import { useState } from "react";
import { Breadcrumbs } from "./Breadcrumbs/Breadcrumbs";
import { BreadcrumbItem } from "./Breadcrumbs/BreadcrumbItem";
import { PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function BreadcrumbsPlayground() {
  const [lastIcon, setLastIcon] = useState(false);

  const preview = (
    <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
      <BreadcrumbItem icon={lastIcon ? "circle-user" : undefined}>Profile</BreadcrumbItem>
    </Breadcrumbs>
  );

  const code = `<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
  <BreadcrumbItem${lastIcon ? ` icon="circle-user"` : ""}>Profile</BreadcrumbItem>
</Breadcrumbs>`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = `<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
  <BreadcrumbItem${lastIcon ? ` icon="circle-user"` : ""}>Profile</BreadcrumbItem>
</Breadcrumbs>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setLastIcon((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (lastIcon ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Icon on last item
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
