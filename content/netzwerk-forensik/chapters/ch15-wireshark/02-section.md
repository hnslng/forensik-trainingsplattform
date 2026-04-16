<h2 class="section-title"><span class="number">15.2</span> Capture starten &ndash; Verkehr mitschneiden</h2><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Grafische Oberfl&auml;che (lokal)
sudo wireshark

# Kommandozeile: Interface eth0 mitschneiden
sudo tshark -i eth0

# Nur 100 Pakete aufzeichnen
sudo tshark -i eth0 -c 100

# In Datei speichern (sp&auml;ter analysieren)
sudo tshark -i eth0 -w capture.pcap -c 500</code></pre></div><p><strong>PCAP</strong> (Packet Capture) = Das Standard-Dateiformat f&uuml;r mitgeschnittenen Verkehr. Kann in Wireshark ge&ouml;ffnet werden.</p>