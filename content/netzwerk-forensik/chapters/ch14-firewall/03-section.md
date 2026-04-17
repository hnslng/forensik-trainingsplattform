<h2 class="section-title"><span class="number">14.3</span> nftables und UFW &ndash; Moderne Alternativen</h2><p><strong>nftables</strong> ist der moderne Nachfolger von iptables (bessere Performance, sauberere Syntax). Die meisten aktuellen Distributionen nutzen es.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Im Simulator: Statt nftables-Status den Ist-Zustand pruefen
ss -tlnp
nmap localhost
curl -I http://localhost</code></pre></div><p>Unter der Haube &uuml;bersetzt Ubuntu iptables-Befehle oft automatisch in nftables. Die Konzepte bleiben gleich.</p><p><strong>UFW</strong> (Uncomplicated Firewall) ist eine Vereinfachung f&uuml;r iptables/nftables:</p><div class="code-block output-block"><div class="code-header"><span class="lang">REALSYSTEM-BEISPIELE</span></div><pre><code>sudo ufw enable
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw status verbose</code></pre></div>