// Shared "Animation" controls for the playgrounds of components that take `animation` / `pulseColor` /
// `pulseGradientTo` (Button, Badge, Avatar, Card, Alert, Stat, ProfileCard).
import { useState } from "react";
import { ANIMATED_VARIANTS, type AnimatedVariant } from "../../core/animated";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches } from "./PlaygroundHelpers";

const HAS_COLOR: AnimatedVariant[] = ["pulse", "glow", "border-spin", "particles", "tail"];
// Effects that animate the element itself — only one of these runs at a time (the first listed wins).
const SOLO: AnimatedVariant[] = ["glow", "bounce", "float", "wiggle"];

export function useAnimation() {
  const [selected, setSelected] = useState<AnimatedVariant[]>([]);
  const [pulseColor, setPulseColor] = useState<ColorName | undefined>();
  const [gradient, setGradient] = useState(false);
  const [gradientTo, setGradientTo] = useState<ColorName>("violet");

  // One effect, or several combined: `animation="particles tail"` (React and the custom elements read the same string).
  const animation = selected.length === 0 ? undefined : selected.join(" ");
  const colored = selected.some((v) => HAS_COLOR.includes(v));
  const canGradient = selected.includes("pulse") || selected.includes("border-spin");
  const toggle = (v: AnimatedVariant) =>
    setSelected((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur.filter((x) => !(SOLO.includes(x) && SOLO.includes(v))), v]));
  const pulseGradientTo = colored && canGradient && gradient ? gradientTo : undefined;
  const pc = colored ? pulseColor : undefined;

  /** Spread onto the component: `<Button {...anim.props} />`. */
  const props = { animation, pulseColor: pc, pulseGradientTo };
  /** Attribute text for generated code — React and the custom elements share the same attribute names. */
  const attrs = animation
    ? ` animation="${animation}"${pc ? ` pulseColor="${pc}"` : ""}${pulseGradientTo ? ` pulseGradientTo="${pulseGradientTo}"` : ""}`
    : "";

  const controls = (
    <>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Animation — pick one or combine several</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelected([])}
            className={"rounded-md px-2.5 py-1 text-xs font-medium transition-colors " + (selected.length === 0 ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")}
          >
            none
          </button>
          {ANIMATED_VARIANTS.map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={selected.includes(v)}
              onClick={() => toggle(v)}
              className={"rounded-md px-2.5 py-1 text-xs font-medium transition-colors " + (selected.includes(v) ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      {colored && (
        <ColorSwatches
          label={selected.length === 1 && selected[0] === "glow" ? "Glow color" : canGradient && gradient ? "Pulse from" : "Effect color"}
          value={pulseColor ?? "accent"}
          onChange={setPulseColor}
          actions={
            pulseColor && (
              <button type="button" onClick={() => setPulseColor(undefined)} className="text-xs text-fg-subtle underline hover:text-fg">
                Match component
              </button>
            )
          }
        />
      )}
      {colored && canGradient && (
        <OptionGroup
          label="Pulse style"
          options={["solid", "gradient"] as const}
          value={gradient ? "gradient" : "solid"}
          onChange={(v) => setGradient(v === "gradient")}
        />
      )}
      {colored && canGradient && gradient && <ColorSwatches label="Pulse to" value={gradientTo} onChange={setGradientTo} />}
    </>
  );

  return { props, attrs, controls };
}
