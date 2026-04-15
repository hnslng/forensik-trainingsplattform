<h2 class="section-title"><span class="number">19.5</span> Photorec &ndash; Dateien aus besch&auml;digten Medien</h2><p>Photorec (Teil von TestDisk) ist spezialisiert auf die Wiederherstellung von Fotos, Dokumenten und Archiven &ndash; selbst von schwer besch&auml;digten Datentr&auml;gern.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Photorec starten (interaktiv)
photorec image.dd

# Non-interaktiver Modus
photorec /d /cases/case01/photorec_out /cmd image.dd partition_none,options,fileopt,everything,search

# Nur Office-Dokumente und PDF
photorec /d /cases/case01/docs/ image.dd</code></pre></div>
