<h2 class="section-title"><span class="number">21.3</span> Uebung 3: Strings-Filter</h2>
<p><strong>Was und warum:</strong> In dieser Uebung filterst du aus Rohdaten schnell die ersten verwertbaren Hinweise heraus.</p>

<h3>Befehl ausfuehren</h3>
<div class="code-block">
  <div class="code-header">
    <span class="lang">POWERSHELL</span>
    <button class="copy-btn">Kopieren</button>
  </div>
  <pre><code>strings.exe C:\Cases\case21\evidence\memory.raw | findstr /i "password login token"</code></pre>
</div>

<h3>Befehl erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Bestandteil</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td>Befehl</td><td><span class="inline-code">strings.exe C:\Cases\case21\evidence\memory.raw | findstr /i "password login token"</span></td></tr>
      <tr><td>Nutzen</td><td>Kombiniert Rohtext-Extraktion mit gezielter Stichwortsuche.</td></tr>
      <tr><td>Kernkommando</td><td><span class="inline-code">strings.exe</span> ist simulator-kompatibel.</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout-info">
  <div class="callout-header">&#9432; Merke</div>
  <p>Treffer sind nur Hinweise. Die Bewertung erfolgt erst mit Kontext und Dokumentation.</p>
</div>

<div class="code-block output-block">
  <div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div>
  <pre><code>login=svc_case21
password_hint=bluebox</code></pre>
</div>

<h3>Ausgabe erklaert</h3>
<div class="table-container">
  <table>
    <thead>
      <tr><th>Ausgabe-Feld</th><th>Bedeutung</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="inline-code">login=svc_case21</span></td><td>Hinweis auf moeglichen Accountbezug.</td></tr>
      <tr><td><span class="inline-code">password_hint=bluebox</span></td><td>Potentiell sensibles Artefakt, das als Befund markiert werden sollte.</td></tr>
    </tbody>
  </table>
</div>

<div class="exercise-box">
  <div class="exercise-header">
    <span class="exercise-badge">Uebung</span>
    <span class="exercise-name">Uebung 3: Strings-Filter</span>
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
      <pre><code>strings.exe c:\cases\case21\evidence\memory.raw | findstr /i "password login token"</code></pre>
    </div>
    <div class="exercise-steps">
      <ol class="numbered-list">
        <li>Fuehre den Befehl aus und markiere alle Trefferzeilen.</li>
        <li>Ordne jeden Treffer als "relevant", "unklar" oder "nicht relevant" ein.</li>
        <li>Dokumentiere mindestens einen Treffer mit kurzer Begruendung.</li>
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
