<h2 class="section-title"><span class="number">20.1</span> RAM-Dump erstellen</h2><p>Der Memory-Dump muss erstellt werden, w&auml;hrend das System l&auml;uft. Verschiedene Tools stehen zur Verf&uuml;gung, je nach Zugriffsm&ouml;glichkeit.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># LiME (Linux Memory Extractor) - Kernel-Modul
insmod lime.ko "path=/cases/case01/images/memory.lime format=lime"

# Alternative: /dev/mem dumpen
 dd if=/dev/mem of=/cases/case01/images/memory.raw bs=1M

# Mit dc3dd (mit Hashing)
dc3dd if=/dev/mem of=/cases/case01/images/memory.raw hash=sha256

# Belkasoft RAM Capture (Remote-Tool)
# Auf dem Zielsystem ausf&uuml;hren:
belkasoft_ram_capture output.raw</code></pre></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Der RAM-Dump ver&auml;ndert den Systemzustand (neue Prozesse, Cache-Ver&auml;nderung). Dokumentiere den genauen Zeitstempel und die verwendete Methode.</p></div>
