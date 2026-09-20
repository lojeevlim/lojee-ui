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
              js: `<List variant="plain">
  <ListItem>Overview</ListItem>
  <ListItem>Settings</ListItem>
  <ListItem>Billing</ListItem>
</List>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <List variant="plain">
    <ListItem>Overview</ListItem>
    <ListItem>Settings</ListItem>
    <ListItem>Billing</ListItem>
  </List>
</template>

<script setup>
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
    <List variant="plain">
      <ListItem>Overview</ListItem>
      <ListItem>Settings</ListItem>
      <ListItem>Billing</ListItem>
    </List>
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
              js: `<List variant="divided">
  <ListItem icon="file">Project brief.pdf</ListItem>
  <ListItem icon="image">Cover photo.png</ListItem>
  <ListItem icon="folder">Archive</ListItem>
</List>`,
              vue: `<template>
  <List variant="divided">
    <ListItem icon="file">Project brief.pdf</ListItem>
    <ListItem icon="image">Cover photo.png</ListItem>
    <ListItem icon="folder">Archive</ListItem>
  </List>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<List variant="divided">
  <ListItem icon="file">Project brief.pdf</ListItem>
  <ListItem icon="image">Cover photo.png</ListItem>
  <ListItem icon="folder">Archive</ListItem>
</List>`,
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
              js: `<List variant="bordered">
  <ListItem icon="circle-check">Email verified</ListItem>
  <ListItem icon="circle-check">Password set</ListItem>
  <ListItem icon="circle-alert">Two-factor auth pending</ListItem>
</List>`,
              vue: `<template>
  <List variant="bordered">
    <ListItem icon="circle-check">Email verified</ListItem>
    <ListItem icon="circle-check">Password set</ListItem>
    <ListItem icon="circle-alert">Two-factor auth pending</ListItem>
  </List>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<List variant="bordered">
  <ListItem icon="circle-check">Email verified</ListItem>
  <ListItem icon="circle-check">Password set</ListItem>
  <ListItem icon="circle-alert">Two-factor auth pending</ListItem>
</List>`,
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
              js: `<List ordered variant="divided">
  <ListItem>Create an account</ListItem>
  <ListItem>Verify your email</ListItem>
  <ListItem>Invite your team</ListItem>
</List>`,
              vue: `<template>
  <List ordered variant="divided">
    <ListItem>Create an account</ListItem>
    <ListItem>Verify your email</ListItem>
    <ListItem>Invite your team</ListItem>
  </List>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<List ordered variant="divided">
  <ListItem>Create an account</ListItem>
  <ListItem>Verify your email</ListItem>
  <ListItem>Invite your team</ListItem>
</List>`,
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
              js: `<List>
  <ListItem icon="home" tooltip>Dashboard</ListItem>
  <ListItem icon="folder" tooltip>Projects</ListItem>
  <ListItem icon="users" tooltip>Team</ListItem>
</List>`,
              vue: `<template>
  <List>
    <ListItem icon="home" tooltip>Dashboard</ListItem>
    <ListItem icon="folder" tooltip>Projects</ListItem>
    <ListItem icon="users" tooltip>Team</ListItem>
  </List>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<List>
  <ListItem icon="home" tooltip>Dashboard</ListItem>
  <ListItem icon="folder" tooltip>Projects</ListItem>
  <ListItem icon="users" tooltip>Team</ListItem>
</List>`,
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
              js: `<List variant="bordered" className="shadow-sm">
  <ListItem id="featured-item" icon="star">Featured item</ListItem>
  <ListItem id="liked-item" icon="heart">Liked item</ListItem>
</List>

<script type="module">
  document.getElementById("featured-item").classNames = { icon: "text-amber-500" };
  document.getElementById("liked-item").classNames = { icon: "text-rose-500" };
</script>`,
              vue: `<template>
  <List variant="bordered" className="shadow-sm">
    <ListItem icon="star" :classNames="featuredClassNames">Featured item</ListItem>
    <ListItem icon="heart" :classNames="likedClassNames">Liked item</ListItem>
  </List>
</template>

<script setup>
const featuredClassNames = { icon: "text-amber-500" };
const likedClassNames = { icon: "text-rose-500" };
</script>`,
              angular: `<List variant="bordered" className="shadow-sm">
  <ListItem icon="star" [classNames]="featuredClassNames">Featured item</ListItem>
  <ListItem icon="heart" [classNames]="likedClassNames">Liked item</ListItem>
</List>

featuredClassNames = { icon: "text-amber-500" };
likedClassNames = { icon: "text-rose-500" };`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
