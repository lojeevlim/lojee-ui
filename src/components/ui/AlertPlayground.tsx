import { useState } from "react";
import { Alert, type AlertVariant } from "./Alert/Alert";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";
import { useAnimation } from "./playgroundAnimation";

const VARIANTS: AlertVariant[] = ["info", "success", "warning", "error", "accent"];

export default function AlertPlayground() {
  const motion = useMotion();
  const anim = useAnimation();
  const [variant, setVariant] = useState<AlertVariant>("info");
  const [title, setTitle] = useState("Heads up");
  const [description, setDescription] = useState("This is an informational message.");
  const [closable, setClosable] = useState(false);
  const [visible, setVisible] = useState(true);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        {visible ? (
          <Alert key={motion.replayKey} {...motion.props}
            {...anim.props}
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
            className="text-sm font-medium text-fg-subtle underline underline-offset-4 hover:text-fg-muted"
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
  variant="${variant}"${anim.attrs}${motion.attrs}${titleAttr}${closableAttr}${onCloseProp}
>
  ${description || "This is an informational message."}
</Alert>`;

  const htmlMarkup = `<l-Alert variant="${variant}"${anim.attrs}${motion.attrs}${titleAttr}${closableAttr}>
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
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Heads up"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="This is an informational message."
        />
      </div>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Closable</span>
        <button
          type="button"
          onClick={() => {
            setClosable((v) => !v);
            setVisible(true);
          }}
          className={
            "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors " +
            (closable ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
          }
        >
          {closable ? "On" : "Off"}
        </button>
      </div>
      {anim.controls}
      {motion.controls}
    </PlaygroundLayout>
  );
}
