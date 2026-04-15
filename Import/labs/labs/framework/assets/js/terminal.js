// Unified Terminal for both Forensik and Netzwerk labs
function InteractiveTerminal(containerEl) {
  var self = this;
  self.container = containerEl;
  self.outputEl = document.createElement('div');
  self.inputEl = document.createElement('input');
  self.history = [];
  self.historyIndex = 0;
  self.mode = 'forensik'; // 'forensik' or 'netzwerk'
  
  // File system (forensik)
  self.fs = {
    '/': { type: 'dir', children: ['cases', 'dev', 'home', 'mnt', 'tmp', 'etc'] },
    '/cases': { type: 'dir', children: [] },
    '/dev': { type: 'dir', children: ['sda', 'sda1', 'sda2', 'sdb', 'sdb1', 'nvme0n1', 'nvme0n1p1', 'loop0', 'loop1', 'zero', 'null'] },
    '/home': { type: 'dir', children: ['analyst'] },
    '/home/analyst': { type: 'dir', children: [] },
    '/mnt': { type: 'dir', children: ['usb', 'image'] },
    '/mnt/usb': { type: 'dir', children: [] },
    '/mnt/image': { type: 'dir', children: [] },
    '/tmp': { type: 'dir', children: [] },
    '/etc': { type: 'dir', children: ['hosts', 'resolv.conf'] },
    '/etc/hosts': { type: 'file', content: '127.0.0.1 localhost\n192.168.1.1 router.local\n'},
    '/etc/resolv.conf': { type: 'file', content: 'nameserver 8.8.8.8\nnameserver 1.1.1.1\n'}
  };
  
  // Devices (forensik)
  self.devices = {
    sda: { size: '500GB', model: 'Samsung SSD 860', type: 'disk', children: { sda1: { size: '512M', type: 'part', fstype: 'ext4', mountpoint: '/boot' }, sda2: { size: '499G', type: 'part', fstype: 'ext4', mountpoint: '/' } } },
    sdb: { size: '16GB', model: 'SanDisk USB', type: 'disk', children: { sdb1: { size: '16G', type: 'part', fstype: 'vfat', mountpoint: '' } } },
    nvme0n1: { size: '512GB', model: 'Samsung NVMe 970', type: 'disk', children: { nvme0n1p1: { size: '512G', type: 'part', fstype: 'ext4', mountpoint: '' } } }
  };
  
  // Network state
  self.network = {
    interfaces: {
      lo: { mac: '00:00:00:00:00:00', ipv4: '127.0.0.1/8', ipv6: '::1/128', state: 'UP' },
      eth0: { mac: '08:00:27:a1:b2:c3', ipv4: '192.168.1.100/24', ipv6: 'fe80::a00:27ff:fea1:b2c3/64', state: 'UP' }
    },
    routing: [
      { dest: 'default', via: '192.168.1.1', dev: 'eth0', proto: 'dhcp' },
      { dest: '192.168.1.0/24', via: null, dev: 'eth0', proto: 'kernel' }
    ],
    arp: [
      { ip: '192.168.1.1', mac: 'aa:bb:cc:dd:ee:01', dev: 'eth0', state: 'REACHABLE' },
      { ip: '192.168.1.50', mac: 'aa:bb:cc:dd:ee:02', dev: 'eth0', state: 'STALE' }
    ],
    connections: []
  };
  
  self.currentPath = '/cases';
  self.scriptLogging = false;
  
  // Initialize UI
  self.init();
}

InteractiveTerminal.prototype.setMode = function(mode) {
  this.mode = mode;
  this.displayOutput('Terminal-Modus: ' + (mode === 'netzwerk' ? 'Netzwerktechnik' : 'Forensik'));
};

InteractiveTerminal.prototype.init = function() {
  var self = this;
  
  self.outputEl.className = 't-output';
  self.inputEl.className = 't-input';
  self.inputEl.type = 'text';
  self.inputEl.placeholder = 'Befehl eingeben...';
  
  self.container.innerHTML = '';
  self.container.appendChild(self.outputEl);
  self.container.appendChild(self.inputEl);
  
  // Welcome message
  self.displayOutput('Terminal v2.0 – ' + (self.mode === 'netzwerk' ? 'Netzwerktechnik' : 'Forensik') + ' Modus');
  self.displayOutput('Tippe "help" für verfügbare Befehle.');
  
  // Event listeners
  self.inputEl.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var cmd = self.inputEl.value.trim();
      if (cmd) {
        self.history.push(cmd);
        self.historyIndex = self.history.length;
        self.displayInput(cmd);
        self.executeCommand(cmd);
      }
      self.inputEl.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (self.historyIndex > 0) {
        self.historyIndex--;
        self.inputEl.value = self.history[self.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (self.historyIndex < self.history.length - 1) {
        self.historyIndex++;
        self.inputEl.value = self.history[self.historyIndex];
      } else {
        self.historyIndex = self.history.length;
        self.inputEl.value = '';
      }
    }
  });
  
  self.inputEl.focus();
};

InteractiveTerminal.prototype.displayOutput = function(text, type) {
  var line = document.createElement('div');
  line.className = 't-line' + (type ? ' t-' + type : '');
  line.textContent = text;
  this.outputEl.appendChild(line);
  this.outputEl.scrollTop = this.outputEl.scrollHeight;
};

InteractiveTerminal.prototype.displayInput = function(cmd) {
  var line = document.createElement('div');
  line.className = 't-input-line';
  line.innerHTML = '<span class="t-prompt">$</span> ' + cmd;
  this.outputEl.appendChild(line);
  this.outputEl.scrollTop = this.outputEl.scrollHeight;
};

// ===== FORENSIK COMMANDS =====

InteractiveTerminal.prototype.cmdHelp = function(args) {
  var help = [
    'Verfügbare Befehle:',
    '',
    '=== Allgemein ===',
    '  help                     Diese Hilfe anzeigen',
    '  clear                    Terminal leeren',
    '',
    '=== Forensik ===',
    '  ls [dir]                 Verzeichnisinhalt anzeigen',
    '  lsblk                    Blockgeräte anzeigen',
    '  fdisk -l                 Partitionstabellen',
    '  pwd                      Aktuelles Verzeichnis',
    '  cd [dir]                 Verzeichnis wechseln',
    '  cat [file]               Dateiinhalt anzeigen',
    '  mkdir -p [dir]           Ordner erstellen',
    '  tree [dir]               Verzeichnisbaum',
    '  uname -a                 Systeminfo',
    '  whoami                   Aktueller Benutzer',
    '  dd if= of=               Image erstellen',
    '  sha256sum [file]         SHA-256 Hash',
    '  md5sum [file]            MD5 Hash',
    '  mount -o ro              Read-only mounten',
    '  umount [dir]             Aushängen',
    '  xxd [file]               Hex-Dump',
    '  strings [file]           Strings extrahieren',
    '  grep [pattern] [file]    Suchen',
    '  find [dir] -name [pat]   Dateien finden',
    '  script [file]            Protokollierung starten',
    '  exit                     Protokollierung beenden',
    '',
    '=== Netzwerk ===',
    '  ip addr                  IP-Adressen anzeigen',
    '  ip route                 Routing-Tabelle',
    '  ip neigh                 ARP-Tabelle',
    '  ping -c [count] [host]   Ping senden',
    '  traceroute [host]        Route verfolgen',
    '  dig [host]               DNS-Abfrage',
    '  nslookup [host]          DNS-Abfrage (alt)',
    '  curl [url]               HTTP-Anfrage',
    '  wget [url]               Download',
    '  ss -tulpen               Verbindungen anzeigen',
    '  nmap [target]            Port-Scan',
    '  tcpdump -i [if]          Traffic capture',
    '  openssl s_client         TLS prüfen'
  ];
  
  help.forEach(line => this.displayOutput(line));
};

InteractiveTerminal.prototype.cmdClear = function(args) {
  this.outputEl.innerHTML = '';
};

// File system operations
InteractiveTerminal.prototype.resolvePath = function(path) {
  if (path.startsWith('/')) return path;
  var base = this.currentPath === '/' ? '' : this.currentPath;
  return (base + '/' + path).replace(/\/+/g, '/').replace(/\/$/, '') || '/';
};

InteractiveTerminal.prototype.getFile = function(path) {
  return this.fs[path];
};

InteractiveTerminal.prototype.cmdLs = function(args) {
  var path = args.length > 0 ? this.resolvePath(args[0]) : this.currentPath;
  var dir = this.getFile(path);
  
  if (!dir || dir.type !== 'dir') {
    this.displayOutput('ls: ' + path + ': Kein solches Verzeichnis', 'error');
    return;
  }
  
  var items = dir.children || [];
  if (args.includes('-l') || args.includes('-la')) {
    items.forEach(item => {
      var full = path + (path === '/' ? '' : '/') + item;
      var info = this.getFile(full);
      var type = info.type === 'dir' ? 'd' : '-';
      var size = info.type === 'file' ? (info.content ? info.content.length : 0) + 'B' : '';
      this.displayOutput(type + 'rw-r--r-- 1 analyst analyst ' + size + ' ' + item);
    });
  } else {
    this.displayOutput(items.join('  '));
  }
};

InteractiveTerminal.prototype.cmdCd = function(args) {
  if (args.length === 0) {
    this.currentPath = '/cases';
    return;
  }
  
  var path = this.resolvePath(args[0]);
  var dir = this.getFile(path);
  
  if (!dir || dir.type !== 'dir') {
    this.displayOutput('cd: ' + args[0] + ': Kein solches Verzeichnis', 'error');
    return;
  }
  
  this.currentPath = path;
  this.displayOutput('');
};

InteractiveTerminal.prototype.cmdPwd = function(args) {
  this.displayOutput(this.currentPath);
};

InteractiveTerminal.prototype.cmdCat = function(args) {
  if (args.length === 0) {
    this.displayOutput('cat: Datei angeben', 'error');
    return;
  }
  
  var path = this.resolvePath(args[0]);
  var file = this.getFile(path);
  
  if (!file || file.type !== 'file') {
    this.displayOutput('cat: ' + args[0] + ': Datei nicht gefunden', 'error');
    return;
  }
  
  if (file.content) {
    this.displayOutput(file.content);
  }
};

// Forensik-specific commands
InteractiveTerminal.prototype.cmdSha256sum = function(args) {
  if (args.length === 0) {
    this.displayOutput('sha256sum: Datei angeben', 'error');
    return;
  }
  
  // Generate deterministic hash based on filename
  var filename = args[0];
  var hash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'; // SHA-256 of empty file
  if (filename.includes('test')) hash = 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'; // "Hello World"
  
  this.displayOutput(hash + '  ' + filename);
};

InteractiveTerminal.prototype.cmdMount = function(args) {
  if (args.includes('-o') && args.includes('ro')) {
    this.displayOutput('/dev/sdb1 auf /mnt/usb gemountet (read-only)');
  } else {
    this.displayOutput('mount: Verwendung: mount -o ro,noexec /dev/XXX /mnt/XXX');
  }
};

// ===== NETWORK COMMANDS =====

InteractiveTerminal.prototype.cmdIp = function(args) {
  if (args.length === 0) {
    this.displayOutput('ip: Subkommando erwartet (addr, route, neigh, link)', 'error');
    return;
  }
  
  var subcmd = args[0];
  
  if (subcmd === 'addr' || subcmd === 'address') {
    Object.keys(this.network.interfaces).forEach(iface => {
      var info = this.network.interfaces[iface];
      this.displayOutput((iface === 'lo' ? '1' : '2') + ': ' + iface + ': <LOOPBACK,UP> mtu 65536 qdisc noqueue state UNKNOWN');
      this.displayOutput('    link/loopback ' + info.mac + ' brd 00:00:00:00:00:00');
      this.displayOutput('    inet ' + info.ipv4 + ' scope host ' + iface);
      if (info.ipv6) this.displayOutput('    inet6 ' + info.ipv6 + ' scope link');
      this.displayOutput('');
    });
  } else if (subcmd === 'route') {
    this.network.routing.forEach(route => {
      var line = route.dest + (route.via ? ' via ' + route.via : '');
      line += ' dev ' + route.dev + ' proto ' + route.proto;
      this.displayOutput(line);
    });
  } else if (subcmd === 'neigh') {
    this.network.arp.forEach(entry => {
      this.displayOutput(entry.ip + ' dev ' + entry.dev + ' lladdr ' + entry.mac + ' ' + entry.state);
    });
  } else {
    this.displayOutput('ip: Unbekanntes Subkommando: ' + subcmd, 'error');
  }
};

InteractiveTerminal.prototype.cmdPing = function(args) {
  if (args.length === 0) {
    this.displayOutput('ping: Host angeben', 'error');
    return;
  }
  
  var host = args[0];
  var count = 4;
  
  // Parse -c count
  for (var i = 1; i < args.length; i++) {
    if (args[i] === '-c' && args[i + 1]) {
      count = parseInt(args[i + 1]) || 4;
      break;
    }
  }
  
  this.displayOutput('PING ' + host + ' (8.8.8.8) 56(84) bytes of data.');
  for (var i = 1; i <= count; i++) {
    var time = (Math.random() * 20 + 10).toFixed(1);
    this.displayOutput('64 bytes from 8.8.8.8: icmp_seq=' + i + ' ttl=64 time=' + time + ' ms');
  }
  this.displayOutput('');
  this.displayOutput('--- ' + host + ' ping statistics ---');
  this.displayOutput(count + ' packets transmitted, ' + count + ' received, 0% packet loss, time ' + (count * 100) + 'ms');
};

InteractiveTerminal.prototype.cmdDig = function(args) {
  if (args.length === 0) {
    this.displayOutput('dig: Domain angeben', 'error');
    return;
  }
  
  var domain = args[0];
  this.displayOutput('');
  this.displayOutput('; <<>> DiG 9.16.1 <<>> ' + domain);
  this.displayOutput(';; global options: +cmd');
  this.displayOutput(';; Got answer:');
  this.displayOutput(';; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 12345');
  this.displayOutput('');
  this.displayOutput(';; QUESTION SECTION:');
  this.displayOutput(';' + domain + '.                  IN      A');
  this.displayOutput('');
  this.displayOutput(';; ANSWER SECTION:');
  this.displayOutput(domain + '.          300     IN      A       93.184.216.34');
  this.displayOutput('');
  this.displayOutput(';; Query time: 25 msec');
  this.displayOutput(';; SERVER: 8.8.8.8#53(8.8.8.8)');
  this.displayOutput(';; WHEN: ' + new Date().toLocaleString('de-DE'));
  this.displayOutput(';; MSG SIZE  rcvd: 56');
};

InteractiveTerminal.prototype.cmdSs = function(args) {
  var lines = [
    'Netid  State   Recv-Q  Send-Q  Local Address:Port  Peer Address:Port',
    'tcp    LISTEN  0       128     0.0.0.0:22          0.0.0.0:*',
    'tcp    ESTAB   0       0       192.168.1.100:54322 142.250.185.78:443',
    'udp    UNCONN  0       0       0.0.0.0:68          0.0.0.0:*'
  ];
  lines.forEach(line => this.displayOutput(line));
};

// ===== COMMAND DISPATCHER =====

InteractiveTerminal.prototype.executeCommand = function(cmdLine) {
  var parts = cmdLine.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
  var cmd = parts[0];
  var args = parts.slice(1).map(a => a.replace(/^"|"$/g, ''));
  
  // Check for script logging
  if (this.scriptLogging && cmd !== 'exit') {
    var logLine = '[' + new Date().toISOString() + '] $ ' + cmdLine;
    // Would log to file in real implementation
  }
  
  switch (cmd) {
    // General
    case 'help': this.cmdHelp(args); break;
    case 'clear': this.cmdClear(args); break;
    
    // Forensik
    case 'ls': this.cmdLs(args); break;
    case 'cd': this.cmdCd(args); break;
    case 'pwd': this.cmdPwd(args); break;
    case 'cat': this.cmdCat(args); break;
    case 'sha256sum': this.cmdSha256sum(args); break;
    case 'md5sum': this.cmdSha256sum(args); break; // Same implementation
    case 'mount': this.cmdMount(args); break;
    case 'umount': this.displayOutput('/mnt/usb erfolgreich ausgehängt'); break;
    case 'dd': 
      if (args.includes('if=') && args.includes('of=')) {
        this.displayOutput('1024+0 records in');
        this.displayOutput('1024+0 records out');
        this.displayOutput('536870912 bytes (537 MB, 512 MiB) copied, 12.345 s, 43.5 MB/s');
      } else {
        this.displayOutput('dd: Verwendung: dd if=/dev/XXX of=image.dd bs=4M status=progress');
      }
      break;
    case 'script':
      if (args.length > 0) {
        this.scriptLogging = true;
        this.displayOutput('Skript gestartet, Datei ist \'' + args[0] + '\' (Befehle werden mitgeloggt)');
      }
      break;
    case 'exit':
      if (this.scriptLogging) {
        this.scriptLogging = false;
        this.displayOutput('Protokollierung beendet. Session aufgezeichnet.');
      }
      break;
    
    // Network
    case 'ip': this.cmdIp(args); break;
    case 'ping': this.cmdPing(args); break;
    case 'dig': this.cmdDig(args); break;
    case 'nslookup': 
      if (args.length > 0) {
        this.displayOutput('Server:         8.8.8.8');
        this.displayOutput('Address:        8.8.8.8#53');
        this.displayOutput('');
        this.displayOutput('Non-authoritative answer:');
        this.displayOutput('Name:   ' + args[0]);
        this.displayOutput('Address: 93.184.216.34');
      }
      break;
    case 'ss': this.cmdSs(args); break;
    case 'curl':
      if (args.length > 0 && args[0].startsWith('http')) {
        this.displayOutput('  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current');
        this.displayOutput('                                 Dload  Upload   Total   Spent    Left  Speed');
        this.displayOutput('100   612  100   612    0     0   6120      0 --:--:-- --:--:-- --:--:--  6120');
        this.displayOutput('<html><head><title>Example Domain</title></head><body>...</body></html>');
      }
      break;
    
    // Unknown
    default:
      if (cmd) {
        this.displayOutput(cmd + ': Befehl nicht gefunden. Tippe "help" für verfügbare Befehle.', 'error');
      }
  }
};

InteractiveTerminal.prototype.focus = function() {
  this.inputEl.focus();
};