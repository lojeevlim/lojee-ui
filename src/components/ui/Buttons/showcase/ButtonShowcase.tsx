import { ButtonSection } from "./ButtonSection";
import { ButtonGroupSection } from "./ButtonGroupSection";
import { SplitButtonSection } from "./SplitButtonSection";

export default function ButtonShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Button Kit</h1>
          <p className="text-sm text-slate-500 mt-1">
            Variants, sizes, colors and states — all built with Tailwind utility classes.
          </p>
        </div>

        <ButtonSection />
        <ButtonGroupSection />
        <SplitButtonSection />
      </div>
    </div>
  );
}
