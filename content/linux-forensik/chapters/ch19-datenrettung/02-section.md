<h2 class="section-title"><span class="number">19.2</span> TestDisk &ndash; Partitionen und Dateien retten</h2><p>TestDisk ist ein Open-Source-Tool zur Wiederherstellung verlorener Partitionen und gel&ouml;schter Dateien. Es kann auch besch&auml;digte Bootsektoren reparieren.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># TestDisk starten (interaktiv)
testdisk image.dd

# Nicht-interaktiver Modus: Gel&ouml;schte Dateien suchen
testdisk /list /cmd image.dd "advanced" "list" "quit"

# Partitionstabelle analysieren
testdisk /cmd image.dd "analyze" "quick_search" "quit"</code></pre></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>Immer an einer Kopie des Images arbeiten, nie am Original! TestDisk bietet einen interaktiven Assistenten &ndash; am wichtigsten: "Create" f&uuml;r ein Logfile w&auml;hlen.</p></div>
