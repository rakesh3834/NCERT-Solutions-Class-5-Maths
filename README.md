# NCERT Solutions Class 5 Maths

A mobile- and tablet-friendly chapter library from GoKurious.

**[Open the public website](https://rakesh3834.github.io/NCERT-Solutions-Class-5-Maths/)**

Choose the **Chapter 2: Shapes and Angles** card to open the complete learning package:

- 16 concept games, with 24 initial rounds each and continued play.
- 10 topic-specific Doodle activities.
- 16 articles, worked examples, 32 practice questions, 48 FAQs and parent/teacher activities.
- A restart control for each game, hints and locally saved progress.
- A downloadable standalone HTML edition for offline play.

The chapter's established game design and mechanics are preserved. Its Read articles follow the requested GoKurious Moon Phases article structure and typography. Curriculum references use **NCERT Math-Magic, Class 5, Chapter 2: Shapes and Angles**, reprint 2024–25, pages 16–33.

## Run locally

From this repository, run:

```sh
python3 -m http.server 8766 --bind 127.0.0.1
```

Open `http://127.0.0.1:8766/`. The website is static and needs no build or external runtime services.

## Files

- `index.html` and `hub.css`: the chapter-card home page.
- `chapters/chapter-2-shapes-and-angles/`: the complete editable Chapter 2 package.
- `chapters/chapter-2-shapes-and-angles/shape-safari.html`: the offline edition.
- `.nojekyll`: ensures GitHub Pages serves the static files directly.

Chapter documentation, source notes, font licences and reproducible QA scripts are included with the chapter. Progress is stored in the current browser; the hosted site and a downloaded file keep separate browser storage.

## Publishing

GitHub Pages serves this repository from its default branch and root directory. Relative URLs support the GitHub project-site path, including the chapter card and offline download.

## Validation

The chapter package has existing mathematical, interaction, Doodle, article, restart and offline checks. The publishing update additionally checks the chapter card, nested asset paths, phone/tablet layouts and the live hosted package.

To run the optional browser checks, install Playwright and its Chromium browser, then run the scripts in the chapter's `qa/` folder. Set `BASE_URL` to the chapter URL, `PLAYWRIGHT_MODULE` to a custom installation if needed, and `CHROMIUM_PATH` only when using a custom browser executable.
