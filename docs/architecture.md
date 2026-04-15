# Architecture Overview

## System Design

The Forensik Trainingsplattform is a **static Single Page Application** with a build-time content pipeline.

### Core Principles

1. **Offline-first**: Runs via `file://` protocol without any server
2. **Build-time rendering**: Content is compiled to JS at build time, not fetched at runtime
3. **Multi-lab namespace**: Each lab is an independent content domain
4. **Zero runtime dependencies**: No frameworks, no CDN, no fetch()

### Data Flow

```
content/*/meta.yaml + content/*/chapters/*.md
  └── build_content.py
       └── forensik-lab/assets/js/content-data.js
            └── app.js (loads at runtime)
                 └── DOM (rendered in browser)
```

### Key Components

| Component | File | Responsibility |
|-----------|------|----------------|
| Build System | `build_content.py` | Reads `.md` files, generates `content-data.js` |
| Router | `app.js` | Hash-based routing, lab/chapter resolution |
| Content Store | `content-data.js` | Generated JS with `LabRegistry`, `ContentData`, `ContentNav` |
| Progress | `progress.js` | Lab-namespaced localStorage progress tracking |
| Terminal | `terminal.js` | Simulated bash environment |
| Reference | `reference.js` | Sidebar command reference |
| Gamification | `gamification.js` | Achievements, XP, streaks |
| Challenges | `challenges.js` | CTF and lab challenges |
| Certification | `certification.js` | Certification quiz system |
| UI Extras | `ui-improvements.js` | Search, TOC, themes |

### State Management

All state is stored in `localStorage` with lab-namespaced keys:

| Key Pattern | Purpose |
|-------------|---------|
| `forensik_progress_{labId}` | Completed chapters per lab |
| `challenge-completed-{labId}` | Challenge completion state |
| `lab-attempts-{labId}-{challengeId}` | Challenge attempt counts |
| `certification-result-{labId}` | Certification results |

### Routing System

```
Hash Format:
  #hub                           → Hub view (lab selection)
  #linux-forensik                → First chapter of lab
  #linux-forensik/ch03-imaging   → Specific chapter
```

Resolution chain:
1. `handleRoute()` parses hash into `{view, labId, chapterId}`
2. Hub view → renders `renderHub()` with lab cards
3. Lab view → loads first chapter via `loadChapter(labId, firstChapterId)`
4. Chapter view → loads specific chapter content

### Navigation Resolution

Content uses lab-local chapter IDs (e.g., `data-target="ch03-imaging"`).
The router automatically prepends the current `labId` prefix:

```javascript
App.navigateTo("ch03-imaging")
// → If currentLab is "linux-forensik", resolves to #linux-forensik/ch03-imaging
```

This means `.md` files never need to contain lab IDs.
