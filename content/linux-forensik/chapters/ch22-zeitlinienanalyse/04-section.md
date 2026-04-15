<h2 class="section-title"><span class="number">22.4</span> Sleuth Kit Timeline (mactime)</h2><p>F&uuml;r einfachere F&auml;lle reicht oft die Sleuth Kit Timeline.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Bodyfile erstellen (alle MAC-Times)
fls -r -m "/" image.dd > /cases/case01/body.txt

# Timeline generieren (CSV)
mactime -b /cases/case01/body.txt -d &gt; /cases/case01/mactime.csv

# Nur bestimmter Zeitraum
mactime -b /cases/case01/body.txt -d \
  -t "2024-03-15..2024-03-16" &gt; /cases/case01/mactime_range.csv

# Timeline analysieren
awk -F, '$1 >= 1710460800 && $1 <= 1710547200' /cases/case01/mactime.csv

# H&auml;ufigste Zeitstempel finden
awk -F, '{print $1}' /cases/case01/mactime.csv | sort | uniq -c | sort -rn | head -20</code></pre></div>
