/**
 * Interactive Terminal Simulator - Network Edition
 * Uses same t-* CSS classes as Forensik-Lab for identical look
 * Commands: ping, traceroute, dig, nslookup, curl, ip, ss, nmap, tshark, tcpdump, arp, mtr, wget, cat, hostname, clear, help
 */
function InteractiveTerminal(containerId) {
  this.containerId = containerId;
  this.container = null;
  this.outputEl = null;
  this.inputEl = null;
  this.promptEl = null;
  this.mirrorEl = null;
  this.cursorEl = null;
  this.history = [];
  this.historyIndex = -1;
}

InteractiveTerminal.prototype.init = function () {
  this.container = document.getElementById(this.containerId);
  if (!this.container) return false;

  this.container.innerHTML = '<div class="terminal-container">' +
    '<div class="t-header">' +
    '<span class="t-title">NETZWERK-TERMINAL</span>' +
    '<div class="t-header-actions">' +
    '<span class="t-status">Bereit</span>' +
    '<button class="t-minimize-btn" title="Terminal minimieren">&#x2212;</button>' +
    '</div></div>' +
    '<div class="t-body"></div>' +
    '<div class="t-input-wrap">' +
    '<span class="t-prompt-label">' + this.getPrompt() + '</span>' +
    '<div class="t-input-field">' +
    '<span class="t-text-mirror"></span>' +
    '<span class="t-block-cursor"></span>' +
    '<input type="text" class="t-input" autocomplete="off">' +
    '</div></div></div>';

  this.outputEl = this.container.querySelector('.t-body');
  this.inputEl = this.container.querySelector('.t-input');
  this.promptEl = this.container.querySelector('.t-prompt-label');
  this.mirrorEl = this.container.querySelector('.t-text-mirror');
  this.cursorEl = this.container.querySelector('.t-block-cursor');

  this.bindEvents();

  var self = this;
  var minBtn = this.container.querySelector('.t-minimize-btn');
  if (minBtn) {
    minBtn.addEventListener('click', function () {
      var termEl = document.getElementById('terminal-bottom');
      if (termEl) { termEl.classList.remove('open'); termEl.style.height = ''; }
    });
  }
  var termInner = this.container.querySelector('.terminal-container');
  if (termInner) {
    termInner.addEventListener('click', function (e) {
      if (e.target.tagName !== 'BUTTON') self.inputEl.focus();
    });
  }

  this.displayOutput('Willkommen im Netzwerk-Terminal. Tippe "help" f\u00fcr alle Befehle.');
  return true;
};

InteractiveTerminal.prototype.getPrompt = function () {
  return 'analyst@netzwerk-lab:~$ ';
};

InteractiveTerminal.prototype.updateMirror = function () {
  if (this.mirrorEl) this.mirrorEl.textContent = this.inputEl.value;
};

InteractiveTerminal.prototype.bindEvents = function () {
  var self = this;
  this.inputEl.addEventListener('input', function () { self.updateMirror(); });
  this.inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var cmd = self.inputEl.value.trim();
      if (cmd) {
        self.history.push(cmd);
        self.historyIndex = self.history.length;
        self.displayInput(cmd);
        self.executeCommand(cmd);
      }
      self.inputEl.value = '';
      self.updateMirror();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (self.historyIndex > 0) {
        self.historyIndex--;
        self.inputEl.value = self.history[self.historyIndex];
        self.updateMirror();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (self.historyIndex < self.history.length - 1) {
        self.historyIndex++;
        self.inputEl.value = self.history[self.historyIndex];
        self.updateMirror();
      } else {
        self.historyIndex = self.history.length;
        self.inputEl.value = '';
        self.updateMirror();
      }
    }
  });
};

InteractiveTerminal.prototype.displayInput = function (cmd) {
  var line = document.createElement('div');
  line.className = 't-line';
  line.innerHTML = '<span class="t-prompt">' + this.escapeHtml(this.getPrompt()) + '</span><span class="t-cmd">' + this.escapeHtml(cmd) + '</span>';
  this.outputEl.appendChild(line);
  this.scrollToBottom();
};

InteractiveTerminal.prototype.displayOutput = function (text, type) {
  var line = document.createElement('div');
  line.className = 't-output' + (type ? ' t-' + type : '');
  line.textContent = text;
  this.outputEl.appendChild(line);
  this.scrollToBottom();
};

InteractiveTerminal.prototype.displayHTML = function (html, type) {
  var line = document.createElement('div');
  line.className = 't-output' + (type ? ' t-' + type : '');
  line.innerHTML = html;
  this.outputEl.appendChild(line);
  this.scrollToBottom();
};

InteractiveTerminal.prototype.scrollToBottom = function () {
  this.outputEl.scrollTop = this.outputEl.scrollHeight;
};

InteractiveTerminal.prototype.escapeHtml = function (str) {
  var d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
};

InteractiveTerminal.prototype.executeCommand = function (input) {
  var parts = input.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
  var cmd = parts[0].toLowerCase();
  var args = parts.slice(1).map(function (a) { return a.replace(/^"|"$/g, ''); });

  switch (cmd) {
    case 'help': this.cmdHelp(); break;
    case 'clear': this.outputEl.innerHTML = ''; break;
    case 'ping': this.cmdPing(args); break;
    case 'traceroute': case 'tracepath': this.cmdTraceroute(args); break;
    case 'dig': this.cmdDig(args); break;
    case 'nslookup': this.cmdNslookup(args); break;
    case 'curl': this.cmdCurl(args); break;
    case 'ip': this.cmdIp(args); break;
    case 'ss': this.cmdSs(args); break;
    case 'nmap': this.cmdNmap(args); break;
    case 'tshark': this.cmdTshark(args); break;
    case 'tcpdump': this.cmdTcpdump(args); break;
    case 'arp': this.cmdArp(args); break;
    case 'mtr': this.cmdMtr(args); break;
    case 'wget': this.cmdWget(args); break;
    case 'hostname': this.displayOutput('netzwerk-lab'); break;
    case 'whoami': this.displayOutput('analyst'); break;
    case 'echo': this.displayOutput(args.join(' ')); break;
    case 'date': this.displayOutput(new Date().toLocaleString('de-DE')); break;
    case 'cat': this.cmdCat(args); break;
    case 'ifconfig': this.cmdIp(['addr']); break;
    case 'netstat': this.cmdSs(['-tunap']); break;
    case 'grep': this.displayOutput('grep: Nutzung: grep [pattern] [file]'); break;
    case 'uname': this.cmdUname(args); break;
    case 'openssl': this.cmdOpenssl(args); break;
    case 'sha256sum': this.cmdSha256(args); break;
    case 'ssh-keygen': this.cmdSshKeygen(args); break;
    case 'gpg': this.cmdGpg(args); break;
    case 'md5sum': this.cmdMd5(args); break;
    default:
      this.displayOutput('Befehl nicht gefunden: ' + cmd, 'error');
      this.displayOutput('Tippe "help" f\u00fcr verf\u00fcgbare Befehle.', 'info');
  }
};

// ---- Commands ----

InteractiveTerminal.prototype.cmdHelp = function () {
  this.displayOutput('Verf\u00fcgbare Befehle:');
  this.displayOutput('');
  this.displayOutput('  ping [host]              Erreichbarkeit testen');
  this.displayOutput('  traceroute [host]        Weg zum Ziel zeigen');
  this.displayOutput('  mtr [host]               traceroute + ping live');
  this.displayOutput('  dig [domain] [type]      DNS-Records abfragen');
  this.displayOutput('  nslookup [domain]        Einfache DNS-Abfrage');
  this.displayOutput('  curl [url]               HTTP-Request senden');
  this.displayOutput('  ip addr|route|neigh      Netzwerk-Info');
  this.displayOutput('  ss [-tunap]              Verbindungen anzeigen');
  this.displayOutput('  nmap [target]            Port-Scan');
  this.displayOutput('  tshark [options]         Traffic mitschneiden');
  this.displayOutput('  tcpdump [options]        Traffic Capture');
  this.displayOutput('  arp [-a]                 ARP-Tabelle');
  this.displayOutput('  wget [url]               Download');
  this.displayOutput('  cat [file]               Datei anzeigen');
  this.displayOutput('  clear                    Terminal leeren');
};

InteractiveTerminal.prototype.cmdPing = function (args) {
  if (!args[0]) { this.displayOutput('Usage: ping [-c count] [host]', 'error'); return; }
  var count = 4;
  var host = null;
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '-c' && args[i + 1]) { count = parseInt(args[i + 1]) || 4; i++; }
    else if (args[i] === '-W' || args[i] === '-i') { i++; }
    else if (!host && !args[i].startsWith('-')) { host = args[i]; }
  }
  if (!host) { this.displayOutput('Usage: ping [-c count] [host]', 'error'); return; }
  var ip = this.resolveIp(host);
  this.displayOutput('PING ' + host + ' (' + ip + ') 56(84) bytes of data.');
  for (var j = 1; j <= count; j++) {
    var time = (Math.random() * 20 + 5).toFixed(1);
    this.displayOutput('64 bytes from ' + ip + ': icmp_seq=' + j + ' ttl=64 time=' + time + ' ms');
  }
  this.displayOutput('--- ' + host + ' ping statistics ---');
  this.displayOutput(count + ' packets transmitted, ' + count + ' received, 0% packet loss');
};

InteractiveTerminal.prototype.cmdTraceroute = function (args) {
  if (!args[0]) { this.displayOutput('Usage: traceroute [host]', 'error'); return; }
  var host = args[0];
  this.displayOutput('traceroute to ' + host + ' (' + this.resolveIp(host) + '), 30 hops max');
  var hops = ['192.168.1.1', '10.0.0.1', '62.154.3.1', '62.154.3.17', this.resolveIp(host)];
  for (var i = 0; i < hops.length; i++) {
    var t1 = (Math.random() * 10 + (i * 3)).toFixed(3);
    var t2 = (Math.random() * 10 + (i * 3)).toFixed(3);
    var t3 = (Math.random() * 10 + (i * 3)).toFixed(3);
    this.displayOutput(' ' + (i + 1) + '  ' + hops[i] + '  ' + t1 + ' ms  ' + t2 + ' ms  ' + t3 + ' ms');
  }
};

InteractiveTerminal.prototype.cmdMtr = function (args) {
  if (!args[0]) { this.displayOutput('Usage: mtr [host]', 'error'); return; }
  this.displayOutput('Start: ' + new Date().toLocaleString('de-DE'));
  this.displayOutput('HOST: netzwerk-lab                Loss%   Snt   Last   Avg  Best  Wrst');
  var hops = ['192.168.1.1', '10.0.0.1', '62.154.3.1', this.resolveIp(args[0])];
  for (var i = 0; i < hops.length; i++) {
    var avg = (Math.random() * 15 + (i * 3)).toFixed(1);
    this.displayOutput('  ' + (i + 1) + '.|-- ' + hops[i] + '  0.0%    10  ' + avg + '  ' + avg + '  ' + (avg - 2).toFixed(1) + '  ' + (parseFloat(avg) + 5).toFixed(1));
  }
};

InteractiveTerminal.prototype.cmdDig = function (args) {
  if (!args[0]) { this.displayOutput('Usage: dig [domain] [type]', 'error'); return; }
  var domain = args[0];
  var type = 'A';
  for (var i = 1; i < args.length; i++) {
    if (!args[i].startsWith('@') && !args[i].startsWith('+') && args[i].match(/^[A-Z]+$/i)) {
      type = args[i].toUpperCase();
    }
  }
  this.displayOutput(';; Got answer:');
  this.displayOutput(';; ->>HEADER<<- opcode: QUERY, status: NOERROR');
  this.displayOutput(';; QUESTION SECTION:');
  this.displayOutput(';' + domain + '.\t\tIN\t' + type);
  this.displayOutput(';; ANSWER SECTION:');
  if (type === 'A') {
    this.displayOutput(domain + '.\t\t300\tIN\tA\t' + this.resolveIp(domain));
  } else if (type === 'MX') {
    this.displayOutput(domain + '.\t\t300\tIN\tMX\t10 mail.' + domain + '.');
  } else if (type === 'NS') {
    this.displayOutput(domain + '.\t\t300\tIN\tNS\tns1.' + domain + '.');
    this.displayOutput(domain + '.\t\t300\tIN\tNS\tns2.' + domain + '.');
  } else if (type === 'AAAA') {
    this.displayOutput(domain + '.\t\t300\tIN\tAAAA\t2001:db8::1');
  } else if (type === 'TXT') {
    this.displayOutput(domain + '.\t\t300\tIN\tTXT\t"v=spf1 include:_' + domain + ' ~all"');
  } else if (type === 'CNAME') {
    this.displayOutput(domain + '.\t\t300\tIN\tCNAME\twww.' + domain + '.');
  } else {
    this.displayOutput(';; No Answer for type ' + type);
  }
  this.displayOutput(';; Query time: ' + Math.floor(Math.random() * 30 + 5) + ' msec');
};

InteractiveTerminal.prototype.cmdNslookup = function (args) {
  if (!args[0]) { this.displayOutput('Usage: nslookup [domain]', 'error'); return; }
  this.displayOutput('Server:\t\t192.168.1.1');
  this.displayOutput('Address:\t192.168.1.1#53');
  this.displayOutput('Non-authoritative answer:');
  this.displayOutput('Name:\t' + args[0]);
  this.displayOutput('Address: ' + this.resolveIp(args[0]));
};

InteractiveTerminal.prototype.cmdCurl = function (args) {
  if (!args[0]) { this.displayOutput('Usage: curl [url]', 'error'); return; }
  var url = args[0];
  if (args.indexOf('-I') !== -1 || args.indexOf('--head') !== -1) {
    this.displayOutput('HTTP/1.1 200 OK');
    this.displayOutput('Content-Type: text/html; charset=UTF-8');
    this.displayOutput('Content-Length: 1256');
    this.displayOutput('Server: nginx/1.24');
  } else {
    this.displayOutput('<!DOCTYPE html><html><head><title>' + url + '</title></head>');
    this.displayOutput('<body><h1>Willkommen auf ' + url + '</h1></body></html>');
  }
};

InteractiveTerminal.prototype.cmdIp = function (args) {
  var sub = args[0] || 'addr';
  if (sub === 'addr' || sub === 'a') {
    this.displayOutput('1: lo: <LOOPBACK,UP> mtu 65536 qdisc noqueue state UNKNOWN');
    this.displayOutput('    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00');
    this.displayOutput('    inet 127.0.0.1/8 scope host lo');
    this.displayOutput('    inet6 ::1/128 scope host');
    this.displayOutput('2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state UP');
    this.displayOutput('    link/ether 08:00:27:a1:b2:c3 brd ff:ff:ff:ff:ff:ff');
    this.displayOutput('    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0');
    this.displayOutput('    inet6 fe80::a00:27ff:fea1:b2c3/64 scope link');
  } else if (sub === 'route' || sub === 'r') {
    this.displayOutput('default via 192.168.1.1 dev eth0 proto dhcp metric 100');
    this.displayOutput('192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100');
  } else if (sub === 'neigh' || sub === 'n') {
    this.displayOutput('192.168.1.1 dev eth0 lladdr aa:bb:cc:dd:ee:01 REACHABLE');
    this.displayOutput('192.168.1.50 dev eth0 lladdr aa:bb:cc:dd:ee:02 STALE');
  } else {
    this.displayOutput('Usage: ip [addr|route|neigh]');
  }
};

InteractiveTerminal.prototype.cmdSs = function (args) {
  this.displayOutput('Netid  State   Recv-Q Send-Q  Local Address:Port   Peer Address:Port');
  this.displayOutput('tcp    ESTAB   0      0        192.168.1.100:42312  142.250.185.206:443');
  this.displayOutput('tcp    ESTAB   0      0        192.168.1.100:38910  151.101.1.140:443');
  this.displayOutput('tcp    LISTEN  0      128            0.0.0.0:22         0.0.0.0:*');
  this.displayOutput('tcp    LISTEN  0      511            0.0.0.0:80         0.0.0.0:*');
  this.displayOutput('udp    UNCONN  0      0        192.168.1.100:68     192.168.1.1:67');
};

InteractiveTerminal.prototype.cmdNmap = function (args) {
  if (!args[0]) { this.displayOutput('Usage: nmap [target]', 'error'); return; }
  this.displayOutput('Starting Nmap 7.94 ( https://nmap.org )');
  this.displayOutput('Nmap scan report for ' + args[0] + ' (' + this.resolveIp(args[0]) + ')');
  this.displayOutput('Host is up (0.0034s latency).');
  this.displayOutput('PORT     STATE    SERVICE');
  this.displayOutput('22/tcp   open     ssh');
  this.displayOutput('53/tcp   open     domain');
  this.displayOutput('80/tcp   open     http');
  this.displayOutput('443/tcp  open     https');
  this.displayOutput('Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds');
};

InteractiveTerminal.prototype.cmdTshark = function (args) {
  this.displayOutput('Capturing on \'eth0\'');
  this.displayOutput('  1 0.000000 192.168.1.100 \u2192 192.168.1.1   DNS 74 Standard query A google.com');
  this.displayOutput('  2 0.015234 192.168.1.1   \u2192 192.168.1.100 DNS 90 Response A 142.250.185.206');
  this.displayOutput('  3 0.020000 192.168.1.100 \u2192 142.250.185.206 TCP 66 42312\u21924443 [SYN]');
  this.displayOutput('  4 0.035000 142.250.185.206 \u2192 192.168.1.100 TCP 66 443\u219242312 [SYN,ACK]');
  this.displayOutput('  5 0.036000 192.168.1.100 \u2192 142.250.185.206 TCP 54 42312\u21924443 [ACK]');
};

InteractiveTerminal.prototype.cmdTcpdump = function (args) {
  this.displayOutput('tcpdump: verbose output suppressed, use -v for full decode');
  this.displayOutput('listening on eth0, link-type EN10MB (Ethernet), snapshot length 262144 bytes');
  this.displayOutput('12:34:56.001 IP 192.168.1.100.42312 > 142.250.185.206.443: Flags [S]');
  this.displayOutput('12:34:56.015 IP 142.250.185.206.443 > 192.168.1.100.42312: Flags [S.]');
};

InteractiveTerminal.prototype.cmdArp = function (args) {
  this.displayOutput('? (192.168.1.1) at aa:bb:cc:dd:ee:01 [ether]   on eth0');
  this.displayOutput('? (192.168.1.50) at aa:bb:cc:dd:ee:02 [ether]   on eth0');
};

InteractiveTerminal.prototype.cmdWget = function (args) {
  if (!args[0]) { this.displayOutput('Usage: wget [url]', 'error'); return; }
  this.displayOutput('--' + new Date().toISOString() + '--  ' + args[0]);
  this.displayOutput('Resolving... ' + this.resolveIp(args[0]));
  this.displayOutput('Connecting... connected.');
  this.displayOutput('HTTP request sent, awaiting response... 200 OK');
  this.displayOutput('Saved \'index.html\'');
};

InteractiveTerminal.prototype.cmdCat = function (args) {
  if (!args[0]) { this.displayOutput('Usage: cat [file]', 'error'); return; }
  if (args[0].indexOf('resolv.conf') !== -1) {
    this.displayOutput('nameserver 192.168.1.1');
    this.displayOutput('search localdomain');
  } else if (args[0].indexOf('hosts') !== -1) {
    this.displayOutput('127.0.0.1\tlocalhost');
    this.displayOutput('192.168.1.100\tnetzwerk-lab');
  } else {
    this.displayOutput('cat: ' + args[0] + ': Datei nicht gefunden', 'error');
  }
};

InteractiveTerminal.prototype.cmdUname = function (args) {
  if (args.indexOf('-a') !== -1) {
    this.displayOutput('Linux netzwerk-lab 6.1.0-generic #1 SMP x86_64 GNU/Linux');
  } else {
    this.displayOutput('Linux');
  }
};

InteractiveTerminal.prototype.cmdOpenssl = function (args) {
  if (args.length === 0) {
    this.displayOutput('openssl: Nutzung: openssl s_client -connect host:port');
    return;
  }
  if (args[0] === 's_client') {
    var host = args[2] || 'example.com:443';
    var domain = host.split(':')[0];
    var output = 'CONNECTED(00000003)\n';
    output += 'depth=2 C = US, O = DigiCert Inc, OU = www.digicert.com, CN = DigiCert Global Root CA\n';
    output += 'depth=1 C = US, O = Let\'s Encrypt, CN = R3\n';
    output += 'depth=0 CN = ' + domain + '\n';
    output += '\nCertificate chain\n';
    output += ' 0 s:CN = ' + domain + '\n';
    output += '   i:C = US, O = Let\'s Encrypt, CN = R3\n';
    output += '   a:PKEY: id-ecPublicKey, 256 (bit); sigalg: RSA-SHA256\n';
    output += '   v:NotBefore: Jan 15 00:00:00 2026 GMT; NotAfter: Apr 15 00:00:00 2026 GMT\n';
    this.displayOutput(output);
  } else if (args[0] === 'x509') {
    this.displayOutput('notBefore=Jan 15 00:00:00 2026 GMT\nnotAfter=Apr 15 00:00:00 2026 GMT');
  } else if (args[0] === 'genrsa') {
    this.displayOutput('Generating RSA private key, 2048 bit long modulus (2 primes)');
    this.displayOutput('................................+++++');
    this.displayOutput('......................+++++');
    this.displayOutput('e is 65537 (0x10001)');
    this.displayOutput('-----BEGIN RSA PRIVATE KEY-----');
    this.displayOutput('MIIEowIBAAKCAQEA0Z3VS5JJcds3xfn/ygWyF8PbnGy0AHB7...');
    this.displayOutput('... (private key erstellt) ...');
    this.displayOutput('-----END RSA PRIVATE KEY-----');
    this.displayOutput('RSA Private Key erstellt: private.key (2048 Bit)');
  } else if (args[0] === 'rsa') {
    this.displayOutput('Private-Key: (2048 bit, 2 primes)');
    this.displayOutput('modulus:');
    this.displayOutput('    00:d3:9d:d5:4b:92:49:71:db:37:c5:f9:ff:ca:05:');
    this.displayOutput('    b2:17:c3:db:9c:6c:b4:00:70:7b:3e:a8:c5:91:');
    this.displayOutput('publicExponent: 65537 (0x10001)');
    this.displayOutput('privateExponent: (versteckt)');
    this.displayOutput('key der Daten: 2048 Bit RSA');
  } else if (args[0] === 'req' && args.indexOf('-newkey') !== -1) {
    this.displayOutput('Generating a RSA private key');
    this.displayOutput('..........+++++');
    this.displayOutput('......+++++');
    this.displayOutput('writing new private key to key.pem');
    this.displayOutput('-----');
    this.displayOutput('You are about to be asked to enter information that will be incorporated');
    this.displayOutput('into your certificate request.');
    this.displayOutput('Country Name (2 letter code) [AU]:DE');
    this.displayOutput('State or Province Name [Some-State]:Bayern');
    this.displayOutput('Organization Name [Internet Widgits Pty Ltd]:Mein Training');
    this.displayOutput('Common Name (e.g. server FQDN) []:netzwerk-lab.local');
    this.displayOutput('Zertifikatsanfrage erstellt: cert.pem');
  } else {
    this.displayOutput('openssl: Unbekannter Befehl. Versuche: openssl s_client -connect host:443');
  }
};


InteractiveTerminal.prototype.cmdSshKeygen = function(args) {
  if (args.indexOf('-t') !== -1 && args.indexOf('rsa') !== -1) {
    this.displayOutput('Generating public/private rsa key pair.');
    this.displayOutput('Enter file in which to save the key (/home/analyst/.ssh/id_rsa):');
    this.displayOutput('Your identification has been saved in /home/analyst/.ssh/id_rsa');
    this.displayOutput('Your public key has been saved in /home/analyst/.ssh/id_rsa.pub');
    this.displayOutput('The key fingerprint is:');
    this.displayOutput('SHA256:xK3a9fG2bH8cJ1dE5fL0mN6oP4qR7sT2uV9wX3yZ analyst@netzwerk-lab');
    this.displayOutput('The key\'s randomart image is:');
    this.displayOutput('+---[RSA 3072]----+');
    this.displayOutput('|    .o+B=o.      |');
    this.displayOutput('|   . + =.+ .     |');
    this.displayOutput('|    + * o .      |');
    this.displayOutput('|     = B .       |');
    this.displayOutput('|    . = S        |');
    this.displayOutput('+----[SHA256]-----+');
  } else if (args.indexOf('-t') !== -1 && args.indexOf('ed25519') !== -1) {
    this.displayOutput('Generating public/private ed25519 key pair.');
    this.displayOutput('Your identification has been saved in /home/analyst/.ssh/id_ed25519');
    this.displayOutput('Your public key has been saved in /home/analyst/.ssh/id_ed25519.pub');
    this.displayOutput('SHA256:aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0u analyst@netzwerk-lab');
  } else {
    this.displayOutput('ssh-keygen: Nutzung: ssh-keygen -t rsa  oder  ssh-keygen -t ed25519');
  }
};

InteractiveTerminal.prototype.cmdGpg = function(args) {
  if (args[0] === '--gen-key' || args[0] === '--full-generate-key') {
    this.displayOutput('gpg (GnuPG) 2.2.40; Copyright (C) 2023 g10 Code GmbH');
    this.displayOutput('Please select what kind of key you want:');
    this.displayOutput('   (1) RSA and RSA (default)');
    this.displayOutput('   (2) DSA and Elgamal');
    this.displayOutput('   (3) DSA (sign only)');
    this.displayOutput('   (4) RSA (sign only)');
    this.displayOutput('Your selection? 1');
    this.displayOutput('RSA keys may be between 1024 and 4096 bits long.');
    this.displayOutput('What keysize do you want? (3072) 4096');
    this.displayOutput('Requested keysize is 4096 bits');
    this.displayOutput('Key expires at: nie');
    this.displayOutput('GPG-Schl\xfcsselpaar erstellt: RSA 4096 Bit');
    this.displayOutput('Public Key: /home/analyst/.gnupg/public.key');
    this.displayOutput('Private Key: /home/analyst/.gnupg/private.key');
  } else if (args[0] === '--list-keys') {
    this.displayOutput('/home/analyst/.gnupg/pubring.kbx');
    this.displayOutput('-------------------------------');
    this.displayOutput('pub   rsa4096 2026-04-12 [SC]');
    this.displayOutput('      ABC1DEF2GHI3JKL4MNO5PQR6STU7VWX8YZ9');
    this.displayOutput('uid        [ ultimativ ] Analyst <analyst@netzwerk-lab.local>');
    this.displayOutput('sub   rsa4096 2026-04-12 [E]');
  } else if (args[0] === '--export') {
    this.displayOutput('-----BEGIN PGP PUBLIC KEY BLOCK-----');
    this.displayOutput('mDMEZxMhRxYJKwYBBAHaRw8BAQdAXYZ...');
    this.displayOutput('... (Public Key exportiert) ...');
    this.displayOutput('-----END PGP PUBLIC KEY BLOCK-----');
  } else {
    this.displayOutput('gpg: Nutzung: gpg --gen-key | --list-keys | --export');
  }
};

InteractiveTerminal.prototype.resolveIp = function (host) {
  var map = {
    'google.com': '142.250.185.206',
    'github.com': '140.82.121.4',
    'example.com': '93.184.216.34',
    'facebook.com': '157.240.214.35',
    '8.8.8.8': '8.8.8.8',
    '1.1.1.1': '1.1.1.1',
    'localhost': '127.0.0.1'
  };
  var clean = host.replace(/https?:\/\//, '').replace(/\/.*/, '');
  return map[clean] || map[host] || '10.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 254 + 1);
};

InteractiveTerminal.prototype.cmdSha256 = function (args) {
  var file = args[0] || 'file.txt';
  var hash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  if (file === 'test.txt' || file === 'daten.img') {
    hash = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
  } else if (file === 'image.dd' || file === 'evidence.dd') {
    hash = '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824';
  }
  this.displayOutput(hash + '  ' + file);
};

InteractiveTerminal.prototype.cmdMd5 = function (args) {
  var file = args[0] || 'file.txt';
  var hash = 'd41d8cd98f00b204e9800998ecf8427e';
  if (file === 'test.txt' || file === 'daten.img') {
    hash = '098f6bcd4621d373cade4e832627b4f6';
  } else if (file === 'image.dd' || file === 'evidence.dd') {
    hash = '8b1a9953c4611296a827abf8c47804d7';
  }
  this.displayOutput(hash + '  ' + file);
};
