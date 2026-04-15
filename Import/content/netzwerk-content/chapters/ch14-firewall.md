# Firewall-Grundlagen


<div class="chapter-subtitle">Wer darf rein, wer muss raus?</div>

<p class="chapter-intro">Eine Firewall ist wie ein T&uuml;rsteher f&uuml;r dein Netzwerk: Sie entscheidet, welche Verbindungen erlaubt werden und welche blockiert. Lerne die iptables-Regeln, die wichtigsten Ketten und warum die Reihenfolge &uuml;berlebenswichtig ist.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du verstehst wie Firewalls funktionieren, kannst iptables-Output lesen und einfache Regeln formulieren.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128737;</div><div class="feature-text"><h3>iptables</h3><p>Regeln setzen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128274;</div><div class="feature-text"><h3>Ketten</h3><p>INPUT, OUTPUT, FORWARD</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#9888;</div><div class="feature-text"><h3>Reihenfolge</h3><p>Entscheidend f&uuml;r Sicherheit</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>iptables -L, nmap</p></div></div></div>

## 13.1 Was ist eine Firewall?

Eine **Firewall** kontrolliert, welche Netzwerkverbindungen erlaubt oder blockiert werden. Stell dir einen Türsteher vor, der entscheidet: "Du darfst rein, du nicht."

**Was eine Firewall kann:**
- Bestimmte Ports öffnen oder schließen
- Verbindungen von bestimmten IPs blockieren
- Nur bestimmte Protokolle (TCP, UDP) durchlassen

**Was eine Firewall NICHT kann:**
- Viren erkennen (dafür brauchst du Antivirus)
- Verschlüsselten Verkehr analysieren (ohne Deep Packet Inspection)

> **Grundregel:** Alles blockieren, dann gezielt öffnen (Whitelist-Prinzip). Niemals alles offen lassen!

## 13.2 iptables &ndash; Das Standard-Tool

**iptables** ist das klassische Firewall-Tool unter Linux. Es arbeitet mit **Ketten** (Chains) und **Regeln** (Rules).

**Die drei Hauptketten:**

| Kette | Richtung | Erklärung | Beispiel |
|---|---|---|---|
| **INPUT** | Eingehend | Verbindungen, die an dein Gerät gerichtet sind | Web-Server auf Port 80 |
| **OUTPUT** | Ausgehend | Verbindungen, die von deinem Gerät starten | Browser greift auf Webseite zu |
| **FORWARD** | Weitergeleitet | Verbindungen, die durch deinen Rechner geroutet werden | Linux als Router |

:::code bash
# Alle Regeln anzeigen (detailiert)
sudo iptables -L -n -v

# SSH erlauben (Port 22) - WICHTIG: Erst SSH erlauben!
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# HTTP erlauben (Port 80)
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# HTTPS erlauben (Port 443)
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Alles andere blockieren (als LETZTE Regel!)
sudo iptables -A INPUT -j DROP
:::

**Die wichtigsten Parameter:**

| Parameter | Bedeutung | Beispiel |
|---|---|---|
| `-A` | Regel am Ende anhängen | `-A INPUT` |
| `-I` | Regel vorne einfügen | `-I INPUT 1` (an Position 1) |
| `-D` | Regel löschen | `-D INPUT 1` |
| `-p` | Protokoll | `-p tcp` oder `-p udp` |
| `--dport` | Ziel-Port | `--dport 80` |
| `-s` | Quell-IP | `-s 192.168.1.0/24` |
| `-j` | Aktion | `ACCEPT`, `DROP`, `REJECT` |

**ACCEPT vs DROP vs REJECT:**
- `ACCEPT` = Verbindung erlauben
- `DROP` = Verbindung stillschweigend ignorieren (keine Antwort)
- `REJECT` = Verbindung ablehnen mit Fehlermeldung

:::callout warning Achtung &ndash; Nicht aussperren!
Regeln werden **von oben nach unten** abgearbeitet. Die erste passende Regel gewinnt. Wenn du `DROP ALL` vor `ACCEPT SSH` setzt, bist du ausgesperrt! **Immer zuerst ACCEPT für SSH, dann DROP.**
:::

## 13.3 nftables &ndash; Der Nachfolger

**nftables** ist der moderne Nachfolger von iptables (bessere Performance, sauberere Syntax). Die meisten aktuellen Distributionen nutzen es.

:::code bash
# Regeln anzeigen
sudo nft list ruleset

# Status prüfen
sudo systemctl status nftables
:::

Unter der Haube übersetzt Ubuntu iptables-Befehle oft automatisch in nftables. Die Konzepte bleiben gleich.

## 13.4 UFW &ndash; Einfache Firewall

**UFW** (Uncomplicated Firewall) ist eine Vereinfachung für iptables/nftables:

:::code bash
# UFW aktivieren
sudo ufw enable

# SSH erlauben
sudo ufw allow ssh

# HTTP/HTTPS erlauben
sudo ufw allow http
sudo ufw allow https

# Status anzeigen
sudo ufw status verbose
:::

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
