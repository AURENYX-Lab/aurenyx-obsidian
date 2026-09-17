# Native acceptance checklist

Use a disposable vault with core plugins enabled, community plugins and custom
CSS snippets initially disabled. Install the candidate under the immutable name
`AURENYX`; compare with baseline `a035c546685de0feb79bca80ec3198b5213af96b`.
Copy [fixture.md](../tests/fixture.md) into the vault. No private data is needed.

Run `npm ci` and `npm run check` first. These checks measure default token
contrast, single callout tints and print token parity, not actual rendering.

Record OS, Obsidian version, installer/Electron version, mode, viewport, display
scale and enabled plugins for each run. Cover the minimum supported version
where available, the current stable desktop version, and one current mobile app.
Do not mark a row passed solely because the stylesheet parses.

| Step | Surface / action | Acceptance |
| --- | --- | --- |
| 1 | Reading, Live Preview and Source; switch dark/light | Headings, prose, lists, quote borders, inline/fenced code and tags agree in role; syntax remains legible. Adjacent hashtag segments form one pill. No caret jumps or clipped content. |
| 2 | Appearance font overrides; text sizes 14, 18, 24 px | UI/body/code respect their respective user fonts; serif headings remain intentional. No bundled font or network dependency. |
| 3 | Fixture callouts, including folded and nested blocks | All ten public names resolve; icons and labels distinguish roles. `decision` and `human-decision` agree. Nested advisory titles do not inherit decision serif styling. Folding works in both modes. |
| 4 | Properties: add, edit, delete, reorder; text, date, list, checkbox, long value | Comfortable inset; focus, selection and error states visible. Sidebar properties retain native compact spacing. |
| 5 | Multiple tabs, split panes, stacked tabs, sidebars and RTL | Tab curves are intact; active accent is inside the tab. Native close/drag/reorder/resize controls work. Start-edge navigation markers follow RTL. |
| 6 | Search, quick switcher, command palette, menus and dialogs | Only matched text is highlighted at rest. Hover, keyboard selection, disabled and empty results remain distinguishable. No full-row permanent search highlight. |
| 7 | Tab/Shift+Tab through inputs, buttons, toggles, links, dates, sliders and metadata | Focus ring is visible and not clipped or hidden behind a dialog. Enter/Space/Escape retain native behavior. Disabled controls remain disabled. Loading buttons hide their text correctly. |
| 8 | Tables: select cells, add/reorder/resize rows and columns; long URLs/code | No clipped selection handles or doubled borders. Wide content scrolls using Obsidian's native controls. |
| 9 | Text transclusion, inline image, PDF, audio/video, Canvas embed | Text has a bounded frame. Media dimensions and controls remain native. No border around every `.internal-embed` wrapper. |
| 10 | Canvas: six preset colors, custom colors, groups, selection, drag, focus/edit, zoom | Native colored outlines and drag/focus cues remain distinct. Group text follows native light/dark foreground semantics. No resizing or zoom breakage. |
| 11 | Global/local Graph; groups, tags, attachments and unresolved nodes | Connections and labels are visible at useful zoom. Group colors remain user-controlled. Inspect renderer opacity as well as CSS token contrast. |
| 12 | Narrow split (~320 CSS px), desktop, mobile, 100/150/200% display scale and zoom | No overlap or inaccessible controls. Native scrollbars remain usable; controls stay reachable at 200% zoom. |
| 13 | Reduced motion, forced colors and keyboard-only navigation | Callout folding avoids motion; native loading/progress feedback remains active. Focus uses the system highlight color in forced-colors mode. |
| 14 | Export fixture to PDF from both modes | Light content palette is consistent, including code, tables, tags and callouts. Page breaks, wide tables and embedded material remain readable. |
| 15 | Re-enable actual plugins, snippets and custom accent settings | Check real workflows for cascade interactions. Repeat contrast checks for overridden colors, nested tints and selected syntax. |

Release acceptance is pending until these native checks are recorded. A CSS
theme cannot by itself establish screen-reader semantics, keyboard behavior or
WCAG conformance for Obsidian and arbitrary plugins.
