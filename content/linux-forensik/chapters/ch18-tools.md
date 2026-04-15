---
icon: '&#128187;'
id: ch18-tools
section: Vertiefung
title: Tools
---

<h1 class="chapter-title">Tools</h1><div class="chapter-subtitle">Sleuth Kit, Autopsy, Binwalk, Strings, Xxd - Installation und Konfiguration</div><div class="callout callout-context"><div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div><p>Die richtigen Tools machen forensische Arbeit effizienter und sicher. Ohne geeignete Tools kann die Analyse Stunden oder Tage l&auml;nger dauern, w&auml;hrend spezialisierte Tools automatisiertes Scannen und Verarbeiten bieten. Tool-Kenntnisse sind essenziell f&uuml;r jeden Forensiker.</p></div>

<p class="chapter-intro">Die richtigen Tools machen den Unterschied. Von Autopsy über Sleuth Kit bis Volatility – hier lernst du die wichtigsten forensischen Werkzeuge kennen.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kennst die wichtigsten forensischen Tools (Autopsy, Sleuth Kit, Volatility, Bulk Extractor) und weisst wofür jedes eingesetzt wird.</p></div>

<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>Autopsy</h3><p>GUI-basierte Analyse</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Sleuth Kit</h3><p>CLI-Analyse-Tools</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128190;</div><div class="feature-text"><h3>Volatility</h3><p>Memory-Forensik</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128230;</div><div class="feature-text"><h3>Bulk Extractor</h3><p>Datenextraktion</p></div></div></div>
<h2 class="section-title"><span class="number">16.1</span> Sleuth Kit (sk) &amp; Autopsy</h2><p>Das Open-Source-Standard-Werkzeug f&uuml;r File-System und Volume Analysis.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation (Debian/Ubuntu)
apt install sleuthkit autopsy

# Version pr&uuml;fen
fls -V
autopsy -V

# Filesystem Analyse
fls -r image.dd

# Metadata
stat -s image.dd

# Timeline
tsk_gettimes -o /tmp/timeline.csv image.dd</code></pre></div><div class="table-container"><table><thead><tr><th>Tool</th><th>Funktion</th><th>Besonderheit</th></tr></thead><tbody><tr><td>fls</td><td>Listet Directory-Eintr&auml;ge</td><td>Rekursiv mit -r</td></tr><tr><td>fsstat</td><td>Zeigt Filesystem-Statistiken</td><td>Blocksize, Cluster, Flags</td></tr><tr><td>stat</td><td>Zeigt Metadata</td><td>MAC-Times</td></tr><tr><td>tsk_gettimes</td><td>Timeline-Erstellung</td><td>CSV-Export</td></tr><tr><td>Autopsy</td><td>GUI-Analyse</td><td>Integriert alle sleuthkit-Tools</td></tr></tbody></table></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>Autopsy integriert alle sleuthkit-Tools in einer GUI. Nutze es f&uuml;r komplexe Analysen, sleuthkit f&uuml;r CLI-Automatisierung.</p></div><h2 class="section-title"><span class="number">16.2</span> Binwalk</h2><p>Signatur-Suche und Forensik-Tool zum Identifizieren von Embedded-Dateien.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation (Debian/Ubuntu)
apt install binwalk

# Signaturen scan (rekursiv)
binwalk -e image.dd

# Signaturen scan (tief)
binwalk -B image.dd

# Entropy-Analyse
binwalk -E image.dd

# Firmware extrahieren
binwalk -e -M firmware.bin</code></pre></div><div class="table-container"><table><thead><tr><th>Option</th><th>Beschreibung</th><th>Anwendungsfall</th></tr></thead><tbody><tr><td>-e</td><td>Extract (Dateien extrahieren)</td><td>Embedded-Systeme</td></tr><tr><td>-M</td><td>Matryoshka (rekursiv extrahieren)</td><td>Zip-in-Datei</td></tr><tr><td>-B</td><td>Binwalk-Signaturen (bessere Erkennung)</td><td>Unbekannte Dateien</td></tr><tr><td>-E</td><td>Entropy-Analyse (Verschl&uuml;sselung?)</td><td>Encrypted-Daten</td></tr><tr><td>-R</td><td>Rekursiv (Unterverzeichnisse)</td><td>Komplette Scans</td></tr></tbody></table></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Binwalk extrahiert in aktuelle Verzeichnis! Nutze <span class="inline-code">--directory</span> oder <span class="inline-code">-d</span> um das Zielverzeichnis anzugeben.</p></div><h2 class="section-title"><span class="number">16.3</span> Strings</h2><p>Extrahiert lesbare Zeichen aus Bin&auml;rdateien.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation (meistens schon installiert)
apt install binutils

# Strings extrahieren
strings memory_dump.raw

# Minimale L&auml;nge (default: 4)
strings -n 6 memory_dump.raw

# Encoding angeben
strings -e l memory_dump.raw  # ASCII
strings -e b memory_dump.raw  # 8-bit

# Mit Offset
strings -t d memory_dump.raw | grep "password"</code></pre></div><div class="table-container"><table><thead><tr><th>Option</th><th>Beschreibung</th><th>Anwendungsfall</th></tr></thead><tbody><tr><td>-n N</td><td>Minimale L&auml;nge</td><td>L&auml;ngere Strings</td></tr><tr><td>-e X</td><td>Encoding (l=b/L, a=A, b=B, x=X)</td><td>Spezifische Texte</td></tr><tr><td>-t TYPE</td><td>Offset-Typ (d=decimal, x=hex, o=octal)</td><td>Offset-f&uuml;r grep</td></tr><tr><td>-f</td><td>Format mit Feldern</td><td>Automatisierte Analyse</td></tr><tr><td>-a</td><td>Alle Dateien (nur Scan-Files)</td><td>Komplette Scans</td></tr></tbody></table></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p><span class="inline-code">strings -t d</span> ist perfekt f&uuml;r Memory-Dumps. Die Offset zeigen, wo Strings im RAM sind.</p></div><h2 class="section-title"><span class="number">16.4</span> Xxd &amp; Hexdump</h2><p>Hex-Editor und -Analyzer f&uuml;r tiefe Bin&auml;ranalyse.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Xxd Installation
apt install xxd

# Hexdump (readable)
xxd image.bin | head -20

# Hexdump (offset)
xxd -s 0x200 -l 0x100 image.bin

# Reverse Hexdump (Hex->File)
echo "48 65 6c 6c 6f" | xxd -r -p > hello.txt

# Hexdump mit grep
xxd image.bin | grep "Signature"</code></pre></div><div class="table-container"><table><thead><tr><th>Option</th><th>Beschreibung</th><th>Anwendungsfall</th></tr></thead><tbody><tr><td>-s OFFSET</td><td>Start-Offset</td><td>Spezifischer Bereich</td></tr><tr><td>-l LEN</td><td>Anzahl Bytes</td><td>Bereich begrenzen</td></tr><tr><td>-c COLS</td><td>Spalten pro Zeile</td><td>Ausrichtung</td></tr><tr><td>-p</td><td>Plain Hex (ohne ASCII)</td><td>Script-Verarbeitung</td></tr><tr><td>-r</td><td>Reverse (Hex->Bin)</td><td>Hex-Dateien erstellen</td></tr></tbody></table></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Offsets bei xxd sind in HEX (<span class="inline-code">0x200</span>), aber <span class="inline-code">-s</span> akzeptiert auch Dezimal (<span class="inline-code">-s 512</span>).</p></div><h2 class="section-title"><span class="number">16.5</span> Weitere Tools</h2><p>Zus&auml;tzliche forensische Tools, die du kennen solltest:</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Foremost (Forensische Carving)
apt install foremost
foremost -t all -o /tmp/recovered/ image.dd

# PhotoRec (Bild-Wiederherstellung)
apt install testdisk
photorec image.dd

# Bulk Extractor (Massenextraktion)
apt install bulk-extractor
bulk_extractor -o /tmp/output/ image.dd

# Volatility (Memory-Forensik)
apt install volatility-framework
vol.py -f memory.dump imageinfo

# Wireshark (Network-Forensik)
apt install wireshark
wireshark capture.pcap</code></pre></div><div class="table-container"><table><thead><tr><th>Tool</th><th>Typ</th><th>Anwendungsfall</th></tr></thead><tbody><tr><td>Foremost</td><td>Carving</td><td>Unvollst&auml;ndige Dateien wiederherstellen</td></tr><tr><td>PhotoRec</td><td>Bilder</td><td>Gel&ouml;schte Fotos wiederherstellen</td></tr><tr><td>Bulk Extractor</td><td>Massenextraktion</td><td>Emails, URLs, etc. aus Image</td></tr><tr><td>Volatility</td><td>Memory-Forensik</td><td>RAM-Dumps analysieren</td></tr><tr><td>Wireshark</td><td>Network-Forensik</td><td>PCAP-Dateien analysieren</td></tr></tbody></table></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>Versuche nicht, alle Tools sofort zu lernen. Beginne mit sleuthkit, strings, xxd und arbeite dich zu spezialisierteren Tools vor!</p></div><h2 class="section-title"><span class="number">16.6</span> Tool-Kompatibilit&auml;ts-Matrix</h2><p>Welches Tool wof&uuml;r nutzen?</p><div class="code-block"><div class="code-header"><span class="lang">MATRIX</span><button class="copy-btn">Kopieren</button></div><pre><code>Analysier-Aufgabe                 | Primary Tool      | Alternative Tool
--------------------------------|----------------|-------------------
Filesystem-Analyse              | sleuthkit (fls) | Autopsy
Metadata                        | sleuthkit (stat) | tsk_gettimes
Embedded-Dateien                | binwalk         | foremost
Strings aus Bin&auml;rdateien        | strings          | hexdump + grep
Hex-Analyse                     | xxd             | hexdump
Carving (unvollst&auml;ndig)       | foremost         | photorec
Memory-Forensik                 | volatility       | strings + grep
Network-Forensik                | wireshark       | tshark
Integrit&auml;tspr&uuml;fung         | sha256sum        | md5sum</code></pre></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Die Matrix zeigt nur Richtlinien. Einige Aufgaben erfordern mehrere Tools in Kombination!</p></div><div class="exercise-box"><div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Tool-Auswahl</span></div><div class="exercise-body"><div class="exercise-goal"><div class="goal-label">Ziel</div><p>W&auml;hle die passenden Tools f&uuml;r verschiedene Szenarien.</p></div><div class="exercise-steps"><ol class="numbered-list"><li>Szenario 1: Filesystem-Scan des Image. Welches Tool?</li><li>Szenario 2: Embedded-Dateien aus Firmware extrahieren. Welches Tool?</li><li>Szenario 3: Strings aus Memory-Dump finden. Welches Tool?</li><li>Szenario 4: MBR-Signatur verifizieren. Welches Tool?</li><li>Szenario 5: PCAP analysieren. Welches Tool?</li></ol></div><div class="toggle-container"><div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div><div class="toggle-content"><p><strong>Szenario 1:</strong> fls (sleuthkit)</p><p><strong>Szenario 2:</strong> binwalk -e</p><p><strong>Szenario 3:</strong> strings</p><p><strong>Szenario 4:</strong> xxd (oder hexdump)</p><p><strong>Szenario 5:</strong> wireshark</p></div></div></div></div><div class="callout callout-danger"><div class="callout-header">&#9888; Typische Fehler in diesem Kapitel</div><ul><li><strong>Falsches Tool gew&auml;hlt:</strong> Ein Tool f&uuml;r den falschen Zweck nutzen</li><li><strong>Parameter nicht verstanden:</strong> -e bei xxd ist anders als bei binwalk</li><li><strong>Extrahieren in aktuellem Verzeichnis:</strong> Ohne Zielverzeichnis Chaos!</li><li><strong>Encoding falsch:</strong> strings -e x vs -e b kann ganz andere Ergebnisse</li><li><strong>Offset-Konfussion:</strong> 0x200 = 512, nicht 200!</li><li><strong>Tool-Mix: </strong> Mehrere Tools ohne Strategie nutzlos</li></ul></div><button class="complete-section-btn" data-chapter="ch18-tools">&#9744; Kapitel als abgeschlossen markieren</button><div class="nav-buttons"><button class="nav-btn" data-target="ch17-best-practices">&#8592; Best Practices</button><button class="nav-btn" data-target="ch19-datenrettung">Datenrettung &#8594;</button></div>
