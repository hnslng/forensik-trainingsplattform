<h2 class="section-title"><span class="number">19.3</span> Foremost &ndash; File Carving nach Signaturen</h2><p>Foremost sucht anhand von Datei-Headern (Magic Bytes) nach gel&ouml;schten Dateien im Image. Es funktioniert unabh&auml;ngig vom Dateisystem &ndash; selbst fragmentierte oder &uuml;berschriebene Dateien k&ouml;nnen teilweise rekonstruiert werden.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Alle unterst&uuml;tzten Dateitypen suchen
foremost -i image.dd -o /cases/case01/carved/

# Nur bestimmte Typen (PDF, DOCX, JPG, PNG)
foremost -t pdf,docx,jpg,png -i image.dd -o /cases/case01/carved/

# Mit verbose-Output
foremost -v -i image.dd -o /cases/case01/carved/

# Nur Header + Footer suchen (schneller)
foremost -i image.dd -o /cases/case01/carved/ -t all

# Eigene Signatur-Datei verwenden
foremost -c /path/to/custom.conf -i image.dd -o /cases/case01/carved/</code></pre></div><div class="table-container"><table><thead><tr><th>Dateityp</th><th>Magic Bytes (Hex)</th><th>Signatur</th></tr></thead><tbody><tr><td>JPEG</td><td>FF D8 FF</td><td>JFIF/EXIF Header</td></tr><tr><td>PNG</td><td>89 50 4E 47</td><td>\x89PNG</td></tr><tr><td>PDF</td><td>25 50 44 46</td><td>%PDF</td></tr><tr><td>GIF</td><td>47 49 46 38</td><td>GIF8</td></tr><tr><td>ZIP/DOCX</td><td>50 4B 03 04</td><td>PK\x03\x04</td></tr><tr><td>MZIP</td><td>4D 5A</td><td>MZ (PE-Header)</td></tr></tbody></table></div>
