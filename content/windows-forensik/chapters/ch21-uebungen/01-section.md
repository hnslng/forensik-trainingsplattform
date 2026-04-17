<h2 class="section-title"><span class="number">21.1</span> Uebung 1: Startablauf</h2>
<p><strong>Was und warum:</strong> Diese Uebung trainiert den kompletten Startblock unter Zeitdruck und mit sauberer Doku.</p>

<h3>Befehl ausfuehren</h3>
<div class="code-block">
  <div class="code-header">
    <span class="lang">POWERSHELL</span>
    <button class="copy-btn">Kopieren</button>
  </div>
  <pre><code>Start-Transcript -Path C:\Cases\case21\notes\exercise1.log
Get-Disk
Get-Partition -DiskNumber 1</code></pre>
</div>

<h3>Befehl erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Bestandteil</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td>Befehl</td><td><span class="inline-code">Start-Transcript -Path C:\Cases\case21\notes\exercise1.log</span></td></tr>
      <tr><td>Nutzen</td><td>Startet den Fall korrekt und verknuepft Logging, Geraeteauswahl und Partitionssicht.</td></tr>
      <tr><td>Kernkommando</td><td><span class="inline-code">start-transcript</span> ist simulator-kompatibel.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Wenn dieser Startblock sitzt, werden Folgefehler in spaeteren Uebungen deutlich seltener.</p>
</div>

<div class="code-block output-block">
  <div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>
  <pre><code>Transcript started...
1 USB Evidence 32 GB
1 1 1048576 31.9 GB</code></pre>
</div>

<h3>Ausgabe erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Ausgabe-Feld</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Transcript started...</span></td><td>Session-Protokoll aktiv.</td></tr>
      <tr><td><span class="inline-code">1 USB Evidence 32 GB</span></td><td>Zielgeraet wurde in der Datentraegerliste erkannt.</td></tr>
    </tbody>
  </table>
</div>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Uebung 1: Startablauf</span>
  </div>
  <div class="exercise-body">
    <div class="exercise-goal">
      <div class="goal-label">Ziel</div>
      <p>Den Schritt sicher ausfuehren und nachvollziehbar dokumentieren.</p>
    </div>
    <p><strong>Befehl fuer diese Uebung:</strong></p>
    <div class="code-block">
      <div class="code-header">
        <span class="lang">POWERSHELL</span>
        <button class="copy-btn">Kopieren</button>
      </div>
      <pre><code>start-transcript -path c:\cases\case21\notes\exercise1.log
get-disk
get-partition -disknumber 1</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre die drei Befehle exakt in Reihenfolge aus.</li>
        <li>Notiere Disk-Nummer und Partition-Offset.</li>
        <li>Halte in einem Satz fest, warum diese Reihenfolge korrekt ist.</li>
      </ol>
    </div>
    <div class="toggle-container">
      <div class="toggle-header">
        <span class="toggle-label">Loesung anzeigen</span>
        <span class="toggle-arrow">&#9654;</span>
      </div>
      <div class="toggle-content">
        <p>Die Uebung ist bestanden, wenn Ausfuehrung, Ausgabe und kurze Interpretation sauber dokumentiert sind.</p>
      </div>
    </div>
  </div>
</div>
