---
icon: '&#127760;'
id: ch09-http
section: Protokolle
title: HTTP & HTTPS
---

<h1>HTTP &amp; HTTPS &ndash; Das Web</h1>


<div class="chapter-subtitle">Wie Webseiten zu deinem Browser gelangen</div>

<p class="chapter-intro">Jedes Mal wenn du eine Webseite aufrufst, l&auml;uft HTTP (oder HTTPS) im Hintergrund. Lerne den Request-Response-Zyklus, die wichtigsten Statuscodes und wie du <code>curl</code> f&uuml;r Web-Analysen nutzt.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du verstehst den HTTP-Request-Response-Zyklus, kennst die wichtigsten Statuscodes und kannst curl f&uuml;r Analysen einsetzen.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#127760;</div><div class="feature-text"><h3>HTTP-Methoden</h3><p>GET, POST, HEAD</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128202;</div><div class="feature-text"><h3>Statuscodes</h3><p>200, 301, 404, 500</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128274;</div><div class="feature-text"><h3>HTTPS/TLS</h3><p>Verschl&uuml;sselung</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>curl -I, -v</p></div></div></div>

<h2 class="section-title"><span class="number">9.1</span> Was ist HTTP?</h2>

<strong>HTTP</strong> (Hypertext Transfer Protocol) = Die Sprache, die Webbrowser und Webserver sprechen. Wenn du <span class="inline-code">google.com</span> aufrufst, sendet dein Browser einen <strong>HTTP-Request</strong> und der Server antwortet mit einem <strong>HTTP-Response</strong>.

<strong>HTTPS</strong> = HTTP + <strong>TLS</strong> (Transport Layer Security) = HTTP mit Verschlüsselung. Ohne HTTPS kann jeder im Netzwerk mitlesen, was du tust.

<strong>Der Request-Response-Zyklus:</strong>
1. Browser sendet Request: <em>"Gib mir die Startseite"</em>
2. Server verarbeitet den Request
3. Server sendet Response: <em>"Hier ist das HTML, Status 200 OK"</em>
4. Browser rendert die Seite

<h2 class="section-title"><span class="number">9.2</span> HTTP-Methoden</h2>

Nicht jeder Request ist gleich. Die <strong>Methode</strong> sagt, was gemacht werden soll:

| Methode | Zweck | Beispiel |
|---|---|---|
| <strong>GET</strong> | Daten abrufen | Webseite laden |
| <strong>POST</strong> | Daten senden | Formular abschicken |
| <strong>HEAD</strong> | Nur Header abrufen | Prüfen ob Seite existiert |
| <strong>PUT</strong> | Daten aktualisieren | API-Update |
| <strong>DELETE</strong> | Daten löschen | API-Löschung |

<blockquote><p><strong>Für den Anfang:</strong> GET und POST reichen für 95% der Fälle.</p></blockquote>

<h2 class="section-title"><span class="number">9.3</span> HTTP-Statuscodes</h2>

Der Statuscode ist die erste Zeile der Antwort &ndash; er sagt dir sofort, ob alles OK ist:

| Code | Bedeutung | Einfach gesagt |
|---|---|---|
| <strong>200</strong> | OK | Alles gut, hier sind deine Daten |
| <strong>301</strong> | Moved Permanently | Dauerhaft umgezogen (neue URL) |
| <strong>302</strong> | Found | Vorübergehend umgeleitet |
| <strong>400</strong> | Bad Request | Der Request ist fehlerhaft |
| <strong>401</strong> | Unauthorized | Bitte erst anmelden |
| <strong>403</strong> | Forbidden | Du darfst das nicht sehen |
| <strong>404</strong> | Not Found | Seite existiert nicht |
| <strong>500</strong> | Internal Server Error | Server hat ein Problem |
| <strong>503</strong> | Service Unavailable | Server überlastet / Wartung |

<strong>Faustregel:</strong> <span class="inline-code">2xx</span> = OK, <span class="inline-code">3xx</span> = Umleitung, <span class="inline-code">4xx</span> = Dein Fehler, <span class="inline-code">5xx</span> = Server-Fehler

<h2 class="section-title"><span class="number">9.4</span> Praktische curl-Befehle</h2>

<strong>curl</strong> ist dein Schweizer Taschenmesser für HTTP:

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Nur Header anzeigen (schneller Überblick)
curl -I https://example.com

# Voller Request mit Request- und Response-Headern
curl -v http://example.com

# Nur den Statuscode extrahieren
curl -o /dev/null -s -w "%{http_code}\n" https://example.com

# POST-Request (z.B. für APIs)
curl -X POST -d "user=byte&amp;pass=secret" http://example.com/login

# Zertifikat einer HTTPS-Seite prüfen
openssl s_client -connect example.com:443 -brief</code></pre></div>

<strong>curl-Parameter erklärt:</strong>

| Parameter | Bedeutung |
|---|---|
| <span class="inline-code">-I</span> | Nur Header abrufen (HEAD-Request) |
| <span class="inline-code">-v</span> | Verbose &ndash; zeigt alles |
| <span class="inline-code">-o /dev/null</span> | Output verwerfen |
| <span class="inline-code">-s</span> | Silent &ndash; kein Progress-Bar |
| <span class="inline-code">-w "%{http_code}"</span> | Custom Format (hier: Statuscode) |
| <span class="inline-code">-X POST</span> | HTTP-Methode ändern |
| <span class="inline-code">-d "data"</span> | Daten mitsenden |

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">HTTP-Analyse</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>HTTP-Requests durchführen, Statuscodes lesen und Header verstehen</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Rufe Header ab: <code>curl -I http://example.com</code></li>
<li>Welchen Statuscode bekommst du? Welchen Content-Type?</li>
<li>Nur Statuscode: <code>curl -o /dev/null -w "%{http_code}" https://google.com</code></li>
<li>Teste einen 404: <code>curl -I http://example.com/diese-seite-gibt-es-nicht</code></li>
<li>Voller Request: <code>curl -v http://example.com</code></li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>example.com liefert 200 OK mit Content-Type text/html. google.com liefert 301 (Umleitung zu www.google.com). Ein falscher Pfad gibt 404 Not Found. curl -v zeigt den kompletten Dialog: Request-Header (>, Output-Header (<), und den Body.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch09-http">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch08-dhcp">&#8592; Zurück</button>
<button class="nav-btn" data-target="ch10-verschluesselung">Weiter &#8594;</button>
</div>

