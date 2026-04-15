<h2 class="section-title"><span class="number">11.3</span> hexdiff - Hex-Analyse</h2><p>Kombiniert aus cmp und hexdump. Zeigt Unterschiede im Hex-Format.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Mit xxd vergleichen
xxd file1.bin | head -20 > /tmp/f1.hex
xxd file2.bin | head -20 > /tmp/f2.hex
diff /tmp/f1.hex /tmp/f2.hex

# Mit vimdiff (interaktiv)
xxd file1.bin | vim - -c ":vsp %:p" -c ":normal! g/^/diff | set ft=diff" /tmp/f2.hex

# Mit vbindiff (spezielles Tool)
vbindiff file1.bin file2.bin</code></pre></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p><span class="inline-code">xxd</span> und <span class="inline-code">vimdiff</span> kombinieren f&uuml;r einen interaktiven Hex-Vergleich mit Seiten-ansicht.</p></div>
