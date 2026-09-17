/** Static release-contract and WCAG contrast checks; no browser/app claim.
 * Color checks resolve the theme's flat root token blocks and use sRGB alpha
 * compositing for Obsidian 1.13's color + transparent callout backgrounds.
 * They do not simulate the CSS cascade, arbitrary nesting or user snippets.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(resolve(root, path), "utf8");
const json = (path) => JSON.parse(read(path));
const css = read(process.argv[2] || "theme.css").replace(/\/\*[\s\S]*?\*\//g, "");
const manifest = json("manifest.json");
const pkg = json("package.json");
const lock = json("package-lock.json");
assert.equal(manifest.name, "AURENYX", "The public theme name is immutable");
assert.equal(pkg.version, manifest.version, "Package and theme versions must agree");
assert.equal(lock.version, pkg.version, "Lockfile version must agree");
assert.equal(lock.packages[""].version, pkg.version);
assert.equal(lock.packages[""].name, pkg.name);
assert.equal(json("versions.json")[manifest.version], manifest.minAppVersion);
assert(!/@import\b|@font-face\b|url\s*\(/i.test(css), "Theme must remain asset-free");

// This deliberately rejects unsupported token syntax rather than estimating it.
function block(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`(?:^|})\\s*${escaped}\\s*\\{([^{}]*)}`, "m"));
  assert(match, `Missing flat rule: ${selector}`);
  return Object.fromEntries([...match[1].matchAll(/(--[\w-]+):\s*([^;]+);/g)]
    .map((m) => [m[1], m[2].trim()]));
}
const common = block("body");
for (const [name, hex] of Object.entries({ obsidian: "#11161A", carbon: "#1B2227",
  ivory: "#F2EFE7", brass: "#B99A58", teal: "#4F8F8A", coral: "#C86F61", blue: "#6689B7" })) {
  assert.equal(common[`--aurenyx-${name}`], hex, `Brand swatch changed: ${name}`);
}
function value(tokens, name, seen = new Set()) {
  assert(!seen.has(name), `Circular token: ${name}`);
  seen.add(name);
  const raw = tokens[name];
  assert(raw !== undefined, `Unresolved token: ${name}`);
  const ref = raw.match(/^var\((--[\w-]+)\)$/);
  return ref ? value(tokens, ref[1], seen) : raw;
}
function color(tokens, name) {
  const hex = value(tokens, name);
  assert(/^#[\da-f]{6}$/i.test(hex), `Unsupported color: ${name} = ${hex}`);
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}
const luminance = (rgb) => rgb.map((v) => v / 255)
  .map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a, b) => {
  const [lo, hi] = [luminance(a), luminance(b)].sort((x, y) => x - y);
  return (hi + 0.05) / (lo + 0.05);
};
const composite = (fg, bg, alpha) => fg.map((c, i) => c * alpha + bg[i] * (1 - alpha));
const failures = [];
let count = 0;
const minima = new Map();
function check(label, foreground, background, threshold) {
  const ratio = contrast(foreground, background);
  count++;
  const group = `${label.split("/")[0]} ${threshold === 4.5 ? "text" : "controls"}`;
  if (ratio < (minima.get(group)?.ratio ?? Infinity)) minima.set(group, { ratio, label });
  if (ratio < threshold) failures.push(`${label}: ${ratio.toFixed(2)} < ${threshold}:1`);
}

const roles = ["strategy", "protection", "empathy", "shadow", "evidence",
  "conflict", "synthesis", "dissent", "human-decision", "decision"];
const publicCallouts = new Map();
// Grouped aliases are intentional. Look up each public selector within a rule.
for (const role of roles) {
  const rule = [...css.matchAll(/([^{}]+)\{([^{}]*)}/g)]
    .find((m) => m[1].split(",").some((s) => s.trim() === `.callout[data-callout="${role}"]`));
  assert(rule, `Missing public callout: ${role}`);
  const tokens = Object.fromEntries([...rule[2].matchAll(/(--[\w-]+):\s*([^;]+);/g)]
    .map((m) => [m[1], m[2].trim()]));
  assert(tokens["--callout-icon"]?.startsWith("lucide-"), `Missing icon: ${role}`);
  publicCallouts.set(role, tokens);
}
assert.deepEqual(publicCallouts.get("decision"), publicCallouts.get("human-decision"));

for (const mode of ["dark", "light"]) {
  const tokens = { ...common, ...block(`.theme-${mode}`) };
  const rgb = (name) => color(tokens, `--${name}`);
  const surfaces = ["background-primary", "background-primary-alt", "background-secondary", "background-secondary-alt"];
  for (const foreground of ["text-normal", "text-muted", "text-faint", "text-error",
    "text-warning", "text-success", "text-accent", "text-accent-hover", "link-color",
    "link-color-hover", "link-external-color", "link-external-color-hover"]) {
    for (const bg of surfaces) check(`${mode}/${foreground}/${bg}`, rgb(foreground), rgb(bg), 4.5);
  }
  for (const fg of ["code-normal", "code-comment", "code-function", "code-important",
    "code-keyword", "code-operator", "code-property", "code-punctuation", "code-string", "code-tag", "code-value"]) {
    check(`${mode}/${fg}`, rgb(fg), rgb("code-background"), 4.5);
  }
  for (const bg of surfaces) {
    check(`${mode}/focus/${bg}`, rgb("background-modifier-border-focus"), rgb(bg), 3);
    check(`${mode}/unresolved/${bg}`, composite(rgb("link-unresolved-color"), rgb(bg),
      Number(value(tokens, "--link-unresolved-opacity"))), rgb(bg), 4.5);
  }
  for (const bg of ["background-primary", "background-modifier-form-field", "background-secondary"]) {
    check(`${mode}/checkbox/${bg}`, rgb("checkbox-border-color"), rgb(bg), 3);
    check(`${mode}/input/${bg}`, rgb("aurenyx-control-border"), rgb(bg), 3);
  }
  check(`${mode}/tag`, rgb("tag-color"), rgb("tag-background"), 4.5);
  check(`${mode}/tab`, rgb("tab-text-color"), rgb("tab-container-background"), 4.5);
  check(`${mode}/status`, rgb("status-bar-text-color"), rgb("status-bar-background"), 4.5);
  check(`${mode}/graph-line`, rgb("graph-line"), rgb("background-primary"), 3);
  for (const state of ["interactive-accent", "interactive-accent-hover"]) {
    check(`${mode}/native-accent/${state}`, rgb("text-on-accent"), rgb(state), 4.5);
  }
  check(`${mode}/warning-button`, rgb("aurenyx-obsidian"), rgb("aurenyx-coral"), 4.5);
  const group = { ...tokens, ...block(".canvas-group-label") };
  check(`${mode}/canvas-light-foreground`, color(group, "--text-on-accent"), rgb("aurenyx-obsidian"), 4.5);
  check(`${mode}/canvas-dark-foreground`, color(group, "--text-on-accent-inverted"), rgb("aurenyx-ivory"), 4.5);
  for (const [role, callout] of publicCallouts) {
    const foreground = color({ ...tokens, ...callout }, "--callout-color");
    for (const bg of surfaces.slice(0, 3)) {
      const background = ["decision", "human-decision"].includes(role)
        ? rgb("background-primary-alt") : composite(foreground, rgb(bg), 0.1);
      check(`${mode}/callout-${role}/${bg}`, foreground, background, 4.5);
      check(`${mode}/callout-body-${role}/${bg}`, rgb("text-normal"), background, 4.5);
    }
  }
}
// Print from either source mode must resolve to the same light content colors.
const printBlock = css.match(/@media print\s*\{\s*body\.theme-dark,\s*body\.theme-light\s*\{([^{}]*)}/);
assert(printBlock, "Missing mode-independent print tokens");
const printTokens = Object.fromEntries([...printBlock[1].matchAll(/(--[\w-]+):\s*([^;]+);/g)]
  .map((m) => [m[1], m[2].trim()]));
const printDark = { ...common, ...block(".theme-dark"), ...printTokens };
const printLight = { ...common, ...block(".theme-light"), ...printTokens };
for (const name of ["text-normal", "text-muted", "text-faint", "link-color", "link-external-color",
  "code-normal", "code-comment", "code-keyword", "code-string", "code-function",
  "color-blue", "color-red", "color-yellow", "color-cyan"]) {
  const key = `--${name}`;
  assert.equal(value(printDark, key), value(printLight, key), `Print mode drift: ${name}`);
  check(`print/${name}`, color(printDark, key), color(printDark, "--background-primary-alt"), 4.5);
}
for (const [group, { ratio, label }] of minima) console.log(`${group}: minimum ${ratio.toFixed(2)}:1 (${label})`);
assert.equal(failures.length, 0, failures.join("\n"));
console.log(`PASS: identity/version/assets, ${roles.length} public callouts, ${count} contrast pairs.`);
console.log("Scope: default tokens and single callout tint; no native UI, nesting, plugin or WCAG certification claim.");
