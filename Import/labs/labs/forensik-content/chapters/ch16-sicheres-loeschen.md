<h1 class="chapter-title">Sicheres L&ouml;schen</h1><div class="chapter-subtitle">HDD, SATA-SSD, NVMe - Forensisch sauberes Datenvernichten</div><div class="callout callout-context"><div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div><p>Forensisch sicheres L&ouml;schen stellt sicher, dass Daten nicht mehr wiederhergestellt werden k&ouml;nnen. Dies ist wichtig, um Beweise zu vernichten oder Speichermedien f&uuml;r neue Eins&auml;tze vorzubereiten. Nicht-forensisches L&ouml;schen kann Datenrekonstruktion erm&ouml;glichen.</p></div>

<p class="chapter-intro">Bevor ein Datenträger wiederverwendet wird, müssen alle Daten unwiderruflich gelöscht werden. Aber Achtung: Nicht jede Methode ist gleich sicher.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kennst die Methoden zum sicheren Löschen (shred, dd, wipe), verstehst die Unterschiede und weisst wann welche Methode geeignet ist.</p></div>

<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128465;</div><div class="feature-text"><h3>shred</h3><p>Dateien sicher löschen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128190;</div><div class="feature-text"><h3>dd zero</h3><p>Gesamte Platte überschreiben</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128270;</div><div class="feature-text"><h3>DoD-Standard</h3><p>Mehrfach-Überschreibung</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#9888;</div><div class="feature-text"><h3>SSD-Besonderheit</h3><p>TRIM und Wear Leveling</p></div></div></div>
<h2 class="section-title"><span class="number">14.1</span> HDD (Hard Disk Drive)</h2><p>Magnetische Speicher - Daten sind durch Bits auf magnetischen Scheiben repr&auml;sent.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Einfaches Null-&Uuml;berschreiben (1x)
dd if=/dev/zero of=/dev/sda bs=1M status=progress

# Random (besser, aber langsam)
dd if=/dev/urandom of=/dev/sda bs=1M status=progress

# Gutmann-Algorithmus (35 Passes - sehr langsam)
shred -n 35 -vz /dev/sda

# DoD 5220.22-M (7 Passes)
shred -n 7 -vz /dev/sda</code></pre></div><div class="table-container"><table><thead><tr><th>Methode</th><th>Passes</th><th>Zeit</th><th>Sicherheit</th></tr></thead><tbody><tr><td>Null</td><td>1</td><td>Schnell</td><td>Niedrig</td></tr><tr><td>Random</td><td>1</td><td>Mittel</td><td>Mittel</td></tr><tr><td>Gutmann</td><td>35</td><td>Sehr langsam</td><td>Sehr hoch</td></tr><tr><td>DoD 5220.22-M</td><td>7</td><td>Langsam</td><td>Hoch</td></tr></tbody></table></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Auf modernen HDDs kann der Controller defekte Sektoren remappen. Diese Remapped-Sectors sind schwer zu l&ouml;schen und k&ouml;nnen Daten enthalten.</p></div><h2 class="section-title"><span class="number">14.2</span> SATA-SSD</h2><p>Flash-Speicher - Wear Leveling und Bad Block Management machen L&ouml;schen komplex.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># ATA Secure Erase (Empfohlen)
hdparm --user-master --secure-erase 0 /dev/sda

# ATA Secure Erase (Enhanced)
hdparm --user-master --secure-erase-enhanced 0 /dev/sda

# Pr&uuml;fen ob Secure Erase unterst&uuml;tzt wird
hdparm -I /dev/sda | grep -i security

# Alternativ: TRIM (nicht sicher f&uuml;r forensische L&ouml;schung)
blkdiscard /dev/sda</code></pre></div><div class="table-container"><table><thead><tr><th>Methode</th><th>Zeit</th><th>Sicherheit</th><th>Hinweis</th></tr></thead><tbody><tr><td>ATA Secure Erase</td><td>Schnell</td><td>Sehr hoch</td><td>Unter Controller-Verwaltung, aber forensisch akzeptabel</td></tr><tr><td>Enhanced Secure Erase</td><td>Mittel</td><td>Sehr hoch</td><td>Zus&auml;tzliche Schl&uuml;ssel-Vernichtung</td></tr><tr><td>shred (Software)</td><td>Langsam</td><td>Mittel</td><td>Wear Leveling kann Daten ungel&ouml;scht lassen</td></tr><tr><td>TRIM</td><td>Schnell</td><td>Niedrig</td><td>Nicht forensisch sicher!</td></tr></tbody></table></div><div class="callout callout-danger"><div class="callout-header">&#9888; Typische Fehler</div><ul><li><strong>shred auf SSD nutzen:</strong> Wear Leveling verhindert komplettes L&ouml;schen</li><li><strong>TRIM f&uuml;r forensisches L&ouml;schen:</strong> TRIM ist kein L&ouml;schen!</li><li><strong>Secure Erase nicht verifiziert:</strong> Fehler beim L&ouml;schen nicht bemerkt</li><li><strong>Wear Leveling ignoriert:</strong> SSDs k&ouml;nnen Reservewords haben</li></ul></div><h2 class="section-title"><span class="number">14.3</span> NVMe SSD</h2><p>PCIe-Flash-Speicher - Sanitize-Befehle unterst&uuml;tzen forensisches L&ouml;schen.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># NVMe Sanitize (Empfohlen)
nvme sanitize /dev/nvme0

# Sanize-Optionen
# -a: 0=No-Action, 1=Exit-Failure-Maximum-Time, 2=Crypto-Erase, 3=Overwrite, 4=Block-Erase, 5=Exit-Failure-Minimum-Time
nvme sanitize -a 2 /dev/nvme0  # Crypto-Erase
nvme sanitize -a 3 /dev/nvme0  # Overwrite

# NVMe Format (Alternativ)
nvme format /dev/nvme0 -s 1

# Pr&uuml;fen ob Sanitize unterst&uuml;tzt wird
nvme id-ctrl /dev/nvme0 | grep -i sanitize</code></pre></div><div class="table-container"><table><thead><tr><th>Methode</th><th>Zeit</th><th>Sicherheit</th><th>Hinweis</th></tr></thead><tbody><tr><td>Crypto-Erase</td><td>Schnell</td><td>Sehr hoch</td><td>Vernichtet alle internen Schl&uuml;ssel</td></tr><tr><td>Overwrite</td><td>Mittel</td><td>Hoch</td><td>&Uuml;berschreibt mit Mustern</td></tr><tr><td>Block-Erase</td><td>Schnell</td><td>Hoch</td><td>L&ouml;scht alle Bl&ouml;cke</td></tr><tr><td>Format</td><td>Schnell</td><td>Mittel</td><td>Wiederherstellung theoretisch m&ouml;glich</td></tr></tbody></table></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>NVMe Crypto-Erase ist die sicherste Methode, wenn der Controller sie unterst&uuml;tzt.</p></div><h2 class="section-title"><span class="number">14.4</span> Warum forensisch sicheres L&ouml;schen?</h2><p>Unterschied zwischen normalem und forensischem L&ouml;schen.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Normal (nicht forensisch)
rm -rf /data/*

# Forensisch sicher
shred -n 7 -vz /dev/sda
hdparm --user-master --secure-erase 0 /dev/sda
nvme sanitize /dev/nvme0</code></pre></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p><span class="inline-code">rm -rf</span> l&ouml;scht nur Dateisystem-Metadaten, nicht die Daten selbst. Forensische Werkzeuge k&ouml;nnen die Daten wiederherstellen!</p></div><div class="exercise-box"><div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">L&ouml;schen-Methode w&auml;hlen</span></div><div class="exercise-body"><div class="exercise-goal"><div class="goal-label">Ziel</div><p>W&auml;hle die passende L&ouml;schen-Methode f&uuml;r verschiedene Szenarien.</p></div><div class="exercise-steps"><ol class="numbered-list"><li>Szenario 1: HDD, Zeit ist kritisch (maximal 1 Stunde). Welche Methode?</li><li>Szenario 2: SATA-SSD, maximale Sicherheit ben&ouml;tigt. Welche Methode?</li><li>Szenario 3: NVMe SSD, schnell und sicher. Welche Methode?</li><li>Szenario 4: HDD, forensische Standards (DoD 5220.22-M). Welche Methode?</li></ol></div><div class="toggle-container"><div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div><div class="toggle-content"><p><strong>Szenario 1:</strong> Null- oder Random-Write (1x) - Schnell, aber mittlere Sicherheit</p><p><strong>Szenario 2:</strong> Enhanced Secure Erase - Sehr sicher, schneller als overwrite</p><p><strong>Szenario 3:</strong> NVMe Crypto-Erase - Schnellste und sicherste Methode</p><p><strong>Szenario 4:</strong> DoD 5220.22-M (7 Passes) - Forensischer Standard, sehr langsam</p></div></div></div></div><button class="complete-section-btn" data-chapter="ch16-sicheres-loeschen">&#9744; Kapitel als abgeschlossen markieren</button><div class="nav-buttons"><button class="nav-btn" data-target="ch15-write-blocker">&#8592; Write-Blocker</button><button class="nav-btn" data-target="ch17-best-practices">Best Practices &#8594;</button></div>