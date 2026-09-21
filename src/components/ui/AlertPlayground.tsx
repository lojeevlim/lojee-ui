import { useState } from "react";
import { Alert, type AlertVariant } from "./Alert/Alert";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const VARIANTS: AlertVariant[] = ["info", "success", "warning", "error"];

export default function AlertPlayground() {
  const [variant, setVariant] = useState<AlertVariant>("info");
  const [title, setTitle] = useState("Heads up");
  const [description, setDescription] = useState("This is an informational message.");
  const [closable, setClosable] = useState(false);
  const [visible, setVisible] = useState(true);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        {visible ? (
          <Alert
            variant={variant}
            title={title || undefined}
            closable={closable}
            onClose={() => setVisible(false)}
          >
            {description || "This is an informational message."}
          </Alert>
        ) : (
          <button
            type="button"
            onClick={() => setVisible(true)}
            className="text-sm font-medium text-slate-500 underline underline-offset-4 hover:text-slate-700"
          >
            Show alert again
          </button>
        )}
      </AppWindowBody>
    </AppWindowFrame>
  );

  const titleAttr = title ? `\n  title="${title}"` : "";
  const closableAttr = closable ? "\n  closable" : "";
  const onCloseProp = closable ? "\n  onClose={() => setVisible(false)}" : "";

  const code = `<Alert
  variant="${variant}"${titleAttr}${closableAttr}${onCloseProp}
>
  ${description || "This is an informational message."}
</Alert>`;

  const htmlMarkup = `<l-Alert variant="${variant}"${titleAttr}${closableAttr}>
  ${description || "This is an informational message."}
</l-Alert>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Heads up"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="This is an informational message."
        />
      </div>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Closable</span>
        <button
          type="button"
          onClick={() => {
            setClosable((v) => !v);
            setVisible(true);
          }}
          className={
            "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors " +
            (closable ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
          }
        >
          {closable ? "On" : "Off"}
        </button>
      </div>
    </PlaygroundLayout>
  );
}
