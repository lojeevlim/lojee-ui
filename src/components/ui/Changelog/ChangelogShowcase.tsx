import { useEffect, useMemo, useState } from "react";
import { Badge } from "../Badge/Badge";
import { Button } from "../Buttons/Button";
import { Icon } from "../Icons/Icon";
import { SearchInput } from "../SearchInput/SearchInput";
import { CHANGELOG, CHANGELOG_GENERATED_AT, PACKAGE_VERSION, type ChangelogCommit } from "../../../generated/changelog";
import { REPO_BRANCH, REPO_NAME, REPO_OWNER, REPO_URL } from "../../../core/repo";
import type { ColorName } from "../../../core/tokens";

type Category = "Added" | "Fixed" | "Changed" | "Docs";
const CATEGORIES: Category[] = ["Added", "Fixed", "Changed", "Docs"];
const CATEGORY_COLOR: Record<Category, ColorName> = { Added: "emerald", Fixed: "rose", Changed: "blue", Docs: "amber" };
const CATEGORY_ICON: Record<Category, string> = { Added: "plus", Fixed: "circle-check", Changed: "refresh-cw", Docs: "book-open" };
// Literal class strings so Tailwind can see them: the timeline node and the stat icon of each category.
const CATEGORY_TINT: Record<Category, string> = {
  Added: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Fixed: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  Changed: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Docs: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
};

// Strips a conventional-commit prefix ("feat(ui): …") and reads the category from it, or from the first word.
function classify(subject: string): { category: Category; title: string } {
  const conventional = subject.match(/^(\w+)(?:\([^)]*\))?!?:\s*(.+)$/);
  const type = conventional ? conventional[1].toLowerCase() : "";
  const title = (conventional ? conventional[2] : subject).trim();
  const text = `${type} ${title}`.toLowerCase();
  let category: Category = "Changed";
  if (/^(feat|add|new)\b/.test(type) || /^(add|adds|added|create|introduce|implement|new|support)\b/.test(title.toLowerCase())) category = "Added";
  else if (/^(fix|bug|hotfix|patch)\b/.test(type) || /^(fix|fixes|fixed|hotfix|resolve|correct|patch)\b/.test(title.toLowerCase())) category = "Fixed";
  else if (/^(docs?)\b/.test(type) || /^(docs?|readme|document)\b/.test(title.toLowerCase())) category = "Docs";
  else if (/\b(readme|documentation)\b/.test(text) && !/component/.test(text)) category = "Docs";
  return { category, title: title.charAt(0).toUpperCase() + title.slice(1) };
}

interface Entry extends ChangelogCommit {
  category: Category;
  title: string;
  url: string;
  avatar?: string;
}

const toEntry = (c: ChangelogCommit, extra?: { url?: string; avatar?: string }): Entry => ({
  ...c,
  ...classify(c.subject),
  url: extra?.url ?? `${REPO_URL}/commit/${c.sha}`,
  avatar: extra?.avatar,
});

const CACHE_KEY = "lojee-ui:changelog";
const CACHE_TTL = 10 * 60 * 1000; // GitHub's unauthenticated API allows 60 requests/hour — cache between visits.

interface GhCommit {
  sha: string;
  html_url: string;
  parents: unknown[];
  commit: { message: string; author: { name: string; email: string; date: string } };
  author: { avatar_url: string } | null;
}

async function fetchLive(): Promise<{ entries: Entry[]; at: number }> {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) ?? "null");
    if (cached && Date.now() - cached.at < CACHE_TTL) return cached;
  } catch {
    /* storage unavailable — just fetch */
  }
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?sha=${REPO_BRANCH}&per_page=60`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
  const data: GhCommit[] = await res.json();
  const entries = data
    .filter((c) => c.parents.length < 2) // skip merge commits
    .map((c) => {
      const [subject, ...rest] = c.commit.message.split("\n");
      const body = rest
        .map((l) => l.trim())
        .filter((l) => l && !/^co-authored-by:/i.test(l) && !/^generated with/i.test(l))
        .join("\n");
      return toEntry(
        { sha: c.sha, short: c.sha.slice(0, 7), date: c.commit.author.date, author: c.commit.author.name, email: c.commit.author.email, subject, body },
        { url: c.html_url, avatar: c.author?.avatar_url }
      );
    });
  const result = { entries, at: Date.now() };
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(result));
  } catch {
    /* ignore */
  }
  return result;
}

const dayKey = (iso: string) => new Date(iso).toLocaleDateString("en-CA"); // YYYY-MM-DD in the viewer's timezone
const dayLabel = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
};
const ago = (ms: number) => {
  const m = Math.round((Date.now() - ms) / 60000);
  return m < 1 ? "just now" : m < 60 ? `${m} min ago` : `${Math.round(m / 60)} h ago`;
};

export default function ChangelogShowcase() {
  const [live, setLive] = useState<{ entries: Entry[]; at: number } | null>(null);
  const [status, setStatus] = useState<"loading" | "live" | "offline">("loading");
  const [filter, setFilter] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchLive()
      .then((r) => {
        if (cancelled) return;
        setLive(r);
        setStatus("live");
      })
      .catch(() => !cancelled && setStatus("offline"));
    return () => {
      cancelled = true;
    };
  }, []);

  // Build-time history is the base; live GitHub commits are layered on top (deduped by sha), so the page is complete
  // offline and picks up new pushes the moment they land, without a redeploy.
  const entries = useMemo(() => {
    const map = new Map<string, Entry>();
    for (const c of CHANGELOG) map.set(c.sha, toEntry(c));
    for (const e of live?.entries ?? []) map.set(e.sha, e);
    return [...map.values()].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [live]);

  const visible = entries.filter(
    (e) => (filter === "All" || e.category === filter) && (!query || `${e.title} ${e.body} ${e.author} ${e.short}`.toLowerCase().includes(query.toLowerCase()))
  );
  const groups = useMemo(() => {
    const g = new Map<string, Entry[]>();
    for (const e of visible) g.set(dayKey(e.date), [...(g.get(dayKey(e.date)) ?? []), e]);
    return [...g.entries()];
  }, [visible]);

  const counts = Object.fromEntries(CATEGORIES.map((c) => [c, entries.filter((e) => e.category === c).length])) as Record<Category, number>;
  const days = new Set(entries.map((e) => dayKey(e.date))).size;

  const STATS = [
    { n: entries.length, label: "Changes", icon: "list", tint: "bg-accent-500/15 text-accent-600 dark:text-accent-400" },
    { n: days, label: "Active days", icon: "calendar-days", tint: "bg-violet-500/15 text-violet-600 dark:text-violet-400" },
    { n: counts.Added, label: "Additions", icon: "plus", tint: CATEGORY_TINT.Added },
    { n: counts.Fixed, label: "Fixes", icon: "circle-check", tint: CATEGORY_TINT.Fixed },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-5">
        <div data-cl-hero="" className="relative overflow-hidden rounded-3xl border border-border bg-[color-mix(in_srgb,var(--color-accent-500)_8%,var(--color-surface))] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/15 blur-3xl" aria-hidden="true" />
          <div className="relative space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-3xl font-semibold tracking-tight text-fg">Changelog</h1>
              <Badge variant="solid" color="accent" label={`v${PACKAGE_VERSION}`} />
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">
              Every change to lojee-ui, straight from the project&apos;s git history. Commits pushed to <span className="font-mono text-fg">{REPO_BRANCH}</span> show up here on their own, and each
              build refreshes the built-in snapshot ({new Date(CHANGELOG_GENERATED_AT).toLocaleDateString()}).
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {status === "live" && live ? (
                <Badge variant="soft" color="emerald" icon="activity" label={`Live from GitHub · ${ago(live.at)}`} />
              ) : status === "loading" ? (
                <Badge variant="outline" color="slate" label="Checking GitHub…" />
              ) : (
                <Badge variant="outline" color="amber" label="Offline — showing build snapshot" />
              )}
              <Button size="sm" variant="outline" label="GitHub" icon="git-branch" onClick={() => window.open(`${REPO_URL}/commits/${REPO_BRANCH}`, "_blank", "noopener")} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map(({ n, label, icon, tint }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3.5">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tint}`}>
                <Icon name={icon} size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-xl font-semibold leading-tight tabular-nums text-fg">{n}</p>
                <p className="truncate text-xs text-fg-subtle">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        {(["All", ...CATEGORIES] as const).map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c)}
              className={
                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all " +
                (active ? "border-accent-600 bg-accent-600 text-white shadow-sm" : "border-border bg-surface text-fg-muted hover:-translate-y-0.5 hover:text-fg")
              }
            >
              {c !== "All" && <Icon name={CATEGORY_ICON[c]} size={13} />}
              {c}
              {c !== "All" && <span className={active ? "opacity-80" : "opacity-60"}>{counts[c]}</span>}
            </button>
          );
        })}
        <div className="ml-auto w-full sm:w-64">
          <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery("")} placeholder="Search changes…" />
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <Icon name="search" size={22} className="mx-auto text-fg-subtle" />
          <p className="mt-2 text-sm font-medium text-fg">No changes match</p>
          <p className="text-xs text-fg-subtle">Try another category or a different search.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {groups.map(([key, list]) => (
            <section key={key}>
              <h2 className="sticky top-0 z-10 -mx-1 flex items-center gap-2.5 bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)] px-1 py-2 backdrop-blur">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1 text-sm font-semibold text-fg">
                  <Icon name="calendar-days" size={14} className="text-accent-600 dark:text-accent-400" />
                  {dayLabel(key)}
                </span>
                <span className="text-xs text-fg-subtle">
                  {list.length} {list.length === 1 ? "change" : "changes"}
                </span>
              </h2>
              <ul className="relative mt-3 space-y-3 pl-11 before:absolute before:bottom-3 before:left-[1.05rem] before:top-3 before:w-0.5 before:rounded-full before:bg-border before:content-['']">
                {list.map((e) => {
                  const expanded = open === e.sha;
                  return (
                    <li key={e.sha} className="relative">
                      <span
                        data-cl-node=""
                        className={`absolute -left-11 top-3 flex h-9 w-9 items-center justify-center rounded-full ring-4 ring-surface ${CATEGORY_TINT[e.category]}`}
                        title={e.category}
                      >
                        <Icon name={CATEGORY_ICON[e.category]} size={16} />
                      </span>
                      <div className="rounded-2xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent-500/40 hover:shadow-md">
                        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
                          <p className="min-w-0 flex-1 text-sm font-medium leading-snug text-fg">{e.title}</p>
                          <Badge variant="soft" color={CATEGORY_COLOR[e.category]} label={e.category} />
                        </div>
                        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-fg-subtle">
                          <a
                            href={e.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md bg-surface-muted px-1.5 py-0.5 font-mono text-fg-muted transition-colors hover:text-accent-600 hover:underline"
                          >
                            {e.short}
                          </a>
                          <span className="flex items-center gap-1.5">
                            {e.avatar ? <img src={e.avatar} alt="" className="h-4 w-4 rounded-full" /> : <Icon name="user" size={12} />}
                            {e.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="clock" size={12} />
                            {new Date(e.date).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          {e.body && (
                            <button
                              type="button"
                              aria-expanded={expanded}
                              onClick={() => setOpen(expanded ? null : e.sha)}
                              className="ml-auto inline-flex items-center gap-1 font-medium text-accent-600 hover:underline dark:text-accent-400"
                            >
                              {expanded ? "Hide details" : "Details"}
                              <Icon name="chevron-down" size={13} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
                            </button>
                          )}
                        </div>
                        {expanded && e.body && <p className="mt-3 whitespace-pre-line rounded-xl bg-surface-muted p-3.5 text-sm leading-relaxed text-fg-muted">{e.body}</p>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface p-4">
        <Button variant="outline" label="View all commits on GitHub" icon="git-branch" onClick={() => window.open(`${REPO_URL}/commits/${REPO_BRANCH}`, "_blank", "noopener")} />
        <span className="min-w-0 flex-1 text-xs leading-relaxed text-fg-subtle">
          Categories are read from each commit message: “Add …” → Added, “Fix …” → Fixed, docs → Docs, everything else → Changed.
        </span>
      </div>
    </div>
  );
}
