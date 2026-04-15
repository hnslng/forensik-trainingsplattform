<h2 class="section-title"><span class="number">12.1</span> script-Befehl</h2><p>Der Standard-Tool f&uuml;r Terminal-Protokollierung unter Linux.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Protokoll starten
script -f session_$(date +%Y%m%d_%H%M%S).log

# Mit Zeitstempel und Kompression
script -f -e "session: %H:%M -- " session_$(date +%Y%m%d_%H%M%S).log

# Automatischer Dateiname (YYYYMMDD_HHMMSS)
SCRIPT=session_$(date +%Y%m%d_%H%M%S).log; script -f "$SCRIPT"

# Protokoll beenden
exit</code></pre></div><div class="table-container"><table><thead><tr><th>Option</th><th>Beschreibung</th></tr></thead><tbody><tr><td>-f</td><td>Flush immediately (immediate Speicherung)</td></tr><tr><td>-e STRING</td><td>Prompt vor jedem Befehl ausgeben</td></tr><tr><td>-a FILE</td><td>An bestehendes File anh&auml;ngen</td></tr><tr><td>-q</td><td>Quiet mode (weniger Output)</td></tr><tr><td>-c COMMAND</td><td>Alternative Shell nutzen</td></tr></tbody></table></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>Nutze <span class="inline-code">-f</span> (flush) f&uuml;r kritische Befehle. Wenn der Systemcrasht, ist das Protokoll trotzdem bis dahin gesichert.</p></div>
