# Forensik Trainingsplattform

**Multi-Lab Lernplattform für operative forensische Datensicherung**
Entwickelt für das Amt für Betrugsbekampfung (ABB) – Steuerfahndung.

## Uber das Projekt

Browserbasierte Single-Page-Application fur die Ausbildung in Linux-basierter Datentragerforensik. Vollstandig offline-fahig, kein Server erforderlich. Integriertes simuliertes Terminal mit Pipe-, Chain- und Redirect-Support fur praxisnahe Ubungen.

Multi-Lab-Architektur: Labs sind unabhangige Content-Domaine, die automatisch vom Build-System erkannt werden. Neue Labs konnen durch einfaches Hinzufugen eines Verzeichnisses unter `content/` erstellt werden.

Alle Verfahren orientieren sich an NIST SP 800-86 und ISO/IEC 27037.

## Architektur

- **Offline-first**: Funktioniert per `file://` (USB-Stick, ZIP) und auf Webservern (Nginx/Apache)
- **Build-time Content**: `build_content.py` liest Markdown-Dateien und generiert `content-data.js`
- **Multi-Lab System**: Labs werden via `content/*/meta.yaml` auto-discovered
- **Hash-Routing**: `#hub`, `#lab-id`, `#lab-id/chapter-id`

## Projektstruktur

```
content/
  linux-forensik/
    meta.yaml                     # Lab-Metadaten (id, title, icon, description, accent, canonical_order)
    chapters/
      welcome/00-intro.md
      ch01-grundlagen/00-intro.md, 01-section.md, ...
      ch22-zeitlinienanalyse/...
  (weitere Labs hier anlegen)

forensik-lab/
  index.html                      # SPA Hauptanwendung
  assets/
    css/
      style.css                   # Haupt-CSS + Hub-Styles
      gamification.css            # Gamification Styles
    js/
      content-data.js             # Auto-generiert (nicht manuell bearbeiten!)
      app.js                      # Router, Hub-View, Slide-Parser, Navigation
      progress.js                 # Lab-namespaced Fortschritts-Tracking
      terminal.js                 # Terminal-Simulation
      reference.js                # Referenz-Panel
      gamification.js             # Achievement-System
      challenges.js               # CTF-Challenges
      certification.js            # Zertifizierung
      ui-improvements.js          # UI-Erweiterungen
      labs-interactive.js         # Interaktive Labs
      missions.js                 # Missionen
      cheatsheet.js               # Cheatsheet
  datasets/                       # Forensische Datensatze

build_content.py                  # Build-Script (content/ -> content-data.js)
docs/                             # Dokumentation
```

## Schnellstart

```bash
# 1. Repository klonen
git clone https://github.com/hnslng/linux-forensik-lab.git
cd linux-forensik-lab

# 2. Content bauen
python3 build_content.py

# 3. Im Browser offnen
# forensik-lab/index.html – kein Server notig
```

## Content bearbeiten

1. `.md`-Datei in `content/<lab>/chapters/` bearbeiten
2. `python3 build_content.py` ausfuhren
3. Seite im Browser neu laden

## Neues Lab hinzufugen

1. Neues Verzeichnis anlegen: `content/<lab-id>/`
2. `meta.yaml` erstellen:
   ```yaml
   id: "netzwerk-forensik"
   title: "Netzwerk Forensik Lab"
   icon: "&#127760;"
   description: "Netzwerkforensische Analyse..."
   accent: "#3b82f6"
   canonical_order:
     - welcome
     - ch01-einfuehrung
   ```
3. Kapitel anlegen: `content/<lab-id>/chapters/<chapter-id>/00-intro.md`
4. `python3 build_content.py` ausfuhren
5. Lab erscheint automatisch im Hub

## Routing

| Hash | Ansicht |
|------|---------|
| `#` oder `#hub` | Hub (Lab-Auswahl) |
| `#linux-forensik` | Welcome-Seite des Labs |
| `#linux-forensik/ch03-imaging` | Spezifisches Kapitel |

## Deployment

### Offline (USB / ZIP)
`forensik-lab/` Verzeichnis direkt verwenden. Kein Server notig.

### VPS (Nginx)
```nginx
server {
    listen 80;
    root /var/www/forensik-lab;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Technologie

- Vanilla HTML5, CSS3, JavaScript (ES5 kompatibel)
- Single Page Application mit Hash-Routing
- Google Fonts: Inter (UI) + JetBrains Mono (Code/Terminal)
- localStorage fur lab-namespaced Fortschritt
- Python 3 Build-Script (PyYAML)
- Keine externen Runtime-Abhangigkeiten

## Lizenz

MIT License

## Kontakt

**Hannes Lang** – ABB IT-Fahndung Training
