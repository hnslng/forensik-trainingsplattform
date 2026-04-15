---
icon: '&#127760;'
id: ch01-osi
section: Grundlagen
title: Netzwerkmodelle (OSI & TCP/IP)
---

<h1 class="chapter-title">Netzwerkmodelle (OSI &amp; TCP/IP)</h1>
<div class="chapter-subtitle">Die Grundlage jedes Netzwerkverständnisses</div>

<p class="chapter-intro">Lerne die zwei wichtigsten Netzwerkmodelle kennen: das 7-Schichten OSI-Modell und das 4-Schichten TCP/IP-Modell. Verstehe, wie Datenkapselung funktioniert und warum diese Modelle für die Praxis entscheidend sind.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du wei&szlig;t was ein Netzwerkmodell ist, kennst die 7 OSI-Schichten und das TCP/IP-Modell. Du verstehst Datenkapselung und hast die Schichten im Terminal selbst ausprobiert.</p></div>

<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128225;</div><div class="feature-text"><h3>OSI-Modell</h3><p>7 Schichten verstehen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#127760;</div><div class="feature-text"><h3>TCP/IP</h3><p>Das Praxis-Modell</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128230;</div><div class="feature-text"><h3>Datenkapselung</h3><p>Wie Daten verpackt werden</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>ip, ping, neigh im Terminal</p></div></div></div><div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>

<h2 class="section-title"><span class="number">1.1</span> Was ist ein Netzwerkmodell?</h2>

Ein <strong>Netzwerkmodell</strong> beschreibt, wie Daten von einem Gerät zum anderen gelangen. Es teilt den gesamten Prozess in <strong>Schichten</strong> (englisch: <em>Layers</em>) auf – wie eine Fabrik, in der jede Abteilung eine bestimmte Aufgabe hat.

Stell dir vor, du schickst ein Paket: Du packst es ein (Schicht 7), bekommst eine Sendungsnummer (Schicht 4), das Paketzentrum route es weiter (Schicht 3), der LKW transportiert es (Schicht 1). Jeder Schritt hat seine eigene Aufgabe.

<h2 class="section-title"><span class="number">1.2</span> Das OSI-Modell (Open Systems Interconnection)</h2>

<strong>OSI</strong> (<strong>O</strong>pen <strong>S</strong>ystems <strong>I</strong>nterconnection) hat <strong>7 Schichten</strong>. Es ist vor allem ein Lernmodell – in der Praxis wird eher das TCP/IP-Modell verwendet. Aber es hilft enorm zu verstehen, was wo passiert.

| Schicht | Name | Was passiert hier | Beispiele |
|---|---|---|---|
| 7 | <strong>Application</strong> (Anwendung) | Programme, die der Nutzer sieht | Webbrowser, E-Mail-Programm |
| 6 | <strong>Presentation</strong> (Darstellung) | Daten umformatieren, verschlüsseln | Verschlüsselung, Zeichencodierung |
| 5 | <strong>Session</strong> (Sitzung) | Verbindung zwischen zwei Programmen aufbauen | Login-Sitzung |
| 4 | <strong>Transport</strong> | Daten korrekt und vollständig übertragen | TCP, UDP (siehe Kapitel 6) |
| 3 | <strong>Network</strong> (Vermittlung) | Den Weg durchs Netz finden (Routing) | IP-Adressen |
| 2 | <strong>Data Link</strong> (Sicherung) | Daten im lokalen Netz zustellen | Ethernet, WLAN |
| 1 | <strong>Physical</strong> (Bitübertragung) | Physikalische Signale auf dem Kabel oder Funk | Kabel, Signale |

<strong>Eselsbrücke (von unten nach oben):</strong> <strong>P</strong>lease <strong>D</strong>o <strong>N</strong>ot <strong>T</strong>hrow <strong>S</strong>ausage <strong>P</strong>izza <strong>A</strong>way

<div class="callout callout-tip"><div class="callout-header">&#128161; In der Praxis</div><p>Wenn ein Kollege sagt "Das ist ein Schicht-2-Problem", meint er: Irgendwas stimmt nicht mit dem lokalen Netz (Ethernet, WLAN, Switch). "Schicht-3" heißt Routing/IP-Problem. "Schicht-7" heißt das Programm selbst hat einen Fehler. Mit diesem Modell kannst du Probleme **einordnen**.</p></div>

<h2 class="section-title"><span class="number">1.3</span> Das TCP/IP-Modell</h2>

<strong>TCP/IP</strong> (<strong>T</strong>ransmission <strong>C</strong>ontrol <strong>P</strong>rotocol / <strong>I</strong>nternet <strong>P</strong>rotocol) hat <strong>4 Schichten</strong> und ist das Modell, das im echten Internet verwendet wird.

| Schicht | Name | Entspricht OSI-Schichten |
|---|---|---|
| 4 | <strong>Application</strong> (Anwendung) | OSI 5 + 6 + 7 |
| 3 | <strong>Transport</strong> | OSI 4 |
| 2 | <strong>Internet</strong> | OSI 3 |
| 1 | <strong>Network Access</strong> (Netzzugang) | OSI 1 + 2 |

<strong>Für die Praxis:</strong> Wenn jemand sagt "Das ist ein Schicht-3-Problem", meint er das OSI-Modell (also IP/Routing). "Schicht-7" bedeutet das Programm selbst.

<h2 class="section-title"><span class="number">1.4</span> Datenkapselung (Encapsulation)</h2>

Stell dir vor, du schickst einen Brief:
1. Du schreibst den Brief (Daten)
2. Du steckst ihn in einen Umschlag mit Name (TCP-Header)
3. Du schreibst die Adresse drauf (IP-Header)
4. Der Postbote braucht die Hausnummer (MAC-Adresse)
5. Der Brief wird physisch zugestellt

So ähnlich funktioniert <strong>Datenkapselung</strong>:

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>Anwendungsdaten (z.B. Webseite)
  → TCP/UDP-Header wird davor gepackt = Segment
    → IP-Header wird davor gepackt = Paket
      → MAC-Header wird davor gepackt = Frame
        → Bits auf dem Kabel</code></pre></div>

Jede Schicht fügt ihren eigenen "Umschlag" (Header) hinzu. Der Empfänger packt sie Schicht für Schicht wieder aus.

<h2 class="section-title"><span class="number">1.5</span> Vorbereitung: OSI-Schichten im Terminal</h2>

<div class="exercise-start-banner"><div class="exercise-start-icon">&#128187;</div><div class="exercise-start-text"><strong>Terminal-&Uuml;bung beginnt jetzt!</strong><br>Das Terminal unten &ouml;ffnet sich automatisch. Du wirst Schritt f&uuml;r Schritt die OSI-Schichten im Terminal erkunden.</div></div>

<p><strong>Was dich erwartet:</strong> Du wirst Befehle ausführen, die auf verschiedenen OSI-Schichten arbeiten – und sehen, wie sich das in der Praxis anfühlt.</p>

<p>Du wirst in <strong>4 Schritten</strong> lernen:</p>
<ol>
<li><strong>IP-Adresse anzeigen</strong> &ndash; Mit <span class="inline-code">ip addr</span> auf Schicht 3 schauen</li>
<li><strong>Routing-Tabelle prüfen</strong> &ndash; Mit <span class="inline-code">ip route</span> den Weg durchs Netz sehen</li>
<li><strong>Erreichbarkeit testen</strong> &ndash; Mit <span class="inline-code">ping</span> ICMP auf Schicht 3 nutzen</li>
<li><strong>ARP-Tabelle anzeigen</strong> &ndash; Mit <span class="inline-code">ip neigh</span> MAC-Adressen auf Schicht 2 sehen</li>
</ol>

<div class="callout callout-info"><div class="callout-header">&#9432; So funktioniert es</div><p>Auf jeder der n&auml;chsten Slides steht ein Befehl in einem grauen Code-Block. Tippe ihn <strong>exakt so</strong> ins Terminal ein und dr&uuml;cke Enter. Unter dem Befehl siehst du die <strong>erwartete Ausgabe</strong> &ndash; vergleiche sie mit dem, was dein Terminal anzeigt.</p></div>

<div class="callout callout-warning"><div class="callout-header">&#9888; Keine Angst vor Fehlern!</div><p>Du kannst nichts kaputt machen &ndash; das Terminal ist simuliert. Wenn etwas nicht klappt, tippe den Befehl einfach nochmal. Nutze den <strong>Kopieren</strong>-Button neben dem Code-Block zum Kopieren.</p></div>


<div class="callout callout-warning"><div class="callout-header">&#9888; Keine Angst vor Fehlern!</div><p>Du kannst nichts kaputt machen – das Terminal ist simuliert. Wenn etwas nicht klappt, tippe den Befehl einfach nochmal. Nutze den <strong>Kopieren</strong>-Button neben dem Code-Block zum Kopieren.</p></div>

<h2 class="section-title"><span class="number">1.6</span> Übung: Eigene IP-Adresse anzeigen (Schicht 3)</h2>

Der erste Befehl, den jeder Netzwerk-Techniker nutzt: <span class="inline-code">ip addr</span>. Er zeigt dir alle Netzwerkschnittstellen und deine IP-Adresse an – das ist <strong>Schicht 3</strong> (Network) des OSI-Modells.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ip addr</code></pre></div>

<div class="table-container"><table><thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead><tbody>
<tr><td><span class="inline-code">lo</span></td><td>Loopback-Interface – dein eigener Rechner spricht mit sich selbst (127.0.0.1)</td></tr>
<tr><td><span class="inline-code">eth0</span></td><td>Deine echte Netzwerkkarte – verbunden mit dem Netzwerk</td></tr>
<tr><td><span class="inline-code">192.168.1.100/24</span></td><td>Deine IPv4-Adresse und Subnetzgr&ouml;&szlig;e (Schicht 3)</td></tr>
<tr><td><span class="inline-code">08:00:27:a1:b2:c3</span></td><td>Deine MAC-Adresse (Schicht 2 – siehst du sp&auml;ter genauer)</td></tr>
</tbody></table></div>

<div class="callout callout-tip"><div class="callout-header">&#128161; Welche Schicht?</div><p><span class="inline-code">ip addr</span> zeigt dir Daten von <strong>zwei Schichten gleichzeitig</strong>: Die MAC-Adresse (Schicht 2, "link/ether") und die IP-Adresse (Schicht 3, "inet"). Das ist normal – Befehle greifen oft auf mehrere Schichten zu.</p></div>

<h2 class="section-title"><span class="number">1.7</span> Übung: Routing-Tabelle prüfen (Schicht 3)</h2>

Wenn dein Rechner ein Paket verschicken will, muss er wissen: Wohin? Die <strong>Routing-Tabelle</strong> sagt ihm, über welches Gateway (Router) er Daten ins Internet schickt.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ip route</code></pre></div>

<div class="table-container"><table><thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead><tbody>
<tr><td><span class="inline-code">default via 192.168.1.1</span></td><td>Dein Standard-Gateway (Router) – alles was nicht lokal ist, geht hierhin</td></tr>
<tr><td><span class="inline-code">dev eth0</span></td><td>Über welche Netzwerkkarte das Paket geht</td></tr>
<tr><td><span class="inline-code">192.168.1.0/24</span></td><td>Dein lokales Netzwerk – alle Ger&auml;te mit 192.168.1.x sind direkt erreichbar</td></tr>
<tr><td><span class="inline-code">proto dhcp</span></td><td>Die Route wurde automatisch per DHCP zugewiesen</td></tr>
</tbody></table></div>

<div class="callout callout-tip"><div class="callout-header">&#128161; Warum wichtig?</div><p>Wenn du keine "default"-Route hast, kommt dein Rechner nicht ins Internet. Der Befehl <span class="inline-code">ip route</span> ist einer der ersten, die du bei Verbindungsproblemen nutzen solltest.</p></div>

<h2 class="section-title"><span class="number">1.8</span> Übung: Erreichbarkeit testen (Schicht 3/4)</h2>

Jetzt prüfst du, ob du das Internet erreichst. <span class="inline-code">ping</span> nutzt <strong>ICMP</strong> (Internet Control Message Protocol) – das arbeitet auf Schicht 3, manchmal Schicht 4.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ping -c 2 8.8.8.8</code></pre></div>

<div class="table-container"><table><thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead><tbody>
<tr><td><span class="inline-code">-c 2</span></td><td>Sende nur 2 Pakete (sonst pingt er endlos)</td></tr>
<tr><td><span class="inline-code">8.8.8.8</span></td><td>Googles &ouml;ffentlicher DNS-Server – gut zum Testen weil er immer antwortet</td></tr>
<tr><td><span class="inline-code">icmp_seq=1</span></td><td>Die Nummer des ICMP-Pakets</td></tr>
<tr><td><span class="inline-code">ttl=64</span></td><td>Time To Live – wie viele Hops das Paket noch &uuml;berleben darf</td></tr>
<tr><td><span class="inline-code">time=12.3 ms</span></td><td>Round-Trip Time – wie lange das Paket hin und zur&uuml;ck brauchte</td></tr>
<tr><td><span class="inline-code">0% packet loss</span></td><td>Alle Pakete kamen an – Verbindung funktioniert!</td></tr>
</tbody></table></div>

<div class="callout callout-tip"><div class="callout-header">&#128161; Was sagt dir das?</div><p>Wenn <span class="inline-code">ping</span> antwortet: Dein Netzwerk funktioniert. Wenn nicht: Irgendwas stimmt nicht – Kabel, WLAN, Router, Firewall. <span class="inline-code">ping</span> ist dein erster Diagnose-Befehl.</p></div>

<h2 class="section-title"><span class="number">1.9</span> Übung: ARP-Tabelle anzeigen (Schicht 2)</h2>

Zuletzt schaust du dir an, welche MAC-Adressen dein Rechner bereits kennt. Die <strong>ARP-Tabelle</strong> (Address Resolution Protocol) verbindet IP-Adressen (Schicht 3) mit MAC-Adressen (Schicht 2).

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ip neigh</code></pre></div>

<div class="table-container"><table><thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead><tbody>
<tr><td><span class="inline-code">192.168.1.1</span></td><td>IP-Adresse des Ger&auml;ts (Schicht 3)</td></tr>
<tr><td><span class="inline-code">lladdr aa:bb:cc:dd:ee:01</span></td><td>Die MAC-Adresse dieses Ger&auml;ts (Schicht 2 – "link layer address")</td></tr>
<tr><td><span class="inline-code">REACHABLE</span></td><td>Ger&auml;t wurde k&uuml;rzlich erreicht – ARP-Eintrag ist aktuell</td></tr>
<tr><td><span class="inline-code">STALE</span></td><td>Eintrag ist &auml;lter – m&uuml;sste bei n&auml;chstem Kontakt aktualisiert werden</td></tr>
</tbody></table></div>

<div class="callout callout-tip"><div class="callout-header">&#128161; Die Br&uuml;cke zwischen Schichten</div><p>ARP ist die Br&uuml;cke zwischen Schicht 2 (MAC) und Schicht 3 (IP). Dein Rechner fragt: "Wer hat IP 192.168.1.1?" und der Router antwortet: "Ich, meine MAC ist aa:bb:cc:dd:ee:01." So wei&szlig; dein Rechner, an welche MAC-Adresse er die Daten senden muss.</p></div>

