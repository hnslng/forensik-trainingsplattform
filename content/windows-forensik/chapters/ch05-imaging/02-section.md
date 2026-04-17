<h2 class="section-title"><span class="number">5.2</span> Raw-Abbild erzeugen</h2>
<p><strong>Was und warum:</strong> RAW ist das direkte Byte-Abbild ohne Container-Metadaten und hilft beim Formatvergleich.</p>

<h3>Befehl ausfuehren</h3>
<div class="code-block">
  <div class="code-header">
    <span class="lang">POWERSHELL</span>
    <button class="copy-btn">Kopieren</button>
  </div>
  <pre><code>dd.exe if=\\.\PhysicalDrive1 of=C:\Cases\case01\images\disk1.raw</code></pre>
</div>

<h3>Befehl erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Bestandteil</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td>Befehl</td><td><span class="inline-code">dd.exe if=\\.\PhysicalDrive1 of=C:\Cases\case01\images\disk1.raw</span></td></tr>
      <tr><td>Nutzen</td><td>Bitgenaue Kopie im einfachen Rohformat fuer Tool- und Kompatibilitaetstests.</td></tr>
      <tr><td>Kernkommando</td><td><span class="inline-code">dd.exe</span> ist simulator-kompatibel.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>RAW ist oft gross und unkomprimiert. Plane Speicherplatz vor dem Start mit ein.</p>
</div>

<div class="code-block output-block">
  <div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>
  <pre><code>dd.exe: wrote C:\Cases\case01\images\disk1.raw</code></pre>
</div>

<h3>Ausgabe erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Ausgabe-Feld</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">dd.exe: wrote ...disk1.raw</span></td><td>Die Ausgabedatei wurde geschrieben.</td></tr>
      <tr><td><span class="inline-code">disk1.raw</span></td><td>Name und Endung zeigen, dass das RAW-Ziel korrekt gesetzt war.</td></tr>
    </tbody>
  </table>
</div>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Raw-Abbild erzeugen</span>
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
      <pre><code>dd.exe if=\\.\physicaldrive1 of=c:\cases\case01\images\disk1.raw</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre den Befehl exakt wie gezeigt aus.</li>
        <li>Pruefe, ob die Ausgabe die erwartete RAW-Datei nennt.</li>
        <li>Notiere Dateiname, Speicherort und Zweck (RAW-Vergleichsabbild).</li>
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
