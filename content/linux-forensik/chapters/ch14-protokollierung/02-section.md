<h2 class="section-title"><span class="number">12.2</span> Chain of Custody</h2><p>Dokumentation der kompletten Beweiskette von der &Uuml;bernahme bis zur Abgabe.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># &Uuml;bernahme dokumentieren
echo "=== &Uuml;bernahme ===" >> /cases/case01/notes/chain_of_custody.log
echo "Datum: $(date +\"%Y-%m-%d %H:%M:%S\")" >> /cases/case01/notes/chain_of_custody.log
echo "Untersucher: $(whoami)" >> /cases/case01/notes/chain_of_custody.log
echo "Device: /dev/sdb" >> /cases/case01/notes/chain_of_custody.log
echo "Serial: $(hdparm -I /dev/sdb | grep Serial)" >> /cases/case01/notes/chain_of_custody.log

# Hash dokumentieren
echo "Original-Hash: $(sha256sum /dev/sdb)" >> /cases/case01/notes/chain_of_custody.log

# Imaging dokumentieren
echo "Image-Hash: $(sha256sum case01.dd)" >> /cases/case01/notes/chain_of_custody.log

# &Uuml;bergabe dokumentieren
echo "=== &Uuml;bergabe ===" >> /cases/case01/notes/chain_of_custody.log
echo "Empf&auml;nger: Max Mustermann" >> /cases/case01/notes/chain_of_custody.log
echo "Datum: $(date +\"%Y-%m-%d %H:%M:%S\")" >> /cases/case01/notes/chain_of_custody.log</code></pre></div><div class="callout callout-warning"><div class="callout-header">&#9888; Wichtig</div><p>Chain of Custody MUSS l&uuml;ckenlos sein. Jede Handlung, jede &Uuml;bergabe, jeder Transport muss dokumentiert werden. L&uuml;cke = Beweis vor Gericht nicht verwertbar.</p></div>
