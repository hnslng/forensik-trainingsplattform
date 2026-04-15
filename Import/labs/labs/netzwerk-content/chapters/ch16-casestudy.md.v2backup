# Case Study: Netzwerk-Troubleshooting

:::callout danger Szenario
Du kommst ins Büro. Ein Kollege meldet: "Ich komme nicht ins Internet." Du bist als IT-Fahnder eingeteilt. Systematische Analyse gefragt.
:::


<div class="chapter-subtitle">Ein Netzwerk-Fall von A bis Z</div>
<p class="chapter-intro">Kollege meldet: "Internet geht nicht." Du als IT-Fahnder analysierst systematisch: IP pr&uuml;fen, Gateway testen, DNS checken, HTTP testen. Lerne den kompletten Troubleshooting-Workflow.</p>
<div class="callout callout-danger"><div class="callout-header">&#9888; Szenario</div><p>Du kommst ins B&uuml;ro. Ein Kollege meldet: "Ich komme nicht ins Internet." Systematische Analyse gefragt.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#127919;</div><div class="feature-text"><h3>Szenario</h3><p>Internet geht nicht</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128270;</div><div class="feature-text"><h3>Systematisch</h3><p>Schritt f&uuml;r Schritt</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128196;</div><div class="feature-text"><h3>Dokumentation</h3><p>Jeden Schritt festhalten</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>Kompletter Workflow</p></div></div></div>

## 15.1 Phase 1: Ersteinsch&auml;tzung

Bevor du &uuml;berhaupt etwas tust: **Durchatmen, systematisch vorgehen.** Nicht raten &ndash; messen. Erstmal ein Bild der Lage verschaffen:

:::code bash
# Was ist mein Netzwerk?
ip addr show
ip route show

# Ist der Gateway erreichbar?
ping -c 2 192.168.1.1

# Komme ich raus?
ping -c 2 8.8.8.8

# Funktioniert DNS?
ping -c 2 google.com
:::

## 15.2 Phase 2: Differenzialdiagnose

Je nachdem, wo der Ping fehlschl&auml;gt, wei&szlig;t du wo du weiter suchen musst:

| Test schlägt fehl | Problem | Nächster Schritt |
|---|---|---|
| Gateway nicht erreichbar | Lokales Netz | Kabel, Switch, WLAN prüfen |
| 8.8.8.8 nicht erreichbar | Internet/Provider | Provider kontaktieren |
| google.com nicht erreichbar | DNS | DNS-Server prüfen, `dig` testen |
| Alles erreichbar | Anwendungsproblem | Proxy, Firewall, Browser |

## 15.3 Phase 3: DNS-Probleme

Wenn Step 4 (ping IP) klappt aber Step 5 (ping Name) nicht &rarr; **DNS-Problem.** Der h&auml;ufigste Fehler nach dem Internet-Ausfall.

:::code bash
# DNS-Config prüfen
cat /etc/resolv.conf

# Anderen DNS testen
dig @8.8.8.8 google.com

# DNS-Cache leeren
sudo systemd-resolve --flush-caches
:::

## 15.4 Phase 4: Verbindungsanalyse

Wenn die Basics alle funktionieren aber die Anwendung trotzdem nicht &rarr; Details analysieren:

:::code bash
# Aktive Verbindungen
ss -tunap

# Weg zum Ziel
traceroute 8.8.8.8

# HTTP-Test
curl -I https://google.com

# ARP-Tabelle
ip neigh show

# Offene Ports auf dem betroffenen Rechner
ss -tlnp
:::

## 15.5 Phase 5: Dokumentation

Jeder Befund wird dokumentiert &ndash; **immer**. Sp&auml;ter willst du wissen was du gemacht hast.

| Feld | Beispiel |
|---|---|
| **Uhrzeit** | 10:35 CET |
| **Betroffenes System** | PC-Buchhaltung (192.168.1.45) |
| **Symptom** | Kein Internetzugang |
| **Test 1** | ping Gateway: OK |
| **Test 2** | ping 8.8.8.8: OK |
| **Test 3** | ping google.com: FAIL → DNS-Problem |
| **Lösung** | DNS-Server auf 8.8.8.8 geändert |
| **Ergebnis** | Behoben um 10:42 |



## Quick Reference – Befehls-Cheatsheet

| Befehl | Funktion |
|---|---|
| `ip a` | IP-Adressen |
| `ip route` | Routing |
| `ip neigh` | ARP-Tabelle |
| `ping Ziel` | Erreichbarkeit |
| `traceroute Ziel` | Weg zeigen |
| `dig domain` | DNS abfragen |
| `ss -tunap` | Verbindungen |
| `nmap Ziel` | Portscan |
| `curl -I URL` | HTTP-Header |
| `tshark -i eth0` | Traffic mitschneiden |

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
