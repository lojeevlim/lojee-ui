/* eslint-disable react-refresh/only-export-components -- exports a data array of cards; the local helper components are not exported */
import { useEffect, useState, type ReactNode } from "react";
import { HeroCard } from "./HeroCard";
import { Alert } from "../ui/Alert/Alert";
import { Avatar } from "../ui/Avatar/Avatar";
import { BottomNavigation } from "../ui/BottomNavigation/BottomNavigation";
import { BreadcrumbItem } from "../ui/Breadcrumbs/BreadcrumbItem";
import { Breadcrumbs } from "../ui/Breadcrumbs/Breadcrumbs";
import { Button } from "../ui/Buttons/Button";
import { DropdownMenu } from "../ui/DropdownMenu/DropdownMenu";
import { DropdownMenuItem } from "../ui/DropdownMenu/DropdownMenuItem";
import { EmptyState } from "../ui/EmptyState/EmptyState";
import { ErrorState } from "../ui/ErrorState/ErrorState";
import { Footer } from "../ui/Footer/Footer";
import { Header } from "../ui/Header/Header";
import { Icon } from "../ui/Icons/Icon";
import { LoadingState } from "../ui/LoadingState/LoadingState";
import { Navbar } from "../ui/Navbar/Navbar";
import { NavigationMenu } from "../ui/NavigationMenu/NavigationMenu";
import { Notification } from "../ui/Notification/Notification";
import { Pagination } from "../ui/Pagination/Pagination";
import { Popover } from "../ui/Popover/Popover";
import { ProgressBar } from "../ui/ProgressBar/ProgressBar";
import { Skeleton } from "../ui/Skeleton/Skeleton";
import { Stepper } from "../ui/Stepper/Stepper";
import { SuccessState } from "../ui/SuccessState/SuccessState";
import { Tabs } from "../ui/Tabs/Tabs";
import { ThemeSwitcher } from "../ui/ThemeSwitcher/ThemeSwitcher";
import { Tooltip } from "../ui/Tooltip/Tooltip";
import { TopBar } from "../ui/TopBar/TopBar";

const FRAME = "overflow-hidden rounded-lg border border-border";
const TAB_NOTE = "pt-2 text-xs text-fg-muted";

/** Static stand-in for Toast (the real one is fixed-position), using the same classes and icon. */
function ToastPreview({ variant, title, children }: { variant: "success" | "warning" | "error" | "info"; title: string; children: ReactNode }) {
  const tone = {
    info: ["border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200", "text-blue-500", "info"],
    success: ["border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200", "text-emerald-500", "circle-check"],
    warning: ["border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200", "text-amber-500", "triangle-alert"],
    error: ["border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200", "text-rose-500", "circle-x"],
  }[variant];
  return (
    <div role="status" className={`flex gap-3 rounded-lg border p-3 shadow-lg ${tone[0]}`}>
      <Icon name={tone[2]} size={18} className={`mt-0.5 shrink-0 ${tone[1]}`} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs">{children}</p>
      </div>
      <Icon name="x" size={14} className="shrink-0 opacity-60" />
    </div>
  );
}

function Deploying() {
  const [p, setP] = useState(34);
  useEffect(() => {
    const id = setInterval(() => setP((v) => (v >= 100 ? 10 : Math.min(100, v + 6))), 900);
    return () => clearInterval(id);
  }, []);
  return <ProgressBar value={p} showLabel />;
}

function PagerStack() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  return (
    <div className="space-y-3">
      <Pagination page={a} totalPages={8} siblingCount={0} onPageChange={setA} />
      <Pagination page={b} totalPages={5} siblingCount={0} color="violet" onPageChange={setB} />
    </div>
  );
}

function LinkColumn({ heading, links }: { heading: string; links: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold">{heading}</p>
      <ul className="mt-1 space-y-0.5 text-[11px] opacity-70">
        {links.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

const NAV_ITEMS = [
  { label: "Home", href: "#", active: true },
  { label: "Products", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
];

const STEPS = [{ label: "Cart" }, { label: "Shipping" }, { label: "Payment" }, { label: "Confirm" }];

const BOTTOM_ITEMS = [
  { icon: "home", label: "Home", active: true },
  { icon: "search", label: "Search" },
  { icon: "bell", label: "Alerts", badge: "3" },
  { icon: "user", label: "Profile" },
];

const crumbs = (variant: "text" | "soft" | "solid", color?: "violet") => (
  <Breadcrumbs variant={variant} color={color}>
    <BreadcrumbItem href="#">Home</BreadcrumbItem>
    <BreadcrumbItem href="#">Docs</BreadcrumbItem>
    <BreadcrumbItem>Install</BreadcrumbItem>
  </Breadcrumbs>
);

const tabs = (color?: "emerald" | "violet") => (
  <Tabs
    color={color}
    tabs={[
      { label: "Install", content: <p className={TAB_NOTE}>npm install lojee-ui</p> },
      { label: "Style", content: <p className={TAB_NOTE}>Light, dark, 40+ accents.</p> },
      { label: "Ship", content: <p className={TAB_NOTE}>Web Components too.</p> },
    ]}
  />
);

const REEL_1: ReactNode[] = [
  <HeroCard key="alert" name="Alert" w="w-80">
    <div className="space-y-2">
      <Alert variant="success" closable={false}>Build #248 is live.</Alert>
      <Alert variant="info" closable={false}>A new version is available.</Alert>
      <Alert variant="warning" closable={false}>Storage is 90% full.</Alert>
      <Alert variant="error" closable={false}>Payment failed.</Alert>
      <Alert variant="accent" closable={false}>Tip: press K for commands.</Alert>
    </div>
  </HeroCard>,
  <HeroCard key="navbar" name="Navbar" w="w-[34rem]">
    {/* Fixed-width wrapper so Fit scales the navbars down instead of squashing the links on top of each other; no fixed frame height, so the bar (h-16) isn't clipped. */}
    <div className="w-[34rem] space-y-2">
      <div className={FRAME}><Navbar brand="Lojee" items={NAV_ITEMS} actions={<Avatar initials="JD" size="sm" />} /></div>
      <div className={FRAME}><Navbar variant="dark" brand="Lojee" items={NAV_ITEMS} /></div>
    </div>
  </HeroCard>,
  <HeroCard key="progress" name="ProgressBar" w="w-72">
    <div className="space-y-3">
      <Deploying />
      <ProgressBar value={72} size="lg" striped />
      <ProgressBar value={45} size="sm" />
      <ProgressBar indeterminate />
    </div>
  </HeroCard>,
  <HeroCard key="empty" name="EmptyState">
    <EmptyState icon="inbox" title="No messages" action={<Button size="sm" variant="outline" label="Compose" />}>Your inbox is clear.</EmptyState>
  </HeroCard>,
  <HeroCard key="tabs" name="Tabs" w="w-72">
    <div className="space-y-3">{tabs()}{tabs("emerald")}</div>
  </HeroCard>,
  <HeroCard key="toast" name="Toast" w="w-80">
    <div className="space-y-2">
      <ToastPreview variant="success" title="Saved">Changes were published.</ToastPreview>
      <ToastPreview variant="error" title="Upload failed">Check your connection.</ToastPreview>
    </div>
  </HeroCard>,
  <HeroCard key="skeleton" name="Skeleton" w="w-72">
    <div className="flex gap-3">
      <Skeleton variant="circle" size={40} animation="shimmer" />
      <div className="flex-1 space-y-3">
        <Skeleton variant="text" lines={2} />
        <Skeleton variant="rect" height={48} animation="pulse" />
      </div>
    </div>
  </HeroCard>,
  <HeroCard key="tooltip" name="Tooltip" w="w-72">
    <div className="flex items-end justify-around pb-1 pt-9">
      <Tooltip open content="Copy link" position="top"><Button size="sm" variant="outline" label="Share" /></Tooltip>
      <Tooltip open content="Saved!" position="bottom" color="emerald"><Button size="sm" variant="ghost" label="Save" /></Tooltip>
    </div>
  </HeroCard>,
  <HeroCard key="loading" name="LoadingState">
    <LoadingState title="Loading data">Fetching your reports…</LoadingState>
  </HeroCard>,
  <HeroCard key="crumbs" name="Breadcrumbs" w="w-72">
    <div className="space-y-3">{crumbs("text")}{crumbs("soft", "violet")}{crumbs("solid")}</div>
  </HeroCard>,
];

const REEL_2: ReactNode[] = [
  <HeroCard key="stepper" name="Stepper" w="w-96">
    <div className="space-y-4">
      <Stepper steps={STEPS} currentStep={2} />
      <Stepper steps={STEPS.slice(0, 3)} currentStep={1} color="violet" />
    </div>
  </HeroCard>,
  <HeroCard key="notification" name="Notification" w="w-80">
    <div className="space-y-2">
      <Notification icon="bell" title="New comment" timestamp="2m ago" unread>Anna replied to your thread.</Notification>
      <Notification icon="mail" title="Invoice sent" timestamp="1h ago">Receipt #4821 was emailed.</Notification>
    </div>
  </HeroCard>,
  <HeroCard key="topbar" name="TopBar" w="w-96">
    <div className="space-y-2">
      <div className={FRAME}><TopBar back title="Inbox" subtitle="12 unread" actions={[{ icon: "search", label: "Search" }, { icon: "bell", label: "Alerts", badge: "3" }]} /></div>
      <div className={FRAME}><TopBar variant="accent" menu title="Dashboard" /></div>
    </div>
  </HeroCard>,
  <HeroCard key="success" name="SuccessState">
    <SuccessState title="Payment received" action={<Button size="sm" label="View receipt" />}>Thanks, you are all set.</SuccessState>
  </HeroCard>,
  <HeroCard key="pagination" name="Pagination" w="w-96">
    <PagerStack />
  </HeroCard>,
  <HeroCard key="popover" name="Popover">
    <div className="flex items-center gap-3">
      <Popover content={<p className="w-40 text-xs text-fg-muted">Invite teammates to collaborate on this project.</p>} position="bottom">
        <Button size="sm" variant="outline" label="Invite" icon="plus" />
      </Popover>
      <span className="text-xs text-fg-subtle">Click to open</span>
    </div>
  </HeroCard>,
  <HeroCard key="footer" name="Footer" w="w-96">
    {/* Fixed-width wrapper (Fit scales it to the card) and no fixed frame height, so the link columns and the copyright row aren't cut off. */}
    <div className={`${FRAME} w-[24rem]`}>
      <Footer color="slate" bottom="© 2026 Lojee, Inc.">
        <LinkColumn heading="Product" links={["Features", "Pricing"]} />
        <LinkColumn heading="Company" links={["About", "Blog"]} />
        <LinkColumn heading="Legal" links={["Privacy", "Terms"]} />
      </Footer>
    </div>
  </HeroCard>,
  <HeroCard key="theme" name="ThemeSwitcher">
    <div className="flex items-center gap-3">
      <ThemeSwitcher align="start" />
      <span className="text-xs text-fg-subtle">Mode, accent, style</span>
    </div>
  </HeroCard>,
  <HeroCard key="navmenu" name="NavigationMenu" w="w-96">
    <div className="space-y-3">
      <NavigationMenu items={NAV_ITEMS} />
      <NavigationMenu items={NAV_ITEMS} color="emerald" variant="soft" />
    </div>
  </HeroCard>,
];

const REEL_3: ReactNode[] = [
  <HeroCard key="header" name="Header" w="w-96">
    <div className={`${FRAME} h-24`}>
      <Header title="Projects" description="Manage and ship your work" actions={<Button size="sm" label="New project" />} />
    </div>
  </HeroCard>,
  <HeroCard key="error" name="ErrorState">
    <ErrorState title="Something broke" action={<Button size="sm" variant="destructive" icon="refresh-cw" label="Retry" />}>We could not load your data.</ErrorState>
  </HeroCard>,
  <HeroCard key="bottomnav" name="BottomNavigation" w="w-96">
    <div className="space-y-2">
      <div className={FRAME}><BottomNavigation items={BOTTOM_ITEMS} /></div>
      <div className={FRAME}><BottomNavigation items={BOTTOM_ITEMS} color="violet" variant="soft" /></div>
    </div>
  </HeroCard>,
  <HeroCard key="tabs-v" name="Tabs · colors" w="w-72">
    <div className="space-y-3">{tabs("violet")}{tabs("emerald")}</div>
  </HeroCard>,
  <HeroCard key="alert-t" name="Alert · titled" w="w-80">
    <div className="space-y-2">
      <Alert variant="warning" title="Heads up" closable={false}>Your trial ends in 3 days.</Alert>
      <Alert variant="success" title="All set" closable={false}>Backup completed.</Alert>
    </div>
  </HeroCard>,
  <HeroCard key="toast-w" name="Toast" w="w-80">
    <div className="space-y-2">
      <ToastPreview variant="info" title="Update ready">Restart to apply v2.4.</ToastPreview>
      <ToastPreview variant="warning" title="Low battery">Plug in your device.</ToastPreview>
    </div>
  </HeroCard>,
  <HeroCard key="dropdown" name="DropdownMenu">
    <div className="flex items-center gap-3">
      <DropdownMenu trigger={<Button size="sm" variant="outline" label="Actions" icon="settings" />}>
        <DropdownMenuItem icon="user">Profile</DropdownMenuItem>
        <DropdownMenuItem icon="settings">Settings</DropdownMenuItem>
        <DropdownMenuItem danger>Delete</DropdownMenuItem>
      </DropdownMenu>
      <span className="text-xs text-fg-subtle">Click to open</span>
    </div>
  </HeroCard>,
  <HeroCard key="stepper-v" name="Stepper · vertical">
    <Stepper orientation="vertical" currentStep={1} steps={[{ label: "Account", description: "Create login" }, { label: "Plan", description: "Pick a tier" }, { label: "Review" }]} />
  </HeroCard>,
  <HeroCard key="crumbs-i" name="Breadcrumbs · icons" w="w-72">
    <Breadcrumbs variant="soft">
      <BreadcrumbItem href="#" icon="home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Settings</BreadcrumbItem>
      <BreadcrumbItem>Billing</BreadcrumbItem>
    </Breadcrumbs>
  </HeroCard>,
  <HeroCard key="skeleton-c" name="Skeleton · card" w="w-72">
    <div className="space-y-3">
      <Skeleton variant="rect" height={72} animation="shimmer" />
      <Skeleton variant="text" lines={3} />
    </div>
  </HeroCard>,
];

const REEL_4: ReactNode[] = [
  <HeroCard key="pagination" name="Pagination" w="w-96">
    <PagerStack />
  </HeroCard>,
  <HeroCard key="navbar" name="Navbar · variants" w="w-[34rem]">
    {/* The navbars need ~27rem to lay out; the card is narrower, so a fixed-width wrapper lets Fit scale the whole thing down instead of squashing the links on top of each other. No fixed frame height, so the bordered navbar isn't clipped. */}
    <div className="w-[30rem] space-y-2">
      <div className={FRAME}><Navbar variant="gradient" brand="Lojee" items={NAV_ITEMS} /></div>
      <div className={FRAME}><Navbar variant="bordered" brand="Lojee" color="violet" items={NAV_ITEMS} /></div>
    </div>
  </HeroCard>,
  <HeroCard key="notif" name="Notification" w="w-80">
    <div className="space-y-2">
      <Notification icon="user" title="Ben joined" timestamp="Just now" unread>Welcome to the team.</Notification>
      <Notification icon="settings" title="Settings updated" timestamp="Yesterday">Two-factor is now on.</Notification>
    </div>
  </HeroCard>,
  <HeroCard key="navmenu" name="NavigationMenu" w="w-96">
    <div className="space-y-3">
      <NavigationMenu items={NAV_ITEMS} variant="outline" />
      <NavigationMenu items={NAV_ITEMS} color="violet" />
    </div>
  </HeroCard>,
  <HeroCard key="tooltip" name="Tooltip · sizes" w="w-80">
    <div className="flex items-end justify-around pb-1 pt-9">
      <Tooltip open content="Small" size="xs"><Button size="sm" variant="outline" label="xs" /></Tooltip>
      <Tooltip open content="Medium tip" color="violet"><Button size="sm" variant="outline" label="md" /></Tooltip>
      <Tooltip open content="Large tooltip" size="lg" color="rose"><Button size="sm" variant="outline" label="lg" /></Tooltip>
    </div>
  </HeroCard>,
  <HeroCard key="progress" name="ProgressBar · colors" w="w-72">
    <div className="space-y-3">
      <ProgressBar value={80} showLabel />
      <ProgressBar value={55} showLabel striped />
      <Deploying />
    </div>
  </HeroCard>,
  <HeroCard key="empty" name="EmptyState">
    <EmptyState icon="search" title="No results" action={<Button size="sm" label="Clear filters" />}>Try a different search.</EmptyState>
  </HeroCard>,
  <HeroCard key="loading" name="LoadingState · sizes" w="w-72">
    <div className="flex items-start justify-around">
      <LoadingState size="sm" title="Small" />
      <LoadingState size="md" title="Medium" />
      <LoadingState size="lg" title="Large" />
    </div>
  </HeroCard>,
  <HeroCard key="topbar" name="TopBar" w="w-96">
    <div className={FRAME}><TopBar variant="elevated" back title="Settings" actions={[{ icon: "bell", label: "Alerts" }]} /></div>
  </HeroCard>,
  <HeroCard key="header" name="Header · dark" w="w-96">
    <div className={`${FRAME} h-24`}><Header variant="dark" title="Analytics" description="Last 30 days" /></div>
  </HeroCard>,
];

/** Four reels of live feedback + navigation cards for the landing hero. */
export const FEEDBACK_REELS: ReactNode[][] = [REEL_1, REEL_2, REEL_3, REEL_4];
