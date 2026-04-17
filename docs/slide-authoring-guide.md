# Slide Authoring Guide

Diese Anleitung zeigt, wie du neue Slides im bestehenden Plattform-Design erstellst, damit Navigation, Auto-Terminal und Uebungslogik konsistent funktionieren.

## 1) Datei- und Kapitelstruktur

- Lege Inhalte unter `content/<lab-id>/chapters/<chapter-id>/` ab.
- Erste Datei im Kapitel ist typischerweise `00-intro.md` (mit Frontmatter).
- Weitere Slides liegen in `01-section.md`, `02-section.md`, ...
- Nach jeder Aenderung: `python3 build_content.py` ausfuehren.

Beispiel:

```text
content/netzwerk-forensik/chapters/ch03-ipv4/
  00-intro.md
  01-section.md
  02-section.md
```

## 2) Basislayout einer Slide

Der Renderer erwartet HTML in den `.md`-Dateien. Jede Slide startet mit einer Section-Ueberschrift:

```html
<h2 class="section-title"><span class="number">3.2</span> Titel der Slide</h2>
<p>Einleitungstext...</p>
```

## 3) Design-Bausteine (empfohlen)

### Codeblock

```html
<div class="code-block">
  <div class="code-header">
    <span class="lang">BASH</span>
    <button class="copy-btn">Kopieren</button>
  </div>
  <pre><code>ip addr
ip route</code></pre>
</div>
```

Hinweise:
- `copy-btn` wird von `app.js` gebunden.
- In Uebungskontexten wird automatisch ein "Terminal"-Button injiziert.

### Erwartete Ausgabe

```html
<div class="code-block output-block">
  <div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>
  <pre><code>default via 192.168.1.1 dev eth0</code></pre>
</div>
```

### Warn-/Info-Callout

```html
<div class="callout callout-warning">
  <div class="callout-header">&#9888; Hinweis</div>
  <p>Das Terminal ist simuliert.</p>
</div>
```

### Tabelle

```html
<div class="table-container">
  <table>
    <thead><tr><th>Feld</th><th>Bedeutung</th></tr></thead>
    <tbody><tr><td>TTL</td><td>Time To Live</td></tr></tbody>
  </table>
</div>
```

## 4) Uebungs-Slides (Linux-Qualitaet)

Nutze fuer echte Aufgaben immer `exercise-box`. Nur so greifen Progress-Lock und konsistentes Slide-Verhalten.

```html
<h2 class="section-title"><span class="number">6.5</span> Uebung: Verbindungen analysieren</h2>
<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Verbindungen analysieren</span>
  </div>
  <div class="exercise-body">
    <div class="exercise-goal">
      <div class="goal-label">Ziel</div>
      <p>TCP/UDP-Verbindungen interpretieren.</p>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Alle Verbindungen: <code>ss -tunap</code></li>
        <li>Nur LISTEN: <code>ss -tlnp</code></li>
        <li>HTTP-Test: <code>curl -I http://example.com</code></li>
      </ol>
    </div>
    <div class="toggle-container">
      <div class="toggle-header">
        <span class="toggle-label">Loesung anzeigen</span>
        <span class="toggle-arrow">&#9654;</span>
      </div>
      <div class="toggle-content">
        <p>LISTEN zeigt offene Server-Ports, ESTAB aktive Sessions.</p>
      </div>
    </div>
  </div>
</div>
```

## 5) Auto-Terminal: Wann oeffnet es automatisch?

Terminal-Auto-Open greift, wenn mindestens eines davon zutrifft:

- Slide enthaelt `exercise-box`
- Slide enthaelt `exercise-start-banner`
- Titel enthaelt `Uebung:`, `Uebung` (mit Umlaut), `Vorbereitung:` oder `exercise`

Empfehlung:
- Fuer Aufgaben immer `exercise-box` verwenden.
- Optional zusaetzlich `exercise-start-banner` fuer sichtbaren Einstieg.

## 6) Simulator-kompatible Befehle verwenden

Schreibe nur Kommandos, die im jeweiligen Lab umgesetzt sind:

- Linux-Lab: siehe `TerminalForensikCommandNames` in `forensik-lab/assets/js/terminal.js`
- Netzwerk-Lab: siehe `TerminalNetzwerkCommandNames` in `forensik-lab/assets/js/terminal.js`
- Basisbefehle: `TerminalBaseCommandNames`

Wenn ein Kommando didaktisch noetig ist, aber im Simulator fehlt:
1. Entweder Uebung auf bestehende Kommandos anpassen
2. Oder Command-Handler in `terminal.js` erweitern (inkl. plausibler Ausgabe)

## 7) Kapitelnavigation am Ende

Am Kapitelende (oder auf finaler Uebungsseite) Buttons verwenden:

```html
<div class="nav-buttons">
  <button class="nav-btn" data-target="ch05-mac-arp">&#8592; Zurueck</button>
  <button class="nav-btn" data-target="ch07-dns">Weiter &#8594;</button>
</div>
```

## 8) Qualitaets-Checkliste vor Commit

- Section-Titel mit `h2.section-title` vorhanden
- Uebungen als `exercise-box` strukturiert
- Befehle im Simulator verfuegbar
- Erwartete Ausgabe passt zur simulierten Antwort
- `python3 build_content.py` erfolgreich
- UI stichprobenartig testen:
  - Terminal-Auto-Open
  - "Terminal"-Button in Codebloecken
  - Next-Button-Lock bei Uebungen
  - Keine Regression in anderem Lab

## 9) Weiterfuehrende Dokumente

- Didaktik- und Niveaukonzept: `docs/slide-didaktik-konzept.md`
- KI-Promptvorlagen fuer Slide-Erstellung: `docs/ki-prompt-slide-erstellung.md`
