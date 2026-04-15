---
icon: '&#128202;'
id: ch04-ipv6
section: Adressierung
title: IPv6 – Die Zukunft
---

<h1>IPv6 &ndash; Die n&auml;chste Generation</h1>


<div class="chapter-subtitle">Die Zukunft der Adressierung</div>

<p class="chapter-intro">IPv4 hat ca. 4,3 Milliarden Adressen &ndash; die sind längst aufgebraucht. IPv6 mit 128 Bit l&ouml;st dieses Problem f&uuml;r immer. Lerne den Aufbau, Adresstypen und die automatische Konfiguration kennen.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kennst den Aufbau von IPv6-Adressen, unterscheidest die Adresstypen und wei&szligt wie Ger&auml;te sich per SLAAC selbst konfigurieren.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#127760;</div><div class="feature-text"><h3>IPv6-Aufbau</h3><p>128 Bit, Hex-Notation</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>Adresstypen</h3><p>Global, Link-Local, ULA</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#9881;</div><div class="feature-text"><h3>SLAAC</h3><p>Auto-Konfiguration</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>ip -6 addr, ping6</p></div></div></div>

<h2 class="section-title"><span class="number">4.1</span> Warum IPv6?</h2>

<strong>IPv4</strong> bietet ca. 4,3 Milliarden Adressen. Das klingt viel, ist aber weltweit längst aufgebraucht. Jedes Smartphone, jeder Laptop, jedes IoT-Gerät braucht eine IP.

<strong>IPv6</strong> löst das Problem: Statt 32 Bit (IPv4) verwendet es <strong>128 Bit</strong>. Das ergibt ca. 340 Sextillionen Adressen &ndash; mehr als Atome auf der Erde.

<blockquote><p><strong>Merke:</strong> Du musst IPv6 nicht perfekt beherrschen. Aber du solltest wissen, wie es aussieht und wie es funktioniert &ndash; es wird immer wichtiger.</p></blockquote>

<h2 class="section-title"><span class="number">4.2</span> Adressaufbau</h2>

Eine IPv6-Adresse besteht aus <strong>128 Bit</strong>, aufgeteilt in <strong>8 Gruppen</strong> à 4 Hexadezimal-Ziffern:

<div class="code-block"><div class="code-header"><button class="copy-btn">Kopieren</button></div><pre><code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code></pre></div>

Das ist lang. Zum Glück gibt es <strong>Kürzungsregeln:</strong>

1. <strong>Führende Nullen</strong> weglassen: <span class="inline-code">0db8</span> → <span class="inline-code">db8</span>
2. Eine zusammenhängende Folge von <span class="inline-code">0000</span>-Gruppen durch <span class="inline-code">::</span> ersetzen (aber nur einmal pro Adresse!)

Ergebnis: <span class="inline-code">2001:db8:85a3::8a2e:370:7334</span> &ndash; viel kürzer!

<strong>Aufbau:</strong> Die ersten 64 Bit = Netzwerkpräfix, die letzten 64 Bit = Interface-ID (Gerät).

<h2 class="section-title"><span class="number">4.3</span> Adresstypen</h2>

Nicht alle IPv6-Adressen sind gleich. Hier die wichtigsten:

| Typ | Präfix | Erklärung | Vergleich IPv4 |
|---|---|---|---|
| <strong>Global Unicast</strong> | <span class="inline-code">2000::/3</span> | Öffentlich, weltweit routingfähig | Öffentliche IP |
| <strong>Link-Local</strong> | <span class="inline-code">fe80::/10</span> | Nur im lokalen Netz, automatisch | 169.254.x.x |
| <strong>Unique Local</strong> | <span class="inline-code">fc00::/7</span> | Privat, nicht routingfähig | 192.168.x.x |
| <strong>Loopback</strong> | <span class="inline-code">::1</span> | Das Gerät selbst | 127.0.0.1 |

<blockquote><p><strong>Wichtig:</strong> Jedes Interface hat <strong>immer</strong> eine Link-Local-Adresse (<span class="inline-code">fe80::</span>), auch ohne DHCP oder Router.</p></blockquote>

<h2 class="section-title"><span class="number">4.4</span> SLAAC &ndash; Automatische Konfiguration</h2>

Eines der besten Features von IPv6: <strong>SLAAC</strong> (Stateless Address Autoconfiguration). Geräte konfigurieren sich selbst &ndash; kein DHCP-Server nötig!

<strong>Ablauf:</strong>
1. Gerät erzeugt sich eine Link-Local-Adresse (<span class="inline-code">fe80::...</span>)
2. Router sendet <strong>Router Advertisements</strong> (RA) mit dem Netzwerkpräfix
3. Gerät kombiniert Präfix + eigene Interface-ID → fertige globale IPv6-Adresse

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># IPv6-Adressen anzeigen
ip -6 addr show

# IPv6-Loopback testen
ping6 ::1

# IPv6-Routing anzeigen
ip -6 route show</code></pre></div>

<h2 class="section-title"><span class="number">4.5</span> IPv6 vs IPv4 &ndash; Die wichtigsten Unterschiede</h2>

| Eigenschaft | IPv4 | IPv6 |
|---|---|---|
| Adresslänge | 32 Bit | 128 Bit |
| Darstellung | <span class="inline-code">192.168.1.1</span> | <span class="inline-code">2001:db8::1</span> |
| DHCP nötig? | Meist ja | Nein (SLAAC) |
| Broadcast | Ja | Nein (Multicast statt Broadcast) |
| Header | Komplex (Optionen variabel) | Einfacher (festes Format) |
| Sicherheit | Optional (IPsec) | Integriert (IPsec Pflicht) |

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">IPv6-Adressen erkunden</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>IPv6-Adressen auf dem eigenen System finden und verstehen</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Zeige alle IPv6-Adressen: <code>ip -6 addr show</code></li>
<li>Finde die Link-Local-Adresse (beginnt mit <code>fe80::</code>)</li>
<li>Zeige IPv6-Routing: <code>ip -6 route show</code></li>
<li>Teste den Loopback: <code>ping6 ::1</code></li>
<li>Vergleiche: Wie viele IPv6-Adressen hat dein Interface vs. IPv4?</li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>Du wirst sehen: Jedes Interface hat mindestens eine fe80:: Link-Local-Adresse. Eventuell auch eine globale Adresse (beginnend mit 2). ping6 ::1 funktioniert immer &ndash; das ist der lokale Loopback, vergleichbar mit ping 127.0.0.1 bei IPv4.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch04-ipv6">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch03-ipv4">&#8592; Zurück</button>
<button class="nav-btn" data-target="ch05-mac-arp">Weiter &#8594;</button>
</div>

