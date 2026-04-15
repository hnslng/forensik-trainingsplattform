# Lab System

## Overview

The platform uses a **multi-lab namespace architecture** where each lab is an independent content domain. Labs are discovered automatically by the build system.

## Lab Structure

Each lab consists of:

```
content/<lab-id>/
  meta.yaml          # Lab metadata
  chapters/          # Chapter directories
    <chapter-id>/    # One directory per chapter
      *.md           # Markdown files with HTML content
```

## Lab Metadata (`meta.yaml`)

```yaml
id: "linux-forensik"           # Unique identifier (used in URLs, localStorage keys)
title: "Linux Forensik Lab"    # Display title (shown in hub card, sidebar header)
icon: "&#128270;"              # HTML entity icon (shown in hub card, nav)
description: "..."             # Short description (shown in hub card)
accent: "#00d4aa"              # CSS accent color for this lab's hub card
canonical_order:               # Chapter ordering (deterministic)
  - welcome                    # First chapter
  - ch01-grundlagen
  - ch22-zeitlinienanalyse     # Last chapter
```

## Chapter IDs

Chapter IDs are **lab-local** — they are only unique within their lab. This means:

- `content/linux-forensik/chapters/welcome/` → chapter ID `welcome`
- `content/netzwerk-forensik/chapters/welcome/` → also chapter ID `welcome`

Resolution happens via the active lab context (`App.currentLab`).

## Content Rules

1. **First `.md` file** must contain YAML frontmatter with `id`, `title`, `icon`, `section`
2. **HTML is preserved verbatim** — no markdown-to-HTML conversion
3. **Files are concatenated** in numeric-prefix order within each chapter directory
4. **Nav buttons** use lab-local `data-target` attributes
5. **No lab ID in content** — the runtime router handles prefixing

## Hub View

When no specific lab is selected, the hub view displays:
- Lab cards in a grid layout
- Each card shows: icon, title, description, progress bar
- Clicking a card navigates to that lab's first chapter

## Progress Tracking

Progress is stored per-lab in localStorage:

```
forensik_progress_linux-forensik    → ["ch01-grundlagen", "ch03-imaging", ...]
forensik_progress_netzwerk-forensik → ["welcome"]
```

Challenge and certification data is also lab-namespaced:

```
challenge-completed-linux-forensik    → {"lab1": true, "ctf1": true}
certification-result-linux-forensik  → {"percentage": 85}
```

## Accent Colors

Each lab can define a custom `accent` color in `meta.yaml`. This is applied to the hub card via a CSS custom property:

```css
.hub-card {
  border-color: var(--lab-accent, var(--accent));
}
```

## Auto-Discovery

New labs are detected automatically by `build_content.py`:

1. Scans `content/*/meta.yaml`
2. Validates required fields
3. Discovers chapters in `content/*/chapters/`
4. Generates `LabRegistry`, `ContentData`, and `ContentNav`

No manual registration or configuration needed.

## Backward Compatibility

The system migrates old progress data automatically:
- `forensik_lab_progress` → `forensik_progress_linux-forensik` (on first load)
