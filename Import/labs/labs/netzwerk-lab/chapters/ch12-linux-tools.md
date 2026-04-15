# Linux-Netzwerk-Tools


<div class="chapter-subtitle">ip, ss, nmap, curl und mehr</div>

<p class="chapter-intro">Die wichtigsten Linux-Befehle f&uuml;r die Netzwerk-Praxis. Du lernst <code>ip</code>, <code>ss</code>, <code>nmap</code>, <code>curl</code> und <code>wget</code> kennen &ndash; und wann du welchen Befehl brauchst.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kennst die wichtigsten Netzwerk-Befehle und kannst sie selbstst&auml;ndig in der Praxis einsetzen.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>ip</h3><p>Interfaces &amp; Adressen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128270;</div><div class="feature-text"><h3>ss</h3><p>Verbindungen anzeigen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>nmap</h3><p>Port-Scans</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#127760;</div><div class="feature-text"><h3>curl/wget</h3><p>HTTP &amp; Downloads</p></div></div></div>

## 11.1 ip &ndash; Das Schweizer Taschenmesser

**ip** ist der moderne Ersatz für `ifconfig`. Zeigt und konfiguriert Netzwerk-Interfaces, Adressen und Routen.

:::code bash
# Alle Interfaces anzeigen
ip addr show

# Nur ein Interface
ip addr show eth0

# Routing-Tabelle
ip route show

# ARP-Tabelle (Nachbarn)
ip neigh show

# Interface aktivieren/deaktivieren
sudo ip link set eth0 up
sudo ip link set eth0 down
:::

> **Tipp:** `ip a` = Kurzform für `ip addr show`. `ip r` = Kurzform für `ip route show`.

## 11.2 ss &ndash; Verbindungen anzeigen

**ss** (socket statistics) zeigt offene Netzwerkverbindungen &ndash; der moderne Ersatz für `netstat`.

:::code bash
# Alle TCP-Verbindungen
ss -t

# Alle wartenden (listening) Ports
ss -tln

# Alle Verbindungen mit Prozess-Info
ss -tlnp

# UDP-Verbindungen
ss -uln

# Alle Verbindungen (TCP + UDP)
ss -tunap
:::

**Die Parameter:**

| Parameter | Bedeutung |
|---|---|
| `-t` | TCP |
| `-u` | UDP |
| `-l` | Nur wartende (listening) Ports |
| `-n` | Keine DNS-Auflösung (schneller) |
| `-p` | Prozess-Info anzeigen |
| `-a` | Alle (auch wartende) |

## 11.3 nmap &ndash; Port-Scans

**nmap** (Network Mapper) scannt Hosts nach offenen Ports und Diensten. Ein unverzichtbares Diagnose- und Sicherheitstool.

:::code bash
# Standard-Scan eines Hosts
nmap localhost

# Alle Ports (1-65535)
nmap -p- localhost

# Service-Erkennung
nmap -sV localhost

# Scan eines ganzen Netzes
nmap 192.168.1.0/24
:::

**Wichtig:** Nur Systeme scannen, die dir gehören oder für die du eine Erlaubnis hast! Port-Scans können als Angriff gewertet werden.

## 11.4 curl und wget &ndash; HTTP und Downloads

**curl** = Daten von/z zu einem Server übertragen (hauptsächlich HTTP).
**wget** = Dateien aus dem Internet herunterladen.

:::code bash
# HTTP-Header anzeigen
curl -I https://example.com

# Datei herunterladen
wget https://example.com/file.zip

# Datei herunterladen (curl)
curl -O https://example.com/file.zip

# Nur Statuscode
curl -o /dev/null -s -w "%{http_code}\n" https://example.com

# POST-Request
curl -X POST -d "user=admin" http://example.com/login
:::

## 11.5 &Uuml;bersicht: Wann welchen Befehl?

| Ich will... | Befehl |
|---|---|
| Meine IP-Adresse sehen | `ip addr show` |
| Offene Ports finden | `ss -tlnp` oder `nmap localhost` |
| Routing-Tabelle | `ip route show` |
| ARP-Tabelle | `ip neigh show` |
| Webseite aufrufen | `curl -I https://seite.de` |
| Datei herunterladen | `wget https://seite.de/datei.zip` |
| Netzwerk troubleshooten | ping → traceroute → dig |

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">Tool-Rundgang</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Alle gelernten Tools einmal praktisch anwenden</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Interfaces: <code>ip addr show</code> &ndash; Wie viele Interfaces?</li>
<li>Verbindungen: <code>ss -tlnp</code> &ndash; Welche Ports lauschen?</li>
<li>Port-Scan: <code>nmap localhost</code> &ndash; Stimmt das mit ss überein?</li>
<li>Web-Request: <code>curl -I http://example.com</code></li>
<li>Routing: <code>ip route show</code> &ndash; Wo ist dein Gateway?</li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>ip addr zeigt lo (Loopback) und eth0 (Netzwerkkarte). ss -tlnp zeigt wartende Ports wie 22 (SSH) oder 80 (HTTP). nmap localhost bestätigt diese Ports. curl -I liefert HTTP-Header. ip route zeigt die Default-Route über dein Gateway.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch12-linux-tools">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch11-icmp">&#8592; Zurück</button>
<button class="nav-btn" data-target="ch12-routing">Weiter &#8594;</button>
</div>
