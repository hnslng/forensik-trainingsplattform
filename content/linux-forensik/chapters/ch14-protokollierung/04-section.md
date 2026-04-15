<h2 class="section-title"><span class="number">12.4</span> Gerichtsverwertbarkeit</h2><p>Was macht forensische Beweise vor Gericht verwertbar?</p><div class="code-block"><div class="code-header"><span class="lang">RECHTLICH</span><button class="copy-btn">Kopieren</button></div><pre><code>Anforderungen f&uuml;r gerichtliche Verwertbarkeit:

1. L&uuml;ckenlose Dokumentation
   - Jeder Schritt protokolliert (script-Befehl)
   - Chain of Custody dokumentiert
   - Zeitstempel, Untersucher, Tools dokumentiert

2. Integrit&auml;tspr&uuml;fung
   - Hashes vor und nach dem Imaging
   - Verifizierung dokumentiert
   - Hash-Algorithmus standardisiert (SHA-256)

3. Forensisch saubere Arbeitsweise
   - Original nicht ver&auml;ndert
   - Write-Blocker verwendet
   - Nur read-only Analysis

4. Wiederholbarkeit
   - Jeder Schritt von unabh&auml;ngiger Person reproduzierbar
   - Tools dokumentiert mit Version
   - Befehle exakt dokumentiert</code></pre></div><div class="callout callout-danger"><div class="callout-header">&#9888; Typische Fehler in diesem Kapitel</div><ul><li><strong>Kein script-Befehl:</strong> Terminal-Sitzung nicht protokolliert</li><li><strong>L&uuml;ckenhafte Chain of Custody:</strong> &Uuml;bergabe nicht dokumentiert</li><li><strong>Hashes nicht verifiziert:</strong> Hash-Erstellung, aber keine Verifizierung</li><li><strong>Zeitstempel fehlen:</strong> Wann wurden welche Schritte durchgef&uuml;hrt?</li><li><strong>Tools nicht dokumentiert:</strong> Welche Version von Sleuth Kit wurde verwendet?</li><li><strong>Original ver&auml;ndert:</strong> Forensische Regel verletzt</li></ul></div><div class="exercise-box"><div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Chain of Custody erstellen</span></div><div class="exercise-body"><div class="exercise-goal"><div class="goal-label">Ziel</div><p>Erstelle eine vollst&auml;ndige Chain of Custody Dokumentation f&uuml;r einen Fall.</p></div><div class="exercise-steps"><ol class="numbered-list"><li>Case-Ordner strukturieren</li><li>&Uuml;bernahme dokumentieren (Datum, Untersucher, Device, Serial)</li><li>Original-Hash dokumentieren</li><li>Imaging dokumentieren</li><li>Image-Hash dokumentieren</li><li>Verifizierung dokumentieren</li><li>Alle Schritte mit script-Befehl protokollieren</li><li>Wann ist die Chain of Custody l&uuml;ckenlos?</li></ol></div><div class="toggle-container"><div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div><div class="toggle-content"><p><strong>Chain of Custody ist l&uuml;ckenlos, wenn:</strong></p><ul><li>Jeder Schritt mit Datum &amp; Zeit dokumentiert ist</li><li>Der Untersteller &amp; Untersucher benannt ist</li><li>Das Device eindeutig identifiziert ist</li><li>Alle Hashes dokumentiert und verifiziert sind</li><li>Imaging, Analyse und Abgabe dokumentiert sind</li><li>Alle &Uuml;bergaben mit Empf&auml;nger &amp; Datum dokumentiert sind</li></ul></div></div></div></div><button class="complete-section-btn" data-chapter="ch14-protokollierung">&#9744; Kapitel als abgeschlossen markieren</button><div class="nav-buttons"><button class="nav-btn" data-target="ch13-vergleich">&#8592; Vergleich</button><button class="nav-btn" data-target="ch15-write-blocker">Write-Blocker &#8594;</button></div>
