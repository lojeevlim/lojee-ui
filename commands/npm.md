# Publishing `lojee-ui` to npm (with an access token)

Follow **Step 1 to Step 6** in order, one block at a time, and wait for each to finish before starting the next. Run everything from the project folder (`/Users/lojeelim/Documents/lojee_ui`) on the `main` branch.

- **Package:** `lojee-ui` (public, unscoped), registry https://registry.npmjs.org
- **Published contents:** only `dist/` (`"files": ["dist"]` in `package.json`)
- **Current line:** `0.1.0-alpha.x`, published under the `latest` and `alpha` tags. Right now both point at `0.1.0-alpha.10`, so the next release is `0.1.0-alpha.11`. Check with `npm view lojee-ui dist-tags`.
- Example values (like `npm_EXAMPLE…`) are fake. Replace them with your own.

## Before you start: get a token

npm needs proof that you are allowed to publish. That proof is an access token.

1. Sign in at https://www.npmjs.com, open your avatar menu, then **Access Tokens**.
2. **Generate New Token**, then **Granular Access Token**.
3. Fill in the form:

   | Field | Value |
   | --- | --- |
   | Token name | something recognisable, e.g. `lojee-ui-publish` |
   | Expiration | the shortest that works (7 to 30 days) |
   | Packages and scopes | **Only select packages and scopes**, then pick `lojee-ui` |
   | Permissions | **Read and write** |
   | **Bypass two-factor authentication** | **checked** (otherwise publishing fails with a 403 asking for a code) |

4. **Generate Token** and copy it right away (it starts with `npm_`). npm shows it **once**.

Never paste the token into a chat, a file, a commit or a screenshot. If it ever leaks, delete it on npmjs.com straight away.

## The steps

### 1. Store the token (do this once per terminal window)

```bash
read -s -p "Token: " NPM_TOKEN; echo
export NPM_TOKEN
echo ${#NPM_TOKEN}
```

Paste your token when it shows `Token:`, then press Enter once. Nothing appears while you paste, and that is normal. The last line should print a number above 0.

**Example:**

```
$ read -s -p "Token: " NPM_TOKEN; echo
Token:                      <- paste npm_EXAMPLE0000000000000000000000000000, press Enter
$ export NPM_TOKEN
$ echo ${#NPM_TOKEN}
40                          <- good: a real token is roughly 40 to 90 characters
```

If it prints `0`, the paste did not happen. Run the `read` line again.

`NPM_TOKEN` is only the *name* of the variable. Your real token is typed **once**, here. Every later command just says `$NPM_TOKEN`, a nickname the shell swaps for it, so never put the token itself into a command.

Check that the token works:

```bash
npm whoami --//registry.npmjs.org/:_authToken=$NPM_TOKEN
```

```
lojeevlim                   <- your npm username
```

**Common mistakes:**

| Wrong | Why |
| --- | --- |
| `read -s npm_EXAMPLE0000…` | The token becomes the variable *name*, so nothing is stored. |
| `export NPM_TOKEN=npm_EXAMPLE0000…` | Works, but the token is saved in your shell history. |
| `npm publish --…:_authToken=npm_EXAMPLE0000…` | Same: it ends up in history and on screen. |

### 2. Prepare the new version

```bash
npm run docs:api && npm run docs:changelog
npm version prerelease --preid alpha --no-git-tag-version
npm run docs:ai
```

This changes the version from `alpha.10` to `alpha.11`. Run `docs:ai` after the bump, because the version number is written into `COMPONENTS.md`.

**Example:**

```
$ npm version prerelease --preid alpha --no-git-tag-version
v0.1.0-alpha.11
```

npm never lets you publish the same version twice, so if `alpha.11` already exists on the registry, bump again.

### 3. Check and build

```bash
npx tsc -b
npm run clean
npm run build:pkg
```

- `npx tsc -b` should print nothing.
- A MapLibre `import.meta` warning during the build is harmless.
- `dist/` should now contain `index.js`, `index.cjs`, `elements.js`, `theme.css` and a `lib/` folder with the type declarations.
- Optional: `npm pack --dry-run` lists exactly what would be uploaded. It should be only `dist/…`, `package.json` and `README.md`: no `src/`, `.env` or tokens.

> `npm run build` is **not** the package build. It builds the demo/docs site.

### 4. Save and tag it in git

```bash
git add -A
git commit -m "Release 0.1.0-alpha.11"
git tag v0.1.0-alpha.11
```

### 5. Publish

These are the two commands, with your version filled in. Run them exactly as written, leaving `$NPM_TOKEN` as it is:

```bash
npm publish --tag latest --//registry.npmjs.org/:_authToken=$NPM_TOKEN
npm dist-tag add lojee-ui@0.1.0-alpha.11 alpha --//registry.npmjs.org/:_authToken=$NPM_TOKEN
```

The first one uploads `alpha.11` as `latest`. The second also tags it `alpha`, so both tags move from `alpha.10` to `alpha.11`. If the first one fails, **stop** and do not run the second.

**Example output:**

```
$ npm publish --tag latest --//registry.npmjs.org/:_authToken=$NPM_TOKEN
...
+ lojee-ui@0.1.0-alpha.11

$ npm dist-tag add lojee-ui@0.1.0-alpha.11 alpha --//registry.npmjs.org/:_authToken=$NPM_TOKEN
+alpha: lojee-ui@0.1.0-alpha.11
```

`npm publish` also runs `prepublishOnly` (a clean plus a full build) first, so it takes longer than the upload itself.

### 6. Push to GitHub and check

```bash
git push origin main --tags
npm view lojee-ui dist-tags
```

If `git push` asks for a login, push from GitHub Desktop instead. The registry can take a few minutes to show the new version.

**Example output** (after a few minutes):

```
{ latest: '0.1.0-alpha.11', alpha: '0.1.0-alpha.11' }
```

## Afterwards: clean up

```bash
unset NPM_TOKEN
```

Then delete the token on npmjs.com (**Access Tokens**, **Delete**) unless you will publish again soon.

## One-command alternative

`npm run release` does steps 2 to 6 for you and reads the same `NPM_TOKEN` variable. Preview it first:

```bash
npm run release -- --dry-run
npm run release
```

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `ENEEDAUTH` / `E401` | The token variable is empty, the token is wrong, or it expired or was revoked | Run `echo ${#NPM_TOKEN}`. If it is `0`, redo Step 1. Otherwise create a new token. |
| `E403 … Two-factor authentication or granular access token with bypass 2fa enabled is required` | The token was created without **Bypass two-factor authentication** | Delete it and create one with the box checked |
| `EOTP` | npm wants a one-time code, so the token cannot bypass 2FA | Same fix as the line above |
| `E403` / `E404` on publish | The token is read-only or scoped to other packages | Create it again with **Read and write** on `lojee-ui` |
| `E403 … You cannot publish over the previously published versions` | That version already exists | Bump the version again (Step 2) |
| `prepublishOnly` fails | Build or type error | Run `npm run build:pkg` and fix the error (Step 3) |
| `npm view` still shows the old version | The registry lags | Wait a few minutes and run it again |
| Consumers see no styles | They did not import the theme | They need `import "lojee-ui/theme.css"` once, in a Tailwind v4 project |

## Reference

### Dist-tags: what users get

A dist-tag is a movable label that points at a version.

| Install command | Resolves to |
| --- | --- |
| `npm install lojee-ui` | the `latest` tag |
| `npm install lojee-ui@alpha` | the `alpha` tag |
| `npm install lojee-ui@0.1.0-alpha.10` | that exact version |

To move a tag without publishing:

```bash
npm dist-tag add lojee-ui@0.1.0-alpha.11 latest --//registry.npmjs.org/:_authToken=$NPM_TOKEN
npm dist-tag ls lojee-ui
```

Once there is a stable `1.0.0`, publish it **without** `--tag` so it becomes `latest` normally. To publish a prerelease **without** touching `latest`, use `--tag alpha` only.

### Fixing mistakes

| Situation | What to do |
| --- | --- |
| Published a broken version | Publish a fixed next version and point the tags at it. Do not rely on unpublishing. |
| Want to warn people off a version | `npm deprecate lojee-ui@0.1.0-alpha.10 "Use 0.1.0-alpha.11" --//registry.npmjs.org/:_authToken=$NPM_TOKEN` |
| Wrong tag on a version | `npm dist-tag add lojee-ui@<version> <tag> --//registry.npmjs.org/:_authToken=$NPM_TOKEN` |
| Published within the last 72 hours and need it gone | `npm unpublish lojee-ui@<version> --//registry.npmjs.org/:_authToken=$NPM_TOKEN`. The version number is **still burned** and can never be reused. |

### Test a release from a fresh project

Do not link this repo; install the published package:

```bash
mkdir /tmp/lojee-smoke && cd /tmp/lojee-smoke
npm init -y
npm install lojee-ui@latest react react-dom lucide-react tailwindcss
```

```ts
import { Button } from "lojee-ui";
import "lojee-ui/theme.css";
import "lojee-ui/elements"; // Web Components entry
```

### Release history

| Version | Notes |
| --- | --- |
| `0.1.0-alpha.0` | First publish. |
| `0.1.0-alpha.1` | Published earlier. |
| `0.1.0-alpha.2` | Sidebar tooltip props, hairline auto-hide scrollbar, JS/Vue/Angular samples for App layout and custom map markers, collapsible playground code bar. |
| `0.1.0-alpha.3` | Skipped, never published. |
| `0.1.0-alpha.4` to `0.1.0-alpha.10` | Published. `alpha.10` is the current `latest` and `alpha`. |
