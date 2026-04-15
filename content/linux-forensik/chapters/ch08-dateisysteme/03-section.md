<h2 class="section-title"><span class="number">8.3</span> &Uuml;bung: Partitionen im Image anzeigen</h2><p>Mit <span class="inline-code">mmls</span> zeigst du die Partitionstabelle eines Images an:</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>mmls /cases/case-001/images/usb-stick.img</code></pre></div><p><strong>Erwartete Ausgabe im Terminal:</strong></p><div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>DOS Partition Table
Offset Sector: 0
Units are in 512-byte sectors

      Slot      Start        End        Length       Description
000:  Meta      0000000000   0000000000   0000000001   Primary Table (#0)
001:  -------   0000000000   0000002047   0000002048   Unallocated
002:  000:000   0000002048   0033554431   00333552384   FAT32 (0x0B)</code></pre></div><div class="table-container"><table><thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead><tbody><tr><td><span class="inline-code">mmls</span></td><td>Zeigt die Partitionstabelle eines Images an</td></tr><tr><td><span class="inline-code">Start: 2048</span></td><td>Startsektor der FAT32-Partition</td></tr><tr><td><span class="inline-code">FAT32 (0x0B)</span></td><td>Partitionstyp: FAT32</td></tr></tbody></table></div>
