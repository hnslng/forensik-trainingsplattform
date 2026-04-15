---
icon: '&#128195;'
id: ch14-protokollierung
section: Vertiefung
title: Protokollierung
---

<h1 class="chapter-title">Protokollierung</h1><div class="chapter-subtitle">script-Befehl, Chain of Custody, Gerichtsverwertbarkeit</div><div class="callout callout-context"><div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div><p>Ohne Dokumentation ist forensische Arbeit wertlos. Gerichte akzeptieren nur nachvollziehbare, l&uuml;ckenlose Dokumentation. Der <span class="inline-code">script</span>-Befehl protokolliert jeden Schritt. Die Chain of Custody dokumentiert die Beweiskette von der &Uuml;bernahme bis zur Abgabe.</p></div>

<p class="chapter-intro">Ohne Protokollierung ist forensische Arbeit vor Gericht wertlos. Jeder Befehl, jeder Zeitpunkt, jedes Ergebnis muss nachvollziehbar sein.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du verstehst die forensische Protokollierung mit script und timeline, kannst Sessions aufzeichnen und weisst was dokumentiert werden muss.</p></div>

<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128221;</div><div class="feature-text"><h3>script</h3><p>Terminal-Session aufzeichnen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128339;</div><div class="feature-text"><h3>Timeline</h3><p>Zeitstempel dokumentieren</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128196;</div><div class="feature-text"><h3>Berichte</h3><p>Forensische Dokumentation</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#9878;</div><div class="feature-text"><h3>Chain of Custody</h3><p>Beweiskette führen</p></div></div></div>
<h2 class="section-title"><span class="number">12.1</span> script-Befehl</h2><p>Der Standard-Tool f&uuml;r Terminal-Protokollierung unter Linux.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Protokoll starten
script -f session_$(date +%Y%m%d_%H%M%S).log

# Mit Zeitstempel und Kompression
script -f -e "session: %H:%M -- " session_$(date +%Y%m%d_%H%M%S).log

# Automatischer Dateiname (YYYYMMDD_HHMMSS)
SCRIPT=session_$(date +%Y%m%d_%H%M%S).log; script -f "$SCRIPT"

# Protokoll beenden
exit</code></pre></div><div class="table-container"><table><thead><tr><th>Option</th><th>Beschreibung</th></tr></thead><tbody><tr><td>-f</td><td>Flush immediately (immediate Speicherung)</td></tr><tr><td>-e STRING</td><td>Prompt vor jedem Befehl ausgeben</td></tr><tr><td>-a FILE</td><td>An bestehendes File anh&auml;ngen</td></tr><tr><td>-q</td><td>Quiet mode (weniger Output)</td></tr><tr><td>-c COMMAND</td><td>Alternative Shell nutzen</td></tr></tbody></table></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>Nutze <span class="inline-code">-f</span> (flush) f&uuml;r kritische Befehle. Wenn der Systemcrasht, ist das Protokoll trotzdem bis dahin gesichert.</p></div><h2 class="section-title"><span class="number">12.2</span> Chain of Custody</h2><p>Dokumentation der kompletten Beweiskette von der &Uuml;bernahme bis zur Abgabe.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># &Uuml;bernahme dokumentieren
echo "=== &Uuml;bernahme ===" >> /cases/case01/notes/chain_of_custody.log
echo "Datum: $(date +\"%Y-%m-%d %H:%M:%S\")" >> /cases/case01/notes/chain_of_custody.log
echo "Untersucher: $(whoami)" >> /cases/case01/notes/chain_of_custody.log
echo "Device: /dev/sdb" >> /cases/case01/notes/chain_of_custody.log
echo "Serial: $(hdparm -I /dev/sdb | grep Serial)" >> /cases/case01/notes/chain_of_custody.log

# Hash dokumentieren
echo "Original-Hash: $(sha256sum /dev/sdb)" >> /cases/case01/notes/chain_of_custody.log

# Imaging dokumentieren
echo "Image-Hash: $(sha256sum case01.dd)" >> /cases/case01/notes/chain_of_custody.log

# &Uuml;bergabe dokumentieren
echo "=== &Uuml;bergabe ===" >> /cases/case01/notes/chain_of_custody.log
echo "Empf&auml;nger: Max Mustermann" >> /cases/case01/notes/chain_of_custody.log
echo "Datum: $(date +\"%Y-%m-%d %H:%M:%S\")" >> /cases/case01/notes/chain_of_custody.log</code></pre></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Chain of Custody MUSS l&uuml;ckenlos sein. Jede Handlung, jede &Uuml;bergabe, jeder Transport muss dokumentiert werden. L&uuml;cke = Beweis vor Gericht nicht verwertbar.</p></div><h2 class="section-title"><span class="number">12.3</span> Case-Ordnerstruktur</h2><p>Saubere Struktur erleichtert die Dokumentation und sp&auml;ter sp&auml;ter sp&auml;ter.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Case-Ordner erstellen
mkdir -p /cases/case01/{images,mounts,hashes,notes,reports,tools}

# In notes:
# - chain_of_custody.log (Beweiskette)
# - case_notes.log (Untersuchungsnotizen)
# - commands.log (Alle ausgef&uuml;hrten Befehle)

# In hashes:
# - original.sha256 (Hash des Originals)
# - image.sha256 (Hash des Images)
# - verification.sha256 (Verifizierungsergebnis)</code></pre></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>Hash-Dateien im Format <span class="inline-code">HASHVALUE  FILENAME</span> speichern. Damit kannst du mit <span class="inline-code">sha256sum -c</span> einfach verifizieren.</p></div><h2 class="section-title"><span class="number">12.4</span> Gerichtsverwertbarkeit</h2><p>Was macht forensische Beweise vor Gericht verwertbar?</p><div class="code-block"><div class="code-header"><span class="lang">RECHTLICH</span><button class="copy-btn">Kopieren</button></div><pre><code>Anforderungen f&uuml;r gerichtliche Verwertbarkeit:

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
