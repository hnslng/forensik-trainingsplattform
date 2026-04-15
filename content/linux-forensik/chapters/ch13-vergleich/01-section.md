<h2 class="section-title"><span class="number">11.1</span> diff - Textvergleich</h2><p>Der Standard-Tool f&uuml;r Textdateivergleich. Zeigt Zeilenweise Unterschiede an.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Einfacher Diff
diff file1.txt file2.txt

# Unified Diff (besser lesbar)
diff -u file1.txt file2.txt

# Kontext-Zeilen anzeigen
diff -u -C 3 file1.txt file2.txt

# Nur Zeilen nummern, die sich unterscheiden
diff -u | grep "@@"</code></pre></div><div class="table-container"><table><thead><tr><th>Option</th><th>Beschreibung</th></tr></thead><tbody><tr><td>-u</td><td>Unified Format (lesbarer)</td></tr><tr><td>-C N</td><td>Kontext: N Zeilen vor/nach dem Unterschied</td></tr><tr><td>-r</td><td>Rekursiv (Verzeichnisse vergleichen)</td></tr><tr><td>-q</td><td>Quiet - nur ob unterschiedlich, nicht was</td></tr><tr><td>--ignore-all-space</td><td>Whitespace ignorieren</td></tr><tr><td>--ignore-blank-lines</td><td>Leere Zeilen ignorieren</td></tr></tbody></table></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>Unified Diff zeigt <span class="inline-code">-</span> f&uuml;r gel&ouml;sche Zeilen, <span class="inline-code">+</span> f&uuml;r hinzugef&uuml;gte Zeilen. <span class="inline-code">@@ -Start,Count +Start,Count @@</span> zeigt die Zeilennummer im original und modifizierten File.</p></div>
