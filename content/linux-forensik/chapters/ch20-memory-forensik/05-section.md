<h2 class="section-title"><span class="number">20.5</span> Prozess-Speicher dumpen</h2><p>Einzelne Prozesse k&ouml;nnen aus dem RAM extrahiert werden &ndash; n&uuml;tzlich f&uuml;r Malware-Analyse oder um gel&ouml;schte Dateien aus dem Prozess-Speicher zu retten.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Prozess als Executable dumpen
vol -f memory.raw windows.procdump --pid &lt;PID&gt; --dump-dir /cases/case01/dumps/

# Prozess-Speicher (Heap + Stack)
vol -f memory.raw windows.memmap --pid &lt;PID&gt; --dump-dir /cases/case01/dumps/

# DLLs eines Prozesses extrahieren
vol -f memory.raw windows.dlllist --pid &lt;PID&gt;
vol -f memory.raw windows.dlldump --pid &lt;PID&gt; --dump-dir /cases/case01/dlls/

# Registrierungsdatenbank (Windows)
vol -f memory.raw windows.registry.hivelist
vol -f memory.raw windows.registry.printkey --key "Software\Microsoft\Windows\CurrentVersion\Run"</code></pre></div>
