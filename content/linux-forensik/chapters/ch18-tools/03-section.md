<h2 class="section-title"><span class="number">16.3</span> Strings</h2><p>Extrahiert lesbare Zeichen aus Bin&auml;rdateien.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation (meistens schon installiert)
apt install binutils

# Strings extrahieren
strings memory_dump.raw

# Minimale L&auml;nge (default: 4)
strings -n 6 memory_dump.raw

# Encoding angeben
strings -e l memory_dump.raw  # ASCII
strings -e b memory_dump.raw  # 8-bit

# Mit Offset
strings -t d memory_dump.raw | grep "password"</code></pre></div><div class="table-container"><table><thead><tr><th>Option</th><th>Beschreibung</th><th>Anwendungsfall</th></tr></thead><tbody><tr><td>-n N</td><td>Minimale L&auml;nge</td><td>L&auml;ngere Strings</td></tr><tr><td>-e X</td><td>Encoding (l=b/L, a=A, b=B, x=X)</td><td>Spezifische Texte</td></tr><tr><td>-t TYPE</td><td>Offset-Typ (d=decimal, x=hex, o=octal)</td><td>Offset-f&uuml;r grep</td></tr><tr><td>-f</td><td>Format mit Feldern</td><td>Automatisierte Analyse</td></tr><tr><td>-a</td><td>Alle Dateien (nur Scan-Files)</td><td>Komplette Scans</td></tr></tbody></table></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p><span class="inline-code">strings -t d</span> ist perfekt f&uuml;r Memory-Dumps. Die Offset zeigen, wo Strings im RAM sind.</p></div>
