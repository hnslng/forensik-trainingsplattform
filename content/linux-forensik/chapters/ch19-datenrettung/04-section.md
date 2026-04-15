<h2 class="section-title"><span class="number">19.4</span> Scalpel &ndash; Erweitertes File Carving</h2><p>Scalpel ist eine Weiterentwicklung von Foremost mit besserer Performance und konfigurierbarem Regelsatz. Es unterst&uuml;tzt auch Gr&ouml;&szlig;enbeschr&auml;nkungen.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Scalpel mit Standard-Konfiguration
scalpel -c /etc/scalpel/scalpel.conf -i image.dd -o /cases/case01/carved/

# Nur JPG und PDF
scalpel -c /etc/scalpel/scalpel.conf -t jpg,pdf -i image.dd -o /cases/case01/carved/

# Konfigurationsdatei pr&uuml;fen
cat /etc/scalpel/scalpel.conf | grep -v "^#" | grep -v "^$"</code></pre></div>
