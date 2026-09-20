# NCERT Solutions Class 4 Science & EVS

GoKurious-style games for the ten requested topics from NCERT **Our Wondrous World, Grade 4**, the textbook for **The World Around Us** (EVS). First edition March 2025, book code 0435.

## What is included

- **40 games: exactly four per chapter**, comprising three interactive games and one guided Doodle. No chapter exceeds the requested five-simulator limit.
- The established Class 5/Class 4 Maths base stylesheet, fonts, colours, cards, play screen and article layout are retained.
- Each game has 24 expedition rounds followed by continued generated practice. Contexts, values, arrangements and drawing targets vary as appropriate; fundamental science ideas are revisited.
- 40 topic-specific Read articles, 40 worked examples, 80 understanding checks, 120 FAQs and parent/teacher activities.
- Per-game Restart, hints, XP and progress saved to this browser using `gokurious-wondrous-world-4-v1`, independently of the Maths packages.
- Doodles check endpoints, full-path coverage and distance from the required route. Unrelated scribbles do not pass. Tap points provides an alternative to freehand drawing.
- Local fonts, original SVG models and no runtime external dependencies.

## Curriculum choices

The book combines community life, nature, health, materials and sky observations; the interface therefore says **Science & EVS**. [CURRICULUM.md](CURRICULUM.md) maps every supplied topic and subtopic to the games and lessons, with direct official NCERT chapter links.

The source book’s five Rs are **Refuse, Reduce, Reuse, Repurpose and Recycle**. **Repair** is also included as requested and is clearly distinguished from the book’s five.

Experiments teach prediction, observation and changing one factor at a time. Spinner and boat behaviour are simplified learning models, not calibrated physical predictions. A wrong prediction does not prevent a learner from correctly recording an observation. Food-group graphics are conceptual, not personalised diets or serving-size prescriptions. Region/culture examples do not imply everyone lives alike. Ordinary Moon phases are distinguished from eclipses.

## Open or host

From this folder:

```sh
python3 -m http.server 8768 --bind 127.0.0.1
```

Open `http://127.0.0.1:8768/`. Chapter cards lead to `chapters/class-4-science/#ch1` through `#ch10`. Direct game links include `#spinner`, `#boats`, `#moon` and `#leaf-pen`.

GitHub Pages destination in the existing repository: [Class 4 Science & EVS](https://rakesh3834.github.io/NCERT-Solutions-Class-5-Maths/class-4-science/).

## Validation

Run `node qa.cjs` for 1,600 seeded puzzle-completion checks across all 40 games and eight round positions, including extended practice. The tests also reject blank/unrelated drawing input and check generated output and initial scene variation.

With Playwright installed, `node browser-qa.cjs` checks every game at five phone/tablet viewport sizes, actual pointer drawing, closed-path tapping, reset isolation, every article and the chapter library. Optional variables: `PLAYWRIGHT_MODULE`, `CHROMIUM_PATH`, and `BASE_URL` (trailing slash required).

The play screen fits one viewport; articles and the chapter library scroll intentionally. Validation uses browser simulations, not physical-device tests. The code, writing and activity artwork are original. NCERT textbook PDFs are linked, not redistributed. The fonts include their licences.
