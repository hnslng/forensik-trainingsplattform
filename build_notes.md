# Build Notes

## Multi-Lab Migration — Changes Summary

### Files Created
- `content/linux-forensik/meta.yaml` — Lab metadata
- `content/linux-forensik/chapters/` — 25 chapter directories (migrated from `content/`)
- `docs/architecture.md`, `docs/routing.md`, `docs/build-system.md`, `docs/lab-system.md`
- `TODO.md`, `ROADMAP.md`, `build_notes.md`

### Files Modified

#### `build_content.py` (complete rewrite)
- Scans `content/*/meta.yaml` for lab discovery (no hardcoded CANONICAL_ORDER)
- Reads `canonical_order` from `meta.yaml` per lab
- Generates `LabRegistry`, namespaced `ContentData[labId][chapterId]`, namespaced `ContentNav[labId]`

#### `forensik-lab/assets/js/app.js` (major refactor)
- Added `currentLab` state tracking
- New routing: `handleRoute()` → `parseHash()` → hub/lab/chapter views
- New `renderHub()` — lab selection grid with progress bars
- New `loadChapter(labId, chapterId)` — lab-scoped content loading
- `navigateTo(target)` — central resolver that prepends lab prefix
- `buildLabSidebar(labId)` — lab-scoped sidebar with "← Alle Labs" back button
- `buildHubSidebar()` — hub sidebar showing available labs
- `findAdjacentChapter(dir)` — scoped to current lab's nav items
- `updateSidebarHeader(labId)` — dynamic sidebar title
- Exposes `currentLab`, `currentChapter` via getters
- Backward-compatible `App.navItems` getter

#### `forensik-lab/assets/js/progress.js` (refactored)
- `STORAGE_KEY_PREFIX = "forensik_progress_"` — lab-namespaced keys
- `isCompleted(labId, chapterId)` — overloaded: also works as `isCompleted(chapterId)`
- `markCompleted(labId, chapterId)` — same overloading
- `resetAll(labId)` — optional labId, or resets all labs
- `migrateOldProgress()` — auto-migrates `forensik_lab_progress` → `forensik_progress_linux-forensik`

#### `forensik-lab/assets/js/gamification.js`
- Uses `Progress.getCompleted(labId)` instead of raw localStorage
- Challenge keys: `"challenge-completed-" + labId`
- Start time: `"start-time-" + labId`

#### `forensik-lab/assets/js/challenges.js`
- New `_getChallengeKey()` and `_getAttemptKey()` helpers
- All localStorage keys are lab-namespaced

#### `forensik-lab/assets/js/certification.js`
- `Progress.getCount(labId)` instead of `Progress.getCount()`
- Dynamic chapter count from `App.navItems.length` instead of hardcoded `17`
- Certification results: `"certification-result-" + labId`

#### `forensik-lab/assets/js/ui-improvements.js`
- `Chapters[id] || Labs[id]` → `ContentData[labId][id]` (3 locations)
- Search and TOC work with current lab's content

#### `forensik-lab/assets/js/labs-interactive.js`
- `Labs['ch10-labs']` → `ContentData[labId]['ch10-labs']`
- Challenge progress: lab-namespaced localStorage

#### `forensik-lab/assets/css/style.css`
- Fixed unclosed comment at line 2450 (was commenting out ~230 lines of challenge UI CSS)
- Added hub CSS: `.hub-header`, `.hub-grid`, `.hub-card`, `.hub-card-*`, `.nav-back-btn`
- Added mobile responsive rules for hub

### Files Deleted (earlier session)
- `extract_content.js`, `extract_to_md.py`, `extracted_content.json` (one-time extraction artifacts)

### Files Unchanged
- `forensik-lab/assets/js/terminal.js`
- `forensik-lab/assets/js/reference.js`
- `forensik-lab/assets/js/cheatsheet.js`
- `forensik-lab/assets/js/missions.js`
- `forensik-lab/assets/css/gamification.css`

### Breaking Changes for External Consumers
- `ContentData` is now two-dimensional: `ContentData[labId][chapterId]` instead of `ContentData[chapterId]`
- `ContentNav` is now an object: `ContentNav[labId]` instead of an array
- `Progress.isCompleted()` now takes `(labId, chapterId)` — backward compatible with single arg
- `Chapters` and `Labs` globals no longer exist
