import type { FlowEdgeData, FlowNodeData } from "./flowLayout";

export interface FlowSample {
  name: string;
  nodes: FlowNodeData[];
  edges: FlowEdgeData[];
  /** Source text of `nodes` / `edges` for the code examples. */
  nodesCode: string;
  edgesCode: string;
  captionTop?: string;
  captionBottom?: string;
}

const code = (v: unknown) => JSON.stringify(v, null, 2).replace(/"(\w+)":/g, "$1:");

function sample(name: string, nodes: FlowNodeData[], edges: FlowEdgeData[], captions?: { top?: string; bottom?: string }): FlowSample {
  return { name, nodes, edges, nodesCode: code(nodes), edgesCode: code(edges), captionTop: captions?.top, captionBottom: captions?.bottom };
}

export const FRAMEWORK_FLOW = sample(
  "Frameworks",
  [
    { id: "source", label: "<Button/>", icon: "box" },
    { id: "r2wc", label: "r2wc", sublabel: "shadow DOM", shape: "pill", tone: "accent" },
    { id: "element", label: "Custom", sublabel: "Element", shape: "circle" },
    { id: "react", label: "React", icon: "box" },
    { id: "vue", label: "Vue", icon: "box" },
    { id: "angular", label: "Angular", icon: "box" },
    { id: "js", label: "Plain TS/JS", icon: "box" },
  ],
  [
    { from: "source", to: "r2wc" },
    { from: "r2wc", to: "element" },
    { from: "element", to: "react" },
    { from: "element", to: "vue" },
    { from: "element", to: "angular" },
    { from: "element", to: "js" },
  ],
  { top: "write once", bottom: "use anywhere" }
);

export const PIPELINE_FLOW = sample(
  "CI/CD pipeline",
  [
    { id: "commit", label: "Commit", icon: "git-branch" },
    { id: "build", label: "Build", icon: "box" },
    { id: "test", label: "Test", icon: "square-check" },
    { id: "lint", label: "Lint", icon: "list-filter" },
    { id: "deploy", label: "Deploy", icon: "zap", tone: "accent" },
  ],
  [
    { from: "commit", to: "build" },
    { from: "build", to: "test" },
    { from: "build", to: "lint" },
    { from: "test", to: "deploy" },
    { from: "lint", to: "deploy" },
  ]
);

export const AUTH_FLOW = sample(
  "Sign-in flow",
  [
    { id: "visit", label: "Visitor", icon: "user" },
    { id: "form", label: "Sign in", icon: "log-in" },
    { id: "verify", label: "Verify", shape: "pill", tone: "accent" },
    { id: "app", label: "Dashboard", icon: "layout", tone: "accent" },
    { id: "error", label: "Try again", tone: "muted" },
  ],
  [
    { from: "visit", to: "form" },
    { from: "form", to: "verify", label: "submit" },
    { from: "verify", to: "app", label: "valid" },
    { from: "verify", to: "error", label: "invalid" },
  ]
);

export const DATA_FLOW = sample(
  "Data pipeline",
  [
    { id: "api", label: "API", icon: "link" },
    { id: "files", label: "Files", icon: "file" },
    { id: "queue", label: "Queue", shape: "pill" },
    { id: "worker", label: "Worker", icon: "settings", tone: "accent" },
    { id: "db", label: "Database", icon: "table-2" },
    { id: "cache", label: "Cache", icon: "zap" },
  ],
  [
    { from: "api", to: "queue" },
    { from: "files", to: "queue" },
    { from: "queue", to: "worker" },
    { from: "worker", to: "db" },
    { from: "worker", to: "cache" },
  ]
);

export const TREE_FLOW = sample(
  "Decision tree",
  [
    { id: "start", label: "New request", shape: "pill", tone: "accent" },
    { id: "auth", label: "Signed in?" },
    { id: "public", label: "Public page", tone: "muted" },
    { id: "role", label: "Admin?" },
    { id: "admin", label: "Admin panel", tone: "accent" },
    { id: "user", label: "User home" },
  ],
  [
    { from: "start", to: "auth" },
    { from: "auth", to: "public", label: "no" },
    { from: "auth", to: "role", label: "yes" },
    { from: "role", to: "admin", label: "yes" },
    { from: "role", to: "user", label: "no" },
  ]
);

export const SAMPLES = [FRAMEWORK_FLOW, PIPELINE_FLOW, AUTH_FLOW, DATA_FLOW, TREE_FLOW];
export const SAMPLE_NAMES = SAMPLES.map((s) => s.name);
export const sampleByName = (name: string) => SAMPLES.find((s) => s.name === name) ?? FRAMEWORK_FLOW;
