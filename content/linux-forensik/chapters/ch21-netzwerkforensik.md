---
icon: '&#127760;'
id: ch21-netzwerkforensik
section: Erweiterte Analyse
title: Netzwerkforensik
---

<h1 class="chapter-title">Netzwerkforensik</h1><div class="chapter-subtitle">PCAP-Analyse, Netzwerk-Logs und Kommunikations&uuml;berwachung</div><div class="callout callout-context"><div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div><p>Netzwerkverkehr liefert Beweise &uuml;ber Datenexfiltration, unbefugten Zugriff und Kommunikationsmuster. Bei ABB-F&auml;llen kann der Netzwerkverkehr zeigen, ob und wann Daten nach au&szlig;en &uuml;bertragen wurden &ndash; z.&nbsp;B. Buchhaltungsdaten an einen Cloud-Speicher oder E-Mail-Anh&auml;nge.</p></div>

<p class="chapter-intro">Netzwerkverkehr enthält Beweise: Wer hat mit wem kommuniziert? Welche Daten wurden übertragen? Netzwerkforensik analysiert Paketmitschnitte.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kannst Netzwerkverkehr mit tcpdump und Wireshark analysieren, verstehst PCAP-Dateien und weisst wie du verdächtige Muster erkennst.</p></div>

<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128225;</div><div class="feature-text"><h3>tcpdump</h3><p>Pakete aufzeichenen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>Wireshark</h3><p>Pakete analysieren</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128196;</div><div class="feature-text"><h3>PCAP</h3><p>Capture-Dateien verstehen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#9888;</div><div class="feature-text"><h3>Anomalien</h3><p>Verdächtigen Verkehr erkennen</p></div></div></div>
<h2 class="section-title"><span class="number">21.1</span> Traffic Capture &ndash; Pakete mitschneiden</h2><p>Netzwerkverkehr kann mit tcpdump oder tshark aufgezeichnet werden. F&uuml;r forensische Zwecke sollte immer der vollst&auml;ndige Payload erfasst werden.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Vollst&auml;ndigen Traffic aufzeichnen (tcpdump)
tcpdump -i eth0 -w /cases/case01/capture.pcap -s 0

# Nur HTTP- und HTTPS-Traffic
tcpdump -i eth0 -w /cases/case01/http.pcap "port 80 or port 443"

# Tshark (Wireshark CLI)
tshark -i eth0 -w /cases/case01/capture.pcap

# Bestimmter Host
tshark -i eth0 -f "host 192.168.1.100" -w /cases/case01/target.pcap

# DNS-Queries erfassen
tshark -i eth0 -f "port 53" -w /cases/case01/dns.pcap</code></pre></div><div class="callout callout-warning"><div class="callout-header">&#9888; Rechtlicher Hinweis</div><p>Netzwerk&uuml;berwachung bedarf einer rechtlichen Grundlage (StPO § 135, § 149). Bei Betriebsnetzwerken kann die &Uuml;berwachung durch Betriebsvereinbarungen gedeckt sein. Privater Datenverkehr darf nur mit Genehmigung erfasst werden.</p></div><h2 class="section-title"><span class="number">21.2</span> PCAP-Analyse mit tshark</h2><p>tshark bietet m&auml;chtige Filter und Statistikfunktionen zur Analyse von Paketmitschnitten.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Grundlegende Statistik
tshark -r capture.pcap -q -z io,phs

# HTTP-Requests extrahieren
tshark -r capture.pcap -Y "http.request" -T fields -e http.host -e http.request.uri

# DNS-Queries
tshark -r capture.pcap -Y "dns.qry.name" -T fields -e dns.qry.name

# Top-Talker (meiste Bytes)
tshark -r capture.pcap -q -z conv,ip

# Exfiltration-Indikatoren: Gro&szlig;e Uploads
tshark -r capture.pcap -Y "tcp.flags.syn==1 && tcp.flags.ack==0" -T fields -e ip.src -e ip.dst

# Datei&uuml;bertragungen finden (HTTP)
tshark -r capture.pcap -Y "http.response.code==200" -T fields -e http.content_type -e http.file_data

# E-Mail-Anh&auml;nge (SMTP)
tshark -r capture.pcap -Y "smtp" -T fields -e smtp.req.parameter

# FTP-Befehle und Dateitransfers
tshark -r capture.pcap -Y "ftp" -T fields -e ftp.request.command -e ftp.request.arg</code></pre></div><h2 class="section-title"><span class="number">21.3</span> Netzwerk-Log-Analyse</h2><p>Neben PCAPs liefern System-Logs wichtige Netzwerkbeweise.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Auth-Log: SSH-Login-Versuche
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
cat /proc/net/route > /cases/case01/notes/routing.txt</code></pre></div><h2 class="section-title"><span class="number">21.4</span> Datenexfiltration erkennen</h2><p>Typische Indikatoren f&uuml;r Datenexfiltration:</p><div class="table-container"><table><thead><tr><th>Indikator</th><th>Erkennung</th><th>Tool</th></tr></thead><tbody><tr><td>Gro&szlig;e Uploads</td><td>Bytes/sec &uuml;ber Schwellenwert</td><td>tshark -z conv,ip</td></tr><tr><td>Ungew&ouml;hnliche Ports</td><td>Traffic auf nicht-Standard-Ports</td><td>tshark + port-Filter</td></tr><tr><td>DNS-Tunneling</td><td>Sehr lange Subdomains, hohe Query-Rate</td><td>tshark -Y "dns"</td></tr><tr><td>HTTPS zu unbekannten Hosts</td><td>SNI-Analyse, Zertifikats-Check</td><td>tshark -Y "tls.handshake"</td></tr><tr><td>Tor/I2P-Verbindungen</td><td>Verbindung zu bekannten Tor-Relays</td><td>IP-Reputation-DB</td></tr><tr><td>Cloud-Uploads</td><td>Traffic zu Dropbox, GDrive, OneDrive</td><td>tshark + Host-Filter</td></tr></tbody></table></div><h2 class="section-title"><span class="number">21.5</span> Wireshark &ndash; GUI-basierte Analyse</h2><p>F&uuml;r komplexe PCAP-Analysen bietet Wireshark eine grafische Oberfl&auml;che mit Protokoll-Dekodierung, Stream-Rekonstruktion und Experten-System.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># PCAP in Wireshark &ouml;ffnen
wireshark capture.pcap &

# PCAP-Informationen
capinfos capture.pcap

# PCAP-Datei konvertieren (z.B. ERF -> PCAP)
edd -r input.erf -w output.pcap</code></pre></div><div class="callout callout-tip"><div class="callout-header">&#9432; Wireshark-Display-Filter</div><p><code>http.request.method == "POST"</code> &ndash; Alle POST-Requests<br><code>tcp contains "password"</code> &ndash; Klartext-Passw&ouml;rter<br><code>dns.qry.name contains "cloud"</code> &ndash; Cloud-DNS-Queries<br><code>tcp.port == 22</code> &ndash; SSH-Verkehr<br><code>frame.time >= "2024-03-15 08:00:00"</code> &ndash; Zeitraum-Filter</p></div><div class="exercise-box"><div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">PCAP-Analyse</span></div><div class="exercise-body"><div class="exercise-goal"><div class="goal-label">Ziel</div><p>Netzwerkverkehr aufzeichnen und auf verd&auml;chtige Aktivit&auml;ten analysieren.</p></div><div class="exercise-steps"><ol class="numbered-list"><li>Zeichne 60 Sekunden Traffic auf: <code>tcpdump -i any -w test.pcap -c 10000</code></li><li>Zeige alle HTTP-Requests: <code>tshark -r test.pcap -Y "http.request"</code></li><li>Zeige die Top-5 Kommunikationspartner: <code>tshark -r test.pcap -q -z conv,ip</code></li><li>Filtere nach DNS-Queries und identifiziere verd&auml;chtige Domains</li><li>Dokumentiere alle Befunde in der Case-Mappe</li></ol></div><div class="toggle-container"><div class="toggle-header"><span class="toggle-label">Erwartetes Ergebnis</span><span class="toggle-arrow">&#9654;</span></div><div class="toggle-content"><p>Die Analyse sollte lokale Broadcasts, DNS-Queries an den Resolver und regul&auml;ren HTTPS-Verkehr zeigen. Achte auf unverschl&uuml;sseltes HTTP (Port 80) &ndash; dies kann Klartext-Credentials enthalten.</p></div></div></div></div><div class="callout callout-danger"><div class="callout-header">&#9888; Typische Fehler</div><ul><li><strong>Capture-Gr&ouml;&szlig;e untersch&auml;tzt:</strong> Voll-Dump kann in Minuten mehrere GB erreichen</li><li><strong>SSL/TLS ignoriert:</strong> Verschluuml;sselte Payloads sind nicht lesbar &ndash; SNI-Header aber schon</li><li><strong>Zeitstempel nicht synchronisiert:</strong> Ohne NTP-Sync sind Korrelationen unbrauchbar</li><li><strong>Nur PCAP, keine Logs:</strong> Immer BEIDES sichern (PCAP + System-Logs)</li></ul></div><button class="complete-section-btn" data-chapter="ch21-netzwerkforensik">&#9744; Kapitel als abgeschlossen markieren</button><div class="nav-buttons"><button class="nav-btn" data-target="ch20-memory-forensik">&#8592; Memory-Forensik</button><button class="nav-btn" data-target="ch22-zeitlinienanalyse">Zeitlinienanalyse &#8594;</button></div>
