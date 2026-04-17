<h2 class="section-title"><span class="number">1.1</span> Schritt 1: Session sauber starten</h2>
<p>In dieser Slide geht es nur um den ersten Pflichtschritt: Protokollierung aktivieren. Das ist deine Basis fuer alles, was danach kommt.</p>

<h3>Warum dieser Schritt zuerst kommt</h3>
<p>Ohne laufendes Transcript ist spaeter nicht mehr sauber nachweisbar, welche Befehle du wann ausgefuehrt hast.</p>

<h3>Befehl ausfuehren</h3>
<div class="code-block">
  <div class="code-header">
    <span class="lang">POWERSHELL</span>
    <button class="copy-btn">Kopieren</button>
  </div>
  <pre><code>Start-Transcript -Path C:\Cases\case01\notes\session.log</code></pre>
</div>
<h3>Befehl erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Bestandteil</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Start-Transcript</span> / <span class="inline-code">start-transcript</span></td><td>Startet die Protokollierung der PowerShell-Session in eine Textdatei.</td></tr>
      <tr><td><span class="inline-code">-Path</span></td><td>Pfad zur Logdatei. Alles, was du danach im Terminal tippst, landet dort (im Simulator vereinfacht dargestellt).</td></tr>
      <tr><td><span class="inline-code">C:\Cases\case01\notes\session.log</span></td><td>Beispiel: Session-Log im Case-Ordner unter <span class="inline-code">notes</span>.</td></tr>
    </tbody>
  </table>
</div>
<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Dieser Schritt muss immer als Erstes kommen, damit die Nachweiskette von Beginn an vollstaendig ist.</p>
</div>
<div class="code-block output-block">
  <div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>
  <pre><code>Transcript started...
Output file: C:\Cases\case01\notes\session.log</code></pre>
</div>
<h3>Ausgabe erklaert (wenn die Meldung kommt)</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Ausgabe-Feld</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Transcript started...</span></td><td>Die Protokollierung ist aktiv.</td></tr>
      <tr><td><span class="inline-code">Output file:</span></td><td>Zeigt den Pfad zur Logdatei, die du in den Fallnotizen dokumentierst.</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Erfolgskriterium:</strong> Die Meldung <span class="inline-code">Transcript started</span> erscheint.</p>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Transcript korrekt starten</span>
  </div>
  <div class="exercise-body">
    <div class="exercise-goal">
      <div class="goal-label">Ziel</div>
      <p>Sicherstellen, dass deine Session von der ersten Sekunde an sauber protokolliert wird.</p>
    </div>
    <p><strong>Befehle fuer diese Uebung (direkt hier nutzbar):</strong></p>
    <div class="code-block">
      <div class="code-header">
        <span class="lang">POWERSHELL</span>
        <button class="copy-btn">Kopieren</button>
      </div>
      <pre><code>start-transcript -Path C:\Cases\case01\notes\session.log</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre <code>start-transcript</code> aus.</li>
        <li>Pruefe, ob <span class="inline-code">Transcript started</span> erscheint.</li>
        <li>Notiere den Pfad der Logdatei in deinen Fallnotizen.</li>
      </ol>
    </div>
    <div class="toggle-container">
      <div class="toggle-header">
        <span class="toggle-label">Loesung anzeigen</span>
        <span class="toggle-arrow">&#9654;</span>
      </div>
      <div class="toggle-content">
        <p>Die Uebung ist bestanden, wenn das Transcript vor allen weiteren Befehlen aktiv ist und der Logpfad dokumentiert wurde.</p>
      </div>
    </div>
  </div>
</div>
