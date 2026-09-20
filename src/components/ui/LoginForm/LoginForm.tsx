import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { Label } from "../Label/Label";
import { Input } from "../Input/Input";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { Checkbox } from "../Checkbox/Checkbox";
import { Button } from "../Buttons/Button";

export interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

// A fixed-shape starter block (email + password + remember-me + submit),
// not a generic form builder — composes this library's own form
// primitives internally rather than accepting compound children, so the
// same component works identically once wrapped as a Web Component.
export interface LoginFormProps {
  title?: string;
  description?: string;
  submitLabel?: string;
  showRemember?: boolean;
  showForgotPassword?: boolean;
  onSubmit?: (values: LoginFormValues) => void;
  onForgotPassword?: () => void;
  /** Content below the form, e.g. a "Don't have an account? Sign up" link — this component has no
   * opinion about routing/links, the consumer supplies it. */
  footer?: ReactNode;
  className?: string;
  classNames?: { root?: string; header?: string; field?: string; footer?: string };
}

export function LoginForm({
  title = "Welcome back",
  description = "Log in to your account to continue.",
  submitLabel = "Log in",
  showRemember = true,
  showForgotPassword = true,
  onSubmit,
  onForgotPassword,
  footer,
  className,
  classNames,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.({ email, password, remember });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cx("flex w-full flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6", className, classNames?.root)}
    >
      <div className={classNames?.header}>
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>

      <div className={cx("flex flex-col gap-1.5", classNames?.field)}>
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={cx("flex flex-col gap-1.5", classNames?.field)}>
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
          {showForgotPassword && (
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Forgot password?
            </button>
          )}
        </div>
        <PasswordInput
          id="login-password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {showRemember && (
        <Checkbox
          label="Remember me"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
      )}

      <Button type="submit" size="full" label={submitLabel} />

      {footer != null && (
        <div className={classNames?.footer}>
          <slot name="footer">{footer}</slot>
        </div>
      )}
    </form>
  );
}
