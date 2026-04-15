---
icon: '&#128270;'
id: ch13-vergleich
section: Vertiefung
title: Vergleich
---

<h1 class="chapter-title">Vergleich</h1><div class="chapter-subtitle">diff, cmp, hexdiff - Unterschiede zwischen Dateien finden</div><div class="callout callout-context"><div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div><p>Vergleichswerkzeuge sind essenziell, um Manipulationen, Versionen und Unterschiede zwischen Dateien nachzuweisen. Ein einziger ge&auml;nderter Byte kann eine Datei komplett ver&auml;ndern. Vergleichswerkzeuge helfen, diese Ver&auml;nderungen zu finden und zu dokumentieren.</p></div>

<p class="chapter-intro">In der Forensik musst du regelmäßig vergleichen: Hash-Werte, Dateiinhalte, Binärdaten. Diese Techniken sind essenziell für die Beweisintegrität.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du kannst Hash-Vergleiche und Binärvergleiche durchführen und verstehst wie du die Integrität von Beweismitteln verifizierst.</p></div>

<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">#128273;</div><div class="feature-text"><h3>Hash-Vergleich</h3><p>SHA-256 Abgleich</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128270;</div><div class="feature-text"><h3>Binärvergleich</h3><p>cmp und diff nutzen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128196;</div><div class="feature-text"><h3>Dateivergleich</h3><p>Inhalte abgleichen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#9989;</div><div class="feature-text"><h3>Integrität</h3><p>Beweiskette sichern</p></div></div></div>
<h2 class="section-title"><span class="number">11.1</span> diff - Textvergleich</h2><p>Der Standard-Tool f&uuml;r Textdateivergleich. Zeigt Zeilenweise Unterschiede an.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Einfacher Diff
diff file1.txt file2.txt

# Unified Diff (besser lesbar)
diff -u file1.txt file2.txt

# Kontext-Zeilen anzeigen
diff -u -C 3 file1.txt file2.txt

# Nur Zeilen nummern, die sich unterscheiden
diff -u | grep "@@"</code></pre></div><div class="table-container"><table><thead><tr><th>Option</th><th>Beschreibung</th></tr></thead><tbody><tr><td>-u</td><td>Unified Format (lesbarer)</td></tr><tr><td>-C N</td><td>Kontext: N Zeilen vor/nach dem Unterschied</td></tr><tr><td>-r</td><td>Rekursiv (Verzeichnisse vergleichen)</td></tr><tr><td>-q</td><td>Quiet - nur ob unterschiedlich, nicht was</td></tr><tr><td>--ignore-all-space</td><td>Whitespace ignorieren</td></tr><tr><td>--ignore-blank-lines</td><td>Leere Zeilen ignorieren</td></tr></tbody></table></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>Unified Diff zeigt <span class="inline-code">-</span> f&uuml;r gel&ouml;sche Zeilen, <span class="inline-code">+</span> f&uuml;r hinzugef&uuml;gte Zeilen. <span class="inline-code">@@ -Start,Count +Start,Count @@</span> zeigt die Zeilennummer im original und modifizierten File.</p></div><h2 class="section-title"><span class="number">11.2</span> cmp - Bin&auml;rvergleich</h2><p>Vergleicht zwei Dateien Byte-f&uuml;r-Byte. Schneller als diff, aber zeigt keinen Kontext.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Einfacher Vergleich (Exit-Code: 0=gleich, 1=unterschiedlich)
cmp file1.bin file2.bin

# Ausgabe des ersten abweichenden Bytes
cmp -l file1.bin file2.bin

# Zeilenweise Ausgabe (f&uuml;r Textdateien)
cmp -l file1.txt file2.txt | head -5

# Alle Unterschiede auf einmal
cmp -b -l file1.bin file2.bin</code></pre></div><div class="table-container"><table><thead><tr><th>Ausgabe von cmp -l</th><th>Bedeutung</th></tr></thead><tbody><tr><td>123 45 67</td><td>Zeile 123, Byte 45 unterscheidet sich (Zeichen 67)</td></tr><tr><td>EOF auf file1</td><td>file2 ist l&auml;nger</td></tr></tbody></table></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>cmp zeigt nur die Position, nicht den Kontext. Nutze <span class="inline-code">diff</span> f&uuml;r Textdateien und <span class="inline-code">hexdiff</span> f&uuml;r Bin&auml;rdateien, wenn du sehen willst, was sich ge&auml;ndert hat.</p></div><h2 class="section-title"><span class="number">11.3</span> hexdiff - Hex-Analyse</h2><p>Kombiniert aus cmp und hexdump. Zeigt Unterschiede im Hex-Format.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Mit xxd vergleichen
xxd file1.bin | head -20 > /tmp/f1.hex
xxd file2.bin | head -20 > /tmp/f2.hex
diff /tmp/f1.hex /tmp/f2.hex

# Mit vimdiff (interaktiv)
xxd file1.bin | vim - -c ":vsp %:p" -c ":normal! g/^/diff | set ft=diff" /tmp/f2.hex

# Mit vbindiff (spezielles Tool)
vbindiff file1.bin file2.bin</code></pre></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p><span class="inline-code">xxd</span> und <span class="inline-code">vimdiff</span> kombinieren f&uuml;r einen interaktiven Hex-Vergleich mit Seiten-ansicht.</p></div><h2 class="section-title"><span class="number">11.4</span> Hash-basierter Vergleich</h2><p>Vergleicht Hashes statt Inhalt. Schneller, aber zeigt nicht wo der Unterschied ist.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># SHA-256 Hashes vergleichen
sha256sum file1.txt file2.txt

# Hashes in Datei speichern
sha256sum file1.txt file2.txt > hashes.sha256

# Hashes verifizieren
sha256sum -c hashes.sha256

# Mehrere Dateien vergleichen
sha256sum *.txt | sort | uniq -D

# Exit-Code: 0=alle gleich, 1=unterschiedliche Hashes</code></pre></div><div class="table-container"><table><thead><tr><th>Scenario</th><th>Befehl</th><th>Ergebnis</th></tr></thead><tbody><tr><td>Alle Dateien identisch?</td><td>sha256sum -c hashes.sha256</td><td>Alle: OK oder ERROR f&uuml;r Unterschiede</td></tr><tr><td>Duplikate finden</td><td>sha256sum *.txt | sort | uniq -D</td><td>Zeigt Dateien mit gleichen Hash</td></tr><tr><td>Nur Unterschiede</td><td>sha256sum -c hashes.sha256 | grep ": FAILED"</td><td>Zeigt nur die nicht-identischen</td></tr></tbody></table></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Hashes zeigen nur OB etwas unterscheidet, nicht WAS. Wenn Hashes unterschiedlich sind, musst du <span class="inline-code">diff</span>, <span class="inline-code">cmp</span> oder <span class="inline-code">hexdiff</span> nutzen, um den Unterschied zu finden.</p></div><h2 class="section-title"><span class="number">11.5</span> Forensische Anwendung</h2><p>Vergleichswerkzeuge in der forensischen Praxis:</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Original vs. Image (Integrit&auml;tspr&uuml;fung)
cmp /dev/sda case01.dd

# Vorher vs. Nachher (Version)
diff -u original.txt modified.txt > change.diff

# Memory-Dump vs. String-Liste
cmp memory_dump.raw strings.txt

# Multiple Backups vergleichen
for backup in backup_*.dd; do
  sha256sum "$backup" >> backup_hashes.sha256
done
sha256sum -c backup_hashes.sha256 | grep FAILED</code></pre></div><div class="exercise-box"><div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Datei-Manipulation nachweisen</span></div><div class="exercise-body"><div class="exercise-goal"><div class="goal-label">Ziel</div><p>Nutze Vergleichswerkzeuge, um Manipulationen in Dateien nachzuweisen.</p></div><div class="exercise-steps"><ol class="numbered-list"><li>Textdatei vergleichen: <span class="inline-code">diff -u original.txt modified.txt</span></li><li>Bin&auml;rdatei vergleichen: <span class="inline-code">cmp -l original.bin modified.bin</span></li><li>Hashes vergleichen: <span class="inline-code">sha256sum original.txt modified.txt</span></li><li>Hex-Analyse: <span class="inline-code">xxd original.bin | head -20</span> und mit modifiziertem vergleichen</li><li>Wann nutzt du diff, wann cmp, wann Hashing?</li></ol></div><div class="toggle-container"><div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div><div class="toggle-content"><p><strong>Vergleichswerkzeuge:</strong></p><ul><li><span class="inline-code">diff</span> - Textdateien, Zeilenweise, Kontext-Anzeige</li><li><span class="inline-code">cmp</span> - Bin&auml;rdateien, Byte-f&uuml;r-Byte, schnell</li><li><span class="inline-code">sha256sum</span> - Integrit&auml;tspr&uuml;fung, schnell, kein Kontext</li><li><span class="inline-code">xxd</span> + <span class="inline-code">diff</span> - Hex-Analyse mit Kontext</li></ul></div></div></div></div><div class="callout callout-danger"><div class="callout-header">&#9888; Typische Fehler in diesem Kapitel</div><ul><li><strong>diff auf Bin&auml;rdateien:</strong> diff ist f&uuml;r Text, nutze cmp f&uuml;r Bin&auml;rdateien</li><li><strong>Kontext nicht beachtet:</strong> cmp zeigt nur Position, nicht was ge&auml;ndert wurde</li><li><strong>Hashes ohne Verifizierung:</strong> Hashes zeigen OB unterschiedlich, nicht WAS</li><li><strong>Zeilennummern ignoriert:</strong> Unified Diff zeigt @-Zeilen, die wichtig sind</li><li><strong>Whitespace nicht beachtet:</strong> Ein zus&auml;tzliches Leerzeichen &auml;ndert den Hash</li></ul></div><button class="complete-section-btn" data-chapter="ch13-vergleich">&#9744; Kapitel als abgeschlossen markieren</button><div class="nav-buttons"><button class="nav-btn" data-target="ch12-image-formate">&#8592; Image-Formate</button><button class="nav-btn" data-target="ch14-protokollierung">Protokollierung &#8594;</button></div>
