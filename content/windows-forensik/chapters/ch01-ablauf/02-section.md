<h2 class="section-title"><span class="number">1.2</span> Schritt 2: Zielgeraet eindeutig identifizieren</h2>
<p>Jetzt identifizierst du den Datentraeger, mit dem du arbeiten willst. Nur wenn das eindeutig ist, bleibt der Fall fachlich sauber.</p>

<h3>Befehl ausfuehren</h3>
<div class="code-block">
  <div class="code-header">
    <span class="lang">POWERSHELL</span>
    <button class="copy-btn">Kopieren</button>
  </div>
  <pre><code>Get-Disk</code></pre>
</div>
<h3>Befehl erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Bestandteil</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Get-Disk</span> / <span class="inline-code">get-disk</span></td><td>Listet alle erkannten physischen Datentraeger auf.</td></tr>
      <tr><td><span class="inline-code">(kein Zusatzparameter)</span></td><td>Du bekommst zuerst den Gesamtueberblick und waehlst danach das Zielgeraet.</td></tr>
    </tbody>
  </table>
</div>
<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Erst wenn das Zielgeraet eindeutig ist, darfst du mit weiteren forensischen Schritten weitermachen.</p>
</div>
<div class="code-block output-block">
  <div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>
  <pre><code>Number FriendlyName        Size
0      Samsung SSD         512 GB
1      SanDisk Cruzer       32 GB</code></pre>
</div>
<h3>Ausgabe erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Spalte / Feld</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Number</span></td><td>Interne Disk-Nummer unter Windows (wird spaeter z. B. bei <span class="inline-code">PHYSICALDRIVE1</span> wichtig).</td></tr>
      <tr><td><span class="inline-code">FriendlyName</span></td><td>Anzeigename des Herstellers/Modells &mdash; hilft, USB und interne Platte zu unterscheiden.</td></tr>
      <tr><td><span class="inline-code">Size</span></td><td>Groesse des Datentraegers; zusaetzlicher Hinweis bei mehreren aehnlichen Geraeten.</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Erfolgskriterium:</strong> Du kannst das externe Geraet eindeutig benennen (hier: <span class="inline-code">Disk 1</span>).</p>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Richtiges Zielgeraet festlegen</span>
  </div>
  <div class="exercise-body">
    <div class="exercise-goal">
      <div class="goal-label">Ziel</div>
      <p>Das richtige Device fuer die weitere Bearbeitung sicher bestimmen.</p>
    </div>
    <p><strong>Befehl fuer diese Uebung (ohne Zurueckspringen):</strong></p>
    <div class="code-block">
      <div class="code-header">
        <span class="lang">POWERSHELL</span>
        <button class="copy-btn">Kopieren</button>
      </div>
      <pre><code>get-disk</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre <code>get-disk</code> aus.</li>
        <li>Waehle das externe Zielgeraet anhand Name und Groesse aus.</li>
        <li>Notiere die Disk-Nummer in deinen Fallnotizen.</li>
      </ol>
    </div>
    <div class="toggle-container">
      <div class="toggle-header">
        <span class="toggle-label">Loesung anzeigen</span>
        <span class="toggle-arrow">&#9654;</span>
      </div>
      <div class="toggle-content">
        <p>Die Uebung ist bestanden, wenn das externe Device klar als Zielgeraet notiert ist und nicht mit dem Host-System verwechselt werden kann.</p>
      </div>
    </div>
  </div>
</div>
