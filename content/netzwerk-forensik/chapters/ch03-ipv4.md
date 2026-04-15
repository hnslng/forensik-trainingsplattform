---
icon: '&#128202;'
id: ch03-ipv4
section: Adressierung
title: IPv4 – Adressierung und Subnetting
---

<h1>IPv4 &ndash; Adressierung und Subnetting</h1>


<div class="chapter-subtitle">Die Hausnummern des Internets</div>

<p class="chapter-intro">IPv4-Adressen sind die Hausnummern des Internets. Jedes Ger&auml;t im Netz braucht eine &ndash; egal ob PC, Smartphone oder Drucker. Lerne wie sie aufgebaut sind, was Subnetzmasken bewirken und wie du Netze selbst aufteilst.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du verstehst den Aufbau von IPv4-Adressen, kennst CIDR-Notation und kannst einfache Subnetting-Aufgaben l&ouml;sen.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128203;</div><div class="feature-text"><h3>IPv4-Aufbau</h3><p>4 Oktetts verstehen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128200;</div><div class="feature-text"><h3>Subnetting</h3><p>Netze aufteilen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#127760;</div><div class="feature-text"><h3>CIDR</h3><p>/24, /26, /30</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>ip addr, ip route</p></div></div></div>

<h2 class="section-title"><span class="number">3.1</span> Was ist eine IP-Adresse?</h2>

<strong>IP</strong> (Internet Protocol) verwaltet Adressen im Netzwerk. Jedes Ger&auml;t braucht eine <strong>IP-Adresse</strong> &ndash; wie eine Hausnummer auf der Stra&szlige;.

Ohne IP-Adresse kein Netzwerk. Wenn dein Laptop "kein Internet" hat, ist oft die IP-Adresse das Problem.

<strong>IPv4</strong> (Internet Protocol Version 4) = <strong>32 Bit</strong>, aufgeteilt in 4 Gruppen (<strong>Oktetts</strong>):

<div class="code-block"><div class="code-header"><button class="copy-btn">Kopieren</button></div><pre><code>192.168.1.100
 ^^^ ^^^ ^^^ ^^^
  1   2   3   4   = 4 Oktetts, je 0-255</code></pre></div>

Jedes Oktett hat 8 Bit = 256 m&ouml;gliche Werte (0 bis 255). Insgesamt: 4,3 Milliarden Adressen &ndash; was heute nicht mehr genug ist (deshalb IPv6, Kapitel 4).

<h2 class="section-title"><span class="number">3.2</span> Aufbau einer IPv4-Adresse</h2>

Eine IP-Adresse besteht aus <strong>zwei Teilen</strong>:
- <strong>Netzanteil:</strong> Identifiziert das Netzwerk (wie die Postleitzahl)
- <strong>Hostanteil:</strong> Identifiziert das Ger&auml;t im Netz (wie die Hausnummer)

Die <strong>Subnetzmaske</strong> bestimmt, wo die Trennung liegt:

<div class="code-block"><div class="code-header"><button class="copy-btn">Kopieren</button></div><pre><code>IP-Adresse:     192.168.1.100
Subnetzmaske:   255.255.255.0
                  ├── Netz ──┤ Host ┤</code></pre></div>

Bei <span class="inline-code">/24</span> (oder 255.255.255.0): Die ersten 24 Bit sind das Netz, die letzten 8 Bit der Host. Das bedeutet: <strong>254 Ger&auml;te</strong> in diesem Netz.

<blockquote><p><strong>Merke:</strong> Die Subnetzmaske <em>ist</em> die Trennlinie. Alles was in der Maske 255 ist = Netz. Alles was 0 ist = Host.</p></blockquote>

<h2 class="section-title"><span class="number">3.3</span> Private Adressbereiche (RFC 1918)</h2>

Nicht alle IP-Adressen sind &ouml;ffentlich. <strong>Private IP-Adressen</strong> sind nur im lokalen Netz g&uuml;ltig und werden nicht im Internet geroutet. Dein Router &uuml;bersetzt sie per <strong>NAT</strong> (Network Address Translation) in eine &ouml;ffentliche Adresse.

| Privater Bereich | CIDR | Anzahl Adressen | Verwendung |
|---|---|---|---|
| 10.0.0.0 &ndash; 10.255.255.255 | /8 | 16,7 Millionen | Gro&szlige Firmen |
| 172.16.0.0 &ndash; 172.31.255.255 | /12 | 1 Million | Mittlere Netzwerke |
| 192.168.0.0 &ndash; 192.168.255.255 | /16 | 65.534 | <strong>Heimnetzwerke</strong> |

<blockquote><p>Dein Heimnetzwerk nutzt fast sicher <span class="inline-code">192.168.x.x</span>. Der Router vergibt diese Adressen per DHCP (Kapitel 8).</p></blockquote>

<strong>Sonder-Adressen:</strong>
- <span class="inline-code">127.0.0.1</span> = Loopback (dein eigener Rechner, "localhost")
- <span class="inline-code">0.0.0.0</span> = Alle Interfaces / "keine Adresse"
- <span class="inline-code">255.255.255.255</span> = Broadcast an alle

<h2 class="section-title"><span class="number">3.4</span> CIDR &ndash; Kompakte Schreibweise</h2>

<strong>CIDR</strong> (Classless Inter-Domain Routing, sprich: "saider") = Die kompakte Schreibweise f&uuml;r Subnetzmasken. <span class="inline-code">/24</span> bedeutet: 24 von 32 Bits sind Netzanteil.

<div class="code-block"><div class="code-header"><button class="copy-btn">Kopieren</button></div><pre><code>/24  →  255.255.255.0    →  254 Hosts  (Heimnetz)
/25  →  255.255.255.128  →  126 Hosts  (2 Subnetze)
/26  →  255.255.255.192  →   62 Hosts  (4 Subnetze)
/28  →  255.255.255.240  →   14 Hosts  (Management)
/30  →  255.255.255.252  →    2 Hosts  (Punkt-zu-Punkt)</code></pre></div>

<strong>Die Formel:</strong> <span class="inline-code">Hosts = 2^H − 2</span> (H = Anzahl Host-Bits, −2 f&uuml;r Netz- und Broadcast-Adresse)

<h2 class="section-title"><span class="number">3.5</span> Subnetting &ndash; Netze aufteilen</h2>

<strong>Subnetting</strong> = Ein gro&szlig;es Netz in kleinere aufteilen. Warum? &Uuml;bersicht, Sicherheit, Effizienz.

| CIDR | Subnetzmaske | Hosts | Praxisbeispiel |
|---|---|---|---|
| /24 | 255.255.255.0 | 254 | Heimnetzwerk |
| /25 | 255.255.255.128 | 126 | Zwei Abteilungen |
| /26 | 255.255.255.192 | 62 | Vier kleine Netze |
| /27 | 255.255.255.224 | 30 | Server-Segment |
| /28 | 255.255.255.240 | 14 | Management-Netz |

<h3>Subnetting-Beispiel: Schritt f&uuml;r Schritt</h3>

<strong>Aufgabe:</strong> Teile <span class="inline-code">192.168.1.0/24</span> in 4 gleich gro&szlige; Subnetze.

<strong>Schritt 1:</strong> Wie viele Bits brauche ich zus&auml;tzlich? 4 Subnetze = 2^2 → <strong>2 Bits mehr</strong>

<strong>Schritt 2:</strong> Neue Maske: /24 + 2 = <strong>/26</strong> (255.255.255.192)

<strong>Schritt 3:</strong> Subnetze berechnen:

<div class="code-block"><div class="code-header"><button class="copy-btn">Kopieren</button></div><pre><code>Subnetz 1: 192.168.1.0/26    Hosts: .1 – .62     Broadcast: .63
Subnetz 2: 192.168.1.64/26   Hosts: .65 – .126    Broadcast: .127
Subnetz 3: 192.168.1.128/26  Hosts: .129 – .190   Broadcast: .191
Subnetz 4: 192.168.1.192/26  Hosts: .193 – .254   Broadcast: .255</code></pre></div>

<strong>Wichtig &ndash; drei besondere Adressen pro Subnetz:</strong>
- <strong>Netzwerk-Adresse</strong> = Erste Adresse (identifiziert das Netz, kann kein Ger&auml;t haben)
- <strong>Broadcast-Adresse</strong> = Letzte Adresse (an alle Ger&auml;te im Subnetz gleichzeitig)
- <strong>Host-Adressen</strong> = Alles dazwischen (das sind deine nutzbaren IPs)

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Eigene IP und Subnetz anzeigen
ip addr show

# Routing-Tabelle (zeigt Netz-Größe)
ip route show</code></pre></div>

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">IP-Adressierung analysieren</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>IP-Konfiguration lesen und Subnetting nachvollziehen</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Zeige deine IP-Adresse: <code>ip addr show</code></li>
<li>Welche IP? Welches Subnetz (/xx)?</li>
<li>Berechne: Wie viele Hosts sind in deinem Subnetz m&ouml;glich?</li>
<li>Zeige die Routing-Tabelle: <code>ip route show</code></li>
<li>Zeige die ARP-Tabelle: <code>ip neigh show</code></li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>Beispiel: 192.168.1.100/24 → Netz 192.168.1.0, Broadcast 192.168.1.255, Hosts .1 bis .254 = 254 m&ouml;gliche Hosts (2^8 − 2). Die Routing-Tabelle zeigt die default-Route &uuml;ber deinen Router. ip neigh zeigt MAC-Adressen von Ger&auml;ten im selben Subnetz.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch03-ipv4">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch02-geraete">&#8592; Zur&uuml;ck</button>
<button class="nav-btn" data-target="ch04-ipv6">Weiter &#8594;</button>
</div>

