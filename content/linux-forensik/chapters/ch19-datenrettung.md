---
icon: '&#128269;'
id: ch19-datenrettung
section: Erweiterte Analyse
title: Datenrettung & File Carving
---

<h1 class="chapter-title">Datenrettung &amp; File Carving</h1><div class="chapter-subtitle">Gel&ouml;schte Dateien wiederherstellen &ndash; Forensische Rekonstruktion</div><div class="callout callout-context"><div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div><p>VeRD&auml;chtige l&ouml;schen h&auml;ufig Spuren &ndash; doch L&ouml;schen bedeutet nicht &Uuml;berschreiben. File Carving rekonstruiert Dateien direkt aus dem rohen Datentr&auml;ger-Image, unabh&auml;ngig vom Dateisystem. F&uuml;r die ABB IT-Fahndung ist dies ein zentrales Werkzeug zur Beweissicherung bei Betrugsf&auml;llen.</p></div>

<p class="chapter-intro">Gelöschte Dateien sind oft noch da – man muss nur wissen, wo man sucht. File Carving und Datenrettungstechniken helfen bei der Wiederherstellung.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kannst gelöschte Dateien mit File Carving und Foremost wiederherstellen und verstehst wie Dateisysteme Löschungen handhaben.</p></div>

<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>File Carving</h3><p>Header/Footer-Analyse</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128190;</div><div class="feature-text"><h3>Foremost</h3><p>Automatische Wiederherstellung</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128196;</div><div class="feature-text"><h3>Dateisystem</h3><p>Wie Löschung funktioniert</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#9888;</div><div class="feature-text"><h3>Limits</h3><p>Was nicht mehr geht</p></div></div></div>
<h2 class="section-title"><span class="number">19.1</span> Grundlagen: Was passiert beim L&ouml;schen?</h2><p>Wenn eine Datei gel&ouml;scht wird (z.&nbsp;B. mit <code>rm</code>), wird nicht der Dateiinhalt gel&ouml;scht &ndash; nur der Verzeichniseintrag (Inode/Dentry) wird als frei markiert. Die Datenbl&ouml;cke bleiben physisch erhalten, bis sie &uuml;berschrieben werden.</p><div class="table-container"><table><thead><tr><th>Dateisystem</th><th>L&ouml;schmechanismus</th><th>Wiederherstellbarkeit</th></tr></thead><tbody><tr><td>ext4</td><td>Inode freigegeben, Datenbl&ouml;cke markiert</td><td>Hoch (solange unbenutzt)</td></tr><tr><td>NTFS</td><td>MFT-Eintrag als gel&ouml;scht markiert</td><td>Hoch</td></tr><tr><td>FAT32</td><td>Erstes Zeichen im Dir-Eintrag auf 0xE5</td><td>Hoch</td></tr><tr><td>APFS</td><td>Snapshot-basiert, CoW</td><td>Sehr hoch (Snapshots)</td></tr></tbody></table></div><h2 class="section-title"><span class="number">19.2</span> TestDisk &ndash; Partitionen und Dateien retten</h2><p>TestDisk ist ein Open-Source-Tool zur Wiederherstellung verlorener Partitionen und gel&ouml;schter Dateien. Es kann auch besch&auml;digte Bootsektoren reparieren.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># TestDisk starten (interaktiv)
testdisk image.dd

# Nicht-interaktiver Modus: Gel&ouml;schte Dateien suchen
testdisk /list /cmd image.dd "advanced" "list" "quit"

# Partitionstabelle analysieren
testdisk /cmd image.dd "analyze" "quick_search" "quit"</code></pre></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>Immer an einer Kopie des Images arbeiten, nie am Original! TestDisk bietet einen interaktiven Assistenten &ndash; am wichtigsten: "Create" f&uuml;r ein Logfile w&auml;hlen.</p></div><h2 class="section-title"><span class="number">19.3</span> Foremost &ndash; File Carving nach Signaturen</h2><p>Foremost sucht anhand von Datei-Headern (Magic Bytes) nach gel&ouml;schten Dateien im Image. Es funktioniert unabh&auml;ngig vom Dateisystem &ndash; selbst fragmentierte oder &uuml;berschriebene Dateien k&ouml;nnen teilweise rekonstruiert werden.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Alle unterst&uuml;tzten Dateitypen suchen
foremost -i image.dd -o /cases/case01/carved/

# Nur bestimmte Typen (PDF, DOCX, JPG, PNG)
foremost -t pdf,docx,jpg,png -i image.dd -o /cases/case01/carved/

# Mit verbose-Output
foremost -v -i image.dd -o /cases/case01/carved/

# Nur Header + Footer suchen (schneller)
foremost -i image.dd -o /cases/case01/carved/ -t all

# Eigene Signatur-Datei verwenden
foremost -c /path/to/custom.conf -i image.dd -o /cases/case01/carved/</code></pre></div><div class="table-container"><table><thead><tr><th>Dateityp</th><th>Magic Bytes (Hex)</th><th>Signatur</th></tr></thead><tbody><tr><td>JPEG</td><td>FF D8 FF</td><td>JFIF/EXIF Header</td></tr><tr><td>PNG</td><td>89 50 4E 47</td><td>\x89PNG</td></tr><tr><td>PDF</td><td>25 50 44 46</td><td>%PDF</td></tr><tr><td>GIF</td><td>47 49 46 38</td><td>GIF8</td></tr><tr><td>ZIP/DOCX</td><td>50 4B 03 04</td><td>PK\x03\x04</td></tr><tr><td>MZIP</td><td>4D 5A</td><td>MZ (PE-Header)</td></tr></tbody></table></div><h2 class="section-title"><span class="number">19.4</span> Scalpel &ndash; Erweitertes File Carving</h2><p>Scalpel ist eine Weiterentwicklung von Foremost mit besserer Performance und konfigurierbarem Regelsatz. Es unterst&uuml;tzt auch Gr&ouml;&szlig;enbeschr&auml;nkungen.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Scalpel mit Standard-Konfiguration
scalpel -c /etc/scalpel/scalpel.conf -i image.dd -o /cases/case01/carved/

# Nur JPG und PDF
scalpel -c /etc/scalpel/scalpel.conf -t jpg,pdf -i image.dd -o /cases/case01/carved/

# Konfigurationsdatei pr&uuml;fen
cat /etc/scalpel/scalpel.conf | grep -v "^#" | grep -v "^$"</code></pre></div><h2 class="section-title"><span class="number">19.5</span> Photorec &ndash; Dateien aus besch&auml;digten Medien</h2><p>Photorec (Teil von TestDisk) ist spezialisiert auf die Wiederherstellung von Fotos, Dokumenten und Archiven &ndash; selbst von schwer besch&auml;digten Datentr&auml;gern.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Photorec starten (interaktiv)
photorec image.dd

# Non-interaktiver Modus
photorec /d /cases/case01/photorec_out /cmd image.dd partition_none,options,fileopt,everything,search

# Nur Office-Dokumente und PDF
photorec /d /cases/case01/docs/ image.dd</code></pre></div><h2 class="section-title"><span class="number">19.6</span> Sleuth Kit &ndash; Gel&ouml;schte Inodes finden</h2><p>Mit dem Sleuth Kit k&ouml;nnen gel&ouml;schte Inodes direkt im Dateisystem gefunden werden.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Gel&ouml;schte Dateien auflisten (ext)
fls -r -p image.dd | grep "(deleted)"

# Alle Inodes (auch gel&ouml;schte)
ils -e image.dd

# Metadaten einer gel&ouml;schten Datei
istat image.dd &lt;inode&gt;

# Datenblock-Inhalt extrahieren
blkcat image.dd &lt;fs_block&gt; &lt;block_nr&gt;

# Gel&ouml;schte Datei wiederherstellen
icat -r image.dd &lt;inode&gt; &gt; recovered_file.txt</code></pre></div><div class="exercise-box"><div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">File Carving</span></div><div class="exercise-body"><div class="exercise-goal"><div class="goal-label">Ziel</div><p>Gel&ouml;schte Dateien aus einem Image rekonstruieren.</p></div><div class="exercise-steps"><ol class="numbered-list"><li>Erstelle ein Test-Image mit <code>dd if=/dev/zero of=test.img bs=1M count=50</code></li><li>Formatiere und mounte es, lege Dateien an, l&ouml;sche sie</li><li>Unmounte und f&uuml;hre <code>foremost -i test.img -o carved/</code> aus</li><li>&Uuml;berpr&uuml;fe die gefundenen Dateien im <code>carved/</code>-Verzeichnis</li><li>Dokumentiere: Wie viele Dateien wurden gefunden? Welcher Typ?</li></ol></div><div class="toggle-container"><div class="toggle-header"><span class="toggle-label">Erwartetes Ergebnis</span><span class="toggle-arrow">&#9654;</span></div><div class="toggle-content"><p>Foremost sollte mindestens die meisten Dateien anhand ihrer Header-Signaturen wiederfinden. Textdateien ohne eindeutige Signatur werden nicht erkannt &ndash; diese L&uuml;cke f&uuml;llt <code>strings</code> in Kombination mit <code>grep</code>.</p></div></div></div></div><div class="callout callout-danger"><div class="callout-header">&#9888; Typische Fehler</div><ul><li><strong>Am Original gearbeitet:</strong> Carving ver&auml;ndert keine Daten, aber Mounten schon!</li><li><strong>Falscher Dateityp:</strong> ZIP und DOCX haben dieselbe Signatur (PK-Header)</li><li><strong>Fragmentierte Dateien:</strong> Foremost kann nur zusammenh&auml;ngende Bl&ouml;cke rekonstruieren</li><li><strong>Ausgabeverzeichnis auf demselben Image:</strong> Niemals auf das untersuchte Image schreiben</li></ul></div><button class="complete-section-btn" data-chapter="ch19-datenrettung">&#9744; Kapitel als abgeschlossen markieren</button><div class="nav-buttons"><button class="nav-btn" data-target="ch18-tools">&#8592; Tools</button><button class="nav-btn" data-target="ch20-memory-forensik">Memory-Forensik &#8594;</button></div>
