var Labs = {};

function callout(type, title, body) {
  return '<div class="callout callout-' + type + '">' +
    '<div class="callout-header">' + title + '</div>' +
    body +
    '</div>';
}

function toggle(label, content) {
  return '<div class="toggle-container">' +
    '<div class="toggle-header"><span class="toggle-label">' + label + '</span><span class="toggle-arrow">&#9654;</span></div>' +
    '<div class="toggle-content">' + content + '</div>' +
    '</div>';
}

function completeBtn(chapterId) {
  return '<button class="complete-section-btn" data-chapter="' + chapterId + '">&#9744; Kapitel als abgeschlossen markieren</button>';
}

function navButtons(prev, next) {
  var html = '<div class="nav-buttons">';
  if (prev) {
    html += '<button class="nav-btn" data-target="' + prev + '">&#8592; Zur&uuml;ck</button>';
  } else {
    html += '<div></div>';
  }
  if (next) {
    html += '<button class="nav-btn" data-target="' + next + '">Weiter &#8594;</button>';
  } else {
    html += '<div></div>';
  }
  html += '</div>';
  return html;
}

// ========== LABS & UEBUNGEN UEBERSICHT ==========
Labs['ch10-labs'] = function () {
  return '' +
    '<h1 class="chapter-title">Labs &amp; &Uuml;bungen</h1>' +
    '<div class="chapter-subtitle">5 praktische Lab-&Uuml;bungen mit realistischen Datasets</div>' +

    callout('context', '&#9432; Hinweis',
      '<p>Alle ben&ouml;tigten Dateien befinden sich im Ordner <span class="path">datasets/</span>. ' +
      'Lade die Dateien herunter und arbeite sie auf deinem Linux-System durch. ' +
      'Nutze <span class="inline-code">script</span> f&uuml;r die Protokollierung jeder &Uuml;bung.</p>') +

    '<div class="section">' +
    '<h2 class="section-title"><span class="icon">&#128300;</span> Lab 1: USB-Forensik Case</h2>' +
    '<div class="lab-card">' +
    '<div class="lab-meta">' +
    '<span><span class="difficulty-badge difficulty-hard">Hard</span></span>' +
    '<span>Datei: <span class="file">usb_case01.img</span></span>' +
    '</div>' +
    '<h3>Szenario: Datenexfiltration</h3>' +
    '<p>Ein 1MB gro&szlig;es USB-Image wurde gesichert. Es enth&auml;lt Dokumente, versteckte Dateien und eine verd&auml;chtige Bash-History. ' +
    'Finde alle sensiblen Daten und identifiziere verd&auml;chtige Aktivit&auml;ten.</p>' +
    '<a class="download-btn" href="datasets/usb_case01.img" download>&#11015; usb_case01.img herunterladen</a>' +

    '<div style="margin-top:16px">' +
    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">Aufgabe</span><span class="exercise-name">Lab 1</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Sensible Daten und verd&auml;chtige Aktivit&auml;ten in einem USB-Image identifizieren.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Offset der Partition bestimmen: <span class="inline-code">fdisk -l usb_case01.img</span></li>' +
    '<li>Image read-only mounten mit berechnetem Offset</li>' +
    '<li>Alle Dateien auflisten (auch versteckte): <span class="inline-code">ls -laR</span></li>' +
    '<li>Strings nach sensiblen Begriffen filtern: <span class="inline-code">strings</span> + <span class="inline-code">grep</span></li>' +
    '<li>Bash-History analysieren</li>' +
    '</ol></div>' +
    toggle('Hinweis anzeigen',
      '<p>Das Image hat eine Partition ab Sektor 2048 (Offset 1048576). Nutze: ' +
      '<span class="inline-code">mount -o ro,loop,offset=1048576 usb_case01.img /mnt</span></p>') +
    toggle('L&ouml;sung anzeigen',
      '<p><strong>Gefundene Artefakte:</strong></p>' +
      '<ul><li><span class="file">/documents/report_final.pdf</span> &ndash; Gesch&auml;ftsbericht</li>' +
      '<li><span class="file">/documents/kundenliste.xlsx</span> &ndash; Sensible Kundendaten</li>' +
      '<li><span class="file">/hidden/.secret.txt</span> &ndash; Versteckte Datei mit internen Notizen</li>' +
      '<li><span class="file">.bash_history</span> &ndash; Enth&auml;lt <span class="kw">scp</span>, <span class="kw">tar</span> und ungew&ouml;hnliche Befehle</li></ul>' +
      '<p><strong>Befehle f&uuml;r die Analyse:</strong></p>' +
      '<pre style="background:var(--bg-code);padding:10px;border-radius:4px;font-size:12px">strings usb_case01.img | grep -iE "scp|tar|secret|kunde|confidential"</pre>') +
    '</div></div></div>' +
    '</div></div>' +

    '<div class="section">' +
    '<h2 class="section-title"><span class="icon">&#128300;</span> Lab 2: Log-Analyse</h2>' +
    '<div class="lab-card">' +
    '<div class="lab-meta">' +
    '<span><span class="difficulty-badge difficulty-medium">Medium</span></span>' +
    '<span>Dateien: <span class="file">auth.log</span>, <span class="file">syslog</span>, <span class="file">apache_access.log</span></span>' +
    '</div>' +
    '<h3>Szenario: SSH Brute-Force Angriff</h3>' +
    '<p>Log-Dateien eines kompromittierten Servers. Analysiere die Logs, identifiziere den Angreifer ' +
    'und erkenne das Angriffsmuster.</p>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
    '<a class="download-btn" href="datasets/auth.log" download>&#11015; auth.log</a>' +
    '<a class="download-btn" href="datasets/syslog" download>&#11015; syslog</a>' +
    '<a class="download-btn" href="datasets/apache_access.log" download>&#11015; apache_access.log</a>' +
    '</div>' +

    '<div style="margin-top:16px">' +
    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">Aufgabe</span><span class="exercise-name">Lab 2</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Angreifer-IP identifizieren und Angriffsmuster erkennen.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Fehlgeschlagene SSH-Logins z&auml;hlen: <span class="inline-code">grep "Failed password" auth.log | wc -l</span></li>' +
    '<li>Angreifer-IPs extrahieren: <span class="inline-code">grep "Failed password" auth.log | awk \'{print $(NF-3)}\' | sort | uniq -c | sort -rn</span></li>' +
    '<li>Erfolgreiche Logins nach dem Angriff pr&uuml;fen</li>' +
    '<li>Apache-Logs nach verd&auml;chtigen Requests durchsuchen</li>' +
    '</ol></div>' +
    toggle('Hinweis anzeigen',
      '<p>Schaue besonders nach IP-Adressen mit sehr vielen "Failed password" Eintr&auml;gen. ' +
      'Pr&uuml;fe dann, ob von dieser IP auch ein erfolgreicher Login stattfand.</p>') +
    toggle('L&ouml;sung anzeigen',
      '<p><strong>Ergebnis:</strong></p>' +
      '<ul><li>IP <span class="kw">192.168.100.42</span> hat &uuml;ber 500 failed SSH-Versuche</li>' +
      '<li>IP <span class="kw">10.0.0.99</span> hat weitere 200 Versuche</li>' +
      '<li>Ein erfolgreicher Login von <span class="kw">192.168.100.42</span> um 03:47 Uhr</li>' +
      '<li>Apache-Log zeigt Requests auf <span class="file">/admin</span> und <span class="file">/etc/passwd</span></li></ul>' +
      '<pre style="background:var(--bg-code);padding:10px;border-radius:4px;font-size:12px">grep "Failed password" auth.log | awk \'{print $(NF-3)}\' | sort | uniq -c | sort -rn | head -5\n' +
      'grep "Accepted" auth.log | grep "192.168.100.42"</pre>') +
    '</div></div></div>' +
    '</div></div>' +

    '<div class="section">' +
    '<h2 class="section-title"><span class="icon">&#128300;</span> Lab 3: Hash-Integrit&auml;t</h2>' +
    '<div class="lab-card">' +
    '<div class="lab-meta">' +
    '<span><span class="difficulty-badge difficulty-easy">Easy</span></span>' +
    '<span>Dateien: <span class="file">original.txt</span>, <span class="file">manipulated.txt</span>, <span class="file">hashes/</span></span>' +
    '</div>' +
    '<h3>Hash-Unterschiede erkennen</h3>' +
    '<p>Zwei scheinbar identische Dateien. Finde den Unterschied mit Hashing und Bin&auml;rvergleich.</p>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
    '<a class="download-btn" href="datasets/original.txt" download>&#11015; original.txt</a>' +
    '<a class="download-btn" href="datasets/manipulated.txt" download>&#11015; manipulated.txt</a>' +
    '</div>' +

    '<div style="margin-top:16px">' +
    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">Aufgabe</span><span class="exercise-name">Lab 3</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Hash-Vergleich durchf&uuml;hren und Manipulation erkennen.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>SHA-256 beider Dateien berechnen: <span class="inline-code">sha256sum original.txt manipulated.txt</span></li>' +
    '<li>Vergleichen: Stimmen die Hashes &uuml;berein?</li>' +
    '<li>Unterschied finden: <span class="inline-code">diff original.txt manipulated.txt</span></li>' +
    '<li>Bin&auml;rvergleich: <span class="inline-code">cmp -l original.txt manipulated.txt</span></li>' +
    '</ol></div>' +
    toggle('L&ouml;sung anzeigen',
      '<p>Die Hashes sind unterschiedlich. Die manipulierte Datei hat ein zus&auml;tzliches Leerzeichen ' +
      'oder ein ver&auml;ndertes Zeichen. <span class="inline-code">diff</span> zeigt die genaue Position.</p>') +
    '</div></div></div>' +
    '</div></div>' +

    '<div class="section">' +
    '<h2 class="section-title"><span class="icon">&#128300;</span> Lab 4: Hex-Analyse</h2>' +
    '<div class="lab-card">' +
    '<div class="lab-meta">' +
    '<span><span class="difficulty-badge difficulty-medium">Medium</span></span>' +
    '<span>Datei: <span class="file">mbr_sample.bin</span></span>' +
    '</div>' +
    '<h3>MBR-Signatur erkennen</h3>' +
    '<p>512 Bytes &ndash; ein Master Boot Record. Finde die Signatur, identifiziere den Bootcode ' +
    'und entdecke den manipulierten Bereich.</p>' +
    '<a class="download-btn" href="datasets/mbr_sample.bin" download>&#11015; mbr_sample.bin herunterladen</a>' +

    '<div style="margin-top:16px">' +
    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">Aufgabe</span><span class="exercise-name">Lab 4</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Hexdump lesen, MBR-Signatur finden, Manipulation erkennen.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Hex-Dump erstellen: <span class="inline-code">xxd mbr_sample.bin</span></li>' +
    '<li>MBR-Signatur <span class="kw">55 AA</span> an Offset 510-511 finden</li>' +
    '<li>Bootcode am Anfang identifizieren (typisch: <span class="kw">FA 33</span>)</li>' +
    '<li>Nach ungew&ouml;hnlichen Byte-Sequenzen suchen (manipulierte Bereiche)</li>' +
    '</ol></div>' +
    toggle('Hinweis anzeigen',
      '<p>Die letzten 2 Bytes eines g&uuml;ltigen MBR m&uuml;ssen <span class="kw">55 AA</span> sein. ' +
      'Schau dir den Hex-Dump genau an &ndash; es gibt einen Bereich mit ungew&ouml;hnlichem Muster.</p>') +
    toggle('L&ouml;sung anzeigen',
      '<p><strong>Ergebnis:</strong></p>' +
      '<ul><li>Offset 510-511: <span class="kw">55 AA</span> &ndash; g&uuml;ltige MBR-Signatur</li>' +
      '<li>Offset 0-1: <span class="kw">FA 33</span> &ndash; x86-Bootcode (CLI, XOR)</li>' +
      '<li>Manipulierter Bereich: Offset ~200-220 enth&auml;lt ein wiederkehrendes Muster <span class="kw">DE AD BE EF</span></li></ul>') +
    '</div></div></div>' +
    '</div></div>' +

    '<div class="section">' +
    '<h2 class="section-title"><span class="icon">&#128300;</span> Lab 5: Memory/Strings</h2>' +
    '<div class="lab-card">' +
    '<div class="lab-meta">' +
    '<span><span class="difficulty-badge difficulty-medium">Medium</span></span>' +
    '<span>Datei: <span class="file">memory_dump_sample.raw</span></span>' +
    '</div>' +
    '<h3>Strings aus einem Memory-Dump extrahieren</h3>' +
    '<p>Ein simulierter Memory-Dump enth&auml;lt Klartext-Passw&ouml;rter, URLs und andere sensible Daten. ' +
    'Extrahiere und filtere relevante Informationen.</p>' +
    '<a class="download-btn" href="datasets/memory_dump_sample.raw" download>&#11015; memory_dump_sample.raw herunterladen</a>' +

    '<div style="margin-top:16px">' +
    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">Aufgabe</span><span class="exercise-name">Lab 5</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Relevante Daten aus einem Bin&auml;r-Dump extrahieren.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Alle Strings extrahieren: <span class="inline-code">strings memory_dump_sample.raw | head -50</span></li>' +
    '<li>Nach Passw&ouml;rtern suchen: <span class="inline-code">strings memory_dump_sample.raw | grep -i "pass"</span></li>' +
    '<li>URLs finden: <span class="inline-code">strings memory_dump_sample.raw | grep -E "https?://"</span></li>' +
    '<li>Email-Adressen finden: <span class="inline-code">strings memory_dump_sample.raw | grep -E "[a-z]+@[a-z]+\.[a-z]+"</span></li>' +
    '<li>Offsets notieren: <span class="inline-code">strings -t d memory_dump_sample.raw | grep -i "password"</span></li>' +
    '</ol></div>' +
    toggle('L&ouml;sung anzeigen',
      '<p><strong>Gefundene Artefakte:</strong></p>' +
      '<ul><li>Passw&ouml;rter: <span class="kw">Admin2024!</span>, <span class="kw">f0r3ns1c_l4b</span></li>' +
      '<li>URLs: <span class="kw">https://internal.corp.local/secret</span></li>' +
      '<li>Email: <span class="kw">suspicious@darknet-market.onion</span></li></ul>') +
    '</div></div></div>' +
    '</div></div>' +

    completeBtn('ch10-labs') +
    navButtons('ch11-casestudy', 'ch12-image-formate');
};

// ========== MINI-CTF ==========
Labs['ch11-ctf'] = function () {
  return '' +
    '<h1 class="chapter-title">Mini-CTF Challenges</h1>' +
    '<div class="chapter-subtitle">Capture The Flag &ndash; dein forensischer Beweis</div>' +

    callout('tip', '&#127942; CTF-Format',
      '<p>Jede Challenge hat ein Flag im Format <span class="inline-code">FORENSIK{...}</span>. ' +
      'Lade die Datei herunter, analysiere sie und finde das Flag.</p>') +

    '<div class="section">' +
    '<h2 class="section-title"><span class="number">1</span> Challenge: Verstecktes Flag</h2>' +
    '<div class="lab-card">' +
    '<div class="lab-meta"><span><span class="difficulty-badge difficulty-easy">Easy</span></span><span>Datei: <span class="file">memory_dump_sample.raw</span></span></div>' +
    '<p>Im Memory-Dump ist ein Flag versteckt. Nutze <span class="inline-code">strings</span> und <span class="inline-code">grep</span> um es zu finden.</p>' +
    '<a class="download-btn" href="datasets/memory_dump_sample.raw" download>&#11015; memory_dump_sample.raw herunterladen</a>' +
    '<div style="margin-top:16px">' +
    toggle('L&ouml;sung anzeigen',
      '<p><span class="inline-code">strings memory_dump_sample.raw | grep "FORENSIK"</span></p>' +
      '<p>Flag: <span class="kw">FORENSIK{str1ngs_15_y0ur_fr13nd}</span></p>') +
    '</div></div></div>' +

    '<div class="section">' +
    '<h2 class="section-title"><span class="number">2</span> Challenge: MBR-Signatur</h2>' +
    '<div class="lab-card">' +
    '<div class="lab-meta"><span><span class="difficulty-badge difficulty-medium">Medium</span></span><span>Datei: <span class="file">mbr_sample.bin</span></span></div>' +
    '<p>Das Flag ist im manipulierten Bereich des MBR versteckt. Lies den Hex-Dump und finde die ASCII-Botschaft.</p>' +
    '<a class="download-btn" href="datasets/mbr_sample.bin" download>&#11015; mbr_sample.bin herunterladen</a>' +
    '<div style="margin-top:16px">' +
    toggle('L&ouml;sung anzeigen',
      '<p><span class="inline-code">xxd mbr_sample.bin | grep -i "FOR"</span></p>' +
      '<p>Flag: <span class="kw">FORENSIK{mbr_s1gn4tur3_v4l1d}</span></p>') +
    '</div></div></div>' +

    '<div class="section">' +
    '<h2 class="section-title"><span class="number">3</span> Challenge: Hash-Kollision</h2>' +
    '<div class="lab-card">' +
    '<div class="lab-meta"><span><span class="difficulty-badge difficulty-easy">Easy</span></span><span>Dateien: <span class="file">original.txt</span>, <span class="file">manipulated.txt</span></span></div>' +
    '<p>Finde den genauen Unterschied zwischen den beiden Dateien. Das Flag ist das ver&auml;nderte Wort.</p>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
    '<a class="download-btn" href="datasets/original.txt" download>&#11015; original.txt</a>' +
    '<a class="download-btn" href="datasets/manipulated.txt" download>&#11015; manipulated.txt</a>' +
    '</div>' +
    '<div style="margin-top:16px">' +
    toggle('L&ouml;sung anzeigen',
      '<p><span class="inline-code">diff original.txt manipulated.txt</span></p>' +
      '<p>Flag: <span class="kw">FORENSIK{h4sh_m17ch_d3t3ct3d}</span></p>') +
    '</div></div></div>' +

    '<div class="section">' +
    '<h2 class="section-title"><span class="number">4</span> Challenge: Log-Forensik</h2>' +
    '<div class="lab-card">' +
    '<div class="lab-meta"><span><span class="difficulty-badge difficulty-hard">Hard</span></span><span>Datei: <span class="file">auth.log</span></span></div>' +
    '<p>Der Angreifer hat sich erfolgreich eingeloggt. Finde den genauen Zeitstempel des ersten erfolgreichen Logins von der Angreifer-IP. ' +
    'Das Flag ist <span class="inline-code">FORENSIK{HH:MM:SS}</span> mit der Uhrzeit.</p>' +
    '<a class="download-btn" href="datasets/auth.log" download>&#11015; auth.log herunterladen</a>' +
    '<div style="margin-top:16px">' +
    toggle('L&ouml;sung anzeigen',
      '<p><span class="inline-code">grep "Accepted" auth.log | grep "192.168.100.42" | head -1</span></p>' +
      '<p>Flag: <span class="kw">FORENSIK{03:47:22}</span></p>') +
    '</div></div></div>' +

    '<div class="section">' +
    '<h2 class="section-title"><span class="number">5</span> Challenge: USB-Image Deep Dive</h2>' +
    '<div class="lab-card">' +
    '<div class="lab-meta"><span><span class="difficulty-badge difficulty-hard">Hard</span></span><span>Datei: <span class="file">usb_case01.img</span></span></div>' +
    '<p>Im USB-Image ist eine versteckte Nachricht. Kombiniere <span class="inline-code">strings</span>, <span class="inline-code">hexdump</span> und <span class="inline-code">mount</span> um sie zu finden.</p>' +
    '<a class="download-btn" href="datasets/usb_case01.img" download>&#11015; usb_case01.img herunterladen</a>' +
    '<div style="margin-top:16px">' +
    toggle('L&ouml;sung anzeigen',
      '<p><span class="inline-code">strings usb_case01.img | grep "FORENSIK"</span></p>' +
      '<p>Flag: <span class="kw">FORENSIK{d4t4_3xf1ltr4t10n_d3t3ct3d}</span></p>') +
    '</div></div></div>' +

    completeBtn('ch11-ctf') +
    navButtons('ch10-labs', 'ch12-image-formate');
};
