import { useState } from "react";
import { PlanBilling, type PlanStatus } from "./PlanBilling/PlanBilling";
import { CircleX, Trash2, X, type LucideIcon } from "lucide-react";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const STATUSES: PlanStatus[] = ["active", "trial", "past-due", "canceled"];
const INTERVALS = ["month", "year"] as const;
const ON_OFF = ["on", "off"] as const;
const CURRENCIES = ["$", "€", "£", "₱", "¥", "₹"] as const;
const CANCEL_ICONS: { key: string; icon: LucideIcon }[] = [
  { key: "circle-x", icon: CircleX },
  { key: "x", icon: X },
  { key: "trash-2", icon: Trash2 },
];

const MONTHLY_PRICE = 29;
const FEATURES = ["Unlimited projects", "50 GB storage", "Priority support", "Custom domains"];
const USAGE = [
  { label: "Team seats", used: 8, limit: 10 },
  { label: "Storage", used: 21, limit: 50, unit: "GB" },
];

export default function PlanBillingPlayground() {
  const motion = useMotion();
  const [currency, setCurrency] = useState("$");
  const [planName, setPlanName] = useState("Pro");
  const [interval, setInterval] = useState<(typeof INTERVALS)[number]>("month");
  const [status, setStatus] = useState<PlanStatus>("active");
  const [color, setColor] = useState<string>("accent");
  const [showFeatures, setShowFeatures] = useState(true);
  const [showUsage, setShowUsage] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const [showAction, setShowAction] = useState(true);
  const [actionLabel, setActionLabel] = useState("Select Plan");
  const [showCancel, setShowCancel] = useState(true);
  const [cancelIcon, setCancelIcon] = useState("circle-x");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-lg">
          <PlanBilling
            key={motion.replayKey}
            {...motion.props}
            planName={planName || "Pro"}
            price={MONTHLY_PRICE * (interval === "year" ? 10 : 1)}
            interval={interval}
            currency={currency || "$"}
            description="For growing teams"
            status={status}
            color={color}
            features={showFeatures ? FEATURES : undefined}
            usage={showUsage ? USAGE : undefined}
            nextBillingDate={showDetails ? "Nov 3, 2026" : undefined}
            paymentMethod={showDetails ? { brand: "Visa", last4: "4242", expires: "08/27" } : undefined}
            actionLabel={actionLabel || "Select Plan"}
            onAction={showAction ? () => {} : undefined}
            onCancel={showCancel ? () => {} : undefined}
            cancelIcon={cancelIcon}
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const total = MONTHLY_PRICE * (interval === "year" ? 10 : 1);
  const lines = [
    `planName="${planName || "Pro"}"`,
    `price={${total}}`,
    interval !== "month" ? `interval="${interval}"` : "",
    currency && currency !== "$" ? `currency="${currency}"` : "",
    `description="For growing teams"`,
    status !== "active" ? `status="${status}"` : "",
    color !== "accent" ? `color="${color}"` : "",
    showFeatures ? `features={${JSON.stringify(FEATURES)}}` : "",
    showUsage ? `usage={[\n    { label: "Team seats", used: 8, limit: 10 },\n    { label: "Storage", used: 21, limit: 50, unit: "GB" },\n  ]}` : "",
    showDetails ? `nextBillingDate="Nov 3, 2026"` : "",
    showDetails ? `paymentMethod={{ brand: "Visa", last4: "4242", expires: "08/27" }}` : "",
    showAction && actionLabel && actionLabel !== "Select Plan" ? `actionLabel="${actionLabel}"` : "",
    showAction ? "onAction={selectPlan}" : "",
    showCancel ? "onCancel={cancelPlan}" : "",
    showCancel && cancelIcon !== "circle-x" ? `cancelIcon="${cancelIcon}"` : "",
    ...motion.attrs.trim().split(/ (?=\w+=)/).filter(Boolean),
  ].filter(Boolean);
  const code = `<PlanBilling\n  ${lines.join("\n  ")}\n/>`;
  const planAttrs = ` plan-name="${planName || "Pro"}" price="${total}"${interval !== "month" ? ` interval="${interval}"` : ""}${currency && currency !== "$" ? ` currency="${currency}"` : ""}${status !== "active" ? ` status="${status}"` : ""}${color !== "accent" ? ` color="${color}"` : ""}${showDetails ? ` next-billing-date="Nov 3, 2026"` : ""}${showAction && actionLabel && actionLabel !== "Select Plan" ? ` action-label="${actionLabel}"` : ""}${motion.attrs}`;
  const htmlMarkup = `<l-plan-billing${planAttrs}></l-plan-billing>

<script type="module">
  const plan = document.querySelector("l-plan-billing");
  plan.features = ${JSON.stringify(showFeatures ? FEATURES : [])};
  plan.usage = ${JSON.stringify(showUsage ? USAGE : [])};
  ${showAction ? 'plan.addEventListener("action", () => selectPlan());' : ""}
  ${showCancel ? 'plan.addEventListener("cancel", () => cancelPlan());' : ""}
</script>`;
  // Vue and Angular bind the data and the events in the template instead of looking the element up.
  const vueMarkup = `<template>
  <l-plan-billing${planAttrs}
    :features.prop="features"
    :usage.prop="usage"${showAction ? '\n    @action="selectPlan()"' : ""}${showCancel ? '\n    @cancel="cancelPlan()"' : ""}
  />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
const features = ${JSON.stringify(showFeatures ? FEATURES : [])};
const usage = ${JSON.stringify(showUsage ? USAGE : [])};
</script>`;
  const angularMarkup = `// plan.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-plan",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-plan-billing${planAttrs}
      [features]="features"
      [usage]="usage"${showAction ? '\n      (action)="selectPlan()"' : ""}${showCancel ? '\n      (cancel)="cancelPlan()"' : ""}
    ></l-plan-billing>
  \`,
})
export class PlanComponent {
  features = ${JSON.stringify(showFeatures ? FEATURES : [])};
  usage = ${JSON.stringify(showUsage ? USAGE : [])};
  selectPlan() {}
  cancelPlan() {}
}`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: vueMarkup,
    angular: angularMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Plan name</span>
        <input value={planName} onChange={(e) => setPlanName(e.target.value)} className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong" />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Currency — a symbol or a code</span>
        <input value={currency} onChange={(e) => setCurrency(e.target.value)} placeholder="$" maxLength={4} className="mb-1.5 w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong" />
        <div className="flex flex-wrap gap-1.5">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              className={"rounded-md px-2.5 py-1 text-xs font-medium transition-colors " + (currency === c ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <OptionGroup label="Billed" options={INTERVALS} value={interval} onChange={setInterval} render={(o) => (o === "month" ? "Monthly" : "Yearly")} />
      <OptionGroup label="Status" options={STATUSES} value={status} onChange={setStatus} />
      <OptionGroup label="Features" options={ON_OFF} value={showFeatures ? "on" : "off"} onChange={(v) => setShowFeatures(v === "on")} />
      <OptionGroup label="Usage meters" options={ON_OFF} value={showUsage ? "on" : "off"} onChange={(v) => setShowUsage(v === "on")} />
      <OptionGroup label="Billing details" options={ON_OFF} value={showDetails ? "on" : "off"} onChange={(v) => setShowDetails(v === "on")} />
      <OptionGroup label="Action button" options={ON_OFF} value={showAction ? "on" : "off"} onChange={(v) => setShowAction(v === "on")} />
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Action label</span>
        <input value={actionLabel} onChange={(e) => setActionLabel(e.target.value)} placeholder="Select Plan" className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong" />
      </div>
      <OptionGroup label="Cancel icon (top right)" options={ON_OFF} value={showCancel ? "on" : "off"} onChange={(v) => setShowCancel(v === "on")} />
      {showCancel && (
        <div>
          <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Cancel icon</span>
          <div className="flex flex-wrap gap-1.5">
            {CANCEL_ICONS.map(({ key, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setCancelIcon(key)}
                aria-label={key}
                title={key}
                className={"flex h-7 w-7 items-center justify-center rounded-md transition-colors " + (cancelIcon === key ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      )}
      <ColorSwatches value={color} onChange={setColor} custom />
      {motion.controls}
    </PlaygroundLayout>
  );
}
