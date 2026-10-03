import { Check, CreditCard } from "lucide-react";
import { getIcon } from "../../../core/icons";
import { cx, isColorName, type ColorName } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { Badge } from "../Badge/Badge";
import { Button } from "../Buttons/Button";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Tooltip } from "../Tooltip/Tooltip";

export type PlanStatus = "active" | "trial" | "past-due" | "canceled";

export interface PlanUsage {
  /** What is measured, e.g. "Team seats". */
  label: string;
  /** How much has been used. */
  used: number;
  /** The plan's allowance. */
  limit: number;
  /** Unit shown after the numbers, e.g. "GB" (default: none). */
  unit?: string;
}

export interface PlanPaymentMethod {
  /** Card brand, e.g. "Visa". */
  brand: string;
  /** Last four digits. */
  last4: string;
  /** Expiry, e.g. "08/27". */
  expires?: string;
}

export interface PlanBillingProps {
  /** Name of the current plan, e.g. "Pro". */
  planName: string;
  /** Price per period — a number or a ready-made string such as "Free". */
  price: number | string;
  /** Currency of a numeric price: a symbol shown before it ("$", "€", "₱" …) or a 3-letter code such as "EUR" or "PHP", which is formatted for you (default: "$"). */
  currency?: string;
  /** Billing period: "month" or "year" (default: "month"). */
  interval?: "month" | "year";
  /** One line under the plan name. */
  description?: string;
  /** State of the subscription: "active", "trial", "past-due" or "canceled" (default: "active"). */
  status?: PlanStatus;
  /** What the plan includes, shown as a checked list. */
  features?: string[];
  /** Usage meters against the plan's limits — drawn in `color`, so they follow the theme accent. */
  usage?: PlanUsage[];
  /** Date of the next charge, e.g. "Nov 3, 2026". */
  nextBillingDate?: string;
  /** The card on file. */
  paymentMethod?: PlanPaymentMethod;
  /** Accent of the meters and the action button: a built-in ColorName or any CSS color such as "#8b5cf6" (default: "accent" — follows the theme accent). */
  color?: ColorName | (string & {});
  /** Label of the action button (default: "Select Plan"). */
  actionLabel?: string;
  /** Called when the action button is pressed; the button is hidden when omitted. */
  onAction?: () => void;
  /** Called when the cancel icon in the top-right corner is pressed; the icon is hidden when omitted (cancelling stays optional). */
  onCancel?: () => void;
  /** Tooltip and accessible label of the cancel icon (default: "Cancel plan"). */
  cancelLabel?: string;
  /** Icon of the cancel button, e.g. "circle-x" or "trash-2" — see src/core/icons.ts for the available set (default: "circle-x"). */
  cancelIcon?: string;
  /** Effect while hovering the card: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    header?: string;
    price?: string;
    features?: string;
    usage?: string;
    details?: string;
    actions?: string;
    cancel?: string;
  };
}

const STATUS: Record<PlanStatus, { label: string; color: ColorName }> = {
  active: { label: "Active", color: "emerald" },
  trial: { label: "Trial", color: "blue" },
  "past-due": { label: "Past due", color: "rose" },
  canceled: { label: "Canceled", color: "slate" },
};

/** "29" + "$" → "$29"; "29" + "EUR" → "€29" (a 3-letter code goes through Intl, so the symbol and grouping are right for that currency). */
function formatPrice(price: number | string, currency: string): string {
  const n = Number(price);
  if (/^[A-Za-z]{3}$/.test(currency) && Number.isFinite(n)) {
    try {
      return new Intl.NumberFormat(undefined, { style: "currency", currency: currency.toUpperCase(), maximumFractionDigits: Number.isInteger(n) ? 0 : 2 }).format(n);
    } catch {
      /* not a real currency code — fall through and show it as typed */
    }
  }
  return `${currency}${price}`;
}

/** The plan and billing summary of an account: current plan and price, what it includes, usage against its limits, the next charge and the card on file. */
export function PlanBilling({
  planName,
  price,
  currency = "$",
  interval = "month",
  description,
  status = "active",
  features,
  usage,
  nextBillingDate,
  paymentMethod,
  color = "accent",
  actionLabel = "Select Plan",
  onAction,
  onCancel,
  cancelLabel = "Cancel plan",
  cancelIcon = "circle-x",
  hoverEffect,
  transition,
  transitionDuration,
  transitionDelay,
  className,
  classNames,
}: PlanBillingProps) {
  const st = STATUS[status] ?? STATUS.active;
  // The accent as a CSS color: a named color's 600 shade (the theme accent for "accent"), or the custom value as given.
  const tint = isColorName(color) ? `var(--color-${color}-600)` : color;
  // getIcon() returns a stable module-level component, so this never remounts.
  const CancelIcon = getIcon(cancelIcon) ?? getIcon("circle-x");
  // A web-component attribute arrives as a string — "29" is still a price to format.
  const numericPrice = typeof price === "number" || /^\d+(\.\d+)?$/.test(price);
  const hasDetails = nextBillingDate || paymentMethod;

  return (
    <div
      className={cx("w-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm", motionClass(transition, hoverEffect), className, classNames?.root)}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <div
        className={cx("flex items-start justify-between gap-4 border-b border-border px-5 py-4", classNames?.header)}
        style={{ backgroundColor: `color-mix(in srgb, ${tint} 9%, var(--color-surface-muted))` }}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-fg">{planName}</h3>
            <Badge variant="soft" color={st.color} label={st.label} />
          </div>
          {description && <p className="mt-0.5 text-sm text-fg-subtle">{description}</p>}
        </div>
        <div className="flex shrink-0 items-start gap-3">
          <p className={cx("text-right", classNames?.price)}>
            <span className="text-2xl font-semibold tabular-nums" style={{ color: tint }}>
              {numericPrice ? formatPrice(price, currency) : price}
            </span>
            {numericPrice && <span className="text-sm text-fg-subtle"> /{interval}</span>}
          </p>
          {onCancel && status !== "canceled" && (
            <Tooltip content={cancelLabel} position="bottom" portal>
              <button
                type="button"
                aria-label={cancelLabel}
                onClick={onCancel}
                className={cx("flex h-7 w-7 items-center justify-center rounded-md text-fg-subtle transition-colors hover:bg-rose-500/10 hover:text-rose-600", classNames?.cancel)}
              >
                {/* eslint-disable-next-line react-hooks/static-components -- see comment above `const CancelIcon` */}
                {CancelIcon && <CancelIcon size={16} />}
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="space-y-5 px-5 py-4">
        {features && features.length > 0 && (
          <ul className={cx("grid gap-2 sm:grid-cols-2", classNames?.features)}>
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-fg-muted">
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: tint }} />
                {f}
              </li>
            ))}
          </ul>
        )}

        {usage && usage.length > 0 && (
          <div className={cx("space-y-3", classNames?.usage)}>
            {usage.map((u) => (
              <div key={u.label}>
                <div className="mb-1 flex items-baseline justify-between text-sm">
                  <span className="font-medium text-fg">{u.label}</span>
                  <span className="tabular-nums text-fg-subtle">
                    {u.used}
                    {u.unit ? ` ${u.unit}` : ""} of {u.limit}
                    {u.unit ? ` ${u.unit}` : ""}
                  </span>
                </div>
                <ProgressBar value={u.used} max={u.limit} size="sm" color={color} />
              </div>
            ))}
          </div>
        )}

        {hasDetails && (
          <dl className={cx("divide-y divide-border rounded-lg border border-border text-sm", classNames?.details)}>
            {nextBillingDate && (
              <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                <dt className="text-fg-subtle">{status === "canceled" ? "Access until" : "Next billing date"}</dt>
                <dd className="font-medium text-fg">{nextBillingDate}</dd>
              </div>
            )}
            {paymentMethod && (
              <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                <dt className="text-fg-subtle">Payment method</dt>
                <dd className="flex items-center gap-2 font-medium text-fg">
                  <CreditCard size={16} className="text-fg-subtle" />
                  {paymentMethod.brand} •••• {paymentMethod.last4}
                  {paymentMethod.expires && <span className="text-xs font-normal text-fg-subtle">exp {paymentMethod.expires}</span>}
                </dd>
              </div>
            )}
          </dl>
        )}
      </div>

      {onAction && (
        <div className={cx("border-t border-border px-5 py-3", classNames?.actions)}>
          <Button color={color} label={actionLabel} size="md" className="w-full" onClick={onAction} />
        </div>
      )}
    </div>
  );
}
