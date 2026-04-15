<h2 class="section-title"><span class="number">21.3</span> Netzwerk-Log-Analyse</h2><p>Neben PCAPs liefern System-Logs wichtige Netzwerkbeweise.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Auth-Log: SSH-Login-Versuche
grep -i "sshd" /var/log/auth.log | grep -i "failed|accepted"

 # Apache/Nginx Access Logs
grep -i "POST|PUT|DELETE" /var/log/apache2/access.log

# Firewall-Logs (iptables/ufw)
grep "UFW" /var/log/ufw.log | tail -100

# Verbindungs-Log (ss/netstat)
ss -tunap > /cases/case01/notes/connections.txt

# Offene Ports scannen
netstat -tulpen > /cases/case01/notes/open_ports.txt

# ARP-Tabelle sichern
arp -a > /cases/case01/notes/arp_table.txt

# Routing-Tabelle
cat /proc/net/route > /cases/case01/notes/routing.txt</code></pre></div>
