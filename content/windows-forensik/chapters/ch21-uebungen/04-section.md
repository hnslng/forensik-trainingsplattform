<h2 class="section-title"><span class="number">21.4</span> Transfer und Abschluss</h2>
<p>Du verbindest jetzt alle drei Kernschritte zu einem zusammenhaengenden Ablauf.</p>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Das Kapitel gilt als bestanden, wenn du Start, Sicherung, Integritaetsnachweis und Hinweisanalyse konsistent dokumentierst.</p>
</div>

<div class="table-container">
  <table>
    <thead>
      <tr><th>Schritt</th><th>Wofuer er da ist</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">Start-Transcript -Path C:\Cases\case21\notes\exercise1.log</span></td><td>Pflichtreihenfolge sicher beherrschen.</td></tr>
      <tr><td><span class="inline-code">ftkimager.exe --create-image \\.\PhysicalDrive1 E01 C:\Cases\case21\images\lab.E01</span></td><td>Sicherung und Integritaet zusammen trainieren.</td></tr>
      <tr><td><span class="inline-code">strings.exe C:\Cases\case21\evidence\memory.raw | findstr /i "password login token"</span></td><td>Treffer in Rohdaten schnell priorisieren.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-danger">
  <div class="callout-header">&#9888; Typische Fehler</div>
  <ul>
    <li><strong>Ohne Transcript gestartet:</strong> Nachweiskette ist lueckenhaft.</li>
    <li><strong>Hash nicht notiert:</strong> Integritaetsnachweis fehlt im Bericht.</li>
    <li><strong>Treffer ungeprueft uebernommen:</strong> Risiko falscher Schlussfolgerungen.</li>
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
      <pre><code>start-transcript -path c:\cases\case21\notes\exercise1.log
get-disk
get-partition -disknumber 1
ftkimager.exe --create-image \\.\physicaldrive1 e01 c:\cases\case21\images\lab.e01
get-filehash c:\cases\case21\images\lab.e01
strings.exe c:\cases\case21\evidence\memory.raw | findstr /i "password login token"</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre alle gezeigten Befehle in der angegebenen Reihenfolge aus.</li>
        <li>Notiere pro Schritt die wichtigste Ausgabezeile.</li>
        <li>Formuliere eine kurze Gesamtbewertung in 2-3 Saetzen.</li>
        <li>Triff eine Abschlussentscheidung: "workflow bestanden" oder "wiederholen".</li>
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
  <button class="nav-btn" data-target="ch21-uebungen">&#8592; Zur vorherigen Slide</button>
  <button class="complete-section-btn">Kapitel abschliessen</button>
</div>
