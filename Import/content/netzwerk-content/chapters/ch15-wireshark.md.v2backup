# Wireshark &amp; tshark &ndash; Netzwerkverkehr sichtbar machen


<div class="chapter-subtitle">Jedes Paket unter die Lupe nehmen</div>

<p class="chapter-intro">Wireshark ist wie ein R&ouml;ntgenger&auml;t f&uuml;rs Netzwerk: Es zeigt jeden Datenverkehr in Echtzeit. Lerne Capture-Filter, Display-Filter und wie du DNS- und HTTP-Traffic analysierst.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kannst tshark starten, gezielt filtern und mitgeschnittenen Traffic analysieren.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128065;</div><div class="feature-text"><h3>Wireshark</h3><p>Grafische Analyse</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128270;</div><div class="feature-text"><h3>tshark</h3><p>CLI-Variante</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>Filter</h3><p>Capture &amp; Display</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>tshark capture</p></div></div></div>

## 14.1 Was ist Wireshark?

**Wireshark** ist der Standard für Netzwerkanalyse. Es zeigt jedes einzelne Paket, das über dein Netzwerk läuft &ndash; mit allen Headern, Flags und Inhalten.

**tshark** = Die Kommandozeilen-Version von Wireshark (ohne Grafik, perfekt für Server und Skripte).

**Was du damit machen kannst:**
- Troubleshooting: Warum kommt die Webseite nicht durch?
- Sicherheitsanalyse: Welche Verbindungen bestehen?
- Protokoll-Analyse: Wie sieht ein DNS-Request wirklich aus?
- Performance: Wo ist der Flaschenhals?

:::callout warning Rechtlicher Hinweis
Du darfst nur Traffic mitschneiden, für den du berechtigt bist! Auf fremden Netzwerken ohne Erlaubnis ist das **illegal** (StGB § 201). Auf deinem eigenen Heimnetzwerk ist es erlaubt.
:::

## 14.2 Capture starten &ndash; Verkehr mitschneiden

:::code bash
# Grafische Oberfläche (lokal)
sudo wireshark

# Kommandozeile: Interface eth0 mitschneiden
sudo tshark -i eth0

# Nur 100 Pakete aufzeichnen
sudo tshark -i eth0 -c 100

# In Datei speichern (später analysieren)
sudo tshark -i eth0 -w capture.pcap -c 500
:::

**PCAP** (Packet Capture) = Das Standard-Dateiformat für mitgeschnittenen Verkehr. Kann in Wireshark geöffnet werden.

## 14.3 Filter &ndash; Das Rauschen entfernen

Ohne Filter siehst du Tausende Pakete pro Minute. Filter helfen, nur das zu zeigen was relevant ist.

**Zwei Arten von Filtern:**

| Typ | Wann angewendet | Syntax | Beispiel |
|---|---|---|---|
| **Capture-Filter** (`-f`) | Beim Mitschneiden | BPF-Syntax | `port 53` |
| **Display-Filter** (`-Y`) | Nach dem Capture | Wireshark-Syntax | `dns` oder `tcp.port == 80` |

**Wichtige Display-Filter:**

| Filter | Zeigt |
|---|---|
| `tcp.port == 80` | Nur HTTP-Traffic |
| `ip.addr == 192.168.1.1` | Nur Traffic von/zu dieser IP |
| `dns` | Nur DNS-Anfragen und -Antworten |
| `http.request.method == "POST"` | Nur POST-Requests (z.B. Logins) |
| `tcp.flags.syn == 1` | Nur Verbindungsaufbau (SYN) |
| `arp` | Nur ARP-Anfragen |

**Kombinieren:** `ip.addr == 10.0.0.1 && tcp.port == 443` = Nur HTTPS-Traffic mit dieser IP

## 14.4 tshark &ndash; N&uuml;tzliche Befehle in der Praxis

:::code bash
# Gespeicherte Datei lesen
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
tshark -r capture.pcap -q -z io,stat
:::

> **Tipp:** Capture-Filter (`-f`) reduzieren die Datenmenge beim Mitschneiden. Display-Filter (`-Y`) filtern nachträglich. Für maximales Detail: Ohne Filter capturen, dann mit Display-Filter analysieren.

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
