<h2 class="section-title"><span class="number">20.3</span> Netzwerk-Verbindungen aus dem RAM</h2><p>Aktive und k&uuml;rzlich geschlossene Netzwerkverbindungen k&ouml;nnen aus dem RAM extrahiert werden.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Netzwerkverbindungen (Windows)
vol -f memory.raw windows.netscan
vol -f memory.raw windows.netstat

# Netzwerkverbindungen (Linux)
vol -f memory.raw linux.sockstat

# DNS-Cache
vol -f memory.raw windows.dlllist | grep -i dns

# Offene Dateien pro Prozess
vol -f memory.raw windows.handles --pid &lt;PID&gt;</code></pre></div>
