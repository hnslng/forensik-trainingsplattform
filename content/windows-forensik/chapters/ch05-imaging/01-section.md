<h2 class="section-title"><span class="number">5.1</span> E01-Abbild erstellen</h2>
<p><strong>Was und warum:</strong> E01 ist das Standardformat, wenn du ein nachvollziehbares Abbild mit Metadaten brauchst.</p>

<h3>Befehl ausfuehren</h3>
<div class="code-block">
  <div class="code-header">
    <span class="lang">POWERSHELL</span>
    <button class="copy-btn">Kopieren</button>
  </div>
  <pre><code>ftkimager.exe --create-image \\.\PhysicalDrive1 E01 C:\Cases\case01\images\disk1.E01</code></pre>
</div>

<h3>Befehl erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Bestandteil</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td>Befehl</td><td><span class="inline-code">ftkimager.exe --create-image \\.\PhysicalDrive1 E01 C:\Cases\case01\images\disk1.E01</span></td></tr>
      <tr><td>Nutzen</td><td>Gerichtsnahes Arbeitsformat mit Fallinformationen und klarer Dateistruktur.</td></tr>
      <tr><td>Kernkommando</td><td><span class="inline-code">ftkimager.exe</span> ist simulator-kompatibel.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Vor dem Start immer Quelle und Zielpfad laut notieren. So reduzierst du Verwechslungsfehler auf ein Minimum.</p>
</div>

<div class="code-block output-block">
  <div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>
  <pre><code>Acquisition started...
Destination: C:\Cases\case01\images\disk1.E01</code></pre>
</div>

<h3>Ausgabe erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Ausgabe-Feld</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Acquisition started...</span></td><td>Der Imaging-Prozess wurde gestartet.</td></tr>
      <tr><td><span class="inline-code">Destination: ...disk1.E01</span></td><td>Zeigt eindeutig, wohin das Abbild geschrieben wird.</td></tr>
    </tbody>
  </table>
</div>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">E01-Abbild erstellen</span>
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
      <pre><code>ftkimager.exe --create-image \\.\physicaldrive1 e01 c:\cases\case01\images\disk1.e01</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre den Befehl exakt wie gezeigt aus.</li>
        <li>Pruefe in der Ausgabe, ob Quelle und Zielpfad korrekt sind.</li>
        <li>Notiere Startzeit, Quelle und Zielpfad in deinen Fallnotizen.</li>
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
