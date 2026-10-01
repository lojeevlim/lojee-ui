// Shared "Transition" controls for the playgrounds of components that take `transition`,
// `transitionDuration`, `transitionDelay` and `hoverEffect`.
import { useState } from "react";
import { TRANSITIONS, HOVER_EFFECTS, type TransitionVariant, type HoverEffect } from "../../core/motion";
import { OptionGroup } from "./PlaygroundHelpers";

type TransitionChoice = "none" | TransitionVariant;
type HoverChoice = "none" | HoverEffect;
const TRANSITION_CHOICES: readonly TransitionChoice[] = ["none", ...TRANSITIONS];
const HOVER_CHOICES: readonly HoverChoice[] = ["none", ...HOVER_EFFECTS];

export function useMotion({ hover = true }: { hover?: boolean } = {}) {
  const [transition, setTransition] = useState<TransitionChoice>("none");
  const [duration, setDuration] = useState(450);
  const [delay, setDelay] = useState(0);
  const [hoverEffect, setHoverEffect] = useState<HoverChoice>("none");
  // Bumped to remount the preview so an enter transition can be replayed on demand.
  const [replay, setReplay] = useState(0);

  const t = transition === "none" ? undefined : transition;
  const h = hover && hoverEffect !== "none" ? hoverEffect : undefined;

  /** Spread onto the component: `<Card {...motion.props} />`. */
  const props = {
    transition: t,
    transitionDuration: t && duration !== 450 ? duration : undefined,
    transitionDelay: t && delay !== 0 ? delay : undefined,
    hoverEffect: h,
  };
  /** Attribute text for generated code — React and the custom elements share the same attribute names. */
  const attrs =
    (t ? ` transition="${t}"` : "") +
    (props.transitionDuration !== undefined ? ` transitionDuration="${duration}"` : "") +
    (props.transitionDelay !== undefined ? ` transitionDelay="${delay}"` : "") +
    (h ? ` hoverEffect="${h}"` : "");
  /** Use as the preview's `key` so "Replay" re-runs the enter transition. */
  const replayKey = `${t}-${duration}-${delay}-${replay}`;

  const controls = (
    <>
      <OptionGroup label="Transition" options={TRANSITION_CHOICES} value={transition} onChange={setTransition} />
      {t && (
        <div className="sm:col-span-2 flex flex-wrap items-center gap-x-6 gap-y-2">
          <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
            Duration {duration}ms
            <input type="range" min={100} max={1500} step={50} value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
            Delay {delay}ms
            <input type="range" min={0} max={1000} step={50} value={delay} onChange={(e) => setDelay(Number(e.target.value))} />
          </label>
          <button
            type="button"
            onClick={() => setReplay((n) => n + 1)}
            className="rounded-md bg-surface-muted px-2.5 py-1 text-xs font-medium text-fg-muted hover:bg-border"
          >
            Replay
          </button>
        </div>
      )}
      {hover && <OptionGroup label="Hover effect" options={HOVER_CHOICES} value={hoverEffect} onChange={setHoverEffect} />}
    </>
  );

  return { props, attrs, controls, replayKey };
}
