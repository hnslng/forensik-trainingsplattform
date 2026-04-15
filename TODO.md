# TODO

## Phase 2: Content Extraction

- [ ] Extract gamification.js badge/achievement content into per-lab config
- [ ] Extract challenges.js challenge definitions into per-lab YAML/JSON
- [ ] Extract certification.js questions into per-lab config
- [ ] Extract missions.js scenarios into per-lab config
- [ ] Extract labs-interactive.js challenge mappings into build system

## Phase 3: Lab Content

- [ ] Create `content/netzwerk-forensik/` lab structure
- [ ] Write network forensics chapters
- [ ] Create per-lab terminal environments (different `TerminalSharedFS` per lab)

## Phase 4: Editor

- [ ] Python dev server with REST API for content editing
- [ ] In-browser Markdown/HTML editor (CodeMirror or textarea)
- [ ] Live preview with auto-rebuild
- [ ] `build_content.py --watch` mode

## Improvements

- [ ] Terminal environments per lab (different simulated filesystems)
- [ ] Per-lab reference panels
- [ ] Hub card sorting (alphabetical, progress, recently accessed)
- [ ] Import/export progress (JSON file download/upload)
- [ ] Print-friendly CSS for chapters
- [ ] Keyboard navigation (Tab through lab cards)
