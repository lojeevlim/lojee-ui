import { useState } from "react";
import { LoginForm } from "./LoginForm/LoginForm";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function LoginFormPlayground() {
  const [title, setTitle] = useState("Welcome back");
  const [description, setDescription] = useState("Log in to your account to continue.");
  const [submitLabel, setSubmitLabel] = useState("Log in");
  const [showRemember, setShowRemember] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(true);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-sm">
          <LoginForm
            title={title || "Welcome back"}
            description={description}
            submitLabel={submitLabel || "Log in"}
            showRemember={showRemember}
            showForgotPassword={showForgotPassword}
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const titleValue = title || "Welcome back";
  const descriptionAttr = description ? `\n  description="${description}"` : "";
  const submitLabelValue = submitLabel || "Log in";
  const rememberAttrJsx = showRemember ? "" : "\n  showRemember={false}";
  const forgotAttrJsx = showForgotPassword ? "" : "\n  showForgotPassword={false}";
  const rememberAttrHtml = showRemember ? "" : ` showRemember="false"`;
  const forgotAttrHtml = showForgotPassword ? "" : ` showForgotPassword="false"`;

  const code = `<LoginForm
  title="${titleValue}"${descriptionAttr}
  submitLabel="${submitLabelValue}"${rememberAttrJsx}${forgotAttrJsx}
  onSubmit={(values) => console.log(values)}
/>`;

  const htmlMarkup = `<l-LoginForm title="${titleValue}"${descriptionAttr.replace("\n ", " ")} submitLabel="${submitLabelValue}"${rememberAttrHtml}${forgotAttrHtml}></l-LoginForm>`;

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
          placeholder="Welcome back"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Log in to your account to continue."
        />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Submit label</span>
        <input
          value={submitLabel}
          onChange={(e) => setSubmitLabel(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Log in"
        />
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <input type="checkbox" checked={showRemember} onChange={(e) => setShowRemember(e.target.checked)} />
          Remember me
        </label>
        <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <input
            type="checkbox"
            checked={showForgotPassword}
            onChange={(e) => setShowForgotPassword(e.target.checked)}
          />
          Forgot password
        </label>
      </div>
    </PlaygroundLayout>
  );
}
