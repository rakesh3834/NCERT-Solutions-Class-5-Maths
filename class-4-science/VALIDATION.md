# Hands-on campaign validation

Validated 21 September 2026. Current test entry points are `qa.cjs` and `browser-qa.cjs`.

## Behaviour

- Three campaigns, ten authored levels each. All 30 complete with one award; unsolved initial setups do not pass.
- Four seed values exercise each level, including intermediate animation frames. Seeds do not masquerade as extra levels: each campaign has only ten authored levels.
- Distinct level keys, objectives and interaction definitions; factory rejects an automatic level eleven.
- Negative paths cover invalid drawing, pulp conservation, torn sheets and reset, illegal shadow movement and recovery, overspending and undo.
- The current loaded package also passes 3,060 regression runs across the other 17 games.

## Browser

At 320×568, 390×844, 768×1024, 1024×768 and 844×390:

- 300 initial/completed scene checks for the new campaigns and 435 scene checks for retained games.
- No detected viewport overflow, out-of-bounds SVG text, JavaScript errors or missing assets.
- Real pointer drawing and dragging, keyboard range controls and a live animation interrupted by Restart pass.
- All campaigns end after level ten. Explicit completed-level replay awards no extra XP.
- Progress migration archives old records for replaced games; unrelated progress is preserved.
- All 20 Read articles, three FAQs per article, state preservation, Restart isolation and legacy bookmarks pass.
- The library has three featured campaign cards plus ten chapter cards.

Rendered phone and tablet screenshots were inspected. These checks use browser emulation, not physical-device testing or a student learning study. Educational rationale and simplifications are documented in CAMPAIGNS.md.

Only the `class-4-science/` directory is included in deployment. Maths is outside this change.
