import { useState } from "react";
import type { ReactNode, FormEvent } from "react";
import { cx } from "../../../core/tokens";
import { Label } from "../Label/Label";
import { Input } from "../Input/Input";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { Checkbox } from "../Checkbox/Checkbox";
import { Button } from "../Buttons/Button";

export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export interface SignupFormProps {
  title?: string;
  description?: string;
  submitLabel?: string;
  onSubmit?: (values: SignupFormValues) => void;
  /** Shown inline under the confirm-password field when the two password fields don't match at
   * submit time — `onSubmit` is not called in that case. */
  mismatchError?: string;
  /** Rich content below the form, e.g. a "Already have an account? Log in" link — this component has
   * no opinion about routing/links, the consumer supplies it. */
  footer?: ReactNode;
  className?: string;
  classNames?: { root?: string; header?: string; field?: string; footer?: string };
}

// Fixed field shape (not compound children, not a dynamic field list) —
// composes this library's own form primitives internally. A ready-to-use
// starter block, not a generic form builder.
export function SignupForm({
  title = "Create your account",
  description = "Start your free trial — no credit card required.",
  submitLabel = "Create account",
  onSubmit,
  mismatchError = "Passwords don't match",
  footer,
  className,
  classNames,
}: SignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showMismatch, setShowMismatch] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setShowMismatch(true);
      return;
    }
    setShowMismatch(false);
    onSubmit?.({ name, email, password, confirmPassword, agreeTerms });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cx("flex w-full flex-col gap-5", className, classNames?.root)}
    >
      <div className={classNames?.header}>
        <h2 className="text-xl font-semibold text-slate-900">
          <slot name="title">{title}</slot>
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          <slot name="description">{description}</slot>
        </p>
      </div>

      <div className={cx("flex flex-col gap-1.5", classNames?.field)}>
        <Label htmlFor="signup-name">Name</Label>
        <Input id="signup-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" required />
      </div>

      <div className={cx("flex flex-col gap-1.5", classNames?.field)}>
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className={cx("flex flex-col gap-1.5", classNames?.field)}>
        <Label htmlFor="signup-password">Password</Label>
        <PasswordInput
          id="signup-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          required
        />
      </div>

      <div className={cx("flex flex-col gap-1.5", classNames?.field)}>
        <Label htmlFor="signup-confirm-password">Confirm password</Label>
        <PasswordInput
          id="signup-confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          invalid={showMismatch}
          placeholder="Confirm your password"
          required
        />
        {showMismatch && <p className="text-sm text-rose-600">{mismatchError}</p>}
      </div>

      <Checkbox
        checked={agreeTerms}
        onChange={(e) => setAgreeTerms(e.target.checked)}
        label="I agree to the Terms of Service and Privacy Policy"
      />

      <Button type="submit" label={submitLabel} disabled={!agreeTerms} className="w-full" />

      {footer != null && (
        <div className={classNames?.footer}>
          <slot name="footer">{footer}</slot>
        </div>
      )}
    </form>
  );
}
