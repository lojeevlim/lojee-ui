import { useNavigate } from "react-router-dom"
import Navbar, { type TopNavKey } from "./Navbar"
import { Button } from "../ui/Buttons/Button"
import { Badge } from "../ui/Badge/Badge"
import { Icon } from "../ui/Icons/Icon"
import { COMPONENT_MENU } from "../../constant/component_menu"
import { defaultPathFor, pathFor } from "../../core/routes"
import { REPO_URL } from "../../core/repo"
import { DotScroll } from "../ui/DotScroll/DotScroll"


const VALUES = [
  { icon: "box", title: "One library, every framework", body: "Write React, or use the same components as Web Components in Vue, Angular and plain JS — the design and behaviour never diverge." },
  { icon: "palette", title: "Themeable by default", body: "Light and dark mode plus a brand accent through CSS variables, so an app's look changes in one place and reaches every component." },
  { icon: "zap", title: "Small surface, no lock-in", body: "No compiled stylesheet and no config file: Tailwind CSS v4 generates the styles inside your own project, and you can override any part." },
  { icon: "circle-check", title: "Documented like a product", body: "Every component has live examples, an interactive playground and an API reference generated from the real TypeScript types." },
]

const STACK: [string, string][] = [
  ["React 19", "Component runtime"],
  ["TypeScript", "Fully typed props and events"],
  ["Tailwind CSS v4", "Styling, tokens and dark mode"],
  ["Web Components", "Generated l-* elements via r2wc"],
  ["Vite", "Docs app and library builds"],
  ["lucide-react", "Icon set"],
]

export default function AboutPage() {
  const navigate = useNavigate()
  const groups = COMPONENT_MENU.filter((g) => g.items?.length)
  const total = new Set(groups.flatMap((g) => g.items!.map((i) => i.label))).size

  const handleNavChange = (key: TopNavKey) => {
    if (key === "about") return
    navigate(defaultPathFor(key === "docs" ? "docs" : "components"))
  }

  const stats: [string, string][] = [
    [`${total}+`, "Components"],
    [String(groups.length), "Categories"],
    ["2", "Ways to use it"],
    ["Light + Dark", "Themes with accents"],
  ]

  return (
    <div className="flex h-screen flex-col bg-surface text-fg">
      <Navbar activeNav="about" onNavChange={handleNavChange} showSideToggle={false} />
      <main className="min-h-0 flex-1">
        <DotScroll className="h-full">
        <div className="mx-auto max-w-4xl space-y-14 px-6 py-10 md:py-14">
          <header className="space-y-4">
            <Badge variant="soft" color="accent" label="About" />
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">A component library that follows you across frameworks</h1>
            <p className="max-w-2xl text-base leading-relaxed text-fg-muted">
              lojee-ui is a React + TypeScript component library styled with Tailwind CSS v4. It started as a set of building blocks for internal tools and grew
              into a complete, themeable design system — with every component also shipped as a Web Component so the same UI can live in any stack.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button label="Get started" icon="arrow-right" onClick={() => navigate(pathFor("docs", "Installation"))} />
              <Button variant="outline" label="Read the introduction" icon="book-open" onClick={() => navigate(pathFor("docs", "Introduction"))} />
            </div>
          </header>

          <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-xl border border-border bg-surface-muted p-4">
                <p className="text-2xl font-semibold text-accent-600 dark:text-accent-400">{value}</p>
                <p className="mt-0.5 text-xs text-fg-subtle">{label}</p>
              </div>
            ))}
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Our mission</h2>
            <p className="text-sm leading-relaxed text-fg-muted">
              Building a good interface should not mean rebuilding the same dropdown, stepper and settings page for every project — or every framework. lojee-ui
              aims to give teams a consistent, accessible and easily themed set of components they can drop in, tune with a few props, and trust to behave the same
              way everywhere.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted">
              That is why behaviour is built in (selection, navigation, search, pickers, forms), why every component follows one theme, and why nothing is hidden
              behind a stylesheet you cannot change.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-xl font-semibold">What we care about</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {VALUES.map((v) => (
                <div key={v.title} className="rounded-xl border border-border p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
                    <Icon name={v.icon} size={18} />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{v.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Built with</h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {STACK.map(([name, note]) => (
                <li key={name} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5">
                  <Icon name="check" size={14} />
                  <span>
                    <span className="block text-sm font-medium">{name}</span>
                    <span className="block text-xs text-fg-subtle">{note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3 rounded-xl border border-border bg-surface-muted p-5">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Project status</h2>
              <Badge variant="outline" color="amber" label="Alpha" />
            </div>
            <p className="text-sm leading-relaxed text-fg-muted">
              lojee-ui is in alpha (0.1). The components are usable today, but props and package details may still change before a stable release. Feedback and
              bug reports are very welcome.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button variant="outline" label="View on GitHub" icon="git-branch" onClick={() => window.open(REPO_URL, "_blank", "noopener")} />
              <Button variant="ghost" label="Report an issue" icon="message-circle" onClick={() => window.open(`${REPO_URL}/issues`, "_blank", "noopener")} />
            </div>
          </section>

          <footer className="flex flex-col gap-1 border-t border-border pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
            <span>Released under the MIT license.</span>
            <span>Made by lojeevlim · © 2026 Lojee, Inc.</span>
          </footer>
        </div>
        </DotScroll>
      </main>
    </div>
  )
}
