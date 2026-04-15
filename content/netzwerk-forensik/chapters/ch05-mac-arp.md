---
icon: '&#128269;'
id: ch05-mac-arp
section: Adressierung
title: MAC-Adressen & ARP
---

<h1>MAC-Adressen und ARP</h1>


<div class="chapter-subtitle">Hardware-Adressen und Namensaufl&ouml;sung im lokalen Netz</div>

<p class="chapter-intro">Jede Netzwerkkarte hat eine eindeutige MAC-Adresse &ndash; quasi die Seriennummer der Netzwerkkarte. ARP (Address Resolution Protocol) &uuml;bersetzt IP-Adressen in MAC-Adressen, damit Daten im lokalen Netz ihr Ziel finden.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du wei&szlig;t was MAC-Adressen sind, verstehst den ARP-Prozess und kannst die ARP-Tabelle lesen.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128196;</div><div class="feature-text"><h3>MAC-Adressen</h3><p>Hardware-Adressen verstehen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128260;</div><div class="feature-text"><h3>ARP-Prozess</h3><p>IP → MAC &Uuml;bersetzung</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>ARP-Tabelle</h3><p>Cache lesen &amp; verstehen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>ip neigh, arp -a</p></div></div></div>

<h2 class="section-title"><span class="number">5.1</span> Was ist eine MAC-Adresse?</h2>

<strong>MAC</strong> (Media Access Control) = Die Hardware-Adresse jedes Netzwerkgeräts. Sie ist fest in der Netzwerkkarte gespeichert und weltweit eindeutig.

Stell dir vor, jedes Gerät im Netz hat eine feste Hausnummer &ndash; das ist die MAC-Adresse. Im Gegensatz zur IP-Adresse ändert sich die MAC nicht (außer man manipuliert sie bewusst).

<strong>Aufbau:</strong>
- 48 Bit (6 Byte), dargestellt als Hexadezimal: <span class="inline-code">AA:BB:CC:DD:EE:FF</span>
- <strong>Erste 3 Byte</strong> (AA:BB:CC): Hersteller-Kennung (<strong>OUI</strong> = Organizationally Unique Identifier)
- <strong>Letzte 3 Byte</strong> (DD:EE:FF): Eindeutige Gerätekennung

<strong>Beispiel:</strong> <span class="inline-code">08:00:27:A1:B2:C3</span> &rarr; Hersteller <span class="inline-code">08:00:27</span> = Oracle (VirtualBox)

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Eigene MAC-Adresse anzeigen
ip link show

# Nur MAC eines bestimmten Interfaces
ip link show eth0 | grep ether</code></pre></div>

<blockquote><p><strong>Merke:</strong> IP-Adresse = logische Adresse (kann sich ändern), MAC-Adresse = physische Adresse (fest).</p></blockquote>

<h2 class="section-title"><span class="number">5.2</span> ARP &ndash; Wie Geräte sich im lokalen Netz finden</h2>

<strong>ARP</strong> (Address Resolution Protocol) übersetzt IP-Adressen in MAC-Adressen. Warum nötig? Weil Daten im lokalen Netz (Layer 2) <strong>über MAC-Adressen</strong> zugestellt werden, nicht über IP-Adressen.

<strong>Der ARP-Ablauf Schritt für Schritt:</strong>

1. Gerät A will Daten an IP <span class="inline-code">192.168.1.50</span> senden
2. A schaut in seiner <strong>ARP-Tabelle</strong> (Cache) nach &ndash; ist die MAC schon bekannt?
3. Kein Eintrag? &rarr; <strong>ARP-Request</strong> an alle Geräte im Netz: <em>"Wer hat 192.168.1.50?"</em>
4. Das Gerät mit dieser IP antwortet: <em>"Ich! Meine MAC ist AA:BB:CC:DD:EE:FF"</em> (<strong>ARP-Reply</strong>)
5. Gerät A speichert den Eintrag und sendet die Daten

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># ARP-Tabelle anzeigen
ip neigh show

# Klassisch (älterer Befehl)
arp -a

# ARP-Cache leeren
sudo ip neigh flush all</code></pre></div>

<strong>Wichtig:</strong> ARP funktioniert nur <strong>im lokalen Netz</strong>. Für Geräte außerhalb des eigenen Netzes wird das <strong>Default-Gateway</strong> (Router) per ARP gesucht &ndash; der Router kümmert sich um den Rest.

<h2 class="section-title"><span class="number">5.3</span> ARP-Spoofing (Sicherheitshinweis)</h2>

Da ARP auf Vertrauen basiert (jeder kann antworten), ist es anfällig für <strong>ARP-Spoofing</strong>: Ein Angreifer sendet gefälschte ARP-Replies und leitet so den Verkehr über sein eigenes Gerät.

<strong>Gegenmaßnahmen:</strong>
- Statische ARP-Einträge (manuell gesetzt)
- <strong>DAI</strong> (Dynamic ARP Inspection) auf Managed Switches
- Netzwerk-Monitoring mit arpwatch

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Statischen ARP-Eintrag setzen (schützt vor Spoofing)
sudo ip neigh add 192.168.1.1 lladdr AA:BB:CC:DD:EE:FF dev eth0 nud permanent</code></pre></div>

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">ARP-Analyse</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>MAC-Adressen finden, ARP-Tabelle lesen und verstehen wie Geräte sich im lokalen Netz finden</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Zeige deine Netzwerk-Interfaces: <code>ip link show</code></li>
<li>Finde deine MAC-Adresse (Zeile mit <code>ether</code>)</li>
<li>Zeige die ARP-Tabelle: <code>ip neigh show</code></li>
<li>Pinge ein Gerät an: <code>ping -c 1 192.168.1.1</code></li>
<li>Prüfe ARP erneut: <code>arp -a</code> &ndash; was hat sich geändert?</li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>Nach dem Ping erscheint das Zielgerät in der ARP-Tabelle. Vorher war kein Eintrag da, nachher steht dort die MAC-Adresse des Routers. Der Status wechselt von STALE zu REACHABLE, solange Kommunikation aktiv ist.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch05-mac-arp">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch04-ipv6">&#8592; Zurück</button>
<button class="nav-btn" data-target="ch06-tcp-udp">Weiter &#8594;</button>
</div>

