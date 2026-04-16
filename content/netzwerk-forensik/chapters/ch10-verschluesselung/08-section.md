<h2 class="section-title"><span class="number">10.8</span> &Uuml;bung: Zertifikat mit openssl pr&uuml;fen</h2><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Zertifikat einer Webseite anzeigen
openssl s_client -connect google.com:443 -brief

# Nur das Zertifikat speichern
echo | openssl s_client -connect google.com:443 2>/dev/null | openssl x509 -noout -text</code></pre></div><p><strong>Erwartete Ausgabe im Terminal:</strong></p><div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>CONNECTED(00000003)
Certificate chain
 0 s:CN = *.google.com
   i:C = US, O = Google Trust Services, CN = GTS CA 1C3
---
SSL-Session:
    Protocol  : TLSv1.3
    Cipher    : TLS_AES_256_GCM_SHA384</code></pre></div><div class="table-container"><table><thead><tr><th>Feld</th><th>Bedeutung</th></tr></thead><tbody><tr><td><span class="inline-code">s:CN = *.google.com</span></td><td>Subject: Das Zertifikat gilt f&uuml;r *.google.com</td></tr><tr><td><span class="inline-code">i:C = US, O = Google Trust Services</span></td><td>Issuer: Ausgestellt von Google Trust Services</td></tr><tr><td><span class="inline-code">TLSv1.3</span></td><td>Protokoll-Version &ndash; aktuellste und sicherste</td></tr><tr><td><span class="inline-code">TLS_AES_256_GCM_SHA384</span></td><td>Verschl&uuml;sselungs-Cipher</td></tr></tbody></table></div>