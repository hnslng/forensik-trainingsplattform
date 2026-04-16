<h2 class="section-title"><span class="number">15.4</span> tshark &ndash; N&uuml;tzliche Befehle in der Praxis</h2><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Gespeicherte Datei lesen
tshark -r capture.pcap

# HTTP-Requests extrahieren (Host + URI)
tshark -r capture.pcap -Y "http.request" -T fields -e http.host -e http.request.uri

# DNS-Queries anzeigen
tshark -r capture.pcap -Y "dns.qry.name" -T fields -e dns.qry.name

# Top-Talker (wer kommuniziert am meisten?)
tshark -r capture.pcap -q -z conv,ip

# Nur DNS mitschneiden (Capture-Filter)
sudo tshark -i eth0 -f "port 53"

# Zusammenfassung anzeigen
tshark -r capture.pcap -q -z io,stat</code></pre></div><blockquote><p><strong>Tipp:</strong> Capture-Filter (<span class="inline-code">-f</span>) reduzieren die Datenmenge beim Mitschneiden. Display-Filter (<span class="inline-code">-Y</span>) filtern nachtr&auml;glich. F&uuml;r maximales Detail: Ohne Filter capturen, dann mit Display-Filter analysieren.</p></blockquote><div class="exercise-box"><div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Traffic-Analyse</span></div><div class="exercise-body"><div class="exercise-goal"><div class="goal-label">Ziel</div><p>Netzwerkverkehr mitschneiden, filtern und analysieren</p></div><div class="exercise-steps"><ol class="numbered-list"><li>Capture starten: <code>tshark -i eth0 -c 20</code> (20 Pakete)</li><li>Was f&uuml;r Protokolle siehst du? (TCP, UDP, DNS, ARP?)</li><li>Nur DNS mitschneiden: <code>tshark -i eth0 -f "port 53" -c 10</code></li><li>Lasse in einem anderen Terminal einen DNS-Lauf: <code>dig google.com</code></li><li>Capture in Datei: <code>tshark -i eth0 -w test.pcap -c 50</code></li><li>Datei lesen: <code>tshark -r test.pcap</code></li></ol></div><div class="toggle-container"><div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div><div class="toggle-content"><p>Im Capture siehst du eine Mischung aus TCP, UDP, DNS und ARP. Der DNS-Filter (port 53) zeigt nur DNS-Anfragen und -Antworten. Die PCAP-Datei kann sp&auml;ter mit tshark -r analysiert oder in Wireshark (GUI) ge&ouml;ffnet werden.</p></div></div></div></div><button class="complete-section-btn" data-chapter="ch15-wireshark">&#9744; Kapitel als abgeschlossen markieren</button><div class="nav-buttons"><button class="nav-btn" data-target="ch14-firewall">&#8592; Zur&uuml;ck</button><button class="nav-btn" data-target="ch16-casestudy">Weiter &#8594;</button></div>