// Visual variants shared by the text-entry inputs (Input, Textarea, PasswordInput, SearchInput). Each variant is a set of
// classes appended after the input's base ("outline") classes — `cx` runs them through tailwind-merge, so they win over it.
export type InputVariant = "outline" | "filled" | "underline" | "soft" | "plain";

export const INPUT_VARIANTS: { value: InputVariant; label: string }[] = [
  { value: "outline", label: "Outline" },
  { value: "filled", label: "Filled" },
  { value: "underline", label: "Underline" },
  { value: "soft", label: "Soft" },
  { value: "plain", label: "Plain" },
];

export const DEFAULT_INPUT_VARIANT: InputVariant = "outline";

/** Classes layered over the base look. "outline" is the base itself (bordered, surface background). */
export const INPUT_VARIANT_CLASSES: Record<InputVariant, string> = {
  outline: "",
  // A tinted field with no visible border until focused.
  filled: "border-transparent bg-surface-muted focus:border-slate-500 focus:bg-surface",
  // Only a bottom rule, no box.
  underline: "rounded-none border-0 border-b border-border-strong bg-transparent px-1 focus:ring-0 focus:border-slate-500",
  // An accent-tinted field.
  // Just the text: no border, background or ring — for fields that sit inside something that already frames them (a chat bar, a toolbar).
  plain: "rounded-none border-0 bg-transparent px-1 shadow-none focus:border-0 focus:ring-0",
  soft: "border-transparent bg-accent-50 text-accent-900 placeholder:text-accent-700/50 focus:border-accent-400 focus:ring-accent-500/20",
};

/** Invalid state per variant: the underline variant only recolors its rule, the others keep the rose border/ring. */
export const INPUT_VARIANT_INVALID_CLASSES: Record<InputVariant, string> = {
  outline: "",
  filled: "border-rose-400 bg-rose-50",
  underline: "border-rose-400 focus:border-rose-500",
  soft: "border-rose-400 bg-rose-50 text-fg placeholder:text-fg-subtle",
  plain: "text-rose-600",
};
