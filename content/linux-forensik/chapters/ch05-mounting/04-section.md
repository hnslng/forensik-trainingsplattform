<h2 class="section-title"><span class="number">5.4</span> &Uuml;bung: Inhalt anzeigen</h2><p>Pr&uuml;fe ob der Mount funktioniert hat, indem du dir den Inhalt ansiehst:</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ls -la /cases/case-001/mounts/part1</code></pre></div><p><strong>Erwartete Ausgabe im Terminal:</strong></p><div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>total 128
drwxr-xr-x 4 root root  16384 Jan 15 09:23 .
drwxr-xr-x 3 root root   4096 Jan 15 10:00 ..
drwxr-xr-x 2 root root   4096 Jan 15 09:23 documents
-rw-r--r-- 1 root root  45231 Jan 15 09:23 notes.txt
drwxr-xr-x 2 root root   4096 Jan 15 09:23 pictures</code></pre></div><div class="callout callout-tip"><div class="callout-header">&#128161; Was jetzt?</div><p>Das Image ist jetzt gemountet. Du kannst alle Dateien lesen, durchsuchen und analysieren &ndash; aber nicht ver&auml;ndern. Die n&auml;chsten Kapitel (Hex-Analyse, Strings) zeigen dir wie.</p></div>
