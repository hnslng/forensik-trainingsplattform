---
icon: '&#128736;'
id: ch14-firewall
section: Infrastruktur
title: Firewall
---

<h1>Firewall-Grundlagen</h1>


<div class="chapter-subtitle">Wer darf rein, wer muss raus?</div>

<p class="chapter-intro">Eine Firewall ist wie ein T&uuml;rsteher f&uuml;r dein Netzwerk: Sie entscheidet, welche Verbindungen erlaubt werden und welche blockiert. Lerne die iptables-Regeln, die wichtigsten Ketten und warum die Reihenfolge &uuml;berlebenswichtig ist.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du verstehst wie Firewalls funktionieren, kannst iptables-Output lesen und einfache Regeln formulieren.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128737;</div><div class="feature-text"><h3>iptables</h3><p>Regeln setzen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128274;</div><div class="feature-text"><h3>Ketten</h3><p>INPUT, OUTPUT, FORWARD</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#9888;</div><div class="feature-text"><h3>Reihenfolge</h3><p>Entscheidend f&uuml;r Sicherheit</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>iptables -L, nmap</p></div></div></div>

<h2 class="section-title"><span class="number">13.1</span> Was ist eine Firewall?</h2>

Eine <strong>Firewall</strong> kontrolliert, welche Netzwerkverbindungen erlaubt oder blockiert werden. Stell dir einen Türsteher vor, der entscheidet: "Du darfst rein, du nicht."

<strong>Was eine Firewall kann:</strong>
- Bestimmte Ports öffnen oder schließen
- Verbindungen von bestimmten IPs blockieren
- Nur bestimmte Protokolle (TCP, UDP) durchlassen

<strong>Was eine Firewall NICHT kann:</strong>
- Viren erkennen (dafür brauchst du Antivirus)
- Verschlüsselten Verkehr analysieren (ohne Deep Packet Inspection)

<blockquote><p><strong>Grundregel:</strong> Alles blockieren, dann gezielt öffnen (Whitelist-Prinzip). Niemals alles offen lassen!</p></blockquote>

<h2 class="section-title"><span class="number">13.2</span> iptables &ndash; Das Standard-Tool</h2>

<strong>iptables</strong> ist das klassische Firewall-Tool unter Linux. Es arbeitet mit <strong>Ketten</strong> (Chains) und <strong>Regeln</strong> (Rules).

<strong>Die drei Hauptketten:</strong>

| Kette | Richtung | Erklärung | Beispiel |
|---|---|---|---|
| <strong>INPUT</strong> | Eingehend | Verbindungen, die an dein Gerät gerichtet sind | Web-Server auf Port 80 |
| <strong>OUTPUT</strong> | Ausgehend | Verbindungen, die von deinem Gerät starten | Browser greift auf Webseite zu |
| <strong>FORWARD</strong> | Weitergeleitet | Verbindungen, die durch deinen Rechner geroutet werden | Linux als Router |

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Alle Regeln anzeigen (detailiert)
sudo iptables -L -n -v

# SSH erlauben (Port 22) - WICHTIG: Erst SSH erlauben!
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# HTTP erlauben (Port 80)
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# HTTPS erlauben (Port 443)
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Alles andere blockieren (als LETZTE Regel!)
sudo iptables -A INPUT -j DROP</code></pre></div>

<strong>Die wichtigsten Parameter:</strong>

| Parameter | Bedeutung | Beispiel |
|---|---|---|
| <span class="inline-code">-A</span> | Regel am Ende anhängen | <span class="inline-code">-A INPUT</span> |
| <span class="inline-code">-I</span> | Regel vorne einfügen | <span class="inline-code">-I INPUT 1</span> (an Position 1) |
| <span class="inline-code">-D</span> | Regel löschen | <span class="inline-code">-D INPUT 1</span> |
| <span class="inline-code">-p</span> | Protokoll | <span class="inline-code">-p tcp</span> oder <span class="inline-code">-p udp</span> |
| <span class="inline-code">--dport</span> | Ziel-Port | <span class="inline-code">--dport 80</span> |
| <span class="inline-code">-s</span> | Quell-IP | <span class="inline-code">-s 192.168.1.0/24</span> |
| <span class="inline-code">-j</span> | Aktion | <span class="inline-code">ACCEPT</span>, <span class="inline-code">DROP</span>, <span class="inline-code">REJECT</span> |

<strong>ACCEPT vs DROP vs REJECT:</strong>
- <span class="inline-code">ACCEPT</span> = Verbindung erlauben
- <span class="inline-code">DROP</span> = Verbindung stillschweigend ignorieren (keine Antwort)
- <span class="inline-code">REJECT</span> = Verbindung ablehnen mit Fehlermeldung

<div class="callout callout-warning"><div class="callout-header">&#9888; Achtung &amp;ndash; Nicht aussperren!</div><p>Regeln werden <strong>von oben nach unten</strong> abgearbeitet. Die erste passende Regel gewinnt. Wenn du <span class="inline-code">DROP ALL</span> vor <span class="inline-code">ACCEPT SSH</span> setzt, bist du ausgesperrt! <strong>Immer zuerst ACCEPT für SSH, dann DROP.</strong></p></div>

<h2 class="section-title"><span class="number">13.3</span> nftables &ndash; Der Nachfolger</h2>

<strong>nftables</strong> ist der moderne Nachfolger von iptables (bessere Performance, sauberere Syntax). Die meisten aktuellen Distributionen nutzen es.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Regeln anzeigen
sudo nft list ruleset

# Status prüfen
sudo systemctl status nftables</code></pre></div>

Unter der Haube übersetzt Ubuntu iptables-Befehle oft automatisch in nftables. Die Konzepte bleiben gleich.

<h2 class="section-title"><span class="number">13.4</span> UFW &ndash; Einfache Firewall</h2>

<strong>UFW</strong> (Uncomplicated Firewall) ist eine Vereinfachung für iptables/nftables:

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># UFW aktivieren
sudo ufw enable

# SSH erlauben
sudo ufw allow ssh

# HTTP/HTTPS erlauben
sudo ufw allow http
sudo ufw allow https

# Status anzeigen
sudo ufw status verbose</code></pre></div>

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">Firewall-Analyse</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Firewall-Regeln lesen und offene Ports identifizieren</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Aktuelle Regeln anzeigen: <code>iptables -L -n -v</code></li>
<li>Welche Ketten gibt es? Welche Policy (ACCEPT/DROP)?</li>
<li>Wartende Ports: <code>ss -tlnp</code></li>
<li>Lokalen Port-Scan: <code>nmap localhost</code></li>
<li>Web-Server testen: <code>curl -I http://localhost</code></li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>iptables -L zeigt die drei Ketten INPUT, OUTPUT, FORWARD mit ihren Regeln. ss -tlnp zeigt, welche Programme auf welchen Ports lauschen. nmap localhost bestätigt die offenen Ports (z.B. 22=SSH, 80=HTTP). curl -I zeigt, ob der Web-Server antwortet.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch14-firewall">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch13-routing">&#8592; Zurück</button>
<button class="nav-btn" data-target="ch14-wireshark">Weiter &#8594;</button>
</div>

