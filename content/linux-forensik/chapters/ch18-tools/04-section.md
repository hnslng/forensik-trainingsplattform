<h2 class="section-title"><span class="number">16.4</span> Xxd &amp; Hexdump</h2><p>Hex-Editor und -Analyzer f&uuml;r tiefe Bin&auml;ranalyse.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Xxd Installation
apt install xxd

# Hexdump (readable)
xxd image.bin | head -20

# Hexdump (offset)
xxd -s 0x200 -l 0x100 image.bin

# Reverse Hexdump (Hex->File)
echo "48 65 6c 6c 6f" | xxd -r -p > hello.txt

# Hexdump mit grep
xxd image.bin | grep "Signature"</code></pre></div><div class="table-container"><table><thead><tr><th>Option</th><th>Beschreibung</th><th>Anwendungsfall</th></tr></thead><tbody><tr><td>-s OFFSET</td><td>Start-Offset</td><td>Spezifischer Bereich</td></tr><tr><td>-l LEN</td><td>Anzahl Bytes</td><td>Bereich begrenzen</td></tr><tr><td>-c COLS</td><td>Spalten pro Zeile</td><td>Ausrichtung</td></tr><tr><td>-p</td><td>Plain Hex (ohne ASCII)</td><td>Script-Verarbeitung</td></tr><tr><td>-r</td><td>Reverse (Hex->Bin)</td><td>Hex-Dateien erstellen</td></tr></tbody></table></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Offsets bei xxd sind in HEX (<span class="inline-code">0x200</span>), aber <span class="inline-code">-s</span> akzeptiert auch Dezimal (<span class="inline-code">-s 512</span>).</p></div>
