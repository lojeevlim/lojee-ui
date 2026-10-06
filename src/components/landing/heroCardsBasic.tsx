/* eslint-disable react-refresh/only-export-components -- exports a data array of demo cards; the components here are file-private helpers */
import { useState, type ReactNode } from "react";
import { HeroCard } from "./HeroCard";
import { Accordion } from "../ui/Accordion/Accordion";
import { AccordionItem } from "../ui/Accordion/AccordionItem";
import { Avatar } from "../ui/Avatar/Avatar";
import { AvatarGroup } from "../ui/Avatar/AvatarGroup";
import { Badge } from "../ui/Badge/Badge";
import { Button } from "../ui/Buttons/Button";
import { ButtonGroup } from "../ui/Buttons/ButtonGroup";
import { SegmentButton } from "../ui/Buttons/SegmentButton";
import { SplitButton } from "../ui/Buttons/SplitButton";
import { SplitButtonMenuItem } from "../ui/Buttons/SplitButtonMenuItem";
import { Card } from "../ui/Card/Card";
import { Carousel } from "../ui/Carousel/Carousel";
import { CodeSnippet } from "../ui/CodeSnippet/CodeSnippet";
import { Container } from "../ui/Container/Container";
import { Divider } from "../ui/Divider/Divider";
import { Grid } from "../ui/Grid/Grid";
import { Icon } from "../ui/Icons/Icon";
import { Image } from "../ui/Image/Image";
import { sampleImage } from "../ui/Image/samples";
import { List } from "../ui/List/List";
import { ListItem } from "../ui/List/ListItem";
import { Skeleton } from "../ui/Skeleton/Skeleton";
import { Section } from "../ui/Section/Section";
import { Spinner } from "../ui/Spinner/Spinner";

function Label({ children }: { children: ReactNode }) {
  return <p className="mb-1.5 mt-3 font-mono text-[9px] uppercase tracking-wider text-fg-subtle first:mt-0">{children}</p>;
}

function Cell({ n }: { n: number }) {
  return <div className="flex h-8 items-center justify-center rounded-md bg-accent-500/15 text-xs font-medium text-accent-600">{n}</div>;
}

function Box({ children }: { children: ReactNode }) {
  return <div className="rounded-md border border-dashed border-border bg-surface-muted px-2 py-1.5 text-center text-[11px] text-fg-muted">{children}</div>;
}

function SegmentDemo({ options, icons }: { options: string[]; icons?: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <ButtonGroup>
      {options.map((o, i) => (
        <SegmentButton key={o} icon={icons?.[i]} active={active === i} onClick={() => setActive(i)} aria-label={o}>
          {icons ? null : o}
        </SegmentButton>
      ))}
    </ButtonGroup>
  );
}

function CarouselDemo({ autoPlay = false, seeds }: { autoPlay?: boolean; seeds: number[] }) {
  const slides = seeds.map((s) => (
    <img key={s} src={sampleImage(s, 480, 200)} alt="" className="h-24 w-full object-cover" />
  ));
  return (
    <div className="h-24 overflow-hidden rounded-lg">
      <Carousel slides={slides} autoPlay={autoPlay} intervalMs={2500} />
    </div>
  );
}

function TextSlides() {
  const slides = ["Ship faster", "Theme anywhere", "Accessible"].map((t, i) => (
    <div key={t} className={`flex h-24 items-center justify-center text-sm font-semibold ${i === 1 ? "bg-accent-500/20 text-accent-600" : "bg-surface-muted text-fg"}`}>
      {t}
    </div>
  ));
  return (
    <div className="h-24 overflow-hidden rounded-lg">
      <Carousel slides={slides} showArrows={false} />
    </div>
  );
}

const CODE = `import { Button } from "lojee-ui";

export const Save = () => (
  <Button label="Save" icon="check" />
);`;

const REEL_1: ReactNode[] = [
  <HeroCard key="btn-variants" name="Button / variants" w="w-80">
    <div className="flex flex-wrap gap-2">
      <Button size="sm" label="Solid" />
      <Button size="sm" variant="outline" label="Outline" />
      <Button size="sm" variant="soft" label="Soft" />
      <Button size="sm" variant="ghost" label="Ghost" />
      <Button size="sm" variant="gradient" label="Gradient" />
      <Button size="sm" variant="glass" lighting="scroll" label="Glass" />
      <Button size="sm" variant="dashed" label="Dashed" />
      <Button size="sm" variant="link" label="Link" />
    </div>
  </HeroCard>,
  <HeroCard key="btn-destructive" name="Button / destructive" w="w-80">
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="destructive" icon="trash-2" label="Delete" />
      <Button size="sm" variant="destructive-soft" label="Remove" />
      <Button size="sm" variant="destructive-outline" label="Discard" />
    </div>
    <Label>colors</Label>
    <div className="flex flex-wrap gap-2">
      <Button size="sm" color="emerald" label="Emerald" />
      <Button size="sm" color="violet" label="Violet" />
      <Button size="sm" color="amber" label="Amber" />
      <Button size="sm" color="rose" variant="soft" label="Rose" />
    </div>
  </HeroCard>,
  <HeroCard key="btn-sizes" name="Button / sizes + shapes" w="w-80">
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs" label="XS" />
      <Button size="sm" label="SM" />
      <Button size="md" label="MD" />
      <Button size="lg" label="LG" />
    </div>
    <Label>shapes</Label>
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" shape="pill" variant="outline" label="Pill" />
      <Button size="sm" shape="square" variant="outline" label="Square" />
      <Button size="sm" label="Default" variant="outline" />
    </div>
  </HeroCard>,
  <HeroCard key="btn-states" name="Button / icons + states" w="w-80">
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" icon="download" label="Download" />
      <Button size="sm" variant="outline" icon="arrow-right" iconPosition="right" label="Next" />
      <Button size="sm" iconOnly icon="heart" label="Like" variant="soft" />
      <Button size="sm" iconOnly icon="settings" label="Settings" variant="ghost" shape="pill" />
    </div>
    <Label>loading / disabled / badge</Label>
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" loading label="Saving" />
      <Button size="sm" disabled label="Disabled" />
      <Button size="sm" variant="outline" icon="bell" label="Inbox" badge="3" />
    </div>
  </HeroCard>,
  <HeroCard key="btn-animated" name="Button / animation + hover" w="w-80">
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" animation="pulse" label="Pulse" />
      <Button size="sm" animation="glow" variant="soft" label="Glow" />
      <Button size="sm" animation="border-spin" variant="outline" label="Spin" />
      <Button size="sm" animation="sweep" label="Sweep" />
    </div>
    <Label>hover effects</Label>
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" hoverEffect="lift" variant="outline" label="Lift" />
      <Button size="sm" hoverEffect="glow" variant="outline" label="Glow" />
      <Button size="sm" hoverEffect="shine" label="Shine" />
    </div>
  </HeroCard>,
  <HeroCard key="split" name="SplitButton" w="w-80">
    <div className="flex flex-wrap items-center gap-2">
      <SplitButton icon="check" label="Approve" size="sm">
        <SplitButtonMenuItem icon="file">Approve with note</SplitButtonMenuItem>
        <SplitButtonMenuItem icon="copy">Duplicate</SplitButtonMenuItem>
        <SplitButtonMenuItem icon="trash-2">Reject</SplitButtonMenuItem>
      </SplitButton>
      <SplitButton label="Export" variant="outline" size="sm">
        <SplitButtonMenuItem icon="download">As PDF</SplitButtonMenuItem>
        <SplitButtonMenuItem icon="download">As CSV</SplitButtonMenuItem>
      </SplitButton>
    </div>
    <Label>soft / pill</Label>
    <div className="flex flex-wrap items-center gap-2">
      <SplitButton label="Publish" variant="soft" color="emerald" size="sm" shape="pill">
        <SplitButtonMenuItem>Schedule</SplitButtonMenuItem>
      </SplitButton>
      <SplitButton label="More" variant="ghost" size="sm" />
    </div>
  </HeroCard>,
  <HeroCard key="btngroup" name="ButtonGroup" w="w-80">
    <ButtonGroup>
      <Button size="sm" variant="outline" label="Day" />
      <Button size="sm" variant="outline" label="Week" />
      <Button size="sm" variant="outline" label="Month" />
    </ButtonGroup>
    <Label>pill + icons</Label>
    <ButtonGroup shape="pill">
      <Button size="sm" variant="soft" icon="arrow-left" iconOnly label="Back" />
      <Button size="sm" variant="soft" icon="home" iconOnly label="Home" />
      <Button size="sm" variant="soft" icon="arrow-right" iconOnly label="Forward" />
    </ButtonGroup>
  </HeroCard>,
  <HeroCard key="segment" name="SegmentButton" w="w-80">
    <SegmentDemo options={["Left", "Center", "Right"]} icons={["align-left", "align-center", "align-right"]} />
    <Label>text segments</Label>
    <SegmentDemo options={["List", "Board", "Table"]} />
    <Label>toggle formatting</Label>
    <SegmentDemo options={["Bold", "Italic", "Underline"]} icons={["bold", "italic", "underline"]} />
  </HeroCard>,
  <HeroCard key="btn-gradient" name="Button / gradient" w="w-72">
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="gradient" color="violet" gradientTo="pink" label="Violet" />
      <Button size="sm" variant="gradient" color="cyan" gradientTo="emerald" label="Aqua" />
      <Button size="sm" variant="gradient" color="amber" gradientTo="rose" icon="sparkles" label="Sunset" />
    </div>
  </HeroCard>,
];

const REEL_2: ReactNode[] = [
  <HeroCard key="badge-variants" name="Badge / variants" w="w-80">
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="solid" label="Solid" />
        <Badge variant="solid" color="emerald" label="Active" />
        <Badge variant="solid" color="rose" label="Failed" />
        <Badge variant="solid" color="amber" label="Pending" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="soft" label="Soft" />
        <Badge variant="soft" color="violet" label="Design" />
        <Badge variant="soft" color="cyan" label="Docs" />
        <Badge variant="soft" color="pink" label="New" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="outline" label="Outline" />
        <Badge variant="outline" color="teal" label="Stable" />
        <Badge variant="outline" color="orange" label="Beta" />
        <Badge variant="outline" color="blue" label="v2.4" />
      </div>
    </div>
  </HeroCard>,
  <HeroCard key="badge-sizes" name="Badge / sizes + icons" w="w-72">
    <div className="flex flex-wrap items-center gap-1.5">
      <Badge size="sm" label="Small" />
      <Badge size="md" label="Medium" />
      <Badge size="lg" label="Large" />
    </div>
    <Label>with icon</Label>
    <div className="flex flex-wrap gap-1.5">
      <Badge variant="soft" color="emerald" icon="check" label="Verified" />
      <Badge variant="soft" color="amber" icon="clock" label="Review" />
      <Badge variant="solid" color="rose" icon="zap" label="Hot" />
    </div>
  </HeroCard>,
  <HeroCard key="badge-dot" name="Badge / dot + animation" w="w-72">
    <div className="flex items-center gap-2">
      <Badge dot color="emerald" />
      <Badge dot color="amber" />
      <Badge dot color="rose" />
      <Badge dot color="accent" size="lg" />
    </div>
    <Label>animation</Label>
    <div className="flex flex-wrap gap-1.5">
      <Badge variant="soft" color="emerald" label="Live" animation="pulse" />
      <Badge variant="solid" label="Glow" animation="glow" />
      <Badge variant="outline" color="violet" label="Spin" animation="border-spin" />
      <Badge variant="soft" color="amber" label="Sweep" animation="sweep" />
    </div>
  </HeroCard>,
  <HeroCard key="avatar-sizes" name="Avatar / sizes">
    <div className="flex items-end gap-2">
      <Avatar size="xs" initials="LL" />
      <Avatar size="sm" initials="AK" color="violet" />
      <Avatar size="md" initials="MR" color="emerald" />
      <Avatar size="lg" initials="JS" color="rose" />
      <Avatar size="xl" initials="TN" color="amber" />
    </div>
    <Label>shape</Label>
    <div className="flex items-center gap-2">
      <Avatar shape="circle" initials="CI" color="cyan" />
      <Avatar shape="square" initials="SQ" color="pink" />
    </div>
  </HeroCard>,
  <HeroCard key="avatar-status" name="Avatar / status" w="w-72">
    <div className="flex items-center gap-3">
      <Avatar initials="ON" status="online" color="emerald" />
      <Avatar initials="BY" status="busy" color="rose" />
      <Avatar initials="AW" status="away" color="amber" />
      <Avatar initials="OF" status="offline" color="indigo" />
    </div>
    <Label>photo</Label>
    <div className="flex items-center gap-3">
      <Avatar size="lg" src={sampleImage(1, 96, 96)} alt="Sample" status="online" />
      <Avatar size="lg" src={sampleImage(2, 96, 96)} alt="Sample" shape="square" />
      <Avatar size="lg" animation="pulse" initials="NW" />
    </div>
  </HeroCard>,
  <HeroCard key="avatar-group" name="AvatarGroup">
    <AvatarGroup>
      <Avatar initials="AK" color="violet" />
      <Avatar initials="MR" color="emerald" />
      <Avatar initials="JS" color="rose" />
      <Avatar initials="+4" color="slate" />
    </AvatarGroup>
    <Label>photos</Label>
    <AvatarGroup>
      <Avatar size="sm" src={sampleImage(0, 64, 64)} alt="" />
      <Avatar size="sm" src={sampleImage(1, 64, 64)} alt="" />
      <Avatar size="sm" src={sampleImage(3, 64, 64)} alt="" />
    </AvatarGroup>
  </HeroCard>,
  <HeroCard key="icon" name="Icon" w="w-72">
    <div className="flex flex-wrap gap-3 text-fg">
      {["home", "search", "bell", "heart", "star", "settings", "mail", "camera"].map((n) => (
        <Icon key={n} name={n} size={20} />
      ))}
    </div>
    <Label>sizes + colors</Label>
    <div className="flex items-end gap-3">
      <Icon name="zap" size={14} className="text-fg-muted" />
      <Icon name="zap" size={20} className="text-accent-500" />
      <Icon name="zap" size={28} className="text-emerald-500" />
      <Icon name="zap" size={36} className="text-rose-500" />
    </div>
  </HeroCard>,
  <HeroCard key="spinner-variants" name="Spinner / variants">
    <div className="flex items-center gap-5">
      <Spinner variant="circle" />
      <Spinner variant="ring" />
      <Spinner variant="dots" />
      <Spinner variant="bars" />
      <Spinner variant="pulse" />
    </div>
    <Label>sizes</Label>
    <div className="flex items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  </HeroCard>,
  <HeroCard key="spinner-colors" name="Spinner / colors">
    <div className="flex items-center gap-4">
      <Spinner variant="ring" color="emerald" />
      <Spinner variant="dots" color="rose" />
      <Spinner variant="bars" color="violet" />
      <Spinner variant="pulse" color="amber" />
      <Spinner variant="circle" color="cyan" />
    </div>
    <Label>in context</Label>
    <div className="flex items-center gap-2 text-xs text-fg-muted">
      <Spinner size="sm" />
      Syncing workspace...
    </div>
  </HeroCard>,
];

const REEL_3: ReactNode[] = [
  <HeroCard key="skeleton-text" name="Skeleton / text" w="w-72">
    <Label>pulse</Label>
    <Skeleton variant="text" animation="pulse" lines={3} />
    <Label>shimmer</Label>
    <Skeleton variant="text" animation="shimmer" lines={2} />
    <Label>wave</Label>
    <Skeleton variant="text" animation="wave" lines={2} />
  </HeroCard>,
  <HeroCard key="skeleton-shapes" name="Skeleton / shapes" w="w-72">
    <div className="flex items-center gap-3">
      <Skeleton variant="circle" animation="shimmer" size={44} />
      <div className="flex-1">
        <Skeleton variant="text" animation="shimmer" lines={2} />
      </div>
    </div>
    <Label>rect</Label>
    <Skeleton variant="rect" animation="pulse" height={56} width={220} />
  </HeroCard>,
  <HeroCard key="skeleton-card" name="Skeleton / card" w="w-72">
    <div className="space-y-3">
      <Skeleton variant="rect" animation="wave" height={64} width={240} />
      <Skeleton variant="text" animation="wave" lines={3} />
      <Skeleton variant="rect" animation="none" height={28} width={96} />
    </div>
  </HeroCard>,
  <HeroCard key="divider-h" name="Divider / horizontal" w="w-72">
    <Divider color="slate" />
    <div className="my-3">
      <Divider label="OR" color="slate" />
    </div>
    <div className="my-3">
      <Divider color="violet" label="Violet" />
    </div>
    <Divider color="emerald">
      <Icon name="star" size={14} />
    </Divider>
  </HeroCard>,
  <HeroCard key="divider-v" name="Divider / vertical + resize" w="w-72">
    <div className="flex h-8 items-center gap-3 text-xs text-fg-muted">
      <span>Docs</span>
      <Divider orientation="vertical" color="slate" />
      <span>Blog</span>
      <Divider orientation="vertical" color="accent" />
      <span>Pricing</span>
    </div>
    <Label>resizable</Label>
    <Divider resizable color="slate" />
  </HeroCard>,
  <HeroCard key="card-variants" name="Card / variants" w="w-96">
    <div className="grid grid-cols-2 gap-2">
      <Card variant="outline" padding="sm"><p className="text-xs font-medium text-fg">Outline</p><p className="text-[11px] text-fg-muted">Border only</p></Card>
      <Card variant="elevated" padding="sm"><p className="text-xs font-medium text-fg">Elevated</p><p className="text-[11px] text-fg-muted">Soft shadow</p></Card>
      <Card variant="soft" padding="sm"><p className="text-xs font-medium text-fg">Soft</p><p className="text-[11px] text-fg-muted">Muted fill</p></Card>
      <Card variant="ghost" padding="sm"><p className="text-xs font-medium text-fg">Ghost</p><p className="text-[11px] text-fg-muted">No chrome</p></Card>
    </div>
  </HeroCard>,
  <HeroCard key="card-parts" name="Card / title + footer" w="w-80">
    <Card
      variant="outline"
      padding="sm"
      hoverable
      title="Team plan"
      footer={<Button size="xs" label="Upgrade" icon="zap" />}
    >
      <p className="text-xs text-fg-muted">Unlimited projects and 12 seats.</p>
    </Card>
  </HeroCard>,
  <HeroCard key="card-padding" name="Card / padding" w="w-80">
    <div className="flex items-start gap-2">
      <Card variant="soft" padding="none"><div className="px-2 py-1 text-[11px] text-fg-muted">none</div></Card>
      <Card variant="soft" padding="sm"><span className="text-[11px] text-fg-muted">sm</span></Card>
      <Card variant="soft" padding="md"><span className="text-[11px] text-fg-muted">md</span></Card>
      <Card variant="soft" padding="lg"><span className="text-[11px] text-fg-muted">lg</span></Card>
    </div>
    <Label>animation</Label>
    <Card variant="outline" padding="sm" animation="glow"><span className="text-xs text-fg">Glowing card</span></Card>
  </HeroCard>,
];

const REEL_4: ReactNode[] = [
  <HeroCard key="container" name="Container / sizes" w="w-80">
    <div className="space-y-1.5">
      <Container size="sm" padded={false}><Box>sm</Box></Container>
      <Container size="md" padded={false}><Box>md</Box></Container>
      <Container size="lg" padded={false}><Box>lg</Box></Container>
      <Container size="full" padded={false}><Box>full</Box></Container>
    </div>
  </HeroCard>,
  <HeroCard key="section" name="Section" w="w-80">
    <Section title="Features" subtitle="Everything you need to ship." spacing="sm" className="rounded-lg bg-surface-muted px-3">
      <div className="flex gap-1.5">
        <Badge label="Fast" />
        <Badge label="Themed" color="violet" />
        <Badge label="Typed" color="emerald" />
      </div>
    </Section>
  </HeroCard>,
  <HeroCard key="grid-4" name="Grid / 4 cols" w="w-80">
    <Grid cols={4} gap="sm">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Cell key={n} n={n} />)}
    </Grid>
  </HeroCard>,
  <HeroCard key="grid-3" name="Grid / 3 + 2 cols" w="w-80">
    <Grid cols={3} gap="md">
      {[1, 2, 3].map((n) => <Cell key={n} n={n} />)}
    </Grid>
    <Label>2 cols, gap lg</Label>
    <Grid cols={2} gap="lg">
      {[1, 2].map((n) => <Cell key={n} n={n} />)}
    </Grid>
  </HeroCard>,
  <HeroCard key="list-bordered" name="List / bordered" w="w-72">
    <List variant="bordered">
      <ListItem icon="check">Install the package</ListItem>
      <ListItem icon="palette">Pick an accent</ListItem>
      <ListItem icon="zap">Ship it</ListItem>
    </List>
  </HeroCard>,
  <HeroCard key="list-divided" name="List / divided + plain" w="w-72">
    <List variant="divided">
      <ListItem icon="mail">Inbox</ListItem>
      <ListItem icon="star">Starred</ListItem>
    </List>
    <Label>plain</Label>
    <List variant="plain">
      <ListItem icon="home">Home</ListItem>
      <ListItem icon="settings">Settings</ListItem>
    </List>
  </HeroCard>,
  <HeroCard key="list-ordered" name="List / ordered" w="w-72">
    <List ordered variant="divided" className="list-decimal pl-5 text-sm">
      <ListItem>Create account</ListItem>
      <ListItem>Add a project</ListItem>
      <ListItem>Invite your team</ListItem>
    </List>
  </HeroCard>,
  <HeroCard key="accordion" name="Accordion" w="w-80">
    <Accordion>
      <AccordionItem title="What is lojee-ui?" defaultOpen>
        <p className="text-xs text-fg-muted">A themeable React and Web Components library.</p>
      </AccordionItem>
      <AccordionItem title="Is it accessible?">
        <p className="text-xs text-fg-muted">Keyboard and screen-reader friendly.</p>
      </AccordionItem>
      <AccordionItem title="Can I theme it?">
        <p className="text-xs text-fg-muted">Light, dark and 12 accents.</p>
      </AccordionItem>
      <AccordionItem title="Disabled item" disabled>
        <p className="text-xs text-fg-muted">Not reachable.</p>
      </AccordionItem>
    </Accordion>
  </HeroCard>,
];

const REEL_5: ReactNode[] = [
  <HeroCard key="accordion-exclusive" name="Accordion / exclusive" w="w-80">
    <Accordion>
      <AccordionItem name="faq" title="Billing" defaultOpen>
        <p className="text-xs text-fg-muted">Monthly or yearly.</p>
      </AccordionItem>
      <AccordionItem name="faq" title="Security">
        <p className="text-xs text-fg-muted">SSO and audit logs.</p>
      </AccordionItem>
      <AccordionItem name="faq" title="Support">
        <p className="text-xs text-fg-muted">Replies within a day.</p>
      </AccordionItem>
    </Accordion>
  </HeroCard>,
  <HeroCard key="carousel-images" name="Carousel / images" w="w-80">
    <CarouselDemo seeds={[0, 1, 2]} />
  </HeroCard>,
  <HeroCard key="carousel-auto" name="Carousel / autoplay + dots" w="w-80">
    <CarouselDemo autoPlay seeds={[3, 2, 1]} />
  </HeroCard>,
  <HeroCard key="carousel-text" name="Carousel / dots only" w="w-72">
    <TextSlides />
  </HeroCard>,
  <HeroCard key="image-ratios" name="Image / ratios" w="w-80">
    <div className="grid grid-cols-3 items-end gap-2">
      <Image src={sampleImage(0)} alt="Sample 1:1" ratio="1/1" rounded="md" />
      <Image src={sampleImage(1)} alt="Sample 4:3" ratio="4/3" rounded="md" />
      <Image src={sampleImage(2)} alt="Sample 16:9" ratio="16/9" rounded="md" />
    </div>
    <Label>caption</Label>
    <Image src={sampleImage(3)} alt="Sample" ratio="21/9" rounded="lg" caption="Sunrise, 21:9" />
  </HeroCard>,
  <HeroCard key="image-radius" name="Image / radius + fit" w="w-80">
    <div className="flex items-center gap-2">
      <Image src={sampleImage(1)} alt="Square" ratio="1/1" rounded="none" width={48} />
      <Image src={sampleImage(2)} alt="Rounded" ratio="1/1" rounded="xl" width={48} />
      <Image src={sampleImage(3)} alt="Full" ratio="1/1" rounded="full" width={48} borderless />
      <Image src={sampleImage(0)} alt="Contain" ratio="1/1" fit="contain" rounded="md" width={48} />
    </div>
    <Label>fallback</Label>
    <Image src="" ratio="16/9" height={56} rounded="md" fallback={<span className="text-[11px] text-fg-subtle">No preview</span>} />
  </HeroCard>,
  <HeroCard key="code" name="CodeSnippet" w="w-96">
    <CodeSnippet code={CODE} language="tsx" title="Save.tsx" lineNumbers />
  </HeroCard>,
  <HeroCard key="code-plain" name="CodeSnippet / shell" w="w-80">
    <CodeSnippet code="npm install lojee-ui" language="bash" />
    <div className="mt-2">
      <CodeSnippet code={`<l-button label="Save"></l-button>`} language="html" copyable={false} />
    </div>
  </HeroCard>,
];

/** Reels of live basic-component cards for the landing hero. */
export const BASIC_REELS: ReactNode[][] = [REEL_1, REEL_2, REEL_3, REEL_4, REEL_5];
