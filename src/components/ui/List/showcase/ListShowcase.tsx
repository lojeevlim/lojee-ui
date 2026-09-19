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
            code={`<List variant="plain">
  <ListItem>Overview</ListItem>
  <ListItem>Settings</ListItem>
  <ListItem>Billing</ListItem>
</List>`}
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
            code={`<List variant="divided">
  <ListItem icon="file">Project brief.pdf</ListItem>
  <ListItem icon="image">Cover photo.png</ListItem>
  <ListItem icon="folder">Archive</ListItem>
</List>`}
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
            code={`<List variant="bordered">
  <ListItem icon="circle-check">Email verified</ListItem>
  <ListItem icon="circle-check">Password set</ListItem>
  <ListItem icon="circle-alert">Two-factor auth pending</ListItem>
</List>`}
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
            code={`<List ordered variant="divided">
  <ListItem>Create an account</ListItem>
  <ListItem>Verify your email</ListItem>
  <ListItem>Invite your team</ListItem>
</List>`}
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
            code={`<List variant="bordered" className="shadow-sm">
  <ListItem icon="star" classNames={{ icon: "text-amber-500" }}>Featured item</ListItem>
  <ListItem icon="heart" classNames={{ icon: "text-rose-500" }}>Liked item</ListItem>
</List>`}
          />
        </section>
      </div>
    </div>
  );
}
