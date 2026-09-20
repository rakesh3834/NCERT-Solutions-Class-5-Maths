# Validation · 20 September 2026

## Automated game checks

`qa.cjs` completes **1,600 generated puzzles**: 40 games × eight round positions (0, 7, 8, 15, 16, 23, 24, 47) × five seeds. It verifies completion using the games’ public action/pointer interfaces, rejects empty/unrelated Doodles, checks initial and completed SVG/controls for invalid values, and measures starting-scene variation.

The experimental tests include a deliberately incorrect floating prediction followed by a correctly recorded observation, spinner adjustment/test/record stages, and successful boat construction. All ten Doodles require full paths; the dye activity also requires the requested pigment.

## Browser checks

`browser-qa.cjs` covers all 40 play screens at **320×568, 390×844, 768×1024, 1024×768 and 844×390**. It checks viewport fit of game controls and boards, horizontal overflow and JavaScript/asset errors. It also completes every game in the browser and checks the resulting feedback layout.

Other checks: real pointer rejection/acceptance, closed-path Tap points and colour selection, per-game Restart and XP isolation, correct articles for all 40 games, three FAQs per article, interactive understanding checks, retained puzzle on closing Read, ten chapter-library cards and direct chapter navigation. Phone and tablet screenshots are visually reviewed.

These are Chromium viewport simulations rather than tests on physical devices. Reading articles and the chapter library intentionally scroll. Game simulations simplify real processes; the source notes and articles state their limits.
