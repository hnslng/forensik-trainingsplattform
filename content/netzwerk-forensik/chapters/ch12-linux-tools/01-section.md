<h2 class="section-title"><span class="number">12.1</span> ip &ndash; Das Schweizer Taschenmesser</h2><p><strong>ip</strong> ist der moderne Ersatz f&uuml;r <span class="inline-code">ifconfig</span>. Zeigt und konfiguriert Netzwerk-Interfaces, Adressen und Routen.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Alle Interfaces anzeigen
ip addr show

# Nur ein Interface
ip addr show eth0

# Routing-Tabelle
ip route show

# ARP-Tabelle (Nachbarn)
ip neigh show

# Interface aktivieren/deaktivieren
sudo ip link set eth0 up
sudo ip link set eth0 down</code></pre></div><blockquote><p><strong>Tipp:</strong> <span class="inline-code">ip a</span> = Kurzform f&uuml;r <span class="inline-code">ip addr show</span>. <span class="inline-code">ip r</span> = Kurzform f&uuml;r <span class="inline-code">ip route show</span>.</p></blockquote>