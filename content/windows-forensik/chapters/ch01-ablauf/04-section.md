<h2 class="section-title"><span class="number">1.4</span> Alles verbinden: Reihenfolge verstehen</h2>
<p>Jetzt setzt du die drei Einzelschritte zusammen und pruefst, ob dein Ablauf fachlich belastbar ist.</p>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merksatz fuer jeden Fallstart</div>
  <p>Immer erst <em>dokumentieren</em>, dann <em>identifizieren</em>, dann <em>partitionieren/dokumentieren</em>, danach erst sichern.</p>
</div>

<div class="table-container">
  <table>
    <thead>
      <tr><th>Schritt</th><th>Wofuer er da ist</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Start-Transcript</span></td><td>Befehls- und Zeitspur sichern</td></tr>
      <tr><td><span class="inline-code">Get-Disk</span></td><td>Zielgeraet eindeutig bestimmen</td></tr>
      <tr><td><span class="inline-code">Get-Partition -DiskNumber 1</span></td><td>Partitionswerte fuer die Fallakte erfassen</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-danger">
  <div class="callout-header">&#9888; Typische Fehler</div>
  <ul>
    <li><strong>Kein Transcript:</strong> Nachweiskette startet zu spaet.</li>
    <li><strong>Falsches Device:</strong> Host-System und Beweismittel werden verwechselt.</li>
    <li><strong>Lueckenhafte Notizen:</strong> Partition kann spaeter nicht eindeutig zugeordnet werden.</li>
  </ul>
</div>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Mini-Workflow ohne Zurueckspringen</span>
  </div>
  <div class="exercise-body">
    <div class="exercise-goal">
      <div class="goal-label">Ziel</div>
      <p>Den kompletten Startablauf auf einer Slide ausfuehren und fachlich begruenden.</p>
    </div>
    <p><strong>Befehle fuer diese Uebung:</strong></p>
    <div class="code-block">
      <div class="code-header">
        <span class="lang">POWERSHELL</span>
        <button class="copy-btn">Kopieren</button>
      </div>
      <pre><code>start-transcript -Path C:\Cases\case01\notes\session.log
get-disk
get-partition -DiskNumber 1</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre <code>start-transcript</code>, dann <code>get-disk</code>, dann <code>get-partition -DiskNumber 1</code> aus.</li>
        <li>Notiere Zielgeraet und Partitionsdaten in der Fallakte.</li>
        <li>Schreibe zwei Saetze: Warum ist diese Reihenfolge Pflicht?</li>
      </ol>
    </div>
    <div class="toggle-container">
      <div class="toggle-header">
        <span class="toggle-label">Loesung anzeigen</span>
        <span class="toggle-arrow">&#9654;</span>
      </div>
      <div class="toggle-content">
        <p>Der Ablauf ist sauber, wenn erst die Nachweiskette aktiv ist, dann das Ziel eindeutig bestimmt wird und erst danach die Partitionsdaten dokumentiert werden.</p>
      </div>
    </div>
  </div>
</div>

<div class="nav-buttons">
  <button class="nav-btn" data-target="ch01-ablauf">&#8592; Zur vorherigen Slide</button>
  <button class="complete-section-btn">Kapitel abschliessen</button>
</div>
