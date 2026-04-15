---
icon: '&#128274;'
id: ch08-dhcp
section: Protokolle
title: DHCP – Automatische IP-Vergabe
---

<h1>DHCP &ndash; Automatische Adressvergabe</h1>


<div class="chapter-subtitle">Wie jedes Ger&auml;t automatisch eine IP-Adresse bekommt</div>

<p class="chapter-intro">Wenn du deinen Laptop ins WLAN einloggst, bekommt er sofort eine IP-Adresse. Das macht DHCP automatisch &ndash; du musst nichts konfigurieren. Lerne wie der DORA-Prozess funktioniert und wie du IPs manuell setzt.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du verstehst wie DHCP funktioniert (DORA-Prozess), wei&szligt was eine Lease-Time ist und kannst IP-Adressen manuell konfigurieren.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128230;</div><div class="feature-text"><h3>DORA-Prozess</h3><p>Discover bis Acknowledge</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128197;</div><div class="feature-text"><h3>Lease-Time</h3><p>Der IP-Mietvertrag</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128736;</div><div class="feature-text"><h3>Statische IP</h3><p>Manuell konfigurieren</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>ip addr, resolv.conf</p></div></div></div>

<h2 class="section-title"><span class="number">8.1</span> Was ist DHCP?</h2>

<strong>DHCP</strong> (Dynamic Host Configuration Protocol) = Automatische Vergabe von IP-Adressen. Stell dir vor, jeder Gast in einem Hotel bekommt automatisch ein Zimmer zugewiesen &ndash; genau das macht DHCP für Geräte im Netz.

<strong>Ohne DHCP</strong> müsstest du jedem Gerät manuell eine IP-Adresse, Subnetzmaske, Gateway und DNS-Server eintragen. Bei 50 Geräten im Büro ein Albtraum.

<strong>Was DHCP verteilt:</strong>
- IP-Adresse + Subnetzmaske
- Default-Gateway (Router)
- DNS-Server
- Optional: NTP-Server, Domain-Name

<h2 class="section-title"><span class="number">8.2</span> Der DORA-Prozess</h2>

Wenn ein Gerät ins Netz kommt, läuft dieser 4-Schritte-Prozess ab:

<div class="code-block"><div class="code-header"><button class="copy-btn">Kopieren</button></div><pre><code>Client                              DHCP-Server
  │─── DISCOVER (Broadcast) ──────▶│  "Hallo! Ich brauche eine IP!"
  │◀── OFFER ──────────────────────│  "Nimm 192.168.1.50, 24h gültig"
  │─── REQUEST ───────────────────▶│  "Okay, ich nehme die 192.168.1.50"
  │◀── ACK ────────────────────────│  "Bestätigt. Hast du für 24 Stunden."</code></pre></div>

<strong>DORA</strong> = <strong>D</strong>iscover, <strong>O</strong>ffer, <strong>R</strong>equest, <strong>A</strong>cknowledge

<strong>Lease-Time</strong> = Wie lange das Gerät die IP behalten darf (meist 24h). Nach Ablauf muss sie erneuert werden &ndash; wie einen Mietvertrag verlängern.

<blockquote><p><strong>Wichtig:</strong> Der DISCOVER geht als <strong>Broadcast</strong> an alle Geräte im Netz. Deshalb funktioniert DHCP nur im lokalen Netz.</p></blockquote>

<h2 class="section-title"><span class="number">8.3</span> DHCP-Informationen anzeigen und steuern</h2>

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Aktuelle IP und Interface-Infos anzeigen
ip addr show eth0

# DHCP-Lease erneuern (IP abgeben und neu holen)
sudo dhclient -r eth0      # Aktuelle IP abgeben (Release)
sudo dhclient eth0          # Neue IP anfordern (Discover)

# DNS-Konfiguration anzeigen
cat /etc/resolv.conf

# Statische Host-Auflösung anzeigen
cat /etc/hosts</code></pre></div>

<h2 class="section-title"><span class="number">8.4</span> Statische IP-Adresse setzen</h2>

Manchmal braucht ein Gerät eine feste IP (z.B. Server, Drucker). Dann deaktivierst du DHCP und setzt die IP manuell.

<strong>Temporär</strong> (bis zum Neustart):
<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>sudo ip addr add 192.168.1.100/24 dev eth0
sudo ip link set eth0 up
sudo ip route add default via 192.168.1.1</code></pre></div>

<strong>Dauerhaft</strong> (Netplan unter Ubuntu):

Datei <span class="inline-code">/etc/netplan/01-static.yaml</span>:
<div class="code-block"><div class="code-header"><span class="lang">YAML</span><button class="copy-btn">Kopieren</button></div><pre><code>network:
  version: 2
  ethernets:
    eth0:
      addresses:
        - 192.168.1.100/24
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses:
          - 8.8.8.8
          - 8.8.4.4</code></pre></div>

Anwenden: <span class="inline-code">sudo netplan apply</span>

<blockquote><p><strong>Tipp:</strong> Server sollten immer eine statische IP haben. Clients (Laptops, Handys) nutzen DHCP.</p></blockquote>

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">Netzwerkkonfiguration prüfen</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Die aktuelle Netzwerkkonfiguration auslesen und verstehen</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Zeige deine IP-Adresse: <code>ip addr show</code></li>
<li>Welches Interface? Welche IP? Welches Netz?</li>
<li>Zeige DNS-Config: <code>cat /etc/resolv.conf</code></li>
<li>Zeige Gateway: <code>ip route show</code></li>
<li>Zeige Host-Tabelle: <code>cat /etc/hosts</code></li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>Du siehst dein Interface (z.B. eth0), deine IP (z.B. 192.168.1.100/24) und das Gateway (default via 192.168.1.1). resolv.conf zeigt den DNS-Server. /etc/hosts enthält statische Zuordnungen &ndash; dort ist immer 127.0.0.1 localhost eingetragen.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch08-dhcp">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch07-dns">&#8592; Zurück</button>
<button class="nav-btn" data-target="ch09-http">Weiter &#8594;</button>
</div>

