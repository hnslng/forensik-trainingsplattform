<h2 class="section-title"><span class="number">11.4</span> Hash-basierter Vergleich</h2><p>Vergleicht Hashes statt Inhalt. Schneller, aber zeigt nicht wo der Unterschied ist.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># SHA-256 Hashes vergleichen
sha256sum file1.txt file2.txt

# Hashes in Datei speichern
sha256sum file1.txt file2.txt > hashes.sha256

# Hashes verifizieren
sha256sum -c hashes.sha256

# Mehrere Dateien vergleichen
sha256sum *.txt | sort | uniq -D

# Exit-Code: 0=alle gleich, 1=unterschiedliche Hashes</code></pre></div><div class="table-container"><table><thead><tr><th>Scenario</th><th>Befehl</th><th>Ergebnis</th></tr></thead><tbody><tr><td>Alle Dateien identisch?</td><td>sha256sum -c hashes.sha256</td><td>Alle: OK oder ERROR f&uuml;r Unterschiede</td></tr><tr><td>Duplikate finden</td><td>sha256sum *.txt | sort | uniq -D</td><td>Zeigt Dateien mit gleichen Hash</td></tr><tr><td>Nur Unterschiede</td><td>sha256sum -c hashes.sha256 | grep ": FAILED"</td><td>Zeigt nur die nicht-identischen</td></tr></tbody></table></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Hashes zeigen nur OB etwas unterscheidet, nicht WAS. Wenn Hashes unterschiedlich sind, musst du <span class="inline-code">diff</span>, <span class="inline-code">cmp</span> oder <span class="inline-code">hexdiff</span> nutzen, um den Unterschied zu finden.</p></div>
