# ICMP &amp; Troubleshooting &ndash; Probleme finden


<div class="chapter-subtitle">Wenn das Internet nicht geht &ndash; systematisch finden</div>

<p class="chapter-intro">"Internet geht nicht" &ndash; der Klassiker. ICMP-Tools wie <code>ping</code> und <code>traceroute</code> helfen dir, das Problem systematisch einzugrenzen. Von innen nach au&szlig;en, Schritt f&uuml;r Schritt.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kannst Netzwerkprobleme systematisch eingrenzen &ndash; vom eigenen Rechner bis zum Internet. Du kennst ping, traceroute und mtr.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128172;</div><div class="feature-text"><h3>ICMP</h3><p>Ping &amp; Fehlermeldungen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128674;</div><div class="feature-text"><h3>ping</h3><p>Erreichbarkeit testen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128506;</div><div class="feature-text"><h3>traceroute</h3><p>Den Weg zeigen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>Troubleshooting-Pfad</p></div></div></div>

## 10.1 Was ist ICMP?

**ICMP** (Internet Control Message Protocol) = Ein Hilfsprotokoll für Diagnose und Fehlermeldungen. Es überträgt keine Anwendungsdaten (keine Webseiten, keine E-Mails) &ndash; nur Statusinformationen.

**Was ICMP macht:**
- "Host nicht erreichbar" &ndash; wenn ein Ziel nicht antwortet
- "Zeit überschritten" &ndash; wenn ein Paket zu viele Router passiert hat (TTL=0)
- "Umleitung" &ndash; wenn ein besserer Router existiert

> **Merke:** `ping` nutzt ICMP. Viele Firewalls blockieren ICMP &ndash; deshalb kann ein fehlgeschlagener Ping bedeuten: "Host nicht erreichbar" ODER "Firewall blockiert ICMP".

## 10.2 ping &ndash; Erreichbarkeit testen

**ping** sendet ICMP Echo-Request-Pakete und wartet auf Echo-Reply. Wie ein "Bist du da?" &ndash; "Ja, bin da!"

:::code bash
ping -c 4 8.8.8.8          # Genau 4 Pings senden (-c = count)
ping -i 0.5 8.8.8.8        # Alle 0,5 Sekunden (-i = interval)
ping -c 1 google.com        # DNS-Namen funktionieren auch
:::

**Die Ausgabe verstehen:**
:::code
64 bytes from 8.8.8.8: icmp_seq=1 ttl=115 time=12.3 ms
:::

| Feld | Bedeutung |
|---|---|
| `64 bytes` | Größe des Antwortpakets |
| `icmp_seq=1` | Sequenznummer (zählt hoch) |
| `ttl=115` | Time To Live &ndash; maximale verbleibende Router-Hops |
| `time=12.3 ms` | Round-Trip-Time (Hin + Rückweg) |

> **TTL** startet meist bei 64 oder 128 und wird von jedem Router um 1 verringert. Bei 0 wird das Paket verworfen. So verhindert das Netz Endlosschleifen.

## 10.3 traceroute &ndash; Den Weg zeigen

**traceroute** zeigt jeden Router (**Hop**) auf dem Weg zum Ziel. So siehst du genau, wo eine Verbindung hakt.

:::code bash
traceroute 8.8.8.8          # Standard-Traceroute
traceroute -n 8.8.8.8       # Ohne DNS-Auflösung (schneller)
:::

**Noch besser: mtr** = traceroute + ping live kombiniert:
:::code bash
mtr -n 8.8.8.8              # Läuft dauerhaft, zeigt Live-Statistik
:::

**Hop** = Ein Sprung von einem Router zum nächsten. Wenn ein Hop `* * *` zeigt, antwortet dieser Router nicht (kann normal sein).

## 10.4 Der Troubleshooting-Pfad

Wenn "das Internet nicht geht" &ndash; nicht raten, sondern **systematisch von innen nach außen** testen:

:::code bash
1. ping 127.0.0.1             → Mein TCP/IP-Stack funktioniert?
2. ping [eigene IP]           → Meine Netzwerkkarte funktioniert?
3. ping 192.168.1.1           → Mein Gateway (Router) erreichbar?
4. ping 8.8.8.8               → Komme ich ins Internet? (IP-Test)
5. ping google.com            → Funktioniert DNS? (Namen-Test)
6. traceroute 8.8.8.8         → Wo genau bleibt das Paket hängen?
:::

**Auswertung:**

| Schritt fehlschlägt | Problem | Lösung |
|---|---|---|
| Schritt 1 | Netzwerk-Stack defekt | `sudo systemctl restart networking` |
| Schritt 2 | Netzwerkkarte / Treiber | Kabel prüfen, `ip link set eth0 up` |
| Schritt 3 | Kein Gateway | DHCP prüfen, statische Route setzen |
| Schritt 4 | Kein Internet | Provider-Problem, Router-Neustart |
| Schritt 5 | DNS kaputt | DNS-Server ändern (8.8.8.8) |

**Gateway** = Der Router, der dein lokales Netz mit dem Internet verbindet. Meist `192.168.1.1` oder `192.168.178.1` (FritzBox).

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">Troubleshooting-Pfad</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Den kompletten Troubleshooting-Pfad durchlaufen und interpretieren</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Teste Loopback: <code>ping -c 2 127.0.0.1</code></li>
<li>Teste eigenes Interface: <code>ping -c 2 192.168.1.100</code></li>
<li>Teste Gateway: <code>ping -c 2 192.168.1.1</code></li>
<li>Teste Internet: <code>ping -c 2 8.8.8.8</code></li>
<li>Teste DNS: <code>ping -c 2 google.com</code></li>
<li>Zeige den Weg: <code>traceroute 8.8.8.8</code></li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>Alle 5 Pings sollten erfolgreich sein. Der Troubleshooting-Pfad geht von innen (127.0.0.1) nach außen (google.com). Wenn Schritt 3 (Gateway) fehlschlägt aber 1+2 OK sind → lokales Netz-Problem. Wenn 4 OK aber 5 nicht → DNS-Problem. traceroute zeigt dir die Route mit Latenz pro Hop.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch11-icmp">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch10-verschluesselung">&#8592; Zurück</button>
<button class="nav-btn" data-target="ch12-linux-tools">Weiter &#8594;</button>
</div>
