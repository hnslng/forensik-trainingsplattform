# Forensik Trainingsplattform

**Multi-Lab Lernplattform fur operative forensische Datensicherung und Netzwerkforensik**
Entwickelt fur das Amt fur Betrugsbekampfung (ABB) – Steuerfahndung.

## Uber das Projekt

Browserbasierte Single-Page-Application fur die Ausbildung in Linux-basierter Datentragerforensik und Netzwerkforensik. Vollstandig offline-fahig, kein Server erforderlich. Integriertes simuliertes Terminal mit Pipe-, Chain- und Redirect-Support fur praxisnahe Ubungen.

Multi-Lab-Architektur: Labs sind unabhangige Content-Domaine, die automatisch vom Build-System erkannt werden. Jedes Lab besitzt eine eigene Terminal-Umgebung mit spezifischen Befehlen, simuliertem Dateisystem und Netzwerkstatus. Neue Labs konnen durch einfaches Hinzufugen eines Verzeichnisses unter `content/` erstellt werden.

Alle Verfahren orientieren sich an NIST SP 800-86 und ISO/IEC 27037.

## Architektur

- **Offline-first**: Funktioniert per `file://` (USB-Stick, ZIP) und auf Webservern (Nginx/Apache)
- **Build-time Content**: `build_content.py` liest Markdown-Dateien und generiert `content-data.js`
- **Multi-Lab System**: Labs werden via `content/*/meta.yaml` auto-discovered
- **Hash-Routing**: `#hub`, `#lab-id`, `#lab-id/chapter-id`
- **Environment-based Terminal**: Jedes Lab hat eine eigene Terminal-Umgebung mit spezifischen Befehlen

## Terminal System Architecture

Das Terminal verwendet eine **umgebungsbasierte Architektur** (Environment-Based Architecture), bei der Befehle, Dateisystem und Netzwerkstatus pro Lab-Umgebung getrennt sind.

### Command Resolution

Befehle werden in drei Schichten aufgeloest:

1. **Base Commands** – Immer verfugbar: Navigation (`ls`, `cd`, `pwd`), Dateioperationen (`cat`, `head`, `tail`, `cp`, `mv`, `rm`), Suche (`grep`, `find`), Hashing (`sha256sum`, `md5sum`), System (`echo`, `date`, `whoami`, `uname`, `clear`, `help`)
2. **Forensik Environment** – Nur in `linux-forensik`: Disk-Tools (`lsblk`, `fdisk`, `parted`), Imaging (`dd`, `dc3dd`, `ewfacquire`), Mount (`mount`, `losetup`), Sleuth Kit (`fls`, `mmls`, `icat`), Analyse (`strings`, `xxd`, `hexdump`)
3. **Netzwerk Environment** – Nur in `netzwerk-forensik`: Diagnose (`ping`, `traceroute`, `mtr`), DNS (`dig`, `nslookup`), HTTP (`curl`, `wget`), Netzwerk-Info (`ip`, `ifconfig`, `ss`), Sicherheit (`nmap`, `tshark`, `tcpdump`), Kryptographie (`openssl`, `ssh-keygen`, `gpg`)

### Simulated State

Jede Umgebung besitzt einen eigenen simulierten Zustand:

| Komponente | Forensik | Netzwerk |
|-----------|----------|----------|
| **Filesystem** | Vollstandig (`/cases`, `/dev`, `/mnt`, etc.) | Minimal (`/etc/hosts`, `/etc/resolv.conf`) |
| **Devices** | Simulierte Blockgerate (sda, sdb, nvme) | Keine |
| **Network** | Keines | Interfaces (eth0, lo), Routing, ARP, DNS |
| **Prompt** | `analyst@forensik-workstation:<path>$` | `analyst@netzwerk-lab:<path>$` |

### Environment Switching

Beim Wechsel zwischen Labs wird automatisch die Terminal-Umgebung gewechselt:

- `setEnvironment(envId)` tauscht Befehlssatz, Dateisystem und Netzwerkstatus
- Zustand pro Umgebung wird persistent gespeichert (Verzeichniswechsel, erstellte Dateien)
- `help` zeigt nur fur die aktuelle Umgebung verfugbare Befehle

### Extensibility

Neue Umgebungen konnen durch Erweiterung der drei Arrays hinzugefugt werden:

- `TerminalBaseCommandNames` – Befehle, die immer verfugbar sind
- `TerminalForensikCommandNames` / `TerminalNetzwerkCommandNames` – Umgebungsspezifische Befehle
- `TerminalSharedNetworkFS` / `TerminalSharedNetwork` – Simulierter Zustand

### Terminal-Features

- **Pipe-Support**: `command1 | command2`
- **Chaining**: `command1 ; command2` und `command1 && command2`
- **Redirect**: `command > file`
- **Redirect stderr**: `command 2>/dev/null`
- **History**: Arrow Up/Down
- **Script-Logging**: `script session.log` / `exit`

## Projektstruktur

```
content/
  linux-forensik/
    meta.yaml                     # Lab-Metadaten (id, title, icon, description, accent, canonical_order)
    chapters/
      welcome/00-intro.md
      ch01-grundlagen/00-intro.md, 01-section.md, ...
      ch22-zeitlinienanalyse/...
  netzwerk-forensik/
    meta.yaml                     # Netzwerk-Lab Metadaten
    chapters/
      welcome/00-intro.md
      ch01-osi/00-intro.md, ...
      ch16-zusammenfassung/...

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
      terminal.js                 # Terminal-Simulation (Environment-Based)
      reference-forensik.js       # Forensik Referenz-Panel
      reference-netzwerk.js       # Netzwerk Referenz-Panel
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
git clone https://192.168.113.184/lah/forensik-trainingsplattform.git
cd forensik-trainingsplattform


# 2. Content bauen
python3 build_content.py

# 3. Im Browser offnen
# forensik-lab/index.html – kein Server notig
```

## Content bearbeiten

1. `.md`-Datei in `content/<lab>/chapters/` bearbeiten
2. `python3 build_content.py` ausfuhren
3. Seite im Browser neu laden

### Slide-Authoring

- Anleitung fur neue Slides im bestehenden Design: `docs/slide-authoring-guide.md`

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
6. Bei Bedarf Terminal-Umgebung in `terminal.js` erganzen (neues Command-Array + State)

## Routing

| Hash | Ansicht |
|------|---------|
| `#` oder `#hub` | Hub (Lab-Auswahl) |
| `#linux-forensik` | Welcome-Seite des Forensik-Labs |
| `#linux-forensik/ch03-imaging` | Spezifisches Forensik-Kapitel |
| `#netzwerk-forensik` | Welcome-Seite des Netzwerk-Labs |
| `#netzwerk-forensik/ch03-dns` | Spezifisches Netzwerk-Kapitel |

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
- Keine externen runtime-Abhangigkeiten

## Lizenz

MIT License

## Kontakt

**Hannes Lang** – ABB IT-Fahndung Training
