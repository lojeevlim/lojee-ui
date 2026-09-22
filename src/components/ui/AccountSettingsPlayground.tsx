import { useState } from "react";
import { AccountSettings, type NotificationPreference } from "./AccountSettings/AccountSettings";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const SAMPLE_NOTIFICATIONS: NotificationPreference[] = [
  { key: "product", label: "Product updates", description: "New features and improvements.", enabled: true },
  { key: "security", label: "Security alerts", description: "Sign-ins from new devices.", enabled: true },
  { key: "digest", label: "Weekly digest", description: "A summary of your team's activity.", enabled: false },
];

export default function AccountSettingsPlayground() {
  const [email, setEmail] = useState("jordan@lojee.io");
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-md">
          <AccountSettings email={email} notifications={notifications} onNotificationsChange={setNotifications} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const notificationsCode = `[
    { key: "product", label: "Product updates", enabled: true },
    { key: "security", label: "Security alerts", enabled: true },
    { key: "digest", label: "Weekly digest", enabled: false },
  ]`;

  const code = `const [notifications, setNotifications] = useState(${notificationsCode});

<AccountSettings
  email="${email}"
  notifications={notifications}
  onNotificationsChange={setNotifications}
/>`;

  const htmlMarkup = `<l-AccountSettings id="account-settings" email="${email}"></l-AccountSettings>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("account-settings").notifications = ${notificationsCode};
</script>`;

  const vueMarkup = `<template>
  <l-AccountSettings email="${email}" :notifications="notifications" @notificationsChange="notifications = $event" />
</template>

<script setup lang="ts">
import { ref } from "vue";
const notifications = ref(${notificationsCode});
</script>`;

  const angularMarkup = `<l-AccountSettings email="${email}" [notifications]="notifications" (notificationsChange)="notifications = $event"></l-AccountSettings>

notifications = ${notificationsCode};`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: htmlMarkup,
    vue: vueMarkup,
    angular: angularMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Email</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="jordan@lojee.io"
        />
      </div>
    </PlaygroundLayout>
  );
}
