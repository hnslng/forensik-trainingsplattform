/* Referenz-Sidebar: Windows-Forensik-Lab (PowerShell/CMD wie im Simulator; Pfade anpassen) */
var ReferenceWindows = {
	sections: [
		{
			id: 'ref-w01-workflow',
			title: 'Ablauf & Case-Struktur',
			icon: '\u2699',
			html: function() {
				return '<div class="s-heading">Typischer Ablauf (Windows)</div>' +
					'<p class="s-text">Ger&auml;t und Volumes identifizieren, Hash/Integrit&auml;t, Image oder Live-Analyse, Dokumentation. Befehle im &Uuml;bungsterminal sind <strong>kleingeschrieben</strong> (z.&nbsp;B. <span class="s-inline">get-disk</span>) wie im Simulator.</p>' +
					'<div class="s-callout s-callout-info"><div class="s-callout-title">Schritte</div><div class="s-callout-body">' +
					'<strong>1.</strong> Datentr&auml;ger mit <span class="s-inline">get-disk</span> / <span class="s-inline">get-physicaldisk</span><br>' +
					'<strong>2.</strong> Partitionen mit <span class="s-inline">get-partition</span><br>' +
					'<strong>3.</strong> Hashes mit <span class="s-inline">get-filehash</span> oder <span class="s-inline">certutil</span><br>' +
					'<strong>4.</strong> Imaging z.&nbsp;B. <span class="s-inline">ftkimager.exe</span> / <span class="s-inline">dd.exe</span><br>' +
					'<strong>5.</strong> Analyse: <span class="s-inline">format-hex</span>, <span class="s-inline">strings.exe</span>, <span class="s-inline">findstr</span><br>' +
					'<strong>6.</strong> Sitzung protokollieren: <span class="s-inline">start-transcript</span> / <span class="s-inline">stop-transcript</span></div></div>' +
					'<div class="s-heading">Case-Ordner anlegen</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator (mkdir)</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>mkdir -p /cases/case01/images /cases/case01/notes /cases/case01/hashes</code></pre></div>';
			}
		},
		{
			id: 'ref-w02-disk',
			title: 'Datentr&auml;ger (Get-Disk)',
			icon: '\uD83D\uDD0D',
			html: function() {
				return '<div class="s-heading">Alle Datentr&auml;ger</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>get-disk</code></pre></div>' +
					'<div class="s-heading">Physische Laufwerke</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>get-physicaldisk</code></pre></div>' +
					'<div class="s-table-wrap"><table class="s-table"><thead><tr><th>Cmdlet</th><th>Zweck</th></tr></thead><tbody>' +
					'<tr><td><span class="s-inline">get-disk</span></td><td>Modell, Gr&ouml;&szlig;e, BusType, Gesundheit</td></tr>' +
					'<tr><td><span class="s-inline">get-physicaldisk</span></td><td>physische Platten/SSD/NVMe</td></tr>' +
					'</tbody></table></div>';
			}
		},
		{
			id: 'ref-w03-partition',
			title: 'Partitionen & Volumes',
			icon: '\uD83D\uDCCB',
			html: function() {
				return '<div class="s-heading">Partitionen</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>get-partition</code></pre></div>' +
					'<div class="s-heading">Volumes</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>get-volume</code></pre></div>';
			}
		},
		{
			id: 'ref-w04-hash',
			title: 'Hashes & Integrit&auml;t',
			icon: '\uD83D\uDD11',
			html: function() {
				return '<div class="s-heading">Get-FileHash (SHA-256)</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>get-filehash -Algorithm SHA256 /cases/case01/images/disk01.img</code></pre></div>' +
					'<div class="s-heading">certutil (CMD)</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>certutil -hashfile /cases/case01/images/disk01.img SHA256</code></pre></div>';
			}
		},
		{
			id: 'ref-w05-imaging',
			title: 'Imaging',
			icon: '\uD83D\uDCBE',
			html: function() {
				return 					'<div class="s-heading">FTK Imager (CLI)</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>ftkimager.exe\nftkimager.exe --verify</code></pre></div>' +
					'<div class="s-heading">dd (Windows-Port)</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>dd.exe if=\\\\.\\PhysicalDrive1 of=C:\\Cases\\case01\\images\\disk01.img bs=4M status=progress</code></pre></div>';
			}
		},
		{
			id: 'ref-w06-hex-strings',
			title: 'Hex & Strings',
			icon: '\uD83D\uDD0D',
			html: function() {
				return '<div class="s-heading">Format-Hex</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>format-hex -Path /cases/case01/images/disk01.img -Count 512</code></pre></div>' +
					'<div class="s-heading">strings.exe</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>strings.exe -n 8 /cases/case01/images/disk01.img | findstr /i password</code></pre></div>' +
					'<div class="s-heading">findstr</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">CMD</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>findstr /i /n "CONFIDENTIAL" C:\\Cases\\case01\\notes\\log.txt</code></pre></div>';
			}
		},
		{
			id: 'ref-w07-compare',
			title: 'Vergleich & Export',
			icon: '\u2696',
			html: function() {
				return '<div class="s-heading">compare-object</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>compare-object (cat /cases/case01/hashes/a.txt) (cat /cases/case01/hashes/b.txt)</code></pre></div>' +
					'<div class="s-heading">Export CSV</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>get-childitem /cases/case01/images | export-csv C:\\Cases\\case01\\notes\\files.csv -NoTypeInformation</code></pre></div>' +
					'<div class="s-heading">Transcript</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>start-transcript C:\\Cases\\case01\\notes\\session.log\n# ... Arbeit ...\nstop-transcript</code></pre></div>';
			}
		},
		{
			id: 'ref-w08-aim-diskpart',
			title: 'AIM CLI & diskpart',
			icon: '\uD83D\uDD27',
			html: function() {
				return '<div class="s-heading">AIM CLI (Mount)</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>aim_cli.exe --mount --readonly C:\\Cases\\case01\\images\\disk01.E01</code></pre></div>' +
					'<div class="s-heading">diskpart (Auszug)</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>diskpart\nlist disk\nlist volume\nexit</code></pre></div>';
			}
		},
		{
			id: 'ref-w09-hilfe',
			title: 'Hilfe & Navigation',
			icon: '\u2753',
			html: function() {
				return '<div class="s-heading">Befehle im Simulator</div>' +
					'<p class="s-text">Im &Uuml;bungsterminal <span class="s-inline">help</span> eingeben &mdash; dort sind nur die implementierten Cmdlets aufgelistet.</p>' +
					'<div class="s-heading">Get-Command</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>get-command get-*</code></pre></div>' +
					'<div class="s-heading">History</div>' +
					'<div class="s-code"><div class="s-code-header"><span class="s-code-label">Simulator</span><button class="s-copy" onclick="App.handleCopy(this)">Kopieren</button></div><pre><code>get-history | select-object -last 20</code></pre></div>';
			}
		}
	]
};
