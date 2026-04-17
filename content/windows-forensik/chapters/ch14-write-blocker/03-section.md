<h2 class="section-title"><span class="number">14.3</span> Write-Blocker-Check sichern</h2>
<p><strong>Was und warum:</strong> Kontrollergebnis fuer Bericht ablegen.</p>

<h3>Befehl ausfuehren</h3>
<div class="code-block">
  <div class="code-header">
    <span class="lang">POWERSHELL</span>
    <button class="copy-btn">Kopieren</button>
  </div>
  <pre><code>Get-Disk | Select-Object Number, FriendlyName, IsReadOnly, BusType | Out-File C:\Cases\case01\notes\write-blocker-check.txt</code></pre>
</div>

<h3>Befehl erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Bestandteil</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td>Befehl</td><td><span class="inline-code">Get-Disk | Select-Object Number, FriendlyName, IsReadOnly, BusType | Out-File C:\Cases\case01\notes\write-blocker-check.txt</span></td></tr>
      <tr><td>Nutzen</td><td>Kontrollergebnis fuer Bericht ablegen.</td></tr>
      <tr><td>Kernkommando</td><td><span class="inline-code">get-disk</span> ist simulator-kompatibel.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Kontrollergebnis fuer Bericht ablegen. Dokumentiere den Schritt direkt nach der Ausfuehrung.</p>
</div>

<div class="code-block output-block">
  <div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>
  <pre><code>Output written to C:\Cases\case01\notes\write-blocker-check.txt</code></pre>
</div>

<h3>Ausgabe erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Ausgabe-Feld</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td>Erste Zeile</td><td><span class="inline-code">Output written to C:\Cases\case01\notes\write-blocker-check.txt</span></td></tr>
      <tr><td>Bedeutung</td><td>Signalisiert, dass der Schritt wie geplant ausgefuehrt wurde.</td></tr>
    </tbody>
  </table>
</div>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Write-Blocker-Check sichern</span>
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
      <pre><code>get-disk | select-object number, friendlyname, isreadonly, bustype | out-file c:\cases\case01\notes\write-blocker-check.txt</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre den Befehl exakt wie gezeigt aus.</li>
        <li>Pruefe die Ausgabe auf den Kernhinweis.</li>
        <li>Notiere Ergebnis und kurze Bedeutung in deinen Fallnotizen.</li>
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
