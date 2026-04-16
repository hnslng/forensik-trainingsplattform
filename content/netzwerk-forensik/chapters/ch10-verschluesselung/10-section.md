<h2 class="section-title"><span class="number">10.10</span> &Uuml;bung: Hash einer Datei erstellen</h2><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># SHA-256 Hash einer Datei
sha256sum /etc/passwd

# SHA-512 (noch sicherer)
sha512sum /etc/passwd

# MD5 (veraltet, aber noch verbreitet)
md5sum /etc/passwd</code></pre></div><p><strong>Erwartete Ausgabe im Terminal:</strong></p><div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>7e8975e92eb28d493aa47cd89f590c8e7e3e7e2c  /etc/passwd</code></pre></div><div class="callout callout-tip"><div class="callout-header">&#128161; Praxis</div><p>Hashes werden verwendet um die Integrit&auml;t von Downloads zu pr&uuml;fen. Wenn der Hash der heruntergeladenen Datei nicht mit dem auf der Webseite angegebenen Hash &uuml;bereinstimmt, wurde die Datei manipuliert.</p></div>