---
icon: '&#127760;'
id: ch01-osi
section: Grundlagen
title: Netzwerkmodelle (OSI & TCP/IP)
---

<h1 class="chapter-title">Netzwerkmodelle (OSI &amp; TCP/IP)</h1>
<div class="chapter-subtitle">Die Grundlage jedes Netzwerkverständnisses</div>

<p class="chapter-intro">Lerne die zwei wichtigsten Netzwerkmodelle kennen: das 7-Schichten OSI-Modell und das 4-Schichten TCP/IP-Modell. Verstehe, wie Datenkapselung funktioniert und warum diese Modelle für die Praxis entscheidend sind.</p>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div>
  <p>Du weißt was ein Netzwerkmodell ist, kennst die 7 OSI-Schichten und das TCP/IP-Modell. Du verstehst Datenkapselung und hast die Schichten im Terminal selbst ausprobiert.</p>
</div>

<div class="feature-grid chapter-preview-grid">
  <div class="feature-card chapter-preview-card">
    <div class="feature-icon">&#128225;</div>
    <div class="feature-text">
      <h3>OSI-Modell</h3>
      <p>7 Schichten verstehen</p>
    </div>
  </div>
  <div class="feature-card chapter-preview-card">
    <div class="feature-icon">&#127760;</div>
    <div class="feature-text">
      <h3>TCP/IP</h3>
      <p>Das Praxis-Modell</p>
    </div>
  </div>
  <div class="feature-card chapter-preview-card">
    <div class="feature-icon">&#128230;</div>
    <div class="feature-text">
      <h3>Datenkapselung</h3>
      <p>Wie Daten verpackt werden</p>
    </div>
  </div>
  <div class="feature-card chapter-preview-card">
    <div class="feature-icon">&#128187;</div>
    <div class="feature-text">
      <h3>Terminal-&Uuml;bung</h3>
      <p>ip, ping, neigh im Terminal</p>
    </div>
  </div>
</div>

<div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation – <span class="inline-code">&lsaquo; Zurück</span> und <span class="inline-code">Weiter &rsaquo;</span></div>


<h2 class="section-title"><span class="number">1.1</span> Was ist ein Netzwerkmodell?</h2>

<p>Ein <strong>Netzwerkmodell</strong> beschreibt, wie Daten von einem Gerät zum anderen gelangen. Es teilt den gesamten Prozess in <strong>Schichten</strong> (englisch: <em>Layers</em>) auf – wie eine Fabrik, in der jede Abteilung eine bestimmte Aufgabe hat.</p>

<p>Stell dir vor, du schickst ein Paket: Du packst es ein (Schicht 7), bekommst eine Sendungsnummer (Schicht 4), das Paketzentrum routet es weiter (Schicht 3), der LKW transportiert es (Schicht 1). Jeder Schritt hat seine eigene Aufgabe.</p>


<h2 class="section-title"><span class="number">1.2</span> Das OSI-Modell (Open Systems Interconnection)</h2>

<p><strong>OSI</strong> (<strong>O</strong>pen <strong>S</strong>ystems <strong>I</strong>nterconnection) hat <strong>7 Schichten</strong>. Es ist vor allem ein Lernmodell – in der Praxis wird eher das TCP/IP-Modell verwendet. Aber es hilft enorm zu verstehen, was wo passiert.</p>

<div class="table-container">
<table>
<thead>
<tr><th>Schicht</th><th>Name</th><th>Was passiert hier</th><th>Beispiele</th></tr>
</thead>
<tbody>
<tr><td>7</td><td><strong>Application</strong></td><td>Programme, die der Nutzer sieht</td><td>Webbrowser, E-Mail</td></tr>
<tr><td>6</td><td><strong>Presentation</strong></td><td>Daten umformatieren, verschlüsseln</td><td>Encoding, Verschlüsselung</td></tr>
<tr><td>5</td><td><strong>Session</strong></td><td>Verbindungen verwalten</td><td>Login-Sessions</td></tr>
<tr><td>4</td><td><strong>Transport</strong></td><td>Zuverlässige Übertragung</td><td>TCP, UDP</td></tr>
<tr><td>3</td><td><strong>Network</strong></td><td>Routing, IP-Adressen</td><td>IP</td></tr>
<tr><td>2</td><td><strong>Data Link</strong></td><td>Lokale Zustellung</td><td>Ethernet, WLAN</td></tr>
<tr><td>1</td><td><strong>Physical</strong></td><td>Physische Signale</td><td>Kabel, Funk</td></tr>
</tbody>
</table>
</div>

<p><strong>Eselsbrücke (unten → oben):</strong> <strong>P</strong>lease <strong>D</strong>o <strong>N</strong>ot <strong>T</strong>hrow <strong>S</strong>ausage <strong>P</strong>izza <strong>A</strong>way</p>

<div class="callout callout-tip">
  <div class="callout-header">&#128161; In der Praxis</div>
  <p>"Schicht-2-Problem" = LAN/WLAN. "Schicht-3" = Routing/IP. "Schicht-7" = Anwendung. Das Modell hilft dir, Fehler systematisch einzugrenzen.</p>
</div>


<h2 class="section-title"><span class="number">1.3</span> Das TCP/IP-Modell</h2>

<p><strong>TCP/IP</strong> hat <strong>4 Schichten</strong> und ist das Modell des Internets.</p>

<div class="table-container">
<table>
<thead>
<tr><th>Schicht</th><th>Name</th><th>Entspricht OSI</th></tr>
</thead>
<tbody>
<tr><td>4</td><td><strong>Application</strong></td><td>OSI 5–7</td></tr>
<tr><td>3</td><td><strong>Transport</strong></td><td>OSI 4</td></tr>
<tr><td>2</td><td><strong>Internet</strong></td><td>OSI 3</td></tr>
<tr><td>1</td><td><strong>Network Access</strong></td><td>OSI 1–2</td></tr>
</tbody>
</table>
</div>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Wichtig für die Praxis</div>
  <p>Wenn in der Praxis von "Layer 3" gesprochen wird, ist fast immer IP gemeint – unabhängig vom Modell.</p>
</div>


<h2 class="section-title"><span class="number">1.4</span> Datenkapselung (Encapsulation)</h2>

<p>Daten werden beim Senden Schicht für Schicht verpackt – wie ein Brief in mehreren Umschlägen.</p>

<div class="code-block">
  <div class="code-header"><span class="lang">PRINZIP</span></div>
  <pre><code>Anwendungsdaten
  → + TCP/UDP Header = Segment
    → + IP Header = Paket
      → + MAC Header = Frame
        → Bits auf dem Medium</code></pre>
</div>

<p>Der Empfänger entfernt diese Header wieder – in umgekehrter Reihenfolge.</p>


<h2 class="section-title"><span class="number">1.5</span> Vorbereitung: OSI-Schichten im Terminal</h2>

<div class="exercise-start-banner">
  <div class="exercise-start-icon">&#128187;</div>
  <div class="exercise-start-text">
    <strong>Terminal-&Uuml;bung beginnt jetzt!</strong><br>
    Du erkundest die OSI-Schichten direkt im System.
  </div>
</div>

<p><strong>Du lernst in 4 Schritten:</strong></p>

<ol>
  <li><strong>IP anzeigen</strong> – <span class="inline-code">ip addr</span></li>
  <li><strong>Routing prüfen</strong> – <span class="inline-code">ip route</span></li>
  <li><strong>Erreichbarkeit testen</strong> – <span class="inline-code">ping</span></li>
  <li><strong>ARP anzeigen</strong> – <span class="inline-code">ip neigh</span></li>
</ol>

<div class="callout callout-warning">
  <div class="callout-header">&#9888; Hinweis</div>
  <p>Das Terminal ist simuliert – du kannst nichts kaputt machen.</p>
</div>