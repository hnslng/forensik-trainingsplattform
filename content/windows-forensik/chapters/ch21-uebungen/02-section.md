<h2 class="section-title"><span class="number">21.2</span> Uebung 2: Imaging plus Hash</h2>
<p><strong>Was und warum:</strong> Hier trainierst du den kritischen Kern: Abbild erstellen und direkt Integritaet nachweisen.</p>

<h3>Befehl ausfuehren</h3>
<div class="code-block">
  <div class="code-header">
    <span class="lang">POWERSHELL</span>
    <button class="copy-btn">Kopieren</button>
  </div>
  <pre><code>ftkimager.exe --create-image \\.\PhysicalDrive1 E01 C:\Cases\case21\images\lab.E01
Get-FileHash C:\Cases\case21\images\lab.E01</code></pre>
</div>

<h3>Befehl erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Bestandteil</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td>Befehl</td><td><span class="inline-code">ftkimager.exe --create-image \\.\PhysicalDrive1 E01 C:\Cases\case21\images\lab.E01</span></td></tr>
      <tr><td>Nutzen</td><td>Verbindet Imaging und Hash-Nachweis in einem durchgehenden Ablauf.</td></tr>
      <tr><td>Kernkommando</td><td><span class="inline-code">ftkimager.exe</span> ist simulator-kompatibel.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Ein Imaging ohne anschliessenden Hash-Nachweis gilt in dieser Uebung als nicht bestanden.</p>
</div>

<div class="code-block output-block">
  <div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>
  <pre><code>Acquisition started...
SHA256 2BC4...</code></pre>
</div>

<h3>Ausgabe erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Ausgabe-Feld</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Acquisition started...</span></td><td>Imaging wurde gestartet.</td></tr>
      <tr><td><span class="inline-code">SHA256 2BC4...</span></td><td>Hashwert liegt vor und kann in der Fallakte dokumentiert werden.</td></tr>
    </tbody>
  </table>
</div>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Uebung 2: Imaging plus Hash</span>
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
      <pre><code>ftkimager.exe --create-image \\.\physicaldrive1 e01 c:\cases\case21\images\lab.e01
get-filehash c:\cases\case21\images\lab.e01</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre zuerst Imaging und dann Hash-Berechnung aus.</li>
        <li>Notiere Dateiname des Images und den ausgegebenen Hashwert.</li>
        <li>Entscheide: "integritaet nachgewiesen" oder "erneut sichern".</li>
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
