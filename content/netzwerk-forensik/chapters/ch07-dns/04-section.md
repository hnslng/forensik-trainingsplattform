<h2 class="section-title"><span class="number">7.4</span> DNS-Tools im Terminal</h2><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Einfache Abfrage (Anf&auml;nger-freundlich)
nslookup example.com

# Detaillierte Abfrage mit dig
dig example.com A              # IPv4-Adresse
dig example.com AAAA           # IPv6-Adresse
dig example.com MX             # Mail-Server
dig example.com NS             # Nameserver
dig -x 93.184.216.34           # Reverse-Lookup (IP &rarr; Name)
dig @8.8.8.8 example.com       # Spezifischen DNS-Server fragen
dig +short example.com         # Nur die IP, ohne Header
dig +trace example.com         # Den gesamten Aufl&ouml;sungsweg zeigen</code></pre></div><p><strong>dig vs nslookup:</strong></p><ul><li><span class="inline-code">nslookup</span> = einfach, gut f&uuml;r Quick-Checks</li><li><span class="inline-code">dig</span> = detailliert, zeigt den kompletten DNS-Response mit Header und Metadaten</li></ul>