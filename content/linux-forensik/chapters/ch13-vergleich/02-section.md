<h2 class="section-title"><span class="number">11.2</span> cmp - Bin&auml;rvergleich</h2><p>Vergleicht zwei Dateien Byte-f&uuml;r-Byte. Schneller als diff, aber zeigt keinen Kontext.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Einfacher Vergleich (Exit-Code: 0=gleich, 1=unterschiedlich)
cmp file1.bin file2.bin

# Ausgabe des ersten abweichenden Bytes
cmp -l file1.bin file2.bin

# Zeilenweise Ausgabe (f&uuml;r Textdateien)
cmp -l file1.txt file2.txt | head -5

# Alle Unterschiede auf einmal
cmp -b -l file1.bin file2.bin</code></pre></div><div class="table-container"><table><thead><tr><th>Ausgabe von cmp -l</th><th>Bedeutung</th></tr></thead><tbody><tr><td>123 45 67</td><td>Zeile 123, Byte 45 unterscheidet sich (Zeichen 67)</td></tr><tr><td>EOF auf file1</td><td>file2 ist l&auml;nger</td></tr></tbody></table></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>cmp zeigt nur die Position, nicht den Kontext. Nutze <span class="inline-code">diff</span> f&uuml;r Textdateien und <span class="inline-code">hexdiff</span> f&uuml;r Bin&auml;rdateien, wenn du sehen willst, was sich ge&auml;ndert hat.</p></div>
