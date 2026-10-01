import { ButtonSection } from "./ButtonSection";
import { ButtonGroupSection } from "./ButtonGroupSection";
import { SplitButtonSection } from "./SplitButtonSection";
import { ButtonMotionSection } from "./ButtonMotionSection";

export default function ButtonShowcase() {
  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Button</h1>
          <p className="text-sm text-fg-subtle mt-1">
            Variants, sizes, colors and states — all built with Tailwind utility classes.
          </p>
        </div>

        <ButtonSection />
        <ButtonGroupSection />
        <SplitButtonSection />
        <ButtonMotionSection />
      </div>
    </div>
  );
}
