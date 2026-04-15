<h2 class="section-title"><span class="number">16.2</span> Binwalk</h2><p>Signatur-Suche und Forensik-Tool zum Identifizieren von Embedded-Dateien.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation (Debian/Ubuntu)
apt install binwalk

# Signaturen scan (rekursiv)
binwalk -e image.dd

# Signaturen scan (tief)
binwalk -B image.dd

# Entropy-Analyse
binwalk -E image.dd

# Firmware extrahieren
binwalk -e -M firmware.bin</code></pre></div><div class="table-container"><table><thead><tr><th>Option</th><th>Beschreibung</th><th>Anwendungsfall</th></tr></thead><tbody><tr><td>-e</td><td>Extract (Dateien extrahieren)</td><td>Embedded-Systeme</td></tr><tr><td>-M</td><td>Matryoshka (rekursiv extrahieren)</td><td>Zip-in-Datei</td></tr><tr><td>-B</td><td>Binwalk-Signaturen (bessere Erkennung)</td><td>Unbekannte Dateien</td></tr><tr><td>-E</td><td>Entropy-Analyse (Verschl&uuml;sselung?)</td><td>Encrypted-Daten</td></tr><tr><td>-R</td><td>Rekursiv (Unterverzeichnisse)</td><td>Komplette Scans</td></tr></tbody></table></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Binwalk extrahiert in aktuelle Verzeichnis! Nutze <span class="inline-code">--directory</span> oder <span class="inline-code">-d</span> um das Zielverzeichnis anzugeben.</p></div>
