<h2 class="section-title"><span class="number">12.3</span> nmap &ndash; Port-Scans</h2><p><strong>nmap</strong> (Network Mapper) scannt Hosts nach offenen Ports und Diensten. Ein unverzichtbares Diagnose- und Sicherheitstool.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Standard-Scan eines Hosts
nmap localhost

# Alle Ports (1-65535)
nmap -p- localhost

# Service-Erkennung
nmap -sV localhost

# Scan eines ganzen Netzes
nmap 192.168.1.0/24</code></pre></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Nur Systeme scannen, die dir geh&ouml;ren oder f&uuml;r die du eine Erlaubnis hast! Port-Scans k&ouml;nnen als Angriff gewertet werden.</p></div>