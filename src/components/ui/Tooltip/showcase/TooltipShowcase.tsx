import { Tooltip } from "../Tooltip";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function TooltipShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Tooltip</h1>
          <p className="text-sm text-slate-500 mt-1">
            Hover-triggered floating text, positioned via pure CSS — no JS state, no positioning
            library.
          </p>
        </div>

        <section>
          <SectionLabel sub="Hover a button to see it.">Positions</SectionLabel>
          <Row>
            <Tooltip content="Tooltip on top" position="top">
              <Button variant="outline" label="Top" />
            </Tooltip>
            <Tooltip content="Tooltip on bottom" position="bottom">
              <Button variant="outline" label="Bottom" />
            </Tooltip>
            <Tooltip content="Tooltip on left" position="left">
              <Button variant="outline" label="Left" />
            </Tooltip>
            <Tooltip content="Tooltip on right" position="right">
              <Button variant="outline" label="Right" />
            </Tooltip>
          </Row>
          <CodeBlock
            code={`<Tooltip content="Tooltip on top" position="top">
  <Button variant="outline" label="Top" />
</Tooltip>`}
          />
        </section>

        <section>
          <SectionLabel sub="Same color palette as Button — defaults to slate.">Colors</SectionLabel>
          <Row>
            <Tooltip content="Slate (default)" color="slate">
              <Button variant="outline" label="Slate" />
            </Tooltip>
            <Tooltip content="Indigo tooltip" color="indigo">
              <Button variant="outline" label="Indigo" />
            </Tooltip>
            <Tooltip content="Emerald tooltip" color="emerald">
              <Button variant="outline" label="Emerald" />
            </Tooltip>
            <Tooltip content="Rose tooltip" color="rose">
              <Button variant="outline" label="Rose" />
            </Tooltip>
            <Tooltip content="Amber tooltip" color="amber">
              <Button variant="outline" label="Amber" />
            </Tooltip>
          </Row>
          <CodeBlock
            code={`<Tooltip content="Indigo tooltip" color="indigo">
  <Button variant="outline" label="Indigo" />
</Tooltip>`}
          />
        </section>

        <section>
          <SectionLabel sub="Snapped to the nearest Tailwind delay-* step.">Delay</SectionLabel>
          <Row>
            <Tooltip content="Instant" delayMs={0}>
              <Button variant="soft" label="No delay" />
            </Tooltip>
            <Tooltip content="Waits a bit" delayMs={500}>
              <Button variant="soft" label="500ms delay" />
            </Tooltip>
          </Row>
          <CodeBlock code={`<Tooltip content="Waits a bit" delayMs={500}>...</Tooltip>`} />
        </section>

        <section>
          <SectionLabel sub="Any element can be the trigger, not just Button.">Any trigger</SectionLabel>
          <Row>
            <Tooltip content="This works on plain text too">
              <span className="cursor-help underline decoration-dotted underline-offset-4">Hover this text</span>
            </Tooltip>
          </Row>
          <CodeBlock
            code={`<Tooltip content="This works on plain text too">
  <span>Hover this text</span>
</Tooltip>`}
          />
        </section>
      </div>
    </div>
  );
}
