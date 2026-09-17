# AURENYX hardening review

Date: 2026-09-17. Baseline: `a035c546685de0feb79bca80ec3198b5213af96b`,
public manifest version **1.0.2**. Working branch: `refine/enterprise-hardening`.

**Status: implementation complete; native release acceptance pending.**
No release, version tag, merge, remote push or publication was performed.
Manifest identity, minimum app version and release history are unchanged.

## Assessment

The baseline expresses Cognitive Cartography through a coherent palette,
restrained surfaces and named perspectives. Its main weakness is implementation
discipline, rather than lack of styling. Repeated literals bypassed brand tokens;
direct component rules overrode native geometry and preference handling. The
existing lint passed despite these issues. The patch reduces CSS rules from
108 to 52 and direct declarations from 184 to 62, moving shared behavior into
native variables. This is an architecture count, not a measured speedup.

Confirmed source-level gaps:

- Light-mode faint text `#74736F` on Ivory is about 4.13:1. Light-mode callout
  titles used dark-mode brand accents; Brass on Ivory is about 2.34:1 before tint.
- Direct text/code font assignments bypassed Obsidian's resolved user fonts.
- The active-tab `::after` competed with native tab-curve geometry.
- Search highlighted the entire result row at rest, obscuring matched text.
- Tag borders ignored CodeMirror's split hashtag segments. Tables forced
  separate borders and clipped overflow around native editing affordances.
- Broad `.internal-embed` styling affected media as well as text transclusions.
- Direct button colors could override native loading-state text; Canvas group
  foreground tokens were reversed. Selection/drag shadows were partially replaced.
- The generic focus rule set only outline color/offset; native `outline: none`
  could still leave controls without that outline.
- Print reset only a few colors, leaving dark syntax/table/callout tokens behind.
- The reduced-motion blanket stopped all animations after one near-zero frame,
  including useful loading feedback.
- npm package/lock version 1.0.0 disagreed with manifest 1.0.2.

## Implemented refinements

| Area | Change and material benefit |
| --- | --- |
| Tokens and contrast | Retain all seven brand swatches and existing surface palette. Reuse brand tokens; add mode-specific ink shades for small colored text. Strengthen faint text, control boundaries and Graph lines. |
| Typography | Use native heading, title, line-height and font-role variables. Respect UI/body/monospace preferences. Serif remains an editorial role; relative content sizing follows Obsidian. |
| Workspace and search | Move the active accent inside the tab without touching native pseudo-elements. Restore native layout, resize behavior and matched-text highlighting. Active navigation markers support RTL. |
| Properties, tables and tags | Add property-panel inset through metadata variables. Keep native table geometry, selection handles and joined tag segments. Use shared code-border variables in both modes. |
| Semantic callouts | Preserve all ten names and icons, including `decision`. Use adaptive colors and predictable normal compositing. Give decisions a neutral field and stronger start edge; restrict serif styling to their direct titles so nested perspectives stay independent. |
| Native behavior | Restore Canvas selection/drag/focus shadows and foreground semantics. Scope text embed styling. Preserve button loading states by setting the native text slot. Restore native scrollbar sizing. |
| Focus and motion | Add explicit 2px keyboard outlines, system Highlight in forced colors, and targeted reduced-motion behavior that preserves progress feedback. |
| Print | Resolve light content colors from either source mode, including syntax, tags, tables and semantic callouts. Keep native print layout. |
| Validation and release hygiene | Make duplicate selectors/declarations and `!important` lint errors, disallow lint warnings, add static contrast/contracts validation to existing CI. Align development package metadata with current 1.0.2; mark package private. No dependency changes. |

## Validation and evidence limits

- Baseline Stylelint: passed; this alone did not detect the product defects.
- Candidate `npm run check`: strict lint and static validation pass. Exact pair
  count and minimum ratios are printed by the validator; see the final run below.
- Node syntax and `git diff --check`: pass.
- CSS compared against the original **Obsidian desktop 1.13.7 app.css** and
  current developer documentation. The repository's supplied dark/light
  screenshots and Corporate Design Preview v0.2 were visually inspected.
- No native Obsidian session was available. A browser attempt to open a local
  component fixture was rejected by browser security policy. No alternative
  browser route was used; no rendered candidate screenshot or interaction pass
  is claimed. Original Obsidian CSS and font assets are not redistributed.
- The minimum 1.13.0 release asset was unavailable at the queried public release
  endpoint. Minimum-version execution remains part of native acceptance.

The gate uses unrounded thresholds of 4.5:1 for ordinary text and 3:1 for tested
control/Graph colors, following [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
It covers default opaque text/surfaces, single 10% callout tints
on reading/panel surfaces, control colors and print token parity. It does not
execute the CSS cascade or Graph renderer. Arbitrary nested tints, selected
syntax, custom accents/snippets, third-party plugin states, native mobile UI,
high-DPI rendering, assistive technology and actual PDF output require native
verification. Decorative separators remain deliberately quieter than controls.
This is **not a full WCAG-conformance claim**.

Follow [QA.md](QA.md) before authorizing release. The semantic distinctions are
labels, icons, typography and structure as well as color; no generated status
claims or automatic decisions were added.

## Release recommendation

Recommended bump: **1.0.2 → 1.0.3 (patch)**, after native acceptance. These are
compatibility, contrast and consistency fixes, with no new public configuration
or removed convention. Keep the current version during review. The CSS header
no longer duplicates a stale version; manifest/package metadata remain canonical.

Suggested title: **AURENYX 1.0.3 — Cognitive Cartography, refined**

Draft release notes:

> AURENYX 1.0.3 strengthens everyday clarity while preserving Cognitive
> Cartography's identity and familiar dark/light palette.
>
> - Improve text, callout and control contrast in both modes, with clearer
>   keyboard focus and more legible Graph connections.
> - Bring editor and reading typography closer together while respecting
>   Obsidian's font settings.
> - Refine properties spacing and restore native tab, search, table, tag,
>   Canvas and media behavior.
> - Make human decisions visibly distinct from advisory synthesis, keeping
>   every existing AURENYX callout and alias compatible.
> - Improve print color consistency and reduced-motion handling, and add
>   repeatable contrast and release-contract checks.
>
> No note migration is required. Requires Obsidian 1.13.0 or newer.

Suggested commit message:

```text
fix(theme): harden contrast, native behavior and semantic hierarchy
```

## Final diff review: user-visible changes

No vault files, note syntax, callout identifiers, commands, theme name or minimum
Obsidian version change. No runtime code, network request, asset or dependency
is added. All changes are reversible by restoring the previous theme CSS.

Visual expectations do change deliberately:

- Colored text/callout titles are lighter in dark mode and darker in light mode;
  faint labels, unresolved links and Graph edges are more visible.
- Callouts use normal blending, so nested tints can look different. Decisions
  have a neutral background and stronger edge. They do not imply acceptance.
- User font overrides now apply where direct rules previously blocked them.
  H4–H6 weights become 600; tags grow from 0.82em to 0.875em. Inline titles
  reliably receive the intended serif role through the native token.
- Properties have more inset; code uses a shared 1px boundary. Tables lose the
  forced rounded/clipped outer frame, and inline media lose the extra frame.
- Active tabs use an internal line. Search backgrounds, scrollbar dimensions,
  Canvas colored outlines and loading indicators return to native behavior.
- Native accent fallbacks now default to Brass. Existing explicitly assigned
  Canvas/group colors remain intact; custom accent/snippet combinations need QA.
- Focus rings/control edges are stronger. Print colors and reduced-motion
  transitions change. Neither native operation was executed in this environment.

Potential workflow impact is confined to layout/appearance, user font choices,
native state visibility and development validation. `npm run check` now fails
on contract/contrast problems or lint warnings; npm publication is disabled by
`private: true`. The existing tag-triggered release workflow was not changed.

## Sources

- Brand authority: supplied **AURENYX Corporate Design Run1 Preview v0.2**,
  especially Brand Board, Desktop AI Interface and Governance (pp. 5, 7, 11).
- Implementation authority: repository baseline and supplied screenshots.
- [Obsidian color contracts](https://github.com/obsidianmd/obsidian-developer-docs/blob/main/en/Reference/CSS%20variables/Foundations/Colors.md): 1.13 uses CSS colors/OKLCH; deprecated RGB channels were deliberately not reintroduced.
- [Native callout variables](https://github.com/obsidianmd/obsidian-developer-docs/blob/main/en/Reference/CSS%20variables/Editor/Callout.md) and [typography variables](https://github.com/obsidianmd/obsidian-developer-docs/blob/main/en/Reference/CSS%20variables/Foundations/Typography.md) guide the variable-first changes.
- Native stylesheet: official desktop 1.13.7 release, `app.css` SHA-256
  `f612f1e8f36486fa57f3b8bd45f0c848409d5b168002e757a13c6d286a7b4c41`.

## Final automated run

Executed on Node **24.19.0** / npm **11.9.0**:

| Check | Result |
| --- | --- |
| `npm ci --ignore-scripts --no-audit --no-fund` | Pass; 168 development packages installed from lockfile |
| `npm run check` | Pass; zero Stylelint errors/warnings, 298 contrast pairs, ten public callouts, immutable swatches/name and version alignment |
| `node --check scripts/validate-theme.mjs` and `node --check version-bump.mjs` | Pass |
| `git diff --check` | Pass |
| Native stylesheet root-token specificity comparison | No remaining body-token conflicts with native `.theme-light` / `.theme-dark` rules |
| Locked dependency comparison | No package dependency entries changed |
| Manifest, version history, release workflow | Byte-for-byte unchanged |

| Tested group | Lowest ratio |
| --- | ---: |
| Dark text | 4.60:1 |
| Light text | 4.61:1 |
| Dark controls / Graph tokens | 5.02:1 |
| Light controls / Graph tokens | 3.67:1 |
| Print text tokens | 5.35:1 |

The existing GitHub Actions matrix (Node 22/24/26) now calls `npm run check`.
It has not run remotely because this patch has not been pushed. Local execution
was on Node 24 only. npm emitted a host-environment `http-proxy` configuration
warning; it is unrelated to the theme and not a Stylelint warning.
