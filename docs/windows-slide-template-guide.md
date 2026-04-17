# Windows Slide Template Guide

Didaktische Templates fuer das `windows-forensik`-Lab auf Einsteiger-Niveau.

## Ziel

Jedes Kapitel folgt einer gefuehrten Reihenfolge:

1. Einstieg mit Kontext (`00-intro.md`)
2. Verstehen + gefuehrte Praxis + Uebung (`01-section.md`)

## Pflichtbausteine pro Befehlsslide (`01-section.md` bis `03-section.md`)

1. `section-title` mit Kapitelnummer
2. kurzer Kontext: Was wird gemacht und warum
3. `code-block` mit 1-2 simulatorfaehigen Kernbefehlen
4. `output-block` mit realistischer Soll-Ausgabe
5. `exercise-box` mit:
   - `goal-label` = `Ziel`
   - 3-6 klare Schritte
   - `toggle-container` mit Loesung + Interpretation
6. optional `callout-warning` fuer typische Fehler

## Verbindliche Reihenfolge fuer Befehlsslides (`01` bis `03`)

Wenn eine Slide einen Kernbefehl erklaert, nutze diese feste Reihenfolge:

1. **Kurz erklaeren**: Was wird gemacht und warum?
2. **Befehl zeigen** (`code-block`)
3. **Befehl erklaeren** mit Tabelle (`Bestandteil` / `Bedeutung`)
4. **Info-Block** (`callout-info` oder `callout-tip`) mit Merksatz
5. **Erwartete Ausgabe direkt darunter** als `output-block` (aufgeklappt)
6. **Ausgabe erklaeren** (nur wenn noetig) in eigener Tabelle (`Ausgabe-Feld` / `Bedeutung`)

Hinweis:
- Die erwartete Ausgabe steht sichtbar direkt unter dem Befehl.
- Befehlserklaerung und Ausgabeerklaerung immer getrennt halten (nicht vermischen).
- Keine Linux-Vergleiche in Windows-Slides verwenden.

## Pflichtbausteine fuer `04-section.md` (Transfer)

1. kurzer Transfer-Abschnitt mit Merksatz
2. Uebersichtstabelle mit den drei Kernschritten
3. `callout-danger` mit typischen Fehlern
4. `exercise-box` mit Mini-Workflow aus allen Kernbefehlen
5. Abschlussnavigation (`nav-buttons`, inkl. `complete-section-btn`)

## Kapiteltypen und Zuordnung

- **Workflow/Grundlagen**
  - `ch01-ablauf`, `ch02-grundbegriffe`, `ch03-identifikation`, `ch04-partitionstabellen`
- **Kernprozess Datensicherung**
  - `ch05-imaging`, `ch06-image-formate`, `ch07-hashing`, `ch08-mounting`
- **Analysepraxis**
  - `ch09-hex-binaer`, `ch10-vergleich`, `ch11-strings-filter`, `ch12-dateisysteme`
- **Sicherheit/Qualitaet**
  - `ch13-sicher-loeschen`, `ch14-write-blocker`, `ch15-protokollierung`, `ch16-best-practices`
- **Transfer und Abschluss**
  - `ch17-casestudy`, `ch18-kompakt-cheatsheet`, `ch19-quellen-standards`, `ch20-tool-installation`, `ch21-uebungen`

## Simulator-kompatible Kernbefehle (Windows-Lab)

- `Get-Disk`, `Get-Partition`, `Get-Volume`, `Get-PhysicalDisk`
- `Get-FileHash`, `certutil`, `Compare-Object`
- `ftkimager.exe`, `dd.exe`, `aim_cli.exe`
- `Format-Hex`, `strings.exe`, `findstr`
- `Start-Transcript`, `Stop-Transcript`, `diskpart`, `winget`

## Kapitel-Blueprint (empfohlen)

Nutze dieses Muster fuer neue Kapitel, damit Aufbau und Lernfluss konsistent bleiben:

1. **`00-intro.md` (Einstieg)**
   - kurze Situation oder Kontext
   - 3-4 klare Lernziele
   - Vorschau auf die kommenden Slides

2. **`01-section.md` (Schritt 1)**
   - erster Kernbefehl mit der festen Befehlsslide-Reihenfolge
   - kleine Uebung nur zu diesem Schritt

3. **`02-section.md` (Schritt 2)**
   - zweiter Kernbefehl mit gleicher Struktur
   - Uebung nur zu Schritt 2

4. **`03-section.md` (Schritt 3)**
   - dritter Kernbefehl mit gleicher Struktur
   - Uebung nur zu Schritt 3

5. **`04-section.md` (Transfer/Abschluss)**
   - Reihenfolge zusammenfassen
   - typische Fehler kompakt als `callout-danger`
   - Mini-Workflow-Uebung mit allen Kernbefehlen
   - Navigations-/Abschlussbuttons

Hinweise:
- Lieber mehr kurze Slides als wenige ueberladene.
- Jede Uebung muss ohne Zurueckspringen loesbar sein (Befehle auf derselben Slide).
- Pro Slide ein klarer Fokus: eine Hauptfrage, ein Hauptschritt.
