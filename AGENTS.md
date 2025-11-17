# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the single-page shell that wires controls (sound, theme, language) to the DOM. Keep new markup semantic and reuse existing IDs when possible so `game.js` listeners continue working.
- `styles.css` holds all visual rules grouped by feature (board, modal, controls). Extend a section in place rather than scattering overrides.
- `game.js` (~500 lines) drives state, rendering, localization, and drag/drop logic. Follow the existing section headers (Constants → Initialize) when adding features.
- `test.html` is a sandbox for experimenting with UI ideas without risking the live board.
- `index_old.html` is the pre-refactor reference—never edit directly; use it only for historical diffing.

## Build, Test, and Development Commands
- `python3 -m http.server 8080` — launch a static server from the repo root so drag events, audio, and localization load without browser security warnings.
- `open http://localhost:8080/index.html` — run the production entry point.
- `open http://localhost:8080/test.html` — preview experiments before merging into `index.html`.

## Coding Style & Naming Conventions
- Use 4-space indentation in HTML/CSS/JS and keep translation keys in single quotes to match existing literals.
- Prefer `const`/`let` over `var`, strict equality, and early returns. When introducing helpers, name them with descriptive verbs (`updateComboMeter`, `computeGhostCells`).
- CSS classes follow kebab-case (`.game-board`, `.control-panel`). Component-specific modifiers should prefix the base block (e.g., `.game-board--dark`).
- Run your changes through a formatter such as VS Code’s built-in JS/CSS formatters; no automated lint task exists yet, so manual consistency matters.

## Testing Guidelines
- Manual smoke tests cover the checklist in `REFACTORING.md`: initialization, drag/drop, line clears, scoring, end-game detection, new game flow, theme/language toggles, audio, local storage, mobile touch, ranking display.
- When fixing bugs, add a short reproducible scenario to the pull request and verify it in both light and dark themes plus at least one non-English locale.
- Keep experimental harnesses inside `test.html`; remove or gate debug logs before opening a PR.

## Commit & Pull Request Guidelines
- Recent history uses short, imperative messages (`Update index.html`, `优化`). Follow the same style: present-tense summaries under 60 characters, optionally localize if the change is user-facing in another language.
- Each PR should include: purpose, screenshots/GIFs for UI changes, affected locales/settings, manual test checklist, and any follow-up issues.
- Link related issues or TODOs, and mention if legacy `index_old.html` behavior changes.

