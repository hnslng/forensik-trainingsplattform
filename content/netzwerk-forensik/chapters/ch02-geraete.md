---
icon: '&#128187;'
id: ch02-geraete
section: Grundlagen
title: Netzwerkgeräte
---

<h1 class="chapter-title">Netzwerkger&auml;te</h1>
<div class="chapter-subtitle">Hub, Switch, Router und VLANs verstehen</div>

<p class="chapter-intro">Was ist der Unterschied zwischen Hub, Switch und Router? Wof&uuml;r brauchst du VLANs? In diesem Kapitel lernst du die Bausteine jedes Netzwerks kennen &ndash; vom einfachen Kabel bis zum intelligenten Router.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du unterscheidest Hub, Switch und Router. Du wei&szlig;t was MAC-Adressen, VLANs und Ethernet sind und hast deine eigene Netzwerkverbindung im Terminal untersucht.</p></div>

<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128268;</div><div class="feature-text"><h3>Hub vs Switch</h3><p>Der Unterschied</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128736;</div><div class="feature-text"><h3>Router</h3><p>Netzwerke verbinden</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128274;</div><div class="feature-text"><h3>VLANs</h3><p>Virtuelle Netze</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>ip, ping, arp testen</p></div></div></div><div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>

<h2 class="section-title"><span class="number">2.1</span> Ethernet &ndash; Die Basis</h2>

<strong>Ethernet</strong> ist die Technologie, die fast alle lokalen Netzwerke (LANs) verwendet. Stell es dir als die Stra&szlige; vor &ndash; auf der die Datenpakete fahren.

<strong>Wie Ethernet funktioniert:</strong>
- Ger&auml;te sind &uuml;ber Kabel (Twisted Pair) oder WLAN mit einem Switch verbunden
- Jedes Ger&auml;t hat eine eindeutige <strong>MAC-Adresse</strong> (siehe Kapitel 5)
- Daten werden in <strong>Frames</strong> (Rahmen) verpackt und versendet
- Geschwindigkeiten: 100 Mbit/s, 1 Gbit/s (Standard), 10 Gbit/s (Server)

<blockquote><p><strong>Merke:</strong> Ethernet arbeitet auf <strong>Schicht 1</strong> (Kabel/Signale) und <strong>Schicht 2</strong> (MAC-Adressen/Frames).</p></blockquote>

<h2 class="section-title"><span class="number">2.2</span> Hub, Switch und Router</h2>

Diese drei Ger&auml;te werden oft verwechselt. Hier der Unterschied:

<h3>Hub (veraltet)</h3>

Ein <strong>Hub</strong> ist das einfachste Netzwerkger&auml;t. Es empf&auml;ngt Daten und schickt sie an <strong>alle anderen Ports</strong> weiter &ndash; wie ein Lautsprecher, der jede Nachricht in jeden Raum br&uuml;llt.

- Keine Intelligenz &ndash; kennt keine MAC-Adressen
- Alle Ger&auml;te teilen sich die Bandbreite (<strong>Kollisionen</strong> m&ouml;glich)
- Heute kaum noch verwendet

<strong>Kollision</strong> = Wenn zwei Ger&auml;te gleichzeitig senden, &uuml;berschneiden sich die Signale. CSMA/CD (Carrier Sense Multiple Access with Collision Detection) regelt das.

<h3>Switch (der Standard)</h3>

Ein <strong>Switch</strong> ist intelligenter. Er lernt, welche <strong>MAC-Adresse</strong> an welchem Port h&auml;ngt, und schickt Daten <strong>nur an den richtigen Port</strong> &ndash; wie ein Postbote, der Briefe sortiert.

- Kennt MAC-Adressen (lernt sie automatisch &uuml;ber die MAC-Tabelle)
- Jedes Ger&auml;t hat die volle Bandbreite
- Grundlage jedes modernen lokalen Netzwerks

<h3>Router</h3>

Ein <strong>Router</strong> verbindet unterschiedliche Netzwerke miteinander. Wie ein Verkehrspolizist an einer Kreuzung &ndash; er wei&szlig;, wohin jedes Paket muss.

- Arbeitet mit <strong>IP-Adressen</strong> (Schicht 3)
- Verbindet z.B. dein Heimnetz (192.168.1.x) mit dem Internet
- Hat eine <strong>Routing-Tabelle</strong> mit Regeln, wohin Pakete geh&ouml;ren

<h3>Zusammenfassung</h3>

| Ger&auml;t | Arbeitet mit | Schickt Daten an | OSI-Schicht | Intelligenz |
|---|---|---|---|---|
| <strong>Hub</strong> | Signale (Bits) | Alle Ports | 1 | Keine |
| <strong>Switch</strong> | MAC-Adressen | Nur den richtigen Port | 2 | MAC-Tabelle |
| <strong>Router</strong> | IP-Adressen | Das richtige Netzwerk | 3 | Routing-Tabelle |

<h2 class="section-title"><span class="number">2.3</span> VLAN (Virtual Local Area Network)</h2>

Ein <strong>VLAN</strong> teilt einen physischen Switch in mehrere logische Netzwerke auf. Wie unsichtbare W&auml;nde in einem Gro&szlig;raumb&uuml;ro &ndash; die Abteilung Buchhaltung kann die Abteilung IT nicht sehen, obwohl alle am selben Switch h&auml;ngen.

<strong>Warum VLANs?</strong>
- <strong>Sicherheit:</strong> G&auml;ste-Netz vom Firmen-Netz trennen
- <strong>&Uuml;bersicht:</strong> Weniger Broadcast-Verkehr pro Netz
- <strong>Flexibilit&auml;t:</strong> Ger&auml;te in verschiedenen R&auml;umen k&ouml;nnen im selben VLAN sein

<div class="code-block"><div class="code-header"><button class="copy-btn">Kopieren</button></div><pre><code>Switch Port 1-10  → VLAN 10 (Buchhaltung)
Switch Port 11-20 → VLAN 20 (IT)
Switch Port 21-24 → VLAN 30 (Gäste)</code></pre></div>

Ger&auml;te in VLAN 10 k&ouml;nnen nicht direkt mit VLAN 20 kommunizieren &ndash; es sei denn, ein <strong>Router</strong> verbindet die VLANs (<strong>Router-on-a-Stick</strong>).

<strong>Tagged vs Untagged:</strong>
- <strong>Untagged (Access Port)</strong> = Port geh&ouml;rt zu genau einem VLAN, f&uuml;r Endger&auml;te (PCs, Drucker)
- <strong>Tagged (Trunk Port)</strong> = Port transportiert mehrere VLANs, f&uuml;r Switch-zu-Switch-Verbindungen

<h2 class="section-title"><span class="number">2.4</span> Netzwerktopologien</h2>

Wie sind die Ger&auml;te miteinander verbunden? Die <strong>Topologie</strong> beschreibt die Struktur:

| Topologie | Beschreibung | Vorteil | Nachteil |
|---|---|---|---|
| <strong>Stern</strong> | Alle Ger&auml;te an einem zentralen Switch | Einfach, ein Kabelausfall betr&auml;chtigt nur ein Ger&auml;t | Switch ist Single Point of Failure |
| <strong>Bus</strong> | Alle an einem gemeinsamen Kabel | Einfach, billig | Ein Kabelbruch legt alles lahm |
| <strong>Ring</strong> | Ger&auml;te bilden einen Kreis | Deterministisch | Ein Ausfall kann alles st&ouml;ren |
| <strong>Mesh</strong> | Jedes mit vielen anderen verbunden | Sehr ausfallsicher | Teuer, komplex |

In der Praxis ist <strong>Stern-Topologie</strong> (alle am Switch) der Standard. Gro&szlige Netze bestehen aus vielen Sternen, die &uuml;ber Switches und Router verbunden sind.

<h2 class="section-title"><span class="number">2.5</span> Vorbereitung: Netzwerkger&auml;te im Terminal</h2>

<div class="exercise-start-banner"><div class="exercise-start-icon">&#128187;</div><div class="exercise-start-text"><strong>Terminal-&Uuml;bung beginnt jetzt!</strong><br>Du wirst Schritt f&uuml;r Schritt deine eigene Netzwerkverbindung untersuchen und die Ger&auml;te in deinem Netz identifizieren.</div></div>

<p><strong>Was dich erwartet:</strong> Du untersuchst dein Netzwerk wie ein Administrator &ndash; Interfaces, verbundene Ger&auml;te und den Weg ins Internet.</p>

<p>Du wirst in <strong>4 Schritten</strong> lernen:</p>
<ol>
<li><strong>Interfaces anzeigen</strong> &ndash; Mit <span class="inline-code">ip link</span> deine Netzwerkkarten sehen</li>
<li><strong>IP-Konfiguration pr&uuml;fen</strong> &ndash; Mit <span class="inline-code">ip addr</span> deine Adressen lesen</li>
<li><strong>Nachbarn finden</strong> &ndash; Mit <span class="inline-code">ip neigh</span> Ger&auml;te im selben Netz sehen</li>
<li><strong>Router anpingen</strong> &ndash; Mit <span class="inline-code">ping</span> dein Gateway testen</li>
</ol>

<div class="callout callout-info"><div class="callout-header">&#9432; So funktioniert es</div><p>Auf jeder der n&auml;chsten Slides steht ein Befehl in einem grauen Code-Block. Tippe ihn <strong>exakt so</strong> ins Terminal ein und dr&uuml;cke Enter. Unter dem Befehl siehst du die <strong>erwartete Ausgabe</strong> &ndash; vergleiche sie mit dem, was dein Terminal anzeigt.</p></div>

<div class="callout callout-warning"><div class="callout-header">&#9888; Keine Angst vor Fehlern!</div><p>Du kannst nichts kaputt machen &ndash; das Terminal ist simuliert. Wenn etwas nicht klappt, tippe den Befehl einfach nochmal.</p></div>

<h2 class="section-title"><span class="number">2.6</span> &Uuml;bung: Netzwerk-Interfaces anzeigen</h2>

Dein Rechner hat mindestens zwei Netzwerk-Interfaces: <strong>lo</strong> (Loopback &ndash; der Rechner spricht mit sich selbst) und <strong>eth0</strong> (deine echte Netzwerkkarte). Mit <span class="inline-code">ip link</span> siehst du sie alle.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ip link</code></pre></div>

<p><strong>Erwartete Ausgabe im Terminal:</strong></p>
<p><strong>Erwartete Ausgabe im Terminal:</strong></p>
<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>1: lo: &lt;LOOPBACK,UP&gt; mtu 65536 qdisc noqueue state UNKNOWN
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: eth0: &lt;BROADCAST,MULTICAST,UP&gt; mtu 1500 qdisc fq_codel state UP
    link/ether 08:00:27:a1:b2:c3 brd ff:ff:ff:ff:ff:ff</code></pre></div>

<div class="table-container"><table><thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead><tbody>
<tr><td><span class="inline-code">lo</span></td><td>Loopback-Interface (127.0.0.1) &ndash; intern, immer da</td></tr>
<tr><td><span class="inline-code">eth0</span></td><td>Deine physische Netzwerkkarte</td></tr>
<tr><td><span class="inline-code">&lt;...UP&gt;</span></td><td>Interface ist aktiv (UP = an, DOWN = aus)</td></tr>
<tr><td><span class="inline-code">mtu 1500</span></td><td>Maximum Transmission Unit &ndash; maximale Gr&ouml;&szlig;e eines Frames (Standard: 1500 Bytes)</td></tr>
<tr><td><span class="inline-code">link/ether</span></td><td>Die MAC-Adresse dieses Interfaces (Schicht 2)</td></tr>
</tbody></table></div>

<div class="callout callout-tip"><div class="callout-header">&#128161; MTU warum wichtig?</div><p>Wenn die MTU zu klein ist, werden Pakete fragmentiert (in St&uuml;cke geteilt). Das macht Verbindungen langsamer. 1500 Bytes ist der Ethernet-Standard.</p></div>

<h2 class="section-title"><span class="number">2.7</span> &Uuml;bung: IP-Konfiguration pr&uuml;fen</h2>

Jetzt schaust du dir die IP-Adressen deiner Interfaces an. Das ist die Schicht-3-Information.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ip addr</code></pre></div>

<p><strong>Erwartete Ausgabe im Terminal:</strong></p>
<p><strong>Erwartete Ausgabe im Terminal:</strong></p>
<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>1: lo: &lt;LOOPBACK,UP&gt; mtu 65536
    inet 127.0.0.1/8 scope host lo
2: eth0: &lt;BROADCAST,MULTICAST,UP&gt; mtu 1500
    link/ether 08:00:27:a1:b2:c3 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0</code></pre></div>

<div class="table-container"><table><thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead><tbody>
<tr><td><span class="inline-code">127.0.0.1/8</span></td><td>Loopback-Adresse &ndash; dein Rechner spricht mit sich selbst</td></tr>
<tr><td><span class="inline-code">192.168.1.100/24</span></td><td>Deine echte IP-Adresse im lokalen Netz</td></tr>
<tr><td><span class="inline-code">brd 192.168.1.255</span></td><td>Broadcast-Adresse &ndash; an diese Adresse gehen Nachrichten an alle im Netz</td></tr>
<tr><td><span class="inline-code">scope global</span></td><td>Diese Adresse ist im ganzen Netz g&uuml;ltig (nicht nur lokal)</td></tr>
</tbody></table></div>

<h2 class="section-title"><span class="number">2.8</span> &Uuml;bung: Benachbarte Ger&auml;te finden</h2>

Welche Ger&auml;te sind in deinem Netz? Die <strong>ARP-Tabelle</strong> zeigt dir, welche MAC-Adressen dein Rechner kennt &ndash; das sind die Ger&auml;te, mit denen er k&uuml;rzlich kommuniziert hat.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ip neigh</code></pre></div>

<p><strong>Erwartete Ausgabe im Terminal:</strong></p>
<p><strong>Erwartete Ausgabe im Terminal:</strong></p>
<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>192.168.1.1 dev eth0 lladdr aa:bb:cc:dd:ee:01 REACHABLE
192.168.1.50 dev eth0 lladdr aa:bb:cc:dd:ee:02 STALE</code></pre></div>

<div class="table-container"><table><thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead><tbody>
<tr><td><span class="inline-code">192.168.1.1</span></td><td>IP-Adresse des Nachbarn (wahrscheinlich dein Router)</td></tr>
<tr><td><span class="inline-code">lladdr</span></td><td>Link-Layer-Adresse = MAC-Adresse des Ger&auml;ts</td></tr>
<tr><td><span class="inline-code">REACHABLE</span></td><td>Ger&auml;t ist aktuell erreichbar &ndash; ARP-Eintrag ist frisch</td></tr>
<tr><td><span class="inline-code">STALE</span></td><td>Eintrag ist &auml;lter &ndash; bei n&auml;chstem Kontakt wird er erneuert</td></tr>
</tbody></table></div>

<div class="callout callout-tip"><div class="callout-header">&#128161; Switch vs. Router erkennen</div><p>Wenn nur eine IP auftaucht (meist .1), ist das dein Router. Mehrere IPs bedeuten: Mehrere Ger&auml;te im selben Netz. Die MAC-Adresse verr&auml;t den Hersteller &ndash; n&uuml;tzlich bei der Fehlersuche.</p></div>

<h2 class="section-title"><span class="number">2.9</span> &Uuml;bung: Router (Gateway) anpingen</h2>

Dein Router ist das wichtigste Ger&auml;t &ndash; er verbindet dein lokales Netz mit dem Internet. Teste ob er erreichbar ist:

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ping -c 2 192.168.1.1</code></pre></div>

<p><strong>Erwartete Ausgabe im Terminal:</strong></p>
<p><strong>Erwartete Ausgabe im Terminal:</strong></p>
<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=1.2 ms
64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.8 ms
--- 192.168.1.1 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss</code></pre></div>

<div class="table-container"><table><thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead><tbody>
<tr><td><span class="inline-code">192.168.1.1</span></td><td>Dein Standard-Gateway (Router)</td></tr>
<tr><td><span class="inline-code">time=1.2 ms</span></td><td>Sehr schnell &ndash; der Router ist direkt in deinem lokalen Netz</td></tr>
<tr><td><span class="inline-code">0% packet loss</span></td><td>Router ist erreichbar &ndash; Schicht-3-Verbindung funktioniert</td></tr>
</tbody></table></div>

<div class="callout callout-tip"><div class="callout-header">&#128161; Warum den Router anpingen?</div><p>Wenn der Router nicht antwortet, hast du kein Internet. Erster Diagnoseschritt: <span class="inline-code">ping</span> zum Gateway. Antwortet er? Dann liegt das Problem weiter drau&szlig;en. Antwortet er nicht? Dann ist etwas im lokalen Netz kaputt.</p></div>

<div class="callout callout-success"><div class="callout-header">&#10003; Geschafft!</div><p>Du hast deine Netzwerkger&auml;te erkundet: <span class="inline-code">ip link</span> zeigt die Interfaces, <span class="inline-code">ip addr</span> die IP-Adressen, <span class="inline-code">ip neigh</span> die Nachbarn und <span class="inline-code">ping</span> testet die Verbindung. Genau so arbeitet ein Netzwerk-Administrator!</p></div>

<button class="complete-section-btn" data-chapter="ch02-geraete">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch01-osi">&#8592; Zur&uuml;ck</button>
<button class="nav-btn" data-target="ch03-ipv4">Weiter &#8594;</button>
</div>

