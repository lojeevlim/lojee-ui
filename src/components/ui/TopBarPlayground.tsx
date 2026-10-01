import { useState } from "react";
import { TopBar, type TopBarAction, type TopBarVariant, type TopBarSize } from "./TopBar/TopBar";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { ColorName } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const VARIANTS: TopBarVariant[] = ["light", "elevated", "minimal", "accent"];
const SIZES: TopBarSize[] = ["sm", "md", "lg"];
const TOGGLE = ["off", "on"] as const;

const ACTIONS: TopBarAction[] = [
  { icon: "search", label: "Search" },
  { icon: "bell", label: "Notifications", badge: "3" },
  { icon: "settings", label: "Settings" },
];

const ACTIONS_CODE = `[
  { icon: "search", label: "Search" },
  { icon: "bell", label: "Notifications", badge: "3" },
  { icon: "settings", label: "Settings" },
]`;

export default function TopBarPlayground() {
  const motion = useMotion();
  const [variant, setVariant] = useState<TopBarVariant>("light");
  const [size, setSize] = useState<TopBarSize>("md");
  const [color, setColor] = useState<ColorName>("accent");
  const [title, setTitle] = useState("Dashboard");
  const [subtitle, setSubtitle] = useState<(typeof TOGGLE)[number]>("on");
  const [back, setBack] = useState<(typeof TOGGLE)[number]>("off");
  const [actions, setActions] = useState<(typeof TOGGLE)[number]>("on");
  const [menu, setMenu] = useState<(typeof TOGGLE)[number]>("off");
  const [search, setSearch] = useState<(typeof TOGGLE)[number]>("off");
  const [sticky, setSticky] = useState<(typeof TOGGLE)[number]>("off");

  const showSubtitle = subtitle === "on";
  const showBack = back === "on";
  const showActions = actions === "on";
  const isSticky = sticky === "on";
  const showMenu = menu === "on";
  const showSearch = search === "on";

  const preview = (
    <AppWindowFrame>
      {/* Docks to the top of a page; sticky sticks to this scrolling area. */}
      <div className="h-[340px] flex-1 overflow-y-auto bg-surface">
        <TopBar
          key={motion.replayKey}
          {...motion.props}
          variant={variant}
          size={size}
          color={color}
          title={title || undefined}
          subtitle={showSubtitle ? "Last synced 2 min ago" : undefined}
          onBack={showBack ? () => {} : undefined}
          onMenuClick={showMenu ? () => {} : undefined}
          search={showSearch}
          actions={showActions ? ACTIONS : undefined}
          sticky={isSticky}
        />
        <div className="space-y-3 p-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-16 rounded-xl border border-dashed border-border" />
          ))}
        </div>
      </div>
    </AppWindowFrame>
  );

  // "light", "md" and "accent" are the defaults, so props are only written out when changed.
  const props = [
    title ? `title="${title}"` : null,
    showSubtitle ? 'subtitle="Last synced 2 min ago"' : null,
    variant !== "light" ? `variant="${variant}"` : null,
    variant === "accent" && color !== "accent" ? `color="${color}"` : null,
    size !== "md" ? `size="${size}"` : null,
    showSearch ? "search" : null,
    isSticky ? "sticky" : null,
  ]
    .filter(Boolean)
    .concat(motion.attrs.trim() ? motion.attrs.trim().split(/ (?=\w+=)/) : []) as string[];

  const reactExtra = [showMenu ? "  onMenuClick={() => setSidebarOpen(true)}" : null, showBack ? "  onBack={() => navigate(-1)}" : null, showSearch ? "  onSearch={(query) => runSearch(query)}" : null, showActions ? `  actions={${ACTIONS_CODE.replace(/\n/g, "\n  ")}}` : null]
    .filter(Boolean)
    .join("\n");
  const react = `<TopBar\n${props.map((p) => `  ${p}`).join("\n")}${reactExtra ? `\n${reactExtra}` : ""}\n/>`;

  const attrs = [...props, showBack ? 'back="true"' : null, showMenu ? 'menu="true"' : null]
    .filter(Boolean)
    .join(" ")
    .replace(/\bsticky\b/, 'sticky="true"')
    .replace(/\bsearch\b(?!=)/, 'search="true"');
  const webScript =
    (showActions ? `  bar.actions = ${ACTIONS_CODE.replace(/\n/g, "\n  ")};\n` : "") +
    (showBack ? '  bar.addEventListener("back", () => history.back());\n' : "") +
    (showMenu ? '  bar.addEventListener("menuclick", () => openSidebar());\n' : "") +
    (showSearch ? '  bar.addEventListener("search", (e) => runSearch(e.detail));\n' : "");
  const js = `<l-top-bar id="top-bar-demo" ${attrs}></l-top-bar>${
    webScript
      ? `\n\n<script type="module">\n  import "lojee-ui/elements";\n\n  const bar = document.getElementById("top-bar-demo");\n${webScript}</script>`
      : `\n\n<script type="module">import "lojee-ui/elements";</script>`
  }`;
  const vue = `<template>\n  <l-top-bar ${showActions ? ':actions="actions" ' : ""}${attrs}${showBack ? ' @back="router.back()"' : ""} />\n</template>\n\n<script setup lang="ts">\nimport "lojee-ui/elements";\n${
    showBack ? 'import { useRouter } from "vue-router";\n\nconst router = useRouter();\n' : ""
  }${showActions ? `const actions = ${ACTIONS_CODE};\n` : ""}</script>`;
  const angular = `<l-top-bar ${showActions ? '[actions]="actions" ' : ""}${attrs}${showBack ? ' (back)="location.back()"' : ""}></l-top-bar>${
    showActions ? `\n\nactions = ${ACTIONS_CODE};` : ""
  }`;

  const codeVariants: CodeBlockVariants = { react, js, vue, angular };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Dashboard"
        />
      </div>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      {variant === "accent" && <ColorSwatches label="Color" value={color} onChange={setColor} />}
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <OptionGroup label="Subtitle" options={TOGGLE} value={subtitle} onChange={setSubtitle} />
      <OptionGroup label="Back button" options={TOGGLE} value={back} onChange={setBack} />
      <OptionGroup label="Actions" options={TOGGLE} value={actions} onChange={setActions} />
      <OptionGroup label="Menu button" options={TOGGLE} value={menu} onChange={setMenu} />
      <OptionGroup label="Search (built-in)" options={TOGGLE} value={search} onChange={setSearch} />
      <OptionGroup label="Sticky" options={TOGGLE} value={sticky} onChange={setSticky} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
