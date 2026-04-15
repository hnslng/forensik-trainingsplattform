# Anleitung: Neues Lab hinzufügen

## 1. Neues Content-Verzeichnis erstellen
```bash
cd ~/Schreibtisch/labs
mkdir -p THEMA-content/chapters
```

## 2. Konfiguration (chapters.json)
Erstelle `THEMA-content/chapters.json`:
```json
{
  "chapters": [
    {
      "id": "ch01-einfuehrung",
      "title": "Einführung",
      "file": "ch01-einfuehrung.md",
      "section": "Grundlagen"
    },
    {
      "id": "ch02-uebung1",
      "title": "Erste Übung",
      "file": "ch02-uebung1.md",
      "section": "Grundlagen"
    }
  ]
}
```

## 3. Framework konfigurieren
Editiere `~/Schreibtisch/labs/framework/server.js`:

Suche nach `const LABS = {` und füge hinzu:
```javascript
'thema-id': {
  title: 'Titel des Labs',
  subtitle: 'Untertitel',
  icon: '🔧',
  chaptersPath: path.join(__dirname, '..', 'THEMA-content', 'chapters'),
  chaptersJsonPath: path.join(__dirname, '..', 'THEMA-content', 'chapters.json'),
  terminalMode: 'netzwerk'  // ODER 'forensik' / 'linux'
}
```

## 4. Terminal-Befehle hinzufügen (optional)
Editiere `~/Schreibtisch/labs/framework/assets/js/terminal.js`:

Suche nach `var COMMANDS = {` und füge hinzu:
```javascript
thema-id: [
  { cmd: 'befehl1', desc: 'Beschreibung' },
  { cmd: 'befehl2 --option', desc: 'Weitere Beschreibung' }
]
```

## 5. Cheatsheet-Befehle hinzufügen (optional)
Editiere `~/Schreibtisch/labs/framework/assets/js/cheatsheet-overlay.js`:

Suche nach `var COMMANDS = {` und füge hinzu:
```javascript
thema-id: [
  { cmd: 'befehl1', desc: 'Beschreibung für Cheatsheet' }
]
```

## 6. Kapitel-Markdown schreiben
Erstelle `THEMA-content/chapters/ch01-einfuehrung.md`:
```markdown
# Kapitel-Titel

## Einführung

Text hier...

---

## Übung: Titel

::: exercise-start-banner
Kurze Anleitung.
:::

### 1.1 Schritt

Erklärung...

```bash
befehl --option
```

**Erklärung:**
Was macht dieser Befehl?

::: output-block
Erwartete Ausgabe
Zeile 1
Zeile 2
:::

> Merke: Wichtige Erkenntnis.
> Tipp: Praktischer Hinweis.
```

## 7. Hub-Link hinzufügen
Editiere `~/Schreibtisch/labs/lab-deploy/index.html`:

Suche nach `lab-card-grid` und füge hinzu:
```html
<a href="/thema-id" class="lab-card thema-lab">
  <div class="lab-icon">🔧</div>
  <h3>Titel des Labs</h3>
  <p class="lab-desc">Kurzbeschreibung.</p>
  <div class="lab-meta">
    <span class="lab-chapters">X Kapitel</span>
    <span class="lab-arrow">→</span>
  </div>
</a>
```

## 8. Server neustarten
```bash
kill $(lsof -t -i:8000) 2>/dev/null; sleep 1
cd ~/Schreibtisch/labs/framework && node server.js &
```

## 9. Testen
- Öffne http://localhost:8000/
- Klicke auf dein neues Lab
- Teste Terminal-Befehle
- Öffne Cheatsheet (Button oben rechts)

## Beispiel: Linux für Anfänger

### 1. Verzeichnis
```bash
mkdir -p linux-anfaenger-content/chapters
```

### 2. chapters.json
```json
{
  "chapters": [
    {
      "id": "ch01-terminal-einstieg",
      "title": "Terminal Einstieg",
      "file": "ch01-terminal-einstieg.md",
      "section": "Grundlagen"
    }
  ]
}
```

### 3. server.js Eintrag
```javascript
'linux-anfaenger': {
  title: 'Linux für Anfänger',
  subtitle: 'Einstieg in die Kommandozeile',
  icon: '🐧',
  chaptersPath: path.join(__dirname, '..', 'linux-anfaenger-content', 'chapters'),
  chaptersJsonPath: path.join(__dirname, '..', 'linux-anfaenger-content', 'chapters.json'),
  terminalMode: 'linux'
}
```

### 4. Terminal-Befehle (terminal.js)
```javascript
linux: [
  { cmd: 'pwd', desc: 'Aktuelles Verzeichnis' },
  { cmd: 'ls -la', desc: 'Dateien mit Details' },
  { cmd: 'cd ~', desc: 'Ins Home wechseln' },
  { cmd: 'mkdir test', desc: 'Ordner erstellen' },
  { cmd: 'touch datei.txt', desc: 'Leere Datei erstellen' },
  { cmd: 'cat datei.txt', desc: 'Dateiinhalt anzeigen' },
  { cmd: 'cp datei.txt kopie.txt', desc: 'Kopieren' },
  { cmd: 'mv datei.txt umbenannt.txt', desc: 'Verschieben/Umbenennen' },
  { cmd: 'rm datei.txt', desc: 'Löschen' },
  { cmd: 'man ls', desc: 'Manual zu Befehl' }
]
```

## Tipps
- Nutze `---` als Slide-Trenner (Markdown)
- `::: exercise-start-banner` für Übungsstart
- `::: output-block` für erwartete Ausgabe
- `> Merke:` und `> Tipp:` für Callouts
- Bilder: `![Alt-Text](pfad/bild.png)`
- Tabellen: `| Kopf1 | Kopf2 |` etc.