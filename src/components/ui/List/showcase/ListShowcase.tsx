import { List } from "../List";
import { ListItem } from "../ListItem";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function ListShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">List</h1>
          <p className="text-sm text-fg-subtle mt-1">A simple ordered or unordered list, with optional dividers, borders, and item icons.</p>
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
              react: `<List variant="plain" items={["Overview", "Settings", "Billing"]} />`,
              js: `<l-list variant="plain" items='["Overview","Settings","Billing"]'></l-list>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-list variant="plain" :items.prop="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
const items = ["Overview", "Settings", "Billing"];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-list variant="plain" [items]="items"></l-list>
  \`,
})
export class AppComponent {
  items = ["Overview", "Settings", "Billing"];
}`,
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
              react: `<List variant="divided" items={[
  { label: "Project brief.pdf", icon: "file" },
  { label: "Cover photo.png", icon: "image" },
  { label: "Archive", icon: "folder" },
]} />`,
              js: `<l-list variant="divided" items='[{"label":"Project brief.pdf","icon":"file"},{"label":"Cover photo.png","icon":"image"},{"label":"Archive","icon":"folder"}]'></l-list>`,
              vue: `<template>
  <l-list variant="divided" :items.prop="items" />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-list variant="divided" [items]="items"></l-list>`,
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
              react: `<List variant="bordered" items={[
  { label: "Email verified", icon: "circle-check" },
  { label: "Password set", icon: "circle-check" },
  { label: "Two-factor auth pending", icon: "circle-alert" },
]} />`,
              js: `<l-list variant="bordered" items='[{"label":"Email verified","icon":"circle-check"},{"label":"Password set","icon":"circle-check"},{"label":"Two-factor auth pending","icon":"circle-alert"}]'></l-list>`,
              vue: `<template>
  <l-list variant="bordered" :items.prop="items" />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-list variant="bordered" [items]="items"></l-list>`,
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
              react: `<List ordered variant="divided" items={["Create an account", "Verify your email", "Invite your team"]} />`,
              js: `<l-list ordered variant="divided" items='["Create an account","Verify your email","Invite your team"]'></l-list>`,
              vue: `<template>
  <l-list ordered variant="divided" :items.prop="items" />
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-list ordered variant="divided" [items]="items"></l-list>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set `tooltip` to hide the visible label and show it in a Tooltip on hover instead — handy for an icon-only rail, e.g. Sidebar's `collapsed` state.">
            With tooltip
          </SectionLabel>
          <Row>
            <div className="w-14 rounded-lg border border-border">
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
              js: `<l-list>
  <l-list-item icon="home" tooltip>Dashboard</l-list-item>
  <l-list-item icon="folder" tooltip>Projects</l-list-item>
  <l-list-item icon="users" tooltip>Team</l-list-item>
</l-list>`,
              vue: `<template>
  <l-list>
    <l-list-item icon="home" tooltip>Dashboard</l-list-item>
    <l-list-item icon="folder" tooltip>Projects</l-list-item>
    <l-list-item icon="users" tooltip>Team</l-list-item>
  </l-list>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-list>
  <l-list-item icon="home" tooltip>Dashboard</l-list-item>
  <l-list-item icon="folder" tooltip>Projects</l-list-item>
  <l-list-item icon="users" tooltip>Team</l-list-item>
</l-list>`,
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
              js: `<l-list variant="bordered" class="shadow-sm">
  <l-list-item id="featured-item" icon="star">Featured item</l-list-item>
  <l-list-item id="liked-item" icon="heart">Liked item</l-list-item>
</l-list>

<script type="module">
  document.getElementById("featured-item").classNames = { icon: "text-amber-500" };
  document.getElementById("liked-item").classNames = { icon: "text-rose-500" };
</script>`,
              vue: `<template>
  <l-list variant="bordered" class="shadow-sm">
    <l-list-item icon="star" :classNames="featuredClassNames">Featured item</l-list-item>
    <l-list-item icon="heart" :classNames="likedClassNames">Liked item</l-list-item>
  </l-list>
</template>

<script setup lang="ts">
const featuredClassNames = { icon: "text-amber-500" };
const likedClassNames = { icon: "text-rose-500" };
</script>`,
              angular: `<l-list variant="bordered" class="shadow-sm">
  <l-list-item icon="star" [classNames]="featuredClassNames">Featured item</l-list-item>
  <l-list-item icon="heart" [classNames]="likedClassNames">Liked item</l-list-item>
</l-list>

featuredClassNames = { icon: "text-amber-500" };
likedClassNames = { icon: "text-rose-500" };`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <Row>
            <List variant="bordered" transition="fade">
              <ListItem>Overview</ListItem>
              <ListItem>Settings</ListItem>
              <ListItem>Billing</ListItem>
            </List>
            <List variant="bordered" transition="slide-up">
              <ListItem>Overview</ListItem>
              <ListItem>Settings</ListItem>
              <ListItem>Billing</ListItem>
            </List>
            <List variant="bordered" transition="slide-right" transitionDelay={100}>
              <ListItem>Overview</ListItem>
              <ListItem>Settings</ListItem>
              <ListItem>Billing</ListItem>
            </List>
            <List variant="bordered" transition="drop" transitionDuration={700}>
              <ListItem>Overview</ListItem>
              <ListItem>Settings</ListItem>
              <ListItem>Billing</ListItem>
            </List>
          </Row>
          <CodeBlock
            variants={{
              react: `<List variant="bordered" transition="fade" items={["Overview", "Settings", "Billing"]} />
<List variant="bordered" transition="slide-up" items={["Overview", "Settings", "Billing"]} />
<List variant="bordered" transition="slide-right" transitionDelay={100} items={["Overview", "Settings", "Billing"]} />
<List variant="bordered" transition="drop" transitionDuration={700} items={["Overview", "Settings", "Billing"]} />`,
              js: `<l-list variant="bordered" transition="fade" items='["Overview","Settings","Billing"]'></l-list>
<l-list variant="bordered" transition="slide-up" items='["Overview","Settings","Billing"]'></l-list>
<l-list variant="bordered" transition="slide-right" transitionDelay="100" items='["Overview","Settings","Billing"]'></l-list>
<l-list variant="bordered" transition="drop" transitionDuration="700" items='["Overview","Settings","Billing"]'></l-list>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-list variant="bordered" transition="fade" :items.prop="items" />
  <l-list variant="bordered" transition="slide-up" :items.prop="items" />
  <l-list variant="bordered" transition="slide-right" transitionDelay="100" :items.prop="items" />
  <l-list variant="bordered" transition="drop" transitionDuration="700" :items.prop="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
const items = ["Overview", "Settings", "Billing"];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-list variant="bordered" transition="fade" [items]="items"></l-list>
    <l-list variant="bordered" transition="slide-up" [items]="items"></l-list>
    <l-list variant="bordered" transition="slide-right" transitionDelay="100" [items]="items"></l-list>
    <l-list variant="bordered" transition="drop" transitionDuration="700" [items]="items"></l-list>
  \`,
})
export class AppComponent {
  items = ["Overview", "Settings", "Billing"];
}`,
            }}
          />
        </section>
        <section>
          <SectionLabel sub="Pass header for a gray bar on top — a title, a count or a button, with no column labels. The list becomes one rounded card.">With header</SectionLabel>
          <Row>
            <div className="w-72">
              <List header="Files">
                <ListItem icon="file">Project brief.pdf</ListItem>
                <ListItem icon="image">Cover photo.png</ListItem>
                <ListItem icon="folder">Archive</ListItem>
              </List>
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `<List header="Files" items={[
  { label: "Project brief.pdf", icon: "file" },
  { label: "Cover photo.png", icon: "image" },
  { label: "Archive", icon: "folder" },
]} />`,
              js: `<l-list header="Files" items='[{"label":"Project brief.pdf","icon":"file"},{"label":"Cover photo.png","icon":"image"},{"label":"Archive","icon":"folder"}]'></l-list>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-list header="Files" :items.prop="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
const items = [
  {label: "Project brief.pdf", icon: "file"},
  {label: "Cover photo.png", icon: "image"},
  {label: "Archive", icon: "folder"}
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-list header="Files" [items]="items"></l-list>
  \`,
})
export class AppComponent {
  items = [
    {label: "Project brief.pdf", icon: "file"},
    {label: "Cover photo.png", icon: "image"},
    {label: "Archive", icon: "folder"}
  ];
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
