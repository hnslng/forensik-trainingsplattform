<h2 class="section-title"><span class="number">21.1</span> Traffic Capture &ndash; Pakete mitschneiden</h2><p>Netzwerkverkehr kann mit tcpdump oder tshark aufgezeichnet werden. F&uuml;r forensische Zwecke sollte immer der vollst&auml;ndige Payload erfasst werden.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Vollst&auml;ndigen Traffic aufzeichnen (tcpdump)
tcpdump -i eth0 -w /cases/case01/capture.pcap -s 0

# Nur HTTP- und HTTPS-Traffic
tcpdump -i eth0 -w /cases/case01/http.pcap "port 80 or port 443"

# Tshark (Wireshark CLI)
tshark -i eth0 -w /cases/case01/capture.pcap

# Bestimmter Host
tshark -i eth0 -f "host 192.168.1.100" -w /cases/case01/target.pcap

# DNS-Queries erfassen
tshark -i eth0 -f "port 53" -w /cases/case01/dns.pcap</code></pre></div><div class="callout callout-warning"><div class="callout-header">&#9888; Rechtlicher Hinweis</div><p>Netzwerk&uuml;berwachung bedarf einer rechtlichen Grundlage (StPO § 135, § 149). Bei Betriebsnetzwerken kann die &Uuml;berwachung durch Betriebsvereinbarungen gedeckt sein. Privater Datenverkehr darf nur mit Genehmigung erfasst werden.</p></div>
