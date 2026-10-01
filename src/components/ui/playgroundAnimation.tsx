// Shared "Animation" controls for the playgrounds of components that take `animated` / `pulseColor` /
// `pulseGradientTo` (Button, Badge, Avatar, Card, Alert, Stat, ProfileCard).
import { useState } from "react";
import { ANIMATED_VARIANTS, type AnimatedVariant } from "../../core/animated";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches } from "./PlaygroundHelpers";

type Choice = "none" | AnimatedVariant;
const CHOICES: readonly Choice[] = ["none", ...ANIMATED_VARIANTS];
const HAS_COLOR: AnimatedVariant[] = ["pulse", "glow", "border-spin"];

export function useAnimation() {
  const [choice, setChoice] = useState<Choice>("none");
  const [pulseColor, setPulseColor] = useState<ColorName | undefined>();
  const [gradient, setGradient] = useState(false);
  const [gradientTo, setGradientTo] = useState<ColorName>("violet");

  const animated = choice === "none" ? undefined : choice;
  const colored = animated !== undefined && HAS_COLOR.includes(animated);
  const canGradient = animated === "pulse" || animated === "border-spin";
  const pulseGradientTo = colored && canGradient && gradient ? gradientTo : undefined;
  const pc = colored ? pulseColor : undefined;

  /** Spread onto the component: `<Button {...anim.props} />`. */
  const props = { animated, pulseColor: pc, pulseGradientTo };
  /** Attribute text for generated code — React and the custom elements share the same attribute names. */
  const attrs = animated
    ? ` animated="${animated}"${pc ? ` pulseColor="${pc}"` : ""}${pulseGradientTo ? ` pulseGradientTo="${pulseGradientTo}"` : ""}`
    : "";

  const controls = (
    <>
      <OptionGroup label="Animation" options={CHOICES} value={choice} onChange={setChoice} />
      {colored && (
        <ColorSwatches
          label={animated === "glow" ? "Glow color" : canGradient && gradient ? "Pulse from" : "Pulse color"}
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
