# Publishing `lojee-ui` to npm (with an access token)

One linear guide: follow **Step 1, Step 2, Step 3…** in order. It reflects how `0.1.0-alpha.2` was actually shipped, including the problems we hit.

- **Package:** `lojee-ui` (public, unscoped)
- **Registry:** https://registry.npmjs.org
- **Published contents:** only `dist/` (`"files": ["dist"]` in `package.json`)
- **Entry points:** `.` (React library), `./elements` (Web Components bundle), `./theme.css`
- **Current line:** `0.1.0-alpha.x` (prerelease, published under the `alpha` dist-tag)

**Why a token?** The registry refuses to publish without two-factor proof, and a plain `npm login` is not enough. You get:

```
npm error 403 Forbidden - PUT https://registry.npmjs.org/lojee-ui
Two-factor authentication or granular access token with bypass 2fa enabled is required to publish packages.
```

A granular token with "Bypass two-factor authentication" avoids typing a one-time code every time. (If you prefer a code, see the note at the end of Step 13.)

**What `npm publish` does by itself:** it runs `prepublishOnly` = `npm run clean && npm run build:pkg` (library build, type declarations, copy of `theme.css`, and the Web Components bundle) before uploading. `npm run build` is **not** the package build; it builds the demo/docs site.

---

## Part A: Build and check the package first

Build before anything else and look at the output yourself. Nothing later in this guide works if the package does not build.

### Step 1: Build the package first

`npm publish` also builds automatically (`prepublishOnly`), but if that hidden build fails the publish aborts after you have already prepared everything. Building first lets you catch problems early and inspect `dist/`.

```bash
npm run clean        # remove any old dist/ so nothing stale ships
npm run build:pkg    # runs build:lib, then build:elements
```

What each part does:

| Script | What it does |
| --- | --- |
| `build:lib` | Vite library build (`vite.lib.config.ts`), emits type declarations (`tsconfig.lib.json`) and copies `src/theme.css` to `dist/theme.css` |
| `build:elements` | Vite build of the Web Components bundle (`vite.elements.config.ts`) into `dist/elements.js` |

Check the result:

```bash
ls dist | head -20
ls dist/*.d.ts dist/theme.css dist/elements.js
```

Look for:
- `✓ built in …` at the end of **both** Vite runs, and no TypeScript errors
- `dist/index.js` and `dist/index.cjs` (the `.` entry), `dist/elements.js`, `dist/theme.css`, and `.d.ts` type files

> Do **not** use `npm run build` for this. That builds the demo/docs site (and regenerates API docs and the changelog), not the package.

If the build fails, fix it and rerun this step. Do not continue until it passes.

### Step 2: Type-check and lint

```bash
npx tsc --noEmit -p tsconfig.app.json
npm run lint
```

Both should print nothing. Fix any errors, then rebuild (Step 1) if you changed code.

---

## Part B: Get a token ready

### Step 3: Create the access token on npmjs.com

1. Sign in at https://www.npmjs.com and open your avatar menu, then **Access Tokens**.
2. Click **Generate New Token**, then **Granular Access Token**.
3. Fill in the form:

   | Field | Value |
   | --- | --- |
   | Token name | something recognisable, e.g. `lojee-ui-publish-2026-10` |
   | Expiration | the shortest that works (7 to 30 days). A short-lived token limits the damage if it leaks. |
   | Packages and scopes | **Only select packages and scopes**, then pick `lojee-ui` |
   | Permissions | **Read and write** |
   | Organizations | no access needed |
   | **Bypass two-factor authentication** | **checked.** Without this the publish still fails with the 403 above. |

4. Click **Generate Token** and copy the value (it starts with `npm_`). npm shows it **once**. If you lose it, delete it and create a new one.

### Step 4: Keep the token out of files and chat

- Never paste it into a chat, issue, commit message, screenshot or log.
- Never put it in the repo's `.npmrc` or in `package.json`.
- Use it only through a shell variable and a temporary file (Steps 5 and 6), then delete both (Step 14).

### Step 5: Put the token in a shell variable

In your terminal:

```bash
read -rs NPM_TOKEN      # paste the token, press Enter; nothing is echoed or saved to history
export NPM_TOKEN
```

Check it is set without printing it:

```bash
[ -n "$NPM_TOKEN" ] && echo "token set (${#NPM_TOKEN} chars)"
```

### Step 6: Create a temporary npm config that uses the token

```bash
TMP_NPMRC="$(mktemp)"
printf '//registry.npmjs.org/:_authToken=%s\n' "$NPM_TOKEN" > "$TMP_NPMRC"
```

This file exists only for this release. Passing `--userconfig "$TMP_NPMRC"` to npm commands (below) makes npm use it instead of your normal `~/.npmrc`, so your regular login is untouched. Plain `npm whoami` without the flag will still say you are not logged in; that is expected.

### Step 7: Confirm the token works

```bash
npm whoami --userconfig "$TMP_NPMRC"
```

- Prints your username: good, continue.
- `E401`: the token was copied wrongly, expired or revoked. Go back to Step 3.

---

## Part C: Prepare the release

Work from a clean tree on the branch you are releasing from.

### Step 8: Make sure the work is merged and the tree is clean

```bash
git status --short          # should print nothing
git branch --show-current
```

Normal flow in this repo is feature branch, then `develop`, then `main`:

```bash
git checkout develop && git pull --ff-only
git merge --no-ff <feature-branch>
git push origin develop

git checkout main && git pull --ff-only
git merge --no-ff develop
git push origin main
```

### Step 9: Check what is already on the registry

```bash
npm view lojee-ui versions --json
npm view lojee-ui dist-tags --json
```

**npm never lets you publish the same version twice**, even after unpublishing. If the version in `package.json` is already listed, bump it in Step 10. This is the most common surprise: `alpha.1` was already published when we meant to ship, so we released `alpha.2`.

### Step 10: Bump the version

```bash
npm version 0.1.0-alpha.3 --no-git-tag-version
```

- `--no-git-tag-version` edits `package.json` and `package-lock.json` only; you commit it yourself.
- Prerelease versions look like `MAJOR.MINOR.PATCH-alpha.N`. To just increment the alpha number: `npm version prerelease --preid=alpha --no-git-tag-version`.

Commit and push the bump:

```bash
git add package.json package-lock.json
git commit -m "Release 0.1.0-alpha.3"
git push
```

### Step 11: (If components or props changed) regenerate docs and changelog

```bash
npm run docs:api
npm run docs:changelog
```

Commit any changes under `src/generated/` before releasing. (`npm run build` also does this, but the package build does not.)

### Step 12: Dry run: see exactly what will ship

```bash
npm pack --dry-run
```

Check that:
- the file list is only `dist/…`, `package.json`, `README.md`, `LICENSE`
- there is no `src/`, `.env`, tokens, demo files or `node_modules`
- `dist/theme.css`, `dist/elements.js` and the type declarations (`*.d.ts`) are present
- the size looks sensible (about 1 MB for `alpha.2`)

---

## Part D: Publish and clean up

### Step 13: Publish

```bash
npm publish --tag alpha --userconfig "$TMP_NPMRC"
```

- **Always pass `--tag`** for prereleases. Without it, npm moves `latest` to the new alpha.
- `prepublishOnly` runs the full clean and build first, so it takes longer than the upload itself.
- Success ends with:

  ```
  + lojee-ui@0.1.0-alpha.3
  ```

  npm may say the package "may take a few minutes to become available". That is normal.

> **Using a one-time code instead of a token:** skip Steps 3 to 7 and run `npm login`, then `npm publish --tag alpha --otp=<6-digit code>` (type the command first and the code last; it expires in about 30 seconds).

### Step 14: Clean up straight away

```bash
rm -f "$TMP_NPMRC"
unset NPM_TOKEN TMP_NPMRC
```

Then check nothing leaked:

```bash
git status --short                      # should be empty
grep -rn "npm_" ~/.npmrc 2>/dev/null    # should find nothing you did not put there
```

### Step 15: Revoke the token

If you will not publish again soon, delete it: npmjs.com, **Access Tokens**, **Delete** next to the token. If it was ever exposed (pasted in chat, a screenshot, a log), revoke it **immediately**, even if it has not expired.

---

## Part E: Verify the release

### Step 16: Check the registry

```bash
npm view lojee-ui dist-tags
npm view lojee-ui@alpha version
```

(These read public data, so no token is needed.)

### Step 17: Test it from a fresh scratch project

Do not link this repo; install the published package:

```bash
mkdir /tmp/lojee-smoke && cd /tmp/lojee-smoke
npm init -y
npm install lojee-ui@alpha react react-dom lucide-react tailwindcss
```

Check the imports resolve and the types load:

```ts
import { Button } from "lojee-ui";
import "lojee-ui/theme.css";
import "lojee-ui/elements"; // Web Components entry
```

### Step 18: Tag the release in git (recommended)

```bash
git tag v0.1.0-alpha.3
git push origin v0.1.0-alpha.3
```

---

## Reference

### Dist-tags: what users get

A dist-tag is a movable label that points at a version.

| Install command | Resolves to |
| --- | --- |
| `npm install lojee-ui` | the `latest` tag |
| `npm install lojee-ui@alpha` | the `alpha` tag |
| `npm install lojee-ui@0.1.0-alpha.2` | that exact version |

Right now `latest` is still `0.1.0-alpha.0`, because every release used `--tag alpha`. To make a plain `npm install lojee-ui` get a given alpha (needs the token, so pass `--userconfig "$TMP_NPMRC"` and do it before Step 14):

```bash
npm dist-tag add lojee-ui@0.1.0-alpha.2 latest --userconfig "$TMP_NPMRC"
npm dist-tag ls lojee-ui
```

Once there is a stable `1.0.0`, publish it **without** `--tag` so it becomes `latest` normally.

### Fixing mistakes

| Situation | What to do |
| --- | --- |
| Published a broken version | Publish a fixed next version and point the tag at it. Do not rely on unpublishing. |
| Want to warn people off a version | `npm deprecate lojee-ui@0.1.0-alpha.2 "Use 0.1.0-alpha.3" --userconfig "$TMP_NPMRC"` |
| Wrong tag on a version | `npm dist-tag add lojee-ui@<version> <tag> --userconfig "$TMP_NPMRC"` |
| Published within the last 72 hours and need it gone | `npm unpublish lojee-ui@<version> --userconfig "$TMP_NPMRC"`. The version number is **still burned** and can never be reused. |

### Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `E401` on `npm whoami --userconfig …` | Wrong or truncated token, or it expired | Re-copy it, or create a new one (Step 3) |
| `E403 … Two-factor authentication or granular access token with bypass 2fa enabled is required` | Token created without **Bypass two-factor authentication** | Delete it and create one with the box checked |
| `E403` / `E404` on publish with a valid token | Token is scoped to other packages, or is read-only | Recreate it with **Read and write** on `lojee-ui` |
| `E403 … You cannot publish over the previously published versions` | That version already exists | Bump the version (Step 10) |
| Publish asks for an OTP | npm is using your normal config, not the token file | Make sure `--userconfig "$TMP_NPMRC"` is on the publish command |
| `EPUBLISHCONFLICT` or similar after a retry | The first attempt actually succeeded | Run `npm view lojee-ui versions` before retrying |
| `prepublishOnly` fails | Build or type error | Run `npm run build:pkg` and fix the error (Step 1) |
| Prerelease refused without a tag | npm requires an explicit `--tag` for prereleases | Add `--tag alpha` |
| Consumers see no styles | They did not import the theme | `import "lojee-ui/theme.css"` once, in a Tailwind v4 project |

### Quick reference (copy-paste)

```bash
# Steps 1-2: build and check first
npm run clean && npm run build:pkg
npx tsc --noEmit -p tsconfig.app.json && npm run lint

# Steps 5-7: token
read -rs NPM_TOKEN && export NPM_TOKEN
TMP_NPMRC="$(mktemp)" && printf '//registry.npmjs.org/:_authToken=%s\n' "$NPM_TOKEN" > "$TMP_NPMRC"
npm whoami --userconfig "$TMP_NPMRC"

# Steps 8-10: clean tree, registry check, bump
git status --short && git branch --show-current
npm view lojee-ui versions --json && npm view lojee-ui dist-tags --json
npm version prerelease --preid=alpha --no-git-tag-version
git add package.json package-lock.json && git commit -m "Release $(node -p 'require("./package.json").version')" && git push

# Step 12: dry run
npm pack --dry-run

# Step 13: publish
npm publish --tag alpha --userconfig "$TMP_NPMRC"

# Step 14: clean up
rm -f "$TMP_NPMRC"; unset NPM_TOKEN TMP_NPMRC

# Step 16: confirm
npm view lojee-ui dist-tags
```

### Release history

| Version | Notes |
| --- | --- |
| `0.1.0-alpha.0` | First publish. Still the `latest` tag. |
| `0.1.0-alpha.1` | Published earlier. |
| `0.1.0-alpha.2` | Sidebar tooltip props, hairline auto-hide scrollbar, JS/Vue/Angular samples for App layout and custom map markers, collapsible playground code bar. Tagged `alpha`. |
