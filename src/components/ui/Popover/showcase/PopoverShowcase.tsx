import { Popover } from "../Popover";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function PopoverShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Popover</h1>
          <p className="text-sm text-fg-subtle mt-1">
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
              js: `<l-popover content="Popover on top" position="top">
  <l-button variant="outline" label="Top"></l-button>
</l-popover>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-popover content="Popover on top" position="top">
    <l-button variant="outline" label="Top" />
  </l-popover>
</template>

<script setup lang="ts">
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
    <l-popover content="Popover on top" position="top">
      <l-button variant="outline" label="Top" />
    </l-popover>
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
              position="right"
              content={
                <div className="w-56">
                  <p className="text-sm font-semibold text-fg">Invite a teammate</p>
                  <p className="mt-1 text-xs text-fg-subtle">They&apos;ll get an email invite to join this workspace.</p>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="mt-3 w-full rounded-md border border-border px-2.5 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
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
  position="right"
  content={
    <div className="w-56">
      <p className="text-sm font-semibold text-fg">Invite a teammate</p>
      <p className="mt-1 text-xs text-fg-subtle">They'll get an email invite to join this workspace.</p>
      <input type="email" placeholder="name@company.com" />
      <Button className="mt-3 w-full" size="sm" label="Send invite" />
    </div>
  }
>
  <Button icon="plus" label="Invite" />
</Popover>`,
              js: `<l-popover position="right">
  <l-button icon="plus" label="Invite"></l-button>
  <div slot="content" class="w-56">
    <p class="text-sm font-semibold text-fg">Invite a teammate</p>
    <p class="mt-1 text-xs text-fg-subtle">They'll get an email invite to join this workspace.</p>
    <input type="email" placeholder="name@company.com" />
    <l-button class="mt-3 w-full" size="sm" label="Send invite"></l-button>
  </div>
</l-popover>`,
              vue: `<template>
  <l-popover position="right">
    <l-button icon="plus" label="Invite" />
    <div slot="content" class="w-56">
      <p class="text-sm font-semibold text-fg">Invite a teammate</p>
      <p class="mt-1 text-xs text-fg-subtle">They'll get an email invite to join this workspace.</p>
      <input type="email" placeholder="name@company.com" />
      <l-button class="mt-3 w-full" size="sm" label="Send invite" />
    </div>
  </l-popover>
</template>`,
              angular: `<l-popover position="right">
  <l-button icon="plus" label="Invite" />
  <div slot="content" class="w-56">
    <p class="text-sm font-semibold text-fg">Invite a teammate</p>
    <p class="mt-1 text-xs text-fg-subtle">They'll get an email invite to join this workspace.</p>
    <input type="email" placeholder="name@company.com" />
    <l-button class="mt-3 w-full" size="sm" label="Send invite" />
  </div>
</l-popover>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter/exit transitions via `transition` (with `transitionDuration` / `transitionDelay`) — open and close each one to see it play both ways.">Transitions</SectionLabel>
          <Row>
            <Popover transition="fade" content="Hello from the popover">
              <Button variant="outline" label="Fade" />
            </Popover>
            <Popover transition="slide-up" content="Hello from the popover">
              <Button variant="outline" label="Slide up" />
            </Popover>
            <Popover transition="zoom" transitionDelay={100} content="Hello from the popover">
              <Button variant="outline" label="Zoom" />
            </Popover>
            <Popover transition="flip" content="Hello from the popover">
              <Button variant="outline" label="Flip" />
            </Popover>
            <Popover transition="blur" content="Hello from the popover">
              <Button variant="outline" label="Blur" />
            </Popover>
            <Popover transition="drop" transitionDuration={700} content="Hello from the popover">
              <Button variant="outline" label="Drop" />
            </Popover>
          </Row>
          <CodeBlock
            variants={{
              react: `<Popover transition="fade" content="Hello from the popover">
  <Button variant="outline" label="Fade" />
</Popover>

<Popover transition="slide-up" content="Hello from the popover">
  <Button variant="outline" label="Slide up" />
</Popover>

<Popover transition="zoom" transitionDelay={100} content="Hello from the popover">
  <Button variant="outline" label="Zoom" />
</Popover>

<Popover transition="flip" content="Hello from the popover">
  <Button variant="outline" label="Flip" />
</Popover>

<Popover transition="blur" content="Hello from the popover">
  <Button variant="outline" label="Blur" />
</Popover>

<Popover transition="drop" transitionDuration={700} content="Hello from the popover">
  <Button variant="outline" label="Drop" />
</Popover>`,
              js: `<l-popover transition="fade" content="Hello from the popover">
  <l-button variant="outline" label="Fade"></l-button>
</l-popover>

<l-popover transition="slide-up" content="Hello from the popover">
  <l-button variant="outline" label="Slide up"></l-button>
</l-popover>

<l-popover transition="zoom" transitionDelay="100" content="Hello from the popover">
  <l-button variant="outline" label="Zoom"></l-button>
</l-popover>

<l-popover transition="flip" content="Hello from the popover">
  <l-button variant="outline" label="Flip"></l-button>
</l-popover>

<l-popover transition="blur" content="Hello from the popover">
  <l-button variant="outline" label="Blur"></l-button>
</l-popover>

<l-popover transition="drop" transitionDuration="700" content="Hello from the popover">
  <l-button variant="outline" label="Drop"></l-button>
</l-popover>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-popover transition="fade" content="Hello from the popover">
    <l-button variant="outline" label="Fade"></l-button>
  </l-popover>

  <l-popover transition="slide-up" content="Hello from the popover">
    <l-button variant="outline" label="Slide up"></l-button>
  </l-popover>

  <l-popover transition="zoom" transitionDelay="100" content="Hello from the popover">
    <l-button variant="outline" label="Zoom"></l-button>
  </l-popover>

  <l-popover transition="flip" content="Hello from the popover">
    <l-button variant="outline" label="Flip"></l-button>
  </l-popover>

  <l-popover transition="blur" content="Hello from the popover">
    <l-button variant="outline" label="Blur"></l-button>
  </l-popover>

  <l-popover transition="drop" transitionDuration="700" content="Hello from the popover">
    <l-button variant="outline" label="Drop"></l-button>
  </l-popover>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-popover transition="fade" content="Hello from the popover">
      <l-button variant="outline" label="Fade"></l-button>
    </l-popover>

    <l-popover transition="slide-up" content="Hello from the popover">
      <l-button variant="outline" label="Slide up"></l-button>
    </l-popover>

    <l-popover transition="zoom" transitionDelay="100" content="Hello from the popover">
      <l-button variant="outline" label="Zoom"></l-button>
    </l-popover>

    <l-popover transition="flip" content="Hello from the popover">
      <l-button variant="outline" label="Flip"></l-button>
    </l-popover>

    <l-popover transition="blur" content="Hello from the popover">
      <l-button variant="outline" label="Blur"></l-button>
    </l-popover>

    <l-popover transition="drop" transitionDuration="700" content="Hello from the popover">
      <l-button variant="outline" label="Drop"></l-button>
    </l-popover>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
