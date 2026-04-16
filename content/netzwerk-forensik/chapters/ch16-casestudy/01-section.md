<h2 class="section-title"><span class="number">16.1</span> Phase 1: Ersteinsch&auml;tzung</h2><p>Bevor du &uuml;berhaupt etwas tust: <strong>Durchatmen, systematisch vorgehen.</strong> Nicht raten &ndash; messen. Erstmal ein Bild der Lage verschaffen:</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Was ist mein Netzwerk?
ip addr show
ip route show

# Ist der Gateway erreichbar?
ping -c 2 192.168.1.1

# Komme ich raus?
ping -c 2 8.8.8.8

# Funktioniert DNS?
ping -c 2 google.com</code></pre></div>