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
   - Wiederholbarkeit gew&auml;hrleisten</code></pre></div>
