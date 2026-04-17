<h2 class="section-title"><span class="number">15.4</span> Transfer und Abschluss</h2>
<p>Du verbindest jetzt alle drei Kernschritte zu einem zusammenhaengenden Ablauf.</p>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Protokollierung ist nur dann belastbar, wenn Start, Verlaufskontrolle und Abschluss zusammenpassen.</p>
</div>

<div class="table-container">
  <table>
    <thead>
      <tr><th>Schritt</th><th>Wofuer er da ist</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Start-Transcript -Path C:\Cases\case01\notes\session.log</span></td><td>Nachweiskette von Anfang an aktivieren.</td></tr>
      <tr><td><span class="inline-code">Get-History</span></td><td>Reihenfolge und Vollstaendigkeit kontrollieren.</td></tr>
      <tr><td><span class="inline-code">Stop-Transcript</span></td><td>Session formal korrekt abschliessen.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-danger">
  <div class="callout-header">&#9888; Typische Fehler</div>
  <ul>
    <li><strong>Transcript zu spaet gestartet:</strong> fruehe Befehle fehlen im Nachweis.</li>
    <li><strong>Verlauf nicht geprueft:</strong> Reihenfolgefehler bleiben unentdeckt.</li>
    <li><strong>Transcript nicht beendet:</strong> Session bleibt formal unvollstaendig.</li>
  </ul>
</div>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Kapitel-Workflow komplett</span>
  </div>
  <div class="exercise-body">
    <div class="exercise-goal">
      <div class="goal-label">Ziel</div>
      <p>Alle Kernschritte auf einer Slide sicher und ohne Zurueckspringen ausfuehren.</p>
    </div>
    <p><strong>Befehle fuer diese Uebung:</strong></p>
    <div class="code-block">
      <div class="code-header">
        <span class="lang">POWERSHELL</span>
        <button class="copy-btn">Kopieren</button>
      </div>
      <pre><code>start-transcript -path c:\cases\case01\notes\session.log
get-history
stop-transcript</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre die drei Befehle exakt in Reihenfolge aus.</li>
        <li>Notiere pro Schritt die wichtigste Ausgabezeile.</li>
        <li>Formuliere eine Abschlussbewertung: "Dokumentation vollstaendig" oder "nacharbeiten".</li>
      </ol>
    </div>
    <div class="toggle-container">
      <div class="toggle-header">
        <span class="toggle-label">Loesung anzeigen</span>
        <span class="toggle-arrow">&#9654;</span>
      </div>
      <div class="toggle-content">
        <p>Der Abschluss ist erfolgreich, wenn Reihenfolge, Ausgaben und Bewertung nachvollziehbar dokumentiert sind.</p>
      </div>
    </div>
  </div>
</div>

<div class="nav-buttons">
  <button class="nav-btn" data-target="ch15-protokollierung">&#8592; Zur vorherigen Slide</button>
  <button class="complete-section-btn">Kapitel abschliessen</button>
</div>
