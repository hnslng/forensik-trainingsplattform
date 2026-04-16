<h2 class="section-title"><span class="number">10.11</span> &Uuml;bung: RSA-Private-Key erstellen</h2><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># RSA Private Key erstellen (2048 Bit)
openssl genrsa -out private.key 2048

# Public Key extrahieren
openssl rsa -in private.key -pubout -out public.key

# Key-Details anzeigen
openssl rsa -in private.key -text -noout</code></pre></div><div class="callout callout-warning"><div class="callout-header">&#9888; Sicherheit</div><p>Private Keys niemals weitergeben! Sie sind wie dein Haust&uuml;rschl&uuml;ssel. Ein verlorener Private Key bedeutet: Jeder kann sich als dich ausgeben.</p></div>