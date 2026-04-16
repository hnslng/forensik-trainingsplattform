<h2 class="section-title"><span class="number">16.3</span> Phase 3: DNS-Probleme und Verbindungsanalyse</h2><p>Wenn Step 4 (ping IP) klappt aber Step 5 (ping Name) nicht &rarr; <strong>DNS-Problem.</strong> Der h&auml;ufigste Fehler nach dem Internet-Ausfall.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># DNS-Config pr&uuml;fen
cat /etc/resolv.conf

# Anderen DNS testen
dig @8.8.8.8 google.com

# DNS-Cache leeren
sudo systemd-resolve --flush-caches</code></pre></div><p>Wenn die Basics alle funktionieren aber die Anwendung trotzdem nicht &rarr; Details analysieren:</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Aktive Verbindungen
ss -tunap

# Weg zum Ziel
traceroute 8.8.8.8

# HTTP-Test
curl -I https://google.com

# ARP-Tabelle
ip neigh show

# Offene Ports auf dem betroffenen Rechner
ss -tlnp</code></pre></div>