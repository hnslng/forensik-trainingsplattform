<h2 class="section-title"><span class="number">10.13</span> &Uuml;bung: GPG-Key erstellen (E-Mail-Verschl&uuml;sselung)</h2><p>GPG (GNU Privacy Guard) nutzt asymmetrische Verschl&uuml;sselung f&uuml;r E-Mails und Dateien. Gleiches Prinzip wie SSH, aber f&uuml;r andere Zwecke:</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># GPG-Key erstellen (interaktiv)
gpg --full-generate-key

# Eigene Keys auflisten
gpg --list-keys

# Datei verschl&uuml;sseln
gpg --encrypt --recipient alice@example.com geheim.txt

# Datei entschl&uuml;sseln
gpg --decrypt geheim.txt.gpg</code></pre></div><div class="callout callout-success"><div class="callout-header">&#10003; Geschafft!</div><p>Du hast die &Uuml;bungen dieses Kapitels abgeschlossen.</p></div><button class="complete-section-btn" data-chapter="ch10-verschluesselung">&#9744; Kapitel als abgeschlossen markieren</button><div class="nav-buttons"><button class="nav-btn" data-target="ch09-http">&#8592; HTTP</button><button class="nav-btn" data-target="ch11-icmp">ICMP &#8594;</button></div>