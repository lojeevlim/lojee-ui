import { CODE_FRAMEWORKS, useCodeFramework, type CodeFramework } from "../../core/codeFramework";
import type { TransitionVariant, HoverEffect } from "../../core/motion";
import { Select } from "../ui/Select/Select";

export interface CodeFrameworkSwitcherProps {
  /** Enter / exit transition of the dropdown: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Effect while hovering the field: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
}

const OPTIONS = CODE_FRAMEWORKS.map(({ value, label }) => ({ value, label }));

/** Dropdown for which language/framework the code examples show — the library's own Select, with a code icon. */
export default function CodeFrameworkSwitcher({ transition, transitionDuration, transitionDelay, hoverEffect }: CodeFrameworkSwitcherProps = {}) {
  const { framework, setFramework } = useCodeFramework();
  return (
    <Select
      icon="code"
      aria-label="Code example language"
      options={OPTIONS}
      value={framework}
      
      onChange={(e) => setFramework(e.target.value as CodeFramework)}
      transition={transition ?? "bounce"}
      transitionDuration={transitionDuration}
      transitionDelay={transitionDelay}
      hoverEffect={hoverEffect}
      className="w-40 max-sm:w-32"
      classNames={{ menu: "right-0 left-auto w-44" }}
    />
  );
}
