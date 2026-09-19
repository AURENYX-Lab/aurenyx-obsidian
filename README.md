# AURENYX

**Cognitive Cartography for Obsidian.**

AURENYX is a restrained dark/light Obsidian theme built around structured complexity, visible tension, bounded technology, and explicit human agency.

<p align="center">
  <a href="https://github.com/AURENYX-Lab/aurenyx-obsidian/releases/latest">
    <img src="https://img.shields.io/github/v/release/AURENYX-Lab/aurenyx-obsidian?style=for-the-badge&label=Release&color=B99A58&labelColor=1B2227" alt="Latest release">
  </a>
  <a href="https://github.com/AURENYX-Lab/aurenyx-obsidian/releases">
    <img src="https://img.shields.io/github/downloads/AURENYX-Lab/aurenyx-obsidian/total?style=for-the-badge&label=Downloads&color=4F8F8A&labelColor=1B2227" alt="Downloads">
  </a>
  <a href="https://github.com/AURENYX-Lab/aurenyx-obsidian/stargazers">
    <img src="https://img.shields.io/github/stars/AURENYX-Lab/aurenyx-obsidian?style=for-the-badge&label=Stars&color=B99A58&labelColor=1B2227" alt="GitHub stars">
  </a>
  <a href="https://github.com/AURENYX-Lab/aurenyx-obsidian/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/AURENYX-Lab/aurenyx-obsidian?style=for-the-badge&label=License&color=6689B7&labelColor=1B2227" alt="License">
  </a>
</p>

<p align="center">
  <a href="https://www.buymeacoffee.com/aurenyx">
    <img src="https://img.shields.io/badge/Support_AURENYX-Buy_me_a_coffee-B99A58?style=for-the-badge&logo=buymeacoffee&logoColor=11161A&labelColor=1B2227" alt="Buy me a coffee">
  </a>
</p>

![AURENYX Showcase](screenshots/screenshot.png)

## Preview

| Dark | Light |
| --- | --- |
| ![AURENYX Dark](screenshots/dark.png) | ![AURENYX Light](screenshots/light.png) |

## Design system

- **Obsidian** `#11161A` — primary dark field
- **Carbon** `#1B2227` — panels and structural depth
- **Ivory** `#F2EFE7` — primary text / archival light field
- **Brass** `#B99A58` — human action and focus
- **Teal** `#4F8F8A` — evidence, sources, empathy
- **Coral** `#C86F61` — conflict, exposure, protection
- **Blue** `#6689B7` — strategy and scenario information

Typography follows the AURENYX system:
- Noto Sans — UI and documentation
- Noto Serif — editorial depth and key statements
- Noto Mono — technical / evidence contexts

Fonts are not bundled or downloaded. Installed fonts and system fallbacks are
used; Obsidian's interface, text and monospace font settings remain effective.
Editorial headings retain the serif role. Text shades adapt to light and dark
surfaces while the seven brand swatches above remain unchanged.

## Features

- Dark and light modes
- Editor and reading view
- Workspace, tabs, sidebars and navigation
- Properties / metadata
- Tables, code, tags and tasks
- Canvas and Graph
- Modals, settings and command palette
- Print styling and reduced-motion support
- AURENYX semantic callouts

## Semantic callouts

```md
> [!strategy]
> Strategic perspective or scenario information.

> [!protection]
> Exposure, controls, or protective perspective.

> [!empathy]
> Human impact, capacity, or empathy perspective.

> [!shadow]
> Hidden motive, blind spot, or shadow hypothesis.

> [!evidence]
> Source, observation, datum, or evidentiary basis.

> [!conflict]
> Explicit unresolved conflict or trade-off.

> [!synthesis]
> System synthesis or advisory interpretation.

> [!dissent]
> A view that remains unresolved after synthesis.

> [!human-decision]
> Final human decision or authorization.
```

`[!decision]` is a supported alias for `[!human-decision]`. Decision callouts use
a neutral field, serif title and stronger leading edge to distinguish the
author's decision from advisory synthesis and the Shadow perspective. Use an
explicit title such as `Human decision / deferred` or `Synthesis / advisory`.
The theme does not generate a decision, approval, ownership or status label.
All callouts retain Obsidian's normal folding and nesting syntax.

## Installation

Once accepted into the Obsidian Community Theme directory:

**Settings → Appearance → Themes → Manage → AURENYX**

For manual installation, place `manifest.json` and `theme.css` in:

```text
<Vault>/.obsidian/themes/AURENYX/
```

Requires Obsidian **1.13.0 or newer**. Callout and Canvas colors use the CSS color
format introduced in 1.13; older RGB-tuple snippets may need updating.

## Development and verification

```sh
npm ci
npm run check
```

The check runs strict Stylelint and dependency-free identity, version, callout
and contrast checks. It does not certify full accessibility or replace native
Obsidian testing. Follow the [native acceptance checklist](docs/QA.md) using the
[fixture note](tests/fixture.md) before release. The current
[hardening review](docs/HARDENING_REVIEW.md) records findings, limitations and
draft release notes.

Package, lockfile and manifest versions must agree. This hardening patch keeps
the current release version until the owner prepares the next release; do not
run `npm version` during review, because its default behavior creates a tag.

## Philosophy

AURENYX is intended to behave like a cognitive instrument, not a decorative AI skin:

- structure before spectacle
- color reserved for meaning
- visible boundaries and tensions
- human action remains visually final
- no neon, cyberpunk glow, surveillance imagery, or decorative luxury-gold

## License

Theme source code is released under the MIT License.

The AURENYX name, logo, brand identity, and associated marks are not licensed for use as trademarks by this software license.

## Support AURENYX

If AURENYX improves your Obsidian workspace and you would like to support its
continued development, you can help fund the project:

[![Buy me a coffee](https://img.shields.io/badge/Buy_me_a_coffee-Support_AURENYX-B99A58?style=for-the-badge&logo=buymeacoffee&logoColor=11161A&labelColor=1B2227)](https://www.buymeacoffee.com/aurenyx)

Support is entirely optional. AURENYX remains freely available under the MIT License.
