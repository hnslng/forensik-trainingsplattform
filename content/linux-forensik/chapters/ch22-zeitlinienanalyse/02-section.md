<h2 class="section-title"><span class="number">22.2</span> Log2Timeline / Plaso</h2><p>Plaso (Python) ist das Standard-Tool f&uuml;r die Erstellung von Super-Timelines. Es aggregiert Zeitstempel aus dutzenden Quellen.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation
pip3 install plaso

# Timeline aus Image erstellen
log2timeline.py --storage-file /cases/case01/timeline.plaso image.dd

# Timeline aus mehreren Quellen
log2timeline.py --storage-file /cases/case01/timeline.plaso \
  --source /cases/case01/logs/auth.log \
  --source /cases/case01/logs/syslog \
  --source image.dd

# Timeline als CSV exportieren
psort.py -o L2tcsv /cases/case01/timeline.plaso -w /cases/case01/timeline.csv

# Nur bestimmter Zeitraum
psort.py -o L2tcsv /cases/case01/timeline.plaso \
  --slice "2024-03-15 08:00:00" \
  --slice_size 3600 \
  -w /cases/case01/timeline_0800.csv

# Nur Datei-Events
psort.py -o L2tcsv /cases/case01/timeline.plaso \
  "parser is 'filestat'" \
  -w /cases/case01/timeline_files.csv</code></pre></div>
