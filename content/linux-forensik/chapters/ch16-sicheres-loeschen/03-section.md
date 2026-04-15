<h2 class="section-title"><span class="number">14.3</span> NVMe SSD</h2><p>PCIe-Flash-Speicher - Sanitize-Befehle unterst&uuml;tzen forensisches L&ouml;schen.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># NVMe Sanitize (Empfohlen)
nvme sanitize /dev/nvme0

# Sanize-Optionen
# -a: 0=No-Action, 1=Exit-Failure-Maximum-Time, 2=Crypto-Erase, 3=Overwrite, 4=Block-Erase, 5=Exit-Failure-Minimum-Time
nvme sanitize -a 2 /dev/nvme0  # Crypto-Erase
nvme sanitize -a 3 /dev/nvme0  # Overwrite

# NVMe Format (Alternativ)
nvme format /dev/nvme0 -s 1

# Pr&uuml;fen ob Sanitize unterst&uuml;tzt wird
nvme id-ctrl /dev/nvme0 | grep -i sanitize</code></pre></div><div class="table-container"><table><thead><tr><th>Methode</th><th>Zeit</th><th>Sicherheit</th><th>Hinweis</th></tr></thead><tbody><tr><td>Crypto-Erase</td><td>Schnell</td><td>Sehr hoch</td><td>Vernichtet alle internen Schl&uuml;ssel</td></tr><tr><td>Overwrite</td><td>Mittel</td><td>Hoch</td><td>&Uuml;berschreibt mit Mustern</td></tr><tr><td>Block-Erase</td><td>Schnell</td><td>Hoch</td><td>L&ouml;scht alle Bl&ouml;cke</td></tr><tr><td>Format</td><td>Schnell</td><td>Mittel</td><td>Wiederherstellung theoretisch m&ouml;glich</td></tr></tbody></table></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>NVMe Crypto-Erase ist die sicherste Methode, wenn der Controller sie unterst&uuml;tzt.</p></div>
