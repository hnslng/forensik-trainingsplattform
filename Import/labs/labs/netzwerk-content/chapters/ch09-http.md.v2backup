# HTTP &amp; HTTPS &ndash; Das Web


<div class="chapter-subtitle">Wie Webseiten zu deinem Browser gelangen</div>

<p class="chapter-intro">Jedes Mal wenn du eine Webseite aufrufst, l&auml;uft HTTP (oder HTTPS) im Hintergrund. Lerne den Request-Response-Zyklus, die wichtigsten Statuscodes und wie du <code>curl</code> f&uuml;r Web-Analysen nutzt.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du verstehst den HTTP-Request-Response-Zyklus, kennst die wichtigsten Statuscodes und kannst curl f&uuml;r Analysen einsetzen.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#127760;</div><div class="feature-text"><h3>HTTP-Methoden</h3><p>GET, POST, HEAD</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128202;</div><div class="feature-text"><h3>Statuscodes</h3><p>200, 301, 404, 500</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128274;</div><div class="feature-text"><h3>HTTPS/TLS</h3><p>Verschl&uuml;sselung</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>curl -I, -v</p></div></div></div>

## 9.1 Was ist HTTP?

**HTTP** (Hypertext Transfer Protocol) = Die Sprache, die Webbrowser und Webserver sprechen. Wenn du `google.com` aufrufst, sendet dein Browser einen **HTTP-Request** und der Server antwortet mit einem **HTTP-Response**.

**HTTPS** = HTTP + **TLS** (Transport Layer Security) = HTTP mit Verschlüsselung. Ohne HTTPS kann jeder im Netzwerk mitlesen, was du tust.

**Der Request-Response-Zyklus:**
1. Browser sendet Request: *"Gib mir die Startseite"*
2. Server verarbeitet den Request
3. Server sendet Response: *"Hier ist das HTML, Status 200 OK"*
4. Browser rendert die Seite

## 9.2 HTTP-Methoden

Nicht jeder Request ist gleich. Die **Methode** sagt, was gemacht werden soll:

| Methode | Zweck | Beispiel |
|---|---|---|
| **GET** | Daten abrufen | Webseite laden |
| **POST** | Daten senden | Formular abschicken |
| **HEAD** | Nur Header abrufen | Prüfen ob Seite existiert |
| **PUT** | Daten aktualisieren | API-Update |
| **DELETE** | Daten löschen | API-Löschung |

> **Für den Anfang:** GET und POST reichen für 95% der Fälle.

## 9.3 HTTP-Statuscodes

Der Statuscode ist die erste Zeile der Antwort &ndash; er sagt dir sofort, ob alles OK ist:

| Code | Bedeutung | Einfach gesagt |
|---|---|---|
| **200** | OK | Alles gut, hier sind deine Daten |
| **301** | Moved Permanently | Dauerhaft umgezogen (neue URL) |
| **302** | Found | Vorübergehend umgeleitet |
| **400** | Bad Request | Der Request ist fehlerhaft |
| **401** | Unauthorized | Bitte erst anmelden |
| **403** | Forbidden | Du darfst das nicht sehen |
| **404** | Not Found | Seite existiert nicht |
| **500** | Internal Server Error | Server hat ein Problem |
| **503** | Service Unavailable | Server überlastet / Wartung |

**Faustregel:** `2xx` = OK, `3xx` = Umleitung, `4xx` = Dein Fehler, `5xx` = Server-Fehler

## 9.4 Praktische curl-Befehle

**curl** ist dein Schweizer Taschenmesser für HTTP:

:::code bash
# Nur Header anzeigen (schneller Überblick)
curl -I https://example.com

# Voller Request mit Request- und Response-Headern
curl -v http://example.com

# Nur den Statuscode extrahieren
curl -o /dev/null -s -w "%{http_code}\n" https://example.com

# POST-Request (z.B. für APIs)
curl -X POST -d "user=byte&pass=secret" http://example.com/login

# Zertifikat einer HTTPS-Seite prüfen
openssl s_client -connect example.com:443 -brief
:::

**curl-Parameter erklärt:**

| Parameter | Bedeutung |
|---|---|
| `-I` | Nur Header abrufen (HEAD-Request) |
| `-v` | Verbose &ndash; zeigt alles |
| `-o /dev/null` | Output verwerfen |
| `-s` | Silent &ndash; kein Progress-Bar |
| `-w "%{http_code}"` | Custom Format (hier: Statuscode) |
| `-X POST` | HTTP-Methode ändern |
| `-d "data"` | Daten mitsenden |

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
