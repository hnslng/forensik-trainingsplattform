<h2 class="section-title"><span class="number">12.4</span> curl und wget &ndash; HTTP und Downloads</h2><p><strong>curl</strong> = Daten von/zu einem Server &uuml;bertragen (haupts&auml;chlich HTTP).<br><strong>wget</strong> = Dateien aus dem Internet herunterladen.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># HTTP-Header anzeigen
curl -I https://example.com

# Datei herunterladen
wget https://example.com/file.zip

# Datei herunterladen (curl)
curl -O https://example.com/file.zip

# Nur Statuscode
curl -o /dev/null -s -w "%{http_code}\n" https://example.com

# POST-Request
curl -X POST -d "user=admin" http://example.com/login</code></pre></div>