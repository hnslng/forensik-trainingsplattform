# 🌐 Netzwerktechnik Lab

Interaktive Lernplattform für Netzwerkgrundlagen – 15 Kapitel mit simuliertem Terminal, Übungen und Erklärungen.

## Features

- 🎯 **15 Kapitel** von OSI-Modell bis Troubleshooting
- 💻 **Simuliertes Terminal** mit 12+ Netzwerk-Befehlen (ping, dig, nmap, curl, ip, ss, tshark...)
- 📝 **Markdown-basiert** – Inhalte lassen sich einfach bearbeiten und erweitern
- 🌙 **Dark Theme** – angenehmes Lernen
- ✅ **Fortschritt** – Kapitel als abgeschlossen markieren
- 📱 **Responsive** – funktioniert auf Desktop und Tablet
- 🚫 **Keine Abhängigkeiten** – Vanilla HTML/CSS/JS, kein Framework

## Schnellstart

### Lokal öffnen

Einfach `index.html` im Browser öffnen:

```bash
# Option 1: Direkt öffnen
xdg-open index.html

# Option 2: Lokaler Server (empfohlen für Fetch-API)
python3 -m http.server 8080
# Dann: http://localhost:8080
```

### Mit HTTP-Server (empfohlen)

Der Markdown-Loader nutzt `fetch()` um Kapitel-Dateien zu laden. Das braucht einen HTTP-Server.

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve .

# PHP
php -S localhost:8080
```

## Projektstruktur

```
netzwerk-lab/
├── index.html              ← Hauptseite (SPA)
├── chapters.json           ← Kapitel-Konfiguration
├── README.md               ← Dieses Dokument
│
├── chapters/               ← Kapitel-Inhalte (Markdown)
│   ├── ch01-osi.md
│   ├── ch02-geraete.md
│   ├── ch03-ipv4.md
│   ├── ch04-ipv6.md
│   ├── ch05-mac-arp.md
│   ├── ch06-tcp-udp.md
│   ├── ch07-dns.md
│   ├── ch08-dhcp.md
│   ├── ch09-http.md
│   ├── ch10-icmp.md
│   ├── ch11-linux-tools.md
│   ├── ch12-routing.md
│   ├── ch13-firewall.md
│   ├── ch14-wireshark.md
│   └── ch15-casestudy.md
│
└── assets/
    ├── css/
    │   └── style.css       ← Dark Theme Styles
    └── js/
        ├── app.js          ← Haupt-App (Navigation, Slides, Progress)
        ├── markdown-loader.js ← Markdown → HTML Parser
        └── terminal.js     ← Terminal-Simulator
```

## Neues Kapitel hinzufügen

### 1. Markdown-Datei erstellen

`chapters/ch16-mein-thema.md`:

```markdown
# Mein Thema

## 16.1 Einführung

Hier kommt der Inhalt...

:::callout info Wichtig
Das ist ein Info-Callout.
:::

:::code bash
echo "Code-Beispiel"
:::

:::exercise Meine Übung
**Ziel:** Etwas lernen
**Schritte:**
- Schritt 1
- Schritt 2
**Lösung:** Hier steht die Lösung.
:::

:::nav-buttons prev="ch15-casestudy" next="welcome"
```

### 2. In chapters.json eintragen

```json
{
  "id": "ch16-mein-thema",
  "file": "ch16-mein-thema.md",
  "title": "Mein Thema",
  "section": "Erweitert"
}
```

Fertig! Die App lädt das Kapitel automatisch.

## Markdown-Syntax (Erweiterungen)

Neben Standard-Markdown (Überschriften, Tabellen, Listen, Code) gibt es spezielle Blöcke:

### Callouts

```markdown
:::callout context Warum ist das wichtig?
Erklärung hier...
:::
```

Typen: `context`, `info`, `warning`, `tip`, `danger`

### Code-Blöcke

```markdown
:::code bash
ping -c 4 8.8.8.8
:::
```

### Übungen

```markdown
:::exercise Titel der Übung
**Ziel:** Was gelernt werden soll
**Schritte:**
- Schritt 1
- Schritt 2
**Lösung:** Die Lösung
:::
```

### Navigation

```markdown
:::nav-buttons prev="ch01-osi" next="ch03-ipv4"
```

## Terminal-Befehle

Das simulierte Terminal unterstützt:

| Befehl | Funktion |
|---|---|
| `ping [host]` | Erreichbarkeit testen |
| `traceroute [host]` | Weg zum Ziel |
| `dig [domain] [type]` | DNS-Records |
| `nslookup [domain]` | Einfache DNS-Abfrage |
| `curl [url]` | HTTP-Request |
| `ip addr\|route\|neigh` | Netzwerk-Info |
| `ss [-tunap]` | Verbindungen |
| `nmap [target]` | Port-Scan |
| `tshark [options]` | Traffic-Analyse |
| `arp [-a]` | ARP-Tabelle |
| `cat /etc/resolv.conf` | DNS-Konfiguration |
| `hostname` | Hostname |
| `clear` | Terminal leeren |
| `help` | Hilfe anzeigen |

## Im Terminal neue Befehle hinzufügen

In `assets/js/terminal.js` einen neuen Case im `switch` hinzufügen:

```javascript
case 'meinbefehl': this.cmdMeinBefehl(args); break;
```

Und die Methode implementieren:

```javascript
InteractiveTerminal.prototype.cmdMeinBefehl = function (args) {
  this.print('Ausgabe meines Befehls');
};
```

## Deployment

### Statischer Server (Nginx)

```nginx
server {
    listen 80;
    server_name netzwerk.hanneslang.de;
    root /var/www/netzwerk-lab;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Docker

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
```

```bash
docker build -t netzwerk-lab .
docker run -p 8080:80 netzwerk-lab
```

## Technologie

- **Kein Framework** – Vanilla JavaScript, keine Build-Tools
- **Markdown-basiert** – Inhalte in `.md` Dateien, nicht hardcodiert
- **Fetch API** – Kapitel werden dynamisch geladen
- **localStorage** – Fortschritt wird lokal gespeichert
- **CSS Custom Properties** – Einfach anpassbares Theme

## Lizenz

MIT – frei verwenden und anpassen.

## Autor

Hannes Lang
