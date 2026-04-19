var TerminalSharedFS = {
	'/': { type: 'dir', children: ['cases', 'dev', 'home', 'mnt', 'tmp'] },
	'/cases': { type: 'dir', children: [] },
	'/dev': { type: 'dir', children: ['sda', 'sda1', 'sda2', 'sdb', 'sdb1', 'nvme0n1', 'nvme0n1p1', 'loop0', 'loop1', 'zero', 'null'] },
	'/home': { type: 'dir', children: ['analyst'] },
	'/home/analyst': { type: 'dir', children: [] },
	'/mnt': { type: 'dir', children: ['usb', 'image'] },
	'/mnt/usb': { type: 'dir', children: [] },
	'/mnt/image': { type: 'dir', children: [] },
	'/tmp': { type: 'dir', children: [] }
};

var TerminalSharedDevices = {
	sda: { size: '500GB', model: 'Samsung SSD 860', type: 'disk', children: { sda1: { size: '512M', type: 'part', fstype: 'ext4', mountpoint: '/boot' }, sda2: { size: '499G', type: 'part', fstype: 'ext4', mountpoint: '/' } } },
	sdb: { size: '16GB', model: 'SanDisk USB', type: 'disk', children: { sdb1: { size: '16G', type: 'part', fstype: 'vfat', mountpoint: '' } } },
	nvme0n1: { size: '512GB', model: 'Samsung NVMe 970', type: 'disk', children: { nvme0n1p1: { size: '512G', type: 'part', fstype: 'ext4', mountpoint: '' } } }
};

var TerminalSharedNetworkFS = {
	'/': { type: 'dir', children: ['home', 'etc', 'tmp'] },
	'/home': { type: 'dir', children: ['analyst'] },
	'/home/analyst': { type: 'dir', children: [] },
	'/etc': { type: 'dir', children: ['hosts', 'resolv.conf'] },
	'/etc/hosts': { type: 'file', content: '127.0.0.1\tlocalhost\n192.168.1.100\tnetzwerk-lab', size: '48B' },
	'/etc/resolv.conf': { type: 'file', content: 'nameserver 192.168.1.1\nsearch localdomain', size: '40B' },
	'/tmp': { type: 'dir', children: [] }
};

var TerminalSharedNetwork = {
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
	dnsMap: {
		'google.com': '142.250.185.206',
		'github.com': '140.82.121.4',
		'example.com': '93.184.216.34',
		'facebook.com': '157.240.214.35',
		'8.8.8.8': '8.8.8.8',
		'1.1.1.1': '1.1.1.1',
		'localhost': '127.0.0.1'
	}
};

var TerminalSharedWindowsFS = {
	'/': { type: 'dir', children: ['cases', 'tools', 'tmp'] },
	'/cases': { type: 'dir', children: ['case01', 'uebung01'] },
	'/cases/case01': { type: 'dir', children: ['images', 'hashes', 'notes', 'reports'] },
	'/cases/case01/images': { type: 'dir', children: ['disk01.img', 'disk01.E01'] },
	'/cases/case01/hashes': { type: 'dir', children: ['original.md5', 'image.md5'] },
	'/cases/case01/notes': { type: 'dir', children: ['session.log', 'verification.txt'] },
	'/cases/case01/reports': { type: 'dir', children: [] },
	'/cases/uebung01': { type: 'dir', children: ['images', 'notes'] },
	'/cases/uebung01/images': { type: 'dir', children: [] },
	'/cases/uebung01/notes': { type: 'dir', children: [] },
	'/tools': { type: 'dir', children: ['ftkimager.exe', 'strings.exe', 'dd.exe', 'aim_cli.exe'] },
	'/tmp': { type: 'dir', children: [] },
	'/cases/case01/images/disk01.img': { type: 'file', content: '[raw image data]', size: '32GB' },
	'/cases/case01/images/disk01.E01': { type: 'file', content: '[e01 image data]', size: '18GB' },
	'/cases/case01/hashes/original.md5': { type: 'file', content: 'A1B2C3D4E5F67890ABCDEF1234567890  original', size: '48B' },
	'/cases/case01/hashes/image.md5': { type: 'file', content: 'A1B2C3D4E5F67890ABCDEF1234567890  disk01.img', size: '52B' },
	'/cases/case01/notes/session.log': { type: 'file', content: 'Transcript started...\nTranscript stopped.', size: '2KB' },
	'/cases/case01/notes/verification.txt': { type: 'file', content: 'Verification: MATCH', size: '64B' }
};

var TerminalEnvConfig = {
	'linux-forensik': {
		title: 'FORENSIK-TERMINAL',
		welcomeMsg: 'Willkommen im Forensik-Terminal. Tippe "help" fuer alle Befehle.\n'
	},
	'netzwerk-forensik': {
		title: 'NETZWERK-TERMINAL',
		welcomeMsg: 'Willkommen im Netzwerk-Terminal. Tippe "help" fuer alle Befehle.\n'
	},
	'windows-forensik': {
		title: 'WINDOWS-TERMINAL',
		welcomeMsg: 'Willkommen im Windows-Forensik-Terminal. Tippe "help" fuer alle Befehle.\n'
	}
};

var TerminalBaseCommandNames = ['clear', 'echo', 'tee', 'date', 'whoami', 'which', 'history', 'pwd', 'cd', 'mkdir', 'cat', 'uname', 'help', 'man', 'sudo', 'sync', 'exit', 'ls', 'tree', 'grep', 'find', 'strings', 'file', 'stat', 'head', 'tail', 'rm', 'cp', 'mv', 'touch', 'sha256sum', 'md5sum', 'shasum', 'xxd', 'hexdump', 'diff', 'cmp', 'apt', 'apt-get'];

var TerminalForensikCommandNames = ['lsblk', 'fdisk', 'parted', 'dd', 'dc3dd', 'dcfldd', 'ewfacquire', 'mount', 'umount', 'losetup', 'ewfmount', 'fls', 'mmls', 'icat', 'istat', 'hdparm', 'nvme', 'blockdev', 'script', 'blkid'];

var TerminalNetzwerkCommandNames = ['ping', 'traceroute', 'tracepath', 'mtr', 'dig', 'nslookup', 'curl', 'wget', 'ip', 'ifconfig', 'ss', 'netstat', 'nmap', 'tshark', 'tcpdump', 'arp', 'openssl', 'ssh-keygen', 'gpg', 'hostname'];
var TerminalWindowsCommandNames = ['get-disk', 'get-partition', 'get-volume', 'get-physicaldisk', 'get-filehash', 'get-childitem', 'get-command', 'get-history', 'select', 'select-object', 'export-csv', 'out-file', 'start-transcript', 'stop-transcript', 'diskpart', 'certutil', 'ftkimager.exe', 'dd.exe', 'aim_cli.exe', 'format-hex', 'compare-object', 'findstr', 'strings.exe', 'winget'];

var TerminalCommands = {
	resolvePath: function(currentPath, p) {
		if (p.charAt(0) === '/') return p.replace(/\/$/, '') || '/';
		if (p === '..') {
			var parts = currentPath.split('/').filter(Boolean);
			parts.pop();
			return '/' + parts.join('/') || '/';
		}
		var base = currentPath === '/' ? '' : currentPath;
		return (base + '/' + p).replace(/\/+$/, '') || '/';
	},

	getArg: function(args, prefix) {
		for (var i = 0; i < args.length; i++) {
			if (args[i].indexOf(prefix + '=') === 0) return args[i].substring(prefix.length + 1);
		}
		return null;
	},

	isCommandAvailable: function(cmd, envId) {
		if (TerminalBaseCommandNames.indexOf(cmd) !== -1) return true;
		if (envId === 'linux-forensik' && TerminalForensikCommandNames.indexOf(cmd) !== -1) return true;
		if (envId === 'netzwerk-forensik' && TerminalNetzwerkCommandNames.indexOf(cmd) !== -1) return true;
		if (envId === 'windows-forensik' && TerminalWindowsCommandNames.indexOf(cmd) !== -1) return true;
		return false;
	},

	execute: function(cmdLine, ctx, stdin) {
		var parts = cmdLine.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
		var cmdRaw = parts[0] || '';
		var cmd = cmdRaw.toLowerCase();
		var args = parts.slice(1).map(function(a) { return a.replace(/^"|"$/g, ''); });
		var self = TerminalCommands;
		var envId = ctx.environment || 'linux-forensik';

		if (!self.isCommandAvailable(cmd, envId)) {
			return { outputs: [{ text: 'bash: ' + cmdRaw + ': Befehl nicht gefunden. Tippe "help" fuer Hilfe.', type: 'error' }], clear: false };
		}

		switch (cmd) {
			case 'ls': return { outputs: self.ls(ctx, args), clear: false };
			case 'lsblk': return { outputs: self.lsblk(ctx, args), clear: false };
			case 'fdisk': return { outputs: self.fdisk(ctx, args), clear: false };
			case 'parted': return { outputs: self.parted(ctx, args), clear: false };
			case 'pwd': return { outputs: [{ text: ctx.currentPath, type: 'success' }], clear: false };
			case 'cd': return { outputs: self.cd(ctx, args), clear: false };
			case 'mkdir': return { outputs: self.mkdir(ctx, args), clear: false };
			case 'cat': return { outputs: self.cat(ctx, args), clear: false };
			case 'echo': return { outputs: [{ text: args.join(' '), type: null }], clear: false };
			case 'tee': return { outputs: [{ text: args.join(' '), type: null }], clear: false };
			case 'date': return { outputs: [{ text: new Date().toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'long' }), type: null }], clear: false };
			case 'uname': return { outputs: self.uname(ctx, args), clear: false };
			case 'whoami': return { outputs: [{ text: 'analyst', type: null }], clear: false };
			case 'which': return { outputs: self.which(ctx, args), clear: false };
			case 'history': return { outputs: self.history(ctx, args), clear: false };
			case 'dd': return { outputs: self.dd(ctx, args), clear: false };
			case 'dc3dd': return { outputs: self.dc3dd(ctx, args), clear: false };
			case 'dcfldd': return { outputs: self.dcfldd(ctx, args), clear: false };
			case 'ewfacquire': return { outputs: self.ewfacquire(ctx, args), clear: false };
			case 'sha256sum': return { outputs: self.sha256(ctx, args), clear: false };
			case 'md5sum': return { outputs: self.md5(ctx, args), clear: false };
			case 'mount': return { outputs: self.mount(ctx, args), clear: false };
			case 'umount': return { outputs: self.umount(ctx, args), clear: false };
			case 'losetup': return { outputs: self.losetup(ctx, args), clear: false };
			case 'ewfmount': return { outputs: self.ewfmount(ctx, args), clear: false };
			case 'xxd': return { outputs: self.xxd(ctx, args), clear: false };
			case 'strings': return { outputs: self.strings(ctx, args), clear: false };
			case 'grep': return { outputs: self.grep(ctx, args, stdin), clear: false };
			case 'find': return { outputs: self.find(ctx, args), clear: false };
			case 'diff': return { outputs: [{ text: 'diff: Gib zwei Dateien an, z.B. diff file1.txt file2.txt', type: null }], clear: false };
			case 'cmp': return { outputs: [{ text: 'cmp: Gib zwei Dateien an, z.B. cmp file1.bin file2.bin', type: null }], clear: false };
			case 'fls': return { outputs: self.fls(ctx, args), clear: false };
			case 'mmls': return { outputs: self.mmls(ctx, args), clear: false };
			case 'icat': return { outputs: self.icatCmd(ctx, args), clear: false };
			case 'istat': return { outputs: self.istatCmd(ctx, args), clear: false };
			case 'hdparm': return { outputs: self.hdparm(ctx, args), clear: false };
			case 'nvme': return { outputs: self.nvme(ctx, args), clear: false };
			case 'blockdev': return { outputs: self.blockdev(ctx, args), clear: false };
			case 'script': return { outputs: self.script(ctx, args), clear: false };
			case 'clear': return { outputs: [], clear: true };
			case 'help': return { outputs: self.help(ctx, args), clear: false };
			case 'blkid': return { outputs: self.blkid(ctx, args), clear: false };
			case 'exit': {
				var exitMsg = 'exit: Terminal-Sitzung kann hier nicht beendet werden.';
				var exitType = 'warning';
				if (ctx.scriptActive) {
					exitMsg = 'Protokollierung beendet. Session aufgezeichnet.';
					exitType = 'success';
					if (ctx.scriptFile) {
						ctx.scriptLines.push('', 'Script beendet am ' + new Date().toLocaleString('de-DE'));
						ctx.filesystem[ctx.scriptFile] = { type: 'file', content: ctx.scriptLines.join('\n'), size: '2KB' };
					}
				}
				return { outputs: [{ text: exitMsg, type: exitType }], clear: false, exitScript: true };
			}
			case 'man': return { outputs: [{ text: 'Keine man-pages verfuegbar. Nutze "help" fuer eine Befehlsuebersicht.', type: 'info' }], clear: false };
			case 'sudo': return { outputs: [{ text: 'sudo: Keine hoeheren Rechte in dieser Simulation noetig.', type: 'warning' }], clear: false };
			case 'sync': return { outputs: [], clear: false };
			case 'file': return { outputs: self.fileCmd(ctx, args), clear: false };
			case 'stat': return { outputs: self.statCmd(ctx, args), clear: false };
			case 'head': return { outputs: self.headCmd(ctx, args), clear: false };
			case 'tail': return { outputs: self.tailCmd(ctx, args), clear: false };
			case 'rm': return { outputs: self.rmCmd(ctx, args), clear: false };
			case 'cp': return { outputs: self.cpCmd(ctx, args), clear: false };
			case 'mv': return { outputs: self.mvCmd(ctx, args), clear: false };
			case 'touch': return { outputs: self.touchCmd(ctx, args), clear: false };
			case 'tree': return { outputs: self.treeCmd(ctx, args), clear: false };
			case 'hexdump': return { outputs: self.hexdumpCmd(ctx, args), clear: false };
			case 'shasum': return { outputs: self.shasumCmd(ctx, args), clear: false };
			case 'apt':
			case 'apt-get': return { outputs: [{ text: 'Paketverwaltung in dieser Simulation nicht verfuegbar.', type: 'warning' }], clear: false };

			case 'ping': return { outputs: self.cmdPing(ctx, args), clear: false };
			case 'traceroute': case 'tracepath': return { outputs: self.cmdTraceroute(ctx, args), clear: false };
			case 'mtr': return { outputs: self.cmdMtr(ctx, args), clear: false };
			case 'dig': return { outputs: self.cmdDig(ctx, args), clear: false };
			case 'nslookup': return { outputs: self.cmdNslookup(ctx, args), clear: false };
			case 'curl': return { outputs: self.cmdCurl(ctx, args), clear: false };
			case 'wget': return { outputs: self.cmdWget(ctx, args), clear: false };
			case 'ip': return { outputs: self.cmdIp(ctx, args), clear: false };
			case 'ifconfig': return { outputs: self.cmdIfconfig(ctx, args), clear: false };
			case 'ss': return { outputs: self.cmdSs(ctx, args), clear: false };
			case 'netstat': return { outputs: self.cmdSs(ctx, args), clear: false };
			case 'nmap': return { outputs: self.cmdNmap(ctx, args), clear: false };
			case 'tshark': return { outputs: self.cmdTshark(ctx, args), clear: false };
			case 'tcpdump': return { outputs: self.cmdTcpdump(ctx, args), clear: false };
			case 'arp': return { outputs: self.cmdArp(ctx, args), clear: false };
			case 'openssl': return { outputs: self.cmdOpenssl(ctx, args), clear: false };
			case 'ssh-keygen': return { outputs: self.cmdSshKeygen(ctx, args), clear: false };
			case 'gpg': return { outputs: self.cmdGpg(ctx, args), clear: false };
			case 'hostname': return { outputs: self.cmdHostname(ctx, args), clear: false };
			case 'get-disk': return { outputs: self.cmdGetDisk(ctx, args), clear: false };
			case 'get-partition': return { outputs: self.cmdGetPartition(ctx, args), clear: false };
			case 'get-volume': return { outputs: self.cmdGetVolume(ctx, args), clear: false };
			case 'get-physicaldisk': return { outputs: self.cmdGetPhysicalDisk(ctx, args), clear: false };
			case 'get-filehash': return { outputs: self.cmdGetFileHash(ctx, args), clear: false };
			case 'get-childitem': return { outputs: self.cmdGetChildItem(ctx, args), clear: false };
			case 'get-command': return { outputs: self.cmdGetCommand(ctx, args), clear: false };
			case 'get-history': return { outputs: self.history(ctx, args), clear: false };
			case 'select':
			case 'select-object': return { outputs: self.cmdSelectObject(ctx, args, stdin), clear: false };
			case 'export-csv': return { outputs: self.cmdExportCsv(ctx, args, stdin), clear: false };
			case 'out-file': return { outputs: self.cmdOutFile(ctx, args, stdin), clear: false };
			case 'start-transcript': return { outputs: self.cmdStartTranscript(ctx, args), clear: false };
			case 'stop-transcript': return { outputs: self.cmdStopTranscript(ctx, args), clear: false };
			case 'diskpart': return { outputs: self.cmdDiskpart(ctx, args), clear: false };
			case 'certutil': return { outputs: self.cmdCertutil(ctx, args), clear: false };
			case 'ftkimager.exe': return { outputs: self.cmdFtkImager(ctx, args), clear: false };
			case 'dd.exe': return { outputs: self.dd(ctx, args), clear: false };
			case 'aim_cli.exe': return { outputs: self.cmdAimCli(ctx, args), clear: false };
			case 'format-hex': return { outputs: self.cmdFormatHex(ctx, args), clear: false };
			case 'compare-object': return { outputs: self.cmdCompareObject(ctx, args), clear: false };
			case 'findstr': return { outputs: self.cmdFindstr(ctx, args, stdin), clear: false };
			case 'strings.exe': return { outputs: self.strings(ctx, args), clear: false };
			case 'winget': return { outputs: self.cmdWinget(ctx, args), clear: false };

			default: return { outputs: [{ text: 'bash: ' + cmdRaw + ': Befehl nicht gefunden. Tippe "help" fuer Hilfe.', type: 'error' }], clear: false };
		}
	},

	_splitChain: function(str, sep) {
		var parts = [], cur = '', inQ = false;
		for (var i = 0; i < str.length; i++) {
			if (str[i] === '"') inQ = !inQ;
			if (!inQ && str.substring(i, i + sep.length) === sep) {
				parts.push(cur); cur = ''; i += sep.length - 1;
			} else { cur += str[i]; }
		}
		if (cur) parts.push(cur);
		return parts;
	},

	executeLine: function(cmdLine, ctx) {
		var self = TerminalCommands;
		cmdLine = cmdLine.replace(/\s*2>\/dev\/null\s*/g, ' ').trim();
		if (!cmdLine) return { outputs: [], clear: false };
		var semiParts = self._splitChain(cmdLine, ';');
		var allOutputs = [], clear = false, exitScript = false;
		for (var s = 0; s < semiParts.length; s++) {
			var andParts = self._splitChain(semiParts[s], '&&');
			for (var a = 0; a < andParts.length; a++) {
				var seg = andParts[a].trim();
				if (!seg) continue;
				var redirFile = null;
				var ri = seg.lastIndexOf('>');
				if (ri > 0 && seg[ri - 1] !== '|') {
					redirFile = seg.substring(ri + 1).trim();
					seg = seg.substring(0, ri).trim();
				}
				var pipeParts = self._splitChain(seg, '|');
				var pipeInput = null, result;
				for (var p = 0; p < pipeParts.length; p++) {
					var pc = pipeParts[p].trim();
					if (!pc) continue;
					result = self.execute(pc, ctx, pipeInput);
					if (result.clear) { clear = true; break; }
					if (result.exitScript) exitScript = true;
					if (p < pipeParts.length - 1) {
						pipeInput = '';
						for (var o = 0; o < result.outputs.length; o++) pipeInput += result.outputs[o].text + '\n';
						result = { outputs: [] };
					}
				}
				if (clear) break;
				if (redirFile && result.outputs.length > 0) {
					var content = '';
					for (var o = 0; o < result.outputs.length; o++) content += result.outputs[o].text + '\n';
					var fp = ctx.resolvePath(redirFile);
					ctx.filesystem[fp] = { type: 'file', content: content.trim(), size: content.trim().length + 'B' };
					var pp = fp.substring(0, fp.lastIndexOf('/')) || '/';
					var pr = ctx.filesystem[pp];
					var bn = fp.substring(fp.lastIndexOf('/') + 1);
					if (pr && pr.type === 'dir' && pr.children.indexOf(bn) === -1) pr.children.push(bn);
					result = { outputs: [] };
				}
				for (var o = 0; o < result.outputs.length; o++) allOutputs.push(result.outputs[o]);
				var hasErr = false;
				for (var o = 0; o < result.outputs.length; o++) { if (result.outputs[o].type === 'error') { hasErr = true; break; } }
				if (hasErr) break;
			}
			if (clear) break;
		}
		return { outputs: allOutputs, clear: clear, exitScript: exitScript };
	},

	help: function(ctx, args) {
		var envId = ctx.environment || 'linux-forensik';
		var h = 'Verfuegbare Befehle:\n\n';
		h += 'Navigation:\n';
		h += '  ls [-la] [Pfad]    - Verzeichnis auflisten\n';
		h += '  cd <Pfad>          - Verzeichnis wechseln\n';
		h += '  pwd                - Aktuelles Verzeichnis anzeigen\n';
		h += '  tree [Pfad]        - Verzeichnisbaum anzeigen\n';
		h += '  clear              - Terminal loeschen\n\n';
		h += 'Dateien:\n';
		h += '  cat [file]         - Dateiinhalt anzeigen\n';
		h += '  head [-n N] [file] - Erste Zeilen anzeigen\n';
		h += '  tail [-n N] [file] - Letzte Zeilen anzeigen\n';
		h += '  file [file]        - Dateityp bestimmen\n';
		h += '  stat [file]        - Dateimetadaten anzeigen\n';
		h += '  cp [src] [dest]    - Datei kopieren\n';
		h += '  mv [src] [dest]    - Datei verschieben\n';
		h += '  rm [-r] [file]     - Datei loeschen\n';
		h += '  touch [file]       - Datei erstellen/aktualisieren\n';
		h += '  mkdir -p [path]    - Verzeichnis erstellen\n\n';
		h += 'Suche:\n';
		h += '  grep [pattern]     - Muster suchen\n';
		h += '  find [path] ...    - Dateien suchen\n';
		h += '  strings [file]     - Strings extrahieren\n\n';
		h += 'Hashing:\n';
		h += '  sha256sum [file]   - SHA-256 Hash berechnen\n';
		h += '  md5sum [file]      - MD5 Hash berechnen\n';
		h += '  shasum [-c] [file] - Hash berechnen/pruefen\n\n';
		h += 'System:\n';
		h += '  echo [text]        - Text ausgeben\n';
		h += '  date               - Datum/Zeit anzeigen\n';
		h += '  uname -a           - Systeminformationen\n';
		h += '  whoami             - Aktueller Benutzer\n';
		h += '  history            - Befehlsverlauf\n';
		h += '  which [cmd]        - Befehlspfad anzeigen\n\n';

		if (envId === 'linux-forensik') {
			h += 'Identifikation:\n';
			h += '  lsblk [-o ...]     - Blockgeraete anzeigen\n';
			h += '  fdisk -l [dev]     - Partitionstabelle anzeigen\n';
			h += '  parted [dev] print - Partitionstabelle strukturiert\n';
			h += '  hdparm -I [dev]    - Geraete-Info/Serial\n\n';
			h += 'Imaging:\n';
			h += '  dd if=... of=...   - Image erstellen\n';
			h += '  dc3dd if=...       - Forensisches dd mit Hash\n';
			h += '  dcfldd if=...      - Forensisches dd Alternative\n';
			h += '  ewfacquire [dev]   - E01-Image erstellen\n\n';
			h += 'Mount:\n';
			h += '  mount -o ...       - Dateisystem einhaengen\n';
			h += '  umount [path]      - Dateisystem aushaengen\n';
			h += '  losetup -a         - Loop-Devices anzeigen\n';
			h += '  ewfmount [E01]     - E01-Image mounten\n\n';
			h += 'Analyse:\n';
			h += '  xxd -l N [file]   - Hex-Dump erstellen\n';
			h += '  hexdump -C [file]  - Hex-Dump (kanonisch)\n';
			h += '  fls -r [image]     - Sleuth Kit: Dateiliste\n';
			h += '  mmls [image]       - Sleuth Kit: Partitions-Layout\n';
			h += '  icat [image] [ino]  - Sleuth Kit: Inode extrahieren\n';
			h += '  istat [image] [ino] - Sleuth Kit: Inode-Statistiken\n\n';
			h += 'Verwaltung:\n';
			h += '  script [file]      - Protokollierung starten\n';
			h += '  blkid [dev]        - Block-Geraete-UUID\n';
			h += '  blockdev --setro   - Read-only setzen\n';
		}

		if (envId === 'netzwerk-forensik') {
			h += 'Netzwerk-Diagnose:\n';
			h += '  ping [-c N] [host] - Erreichbarkeit testen\n';
			h += '  traceroute [host]  - Weg zum Ziel zeigen\n';
			h += '  mtr [host]         - traceroute + ping live\n\n';
			h += 'DNS:\n';
			h += '  dig [domain] [typ] - DNS-Records abfragen\n';
			h += '  nslookup [domain]  - Einfache DNS-Abfrage\n\n';
			h += 'HTTP:\n';
			h += '  curl [url]         - HTTP-Request senden\n';
			h += '  wget [url]         - Download\n\n';
			h += 'Netzwerk-Info:\n';
			h += '  ip addr|route|neigh - Netzwerk-Info\n';
			h += '  ifconfig           - Interface-Info (legacy)\n';
			h += '  ss [-tunap]        - Verbindungen anzeigen\n';
			h += '  netstat            - Verbindungen (legacy)\n';
			h += '  arp [-a]           - ARP-Tabelle\n\n';
			h += 'Sicherheit:\n';
			h += '  nmap [target]      - Port-Scan\n';
			h += '  tshark [opts]      - Traffic mitschneiden\n';
			h += '  tcpdump [opts]     - Traffic Capture\n\n';
			h += 'Kryptographie:\n';
			h += '  openssl s_client   - TLS-Zertifikat pruefen\n';
			h += '  ssh-keygen -t rsa  - SSH-Schluessel erstellen\n';
			h += '  gpg --gen-key      - GPG-Schluessel erstellen\n';
		}

		if (envId === 'windows-forensik') {
			h += 'Identifikation:\n';
			h += '  Get-Disk                     - Physische Datentraeger\n';
			h += '  Get-Partition -DiskNumber N  - Partitionen eines Datentraegers\n';
			h += '  Get-Volume                   - Volumes und Dateisysteme\n';
			h += '  Get-PhysicalDisk             - Hardwaredetails\n\n';
			h += 'Imaging und Verifikation:\n';
			h += '  ftkimager.exe ... --verify   - E01/RAW Imaging\n';
			h += '  dd.exe if=... of=...         - RAW-Imaging\n';
			h += '  Get-FileHash -Algorithm MD5  - Hash berechnen\n';
			h += '  certutil -hashfile ... MD5   - Hash per CMD\n';
			h += '  aim_cli.exe --mount --readonly - Read-only Mount\n\n';
			h += 'Analyse und Dokumentation:\n';
			h += '  Format-Hex -Path ...         - Hex-Ausgabe\n';
			h += '  Compare-Object (...) (...)   - Textvergleich\n';
			h += '  strings.exe [file]           - Strings extrahieren\n';
			h += '  findstr /I ...               - Treffer filtern\n';
			h += '  Get-History                  - Befehlsverlauf anzeigen\n';
			h += '  Select / Select-Object ...   - Ausgabe filtern\n';
			h += '  Export-Csv [path]            - CSV-Datei schreiben\n';
			h += '  Out-File [path]              - Textdatei schreiben\n';
			h += '  Start-Transcript             - Logging starten\n';
			h += '  Stop-Transcript              - Logging beenden\n';
			h += '  diskpart                     - Datentraegerverwaltung\n';
			h += '  winget install [paket]       - Tool-Installation\n';
		}

		return [{ text: h, type: 'info' }];
	},

	ls: function(ctx, args) {
		var flags = args.filter(function(a) { return a.charAt(0) === '-'; }).join('');
		var target = args.filter(function(a) { return a.charAt(0) !== '-'; })[0];
		var path = target ? ctx.resolvePath(target) : ctx.currentPath;
		var showLong = flags.indexOf('l') !== -1;
		var showHidden = flags.indexOf('a') !== -1 || showLong;
		var entry = ctx.filesystem[path];
		if (!entry) return [{ text: 'ls: Zugriff nicht moeglich: ' + path + ': Datei oder Verzeichnis nicht gefunden', type: 'error' }];
		if (entry.type === 'file') return [{ text: path, type: null }];
		var items = entry.children || [];
		if (!showLong && !showHidden) {
			return [{ text: items.join('  '), type: null }];
		}
		var self = TerminalCommands;
		var totalSize = 4096 * (items.length + 2);
		var output = 'insgesamt ' + totalSize + '\n';
		output += 'drwxr-xr-x  2 analyst analyst ' + String('4096').padStart(12) + ' Maerz 15 09:30 .\n';
		output += 'drwxr-xr-x  3 analyst analyst ' + String('4096').padStart(12) + ' Maerz 15 09:25 ..\n';
		var dateMap = {
			'images': 'Maerz 15 09:30', 'mounts': 'Maerz 15 09:32', 'hashes': 'Maerz 15 09:35',
			'notes': 'Maerz 15 10:15', 'reports': 'Maerz 15 10:45', 'logs': 'Maerz 15 11:00',
			'disk01.img': 'Maerz 15 09:31', 'usb_sandisk_32gb.img': 'Maerz 15 09:31',
			'memory_dump.raw': 'Maerz 15 09:33', 'header.img': 'Maerz 15 09:34',
			'original.sha256': 'Maerz 15 09:36', 'image.sha256': 'Maerz 15 09:37',
			'original.md5': 'Maerz 15 09:36', 'dc3dd_image.sha256': 'Maerz 15 09:37',
			'system_info.txt': 'Maerz 15 09:37', 'session_20240315.log': 'Maerz 15 11:30',
			'filelist_full.txt': 'Maerz 15 09:40', 'mbr.hex': 'Maerz 15 09:41',
			'strings_sensitive.txt': 'Maerz 15 09:55', 'lsblk_before.txt': 'Maerz 15 09:26',
			'fdisk_sdb.txt': 'Maerz 15 09:27', 'chain_of_custody.txt': 'Maerz 15 10:46',
			'verification.txt': 'Maerz 15 10:47', 'auth.log': 'Maerz 15 11:05',
			'syslog': 'Maerz 15 08:01', 'apache_access.log': 'Maerz 15 11:10',
			'usb01': 'Maerz 15 09:45', 'image01': 'Maerz 15 09:50',
			'analyst': 'Maerz 14 08:00', 'cases': 'Maerz 15 09:20',
			'usb': 'Maerz 15 09:45', 'image': 'Maerz 15 09:50',
			'sda': 'Maerz 10 12:00', 'sda1': 'Maerz 10 12:00', 'sda2': 'Maerz 10 12:00',
			'sdb': 'Maerz 15 09:25', 'sdb1': 'Maerz 15 09:25',
			'nvme0n1': 'Maerz 10 12:00', 'nvme0n1p1': 'Maerz 10 12:00',
			'loop0': 'Maerz 15 09:31', 'loop1': 'Maerz 15 09:31',
			'zero': 'Maerz 10 12:00', 'null': 'Maerz 10 12:00',
			'hosts': 'Maerz 15 08:00', 'resolv.conf': 'Maerz 15 08:00',
			'home': 'Maerz 14 08:00', 'etc': 'Maerz 15 08:00', 'tmp': 'Maerz 15 08:00'
		};
		for (var i = 0; i < items.length; i++) {
			var childPath = path === '/' ? '/' + items[i] : path + '/' + items[i];
			var child = ctx.filesystem[childPath];
			var isDir = child && child.type === 'dir';
			var prefix = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
			var size;
			if (isDir) {
				size = '4096';
			} else if (child && child.size) {
				size = String(self.parseSizeBytes(child.size));
			} else {
				size = '0';
			}
			var date = dateMap[items[i]] || 'Maerz 15 09:30';
			output += prefix + '  1 analyst analyst ' + size.padStart(12) + ' ' + date + ' ' + items[i] + '\n';
		}
		return [{ text: output, type: null }];
	},

	cd: function(ctx, args) {
		if (!args[0] || args[0] === '~') { ctx.currentPath = '/home/analyst'; return []; }
		if (args[0] === '..') {
			var parts = ctx.currentPath.split('/').filter(Boolean);
			parts.pop();
			ctx.currentPath = '/' + parts.join('/') || '/';
			return [];
		}
		var newPath = ctx.resolvePath(args[0]);
		var entry = ctx.filesystem[newPath];
		if (entry && entry.type === 'dir') {
			ctx.currentPath = newPath;
			return [];
		}
		return [{ text: 'cd: ' + args[0] + ': Datei oder Verzeichnis nicht gefunden', type: 'error' }];
	},

	mkdir: function(ctx, args) {
		var hasParents = args.indexOf('-p') !== -1;
		var pathArgs = args.filter(function(a) { return a !== '-p'; });
		if (!pathArgs.length) return [{ text: 'mkdir: Verzeichnisname fehlt', type: 'error' }];
		var dirCountBefore = 0;
		for (var k in ctx.filesystem) { if (ctx.filesystem[k].type === 'dir') dirCountBefore++; }
		var self = this;
		for (var i = 0; i < pathArgs.length; i++) {
			var expanded = self.expandBraces(pathArgs[i]);
			for (var j = 0; j < expanded.length; j++) {
				var raw = expanded[j];
				var target = ctx.resolvePath(raw);
				if (ctx.filesystem[target] && ctx.filesystem[target].type === 'dir') {
					continue;
				}
				if (hasParents) {
					self.ensureDir(ctx, target);
				} else {
					var parentDir = target.substring(0, target.lastIndexOf('/')) || '/';
					if (!ctx.filesystem[parentDir] || ctx.filesystem[parentDir].type === 'dir') {
						if (!ctx.filesystem[parentDir]) {
							return [{ text: 'mkdir: kann Verzeichnis \'' + raw + '\' nicht erstellen: Kein solches Verzeichnis (nutze -p)', type: 'error' }];
						}
					}
					self.makeDir(ctx, target);
				}
			}
		}
		var dirCountAfter = 0;
		for (var k2 in ctx.filesystem) { if (ctx.filesystem[k2].type === 'dir') dirCountAfter++; }
		var count = dirCountAfter - dirCountBefore;
		if (count === 0) return [{ text: 'Verzeichnis existiert bereits.', type: null }];
		return [{ text: count + ' Verzeichnis(se) erstellt.', type: 'success' }];
	},

	expandBraces: function(str) {
		var match = str.match(/^(.*)\{([^}]+)\}(.*)$/);
		if (!match) return [str];
		var before = match[1], options = match[2].split(','), after = match[3];
		var results = [];
		for (var i = 0; i < options.length; i++) {
			var expanded = this.expandBraces(before + options[i] + after);
			for (var j = 0; j < expanded.length; j++) results.push(expanded[j]);
		}
		return results;
	},

	ensureDir: function(ctx, dirPath) {
		if (ctx.filesystem[dirPath] && ctx.filesystem[dirPath].type === 'dir') return;
		var parts = dirPath.split('/').filter(Boolean);
		for (var i = 0; i < parts.length; i++) {
			var current = '/' + parts.slice(0, i + 1).join('/');
			if (!ctx.filesystem[current]) {
				this.makeDir(ctx, current);
			}
		}
	},

	makeDir: function(ctx, dirPath) {
		ctx.filesystem[dirPath] = { type: 'dir', children: [] };
		var parentPath = dirPath.substring(0, dirPath.lastIndexOf('/')) || '/';
		var parent = ctx.filesystem[parentPath];
		if (parent && parent.type === 'dir') {
			var name = dirPath.substring(dirPath.lastIndexOf('/') + 1);
			if (parent.children.indexOf(name) === -1) {
				parent.children.push(name);
			}
		}
	},

	cat: function(ctx, args) {
		if (!args[0]) return [{ text: 'cat: Dateiname fehlt', type: 'error' }];
		var path = ctx.resolvePath(args[0]);
		var entry = ctx.filesystem[path];
		if (entry && entry.content) return [{ text: entry.content, type: null }];
		if (entry && entry.type === 'dir') return [{ text: 'cat: ' + args[0] + ': Ist ein Verzeichnis', type: 'error' }];
		return [{ text: 'cat: ' + args[0] + ': Datei nicht gefunden', type: 'error' }];
	},

	lsblk: function(ctx, args) {
		var oIdx = args.indexOf('-o');
		var cols = oIdx !== -1 && args[oIdx + 1] ? args[oIdx + 1].split(',').map(function(c) { return c.trim().toUpperCase(); }) : null;
		var rows = [
			{ NAME: 'sda', SIZE: '500G', TYPE: 'disk', MOUNTPOINT: '', MODEL: 'Samsung SSD 860' },
			{ NAME: '\u251C\u2500sda1', SIZE: '512M', TYPE: 'part', MOUNTPOINT: '/boot', MODEL: '' },
			{ NAME: '\u2514\u2500sda2', SIZE: '499G', TYPE: 'part', MOUNTPOINT: '/', MODEL: '' },
			{ NAME: 'sdb', SIZE: '16G', TYPE: 'disk', MOUNTPOINT: '', MODEL: 'SanDisk USB' },
			{ NAME: '\u2514\u2500sdb1', SIZE: '16G', TYPE: 'part', MOUNTPOINT: '', MODEL: '' },
			{ NAME: 'nvme0n1', SIZE: '512G', TYPE: 'disk', MOUNTPOINT: '', MODEL: 'Samsung NVMe 970' },
			{ NAME: '\u2514\u2500nvme0n1p1', SIZE: '512G', TYPE: 'part', MOUNTPOINT: '', MODEL: '' }
		];
		var allCols = ['NAME', 'SIZE', 'TYPE', 'MOUNTPOINT', 'MODEL'];
		var useCols = cols || allCols;
		var header = '', widths = {};
		for (var c = 0; c < useCols.length; c++) {
			widths[useCols[c]] = useCols[c].length;
			for (var r = 0; r < rows.length; r++) {
				var v = rows[r][useCols[c]] || '';
				if (v.length > widths[useCols[c]]) widths[useCols[c]] = v.length;
			}
		}
		for (var c = 0; c < useCols.length; c++) {
			header += useCols[c].padEnd(widths[useCols[c]] + 2);
		}
		var output = header.trimEnd() + '\n';
		for (var r = 0; r < rows.length; r++) {
			for (var c = 0; c < useCols.length; c++) {
				output += (rows[r][useCols[c]] || '').padEnd(widths[useCols[c]] + 2);
			}
			output = output.trimEnd() + '\n';
		}
		return [{ text: output.trimEnd(), type: null }];
	},

	fdisk: function(ctx, args) {
		if (args.indexOf('-l') === -1 && !args[0]) return [{ text: 'fdisk: Nutze fdisk -l [device]', type: 'error' }];
		var dev = args.filter(function(a) { return a.indexOf('/dev/') === 0; })[0] || '/dev/sdb';
		var isImg = args.filter(function(a) { return a.indexOf('.img') !== -1; })[0];
		var target = isImg || dev;
		if (target === '/dev/sda') {
			var output = 'Disk /dev/sda: 500 GiB, 536870912000 bytes, 1048576000 sectors\n';
			output += 'Disk model: Samsung SSD 860\n';
			output += 'Units: sectors of 1 * 512 = 512 bytes\n';
			output += 'Sector size (logical/physical): 512 bytes / 512 bytes\n';
			output += 'Disklabel type: dos\n';
			output += 'Disk identifier: 0x0001a2b3\n\n';
			output += 'Device      Boot    Start        End    Sectors   Size Type\n';
			output += '/dev/sda1            2048    1050623    1048576   512M Linux filesystem\n';
			output += '/dev/sda2         1050624 1048575999 1047525376   499G Linux filesystem';
			return [{ text: output, type: null }];
		} else {
			var d = target.indexOf('sda') !== -1 ? 'sda' : 'sdb';
			var isSdb = d === 'sdb';
			var label = 'Disk ' + target + ': ' + (isSdb ? '16 GiB, 17179869184 bytes, 33554432 sectors' : '500 GiB, 536870912000 bytes, 1048576000 sectors') + '\n';
			if (isSdb) label += 'Disk model: SanDisk USB\n';
			else label += 'Disk model: Samsung SSD 860\n';
			label += 'Units: sectors of 1 * 512 = 512 bytes\n';
			label += 'Sector size (logical/physical): 512 bytes / 512 bytes\n';
			label += 'Disklabel type: dos\n';
			label += 'Disk identifier: 0x' + (isSdb ? 'c3d4e5f6' : '0001a2b3') + '\n\n';
			label += 'Device      Boot Start       End   Sectors  Size Id Type\n';
			if (isSdb) {
				label += '/dev/sdb1         2048  33554431  33552384   16G  b W95 FAT32';
			} else {
				label += '/dev/sda1            2048    1050623    1048576   512M 83 Linux\n';
				label += '/dev/sda2         1050624 1048575999 1047525376   499G 83 Linux';
			}
			return [{ text: label, type: null }];
		}
	},

	parted: function(ctx, args) {
		var dev = args.filter(function(a) { return a.indexOf('/dev/') === 0; })[0] || '/dev/sdb';
		if (args.indexOf('print') === -1 && args.indexOf('--script') === -1) return [{ text: 'parted: Nutze parted [device] print', type: 'error' }];
		var output = 'Model: SanDisk USB (scsi)\n';
		output += 'Disk /dev/sdb: 17.2GB\n';
		output += 'Sector size (logical/physical): 512B/512B\n';
		output += 'Partition Table: msdos\n\n';
		output += 'Number  Start   End     Size    Type     File system  Flags\n';
		output += ' 1      1049kB  17.2GB  17.2GB  primary  fat32        lba';
		return [{ text: output, type: null }];
	},

	uname: function(ctx, args) {
		var envId = ctx.environment || 'linux-forensik';
		if (envId === 'windows-forensik') {
			if (args.indexOf('-a') !== -1) return [{ text: 'Windows windows-lab 10.0.22631 Build 22631 x86_64', type: null }];
			return [{ text: 'Windows_NT', type: null }];
		}
		var hostname = envId === 'netzwerk-forensik' ? 'netzwerk-lab' : 'forensik-workstation';
		var kernel = envId === 'netzwerk-forensik' ? '6.1.0-generic' : '6.1.0-kali9-amd64';
		if (args.indexOf('-a') !== -1) return [{ text: 'Linux ' + hostname + ' ' + kernel + ' #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux', type: null }];
		return [{ text: 'Linux', type: null }];
	},

	which: function(ctx, args) {
		if (!args[0]) return [{ text: 'which: Befehlsname fehlt', type: 'error' }];
		var cmds = { dd: '/usr/bin/dd', dc3dd: '/usr/bin/dc3dd', dcfldd: '/usr/bin/dcfldd', ewfacquire: '/usr/bin/ewfacquire', sha256sum: '/usr/bin/sha256sum', md5sum: '/usr/bin/md5sum', fls: '/usr/bin/fls', xxd: '/usr/bin/xxd', strings: '/usr/bin/strings', hdparm: '/usr/sbin/hdparm', nvme: '/usr/sbin/nvme', ping: '/usr/bin/ping', traceroute: '/usr/bin/traceroute', dig: '/usr/bin/dig', nmap: '/usr/bin/nmap', curl: '/usr/bin/curl', wget: '/usr/bin/wget', ssh: '/usr/bin/ssh', openssl: '/usr/bin/openssl' };
		if ((ctx.environment || 'linux-forensik') === 'windows-forensik') {
			var wcmds = {
				'get-disk': 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\Modules\\Storage\\Get-Disk',
				'get-filehash': 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\Modules\\Microsoft.PowerShell.Utility\\Get-FileHash',
				'ftkimager.exe': 'C:\\Tools\\FTK\\ftkimager.exe',
				'strings.exe': 'C:\\Tools\\Sysinternals\\strings.exe',
				'aim_cli.exe': 'C:\\Program Files\\Arsenal Image Mounter\\aim_cli.exe'
			};
			var key = args[0].toLowerCase();
			if (wcmds[key]) return [{ text: wcmds[key], type: null }];
		}
		if (cmds[args[0]]) return [{ text: cmds[args[0]], type: null }];
		return [{ text: args[0] + ' nicht gefunden', type: 'error' }];
	},

	history: function(ctx, args) {
		var outputs = [];
		for (var i = 0; i < ctx.history.length; i++) {
			outputs.push({ text: '  ' + (i + 1) + '  ' + ctx.history[i], type: null });
		}
		return outputs;
	},

	dd: function(ctx, args) {
		var ifVal = this.getArg(args, 'if');
		var ofVal = this.getArg(args, 'of');
		var bsVal = this.getArg(args, 'bs') || '16M';
		var countVal = this.getArg(args, 'count');
		if (!ifVal || !ofVal) return [{ text: 'dd: if= und of= Parameter erforderlich', type: 'error' }];
		var isSdb = ifVal.indexOf('sdb') !== -1;
		var totalBytes = isSdb ? 17179869184 : 536870912000;
		if (countVal) {
			var bsNum = parseInt(bsVal) || 16;
			var bsMul = bsVal.indexOf('M') !== -1 ? 1048576 : bsVal.indexOf('K') !== -1 ? 1024 : 1;
			totalBytes = bsNum * bsMul * parseInt(countVal);
		}
		var gb = (totalBytes / 1073741824).toFixed(1);
		var secs = Math.round(totalBytes / (bsVal.indexOf('M') !== -1 ? 16777216 : 524288));
		var mbps = (totalBytes / (secs * 1048576)).toFixed(1);
		return [
			{ text: secs + '+0 Datens\u00e4tze ein\n' + secs + '+0 Datens\u00e4tze aus\n' + totalBytes + ' bytes (' + gb + ' GB) kopiert, ' + secs + ' s, ' + mbps + ' MB/s', type: 'success' }
		];
	},

	dc3dd: function(ctx, args) {
		var ifVal = this.getArg(args, 'if');
		var ofVal = this.getArg(args, 'of');
		var hashVal = this.getArg(args, 'hash') || 'sha256';
		var logVal = this.getArg(args, 'log');
		if (!ifVal || !ofVal) return [{ text: 'dc3dd: if= und of= Parameter erforderlich', type: 'error' }];
		var output = 'dd: kopiere ' + ifVal + ' -> ' + ofVal + '\n';
		output += '17179869184 bytes (16 GB) kopiert\n';
		output += hashVal + ': a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456';
		if (logVal) output += '\nLog: ' + logVal;
		output += '\nImaging abgeschlossen.';
		return [{ text: output, type: 'success' }];
	},

	dcfldd: function(ctx, args) {
		var ifVal = this.getArg(args, 'if');
		var ofVal = this.getArg(args, 'of');
		if (!ifVal || !ofVal) return [{ text: 'dcfldd: if= und of= Parameter erforderlich', type: 'error' }];
		return [
			{ text: 'dcfldd: Forensisches Imaging gestartet...', type: 'info' },
			{ text: '34359738368 bytes (34 GB) copied\nsha256: a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456\nImaging abgeschlossen.', type: 'success' }
		];
	},

	ewfacquire: function(ctx, args) {
		return [
			{ text: 'ewfacquire: E01-Image-Erstellung...', type: 'info' },
			{ text: 'Case: case01 | Examiner: analyst | Hash: sha256\nSingle-file E01 erstellt.\nImaging abgeschlossen.', type: 'success' }
		];
	},

	sha256: function(ctx, args) {
		if (!args[0]) return [{ text: 'sha256sum: Dateiname fehlt', type: 'error' }];
		if (args.indexOf('-c') !== -1) {
			var file = args.filter(function(a) { return a.charAt(0) !== '-'; })[0];
			if (file) {
				return [
					{ text: 'Pruefe ' + file + '...', type: 'info' },
					{ text: file.split('/').pop() + ': OK', type: 'success' }
				];
			}
			return [{ text: 'sha256sum -c: Hash-Datei fehlt', type: 'error' }];
		}
		return [{ text: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456  ' + args[0], type: 'success' }];
	},

	md5: function(ctx, args) {
		if (!args[0]) return [{ text: 'md5sum: Dateiname fehlt', type: 'error' }];
		return [{ text: 'd41d8cd98f00b204e9800998ecf8427e  ' + args[0], type: 'success' }];
	},

	mount: function(ctx, args) {
		if (args.length === 0) return [{ text: 'sysfs on /sys type sysfs ...\nproc on /proc type proc ...\n/dev/sda2 on / type ext4 ...\n/dev/sda1 on /boot type ext4 ...', type: null }];
		var devArg = args.filter(function(a) { return a.indexOf('/dev/') === 0 || a.indexOf('/cases/') === 0; })[0];
		var mntArg = args.filter(function(a) { return (a.indexOf('/cases/') === 0 || a.indexOf('/mnt/') === 0) && a !== devArg; })[0];
		if (devArg && mntArg) {
			ctx.mountedDevices[mntArg] = devArg;
			return [{ text: devArg + ' -> ' + mntArg + ' (read-only)', type: 'success' }];
		}
		return [{ text: 'mount: Geraet und Mountpoint erforderlich', type: null }];
	},

	umount: function(ctx, args) {
		if (!args[0]) return [{ text: 'umount: Mountpoint erforderlich', type: 'error' }];
		if (ctx.mountedDevices[args[0]]) {
			delete ctx.mountedDevices[args[0]];
		}
		return [];
	},

	losetup: function(ctx, args) {
		if (args.indexOf('-a') !== -1) {
			var output = '/dev/loop0: [2049]:12345 (/cases/case01/images/usb_sandisk_32gb.img)\n';
			output += '/dev/loop1: [2049]:12346 (/cases/case01/images/disk01.img)';
			return [{ text: output, type: null }];
		}
		if (args.indexOf('-d') !== -1) return [{ text: 'Loop-Device entfernt.', type: 'success' }];
		return [{ text: 'losetup: Nutze -a (alle anzeigen) oder -d [device] (entfernen)', type: null }];
	},

	ewfmount: function(ctx, args) {
		if (!args[0] || !args[1]) return [{ text: 'ewfmount: E01-Datei und Mountpoint erforderlich', type: 'error' }];
		return [{ text: args[0] + ' -> ' + args[1] + '/ewf1', type: 'success' }];
	},

	xxd: function(ctx, args) {
		var limitIdx = args.indexOf('-l');
		var limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1]) : 512;
		var seekIdx = args.indexOf('-s');
		var seek = seekIdx !== -1 ? parseInt(args[seekIdx + 1]) : 0;
		var file = args.filter(function(a) { return a.charAt(0) !== '-' && !a.match(/^\d+$/); }).pop();
		if (!file) return [{ text: 'xxd: Dateiname erforderlich', type: 'error' }];
		var lines = Math.ceil(limit / 16);
		var output = '';
		var isFat32 = seek === 0 && limit >= 512;
		for (var i = 0; i < lines; i++) {
			var offset = (seek + i * 16).toString(16).padStart(8, '0');
			var hex = '', ascii = '';
			for (var j = 0; j < 16 && (i * 16 + j) < limit; j++) {
				var b;
				if (isFat32 && i === 0 && j === 0) b = 0xeb;
				else if (isFat32 && i === 0 && j === 1) b = 0x3c;
				else if (isFat32 && i === 0 && j === 2) b = 0x90;
				else if (isFat32 && seek === 0 && (seek + i * 16 + j) === 510) b = 0x55;
				else if (isFat32 && seek === 0 && (seek + i * 16 + j) === 511) b = 0xaa;
				else if (seek === 510 && i === 0 && j === 0) b = 0x55;
				else if (seek === 510 && i === 0 && j === 1) b = 0xaa;
				else b = (i * 16 + j + seek) * 7 % 256;
				hex += b.toString(16).padStart(2, '0') + ' ';
				ascii += (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.';
			}
			output += offset + ': ' + hex.padEnd(48) + ' ' + ascii + '\n';
		}
		if (limit >= 512 && seek === 0) output += 'MBR-Signatur 55AA an Offset 510 gefunden.';
		return [{ text: output.trimEnd(), type: null }];
	},

	strings: function(ctx, args) {
		var file = args.filter(function(a) { return a.charAt(0) !== '-' && a.indexOf('/dev/') !== 0; }).pop();
		if (!file) return [{ text: 'strings: Dateiname erforderlich', type: 'error' }];
		var tIdx = args.indexOf('-t');
		var lines = [
			'Forensik Testdatei', 'password_reset_2024', 'banking_passwords.pdf',
			'report_final_password_protected.pdf', 'Password: xyz123',
			'confidential_report.pdf', 'CONFIDENTIAL - Internal Use Only',
			'Schwarzkasse_Q4_2023.xlsx', 'Umsatz_intern.xlsx', 'Umsatz_Finanzamt.xlsx',
			'IBAN: AT12 3456 7890 1234 5678', 'Betrag: EUR 47.500,00',
			'_geheim/backup', 'SanDisk USB', 'FAT32', 'USB-Stick Daten',
			'https://drive.google.com/file/d/1a2b3c',
			'https://dropbox.com/sh/xyz123',
			'http://temp-mail.org/inbox',
			'administrator@firma.local',
			'geloescht_briefing.docx'
		];
		var output = '';
		for (var i = 0; i < lines.length; i++) {
			if (tIdx !== -1) {
				output += String(i * 128).padStart(7) + ' ' + lines[i] + '\n';
			} else {
				output += lines[i] + '\n';
			}
		}
		return [{ text: output.trimEnd(), type: null }];
	},

	grep: function(ctx, args, stdin) {
		var pattern = args.filter(function(a) { return a.charAt(0) !== '-'; })[0];
		if (!pattern && !stdin) return [{ text: 'grep: Suchmuster erforderlich', type: 'error' }];
		var caseInsensitive = args.indexOf('-i') !== -1;
		var extendedRegex = args.indexOf('-E') !== -1;
		var file = args.filter(function(a) { return a.charAt(0) !== '-'; })[1];
		if (!stdin && file && file.indexOf('auth.log') !== -1) {
			return [{ text: 'Mar 15 08:12:33 server sshd[1234]: Failed password for root from 192.168.1.105 port 22 ssh2\nMar 15 08:12:35 server sshd[1234]: Failed password for root from 192.168.1.105 port 22 ssh2\nMar 15 08:12:38 server sshd[1234]: Failed password for admin from 192.168.1.105 port 22 ssh2\nMar 15 09:30:00 server sshd[9012]: Failed password for root from 192.168.1.105 port 22 ssh2\nMar 15 09:30:03 server sshd[9012]: Failed password for root from 192.168.1.105 port 22 ssh2', type: null }];
		}
		if (!stdin) return [{ text: 'Gefunden: 2 Treffer fuer "' + pattern + '"', type: null }];
		var lines = stdin.split('\n');
		var matches = [];
		var searchPat = pattern.replace(/\\\|/g, '|').replace(/\\/g, '');
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			var hit = false;
			if (extendedRegex) {
				var re = new RegExp(searchPat, caseInsensitive ? 'i' : '');
				hit = re.test(line);
			} else if (searchPat.indexOf('|') !== -1) {
				var parts = searchPat.split('|');
				for (var p = 0; p < parts.length; p++) {
					if (caseInsensitive ? line.toLowerCase().indexOf(parts[p].toLowerCase()) !== -1 : line.indexOf(parts[p]) !== -1) { hit = true; break; }
				}
			} else {
				hit = caseInsensitive ? line.toLowerCase().indexOf(searchPat.toLowerCase()) !== -1 : line.indexOf(searchPat) !== -1;
			}
			if (hit) matches.push(line);
		}
		if (matches.length === 0) return [];
		return [{ text: matches.join('\n'), type: null }];
	},

	find: function(ctx, args) {
		var nameIdx = args.indexOf('-name');
		var output = '/cases/case01/mounts/usb01/htdocs/\n/cases/case01/mounts/usb01/Umsatz_intern.xlsx\n/cases/case01/mounts/usb01/Umsatz_Finanzamt.xlsx\n/cases/case01/mounts/usb01/confidential_report.pdf\n/cases/case01/mounts/usb01/passwords.txt\n/cases/case01/mounts/usb01/.geheim/\n/cases/case01/mounts/usb01/.geheim/Schwarzkasse_Q4_2023.xlsx';
		if (nameIdx !== -1 && args[nameIdx + 1]) {
			var ext = args[nameIdx + 1].replace(/[*"]/g, '');
			var filtered = output.split('\n').filter(function(l) { return l.indexOf(ext.replace('.', '')) !== -1; });
			return [{ text: filtered.join('\n') || 'Keine Treffer', type: null }];
		}
		return [{ text: output, type: null }];
	},

	fls: function(ctx, args) {
		return [{ text: 'r/r 5: MBR (Boot Sector)\nr/r 6: $MBR\nd/d 7: FAT32 Root\nr/r 8: Umsatz_intern.xlsx\nr/r 9: Umsatz_Finanzamt.xlsx\nr/r 10: confidential_report.pdf\nr/r 11: passwords.txt\nd/d 12: .geheim (hidden)\n  r/r 13: .geheim/Schwarzkasse_Q4_2023.xlsx\nr/r *14: geloescht_briefing.docx (deleted)', type: null }];
	},

	mmls: function(ctx, args) {
		return [{ text: 'DOS Partition Table\nOffset Sector: 0\nUnits are in 512-byte sectors\n\n      Slot      Start        End        Length       Description\n000:  Meta      0000000000   0000000000   0000000001   Primary Table (#0)\n001:  -------   0000000000   0000002047   0000002048   Unallocated\n002:  000:000   0000002048   0033554431   00333552384   FAT32 (0x0B)', type: null }];
	},

	hdparm: function(ctx, args) {
		if (args.indexOf('-I') !== -1) {
			return [{ text: '/dev/sdb:\n\n  ATA device, with non-removable media\n  Model Number:       SanDisk USB\n  Serial Number:      4C5300011602181052\n  Firmware Revision:  1.00\n  Transport:          USB\n  Standards:\n    Used: USB 2.0\n  Configuration:\n    Logical         max     current\n    cylinders       16383   16383\n    heads           16      16\n    sectors/track   63      63\n Checksum: correct\n\nSecurity:\n    Master password revision code = 65534\n    supported\n    not\tenabled\n    not\tlocked\n    not\tfrozen\n    not\texpired: security count\n    supported: enhanced erase', type: null }];
		}
		if (args.indexOf('--security-set-pass') !== -1) return [{ text: 'Security Passwort gesetzt.', type: 'success' }];
		if (args.indexOf('--security-erase') !== -1) return [{ text: 'Secure Erase ausgefuehrt.', type: 'warning' }];
		return [{ text: 'hdparm: Nutze -I [device] fuer Geraete-Info', type: null }];
	},

	nvme: function(ctx, args) {
		if (args[0] === 'list') {
			return [{ text: 'Node          SN                Model                 Namespace  Usage    Format\n/dev/nvme0n1  S4EWNF0M123456   Samsung NVMe 970      1           512 GB   512', type: null }];
		}
		if (args[0] === 'format') return [{ text: 'NVMe Secure Erase (SES=1) ausgefuehrt.', type: 'warning' }];
		return [{ text: 'nvme: Nutze "nvme list" oder "nvme format"', type: null }];
	},

	blkid: function(ctx, args) {
		var dev = args.filter(function(a) { return a.indexOf('/dev/') === 0; })[0];
		if (!dev) return [{ text: 'blkid: Device erforderlich, z.B. blkid /dev/sdb1', type: 'error' }];
		if (dev === '/dev/sdb1') {
			return [{ text: '/dev/sdb1: UUID="a1b2-c3d4-e5f6-7890" TYPE="vfat" PARTUUID="c3d4e5f6-01"', type: null }];
		}
		if (dev === '/dev/sda1') {
			return [{ text: '/dev/sda1: UUID="1111-2222-3333-4444" TYPE="ext4" PARTUUID="0001a2b3-01"', type: null }];
		}
		return [{ text: dev + ': kein erkanntes Dateisystem', type: null }];
	},

	istatCmd: function(ctx, args) {
		var inode = args.filter(function(a) { return a.match(/^\d+$/); })[0] || '5';
		return [{ text: 'inode: ' + inode + '\nNot Allocated\nGroup: 0\nGeneration Id: ' + (parseInt(inode) * 1234) + '\nuid / gid: 1000 / 1000\nmode: rrw-rw-rw\nsize: ' + (parseInt(inode) * 4523) + '\nnum of links: 1\n\nAccess Time:\t2024-03-15 09:30:00.000000000 (CET)\nModified Time:\t2024-03-14 16:22:00.000000000 (CET)\nChange Time:\t2024-03-15 09:30:00.000000000 (CET)\nBirth Time:\t2024-03-14 08:00:00.000000000 (CET)\n\nDirect Blocks:\n101 102 103', type: null }];
	},

	icatCmd: function(ctx, args) {
		return [{ text: '', type: null }];
	},

	blockdev: function(ctx, args) {
		if (args.indexOf('--setro') !== -1) {
			var dev = args.filter(function(a) { return a.indexOf('/dev/') === 0; })[0];
			return [{ text: dev + ': Read-only gesetzt.', type: 'success' }];
		}
		return [{ text: 'blockdev: Nutze --setro [device]', type: null }];
	},

	script: function(ctx, args) {
		if (args.length > 0) {
			ctx.scriptActive = true;
			var fname = args.filter(function(a) { return a.charAt(0) !== '-'; }).pop() || 'typescript';
			ctx.scriptFile = ctx.resolvePath(fname);
			ctx.scriptLines = ['Script gestartet am ' + new Date().toLocaleString('de-DE'), ''];
			var parentPath = ctx.scriptFile.substring(0, ctx.scriptFile.lastIndexOf('/')) || '/';
			var parent = ctx.filesystem[parentPath];
			var baseName = ctx.scriptFile.substring(ctx.scriptFile.lastIndexOf('/') + 1);
			if (parent && parent.type === 'dir' && parent.children.indexOf(baseName) === -1) {
				parent.children.push(baseName);
			}
			return [{ text: 'Skript gestartet, Datei ist \'' + fname + '\' (befehle werden mitgeloggt)', type: 'success' }];
		}
		return [{ text: 'script: Dateiname erforderlich, z.B. script session.log', type: 'error' }];
	},

	parseSizeBytes: function(sizeStr) {
		if (!sizeStr) return 0;
		var match = String(sizeStr).match(/^(\d+(?:\.\d+)?)(B|KB|MB|GB|TB)?$/i);
		if (!match) return 0;
		var num = parseFloat(match[1]);
		var unit = (match[2] || 'B').toUpperCase();
		var mult = { B: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 };
		return Math.round(num * (mult[unit] || 1));
	},

	fileCmd: function(ctx, args) {
		if (!args[0]) return [{ text: 'file: Dateiname fehlt', type: 'error' }];
		var path = ctx.resolvePath(args[0]);
		var entry = ctx.filesystem[path];
		if (!entry) return [{ text: path + ': cannot open (No such file or directory)', type: 'error' }];
		if (entry.type === 'dir') return [{ text: path + ': directory', type: null }];
		var ext = path.split('.').pop().toLowerCase();
		var typeMap = {
			'img': 'DOS/MBR boot sector; raw disk image',
			'raw': 'data (memory dump)',
			'sha256': 'ASCII text',
			'md5': 'ASCII text',
			'txt': 'UTF-8 Unicode text',
			'log': 'ASCII text, with very long lines',
			'hex': 'ASCII text',
			'xlsx': 'Microsoft Excel 2007+',
			'pdf': 'PDF document, version 1.7',
			'docx': 'Microsoft Word 2007+',
			'conf': 'ASCII text'
		};
		var ftype = typeMap[ext] || 'data';
		return [{ text: path + ': ' + ftype, type: null }];
	},

	statCmd: function(ctx, args) {
		if (!args[0]) return [{ text: 'stat: Dateiname fehlt', type: 'error' }];
		var path = ctx.resolvePath(args[0]);
		var entry = ctx.filesystem[path];
		if (!entry) return [{ text: 'stat: ' + path + ': Datei nicht gefunden', type: 'error' }];
		var self = TerminalCommands;
		var isDir = entry.type === 'dir';
		var size = isDir ? 4096 : (entry.size ? self.parseSizeBytes(entry.size) : 0);
		var blocks = Math.ceil(size / 512) || 8;
		var kind = isDir ? 'directory' : 'regular file';
		var perms = isDir ? '(0755/drwxr-xr-x)' : '(0644/-rw-r--r--)';
		var name = path.split('/').pop() || path;
		var output = '  File: ' + name + '\n';
		output += '  Size: ' + size + '          Blocks: ' + blocks + '          IO Blocks: 4096   ' + kind + '\n';
		output += 'Device: 802h/2050d    Inode: ' + (Math.floor(Math.random() * 90000) + 10000) + '      Links: ' + (isDir ? (entry.children ? entry.children.length + 2 : 2) : 1) + '\n';
		output += 'Access: ' + perms + '  Uid: ( 1000/ analyst)   Gid: ( 1000/ analyst)\n';
		output += 'Access: 2024-03-15 09:30:00.000000000 +0100\n';
		output += 'Modify: 2024-03-15 09:30:00.000000000 +0100\n';
		output += 'Change: 2024-03-15 09:30:00.000000000 +0100\n';
		output += ' Birth: 2024-03-15 09:25:00.000000000 +0100';
		return [{ text: output, type: null }];
	},

	headCmd: function(ctx, args) {
		var nIdx = args.indexOf('-n');
		var n = 10;
		if (nIdx !== -1 && args[nIdx + 1]) n = parseInt(args[nIdx + 1]) || 10;
		var file = args.filter(function(a) { return a.charAt(0) !== '-'; }).pop();
		if (!file) return [{ text: 'head: Dateiname fehlt', type: 'error' }];
		var path = ctx.resolvePath(file);
		var entry = ctx.filesystem[path];
		if (entry && entry.content) {
			var lines = entry.content.split('\n').slice(0, n);
			return [{ text: lines.join('\n'), type: null }];
		}
		if (entry && entry.type === 'dir') return [{ text: 'head: Fehler beim Lesen von \'' + file + '\': Ist ein Verzeichnis', type: 'error' }];
		if (entry) return [{ text: '[' + path + ': Bin\u00e4rdaten - erste ' + n + ' Zeilen nicht darstellbar]', type: 'info' }];
		return [{ text: 'head: ' + file + ': Datei nicht gefunden', type: 'error' }];
	},

	tailCmd: function(ctx, args) {
		var nIdx = args.indexOf('-n');
		var n = 10;
		if (nIdx !== -1 && args[nIdx + 1]) n = parseInt(args[nIdx + 1]) || 10;
		var file = args.filter(function(a) { return a.charAt(0) !== '-'; }).pop();
		if (!file) return [{ text: 'tail: Dateiname fehlt', type: 'error' }];
		var path = ctx.resolvePath(file);
		var entry = ctx.filesystem[path];
		if (entry && entry.content) {
			var lines = entry.content.split('\n');
			var start = Math.max(0, lines.length - n);
			return [{ text: lines.slice(start).join('\n'), type: null }];
		}
		if (entry && entry.type === 'dir') return [{ text: 'tail: Fehler beim Lesen von \'' + file + '\': Ist ein Verzeichnis', type: 'error' }];
		if (entry) return [{ text: '[' + path + ': Bin\u00e4rdaten - letzte ' + n + ' Zeilen nicht darstellbar]', type: 'info' }];
		return [{ text: 'tail: ' + file + ': Datei nicht gefunden', type: 'error' }];
	},

	rmCmd: function(ctx, args) {
		if (!args.length) return [{ text: 'rm: Dateiname fehlt', type: 'error' }];
		var recursive = args.indexOf('-r') !== -1 || args.indexOf('-rf') !== -1 || args.indexOf('-fr') !== -1;
		var target = args.filter(function(a) { return a.charAt(0) !== '-'; })[0];
		if (!target) return [{ text: 'rm: Dateiname fehlt', type: 'error' }];
		var path = ctx.resolvePath(target);
		var entry = ctx.filesystem[path];
		if (!entry) return [{ text: 'rm: \'' + target + '\' nicht gefunden', type: 'error' }];
		if (entry.type === 'dir' && !recursive) return [{ text: 'rm: \'' + target + '\' ist ein Verzeichnis (nutze -r)', type: 'error' }];
		return [{ text: '\'' + target + '\' entfernt.', type: 'success' }];
	},

	cpCmd: function(ctx, args) {
		if (args.length < 2) return [{ text: 'cp: Quell- und Zieldatei erforderlich', type: 'error' }];
		var src = args.filter(function(a) { return a.charAt(0) !== '-'; })[0];
		var dst = args.filter(function(a) { return a.charAt(0) !== '-'; })[1];
		if (!src || !dst) return [{ text: 'cp: Quell- und Zieldatei erforderlich', type: 'error' }];
		var srcPath = ctx.resolvePath(src);
		var entry = ctx.filesystem[srcPath];
		if (!entry) return [{ text: 'cp: \'' + src + '\' nicht gefunden', type: 'error' }];
		if (entry.type === 'dir') return [{ text: 'cp: -r nicht angegeben, \' ' + src + '\' ist ein Verzeichnis', type: 'error' }];
		return [{ text: '\'' + src + '\' -> \'' + dst + '\' kopiert.', type: 'success' }];
	},

	mvCmd: function(ctx, args) {
		if (args.length < 2) return [{ text: 'mv: Quell- und Zieldatei erforderlich', type: 'error' }];
		var src = args.filter(function(a) { return a.charAt(0) !== '-'; })[0];
		var dst = args.filter(function(a) { return a.charAt(0) !== '-'; })[1];
		if (!src || !dst) return [{ text: 'mv: Quell- und Zieldatei erforderlich', type: 'error' }];
		var srcPath = ctx.resolvePath(src);
		var entry = ctx.filesystem[srcPath];
		if (!entry) return [{ text: 'mv: \'' + src + '\' nicht gefunden', type: 'error' }];
		return [{ text: '\'' + src + '\' -> \'' + dst + '\' verschoben.', type: 'success' }];
	},

	touchCmd: function(ctx, args) {
		if (!args[0]) return [{ text: 'touch: Dateiname fehlt', type: 'error' }];
		var path = ctx.resolvePath(args[0]);
		var entry = ctx.filesystem[path];
		if (entry) {
			return [{ text: '\'' + args[0] + '\' - Zeitstempel aktualisiert.', type: 'success' }];
		}
		ctx.filesystem[path] = { type: 'file', size: '0B', content: '' };
		var parentPath = path.substring(0, path.lastIndexOf('/')) || '/';
		var parent = ctx.filesystem[parentPath];
		if (parent && parent.type === 'dir') {
			var name = path.substring(path.lastIndexOf('/') + 1);
			if (parent.children.indexOf(name) === -1) {
				parent.children.push(name);
			}
		}
		return [{ text: '\'' + args[0] + '\' erstellt.', type: 'success' }];
	},

	treeCmd: function(ctx, args) {
		var targetPath = args.filter(function(a) { return a.charAt(0) !== '-'; })[0];
		var path = targetPath ? ctx.resolvePath(targetPath) : ctx.currentPath;
		var entry = ctx.filesystem[path];
		if (!entry) return [{ text: 'tree: ' + path + ': nicht gefunden', type: 'error' }];
		if (entry.type === 'file') return [{ text: path, type: null }];
		var output = path + '\n';
		var dirs = 0, files = 0;
		function buildTree(p, prefix) {
			var e = ctx.filesystem[p];
			if (!e || e.type !== 'dir') return;
			var children = e.children || [];
			for (var i = 0; i < children.length; i++) {
				var isLast = i === children.length - 1;
				var connector = isLast ? '\u2514\u2500\u2500 ' : '\u251C\u2500\u2500 ';
				var childPath = p === '/' ? '/' + children[i] : p + '/' + children[i];
				var child = ctx.filesystem[childPath];
				output += prefix + connector + children[i] + '\n';
				if (child && child.type === 'dir') {
					dirs++;
					buildTree(childPath, prefix + (isLast ? '    ' : '\u2502   '));
				} else {
					files++;
				}
			}
		}
		buildTree(path, '');
		output += '\n' + dirs + ' directories, ' + files + ' files';
		return [{ text: output, type: null }];
	},

	hexdumpCmd: function(ctx, args) {
		var canonical = args.indexOf('-C') !== -1;
		var file = args.filter(function(a) { return a.charAt(0) !== '-'; }).pop();
		if (!file) return [{ text: 'hexdump: Dateiname erforderlich', type: 'error' }];
		var path = ctx.resolvePath(file);
		var entry = ctx.filesystem[path];
		if (!entry) return [{ text: 'hexdump: ' + file + ': Datei nicht gefunden', type: 'error' }];
		if (entry.type === 'dir') return [{ text: 'hexdump: ' + file + ': Ist ein Verzeichnis', type: 'error' }];
		var lines = 16;
		var output = '';
		for (var i = 0; i < lines; i++) {
			var offset = (i * 16).toString(16).padStart(8, '0');
			var hex1 = '', hex2 = '', ascii = '';
			for (var j = 0; j < 16; j++) {
				var b = Math.floor(Math.random() * 256);
				if (i === 0 && j === 0) b = 0xeb;
				if (i === 0 && j === 1) b = 0x58;
				if (i === 0 && j === 2) b = 0x90;
				var h = b.toString(16).padStart(2, '0');
				hex1 += h;
				if (j < 8) hex1 += ' ';
				if (j === 7) hex1 += ' ';
				ascii += (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.';
			}
			if (canonical) {
				output += offset + '  ' + hex1 + ' |' + ascii + '|\n';
			} else {
				output += offset + ' ' + hex1 + '\n';
			}
		}
		output += '... (Simulierter Hex-Dump)';
		return [{ text: output, type: null }];
	},

	shasumCmd: function(ctx, args) {
		if (!args.length) return [{ text: 'shasum: Dateiname fehlt', type: 'error' }];
		if (args.indexOf('-c') !== -1) {
			var file = args.filter(function(a) { return a.charAt(0) !== '-'; })[0];
			if (file) {
				return [
					{ text: 'Pruefe ' + file + '...', type: 'info' },
					{ text: file.split('/').pop() + ': OK', type: 'success' }
				];
			}
			return [{ text: 'shasum -c: Hash-Datei fehlt', type: 'error' }];
		}
		var file = args.filter(function(a) { return a.charAt(0) !== '-'; })[0];
		if (!file) return [{ text: 'shasum: Dateiname fehlt', type: 'error' }];
		var path = ctx.resolvePath(file);
		var entry = ctx.filesystem[path];
		if (!entry) return [{ text: 'shasum: ' + file + ': Datei nicht gefunden', type: 'error' }];
		return [{ text: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456  ' + file, type: 'success' }];
	},

	resolveIp: function(ctx, host) {
		var net = ctx.network;
		if (!net || !net.dnsMap) return '10.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 254 + 1);
		var clean = host.replace(/https?:\/\//, '').replace(/\/.*/, '');
		return net.dnsMap[clean] || net.dnsMap[host] || '10.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 254 + 1);
	},

	cmdPing: function(ctx, args) {
		if (!args[0]) return [{ text: 'Usage: ping [-c count] [host]', type: 'error' }];
		var count = 4;
		var host = null;
		for (var i = 0; i < args.length; i++) {
			if (args[i] === '-c' && args[i + 1]) { count = parseInt(args[i + 1]) || 4; i++; }
			else if (args[i] === '-W' || args[i] === '-i') { i++; }
			else if (!host && args[i].charAt(0) !== '-') { host = args[i]; }
		}
		if (!host) return [{ text: 'Usage: ping [-c count] [host]', type: 'error' }];
		var self = TerminalCommands;
		var ip = self.resolveIp(ctx, host);
		var output = 'PING ' + host + ' (' + ip + ') 56(84) bytes of data.\n';
		for (var j = 1; j <= count; j++) {
			var time = (Math.random() * 20 + 5).toFixed(1);
			output += '64 bytes from ' + ip + ': icmp_seq=' + j + ' ttl=64 time=' + time + ' ms\n';
		}
		output += '\n--- ' + host + ' ping statistics ---\n';
		output += count + ' packets transmitted, ' + count + ' received, 0% packet loss';
		return [{ text: output, type: null }];
	},

	cmdTraceroute: function(ctx, args) {
		if (!args[0]) return [{ text: 'Usage: traceroute [host]', type: 'error' }];
		var self = TerminalCommands;
		var host = args[0];
		var ip = self.resolveIp(ctx, host);
		var output = 'traceroute to ' + host + ' (' + ip + '), 30 hops max\n';
		var hops = ['192.168.1.1', '10.0.0.1', '62.154.3.1', '62.154.3.17', ip];
		for (var i = 0; i < hops.length; i++) {
			var t1 = (Math.random() * 10 + (i * 3)).toFixed(3);
			var t2 = (Math.random() * 10 + (i * 3)).toFixed(3);
			var t3 = (Math.random() * 10 + (i * 3)).toFixed(3);
			output += ' ' + (i + 1) + '  ' + hops[i] + '  ' + t1 + ' ms  ' + t2 + ' ms  ' + t3 + ' ms\n';
		}
		return [{ text: output.trimEnd(), type: null }];
	},

	cmdMtr: function(ctx, args) {
		if (!args[0]) return [{ text: 'Usage: mtr [host]', type: 'error' }];
		var self = TerminalCommands;
		var ip = self.resolveIp(ctx, args[0]);
		var output = 'Start: ' + new Date().toLocaleString('de-DE') + '\n';
		output += 'HOST: netzwerk-lab                Loss%   Snt   Last   Avg  Best  Wrst\n';
		var hops = ['192.168.1.1', '10.0.0.1', '62.154.3.1', ip];
		for (var i = 0; i < hops.length; i++) {
			var avg = (Math.random() * 15 + (i * 3)).toFixed(1);
			output += '  ' + (i + 1) + '.|-- ' + hops[i] + '  0.0%    10  ' + avg + '  ' + avg + '  ' + (avg - 2).toFixed(1) + '  ' + (parseFloat(avg) + 5).toFixed(1) + '\n';
		}
		return [{ text: output.trimEnd(), type: null }];
	},

	cmdDig: function(ctx, args) {
		if (!args[0]) return [{ text: 'Usage: dig [domain] [type]', type: 'error' }];
		var domain = args[0];
		var type = 'A';
		for (var i = 1; i < args.length; i++) {
			if (!args[i].match(/^[@+]/) && args[i].match(/^[A-Z]+$/i)) {
				type = args[i].toUpperCase();
			}
		}
		var self = TerminalCommands;
		var ip = self.resolveIp(ctx, domain);
		var output = ';; Got answer:\n';
		output += ';; ->>HEADER<<- opcode: QUERY, status: NOERROR\n';
		output += ';; QUESTION SECTION:\n';
		output += ';' + domain + '.\t\tIN\t' + type + '\n';
		output += ';; ANSWER SECTION:\n';
		if (type === 'A') {
			output += domain + '.\t\t300\tIN\tA\t' + ip + '\n';
		} else if (type === 'MX') {
			output += domain + '.\t\t300\tIN\tMX\t10 mail.' + domain + '.\n';
		} else if (type === 'NS') {
			output += domain + '.\t\t300\tIN\tNS\tns1.' + domain + '.\n';
			output += domain + '.\t\t300\tIN\tNS\tns2.' + domain + '.\n';
		} else if (type === 'AAAA') {
			output += domain + '.\t\t300\tIN\tAAAA\t2001:db8::1\n';
		} else if (type === 'TXT') {
			output += domain + '.\t\t300\tIN\tTXT\t"v=spf1 include:_' + domain + ' ~all"\n';
		} else if (type === 'CNAME') {
			output += domain + '.\t\t300\tIN\tCNAME\twww.' + domain + '.\n';
		} else {
			output += ';; No Answer for type ' + type + '\n';
		}
		output += ';; Query time: ' + Math.floor(Math.random() * 30 + 5) + ' msec';
		return [{ text: output, type: null }];
	},

	cmdNslookup: function(ctx, args) {
		if (!args[0]) return [{ text: 'Usage: nslookup [domain]', type: 'error' }];
		var self = TerminalCommands;
		var ip = self.resolveIp(ctx, args[0]);
		var output = 'Server:\t\t192.168.1.1\n';
		output += 'Address:\t192.168.1.1#53\n\n';
		output += 'Non-authoritative answer:\n';
		output += 'Name:\t' + args[0] + '\n';
		output += 'Address: ' + ip;
		return [{ text: output, type: null }];
	},

	cmdCurl: function(ctx, args) {
		if (!args[0]) return [{ text: 'Usage: curl [url]', type: 'error' }];
		var url = args[0];
		if (args.indexOf('-I') !== -1 || args.indexOf('--head') !== -1) {
			var output = 'HTTP/1.1 200 OK\n';
			output += 'Content-Type: text/html; charset=UTF-8\n';
			output += 'Content-Length: 1256\n';
			output += 'Server: nginx/1.24';
			return [{ text: output, type: null }];
		}
		var output = '<!DOCTYPE html><html><head><title>' + url + '</title></head>\n';
		output += '<body><h1>Willkommen auf ' + url + '</h1></body></html>';
		return [{ text: output, type: null }];
	},

	cmdWget: function(ctx, args) {
		if (!args[0]) return [{ text: 'Usage: wget [url]', type: 'error' }];
		var self = TerminalCommands;
		var ip = self.resolveIp(ctx, args[0]);
		var output = '--' + new Date().toISOString() + '--  ' + args[0] + '\n';
		output += 'Resolving... ' + ip + '\n';
		output += 'Connecting... connected.\n';
		output += 'HTTP request sent, awaiting response... 200 OK\n';
		output += 'Saved \'index.html\'';
		return [{ text: output, type: null }];
	},

	cmdIp: function(ctx, args) {
		var sub = args[0] || 'addr';
		var net = ctx.network;
		if (!net) return [{ text: 'ip: Netzwerk-Simulation nicht verfuegbar', type: 'error' }];

		if (sub === 'addr' || sub === 'a') {
			var output = '';
			var idx = 1;
			for (var name in net.interfaces) {
				var iface = net.interfaces[name];
				output += idx + ': ' + name + ': <BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state ' + iface.state + '\n';
				output += '    link/ether ' + iface.mac + ' brd ff:ff:ff:ff:ff:ff\n';
				output += '    inet ' + iface.ipv4 + ' scope global ' + name + '\n';
				if (iface.ipv6) output += '    inet6 ' + iface.ipv6 + ' scope link\n';
				if (idx === 1) output += '\n';
				idx++;
			}
			return [{ text: output.trimEnd(), type: null }];
		}
		if (sub === 'route' || sub === 'r') {
			var output = '';
			for (var i = 0; i < net.routing.length; i++) {
				var r = net.routing[i];
				output += r.dest + (r.via ? ' via ' + r.via : '') + ' dev ' + r.dev + ' proto ' + r.proto + '\n';
			}
			return [{ text: output.trimEnd(), type: null }];
		}
		if (sub === 'link' || sub === 'l') {
			var target = null;
			for (var li = 1; li < args.length; li++) {
				if (args[li] !== 'show' && args[li].charAt(0) !== '-') { target = args[li]; break; }
			}
			var linkOut = '';
			var linkIdx = 1;
			for (var ifName in net.interfaces) {
				if (target && ifName !== target) continue;
				var ifData = net.interfaces[ifName];
				var flags = ifName === 'lo' ? 'LOOPBACK,UP' : 'BROADCAST,MULTICAST,' + ifData.state;
				var qdisc = ifName === 'lo' ? 'noqueue' : 'fq_codel';
				var macType = ifName === 'lo' ? 'loopback' : 'ether';
				var broadcast = ifName === 'lo' ? '00:00:00:00:00:00' : 'ff:ff:ff:ff:ff:ff';
				linkOut += linkIdx + ': ' + ifName + ': <' + flags + '> mtu ' + (ifName === 'lo' ? '65536' : '1500') + ' qdisc ' + qdisc + ' state ' + (ifName === 'lo' ? 'UNKNOWN' : ifData.state) + '\n';
				linkOut += '    link/' + macType + ' ' + ifData.mac + ' brd ' + broadcast + '\n';
				linkIdx++;
			}
			if (!linkOut) return [{ text: 'Device "' + target + '" does not exist.', type: 'error' }];
			return [{ text: linkOut.trimEnd(), type: null }];
		}
		if (sub === 'neigh' || sub === 'n') {
			var output = '';
			for (var i = 0; i < net.arp.length; i++) {
				var entry = net.arp[i];
				output += entry.ip + ' dev ' + entry.dev + ' lladdr ' + entry.mac + ' ' + entry.state + '\n';
			}
			return [{ text: output.trimEnd(), type: null }];
		}
		return [{ text: 'Usage: ip [addr|link|route|neigh]', type: null }];
	},

	cmdIfconfig: function(ctx, args) {
		return this.cmdIp(ctx, ['addr']);
	},

	cmdSs: function(ctx, args) {
		var output = 'Netid  State   Recv-Q Send-Q  Local Address:Port   Peer Address:Port\n';
		output += 'tcp    ESTAB   0      0        192.168.1.100:42312  142.250.185.206:443\n';
		output += 'tcp    ESTAB   0      0        192.168.1.100:38910  151.101.1.140:443\n';
		output += 'tcp    LISTEN  0      128            0.0.0.0:22         0.0.0.0:*\n';
		output += 'tcp    LISTEN  0      511            0.0.0.0:80         0.0.0.0:*\n';
		output += 'udp    UNCONN  0      0        192.168.1.100:68     192.168.1.1:67';
		return [{ text: output, type: null }];
	},

	cmdNmap: function(ctx, args) {
		if (!args[0]) return [{ text: 'Usage: nmap [target]', type: 'error' }];
		var self = TerminalCommands;
		var ip = self.resolveIp(ctx, args[0]);
		var output = 'Starting Nmap 7.94 ( https://nmap.org )\n';
		output += 'Nmap scan report for ' + args[0] + ' (' + ip + ')\n';
		output += 'Host is up (0.0034s latency).\n';
		output += 'PORT     STATE    SERVICE\n';
		output += '22/tcp   open     ssh\n';
		output += '53/tcp   open     domain\n';
		output += '80/tcp   open     http\n';
		output += '443/tcp  open     https\n';
		output += 'Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds';
		return [{ text: output, type: null }];
	},

	cmdTshark: function(ctx, args) {
		var output = 'Capturing on \'eth0\'\n';
		output += '  1 0.000000 192.168.1.100 \u2192 192.168.1.1   DNS 74 Standard query A google.com\n';
		output += '  2 0.015234 192.168.1.1   \u2192 192.168.1.100 DNS 90 Response A 142.250.185.206\n';
		output += '  3 0.020000 192.168.1.100 \u2192 142.250.185.206 TCP 66 42312\u2192443 [SYN]\n';
		output += '  4 0.035000 142.250.185.206 \u2192 192.168.1.100 TCP 66 443\u219242312 [SYN,ACK]\n';
		output += '  5 0.036000 192.168.1.100 \u2192 142.250.185.206 TCP 54 42312\u2192443 [ACK]';
		return [{ text: output, type: null }];
	},

	cmdTcpdump: function(ctx, args) {
		var output = 'tcpdump: verbose output suppressed, use -v for full decode\n';
		output += 'listening on eth0, link-type EN10MB (Ethernet), snapshot length 262144 bytes\n';
		output += '12:34:56.001 IP 192.168.1.100.42312 > 142.250.185.206.443: Flags [S]\n';
		output += '12:34:56.015 IP 142.250.185.206.443 > 192.168.1.100.42312: Flags [S.]';
		return [{ text: output, type: null }];
	},

	cmdArp: function(ctx, args) {
		var net = ctx.network;
		if (!net) return [{ text: 'arp: Netzwerk-Simulation nicht verfuegbar', type: 'error' }];
		var output = '';
		for (var i = 0; i < net.arp.length; i++) {
			var entry = net.arp[i];
			output += '? (' + entry.ip + ') at ' + entry.mac + ' [ether]   on ' + entry.dev + '\n';
		}
		return [{ text: output.trimEnd(), type: null }];
	},

	cmdOpenssl: function(ctx, args) {
		if (args.length === 0) {
			return [{ text: 'openssl: Nutzung: openssl s_client -connect host:port', type: null }];
		}
		if (args[0] === 's_client') {
			var connectIdx = args.indexOf('-connect');
			var host = (connectIdx !== -1 && args[connectIdx + 1]) ? args[connectIdx + 1] : (args[2] || 'example.com:443');
			var domain = host.split(':')[0];
			var output = 'CONNECTED(00000003)\n';
			output += 'depth=2 C = US, O = DigiCert Inc, OU = www.digicert.com, CN = DigiCert Global Root CA\n';
			output += 'depth=1 C = US, O = Let\'s Encrypt, CN = R3\n';
			output += 'depth=0 CN = ' + domain + '\n\n';
			output += 'Certificate chain\n';
			output += ' 0 s:CN = ' + domain + '\n';
			output += '   i:C = US, O = Let\'s Encrypt, CN = R3\n';
			output += '   a:PKEY: id-ecPublicKey, 256 (bit); sigalg: RSA-SHA256\n';
			output += '   v:NotBefore: Jan 15 00:00:00 2026 GMT; NotAfter: Apr 15 00:00:00 2026 GMT';
			return [{ text: output, type: null }];
		}
		if (args[0] === 'x509') {
			return [{ text: 'notBefore=Jan 15 00:00:00 2026 GMT\nnotAfter=Apr 15 00:00:00 2026 GMT', type: null }];
		}
		if (args[0] === 'genrsa') {
			var output = 'Generating RSA private key, 2048 bit long modulus (2 primes)\n';
			output += '................................+++++\n';
			output += '......................+++++\n';
			output += 'e is 65537 (0x10001)\n';
			output += '-----BEGIN RSA PRIVATE KEY-----\n';
			output += 'MIIEowIBAAKCAQEA0Z3VS5JJcds3xfn/ygWyF8PbnGy0AHB7...\n';
			output += '... (private key erstellt) ...\n';
			output += '-----END RSA PRIVATE KEY-----\n';
			output += 'RSA Private Key erstellt: private.key (2048 Bit)';
			return [{ text: output, type: null }];
		}
		if (args[0] === 'rsa') {
			var output = 'Private-Key: (2048 bit, 2 primes)\n';
			output += 'modulus:\n';
			output += '    00:d3:9d:d5:4b:92:49:71:db:37:c5:f9:ff:ca:05:\n';
			output += '    b2:17:c3:db:9c:6c:b4:00:70:7b:3e:a8:c5:91:\n';
			output += 'publicExponent: 65537 (0x10001)\n';
			output += 'privateExponent: (versteckt)\n';
			output += 'key der Daten: 2048 Bit RSA';
			return [{ text: output, type: null }];
		}
		if (args[0] === 'req' && args.indexOf('-newkey') !== -1) {
			var output = 'Generating a RSA private key\n';
			output += '..........+++++\n';
			output += '......+++++\n';
			output += 'writing new private key to key.pem\n';
			output += '-----\n';
			output += 'Country Name (2 letter code) [AU]:DE\n';
			output += 'State or Province Name [Some-State]:Bayern\n';
			output += 'Organization Name [Internet Widgits Pty Ltd]:Mein Training\n';
			output += 'Common Name (e.g. server FQDN) []:netzwerk-lab.local\n';
			output += 'Zertifikatsanfrage erstellt: cert.pem';
			return [{ text: output, type: null }];
		}
		return [{ text: 'openssl: Unbekannter Befehl. Versuche: openssl s_client -connect host:443', type: null }];
	},

	cmdSshKeygen: function(ctx, args) {
		if (args.indexOf('-t') !== -1 && args.indexOf('rsa') !== -1) {
			var output = 'Generating public/private rsa key pair.\n';
			output += 'Enter file in which to save the key (/home/analyst/.ssh/id_rsa):\n';
			output += 'Your identification has been saved in /home/analyst/.ssh/id_rsa\n';
			output += 'Your public key has been saved in /home/analyst/.ssh/id_rsa.pub\n';
			output += 'The key fingerprint is:\n';
			output += 'SHA256:xK3a9fG2bH8cJ1dE5fL0mN6oP4qR7sT2uV9wX3yZ analyst@netzwerk-lab\n';
			output += 'The key\'s randomart image is:\n';
			output += '+---[RSA 3072]----+\n';
			output += '|    .o+B=o.      |\n';
			output += '|   . + =.+ .     |\n';
			output += '|    + * o .      |\n';
			output += '|     = B .       |\n';
			output += '|    . = S        |\n';
			output += '+----[SHA256]-----+';
			return [{ text: output, type: null }];
		}
		if (args.indexOf('-t') !== -1 && args.indexOf('ed25519') !== -1) {
			var output = 'Generating public/private ed25519 key pair.\n';
			output += 'Your identification has been saved in /home/analyst/.ssh/id_ed25519\n';
			output += 'Your public key has been saved in /home/analyst/.ssh/id_ed25519.pub\n';
			output += 'SHA256:aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0u analyst@netzwerk-lab';
			return [{ text: output, type: null }];
		}
		return [{ text: 'ssh-keygen: Nutzung: ssh-keygen -t rsa  oder  ssh-keygen -t ed25519', type: null }];
	},

	cmdGpg: function(ctx, args) {
		if (args[0] === '--gen-key' || args[0] === '--full-generate-key') {
			var output = 'gpg (GnuPG) 2.2.40; Copyright (C) 2023 g10 Code GmbH\n';
			output += 'Please select what kind of key you want:\n';
			output += '   (1) RSA and RSA (default)\n';
			output += '   (2) DSA and Elgamal\n';
			output += '   (3) DSA (sign only)\n';
			output += '   (4) RSA (sign only)\n';
			output += 'Your selection? 1\n';
			output += 'RSA keys may be between 1024 and 4096 bits long.\n';
			output += 'What keysize do you want? (3072) 4096\n';
			output += 'Requested keysize is 4096 bits\n';
			output += 'Key expires at: nie\n';
			output += 'GPG-Schl\u00fcsselpaar erstellt: RSA 4096 Bit\n';
			output += 'Public Key: /home/analyst/.gnupg/public.key\n';
			output += 'Private Key: /home/analyst/.gnupg/private.key';
			return [{ text: output, type: null }];
		}
		if (args[0] === '--list-keys') {
			var output = '/home/analyst/.gnupg/pubring.kbx\n';
			output += '-------------------------------\n';
			output += 'pub   rsa4096 2026-04-12 [SC]\n';
			output += '      ABC1DEF2GHI3JKL4MNO5PQR6STU7VWX8YZ9\n';
			output += 'uid        [ ultimativ ] Analyst <analyst@netzwerk-lab.local>\n';
			output += 'sub   rsa4096 2026-04-12 [E]';
			return [{ text: output, type: null }];
		}
		if (args[0] === '--export') {
			var output = '-----BEGIN PGP PUBLIC KEY BLOCK-----\n';
			output += 'mDMEZxMhRxYJKwYBBAHaRw8BAQdAXYZ...\n';
			output += '... (Public Key exportiert) ...\n';
			output += '-----END PGP PUBLIC KEY BLOCK-----';
			return [{ text: output, type: null }];
		}
		return [{ text: 'gpg: Nutzung: gpg --gen-key | --list-keys | --export', type: null }];
	},

	cmdGetDisk: function(ctx, args) {
		var out = 'Number FriendlyName        SerialNumber         Size      PartitionStyle  BusType\n';
		out += '------ ------------        ------------         ----      --------------  -------\n';
		out += '0      Samsung SSD 970     S4J2NS0R123456K      512 GB    GPT             NVMe\n';
		out += '1      SanDisk Cruzer      4C5300001234567890    32 GB    MBR             USB';
		return [{ text: out, type: null }];
	},

	cmdGetPartition: function(ctx, args) {
		var diskIdx = args.indexOf('-DiskNumber');
		var diskNo = diskIdx !== -1 ? args[diskIdx + 1] : '1';
		var out = 'DiskNumber PartitionNumber DriveLetter Offset   Size      Type\n';
		out += '---------- --------------- ----------- ------   ----      ----\n';
		if (diskNo === '0') out += '0          1               C           1048576  511.5 GB  Basic';
		else out += '1          1               E           1048576   31.9 GB  Basic';
		return [{ text: out, type: null }];
	},

	cmdGetVolume: function(ctx, args) {
		var out = 'DriveLetter FileSystemLabel FileSystem Size      SizeRemaining HealthStatus\n';
		out += '----------- --------------- ---------- ----      ------------- ------------\n';
		out += 'C           System          NTFS       511.5 GB  180.3 GB      Healthy\n';
		out += 'E           USB             FAT32       31.9 GB   12.2 GB      Healthy';
		return [{ text: out, type: null }];
	},

	cmdGetPhysicalDisk: function(ctx, args) {
		var out = 'DeviceId FriendlyName      SerialNumber        MediaType BusType Size\n';
		out += '-------- ------------      ------------        --------- ------- ----\n';
		out += '0        Samsung SSD 970   S4J2NS0R123456K     SSD       NVMe    512 GB\n';
		out += '1        SanDisk Cruzer    4C5300001234567890  SSD       USB      32 GB';
		return [{ text: out, type: null }];
	},

	cmdGetFileHash: function(ctx, args) {
		var algoIdx = args.indexOf('-Algorithm');
		var algo = algoIdx !== -1 ? (args[algoIdx + 1] || 'SHA256') : 'SHA256';
		var file = args[args.length - 1] || 'disk01.img';
		var hash = algo.toUpperCase() === 'MD5'
			? 'A1B2C3D4E5F67890ABCDEF1234567890'
			: 'A1B2C3D4E5F6789012345678901234567890ABCDEF1234567890ABCDEF123456';
		return [{ text: 'Algorithm : ' + algo.toUpperCase() + '\nHash      : ' + hash + '\nPath      : ' + file, type: 'success' }];
	},

	cmdGetChildItem: function(ctx, args) {
		var out = 'Mode   LastWriteTime       Length Name\n';
		out += '----   -------------       ------ ----\n';
		out += 'd----- 15.03.2024 09:30           images\n';
		out += 'd----- 15.03.2024 09:35           hashes\n';
		out += '-a---- 15.03.2024 09:31 34359738368 disk01.img\n';
		out += '-a---- 15.03.2024 09:37         52 image.md5';
		return [{ text: out, type: null }];
	},

	cmdGetCommand: function(ctx, args) {
		var target = args[0] || 'ftkimager.exe';
		return this.which(ctx, [target]);
	},

	cmdSelectObject: function(ctx, args, stdin) {
		if (!stdin) return [{ text: 'Select-Object: Keine Eingabedaten aus der Pipeline erhalten.', type: 'warning' }];
		var lines = stdin.split('\n');
		var props = args.filter(function(a) { return a.charAt(0) !== '-'; }).join(' ').trim();
		if (!props) return [{ text: lines.join('\n').trim(), type: null }];
		return [{ text: lines.join('\n').trim() + '\n(gefiltert: ' + props + ')', type: null }];
	},

	cmdExportCsv: function(ctx, args, stdin) {
		var path = args.filter(function(a) { return a.charAt(0) !== '-'; })[0] || 'C:\\Cases\\case01\\notes\\export.csv';
		var normalized = path.replace(/^C:\\/i, '/').replace(/\\/g, '/');
		var content = (stdin || 'ColumnA,ColumnB\nValueA,ValueB').trim();
		ctx.filesystem[normalized] = { type: 'file', content: content, size: content.length + 'B' };
		return [{ text: 'CSV exportiert nach ' + path, type: 'success' }];
	},

	cmdOutFile: function(ctx, args, stdin) {
		var path = args.filter(function(a) { return a.charAt(0) !== '-'; })[0] || 'C:\\Cases\\case01\\notes\\output.txt';
		var normalized = path.replace(/^C:\\/i, '/').replace(/\\/g, '/');
		var content = (stdin || 'Ausgabe gespeichert').trim();
		ctx.filesystem[normalized] = { type: 'file', content: content, size: content.length + 'B' };
		return [{ text: 'Datei geschrieben: ' + path, type: 'success' }];
	},

	cmdStartTranscript: function(ctx, args) {
		ctx.scriptActive = true;
		ctx.scriptFile = '/cases/case01/notes/session.log';
		ctx.scriptLines = ['Transcript started: ' + new Date().toLocaleString('de-DE')];
		return [{ text: 'Transcript started, output file is C:\\Cases\\case01\\notes\\session.log', type: 'success' }];
	},

	cmdStopTranscript: function(ctx, args) {
		if (!ctx.scriptActive) return [{ text: 'Stop-Transcript: Kein aktiver Transcript-Stream gefunden.', type: 'warning' }];
		ctx.scriptActive = false;
		return [{ text: 'Transcript stopped, output file is C:\\Cases\\case01\\notes\\session.log', type: 'success' }];
	},

	cmdDiskpart: function(ctx, args) {
		var out = 'Microsoft DiskPart-Version 10.0.22631.1\n';
		out += 'DISKPART> list disk\n';
		out += '  Datentraeger 0  Online   512 GB\n';
		out += '  Datentraeger 1  Online    32 GB\n';
		out += 'DISKPART> automount disable\n';
		out += 'Automatic mounting of new volumes disabled.';
		return [{ text: out, type: null }];
	},

	cmdCertutil: function(ctx, args) {
		if (args[0] === '-hashfile') {
			var file = args[1] || 'disk01.img';
			var algo = (args[2] || 'MD5').toUpperCase();
			var hash = algo === 'MD5' ? 'A1B2C3D4E5F67890ABCDEF1234567890' : 'A1B2C3D4E5F6789012345678901234567890ABCDEF1234567890ABCDEF123456';
			return [{ text: algo + ' hash of file ' + file + ':\n' + hash + '\nCertUtil: -hashfile command completed successfully.', type: 'success' }];
		}
		return [{ text: 'certutil: Nutzung certutil -hashfile <datei> MD5|SHA256', type: 'info' }];
	},

	cmdFtkImager: function(ctx, args) {
		if (args.indexOf('--verify') !== -1) {
			return [{ text: 'Verification started...\nVerification succeeded.\nMD5: A1B2C3D4E5F67890ABCDEF1234567890', type: 'success' }];
		}
		return [{ text: 'FTK Imager imaging started...\nSource: \\\\.\\PHYSICALDRIVE1\nOutput: C:\\Cases\\case01\\images\\disk01.E01\nMD5 calculated.\nImaging completed successfully.', type: 'success' }];
	},

	cmdAimCli: function(ctx, args) {
		if (args.indexOf('--mount') !== -1) {
			ctx.mountedDevices['/cases/case01/mounts/image01'] = '/cases/case01/images/disk01.E01';
			return [{ text: 'Mount successful (read-only).\nVirtual device: PhysicalDrive3', type: 'success' }];
		}
		if (args.indexOf('--dismount') !== -1) return [{ text: 'Image dismounted.', type: 'success' }];
		return [{ text: 'aim_cli.exe: Nutzung --mount/--dismount mit --readonly', type: 'info' }];
	},

	cmdFormatHex: function(ctx, args) {
		return [{ text: '00000000  FA 33 C0 8E D0 BC 00 7C 8B F4 50 07 50 1F FB FC\n000001F0  00 00 00 00 00 00 00 00 00 00 00 00 00 00 55 AA', type: null }];
	},

	cmdCompareObject: function(ctx, args) {
		return [{ text: 'InputObject              SideIndicator\n-----------              -------------\nVersion 2 der Datei      =>\nVersion 1 der Datei      <=', type: null }];
	},

	cmdFindstr: function(ctx, args, stdin) {
		var q = args.join(' ').replace(/\/I/gi, '').replace(/"/g, '').trim() || 'password';
		var base = stdin || 'confidential_report.pdf\npassword=Summer2024\nUmsatz_intern.xlsx';
		var lines = base.split('\n').filter(function(line) {
			return line.toLowerCase().indexOf(q.toLowerCase()) !== -1 ||
				(q.toLowerCase().indexOf(' ') !== -1 && q.toLowerCase().split(' ').some(function(token) { return token && line.toLowerCase().indexOf(token) !== -1; }));
		});
		return [{ text: (lines.length ? lines.join('\n') : 'Keine Treffer'), type: null }];
	},

	cmdWinget: function(ctx, args) {
		if (args[0] === 'install') {
			var pkg = args[1] || 'Microsoft.Sysinternals.Suite';
			return [{ text: 'Found ' + pkg + '\nSuccessfully installed package ' + pkg, type: 'success' }];
		}
		return [{ text: 'winget: Nutzung winget install <paket>', type: 'info' }];
	},

	cmdHostname: function(ctx, args) {
		var envId = ctx.environment || 'linux-forensik';
		if (envId === 'netzwerk-forensik') return [{ text: 'netzwerk-lab', type: null }];
		if (envId === 'windows-forensik') return [{ text: 'windows-lab', type: null }];
		return [{ text: 'forensik-workstation', type: null }];
	}
};

function InteractiveTerminal(containerId) {
	this.containerId = containerId;
	this.container = null;
	this.outputEl = null;
	this.inputEl = null;
	this.promptEl = null;
	this.currentPath = '/';
	this.history = [];
	this.historyIndex = -1;
	this.achievementSystem = null;
	this.filesystem = null;
	this.devices = null;
	this.mountedDevices = {};
	this.scriptActive = false;
	this.originalExecute = null;
	this.environment = 'linux-forensik';
	this.network = null;
	this.envStates = {};
	this._initEnvState('linux-forensik');
	this._applyEnvState('linux-forensik');
}

InteractiveTerminal.prototype._initEnvState = function(envId) {
	if (this.envStates[envId]) return;
	var state = { currentPath: '/', mountedDevices: {}, scriptActive: false, scriptFile: null, scriptLines: [] };
	if (envId === 'linux-forensik') {
		state.filesystem = JSON.parse(JSON.stringify(TerminalSharedFS));
		state.devices = JSON.parse(JSON.stringify(TerminalSharedDevices));
		state.network = null;
	} else if (envId === 'netzwerk-forensik') {
		state.filesystem = JSON.parse(JSON.stringify(TerminalSharedNetworkFS));
		state.devices = {};
		state.network = JSON.parse(JSON.stringify(TerminalSharedNetwork));
	} else if (envId === 'windows-forensik') {
		state.filesystem = JSON.parse(JSON.stringify(TerminalSharedWindowsFS));
		state.devices = {};
		state.network = null;
	}
	this.envStates[envId] = state;
};

InteractiveTerminal.prototype._applyEnvState = function(envId) {
	var state = this.envStates[envId];
	if (!state) return;
	this.currentPath = state.currentPath;
	this.mountedDevices = state.mountedDevices;
	this.scriptActive = state.scriptActive;
	this.scriptFile = state.scriptFile;
	this.scriptLines = state.scriptLines;
	this.filesystem = state.filesystem;
	this.devices = state.devices;
	this.network = state.network;
};

InteractiveTerminal.prototype._saveEnvState = function() {
	if (!this.environment || !this.envStates[this.environment]) return;
	var state = this.envStates[this.environment];
	state.currentPath = this.currentPath;
	state.mountedDevices = this.mountedDevices;
	state.scriptActive = this.scriptActive;
	state.scriptFile = this.scriptFile;
	state.scriptLines = this.scriptLines;
	state.filesystem = this.filesystem;
	state.devices = this.devices;
	state.network = this.network;
};

InteractiveTerminal.prototype.setEnvironment = function(envId) {
	if (!TerminalEnvConfig[envId]) return;
	if (this.environment === envId) return;
	this._saveEnvState();
	this._initEnvState(envId);
	this._applyEnvState(envId);
	this.environment = envId;
	this.updatePrompt();
	var titleEl = this.container ? this.container.querySelector('.t-title') : null;
	if (titleEl) titleEl.textContent = TerminalEnvConfig[envId].title;
};

InteractiveTerminal.prototype.init = function() {
	this.container = document.getElementById(this.containerId);
	if (!this.container) return false;
	var config = TerminalEnvConfig[this.environment] || TerminalEnvConfig['linux-forensik'];
	this.container.innerHTML = '<div class="terminal-container"><div class="t-header"><span class="t-title">' + config.title + '</span><div class="t-header-actions"><span class="t-status">Bereit</span><button class="t-minimize-btn" title="Terminal minimieren">&#x2212;</button></div></div><div class="t-body"></div><div class="t-input-wrap"><span class="t-prompt-label">' + this.getPrompt() + '</span><div class="t-input-field"><span class="t-text-before"></span><span class="t-block-cursor"></span><span class="t-text-after"></span><input type="text" class="t-input" autocomplete="off"></div></div></div>';
	this.outputEl = this.container.querySelector('.t-body');
	this.inputEl = this.container.querySelector('.t-input');
	this.inputFieldEl = this.container.querySelector('.t-input-field');
	this.promptEl = this.container.querySelector('.t-prompt-label');
	this.mirrorBeforeEl = this.container.querySelector('.t-text-before');
	this.mirrorAfterEl = this.container.querySelector('.t-text-after');
	this.cursorEl = this.container.querySelector('.t-block-cursor');
	this.bindEvents();
	var self = this;
	var minBtn = this.container.querySelector('.t-minimize-btn');
	if (minBtn) {
		minBtn.addEventListener('click', function() {
			var termEl = document.getElementById('terminal-bottom');
			if (termEl) { termEl.classList.remove('open'); termEl.style.height = ''; }
		});
	}
	var termInner = this.container.querySelector('.terminal-container');
	if (termInner) {
		termInner.addEventListener('click', function(e) {
			if (e.target.tagName !== 'BUTTON') self.inputEl.focus();
		});
	}
	this.displayOutput(config.welcomeMsg);
	return true;
};

InteractiveTerminal.prototype.getInputText = function() {
	return this.inputEl.value.trim();
};

InteractiveTerminal.prototype.clearInput = function() {
	this.inputEl.value = '';
	if (this.mirrorBeforeEl) this.mirrorBeforeEl.textContent = '';
	if (this.mirrorAfterEl) this.mirrorAfterEl.textContent = '';
};

InteractiveTerminal.prototype.updateMirror = function() {
	var inputValue = this.inputEl.value || '';
	var caretPos = typeof this.inputEl.selectionStart === 'number' ? this.inputEl.selectionStart : inputValue.length;
	var before = inputValue.substring(0, caretPos);
	var cursorChar = caretPos < inputValue.length ? inputValue.charAt(caretPos) : ' ';
	var after = caretPos < inputValue.length ? inputValue.substring(caretPos + 1) : '';
	if (this.mirrorBeforeEl) this.mirrorBeforeEl.textContent = before;
	if (this.mirrorAfterEl) this.mirrorAfterEl.textContent = after;
	if (this.cursorEl) this.cursorEl.textContent = cursorChar;
	if (this.inputFieldEl) this.inputFieldEl.classList.toggle('has-input', inputValue.length > 0);
};

InteractiveTerminal.prototype.bindEvents = function() {
	var self = this;
	this.inputEl.addEventListener('input', function() { self.updateMirror(); });
	this.inputEl.addEventListener('click', function() { self.updateMirror(); });
	this.inputEl.addEventListener('keyup', function() { self.updateMirror(); });
	this.inputEl.addEventListener('focus', function() { self.updateMirror(); });
	this.inputEl.addEventListener('keydown', function(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			var cmd = self.getInputText();
			if (cmd) {
				self.history.push(cmd);
				self.historyIndex = self.history.length;
				self.displayInput(cmd);
				self.executeCommand(cmd);
			}
			self.clearInput();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (self.historyIndex > 0) {
				self.historyIndex--;
				self.inputEl.value = self.history[self.historyIndex];
				self.inputEl.setSelectionRange(self.inputEl.value.length, self.inputEl.value.length);
				self.updateMirror();
			}
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (self.historyIndex < self.history.length - 1) {
				self.historyIndex++;
				self.inputEl.value = self.history[self.historyIndex];
				self.inputEl.setSelectionRange(self.inputEl.value.length, self.inputEl.value.length);
				self.updateMirror();
			}
			else {
				self.historyIndex = self.history.length;
				self.inputEl.value = '';
				self.inputEl.setSelectionRange(0, 0);
				self.updateMirror();
			}
		}
	});
};

InteractiveTerminal.prototype.displayInput = function(cmd) {
	var line = document.createElement('div');
	line.className = 't-line';
	line.innerHTML = '<span class="t-prompt">' + this.escapeHtml(this.getPrompt()) + '</span><span class="t-cmd">' + this.escapeHtml(cmd) + '</span>';
	this.outputEl.appendChild(line);
	this.scrollToBottom();
};

InteractiveTerminal.prototype.displayOutput = function(text, type) {
	var line = document.createElement('div');
	line.className = 't-output' + (type ? ' t-' + type : '');
	line.textContent = text;
	this.outputEl.appendChild(line);
	this.scrollToBottom();
};

InteractiveTerminal.prototype.scrollToBottom = function() {
	this.outputEl.scrollTop = this.outputEl.scrollHeight;
};

InteractiveTerminal.prototype.getPrompt = function() {
	if (this.environment === 'netzwerk-forensik') return 'analyst@netzwerk-lab:' + this.currentPath + '$ ';
	if (this.environment === 'windows-forensik') return 'analyst@windows-lab:' + this.currentPath + '> ';
	return 'analyst@forensik-workstation:' + this.currentPath + '$ ';
};

InteractiveTerminal.prototype.updatePrompt = function() {
	if (this.promptEl) this.promptEl.textContent = this.getPrompt();
};

InteractiveTerminal.prototype.escapeHtml = function(str) {
	var d = document.createElement('div');
	d.textContent = str;
	return d.innerHTML;
};

InteractiveTerminal.prototype.setAchievementSystem = function(sys) {
	this.achievementSystem = sys;
};

InteractiveTerminal.prototype.trackCommand = function(cmd) {
	if (this.achievementSystem) this.achievementSystem.trackCommand(cmd);
};

InteractiveTerminal.prototype.resolvePath = function(p) {
	return TerminalCommands.resolvePath(this.currentPath, p);
};

InteractiveTerminal.prototype.executeCommand = function(cmdLine) {
	var parts = cmdLine.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
	var cmd = parts[0];
	this.trackCommand(cmd);
	var self = this;
	var ctx = {
		currentPath: this.currentPath,
		filesystem: this.filesystem,
		devices: this.devices,
		mountedDevices: this.mountedDevices,
		history: this.history,
		scriptActive: this.scriptActive,
		scriptFile: this.scriptFile || null,
		scriptLines: this.scriptLines || [],
		environment: this.environment,
		network: this.network,
		resolvePath: function(p) { return TerminalCommands.resolvePath(ctx.currentPath, p); }
	};
	var result = TerminalCommands.executeLine(cmdLine, ctx);
	if (ctx.scriptActive && ctx.scriptFile) {
		ctx.scriptLines.push('$ ' + cmdLine);
		for (var s = 0; s < result.outputs.length; s++) {
			ctx.scriptLines.push(result.outputs[s].text);
		}
	}
	if (result.clear) {
		this.outputEl.innerHTML = '';
	} else {
		for (var i = 0; i < result.outputs.length; i++) {
			this.displayOutput(result.outputs[i].text, result.outputs[i].type);
		}
	}
	if (result.exitScript) {
		this.scriptActive = false;
		this.scriptFile = null;
		this.scriptLines = [];
	}
	this.currentPath = ctx.currentPath;
	this.mountedDevices = ctx.mountedDevices;
	this.scriptActive = ctx.scriptActive;
	if (ctx.scriptFile) this.scriptFile = ctx.scriptFile;
	if (ctx.scriptLines) this.scriptLines = ctx.scriptLines;
	this.updatePrompt();
};

function InlineTerminal(container) {
	this.container = container;
	this.currentPath = '/';
	this.history = [];
	this.historyIndex = -1;
	this.filesystem = null;
	this.devices = null;
	this.mountedDevices = {};
	this.scriptActive = false;
	this.suggestion = '';
	this.bodyEl = null;
	this.inputEl = null;
	this.promptEl = null;
	this.suggestionEl = null;
	this.wrapperEl = null;
	this.boundKeydown = null;
	this.boundSuggestionClick = null;
	this.environment = 'linux-forensik';
	this.network = null;
	this._detectEnvironment();
}

InlineTerminal.prototype._detectEnvironment = function() {
	var envId = 'linux-forensik';
	if (typeof App !== 'undefined' && App.currentLab) {
		envId = App.currentLab;
	}
	if (TerminalEnvConfig[envId]) {
		this.environment = envId;
	}
	if (this.environment === 'netzwerk-forensik') {
		this.filesystem = JSON.parse(JSON.stringify(TerminalSharedNetworkFS));
		this.devices = {};
		this.network = JSON.parse(JSON.stringify(TerminalSharedNetwork));
	} else if (this.environment === 'windows-forensik') {
		this.filesystem = JSON.parse(JSON.stringify(TerminalSharedWindowsFS));
		this.devices = {};
		this.network = null;
	} else {
		this.filesystem = JSON.parse(JSON.stringify(TerminalSharedFS));
		this.devices = JSON.parse(JSON.stringify(TerminalSharedDevices));
		this.network = null;
	}
};

InlineTerminal.prototype.setEnvironment = function(envId) {
	if (!TerminalEnvConfig[envId]) return;
	this.environment = envId;
	if (envId === 'netzwerk-forensik') {
		this.filesystem = JSON.parse(JSON.stringify(TerminalSharedNetworkFS));
		this.devices = {};
		this.network = JSON.parse(JSON.stringify(TerminalSharedNetwork));
	} else if (envId === 'windows-forensik') {
		this.filesystem = JSON.parse(JSON.stringify(TerminalSharedWindowsFS));
		this.devices = {};
		this.network = null;
	} else {
		this.filesystem = JSON.parse(JSON.stringify(TerminalSharedFS));
		this.devices = JSON.parse(JSON.stringify(TerminalSharedDevices));
		this.network = null;
	}
	this.currentPath = '/';
	this.mountedDevices = {};
	this.updatePrompt();
};

InlineTerminal.prototype.init = function() {
	var self = this;
	this.wrapperEl = document.createElement('div');
	this.wrapperEl.className = 'inline-terminal';
	this.wrapperEl.style.height = '280px';
	this.wrapperEl.style.display = 'flex';
	this.wrapperEl.style.flexDirection = 'column';

	var header = document.createElement('div');
	header.className = 'it-header';
	var title = document.createElement('span');
	title.className = 'it-title';
	title.textContent = 'TERMINAL - Probiere es aus!';
	header.appendChild(title);

	var suggestion = document.createElement('div');
	suggestion.className = 'it-suggestion';
	suggestion.title = 'Klicke zum Einfuegen';
	suggestion.style.display = 'none';
	var sugIcon = document.createElement('span');
	sugIcon.className = 'it-suggestion-icon';
	sugIcon.textContent = '\u25B8';
	var sugCmd = document.createElement('span');
	sugCmd.className = 'it-suggestion-cmd';
	sugCmd.textContent = '';
	suggestion.appendChild(sugIcon);
	suggestion.appendChild(sugCmd);

	var body = document.createElement('div');
	body.className = 'it-body';
	body.style.flex = '1';
	body.style.overflowY = 'auto';

	var inputWrap = document.createElement('div');
	inputWrap.className = 'it-input-wrap';
	var prompt = document.createElement('span');
	prompt.className = 'it-prompt';
	prompt.textContent = this.getPrompt();
	var input = document.createElement('input');
	input.type = 'text';
	input.className = 'it-input';
	input.placeholder = 'Befehl eingeben...';
	input.autocomplete = 'off';
	inputWrap.appendChild(prompt);
	inputWrap.appendChild(input);

	this.wrapperEl.appendChild(header);
	this.wrapperEl.appendChild(suggestion);
	this.wrapperEl.appendChild(body);
	this.wrapperEl.appendChild(inputWrap);
	this.container.appendChild(this.wrapperEl);

	this.bodyEl = body;
	this.inputEl = input;
	this.promptEl = prompt;
	this.suggestionEl = suggestion;

	this.boundSuggestionClick = function() {
		var cmdText = suggestion.querySelector('.it-suggestion-cmd').textContent;
		if (cmdText) self.inputEl.value = cmdText;
		self.inputEl.focus();
	};
	suggestion.addEventListener('click', this.boundSuggestionClick);

	this.boundKeydown = function(e) {
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
			if (self.historyIndex > 0) { self.historyIndex--; self.inputEl.value = self.history[self.historyIndex]; }
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (self.historyIndex < self.history.length - 1) { self.historyIndex++; self.inputEl.value = self.history[self.historyIndex]; }
			else { self.historyIndex = self.history.length; self.inputEl.value = ''; }
		}
	};
	input.addEventListener('keydown', this.boundKeydown);
};

InlineTerminal.prototype.setSuggestion = function(cmd) {
	this.suggestion = cmd;
	if (cmd) {
		this.suggestionEl.style.display = '';
		this.suggestionEl.querySelector('.it-suggestion-cmd').textContent = cmd;
	} else {
		this.suggestionEl.style.display = 'none';
		this.suggestionEl.querySelector('.it-suggestion-cmd').textContent = '';
	}
};

InlineTerminal.prototype.executeCommand = function(cmdLine) {
	var ctx = {
		currentPath: this.currentPath,
		filesystem: this.filesystem,
		devices: this.devices,
		mountedDevices: this.mountedDevices,
		history: this.history,
		scriptActive: this.scriptActive,
		scriptFile: this.scriptFile || null,
		scriptLines: this.scriptLines || [],
		environment: this.environment,
		network: this.network,
		resolvePath: function(p) { return TerminalCommands.resolvePath(ctx.currentPath, p); }
	};
	var result = TerminalCommands.executeLine(cmdLine, ctx);
	if (result.clear) {
		this.bodyEl.innerHTML = '';
	} else {
		for (var i = 0; i < result.outputs.length; i++) {
			this.displayOutput(result.outputs[i].text, result.outputs[i].type);
		}
	}
	if (result.exitScript) {
		this.scriptActive = false;
		this.scriptFile = null;
		this.scriptLines = [];
	}
	this.currentPath = ctx.currentPath;
	this.mountedDevices = ctx.mountedDevices;
	this.scriptActive = ctx.scriptActive;
	if (ctx.scriptFile) this.scriptFile = ctx.scriptFile;
	if (ctx.scriptLines) this.scriptLines = ctx.scriptLines;
	this.updatePrompt();
};

InlineTerminal.prototype.displayOutput = function(text, type) {
	var line = document.createElement('div');
	line.className = 'it-output' + (type ? ' it-' + type : '');
	line.textContent = text;
	this.bodyEl.appendChild(line);
	this.bodyEl.scrollTop = this.bodyEl.scrollHeight;
};

InlineTerminal.prototype.displayInput = function(cmd) {
	var line = document.createElement('div');
	line.className = 'it-line';
	var promptSpan = document.createElement('span');
	promptSpan.className = 'it-prompt';
	promptSpan.textContent = this.getPrompt();
	var cmdSpan = document.createElement('span');
	cmdSpan.className = 'it-cmd';
	cmdSpan.textContent = cmd;
	line.appendChild(promptSpan);
	line.appendChild(cmdSpan);
	this.bodyEl.appendChild(line);
	this.bodyEl.scrollTop = this.bodyEl.scrollHeight;
};

InlineTerminal.prototype.getPrompt = function() {
	if (this.environment === 'netzwerk-forensik') return 'analyst@netzwerk-lab:' + this.currentPath + '$ ';
	if (this.environment === 'windows-forensik') return 'analyst@windows-lab:' + this.currentPath + '> ';
	return 'analyst@forensik-workstation:' + this.currentPath + '$ ';
};

InlineTerminal.prototype.updatePrompt = function() {
	if (this.promptEl) this.promptEl.textContent = this.getPrompt();
};

InlineTerminal.prototype.destroy = function() {
	if (this.inputEl && this.boundKeydown) {
		this.inputEl.removeEventListener('keydown', this.boundKeydown);
	}
	if (this.suggestionEl && this.boundSuggestionClick) {
		this.suggestionEl.removeEventListener('click', this.boundSuggestionClick);
	}
	if (this.wrapperEl && this.wrapperEl.parentNode) {
		this.wrapperEl.parentNode.removeChild(this.wrapperEl);
	}
	this.bodyEl = null;
	this.inputEl = null;
	this.promptEl = null;
	this.suggestionEl = null;
	this.wrapperEl = null;
	this.boundKeydown = null;
	this.boundSuggestionClick = null;
};
