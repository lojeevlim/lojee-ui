import { SplitButtonSection } from "./SplitButtonSection";

export default function SplitButtonShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Split Button</h1>
          <p className="text-sm text-fg-subtle mt-1">A primary action paired with a dropdown of related actions.</p>
        </div>

        <SplitButtonSection />
      </div>
    </div>
  );
}
