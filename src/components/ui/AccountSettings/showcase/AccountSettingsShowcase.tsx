import { useState } from "react";
import { AccountSettings, type NotificationPreference } from "../AccountSettings";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

const SAMPLE_NOTIFICATIONS: NotificationPreference[] = [
  { key: "product", label: "Product updates", description: "New features and improvements.", enabled: true },
  { key: "security", label: "Security alerts", description: "Sign-ins from new devices.", enabled: true },
  { key: "digest", label: "Weekly digest", description: "A summary of your team's activity.", enabled: false },
  { key: "marketing", label: "Marketing emails", description: "Tips, offers, and news.", enabled: false },
];

export default function AccountSettingsShowcase() {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Account Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Account-level settings — email, password, notification preferences, and account deletion — as three
            independent sections, each saved on its own.
          </p>
        </div>

        <section>
          <SectionLabel sub="Each section has its own save action — email, password, and notification toggles are saved independently.">
            Basic
          </SectionLabel>
          <div className="max-w-md">
            <AccountSettings
              email="jordan@lojee.io"
              notifications={notifications}
              onEmailChange={(email) => console.log("email saved:", email)}
              onPasswordChange={(current, next) => console.log("password changed:", current, next)}
              onNotificationsChange={setNotifications}
              onDeleteAccount={() => console.log("delete account requested")}
            />
          </div>
          <CodeBlock
            variants={{
              react: `const [notifications, setNotifications] = useState([
  { key: "product", label: "Product updates", enabled: true },
  { key: "security", label: "Security alerts", enabled: true },
]);

<AccountSettings
  email="jordan@lojee.io"
  notifications={notifications}
  onEmailChange={(email) => saveEmail(email)}
  onPasswordChange={(current, next) => changePassword(current, next)}
  onNotificationsChange={setNotifications}
  onDeleteAccount={() => deleteAccount()}
/>`,
              js: `<l-AccountSettings id="account-settings" email="jordan@lojee.io"></l-AccountSettings>

<script type="module">
  import "lojee-ui/elements";

  const el = document.getElementById("account-settings");
  el.notifications = [
    { key: "product", label: "Product updates", enabled: true },
    { key: "security", label: "Security alerts", enabled: true },
  ];
  el.addEventListener("emailChange", (e) => { /* e.detail */ });
  el.addEventListener("passwordChange", (e) => { /* e.detail */ });
  el.addEventListener("notificationsChange", (e) => { el.notifications = e.detail; });
  el.addEventListener("deleteAccount", () => { /* confirm + delete */ });
</script>`,
              vue: `<template>
  <l-AccountSettings
    email="jordan@lojee.io"
    :notifications="notifications"
    @emailChange="onEmailChange"
    @passwordChange="onPasswordChange"
    @notificationsChange="notifications = $event"
    @deleteAccount="onDeleteAccount"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
const notifications = ref([
  { key: "product", label: "Product updates", enabled: true },
  { key: "security", label: "Security alerts", enabled: true },
]);
function onEmailChange(email) { /* save */ }
function onPasswordChange(current, next) { /* change */ }
function onDeleteAccount() { /* confirm + delete */ }
</script>`,
              angular: `<l-AccountSettings
  email="jordan@lojee.io"
  [notifications]="notifications"
  (emailChange)="onEmailChange($event)"
  (passwordChange)="onPasswordChange($event)"
  (notificationsChange)="notifications = $event"
  (deleteAccount)="onDeleteAccount()"
></l-AccountSettings>

notifications = [
  { key: "product", label: "Product updates", enabled: true },
  { key: "security", label: "Security alerts", enabled: true },
];
onEmailChange(email) { /* save */ }
onPasswordChange(current, next) { /* change */ }
onDeleteAccount() { /* confirm + delete */ }`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="onDeleteAccount is only the request — a real app would show its own confirmation (e.g. this library's own AlertDialog component) before actually deleting anything.">
            Danger zone
          </SectionLabel>
          <p className="text-sm text-slate-500">
            See the bottom section in the example above — a red-tinted card with a destructive "Delete account"
            button.
          </p>
        </section>
      </div>
    </div>
  );
}
