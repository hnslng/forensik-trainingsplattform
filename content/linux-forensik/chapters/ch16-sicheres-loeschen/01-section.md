<h2 class="section-title"><span class="number">14.1</span> HDD (Hard Disk Drive)</h2><p>Magnetische Speicher - Daten sind durch Bits auf magnetischen Scheiben repr&auml;sent.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Einfaches Null-&Uuml;berschreiben (1x)
dd if=/dev/zero of=/dev/sda bs=1M status=progress

# Random (besser, aber langsam)
dd if=/dev/urandom of=/dev/sda bs=1M status=progress

# Gutmann-Algorithmus (35 Passes - sehr langsam)
shred -n 35 -vz /dev/sda

# DoD 5220.22-M (7 Passes)
shred -n 7 -vz /dev/sda</code></pre></div><div class="table-container"><table><thead><tr><th>Methode</th><th>Passes</th><th>Zeit</th><th>Sicherheit</th></tr></thead><tbody><tr><td>Null</td><td>1</td><td>Schnell</td><td>Niedrig</td></tr><tr><td>Random</td><td>1</td><td>Mittel</td><td>Mittel</td></tr><tr><td>Gutmann</td><td>35</td><td>Sehr langsam</td><td>Sehr hoch</td></tr><tr><td>DoD 5220.22-M</td><td>7</td><td>Langsam</td><td>Hoch</td></tr></tbody></table></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Auf modernen HDDs kann der Controller defekte Sektoren remappen. Diese Remapped-Sectors sind schwer zu l&ouml;schen und k&ouml;nnen Daten enthalten.</p></div>
