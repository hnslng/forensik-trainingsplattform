<h2 class="section-title"><span class="number">20.2</span> Volatility 3 &ndash; Grundlegende Analyse</h2><p>Volatility ist das Standard-Tool f&uuml;r Memory-Forensik. Version 3 (Python 3) erkennt das Betriebssystem automatisch.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation
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
vol -f memory.raw windows.psscan</code></pre></div>
