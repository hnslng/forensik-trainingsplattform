# Lab-Referenz-Slides (Gold-Muster)

Kurze **kanonische HTML-Beispiele** für neue Labs. Sie liegen unter `docs/` und werden **nicht** von `build_content.py` eingelesen (kein Eintrag unter `content/`).

## Zweck

- **Menschliche Autor:innen** und **KI** orientieren sich an denselben sichtbaren Mustern wie in der laufenden App.
- Ergänzt die Regel-Dokumente (`slide-authoring-guide.md`, `ki-prompt-lab-erstellung.md`): dort stehen die *Regeln*, hier die *Form*.

## Dateien (Reihenfolge zum Lesen)

| Datei | Inhalt |
|--------|--------|
| [00-chapter-intro-minimal.md](00-chapter-intro-minimal.md) | `00-intro.md`: Frontmatter + `h1`/`chapter-subtitle`/`chapter-intro` + Callout + `feature-grid` + `slide-nav-hint` |
| [01-command-slide-sequence.md](01-command-slide-sequence.md) | Befehls-Folie: Kontext → `code-block` → erwartete Ausgabe → `output-block` → Tabelle → Callout |
| [02-exercise-prelude-and-box.md](02-exercise-prelude-and-box.md) | Vorfolie (`h2` ohne Box) + Übungs-Slide mit `exercise-box`; Schritte mit **Unlock-tauglichen** `<code>`-Zeilen |
| [03-welcome-minimal.md](03-welcome-minimal.md) | Welcome: `welcome-hero`, `welcome-note`, kompaktes Modul-Raster |

## App-Hinweis (`nav-buttons`)

In `forensik-lab/assets/js/app.js` (`parseAndRenderSlides`) wird der Inhalt **jeder H2-Section am ersten** `<div class="nav-buttons"` **abgeschnitten**. Alles dahinter (inkl. der Buttons) kommt **nicht** in die Slide-DOM — Navigation läuft über **Topbar** und **Sidebar**. Viele bestehende Kapitel enthalten `nav-buttons` trotzdem im Markdown (historisch / Autoren-Konvention); neue Labs sollten sich **nicht** darauf verlassen, dass diese Buttons sichtbar werden.

## Pflege

Bei Änderungen an **Slide-Split**, **Übungs-Lock** (`app.js`) oder **Simulator-Befehlen** (`terminal.js`): diese Beispiele und die Verweise im [ki-prompt-lab-erstellung.md](../ki-prompt-lab-erstellung.md) stichprobenartig prüfen.

Platzhalter-IDs (`ch00-beispiel`, `ch01-start`) nur in Referenzdateien — in echten Labs durch echte Kapitel-IDs ersetzen.
