<h2 class="section-title"><span class="number">8.4</span> &Uuml;bung: Datei-Details anzeigen</h2><p>Mit <span class="inline-code">istat</span> zeigst du die Metadaten einer bestimmten Datei (Inode):</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>istat /cases/case-001/images/usb-stick.img 5</code></pre></div><p><strong>Erwartete Ausgabe im Terminal:</strong></p><div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>inode: 5
Not Allocated
Group: 0
Generation Id: 6170
uid / gid: 1000 / 1000
mode: rrw-rw-rw
size: 22615
num of links: 1

Access Time:	2024-03-15 09:30:00.000000000 (CET)
Modified Time:	2024-03-14 16:22:00.000000000 (CET)
Change Time:	2024-03-15 09:30:00.000000000 (CET)
Birth Time:	2024-03-14 08:00:00.000000000 (CET)

Direct Blocks:
101 102 103</code></pre></div><div class="table-container"><table><thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead><tbody><tr><td><span class="inline-code">istat</span></td><td>Zeigt Inode-Metadaten an (Timestamps, Gr&ouml;&szlig;e, Bl&ouml;cke)</td></tr><tr><td><span class="inline-code">5</span></td><td>Die Inode-Nummer (aus <span class="inline-code">fls</span> ermittelt)</td></tr><tr><td><span class="inline-code">crtime</span></td><td>Erstellungszeitpunkt (birth time)</td></tr><tr><td><span class="inline-code">mtime</span></td><td>&Auml;nderungszeitpunkt (modification)</td></tr><tr><td><span class="inline-code">atime</span></td><td>Zugriffszeitpunkt (access)</td></tr></tbody></table></div>
