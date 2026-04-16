<h2 class="section-title"><span class="number">10.12</span> &Uuml;bung: SSH-Key-Pair erstellen</h2><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># SSH-Key erstellen (RSA 4096 Bit)
ssh-keygen -t rsa -b 4096 -C "deine@email.de"

# Moderner: Ed25519 (empfohlen)
ssh-keygen -t ed25519 -C "deine@email.de"

# Public Key anzeigen (f&uuml;r Server)
cat ~/.ssh/id_ed25519.pub</code></pre></div><p><strong>Erwartete Ausgabe im Terminal:</strong></p><div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... deine@email.de</code></pre></div><div class="callout callout-tip"><div class="callout-header">&#128161; SSH-Keys</div><p>SSH-Keys nutzen asymmetrische Verschl&uuml;sselung. Der Public Key kommt auf den Server, der Private Key bleibt bei dir. So kannst du dich ohne Passwort anmelden &ndash; sicherer als jedes Passwort.</p></div>