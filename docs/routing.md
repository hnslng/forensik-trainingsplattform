# Routing System

## Hash Format

| Pattern | View | Example |
|---------|------|---------|
| `""` or `"#"` | Hub | Landing page with lab cards |
| `"#hub"` | Hub | Explicit hub |
| `"#lab-id"` | Lab welcome | `#linux-forensik` |
| `"#lab-id/chapter-id"` | Chapter | `#linux-forensik/ch03-imaging` |

## Route Resolution

### `parseHash()`

Parses the URL hash into a structured object:

```javascript
// Empty hash
"" → { view: "hub", labId: null, chapterId: null }

// Hub
"#hub" → { view: "hub", labId: null, chapterId: null }

// Lab only (loads first chapter)
"#linux-forensik" → { view: "lab", labId: "linux-forensik", chapterId: null }

// Specific chapter
"#linux-forensik/ch03-imaging" → { view: "chapter", labId: "linux-forensik", chapterId: "ch03-imaging" }
```

### `navigateTo(target)`

Central navigation resolver. Handles three cases:

1. **`"hub"`** → navigates to hub
2. **Lab ID** (matches `LabRegistry[].id`) → navigates to lab's first chapter
3. **Chapter ID** (anything else) → prepends `currentLab + "/"` prefix

```javascript
App.navigateTo("hub")               // → #hub
App.navigateTo("linux-forensik")    // → #linux-forensik
App.navigateTo("ch03-imaging")      // → #linux-forensik/ch03-imaging (if currentLab is "linux-forensik")
App.navigateTo("netzwerk/ch01")     // → #netzwerk/ch01 (already has prefix)
```

## Nav Button Handling

Markdown content contains lab-local references:

```html
<button class="nav-btn" data-target="ch02-identifikation">...</button>
```

The click handler in `bindContentEvents()` calls `App.navigateTo(target)`, which automatically resolves the target using the current lab context.

## Welcome Page

The welcome page uses `onclick` handlers:

```html
<button onclick="App.navigateTo('ch01-grundlagen')">Training starten</button>
```

These also resolve through `navigateTo()`, automatically adding the lab prefix.

## Fallback Behavior

| Scenario | Behavior |
|----------|----------|
| Invalid lab ID | Redirects to hub |
| Invalid chapter ID | Loads first chapter of lab |
| No `content-data.js` | Shows error message |
| Only one lab | Still shows hub (for consistency) |

## Sidebar Navigation

### Hub State
- Shows list of available labs
- Clicking a lab navigates to `#lab-id`

### Lab State
- Shows "← Alle Labs" back button
- Lists all chapters grouped by section
- Clicking a chapter calls `navigateTo(chapterId)`
- Progress bar shows lab-scoped completion
