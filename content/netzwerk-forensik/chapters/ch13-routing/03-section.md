<h2 class="section-title"><span class="number">13.3</span> Statische Routen setzen und IP-Forwarding</h2><p>Manchmal musst du manuell festlegen, &uuml;ber welchen Router bestimmte Netze erreichbar sind &ndash; das sind <strong>statische Routen</strong>.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Route hinzuf&uuml;gen (Netz 10.0.0.0/8 &uuml;ber Router 192.168.1.254)
sudo ip route add 10.0.0.0/8 via 192.168.1.254

# Route wieder l&ouml;schen
sudo ip route del 10.0.0.0/8

# Default-Gateway setzen
sudo ip route add default via 192.168.1.1

# Route testen (traceroute zeigt den Weg)
traceroute 8.8.8.8</code></pre></div><blockquote><p><strong>Hinweis:</strong> Mit <span class="inline-code">ip route add</span> gesetzte Routen sind nach einem Neustart weg. F&uuml;r dauerhafte Routen muss die Netzwerkkonfiguration angepasst werden.</p></blockquote><p><strong>IP-Forwarding &ndash; Linux als Router:</strong></p><p>Normalerweise leitet Linux keine Pakete zwischen Netzwerkkarten weiter. Mit <strong>IP-Forwarding</strong> kannst du einen Linux-Rechner in einen Router verwandeln.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Status pr&uuml;fen (0 = aus, 1 = an)
cat /proc/sys/net/ipv4/ip_forward

# Einschalten (bis zum Neustart)
sudo sysctl -w net.ipv4.ip_forward=1

# Dauerhaft aktivieren: in /etc/sysctl.conf eintragen:
# net.ipv4.ip_forward=1
# Dann: sudo sysctl -p</code></pre></div><p><strong>Typische Anwendung:</strong> VPN-Server, Lab-Umgebungen, Router zwischen zwei Netzen.</p>