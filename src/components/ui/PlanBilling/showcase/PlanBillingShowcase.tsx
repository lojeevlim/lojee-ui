import { PlanBilling } from "../PlanBilling";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

// `vue` / `angular` default to the plain HTML; pass them when the snippet needs a script (those frameworks bind props and events in the template instead).
const variants = (react: string, html: string, vue = html, angular = html) => ({
  react,
  js: `${html}\n\n<script type="module">import "lojee-ui/elements";</script>`,
  vue,
  angular,
});

export default function PlanBillingShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">PlanBilling</h1>
          <p className="mt-1 text-sm text-fg-subtle">The plan and billing summary of an account — current plan and price, what it includes, usage against its limits, the next charge and the card on file.</p>
        </div>

        <section>
          <SectionLabel sub="Plan, price, features and usage. The meters follow the theme accent.">Overview</SectionLabel>
          <div className="max-w-lg">
            <PlanBilling
              planName="Pro"
              price={29}
              description="For growing teams"
              features={["Unlimited projects", "50 GB storage", "Priority support", "Custom domains"]}
              usage={[
                { label: "Team seats", used: 8, limit: 10 },
                { label: "Storage", used: 46, limit: 50, unit: "GB" },
              ]}
            />
          </div>
          <CodeBlock
            variants={variants(
              `<PlanBilling
  planName="Pro"
  price={29}
  description="For growing teams"
  features={["Unlimited projects", "50 GB storage", "Priority support", "Custom domains"]}
  usage={[
    { label: "Team seats", used: 8, limit: 10 },
    { label: "Storage", used: 46, limit: 50, unit: "GB" },
  ]}
/>`,
              `<l-plan-billing plan-name="Pro" price="29" description="For growing teams"></l-plan-billing>
<script type="module">
  const plan = document.querySelector("l-plan-billing");
  plan.features = ["Unlimited projects", "50 GB storage", "Priority support", "Custom domains"];
  plan.usage = [
    { label: "Team seats", used: 8, limit: 10 },
    { label: "Storage", used: 46, limit: 50, unit: "GB" },
  ];
</script>`,
              `<template>
  <l-plan-billing plan-name="Pro" price="29" description="For growing teams" :features.prop="features" :usage.prop="usage" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
const features = ["Unlimited projects", "50 GB storage", "Priority support", "Custom domains"];
const usage = [
  { label: "Team seats", used: 8, limit: 10 },
  { label: "Storage", used: 46, limit: 50, unit: "GB" },
];
</script>`,
              `// plan.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-plan",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-plan-billing plan-name="Pro" price="29" description="For growing teams" [features]="features" [usage]="usage"></l-plan-billing>\`,
})
export class PlanComponent {
  features = ["Unlimited projects", "50 GB storage", "Priority support", "Custom domains"];
  usage = [
    { label: "Team seats", used: 8, limit: 10 },
    { label: "Storage", used: 46, limit: 50, unit: "GB" },
  ];
}`
            )}
          />
        </section>

        <section>
          <SectionLabel sub="One action button (actionLabel, default &ldquo;Select Plan&rdquo;) and an optional cancel icon in the top-right corner with a tooltip — each only shows when its callback is passed. hoverEffect animates the card.">Billing details and actions</SectionLabel>
          <div className="max-w-lg">
            <PlanBilling
              planName="Business"
              price={99}
              interval="month"
              status="trial"
              nextBillingDate="Nov 3, 2026"
              paymentMethod={{ brand: "Visa", last4: "4242", expires: "08/27" }}
              actionLabel="Start free trial"
              onAction={() => {}}
              onCancel={() => {}}
              hoverEffect="lift"
            />
          </div>
          <CodeBlock
            variants={variants(
              `<PlanBilling
  planName="Business"
  price={99}
  status="trial"
  nextBillingDate="Nov 3, 2026"
  paymentMethod={{ brand: "Visa", last4: "4242", expires: "08/27" }}
  actionLabel="Start free trial"
  onAction={selectPlan}
  onCancel={cancelPlan}
  hoverEffect="lift"
/>`,
              `<l-plan-billing plan-name="Business" price="99" status="trial" next-billing-date="Nov 3, 2026" action-label="Start free trial" hover-effect="lift"></l-plan-billing>
<script type="module">
  const plan = document.querySelector("l-plan-billing");
  plan.paymentMethod = { brand: "Visa", last4: "4242", expires: "08/27" };
  plan.addEventListener("action", () => selectPlan());
  plan.addEventListener("cancel", () => cancelPlan());
</script>`,
              `<template>
  <l-plan-billing
    plan-name="Business"
    price="99"
    status="trial"
    next-billing-date="Nov 3, 2026"
    action-label="Start free trial"
    hover-effect="lift"
    :paymentMethod.prop="{ brand: 'Visa', last4: '4242', expires: '08/27' }"
    @action="selectPlan()"
    @cancel="cancelPlan()"
  />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              `// plan.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-plan",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-plan-billing
      plan-name="Business"
      price="99"
      status="trial"
      next-billing-date="Nov 3, 2026"
      action-label="Start free trial"
      hover-effect="lift"
      [paymentMethod]="paymentMethod"
      (action)="selectPlan()"
      (cancel)="cancelPlan()"
    ></l-plan-billing>
  \`,
})
export class PlanComponent {
  paymentMethod = { brand: "Visa", last4: "4242", expires: "08/27" };
  selectPlan() {}
  cancelPlan() {}
}`
            )}
          />
        </section>

        <section>
          <SectionLabel sub='color tints the header, the price, the check marks, the meters and the action button. Use a palette name, or any CSS color for a custom one; the default follows the theme accent.'>Colors</SectionLabel>
          <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
            <PlanBilling planName="Team" price={49} color="emerald" features={["10 seats", "Shared projects"]} usage={[{ label: "Seats", used: 6, limit: 10 }]} onAction={() => {}} />
            <PlanBilling planName="Studio" price={79} color="#e11d89" features={["25 seats", "Brand kit"]} usage={[{ label: "Seats", used: 14, limit: 25 }]} onAction={() => {}} />
          </div>
          <CodeBlock
            variants={variants(
              `<PlanBilling planName="Team" price={49} color="emerald" … />
<PlanBilling planName="Studio" price={79} color="#e11d89" … />`,
              `<l-plan-billing plan-name="Team" price="49" color="emerald"></l-plan-billing>
<l-plan-billing plan-name="Studio" price="79" color="#e11d89"></l-plan-billing>`
            )}
          />
        </section>

        <section>
          <SectionLabel sub='currency takes a symbol ("₱", "€") or a 3-letter code ("PHP", "EUR") that is formatted for that currency.'>Currency</SectionLabel>
          <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
            <PlanBilling planName="Pro" price={1499} currency="₱" />
            <PlanBilling planName="Pro" price={29} currency="EUR" interval="year" />
          </div>
          <CodeBlock
            variants={variants(
              `<PlanBilling planName="Pro" price={1499} currency="₱" />
<PlanBilling planName="Pro" price={29} currency="EUR" interval="year" />`,
              `<l-plan-billing plan-name="Pro" price="1499" currency="₱"></l-plan-billing>
<l-plan-billing plan-name="Pro" price="29" currency="EUR" interval="year"></l-plan-billing>`
            )}
          />
        </section>

        <section>
          <SectionLabel sub='status is "active", "trial", "past-due" or "canceled". A free plan can pass a string price.'>Statuses</SectionLabel>
          <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
            <PlanBilling planName="Free" price="Free" status="active" features={["3 projects", "1 GB storage"]} />
            <PlanBilling planName="Pro" price={29} status="past-due" nextBillingDate="Overdue since Oct 28" onAction={() => {}} actionLabel="Update payment" />
          </div>
          <CodeBlock
            variants={variants(
              `<PlanBilling planName="Free" price="Free" features={["3 projects", "1 GB storage"]} />
<PlanBilling planName="Pro" price={29} status="past-due" nextBillingDate="Overdue since Oct 28" onAction={fixPayment} actionLabel="Update payment" />`,
              `<l-plan-billing plan-name="Free" price="Free"></l-plan-billing>
<l-plan-billing plan-name="Pro" price="29" status="past-due" next-billing-date="Overdue since Oct 28"></l-plan-billing>`
            )}
          />
        </section>
      </div>
    </div>
  );
}
