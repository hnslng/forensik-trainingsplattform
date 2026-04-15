<h2 class="section-title"><span class="number">22.1</span> MAC-Times verstehen</h2><p>Jede Datei hat drei (bei ext4 vier) Zeitstempel &ndash; die sogenannten MAC(T)-Times:</p><div class="table-container"><table><thead><tr><th>Zeitstempel</th><th>Bedeutung</th><th>&Auml;ndert bei</th></tr></thead><tbody><tr><td><strong>M</strong>odification</td><td>Inhalt wurde ge&auml;ndert</td><td>Schreibzugriff auf Dateiinhalt</td></tr><tr><td><strong>A</strong>ccess</td><td>Datei wurde gelesen</td><td>Jeder Lesezugriff (mount -o noatime)</td></tr><tr><td><strong>C</strong>hange (Metadata)</td><td>Inode-Metadaten ge&auml;ndert</td><td>chmod, chown, rename, link</td></tr><tr><td><strong>B</strong>irth/Creation</td><td>Datei erstellt</td><td>Nur bei ext4 und NTFS</td></tr></tbody></table></div><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># MAC-Times einer Datei anzeigen
stat datei.txt

# Formatiert
stat -c "%n: M=%y A=%x C=%z B=%w" datei.txt

# Alle Dateien eines Verzeichnisses mit Zeitstempel
find /pfad -type f -printf "%T+ %p\n" | sort

# Sleuth Kit: MAC-Times aus Image
fls -r -m "/" image.dd | sort

# Mit mactime (Sleuth Kit)
fls -r -m "/" image.dd > body.txt
mactime -b body.txt &gt; timeline.csv</code></pre></div>
