---
icon: '&#128202;'
id: ch15-wireshark
section: Analyse
title: Wireshark & Paketanalyse
---

<h1>Wireshark &amp; tshark &ndash; Netzwerkverkehr sichtbar machen</h1>


<div class="chapter-subtitle">Jedes Paket unter die Lupe nehmen</div>

<p class="chapter-intro">Wireshark ist wie ein R&ouml;ntgenger&auml;t f&uuml;rs Netzwerk: Es zeigt jeden Datenverkehr in Echtzeit. Lerne Capture-Filter, Display-Filter und wie du DNS- und HTTP-Traffic analysierst.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kannst tshark starten, gezielt filtern und mitgeschnittenen Traffic analysieren.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128065;</div><div class="feature-text"><h3>Wireshark</h3><p>Grafische Analyse</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128270;</div><div class="feature-text"><h3>tshark</h3><p>CLI-Variante</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>Filter</h3><p>Capture &amp; Display</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>tshark capture</p></div></div></div>

<h2 class="section-title"><span class="number">14.1</span> Was ist Wireshark?</h2>

<strong>Wireshark</strong> ist der Standard für Netzwerkanalyse. Es zeigt jedes einzelne Paket, das über dein Netzwerk läuft &ndash; mit allen Headern, Flags und Inhalten.

<strong>tshark</strong> = Die Kommandozeilen-Version von Wireshark (ohne Grafik, perfekt für Server und Skripte).

<strong>Was du damit machen kannst:</strong>
- Troubleshooting: Warum kommt die Webseite nicht durch?
- Sicherheitsanalyse: Welche Verbindungen bestehen?
- Protokoll-Analyse: Wie sieht ein DNS-Request wirklich aus?
- Performance: Wo ist der Flaschenhals?

<div class="callout callout-warning"><div class="callout-header">&#9888; Rechtlicher Hinweis</div><p>Du darfst nur Traffic mitschneiden, für den du berechtigt bist! Auf fremden Netzwerken ohne Erlaubnis ist das <strong>illegal</strong> (StGB § 201). Auf deinem eigenen Heimnetzwerk ist es erlaubt.</p></div>

<h2 class="section-title"><span class="number">14.2</span> Capture starten &ndash; Verkehr mitschneiden</h2>

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Grafische Oberfläche (lokal)
sudo wireshark

# Kommandozeile: Interface eth0 mitschneiden
sudo tshark -i eth0

# Nur 100 Pakete aufzeichnen
sudo tshark -i eth0 -c 100

# In Datei speichern (später analysieren)
sudo tshark -i eth0 -w capture.pcap -c 500</code></pre></div>

<strong>PCAP</strong> (Packet Capture) = Das Standard-Dateiformat für mitgeschnittenen Verkehr. Kann in Wireshark geöffnet werden.

<h2 class="section-title"><span class="number">14.3</span> Filter &ndash; Das Rauschen entfernen</h2>

Ohne Filter siehst du Tausende Pakete pro Minute. Filter helfen, nur das zu zeigen was relevant ist.

<strong>Zwei Arten von Filtern:</strong>

| Typ | Wann angewendet | Syntax | Beispiel |
|---|---|---|---|
| <strong>Capture-Filter</strong> (<span class="inline-code">-f</span>) | Beim Mitschneiden | BPF-Syntax | <span class="inline-code">port 53</span> |
| <strong>Display-Filter</strong> (<span class="inline-code">-Y</span>) | Nach dem Capture | Wireshark-Syntax | <span class="inline-code">dns</span> oder <span class="inline-code">tcp.port == 80</span> |

<strong>Wichtige Display-Filter:</strong>

| Filter | Zeigt |
|---|---|
| <span class="inline-code">tcp.port == 80</span> | Nur HTTP-Traffic |
| <span class="inline-code">ip.addr == 192.168.1.1</span> | Nur Traffic von/zu dieser IP |
| <span class="inline-code">dns</span> | Nur DNS-Anfragen und -Antworten |
| <span class="inline-code">http.request.method == "POST"</span> | Nur POST-Requests (z.B. Logins) |
| <span class="inline-code">tcp.flags.syn == 1</span> | Nur Verbindungsaufbau (SYN) |
| <span class="inline-code">arp</span> | Nur ARP-Anfragen |

<strong>Kombinieren:</strong> <span class="inline-code">ip.addr == 10.0.0.1 && tcp.port == 443</span> = Nur HTTPS-Traffic mit dieser IP

<h2 class="section-title"><span class="number">14.4</span> tshark &ndash; N&uuml;tzliche Befehle in der Praxis</h2>

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Gespeicherte Datei lesen
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
tshark -r capture.pcap -q -z io,stat</code></pre></div>

<blockquote><p><strong>Tipp:</strong> Capture-Filter (<span class="inline-code">-f</span>) reduzieren die Datenmenge beim Mitschneiden. Display-Filter (<span class="inline-code">-Y</span>) filtern nachträglich. Für maximales Detail: Ohne Filter capturen, dann mit Display-Filter analysieren.</p></blockquote>

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">Traffic-Analyse</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Netzwerkverkehr mitschneiden, filtern und analysieren</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Capture starten: <code>tshark -i eth0 -c 20</code> (20 Pakete)</li>
<li>Was für Protokolle siehst du? (TCP, UDP, DNS, ARP?)</li>
<li>Nur DNS mitschneiden: <code>tshark -i eth0 -f "port 53" -c 10</code></li>
<li>Lasse in einem anderen Terminal einen DNS-Lauf: <code>dig google.com</code></li>
<li>Capture in Datei: <code>tshark -i eth0 -w test.pcap -c 50</code></li>
<li>Datei lesen: <code>tshark -r test.pcap</code></li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>Im Capture siehst du eine Mischung aus TCP, UDP, DNS und ARP. Der DNS-Filter (port 53) zeigt nur DNS-Anfragen und -Antworten. Die PCAP-Datei kann später mit tshark -r analysiert oder in Wireshark (GUI) geöffnet werden.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch15-wireshark">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch14-firewall">&#8592; Zurück</button>
<button class="nav-btn" data-target="ch15-casestudy">Weiter &#8594;</button>
</div>

