<h2 class="section-title"><span class="number">9.4</span> Praktische curl-Befehle</h2><p><strong>curl</strong> ist dein Schweizer Taschenmesser f&uuml;r HTTP:</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Nur Header anzeigen (schneller &Uuml;berblick)
curl -I https://example.com

# Voller Request mit Request- und Response-Headern
curl -v http://example.com

# Nur den Statuscode extrahieren
curl -o /dev/null -s -w "%{http_code}\n" https://example.com

# POST-Request (z.B. f&uuml;r APIs)
curl -X POST -d "user=byte&pass=secret" http://example.com/login

# Zertifikat einer HTTPS-Seite pr&uuml;fen
openssl s_client -connect example.com:443 -brief</code></pre></div><div class="table-container"><table><thead><tr><th>Parameter</th><th>Bedeutung</th></tr></thead><tbody><tr><td><span class="inline-code">-I</span></td><td>Nur Header abrufen (HEAD-Request)</td></tr><tr><td><span class="inline-code">-v</span></td><td>Verbose &ndash; zeigt alles</td></tr><tr><td><span class="inline-code">-o /dev/null</span></td><td>Output verwerfen</td></tr><tr><td><span class="inline-code">-s</span></td><td>Silent &ndash; kein Progress-Bar</td></tr><tr><td><span class="inline-code">-w "%{http_code}"</span></td><td>Custom Format (hier: Statuscode)</td></tr><tr><td><span class="inline-code">-X POST</span></td><td>HTTP-Methode &auml;ndern</td></tr><tr><td><span class="inline-code">-d "data"</span></td><td>Daten mitsenden</td></tr></tbody></table></div>