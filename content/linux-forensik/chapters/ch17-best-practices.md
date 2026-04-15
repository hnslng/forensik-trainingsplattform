---
icon: '&#9989;'
id: ch17-best-practices
section: Vertiefung
title: Best Practices
---

<h1 class="chapter-title">Best Practices</h1><div class="chapter-subtitle">Dos & Don'ts - Was du tun solltest und was nicht</div><div class="callout callout-context"><div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div><p>Best Practices garantieren, dass deine forensische Arbeit sicher, wiederholbar und gerichtlich verwertbar ist. Ein einziger Fehler kann ein ganzes Fall zerst&ouml;ren. Folge diesen Regeln, um Fehler zu vermeiden.</p></div>

<p class="chapter-intro">Forensik ist nicht nur Technik – es ist auch Methodik. Diese Best Practices stellen sicher, dass deine Ergebnisse vor Gericht standhalten.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kennst die wichtigsten Best Practices in der Forensik: Chain of Custody, Dokumentation, Handlungsgrundsätze und Gerichtsverwertbarkeit.</p></div>

<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128220;</div><div class="feature-text"><h3>Dokumentation</h3><p>Jeden Schritt festhalten</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128274;</div><div class="feature-text"><h3>Beweiskette</h3><p>Chain of Custody</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#9878;</div><div class="feature-text"><h3>Grundsätze</h3><p>Forensische Regeln</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#127971;</div><div class="feature-text"><h3>Gericht</h3><p>Verwertbarkeit sichern</p></div></div></div>
<h2 class="section-title"><span class="number">15.1</span> DOS - Das du immer tun solltest</h2><div class="code-block"><div class="code-header"><span class="lang">BEST PRACTICES</span><button class="copy-btn">Kopieren</button></div><pre><code>1. IMMER Write-Blocker verwenden
   - Hardware-Write-Blocker (sicherer)
   - Software-Write-Blocker (entwicklungs-Systeme)
   - RO-Status verifizieren: lsblk -o NAME,RO

2. IMMER Hashes vor und nach dem Imaging
   - Original-Hash: sha256sum /dev/sda
   - Image-Hash: sha256sum case01.dd
   - Verifizierung: sha256sum -c image.sha256

3. IMMER mit script-Befehl arbeiten
   - Protokollierung: script -f session_$(date +%Y%m%d_%H%M%S).log
   - Zeitstempel und Befehle dokumentiert

4. IMMER read-only mounten
   - Kein Schreibzugriff auf das Image
   - Nur Analysis-Tools nutzen

5. IMMER Chain of Custody dokumentieren
   - &Uuml;bernahme, Imaging, Analyse, &Uuml;bergabe
   - Jeder Schritt mit Datum &amp; Zeit

6. IMMER Original nicht ver&auml;ndern
   - Nur vom Image arbeiten
   - Original sicher verwahren

7. IMMER Backups erstellen
   - Von Images, Hashes, Protokollen
   - Mindestens 2 Speicherorte</n
8. IMMER Tools dokumentieren
   - Welche Version, welche Parameter
   - Wiederholbarkeit gew&auml;hrleisten</code></pre></div><h2 class="section-title"><span class="number">15.2</span> DON'TS - Das du niemals tun solltest</h2><div class="code-block"><div class="code-header"><span class="lang">DON'TS</span><button class="copy-btn">Kopieren</button></div><pre><code>1. NIE Original-Datentr&auml;ger mounten
   - Original immer read-only bleiben
   - Kein Dateisystem-Write-Zugriff

2. NIE ohne Hashes arbeiten
   - Ohne Hashes keine Integrit&auml;tspr&uuml;fung
   - Verifizierung unm&ouml;glich

3. NIE falsches Device verwenden
   - Falsches Device = anderer Datentr&auml;ger!
   - Immer mit lsblk identifizieren

4. NIE Write-Blocker umgehen
   - Selbst bei "notwendigen" Writes!
   - Alternative: Software-Write-Blocker

5. NIE ungesichert l&ouml;schen
   - rm -rf ist NICHT forensisch!
   - shred, hdparm, nvme sanitize nutzen

6. NIE Protokollierung vergessen
   - Ohne Protokoll keine Beweiskette
   - Gerichtliche Verwertbarkeit unm&ouml;glich

7. NIE Tools mit unbekannten Parametern nutzen
   - Unbekannte Optionen = unbekannte Ergebnisse
   - Dokumentation lesen, verstehen, anwenden

8. NIE Evidenzen mixen
   - Jede Evidenz separat behandeln
   - Cross-Contamination vermeiden</code></pre></div><h2 class="section-title"><span class="number">15.3</span> Qualit&auml;ts-Checkliste</h2><p>Checkliste vor der &Uuml;bergabe:</p><div class="code-block"><div class="code-header"><span class="lang">CHECKLISTE</span><button class="copy-btn">Kopieren</button></div><pre><code>[ ] 1. Write-Blocker verwendet und verifiziert
[ ] 2. Original-Hash dokumentiert
[ ] 3. Image-Hash dokumentiert
[ ] 4. Hashes verifiziert (identisch!)
[ ] 5. Script-Protokoll vorhanden und l&uuml;ckenlos
[ ] 6. Chain of Custody dokumentiert
[ ] 7. Alle Befehle dokumentiert
[ ] 8. Tools und Versionen dokumentiert
[ ] 9. Read-only mounten best&auml;tigt
[ ] 10. Backups erstellt und verifiziert
[ ] 11. Keine Original-Ver&auml;nderungen
[ ] 12. Forensisch sauberes L&ouml;schen (falls n&ouml;tig)
[ ] 13. Gerichtsverwertbarkeit gepr&uuml;ft
[ ] 14. Fall-Ordner sauber strukturiert
[ ] 15. Unterschriften dokumentiert (falls n&ouml;tig)</code></pre></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>Wenn du alle 15 Punkte "Ja" angekreuzt hast, ist dein Fall gerichtlich verwertbar. Fehlendes = Beweis vor Gericht abgelehnt!</p></div><h2 class="section-title"><span class="number">15.4</span> Fall-Check vor &Uuml;bergabe</h2><p>Fragen, die du dir vor der &Uuml;bergabe stellen solltest:</p><div class="code-block"><div class="code-header"><span class="lang">SELF-CHECK</span><button class="copy-btn">Kopieren</button></div><pre><code>1. Habe ich alle Evidenzen dokumentiert?
2. Habe ich alle Hashes erstellt und verifiziert?
3. Habe ich die Beweiskette l&uuml;ckenlos dokumentiert?
4. Habe ich alle Befehle protokolliert?
5. Kann ich jeden Schritt reproduzieren?
6. Habe ich Backups von allen wichtigen Daten?
7. Habe ich die Tools dokumentiert?
8. Habe ich forensisch sauber gearbeitet?
9. W&auml;re meine Schlussfolgerungen dokumentiert?
10. Ist der Fall gerichtlich verwertbar?</code></pre></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Wenn du eine dieser Fragen mit "Nein" beantwortest, dann solltest du diesen Schritt &uuml;berarbeiten bevor du den Fall &uuml;bergibst!</p></div><div class="exercise-box"><div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Best-Practices-Analyse</span></div><div class="exercise-body"><div class="exercise-goal"><div class="goal-label">Ziel</div><p>Analysiere Szenarien und entscheide, ob Best Practices befolgt wurden.</p></div><div class="exercise-steps"><ol class="numbered-list"><li>Szenario 1: Analyst hat ohne Write-Blocker gearbeitet. Problem?</li><li>Szenario 2: Hashes wurden nach dem Imaging erstellt. Problem?</li><li>Szenario 3: Original wurde versehentlich mountet. Problem?</li><li>Szenario 4: Protokollierung vergessen. Problem?</li><li>Szenario 5: Forensisches L&ouml;schen mit rm. Problem?</li></ol></div><div class="toggle-container"><div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div><div class="toggle-content"><p><strong>Szenario 1:</strong> JA - Massive Verletzung! Original konnte versehentlich ver&auml;ndert werden.</p><p><strong>Szenario 2:</strong> JA - Keine Integrit&auml;tspr&uuml;fung! Kann nicht beweisen, dass Image = Original.</p><p><strong>Szenario 3:</strong> JA - Original-Ver&auml;nderung! Fall m&ouml;glicherweise vor Gericht abgelehnt.</p><p><strong>Szenario 4:</strong> JA - Keine Beweiskette! Gerichtliche Verwertbarkeit unm&ouml;glich.</p><p><strong>Szenario 5:</strong> JA - rm ist NICHT forensisch! Daten k&ouml;nnen wiederhergestellt werden.</p></div></div></div></div><div class="callout callout-danger"><div class="callout-header">&#9888; Typische Fehler in diesem Kapitel</div><ul><li><strong>Write-Blocker nicht verifiziert:</strong> RO-Status nicht gepr&uuml;ft</li><li><strong>Hashes vergessen:</strong> Keine Integrit&auml;tspr&uuml;fung</li><li><strong>Protokollierung vergessen:</strong> Keine Beweiskette</li><li><strong>Original ver&auml;ndert:</strong> Forensische Regel verletzt</li><li><strong>Falsches Device:</strong> Falscher Datentr&auml;ger bearbeitet</li><li><strong>Unn&ouml;tiges L&ouml;schen:</strong> Daten unwiederbringbar gel&ouml;scht</li><li><strong>Qualit&auml;ts-Check nicht durchgef&uuml;hrt:</strong> Fehler vor &Uuml;bergabe nicht bemerkt</li></ul></div><button class="complete-section-btn" data-chapter="ch17-best-practices">&#9744; Kapitel als abgeschlossen markieren</button><div class="nav-buttons"><button class="nav-btn" data-target="ch16-sicheres-loeschen">&#8592; Sicheres L&ouml;schen</button><button class="nav-btn" data-target="ch18-tools">Tools &#8594;</button></div>
