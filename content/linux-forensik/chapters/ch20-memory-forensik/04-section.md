<h2 class="section-title"><span class="number">20.4</span> Passw&ouml;rter und Credentials extrahieren</h2><p>Passw&ouml;rter k&ouml;nnen als Klartext im RAM stehen &ndash; besonders in SSH-Agent, Browser-Sessions und Verschl&uuml;sselungs-Tools.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Strings aus Memory-Dump nach Passwort-Mustern
strings -n 8 memory.raw | grep -iE "(password|passwd|pwd|secret|key|token)"

# SSH-Keys finden
strings memory.raw | grep "BEGIN.*PRIVATE KEY"

# Browser-Passw&ouml;rter (Chrome/Firefox)
strings memory.raw | grep -A2 "login_token"

# Hash-Dump (Windows SAM)
vol -f memory.raw windows.hashdump
vol -f memory.raw windows.cachedump

# LSA Secrets
vol -f memory.raw windows.lsadump</code></pre></div>
