import { useEffect, useMemo, useState } from "react";
import { Badge } from "../Badge/Badge";
import { Button } from "../Buttons/Button";
import { Icon } from "../Icons/Icon";
import { CHANGELOG, CHANGELOG_GENERATED_AT, PACKAGE_VERSION, type ChangelogCommit } from "../../../generated/changelog";
import { REPO_BRANCH, REPO_NAME, REPO_OWNER, REPO_URL } from "../../../core/repo";
import type { ColorName } from "../../../core/tokens";

type Category = "Added" | "Fixed" | "Changed" | "Docs";
const CATEGORIES: Category[] = ["Added", "Fixed", "Changed", "Docs"];
const CATEGORY_COLOR: Record<Category, ColorName> = { Added: "emerald", Fixed: "rose", Changed: "blue", Docs: "amber" };

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

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold text-fg">Changelog</h1>
          <Badge variant="soft" color="accent" label={`v${PACKAGE_VERSION}`} />
          {status === "live" && live ? (
            <Badge variant="soft" color="emerald" label={`Live from GitHub · ${ago(live.at)}`} />
          ) : status === "loading" ? (
            <Badge variant="outline" color="slate" label="Checking GitHub…" />
          ) : (
            <Badge variant="outline" color="amber" label="Offline — showing build snapshot" />
          )}
        </div>
        <p className="text-sm text-fg-subtle">
          Every change to lojee-ui, generated from the project&apos;s git history. It updates itself: commits pushed to <span className="font-mono text-fg">{REPO_BRANCH}</span> appear
          here automatically, and each build refreshes the built-in snapshot ({new Date(CHANGELOG_GENERATED_AT).toLocaleDateString()}).
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            [
              [entries.length, "Changes"],
              [days, "Active days"],
              [counts.Added, "Additions"],
              [counts.Fixed, "Fixes"],
            ] as const
          ).map(([n, l]) => (
            <div key={l} className="rounded-xl border border-border bg-surface-muted px-3 py-2.5">
              <p className="text-xl font-semibold text-accent-600 dark:text-accent-400">{n}</p>
              <p className="text-xs text-fg-subtle">{l}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors " +
              (filter === c ? "border-accent-600 bg-accent-600 text-white" : "border-border text-fg-muted hover:bg-surface-muted")
            }
          >
            {c}
            {c !== "All" && <span className="ml-1 opacity-70">{counts[c]}</span>}
          </button>
        ))}
        <div className="relative ml-auto w-full sm:w-56">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search changes…"
            className="w-full rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent-500/40"
          />
        </div>
      </div>

      {groups.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-fg-subtle">No changes match.</p>
      ) : (
        <div className="space-y-8">
          {groups.map(([key, list]) => (
            <section key={key} className="relative">
              <h2 className="sticky top-0 z-10 -mx-1 bg-surface/90 px-1 py-2 text-sm font-semibold text-fg backdrop-blur">{dayLabel(key)}</h2>
              <ul className="ml-1.5 space-y-1 border-l border-border pl-5">
                {list.map((e) => {
                  const expanded = open === e.sha;
                  return (
                    <li key={e.sha} className="relative py-2">
                      <span className="absolute -left-[1.72rem] top-[1.05rem] h-2 w-2 rounded-full bg-accent-500 ring-4 ring-surface" />
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="soft" color={CATEGORY_COLOR[e.category]} label={e.category} />
                        <span className="text-sm font-medium text-fg">{e.title}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-fg-subtle">
                        <a href={e.url} target="_blank" rel="noopener noreferrer" className="font-mono hover:text-accent-600 hover:underline">
                          {e.short}
                        </a>
                        <span className="flex items-center gap-1">
                          {e.avatar ? <img src={e.avatar} alt="" className="h-4 w-4 rounded-full" /> : <Icon name="user" size={12} />}
                          {e.author}
                        </span>
                        <span>{new Date(e.date).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</span>
                        {e.body && (
                          <button type="button" onClick={() => setOpen(expanded ? null : e.sha)} className="font-medium text-accent-600 hover:underline dark:text-accent-400">
                            {expanded ? "Hide details" : "Details"}
                          </button>
                        )}
                      </div>
                      {expanded && e.body && <p className="mt-2 whitespace-pre-line rounded-lg bg-surface-muted p-3 text-sm leading-relaxed text-fg-muted">{e.body}</p>}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <Button variant="outline" label="View all commits on GitHub" icon="git-branch" onClick={() => window.open(`${REPO_URL}/commits/${REPO_BRANCH}`, "_blank", "noopener")} />
        <span className="text-xs text-fg-subtle">Categories are read from each commit message: “Add …” → Added, “Fix …” → Fixed, docs → Docs, everything else → Changed.</span>
      </div>
    </div>
  );
}
