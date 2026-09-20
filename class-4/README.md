# NCERT Solutions Class 4 Maths · GoKurious

A static game package for the **14 requested topics from NCERT Maths Mela, Grade 4 (2025)**. This replaces the earlier preview’s incorrect older Math-Magic chapter list.

There are **exactly four games per chapter: three interactive games and one guided Doodle**, for 56 games total. Each includes 24 expedition rounds and continued generated practice, its own Read article, a worked example, two understanding checks, three FAQs and parent/teacher activities.

The Class 5 Shapes and Angles package supplies the unchanged base stylesheet, local Nunito/DM Sans fonts, colours, card/play layout, article typography, sound, stars and XP. Class 4 uses its own content, interactions and saved progress. Class 5 files were not modified.

## Open locally

From this folder run:

```sh
python3 -m http.server 8767 --bind 127.0.0.1
```

Open http://127.0.0.1:8767/. Chapter cards link to `chapters/class-4-maths/#ch1` through `#ch14`. Individual games also have direct links, such as `#mirror` or `#time-pen`.

No build step, account or network dependency is required to play. Fonts and licences are bundled. Official-book/reference links require internet access.

## Play and progress

- One concept per screen, using touch, mouse, stylus and keyboard button activation.
- Doodles check endpoints, route coverage and distance from the intended path. Empty drawings and unrelated scribbles do not pass. **Tap points** constructs the same paths without freehand input.
- **New puzzle ↻** changes the puzzle without clearing completed rounds. Recent-puzzle signatures prevent recent repeats when alternatives exist.
- **Restart ↺** resets only the active game to Round 1 and removes its earned XP. Other games retain progress. Normal completion earns 10 XP; hint-assisted completion earns 6 XP.
- Save key: `gokurious-maths-mela-4-v2`. Earlier preview and Class 5 save keys are separate.
- Play boards and controls fit the tested phone/tablet viewports. Articles and the chapter library scroll normally.

## Curriculum and articles

See [CURRICULUM.md](CURRICULUM.md) for all chapter mappings, official sources and difficulty choices. Reference: *Maths Mela, Grade 4*, first edition March 2025, NCERT code 0433.

Requested transport routes appear alongside Chapter 13 multiplication/division. Repeating shape/colour patterns, tally marks and bar graphs provide the requested related practice. Wildlife counts are invented. Ruler centimetres are model units, not physical screen measurements.

Articles follow the existing Class 5 treatment based on [GoKurious Moon Phases](https://gokurious.com/simulators/moon-phases/): prediction, exploration, explanation, worked example, checks, reflection, FAQs, adult activities and related lessons. All lesson text is original; this is not a verbatim textbook answer key or an NCERT publication.

## Validation

`node qa.cjs` runs 2,240 seeded completion cases, including later/free-play rounds, rendering sanity, drawing rejection and variation checks. `browser-qa.cjs` uses Playwright; install it or set `PLAYWRIGHT_MODULE` to a local module path, and optionally set `CHROMIUM_PATH`.

Browser checks cover every game at 320×568, 390×844, 768×1024, 1024×768 and 844×390; 56 articles; real pointer drawing; closed-outline tap input; restart/XP isolation; and chapter navigation. See [VALIDATION.md](VALIDATION.md).

Published in the existing repository at [NCERT Solutions Class 4 Maths](https://rakesh3834.github.io/NCERT-Solutions-Class-5-Maths/class-4/). The original Class 5 package remains at its existing address.
