---
icon: '&#128339;'
id: ch22-zeitlinienanalyse
section: Erweiterte Analyse
title: Zeitlinienanalyse
---

<h1 class="chapter-title">Zeitlinienanalyse</h1><div class="chapter-subtitle">Super-Timeline, MAC-Times und zeitliche Beweisf&uuml;hrung</div><div class="callout callout-context"><div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div><p>Die zeitliche Rekonstruktion von Ereignissen ist essenziell f&uuml;r die Beweisf&uuml;hrung. Eine Super-Timeline verbindet Dateisystem-Zeitstempel, Log-Eintr&auml;ge, Netzwerk-Events und Browser-Historie zu einem vollst&auml;ndigen Bild. F&uuml;r die ABB IT-Fahndung kann dies belegen, wann ein Verd&auml;chtiger Zugriff auf bestimmte Dateien hatte.</p></div>

<p class="chapter-intro">Wann wurde eine Datei erstellt? Wann zugegriffen? Wann gelöscht? Zeitlinienanalyse stellt zeitliche Zusammenhänge her – essenziell für jeden Fall.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kannst Zeitlinien (Timelines) aus Dateisystem-Metadaten erstellen, verstehst MACB-Zeiten und weisst wie du zeitliche Zusammenhänge analysierst.</p></div>

<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128339;</div><div class="feature-text"><h3>MACB-Zeiten</h3><p>Modified/Accessed/Changed/Birth</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128197;</div><div class="feature-text"><h3>Timeline</h3><p>Zeitstrahl erstellen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>fls/mactime</h3><p>Sleuth Kit Timeline-Tools</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#9888;</div><div class="feature-text"><h3>Anti-Forensik</h3><p>Zeitstempel-Manipulation</p></div></div></div>
<h2 class="section-title"><span class="number">22.1</span> MAC-Times verstehen</h2><p>Jede Datei hat drei (bei ext4 vier) Zeitstempel &ndash; die sogenannten MAC(T)-Times:</p><div class="table-container"><table><thead><tr><th>Zeitstempel</th><th>Bedeutung</th><th>&Auml;ndert bei</th></tr></thead><tbody><tr><td><strong>M</strong>odification</td><td>Inhalt wurde ge&auml;ndert</td><td>Schreibzugriff auf Dateiinhalt</td></tr><tr><td><strong>A</strong>ccess</td><td>Datei wurde gelesen</td><td>Jeder Lesezugriff (mount -o noatime)</td></tr><tr><td><strong>C</strong>hange (Metadata)</td><td>Inode-Metadaten ge&auml;ndert</td><td>chmod, chown, rename, link</td></tr><tr><td><strong>B</strong>irth/Creation</td><td>Datei erstellt</td><td>Nur bei ext4 und NTFS</td></tr></tbody></table></div><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># MAC-Times einer Datei anzeigen
stat datei.txt

# Formatiert
stat -c "%n: M=%y A=%x C=%z B=%w" datei.txt

# Alle Dateien eines Verzeichnisses mit Zeitstempel
find /pfad -type f -printf "%T+ %p\n" | sort

# Sleuth Kit: MAC-Times aus Image
fls -r -m "/" image.dd | sort

# Mit mactime (Sleuth Kit)
fls -r -m "/" image.dd > body.txt
mactime -b body.txt &gt; timeline.csv</code></pre></div><h2 class="section-title"><span class="number">22.2</span> Log2Timeline / Plaso</h2><p>Plaso (Python) ist das Standard-Tool f&uuml;r die Erstellung von Super-Timelines. Es aggregiert Zeitstempel aus dutzenden Quellen.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation
pip3 install plaso

# Timeline aus Image erstellen
log2timeline.py --storage-file /cases/case01/timeline.plaso image.dd

# Timeline aus mehreren Quellen
log2timeline.py --storage-file /cases/case01/timeline.plaso \
  --source /cases/case01/logs/auth.log \
  --source /cases/case01/logs/syslog \
  --source image.dd

# Timeline als CSV exportieren
psort.py -o L2tcsv /cases/case01/timeline.plaso -w /cases/case01/timeline.csv

# Nur bestimmter Zeitraum
psort.py -o L2tcsv /cases/case01/timeline.plaso \
  --slice "2024-03-15 08:00:00" \
  --slice_size 3600 \
  -w /cases/case01/timeline_0800.csv

# Nur Datei-Events
psort.py -o L2tcsv /cases/case01/timeline.plaso \
  "parser is 'filestat'" \
  -w /cases/case01/timeline_files.csv</code></pre></div><h2 class="section-title"><span class="number">22.3</span> Quellen f&uuml;r Timeline-Events</h2><p>Eine vollst&auml;ndige Super-Timeline kombiniert Daten aus vielen Quellen:</p><div class="table-container"><table><thead><tr><th>Quelle</th><th>Events</th><th>Tool</th></tr></thead><tbody><tr><td>Dateisystem (Inodes)</td><td>M/A/C/B-Times</td><td>fls, istat (sleuthkit)</td></tr><tr><td>auth.log / syslog</td><td>Logins, Services, USB</td><td>grep, log2timeline</td></tr><tr><td>Browser-Historie</td><td>URLs, Downloads, Suchen</td><td>Hindsight, log2timeline</td></tr><tr><td>Windows Registry</td><td>MRU, Run-Keys, USB</td><td>regripper, log2timeline</td></tr><tr><td>Windows Event Logs</td><td>Security, System, App</td><td>winevtlog, log2timeline</td></tr><tr><td>PCAP / Netzwerk</td><td>Verbindungen, DNS</td><td>tshark, networkminer</td></tr><tr><td>Memory-Dump</td><td>Prozesse, Handles</td><td>Volatility</td></tr><tr><td>Shell-History</td><td>Bash-Kommandos</td><td>~/.bash_history</td></tr></tbody></table></div><h2 class="section-title"><span class="number">22.4</span> Sleuth Kit Timeline (mactime)</h2><p>F&uuml;r einfachere F&auml;lle reicht oft die Sleuth Kit Timeline.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Bodyfile erstellen (alle MAC-Times)
fls -r -m "/" image.dd > /cases/case01/body.txt

# Timeline generieren (CSV)
mactime -b /cases/case01/body.txt -d &gt; /cases/case01/mactime.csv

# Nur bestimmter Zeitraum
mactime -b /cases/case01/body.txt -d \
  -t "2024-03-15..2024-03-16" &gt; /cases/case01/mactime_range.csv

# Timeline analysieren
awk -F, '$1 >= 1710460800 && $1 <= 1710547200' /cases/case01/mactime.csv

# H&auml;ufigste Zeitstempel finden
awk -F, '{print $1}' /cases/case01/mactime.csv | sort | uniq -c | sort -rn | head -20</code></pre></div><h2 class="section-title"><span class="number">22.5</span> Timeline-basierte Beweisf&uuml;hrung</h2><p>F&uuml;r gerichtsverwertbare Dokumentation muss die Timeline reproduzierbar sein:</p><div class="callout callout-info"><div class="callout-header">&#9432; Beweisf&uuml;hrung-Checkliste</div><p><strong>1.</strong> Image-Hash vor und nach der Analyse dokumentieren<br><strong>2.</strong> Alle Tools mit Version dokumentieren<br><strong>3.</strong> Timeline-Generierung vollst&auml;ndig protokollieren<br><strong>4.</strong> Zeitzonen-Konvertierung explizit angeben (UTC vs. CET/CEST)<br><strong>5.</strong> Zeitstempel-Quelle angeben (Dateisystem, Log, Registry)<br><strong>6.</strong> Ergebnis als CSV/PDF exportieren und signieren</p></div><div class="callout callout-warning"><div class="callout-header">&#9888; Zeitzone-Problem</div><p>Linux speichert Zeitstempel in UTC (Inodes), w&auml;hrend Logs oft in Lokalzeit. NTFS speichert in UTC, FAT in Lokalzeit. Ohne explizite Zeitzonen-Angabe sind Timeline-Korrelationen unzuverl&auml;ssig!</p></div><h2 class="section-title"><span class="number">22.6</span> Praktische Timeline-Analyse</h2><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Quick-Timeline: Alle Events sortiert
find /mnt/image -printf "%T+ %T- %p\n" | sort &gt; /cases/case01/quick_timeline.txt

# Nur &Auml;nderungen im letzten Zeitraum
find /mnt/image -mtime -7 -type f -printf "%T+ %s %p\n" | sort

# Shell-History als Timeline
HISTTIMEFORMAT="%F %T " history &gt; /cases/case01/notes/bash_history.txt

# USB-Ger&auml;te-Historie
grep -i "usb" /var/log/syslog | grep -i "connected|disconnected"

# Login-Timeline
grep "session opened" /var/log/auth.log | awk '{print $1,$2,$3,$NF}' | sort</code></pre></div><div class="exercise-box"><div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Timeline erstellen</span></div><div class="exercise-body"><div class="exercise-goal"><div class="goal-label">Ziel</div><p>Eine Super-Timeline aus mehreren Quellen erstellen und analysieren.</p></div><div class="exercise-steps"><ol class="numbered-list"><li>Erstelle eine Sleuth Kit Timeline aus deinem Test-Image</li><li>Exportiere als CSV und &ouml;ffne in einer Tabellenkalkulation</li><li>Identifiziere den Zeitraum der h&ouml;chsten Aktivit&auml;t</li><li>Erstelle einen erweiterten Timeline-Report mit log2timeline (Plaso)</li><li>Dokumentiere die Top-10 verd&auml;chtigen Events mit Begr&uuml;ndung</li></ol></div><div class="toggle-container"><div class="toggle-header"><span class="toggle-label">Erwartetes Ergebnis</span><span class="toggle-arrow">&#9654;</span></div><div class="toggle-content"><p>Die Timeline sollte zeigen: Dateisystem-Events (mactime), Log-Eintr&auml;ge (auth.log/syslog) und Shell-History in chronologischer Reihenfolge. Achte auf Zeitstempel, die au&szlig;erhalb der normalen Arbeitszeit liegen (z.&nbsp;B. 02:00 Uhr) &ndash; dies sind oft Indikatoren f&uuml;r unbefugten Zugriff.</p></div></div></div></div><div class="callout callout-danger"><div class="callout-header">&#9888; Typische Fehler</div><ul><li><strong>Zeitzone ignoriert:</strong> UTC vs. CET = 1 Stunde Verschiebung</li><li><strong>atime durch Analyse ver&auml;ndert:</strong> Image immer mit <code>-o ro,noatime</code> mounten!</li><li><strong>Zu viele Daten:</strong> Super-Timelines k&ouml;nnen Millionen Events haben &ndash; Filtern ist essenziell</li><li><strong>Nur eine Quelle:</strong> Immer mehrere Quellen korrelieren (Dateisystem + Logs + Netzwerk)</li><li><strong>NTP-Offset nicht gepr&uuml;ft:</strong> Wenn die Systemuhr falsch geht, sind alle Zeitstempel unbrauchbar</li></ul></div><button class="complete-section-btn" data-chapter="ch22-zeitlinienanalyse">&#9744; Kapitel als abgeschlossen markieren</button><div class="nav-buttons"><button class="nav-btn" data-target="ch21-netzwerkforensik">&#8592; Netzwerkforensik</button><button class="nav-btn" data-target="welcome">Start &#8594;</button></div>
