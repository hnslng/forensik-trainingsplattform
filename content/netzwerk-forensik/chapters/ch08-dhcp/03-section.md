<h2 class="section-title"><span class="number">8.3</span> DHCP-Informationen anzeigen und statische IP setzen</h2><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Aktuelle IP und Interface-Infos anzeigen
ip addr show eth0

# DHCP-Lease erneuern (IP abgeben und neu holen)
sudo dhclient -r eth0      # Aktuelle IP abgeben (Release)
sudo dhclient eth0          # Neue IP anfordern (Discover)

# DNS-Konfiguration anzeigen
cat /etc/resolv.conf

# Statische Host-Aufl&ouml;sung anzeigen
cat /etc/hosts</code></pre></div><p>Manchmal braucht ein Ger&auml;t eine feste IP (z.B. Server, Drucker). Dann deaktivierst du DHCP und setzt die IP manuell.</p><p><strong>Tempor&auml;r</strong> (bis zum Neustart):</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>sudo ip addr add 192.168.1.100/24 dev eth0
sudo ip link set eth0 up
sudo ip route add default via 192.168.1.1</code></pre></div><p><strong>Dauerhaft</strong> (Netplan unter Ubuntu) &ndash; Datei <span class="inline-code">/etc/netplan/01-static.yaml</span>:</p><div class="code-block"><div class="code-header"><span class="lang">YAML</span></div><pre><code>network:
  version: 2
  ethernets:
    eth0:
      addresses:
        - 192.168.1.100/24
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses:
          - 8.8.8.8
          - 8.8.4.4</code></pre></div><p>Anwenden: <span class="inline-code">sudo netplan apply</span></p><blockquote><p><strong>Tipp:</strong> Server sollten immer eine statische IP haben. Clients (Laptops, Handys) nutzen DHCP.</p></blockquote><div class="exercise-box"><div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Netzwerkkonfiguration pr&uuml;fen</span></div><div class="exercise-body"><div class="exercise-goal"><div class="goal-label">Ziel</div><p>Die aktuelle Netzwerkkonfiguration auslesen und verstehen</p></div><div class="exercise-steps"><ol class="numbered-list"><li>Zeige deine IP-Adresse: <code>ip addr show</code></li><li>Welches Interface? Welche IP? Welches Netz?</li><li>Zeige DNS-Config: <code>cat /etc/resolv.conf</code></li><li>Zeige Gateway: <code>ip route show</code></li><li>Zeige Host-Tabelle: <code>cat /etc/hosts</code></li></ol></div><div class="toggle-container"><div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div><div class="toggle-content"><p>Du siehst dein Interface (z.B. eth0), deine IP (z.B. 192.168.1.100/24) und das Gateway (default via 192.168.1.1). resolv.conf zeigt den DNS-Server. /etc/hosts enth&auml;lt statische Zuordnungen &ndash; dort ist immer 127.0.0.1 localhost eingetragen.</p></div></div></div></div><button class="complete-section-btn" data-chapter="ch08-dhcp">&#9744; Kapitel als abgeschlossen markieren</button><div class="nav-buttons"><button class="nav-btn" data-target="ch07-dns">&#8592; Zur&uuml;ck</button><button class="nav-btn" data-target="ch09-http">Weiter &#8594;</button></div>