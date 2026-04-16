<h2 class="section-title"><span class="number">12.2</span> ss &ndash; Verbindungen anzeigen</h2><p><strong>ss</strong> (socket statistics) zeigt offene Netzwerkverbindungen &ndash; der moderne Ersatz f&uuml;r <span class="inline-code">netstat</span>.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Alle TCP-Verbindungen
ss -t

# Alle wartenden (listening) Ports
ss -tln

# Alle Verbindungen mit Prozess-Info
ss -tlnp

# UDP-Verbindungen
ss -uln

# Alle Verbindungen (TCP + UDP)
ss -tunap</code></pre></div><div class="table-container"><table><thead><tr><th>Parameter</th><th>Bedeutung</th></tr></thead><tbody><tr><td><span class="inline-code">-t</span></td><td>TCP</td></tr><tr><td><span class="inline-code">-u</span></td><td>UDP</td></tr><tr><td><span class="inline-code">-l</span></td><td>Nur wartende (listening) Ports</td></tr><tr><td><span class="inline-code">-n</span></td><td>Keine DNS-Aufl&ouml;sung (schneller)</td></tr><tr><td><span class="inline-code">-p</span></td><td>Prozess-Info anzeigen</td></tr><tr><td><span class="inline-code">-a</span></td><td>Alle (auch wartende)</td></tr></tbody></table></div>