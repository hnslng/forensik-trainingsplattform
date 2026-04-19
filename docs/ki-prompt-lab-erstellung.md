# KI-Prompt: komplettes Lab erzeugen

Master-Prompt zur Generierung eines **neuen Labs** (Struktur, Kapitel, Slides, Übungen, Cheatsheet) in der Form dieser Plattform — inhaltlich an **Linux Forensik** ausgerichtet (Einsteiger bis leicht fortgeschritten).

**Vorab lesen (Repo):**

- [lab-reference-slides/README.md](lab-reference-slides/README.md) — **Gold-Muster** (Intro, Befehls-Folie, Übung mit Vorfolie, Welcome); Struktur beim Schreiben spiegeln, kein blindes Copy-Paste
- [slide-authoring-guide.md](slide-authoring-guide.md) — HTML-Bausteine, `exercise-box`, `nav-buttons`
- [slide-didaktik-konzept.md](slide-didaktik-konzept.md) — Didaktik, Zielgruppe
- [build-system.md](build-system.md) / `build_content.py` — Frontmatter, Dateireihenfolge
- [lab-system.md](lab-system.md) — `meta.yaml`, `canonical_order`
- `forensik-lab/assets/js/app.js` — Slide-Split (`section-title`, `exercise-box`), Übungs-Lock, Dots
- `forensik-lab/assets/js/terminal.js` — erlaubte Simulator-Befehle pro Lab
- [ki-prompt-slide-erstellung.md](ki-prompt-slide-erstellung.md) — Einzel-Slide-Überarbeitung (ergänzend)

Einzel-Slides und Kurzprompte: weiter in [ki-prompt-slide-erstellung.md](ki-prompt-slide-erstellung.md).

---

## Master-Prompt (kopieren)

Den folgenden Block in Cursor / anderes Modell einfügen und die INPUT-Zeilen befüllen.

````text
Rolle:
Du bist Lead-Autor:in für die statische Forensik-Trainingsplattform dieses Repos. Du erzeugst ein komplettes neues Lab in exakt der bestehenden technischen Form — inhaltlich und didaktisch am Niveau von „Linux Forensik“ (Einsteiger bis leicht fortgeschritten), nicht am Niveau dünner Theorie-Kapitel.

Hard-Constraints (Repo-Realität):
0) Kanonische Layout-Muster: Vor Erzeugung die Beispieldateien unter docs/lab-reference-slides/ lesen (README + 00–03). HTML-Struktur, Callout-Typen, exercise-box-Verschachtelung und Reihenfolge (Befehls-Folie) an diesen Mustern ausrichten; Fließtext und Themen frei wählen — keine Duplikation der Demo-IDs/Platzhalter-Kapitel in content/.
1) Build-Pipeline: Inhalte liegen unter content/<lab-id>/ mit meta.yaml und chapters/<chapter-id>/*.md (Ordner-Standard). Optional unterstützt das Build-Script auch eine einzelne Kapitel-Datei chapters/<id>.md mit Frontmatter — bevorzuge für neue Labs die Ordner-Struktur. Die erste Datei pro Kapitelordner (00-intro.md) MUSS YAML-Frontmatter enthalten mit exakt diesen Keys: id, title, icon, section. Alle weiteren Dateien im Kapitel sind reines HTML ohne Frontmatter.
2) Dateinamen: strikt sortierbar: 00-intro.md, 01-section.md, 02-section.md, … (führende Nummern).
3) Kein Markdown-Rendering: Der Dateiinhalt nach dem Frontmatter ist HTML (Tags, Entities). Keine Markdown-Codefences im Kapitel-HTML; keine literalen Backticks im HTML-Body (Build escaped sie, aber Fehleranfälligkeit).
4) Slides entstehen im UI durch Splitting an <h2 class="section-title"…> UND durch exercise-box. Jede exercise-box wird zu einer eigenen Slide. Plane Sections entsprechend (keine „Übung“-Titel ohne exercise-box).
5) Plattform-Verhalten Navigation und Übung (VERBINDLICH berücksichtigen — so ist die App implementiert, nicht verhandelbar): Vor der ersten exercise-box innerhalb einer logischen Section liegt HTML auf einer **eigenen** Slide **ohne** exercise-box. „Weiter“ wird nur gesperrt, wenn die **aktive** Slide eine `.exercise-box` im DOM enthält (handleExerciseSlide in app.js). Daher ist die **Vorfolie** (h2 „Übung“ / Erklärung / Code-Beispiele vor der Box) mit „Weiter“ **nicht** gesperrt — das ist vorgesehen. Autor:innen-Pflicht: Vorfolie nur kurz (Motivation/Wiederholung); nichts Wesentliches ausschließlich dort platzieren, was ohne Box-Slide fehlen würde. Zusätzlich: Die **Punkt-Navigation** (slide-dots) ruft goToSlide ohne Lock-Prüfung auf — Lernende können Übungs-Slides umgehen; didaktisch und inhaltlich **nicht** auf einen erzwungenen Durchlauf jeder Slide vertrauen.
6) Übungs-Freischaltung (nur auf der Box-Slide): „Weiter“ bleibt gesperrt, solange die aktive Slide eine exercise-box hat, kein Abschluss-Marker gesetzt ist und die Schritt-Codes auswertbar sind. Die Plattform wertet nur <code> und .inline-code in .exercise-steps aus: Der gesamte textContent muss mit [a-z] beginnen und Länge > 2 haben; daraus wird das erste Wort genommen und als Substring in der Terminal-History gesucht. Kurzbefehle wie ls/dd/ip daher immer mit Argument schreiben (z. B. ls cases, ip addr). Mindestens ein so erfasster Schritt pro exercise-box, sonst bleibt die Box-Slide dauerhaft gesperrt.
7) Simulator-Kompatibilität: Öffne forensik-lab/assets/js/terminal.js und nutze nur Befehle aus TerminalBaseCommandNames plus der Liste für envId linux-forensik | netzwerk-forensik | windows-forensik. Fehlende Befehle: ersetzen oder als Realsystem-Hinweis ohne Pflichtschritt — niemals als Unlock-Pflicht.
8) HTML-Bausteine exakt wie in der Plattform: section-title, code-block (+ copy-btn), output-block für erwartete Ausgabe, callout-*, table-container, exercise-box (exercise-header, exercise-badge „Uebung“, exercise-name, exercise-body, exercise-goal mit goal-label „Ziel“, exercise-steps mit ol.numbered-list, toggle-container mit toggle-label „Loesung anzeigen“ und korrekte Div-Verschachtelung), optional exercise-start-banner. nav-buttons: optional am Kapitelende wie in bestehenden Labs; **Wichtig:** `parseAndRenderSlides` in app.js schneidet pro H2-Section den HTML-String am ersten `<div class="nav-buttons"` ab — der Block erscheint **nicht** in den Slides; Kapitelwechsel läuft über Topbar/Sidebar. optional `complete-section-btn` **vor** einem solchen nav-buttons-Block (wird mitgerendert, sofern vor dem Abschnitt).
9) Cheatsheets: Wenn du ein Cheatsheet lieferst, lege es unter docs/cheatsheets/<lab-id>/… ab. Nutze ein vorhandenes Cheatsheet nur als inhaltliche Referenz für Workflow/Reihenfolge/Typfehler — NICHT als Copy-Paste-Quelle für Slides. Slides müssen erklären, üben und prüfen; Cheatsheet ist kompakte Nachschlage-Logik.

Didaktik-Pflicht (Linux-Qualität):
- Zielgruppe: Einsteiger ohne tiefes Vorwissen. Jede Slide beantwortet klar: Was tue ich? Warum? Woran erkenne ich, dass es stimmt?
- Progression: Vom Einfachen zum Komplexen; pro Slide maximal ein neues Kernkonzept.
- Keine Theorie-only-Slides: Jede nicht-Übungs-Slide braucht einen Anwendungsanker (Tabellen-Decode, Mini-Szenario, Entscheidungsfrage decision-card, oder klarer Übergang zur nächsten Terminal-Übung).
- Fachbegriffe bei Erstnennung kurz erklären.
- Pseudo-Übungen verbieten: Titel mit „Übung“/„Vorbereitung“ ohne exercise-box sind unzulässig.
- Lab-Start und Kapitel-Anfänge: Im Welcome-Kapitel (empfohlen als erstes in canonical_order) klar **Nutzen + Überblick** („wofür dieses Lab“, „was kommt in den Modulen“). In jedem Kapitel-00-intro im Fließtext und/oder in den Preview-Karten: **Lernziel**, optional **Anschluss** ans Vorkapitel, und explizit **konkrete Outcomes** („Nach diesem Kapitel kannst du …“ in 2–4 prüfbaren Aussagen, keine vagen Schlagworte).

Befehls-Folie (Linux-Standard, VERBINDLICH sobald ein neuer Befehl/Option demonstriert wird):
- Reihenfolge strikt: (1) h2.section-title (2) ein oder zwei kurze p mit Kontext/Warum (3) code-block BASH mit vollständigem Befehl (4) p mit strong „Erwartete Ausgabe im Terminal:“ (5) code-block output-block mit realistischer Soll-Ausgabe (6) table-container mit thead Bestandteil/Bedeutung — Zeilen erklären entweder Parameter/Teile des Befehls, oder Spalten der Ausgabe, oder markante Ausgabezeilen (fdisk-Mix) (7) callout-tip oder callout-warning/danger für typische Fehler und forensischen Transfer. Kein „nur Tabelle“ oder „nur Code“ ohne die dazwischenliegenden Schritte.

Kapitel-Intro-Pflicht (00-intro.md HTML):
- Enthält mindestens: h1.chapter-title, div.chapter-subtitle, p.chapter-intro, feature-grid chapter-preview-grid mit mehreren feature-card chapter-preview-card (Icons + kurze Texte), optional slide-nav-hint.
- Zusätzlich inhaltlich: **Lernziel** in einem Satz im chapter-intro; optional **Anschluss** ans Vorkapitel; **„Danach kannst du …“** als 2–4 konkrete, prüfbare Fähigkeiten (keine vagen Buzzwords). Preview-Karten (Thema/Praxis/Übung) müssen zu diesen Outcomes passen — Orientierung wie im bestehenden Linux-Lab (z. B. content/linux-forensik/chapters/ch03-imaging/00-intro.md).

Lab-Start (welcome):
- Empfohlen: erstes Kapitel canonical_order = welcome mit chapters/welcome/00-intro.md (Frontmatter + HTML): **Nutzenversprechen** + **Kursüberblick** (Hero, Kurznote, modulartige Kacheln): wofür das Lab, was in den Modulen kommt, was Lernende danach in der Simulation/Praxis können — Vorbild: content/linux-forensik/chapters/welcome/00-intro.md

Übungs-Pflicht pro Kapitel:
- Mindestens eine vollständige Terminal-Übung mit exercise-box + erwarteter Ausgabe + Lösungstoggle mit Interpretation („warum“, nicht nur richtig/falsch).
- Optional mehrere Übungen, wenn das Thema es braucht — dann jede Übung als eigene section-title + exercise-box.

INPUT (vom Menschen einzusetzen):
- lab-id: <slug, z. B. netzwerk-forensik-2>
- Lab-Titel, Kurzbeschreibung, icon als HTML-Entity, accent CSS-Farbe
- Ziel-Lab-Terminalprofil: linux-forensik | netzwerk-forensik | windows-forensik (entscheidet erlaubte Kommandos)
- Thema / Lernziele / erwartete Kapitelanzahl (oder frei wählbar, aber begründen)
- optional: Pfad zu einem bestehenden Cheatsheet als Referenz (nur Logik übernehmen)

OUTPUT (vollständig, ohne Meta-Kommentare außerhalb der Artefakte):
A) content/<lab-id>/meta.yaml (inkl. canonical_order aller Kapitel-IDs; empfohlen: erstes Kapitel `welcome` mit Outcome-/Überblick-Seite)
B) Für jedes Kapitel:
   - content/<lab-id>/chapters/<chapter-id>/00-intro.md (Frontmatter + HTML inkl. Lernziel + „danach kannst du“-Nutzen in Intro und/oder Preview-Karten)
   - alle NN-section.md Dateien in korrekter Reihenfolge
C) docs/cheatsheets/<lab-id>/<thema>_cheatsheet_v1.md (kompakt, lab-spezifisch; kein Slide-Duplikat)
D) Kurze „Build-Notes“ (max 10 Zeilen): python3 build_content.py erwarten; keine TODO-Platzhalter.

Qualitätssicherung im Prompt-Output (Selbstcheck, am Ende als kurze Liste):
- Layout mit docs/lab-reference-slides/ abgeglichen (Intro, Befehls-Folie, Vorfolie + exercise-box, Welcome).
- Jede Kapitel-ID in canonical_order existiert als Ordner.
- Jede 00-intro.md hat gültiges Frontmatter.
- Jede Section hat section-title.
- Jede Übungs-Slide hat exercise-box + Schritte + Lösung.
- Alle Pflicht-Kommandos simulator-tauglich; Unlock-Regel: jede exercise-box hat Schritt-Codes mit textContent Länge > 2 und erlaubtem Erstwort; keine nav-buttons mittig in Sections.
- Plattform-Navigation: Vorfolie vor exercise-box ungesperrt; Dots können Übungen überspringen — Inhalte entsprechend geplant (siehe Hard-Constraint 5).
- Keine reinen Aufzählungs-Slides ohne Anwendungsanker.
- Welcome (falls enthalten): Nutzen + Überblick; jedes Kapitel-00-intro: konkretes Lernziel + Outcome „danach kannst du …“.
- Jede neue Befehls-Einführung: Linux-Sequenz Kontext → code → erwartete Ausgabe → output-block → Tabelle Bestandteil/Bedeutung → Callout.

Stilhinweise:
- Deutsch; HTML-Entities für Umlaute wie im bestehenden Linux-Lab üblich.
- Ton: klar, ermutigend, forensisch präzise, aber einsteigergerecht.

Negative Beispiele (verboten):
- SCHLECHT: langer Absatz nur mit Definitionen, kein Terminal, keine erwartete Ausgabe, keine Übung.
- GUT: kurze Erklärung + code-block + output-block + Tabelle „Bedeutung der Ausgabe“ + exercise-box mit 4 Schritten und Lösung mit Interpretation.

Positive Mini-Struktur (muss inhaltlich angepasst werden, nicht wörtlich spammen):
<section-title> → <p> Kontext </p> → optional callout → code-block → output-block → table-container → exercise-box → (optional complete-section-btn) → nav-buttons nur als letztes Element der Section>
````

Nach dem Erzeugen im Repo: `python3 build_content.py` ausführen und die UI stichprobenartig prüfen (Terminal, Übung, Navigation).
