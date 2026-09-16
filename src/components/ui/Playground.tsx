import ButtonPlayground from "./ButtonPlayground";

export interface PlaygroundProps {
  itemLabel?: string;
}

export default function Playground({ itemLabel }: PlaygroundProps) {
  if (itemLabel === "Buttons") {
    return <ButtonPlayground />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 py-16 text-center">
      <p className="text-sm font-medium text-slate-900">
        {itemLabel ? `No playground for "${itemLabel}" yet` : "Pick a component to try it out"}
      </p>
      <p className="text-sm text-slate-500">Select "Buttons" in the sidebar to try the interactive playground.</p>
    </div>
  );
}
