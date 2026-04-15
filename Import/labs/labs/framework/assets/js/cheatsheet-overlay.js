var CheatsheetOverlay = (function () {
  var overlayEl = null;
  var contentEl = null;
  var searchInput = null;
  
  // Command database for both labs
  var COMMANDS = {
    netzwerk: [
      { cmd: 'ip addr show', desc: 'IP-Adressen aller Interfaces anzeigen' },
      { cmd: 'ip route show', desc: 'Routing-Tabelle anzeigen' },
      { cmd: 'ip neigh show', desc: 'ARP-Tabelle anzeigen' },
      { cmd: 'ping -c 4 8.8.8.8', desc: '4 ICMP Echo-Requests senden' },
      { cmd: 'traceroute google.com', desc: 'Route zu einem Host verfolgen' },
      { cmd: 'dig google.com A', desc: 'DNS-Abfrage für A-Record' },
      { cmd: 'nslookup google.com', desc: 'DNS-Abfrage (legacy)' },
      { cmd: 'curl -I https://example.com', desc: 'HTTP-Header abrufen' },
      { cmd: 'wget https://example.com/file.zip', desc: 'Datei herunterladen' },
      { cmd: 'ss -tulpen', desc: 'Aktive TCP/UDP-Verbindungen anzeigen' },
      { cmd: 'nmap -sS 192.168.1.0/24', desc: 'SYN-Scan auf Subnetz' },
      { cmd: 'tcpdump -i eth0 -n', desc: 'Netzwerkverkehr mitschneiden' },
      { cmd: 'iptables -L -n', desc: 'Firewall-Regeln anzeigen' },
      { cmd: 'openssl s_client -connect google.com:443', desc: 'TLS-Verbindung testen' },
      { cmd: 'sha256sum file.txt', desc: 'SHA-256 Hash berechnen' },
      { cmd: 'ssh-keygen -t rsa', desc: 'RSA SSH-Schlüssel erzeugen' }
    ],
    forensik: [
      { cmd: 'lsblk', desc: 'Blockgeräte und Partitionen anzeigen' },
      { cmd: 'fdisk -l', desc: 'Partitionstabellen anzeigen' },
      { cmd: 'dd if=/dev/sdb of=image.dd bs=4M status=progress', desc: 'Forensisches Image erstellen' },
      { cmd: 'sha256sum image.dd', desc: 'Hash des Images berechnen' },
      { cmd: 'md5sum image.dd', desc: 'MD5 Hash des Images' },
      { cmd: 'mount -o ro,noexec /dev/sdb1 /mnt/usb', desc: 'Read-only mounten' },
      { cmd: 'umount /mnt/usb', desc: 'Aushängen' },
      { cmd: 'xxd file.bin | head -20', desc: 'Hex-Dump der ersten 20 Zeilen' },
      { cmd: 'strings file.bin | head -30', desc: 'Strings extrahieren' },
      { cmd: 'grep -r "password" /mnt/usb/', desc: 'Nach Passwörtern suchen' },
      { cmd: 'find /mnt/usb/ -name "*.doc" -type f', desc: 'Word-Dokumente finden' },
      { cmd: 'script log.txt', desc: 'Terminal-Sitzung protokollieren' },
      { cmd: 'file suspicious.bin', desc: 'Dateityp bestimmen' },
      { cmd: 'stat /mnt/usb/document.txt', desc: 'Dateimetadaten anzeigen' }
    ]
  };
  
  function init() {
    overlayEl = document.getElementById('cheatsheet-overlay');
    contentEl = document.getElementById('cheatsheet-content');
    searchInput = document.getElementById('cheatsheet-search');
    
    if (!overlayEl || !contentEl) {
      console.warn('Cheatsheet overlay elements not found');
      return;
    }
    
    // Setup toggle button
    var toggleBtn = document.getElementById('cheatsheet-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleOverlay);
    }
    
    // Setup close button
    var closeBtn = document.querySelector('.cheatsheet-overlay .close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', hideOverlay);
    }
    
    // Setup ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlayEl.classList.contains('active')) {
        hideOverlay();
      }
    });
    
    // Setup search
    if (searchInput) {
      searchInput.addEventListener('input', filterCommands);
    }
    
    // Load commands based on current lab
    loadCommands();
  }
  
  function loadCommands() {
    if (!window.LAB_CONFIG) return;
    
    var labId = window.LAB_CONFIG.labId;
    var commands = COMMANDS[labId] || [];
    
    renderCommands(commands);
  }
  
  function renderCommands(commands) {
    if (!contentEl) return;
    
    var html = '<div class="cheatsheet-header">';
    html += '<h2>&#128220; Cheatsheet</h2>';
    html += '<div class="search-box">';
    html += '<input type="text" id="cheatsheet-search" placeholder="Befehle durchsuchen..." autocomplete="off">';
    html += '<span class="search-icon">&#128269;</span>';
    html += '</div>';
    html += '<button class="close-btn">&times;</button>';
    html += '</div>';
    
    html += '<div class="cheatsheet-commands">';
    
    if (commands.length === 0) {
      html += '<p class="no-commands">Keine Befehle verfügbar.</p>';
    } else {
      commands.forEach(function(item, index) {
        html += '<div class="command-item" data-index="' + index + '">';
        html += '<div class="command-text">';
        html += '<code>' + item.cmd + '</code>';
        if (item.desc) {
          html += '<div class="command-desc">' + item.desc + '</div>';
        }
        html += '</div>';
        html += '<button class="copy-cmd-btn" title="Kopieren">📋</button>';
        html += '</div>';
      });
    }
    
    html += '</div>';
    
    // PDF export button
    html += '<div class="cheatsheet-footer">';
    html += '<button class="pdf-export-btn" onclick="window.print()">&#128196; Als PDF exportieren</button>';
    html += '</div>';
    
    contentEl.innerHTML = html;
    
    // Re-bind events for new elements
    bindCommandEvents();
  }
  
  function bindCommandEvents() {
    // Copy buttons
    document.querySelectorAll('.copy-cmd-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var cmdItem = this.closest('.command-item');
        var code = cmdItem.querySelector('code');
        if (code) {
          navigator.clipboard.writeText(code.textContent).then(function() {
            btn.textContent = "✓";
            btn.classList.add('copied');
            setTimeout(function() {
              btn.textContent = "📋";
              btn.classList.remove('copied');
            }, 2000);
          });
        }
      });
    });
  }
  
  function filterCommands() {
    if (!searchInput || !contentEl) return;
    
    var query = searchInput.value.toLowerCase().trim();
    var labId = window.LAB_CONFIG ? window.LAB_CONFIG.labId : 'netzwerk';
    var commands = COMMANDS[labId] || [];
    
    if (query === '') {
      renderCommands(commands);
      return;
    }
    
    var filtered = commands.filter(function(item) {
      return item.cmd.toLowerCase().includes(query) || 
             (item.desc && item.desc.toLowerCase().includes(query));
    });
    
    // Update UI with filtered commands
    var container = contentEl.querySelector('.cheatsheet-commands');
    if (container) {
      if (filtered.length === 0) {
        container.innerHTML = '<p class="no-commands">Keine Ergebnisse für "' + query + '".</p>';
      } else {
        var html = '';
        filtered.forEach(function(item) {
          html += '<div class="command-item">';
          html += '<div class="command-text">';
          html += '<code>' + item.cmd + '</code>';
          if (item.desc) {
            html += '<div class="command-desc">' + item.desc + '</div>';
          }
          html += '</div>';
          html += '<button class="copy-cmd-btn" title="Kopieren">📋</button>';
          html += '</div>';
        });
        container.innerHTML = html;
        bindCommandEvents();
      }
    }
  }
  
  function toggleOverlay() {
    if (overlayEl.classList.contains('active')) {
      hideOverlay();
    } else {
      showOverlay();
    }
  }
  
  function showOverlay() {
    if (!overlayEl) return;
    
    // Reload commands in case lab changed
    loadCommands();
    
    overlayEl.classList.add('active');
    document.body.classList.add('no-scroll');
    
    // Focus search input
    setTimeout(function() {
      var search = document.getElementById('cheatsheet-search');
      if (search) search.focus();
    }, 100);
  }
  
  function hideOverlay() {
    if (!overlayEl) return;
    
    overlayEl.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
  
  return {
    init: init,
    toggle: toggleOverlay,
    show: showOverlay,
    hide: hideOverlay
  };
})();

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', CheatsheetOverlay.init);
} else {
  CheatsheetOverlay.init();
}
