# Validation report

Checked on 14 September 2026.

| Check | Result |
|---|---|
| Game generators and completion paths | **18,432 passed**: 16 games × 48 round positions × 24 seeds |
| Matchstick geometry | Equal lengths, exact move counts and preserved shared sticks checked for every generated puzzle |
| Six-stick star | Independently enumerated **8 triangles** from all line intersections |
| Important misconceptions | Rejects an 89° right-angle answer, incomplete loops, wrong degree turns, incorrect clock settings and unbraced frames |
| Carrom reachability | Every tested queen position is reachable within the aiming control's range |
| Guided Doodle models | **1,500 passed**: ten Doodle activities × five round positions × 30 seeds |
| Fresh puzzle generators | **3,840 passed** across both preferences and three stages; no repeated screen within the preceding four puzzles or repeated immediately previous problem |
| Wrong drawing and alternative input | Scribbles and cancelled strokes rejected; reverse-direction strokes, undo and tap endpoints checked across all eight guided non-polygon drawing types |
| Real browser interactions | **96 passed**: every game, three difficulty stages and both visual modes |
| Viewport containment | **372 passed**: four map pages and every game at nine sizes; successful-answer states at 390 × 844 and 320 × 568 |
| Learning companion | All **16 articles**, **32 checks**, **48 FAQ disclosures** and parent/teacher sections exercised; reading preserves progress |
| Restart | **32 passed** across 16 games and both preferences, plus in-flight animation cancellation and completion-screen restart |
| New-puzzle control | **192 browser refreshes** across all topics and both preferences; varied problems/screens and preserved XP/rounds |
| Additional viewport checks | **110 passed** for reading panels, Doodle games and touch-completion states; **482 total** with the main layout suite |
| Article font fidelity | **8 passed**: system font, heading weight, prose/list/question sizes and overflow checks at four viewport sizes in both modes |
| Console errors | **0** across all completed browser suites |
| Progress | Completion saving, reload, finishing round 24 and continued play checked |
| Help and navigation | Hints, article dialogs, chapter map, close buttons, mode changes and next-round controls checked |
| Invalid storage | Original unreadable save preserved; play remains available |
| Standalone HTML offline | Passed with network disabled; **0 remote requests** |
| Touch input | Browser touchscreen peg taps plus complete touch-drag flows for polygons at 320 × 568, diagonal braces at 390 × 844 and clock hands at 820 × 1180; strokes start directly on SVG anchors |
| Doodle pen | Upper-notebook drawing, clearing, measurement, banking and next-round flow checked |
| Keyboard drawing alternative | Fold sketch completed by focusing endpoints and pressing Enter |
| Offline learning and sketches | Guided crease drawing, article sections and FAQ expansion also passed with network disabled |
| Visual review | Existing phone hub and Arcade scenes preserved; phone polygon/brace sketches, tablet clock drawing, phone article/check/FAQ panels and tablet FAQs reviewed |

Viewport sizes: **320 × 568, 360 × 640, 390 × 844, 430 × 932, 768 × 1024, 820 × 1180, 1024 × 768, 844 × 390 and 1366 × 850**.

The tests use Chromium and emulated viewports. They do not constitute physical iPad/Android-device testing, a screen-reader acceptance test or a child usability study. Curriculum coverage was checked against the requested Math-Magic chapter; it does not assert coverage of a differently numbered chapter in another textbook.

Reproducible checks are in `qa/verify-models.cjs`, `qa/doodle-models.cjs`, `qa/browser-check.cjs`, `qa/learning-browser.cjs`, `qa/article-style-check.cjs` and `qa/offline-check.cjs`. The workspace also retains `qa/browser-results.json`, `qa/learning-results.json`, `qa/offline-results.json` and visual screenshots. Source downloads and intermediate QA files are excluded from the public project ZIP.


## Fix confirmed during touch validation

The first stroke on a short phone could be missed because SVG coordinate mapping was computed before the controls and feedback had their final height. Rendering now measures the completed layout, refreshes its mapping when feedback changes, and observes drawing-surface resizing. The same touch test then completed successfully, including the first side of a polygon. Pointer cancellation clears incomplete guided strokes. The model validation checks stroke shape and intended mathematical geometry; it does not classify arbitrary freehand drawings.


## Article style and restart update

The live Moon Phases reference was inspected on 14 September 2026. Its system font stack is `system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif`. The article styles reproduce its slate text (`#1e293b`), body/prose sizes (including 17 px prose with 1.65 line height), 800-weight headings, pale panels and indigo controls. These styles are scoped to the reading dialog; the game generator, Doodle mechanics and learning text files are unchanged in this update.

The Read view now presents the full article sequentially. The validation exercises the two questions, answer reveal, FAQs and parent/teacher material for each concept and confirms reading does not change saved play state. Restart checks cover all 16 games with both mode preferences, preservation of another game’s saved data/XP, clearing the selected game’s progress, reloading, cancellation during an animation, and restarting from the completion screen.
