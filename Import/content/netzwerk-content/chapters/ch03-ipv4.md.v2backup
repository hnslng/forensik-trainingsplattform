# IPv4 &ndash; Adressierung und Subnetting


<div class="chapter-subtitle">Die Hausnummern des Internets</div>

<p class="chapter-intro">IPv4-Adressen sind die Hausnummern des Internets. Jedes Ger&auml;t im Netz braucht eine &ndash; egal ob PC, Smartphone oder Drucker. Lerne wie sie aufgebaut sind, was Subnetzmasken bewirken und wie du Netze selbst aufteilst.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du verstehst den Aufbau von IPv4-Adressen, kennst CIDR-Notation und kannst einfache Subnetting-Aufgaben l&ouml;sen.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128203;</div><div class="feature-text"><h3>IPv4-Aufbau</h3><p>4 Oktetts verstehen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128200;</div><div class="feature-text"><h3>Subnetting</h3><p>Netze aufteilen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#127760;</div><div class="feature-text"><h3>CIDR</h3><p>/24, /26, /30</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>ip addr, ip route</p></div></div></div>

## 3.1 Was ist eine IP-Adresse?

**IP** (Internet Protocol) verwaltet Adressen im Netzwerk. Jedes Ger&auml;t braucht eine **IP-Adresse** &ndash; wie eine Hausnummer auf der Stra&szlige;.

Ohne IP-Adresse kein Netzwerk. Wenn dein Laptop "kein Internet" hat, ist oft die IP-Adresse das Problem.

**IPv4** (Internet Protocol Version 4) = **32 Bit**, aufgeteilt in 4 Gruppen (**Oktetts**):

:::code
192.168.1.100
 ^^^ ^^^ ^^^ ^^^
  1   2   3   4   = 4 Oktetts, je 0-255
:::

Jedes Oktett hat 8 Bit = 256 m&ouml;gliche Werte (0 bis 255). Insgesamt: 4,3 Milliarden Adressen &ndash; was heute nicht mehr genug ist (deshalb IPv6, Kapitel 4).

## 3.2 Aufbau einer IPv4-Adresse

Eine IP-Adresse besteht aus **zwei Teilen**:
- **Netzanteil:** Identifiziert das Netzwerk (wie die Postleitzahl)
- **Hostanteil:** Identifiziert das Ger&auml;t im Netz (wie die Hausnummer)

Die **Subnetzmaske** bestimmt, wo die Trennung liegt:

:::code
IP-Adresse:     192.168.1.100
Subnetzmaske:   255.255.255.0
                  ├── Netz ──┤ Host ┤
:::

Bei `/24` (oder 255.255.255.0): Die ersten 24 Bit sind das Netz, die letzten 8 Bit der Host. Das bedeutet: **254 Ger&auml;te** in diesem Netz.

> **Merke:** Die Subnetzmaske *ist* die Trennlinie. Alles was in der Maske 255 ist = Netz. Alles was 0 ist = Host.

## 3.3 Private Adressbereiche (RFC 1918)

Nicht alle IP-Adressen sind &ouml;ffentlich. **Private IP-Adressen** sind nur im lokalen Netz g&uuml;ltig und werden nicht im Internet geroutet. Dein Router &uuml;bersetzt sie per **NAT** (Network Address Translation) in eine &ouml;ffentliche Adresse.

| Privater Bereich | CIDR | Anzahl Adressen | Verwendung |
|---|---|---|---|
| 10.0.0.0 &ndash; 10.255.255.255 | /8 | 16,7 Millionen | Gro&szlige Firmen |
| 172.16.0.0 &ndash; 172.31.255.255 | /12 | 1 Million | Mittlere Netzwerke |
| 192.168.0.0 &ndash; 192.168.255.255 | /16 | 65.534 | **Heimnetzwerke** |

> Dein Heimnetzwerk nutzt fast sicher `192.168.x.x`. Der Router vergibt diese Adressen per DHCP (Kapitel 8).

**Sonder-Adressen:**
- `127.0.0.1` = Loopback (dein eigener Rechner, "localhost")
- `0.0.0.0` = Alle Interfaces / "keine Adresse"
- `255.255.255.255` = Broadcast an alle

## 3.4 CIDR &ndash; Kompakte Schreibweise

**CIDR** (Classless Inter-Domain Routing, sprich: "saider") = Die kompakte Schreibweise f&uuml;r Subnetzmasken. `/24` bedeutet: 24 von 32 Bits sind Netzanteil.

:::code
/24  →  255.255.255.0    →  254 Hosts  (Heimnetz)
/25  →  255.255.255.128  →  126 Hosts  (2 Subnetze)
/26  →  255.255.255.192  →   62 Hosts  (4 Subnetze)
/28  →  255.255.255.240  →   14 Hosts  (Management)
/30  →  255.255.255.252  →    2 Hosts  (Punkt-zu-Punkt)
:::

**Die Formel:** `Hosts = 2^H − 2` (H = Anzahl Host-Bits, −2 f&uuml;r Netz- und Broadcast-Adresse)

## 3.5 Subnetting &ndash; Netze aufteilen

**Subnetting** = Ein gro&szlig;es Netz in kleinere aufteilen. Warum? &Uuml;bersicht, Sicherheit, Effizienz.

| CIDR | Subnetzmaske | Hosts | Praxisbeispiel |
|---|---|---|---|
| /24 | 255.255.255.0 | 254 | Heimnetzwerk |
| /25 | 255.255.255.128 | 126 | Zwei Abteilungen |
| /26 | 255.255.255.192 | 62 | Vier kleine Netze |
| /27 | 255.255.255.224 | 30 | Server-Segment |
| /28 | 255.255.255.240 | 14 | Management-Netz |

### Subnetting-Beispiel: Schritt f&uuml;r Schritt

**Aufgabe:** Teile `192.168.1.0/24` in 4 gleich gro&szlige; Subnetze.

**Schritt 1:** Wie viele Bits brauche ich zus&auml;tzlich? 4 Subnetze = 2^2 → **2 Bits mehr**

**Schritt 2:** Neue Maske: /24 + 2 = **/26** (255.255.255.192)

**Schritt 3:** Subnetze berechnen:

:::code
Subnetz 1: 192.168.1.0/26    Hosts: .1 – .62     Broadcast: .63
Subnetz 2: 192.168.1.64/26   Hosts: .65 – .126    Broadcast: .127
Subnetz 3: 192.168.1.128/26  Hosts: .129 – .190   Broadcast: .191
Subnetz 4: 192.168.1.192/26  Hosts: .193 – .254   Broadcast: .255
:::

**Wichtig &ndash; drei besondere Adressen pro Subnetz:**
- **Netzwerk-Adresse** = Erste Adresse (identifiziert das Netz, kann kein Ger&auml;t haben)
- **Broadcast-Adresse** = Letzte Adresse (an alle Ger&auml;te im Subnetz gleichzeitig)
- **Host-Adressen** = Alles dazwischen (das sind deine nutzbaren IPs)

:::code bash
# Eigene IP und Subnetz anzeigen
ip addr show

# Routing-Tabelle (zeigt Netz-Größe)
ip route show
:::

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">IP-Adressierung analysieren</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>IP-Konfiguration lesen und Subnetting nachvollziehen</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Zeige deine IP-Adresse: <code>ip addr show</code></li>
<li>Welche IP? Welches Subnetz (/xx)?</li>
<li>Berechne: Wie viele Hosts sind in deinem Subnetz m&ouml;glich?</li>
<li>Zeige die Routing-Tabelle: <code>ip route show</code></li>
<li>Zeige die ARP-Tabelle: <code>ip neigh show</code></li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>Beispiel: 192.168.1.100/24 → Netz 192.168.1.0, Broadcast 192.168.1.255, Hosts .1 bis .254 = 254 m&ouml;gliche Hosts (2^8 − 2). Die Routing-Tabelle zeigt die default-Route &uuml;ber deinen Router. ip neigh zeigt MAC-Adressen von Ger&auml;ten im selben Subnetz.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch03-ipv4">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch02-geraete">&#8592; Zur&uuml;ck</button>
<button class="nav-btn" data-target="ch04-ipv6">Weiter &#8594;</button>
</div>
