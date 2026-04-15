<h2 class="section-title"><span class="number">16.1</span> Sleuth Kit (sk) &amp; Autopsy</h2><p>Das Open-Source-Standard-Werkzeug f&uuml;r File-System und Volume Analysis.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation (Debian/Ubuntu)
apt install sleuthkit autopsy

# Version pr&uuml;fen
fls -V
autopsy -V

# Filesystem Analyse
fls -r image.dd

# Metadata
stat -s image.dd

# Timeline
tsk_gettimes -o /tmp/timeline.csv image.dd</code></pre></div><div class="table-container"><table><thead><tr><th>Tool</th><th>Funktion</th><th>Besonderheit</th></tr></thead><tbody><tr><td>fls</td><td>Listet Directory-Eintr&auml;ge</td><td>Rekursiv mit -r</td></tr><tr><td>fsstat</td><td>Zeigt Filesystem-Statistiken</td><td>Blocksize, Cluster, Flags</td></tr><tr><td>stat</td><td>Zeigt Metadata</td><td>MAC-Times</td></tr><tr><td>tsk_gettimes</td><td>Timeline-Erstellung</td><td>CSV-Export</td></tr><tr><td>Autopsy</td><td>GUI-Analyse</td><td>Integriert alle sleuthkit-Tools</td></tr></tbody></table></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>Autopsy integriert alle sleuthkit-Tools in einer GUI. Nutze es f&uuml;r komplexe Analysen, sleuthkit f&uuml;r CLI-Automatisierung.</p></div>
