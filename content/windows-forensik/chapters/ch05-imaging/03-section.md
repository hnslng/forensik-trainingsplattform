<h2 class="section-title"><span class="number">5.3</span> Image verifizieren</h2>
<p><strong>Was und warum:</strong> Ohne Verifikation bleibt jedes Image fachlich unvollstaendig und nicht belastbar.</p>

<h3>Befehl ausfuehren</h3>
<div class="code-block">
  <div class="code-header">
    <span class="lang">POWERSHELL</span>
    <button class="copy-btn">Kopieren</button>
  </div>
  <pre><code>aim_cli.exe verify-image C:\Cases\case01\images\disk1.E01</code></pre>
</div>

<h3>Befehl erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Bestandteil</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td>Befehl</td><td><span class="inline-code">aim_cli.exe verify-image C:\Cases\case01\images\disk1.E01</span></td></tr>
      <tr><td>Nutzen</td><td>Prueft, ob das erzeugte Abbild konsistent und ohne erkennbare Fehler vorliegt.</td></tr>
      <tr><td>Kernkommando</td><td><span class="inline-code">aim_cli.exe</span> ist simulator-kompatibel.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Analyse startest du erst dann, wenn die Verifikation erfolgreich ist.</p>
</div>

<div class="code-block output-block">
  <div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>
  <pre><code>Verification started...
Status: OK
Image: C:\Cases\case01\images\disk1.E01</code></pre>
</div>

<h3>Ausgabe erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Ausgabe-Feld</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Status: OK</span></td><td>Die Verifikation wurde erfolgreich abgeschlossen.</td></tr>
      <tr><td><span class="inline-code">Image: ...disk1.E01</span></td><td>Zeigt, auf welches konkrete Abbild sich das Ergebnis bezieht.</td></tr>
    </tbody>
  </table>
</div>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Image verifizieren</span>
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
      <pre><code>aim_cli.exe verify-image c:\cases\case01\images\disk1.e01</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre den Befehl exakt wie gezeigt aus.</li>
        <li>Pruefe, ob <span class="inline-code">Status: OK</span> erscheint.</li>
        <li>Dokumentiere das Ergebnis als "verifiziert" oder "neu sichern".</li>
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
