<h2 class="section-title"><span class="number">5.4</span> Transfer und Abschluss</h2>
<p>Du verbindest jetzt alle drei Kernschritte zu einem zusammenhaengenden Ablauf.</p>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Imaging ist erst dann sauber abgeschlossen, wenn Erstellung, Formatwahl und Verifikation dokumentiert sind.</p>
</div>

<div class="table-container">
  <table>
    <thead>
      <tr><th>Schritt</th><th>Wofuer er da ist</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">ftkimager.exe --create-image \\.\PhysicalDrive1 E01 C:\Cases\case01\images\disk1.E01</span></td><td>E01-Abbild mit Metadaten erstellen.</td></tr>
      <tr><td><span class="inline-code">dd.exe if=\\.\PhysicalDrive1 of=C:\Cases\case01\images\disk1.raw</span></td><td>RAW-Abbild als Vergleichsformat erstellen.</td></tr>
      <tr><td><span class="inline-code">aim_cli.exe verify-image C:\Cases\case01\images\disk1.E01</span></td><td>Integritaet des E01-Abbilds pruefen.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-danger">
  <div class="callout-header">&#9888; Typische Fehler</div>
  <ul>
    <li><strong>Quelle/Ziel verwechselt:</strong> kritisches Risiko fuer Datenverlust.</li>
    <li><strong>Verifikation ausgelassen:</strong> Image ist fachlich nicht freigegeben.</li>
    <li><strong>Format nicht begruendet:</strong> Entscheidung im Bericht schwer nachvollziehbar.</li>
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
      <pre><code>ftkimager.exe --create-image \\.\physicaldrive1 e01 c:\cases\case01\images\disk1.e01
dd.exe if=\\.\physicaldrive1 of=c:\cases\case01\images\disk1.raw
aim_cli.exe verify-image c:\cases\case01\images\disk1.e01</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre die drei Befehle exakt in Reihenfolge aus.</li>
        <li>Notiere pro Schritt die wichtigste Ausgabezeile.</li>
        <li>Entscheide am Ende explizit: "Image freigegeben" oder "neu sichern".</li>
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
  <button class="nav-btn" data-target="ch05-imaging">&#8592; Zur vorherigen Slide</button>
  <button class="complete-section-btn">Kapitel abschliessen</button>
</div>
