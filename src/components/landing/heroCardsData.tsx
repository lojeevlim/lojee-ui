/* eslint-disable react-refresh/only-export-components -- exports data (reels), not a component; helper components are file-private. */
import { useState, type ReactNode } from "react";
import { HeroCard } from "./HeroCard";
import { AccountSettings } from "../ui/AccountSettings/AccountSettings";
import { ActivityFeed, type ActivityItem } from "../ui/ActivityFeed/ActivityFeed";
import { Calendar, type CalendarEvent } from "../ui/Calendar/Calendar";
import { Chart, type ChartDataPoint } from "../ui/Chart/Chart";
import { DetailsList, type DetailsListItem } from "../ui/DetailsList/DetailsList";
import { FlowDiagram, type FlowEdge, type FlowNode } from "../ui/FlowDiagram/FlowDiagram";
import { GridView, type GridViewAction, type GridViewItem } from "../ui/GridView/GridView";
import { LoginForm } from "../ui/LoginForm/LoginForm";
import { ProfileCard } from "../ui/ProfileCard/ProfileCard";
import { ProfileSettings } from "../ui/ProfileSettings/ProfileSettings";
import { SignupForm } from "../ui/SignupForm/SignupForm";
import { Stat } from "../ui/Stat/Stat";
import { Table, type TableAction, type TableColumn } from "../ui/Table/Table";
import { Timeline, type TimelineItem } from "../ui/Timeline/Timeline";
import { UserMenu } from "../ui/UserMenu/UserMenu";

/* ------------------------------------------------------------------ data */

const WEEK: ChartDataPoint[] = [
  { label: "Mon", value: 32 },
  { label: "Tue", value: 54 },
  { label: "Wed", value: 41 },
  { label: "Thu", value: 72 },
  { label: "Fri", value: 63 },
];

const SPLIT: ChartDataPoint[] = [
  { label: "React", value: 48, color: "accent" },
  { label: "Vue", value: 27, color: "emerald" },
  { label: "Angular", value: 15, color: "amber" },
  { label: "JS", value: 10, color: "rose" },
];

interface Customer {
  id: string;
  user: { name: string; handle: string };
  payment: { brand: string; last4: string };
  status: string;
  usage: number;
  plan: string[];
}

const CUSTOMERS: Customer[] = [
  { id: "alice", user: { name: "Alice Smith", handle: "@alicesmith" }, payment: { brand: "visa", last4: "18" }, status: "Active", usage: 72, plan: ["Pro"] },
  { id: "bob", user: { name: "Bob Johnson", handle: "@bobjohnson" }, payment: { brand: "mastercard", last4: "99" }, status: "Pending", usage: 31, plan: ["Team"] },
  { id: "clara", user: { name: "Clara Garcia", handle: "@claragarcia" }, payment: { brand: "mastercard", last4: "14" }, status: "Overdue", usage: 85, plan: ["Pro"] },
];

const COLS_USER: TableColumn<Customer>[] = [
  { key: "user", header: "Customer", type: "user" },
  { key: "status", header: "Status", type: "status" },
  { key: "usage", header: "Usage", type: "progress" },
];

const COLS_PAY: TableColumn<Customer>[] = [
  { key: "user", header: "Customer", type: "user" },
  { key: "payment", header: "Payment", type: "payment" },
  { key: "plan", header: "Plan", type: "badges" },
];

interface Invoice {
  id: string;
  title: { title: string; subtitle: string };
  amount: { value: number; currency: string };
  due: string;
  rating: number;
  team: { name: string }[];
  link: { href: string; label: string };
}

const INVOICES: Invoice[] = [
  { id: "i1", title: { title: "Design system", subtitle: "INV-1042" }, amount: { value: 4200, currency: "USD" }, due: "2026-10-12", rating: 4.5, team: [{ name: "Anna Lee" }, { name: "Ben Ortiz" }], link: { href: "#", label: "Open" } },
  { id: "i2", title: { title: "Mobile app", subtitle: "INV-1043" }, amount: { value: 9800, currency: "USD" }, due: "2026-10-28", rating: 4, team: [{ name: "Cy Park" }, { name: "Dee Wu" }, { name: "Eli Roy" }], link: { href: "#", label: "Open" } },
  { id: "i3", title: { title: "Brand refresh", subtitle: "INV-1044" }, amount: { value: 2650, currency: "USD" }, due: "2026-11-03", rating: 3, team: [{ name: "Fay Kim" }], link: { href: "#", label: "Open" } },
];

const COLS_INVOICE: TableColumn<Invoice>[] = [
  { key: "title", header: "Project", type: "image" },
  { key: "amount", header: "Amount", type: "currency", align: "right" },
  { key: "due", header: "Due", type: "date" },
];

const COLS_TEAM: TableColumn<Invoice>[] = [
  { key: "title", header: "Project", type: "image" },
  { key: "team", header: "Team", type: "avatars" },
  { key: "rating", header: "Rating", type: "rating" },
  { key: "link", header: "", type: "link" },
];

const ROW_ACTIONS: TableAction[] = [
  { label: "Edit", icon: "pencil", value: "edit" },
  { label: "Duplicate", icon: "copy", value: "duplicate" },
  { label: "Delete", icon: "trash-2", value: "delete", color: "danger" },
];

const DOCS: GridViewItem[] = [
  { id: 1, title: "Bathroom Remodel", tag: "Accepted", stats: [{ label: "Balance", value: "$12,099" }, { label: "Value", value: "$18,099" }], fields: [{ label: "Document", value: "Order #1008" }, { label: "Due", value: "09/08/2026" }] },
  { id: 2, title: "Kitchen Rework", tag: "Pending", stats: [{ label: "Balance", value: "$9,450" }, { label: "Value", value: "$21,300" }], fields: [{ label: "Document", value: "Order #1009" }, { label: "Due", value: "09/10/2026" }] },
  { id: 3, title: "Bedroom Remodel", tag: "Overdue", stats: [{ label: "Balance", value: "$2,750" }, { label: "Value", value: "$7,800" }], fields: [{ label: "Document", value: "Invoice #1010" }, { label: "Due", value: "08/12/2026" }] },
  { id: 4, title: "Garden Deck", tag: "Accepted", stats: [{ label: "Balance", value: "$0" }, { label: "Value", value: "$32,000" }], fields: [{ label: "Document", value: "Order #1012" }, { label: "Due", value: "09/15/2026" }] },
];

const DOC_ACTIONS: GridViewAction[] = [
  { label: "Open", value: "open", icon: "eye" },
  { label: "Duplicate", value: "duplicate", icon: "copy" },
  { label: "Delete", value: "delete", icon: "trash-2", color: "danger" },
];

const RELEASE: TimelineItem[] = [
  { title: "Design approved", description: "Tokens and specs signed off.", timestamp: "Mon", icon: "circle-check", color: "emerald" },
  { title: "Build started", description: "CI picked up the branch.", timestamp: "Tue", icon: "zap" },
  { title: "Released", description: "v2.4.0 is live.", timestamp: "Fri", icon: "tag", color: "violet" },
];

const STEPS: TimelineItem[] = [
  { title: "Order placed", timestamp: "9:02", color: "accent" },
  { title: "Packed", timestamp: "11:30", color: "amber" },
  { title: "Shipped", timestamp: "14:15", color: "violet" },
  { title: "Delivered", timestamp: "Fri", color: "emerald" },
];

const ACTIVITY: ActivityItem[] = [
  { actor: "Alex Chen", avatarInitials: "AC", action: "commented on", target: "Q3 Report", timestamp: "2m ago", icon: "pencil" },
  { actor: "Mia Torres", avatarInitials: "MT", action: "closed", target: "Issue #482", timestamp: "1h ago", icon: "circle-check", color: "emerald" },
  { actor: "Sam Patel", avatarInitials: "SP", action: "joined the team", timestamp: "3h ago", icon: "user", color: "violet" },
];

const EVENTS: CalendarEvent[] = [
  { date: "2026-10-05", label: "Team sync", color: "indigo" },
  { date: "2026-10-12", label: "Deadline", color: "rose" },
  { date: "2026-10-12", label: "Release", color: "emerald" },
  { date: "2026-10-20", label: "Planning", color: "amber" },
];

const DOC_ITEMS: DetailsListItem[] = [
  { title: "@action", description: "Called when a row action is clicked.", open: true },
  { title: "@selectionchange", description: "Called with the selected keys and rows." },
  { title: "@sortchange", description: "Called when a sortable header is clicked." },
  { title: "@viewchange", description: "Called with the new view: table or grid." },
];

const PIPE_NODES: FlowNode[] = [
  { id: "commit", label: "Commit", icon: "git-branch" },
  { id: "build", label: "Build", icon: "box" },
  { id: "test", label: "Test", icon: "square-check" },
  { id: "deploy", label: "Deploy", icon: "zap", tone: "accent" },
];
const PIPE_EDGES: FlowEdge[] = [
  { from: "commit", to: "build" },
  { from: "build", to: "test" },
  { from: "test", to: "deploy" },
];

const FW_NODES: FlowNode[] = [
  { id: "source", label: "Component", icon: "box" },
  { id: "r2wc", label: "r2wc", shape: "pill", tone: "accent" },
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
];
const FW_EDGES: FlowEdge[] = [
  { from: "source", to: "r2wc" },
  { from: "r2wc", to: "react" },
  { from: "r2wc", to: "vue" },
];

const MENU_ITEMS = [
  { label: "Profile", icon: "user" },
  { label: "Settings", icon: "settings" },
  { label: "Billing", icon: "tag" },
  { label: "Log out", icon: "arrow-right", danger: true },
];

/* ------------------------------------------------------- stateful wrappers */

function CalendarCard() {
  const [picked, setPicked] = useState("2026-10-08");
  return <Calendar month="2026-10" onMonthChange={() => undefined} selected={picked} onSelect={setPicked} events={EVENTS} />;
}

function RangeCalendarCard() {
  return <Calendar selectionMode="range" defaultRange={{ start: "2026-10-06", end: "2026-10-10" }} events={EVENTS} color="violet" />;
}

function NotificationsCard() {
  const [prefs, setPrefs] = useState([
    { key: "product", label: "Product updates", enabled: true },
    { key: "security", label: "Security alerts", enabled: true },
    { key: "digest", label: "Weekly digest", enabled: false },
  ]);
  return (
    <div className="max-h-72 overflow-hidden">
      <AccountSettings email="jordan@lojee.io" notifications={prefs} onNotificationsChange={setPrefs} />
    </div>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return <div className="max-h-72 overflow-hidden">{children}</div>;
}

/* ------------------------------------------------------------------ reels */

const REEL_TABLES: ReactNode[] = [
  <HeroCard key="table-lined" name="Table · lined" w="w-[26rem]">
    <Table<Customer> variant="lined" size="sm" columns={COLS_USER} data={CUSTOMERS} rowKey="id" />
  </HeroCard>,
  <HeroCard key="table-selectable" name="Table · selectable" w="w-[28rem]">
    <Table<Customer> size="sm" columns={COLS_PAY} data={CUSTOMERS} rowKey="id" selectable />
  </HeroCard>,
  <HeroCard key="stat-trend" name="Stat · trends">
    <div className="space-y-3">
      <Stat label="Revenue" value={48200} change="12.4%" trend="up" icon="zap" />
      <Stat label="Churn" value="2.1%" change="0.4%" trend="down" color="rose" />
    </div>
  </HeroCard>,
  <HeroCard key="chart-values" name="Chart · values" w="w-72">
    <Chart countUp={false} type="bar" variant="values" data={WEEK} height={110} />
  </HeroCard>,
  <HeroCard key="table-card" name="Table · card · menu actions" w="w-[26rem]">
    <Table<Customer> variant="card" size="sm" columns={COLS_USER} data={CUSTOMERS.slice(0, 3)} rowKey="id" actions={ROW_ACTIONS} actionsVariant="menu" />
  </HeroCard>,
  <HeroCard key="timeline-v" name="Timeline · vertical" w="w-72">
    <Timeline items={RELEASE} />
  </HeroCard>,
  <HeroCard key="table-money" name="Table · currency & date" w="w-[26rem]">
    <Table<Invoice> variant="lined" size="sm" columns={COLS_INVOICE} data={INVOICES} rowKey="id" />
  </HeroCard>,
  <HeroCard key="chart-donut" name="Chart · donut" w="w-72">
    <Chart countUp={false} type="donut" data={SPLIT} height={110} />
  </HeroCard>,
  <HeroCard key="table-grid" name="Table · view grid" w="w-[28rem]">
    <Frame>
      <Table<Customer> size="sm" columns={COLS_USER} data={CUSTOMERS} rowKey="id" view="grid" viewToggle />
    </Frame>
  </HeroCard>,
];

const REEL_COLLECTIONS: ReactNode[] = [
  <HeroCard key="grid-grid" name="GridView · grid" w="w-[28rem]">
    <Frame>
      <GridView items={DOCS.slice(0, 2)} minItemWidth={180} searchable={false} />
    </Frame>
  </HeroCard>,
  <HeroCard key="stat-colors" name="Stat · colors">
    <div className="space-y-3">
      <Stat label="Active users" value={3820} change="8.1%" trend="up" color="emerald" icon="user" />
      <Stat label="Open tickets" value={46} change="3" trend="neutral" color="amber" icon="bell" />
    </div>
  </HeroCard>,
  <HeroCard key="grid-list" name="GridView · list" w="w-[28rem]">
    <Frame>
      <GridView items={DOCS.slice(0, 3)} view="list" searchable={false} viewToggle={false} />
    </Frame>
  </HeroCard>,
  <HeroCard key="chart-line" name="Chart · line" w="w-72">
    <Chart countUp={false} type="line" data={WEEK} height={110} color="violet" />
  </HeroCard>,
  <HeroCard key="grid-drag" name="GridView · draggable" w="w-[28rem]">
    <Frame>
      <GridView items={DOCS.slice(0, 3)} variant="draggable" minItemWidth={150} searchable={false} viewToggle={false} />
    </Frame>
  </HeroCard>,
  <HeroCard key="timeline-h" name="Timeline · horizontal" w="w-[28rem]">
    <Timeline items={STEPS} orientation="horizontal" />
  </HeroCard>,
  <HeroCard key="grid-menu" name="GridView · menu & create" w="w-[28rem]">
    <Frame>
      <GridView items={DOCS.slice(0, 2)} actions={DOC_ACTIONS} createLabel="New document" minItemWidth={180} searchable={false} viewToggle={false} />
    </Frame>
  </HeroCard>,
  <HeroCard key="activity" name="ActivityFeed" w="w-80">
    <ActivityFeed items={ACTIVITY} />
  </HeroCard>,
  <HeroCard key="activity-compact" name="ActivityFeed · compact" w="w-80">
    <ActivityFeed items={ACTIVITY} compact />
  </HeroCard>,
  <HeroCard key="table-team" name="Table · avatars, rating & link" w="w-[30rem]">
    <Table<Invoice> variant="card" size="sm" columns={COLS_TEAM} data={INVOICES} rowKey="id" />
  </HeroCard>,
];

const REEL_CALENDAR: ReactNode[] = [
  <HeroCard key="calendar" name="Calendar · inline" w="w-80">
    <CalendarCard />
  </HeroCard>,
  <HeroCard key="details" name="DetailsList" w="w-80">
    <DetailsList items={DOC_ITEMS} />
  </HeroCard>,
  <HeroCard key="flow-pipe" name="FlowDiagram · pipeline" w="w-[30rem]">
    <FlowDiagram nodes={PIPE_NODES} edges={PIPE_EDGES} direction="horizontal" nodeWidth={96} nodeHeight={44} gap={28} variant="outline" packets arrows />
  </HeroCard>,
  <HeroCard key="stat-plain" name="Stat">
    <Stat label="Weekly installs" value={12400} change="18.2%" trend="up" color="violet" icon="zap" />
  </HeroCard>,
  <HeroCard key="calendar-range" name="Calendar · range" w="w-80">
    <RangeCalendarCard />
  </HeroCard>,
  <HeroCard key="profile" name="ProfileCard" w="w-80">
    <ProfileCard
      name="Priya Nair"
      role="Product Designer"
      bio="Building accessible, joyful interfaces."
      avatarInitials="PN"
      stats={[{ label: "Posts", value: 128 }, { label: "Followers", value: "4.2k" }, { label: "Following", value: 310 }]}
    />
  </HeroCard>,
  <HeroCard key="flow-fw" name="FlowDiagram · glow" w="w-[30rem]">
    <FlowDiagram nodes={FW_NODES} edges={FW_EDGES} direction="horizontal" nodeWidth={92} nodeHeight={40} gap={26} spacing={14} variant="glow" packets />
  </HeroCard>,
  <HeroCard key="usermenu" name="UserMenu" w="w-72">
    <div className="min-h-16">
      <UserMenu name="Jordan Diaz" email="jordan@lojee.io" avatarInitials="JD" items={MENU_ITEMS} />
    </div>
  </HeroCard>,
  <HeroCard key="timeline-v2" name="Timeline · icons" w="w-72">
    <Timeline items={RELEASE.slice(0, 2)} />
  </HeroCard>,
];

const REEL_FORMS: ReactNode[] = [
  <HeroCard key="login" name="LoginForm" w="w-[26rem]">
    <Frame>
      <LoginForm title="Welcome back" description="Sign in to continue" />
    </Frame>
  </HeroCard>,
  <HeroCard key="stat-icon" name="Stat · icon">
    <Stat label="Deploys today" value={27} change="5" trend="up" color="cyan" icon="box" />
  </HeroCard>,
  <HeroCard key="signup" name="SignupForm" w="w-[26rem]">
    <Frame>
      <SignupForm title="Create account" description="Start your free trial" />
    </Frame>
  </HeroCard>,
  <HeroCard key="profile-settings" name="ProfileSettings" w="w-[26rem]">
    <Frame>
      <ProfileSettings avatarInitials="LL" defaultValues={{ name: "Lojee Lim", username: "lojee", bio: "Design engineer." }} />
    </Frame>
  </HeroCard>,
  <HeroCard key="chart-bar" name="Chart · bar" w="w-72">
    <Chart countUp={false} type="bar" data={WEEK} height={110} color="emerald" />
  </HeroCard>,
  <HeroCard key="account" name="AccountSettings" w="w-[26rem]">
    <NotificationsCard />
  </HeroCard>,
  <HeroCard key="profile-rose" name="ProfileCard · color" w="w-80">
    <ProfileCard name="Sam Patel" role="Engineer" avatarInitials="SP" color="rose" stats={[{ label: "Commits", value: 912 }, { label: "Reviews", value: 204 }]} />
  </HeroCard>,
  <HeroCard key="table-small" name="Table · default" w="w-[26rem]">
    <Table<Customer> size="sm" columns={COLS_PAY} data={CUSTOMERS.slice(0, 2)} rowKey="id" />
  </HeroCard>,
];

/** Reels of live components for the landing hero (each reel glides on its own row). */
export const DATA_REELS: ReactNode[][] = [REEL_TABLES, REEL_COLLECTIONS, REEL_CALENDAR, REEL_FORMS];
