<h2 class="section-title"><span class="number">1.3</span> Schritt 3: Partitionen fuer die Doku erfassen</h2>
<p>Jetzt dokumentierst du die Partitionen des Zielgeraets. Diese Werte brauchst du spaeter fuer Nachweis, Bericht und Plausibilitaetscheck.</p>

<h3>Befehl ausfuehren</h3>
<div class="code-block">
  <div class="code-header">
    <span class="lang">POWERSHELL</span>
    <button class="copy-btn">Kopieren</button>
  </div>
  <pre><code>Get-Partition -DiskNumber 1</code></pre>
</div>
<h3>Befehl erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Bestandteil</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Get-Partition</span> / <span class="inline-code">get-partition</span></td><td>Listet Partitionen eines physischen Datentraegers auf.</td></tr>
      <tr><td><span class="inline-code">-DiskNumber 1</span></td><td>Bezieht sich auf die Disk mit Nummer 1 aus <span class="inline-code">Get-Disk</span> &mdash; muss zum gewaehlten Beweismittel passen.</td></tr>
    </tbody>
  </table>
</div>
<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Die gewaehlte <span class="inline-code">DiskNumber</span> muss immer zur vorher identifizierten Ziel-Disk passen.</p>
</div>
<div class="code-block output-block">
  <div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>
  <pre><code>DiskNumber PartitionNumber Offset     Size
1          1               1048576    31.9 GB</code></pre>
</div>
<h3>Ausgabe erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Ausgabe-Feld</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">PartitionNumber</span></td><td>Laufende Nummer der Partition auf dieser Disk.</td></tr>
      <tr><td><span class="inline-code">Offset</span></td><td>Startposition der Partition in Bytes; wichtig fuer Imaging, Mounting und spaetere Analyse.</td></tr>
      <tr><td><span class="inline-code">Size</span></td><td>Groesse der Partition.</td></tr>
    </tbody>
  </table>
</div>
<p><strong>Erfolgskriterium:</strong> Du hast <span class="inline-code">DiskNumber</span>, <span class="inline-code">PartitionNumber</span> und <span class="inline-code">Offset</span> in deinen Notizen.</p>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Partitionsdaten sauber sichern</span>
  </div>
  <div class="exercise-body">
    <div class="exercise-goal">
      <div class="goal-label">Ziel</div>
      <p>Alle relevanten Partitionswerte so erfassen, dass sie spaeter eindeutig pruefbar sind.</p>
    </div>
    <p><strong>Befehl fuer diese Uebung:</strong></p>
    <div class="code-block">
      <div class="code-header">
        <span class="lang">POWERSHELL</span>
        <button class="copy-btn">Kopieren</button>
      </div>
      <pre><code>get-partition -DiskNumber 1</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre <code>get-partition -DiskNumber 1</code> aus.</li>
        <li>Notiere Disk-Nummer, Partitionsnummer und Offset.</li>
        <li>Schreibe einen Satz, warum diese Werte fuer den Fall wichtig sind.</li>
      </ol>
    </div>
    <div class="toggle-container">
      <div class="toggle-header">
        <span class="toggle-label">Loesung anzeigen</span>
        <span class="toggle-arrow">&#9654;</span>
      </div>
      <div class="toggle-content">
        <p>Bestanden ist die Uebung, wenn alle drei Werte dokumentiert sind und ein Dritter die Partition eindeutig wiederfinden kann.</p>
      </div>
    </div>
  </div>
</div>
