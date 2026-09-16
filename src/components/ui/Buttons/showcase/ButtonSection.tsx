import { useState } from "react";
import { Button } from "../Button";
import CodeBlock from "../../CodeBlock";
import { COLORS, cx, type ColorName } from "../../../../core/tokens";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export function ButtonSection() {
  const [activeColor, setActiveColor] = useState<ColorName>("indigo");
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleLoadingClick = () => {
    setLoadingBtn(true);
    setTimeout(() => setLoadingBtn(false), 1600);
  };

  return (
    <>
      {/* VARIANTS — includes dashed and glass */}
      <section>
        <SectionLabel sub="Solid, outline, ghost, soft, link, dashed, and a frosted glass style.">
          Variants
        </SectionLabel>
        <Row>
          <Button variant="solid" label="Solid"/>
          <Button variant="outline" label="Outline"/>
          <Button variant="ghost" label="Ghost"/>
          <Button variant="soft" label="Soft"/>
          <Button variant="link" label="Link"/>
          <Button variant="dashed" label="Dashed"/>
          <Button variant="glass" label="Glass"/>
        </Row>
        <CodeBlock
          code={`<Button variant="solid" label="Solid"/>
<Button variant="outline" label="Outline"/>
<Button variant="ghost" label="Ghost"/>
<Button variant="soft" label="Soft"/>
<Button variant="link" label="Link"/>
<Button variant="dashed" label="Dashed"/>
<Button variant="glass" label="Glass"/>`}
        />
      </section>

      {/* SIZES — includes full width */}
      <section>
        <SectionLabel sub="From compact (xs) to prominent (xl), plus a full-width stretch.">
          Sizes
        </SectionLabel>
        <Row>
          <Button size="xs" label="Extra small" />
          <Button size="sm" label="Small" />
          <Button size="md" label="Medium" />
          <Button size="lg" label="Large" />
          <Button size="xl" label="Extra large" />
        </Row>
        <div className="mt-4 max-w-sm">
          <Button size="full" label="Full Width" />
        </div>
        <CodeBlock
          code={`<Button size="xs" label="Extra small" />
<Button size="sm" label="Small" />
<Button size="md" label="Medium" />
<Button size="lg" label="Large" />
<Button size="xl" label="Extra large" />
<Button size="full" label="Full Width" />`}
        />
      </section>

      {/* COLORS — pick from the full palette, see it applied across every variant below */}
      <section>
        <SectionLabel sub="Pick a color, see it applied across every variant below.">
          Colors
        </SectionLabel>
        <div className="flex flex-wrap gap-2 mb-5">
          {COLORS.map((c) => (
            <div
              key={c.base}
              className={cx(
                "rounded-lg",
                activeColor === c.base && "ring-2 ring-slate-900 ring-offset-2"
              )}
            >
              <Button color={c.base} variant="solid" size="sm" label={c.name} onClick={() => setActiveColor(c.base)} />
            </div>
          ))}
        </div>
        <CodeBlock
          code={`<Button color="${activeColor}" variant="solid" label="Solid" />
<Button color="${activeColor}" variant="outline" label="Outline" />
<Button color="${activeColor}" variant="ghost" label="Ghost" />
<Button color="${activeColor}" variant="soft" label="Soft" />
<Button color="${activeColor}" variant="link" label="Link" />`}
        />
      </section>

      {/* GRADIENT — right below Colors */}
      <section>
        <SectionLabel sub="Eye-catching CTAs — use sparingly.">Gradient</SectionLabel>
        <Row>
          <Button variant="gradient" color="indigo" icon="arrow-right" iconPosition="right" label="Get started" />
          <Button variant="gradient" color="rose" label="Upgrade to Pro" />
          <Button variant="gradient" color="emerald" label="Claim offer" />
          <Button variant="gradient" color="blue" label="Try for free" />
        </Row>
        <CodeBlock
          code={`<Button variant="gradient" color="indigo" icon="arrow-right" iconPosition="right" label="Get started" />
<Button variant="gradient" color="rose" label="Upgrade to Pro" />
<Button variant="gradient" color="emerald" label="Claim offer" />
<Button variant="gradient" color="blue" label="Try for free" />`}
        />
      </section>

      {/* WITH ICONS */}
      <section>
        <SectionLabel sub="Icon left, icon right, or icon only.">
          With icons
        </SectionLabel>
        <Row>
          <Button icon="plus" variant="solid" label="New item" />
          <Button icon="download" iconPosition="right" variant="outline" label="Download" />
          <Button icon="arrow-right" iconPosition="right" variant="ghost" label="Continue" />
          <Button color="rose" variant="outline" icon="trash-2" label="Delete" />
        </Row>
        <CodeBlock
          code={`<Button icon="plus" variant="solid" label="New item" />
<Button icon="download" iconPosition="right" variant="outline" label="Download" />
<Button icon="arrow-right" iconPosition="right" variant="ghost" label="Continue" />
<Button color="rose" variant="outline" icon="trash-2" label="Delete" />`}
        />
      </section>

      {/* ICON-ONLY BUTTONS — right below With icons */}
      <section>
        <SectionLabel sub="Circular icon buttons across every size, plus a notification badge.">
          Icon-only
        </SectionLabel>
        <Row>
          <Button icon="settings" iconOnly variant="ghost" shape="pill" size="xs" label="Settings" />
          <Button icon="settings" iconOnly variant="ghost" shape="pill" size="sm" label="Settings" />
          <Button icon="settings" iconOnly variant="ghost" shape="pill" size="md" label="Settings" />
          <Button icon="settings" iconOnly variant="ghost" shape="pill" size="lg" label="Settings" />
          <Button icon="settings" iconOnly variant="ghost" shape="pill" size="xl" label="Settings" />
          <Button icon="mail" iconOnly variant="soft" color="indigo" shape="pill" size="md" label="Mail" />
          <Button icon="bell" iconOnly variant="soft" color="rose" shape="pill" size="md" badge={3} label="Notifications" />
          <Button icon="plus" iconOnly variant="solid" color="emerald" size="md" shape="square" label="Add" />
        </Row>
        <CodeBlock
          code={`<Button icon="settings" iconOnly variant="ghost" shape="pill" label="Settings" />
<Button icon="mail" iconOnly variant="soft" color="indigo" shape="pill" label="Mail" />
<Button icon="bell" iconOnly variant="soft" color="rose" shape="pill" badge={3} label="Notifications" />
<Button icon="plus" iconOnly variant="solid" color="emerald" shape="square" label="Add" />`}
        />
      </section>

      {/* STATES */}
      <section>
        <SectionLabel sub="Default, hover (try it), disabled, and loading.">
          States
        </SectionLabel>
        <Row>
          <Button variant="solid" color="slate" label="Default — hover me" />
          <Button variant="solid" color="slate" disabled label="Disabled" />
          <Button
            variant="solid"
            color="slate"
            icon={loadingBtn ? undefined : "check"}
            loading={loadingBtn}
            label={loadingBtn ? "Saving…" : "Save changes"}
            onClick={handleLoadingClick}
          />
        </Row>
        <CodeBlock
          code={`<Button color="slate" label="Default — hover me" />
<Button color="slate" disabled label="Disabled" />
<Button color="slate" loading={isSaving} onClick={handleSave} label={isSaving ? "Saving…" : "Save changes"} />`}
        />
      </section>

      {/* SHAPES */}
      <section>
        <SectionLabel sub="Same button, three corner treatments.">Shapes</SectionLabel>
        <Row>
          <Button variant="solid" color="slate" shape="default" label="Default" />
          <Button variant="solid" color="slate" shape="pill" label="Pill" />
          <Button variant="solid" color="slate" shape="square" label="Square" />
        </Row>
        <CodeBlock
          code={`<Button shape="default" label="Default" />
<Button shape="pill" label="Pill" />
<Button shape="square" label="Square" />`}
        />
      </section>
    </>
  );
}
