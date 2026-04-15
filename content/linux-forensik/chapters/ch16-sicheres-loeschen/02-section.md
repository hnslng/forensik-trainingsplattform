<h2 class="section-title"><span class="number">14.2</span> SATA-SSD</h2><p>Flash-Speicher - Wear Leveling und Bad Block Management machen L&ouml;schen komplex.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># ATA Secure Erase (Empfohlen)
hdparm --user-master --secure-erase 0 /dev/sda

# ATA Secure Erase (Enhanced)
hdparm --user-master --secure-erase-enhanced 0 /dev/sda

# Pr&uuml;fen ob Secure Erase unterst&uuml;tzt wird
hdparm -I /dev/sda | grep -i security

# Alternativ: TRIM (nicht sicher f&uuml;r forensische L&ouml;schung)
blkdiscard /dev/sda</code></pre></div><div class="table-container"><table><thead><tr><th>Methode</th><th>Zeit</th><th>Sicherheit</th><th>Hinweis</th></tr></thead><tbody><tr><td>ATA Secure Erase</td><td>Schnell</td><td>Sehr hoch</td><td>Unter Controller-Verwaltung, aber forensisch akzeptabel</td></tr><tr><td>Enhanced Secure Erase</td><td>Mittel</td><td>Sehr hoch</td><td>Zus&auml;tzliche Schl&uuml;ssel-Vernichtung</td></tr><tr><td>shred (Software)</td><td>Langsam</td><td>Mittel</td><td>Wear Leveling kann Daten ungel&ouml;scht lassen</td></tr><tr><td>TRIM</td><td>Schnell</td><td>Niedrig</td><td>Nicht forensisch sicher!</td></tr></tbody></table></div><div class="callout callout-danger"><div class="callout-header">&#9888; Typische Fehler</div><ul><li><strong>shred auf SSD nutzen:</strong> Wear Leveling verhindert komplettes L&ouml;schen</li><li><strong>TRIM f&uuml;r forensisches L&ouml;schen:</strong> TRIM ist kein L&ouml;schen!</li><li><strong>Secure Erase nicht verifiziert:</strong> Fehler beim L&ouml;schen nicht bemerkt</li><li><strong>Wear Leveling ignoriert:</strong> SSDs k&ouml;nnen Reservewords haben</li></ul></div>
