import { Popover } from "../Popover";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function PopoverShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Popover</h1>
          <p className="text-sm text-slate-500 mt-1">
            Click-triggered floating content, anchored to a trigger element — closes on outside
            click or Escape.
          </p>
        </div>

        <section>
          <SectionLabel sub="Click a button to see it.">Positions</SectionLabel>
          <Row>
            <Popover content="Popover on top" position="top">
              <Button variant="outline" label="Top" />
            </Popover>
            <Popover content="Popover on bottom" position="bottom">
              <Button variant="outline" label="Bottom" />
            </Popover>
            <Popover content="Popover on left" position="left">
              <Button variant="outline" label="Left" />
            </Popover>
            <Popover content="Popover on right" position="right">
              <Button variant="outline" label="Right" />
            </Popover>
          </Row>
          <CodeBlock
            variants={{
              react: `<Popover content="Popover on top" position="top">
  <Button variant="outline" label="Top" />
</Popover>`,
              js: `<l-Popover content="Popover on top" position="top">
  <l-Button variant="outline" label="Top" />
</l-Popover>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Popover content="Popover on top" position="top">
    <l-Button variant="outline" label="Top" />
  </l-Popover>
</template>

<script setup>
import "lojee-ui/elements";
</script>`,
              angular: `// popover-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-popover-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Popover content="Popover on top" position="top">
      <l-Button variant="outline" label="Top" />
    </l-Popover>
  \`,
})
export class PopoverShowcaseComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="The content prop accepts any ReactNode — including a small form.">
            Rich content
          </SectionLabel>
          <Row>
            <Popover
              position="bottom"
              content={
                <div className="w-56">
                  <p className="text-sm font-semibold text-slate-900">Invite a teammate</p>
                  <p className="mt-1 text-xs text-slate-500">They&apos;ll get an email invite to join this workspace.</p>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="mt-3 w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
                  />
                  <Button className="mt-3 w-full" size="sm" label="Send invite" />
                </div>
              }
            >
              <Button icon="plus" label="Invite" />
            </Popover>
          </Row>
          <CodeBlock
            variants={{
              react: `<Popover
  position="bottom"
  content={
    <div className="w-56">
      <p className="text-sm font-semibold text-slate-900">Invite a teammate</p>
      <p className="mt-1 text-xs text-slate-500">They'll get an email invite to join this workspace.</p>
      <input type="email" placeholder="name@company.com" />
      <Button className="mt-3 w-full" size="sm" label="Send invite" />
    </div>
  }
>
  <Button icon="plus" label="Invite" />
</Popover>`,
              js: `<l-Popover position="bottom">
  <l-Button icon="plus" label="Invite" />
  <div slot="content" className="w-56">
    <p className="text-sm font-semibold text-slate-900">Invite a teammate</p>
    <p className="mt-1 text-xs text-slate-500">They'll get an email invite to join this workspace.</p>
    <input type="email" placeholder="name@company.com" />
    <l-Button className="mt-3 w-full" size="sm" label="Send invite" />
  </div>
</l-Popover>`,
              vue: `<template>
  <l-Popover position="bottom">
    <l-Button icon="plus" label="Invite" />
    <div slot="content" class="w-56">
      <p class="text-sm font-semibold text-slate-900">Invite a teammate</p>
      <p class="mt-1 text-xs text-slate-500">They'll get an email invite to join this workspace.</p>
      <input type="email" placeholder="name@company.com" />
      <l-Button class="mt-3 w-full" size="sm" label="Send invite" />
    </div>
  </l-Popover>
</template>`,
              angular: `<l-Popover position="bottom">
  <l-Button icon="plus" label="Invite" />
  <div slot="content" class="w-56">
    <p class="text-sm font-semibold text-slate-900">Invite a teammate</p>
    <p class="mt-1 text-xs text-slate-500">They'll get an email invite to join this workspace.</p>
    <input type="email" placeholder="name@company.com" />
    <l-Button class="mt-3 w-full" size="sm" label="Send invite" />
  </div>
</l-Popover>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
