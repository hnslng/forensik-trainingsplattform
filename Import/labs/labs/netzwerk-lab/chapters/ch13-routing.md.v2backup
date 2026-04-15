# Routing &amp; Gateway


<div class="chapter-subtitle">Wege durchs Netz</div>

<p class="chapter-intro">Wenn du eine Webseite aufrufst, muss dein Computer wissen: Wohin mit den Daten? Routing bestimmt den Weg der Pakete durchs Netz &ndash; von deinem Rechner bis zum Ziel und zurück.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du verstehst die Routing-Tabelle, wei&szlig;t was ein Default-Gateway macht und kannst statische Routen setzen.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128736;</div><div class="feature-text"><h3>Routing-Tabelle</h3><p>Wegbestimmung verstehen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128674;</div><div class="feature-text"><h3>Default-Gateway</h3><p>Der Ausgang ins Internet</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128260;</div><div class="feature-text"><h3>Statische Routen</h3><p>Manuell Wege setzen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>ip route, traceroute</p></div></div></div>

## 12.1 Was ist Routing?

**Routing** = Den Weg bestimmen, den Datenpakete nehmen. Stell dir vor, du schickst einen Brief: Die Post muss wissen, über welche Zwischenstationen er ans Ziel kommt. Im Netzwerk übernehmen **Router** diese Aufgabe.

Jedes Gerät hat eine **Routing-Tabelle** &ndash; eine Art Straßenkarte, die sagt: *"Pakete für Netz X gehen über Interface Y"*.

**Gateway** = Der Router, der dein lokales Netz mit anderen Netzen (z.B. dem Internet) verbindet. Meistens ist das dein Heimrouter (z.B. FritzBox).

## 12.2 Die Routing-Tabelle

Die Routing-Tabelle sagt dem System, wohin Pakete geschickt werden sollen. Jede Zeile ist eine Regel.

:::code bash
# Routing-Tabelle anzeigen
ip route show
:::

Typische Ausgabe:

:::code
default via 192.168.1.1 dev eth0       # Default-Route (Alles Unbekannte)
192.168.1.0/24 dev eth0 proto kernel   # Lokales Netz (direkt erreichbar)
:::

**Die Spalten erklärt:**

| Eintrag | Bedeutung | Einfach gesagt |
|---|---|---|
| `default` | Default-Route | Alles was nicht anders passt → zum Gateway |
| `via 192.168.1.1` | Nächster Hop | Über diesen Router gehen die Pakete |
| `dev eth0` | Interface | Über diese Netzwerkkarte |
| `proto kernel` | Quelle | Vom System automatisch eingetragen |

> **Merke:** Wenn ein Paket nicht ins lokale Netz passt, geht es an die Default-Route (= dein Gateway). Das ist der Ausgang ins Internet.

## 12.3 Statische Routen setzen

Manchmal musst du manuell festlegen, über welchen Router bestimmte Netze erreichbar sind &ndash; das sind **statische Routen**.

:::code bash
# Route hinzufügen (Netz 10.0.0.0/8 über Router 192.168.1.254)
sudo ip route add 10.0.0.0/8 via 192.168.1.254

# Route wieder löschen
sudo ip route del 10.0.0.0/8

# Default-Gateway setzen
sudo ip route add default via 192.168.1.1

# Route testen (traceroute zeigt den Weg)
traceroute 8.8.8.8
:::

> **Hinweis:** Mit `ip route add` gesetzte Routen sind nach einem Neustart weg. Für dauerhafte Routen muss die Netzwerkkonfiguration angepasst werden (z.B. `/etc/network/interfaces` oder Netplan).

## 12.4 IP-Forwarding &ndash; Linux als Router

Normalerweise leitet Linux keine Pakete zwischen Netzwerkkarten weiter. Mit **IP-Forwarding** kannst du einen Linux-Rechner in einen Router verwandeln.

:::code bash
# Status prüfen (0 = aus, 1 = an)
cat /proc/sys/net/ipv4/ip_forward

# Einschalten (bis zum Neustart)
sudo sysctl -w net.ipv4.ip_forward=1

# Dauerhaft aktivieren: in /etc/sysctl.conf eintragen:
# net.ipv4.ip_forward=1
# Dann: sudo sysctl -p
:::

**Typische Anwendung:** VPN-Server, Lab-Umgebungen, Router zwischen zwei Netzen.

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">Routing-Analyse</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Die Routing-Tabelle lesen, dein Gateway finden und den Weg eines Pakets nachvollziehen</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>Routing-Tabelle anzeigen: <code>ip route show</code></li>
<li>Was ist dein Default-Gateway? (Zeile mit <code>default</code>)</li>
<li>Den Weg zu Google trace-n: <code>traceroute 8.8.8.8</code></li>
<li>IP-Forwarding-Status prüfen: <code>cat /proc/sys/net/ipv4/ip_forward</code></li>
<li>Wie viele Hops braucht traceroute bis zum Ziel?</li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>Die Default-Route zeigt auf deinen Router (z.B. 192.168.1.1). traceroute zeigt jeden Hop: 1. dein Router, 2. Provider-Router, 3.-5. weitere Router, bis 8.8.8.8 erreicht ist. ip_forward steht auf Workstations meist auf 0 (aus).</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch13-routing">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch12-linux-tools">&#8592; Zurück</button>
<button class="nav-btn" data-target="ch13-firewall">Weiter &#8594;</button>
</div>
