import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
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
  /** Form heading (default: "Welcome back"). */
  title?: string;
  /** Helper text shown under the title (default: "Log in to your account to continue."); pass an empty string to hide it. */
  description?: string;
  /** Submit button label (default: "Log in"). */
  submitLabel?: string;
  /** Shows the "Remember me" checkbox (default: true). */
  showRemember?: boolean;
  /** Shows the "Forgot password?" link next to the password label (default: true). */
  showForgotPassword?: boolean;
  /** Fires on form submit with `{ email, password, remember }`; the default browser submit is prevented. */
  onSubmit?: (values: LoginFormValues) => void;
  /** Fires when the "Forgot password?" link is clicked, with no arguments. */
  onForgotPassword?: () => void;
  /** Content below the form, e.g. a "Don't have an account? Sign up" link — this component has no
   * opinion about routing/links, the consumer supplies it. */
  footer?: ReactNode;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
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
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
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
      className={cx("flex w-full flex-col gap-5 rounded-xl border border-border bg-surface p-6", motionClass(transition, hoverEffect), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <div className={classNames?.header}>
        <h2 className="text-xl font-semibold text-fg">{title}</h2>
        {description && <p className="mt-1 text-sm text-fg-subtle">{description}</p>}
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
              className="text-sm font-medium text-fg-muted hover:text-fg"
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
