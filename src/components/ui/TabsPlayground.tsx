import { useState } from "react";
import { Tabs, type TabItem } from "./Tabs/Tabs";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout } from "./PlaygroundHelpers";

const INDICES = ["0", "1", "2"] as const;

const SAMPLE_TABS: TabItem[] = [
  { label: "Overview", content: <p className="text-sm text-slate-600">A quick summary of the project.</p> },
  { label: "Activity", content: <p className="text-sm text-slate-600">Recent activity shows up here.</p> },
  { label: "Settings", content: <p className="text-sm text-slate-600">Adjust your preferences.</p> },
];

const SAMPLE_TABS_CODE = `[
    { label: "Overview", content: <p>A quick summary of the project.</p> },
    { label: "Activity", content: <p>Recent activity shows up here.</p> },
    { label: "Settings", content: <p>Adjust your preferences.</p> },
  ]`;

export default function TabsPlayground() {
  const [color, setColor] = useState<ColorName>("slate");
  const [defaultIndex, setDefaultIndex] = useState<(typeof INDICES)[number]>("0");

  const preview = <Tabs tabs={SAMPLE_TABS} color={color} defaultIndex={Number(defaultIndex)} />;

  const code = `<Tabs
  tabs={${SAMPLE_TABS_CODE}}
  color="${color}"
  defaultIndex={${defaultIndex}}
/>`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <ColorSwatches value={color} onChange={setColor} />
      <OptionGroup label="Default index" options={INDICES} value={defaultIndex} onChange={setDefaultIndex} />
    </PlaygroundLayout>
  );
}
