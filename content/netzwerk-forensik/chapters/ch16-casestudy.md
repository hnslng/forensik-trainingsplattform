---
icon: '&#9888;'
id: ch16-casestudy
section: Abschluss
title: Fallstudie
---

<h1>Case Study: Netzwerk-Troubleshooting</h1>

<div class="callout callout-danger"><div class="callout-header">&#9888; Szenario</div><p>Du kommst ins Büro. Ein Kollege meldet: "Ich komme nicht ins Internet." Du bist als IT-Fahnder eingeteilt. Systematische Analyse gefragt.</p></div>


<div class="chapter-subtitle">Ein Netzwerk-Fall von A bis Z</div>
<p class="chapter-intro">Kollege meldet: "Internet geht nicht." Du als IT-Fahnder analysierst systematisch: IP pr&uuml;fen, Gateway testen, DNS checken, HTTP testen. Lerne den kompletten Troubleshooting-Workflow.</p>
<div class="callout callout-danger"><div class="callout-header">&#9888; Szenario</div><p>Du kommst ins B&uuml;ro. Ein Kollege meldet: "Ich komme nicht ins Internet." Systematische Analyse gefragt.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#127919;</div><div class="feature-text"><h3>Szenario</h3><p>Internet geht nicht</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128270;</div><div class="feature-text"><h3>Systematisch</h3><p>Schritt f&uuml;r Schritt</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128196;</div><div class="feature-text"><h3>Dokumentation</h3><p>Jeden Schritt festhalten</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>Kompletter Workflow</p></div></div></div>

<h2 class="section-title"><span class="number">15.1</span> Phase 1: Ersteinsch&auml;tzung</h2>

Bevor du &uuml;berhaupt etwas tust: <strong>Durchatmen, systematisch vorgehen.</strong> Nicht raten &ndash; messen. Erstmal ein Bild der Lage verschaffen:

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Was ist mein Netzwerk?
ip addr show
ip route show

# Ist der Gateway erreichbar?
ping -c 2 192.168.1.1

# Komme ich raus?
ping -c 2 8.8.8.8

# Funktioniert DNS?
ping -c 2 google.com</code></pre></div>

<h2 class="section-title"><span class="number">15.2</span> Phase 2: Differenzialdiagnose</h2>

Je nachdem, wo der Ping fehlschl&auml;gt, wei&szlig;t du wo du weiter suchen musst:

| Test schlägt fehl | Problem | Nächster Schritt |
|---|---|---|
| Gateway nicht erreichbar | Lokales Netz | Kabel, Switch, WLAN prüfen |
| 8.8.8.8 nicht erreichbar | Internet/Provider | Provider kontaktieren |
| google.com nicht erreichbar | DNS | DNS-Server prüfen, <span class="inline-code">dig</span> testen |
| Alles erreichbar | Anwendungsproblem | Proxy, Firewall, Browser |

<h2 class="section-title"><span class="number">15.3</span> Phase 3: DNS-Probleme</h2>

Wenn Step 4 (ping IP) klappt aber Step 5 (ping Name) nicht &rarr; <strong>DNS-Problem.</strong> Der h&auml;ufigste Fehler nach dem Internet-Ausfall.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># DNS-Config prüfen
cat /etc/resolv.conf

# Anderen DNS testen
dig @8.8.8.8 google.com

# DNS-Cache leeren
sudo systemd-resolve --flush-caches</code></pre></div>

<h2 class="section-title"><span class="number">15.4</span> Phase 4: Verbindungsanalyse</h2>

Wenn die Basics alle funktionieren aber die Anwendung trotzdem nicht &rarr; Details analysieren:

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Aktive Verbindungen
ss -tunap

# Weg zum Ziel
traceroute 8.8.8.8

# HTTP-Test
curl -I https://google.com

# ARP-Tabelle
ip neigh show

# Offene Ports auf dem betroffenen Rechner
ss -tlnp</code></pre></div>

<h2 class="section-title"><span class="number">15.5</span> Phase 5: Dokumentation</h2>

Jeder Befund wird dokumentiert &ndash; <strong>immer</strong>. Sp&auml;ter willst du wissen was du gemacht hast.

| Feld | Beispiel |
|---|---|
| <strong>Uhrzeit</strong> | 10:35 CET |
| <strong>Betroffenes System</strong> | PC-Buchhaltung (192.168.1.45) |
| <strong>Symptom</strong> | Kein Internetzugang |
| <strong>Test 1</strong> | ping Gateway: OK |
| <strong>Test 2</strong> | ping 8.8.8.8: OK |
| <strong>Test 3</strong> | ping google.com: FAIL → DNS-Problem |
| <strong>Lösung</strong> | DNS-Server auf 8.8.8.8 geändert |
| <strong>Ergebnis</strong> | Behoben um 10:42 |



<h2 class="section-title">Quick Reference – Befehls-Cheatsheet</h2>

| Befehl | Funktion |
|---|---|
| <span class="inline-code">ip a</span> | IP-Adressen |
| <span class="inline-code">ip route</span> | Routing |
| <span class="inline-code">ip neigh</span> | ARP-Tabelle |
| <span class="inline-code">ping Ziel</span> | Erreichbarkeit |
| <span class="inline-code">traceroute Ziel</span> | Weg zeigen |
| <span class="inline-code">dig domain</span> | DNS abfragen |
| <span class="inline-code">ss -tunap</span> | Verbindungen |
| <span class="inline-code">nmap Ziel</span> | Portscan |
| <span class="inline-code">curl -I URL</span> | HTTP-Header |
| <span class="inline-code">tshark -i eth0</span> | Traffic mitschneiden |

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">Komplettes Troubleshooting</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Einen Netzwerk-Fall systematisch analysieren</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>IP prüfen: <code>ip addr show</code></li>
<li>Gateway prüfen: <code>ping -c 2 192.168.1.1</code></li>
<li>Internet prüfen: <code>ping -c 2 8.8.8.8</code></li>
<li>DNS prüfen: <code>dig google.com</code></li>
<li>HTTP testen: <code>curl -I https://google.com</code></li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>Loopback → IP → Gateway → Internet → DNS → HTTP. Problem liegt dort wo der erste Test fehlschlägt.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch16-casestudy">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch15-wireshark">&#8592; Zurück</button>
<button class="nav-btn" data-target="welcome">Willkommen &#8594;</button>
</div>

