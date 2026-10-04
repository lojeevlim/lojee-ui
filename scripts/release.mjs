// One-command release:  npm run release [-- <bump>] [--dry-run] [--no-publish] [--no-push]
//
//   <bump>        patch | minor | major | prerelease (default) | an exact version such as 0.1.0-alpha.10
//   --dry-run     print what would happen, change nothing
//   --no-publish  do everything except `npm publish`
//   --no-push     do not push the commit and tag to origin
//
// Steps: check the tree is clean and you are logged in to npm -> regenerate the generated docs (API reference, changelog,
// COMPONENTS.md) -> bump the version -> type-check -> build the package -> commit "Release <v>" -> tag v<v> -> publish
// (tagged `latest`, and `alpha` while it is a pre-release) -> push the commit and the tag.
// Publishing needs `npm login`, or an npm token in your npm config / the NPM_TOKEN environment variable.
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const bump = args.find((a) => !a.startsWith("--")) ?? "prerelease";
const dry = flag("--dry-run");

// Returns the command's output (trimmed); with `stdio: "inherit"` the output goes to the terminal and "" is returned.
const run = (cmd, a, opts = {}) => (execFileSync(cmd, a, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"], ...opts }) ?? "").trim();
const step = (msg) => console.log(`\n▸ ${msg}`);
const doIt = (msg, fn) => {
  step(msg + (dry ? "  (dry run — skipped)" : ""));
  if (!dry) return fn();
};
const fail = (msg) => {
  console.error(`\n✖ ${msg}`);
  process.exit(1);
};

// ---- checks ---------------------------------------------------------------------------------------------------------------
const branch = run("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
if (branch !== "main") fail(`Release from main (you are on "${branch}").`);
if (run("git", ["status", "--porcelain"])) fail("The working tree has uncommitted changes — commit or stash them first.");

// An npm token from NPM_TOKEN is written to a temporary config (never into the repo) and removed afterwards.
let userconfig = null;
if (process.env.NPM_TOKEN && !flag("--no-publish")) {
  userconfig = path.join(os.tmpdir(), `lojee-release-npmrc-${process.pid}`);
  fs.writeFileSync(userconfig, `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}\n`, { mode: 0o600 });
}
const npmArgs = (a) => (userconfig ? [...a, "--userconfig", userconfig] : a);
const cleanup = () => userconfig && fs.rmSync(userconfig, { force: true });
process.on("exit", cleanup);

if (!flag("--no-publish")) {
  try {
    step(`npm account: ${run("npm", npmArgs(["whoami"]))}`);
  } catch {
    fail("Not logged in to npm. Run `npm login`, or set NPM_TOKEN, or pass --no-publish.");
  }
}

// ---- release ----------------------------------------------------------------------------------------------------------------
doIt("Regenerating docs (API reference, changelog, COMPONENTS.md)", () => {
  for (const s of ["gen-api-docs", "gen-changelog", "gen-ai-reference"]) run("node", [`scripts/${s}.mjs`], { stdio: "inherit" });
});

let version = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8")).version;
if (dry) {
  step(`Would bump ${version} with "${bump}"`);
} else {
  step(`Bumping the version (${bump})`);
  const bumpArgs = ["version", bump, "--no-git-tag-version", ...(bump === "prerelease" ? ["--preid", "alpha"] : [])];
  version = run("npm", bumpArgs).replace(/^v/, "");
  console.log(`  → ${version}`);
}

// The version number is written into COMPONENTS.md, so regenerate it once more after the bump.
doIt("Refreshing COMPONENTS.md with the new version", () => run("node", ["scripts/gen-ai-reference.mjs"], { stdio: "inherit" }));
doIt("Type-checking", () => run("npx", ["tsc", "-b"], { stdio: "inherit" }));
doIt("Building the package", () => {
  run("npm", ["run", "clean"], { stdio: "inherit" });
  run("npm", ["run", "build:pkg"], { stdio: "inherit" });
});
doIt(`Committing "Release ${version}" and tagging v${version}`, () => {
  run("git", ["add", "-A"]);
  run("git", ["commit", "-m", `Release ${version}`]);
  run("git", ["tag", `v${version}`]);
});

if (!flag("--no-publish")) {
  const pre = version.includes("-");
  doIt(`Publishing ${version} (tag: latest${pre ? " + alpha" : ""})`, () => {
    run("npm", npmArgs(["publish", "--tag", "latest"]), { stdio: "inherit" });
    if (pre) run("npm", npmArgs(["dist-tag", "add", `lojee-ui@${version}`, "alpha"]), { stdio: "inherit" });
  });
}

if (!flag("--no-push")) {
  doIt("Pushing the commit and tag to origin", () => {
    const r = spawnSync("git", ["push", "origin", "main", `v${version}`], { cwd: root, stdio: "inherit" });
    if (r.status !== 0) console.log("\n! The push failed (no credentials here?). Push it yourself:  git push origin main --tags");
  });
}

console.log(dry ? "\nDry run finished — nothing was changed." : `\n✔ Released ${version}. Check:  npm view lojee-ui dist-tags`);
