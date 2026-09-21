import { useState } from "react";
import { SignupForm } from "./SignupForm/SignupForm";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function SignupFormPlayground() {
  const [title, setTitle] = useState("Create your account");
  const [description, setDescription] = useState("Start your free trial — no credit card required.");
  const [submitLabel, setSubmitLabel] = useState("Create account");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-sm">
          <SignupForm
            title={title || "Create your account"}
            description={description}
            submitLabel={submitLabel || "Create account"}
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const titleValue = title || "Create your account";
  const descriptionAttr = description ? `\n  description="${description}"` : "";
  const submitLabelValue = submitLabel || "Create account";

  const code = `<SignupForm
  title="${titleValue}"${descriptionAttr}
  submitLabel="${submitLabelValue}"
  onSubmit={(values) => console.log(values)}
/>`;

  const htmlMarkup = `<l-SignupForm title="${titleValue}"${descriptionAttr.replace(
    "\n ",
    " "
  )} submitLabel="${submitLabelValue}"></l-SignupForm>`;

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
          placeholder="Create your account"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Start your free trial — no credit card required."
        />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Submit label</span>
        <input
          value={submitLabel}
          onChange={(e) => setSubmitLabel(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Create account"
        />
      </div>
    </PlaygroundLayout>
  );
}
