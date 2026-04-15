<h2 class="section-title"><span class="number">21.2</span> PCAP-Analyse mit tshark</h2><p>tshark bietet m&auml;chtige Filter und Statistikfunktionen zur Analyse von Paketmitschnitten.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Grundlegende Statistik
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
tshark -r capture.pcap -Y "ftp" -T fields -e ftp.request.command -e ftp.request.arg</code></pre></div>
