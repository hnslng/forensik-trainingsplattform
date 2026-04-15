---
icon: '&#128274;'
id: ch10-verschluesselung
section: Protokolle
title: Verschlüsselung in Netzwerken
---

<h1 class="chapter-title">Verschlüsselung in Netzwerken</h1>
<div class="chapter-subtitle">Symmetrisch, asymmetrisch und wie TLS beides kombiniert</div>

<p class="chapter-intro">Jedes Mal wenn du eine Webseite mit https:// öffnst, läuft Verschlüsselung im Hintergrund. Dieses Kapitel erklärt die zwei Grundtypen, ihre Vor- und Nachteile, und wie sie in der Praxis zusammenarbeiten.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du verstehst den Unterschied zwischen symmetrischer und asymmetrischer Verschlüsselung, kennst die wichtigsten Algorithmen und weisst wie TLS (HTTPS) beides kombiniert. Du kannst Zertifikate mit openssl prüfen.</p></div>

<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128273;</div><div class="feature-text"><h3>Symmetrisch</h3><p>Ein Schlüssel für alles</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128274;</div><div class="feature-text"><h3>Asymmetrisch</h3><p>Public & Private Key</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128272;</div><div class="feature-text"><h3>Hash-Funktionen</h3><p>Einweg-Verschlüsselung</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>openssl</h3><p>Zertifikate prüfen im Terminal</p></div></div></div>

<h2 class="section-title"><span class="number">10.1</span> Warum Verschlüsselung?</h2>

Stell dir vor, du schickst eine Postkarte: Jeder Postmitarbeiter kann sie lesen. Eine Netzwerkverbindung ohne Verschlüsselung ist genau das – jeder im selben WLAN oder zwischen dir und dem Server kann mitlesen.

<strong>Verschlüsselung</strong> verwandelt lesbaren Text (Klartext) in unlesbaren Code (Chiffretext). Nur wer den richtigen Schlüssel hat, kann ihn wieder entschlüsseln.

<blockquote><p><strong>Merke:</strong> Ohne Verschlüsselung sind Passwörter, Cookies, Formulardaten und alles andere im Klartext über das Netzwerk sichtbar. Das ist der Grund warum <strong>HTTPS</strong> statt HTTP der Standard ist.</p></blockquote>

<h2 class="section-title"><span class="number">10.2</span> Symmetrische Verschlüsselung</h2>

Bei der <strong>symmetrischen Verschlüsselung</strong> gibt es <strong>einen einzigen Schlüssel</strong>. Damit wird ver- UND entschlüsselt. Wie ein Türschloss: derselbe Schlüssel schließt auf und ab.

| Algorithmus | Schlüssellänge | Verwendung |
|---|---|---|
| <strong>AES-128</strong> | 128 Bit | Standard, schnell genug für alles |
| <strong>AES-256</strong> | 256 Bit | Hohe Sicherheit (Regierung, Militär) |
| <strong>ChaCha20</strong> | 256 Bit | Mobilgeräte, TLS 1.3 |
| <strong>3DES</strong> | 168 Bit | Veraltet, wird abgeschafft |

<strong>Vorteile:</strong>
- <strong>Schnell:</strong> Wenig Rechenaufwand, auch für große Datenmengen
- <strong>Einfach:</strong> Ein Schlüssel reicht

<strong>Nachteile:</strong>
- <strong>Schlüsselverteilungsproblem:</strong> Wie bekommst du den Schlüssel sicher zum anderen? Wenn du ihn unverschlüsselt schickst, kann ihn jeder mitlesen – paradox!

<blockquote><p><strong>Tipp:</strong> Stell dir vor: Du willst einem Freund einen Tresor schicken. Aber der Schlüssel für den Tresor muss ja auch irgendwie zum Freund. Wenn du den Schlüssel mit der Post schickst, kann ihn jeder nehmen. Genau dieses Problem löst die asymmetrische Verschlüsselung.</p></blockquote>

<h2 class="section-title"><span class="number">10.3</span> Asymmetrische Verschlüsselung</h2>

Bei der <strong>asymmetrischen Verschlüsselung</strong> gibt es <strong>zwei Schlüssel</strong>:
- <strong>Public Key</strong> (öffentlicher Schlüssel) – darf jeder kennen. Damit wird verschlüsselt.
- <strong>Private Key</strong> (privater Schlüssel) – nur du hast ihn. Damit wird entschlüsselt.

Wie ein Briefkasten: Jeder kann etwas einwerfen (Public Key), aber nur du hast den Schlüssel zum Öffnen (Private Key).

| Algorithmus | Schlüssellänge | Verwendung |
|---|---|---|
| <strong>RSA</strong> | 2048–4096 Bit | TLS-Zertifikate, digitale Signaturen |
| <strong>ECC</strong> (Elliptic Curve) | 256–521 Bit | Moderne TLS, Mobil, IoT |
| <strong>Diffie-Hellman</strong> | 2048+ Bit | Schlüsselaustausch (Key Exchange) |

<strong>Vorteile:</strong>
- <strong>Kein gemeinsamer Schlüssel nötig:</strong> Jeder hat sein eigenes Schlüsselpaar
- <strong>Digitale Signaturen:</strong> Beweist dass eine Nachricht wirklich vom Absender kommt
- <strong>Sicherer Schlüsselaustausch:</strong> Public Keys können öffentlich geteilt werden

<strong>Nachteile:</strong>
- <strong>Langsam:</strong> Etwa 1000x langsamer als symmetrisch
- <strong>Nicht für große Datenmengen:</strong> Zu viel Rechenaufwand

<blockquote><p><strong>Merke:</strong> Symmetrisch = ein Schlüssel, schnell, aber Verteilungsproblem. Asymmetrisch = zwei Schlüssel, sicherer Austausch, aber langsam.</p></blockquote>

<h2 class="section-title"><span class="number">10.4</span> In der Praxis: Wie TLS beides kombiniert</h2>

TLS (Transport Layer Security) ist das Protokoll hinter <strong>HTTPS</strong>. Es nutzt das Beste aus beiden Welten:

<strong>Der TLS-Handshake in 4 Schritten:</strong>

1. <strong>Client Hello</strong> → Browser sagt: "Ich möchte eine sichere Verbindung. Hier sind meine unterstützten Verfahren."
2. <strong>Server Hello + Zertifikat</strong> → Server antwortet: "OK, hier ist mein Zertifikat (mit meinem Public Key)."
3. <strong>Schlüsselaustausch</strong> → Browser erzeugt einen zufälligen <strong>Session-Key</strong> (symmetrisch), verschlüsselt ihn mit dem <strong>Public Key</strong> des Servers und schickt ihn.
4. <strong>Symmetrische Verbindung</strong> → Ab jetzt läuft ALLES mit dem schnellen symmetrischen Session-Key (AES).

<blockquote><p><strong>Tipp:</strong> Asymmetrisch wird nur für den kurzen Moment des Schlüsselaustauschs genutzt (ca. 100ms). Danach läuft die gesamte Kommunikation symmetrisch – schnell und effizient. Das ist der geniale Trick von TLS.</p></blockquote>

<h2 class="section-title"><span class="number">10.5</span> Hash-Funktionen (Einweg)</h2>

Hash-Funktionen sind keine Verschlüsselung im eigentlichen Sinn, aber eng verwandt. Sie wandeln beliebige Daten in einen <strong>festen Fingerabdruck</strong> um – und das ist <strong>nicht umkehrbar</strong>.

| Algorithmus | Ausgabe | Verwendung |
|---|---|---|
| <strong>SHA-256</strong> | 256 Bit | Integritätsprüfung, TLS-Zertifikate |
| <strong>SHA-3</strong> | variabel | Nachfolger von SHA-2 |
| <strong>MD5</strong> | 128 Bit | Veraltet, nur noch für Prüfsummen |

<strong>Eigenschaften:</strong>
- <strong>Einweg:</strong> Aus dem Hash kann man NICHT die Originaldaten zurückgewinnen
- <strong>Deterministisch:</strong> Gleiche Eingabe → immer gleicher Hash
- <strong>Lawineneffekt:</strong> Eine kleine Änderung → komplett anderer Hash
- <strong>Kollisionsresistent:</strong> Zwei verschiedene Eingaben → (praktisch) nie gleicher Hash

<strong>Wofür?</strong>
- <strong>Integrität:</strong> Wurde eine Datei verändert? Hash vorher/nachher vergleichen.
- <strong>Passwörter:</strong> Datenbank speichert nur den Hash, nicht das Passwort
- <strong>Digitale Signaturen:</strong> Hash wird mit Private Key signiert

<h2 class="section-title"><span class="number">10.6</span> Digitale Signaturen</h2>

Eine digitale Signatur beweist: <strong>Diese Nachricht kommt wirklich von diesem Absender und wurde nicht verändert.</strong>

<strong>So funktioniert es:</strong>

1. Absender erstellt Hash der Nachricht
2. Hash wird mit dem <strong>Private Key</strong> verschlüsselt (= die Signatur)
3. Nachricht + Signatur werden gesendet
4. Empfänger entschlüsselt Signatur mit dem <strong>Public Key</strong> des Absenders
5. Empfänger erstellt selbst einen Hash der Nachricht
6. Stimmen beide Hashes überein → Nachricht ist echt und unverändert

<blockquote><p><strong>Merke:</strong> Verschlüsselung = Vertraulichkeit (niemand kann mitlesen). Signaturen = Authentizität + Integrität (niemand hat es verändert, es ist wirklich vom Absender).</p></blockquote>

<h2 class="section-title"><span class="number">10.7</span> Zertifikate und Vertrauen</h2>

Wenn du <span class="inline-code">https://example.com</span> öffnest, wie weiß dein Browser dass der Server wirklich example.com ist? Durch <strong>Zertifikate</strong>.

Ein Zertifikat enthält:
- Den Public Key des Servers
- Den Domainnamen
- Eine digitale Signatur einer <strong>Certificate Authority (CA)</strong>
- Ablaufdatum

<strong>Der Vertrauenskette:</strong>
1. Dein Betriebssystem hat eine Liste vertrauenswürdiger CAs (z.B. DigiCert, Let's Encrypt)
2. Die CA signiert das Zertifikat des Servers
3. Dein Browser prüft: Ist die Signatur gültig? Ist die Domain richtig? Ist es abgelaufen?

Wenn alles passt → grünes Schloss-Symbol. Wenn nicht → Browser-Warnung.

<div class="exercise-start-banner"><div class="exercise-start-icon">&#128187;</div><div class="exercise-start-text"><strong>Terminal-Übung beginnt jetzt!</strong><br>Das Terminal unten öffnet sich automatisch. Du wirst Schritt für Schritt die Befehle ausprobieren.</div></div>


<p><strong>Was dich erwartet:</strong> Du übst die wichtigsten Befehle dieses Kapitels im simulierten Terminal.</p>


<div class="callout callout-info"><div class="callout-header">&#9432; So funktioniert es</div><p>Auf jeder der nächsten Slides steht ein Befehl in einem grauen Code-Block. Tippe ihn <strong>exakt so</strong> ins Terminal ein und drücke Enter. Unter dem Befehl siehst du die <strong>erwartete Ausgabe</strong> – vergleiche sie mit dem, was dein Terminal anzeigt.</p></div>


<div class="callout callout-warning"><div class="callout-header">&#9888; Keine Angst vor Fehlern!</div><p>Du kannst nichts kaputt machen – das Terminal ist simuliert. Wenn etwas nicht klappt, tippe den Befehl einfach nochmal. Nutze den <strong>Kopieren</strong>-Button neben dem Code-Block zum Kopieren.</p></div>


<div class="callout callout-warning"><div class="callout-header">&#9888; Keine Angst vor Fehlern!</div><p>Du kannst nichts kaputt machen – das Terminal ist simuliert. Wenn etwas nicht klappt, tippe den Befehl einfach nochmal. Nutze den <strong>Kopieren</strong>-Button neben dem Code-Block zum Kopieren.</p></div>

<h2 class="section-title"><span class="number">10.8</span> Übung: Zertifikat mit openssl prüfen</h2>

<h2 class="section-title"><span class="number">10.9</span> Übung: Nur das Ablaufdatum prüfen</h2>

<h2 class="section-title"><span class="number">10.10</span> Übung: Hash einer Datei erstellen</h2>

<h2 class="section-title"><span class="number">10.12</span> Übung: RSA-Private-Key erstellen</h2>

<h2 class="section-title"><span class="number">10.13</span> Übung: SSH-Key-Pair erstellen</h2>

<h2 class="section-title"><span class="number">10.14</span> Übung: Moderner Ed25519-Key</h2>

<h2 class="section-title"><span class="number">10.15</span> Übung: GPG-Key erstellen (E-Mail-Verschlüsselung)</h2>

GPG (GNU Privacy Guard) nutzt asymmetrische Verschlüsselung für E-Mails und Dateien. Gleiche Prinzip wie SSH, aber für andere Zwecke:

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren



<div class="callout callout-success"><div class="callout-header">&#10003; Geschafft!</div>

<div class="callout callout-tip"><div class="callout-header">&#128161; Wofür brauche ich was?</div>

<p><strong>Erwartete Ausgabe im Terminal:</strong></p>
<p><strong>Erwartete Ausgabe im Terminal:</strong></p>
<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>

<div class="callout callout-success"><div class="callout-header">&#10003; Geschafft!</div><p>Du hast die Übungen dieses Kapitels abgeschlossen.</p></div>
<button class="complete-section-btn" data-chapter="ch10-verschluesselung">&#9744; Kapitel als abgeschlossen markieren</button>
<div class="nav-buttons"><button class="nav-btn" data-target="ch09-http">&#8592; HTTP</button><button class="nav-btn" data-target="ch11-icmp">ICMP &#8594;</button></div>

