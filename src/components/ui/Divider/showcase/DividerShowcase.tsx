import { useState } from "react";
import { Divider } from "../Divider";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

const MIN_PANEL_PX = 80;

export default function DividerShowcase() {
  const [leftWidth, setLeftWidth] = useState(180);
  const [topHeight, setTopHeight] = useState(90);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Divider</h1>
          <p className="text-sm text-slate-500 mt-1">A plain rule, one with centered label text, or a draggable resize handle.</p>
        </div>

        <section>
          <SectionLabel sub="A plain horizontal rule.">Plain</SectionLabel>
          <Divider />
          <CodeBlock code={`<Divider />`} />
        </section>

        <section>
          <SectionLabel sub="Centered text between two lines.">With label</SectionLabel>
          <Divider label="OR" />
          <CodeBlock code={`<Divider label="OR" />`} />
        </section>

        <section>
          <SectionLabel sub="Separating two buttons side by side.">Vertical</SectionLabel>
          <div className="flex h-9 items-center gap-3">
            <Button size="sm" label="Save" />
            <Divider orientation="vertical" />
            <Button size="sm" variant="outline" label="Cancel" />
          </div>
          <CodeBlock code={`<Divider orientation="vertical" />`} />
        </section>

        <section>
          <SectionLabel sub="Matches the shared color palette.">Colors</SectionLabel>
          <div className="space-y-4">
            <Divider color="indigo" label="Indigo" />
            <Divider color="rose" label="Rose" />
          </div>
          <CodeBlock code={`<Divider color="indigo" label="Indigo" />`} />
        </section>

        <section>
          <SectionLabel sub="Drag it (or focus it and use arrow keys) — it reports the movement via onResize, the consumer owns the actual size state. Try both below.">
            Adjustable
          </SectionLabel>

          <p className="mb-2 text-xs font-medium text-slate-500">Side by side (drag the vertical divider left/right)</p>
          <div className="flex h-40 overflow-hidden rounded-lg border border-slate-200">
            <div className="flex items-center justify-center bg-slate-50 text-xs text-slate-500" style={{ width: leftWidth }}>
              {leftWidth}px
            </div>
            <Divider
              orientation="vertical"
              resizable
              onResize={(dx) => setLeftWidth((w) => Math.min(400, Math.max(MIN_PANEL_PX, w + dx)))}
            />
            <div className="flex flex-1 items-center justify-center bg-white text-xs text-slate-500">flex-1</div>
          </div>

          <p className="mt-6 mb-2 text-xs font-medium text-slate-500">Stacked (drag the horizontal divider up/down)</p>
          <div className="flex h-40 flex-col overflow-hidden rounded-lg border border-slate-200">
            <div className="flex items-center justify-center bg-slate-50 text-xs text-slate-500" style={{ height: topHeight }}>
              {topHeight}px
            </div>
            <Divider
              resizable
              onResize={(dy) => setTopHeight((h) => Math.min(160, Math.max(MIN_PANEL_PX, h + dy)))}
            />
            <div className="flex flex-1 items-center justify-center bg-white text-xs text-slate-500">flex-1</div>
          </div>

          <CodeBlock
            code={`<div className="flex">
  <div style={{ width: leftWidth }}>...</div>
  <Divider
    orientation="vertical"
    resizable
    onResize={(dx) => setLeftWidth((w) => w + dx)}
  />
  <div className="flex-1">...</div>
</div>`}
          />
        </section>
      </div>
    </div>
  );
}
