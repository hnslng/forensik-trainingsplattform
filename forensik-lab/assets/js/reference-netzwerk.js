var ReferenceNetzwerk = {
	sections: [
		{
			id: 'ref-01-identifikation',
			title: 'Interface & IP identifizieren',
			icon: '🔍',
			html: function() { return '<div class="s-heading">Netzwerk-Interfaces anzeigen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code>ip addr show</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Option</th><th>Bedeutung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">ip addr</span></td><td>Alle Interfaces mit IP-Adressen</td></tr>' +
				'<tr><td><span class="s-inline">ip -4 addr</span></td><td>Nur IPv4-Adressen</td></tr>' +
				'<tr><td><span class="s-inline">ip -6 addr</span></td><td>Nur IPv6-Adressen</td></tr>' +
				'<tr><td><span class="s-inline">ip link show</span></td><td>Alle Interfaces (Status, MAC)</td></tr>' +
				'<tr><td><span class="s-inline">ip addr show eth0</span></td><td>Nur ein bestimmtes Interface</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Interface aktivieren/deaktivieren</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code>sudo ip link set eth0 up\nsudo ip link set eth0 down</code></pre></div>' +
				'<div class="s-heading">MAC-Adresse anzeigen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code>ip link show eth0 | grep ether\n\n# Alternativ:\ncat /sys/class/net/eth0/address</code></pre></div>'; }
		},
		{
			id: 'ref-02-ipconfig',
			title: 'IP-Adresse konfigurieren',
			icon: '🔢',
			html: function() { return '<div class="s-heading">IP-Adresse setzen (temporär)</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># IPv4-Adresse setzen\nsudo ip addr add 192.168.1.100/24 dev eth0\n\n# IPv4-Adresse entfernen\nsudo ip addr del 192.168.1.100/24 dev eth0\n\n# IPv6-Adresse setzen\nsudo ip addr add 2001:db8::1/64 dev eth0</code></pre></div>' +
				'<div class="s-heading">Subnetzmasken-Übersicht</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>CIDR</th><th>Subnetzmaske</th><th>Hosts</th></tr></thead><tbody>' +
				'<tr><td>/8</td><td>255.0.0.0</td><td>16.777.214</td></tr>' +
				'<tr><td>/16</td><td>255.255.0.0</td><td>65.534</td></tr>' +
				'<tr><td>/24</td><td>255.255.255.0</td><td>254</td></tr>' +
				'<tr><td>/25</td><td>255.255.255.128</td><td>126</td></tr>' +
				'<tr><td>/26</td><td>255.255.255.192</td><td>62</td></tr>' +
				'<tr><td>/27</td><td>255.255.255.224</td><td>30</td></tr>' +
				'<tr><td>/28</td><td>255.255.255.240</td><td>14</td></tr>' +
				'<tr><td>/30</td><td>255.255.255.252</td><td>2</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Private IP-Bereiche (RFC 1918)</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Bereich</th><th>CIDR</th><th>Verwendung</th></tr></thead><tbody>' +
				'<tr><td>10.0.0.0 – 10.255.255.255</td><td>/8</td><td>Große Netzwerke</td></tr>' +
				'<tr><td>172.16.0.0 – 172.31.255.255</td><td>/12</td><td>Mittlere Netze</td></tr>' +
				'<tr><td>192.168.0.0 – 192.168.255.255</td><td>/16</td><td>Heim-/Small-Office</td></tr>' +
				'</tbody></table></div>'; }
		},
		{
			id: 'ref-03-routing',
			title: 'Routing & Gateway',
			icon: '🔀',
			html: function() { return '<div class="s-heading">Routing-Tabelle anzeigen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Routing-Tabelle anzeigen\nip route show\n\n# Standard-Gateway finden\nip route | grep default\n\n# Route zu bestimmtem Netz\nip route get 8.8.8.8</code></pre></div>' +
				'<div class="s-heading">Route hinzufügen/entfernen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Standard-Gateway setzen\nsudo ip route add default via 192.168.1.1\n\n# Statische Route hinzufügen\nsudo ip route add 10.0.0.0/8 via 192.168.1.254\n\n# Route entfernen\nsudo ip route del 10.0.0.0/8\n\n# Alle Routen flushen\nsudo ip route flush all</code></pre></div>'; }
		},
		{
			id: 'ref-04-arp',
			title: 'ARP-Tabelle',
			icon: '🔗',
			html: function() { return '<div class="s-heading">ARP-Tabelle anzeigen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Alle ARP-Einträge anzeigen\nip neigh show\n\n# Nur ARP-Einträge die antworten\nip neigh show | grep -i reachable\n\n# Alternativ (älter):\narp -a\n\n# ARP-Cache leeren\nsudo ip neigh flush all</code></pre></div>' +
				'<div class="s-heading">Statischen ARP-Eintrag setzen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Statischer Eintrag\nsudo ip neigh add 192.168.1.1 lladdr aa:bb:cc:dd:ee:ff dev eth0\n\n# Eintrag entfernen\nsudo ip neigh del 192.168.1.1 dev eth0</code></pre></div>'; }
		},
		{
			id: 'ref-05-ping',
			title: 'ping & Erreichbarkeit',
			icon: '📡',
			html: function() { return '<div class="s-heading">ping – Erreichbarkeit testen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># 4 Pings senden\nping -c 4 8.8.8.8\n\n# Kontinuierlich pingen\nping 8.8.8.8\n\n# IPv6 pingen\nping -6 2001:4860:4860::8888\n\n# Ping mit Zeitstempel\nping -D 8.8.8.8\n\n# Interval anpassen (alle 0.5s)\nping -i 0.5 8.8.8.8\n\n# MTU-Discovery\nping -M do -s 1472 8.8.8.8</code></pre></div>' +
				'<div class="s-heading">traceroute – Weg zum Ziel</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Standard traceroute\ntraceroute google.com\n\n# Mit ICMP statt UDP\ntraceroute -I google.com\n\n# IPv6\ntraceroute -6 google.com\n\n# mtr (ping + traceroute kombiniert)\nmtr google.com\nmtr -r -c 10 google.com  # Report-Modus</code></pre></div>'; }
		},
		{
			id: 'ref-06-dns',
			title: 'DNS-Abfragen',
			icon: '🏷️',
			html: function() { return '<div class="s-heading">dig – DNS abfragen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># A-Record (IPv4)\ndig example.com A\n\n# Alle Records\ndig example.com ANY\n\n# Nur die IP (kurz)\ndig +short example.com\n\n# Von bestimmtem DNS-Server\ndig @8.8.8.8 example.com\n\n# Reverse-DNS (IP → Name)\ndig -x 8.8.8.8\n\n# Trace (DNS-Pfad verfolgen)\ndig +trace example.com</code></pre></div>' +
				'<div class="s-heading">nslookup – Einfache DNS-Abfrage</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Einfache Abfrage\nnslookup example.com\n\n# Mit bestimmtem DNS-Server\nnslookup example.com 8.8.8.8\n\n# Reverse-Lookup\nnslookup 8.8.8.8</code></pre></div>' +
				'<div class="s-heading">DNS-Server konfigurieren</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Aktuelle DNS-Server anzeigen\ncat /etc/resolv.conf\n\n# DNS-Server temporär setzen\necho "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf\n\n# DNS-Cache leeren (systemd-resolved)\nsudo resolvectl flush-caches\nsudo resolvectl statistics</code></pre></div>' +
				'<div class="s-heading">DNS-Record-Typen</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Typ</th><th>Bedeutung</th><th>Befehl</th></tr></thead><tbody>' +
				'<tr><td>A</td><td>IPv4-Adresse</td><td><span class="s-inline">dig example.com A</span></td></tr>' +
				'<tr><td>AAAA</td><td>IPv6-Adresse</td><td><span class="s-inline">dig example.com AAAA</span></td></tr>' +
				'<tr><td>CNAME</td><td>Alias</td><td><span class="s-inline">dig www.example.com CNAME</span></td></tr>' +
				'<tr><td>MX</td><td>Mail-Server</td><td><span class="s-inline">dig example.com MX</span></td></tr>' +
				'<tr><td>NS</td><td>Nameserver</td><td><span class="s-inline">dig example.com NS</span></td></tr>' +
				'<tr><td>TXT</td><td>Text (SPF, DKIM)</td><td><span class="s-inline">dig example.com TXT</span></td></tr>' +
				'</tbody></table></div>'; }
		},
		{
			id: 'ref-07-dhcp',
			title: 'DHCP',
			icon: '📋',
			html: function() { return '<div class="s-heading">DHCP-Lease erneuern/freigeben</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># IP via DHCP anfordern\nsudo dhclient eth0\n\n# DHCP-Lease freigeben\nsudo dhclient -r eth0\n\n# Lease-Datei anzeigen\ncat /var/lib/dhcp/dhclient.leases\n\n# Erneuern ohne Freigabe\nsudo dhclient -n eth0</code></pre></div>' +
				'<div class="s-heading">DHCP-Informationen anzeigen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Lease-Details\nsudo dhclient -v eth0\n\n# systemd-networkd (falls aktiv)\nnetworkctl status eth0\n\n# Alle DHCP-Parameter\nip addr show eth0</code></pre></div>'; }
		},
		{
			id: 'ref-08-http',
			title: 'HTTP-Anfragen (curl)',
			icon: '🌍',
			html: function() { return '<div class="s-heading">curl – HTTP-Anfragen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># GET-Request\ncurl https://example.com\n\n# Nur Header anzeigen\ncurl -I https://example.com\n\n# Header + Body\ncurl -i https://example.com\n\n# POST-Request\ncurl -X POST -d "user=admin&pass=123" https://example.com/login\n\n# POST mit JSON\ncurl -X POST -H "Content-Type: application/json" \\\n  -d \'{"name":"test"}\' https://example.com/api\n\n# Datei herunterladen\ncurl -O https://example.com/file.zip\n\n# Mit Timeout\ncurl --connect-timeout 5 --max-time 10 https://example.com\n\n# Verbose (alle Details)\ncurl -v https://example.com\n\n# Redirects folgen\ncurl -L https://example.com</code></pre></div>' +
				'<div class="s-heading">wget – Dateien herunterladen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Datei herunterladen\nwget https://example.com/file.zip\n\n# Anderer Dateiname\nwget -O myfile.zip https://example.com/file.zip\n\n# Fortsetzen (abgebrochener Download)\nwget -c https://example.com/file.zip\n\n# Ganze Website spiegeln\nwget -m https://example.com\n\n# Recursive Download (nur bestimmte Typen)\nwget -r -A pdf https://example.com/docs/</code></pre></div>'; }
		},
		{
			id: 'ref-09-ports',
			title: 'Ports & Verbindungen (ss)',
			icon: '🔌',
			html: function() { return '<div class="s-heading">ss – Verbindungen anzeigen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Alle Verbindungen\nss -a\n\n# Nur TCP\nss -t\n\n# Nur UDP\nss -u\n\n# Listening-Ports\nss -l\n\n# Alles kombiniert (TCP+UDP+Listening+Prozesse)\nss -tulpen\n\n# Nur Port 80/443\nss -tlnp | grep -E ":80|:443"\n\n# Nach Prozess filtern\nss -tlnp | grep nginx</code></pre></div>' +
				'<div class="s-heading">ss Optionen</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Option</th><th>Bedeutung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">-t</span></td><td>TCP-Sockets</td></tr>' +
				'<tr><td><span class="s-inline">-u</span></td><td>UDP-Sockets</td></tr>' +
				'<tr><td><span class="s-inline">-l</span></td><td>Nur Listening (offene Ports)</td></tr>' +
				'<tr><td><span class="s-inline">-p</span></td><td>Prozess-Info anzeigen</td></tr>' +
				'<tr><td><span class="s-inline">-e</span></td><td>Erweiterte Info</td></tr>' +
				'<tr><td><span class="s-inline">-n</span></td><td>Numerische Ports (keine Namen)</td></tr>' +
				'<tr><td><span class="s-inline">-a</span></td><td>Alle (inkl. Listening + Non-Listening)</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Wichtige Ports</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Port</th><th>Protokoll</th><th>Dienst</th></tr></thead><tbody>' +
				'<tr><td>22</td><td>TCP</td><td>SSH</td></tr>' +
				'<tr><td>53</td><td>TCP/UDP</td><td>DNS</td></tr>' +
				'<tr><td>80</td><td>TCP</td><td>HTTP</td></tr>' +
				'<tr><td>443</td><td>TCP</td><td>HTTPS</td></tr>' +
				'<tr><td>67/68</td><td>UDP</td><td>DHCP</td></tr>' +
				'<tr><td>3389</td><td>TCP</td><td>RDP</td></tr>' +
				'</tbody></table></div>'; }
		},
		{
			id: 'ref-10-nmap',
			title: 'Portscan (nmap)',
			icon: '🎯',
			html: function() { return '<div class="s-heading">nmap – Portscan</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Schneller Scan der häufigsten Ports\nnmap -F 192.168.1.1\n\n# Alle Ports (0-65535)\nnmap -p- 192.168.1.1\n\n# Bestimmte Ports\nnmap -p 22,80,443 192.168.1.1\n\n# Mit Service-Erkennung\nnmap -sV 192.168.1.1\n\n# Betriebssystem-Erkennung\nnmap -O 192.168.1.1\n\n# Ping-Scan (Host-Discovery)\nnmap -sn 192.168.1.0/24\n\n# UDP-Scan (langsam!)\nsudo nmap -sU -p 53,67,68 192.168.1.1\n\n# Ganzes Subnetz scannen\nnmap -sn 192.168.1.0/24\n\n# Ausführliche Ausgabe\nnmap -v -A 192.168.1.1</code></pre></div>' +
				'<div class="s-heading">nmap Optionen</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Option</th><th>Bedeutung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">-sS</span></td><td>TCP SYN Scan (Standard, schnell)</td></tr>' +
				'<tr><td><span class="s-inline">-sT</span></td><td>TCP Connect Scan (vollständiger)</td></tr>' +
				'<tr><td><span class="s-inline">-sU</span></td><td>UDP-Scan</td></tr>' +
				'<tr><td><span class="s-inline">-sV</span></td><td>Service-Version erkennen</td></tr>' +
				'<tr><td><span class="s-inline">-O</span></td><td>Betriebssystem erkennen</td></tr>' +
				'<tr><td><span class="s-inline">-A</span></td><td>Aggressiv (OS + Version + Script)</td></tr>' +
				'<tr><td><span class="s-inline">-sn</span></td><td>Ping-Scan (kein Port-Scan)</td></tr>' +
				'<tr><td><span class="s-inline">-F</span></td><td>Schnell (Top 100 Ports)</td></tr>' +
				'</tbody></table></div>'; }
		},
		{
			id: 'ref-11-firewall',
			title: 'Firewall (iptables)',
			icon: '🛡️',
			html: function() { return '<div class="s-heading">iptables – Regeln anzeigen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Alle Regeln anzeigen\nsudo iptables -L -n -v\n\n# Nach Chain filtern\nsudo iptables -L INPUT -n -v\n\n# Mit Zeilennummern\nsudo iptables -L --line-numbers\n\n# NAT-Regeln\nsudo iptables -t nat -L -n -v</code></pre></div>' +
				'<div class="s-heading">Regeln hinzufügen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># HTTP erlauben (eingehend)\nsudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT\n\n# HTTPS erlauben\nsudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT\n\n# SSH erlauben\nsudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT\n\n# Bestehende Verbindungen erlauben\nsudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT\n\n# Loopback erlauben\nsudo iptables -A INPUT -i lo -j ACCEPT\n\n# Alles andere blocken\nsudo iptables -P INPUT DROP</code></pre></div>' +
				'<div class="s-heading">Regeln entfernen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Regel nach Nummer löschen\nsudo iptables -D INPUT 3\n\n# Alle Regeln flushen\nsudo iptables -F\n\n# Policy zurücksetzen\nsudo iptables -P INPUT ACCEPT</code></pre></div>'; }
		},
		{
			id: 'ref-12-capture',
			title: 'Paket-Mitschnitt (tcpdump)',
			icon: '🦈',
			html: function() { return '<div class="s-heading">tcpdump – Aufzeichnen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># Alle Pakete auf eth0\nsudo tcpdump -i eth0\n\n# Nur 20 Pakete aufzeichnen\nsudo tcpdump -i eth0 -c 20\n\n# Nur Port 80 (HTTP)\nsudo tcpdump -i eth0 port 80\n\n# In PCAP-Datei speichern\nsudo tcpdump -i eth0 -w capture.pcap\n\n# PCAP-Datei lesen\ntcpdump -r capture.pcap\n\n# Nur traffic von bestimmter IP\nsudo tcpdump host 192.168.1.100\n\n# Nur traffic zwischen zwei IPs\nsudo tcpdump host 192.168.1.1 and host 192.168.1.100\n\n# Nur DNS\ntcpdump -i eth0 port 53\n\n# Hex + ASCII Output\ntcpdump -i eth0 -XX\n\n# Verbose\ntcpdump -i eth0 -vv</code></pre></div>' +
				'<div class="s-heading">Wireshark-Filter (Display Filter)</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Filter</th><th>Beschreibung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">http</span></td><td>Nur HTTP-Verkehr</td></tr>' +
				'<tr><td><span class="s-inline">ip.addr == 192.168.1.1</span></td><td>Von/zu dieser IP</td></tr>' +
				'<tr><td><span class="s-inline">tcp.port == 443</span></td><td>Nur HTTPS</td></tr>' +
				'<tr><td><span class="s-inline">dns</span></td><td>Nur DNS</td></tr>' +
				'<tr><td><span class="s-inline">tcp.flags.syn == 1</span></td><td>Nur SYN-Pakete</td></tr>' +
				'<tr><td><span class="s-inline">!(ip.addr == 192.168.1.1)</span></td><td>Alles außer dieser IP</td></tr>' +
				'</tbody></table></div>'; }
		},
		{
			id: 'ref-13-verschluesselung',
			title: 'Verschlüsselung prüfen',
			icon: '🔐',
			html: function() { return '<div class="s-heading">TLS/SSL-Zertifikat prüfen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code"># Zertifikat-Details anzeigen\nopenssl s_client -connect example.com:443 -showcerts\n\n# Nur Ablaufdatum\necho | openssl s_client -connect example.com:443 2>/dev/null | \\\n  openssl x509 -noout -dates\n\n# Zertifikatskette prüfen\nopenssl s_client -connect example.com:443 -showcerts </dev/null\n\n# Supported Ciphers anzeigen\nnmap --script ssl-enum-ciphers -p 443 example.com</code></pre></div>' +
				'<div class="s-heading">Hash-Prüfsummen erstellen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># SHA-256\nsha256sum datei.txt\n\n# MD5\nmd5sum datei.txt\n\n# Hash verifizieren\nsha256sum -c datei.txt.sha256\n\n# Hash einer Zeichenkette\necho -n "meinpasswort" | sha256sum</code></pre></div>' +
				'<div class="s-heading">Verschlüsselungsalgorithmen</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Typ</th><th>Algo</th><th>Verwendung</th><th>Prüfbefehl</th></tr></thead><tbody>' +
				'<tr><td>Symmetrisch</td><td>AES-256</td><td>Datenverschlüsselung</td><td><span class="s-inline">openssl enc -aes-256-cbc</span></td></tr>' +
				'<tr><td>Asymmetrisch</td><td>RSA</td><td> Schlüsselaustausch, Signatur</td><td><span class="s-inline">openssl rsa -in key.pem -text</span></td></tr>' +
				'<tr><td>Hash</td><td>SHA-256</td><td>Integritätsprüfung</td><td><span class="s-inline">sha256sum file</span></td></tr>' +
				'<tr><td>TLS</td><td>1.2/1.3</td><td>HTTPS Transport</td><td><span class="s-inline">openssl s_client -connect ...</span></td></tr>' +
				'</tbody></table></div>'; }
		},
		{
			id: 'ref-14-cheatsheet',
			title: 'Cheatsheet',
			icon: '📝',
			html: function() { return '<div class="s-heading">Netzwerk-Cheatsheet</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code># === SCHNELLE ÜBERSICHT ===\n\n# Eigene IP\nip addr show\n\n# Gateway\nip route | grep default\n\n# DNS-Server\ncat /etc/resolv.conf\n\n# Offene Ports\nss -tulpen\n\n# Erreichbarkeit\nping -c 4 8.8.8.8\n\n# DNS prüfen\ndig +short example.com\n\n# HTTP-Header\ncurl -I https://example.com\n\n# ARP-Tabelle\nip neigh show\n\n# Routing-Tabelle\nip route show\n\n# Firewall-Regeln\nsudo iptables -L -n -v</code></pre></div>' +
				'<div class="s-heading">Fehlersuche (Bottom-Up)</div>' +
				'<div class="s-callout s-callout-info"><div class="s-callout-title">Reihenfolge</div><div class="s-callout-body">' +
				'<strong>1.</strong> Kabel/WLAN? → <span class="s-inline">ip link</span><br>' +
				'<strong>2.</strong> IP vorhanden? → <span class="s-inline">ip addr</span><br>' +
				'<strong>3.</strong> Gateway da? → <span class="s-inline">ping 192.168.1.1</span><br>' +
				'<strong>4.</strong> DNS ok? → <span class="s-inline">ping google.com</span><br>' +
				'<strong>5.</strong> Firewall? → <span class="s-inline">iptables -L</span></div></div>'; }
		},
		{
			id: 'ref-15-glossar',
			title: 'Glossar',
			icon: '📖',
			html: function() { return '<div class="s-heading">Netzwerk-Glossar</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Begriff</th><th>Bedeutung</th></tr></thead><tbody>' +
				'<tr><td>IP-Adresse</td><td>Eindeutige Adresse eines Geräts (z.B. 192.168.1.10)</td></tr>' +
				'<tr><td>MAC-Adresse</td><td>Hardware-Adresse des Netzwerkadapters (AA:BB:CC:DD:EE:FF)</td></tr>' +
				'<tr><td>Subnetzmaske</td><td>Definiert Netzwerkgröße (z.B. 255.255.255.0 = /24)</td></tr>' +
				'<tr><td>Gateway</td><td>Router für den Zugang zu anderen Netzen</td></tr>' +
				'<tr><td>DNS</td><td>Namensauflösung (Domain → IP, wie ein Telefonbuch)</td></tr>' +
				'<tr><td>DHCP</td><td>Automatische IP-Adressvergabe</td></tr>' +
				'<tr><td>NAT</td><td>Network Address Translation (private → öffentliche IP)</td></tr>' +
				'<tr><td>ARP</td><td>IP → MAC Übersetzung</td></tr>' +
				'<tr><td>Port</td><td>Nummer für einen bestimmten Dienst (0–65535)</td></tr>' +
				'<tr><td>Socket</td><td>IP + Port Kombination (z.B. 192.168.1.1:80)</td></tr>' +
				'<tr><td>TCP</td><td>Zuverlässiges Transportprotokoll (mit Bestätigung)</td></tr>' +
				'<tr><td>UDP</td><td>Schnelles Transportprotokoll (ohne Bestätigung)</td></tr>' +
				'<tr><td>TLS</td><td>Verschlüsselung für Transport (HTTPS)</td></tr>' +
				'<tr><td>PCAP</td><td>Paket-Mitschnitt-Datei (Wireshark/tcpdump)</td></tr>' +
				'<tr><td>LAN</td><td>Local Area Network (lokales Netzwerk)</td></tr>' +
				'<tr><td>VPN</td><td>Verschlüsselter Tunnel über ein anderes Netzwerk</td></tr>' +
				'<tr><td>VLAN</td><td>Logische Netzwerktrennung auf einem Switch</td></tr>' +
				'<tr><td>MTU</td><td>Maximale Paketgröße (meist 1500 Bytes)</td></tr>' +
				'<tr><td>TTL</td><td>Time to Live – maximale Router-Hops</td></tr>' +
				'<tr><td>ICMP</td><td>Kontrollprotokoll (ping, Fehlermeldungen)</td></tr>' +
				'</tbody></table></div>'; }
		},
		{
			id: 'ref-16-quellen',
			title: 'Quellen & Standards',
			icon: '📚',
			html: function() { return '<div class="s-heading">Wichtige RFCs</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>RFC</th><th>Titel</th><th>Bedeutung</th></tr></thead><tbody>' +
				'<tr><td>RFC 791</td><td>Internet Protocol (IPv4)</td><td>Grundlage des Internets</td></tr>' +
				'<tr><td>RFC 793</td><td>TCP</td><td>Zuverlässige Übertragung</td></tr>' +
				'<tr><td>RFC 768</td><td>UDP</td><td>Schnelle Übertragung</td></tr>' +
				'<tr><td>RFC 826</td><td>ARP</td><td>IP → MAC Übersetzung</td></tr>' +
				'<tr><td>RFC 1035</td><td>DNS</td><td>Namensauflösung</td></tr>' +
				'<tr><td>RFC 1918</td><td>Private IP-Adressen</td><td>10.x, 172.16.x, 192.168.x</td></tr>' +
				'<tr><td>RFC 2131</td><td>DHCP</td><td>Automatische IP-Vergabe</td></tr>' +
				'<tr><td>RFC 2460</td><td>IPv6</td><td>Nachfolger von IPv4</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">man-pages (Lokale Hilfe)</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span></div><pre><code>man ip\nman ss\nman ping\nman traceroute\nman dig\nman curl\nman tcpdump\nman iptables</code></pre></div>'; }
		}
	]
};
