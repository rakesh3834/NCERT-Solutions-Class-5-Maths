# Shape Safari · GoKurious

An original, mobile-first game collection for **NCERT Math-Magic, Class 5, Chapter 2: Shapes and Angles**, using the requested chapter's 2024–25 reprint, printed pages 16–33.

## Play

- Open the standalone `shape-safari.html` directly in a browser (or generate it with `python3 build.py` after extracting the project ZIP). It includes the games, artwork, styles and fonts in one file and works without a network connection.
- Or serve this folder: `python3 -m http.server 8765 --bind 127.0.0.1`, then open `http://127.0.0.1:8765/`.
- `shape-safari-project.zip` contains the editable static website, bundled fonts, licences, documentation and build script. No npm build is required to run the website.

## The experience

Sixteen separate concept games are arranged across four paginated islands. Each game has **24 rounds**: 8 Discover, 8 Explore and 8 Challenge rounds. This makes **384 initial rounds**, followed by continued generated play. Later rounds change the target, orientation, context, complexity or available guidance. Games remain accessible individually; one concept is on screen at a time.

Doodle is a distinct set of **10 chapter-specific drawing activities**, offered where drawing teaches the concept. The other six topics retain their purpose-built Arcade mechanics and are labelled accordingly. Doodle strokes are checked for a suitable straight path, correct endpoints or angle, and the required number of lines. Accurate strokes snap to exact geometry. Undo and a “Tap ends” alternative are available in the nine guided sketch games. The Doodle D Game keeps its open pen, estimate-before-measure challenge, protractor reveal and absolute-error score.

| Doodle game | What the learner draws |
|---|---|
| Pencil Polygons | Successive straight sides forming the requested open or closed boundary |
| Copy a Corner | A ray matching a rotated reference angle |
| Sketch an Angle | Any suitable acute, right or obtuse opening from the given ray |
| Crease Sketcher | A diagonal or perpendicular crease on rotated square paper |
| Pose Pencil | The missing forearm forming the requested elbow angle |
| Garden Sketches | A second branch, leaf vein or beak edge |
| Draw the Brace | Missing diagonals in changing bridges, towers and gates |
| Clock Sketcher | Both clock hands with correct directions and distinct lengths |
| Degree Sketcher | A ray at the requested degree mark, within 0°–180° |
| The Doodle D Game | Comparison sketches after estimating and measuring |

New rounds and the **↻ new-puzzle button** generate fresh tasks without losing completed rounds or XP. Generators vary the actual geometry and question: peg positions, rod lengths, openings, reference directions, stick placement, folds, names, ramp lengths, queen positions, clock times and structure layouts. Recent history avoids the last four displayed puzzles and the immediately preceding problem. Starting a game again also generates a fresh puzzle at the saved round; the scene stays stable while you interact.

Every concept has a continuous **Read article**, opened from that game or the chapter guide. Its structure and typography follow the requested [GoKurious Moon Phases article](https://gokurious.com/simulators/moon-phases/):

- Topic title, class/chapter metadata and learning objective.
- Before you try; Try these ideas; Why it works.
- Worked example and interactive Check your understanding questions, one at a time, with Show answers.
- Explain it in your own words; What will you discover next?
- Topic FAQs; For parents & teachers; Related activities.

The article uses GoKurious’s exact system-font stack, slate text, indigo buttons, pale blue panels, heading weights and prose sizes. These styles are scoped to the reading dialog. The existing game fonts, illustrations, boards, mechanics and colour schemes are retained.

The collection contains **16 original articles, 16 worked examples, 32 practice checks, 48 FAQs and 32 parent/teacher activities**. All text is written for the named NCERT chapter, with page references. Reading and answering practice checks do not alter game progress or XP. The article’s return link restores the current game without restarting its puzzle.

### Restart the current game

Use **↺ Restart** beside Map (a compact ↺ button on phones), or **Restart game** on the completion screen. It immediately returns the selected game to Round 1 and clears that game’s completed rounds, stars, hint count and D-game error history. Its earned XP is removed from the total; every other game keeps its progress and XP. The chosen Arcade/Doodle preference is retained. This differs from the existing ↻ puzzle button, which only generates another puzzle at the current round.

## Games

| Game | Concept | Interaction |
|---|---|---|
| Loop Lagoon | Open/closed shapes, sides and corners | Connect pegs and close a non-crossing boundary |
| Jelly Joint | Same side lengths, different angles | Drag or slide a hinged frame onto a target |
| Angle Twins | Equal and bigger angles | Match openings across rotations and arm lengths |
| Stick Studio | All three chapter matchstick puzzles | Pick and place sticks; preserve the required fixed sticks |
| Angle Inspector | Two-arm angle tester | Open a tester to copy a corner |
| Corner Carnival | Acute, right and obtuse angles | Select labelled paint and colour matching corners |
| Fold & Fly | Angles in folds and paper planes | Fold, reveal creases and identify a marked angle |
| Robot Yoga | Body and joint angles | Move a robot's hand to form a required elbow opening |
| Bee Line | Directions, beaks, leaves and branches | Aim a bee or compare garden openings |
| Letter Detectives | Angles in straight-line names | Find the requested family among explicitly marked corners |
| Ramp Racers | Ramp angle and steepness | Set a slope and race identical balls on equal-length ramps |
| Bridge Builders | Triangular rigidity | Add diagonal braces and test loose joints in the wind |
| Tick Tock Trail | Time and angles between clock hands | Set a real clock time, then classify the smaller opening |
| Carrom Comets | Equal approach/rebound angles | Aim a cushion bounce to hit the queen |
| Degree Orbit | Degree clock, fractional right angles and turns | Rotate the degree hand to the requested turn |
| The Doodle D Game | Estimation and protractor measurement | Guess, measure, sketch and bank the absolute error |

## Phone and tablet design

The game board, instructions, controls and answer feedback fit inside the current viewport. Portrait mode enlarges compact geometric boards. Short landscape mode places controls beside the board. Menus paginate four games at a time. Articles, FAQs and the full chapter map use scrollable, dismissible dialogs, so reading material does not push the play controls below the screen.

Controls support taps, sliders, plus/minus buttons, keyboard activation and pointer dragging where appropriate. Sound is off until enabled. Reduced-motion preferences disable celebratory movement and shorten animated experiments. Live feedback is announced through a status region.

Progress is saved locally after each completed round. Three stars indicate completion of three eight-round stages. A completed round earns 10 XP, or 6 XP after requesting a hint. D-game errors are stored separately. No accounts, analytics or remote services are used. If browser storage is unavailable or an existing save cannot be read, the games continue without overwriting that save. Unfinished interactions restart with a new puzzle at the same saved round. Existing version-1 saves remain compatible; earned XP and completed rounds are preserved.

## Scope of the models

These are original, chapter-aligned playable activities, rather than a transcription of every textbook exercise. The named **Math-Magic** chapter is the curriculum source; this is not a claim about another textbook edition's chapter numbering.

Ramps use an idealised equal-condition acceleration model. Bridge frames use ideal rigid rods and loose joints. Carrom uses a friction-free straight-cushion reflection. The folded-paper scenes explain selected crease openings, rather than physically simulating paper. Name-angle counts refer only to the explicitly marked openings, because letter styles and ambiguous multi-line junctions change the count. The original D-game pen is an exploration tool; its extra sketches are not automatically measured. The nine guided Doodle games validate their specific stroke targets. A small drawing tolerance is used for fingers and the accepted geometry snaps to the exact target.

## Sources

- [NCERT Math-Magic Chapter 2 PDF](https://ncert.nic.in/textbook/pdf/eemh102.pdf), downloaded and checked across all 18 pages.
- [GoKurious: Moon Phases](https://gokurious.com/simulators/moon-phases/), the requested article structure and typography reference, inspected in the live page and its stylesheets.
- [GoKurious: Triangle Angle Simulator](https://gokurious.com/simulators/triangle-angle-simulator/) and [Area and Perimeter](https://gokurious.com/simulators/area-perimeter/), for the objectives, prediction prompts, explorations, checks, reflection and adult-activity structure. The maths content here follows Shapes and Angles; it is original text, not copied site articles.
- [Math Games](https://on.mathgames.com/math-games), for replayable skill-focused practice.
- [Tug Team Multiplication](https://www.mathplayground.com/ASB_TugTeamMultiplication.html) and [Grade 5 games](https://www.mathplayground.com/grade_5_games.html), for short game loops, clear actions and visible progress.

All game illustrations are original SVG/CSS artwork. DM Sans and Nunito are bundled under their SIL Open Font Licences in `assets/`.

## Edit, build and check

- `content.js`: concept explanations, chapter map and maths helpers.
- `games.js`: generators, geometry and the 16 Arcade mechanics.
- `doodles.js`: topic-specific stroke recognition and drawing games.
- `learning.js`: 16 articles, worked examples, FAQs, checks and activities.
- `app.js`: routing, progress, sound, touch input and UI state.
- `styles.css`: phone/tablet layouts and both visual modes.
- `python3 build.py`: regenerate the standalone HTML and the project ZIP.
- `node qa/verify-models.cjs`: deterministic model and mathematical checks.
- `node qa/doodle-models.cjs`: stroke correctness, alternatives and recent-puzzle randomisation.
- `node qa/learning-browser.cjs`: article typography, FAQs, checks, restart isolation, puzzle refreshes and real touch drawing.
- `node qa/article-style-check.cjs`: reference typography checks on phones and tablets.
- `node qa/offline-check.cjs`: offline HTML, touch and freehand drawing checks.
- `node qa/browser-check.cjs`: Playwright UI, layout, progress and interaction checks. Set `PLAYWRIGHT_MODULE` and `CHROMIUM_PATH` to your local installations if needed.

See `QA_REPORT.md` for the completed validation and its limits. Research downloads and QA screenshots are kept outside the project ZIP.
