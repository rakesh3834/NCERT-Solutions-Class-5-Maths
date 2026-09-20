# Validation · 20 September 2026

## Model checks

- **2,240 completed puzzle simulations**: all 56 games, rounds 0, 7, 8, 15, 16, 23, 24 and 47, with five independent seeds each.
- Generated SVG, prompts and controls contain no `NaN` or missing-value output.
- Every game has a lesson, and every chapter has four cards including Doodle.
- Variation checks across sampled puzzles; separate recent-signature rejection in the generator.
- Empty/unrelated Doodle input does not complete a stroke or award XP. Correct full constructions pass.
- Cube nets use 3D face orientation. Remainders, calendar dates, unit conversions and clock hands are generated mathematically.

## Rendered browser checks

Playwright/Chromium checked all 56 play screens at each of:

| Viewport | Result |
|---|---|
| 320 × 568 phone portrait | Play controls and boards within viewport |
| 390 × 844 phone portrait | Play controls and boards within viewport |
| 768 × 1024 tablet portrait | Play controls and boards within viewport |
| 1024 × 768 tablet landscape | Play controls and boards within viewport |
| 844 × 390 phone landscape | Play controls and boards within viewport |

- No browser JavaScript errors or horizontal overflow in those checks.
- All 56 Read buttons open the correct article, three FAQs and question controls; returning retains the puzzle.
- Real pointer drawing rejects an unrelated stroke and accepts a correct measured line.
- Closed-outline Tap points tested with SVG button clicks, including returning to the start corner.
- Restart returns only the current game to Round 1, removes its earned XP and preserves another game’s progress.
- All 14 library cards exist and the selected chapter opens correctly.
- Phone home/play/article and tablet screenshots visually reviewed.

These are browser/device-size simulations, not physical iOS/Android device tests. Screen centimetres are model units. Articles and the chapter library intentionally scroll; play screens fit the viewport.

## Reproduce

Run `node qa.cjs`. For browser checks, start the local server on port 8767, make Playwright available to Node, then run `node browser-qa.cjs`. Optional `PLAYWRIGHT_MODULE` and `CHROMIUM_PATH` variables select local installations.
