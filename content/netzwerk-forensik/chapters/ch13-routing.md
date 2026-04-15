---
icon: '&#128260;'
id: ch13-routing
section: Infrastruktur
title: Routing
---

<h1>Routing &amp; Gateway</h1>


<div class="chapter-subtitle">Wege durchs Netz</div>

<p class="chapter-intro">Wenn du eine Webseite aufrufst, muss dein Computer wissen: Wohin mit den Daten? Routing bestimmt den Weg der Pakete durchs Netz &ndash; von deinem Rechner bis zum Ziel und zurück.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du verstehst die Routing-Tabelle, wei&szlig;t was ein Default-Gateway macht und kannst statische Routen setzen.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128736;</div><div class="feature-text"><h3>Routing-Tabelle</h3><p>Wegbestimmung verstehen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128674;</div><div class="feature-text"><h3>Default-Gateway</h3><p>Der Ausgang ins Internet</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128260;</div><div class="feature-text"><h3>Statische Routen</h3><p>Manuell Wege setzen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>ip route, traceroute</p></div></div></div>

<h2 class="section-title"><span class="number">12.1</span> Was ist Routing?</h2>

<strong>Routing</strong> = Den Weg bestimmen, den Datenpakete nehmen. Stell dir vor, du schickst einen Brief: Die Post muss wissen, über welche Zwischenstationen er ans Ziel kommt. Im Netzwerk übernehmen <strong>Router</strong> diese Aufgabe.

Jedes Gerät hat eine <strong>Routing-Tabelle</strong> &ndash; eine Art Straßenkarte, die sagt: <em>"Pakete für Netz X gehen über Interface Y"</em>.

<strong>Gateway</strong> = Der Router, der dein lokales Netz mit anderen Netzen (z.B. dem Internet) verbindet. Meistens ist das dein Heimrouter (z.B. FritzBox).

<h2 class="section-title"><span class="number">12.2</span> Die Routing-Tabelle</h2>

Die Routing-Tabelle sagt dem System, wohin Pakete geschickt werden sollen. Jede Zeile ist eine Regel.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Routing-Tabelle anzeigen
ip route show</code></pre></div>

Typische Ausgabe:

<div class="code-block"><div class="code-header"><button class="copy-btn">Kopieren</button></div><pre><code>default via 192.168.1.1 dev eth0       # Default-Route (Alles Unbekannte)
192.168.1.0/24 dev eth0 proto kernel   # Lokales Netz (direkt erreichbar)</code></pre></div>

<strong>Die Spalten erklärt:</strong>

| Eintrag | Bedeutung | Einfach gesagt |
|---|---|---|
| <span class="inline-code">default</span> | Default-Route | Alles was nicht anders passt → zum Gateway |
| <span class="inline-code">via 192.168.1.1</span> | Nächster Hop | Über diesen Router gehen die Pakete |
| <span class="inline-code">dev eth0</span> | Interface | Über diese Netzwerkkarte |
| <span class="inline-code">proto kernel</span> | Quelle | Vom System automatisch eingetragen |

<blockquote><p><strong>Merke:</strong> Wenn ein Paket nicht ins lokale Netz passt, geht es an die Default-Route (= dein Gateway). Das ist der Ausgang ins Internet.</p></blockquote>

<h2 class="section-title"><span class="number">12.3</span> Statische Routen setzen</h2>

Manchmal musst du manuell festlegen, über welchen Router bestimmte Netze erreichbar sind &ndash; das sind <strong>statische Routen</strong>.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Route hinzufügen (Netz 10.0.0.0/8 über Router 192.168.1.254)
sudo ip route add 10.0.0.0/8 via 192.168.1.254

# Route wieder löschen
sudo ip route del 10.0.0.0/8

# Default-Gateway setzen
sudo ip route add default via 192.168.1.1

# Route testen (traceroute zeigt den Weg)
traceroute 8.8.8.8</code></pre></div>

<blockquote><p><strong>Hinweis:</strong> Mit <span class="inline-code">ip route add</span> gesetzte Routen sind nach einem Neustart weg. Für dauerhafte Routen muss die Netzwerkkonfiguration angepasst werden (z.B. <span class="inline-code">/etc/network/interfaces</span> oder Netplan).</p></blockquote>

<h2 class="section-title"><span class="number">12.4</span> IP-Forwarding &ndash; Linux als Router</h2>

Normalerweise leitet Linux keine Pakete zwischen Netzwerkkarten weiter. Mit <strong>IP-Forwarding</strong> kannst du einen Linux-Rechner in einen Router verwandeln.

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Status prüfen (0 = aus, 1 = an)
cat /proc/sys/net/ipv4/ip_forward

# Einschalten (bis zum Neustart)
sudo sysctl -w net.ipv4.ip_forward=1

# Dauerhaft aktivieren: in /etc/sysctl.conf eintragen:
# net.ipv4.ip_forward=1
# Dann: sudo sysctl -p</code></pre></div>

<strong>Typische Anwendung:</strong> VPN-Server, Lab-Umgebungen, Router zwischen zwei Netzen.

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

