# TCP & UDP – Transportprotokolle


<div class="chapter-subtitle">Die zwei Transportprotokolle</div>
<p class="chapter-intro">TCP = zuverl&auml;ssig, UDP = schnell. Lerne den 3-Way-Handshake, wichtige Flags und warum es zwei verschiedene Protokolle gibt.</p>
<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du unterscheidest TCP und UDP, kennst den Handshake und verstehst Portnummern.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128274;</div><div class="feature-text"><h3>TCP</h3><p>Zuverl&auml;ssig</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#9889;</div><div class="feature-text"><h3>UDP</h3><p>Schnell</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128270;</div><div class="feature-text"><h3>3-Way-Handshake</h3><p>Verbindungsaufbau</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>ss, curl testen</p></div></div></div>

## 6.1 Was sind TCP und UDP?

**TCP** (Transmission Control Protocol) und **UDP** (User Datagram Protocol) sind Transportprotokolle auf **Schicht 4** (Transportschicht) des OSI-Modells.

Sie bringen Daten von A nach B &ndash; aber auf **unterschiedliche Weise**:

- **TCP** = Wie ein eingeschriebener Brief: Zuverl&auml;ssig, mit Best&auml;tigung, aber langsamer
- **UDP** = Wie ein Rundfunk: Schnell, aber ohne Garantie

> **Warum zwei?** Manche Anwendungen brauchen Zuverl&auml;ssigkeit (Webseiten, E-Mail), andere brauchen Geschwindigkeit (Videotelefonie, Gaming). Deshalb gibt es TCP und UDP.

## 6.2 TCP – Zuverlässig und verbindungsorientiert

TCP baut erst eine Verbindung auf, dann werden Daten übertragen. Verlorene Pakete werden erneut angefordert.

### Der TCP 3-Way-Handshake

:::code
Client                              Server
  │──── SYN ──────────────────────▶│  "Hallo, ich will eine Verbindung"
  │◀──── SYN+ACK ─────────────────│  "Hallo, ich bin bereit"
  │──── ACK ──────────────────────▶│  "Los geht's!"
  │════ Daten ════════════════════│
:::

**SYN** = Synchronize | **ACK** = Acknowledge

### TCP-Flags

| Flag | Bedeutung |
|---|---|
| **SYN** | Verbindung aufbauen |
| **ACK** | Empfang bestätigen |
| **FIN** | Verbindung beenden |
| **RST** | Verbindung sofort abbrechen |

## 6.3 UDP – Schnell und verbindungslos

UDP schickt Daten **ohne Verbindungsaufbau** los &ndash; einfach rausschicken, fertig. Keine Garantie dass das Paket ankommt, keine Best&auml;tigung, keine Reihenfolge.

**Warum gibt's das &uuml;berhaupt?** Weil Geschwindigkeit manchmal wichtiger ist als Zuverl&auml;ssigkeit:

- **Videotelefonie:** Ein verlorenes Frame ist weniger schlimm als Verz&ouml;gerung
- **Gaming:** Wenn die Position eines Spielers veraltet ist, ist das n&auml;chste Paket ohnehin aktueller
- **DNS:** Die Anfrage ist winzig &ndash; wenn sie verloren geht, einfach nochmal fragen

:::code bash
# UDP-Verbindungen anzeigen
ss -uln
:::

**Einsatz:** Streaming, Gaming, VoIP, DNS, DHCP

## 6.4 TCP vs UDP

| Eigenschaft | TCP | UDP |
|---|---|---|
| Verbindungsaufbau | Ja | Nein |
| Zuverlässigkeit | Ja | Nein |
| Geschwindigkeit | Langsamer | Schneller |
| Typische Anwendungen | Web, E-Mail, FTP | Streaming, Gaming, DNS |

## 6.5 Wichtige Portnummern

Ein **Port** ist wie eine Zimmernummer – er identifies den Dienst auf einem Computer.

| Port | Protokoll | Dienst |
|---|---|---|
| 22 | SSH | Secure Shell |
| 53 | DNS | Namensauflösung |
| 80 | HTTP | Webseiten (unverschlüsselt) |
| 443 | HTTPS | Webseiten (verschlüsselt) |
| 25 | SMTP | E-Mail versenden |
| 67/68 | DHCP | IP-Adressen verteilen |

:::code bash
# Aktive Verbindungen anzeigen
ss -tunap

# Nur TCP, nur wartende Server
ss -tlnp
:::

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
