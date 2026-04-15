---
icon: '&#9881;'
id: ch20-memory-forensik
section: Erweiterte Analyse
title: Memory-Forensik
---

<h1 class="chapter-title">Memory-Forensik</h1><div class="chapter-subtitle">RAM-Analyse mit Volatility &ndash; Prozesse, Verbindungen und verborgene Spuren</div><div class="callout callout-context"><div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div><p>Der Arbeitsspeicher (RAM) enth&auml;lt fl&uuml;chtige Beweise, die nach dem Ausschalten verloren gehen: aktive Prozesse, Netzwerkverbindungen, Passw&ouml;rter im Klartext, verschl&uuml;sselte Keys und gel&ouml;schte Dateifragmente. Bei Hausdurchsuchungen sollte der RAM-Snapshot VOR dem Herunterfahren erstellt werden.</p></div>

<p class="chapter-intro">Der RAM enthält flüchtige Beweise: Passwörter, offene Verbindungen, geladene Module. Memory-Forensik sichert diese Daten bevor sie verloren gehen.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du verstehst wie RAM-Forensik funktioniert, kannst mit Volatility Speicherabbilder analysieren und weisst welche Artefakte im RAM zu finden sind.</p></div>

<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128190;</div><div class="feature-text"><h3>RAM-Dump</h3><p>Speicherabbild erstellen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>Volatility</h3><p>Memory-Analyse-Framework</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Prozesse</h3><p>Laufende Programme analysieren</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128272;</div><div class="feature-text"><h3>Artefakte</h3><p>Passwörter, Verbindungen</p></div></div></div>
<h2 class="section-title"><span class="number">20.1</span> RAM-Dump erstellen</h2><p>Der Memory-Dump muss erstellt werden, w&auml;hrend das System l&auml;uft. Verschiedene Tools stehen zur Verf&uuml;gung, je nach Zugriffsm&ouml;glichkeit.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># LiME (Linux Memory Extractor) - Kernel-Modul
insmod lime.ko "path=/cases/case01/images/memory.lime format=lime"

# Alternative: /dev/mem dumpen
 dd if=/dev/mem of=/cases/case01/images/memory.raw bs=1M

# Mit dc3dd (mit Hashing)
dc3dd if=/dev/mem of=/cases/case01/images/memory.raw hash=sha256

# Belkasoft RAM Capture (Remote-Tool)
# Auf dem Zielsystem ausf&uuml;hren:
belkasoft_ram_capture output.raw</code></pre></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Der RAM-Dump ver&auml;ndert den Systemzustand (neue Prozesse, Cache-Ver&auml;nderung). Dokumentiere den genauen Zeitstempel und die verwendete Methode.</p></div><h2 class="section-title"><span class="number">20.2</span> Volatility 3 &ndash; Grundlegende Analyse</h2><p>Volatility ist das Standard-Tool f&uuml;r Memory-Forensik. Version 3 (Python 3) erkennt das Betriebssystem automatisch.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation
pip3 install volatility3

# Verf&uuml;gbare Plugins auflisten
vol -f memory.raw plugins

# Betriebssystem erkennen
vol -f memory.raw windows.info
vol -f memory.raw linux.banner

# Laufende Prozesse auflisten
vol -f memory.raw windows.pslist
vol -f memory.raw linux.pslist

# Prozessbaum
vol -f memory.raw windows.pstree

# Versteckte Prozesse finden (Rootkit-Detection)
vol -f memory.raw windows.psscan</code></pre></div><h2 class="section-title"><span class="number">20.3</span> Netzwerk-Verbindungen aus dem RAM</h2><p>Aktive und k&uuml;rzlich geschlossene Netzwerkverbindungen k&ouml;nnen aus dem RAM extrahiert werden.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Netzwerkverbindungen (Windows)
vol -f memory.raw windows.netscan
vol -f memory.raw windows.netstat

# Netzwerkverbindungen (Linux)
vol -f memory.raw linux.sockstat

# DNS-Cache
vol -f memory.raw windows.dlllist | grep -i dns

# Offene Dateien pro Prozess
vol -f memory.raw windows.handles --pid &lt;PID&gt;</code></pre></div><h2 class="section-title"><span class="number">20.4</span> Passw&ouml;rter und Credentials extrahieren</h2><p>Passw&ouml;rter k&ouml;nnen als Klartext im RAM stehen &ndash; besonders in SSH-Agent, Browser-Sessions und Verschl&uuml;sselungs-Tools.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Strings aus Memory-Dump nach Passwort-Mustern
strings -n 8 memory.raw | grep -iE "(password|passwd|pwd|secret|key|token)"

# SSH-Keys finden
strings memory.raw | grep "BEGIN.*PRIVATE KEY"

# Browser-Passw&ouml;rter (Chrome/Firefox)
strings memory.raw | grep -A2 "login_token"

# Hash-Dump (Windows SAM)
vol -f memory.raw windows.hashdump
vol -f memory.raw windows.cachedump

# LSA Secrets
vol -f memory.raw windows.lsadump</code></pre></div><h2 class="section-title"><span class="number">20.5</span> Prozess-Speicher dumpen</h2><p>Einzelne Prozesse k&ouml;nnen aus dem RAM extrahiert werden &ndash; n&uuml;tzlich f&uuml;r Malware-Analyse oder um gel&ouml;schte Dateien aus dem Prozess-Speicher zu retten.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Prozess als Executable dumpen
vol -f memory.raw windows.procdump --pid &lt;PID&gt; --dump-dir /cases/case01/dumps/

# Prozess-Speicher (Heap + Stack)
vol -f memory.raw windows.memmap --pid &lt;PID&gt; --dump-dir /cases/case01/dumps/

# DLLs eines Prozesses extrahieren
vol -f memory.raw windows.dlllist --pid &lt;PID&gt;
vol -f memory.raw windows.dlldump --pid &lt;PID&gt; --dump-dir /cases/case01/dlls/

# Registrierungsdatenbank (Windows)
vol -f memory.raw windows.registry.hivelist
vol -f memory.raw windows.registry.printkey --key "Software\Microsoft\Windows\CurrentVersion\Run"</code></pre></div><h2 class="section-title"><span class="number">20.6</span> Timeline aus Memory</h2><p>Prozess-Startzeiten und Aktivit&auml;tsmuster k&ouml;nnen als Timeline dargestellt werden.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Prozess-Timelne (Sortiert nach Startzeit)
vol -f memory.raw windows.pslist | sort -k3

# Datei-Zugriffe
vol -f memory.raw windows.filescan | head -50

# Mutants (Mutex) finden (Malware-Indikator)
vol -f memory.raw windows.mutantscan</code></pre></div><div class="exercise-box"><div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Memory-Analyse</span></div><div class="exercise-body"><div class="exercise-goal"><div class="goal-label">Ziel</div><p>RAM-Dump erstellen und mit Volatility analysieren.</p></div><div class="exercise-steps"><ol class="numbered-list"><li>Erstelle einen RAM-Dump auf deinem System mit <code>dd if=/dev/mem</code></li><li>Bestimme mit Volatility das Betriebssystem-Profil</li><li>Liste alle laufenden Prozesse auf</li><li>Suche nach verd&auml;chtigen Netzwerkverbindungen</li><li>Extrahiere alle Strings > 8 Zeichen und filtere nach "password"</li></ol></div><div class="toggle-container"><div class="toggle-header"><span class="toggle-label">Hinweis</span><span class="toggle-arrow">&#9654;</span></div><div class="toggle-content"><p>Unter modernen Linux-Systemen ist <code>/dev/mem</code> oft durch KPTI gesch&uuml;tzt. Verwende stattdessen LiME oder <code>/proc/kcore</code>. Bei Cloud-VMs kann der Provider Memory-Dumps erm&ouml;glichen.</p></div></div></div></div><div class="callout callout-danger"><div class="callout-header">&#9888; Typische Fehler</div><ul><li><strong>RAM-Dump vergessen:</strong> System zuerst heruntergefahren &ndash; Beweise vernichtet!</li><li><strong>Falsches OS-Profil:</strong> Volatility kann ohne korrektes Profil keine Analyse durchf&uuml;hren</li><li><strong>Zu gro&szlig;er Dump:</strong> RAM-Dumps k&ouml;nnen 16-64 GB gro&szlig; werden &ndash; Speicherbedarf beachten</li><li><strong>Strings ohne Filter:</strong> Ein roher Strings-Dump ist unbrauchbar &ndash; immer mit grep kombinieren</li></ul></div><button class="complete-section-btn" data-chapter="ch20-memory-forensik">&#9744; Kapitel als abgeschlossen markieren</button><div class="nav-buttons"><button class="nav-btn" data-target="ch19-datenrettung">&#8592; Datenrettung</button><button class="nav-btn" data-target="ch21-netzwerkforensik">Netzwerkforensik &#8594;</button></div>
