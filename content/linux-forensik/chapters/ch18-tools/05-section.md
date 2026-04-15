<h2 class="section-title"><span class="number">16.5</span> Weitere Tools</h2><p>Zus&auml;tzliche forensische Tools, die du kennen solltest:</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Foremost (Forensische Carving)
apt install foremost
foremost -t all -o /tmp/recovered/ image.dd

# PhotoRec (Bild-Wiederherstellung)
apt install testdisk
photorec image.dd

# Bulk Extractor (Massenextraktion)
apt install bulk-extractor
bulk_extractor -o /tmp/output/ image.dd

# Volatility (Memory-Forensik)
apt install volatility-framework
vol.py -f memory.dump imageinfo

# Wireshark (Network-Forensik)
apt install wireshark
wireshark capture.pcap</code></pre></div><div class="table-container"><table><thead><tr><th>Tool</th><th>Typ</th><th>Anwendungsfall</th></tr></thead><tbody><tr><td>Foremost</td><td>Carving</td><td>Unvollst&auml;ndige Dateien wiederherstellen</td></tr><tr><td>PhotoRec</td><td>Bilder</td><td>Gel&ouml;schte Fotos wiederherstellen</td></tr><tr><td>Bulk Extractor</td><td>Massenextraktion</td><td>Emails, URLs, etc. aus Image</td></tr><tr><td>Volatility</td><td>Memory-Forensik</td><td>RAM-Dumps analysieren</td></tr><tr><td>Wireshark</td><td>Network-Forensik</td><td>PCAP-Dateien analysieren</td></tr></tbody></table></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>Versuche nicht, alle Tools sofort zu lernen. Beginne mit sleuthkit, strings, xxd und arbeite dich zu spezialisierteren Tools vor!</p></div>
