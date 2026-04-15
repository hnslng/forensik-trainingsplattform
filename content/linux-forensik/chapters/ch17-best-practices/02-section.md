<h2 class="section-title"><span class="number">15.2</span> DON'TS - Das du niemals tun solltest</h2><div class="code-block"><div class="code-header"><span class="lang">DON'TS</span><button class="copy-btn">Kopieren</button></div><pre><code>1. NIE Original-Datentr&auml;ger mounten
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
   - Cross-Contamination vermeiden</code></pre></div>
