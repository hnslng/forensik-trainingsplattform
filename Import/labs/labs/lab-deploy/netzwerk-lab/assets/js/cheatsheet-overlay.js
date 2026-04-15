/* Cheatsheet Fullscreen Overlay - v2 */
(function() {
  var CMD_DESCS = {
    'ip addr show': 'Alle Netzwerk-Interfaces + IP-Adressen anzeigen',
    'ip addr': 'Alle Netzwerk-Interfaces + IP-Adressen anzeigen',
    'ip -4 addr': 'Nur IPv4-Adressen zeigen',
    'ip -6 addr': 'Nur IPv6-Adressen zeigen',
    'ip link show': 'Interface-Status + MAC-Adressen anzeigen',
    'ip addr show eth0': 'Details eines bestimmten Interface',
    'sudo ip link set eth0 up': 'Interface aktivieren',
    'sudo ip link set eth0 down': 'Interface deaktivieren',
    'ip link show eth0 | grep ether': 'MAC-Adresse eines Interface anzeigen',
    'cat /sys/class/net/eth0/address': 'MAC-Adresse aus System auslesen',
    'sudo ip addr add 192.168.1.100/24 dev eth0': 'IPv4-Adresse temporär setzen',
    'sudo ip addr del 192.168.1.100/24 dev eth0': 'IPv4-Adresse entfernen',
    'sudo ip addr add 2001:db8::1/64 dev eth0': 'IPv6-Adresse setzen',
    'ip route show': 'Routing-Tabelle anzeigen',
    'ip route': 'Routing-Tabelle anzeigen',
    'ip route | grep default': 'Standard-Gateway finden',
    'ip route get 8.8.8.8': 'Route zu einem Ziel nachverfolgen',
    'sudo ip route add default via 192.168.1.1': 'Standard-Gateway setzen',
    'sudo ip route add 10.0.0.0/8 via 192.168.1.1': 'Statische Route hinzufügen',
    'sudo ip route del 10.0.0.0/8': 'Route löschen',
    'ip neigh': 'ARP-Tabelle anzeigen (IP → MAC)',
    'ip neigh show': 'ARP-Tabelle anzeigen (IP → MAC)',
    'ip -s -h neigh': 'ARP mit Statistiken',
    'sudo ip neigh flush dev eth0': 'ARP-Cache leeren',
    'sudo arp -d 192.168.1.1': 'Einzelnen ARP-Eintrag löschen',
    'arp -a': 'ARP-Tabelle (klassisches Format)',
    'ping -c 4 8.8.8.8': '4 ICMP-Pakete an Ziel senden',
    'ping -c 4 google.com': 'Hostname anpingen (DNS-Test)',
    'ping -c 4 192.168.1.1': 'Gateway/Router anpingen',
    'ping -i 0.5 8.8.8.8': 'Ping alle 0.5 Sekunden',
    'ping -W 2 -c 1 8.8.8.8': 'Ping mit 2s Timeout',
    'traceroute google.com': 'Weg zum Ziel anzeigen (Hops)',
    'tracepath google.com': 'Weg zum Ziel (MTU-Erkennung)',
    'mtr google.com': 'Traceroute + Ping live kombiniert',
    'dig example.com': 'DNS-A-Record abfragen',
    'dig example.com A': 'A-Record (IPv4) abfragen',
    'dig example.com AAAA': 'AAAA-Record (IPv6) abfragen',
    'dig example.com MX': 'Mailserver abfragen',
    'dig example.com NS': 'Nameserver abfragen',
    'dig example.com TXT': 'TXT-Record abfragen (SPF etc.)',
    'dig example.com CNAME': 'CNAME-Alias abfragen',
    'dig @8.8.8.8 example.com': 'Mit spezifischem DNS-Server',
    'dig -x 8.8.8.8': 'Reverse-DNS (IP → Name)',
    'nslookup example.com': 'Einfache DNS-Abfrage',
    'sudo dhclient -v eth0': 'IP per DHCP anfordern (verbose)',
    'sudo dhclient -r eth0': 'DHCP-Lease freigeben',
    'cat /var/lib/dhcp/dhclient.leases': 'Aktuelle DHCP-Leases anzeigen',
    'nmcli device show': 'NetworkManager-Details',
    'curl -I https://example.com': 'HTTP-Header abrufen (HEAD)',
    'curl -I https://google.com': 'HTTP-Header abrufen',
    'curl https://example.com': 'Vollständige Webseite laden',
    'curl -o datei.html https://example.com': 'Download in Datei',
    'curl -s -o /dev/null -w "%{http_code}" https://example.com': 'Nur HTTP-Statuscode',
    'wget https://example.com/datei.tar.gz': 'Datei herunterladen',
    'wget -c https://example.com/datei.tar.gz': 'Download fortsetzen',
    'ss -tulpen': 'Alle offenen Ports + Verbindungen',
    'ss -tulpen | grep :80': 'Prüfen ob Port 80 offen',
    'ss -s': 'Verbindungsstatistik Zusammenfassung',
    'ss -tuln': 'Alle Listening-Ports (TCP+UDP)',
    'nmap -sT 192.168.1.1': 'TCP-Portscan',
    'nmap -sU 192.168.1.1': 'UDP-Portscan',
    'nmap -sV 192.168.1.1': 'Versionserkennung',
    'nmap -p 22,80,443 192.168.1.1': 'Bestimmte Ports scannen',
    'nmap -sn 192.168.1.0/24': 'Host-Discovery (Ping-Scan)',
    'sudo iptables -L -n -v': 'Firewall-Regeln anzeigen',
    'sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT': 'SSH erlauben (Port 22)',
    'sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT': 'HTTP erlauben (Port 80)',
    'sudo iptables -A INPUT -j DROP': 'Alle anderen ablehnen',
    'sudo iptables -A INPUT -s 10.0.0.0/8 -j DROP': 'Quell-IP blockieren',
    'sudo tcpdump -i eth0': 'Traffic auf Interface mitschneiden',
    'sudo tcpdump -i eth0 -c 20': '20 Pakete aufzeichnen',
    'sudo tcpdump -i eth0 port 80': 'Nur HTTP-Traffic filtern',
    'sudo tcpdump -i eth0 host 192.168.1.1': 'Traffic von/zu bestimmtem Host',
    'sudo tcpdump -i eth0 -w capture.pcap': 'Capture in Datei speichern',
    'openssl s_client -connect google.com:443': 'TLS-Zertifikat prüfen',
    'openssl genrsa -out key.pem 2048': 'RSA Private Key erstellen',
    'openssl req -new -key key.pem -out csr.csr': 'CSR (Certificate Signing Request) erstellen',
    'openssl x509 -in cert.pem -text -noout': 'Zertifikat-Details anzeigen',
    'ssh-keygen -t rsa -b 4096': 'RSA SSH-Key (4096 Bit) erstellen',
    'ssh-keygen -t ed25519': 'Ed25519 SSH-Key erstellen',
    'gpg --gen-key': 'GPG-Key interaktiv erstellen',
    'gpg --list-keys': 'Öffentliche GPG-Keys anzeigen',
    'gpg --export -a "Name" > pubkey.asc': 'GPG-Key exportieren',
    'sha256sum datei.txt': 'SHA-256-Hash berechnen',
    'sha256sum -c hash.txt': 'Hash verifizieren',
    'md5sum datei.txt': 'MD5-Hash berechnen',
    'md5sum -c hash.txt': 'MD5-Hash verifizieren',
    'uname -a': 'Systeminformationen anzeigen',
    'whoami': 'Aktuellen Benutzer anzeigen',
    'hostname': 'Hostnamen anzeigen',
    'cat /etc/resolv.conf': 'DNS-Konfiguration anzeigen',
    'cat /etc/hosts': 'Lokale DNS-Einträge anzeigen',
    'ethtool eth0': 'Physische Verbindungsdaten',
    'nmcli general status': 'NetworkManager Status'
  };

  function getDesc(cmd) {
    // Try exact match first
    var clean = cmd.trim();
    // Strip sudo
    var noSudo = clean.replace(/^sudo\s+/, '');
    // Strip flags at end for broader match
    if (CMD_DESCS[clean]) return CMD_DESCS[clean];
    if (CMD_DESCS[noSudo]) return CMD_DESCS[noSudo];
    // Try partial match
    for (var k in CMD_DESCS) {
      if (clean.indexOf(k) === 0 || noSudo.indexOf(k) === 0) return CMD_DESCS[k];
    }
    return '';
  }

  function init() {
    var btn = document.getElementById('cheatsheet-toggle');
    var overlay = document.getElementById('cheatsheet-overlay');
    if (!btn || !overlay) return;

    btn.addEventListener('click', function() {
      if (typeof Reference === 'undefined' || !Reference.sections) return;
      if (overlay.classList.contains('open')) {
        overlay.classList.remove('open');
        return;
      }
      renderCheatsheet(overlay);
      overlay.classList.add('open');
      var search = document.getElementById('cheatsheet-search-input');
      if (search) search.focus();
    });

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) overlay.classList.remove('open');
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        overlay.classList.remove('open');
      }
    });
  }

  function renderCheatsheet(overlay) {
    var escapeHtml = (typeof App !== 'undefined' && App._escapeHtml) ? App._escapeHtml : function(s) {
      return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    };

    var html = '<div class="cheatsheet-header">';
    html += '<div class="cheatsheet-header-left"><h2>&#128203; Cheatsheet</h2><span class="cheatsheet-subtitle">Klicke auf einen Befehl zum Kopieren</span></div>';
    html += '<div class="cheatsheet-actions">';
    html += '<button class="cs-btn cs-btn-print" onclick="window.print()"><span class="cs-btn-icon">&#128424;</span> PDF</button>';
    html += '<button class="cs-btn cs-btn-close" onclick="document.getElementById(\'cheatsheet-overlay\').classList.remove(\'open\')"><span class="cs-btn-icon">&#10005;</span></button>';
    html += '</div></div>';
    html += '<div class="cheatsheet-search-wrap"><span class="cs-search-icon">&#128269;</span><input type="text" class="cheatsheet-search" id="cheatsheet-search-input" placeholder="Befehl suchen..."></div>';

    var totalCmds = 0;
    for (var i = 0; i < Reference.sections.length; i++) {
      var sec = Reference.sections[i];
      var tmp = document.createElement('div');
      tmp.innerHTML = sec.html();
      var codes = tmp.querySelectorAll('.s-code pre code');
      if (codes.length === 0) continue;

      html += '<div class="cheatsheet-section" data-section="' + escapeHtml(sec.title) + '">';
      html += '<div class="cs-section-header">';
      if (sec.icon) html += '<span class="cs-section-icon">' + sec.icon + '</span>';
      html += '<h3>' + escapeHtml(sec.title) + '</h3>';
      html += '</div>';

      for (var j = 0; j < codes.length; j++) {
        var codeText = codes[j].textContent.trim();
        var lines = codeText.split('\n');
        for (var k = 0; k < lines.length; k++) {
          var line = lines[k].trim();
          if (!line || line.charAt(0) === '#') continue;
          // Skip comments within lines
          var cmdPart = line.split(' #')[0].trim();
          if (!cmdPart) continue;

          var desc = getDesc(cmdPart);
          totalCmds++;
          html += '<div class="cheatsheet-cmd-row" data-cmd="' + escapeHtml(cmdPart) + '" onclick="navigator.clipboard.writeText(this.dataset.cmd)">';
          html += '<div class="cs-cmd-code"><code>' + escapeHtml(cmdPart) + '</code></div>';
          if (desc) html += '<div class="cs-cmd-desc">' + escapeHtml(desc) + '</div>';
          html += '<div class="cs-cmd-copy" title="Kopieren"><span class="cs-copy-icon">&#128203;</span></div>';
          html += '</div>';
        }
      }
      html += '</div>';
    }

    html += '<div class="cheatsheet-footer">' + totalCmds + ' Befehle</div>';

    overlay.querySelector('.cheatsheet-overlay-inner').innerHTML = html;

    // Search functionality
    var search = document.getElementById('cheatsheet-search-input');
    if (search) {
      search.addEventListener('input', function() {
        var q = this.value.toLowerCase().trim();
        var rows = overlay.querySelectorAll('.cheatsheet-cmd-row');
        var sections = overlay.querySelectorAll('.cheatsheet-section');
        var visible = {};
        for (var r = 0; r < rows.length; r++) {
          var t = rows[r].textContent.toLowerCase();
          var show = !q || t.indexOf(q) !== -1;
          rows[r].style.display = show ? '' : 'none';
          var sec = rows[r].closest('.cheatsheet-section');
          if (sec) {
            var sid = sec.getAttribute('data-section') || r;
            if (!visible[sid]) visible[sid] = 0;
            if (show) visible[sid]++;
          }
        }
        for (var s = 0; s < sections.length; s++) {
          var sid2 = sections[s].getAttribute('data-section') || s;
          sections[s].style.display = (visible[sid2] || 0) > 0 ? '' : 'none';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
