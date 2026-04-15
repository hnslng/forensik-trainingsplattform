var Reference = {
	sections: [
		{
			id: 'ref-01-workflow',
			title: 'Forensischer Ablauf',
			icon: '\u2699',
			html: function() { return '<div class="s-heading">Standard-Workflow &ndash; Datensicherung Schritt f&uuml;r Schritt</div>' +
				'<p class="s-text">Empfohlene Reihenfolge zur forensisch sauberen Datensicherung und Analyse. Befehle, Pfade, Device-Namen und Zeitstempel sind im Protokoll vollst&auml;ndig zu dokumentieren.</p>' +
				'<div class="s-callout s-callout-info"><div class="s-callout-title">Workflow-Schritte</div><div class="s-callout-body">' +
				'<strong>1.</strong> Datentr&auml;ger identifizieren und pr&uuml;fen<br>' +
				'<strong>2.</strong> Write-Blocker anschlie&szlig;en (falls verf&uuml;gbar)<br>' +
				'<strong>3.</strong> Sicherstellen, dass keine Partitionen des Originals gemountet sind<br>' +
				'<strong>4.</strong> Protokollierung starten (<span class="s-inline">script</span>-Befehl)<br>' +
				'<strong>5.</strong> Initialen Hash des Originals erzeugen (SHA-256 prim&auml;r)<br>' +
				'<strong>6.</strong> Forensisches Image erstellen<br>' +
				'<strong>7.</strong> Hash des Images erzeugen<br>' +
				'<strong>8.</strong> Hashwerte vergleichen und dokumentieren<br>' +
				'<strong>9.</strong> Hash-Verifikation durchf&uuml;hren (<span class="s-inline">-c</span>)<br>' +
				'<strong>10.</strong> Analyse ausschlie&szlig;lich am Image (read-only) durchf&uuml;hren<br>' +
				'<strong>11.</strong> Chain of Custody dokumentieren</div></div>' +
				'<div class="s-heading">Case-Ordnerstruktur anlegen</div>' +
				'<p class="s-text">Erstellt eine saubere Verzeichnisstruktur f&uuml;r Images, Mountpoints, Hashes und Notizen.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>mkdir -p /cases/case01/{images,mounts,hashes,notes,reports,tools}</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Element</th><th>Erkl&auml;rung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">mkdir</span></td><td>Erstellt Verzeichnisse</td></tr>' +
				'<tr><td><span class="s-inline">-p</span></td><td>Legt auch &uuml;bergeordnete Verzeichnisse an; kein Fehler, wenn Verzeichnisse bereits existieren</td></tr>' +
				'<tr><td><span class="s-inline">/cases/case01/...</span></td><td>Beispielpfad f&uuml;r einen Case; an Umgebung anpassen</td></tr>' +
				'<tr><td><span class="s-inline">{images,mounts,...}</span></td><td>Shell-Brace-Expansion, erzeugt mehrere Ordner in einem Schritt</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-callout s-callout-tip"><div class="s-callout-title">Hinweis</div><div class="s-callout-body">Befehle, Pfade, Device-Namen und Zeitstempel sind im Protokoll (Case-Notes) vollst&auml;ndig zu dokumentieren.</div></div>'; }
		},
		{
			id: 'ref-02-basics',
			title: 'Grundbegriffe',
			icon: '\uD83D\uDCCB',
			html: function() { return '<div class="s-heading">Device &ndash; Physischer Blockspeicher</div>' +
				'<p class="s-text">Physischer Blockspeicher, z.&nbsp;B. <span class="s-inline">/dev/sda</span> (SATA/SCSI) oder <span class="s-inline">/dev/nvme0n1</span> (NVMe).</p>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Device-Pfad</th><th>Typ</th><th>Beispiel</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">/dev/sda</span></td><td>SATA/SCSI Disk</td><td>Erste SATA-Festplatte</td></tr>' +
				'<tr><td><span class="s-inline">/dev/sdb</span></td><td>SATA/SCSI Disk</td><td>Zweite SATA-Festplatte oder USB</td></tr>' +
				'<tr><td><span class="s-inline">/dev/nvme0n1</span></td><td>NVMe Disk</td><td>Erste NVMe-SSD</td></tr>' +
				'<tr><td><span class="s-inline">/dev/sda1</span></td><td>Partition</td><td>Erste Partition auf sda</td></tr>' +
				'<tr><td><span class="s-inline">/dev/nvme0n1p1</span></td><td>NVMe Partition</td><td>Erste Partition auf NVMe</td></tr>' +
				'<tr><td><span class="s-inline">/dev/loop0</span></td><td>Loop-Device</td><td>Virtuelles Blockdevice f&uuml;r Images</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Partition &ndash; Logischer Abschnitt</div>' +
				'<p class="s-text">Logischer Abschnitt eines Devices, z.&nbsp;B. <span class="s-inline">/dev/sda1</span>, definiert durch Start- und Endsektor.</p>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Partitionstyp</th><th>Max. Partitionen</th><th>Max. Gr&ouml;&szlig;e</th><th>Bereich</th></tr></thead><tbody>' +
				'<tr><td>MBR (Primary)</td><td>4</td><td>2 TiB</td><td>Erster Sektor (512 Byte)</td></tr>' +
				'<tr><td>MBR (Extended)</td><td>Logische weitere</td><td>2 TiB</td><td>Verkettete Eintr&auml;ge</td></tr>' +
				'<tr><td>GPT</td><td>128 (typisch)</td><td>18 EiB</td><td>Primary + Backup GPT</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Dateisystem &ndash; Struktur zur Organisation</div>' +
				'<p class="s-text">Struktur zur Organisation von Dateien (z.&nbsp;B. ext4, NTFS, FAT32). Je nach Typ unterschiedliche Metadaten (Superblock/Inodes bei ext*, MFT bei NTFS, Journal bei journaling-Dateisystemen).</p>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Dateisystem</th><th>Typische Plattform</th><th>Journaling</th><th>Besonderheiten</th></tr></thead><tbody>' +
				'<tr><td>NTFS</td><td>Windows</td><td>Ja</td><td>ACL, ADS, MFT, USN-Journal</td></tr>' +
				'<tr><td>FAT32</td><td>Wechselmedien</td><td>Nein</td><td>4 GB Dateigr&ouml;&szlig;enlimit</td></tr>' +
				'<tr><td>exFAT</td><td>Wechselmedien</td><td>Nein</td><td>Gro&szlig;e Dateien, hohe Kompatibilit&auml;t</td></tr>' +
				'<tr><td>ext4</td><td>Linux</td><td>Ja</td><td>Superblock, Inodes, Extents</td></tr>' +
				'<tr><td>XFS</td><td>Linux/NAS</td><td>Ja</td><td>Skalierbar, performant</td></tr>' +
				'<tr><td>Btrfs</td><td>Linux</td><td>Ja</td><td>Snapshots, Checksums, Subvolumes</td></tr>' +
				'<tr><td>APFS</td><td>macOS</td><td>Ja</td><td>Snapshots, Verschl&uuml;sselung</td></tr>' +
				'<tr><td>HFS+</td><td>&auml;ltere macOS</td><td>Ja</td><td>Legacy, Journal/Metadaten</td></tr>' +
				'</tbody></table></div>'; }
		},
		{
			id: 'ref-03-identify',
			title: 'Datentr&auml;ger identifizieren',
			icon: '\uD83D\uDD0D',
			html: function() { return '<div class="s-heading">Ger&auml;te&uuml;bersicht mit lsblk</div>' +
				'<p class="s-text">Listet Blockger&auml;te und deren Eigenschaften (&shy;Gr&ouml;&szlig;e, Typ, Mountpoint, Modell) &uuml;bersichtlich auf.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Parameter</th><th>Erkl&auml;rung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">lsblk</span></td><td>Listet Blockger&auml;te in Baumstruktur</td></tr>' +
				'<tr><td><span class="s-inline">-o</span></td><td>Auswahl der Ausgabespalten</td></tr>' +
				'<tr><td><span class="s-inline">NAME</span></td><td>Ger&auml;tename (z.&nbsp;B. sda, sda1)</td></tr>' +
				'<tr><td><span class="s-inline">SIZE</span></td><td>Gr&ouml;&szlig;e des Ger&auml;ts/der Partition</td></tr>' +
				'<tr><td><span class="s-inline">TYPE</span></td><td>Ger&auml;tetyp (disk, part, loop, &hellip;)</td></tr>' +
				'<tr><td><span class="s-inline">MOUNTPOINT</span></td><td>Mountpunkt (leer, wenn nicht gemountet)</td></tr>' +
				'<tr><td><span class="s-inline">MODEL</span></td><td>Modellbezeichnung (falls verf&uuml;gbar)</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Partitionen und Sektorgr&ouml;&szlig;en (fdisk)</div>' +
				'<p class="s-text">Zeigt Partitionen, Sektorgr&ouml;&szlig;en (logical/physical) und grundlegende Laufwerksinformationen.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>fdisk -l /dev/sda</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Parameter</th><th>Erkl&auml;rung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">fdisk</span></td><td>Tool zur Anzeige/Bearbeitung klassischer Partitionstabellen</td></tr>' +
				'<tr><td><span class="s-inline">-l</span></td><td>Listet Partitionstabellen und Details (List-Modus)</td></tr>' +
				'<tr><td><span class="s-inline">/dev/sda</span></td><td>Zielger&auml;t (Beispiel; korrektes Device vorher ermitteln)</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-callout s-callout-tip"><div class="s-callout-title">Hinweis</div><div class="s-callout-body">F&uuml;r Offset-Berechnungen sind <span class="s-inline">Start</span>-Sektor und <span class="s-inline">Sector size (logical/physical)</span> ma&szlig;geblich.</div></div>' +
				'<div class="s-heading">Partitionstabelle strukturiert (parted)</div>' +
				'<p class="s-text">Gibt Partitionstabelleninformationen strukturiert aus; hilfreich f&uuml;r Offset-Berechnung und Layout-Erkennung.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Bash</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>parted /dev/sda print</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Parameter</th><th>Erkl&auml;rung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">parted</span></td><td>Tool zur Anzeige/Bearbeitung von Partitionstabellen (MBR/GPT)</td></tr>' +
				'<tr><td><span class="s-inline">/dev/sda</span></td><td>Zielger&auml;t</td></tr>' +
				'<tr><td><span class="s-inline">print</span></td><td>Gibt die aktuelle Partitionstabelle und Geometrie aus</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Mount-Status pr&uuml;fen und unmounten</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Pr&uuml;fen ob gemountet</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>findmnt /dev/sdb1</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Unmounten falls gemountet</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>umount /dev/sdb1</code></pre></div>' +
				'<div class="s-callout s-callout-warning"><div class="s-callout-title">Achtung</div><div class="s-callout-body">Wenn das Original gemountet ist, besteht Schreib-/Journal-Risiko. Vor Imaging stets unmounten.</div></div>'; }
		},
		{
			id: 'ref-04-partitions',
			title: 'Partitionstabellen (MBR &amp; GPT)',
			icon: '\uD83D\uDCDA',
			html: function() { return '<div class="s-heading">MBR (Master Boot Record)</div>' +
				'<p class="s-text">Legacy-Partitionstabelle im ersten Sektor (typisch 512 Byte). Enth&auml;lt Bootcode und Partitionseintr&auml;ge. Typische Grenzen: vier prim&auml;re Partitionen; 2 TiB Gr&ouml;&szlig;enlimit.</p>' +
				'<div class="s-heading">MBR-Layout und Offset-Tabelle</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Offset (Hex)</th><th>Offset (Dez)</th><th>L&auml;nge</th><th>Inhalt</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">0x000</span></td><td>0</td><td>446 Byte</td><td>Bootcode (Bootstrap)</td></tr>' +
				'<tr><td><span class="s-inline">0x1BE</span></td><td>446</td><td>16 Byte</td><td>Partitionseintrag 1</td></tr>' +
				'<tr><td><span class="s-inline">0x1CE</span></td><td>462</td><td>16 Byte</td><td>Partitionseintrag 2</td></tr>' +
				'<tr><td><span class="s-inline">0x1DE</span></td><td>478</td><td>16 Byte</td><td>Partitionseintrag 3</td></tr>' +
				'<tr><td><span class="s-inline">0x1EE</span></td><td>494</td><td>16 Byte</td><td>Partitionseintrag 4</td></tr>' +
				'<tr><td><span class="s-inline">0x1FE</span></td><td>510</td><td>2 Byte</td><td>Signatur: <span class="s-inline">55 AA</span></td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">GPT (GUID Partition Table)</div>' +
				'<p class="s-text">Moderne Partitionstabelle mit Primary- und Backup-GPT. Partitionseintr&auml;ge enthalten GUID, Typ und Label. F&uuml;r Loop-Mounts wird der Byte-Offset aus <span class="s-inline">Startsektor &times; Sektorgr&ouml;&szlig;e</span> berechnet.</p>' +
				'<div class="s-heading">GPT vs. MBR &ndash; Vergleich</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Eigenschaft</th><th>MBR</th><th>GPT</th></tr></thead><tbody>' +
				'<tr><td>Max. Partitionen</td><td>4 prim&auml;r (+ logische)</td><td>128 (typisch)</td></tr>' +
				'<tr><td>Max. Gr&ouml;&szlig;e</td><td>2 TiB</td><td>18 EiB</td></tr>' +
				'<tr><td>Backup</td><td>Nein</td><td>Ja (Backup-GPT am Ende)</td></tr>' +
				'<tr><td>CRC/Integrit&auml;t</td><td>Nein</td><td>Ja (CRC32)</td></tr>' +
				'<tr><td>UEFI-Support</td><td>Eingeschr&auml;nkt (CSM)</td><td>Nativ</td></tr>' +
				'<tr><td>Partitions-Typen</td><td>1 Byte ID</td><td>GUID (128 Bit)</td></tr>' +
				'<tr><td>Signatur</td><td><span class="s-inline">55 AA</span> an Offset 510</td><td>EFI PART am Header</td></tr>' +
				'<tr><td>Protective MBR</td><td>&ndash;</td><td>Ja (first sector)</td></tr>' +
				'</tbody></table></div>'; }
		},
		{
			id: 'ref-05-imaging',
			title: 'Forensisches Imaging',
			icon: '\uD83D\uDCC4',
			html: function() { return '<div class="s-heading">Vollst&auml;ndiges Image mit dd erstellen</div>' +
				'<p class="s-text"><span class="s-inline">dd</span> erstellt ein sektorbasiertes 1:1-Abbild eines Blockger&auml;ts in eine Image-Datei.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">dd &ndash; Vollst&auml;ndiges Image</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>dd if=/dev/sda of=/cases/case01/images/disk01.img bs=16M conv=noerror,sync status=progress</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Parameter</th><th>Erkl&auml;rung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">dd</span></td><td>Kopiert Rohdaten blockweise von Input nach Output</td></tr>' +
				'<tr><td><span class="s-inline">if=</span></td><td>Input (Quelldevice oder Datei), z.&nbsp;B. <span class="s-inline">/dev/sda</span></td></tr>' +
				'<tr><td><span class="s-inline">of=</span></td><td>Output (Zielimage oder Datei), z.&nbsp;B. <span class="s-inline">disk01.img</span></td></tr>' +
				'<tr><td><span class="s-inline">bs=</span></td><td>Blockgr&ouml;&szlig;e (Performance/Buffering), z.&nbsp;B. <span class="s-inline">16M</span></td></tr>' +
				'<tr><td><span class="s-inline">conv=noerror</span></td><td>Bei Lesefehlern fortfahren (nicht abbrechen)</td></tr>' +
				'<tr><td><span class="s-inline">conv=sync</span></td><td>Fehlende/kurze Bl&ouml;cke mit Nullen auff&uuml;llen (Offset-Treue)</td></tr>' +
				'<tr><td><span class="s-inline">status=progress</span></td><td>Fortschrittsanzeige w&auml;hrend des Kopiervorgangs</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Blocksize (bs) &ndash; Wirkung, Vor- und Nachteile</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>bs-Beispiel</th><th>Wirkung</th><th>Vorteil</th><th>Nachteil</th><th>Empfehlung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">512 / 4K</span></td><td>Sehr kleine Bl&ouml;cke, viele I/O-Operationen</td><td>Feingranulares Verhalten, geringe RAM-Last</td><td>Deutlich langsamer, hoher Overhead</td><td>Nur bei bewusstem Sektor-Fokus</td></tr>' +
				'<tr><td><span class="s-inline">1M</span></td><td>Moderat</td><td>Guter Kompromiss, meist stabil</td><td>Nicht immer max. Durchsatz</td><td>Solide Default-Option</td></tr>' +
				'<tr><td><span class="s-inline">4M&ndash;16M</span></td><td>Gro&szlig;e Bl&ouml;cke</td><td>Deutlich schneller, weniger syscalls</td><td>H&ouml;here RAM-Last; bei fehlerhaften Medien teurere Retries</td><td>H&auml;ufig beste Praxis</td></tr>' +
				'<tr><td><span class="s-inline">32M&ndash;128M</span></td><td>Sehr gro&szlig;e Bl&ouml;cke</td><td>Maximaler Durchsatz bei schnellem Storage</td><td>Hohe RAM-Last; bei Fehlern teils ung&uuml;nstig</td><td>Nur wenn Umfeld stabil und fehlerfrei</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Image mit dc3dd erstellen (integriertes Hashing)</div>' +
				'<p class="s-text"><span class="s-inline">dc3dd</span> ist eine forensische Erweiterung von <span class="s-inline">dd</span> mit integriertem Hashing und Splitting. Vorteil: Hash wird w&auml;hrend des Imaging berechnet &ndash; spart Zeit und garantiert Konsistenz.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">dc3dd &ndash; Image mit Hash</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>dc3dd if=/dev/sda of=/cases/case01/images/disk01.img hash=sha256 log=/cases/case01/images/dc3dd.log</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Parameter</th><th>Erkl&auml;rung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">dc3dd</span></td><td>DoD Cyber Crime Center forensische dd-Variante</td></tr>' +
				'<tr><td><span class="s-inline">if=</span></td><td>Input (Quelldevice)</td></tr>' +
				'<tr><td><span class="s-inline">of=</span></td><td>Output (Zielimage)</td></tr>' +
				'<tr><td><span class="s-inline">hash=</span></td><td>Hash-Algorithmus (<span class="s-inline">md5</span>, <span class="s-inline">sha256</span>, oder beides: <span class="s-inline">md5,sha256</span>)</td></tr>' +
				'<tr><td><span class="s-inline">log=</span></td><td>Protokolldatei f&uuml;r den Imaging-Prozess</td></tr>' +
				'<tr><td><span class="s-inline">hofs=</span></td><td>Hash in separate Datei schreiben</td></tr>' +
				'<tr><td><span class="s-inline">cnt=</span></td><td>Anzahl Sektoren/Bl&ouml;cke begrenzen</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Image mit dcfldd erstellen</div>' +
				'<p class="s-text"><span class="s-inline">dcfldd</span> ist eine weitere forensische dd-Variante mit Status- und Hashing-Funktionen.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">dcfldd &ndash; Image mit Hash</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>dcfldd if=/dev/sda of=/cases/case01/images/disk01.img hash=sha256 hashlog=/cases/case01/hashes/dcfldd.sha256 bs=16M</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Parameter</th><th>Erkl&auml;rung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">dcfldd</span></td><td>Department of Defense Computer Forensics Lab dd-Variante</td></tr>' +
				'<tr><td><span class="s-inline">hash=</span></td><td>Hash-Algorithmus</td></tr>' +
				'<tr><td><span class="s-inline">hashlog=</span></td><td>Datei f&uuml;r Hash-Ausgabe</td></tr>' +
				'<tr><td><span class="s-inline">split=</span></td><td>Image in Teile splitten (z.&nbsp;B. <span class="s-inline">2G</span>)</td></tr>' +
				'<tr><td><span class="s-inline">splitformat=</span></td><td>Namensformat f&uuml;r gesplittete Images</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Nur Anfangsbereich (Header) sichern</div>' +
				'<p class="s-text">Sichert einen definierten Anfangsbereich (z.&nbsp;B. Bootsektor) in eine separate Datei.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">dd &ndash; Header sichern</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>dd if=/dev/sda of=/cases/case01/images/header.img bs=16M count=10 conv=noerror,sync</code></pre></div>' +
				'<div class="s-heading">Image komprimiert erzeugen (Pipeline)</div>' +
				'<p class="s-text">Erstellt ein Image und komprimiert es w&auml;hrend der Erzeugung; <span class="s-inline">pv</span> dient der Durchsatz-/Fortschrittsanzeige.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Komprimiertes Image</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>dd if=/dev/sda bs=16M conv=noerror,sync | pv | gzip > /cases/case01/images/disk01.img.gz</code></pre></div>'; }
		},
		{
			id: 'ref-06-formats',
			title: 'Image-Formate',
			icon: '\uD83D\uDCBE',
			html: function() { return '<div class="s-heading">&Uuml;bersicht: RAW, E01, AFF</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Eigenschaft</th><th>RAW (.img)</th><th>E01 (EnCase)</th><th>AFF (Advanced Forensic)</th></tr></thead><tbody>' +
				'<tr><td>Format</td><td>1:1-Abbild ohne Metadaten</td><td>Propriet&auml;r mit Kompression</td><td>Offen, erweiterbar</td></tr>' +
				'<tr><td>Kompression</td><td>Nein</td><td>Ja (integriert)</td><td>Ja</td></tr>' +
				'<tr><td>Metadaten</td><td>Keine</td><td>Case-Info, Examiner, Timestamps</td><td>Beliebig erweiterbar</td></tr>' +
				'<tr><td>Integrit&auml;tspr&uuml;fung</td><td>Keine integrierte</td><td>Ja (integrierte Hash-Verifikation)</td><td>Ja</td></tr>' +
				'<tr><td>Segmentierung</td><td>Manuell</td><td>Automatisch bei gro&szlig;en Images</td><td>Ja</td></tr>' +
				'<tr><td>Kompatibilit&auml;t</td><td>Maximal (alle Tools)</td><td>Weit verbreitet (EnCase, Autopsy)</td><td>Sleuth Kit, AFF Tools</td></tr>' +
				'<tr><td>Tools</td><td><span class="s-inline">dd</span>, <span class="s-inline">dc3dd</span></td><td><span class="s-inline">ewfacquire</span></td><td><span class="s-inline">afflib-tools</span></td></tr>' +
				'<tr><td>Vorteil</td><td>Einfach, maximale Kompatibilit&auml;t</td><td>Kompression + Metadaten + Hash</td><td>Offen, erweiterbar</td></tr>' +
				'<tr><td>Nachteil</td><td>Keine Kompression, keine Metadaten</td><td>Propriet&auml;r</td><td>Weniger verbreitet</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">E01-Format mit ewfacquire erstellen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">ewfacquire &ndash; E01 erstellen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>ewfacquire /dev/sda -c case01 -e "Hannes Lang" -d sha256 -f raw -t /cases/case01/images/disk01</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Parameter</th><th>Erkl&auml;rung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">ewfacquire</span></td><td>Tool aus ewf-tools f&uuml;r E01-Erstellung</td></tr>' +
				'<tr><td><span class="s-inline">-c</span></td><td>Case-Nummer/Bezeichnung</td></tr>' +
				'<tr><td><span class="s-inline">-e</span></td><td>Examiner-Name</td></tr>' +
				'<tr><td><span class="s-inline">-d</span></td><td>Hash-Algorithmus (<span class="s-inline">md5</span>, <span class="s-inline">sha1</span>, <span class="s-inline">sha256</span>)</td></tr>' +
				'<tr><td><span class="s-inline">-f</span></td><td>Input-Format (<span class="s-inline">raw</span>, <span class="s-inline">files</span>)</td></tr>' +
				'<tr><td><span class="s-inline">-t</span></td><td>Ziel-Pfad (ohne .E01-Endung)</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">AFF-Format</div>' +
				'<p class="s-text">Advanced Forensic Format &ndash; offen, erweiterbar, mit Metadaten.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">AFF Installation</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>apt install afflib-tools</code></pre></div>'; }
		},
		{
			id: 'ref-07-hashing',
			title: 'Hashing &amp; Integrit&auml;t',
			icon: '#',
			html: function() { return '<div class="s-heading">SHA-256 &ndash; Prim&auml;rer Hash</div>' +
				'<p class="s-text">Berechnet einen SHA-256-Hash des Originaldatentr&auml;gers und schreibt ihn in eine Datei.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Hash des Originals</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sha256sum /dev/sda > /cases/case01/hashes/original.sha256</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Hash des Images</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sha256sum /cases/case01/images/disk01.img > /cases/case01/hashes/image.sha256</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Direkter Vergleich (beide in einem Lauf)</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sha256sum /dev/sda /cases/case01/images/disk01.img</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Hash-Verifikation</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sha256sum -c /cases/case01/hashes/image.sha256</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Parameter</th><th>Erkl&auml;rung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">-c</span></td><td>Check-Modus: liest Hash aus Datei und verifiziert</td></tr>' +
				'<tr><td><span class="s-inline">--status</span></td><td>Nur Ergebnis anzeigen (OK/FAILED)</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">MD5 &ndash; Optional (zus&auml;tzlich)</div>' +
				'<p class="s-text">MD5 kann zus&auml;tzlich berechnet werden, sollte aber nicht als prim&auml;rer Integrit&auml;tsnachweis dienen (Kollisionsrisiko).</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">MD5 des Originals</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>md5sum /dev/sda > /cases/case01/hashes/original.md5</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">MD5 des Images</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>md5sum /cases/case01/images/disk01.img > /cases/case01/hashes/image.md5</code></pre></div>' +
				'<div class="s-heading">Algorithmus-Vergleich</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Algorithmus</th><th>L&auml;nge</th><th>Kollisionsrisiko</th><th>Geschwindigkeit</th><th>Empfehlung</th></tr></thead><tbody>' +
				'<tr><td>MD5</td><td>128 Bit</td><td>Hoch (praktisch demonstriert)</td><td>Schnell</td><td>Nur zus&auml;tzlich/optional</td></tr>' +
				'<tr><td>SHA-1</td><td>160 Bit</td><td>Mittel (theoretisch gebrochen)</td><td>Moderat</td><td>Nicht empfohlen</td></tr>' +
				'<tr><td>SHA-256</td><td>256 Bit</td><td>Sehr gering</td><td>Moderat</td><td><strong>Prim&auml;r empfohlen</strong></td></tr>' +
				'<tr><td>SHA-512</td><td>512 Bit</td><td>Extrem gering</td><td>Langsamer</td><td>Optional (sehr sicher)</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Verifikations-Workflow</div>' +
				'<div class="s-callout s-callout-info"><div class="s-callout-title">Schritte zur Hash-Verifikation</div><div class="s-callout-body">' +
				'<strong>1.</strong> Hash des Originals erzeugen: <span class="s-inline">sha256sum /dev/sda > original.sha256</span><br>' +
				'<strong>2.</strong> Image erstellen<br>' +
				'<strong>3.</strong> Hash des Images erzeugen: <span class="s-inline">sha256sum disk01.img > image.sha256</span><br>' +
				'<strong>4.</strong> Hashes vergleichen (m&uuml;ssen identisch sein)<br>' +
				'<strong>5.</strong> Verifikation mit <span class="s-inline">sha256sum -c image.sha256</span><br>' +
				'<strong>6.</strong> Ergebnis dokumentieren</div></div>'; }
		},
		{
			id: 'ref-08-mounting',
			title: 'Mounten (read-only)',
			icon: '\uD83D\uDCC1',
			html: function() { return '<div class="s-heading">Physische Partition read-only mounten</div>' +
				'<p class="s-text">Mountet eine Partition read-only, um Schreibzugriffe auf Beweisdatentr&auml;ger zu vermeiden.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Read-only Mount</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>mount -o ro /dev/sdb1 /cases/case01/mounts/usb01</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Parameter</th><th>Erkl&auml;rung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">mount</span></td><td>Bindet ein Dateisystem in den Verzeichnisbaum ein</td></tr>' +
				'<tr><td><span class="s-inline">-o</span></td><td>&Uuml;bergibt Mount-Optionen</td></tr>' +
				'<tr><td><span class="s-inline">ro</span></td><td>Read-only (keine Schreibzugriffe)</td></tr>' +
				'<tr><td><span class="s-inline">/dev/sdb1</span></td><td>Input (Partition/Blockdevice)</td></tr>' +
				'<tr><td><span class="s-inline">/cases/case01/mounts/usb01</span></td><td>Mountpoint (Zielverzeichnis)</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Unmounten</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Unmount</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>umount /cases/case01/mounts/usb01</code></pre></div>' +
				'<div class="s-heading">Image-Partition per Loop und Offset mounten</div>' +
				'<p class="s-text">Mountet eine Partition innerhalb einer Image-Datei read-only per Loop-Device; Offset wird in Bytes angegeben.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Loop + Offset Mount</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>mount -o ro,loop,offset=1048576 /cases/case01/images/disk01.img /cases/case01/mounts/image01</code></pre></div>' +
				'<div class="s-callout s-callout-tip"><div class="s-callout-title">Offset-Berechnung</div><div class="s-callout-body">Beispielrechnung: Startsektor <span class="s-inline">2048</span> &times; <span class="s-inline">512</span> Byte = <span class="s-inline">1048576</span> Byte</div></div>' +
				'<div class="s-heading">E01-Image mounten</div>' +
				'<p class="s-text">Mountet ein E01-Image &uuml;ber das ewf-Loopback-Device.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">E01 mounten</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>ewfmount /cases/case01/images/disk01.E01 /cases/case01/mounts/ewf\nmount -o ro,loop /cases/case01/mounts/ewf/ewf1 /cases/case01/mounts/image01</code></pre></div>' +
				'<div class="s-heading">Loop-Devices verwalten</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Loop-Devices anzeigen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>losetup -a</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Loop-Device entfernen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>losetup -d /dev/loopX</code></pre></div>'; }
		},
		{
			id: 'ref-09-hex',
			title: 'Hex- &amp; Bin&auml;ranalyse',
			icon: '\uD83D\uDD2C',
			html: function() { return '<div class="s-heading">Erste 512 Bytes dumpen (MBR/Bootsektor)</div>' +
				'<p class="s-text">Erstellt einen Hexdump der ersten 512 Bytes (z.&nbsp;B. MBR/Bootsektor).</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">xxd &ndash; 512 Bytes dumpen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>xxd -l 512 /cases/case01/images/disk01.img > /cases/case01/notes/disk01_first512.hex</code></pre></div>' +
				'<div class="s-heading">Erste 4 KiB dumpen (16 Bytes pro Zeile)</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">xxd &ndash; 4 KiB dumpen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>xxd -l 4096 -c 16 /cases/case01/images/disk01.img > /cases/case01/notes/disk01_first4k.hex</code></pre></div>' +
				'<div class="s-heading">xxd &ndash; Parameter&uuml;bersicht</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Parameter</th><th>Erkl&auml;rung</th><th>Beispiel</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">-l</span></td><td>Anzahl Bytes, die gelesen werden</td><td><span class="s-inline">-l 512</span></td></tr>' +
				'<tr><td><span class="s-inline">-c</span></td><td>Bytes pro Zeile</td><td><span class="s-inline">-c 16</span></td></tr>' +
				'<tr><td><span class="s-inline">-s</span></td><td>Start-Offset (Seek)</td><td><span class="s-inline">-s 0x1FE</span></td></tr>' +
				'<tr><td><span class="s-inline">-g</span></td><td>Bytes pro Gruppe</td><td><span class="s-inline">-g 1</span></td></tr>' +
				'<tr><td><span class="s-inline">-r</span></td><td>Reverse (Hex zur&uuml;ck in Bin&auml;r)</td><td><span class="s-inline">xxd -r</span></td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">MBR-Signatur pr&uuml;fen</div>' +
				'<p class="s-text">Ein g&uuml;ltiger MBR endet an Offset 510-511 mit der Signatur <span class="s-inline">55 AA</span>.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">MBR-Signatur pr&uuml;fen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>xxd -s 510 -l 2 /cases/case01/images/disk01.img</code></pre></div>' +
				'<div class="s-callout s-callout-info"><div class="s-callout-title">Erwartete Ausgabe</div><div class="s-callout-body">Wenn der MBR g&uuml;ltig ist, sollte die Ausgabe <span class="s-inline">55aa</span> zeigen.<br>Beispielausgabe: <span class="s-inline">000001fe: 55aa U.</span></div></div>' +
				'<div class="s-heading">Bekannte Signaturen</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Offset</th><th>Signatur</th><th>Bedeutung</th></tr></thead><tbody>' +
				'<tr><td>0x000</td><td><span class="s-inline">FA 33</span></td><td>x86-Bootcode (Anfang MBR)</td></tr>' +
				'<tr><td>0x1FE</td><td><span class="s-inline">55 AA</span></td><td>MBR-Boot-Signatur</td></tr>' +
				'<tr><td>0x000</td><td><span class="s-inline">45 46 49 20 50 41 52 54</span></td><td>GPT-Signatur (&bdquo;EFI PART&ldquo;)</td></tr>' +
				'<tr><td>0x000</td><td><span class="s-inline">EB xx 90</span></td><td>FAT-Boot-Jump</td></tr>' +
				'<tr><td>0x003</td><td><span class="s-inline">NTFS</span></td><td>NTFS-Dateisystem</td></tr>' +
				'</tbody></table></div>'; }
		},
		{
			id: 'ref-10-compare',
			title: 'Datei- &amp; Artefaktvergleich',
			icon: '\uD83D\uDD04',
			html: function() { return '<div class="s-heading">Textbasierter Vergleich (Unified Diff)</div>' +
				'<p class="s-text">Vergleicht zwei Textdateien und zeigt Unterschiede im Unified-Format an.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">diff &ndash; Unified Format</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>diff -u file1.txt file2.txt</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Parameter</th><th>Erkl&auml;rung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">diff</span></td><td>Vergleicht Dateien zeilenweise</td></tr>' +
				'<tr><td><span class="s-inline">-u</span></td><td>Unified-Format (Kontext + &Auml;nderungen)</td></tr>' +
				'<tr><td><span class="s-inline">-r</span></td><td>Rekursiv (Verzeichnisse vergleichen)</td></tr>' +
				'<tr><td><span class="s-inline">-q</span></td><td>Nur melden ob unterschiedlich (quiet)</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Visueller Vergleich in Vim (Diff-Modus)</div>' +
				'<p class="s-text">&Ouml;ffnet zwei Dateien side-by-side im Vim-Diff-Modus.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">vim -d</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>vim -d file1.hex file2.hex</code></pre></div>' +
				'<div class="s-heading">Bin&auml;rer Vergleich</div>' +
				'<p class="s-text">Vergleicht zwei Dateien byteweise und zeigt Unterschiede als dezimalen Offset-Wert an.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">cmp &ndash; Bin&auml;rvergleich</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>cmp -l file1.bin file2.bin</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Methode</th><th>Tool</th><th>Use Case</th><th>Ausgabe</th></tr></thead><tbody>' +
				'<tr><td>Textvergleich</td><td><span class="s-inline">diff -u</span></td><td>Protokolle, Logs, Configs</td><td>Unified Diff mit Kontext</td></tr>' +
				'<tr><td>Visueller Vergleich</td><td><span class="s-inline">vim -d</span></td><td>Hex-Dumps, Code</td><td>Side-by-side in Vim</td></tr>' +
				'<tr><td>Bin&auml;rvergleich</td><td><span class="s-inline">cmp -l</span></td><td>Bin&auml;rdateien, Images</td><td>Byteweise Unterschiede</td></tr>' +
				'</tbody></table></div>'; }
		},
		{
			id: 'ref-11-strings',
			title: 'Strings &amp; Filter',
			icon: '\uD83D\uDD0E',
			html: function() { return '<div class="s-heading">Strings extrahieren und filtern</div>' +
				'<p class="s-text">Extrahiert druckbare Zeichenketten aus Bin&auml;rdaten und filtert nach relevanten Begriffen.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Strings + grep</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>strings /cases/case01/images/disk01.img | grep -i "password\\|pdf"</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Parameter</th><th>Erkl&auml;rung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">strings</span></td><td>Extrahiert druckbare Zeichenketten aus Bin&auml;rdaten</td></tr>' +
				'<tr><td><span class="s-inline">-n</span></td><td>Mindestl&auml;nge f&uuml;r Strings (Standard: 4)</td></tr>' +
				'<tr><td><span class="s-inline">-t d</span></td><td>Offset anzeigen (dezimal)</td></tr>' +
				'<tr><td><span class="s-inline">-t x</span></td><td>Offset anzeigen (hexadezimal)</td></tr>' +
				'<tr><td><span class="s-inline">-a</span></td><td>Ganze Datei scannen (nicht nur Datenabschnitte)</td></tr>' +
				'<tr><td><span class="s-inline">-e</span></td><td>Zeichenkodierung (z.&nbsp;B. <span class="s-inline">-e l</span> f&uuml;r UTF-16LE)</td></tr>' +
				'<tr><td><span class="s-inline">grep -i</span></td><td>Case-insensitive Filterung</td></tr>' +
				'<tr><td><span class="s-inline">grep -E</span></td><td>Extended Regex</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Nur Teilbereich scannen (Laufzeit reduzieren)</div>' +
				'<p class="s-text">Scannen eines Teilbereichs reduziert die Laufzeit erheblich bei gro&szlig;en Images.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Teilbereich scannen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>dd if=/cases/case01/images/disk01.img bs=1M count=10 2>/dev/null | strings | grep -i pdf</code></pre></div>' +
				'<div class="s-heading">Praxisbeispiele</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Sensible Begriffe suchen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>strings /cases/case01/images/disk01.img | grep -iE "password|confidential|geheim|intern|kunde"</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Offsets anzeigen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>strings -t d /cases/case01/images/disk01.img | grep -i "password" | head -20</code></pre></div>'; }
		},
		{
			id: 'ref-12-filesystems',
			title: 'Dateisysteme',
			icon: '\uD83D\uDCDA',
			html: function() { return '<div class="s-heading">H&auml;ufige Dateisysteme im Forensik-Alltag</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Dateisystem</th><th>Plattform</th><th>Vorteile</th><th>Nachteile/Risiken</th><th>Forensische Hinweise</th></tr></thead><tbody>' +
				'<tr><td>NTFS</td><td>Windows</td><td>ACL/Permissions, ADS, Journaling</td><td>ADS kann Artefakte &bdquo;verstecken&ldquo;</td><td>MFT/USN-Journal, $LogFile und ADS ber&uuml;cksichtigen</td></tr>' +
				'<tr><td>exFAT</td><td>Wechselmedien</td><td>Gro&szlig;e Dateien, hohe Kompatibilit&auml;t</td><td>Weniger Metadaten</td><td>Timestamp-Verhalten pr&uuml;fen</td></tr>' +
				'<tr><td>FAT32</td><td>Wechselmedien/Legacy</td><td>Maximale Kompatibilit&auml;t</td><td>4-GB-Dateigr&ouml;&szlig;enlimit</td><td>Wenig Journaling-Artefakte</td></tr>' +
				'<tr><td>ext4</td><td>Linux</td><td>Journaling, stabile Performance</td><td>Linux-spezifische Strukturen</td><td>Journal/Superblock/Extent-Struktur relevant</td></tr>' +
				'<tr><td>XFS</td><td>Linux/NAS</td><td>Skalierbar, performant</td><td>Recovery teils anspruchsvoller</td><td>Metadaten-lastig; Tooling pr&uuml;fen</td></tr>' +
				'<tr><td>Btrfs</td><td>Linux</td><td>Snapshots, Checksums</td><td>Sehr komplex</td><td>Snapshots/Subvolumes ber&uuml;cksichtigen</td></tr>' +
				'<tr><td>APFS</td><td>macOS</td><td>Snapshots, Verschl&uuml;sselung</td><td>macOS-spezifisch</td><td>Container/Volumes; Encryption pr&uuml;fen</td></tr>' +
				'<tr><td>HFS+</td><td>&auml;ltere macOS</td><td>Legacy</td><td>Veraltet</td><td>Journal/Metadaten beachten</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Partitionstabelle anlegen (GPT)</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">GPT-Label erstellen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>parted /dev/sda --script mklabel gpt</code></pre></div>' +
				'<div class="s-callout s-callout-danger"><div class="s-callout-title">Achtung</div><div class="s-callout-body">Destruktiv! Nur auf eindeutig verifiziertem Zielger&auml;t ausf&uuml;hren.</div></div>' +
				'<div class="s-heading">Partition erstellen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Partitionen erstellen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>parted /dev/sda --script mkpart primary ext4 1MiB 10%\nparted /dev/sda --script mkpart primary ext4 10% 100%</code></pre></div>' +
				'<div class="s-heading">Dateisystem erstellen (mkfs)</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Verschiedene Dateisysteme</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>mkfs.ext4 -L DATA /dev/sda1\nmkfs.ntfs -f -L DATA /dev/sda2\nmkfs.vfat -F 32 -n USB /dev/sda3\nmkfs.exfat -n USB /dev/sda4</code></pre></div>'; }
		},
		{
			id: 'ref-13-wipping',
			title: 'Datentr&auml;ger l&ouml;schen',
			icon: '\u26A0',
			html: function() { return '<div class="s-heading">HDD vollst&auml;ndig &uuml;berschreiben (Nullen)</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">HDD &ndash; Nullen schreiben</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>dd if=/dev/zero of=/dev/sda bs=16M status=progress conv=sync,noerror\nsync</code></pre></div>' +
				'<div class="s-heading">Nur Header/Anfangsbereich zerst&ouml;ren (schnell)</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Header zerst&ouml;ren</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>dd if=/dev/zero of=/dev/sda bs=512 count=2048\nsync</code></pre></div>' +
				'<div class="s-heading">SATA-SSD: Secure Erase</div>' +
				'<p class="s-text">Secure-Erase-Support pr&uuml;fen und Secure Erase ausf&uuml;hren.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">SSD &ndash; Support pr&uuml;fen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>hdparm -I /dev/sda | sed -n \'/Security/,/Transport/p\'</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">SSD &ndash; Secure Erase ausf&uuml;hren</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>hdparm --user-master u --security-set-pass SecureErase /dev/sda\nhdparm --user-master u --security-erase SecureErase /dev/sda</code></pre></div>' +
				'<div class="s-heading">NVMe: Secure Erase</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">NVMe &ndash; Secure Erase</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>nvme list\nnvme format /dev/nvme0n1 --ses=1</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Medium</th><th>Methode</th><th>Dauer</th><th>Vollst&auml;ndigkeit</th></tr></thead><tbody>' +
				'<tr><td>HDD</td><td><span class="s-inline">dd if=/dev/zero</span></td><td>Lange (Gr&ouml;&szlig;e-abh&auml;ngig)</td><td>Komplett &uuml;berschrieben</td></tr>' +
				'<tr><td>HDD (schnell)</td><td><span class="s-inline">dd count=2048</span></td><td>Sekunden</td><td>Nur Header/Partitionstabelle</td></tr>' +
				'<tr><td>SATA-SSD</td><td><span class="s-inline">hdparm --security-erase</span></td><td>Schnell</td><td>Controller-Level L&ouml;schung</td></tr>' +
				'<tr><td>NVMe</td><td><span class="s-inline">nvme format --ses=1</span></td><td>Schnell</td><td>Controller-Level L&ouml;schung</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-callout s-callout-danger"><div class="s-callout-title">ACHTUNG &ndash; IRREVERSIBEL</div><div class="s-callout-body">Alle Befehle in diesem Abschnitt sind <strong>irreversibel</strong> und zerst&ouml;ren Daten. Nur auf eindeutig verifizierten Zielger&auml;ten ausf&uuml;hren. Falsches Device = Datenverlust!</div></div>'; }
		},
		{
			id: 'ref-14-writeblocker',
			title: 'Write-Blocker',
			icon: '\uD83D\uDD12',
			html: function() { return '<div class="s-heading">Warum Write-Blocker?</div>' +
				'<p class="s-text">Hardware-Write-Blocker verhindern physisch jeden Schreibzugriff auf das Originalmedium. Dies ist f&uuml;r gerichtsfeste Beweissicherung essenziell.</p>' +
				'<div class="s-heading">G&auml;ngige Hardware-Write-Blocker</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Hersteller</th><th>Modell</th><th>Schnittstellen</th></tr></thead><tbody>' +
				'<tr><td>Tableau</td><td>T35689iu</td><td>SATA, IDE, USB, SAS</td></tr>' +
				'<tr><td>Wiebetech</td><td>USB WriteBlocker</td><td>USB</td></tr>' +
				'<tr><td>Digital Intelligence</td><td>UltraBlock</td><td>SATA, IDE, USB</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Software-Alternative (NICHT gerichtsfest)</div>' +
				'<p class="s-text">Wenn kein Hardware-Write-Blocker verf&uuml;gbar, kann Software-Schutz als &bdquo;Besser als nichts&ldquo;-Ma&szlig;nahme dienen.</p>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Software Write-Block</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>blockdev --setro /dev/sda</code></pre></div>' +
				'<div class="s-callout s-callout-warning"><div class="s-callout-title">Warnung</div><div class="s-callout-body">Software-Blocker k&ouml;nnen umgangen werden und sind <strong>kein Ersatz</strong> f&uuml;r Hardware-Write-Blocker in forensischen Untersuchungen. F&uuml;r gerichtsfeste Untersuchungen immer Hardware-Write-Blocker verwenden.</div></div>'; }
		},
		{
			id: 'ref-15-protocol',
			title: 'Protokollierung &amp; CoC',
			icon: '\uD83D\uDCDD',
			html: function() { return '<div class="s-heading">Sitzung protokollieren mit script</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">script &ndash; Sitzung aufzeichnen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>script -f /cases/case01/notes/session_$(date +%Y%m%d_%H%M%S).log</code></pre></div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Parameter</th><th>Erkl&auml;rung</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">script</span></td><td>Protokolliert Terminal-Sitzung</td></tr>' +
				'<tr><td><span class="s-inline">-f</span></td><td>Flush: schreibt sofort in Datei</td></tr>' +
				'<tr><td><span class="s-inline">-a</span></td><td>Append: an bestehende Datei anh&auml;ngen</td></tr>' +
				'</tbody></table></div>' +
				'<p class="s-text">Beenden: <span class="s-inline">exit</span> oder <span class="s-inline">Ctrl+D</span></p>' +
				'<div class="s-heading">Bash-History sichern</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">History sichern</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>history > /cases/case01/notes/history_$(date +%Y%m%d_%H%M%S).txt</code></pre></div>' +
				'<div class="s-heading">Systeminformationen dokumentieren</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Systeminfo</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>date > /cases/case01/notes/system_info.txt\nuname -a >> /cases/case01/notes/system_info.txt\nlsb_release -a >> /cases/case01/notes/system_info.txt</code></pre></div>' +
				'<div class="s-heading">Chain of Custody Template</div>' +
				'<div class="s-callout s-callout-info"><div class="s-callout-title">Vorlage f&uuml;r jeden Beweisgegenstand</div><div class="s-callout-body">' +
				'<strong>CHAIN OF CUSTODY &ndash; BEWEISKETTE</strong><br><br>' +
				'<strong>Case-ID:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case01<br>' +
				'<strong>Beweisgegenstand:</strong>&nbsp;&nbsp;&nbsp;&nbsp;USB-Stick 32GB, SanDisk Cruzer<br>' +
				'<strong>Seriennummer:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[falls vorhanden]<br>' +
				'<strong>Modell:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[aus lsblk]<br>' +
				'<strong>Device-Pfad:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/dev/sdb<br><br>' +
				'<strong>&Uuml;BERNAHME</strong><br>' +
				'<strong>Datum/Zeit:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[YYYY-MM-DD HH:MM:SS]<br>' +
				'<strong>&Uuml;bernommen von:</strong>&nbsp;&nbsp;&nbsp;&nbsp;[Name/Person]<br>' +
				'<strong>&Uuml;bergeben durch:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Name/Person]<br>' +
				'<strong>Zustand:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[intakt/besch&auml;digt/versiegelt]<br><br>' +
				'<strong>AUFBEWAHRUNG</strong><br>' +
				'<strong>Ort:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[z.B. Beweiskammer, Schrank 3]<br>' +
				'<strong>Zugriffskontrolle:</strong>&nbsp;&nbsp;&nbsp;&nbsp;[wer hat Zugriff]<br><br>' +
				'<strong>IMAGING</strong><br>' +
				'<strong>Datum/Zeit:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[YYYY-MM-DD HH:MM:SS]<br>' +
				'<strong>Durchgef&uuml;hrt von:</strong>&nbsp;&nbsp;&nbsp;&nbsp;[Name]<br>' +
				'<strong>Methode:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[dd/dc3dd/E01]<br>' +
				'<strong>Hash Original:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[SHA-256]<br>' +
				'<strong>Hash Image:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[SHA-256]<br>' +
				'<strong>Verifiziert:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[JA/NEIN &ndash; Datum]<br><br>' +
				'<strong>WEITERGABE</strong><br>' +
				'<strong>Datum/Zeit:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[YYYY-MM-DD HH:MM:SS]<br>' +
				'<strong>&Uuml;bergeben an:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Name/Person]<br>' +
				'<strong>Grund:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Analyse/Archivierung/etc.]<br>' +
				'<strong>Unterschrift &Uuml;bergabe:</strong> _______________<br>' +
				'<strong>Unterschrift Empfang:</strong>&nbsp;&nbsp;_______________</div></div>' +
				'<div class="s-heading">Rechtliche Hinweise (&Ouml;sterreich)</div>' +
				'<div class="s-callout s-callout-warning"><div class="s-callout-title">Forensische Untersuchungen in &Ouml;sterreich</div><div class="s-callout-body">Forensische Untersuchungen m&uuml;ssen nachvollziehbar und dokumentiert sein, damit Ergebnisse vor Gericht Bestand haben (StPO &sect; 134, DSGVO). Die Beweiskette (Chain of Custody) muss l&uuml;ckenlos gef&uuml;hrt werden.</div></div>'; }
		},
		{
			id: 'ref-16-bestpractices',
			title: 'Best Practices',
			icon: '\u2B50',
			html: function() { return '<div class="s-heading">7 Goldene Regeln</div>' +
				'<div class="s-callout s-callout-tip"><div class="s-callout-title">Merks&auml;tze</div><div class="s-callout-body">' +
				'<strong>1.</strong> Niemals am Original arbeiten &ndash; immer Image erstellen und daran analysieren<br>' +
				'<strong>2.</strong> SHA-256 als prim&auml;rer Hash; MD5 optional<br>' +
				'<strong>3.</strong> Hash vom Original und vom Image vergleichen und dokumentieren<br>' +
				'<strong>4.</strong> Read-only Mounts verwenden<br>' +
				'<strong>5.</strong> Hardware-Write-Blocker nutzen wenn verf&uuml;gbar<br>' +
				'<strong>6.</strong> <span class="s-inline">bs</span> bewusst w&auml;hlen und dokumentieren<br>' +
				'<strong>7.</strong> Vollst&auml;ndige Protokollierung aller Befehle</div></div>' +
				'<div class="s-heading">Typische Fehler</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Fehler</th><th>Konsequenz</th><th>L&ouml;sung</th></tr></thead><tbody>' +
				'<tr><td>Falsches Device (<span class="s-inline">/dev/sda</span> vs <span class="s-inline">/dev/sdb</span>)</td><td>Datenverlust am falschen Ger&auml;t</td><td>Immer mit <span class="s-inline">lsblk</span> verifizieren</td></tr>' +
				'<tr><td>Mountpoints &uuml;bersehen</td><td>Modifikation des Originals</td><td>Vor Imaging unmounten</td></tr>' +
				'<tr><td>Unvollst&auml;ndige Dokumentation</td><td>Nicht gerichtsfest</td><td><span class="s-inline">script</span>-Befehl nutzen</td></tr>' +
				'<tr><td>Kein Hash-Vergleich</td><td>Kein Integrit&auml;tsnachweis</td><td>Immer Hash Original vs Image</td></tr>' +
				'<tr><td>Software- statt Hardware-Write-Blocker</td><td>Potenziell angreifbar</td><td>Hardware-Blocker bevorzugen</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Fehlervermeidung-Checkliste</div>' +
				'<div class="s-callout s-callout-warning"><div class="s-callout-title">Vor jedem Imaging</div><div class="s-callock-body">' +
				'<strong>&#9744;</strong> Device mit <span class="s-inline">lsblk</span> verifiziert?<br>' +
				'<strong>&#9744;</strong> Keine Mountpoints auf dem Original?<br>' +
				'<strong>&#9744;</strong> Protokollierung mit <span class="s-inline">script</span> gestartet?<br>' +
				'<strong>&#9744;</strong> Write-Blocker aktiv?<br>' +
				'<strong>&#9744;</strong> Zielpfad existiert und hat genug Speicherplatz?</div></div>'; }
		},
		{
			id: 'ref-17-casestudy',
			title: 'Case-Studie',
			icon: '\uD83D\uDCCB',
			html: function() { return '<div class="s-heading">Szenario</div>' +
				'<p class="s-text"><strong>Auftrag:</strong> Forensische Untersuchung eines USB-Sticks (32GB, SanDisk), der einem Mitarbeiter einer Firma geh&ouml;rt. Verdacht auf Datenexfiltration.</p>' +
				'<p class="s-text"><strong>Ziel:</strong> Forensisch sauberes Image erstellen, analysieren und dokumentieren.</p>' +
				'<p class="s-text"><strong>System:</strong> Kali Linux 2024.x</p>' +
				'<div class="s-heading">12-Schritte-&Uuml;bersicht</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Schritt</th><th>Befehl/Aktion</th><th>Ergebnis</th></tr></thead><tbody>' +
				'<tr><td><strong>1</strong></td><td><span class="s-inline">mkdir</span>, <span class="s-inline">script</span></td><td>Case-Struktur, Protokollierung aktiv</td></tr>' +
				'<tr><td><strong>2</strong></td><td><span class="s-inline">lsblk</span>, <span class="s-inline">fdisk</span>, <span class="s-inline">parted</span></td><td>Device als <span class="s-inline">/dev/sdb</span> identifiziert</td></tr>' +
				'<tr><td><strong>3</strong></td><td><span class="s-inline">umount</span></td><td>Keine Mountpoints auf Original</td></tr>' +
				'<tr><td><strong>4</strong></td><td><span class="s-inline">sha256sum /dev/sdb</span></td><td>Original-Hash dokumentiert</td></tr>' +
				'<tr><td><strong>5</strong></td><td><span class="s-inline">dc3dd</span></td><td>Image erstellt mit integriertem Hash</td></tr>' +
				'<tr><td><strong>6</strong></td><td><span class="s-inline">sha256sum image</span></td><td>Image-Hash dokumentiert</td></tr>' +
				'<tr><td><strong>7</strong></td><td><span class="s-inline">sha256sum -c</span></td><td>Hashes stimmen &uuml;berein</td></tr>' +
				'<tr><td><strong>8</strong></td><td><span class="s-inline">mount -o ro,loop,offset=</span></td><td>Image read-only gemountet</td></tr>' +
				'<tr><td><strong>9</strong></td><td><span class="s-inline">find</span>, <span class="s-inline">fls</span>, <span class="s-inline">strings</span></td><td>Erste Analyse durchgef&uuml;hrt</td></tr>' +
				'<tr><td><strong>10</strong></td><td><span class="s-inline">xxd</span></td><td>MBR gesichert</td></tr>' +
				'<tr><td><strong>11</strong></td><td><span class="s-inline">umount</span>, <span class="s-inline">exit</span></td><td>Cleanup durchgef&uuml;hrt</td></tr>' +
				'<tr><td><strong>12</strong></td><td>Dokumentation</td><td>Chain of Custody vollst&auml;ndig</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Schritt 1: Vorbereitung</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Case-Ordner + Protokollierung</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>mkdir -p /cases/exfil01/{images,mounts,hashes,notes,reports}\ncd /cases/exfil01\nscript -f /cases/exfil01/notes/session_$(date +%Y%m%d_%H%M%S).log</code></pre></div>' +
				'<div class="s-heading">Schritt 2: Datentr&auml;ger identifizieren</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Identifikation</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL\nfdisk -l /dev/sdb > /cases/exfil01/notes/fdisk_sdb.txt\nparted /dev/sdb print > /cases/exfil01/notes/parted_sdb.txt</code></pre></div>' +
				'<div class="s-heading">Schritt 3: Automount verhindern</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Unmounten</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>findmnt /dev/sdb1\numount /dev/sdb1\nlsblk -o NAME,MOUNTPOINT /dev/sdb</code></pre></div>' +
				'<div class="s-heading">Schritt 4: Hash des Originals</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">SHA-256 Original</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sha256sum /dev/sdb | tee /cases/exfil01/hashes/original.sha256</code></pre></div>' +
				'<div class="s-heading">Schritt 5: Image erstellen (dc3dd)</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">dc3dd Imaging</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>dc3dd if=/dev/sdb \\\n      of=/cases/exfil01/images/usb_sandisk_32gb.img \\\n      hash=sha256 \\\n      log=/cases/exfil01/images/dc3dd.log \\\n      hofs=/cases/exfil01/hashes/dc3dd_image.sha256 \\\n      bs=16M \\\n      conv=noerror,sync</code></pre></div>' +
				'<div class="s-heading">Schritt 6: Hash des Images</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">SHA-256 Image</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sha256sum /cases/exfil01/images/usb_sandisk_32gb.img | tee /cases/exfil01/hashes/image.sha256</code></pre></div>' +
				'<div class="s-heading">Schritt 7: Hashvergleich</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Verifikation</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sha256sum -c /cases/exfil01/hashes/image.sha256</code></pre></div>' +
				'<div class="s-heading">Schritt 8: Image mounten</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Offset berechnen + Mount</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>fdisk -l /cases/exfil01/images/usb_sandisk_32gb.img\nmount -o ro,loop,offset=1048576 \\\n      /cases/exfil01/images/usb_sandisk_32gb.img \\\n      /cases/exfil01/mounts/usb01</code></pre></div>' +
				'<div class="s-heading">Schritt 9: Analyse</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Dateiliste + Strings</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>find /cases/exfil01/mounts/usb01 -type f -ls > /cases/exfil01/notes/filelist_full.txt\nfind /cases/exfil01/mounts/usb01 -type f \\( -name "*.pdf" -o -name "*.doc*" \\) > /cases/exfil01/notes/suspicious_files.txt\nstrings /cases/exfil01/images/usb_sandisk_32gb.img | grep -iE "password|confidential|geheim" > /cases/exfil01/notes/strings_sensitive.txt</code></pre></div>' +
				'<div class="s-heading">Schritt 10: MBR sichern</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Hex-Dump MBR</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>xxd -l 512 /cases/exfil01/images/usb_sandisk_32gb.img > /cases/exfil01/notes/mbr.hex</code></pre></div>' +
				'<div class="s-heading">Schritt 11: Cleanup</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Unmount + Protokoll beenden</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>umount /cases/exfil01/mounts/usb01\nexit\nhistory > /cases/exfil01/notes/bash_history.txt</code></pre></div>'; }
		},
		{
			id: 'ref-18-cheatsheet',
			title: 'Befehls-Cheatsheet',
			icon: '\uD83D\uDCD6',
			html: function() { return '<div class="s-heading">Identifikation</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Identifikation</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL\nfdisk -l /dev/sda\nparted /dev/sda print</code></pre></div>' +
				'<div class="s-heading">Imaging</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">dd &ndash; Standard</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>dd if=/dev/sda of=disk.img bs=16M conv=noerror,sync status=progress</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">dc3dd &ndash; mit Hash</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>dc3dd if=/dev/sda of=disk.img hash=sha256 log=imaging.log</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">E01-Format</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>ewfacquire /dev/sda -c case01 -e "Examiner" -d sha256 -t disk01</code></pre></div>' +
				'<div class="s-heading">Hashing</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">SHA-256</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sha256sum /dev/sda > original.sha256\nsha256sum disk.img > image.sha256\nsha256sum -c image.sha256</code></pre></div>' +
				'<div class="s-heading">Mount / Unmount</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Mount-Befehle</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>mount -o ro /dev/sdb1 /mnt/usb\nmount -o ro,loop,offset=1048576 disk.img /mnt/image\numount /mnt/usb</code></pre></div>' +
				'<div class="s-heading">Analyse</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Analyse-Befehle</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>xxd -l 512 disk.img > mbr.hex\nstrings disk.img | grep -i "password"\nfls -r disk.img > filelist.txt</code></pre></div>' +
				'<div class="s-heading">Wipe (DESTRUKTIV)</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Wipe-Befehle</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>dd if=/dev/zero of=/dev/sda bs=16M conv=sync,noerror\nhdparm --user-master u --security-erase PASS /dev/sda\nnvme format /dev/nvme0n1 --ses=1</code></pre></div>' +
				'<div class="s-heading">Protokollierung</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Protokoll-Befehle</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>script -f session.log\nhistory > history.txt</code></pre></div>' +
				'<div class="s-heading">Vergleich</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Vergleich-Befehle</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>diff -u file1.txt file2.txt\nvim -d file1.hex file2.hex\ncmp -l file1.bin file2.bin</code></pre></div>' +
				'<div class="s-heading">Sleuth Kit</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Sleuth Kit Befehle</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>mmls disk.img\nfls -r disk.img > filelist.txt\nicat -o 2048 disk.img 12345 > extracted_file</code></pre></div>'; }
		},
		{
			id: 'ref-19-sources',
			title: 'Quellen &amp; Standards',
			icon: '\uD83C\uDFDB',
			html: function() { return '<div class="s-heading">Internationale Standards</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Standard</th><th>Beschreibung</th></tr></thead><tbody>' +
				'<tr><td><strong>NIST SP 800-86</strong></td><td>Guide to Integrating Forensic Techniques into Incident Response</td></tr>' +
				'<tr><td><strong>NIST SP 800-101</strong></td><td>Guidelines on Mobile Device Forensics</td></tr>' +
				'<tr><td><strong>ISO/IEC 27037</strong></td><td>Guidelines for identification, collection, acquisition and preservation of digital evidence</td></tr>' +
				'<tr><td><strong>ISO/IEC 17025</strong></td><td>General requirements for the competence of testing and calibration laboratories</td></tr>' +
				'<tr><td><strong>ACPO Guidelines</strong></td><td>Association of Chief Police Officers Digital Evidence Guidelines (UK)</td></tr>' +
				'<tr><td><strong>BSI-Leitfaden</strong></td><td>Bundesamt f&uuml;r Sicherheit in der Informationstechnik &ndash; IT-Forensik</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">&Ouml;sterreichische Rechtsgrundlagen</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Gesetz/Verordnung</th><th>Relevanz</th></tr></thead><tbody>' +
				'<tr><td><strong>StPO &sect; 134</strong></td><td>Beschlagnahme von Beweismitteln</td></tr>' +
				'<tr><td><strong>StPO &sect; 177</strong></td><td>Durchsuchung</td></tr>' +
				'<tr><td><strong>DSGVO</strong></td><td>Datenschutz bei Verarbeitung personenbezogener Daten</td></tr>' +
				'<tr><td><strong>DSG</strong></td><td>Datenschutzgesetz &Ouml;sterreich</td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-callout s-callout-warning"><div class="s-callout-title">Wichtig</div><div class="s-callout-body">In &Ouml;sterreich m&uuml;ssen forensische Untersuchungen dokumentiert sein, damit die Ergebnisse vor Gericht verwertbar sind. Die Beweiskette (Chain of Custody) muss l&uuml;ckenlos nachvollziehbar sein.</div></div>' +
				'<div class="s-heading">Tool-Dokumentationen</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Tool</th><th>Dokumentation</th></tr></thead><tbody>' +
				'<tr><td><strong>dd</strong></td><td><span class="s-inline">man dd</span></td></tr>' +
				'<tr><td><strong>dc3dd</strong></td><td>https://sourceforge.net/projects/dc3dd/</td></tr>' +
				'<tr><td><strong>dcfldd</strong></td><td>https://github.com/adulau/dcfldd</td></tr>' +
				'<tr><td><strong>ewf-tools / libewf</strong></td><td>https://github.com/libyal/libewf</td></tr>' +
				'<tr><td><strong>The Sleuth Kit</strong></td><td>https://www.sleuthkit.org/sleuthkit/</td></tr>' +
				'<tr><td><strong>guymager</strong></td><td>https://guymager.sourceforge.io/</td></tr>' +
				'<tr><td><strong>hdparm</strong></td><td><span class="s-inline">man hdparm</span></td></tr>' +
				'<tr><td><strong>nvme-cli</strong></td><td>https://github.com/linux-nvme/nvme-cli</td></tr>' +
				'<tr><td><strong>xxd</strong></td><td><span class="s-inline">man xxd</span></td></tr>' +
				'</tbody></table></div>' +
				'<div class="s-heading">Weiterf&uuml;hrende Ressourcen</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Ressource</th><th>Beschreibung</th></tr></thead><tbody>' +
				'<tr><td>SANS Digital Forensics</td><td>Blog, Poster, Cheatsheets</td></tr>' +
				'<tr><td>Forensic Focus</td><td>Forum und Artikel</td></tr>' +
				'<tr><td>Volatility Foundation</td><td>Memory Forensics</td></tr>' +
				'<tr><td>Autopsy</td><td>Open Source Digital Forensics</td></tr>' +
				'</tbody></table></div>'; }
		},
		{
			id: 'ref-20-tools',
			title: 'Tool-Installation',
			icon: '\uD83D\uDEE0',
			html: function() { return '<div class="s-heading">Debian/Ubuntu/Kali &ndash; Komplett-Installation</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">System aktualisieren</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sudo apt update &amp;&amp; sudo apt upgrade -y</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Core-Tools</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sudo apt install -y coreutils util-linux parted fdisk</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Imaging-Tools</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sudo apt install -y dc3dd\nsudo apt install -y dcfldd\nsudo apt install -y ewf-tools\nsudo apt install -y guymager</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Analyse-Tools</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sudo apt install -y sleuthkit\nsudo apt install -y xxd\nsudo apt install -y binutils</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">SSD/NVMe-Tools</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sudo apt install -y hdparm\nsudo apt install -y nvme-cli</code></pre></div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Zusatztools</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>sudo apt install -y pv\nsudo apt install -y autopsy</code></pre></div>' +
				'<div class="s-heading">Installation pr&uuml;fen</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Alle Tools pr&uuml;fen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>which dd dc3dd dcfldd ewfacquire fls xxd strings hdparm nvme</code></pre></div>' +
				'<div class="s-heading">Versionen dokumentieren</div>' +
				'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Versionen erfassen</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>echo "=== TOOL VERSIONS ===" > /cases/case01/notes/versions.txt\ndc3dd --version >> /cases/case01/notes/versions.txt 2>&amp;1\newfacquire --version >> /cases/case01/notes/versions.txt 2>&amp;1\nfls -V >> /cases/case01/notes/versions.txt 2>&amp;1\nnvme version >> /cases/case01/notes/versions.txt 2>&amp;1</code></pre></div>' +
				'<div class="s-heading">Tool-&Uuml;bersicht</div>' +
				'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Tool</th><th>Paket</th><th>Zweck</th></tr></thead><tbody>' +
				'<tr><td><span class="s-inline">dd</span></td><td>coreutils</td><td>Sektorbasiertes Imaging</td></tr>' +
				'<tr><td><span class="s-inline">dc3dd</span></td><td>dc3dd</td><td>Forensisches Imaging mit Hashing</td></tr>' +
				'<tr><td><span class="s-inline">dcfldd</span></td><td>dcfldd</td><td>Forensisches Imaging Alternative</td></tr>' +
				'<tr><td><span class="s-inline">ewfacquire</span></td><td>ewf-tools</td><td>E01-Format Erstellung</td></tr>' +
				'<tr><td><span class="s-inline">guymager</span></td><td>guymager</td><td>GUI-basiertes Imaging</td></tr>' +
				'<tr><td><span class="s-inline">fls / mmls</span></td><td>sleuthkit</td><td>Dateisystem-Analyse</td></tr>' +
				'<tr><td><span class="s-inline">xxd</span></td><td>xxd / vim-common</td><td>Hex-Dump</td></tr>' +
				'<tr><td><span class="s-inline">strings</span></td><td>binutils</td><td>Strings extrahieren</td></tr>' +
				'<tr><td><span class="s-inline">hdparm</span></td><td>hdparm</td><td>SSD Secure Erase</td></tr>' +
				'<tr><td><span class="s-inline">nvme</span></td><td>nvme-cli</td><td>NVMe Secure Erase</td></tr>' +
				'<tr><td><span class="s-inline">pv</span></td><td>pv</td><td>Durchsatz-/Fortschrittsanzeige</td></tr>' +
				'<tr><td><span class="s-inline">autopsy</span></td><td>autopsy</td><td>GUI-basierte Forensik-Analyse</td></tr>' +
				'</tbody></table></div>'; }
		}
	]
};
