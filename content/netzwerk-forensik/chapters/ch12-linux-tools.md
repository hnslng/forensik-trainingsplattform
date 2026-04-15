---
icon: '&#128187;'
id: ch12-linux-tools
section: Werkzeuge
title: Linux-Netzwerktools
---

<h1>Linux-Netzwerk-Tools</h1>


<div class="chapter-subtitle">ip, ss, nmap, curl und mehr</div>

<p class="chapter-intro">Die wichtigsten Linux-Befehle f&uuml;r die Netzwerk-Praxis. Du lernst <code>ip</code>, <code>ss</code>, <code>nmap</code>, <code>curl</code> und <code>wget</code> kennen &ndash; und wann du welchen Befehl brauchst.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kennst die wichtigsten Netzwerk-Befehle und kannst sie selbstst&auml;ndig in der Praxis einsetzen.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>ip</h3><p>Interfaces &amp; Adressen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128270;</div><div class="feature-text"><h3>ss</h3><p>Verbindungen anzeigen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>nmap</h3><p>Port-Scans</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#127760;</div><div class="feature-text"><h3>curl/wget</h3><p>HTTP &amp; Downloads</p></div></div></div>

<h2 class="section-title"><span class="number">11.1</span> ip &ndash; Das Schweizer Taschenmesser</h2>

<strong>ip</strong> ist der moderne Ersatz für <span class="inline-code">ifconfig</span>. Zeigt und konfiguriert Netzwerk-Interfaces, Adressen und Routen.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Alle Interfaces anzeigen
ip addr show

# Nur ein Interface
ip addr show eth0

# Routing-Tabelle
ip route show

# ARP-Tabelle (Nachbarn)
ip neigh show

# Interface aktivieren/deaktivieren
sudo ip link set eth0 up
sudo ip link set eth0 down</code></pre></div>

<blockquote><p><strong>Tipp:</strong> <span class="inline-code">ip a</span> = Kurzform für <span class="inline-code">ip addr show</span>. <span class="inline-code">ip r</span> = Kurzform für <span class="inline-code">ip route show</span>.</p></blockquote>

<h2 class="section-title"><span class="number">11.2</span> ss &ndash; Verbindungen anzeigen</h2>

<strong>ss</strong> (socket statistics) zeigt offene Netzwerkverbindungen &ndash; der moderne Ersatz für <span class="inline-code">netstat</span>.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Alle TCP-Verbindungen
ss -t

# Alle wartenden (listening) Ports
ss -tln

# Alle Verbindungen mit Prozess-Info
ss -tlnp

# UDP-Verbindungen
ss -uln

# Alle Verbindungen (TCP + UDP)
ss -tunap</code></pre></div>

<strong>Die Parameter:</strong>

| Parameter | Bedeutung |
|---|---|
| <span class="inline-code">-t</span> | TCP |
| <span class="inline-code">-u</span> | UDP |
| <span class="inline-code">-l</span> | Nur wartende (listening) Ports |
| <span class="inline-code">-n</span> | Keine DNS-Auflösung (schneller) |
| <span class="inline-code">-p</span> | Prozess-Info anzeigen |
| <span class="inline-code">-a</span> | Alle (auch wartende) |

<h2 class="section-title"><span class="number">11.3</span> nmap &ndash; Port-Scans</h2>

<strong>nmap</strong> (Network Mapper) scannt Hosts nach offenen Ports und Diensten. Ein unverzichtbares Diagnose- und Sicherheitstool.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Standard-Scan eines Hosts
nmap localhost

# Alle Ports (1-65535)
nmap -p- localhost

# Service-Erkennung
nmap -sV localhost

# Scan eines ganzen Netzes
nmap 192.168.1.0/24</code></pre></div>

<strong>Wichtig:</strong> Nur Systeme scannen, die dir gehören oder für die du eine Erlaubnis hast! Port-Scans können als Angriff gewertet werden.

<h2 class="section-title"><span class="number">11.4</span> curl und wget &ndash; HTTP und Downloads</h2>

<strong>curl</strong> = Daten von/z zu einem Server übertragen (hauptsächlich HTTP).
<strong>wget</strong> = Dateien aus dem Internet herunterladen.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># HTTP-Header anzeigen
curl -I https://example.com

# Datei herunterladen
wget https://example.com/file.zip

# Datei herunterladen (curl)
curl -O https://example.com/file.zip

# Nur Statuscode
curl -o /dev/null -s -w "%{http_code}\n" https://example.com

# POST-Request
curl -X POST -d "user=admin" http://example.com/login</code></pre></div>

<h2 class="section-title"><span class="number">11.5</span> &Uuml;bersicht: Wann welchen Befehl?</h2>

| Ich will... | Befehl |
|---|---|
| Meine IP-Adresse sehen | <span class="inline-code">ip addr show</span> |
| Offene Ports finden | <span class="inline-code">ss -tlnp</span> oder <span class="inline-code">nmap localhost</span> |
| Routing-Tabelle | <span class="inline-code">ip route show</span> |
| ARP-Tabelle | <span class="inline-code">ip neigh show</span> |
| Webseite aufrufen | <span class="inline-code">curl -I https://seite.de</span> |
| Datei herunterladen | <span class="inline-code">wget https://seite.de/datei.zip</span> |
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

