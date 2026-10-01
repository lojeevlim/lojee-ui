import type { AnimatedVariant } from "./animated";

/** Overlay for the variants that need an extra element (pulse, sweep, border-spin). Render as the root's last child. */
export function AnimatedOverlay({ variant }: { variant?: AnimatedVariant }) {
  if (variant === "pulse") return <span aria-hidden="true" className="lojee-anim-ring" />;
  if (variant === "border-spin")
    return (
      <span aria-hidden="true" className="lojee-anim-border">
        <span />
      </span>
    );
  if (variant === "sweep")
    return (
      <span aria-hidden="true" className="lojee-anim-clip">
        <span />
      </span>
    );
  return null;
}
