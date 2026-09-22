import { List } from "../List";
import { ListItem } from "../ListItem";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function ListShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">List</h1>
          <p className="text-sm text-slate-500 mt-1">A simple ordered or unordered list, with optional dividers, borders, and item icons.</p>
        </div>

        <section>
          <SectionLabel sub="No dividers or border — just spacing.">Plain</SectionLabel>
          <Row>
            <div className="w-72">
              <List variant="plain">
                <ListItem>Overview</ListItem>
                <ListItem>Settings</ListItem>
                <ListItem>Billing</ListItem>
              </List>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<List variant="plain">
  <ListItem>Overview</ListItem>
  <ListItem>Settings</ListItem>
  <ListItem>Billing</ListItem>
</List>`,
              js: `<l-List variant="plain">
  <l-ListItem>Overview</l-ListItem>
  <l-ListItem>Settings</l-ListItem>
  <l-ListItem>Billing</l-ListItem>
</l-List>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-List variant="plain">
    <l-ListItem>Overview</l-ListItem>
    <l-ListItem>Settings</l-ListItem>
    <l-ListItem>Billing</l-ListItem>
  </l-List>
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
    <l-List variant="plain">
      <l-ListItem>Overview</l-ListItem>
      <l-ListItem>Settings</l-ListItem>
      <l-ListItem>Billing</l-ListItem>
    </l-List>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A hairline divider between each item.">Divided</SectionLabel>
          <Row>
            <div className="w-72">
              <List variant="divided">
                <ListItem icon="file">Project brief.pdf</ListItem>
                <ListItem icon="image">Cover photo.png</ListItem>
                <ListItem icon="folder">Archive</ListItem>
              </List>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<List variant="divided">
  <ListItem icon="file">Project brief.pdf</ListItem>
  <ListItem icon="image">Cover photo.png</ListItem>
  <ListItem icon="folder">Archive</ListItem>
</List>`,
              js: `<l-List variant="divided">
  <l-ListItem icon="file">Project brief.pdf</l-ListItem>
  <l-ListItem icon="image">Cover photo.png</l-ListItem>
  <l-ListItem icon="folder">Archive</l-ListItem>
</l-List>`,
              vue: `<template>
  <l-List variant="divided">
    <l-ListItem icon="file">Project brief.pdf</l-ListItem>
    <l-ListItem icon="image">Cover photo.png</l-ListItem>
    <l-ListItem icon="folder">Archive</l-ListItem>
  </l-List>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-List variant="divided">
  <l-ListItem icon="file">Project brief.pdf</l-ListItem>
  <l-ListItem icon="image">Cover photo.png</l-ListItem>
  <l-ListItem icon="folder">Archive</l-ListItem>
</l-List>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Dividers plus an outer rounded border — reads as a self-contained card.">Bordered</SectionLabel>
          <Row>
            <div className="w-72">
              <List variant="bordered">
                <ListItem icon="circle-check">Email verified</ListItem>
                <ListItem icon="circle-check">Password set</ListItem>
                <ListItem icon="circle-alert">Two-factor auth pending</ListItem>
              </List>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<List variant="bordered">
  <ListItem icon="circle-check">Email verified</ListItem>
  <ListItem icon="circle-check">Password set</ListItem>
  <ListItem icon="circle-alert">Two-factor auth pending</ListItem>
</List>`,
              js: `<l-List variant="bordered">
  <l-ListItem icon="circle-check">Email verified</l-ListItem>
  <l-ListItem icon="circle-check">Password set</l-ListItem>
  <l-ListItem icon="circle-alert">Two-factor auth pending</l-ListItem>
</l-List>`,
              vue: `<template>
  <l-List variant="bordered">
    <l-ListItem icon="circle-check">Email verified</l-ListItem>
    <l-ListItem icon="circle-check">Password set</l-ListItem>
    <l-ListItem icon="circle-alert">Two-factor auth pending</l-ListItem>
  </l-List>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-List variant="bordered">
  <l-ListItem icon="circle-check">Email verified</l-ListItem>
  <l-ListItem icon="circle-check">Password set</l-ListItem>
  <l-ListItem icon="circle-alert">Two-factor auth pending</l-ListItem>
</l-List>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Renders an <ol> instead of a <ul> for sequential content.">Ordered</SectionLabel>
          <Row>
            <div className="w-72">
              <List ordered variant="divided">
                <ListItem>Create an account</ListItem>
                <ListItem>Verify your email</ListItem>
                <ListItem>Invite your team</ListItem>
              </List>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<List ordered variant="divided">
  <ListItem>Create an account</ListItem>
  <ListItem>Verify your email</ListItem>
  <ListItem>Invite your team</ListItem>
</List>`,
              js: `<l-List ordered variant="divided">
  <l-ListItem>Create an account</l-ListItem>
  <l-ListItem>Verify your email</l-ListItem>
  <l-ListItem>Invite your team</l-ListItem>
</l-List>`,
              vue: `<template>
  <l-List ordered variant="divided">
    <l-ListItem>Create an account</l-ListItem>
    <l-ListItem>Verify your email</l-ListItem>
    <l-ListItem>Invite your team</l-ListItem>
  </l-List>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-List ordered variant="divided">
  <l-ListItem>Create an account</l-ListItem>
  <l-ListItem>Verify your email</l-ListItem>
  <l-ListItem>Invite your team</l-ListItem>
</l-List>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set `tooltip` to hide the visible label and show it in a Tooltip on hover instead — handy for an icon-only rail, e.g. Sidebar's `collapsed` state.">
            With tooltip
          </SectionLabel>
          <Row>
            <div className="w-14 rounded-lg border border-slate-200">
              <List>
                <ListItem icon="home" tooltip>Dashboard</ListItem>
                <ListItem icon="folder" tooltip>Projects</ListItem>
                <ListItem icon="users" tooltip>Team</ListItem>
              </List>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<List>
  <ListItem icon="home" tooltip>Dashboard</ListItem>
  <ListItem icon="folder" tooltip>Projects</ListItem>
  <ListItem icon="users" tooltip>Team</ListItem>
</List>`,
              js: `<l-List>
  <l-ListItem icon="home" tooltip>Dashboard</l-ListItem>
  <l-ListItem icon="folder" tooltip>Projects</l-ListItem>
  <l-ListItem icon="users" tooltip>Team</l-ListItem>
</l-List>`,
              vue: `<template>
  <l-List>
    <l-ListItem icon="home" tooltip>Dashboard</l-ListItem>
    <l-ListItem icon="folder" tooltip>Projects</l-ListItem>
    <l-ListItem icon="users" tooltip>Team</l-ListItem>
  </l-List>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-List>
  <l-ListItem icon="home" tooltip>Dashboard</l-ListItem>
  <l-ListItem icon="folder" tooltip>Projects</l-ListItem>
  <l-ListItem icon="users" tooltip>Team</l-ListItem>
</l-List>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Override the root with className, or target the leading icon with classNames.">Custom styling</SectionLabel>
          <Row>
            <div className="w-72">
              <List variant="bordered" className="shadow-sm">
                <ListItem icon="star" classNames={{ icon: "text-amber-500" }}>
                  Featured item
                </ListItem>
                <ListItem icon="heart" classNames={{ icon: "text-rose-500" }}>
                  Liked item
                </ListItem>
              </List>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<List variant="bordered" className="shadow-sm">
  <ListItem icon="star" classNames={{ icon: "text-amber-500" }}>Featured item</ListItem>
  <ListItem icon="heart" classNames={{ icon: "text-rose-500" }}>Liked item</ListItem>
</List>`,
              js: `<l-List variant="bordered" className="shadow-sm">
  <l-ListItem id="featured-item" icon="star">Featured item</l-ListItem>
  <l-ListItem id="liked-item" icon="heart">Liked item</l-ListItem>
</l-List>

<script type="module">
  document.getElementById("featured-item").classNames = { icon: "text-amber-500" };
  document.getElementById("liked-item").classNames = { icon: "text-rose-500" };
</script>`,
              vue: `<template>
  <l-List variant="bordered" className="shadow-sm">
    <l-ListItem icon="star" :classNames="featuredClassNames">Featured item</l-ListItem>
    <l-ListItem icon="heart" :classNames="likedClassNames">Liked item</l-ListItem>
  </l-List>
</template>

<script setup lang="ts">
const featuredClassNames = { icon: "text-amber-500" };
const likedClassNames = { icon: "text-rose-500" };
</script>`,
              angular: `<l-List variant="bordered" className="shadow-sm">
  <l-ListItem icon="star" [classNames]="featuredClassNames">Featured item</l-ListItem>
  <l-ListItem icon="heart" [classNames]="likedClassNames">Liked item</l-ListItem>
</l-List>

featuredClassNames = { icon: "text-amber-500" };
likedClassNames = { icon: "text-rose-500" };`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
