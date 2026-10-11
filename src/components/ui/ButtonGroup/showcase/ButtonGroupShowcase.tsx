import { ButtonGroupSection } from "./ButtonGroupSection";

export default function ButtonGroupShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Button Group</h1>
          <p className="text-sm text-fg-subtle mt-1">Related buttons joined into one control — a toolbar of actions or a segmented choice.</p>
        </div>

        <ButtonGroupSection />
      </div>
    </div>
  );
}
