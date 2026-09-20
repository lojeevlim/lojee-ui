import { useState } from "react";
import { Label } from "./Label/Label";
import { Input } from "./Input/Input";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function LabelPlayground() {
  const [required, setRequired] = useState(false);
  const [text, setText] = useState("Email address");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="max-w-sm w-full space-y-1.5">
          <Label htmlFor="playground-field" required={required}>
            {text || "Email address"}
          </Label>
          <Input id="playground-field" placeholder="you@example.com" />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Label htmlFor="field"${required ? " required" : ""}>${text || "Email address"}</Label>
<Input id="field" placeholder="you@example.com" />`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions. `l-label`'s
  // registered attribute is literally `htmlFor` (not the HTML-standard
  // `for`), predating dash-casing conventions elsewhere.
  const htmlMarkup = `<Label htmlFor="field"${required ? ` required` : ""}>${
    text || "Email address"
  }</Label>
<Input id="field" placeholder="you@example.com" />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Text</span>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Label text"
        />
      </div>

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setRequired((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (required ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Required
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
