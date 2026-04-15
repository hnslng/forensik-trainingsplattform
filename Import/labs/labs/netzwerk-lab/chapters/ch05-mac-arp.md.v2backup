# MAC-Adressen und ARP


<div class="chapter-subtitle">Hardware-Adressen und Namensaufl&ouml;sung im lokalen Netz</div>

<p class="chapter-intro">Jede Netzwerkkarte hat eine eindeutige MAC-Adresse &ndash; quasi die Seriennummer der Netzwerkkarte. ARP (Address Resolution Protocol) &uuml;bersetzt IP-Adressen in MAC-Adressen, damit Daten im lokalen Netz ihr Ziel finden.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du wei&szlig;t was MAC-Adressen sind, verstehst den ARP-Prozess und kannst die ARP-Tabelle lesen.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128196;</div><div class="feature-text"><h3>MAC-Adressen</h3><p>Hardware-Adressen verstehen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128260;</div><div class="feature-text"><h3>ARP-Prozess</h3><p>IP → MAC &Uuml;bersetzung</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>ARP-Tabelle</h3><p>Cache lesen &amp; verstehen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>ip neigh, arp -a</p></div></div></div>

## 5.1 Was ist eine MAC-Adresse?

**MAC** (Media Access Control) = Die Hardware-Adresse jedes Netzwerkgeräts. Sie ist fest in der Netzwerkkarte gespeichert und weltweit eindeutig.

Stell dir vor, jedes Gerät im Netz hat eine feste Hausnummer &ndash; das ist die MAC-Adresse. Im Gegensatz zur IP-Adresse ändert sich die MAC nicht (außer man manipuliert sie bewusst).

**Aufbau:**
- 48 Bit (6 Byte), dargestellt als Hexadezimal: `AA:BB:CC:DD:EE:FF`
- **Erste 3 Byte** (AA:BB:CC): Hersteller-Kennung (**OUI** = Organizationally Unique Identifier)
- **Letzte 3 Byte** (DD:EE:FF): Eindeutige Gerätekennung

**Beispiel:** `08:00:27:A1:B2:C3` &rarr; Hersteller `08:00:27` = Oracle (VirtualBox)

:::code bash
# Eigene MAC-Adresse anzeigen
ip link show

# Nur MAC eines bestimmten Interfaces
ip link show eth0 | grep ether
:::

> **Merke:** IP-Adresse = logische Adresse (kann sich ändern), MAC-Adresse = physische Adresse (fest).

## 5.2 ARP &ndash; Wie Geräte sich im lokalen Netz finden

**ARP** (Address Resolution Protocol) übersetzt IP-Adressen in MAC-Adressen. Warum nötig? Weil Daten im lokalen Netz (Layer 2) **über MAC-Adressen** zugestellt werden, nicht über IP-Adressen.

**Der ARP-Ablauf Schritt für Schritt:**

1. Gerät A will Daten an IP `192.168.1.50` senden
2. A schaut in seiner **ARP-Tabelle** (Cache) nach &ndash; ist die MAC schon bekannt?
3. Kein Eintrag? &rarr; **ARP-Request** an alle Geräte im Netz: *"Wer hat 192.168.1.50?"*
4. Das Gerät mit dieser IP antwortet: *"Ich! Meine MAC ist AA:BB:CC:DD:EE:FF"* (**ARP-Reply**)
5. Gerät A speichert den Eintrag und sendet die Daten

:::code bash
# ARP-Tabelle anzeigen
ip neigh show

# Klassisch (älterer Befehl)
arp -a

# ARP-Cache leeren
sudo ip neigh flush all
:::

**Wichtig:** ARP funktioniert nur **im lokalen Netz**. Für Geräte außerhalb des eigenen Netzes wird das **Default-Gateway** (Router) per ARP gesucht &ndash; der Router kümmert sich um den Rest.

## 5.3 ARP-Spoofing (Sicherheitshinweis)

Da ARP auf Vertrauen basiert (jeder kann antworten), ist es anfällig für **ARP-Spoofing**: Ein Angreifer sendet gefälschte ARP-Replies und leitet so den Verkehr über sein eigenes Gerät.

**Gegenmaßnahmen:**
- Statische ARP-Einträge (manuell gesetzt)
- **DAI** (Dynamic ARP Inspection) auf Managed Switches
- Netzwerk-Monitoring mit arpwatch

:::code bash
# Statischen ARP-Eintrag setzen (schützt vor Spoofing)
sudo ip neigh add 192.168.1.1 lladdr AA:BB:CC:DD:EE:FF dev eth0 nud permanent
:::

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">ARP-Analyse</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>MAC-Adressen finden, ARP-Tabelle lesen und verstehen wie Geräte sich im lokalen Netz finden</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Zeige deine Netzwerk-Interfaces: <code>ip link show</code></li>
<li>Finde deine MAC-Adresse (Zeile mit <code>ether</code>)</li>
<li>Zeige die ARP-Tabelle: <code>ip neigh show</code></li>
<li>Pinge ein Gerät an: <code>ping -c 1 192.168.1.1</code></li>
<li>Prüfe ARP erneut: <code>arp -a</code> &ndash; was hat sich geändert?</li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>Nach dem Ping erscheint das Zielgerät in der ARP-Tabelle. Vorher war kein Eintrag da, nachher steht dort die MAC-Adresse des Routers. Der Status wechselt von STALE zu REACHABLE, solange Kommunikation aktiv ist.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch05-mac-arp">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch04-ipv6">&#8592; Zurück</button>
<button class="nav-btn" data-target="ch06-tcp-udp">Weiter &#8594;</button>
</div>
