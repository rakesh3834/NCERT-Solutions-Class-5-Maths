# Mission-edition validation

Validated 21 September 2026.

## Logic and progression

`node missions-qa.cjs` completes **3,600 generated multi-stage missions**: 20 games × nine progression positions × 20 seeds. These runs visit **14,940 stages**, including all **83 distinct stage definitions**, and check 11,340 transitions for a changed stage, interaction category and scene. Tests also check valid SVG, exactly one completion award, and ignored unknown actions.

Negative and revision paths include incomplete fair-test setup, insufficient sample observations, an invalid boat scribble, one-sided cargo, a failed launch, successful redesign, an incomplete leaf sketch, an empty shadow prediction, and an incorrect prediction that is correctly allowed to proceed to observation.

These automated checks verify behavior and stage differences; educational value is supported by the NCERT mapping and design rationale in CURRICULUM.md, not established by a test count.

## Browser and layout

`missions-browser-qa.cjs` exercises all games and all their stages at **320×568, 390×844, 768×1024, 1024×768 and 844×390**. Including completed views, this is **515 scene checks**. No viewport overflow, out-of-bounds SVG text, JavaScript errors or missing assets were found.

The browser suite also checks a real mouse-drawn functional hull, invalid-stroke rejection, all 20 corresponding Read articles and their three FAQs, interactive article checks, state preservation when Read closes, per-game Restart isolation, the ten chapter cards, and legacy bookmark redirection. Shape controls are available for touch or keyboard users who do not want to draw freehand.

Phone and tablet screenshots were inspected. The existing Nunito/DM Sans game typography, colour system, game shell, article typography and styling are retained. The chapter map now contains two extended-game cards instead of four shallow-drill cards.

## Known boundaries

Physics, resource counters and relative paper readings are intentionally simplified classroom models. They are not measurements or exact real-world predictions. Finite scientific ideas and useful investigation procedures recur in extended play; the edition avoids identical successive mission stages rather than claiming an infinite supply of unique science concepts. Responsive checks are browser emulations, not physical-device usability sessions.

Progress uses a new edition-specific key while leaving the previous edition's saved records intact. Deployment is restricted to the `class-4-science/` package in the existing repository; Class 4 Maths and Class 5 content remain outside this change.
