<h2 class="section-title"><span class="number">15.2</span> Befehlsverlauf pruefen</h2>
<p><strong>Was und warum:</strong> Mit dem Verlauf pruefst du, ob Pflichtschritte in der richtigen Reihenfolge gelaufen sind.</p>

<h3>Befehl ausfuehren</h3>
<div class="code-block">
  <div class="code-header">
    <span class="lang">POWERSHELL</span>
    <button class="copy-btn">Kopieren</button>
  </div>
  <pre><code>Get-History</code></pre>
</div>

<h3>Befehl erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Bestandteil</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td>Befehl</td><td><span class="inline-code">Get-History</span></td></tr>
      <tr><td>Nutzen</td><td>Zeigt die bisher ausgefuehrten Befehle in zeitlicher Reihenfolge.</td></tr>
      <tr><td>Kernkommando</td><td><span class="inline-code">get-history</span> ist simulator-kompatibel.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Abweichungen im Verlauf sind ein fruehes Warnsignal fuer fehlerhafte Arbeitsablaeufe.</p>
</div>

<div class="code-block output-block">
  <div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>
  <pre><code>Id CommandLine
1 start-transcript ...
2 get-disk</code></pre>
</div>

<h3>Ausgabe erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Ausgabe-Feld</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Id CommandLine</span></td><td>Tabellenkopf fuer Reihenfolge und ausgefuehrte Befehle.</td></tr>
      <tr><td><span class="inline-code">1 start-transcript ...</span></td><td>Zeigt, ob die Protokollierung am Anfang stand.</td></tr>
    </tbody>
  </table>
</div>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Befehlsverlauf pruefen</span>
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
      <pre><code>get-history</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre den Befehl exakt wie gezeigt aus.</li>
        <li>Pruefe, ob <span class="inline-code">start-transcript</span> vor den Analysebefehlen steht.</li>
        <li>Notiere "Reihenfolge korrekt" oder "Reihenfolge fehlerhaft".</li>
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
