<h2 class="section-title"><span class="number">13.1</span> Vorherhash sichern</h2>
<p><strong>Was und warum:</strong> Vergleich braucht einen klaren Ausgangswert.</p>

<h3>Befehl ausfuehren</h3>
<div class="code-block">
  <div class="code-header">
    <span class="lang">POWERSHELL</span>
    <button class="copy-btn">Kopieren</button>
  </div>
  <pre><code>Get-FileHash C:\Cases\case01\evidence\wipe-target.img</code></pre>
</div>

<h3>Befehl erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Bestandteil</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td>Befehl</td><td><span class="inline-code">Get-FileHash C:\Cases\case01\evidence\wipe-target.img</span></td></tr>
      <tr><td>Nutzen</td><td>Vergleich braucht einen klaren Ausgangswert.</td></tr>
      <tr><td>Kernkommando</td><td><span class="inline-code">get-filehash</span> ist simulator-kompatibel.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Vergleich braucht einen klaren Ausgangswert. Dokumentiere den Schritt direkt nach der Ausfuehrung.</p>
</div>

<div class="code-block output-block">
  <div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>
  <pre><code>Algorithm Hash
SHA256 1A1B...</code></pre>
</div>

<h3>Ausgabe erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Ausgabe-Feld</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td>Erste Zeile</td><td><span class="inline-code">Algorithm Hash</span></td></tr>
      <tr><td>Bedeutung</td><td>Signalisiert, dass der Schritt wie geplant ausgefuehrt wurde.</td></tr>
    </tbody>
  </table>
</div>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Vorherhash sichern</span>
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
      <pre><code>get-filehash c:\cases\case01\evidence\wipe-target.img</code></pre>
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
