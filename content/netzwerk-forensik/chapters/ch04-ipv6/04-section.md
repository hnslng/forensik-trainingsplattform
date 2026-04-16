<h2 class="section-title"><span class="number">4.4</span> SLAAC &ndash; Automatische Konfiguration</h2><p>Eines der besten Features von IPv6: <strong>SLAAC</strong> (Stateless Address Autoconfiguration). Ger&auml;te konfigurieren sich selbst &ndash; kein DHCP-Server n&ouml;tig!</p><p><strong>Ablauf:</strong></p><ol><li>Ger&auml;t erzeugt sich eine Link-Local-Adresse (<span class="inline-code">fe80::...</span>)</li><li>Router sendet <strong>Router Advertisements</strong> (RA) mit dem Netzwerkpr&auml;fix</li><li>Ger&auml;t kombiniert Pr&auml;fix + eigene Interface-ID &rarr; fertige globale IPv6-Adresse</li></ol><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># IPv6-Adressen anzeigen
ip -6 addr show

# IPv6-Loopback testen
ping6 ::1

# IPv6-Routing anzeigen
ip -6 route show</code></pre></div>