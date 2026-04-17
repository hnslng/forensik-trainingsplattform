<h2 class="section-title"><span class="number">12.4</span> Transfer und Abschluss</h2>
<p>Du verbindest jetzt alle drei Kernschritte zu einem zusammenhaengenden Ablauf.</p>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Dateisysteme fuer forensische Analyse einordnen. Reihenfolge und Dokumentation sind genauso wichtig wie der Befehl selbst.</p>
</div>

<div class="table-container">
  <table>
    <thead>
      <tr><th>Schritt</th><th>Wofuer er da ist</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Get-Volume</span></td><td>Dateisystem setzt den Analysekontext.</td></tr>
      <tr><td><span class="inline-code">Get-Partition -DiskNumber 1 | Select-Object PartitionNumber, Type, Size, Offset</span></td><td>Technische Kernwerte fuer Bericht sichern.</td></tr>
      <tr><td><span class="inline-code">Get-ChildItem E:\</span></td><td>Erstaufnahme der Verzeichnisstruktur dokumentieren.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-danger">
  <div class="callout-header">&#9888; Typische Fehler</div>
  <ul>
    <li><strong>Schritte vertauscht:</strong> die Nachvollziehbarkeit sinkt sofort.</li>
    <li><strong>Ausgabe ignoriert:</strong> wichtige Hinweise gehen im Workflow verloren.</li>
    <li><strong>Nichts notiert:</strong> spaeter fehlt der belegbare Nachweis.</li>
  </ul>
</div>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Kapitel-Workflow komplett</span>
  </div>
  <div class="exercise-body">
    <div class="exercise-goal">
      <div class="goal-label">Ziel</div>
      <p>Alle Kernschritte auf einer Slide sicher und ohne Zurueckspringen ausfuehren.</p>
    </div>
    <p><strong>Befehle fuer diese Uebung:</strong></p>
    <div class="code-block">
      <div class="code-header">
        <span class="lang">POWERSHELL</span>
        <button class="copy-btn">Kopieren</button>
      </div>
      <pre><code>get-volume
get-partition -disknumber 1 | select-object partitionnumber, type, size, offset
get-childitem e:\</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre die drei Befehle exakt in Reihenfolge aus.</li>
        <li>Notiere pro Schritt die wichtigste Ausgabezeile.</li>
        <li>Formuliere eine kurze Gesamtbewertung in 2-3 Saetzen.</li>
      </ol>
    </div>
    <div class="toggle-container">
      <div class="toggle-header">
        <span class="toggle-label">Loesung anzeigen</span>
        <span class="toggle-arrow">&#9654;</span>
      </div>
      <div class="toggle-content">
        <p>Der Abschluss ist erfolgreich, wenn Reihenfolge, Ausgaben und Bewertung nachvollziehbar dokumentiert sind.</p>
      </div>
    </div>
  </div>
</div>

<div class="nav-buttons">
  <button class="nav-btn" data-target="ch12-dateisysteme">&#8592; Zur vorherigen Slide</button>
  <button class="complete-section-btn">Kapitel abschliessen</button>
</div>
