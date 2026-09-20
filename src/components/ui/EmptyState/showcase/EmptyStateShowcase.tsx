import { EmptyState } from "../EmptyState";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function EmptyStateShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Empty State</h1>
          <p className="text-sm text-slate-500 mt-1">
            A neutral placeholder for a list, table, or section with nothing to show yet — an icon, a title, an
            optional description, and an optional action.
          </p>
        </div>

        <section>
          <SectionLabel sub="Just an icon and a title.">Basic</SectionLabel>
          <EmptyState title="No items yet" />
          <CodeBlock
            variants={{
              react: `<EmptyState title="No items yet" />`,
              js: `<EmptyState title="No items yet" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<EmptyState title="No items yet" />`,
              angular: `<EmptyState title="No items yet" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Add a description below the title for more context.">With description</SectionLabel>
          <EmptyState title="No projects">Create your first project to get started.</EmptyState>
          <CodeBlock
            variants={{
              react: `<EmptyState title="No projects">\n  Create your first project to get started.\n</EmptyState>`,
              js: `<EmptyState title="No projects">
  Create your first project to get started.
</EmptyState>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<EmptyState title="No projects">\n  Create your first project to get started.\n</EmptyState>`,
              angular: `<EmptyState title="No projects">\n  Create your first project to get started.\n</EmptyState>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Swap the icon for the context — e.g. a search icon for empty search results.">
            Custom icon
          </SectionLabel>
          <EmptyState title="No results found" icon="search">
            Try adjusting your filters.
          </EmptyState>
          <CodeBlock
            variants={{
              react: `<EmptyState title="No results found" icon="search">\n  Try adjusting your filters.\n</EmptyState>`,
              js: `<EmptyState title="No results found" icon="search">
  Try adjusting your filters.
</EmptyState>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<EmptyState title="No results found" icon="search">\n  Try adjusting your filters.\n</EmptyState>`,
              angular: `<EmptyState title="No results found" icon="search">\n  Try adjusting your filters.\n</EmptyState>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Give people a way out of the empty state with an action below the description.">
            With action
          </SectionLabel>
          <EmptyState title="No items yet" icon="folder" action={<Button label="Add item" />}>
            Get started by creating your first item.
          </EmptyState>
          <CodeBlock
            variants={{
              react: `<EmptyState
  title="No items yet"
  icon="folder"
  action={<Button label="Add item" onClick={handleAdd} />}
>
  Get started by creating your first item.
</EmptyState>`,
              js: `<EmptyState title="No items yet" icon="folder">
  Get started by creating your first item.
  <Button slot="action" label="Add item" id="add-item-btn" />
</EmptyState>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("add-item-btn").addEventListener("click", () => {
    /* create item */
  });
</script>`,
              vue: `<template>
  <EmptyState title="No items yet" icon="folder">
    Get started by creating your first item.
    <Button slot="action" label="Add item" @click="handleAdd" />
  </EmptyState>
</template>

<script setup>
import "lojee-ui/elements";

const handleAdd = () => {
  /* create item */
};
</script>`,
              angular: `<!-- app.component.html -->
<EmptyState title="No items yet" icon="folder">
  Get started by creating your first item.
  <Button slot="action" label="Add item" (click)="handleAdd()" />
</EmptyState>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
