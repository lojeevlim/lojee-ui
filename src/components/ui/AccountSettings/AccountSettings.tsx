import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { Label } from "../Label/Label";
import { Input } from "../Input/Input";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { Switch } from "../Switch/Switch";
import { Button } from "../Buttons/Button";

export interface NotificationPreference {
  key: string;
  label: string;
  description?: string;
  enabled: boolean;
}

// Three independent sections, each with its own state and its own save
// action — real account-settings pages save email separately from changing
// a password, not as one giant form with one submit. Fixed field shape (not
// compound children), composed from this library's own form primitives.
export interface AccountSettingsProps {
  /** Initial value of the email field (uncontrolled — only read on mount; default: ""). */
  email?: string;
  /** Called with the entered email address when the email section's Save button is submitted. */
  onEmailChange?: (email: string) => void;
  /** Called with `(currentPassword, newPassword)` when the password form is submitted; both fields are cleared afterwards. */
  onPasswordChange?: (currentPassword: string, newPassword: string) => void;
  /** Notification preferences rendered as toggle switches (controlled); the section is hidden when the array is empty. */
  notifications?: NotificationPreference[];
  /** Called with the FULL updated array whenever any one toggle flips. */
  onNotificationsChange?: (notifications: NotificationPreference[]) => void;
  /** Called when the Delete account button in the danger zone is clicked; no confirmation is shown by the component itself. */
  onDeleteAccount?: () => void;
  /** Extra class names applied to the root element. */
  className?: string;
  /** Per-part class overrides (`root`, `section` — applied to every section card) — merged after the built-in styling. */
  classNames?: { root?: string; section?: string };
}

function SectionCard({
  title,
  description,
  titleClassName,
  className,
  children,
}: {
  title: string;
  description?: string;
  titleClassName?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("rounded-xl border border-border bg-surface p-6", className)}>
      <h3 className={cx("text-sm font-semibold text-fg", titleClassName)}>{title}</h3>
      {description && <p className="mt-1 text-xs text-fg-subtle">{description}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function AccountSettings({
  email = "",
  onEmailChange,
  onPasswordChange,
  notifications = [],
  onNotificationsChange,
  onDeleteAccount,
  className,
  classNames,
}: AccountSettingsProps) {
  const [emailValue, setEmailValue] = useState(email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    onEmailChange?.(emailValue);
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPasswordChange?.(currentPassword, newPassword);
    setCurrentPassword("");
    setNewPassword("");
  };

  const toggleNotification = (key: string, enabled: boolean) => {
    onNotificationsChange?.(notifications.map((n) => (n.key === key ? { ...n, enabled } : n)));
  };

  return (
    <div className={cx("flex w-full flex-col gap-6", className, classNames?.root)}>
      <SectionCard title="Email address" description="The email used to sign in and receive notifications." className={classNames?.section}>
        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Label htmlFor="account-settings-email">Email</Label>
            <div className="mt-1.5">
              <Input
                id="account-settings-email"
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>
          <Button type="submit" size="sm" label="Save" />
        </form>
      </SectionCard>

      <SectionCard title="Password" description="Change the password used to sign in." className={classNames?.section}>
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="account-settings-current-password">Current password</Label>
            <div className="mt-1.5">
              <PasswordInput
                id="account-settings-current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="account-settings-new-password">New password</Label>
            <div className="mt-1.5">
              <PasswordInput
                id="account-settings-new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
              />
            </div>
          </div>
          <div>
            <Button type="submit" size="sm" label="Update password" />
          </div>
        </form>
      </SectionCard>

      {notifications.length > 0 && (
        <SectionCard title="Notifications" description="Choose what you want to be notified about." className={classNames?.section}>
          <div className="divide-y divide-border">
            {notifications.map((n) => (
              <div key={n.key} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-fg">{n.label}</p>
                  {n.description && <p className="text-xs text-fg-subtle">{n.description}</p>}
                </div>
                <Switch checked={n.enabled} onChange={(e) => toggleNotification(n.key, e.target.checked)} />
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      <SectionCard
        title="Danger zone"
        description="Permanently delete your account and all associated data. This can't be undone."
        titleClassName="text-rose-700 dark:text-rose-300"
        className={cx("border-rose-200 dark:border-rose-900", classNames?.section)}
      >
        <Button type="button" variant="destructive" label="Delete account" onClick={onDeleteAccount} />
      </SectionCard>
    </div>
  );
}
