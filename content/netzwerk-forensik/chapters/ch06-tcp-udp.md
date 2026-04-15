---
icon: '&#128260;'
id: ch06-tcp-udp
section: Protokolle
title: TCP & UDP
---

<h1>TCP & UDP – Transportprotokolle</h1>


<div class="chapter-subtitle">Die zwei Transportprotokolle</div>
<p class="chapter-intro">TCP = zuverl&auml;ssig, UDP = schnell. Lerne den 3-Way-Handshake, wichtige Flags und warum es zwei verschiedene Protokolle gibt.</p>
<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du unterscheidest TCP und UDP, kennst den Handshake und verstehst Portnummern.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128274;</div><div class="feature-text"><h3>TCP</h3><p>Zuverl&auml;ssig</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#9889;</div><div class="feature-text"><h3>UDP</h3><p>Schnell</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128270;</div><div class="feature-text"><h3>3-Way-Handshake</h3><p>Verbindungsaufbau</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>ss, curl testen</p></div></div></div>

<h2 class="section-title"><span class="number">6.1</span> Was sind TCP und UDP?</h2>

<strong>TCP</strong> (Transmission Control Protocol) und <strong>UDP</strong> (User Datagram Protocol) sind Transportprotokolle auf <strong>Schicht 4</strong> (Transportschicht) des OSI-Modells.

Sie bringen Daten von A nach B &ndash; aber auf <strong>unterschiedliche Weise</strong>:

- <strong>TCP</strong> = Wie ein eingeschriebener Brief: Zuverl&auml;ssig, mit Best&auml;tigung, aber langsamer
- <strong>UDP</strong> = Wie ein Rundfunk: Schnell, aber ohne Garantie

<blockquote><p><strong>Warum zwei?</strong> Manche Anwendungen brauchen Zuverl&auml;ssigkeit (Webseiten, E-Mail), andere brauchen Geschwindigkeit (Videotelefonie, Gaming). Deshalb gibt es TCP und UDP.</p></blockquote>

<h2 class="section-title"><span class="number">6.2</span> TCP – Zuverlässig und verbindungsorientiert</h2>

TCP baut erst eine Verbindung auf, dann werden Daten übertragen. Verlorene Pakete werden erneut angefordert.

<h3>Der TCP 3-Way-Handshake</h3>

<div class="code-block"><div class="code-header"><button class="copy-btn">Kopieren</button></div><pre><code>Client                              Server
  │──── SYN ──────────────────────▶│  "Hallo, ich will eine Verbindung"
  │◀──── SYN+ACK ─────────────────│  "Hallo, ich bin bereit"
  │──── ACK ──────────────────────▶│  "Los geht's!"
  │════ Daten ════════════════════│</code></pre></div>

<strong>SYN</strong> = Synchronize | <strong>ACK</strong> = Acknowledge

<h3>TCP-Flags</h3>

| Flag | Bedeutung |
|---|---|
| <strong>SYN</strong> | Verbindung aufbauen |
| <strong>ACK</strong> | Empfang bestätigen |
| <strong>FIN</strong> | Verbindung beenden |
| <strong>RST</strong> | Verbindung sofort abbrechen |

<h2 class="section-title"><span class="number">6.3</span> UDP – Schnell und verbindungslos</h2>

UDP schickt Daten <strong>ohne Verbindungsaufbau</strong> los &ndash; einfach rausschicken, fertig. Keine Garantie dass das Paket ankommt, keine Best&auml;tigung, keine Reihenfolge.

<strong>Warum gibt's das &uuml;berhaupt?</strong> Weil Geschwindigkeit manchmal wichtiger ist als Zuverl&auml;ssigkeit:

- <strong>Videotelefonie:</strong> Ein verlorenes Frame ist weniger schlimm als Verz&ouml;gerung
- <strong>Gaming:</strong> Wenn die Position eines Spielers veraltet ist, ist das n&auml;chste Paket ohnehin aktueller
- <strong>DNS:</strong> Die Anfrage ist winzig &ndash; wenn sie verloren geht, einfach nochmal fragen

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># UDP-Verbindungen anzeigen
ss -uln</code></pre></div>

<strong>Einsatz:</strong> Streaming, Gaming, VoIP, DNS, DHCP

<h2 class="section-title"><span class="number">6.4</span> TCP vs UDP</h2>

| Eigenschaft | TCP | UDP |
|---|---|---|
| Verbindungsaufbau | Ja | Nein |
| Zuverlässigkeit | Ja | Nein |
| Geschwindigkeit | Langsamer | Schneller |
| Typische Anwendungen | Web, E-Mail, FTP | Streaming, Gaming, DNS |

<h2 class="section-title"><span class="number">6.5</span> Wichtige Portnummern</h2>

Ein <strong>Port</strong> ist wie eine Zimmernummer – er identifies den Dienst auf einem Computer.

| Port | Protokoll | Dienst |
|---|---|---|
| 22 | SSH | Secure Shell |
| 53 | DNS | Namensauflösung |
| 80 | HTTP | Webseiten (unverschlüsselt) |
| 443 | HTTPS | Webseiten (verschlüsselt) |
| 25 | SMTP | E-Mail versenden |
| 67/68 | DHCP | IP-Adressen verteilen |

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Aktive Verbindungen anzeigen
ss -tunap

# Nur TCP, nur wartende Server
ss -tlnp</code></pre></div>

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">Verbindungen analysieren</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>TCP/UDP-Verbindungen auf dem System finden</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Zeige alle Verbindungen: <code>ss -tunap</code></li>
<li>Finde LISTEN-Ports: <code>ss -tlnp</code></li>
<li>Teste eine TCP-Verbindung: <code>curl -I http://example.com</code></li>
<li>Zeige TCP-Verbindungen: <code>ss -tn</code></li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>ss zeigt ESTAB (aktiv), LISTEN (wartet), TIME_WAIT (wird geschlossen). Nach curl siehst du eine neue Verbindung zu Port 80.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch06-tcp-udp">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch05-mac-arp">&#8592; Zurück</button>
<button class="nav-btn" data-target="ch07-dns">Weiter &#8594;</button>
</div>

