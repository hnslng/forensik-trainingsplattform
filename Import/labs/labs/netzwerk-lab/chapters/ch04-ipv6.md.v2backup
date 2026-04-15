# IPv6 &ndash; Die n&auml;chste Generation


<div class="chapter-subtitle">Die Zukunft der Adressierung</div>

<p class="chapter-intro">IPv4 hat ca. 4,3 Milliarden Adressen &ndash; die sind längst aufgebraucht. IPv6 mit 128 Bit l&ouml;st dieses Problem f&uuml;r immer. Lerne den Aufbau, Adresstypen und die automatische Konfiguration kennen.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kennst den Aufbau von IPv6-Adressen, unterscheidest die Adresstypen und wei&szligt wie Ger&auml;te sich per SLAAC selbst konfigurieren.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#127760;</div><div class="feature-text"><h3>IPv6-Aufbau</h3><p>128 Bit, Hex-Notation</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>Adresstypen</h3><p>Global, Link-Local, ULA</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#9881;</div><div class="feature-text"><h3>SLAAC</h3><p>Auto-Konfiguration</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>ip -6 addr, ping6</p></div></div></div>

## 4.1 Warum IPv6?

**IPv4** bietet ca. 4,3 Milliarden Adressen. Das klingt viel, ist aber weltweit längst aufgebraucht. Jedes Smartphone, jeder Laptop, jedes IoT-Gerät braucht eine IP.

**IPv6** löst das Problem: Statt 32 Bit (IPv4) verwendet es **128 Bit**. Das ergibt ca. 340 Sextillionen Adressen &ndash; mehr als Atome auf der Erde.

> **Merke:** Du musst IPv6 nicht perfekt beherrschen. Aber du solltest wissen, wie es aussieht und wie es funktioniert &ndash; es wird immer wichtiger.

## 4.2 Adressaufbau

Eine IPv6-Adresse besteht aus **128 Bit**, aufgeteilt in **8 Gruppen** à 4 Hexadezimal-Ziffern:

:::code
2001:0db8:85a3:0000:0000:8a2e:0370:7334
:::

Das ist lang. Zum Glück gibt es **Kürzungsregeln:**

1. **Führende Nullen** weglassen: `0db8` → `db8`
2. Eine zusammenhängende Folge von `0000`-Gruppen durch `::` ersetzen (aber nur einmal pro Adresse!)

Ergebnis: `2001:db8:85a3::8a2e:370:7334` &ndash; viel kürzer!

**Aufbau:** Die ersten 64 Bit = Netzwerkpräfix, die letzten 64 Bit = Interface-ID (Gerät).

## 4.3 Adresstypen

Nicht alle IPv6-Adressen sind gleich. Hier die wichtigsten:

| Typ | Präfix | Erklärung | Vergleich IPv4 |
|---|---|---|---|
| **Global Unicast** | `2000::/3` | Öffentlich, weltweit routingfähig | Öffentliche IP |
| **Link-Local** | `fe80::/10` | Nur im lokalen Netz, automatisch | 169.254.x.x |
| **Unique Local** | `fc00::/7` | Privat, nicht routingfähig | 192.168.x.x |
| **Loopback** | `::1` | Das Gerät selbst | 127.0.0.1 |

> **Wichtig:** Jedes Interface hat **immer** eine Link-Local-Adresse (`fe80::`), auch ohne DHCP oder Router.

## 4.4 SLAAC &ndash; Automatische Konfiguration

Eines der besten Features von IPv6: **SLAAC** (Stateless Address Autoconfiguration). Geräte konfigurieren sich selbst &ndash; kein DHCP-Server nötig!

**Ablauf:**
1. Gerät erzeugt sich eine Link-Local-Adresse (`fe80::...`)
2. Router sendet **Router Advertisements** (RA) mit dem Netzwerkpräfix
3. Gerät kombiniert Präfix + eigene Interface-ID → fertige globale IPv6-Adresse

:::code bash
# IPv6-Adressen anzeigen
ip -6 addr show

# IPv6-Loopback testen
ping6 ::1

# IPv6-Routing anzeigen
ip -6 route show
:::

## 4.5 IPv6 vs IPv4 &ndash; Die wichtigsten Unterschiede

| Eigenschaft | IPv4 | IPv6 |
|---|---|---|
| Adresslänge | 32 Bit | 128 Bit |
| Darstellung | `192.168.1.1` | `2001:db8::1` |
| DHCP nötig? | Meist ja | Nein (SLAAC) |
| Broadcast | Ja | Nein (Multicast statt Broadcast) |
| Header | Komplex (Optionen variabel) | Einfacher (festes Format) |
| Sicherheit | Optional (IPsec) | Integriert (IPsec Pflicht) |

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">IPv6-Adressen erkunden</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>IPv6-Adressen auf dem eigenen System finden und verstehen</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Zeige alle IPv6-Adressen: <code>ip -6 addr show</code></li>
<li>Finde die Link-Local-Adresse (beginnt mit <code>fe80::</code>)</li>
<li>Zeige IPv6-Routing: <code>ip -6 route show</code></li>
<li>Teste den Loopback: <code>ping6 ::1</code></li>
<li>Vergleiche: Wie viele IPv6-Adressen hat dein Interface vs. IPv4?</li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>Du wirst sehen: Jedes Interface hat mindestens eine fe80:: Link-Local-Adresse. Eventuell auch eine globale Adresse (beginnend mit 2). ping6 ::1 funktioniert immer &ndash; das ist der lokale Loopback, vergleichbar mit ping 127.0.0.1 bei IPv4.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch04-ipv6">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch03-ipv4">&#8592; Zurück</button>
<button class="nav-btn" data-target="ch05-mac-arp">Weiter &#8594;</button>
</div>
