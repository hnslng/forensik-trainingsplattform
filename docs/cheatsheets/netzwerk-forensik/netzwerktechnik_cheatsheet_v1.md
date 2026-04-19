# Netzwerktechnik-Cheatsheet – Grundlagen, Protokolle und Tools

**Autor:** Hannes Lang  
**Ziel:** Netzwerkgrundlagen verstehen, Tools anwenden, Probleme analysieren  
**Niveau:** Einsteiger – keine Vorkenntnisse nötig  
**System:** Linux (Kali, Debian, Ubuntu)  
**Version:** 1.1

---

# Einleitung

Dieses Dokument ist ein Nachschlagewerk für Netzwerkgrundlagen. Es setzt keine Vorkenntnisse voraus. Jeder Fachbegriff und jede Abkürzung wird beim ersten Auftreten erklärt.

**Wie dieses Dokument aufgebaut ist:**
- **Fachbegriffe** werden immer zuerst erklärt, dann verwendet
- **Abkürzungen** werden beim ersten Mal ausgeschrieben: `DNS (Domain Name System)`
- **Befehle** stehen in grauen Code-Boxen mit Erklärung jedes Parameters
- **Übungen** am Ende zum Ausprobieren

---

## Inhaltsverzeichnis

| # | Kapitel | Thema |
|---|---|---|
| 1 | Netzwerkmodelle | OSI & TCP/IP |
| 2 | Netzwerkgeräte | Hubs, Switches, Router, VLANs |
| 3 | IPv4 | Adressierung und Subnetting |
| 4 | IPv6 | Die nächste Generation |
| 5 | MAC-Adressen | ARP (Address Resolution Protocol) |
| 6 | TCP und UDP | Daten zuverlässig oder schnell transportieren |
| 7 | DNS | Namensauflösung |
| 8 | DHCP | Automatische Adressvergabe |
| 9 | HTTP und HTTPS | Das Web |
| 10 | ICMP | Troubleshooting – Probleme finden |
| 11 | Linux-Netzwerk-Tools | ip, ss, nmap, curl, wget |
| 12 | Routing und Gateway | Daten auf die richtige Route schicken |
| 13 | Firewall-Grundlagen | iptables und nftables |
| 14 | Wireshark | Netzwerkverkehr sichtbar machen |
| 15 | Case Study | Netzwerk-Troubleshooting |
| 16 | Cheatsheet | Kompaktes Befehls-Cheatsheet (1 Seite) |
| 17 | Übungen | Zum Ausprobieren |

---

# 1. Netzwerkmodelle (OSI & TCP/IP)

## 1.1 Was ist ein Netzwerkmodell?

## 1.2 OSI-Modell (Open Systems Interconnection)

Das **OSI-Modell** (Open Systems Interconnection) hat **7 Schichten**. Es ist vor allem ein Lernmodell – in der Praxis wird eher das TCP/IP-Modell verwendet. Aber es hilft enorm zu verstehen, was wo passiert.

Ein Netzwerkmodell beschreibt, wie Daten von einem Gerät zum anderen gelangen. Es teilt den gesamten Prozess in **Schichten** (englisch: *Layers*) auf – wie eine Fabrik, in der jede Abteilung eine bestimmte Aufgabe hat.

| Schicht | Name | Was passiert hier | Beispiele |
|---|---|---|---|
| 7 | **Application** (Anwendung) | Programme, die der Nutzer sieht | Webbrowser, E-Mail-Programm |
| 6 | **Presentation** (Darstellung) | Daten umformatieren, verschlüsseln | Verschlüsselung, Zeichencodierung |
| 5 | **Session** (Sitzung) | Verbindung zwischen zwei Programmen aufbauen und halten | Login-Sitzung |
| 4 | **Transport** (Transport) | Daten korrekt und vollständig übertragen | TCP, UDP (siehe Kapitel 6) |
| 3 | **Network** (Vermittlung) | Den Weg durchs Netz finden (Routing) | IP-Adressen |
| 2 | **Data Link** (Sicherung) | Daten im lokalen Netz zustellen | Ethernet, WLAN |
| 1 | **Physical** (Bitübertragung) | Physikalische Signale auf dem Kabel oder Funk | Kabel, Signale |

**Eselsbrücke (von unten nach oben):** **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way

**Beispiel:** Du öffnest eine Webseite (Schicht 7). Die Daten werden verschlüsselt (Schicht 6). Eine Sitzung wird aufgebaut (Schicht 5). TCP stellt sicher, dass alles ankommt (Schicht 4). IP-Adressen sorgen für den richtigen Weg (Schicht 3). Ethernet liefert es im lokalen Netz (Schicht 2). Am Ende werden Bits über das Kabel geschickt (Schicht 1).

## 1.3 TCP/IP-Modell

Das TCP/IP-Modell hat **4 Schichten** und ist das Modell, das im echten Internet verwendet wird. Es ist einfacher als OSI.

| Schicht | Name | Entspricht OSI-Schichten |
|---|---|---|
| 4 | **Application** (Anwendung) | OSI 5 + 6 + 7 |
| 3 | **Transport** | OSI 4 |
| 2 | **Internet** | OSI 3 |
| 1 | **Network Access** (Netzzugang) | OSI 1 + 2 |

**Für die Praxis:** Wenn jemand sagt "Das ist ein Schicht-3-Problem", meint er das OSI-Modell (also IP/Routing). "Schicht-7" bedeutet das Programm selbst.

## 1.4 Datenkapselung (Encapsulation)

Stell dir vor, du schickst einen Brief:
1. Du schreibst den Brief (Daten)
2. Du steckst ihn in einen Umschlag mit Name (TCP-Header)
3. Du schreibst die Adresse drauf (IP-Header)
4. Der Postbote braucht die Hausnummer (MAC-Adresse)
5. Der Brief wird physisch zugestellt

So ähnlich funktioniert Datenkapselung:

```
Anwendungsdaten (z.B. Webseite)
  → TCP/UDP-Header wird davor gepackt = Segment
    → IP-Header wird davor gepackt = Paket
      → MAC-Header wird davor gepackt = Frame
        → Bits auf dem Kabel
```

Jede Schicht fügt ihren eigenen "Umschlag" (Header) hinzu. Der Empfänger packt sie Schicht für Schicht wieder aus.

---

# 2. Netzwerkgeräte – Hubs, Switches, Router und VLANs

## 2.1 Hub, Switch und Router – Die drei wichtigsten Geräte

Diese drei Geräte werden oft verwechselt. Hier der Unterschied:

### Hub (veraltet)

Ein **Hub** ist das einfachste Netzwerkgerät. Es empfängt Daten auf einem Port und schickt sie an **alle anderen Ports** weiter – wie ein Lautsprecher, der jede Nachricht in jeden Raum brüllt.

- Keine Intelligenz – kennt keine MAC-Adressen
- Alle Geräte teilen sich die Bandbreite (**Kollisionen** möglich)
- Heute kaum noch verwendet

**Kollision** = Wenn zwei Geräte gleichzeitig senden, überschneiden sich die Signale. Die Daten gehen verloren und müssen neu gesendet werden.

### Switch (der Standard)

Ein **Switch** ist intelligenter als ein Hub. Er lernt, welche MAC-Adresse an welchem Port hängt, und schickt Daten nur an den richtigen Port – wie ein Postbote, der Briefe sortiert.

- Kennt MAC-Adressen (lernt sie automatisch)
- Jedes Gerät hat die volle Bandbreite
- Grundlage jedes modernen lokalen Netzwerks

**MAC-Tabelle** = Der Switch speichert: Port 1 → MAC AA:BB:CC:DD:EE:FF, Port 2 → MAC 11:22:33:44:55:66 usw.

### Router

Ein **Router** verbindet unterschiedliche Netzwerke miteinander. Er entscheidet, wohin Datenpakete geschickt werden – wie ein Verkehrspolizist an einer Kreuzung.

- Arbeitet mit IP-Adressen (Schicht 3)
- Verbindet z.B. dein Heimnetz mit dem Internet
- Hat eine Routing-Tabelle mit Regeln, wohin Pakete gehören

### Zusammenfassung

| Gerät | Arbeitet mit | Schickt Daten an | Intelligenz |
|---|---|---|---|
| **Hub** | Signale (Bits) | Alle Ports | Keine |
| **Switch** | MAC-Adressen (Schicht 2) | Nur den richtigen Port | MAC-Tabelle |
| **Router** | IP-Adressen (Schicht 3) | Das richtige Netzwerk | Routing-Tabelle |

## 2.2 VLAN (Virtual Local Area Network)

Ein **VLAN** (Virtual Local Area Network) teilt einen physischen Switch in mehrere logische Netzwerke auf. Wie wenn du in einem Großraumbüro unsichtbare Wände ziehst – die Abteilung Accounting kann die Abteilung IT nicht sehen, obwohl sie am selben Switch hängen.

**Warum VLANs?**
- **Sicherheit:** Gäste-Netz vom Firmen-Netz trennen
- **Übersicht:** Weniger Broadcast-Verkehr pro Netz
- **Flexibilität:** Geräte in verschiedenen Räumen können im selben VLAN sein

**Beispiel:**
```
Switch Port 1-10  → VLAN 10 (Buchhaltung)
Switch Port 11-20 → VLAN 20 (IT)
Switch Port 21-24 → VLAN 30 (Gäste)
```

Geräte in VLAN 10 können nicht direkt mit VLAN 20 kommunizieren – es sei denn, ein Router verbindet die VLANs.

**Tagged vs Untagged:**
- **Untagged (Access Port)** = Port gehört zu genau einem VLAN, für Endgeräte (PC, Drucker)
- **Tagged (Trunk Port)** = Port transportiert mehrere VLANs, für Verbindungen zwischen Switches oder zum Router

VLAN anzeigen (auf einem Managed Switch oder mit `ip`):
```bash
ip link show type vlan       # VLAN-Interfaces anzeigen
```

## 2.3 Netzwerktopologien

Wie Geräte miteinander verbunden sind, nennt man **Topologie**:

| Topologie | Beschreibung | Vorteil | Nachteil |
|---|---|---|--- |
| **Star (Stern)** | Alle Geräte hängen an einem zentralen Switch | Einfach, ein Kabelausfall betrifft nur ein Gerät | Switch ist Single Point of Failure |
| **Bus** | Alle Geräte an einem gemeinsamen Kabel | Einfach, billig | Ein Kabelbruch legt alles lahm |
| **Ring** | Geräte bilden einen Kreis | Deterministisch | Ein Ausfall kann alles stören |
| **Mesh** | Jedes Gerät ist mit vielen anderen verbunden | Sehr ausfallsicher | Teuer, komplex |

**In der Praxis** ist Stern-Topologie (alle am Switch) der Standard.

## 2.4 Kabel und Anschlüsse (Kurzübersicht)

| Typ | Geschwindigkeit | Maximale Länge | Einsatz |
|---|---|---|---|
| **Cat5e** (Category 5 enhanced) | 1 Gbps | 100m | Heim, Büro |
| **Cat6** (Category 6) | 10 Gbps bis 55m | 100m | Serverräume |
| **Cat6a** | 10 Gbps | 100m | Rechenzentren |
| **Glasfaser** | 100+ Gbps | km | Backbone, WAN |

**RJ45** = Standard-Stecker für Netzwerkkabel (breit, durchsichtig, 8 Kontakte)

## 2.5 WLAN-Standards

**WLAN** (Wireless Local Area Network) = Funknetzwerk, also WiFi

| Standard | Name | Frequenz | Max. Speed |
|---|---|---|---|
| 802.11ac | Wi-Fi 5 | 5 GHz | bis 1.7 Gbps |
| 802.11ax | Wi-Fi 6 | 2.4 + 5 GHz | bis 9.6 Gbps |
| 802.11be | Wi-Fi 7 | 2.4 + 5 + 6 GHz | bis 46 Gbps |

**GHz** (Gigahertz) = Frequenz. Höher = schneller, aber kürzere Reichweite.

---

# 3. IPv4 – Adressierung und Subnetting

## 3.1 Was ist eine IP-Adresse?

**IP** (Internet Protocol) ist das Protokoll, das Adressen im Netzwerk verwaltet. Jedes Gerät im Netz braucht eine IP-Adresse – wie eine Hausnummer.

**IPv4** (Internet Protocol Version 4) ist die klassische Form: 32 Bit, aufgeteilt in 4 Gruppen (Oktetts):

```
192.168.1.100
```

Jedes Oktett kann Werte von 0 bis 255 annehmen (weil 8 Bit = 256 mögliche Werte).

## 3.2 Aufbau einer IPv4-Adresse

Eine IP-Adresse besteht aus zwei Teilen:
- **Netzanteil:** Identifiziert das Netzwerk (wie die Postleitzahl)
- **Hostanteil:** Identifiziert das Gerät innerhalb des Netzwerks (wie die Hausnummer)

Wo die Trennung liegt, bestimmt die **Subnetzmaske**:

```
IP-Adresse:     192.168.1.100
Subnetzmaske:   255.255.255.0
                  ├── Netz ──┤ Host ┤
```

Alle Geräte im selben Netz haben denselben Netzanteil, aber unterschiedliche Hostanteile.

## 3.3 Private Adressbereiche (RFC 1918)

**RFC** (Request for Comments) = Ein Standard-Dokument, das technische Regeln festlegt.

**Private IP-Adressen** sind Adressen, die nur im lokalen Netzwerk verwendet werden. Sie sind nicht direkt aus dem Internet erreichbar. Ein **NAT** (Network Address Translation) – meistens im Router – übersetzt sie in eine öffentliche Adresse.

| Privater Bereich | CIDR-Schreibweise | typische Verwendung |
|---|---|---|
| 10.0.0.0 bis 10.255.255.255 | /8 | Große Firmennetzwerke |
| 172.16.0.0 bis 172.31.255.255 | /12 | Mittlere Netzwerke |
| 192.168.0.0 bis 192.168.255.255 | /16 | Heimnetzwerke, kleine Büros |

## 3.4 CIDR – Classless Inter-Domain Routing

**CIDR** (sprich: "saider") ist die Schreibweise für Subnetzmasken. Statt `255.255.255.0` schreibt man `/24`. Die Zahl gibt an, wie viele Bits zum Netzanteil gehören.

```
/24  →  255.255.255.0    →  24 von 32 Bits sind Netz
/25  →  255.255.255.128  →  25 Bits Netz, weniger Hosts
/16  →  255.255.0.0      →  16 Bits Netz, sehr viele Hosts
```

## 3.5 Subnetting

**Subnetting** = Ein großes Netz in kleinere Netze aufteilen. Wie eine Pizza in Stücke schneiden.

**Formel:** Anzahl Hosts pro Subnetz = 2^H − 2

Dabei ist **H** = Anzahl der Host-Bits = 32 − CIDR-Wert. Die −2 sind für die Netzwerk-Adresse (erste) und Broadcast-Adresse (letzte).

| CIDR | Subnetzmaske | Anzahl Hosts | Praxisbeispiel |
|---|---|---|---|
| /24 | 255.255.255.0 | 254 | Standard-Heimnetzwerk |
| /25 | 255.255.255.128 | 126 | Zwei Abteilungen |
| /26 | 255.255.255.192 | 62 | Vier kleine Netzwerke |
| /27 | 255.255.255.224 | 30 | Acht kleine Gruppen |
| /28 | 255.255.255.240 | 14 | Server-Segment |
| /30 | 255.255.255.252 | 2 | Router-zu-Router-Verbindung |
| /32 | 255.255.255.255 | 1 | Einzelne Adresse (Host-Route) |

### Subnetting-Beispiel

**Aufgabe:** Teile `192.168.1.0/24` in 4 gleich große Subnetze.

**Lösung:**
- /24 → /26 (2 Bits mehr = 2² = 4 Subnetze)
- Jedes Subnetz hat 2^(32−26) − 2 = 62 Hosts

```
Subnetz 1: 192.168.1.0/26
  Erste Host-Adresse: 192.168.1.1
  Letzte Host-Adresse: 192.168.1.62
  Broadcast: 192.168.1.63

Subnetz 2: 192.168.1.64/26
  Erste Host-Adresse: 192.168.1.65
  Letzte Host-Adresse: 192.168.1.126
  Broadcast: 192.168.1.127

Subnetz 3: 192.168.1.128/26
  Erste Host-Adresse: 192.168.1.129
  Letzte Host-Adresse: 192.168.1.190
  Broadcast: 192.168.1.191

Subnetz 4: 192.168.1.192/26
  Erste Host-Adresse: 192.168.1.193
  Letzte Host-Adresse: 192.168.1.254
  Broadcast: 192.168.1.255
```

**Wichtig:**
- **Netzwerk-Adresse** = Erste Adresse im Subnetz (kann kein Gerät haben)
- **Broadcast-Adresse** = Letzte Adresse im Subnetz (wird an alle Geräte im Subnetz gesendet)
- **Host-Adressen** = Alles dazwischen

## 3.6 IPv4-Befehle

Eigene IP-Adresse anzeigen:

```bash
ip addr show
```

oder kürzer:

```bash
ip a
```

Routing-Tabelle anzeigen (wo gehen die Daten hin?):

```bash
ip route show
```

---

# 4. IPv6 – Die nächste Generation

> **Hinweis:** IPv6 wird hier als Überblick behandelt. Für den Einstieg reicht IPv4 – aber IPv6 wird immer wichtiger.

## 4.1 Warum IPv6?

**IPv4** hat "nur" ca. 4,3 Milliarden Adressen. Die sind aufgebraucht. **IPv6** (Internet Protocol Version 6) hat 128 Bit statt 32 – das sind mehr Adressen als Atome im Universum.

**Konkret:**
- IPv4: ca. 4,3 Milliarden Adressen (`2³²`)
- IPv6: ca. 340 Sextillionen Adressen (`2¹²⁸` = `340.282.366.920.938.463.463.374.607.431.768.211.456`)

## 4.2 Adressaufbau

IPv6 = 128 Bit, dargestellt als 8 Gruppen à 4 Hexadezimal-Ziffern:

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

**Hexadezimal** = Zahlensystem mit 16 Ziffern (0-9 und a-f). Jede Gruppe = 16 Bit.

**Kürzungsregeln:**
1. Führende Nullen in jeder Gruppe weglassen: `0db8` → `db8`
2. Eine zusammenhängende Folge von `0000`-Gruppen durch `::` ersetzen (aber nur einmal pro Adresse!)

Ergebnis: `2001:db8:85a3::8a2e:370:7334`

### Übungsbeispiel: IPv6-Adressen kürzen

```
Vollständig:   fe80:0000:0000:0000:0202:b3ff:fe1e:8329
Schritt 1:     fe80:0:0:0:202:b3ff:fe1e:8329   (führende Nullen entfernt)
Schritt 2:     fe80::202:b3ff:fe1e:8329         (Null-Gruppen durch :: ersetzt)
```

## 4.3 Adresstypen

| Typ | Präfix (Beginnt mit) | Erklärung |
|---|---|---|
| **Global Unicast** | `2000::/3` | Öffentliche Adresse, weltweit routingfähig |
| **Link-Local** | `fe80::/10` | Nur im lokalen Netzsegment, wird automatisch zugewiesen |
| **Unique Local** | `fc00::/7` | Private Adressen (wie 192.168.x.x bei IPv4) |
| **Multicast** | `ff00::/8` | Eine Adresse für eine Gruppe von Geräten |
| **Loopback** | `::1` | Das Gerät selbst (wie 127.0.0.1 bei IPv4) |

**Unicast** = Ein Sender, ein Empfänger
**Multicast** = Ein Sender, mehrere Empfänger gleichzeitig
**Broadcast** = An alle (gibt es bei IPv6 nicht mehr – wird durch Multicast ersetzt)

## 4.4 IPv6 vs IPv4 – Die wichtigsten Unterschiede

| Eigenschaft | IPv4 | IPv6 |
|---|---|---|
| Adresslänge | 32 Bit | 128 Bit |
| Darstellung | 4 Oktetts (192.168.1.1) | 8 Hex-Gruppen (2001:db8::1) |
| Private Adressen | 10.x, 172.16.x, 192.168.x | fc00::/7 |
| DHCP nötig? | Ja (meist) | Nein (SLAAC = automatische Selbstkonfiguration) |
| Broadcast | Ja | Nein (durch Multicast ersetzt) |

**SLAAC** (Stateless Address Autoconfiguration) = IPv6-Geräte können sich automatisch eine Adresse aus der Netzwerk-Präfix-Information generieren. Kein DHCP-Server nötig.

## 4.5 IPv6-Befehle

```bash
ip -6 addr show                              # IPv6-Adressen anzeigen
ip -6 route show                             # IPv6-Routing-Tabelle
ping6 ::1                                    # Loopback testen
ping6 2001:4860:4860::8888                    # Google DNS über IPv6 anpingen
traceroute6 google.com                       # Weg über IPv6 nachverfolgen
```

## 4.6 Dual-Stack und Tunnel

In der Realität laufen IPv4 und IPv6 oft gleichzeitig (**Dual-Stack**). Wo das nicht möglich ist, helfen Tunnel:

- **Dual-Stack** = Gerät hat sowohl IPv4 als auch IPv6 gleichzeitig
- **NAT64** = Übersetzt zwischen IPv6- und IPv4-Netzen
- **Tunnel** = IPv6-Pakete durch ein IPv4-Netz schicken (oder umgekehrt)

---

# 5. MAC-Adressen und ARP

## 5.1 Was ist eine MAC-Adresse?

**MAC** (Media Access Control) = Die Hardware-Adresse jedes Netzwerk-Geräts. Sie ist fest in der Netzwerkkarte gespeichert (oder kann per Software geändert werden).

- 48 Bit (6 Byte), dargestellt als Hexadezimal: `AA:BB:CC:DD:EE:FF`
- **Erste 3 Byte:** Herstellerkennung (**OUI** = Organizationally Unique Identifier)
- **Letzte 3 Byte:** Eindeutige Gerätekennung

Im Gegensatz zur IP-Adresse (die sich ändern kann) ist die MAC-Adresse fest an das Gerät gebunden.

Eigene MAC-Adresse anzeigen:

```bash
ip link show
```

## 5.2 ARP (Address Resolution Protocol)

**ARP** übersetzt eine IP-Adresse in eine MAC-Adresse. Das ist nötig, weil Daten im lokalen Netz über MAC-Adressen zugestellt werden, nicht über IP-Adressen.

**Ablauf:**
1. Gerät A will Daten an IP `192.168.1.50` senden
2. Gerät A schaut in seiner **ARP-Tabelle** nach, welche MAC-Adresse zu dieser IP gehört
3. Wenn kein Eintrag existiert: Gerät A sendet einen **ARP-Request** an alle Geräte im Netz ("Wer hat 192.168.1.50?")
4. Das Gerät mit dieser IP antwortet mit seiner MAC-Adresse (**ARP-Reply**)
5. Gerät A speichert den Eintrag und sendet die Daten

ARP-Tabelle anzeigen:

```bash
ip neigh show
```

oder klassisch:

```bash
arp -a
```

ARP-Cache leeren:

```bash
sudo ip neigh flush all
```

---

# 6. TCP und UDP – Daten zuverlässig oder schnell transportieren

## 6.1 Was sind TCP und UDP?

**TCP** (Transmission Control Protocol) und **UDP** (User Datagram Protocol) sind die beiden wichtigsten Transportprotokolle. Sie arbeiten auf Schicht 4 (Transport) und sorgen dafür, dass Daten von A nach B kommen – aber auf unterschiedliche Weise.

## 6.2 TCP – Zuverlässig und verbindungsorientiert

TCP baut erst eine Verbindung auf, dann werden Daten übertragen. Wenn ein Paket verloren geht, wird es neu angefordert. TCP garantiert, dass alle Daten in der richtigen Reihenfolge ankommen.

### Der TCP 3-Way-Handshake (Drei-Wege-Handschlag)

Bevor Daten übertragen werden, einigen sich Client und Server auf eine Verbindung:

```
Client                              Server
  │                                     │
  │──── SYN ──────────────────────────▶│   "Hallo, ich möchte eine Verbindung"
  │                                     │
  │◀──── SYN+ACK ─────────────────────│   "Hallo, ich bin bereit"
  │                                     │
  │──── ACK ──────────────────────────▶│   "Alles klar, los geht's"
  │                                     │
  │════ Daten ════════════════════════│   (Verbindung steht, Daten fließen)
```

**SYN** = Synchronize (Synchronisieren)  
**ACK** = Acknowledge (Bestätigen)  
**SYN+ACK** = "Ich bestätige dein SYN und möchte auch synchronisieren"

### TCP-Flags (Steuerungs-Bits)

Jedes TCP-Paket kann Flags gesetzt haben, die signalisieren, was das Paket soll:

| Flag | Ausgeschrieben | Bedeutung |
|---|---|---|
| **SYN** | Synchronize | "Ich will eine Verbindung aufbauen" |
| **ACK** | Acknowledge | "Ich bestätige den Empfang" |
| **FIN** | Finish | "Ich will die Verbindung beenden" |
| **RST** | Reset | "Verbindung sofort abbrechen!" |
| **PSH** | Push | "Daten sofort an die Anwendung weiterleiten" |
| **URG** | Urgent | "Diese Daten sind dringend" |

## 6.3 UDP – Schnell und verbindungslos

UDP baut keine Verbindung auf. Es schickt die Daten einfach los – ohne Bestätigung, ohne Reihenfolge-Garantie.

**Vorteil:** Schnell, wenig Overhead (zusätzlicher Daten-Verbrauch)  
**Nachteil:** Keine Garantie, dass Daten ankommen

**Einsatz:** Streaming, Online-Gaming, VoIP (Voice over IP = Telefonieren übers Netz), DNS

## 6.4 TCP vs UDP – Vergleich

| Eigenschaft | TCP | UDP |
|---|---|---|
| Verbindungsaufbau | Ja (3-Way-Handshake) | Nein |
| Zuverlässigkeit | Ja (verlorene Pakete werden erneut gesendet) | Nein |
| Reihenfolge | Ja (Pakete in richtiger Reihenfolge) | Nein |
| Geschwindigkeit | Langsamer | Schneller |
| Overhead | Hoch | Niedrig |
| Typische Anwendungen | Webseiten, E-Mail, Dateitransfer | Streaming, Gaming, DNS, DHCP |

## 6.5 Wichtige Portnummern

Ein **Port** ist eine Nummer, die einem bestimmten Dienst (Service) auf einem Computer zugeordnet ist. Stell dir vor, ein Computer ist ein Gebäude – die Portnummer ist die Zimmernummer.

| Port | Protokoll / Dienst | Was passiert hier |
|---|---|---|
| 20 + 21 | **FTP** (File Transfer Protocol) | Dateien übertragen |
| 22 | **SSH** (Secure Shell) | Sicherer Remote-Zugang |
| 23 | **Telnet** | Remote-Zugang (unsicher! Klartext!) |
| 25 | **SMTP** (Simple Mail Transfer Protocol) | E-Mails versenden |
| 53 | **DNS** (Domain Name System) | Namen in IP-Adressen umwandeln |
| 67 + 68 | **DHCP** (Dynamic Host Configuration Protocol) | IP-Adressen verteilen |
| 80 | **HTTP** (Hypertext Transfer Protocol) | Webseiten (unverschlüsselt) |
| 443 | **HTTPS** (HTTP Secure) | Webseiten (verschlüsselt) |
| 3389 | **RDP** (Remote Desktop Protocol) | Windows-Remotedesktop |
| 8080 | HTTP-Alternative | Proxys, Test-Server |

**Bereiche:**
- **0–1023:** Well-Known Ports (Standard-Ports)
- **1024–49151:** Registered Ports (registrierte Anwendungen)
- **49152–65535:** Dynamic Ports (spontan vergeben)

## 6.6 Verbindungen anzeigen

Aktive Verbindungen auf deinem System anzeigen:

```bash
ss -tunap
```

| Parameter | Bedeutung |
|---|---|
| `-t` | TCP-Verbindungen anzeigen |
| `-u` | UDP-Verbindungen anzeigen |
| `-n` | Numerische IPs anzeigen (statt Namen aufzulösen) |
| `-a` | Alle Verbindungen (auch wartende) |
| `-p` | Prozess-ID (welches Programm gehört zur Verbindung) |

`ss` ist das moderne Tool. Früher wurde `netstat` verwendet – `ss` ist schneller.

---

# 7. DNS – Namensauflösung

## 7.1 Was ist DNS?

**DNS** (Domain Name System) ist wie das Telefonbuch des Internets. Es übersetzt lesbare Namen (wie `google.com`) in IP-Adressen (wie `142.250.185.206`).

Ohne DNS müsstest du für jede Webseite die IP-Adresse eingeben. Stell dir vor, du müsstest statt "google.com" immer "142.250.185.206" tippen.

## 7.2 Wie DNS funktioniert

```
Du tippst: www.example.com
  → Dein Computer fragt den lokalen DNS-Cache (schon mal aufgelöst?)
    → Falls nicht: Resolver (meist dein Router oder ISP = Internet Service Provider)
      → Root-Nameserver: "Frag den .com-Server"
        → .com-Nameserver: "Frag den example.com-Server"
          → Autoritativer Nameserver: "Die IP ist 93.184.216.34"
```

**Resolver** = Der DNS-Server, den dein Computer als Erstes fragt (meist vom Router oder Provider)
**Autoritativer Nameserver** = Der Server, der endgültig für eine Domain zuständig ist

## 7.3 Wichtige DNS-Records (Einträge)

Ein **DNS-Record** ist ein Eintrag im DNS-System. Es gibt verschiedene Typen:

| Record-Typ | Ausgeschrieben | Funktion | Beispiel |
|---|---|---|---|
| **A** | Address | Verweist auf eine IPv4-Adresse | `example.com → 93.184.216.34` |
| **AAAA** | (vier A = IPv6) | Verweist auf eine IPv6-Adresse | `example.com → 2606:2800:220:1:...` |
| **CNAME** | Canonical Name | Ein Alias (Verweis auf einen anderen Namen) | `www.example.com → example.com` |
| **MX** | Mail Exchange | Verweist auf den Mail-Server | `example.com → mail.example.com` |
| **NS** | Name Server | Verweist auf den zuständigen Nameserver | `example.com → ns1.example.com` |
| **TXT** | Text | Freier Text, z.B. für E-Mail-Sicherheit | SPF, DKIM (siehe unten) |
| **PTR** | Pointer | Reverse-DNS: IP-Adresse → Name (umgekehrt) | `93.184.216.34 → example.com` |

**SPF** (Sender Policy Framework) = Legt fest, welche Server E-Mails im Namen der Domain senden dürfen  
**DKIM** (DomainKeys Identified Mail) = Digitale Signatur für E-Mails, um Fälschungen zu erkennen

## 7.4 DNS-Tools

**nslookup** – Einfache DNS-Abfrage:

```bash
nslookup example.com
```

Ausgabe (vereinfacht):
```
Name:   example.com
Address: 93.184.216.34
```

**dig** – Detaillierte DNS-Abfrage (Domain Information Groper):

```bash
dig example.com A              # A-Record abfragen (IPv4-Adresse)
dig example.com AAAA           # AAAA-Record abfragen (IPv6-Adresse)
dig example.com MX             # Mail-Server abfragen
dig example.com ANY            # Alle verfügbaren Records
dig -x 93.184.216.34           # Reverse-Lookup (IP → Name)
dig @8.8.8.8 example.com       # Spezifischen DNS-Server fragen (hier: Google)
dig +short example.com         # Nur die IP anzeigen, kein drumherum
dig +trace example.com         # Den gesamten DNS-Pfad zeigen
```

**DNS-Cache leeren** (falls veraltete Ergebnisse kommen):

```bash
sudo systemd-resolve --flush-caches    # Bei systemd-resolved
sudo resolvectl flush-caches           # Neuere Linux-Versionen
```

---

# 8. DHCP – Automatische Adressvergabe

## 8.1 Was ist DHCP?

**DHCP** (Dynamic Host Configuration Protocol) verteilt automatisch IP-Adressen an Geräte im Netzwerk. Ohne DHCP müsstest du jedem Gerät manuell eine IP-Adresse geben.

## 8.2 Der DORA-Prozess

DHCP funktioniert in 4 Schritten (**DORA**):

```
Client                              DHCP-Server
  │                                     │
  │─── DISCOVER (Broadcast) ──────────▶│   "Hallo! Ich brauche eine IP-Adresse!"
  │                                     │
  │◀── OFFER ─────────────────────────│   "Hier, nimm 192.168.1.50"
  │                                     │
  │─── REQUEST ──────────────────────▶│   "Okay, ich nehme die!"
  │                                     │
  │◀── ACK (Acknowledgment) ─────────│   "Bestätigt. Die Adresse ist 24h für dich"
  │                                     │
```

- **DISCOVER** = Client sucht nach einem DHCP-Server
- **OFFER** = Server bietet eine Adresse an
- **REQUEST** = Client sagt "ich will die"
- **ACK** = Server bestätigt und vergibt ein **Lease** (Mietvertrag für die IP-Adresse)

## 8.3 DHCP-Informationen anzeigen

```bash
ip addr show eth0
```

DHCP-Lease erneuern:

```bash
sudo dhclient -r eth0      # Aktuelle IP abgeben (Release)
sudo dhclient eth0          # Neue IP anfordern
```

## 8.4 Statische IP-Adresse setzen (temporär)

Statt DHCP eine feste IP geben (nur bis zum Neustart):

```bash
sudo ip addr add 192.168.1.100/24 dev eth0    # IP-Adresse setzen
sudo ip link set eth0 up                       # Interface aktivieren
sudo ip route add default via 192.168.1.1      # Standard-Gateway setzen
```

## 8.5 Statische IP-Adresse (dauerhaft – Netplan)

Unter Ubuntu mit **Netplan** (Konfiguration in YAML-Datei):

`/etc/netplan/01-static.yaml`:

```yaml
network:
  version: 2
  ethernets:
    eth0:                                  # Interface-Name
      addresses:
        - 192.168.1.100/24                 # Gewünschte IP + CIDR
      routes:
        - to: default
          via: 192.168.1.1                 # Gateway (Router)
      nameservers:
        addresses:
          - 8.8.8.8                        # DNS-Server (Google)
          - 8.8.4.4                        # DNS-Server Backup
```

Anwenden:

```bash
sudo netplan apply
```

**YAML** = Yet Another Markup Language – ein Format für Konfigurationsdateien. Wichtig: Einrückungen mit Leerzeichen (keine Tabs!) sind Teil der Syntax.

---

# 9. HTTP und HTTPS – Das Web

## 9.1 Was ist HTTP?

**HTTP** (Hypertext Transfer Protocol) ist das Protokoll, mit dem Webbrowser und Webserver kommunizieren. Wenn du eine Webseite aufrufst, sendet dein Browser einen HTTP-Request und der Server antwortet mit einem HTTP-Response.

**HTTPS** (HTTP Secure) = HTTP mit Verschlüsselung über **TLS** (Transport Layer Security). Die Daten können unterwegs nicht mitgelesen werden.

## 9.2 HTTP-Request mit curl

**curl** (Client URL) ist ein Kommandozeilen-Tool für HTTP-Requests:

```bash
curl -v http://example.com
```

**`-v`** = verbose (gesprächig) – zeigt den kompletten Request und Response an.

Ausgabe (vereinfacht):
```
> GET / HTTP/1.1              ← Methode (GET), Pfad (/), Protokoll-Version
> Host: example.com           ← Welche Webseite willst du?
> User-Agent: curl/7.88.1    ← Wer bist du? (Browser/Tool)
> Accept: */*                 ← Was akzeptierst du?
>
< HTTP/1.1 200 OK             ← Statuscode: Erfolg!
< Content-Type: text/html     ← Was kommt zurück? HTML
< Content-Length: 1256        ← Wie groß? 1256 Byte
```

## 9.3 Wichtige HTTP-Statuscodes

Der Server antwortet immer mit einem dreistelligen Statuscode:

| Code | Bedeutung | Erklärung (für Menschen) |
|---|---|---|
| **200** | OK | Alles gut, hier sind deine Daten |
| **301** | Moved Permanently | Die Seite ist dauerhaft umgezogen, neue Adresse im Header |
| **302** | Found | Temporäre Weiterleitung |
| **400** | Bad Request | Der Request ist fehlerhaft (dein Fehler) |
| **401** | Unauthorized | Du musst dich anmelden |
| **403** | Forbidden | Du darfst das nicht sehen |
| **404** | Not Found | Die Seite existiert nicht |
| **500** | Internal Server Error | Der Server hat ein Problem (Server-Fehler) |
| **502** | Bad Gateway | Der Proxy/Gateway hat ein Problem |
| **503** | Service Unavailable | Server ist überlastet oder in Wartung |

**Faustregel:** 200er = Erfolg, 300er = Weiterleitung, 400er = Dein Fehler, 500er = Server-Fehler

## 9.4 HTTPS und Zertifikate prüfen

Zertifikat eines Webservers anzeigen:

```bash
openssl s_client -connect example.com:443 -brief
```

**openssl** = Toolkit für Verschlüsselung  
**s_client** = TLS/SSL-Client-Modus  
**Port 443** = Standard-Port für HTTPS

Nur die HTTP-Header abrufen (ohne den ganzen Seiteninhalt):

```bash
curl -I https://example.com
```

**`-I`** = Head-Request (nur Header, keine Daten)

Nur den Statuscode:

```bash
curl -o /dev/null -s -w "%{http_code}\n" https://example.com
```

- **`-o /dev/null`** = Ausgabe verwerfen
- **`-s`** = silent (keine Fortschrittsanzeige)
- **`-w`** = Format-String für die Ausgabe

---

# 10. ICMP und Troubleshooting – Probleme finden

## 10.1 Was ist ICMP?

**ICMP** (Internet Control Message Protocol) ist ein Hilfsprotokoll für Diagnose und Fehlermeldungen. Es wird z.B. für `ping` verwendet.

**Wichtig:** ICMP überträgt keine Anwendungsdaten – es ist nur für Statusmeldungen da.

## 10.2 ping – Erreichbarkeit testen

`ping` sendet ICMP-Echo-Requests und misst die Zeit bis zur Antwort:

```bash
ping -c 4 8.8.8.8          # Genau 4 Pings senden (-c = count)
ping -i 0.5 8.8.8.8        # Alle 0,5 Sekunden (-i = interval)
ping -s 1000 8.8.8.8       # Größere Pakete senden (-s = size, in Byte)
```

Ausgabe:
```
64 bytes from 8.8.8.8: icmp_seq=1 ttl=115 time=12.3 ms
```
- **icmp_seq** = Sequenznummer
- **ttl** = Time To Live (wie viele Router das Paket noch passieren darf)
- **time** = Round-Trip Time (hin und zurück) in Millisekunden

## 10.3 traceroute – Den Weg nachverfolgen

`traceroute` zeigt jeden Router auf dem Weg zum Ziel:

```bash
traceroute 8.8.8.8          # Standard-Traceroute
traceroute -n 8.8.8.8       # Keine DNS-Namensauflösung (-n = numeric)
```

**Besser:** `mtr` (My Traceroute) = traceroute + ping live kombiniert:

```bash
mtr -n 8.8.8.8              # Läuft dauerhaft und zeigt Verlust/Verzögerung pro Hop
```

**Hop** = Ein Sprung von einem Router zum nächsten. Wenn dein Paket 10 Router passiert, sind das 10 Hops.

## 10.4 Der Troubleshooting-Pfad

Wenn "das Internet nicht geht", gehst du systematisch von innen nach außen:

```
1. ping 127.0.0.1             → Funktioniert mein Netzwerk-Stack?
                                   (127.0.0.1 = Loopback = das Gerät selbst)
2. ping [eigene IP-Adresse]   → Funktioniert meine Netzwerkkarte?
3. ping [Gateway-IP]          → Komme ich ins lokale Netz? (z.B. 192.168.1.1)
4. ping 8.8.8.8               → Komme ich ins Internet? (Google DNS)
5. ping google.com            → Funktioniert DNS? (Name → IP)
6. traceroute 8.8.8.8         → Wo genau hakt es?
```

**Gateway** = Der Router, der dein lokales Netz mit dem Internet verbindet. Standard-Adresse oft `192.168.1.1` oder `192.168.0.1`.

---

# 11. Linux-Netzwerk-Tools

## 11.1 ip – Das moderne Netzwerk-Tool

`ip` ersetzt die alten Befehle `ifconfig`, `route` und `arp`. Es kann alles, was Netzwerk-Konfiguration angeht.

```bash
ip addr show                 # Alle IP-Adressen anzeigen
ip addr show eth0            # Nur Interface eth0
ip link show                 # Alle Netzwerk-Interfaces anzeigen (auch ohne IP)
ip link set eth0 up          # Interface aktivieren
ip link set eth0 down        # Interface deaktivieren
ip neigh show                # ARP-Tabelle (IP → MAC)
ip route show                # Routing-Tabelle
```

**Interface** = Die Netzwerkkarte (physisch oder virtuell). Heißt meist `eth0`, `ens33`, `wlan0` oder `enp0s3`.

## 11.2 ss – Verbindungen anzeigen

`ss` (Socket Statistics) ersetzt das alte `netstat`. Zeigt alle aktiven Netzwerkverbindungen.

```bash
ss -tunap                    # Alle TCP- und UDP-Verbindungen
ss -tlnp                     # Nur TCP, nur LISTEN (wartende Server)
ss -s                        # Zusammenfassung (wie viele Verbindungen?)
```

| Parameter | Bedeutung |
|---|---|
| `-t` | TCP |
| `-u` | UDP |
| `-l` | Nur LISTEN (Server, die auf Verbindungen warten) |
| `-n` | Numerisch (keine Namensauflösung) |
| `-a` | Alle |
| `-p` | Prozess-ID anzeigen |

## 11.3 nmap – Portscan

**nmap** (Network Mapper) scannt Geräte im Netz nach offenen Ports und laufenden Diensten.

```bash
nmap 192.168.1.1                       # Standard-Scan (1000 häufigste Ports)
nmap -sS 192.168.1.0/24                 # SYN-Scan ("Half-Open" – leiser)
nmap -sV 192.168.1.1                    # Service-Versionen erkennen
nmap -O 192.168.1.1                     # Betriebssystem erkennen
nmap -p 22,80,443 192.168.1.1           # Nur bestimmte Ports scannen
nmap -sn 192.168.1.0/24                 # Nur Host-Discovery (welche Geräte sind online?)
```

| Parameter | Bedeutung |
|---|---|
| `-sS` | SYN-Scan (TCP-SYN, keine volle Verbindung) |
| `-sV` | Service-Version-Erkennung |
| `-O` | OS (Operating System = Betriebssystem)-Erkennung |
| `-p` | Port(s) angeben |
| `-sn` | Ping-Scan (nur prüfen ob Geräte online sind, keine Port-Scans) |

## 11.4 curl – HTTP-Requests

```bash
curl http://example.com                        # GET-Request (Webseite abrufen)
curl -X POST -d "key=value" http://example.com # POST-Request (Daten senden)
curl -H "Content-Type: application/json" URL    # Custom Header setzen
curl -u user:password URL                       # Basic Authentication
curl -k https://example.com                     # SSL-Zertifikat ignorieren
curl -o datei.pdf URL                           # Download in Datei
```

- **GET** = Daten abrufen
- **POST** = Daten senden
- **`-d`** = Data (die zu sendenden Daten)
- **`-H`** = Header (zusätzliche HTTP-Header)
- **`-k`** = Insecure (SSL-Zertifikat nicht prüfen)

## 11.5 wget – Downloads

```bash
wget https://example.com/datei.pdf              # Datei herunterladen
wget -r -np https://example.com/                # Rekursiv (-r) ganze Seite, nicht nach oben (-np)
wget -c URL                                     # Abgebrochenen Download fortsetzen (-c = continue)
```

---

# 12. Routing und Gateway – Daten auf die richtige Route schicken

## 12.1 Was ist Routing?

**Routing** = Den Weg bestimmen, den Datenpakete durchs Netz nehmen. Wie ein Navigationsgerät für Daten.

**Gateway** = Der Router, der dein lokales Netz mit anderen Netzen (z.B. dem Internet) verbindet.

## 12.2 Routing-Tabelle anzeigen

```bash
ip route show
```

Ausgabe:
```
default via 192.168.1.1 dev eth0       # Default-Route: Alles Unbekannte geht zum Gateway
192.168.1.0/24 dev eth0 proto kernel   # Lokales Netz: Direkt erreichbar
```

- **default** = Default-Gateway (wohin Pakete geschickt werden, für die keine spezielle Route existiert)
- **via** = Über welchen Router
- **dev** = Über welches Interface

## 12.3 Statische Routen hinzufügen

```bash
sudo ip route add 10.0.0.0/8 via 192.168.1.254       # Route zum Netz 10.0.0.0/8 über Router 192.168.1.254
sudo ip route del 10.0.0.0/8                          # Route wieder löschen
sudo ip route add default via 192.168.1.1              # Default-Gateway setzen
```

## 12.4 IP-Forwarding

**IP-Forwarding** = Ein Linux-Rechner kann als Router fungieren, indem er Pakete von einem Interface zum nächsten weiterleitet.

```bash
cat /proc/sys/net/ipv4/ip_forward          # Status: 0 = aus, 1 = an
sudo sysctl -w net.ipv4.ip_forward=1       # Einschalten (bis Neustart)
```

Dauerhaft aktivieren: In `/etc/sysctl.conf` die Zeile `net.ipv4.ip_forward=1` einfügen.

---

# 13. Firewall-Grundlagen

## 13.1 Was ist eine Firewall?

Eine **Firewall** kontrolliert, welche Netzwerkverbindungen erlaubt oder blockiert werden. Wie ein Türsteher – manche dürfen rein, andere nicht.

## 13.2 iptables

**iptables** ist das Standard-Firewall-Tool unter Linux. Es arbeitet mit Regeln, die nacheinander geprüft werden:

```bash
sudo iptables -L -n -v                                  # Alle Regeln anzeigen
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT      # SSH (Port 22) erlauben
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT      # HTTP (Port 80) erlauben
sudo iptables -A INPUT -j DROP                           # Alles andere blockieren
```

| Parameter | Ausgeschrieben | Bedeutung |
|---|---|---|
| `-A` | Append | Regel am Ende der Kette hinzufügen |
| `-I` | Insert | Regel vorne einfügen (wird zuerst geprüft) |
| `-D` | Delete | Regel löschen |
| `-p` | Protocol | Protokoll: tcp, udp oder icmp |
| `--dport` | Destination Port | Ziel-Port |
| `-s` | Source | Quell-IP-Adresse |
| `-j` | Jump | Aktion: ACCEPT (erlauben), DROP (stillschweigend verwerfen), REJECT (mit Fehlermeldung ablehnen) |

**Ketten:** `INPUT` (eingehend), `OUTPUT` (ausgehend), `FORWARD` (weitergeleitet)

**Achtung:** Regeln in der falschen Reihenfolge können dich aussperren! Immer zuerst eine ACCEPT-Regel für SSH, dann DROP.

## 13.3 nftables

**nftables** ist der Nachfolger von iptables (schneller, sauberere Syntax). Langfristig wird iptables durch nftables ersetzt.

```bash
sudo nft list ruleset                     # Alle Regeln anzeigen
```

---

# 14. Wireshark – Netzwerkverkehr sichtbar machen

## 14.1 Was ist Wireshark?

**Wireshark** ist ein Netzwerk-Sniffer. Es zeigt jeden Datenverkehr, der über deine Netzwerkkarte läuft, in Echtzeit an. Wie ein Röntgengerät fürs Netzwerk.

**tshark** = Die Kommandozeilen-Version von Wireshark (ohne Grafik)

**Wichtig:** Du darfst nur Traffic mitschneiden, für den du berechtigt bist. Auf fremden Netzwerken ohne Erlaubnis ist das illegal!

## 14.2 Capture starten

```bash
sudo wireshark                        # Grafische Oberfläche
sudo tshark -i eth0                   # Kommandozeile, Interface eth0
sudo tshark -i eth0 -c 100           # Nur die ersten 100 Pakete (-c = count)
```

## 14.3 Display-Filter

Mit Filtern zeigst du nur das, was dich interessiert:

| Filter | Zeigt |
|---|---|
| `tcp.port == 80` | Nur HTTP-Traffic |
| `ip.addr == 192.168.1.1` | Nur Traffic von oder zu dieser IP |
| `dns` | Nur DNS-Traffic |
| `http.request.method == "POST"` | Nur POST-Requests (Daten, die an den Server gesendet werden) |
| `tcp.flags.syn == 1` | Nur SYN-Pakete (Verbindungsaufbau) |
| `tcp.flags.rst == 1` | Nur RST-Pakete (Verbindungsabbruch) |
| `frame.len > 1000` | Nur Frames größer als 1000 Byte |
| `arp` | Nur ARP-Traffic |

**Kombinieren:** `ip.addr == 10.0.0.1 && tcp.port == 443` (beide Bedingungen müssen erfüllt sein)

**Capture-Filter** (werden beim Mitschneiden angewendet, reduziert Datenmenge):
```bash
sudo tshark -i eth0 -f "port 80"     # Nur Port 80 mitschneiden (-f = BPF-Filter)
```

**BPF** (Berkeley Packet Filter) = Syntax für Capture-Filter

## 14.4 tshark – Nützliche Kommandos

```bash
sudo tshark -i eth0 -Y "http.request"                                       # Nur HTTP-Requests (-Y = Display-Filter)
sudo tshark -r capture.pcap                                                  # PCAP-Datei lesen (-r = read)
sudo tshark -r capture.pcap -Y "dns" -T fields -e dns.qry.name             # DNS-Namen extrahieren
```

**PCAP** (Packet Capture) = Dateiformat für mitgeschnittenen Netzwerkverkehr

---

# 15. Case Study: Netzwerk-Troubleshooting

## Szenario

Du kommst ins Büro. Ein Kollege sagt: "Ich komme nicht ins Internet."

## Schritt-für-Schritt-Analyse

### Schritt 1: Lokalen Netzwerk-Stack testen

```bash
ping -c 2 127.0.0.1
```

`127.0.0.1` = **Loopback-Adresse** (das Gerät spricht mit sich selbst)

✅ Erfolgreich → Weiter mit Schritt 2  
❌ Fehlschlag → Netzwerk-Stack defekt → `sudo systemctl restart networking`

### Schritt 2: Eigene IP-Adresse prüfen

```bash
ip addr show eth0
```

- IP vorhanden? → Weiter mit Schritt 3
- Keine IP? → DHCP-Problem → `sudo dhclient eth0` (neue IP anfordern)

### Schritt 3: Lokales Netz testen

```bash
ping -c 2 192.168.1.1
```

(Die IP deines Gateways – bei dir evtl. anders)

✅ Erfolgreich → Weiter  
❌ Fehlschlag → Kabel defekt, Switch kaputt, WLAN getrennt

### Schritt 4: Internet erreichbar?

```bash
ping -c 2 8.8.8.8
```

`8.8.8.8` = Google DNS (immer erreichbar, gut zum Testen)

✅ Erfolgreich → Weiter  
❌ Fehlschlag → Gateway-Problem oder Provider-Störung

### Schritt 5: DNS testen

```bash
ping -c 2 google.com
```

Wenn Schritt 4 (ping auf IP) funktioniert, aber Schritt 5 (ping auf Name) nicht → **DNS-Problem**

Lösung:
```bash
dig @8.8.8.8 google.com           # Google-DNS direkt fragen
cat /etc/resolv.conf              # DNS-Konfiguration prüfen
```

### Schritt 6: Pfad analysieren

```bash
mtr -n google.com
```

Zeigt jeden Router auf dem Weg. Wenn bei einem Hop der Verlust hoch ist → dort ist das Problem.

### Schritt 7: Webserver erreichen?

```bash
curl -I https://google.com
```

Sollte `HTTP/2 200` oder `301` zurückgeben.

### Schritt 8: Aktive Verbindungen checken

```bash
ss -tunap | grep ESTAB
```

Zeigt alle aktiven (ESTABLISHED) Verbindungen.

---

# 16. Kompaktes Befehls-Cheatsheet (1 Seite)

> **Hinweis:** Diese Tabelle fasst alle Befehle aus den vorherigen Kapiteln zusammen als schnelle Referenz. Erklärungen und Parameter findest du in den jeweiligen Kapiteln.

## Interface und IP-Adresse
| Befehl | Funktion |
|---|---|
| `ip a` | Eigene IP-Adressen anzeigen |
| `ip link show` | Netzwerk-Interfaces anzeigen |
| `ip link set eth0 up` | Interface aktivieren |
| `ip link set eth0 down` | Interface deaktivieren |
| `ip addr add 10.0.0.1/24 dev eth0` | IP-Adresse setzen |
| `ip neigh show` | ARP-Tabelle anzeigen |

## Routing
| Befehl | Funktion |
|---|---|
| `ip route show` | Routing-Tabelle anzeigen |
| `ip route add default via 192.168.1.1` | Default-Gateway setzen |
| `traceroute Ziel` | Weg zum Ziel zeigen |
| `mtr Ziel` | Live-Traceroute |

## DNS
| Befehl | Funktion |
|---|---|
| `dig example.com` | DNS-Record abfragen |
| `dig +short example.com` | Nur die IP-Adresse |
| `dig -x IP-Adresse` | Reverse-Lookup (IP → Name) |
| `nslookup example.com` | Einfache DNS-Abfrage |

## Erreichbarkeit und Verbindungen
| Befehl | Funktion |
|---|---|
| `ping -c 4 Ziel` | Ziel anpingen |
| `ss -tunap` | Aktive Verbindungen anzeigen |
| `nmap Ziel` | Ports scannen |
| `nmap -sn Netz/24` | Online-Geräte finden |

## Web und Download
| Befehl | Funktion |
|---|---|
| `curl -I URL` | HTTP-Header anzeigen |
| `curl URL` | Webseite abrufen |
| `wget URL` | Datei herunterladen |

## Mitschneiden
| Befehl | Funktion |
|---|---|
| `tshark -i eth0` | Traffic mitschneiden |
| `tshark -r datei.pcap` | PCAP-Datei lesen |
| `tshark -i eth0 -Y "dns"` | Nur DNS mitschneiden |

## Firewall
| Befehl | Funktion |
|---|---|
| `iptables -L -n -v` | Firewall-Regeln anzeigen |
| `iptables -A INPUT -p tcp --dport 22 -j ACCEPT` | Port 22 (SSH) erlauben |
| `iptables -A INPUT -j DROP` | Alles andere blockieren |

---

# 17. Übungen

## Übung 1: Subnetting

**Lernziel:** Subnetze berechnen.

1. Teile `10.0.0.0/24` in 8 gleich große Subnetze
2. Notiere für jedes Subnetz: Netz-Adresse, erste Host-Adresse, letzte Host-Adresse, Broadcast-Adresse
3. Wie viele Hosts hat jedes Subnetz?

**Lösung:**
```
/24 → /27 (3 Bits mehr = 2³ = 8 Subnetze, je 2⁵-2 = 30 Hosts)

Subnetz 1: 10.0.0.0/27    Hosts: .1 – .30      Broadcast: .31
Subnetz 2: 10.0.0.32/27   Hosts: .33 – .62     Broadcast: .63
Subnetz 3: 10.0.0.64/27   Hosts: .65 – .94     Broadcast: .95
Subnetz 4: 10.0.0.96/27   Hosts: .97 – .126    Broadcast: .127
Subnetz 5: 10.0.0.128/27  Hosts: .129 – .158   Broadcast: .159
Subnetz 6: 10.0.0.160/27  Hosts: .161 – .190   Broadcast: .191
Subnetz 7: 10.0.0.192/27  Hosts: .193 – .222   Broadcast: .223
Subnetz 8: 10.0.0.224/27  Hosts: .225 – .254   Broadcast: .255
```

## Übung 2: Eigenes Netzwerk erkunden

**Lernziel:** Die eigenen Netzwerkinformationen finden und verstehen.

1. Zeige deine IP-Adresse: `ip a`
   - Welche IP hast du? Ist es eine private Adresse?
   - Welche Subnetzmaske (CIDR)?
2. Zeige dein Gateway: `ip route`
   - Was ist deine Default-Route?
3. Pinge dein Gateway: `ping -c 4 [Gateway-IP]`
4. Pinge einen externen Server: `ping -c 4 8.8.8.8`
5. Löse einen Namen auf: `dig google.com`
   - Welche IP-Adresse erhältst du?
6. Zeige alle TCP-Verbindungen: `ss -tunap`
   - Welche Programme haben gerade Verbindungen?
7. Scanne dein Netz nach Geräten: `nmap -sn 192.168.1.0/24` (dein Netz anpassen!)

## Übung 3: DNS-Recherche

**Lernziel:** DNS-Records verstehen und abfragen.

```bash
dig google.com A              # IPv4-Adresse
dig google.com AAAA           # IPv6-Adresse
dig google.com MX             # Mail-Server
dig google.com TXT            # Text-Einträge
dig google.com NS             # Nameserver
dig -x 142.250.185.206        # Reverse-Lookup
```

**Kontrollfragen:**
- Welche IPv4-Adresse hat google.com?
- Über welche Mail-Server werden E-Mails an @google.com zugestellt?
- Was steht im TXT-Record?

## Übung 4: Portscan

**Lernziel:** Offene Ports und Services erkennen.

```bash
nmap -sV scanme.nmap.org
```

`scanme.nmap.org` ist ein Test-Server von nmap, der extra zum Scannen freigegeben ist.

**Kontrollfragen:**
- Welche Ports sind offen?
- Welche Services (Dienste) laufen auf den offenen Ports?
- Welche Software-Versionen werden erkannt?

## Übung 5: HTTP-Analyse

**Lernziel:** HTTP-Requests und -Responses verstehen.

```bash
curl -v https://example.com 2>&1 | head -30     # Kompletter Request + Response
curl -I https://example.com                       # Nur Header
curl -o /dev/null -s -w "Status: %{http_code}\nZeit: %{time_total}s\n" https://example.com
```

**Kontrollfragen:**
- Welcher HTTP-Statuscode wird zurückgegeben? Was bedeutet er?
- Welche Header sendet der Server?
- Wie lange dauert der Request?

## Übung 6: Troubleshooting-Szenario

**Lernziel:** Systematisches Netzwerk-Troubleshooting.

**Szenario:** Ein Kollege meldet: "Ich kann google.com nicht erreichen. Aber andere Webseiten gehen."

1. Ist es ein DNS-Problem? `dig google.com`
2. Ist google.com per IP erreichbar? `ping 142.250.185.206`
3. Was sagt der Webserver? `curl -I https://google.com`
4. Gibt es einen DNS-Filter? `dig @8.8.8.8 google.com` (direkt Google-DNS fragen)

**Mögliche Ursachen:**
- DNS-Cache hat einen falschen Eintrag → `sudo systemd-resolve --flush-caches`
- DNS-Server des Providers hat einen Fehler → Anderen DNS nutzen (8.8.8.8)
- Firewall blockiert den Zugriff → `iptables -L -n` prüfen

---

*Version 1.1 – Hannes Lang – April 2026*
