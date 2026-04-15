var Chapters = {};

Chapters.welcome = function () {
  return '<div class="welcome-hero">' +
    '<p class="welcome-hero-eyebrow">ABB IT-FAHNDUNG</p>' +
    '<h1>Forensische Datensicherung</h1>' +
    '<p class="welcome-hero-desc">Operatives Training f&uuml;r die Steuerfahndung &mdash; von der Sicherung bis zur gerichtsverwertbaren Beweisf&uuml;hrung nach NIST SP 800-86.</p>' +
    '<button class="welcome-cta" onclick="App.navigateTo(\'ch01-grundlagen\')">Training starten &rarr;</button>' +
    '</div>' +

    '<div class="welcome-note">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' +
    '<span>&Uuml;bungen ausschlie&szlig;lich mit Testdaten durchf&uuml;hren.</span>' +
    '</div>' +

    '<div class="welcome-modules">' +

    '<div class="welcome-module" onclick="App.navigateTo(\'ch01-grundlagen\')">' +
    '<div class="welcome-module-left"><span class="welcome-module-num">01</span></div>' +
    '<div class="welcome-module-body">' +
    '<h2>Grundlagen &amp; Forensischer Prozess</h2>' +
    '<p>Devices, Partitionen, Dateisysteme, Imaging, Hashing, Mounten, Hex-Analyse, Strings, Sicheres L&ouml;schen, Artefaktanalyse, Case Study</p>' +
    '</div>' +
    '<span class="welcome-module-arrow">&rarr;</span>' +
    '</div>' +

    '<div class="welcome-module" onclick="App.navigateTo(\'ch12-image-formate\')">' +
    '<div class="welcome-module-left"><span class="welcome-module-num">02</span></div>' +
    '<div class="welcome-module-body">' +
    '<h2>Vertiefung &amp; Methodik</h2>' +
    '<p>Image-Formate, Vergleiche, Protokollierung, Write-Blocker, Best Practices, Tools</p>' +
    '</div>' +
    '<span class="welcome-module-arrow">&rarr;</span>' +
    '</div>' +

    '<div class="welcome-module" onclick="App.navigateTo(\'ch19-datenrettung\')">' +
    '<div class="welcome-module-left"><span class="welcome-module-num">03</span></div>' +
    '<div class="welcome-module-body">' +
    '<h2>Erweiterte Analyse</h2>' +
    '<p>Datenrettung, File Carving, Memory-Forensik, Netzwerkforensik, Zeitlinienanalyse</p>' +
    '</div>' +
    '<span class="welcome-module-arrow">&rarr;</span>' +
    '</div>' +

    '</div>';
};

Chapters['ch01-grundlagen'] = function () {
  return '<h1 class="chapter-title">Grundlagen &amp; Workflow</h1>' +
    '<div class="chapter-subtitle">Von der Hausdurchsuchung zur forensischen Datensicherung</div>' +
    '<p class="chapter-intro">Bevor du einen einzigen Befehl tippst, musst du verstehen, womit du arbeitest. Dieses Kapitel holt dich ab &mdash; vom Szenario bis zur ersten Terminal-&Uuml;bung.</p>' +
    '<div class="feature-grid chapter-preview-grid">' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128190;</div>' +
    '<div class="feature-text">' +
    '<h3>Device &amp; Partition</h3>' +
    '<p>Was ist eine Festplatte? Wie sind Partitionen aufgebaut?</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128196;</div>' +
    '<div class="feature-text">' +
    '<h3>Dateisysteme</h3>' +
    '<p>NTFS, ext4, FAT32 &mdash; was du als Forensiker wissen musst</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128736;</div>' +
    '<div class="feature-text">' +
    '<h3>Forensischer Workflow</h3>' +
    '<p>Die 5 Kernschritte jeder Untersuchung</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128187;</div>' +
    '<div class="feature-text">' +
    '<h3>Terminal-&Uuml;bung</h3>' +
    '<p>Deine erste forensische Session im Simulator</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>' +

    '<h2 class="section-title"><span class="number">1.1</span> Deine erste Hausdurchsuchung</h2>' +
    '<div class="scenario-box">' +
    '<div class="scenario-icon">&#127919;</div>' +
    '<div class="scenario-label">EINSATZ-SZENARIO</div>' +
    '<div class="scenario-text">Du stehst in einer Wohnung. Auf dem Tisch liegt ein Laptop. Dein Kollege reicht dir einen USB-Stick und sagt <em>"Sichere das."</em></div>' +
    '</div>' +
    '<p>Was tust du? Festplatte raus, anstecken, kopieren? <strong>Stopp.</strong> Genau so zerstörst du Beweise.</p>' +
    '<p>Bevor du &uuml;berhaupt einen Befehl tippst, musst du verstehen, <strong>womit</strong> du arbeitest und <strong>warum</strong> jeder Schritt wichtig ist. Genau das lernst du in diesem Kapitel.</p>' +
    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div>' +
    '<p>Du wei&szligt was ein Device, eine Partition und ein Dateisystem ist. Du verstehst den forensischen Workflow. Und du hast deine erste Untersuchung im Terminal simuliert.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">1.2</span> Der goldene Grundsatz</h2>' +
    '<p>Es gibt eine Regel, die steht &uuml;ber allem anderen in der Forensik:</p>' +
    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Der goldene Grundsatz</div>' +
    '<p><strong>Ver&auml;ndere niemals das Original.</strong></p>' +
    '</div>' +
    '<p>Stell dir einen Tatort vor: Die Spurensicherung w&uuml;rde nie den Blutstropfen wegwischen bevor sie ein Foto macht. Genauso ist es mit digitalen Beweisen.</p>' +
    '<p>Wenn du eine Festplatte ansteckst und Linux mountet sie automatisch &ndash; hat sich bereits etwas ver&auml;ndert. Zeitstempel aktualisiert, Journal-Eintr&auml;ge geschrieben. Das Original ist <strong>kontaminiert</strong>.</p>' +
    '<p>Deshalb:</p>' +
    '<ul>' +
    '<li><strong>Vorher</strong> einen Write-Blocker verwenden (falls vorhanden)</li>' +
    '<li><strong>Vorher</strong> sicherstellen dass nichts gemountet ist</li>' +
    '<li><strong>Vorher</strong> die Protokollierung starten</li>' +
    '<li><strong>Und dann</strong> erst eine exakte Kopie (Image) erstellen</li>' +
    '</ul>' +
    '<p>Alle Analysen finden an der <strong>Kopie</strong> statt, nie am Original.</p>' +

    '<h2 class="section-title"><span class="number">1.3</span> Was ist eigentlich eine Festplatte?</h2>' +
    '<p>Unter Linux siehst du Festplatten als <strong>Devices</strong> (Ger&auml;te) im Ordner <span class="inline-code">/dev/</span>. Jede physische Platte bekommt einen eigenen Namen:</p>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Device-Name</th><th>Was ist das?</th><th>Erkennst du</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">/dev/sda</span></td><td>Erste SATA/USB-Festplatte</td><td>HDD, SSD, USB-Stick</td></tr>' +
    '<tr><td><span class="inline-code">/dev/sdb</span></td><td>Zweite SATA/USB-Festplatte</td><td>Weitere Platte, weiterer Stick</td></tr>' +
    '<tr><td><span class="inline-code">/dev/nvme0n1</span></td><td>Erste NVMe-SSD</td><td>Schnelle SSD in modernen Laptops</td></tr>' +
    '<tr><td><span class="inline-code">/dev/sr0</span></td><td>Optisches Laufwerk</td><td>CD/DVD</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Der h&auml;ufigste Fehler</div>' +
    '<p><span class="inline-code">/dev/sda</span> ist nicht immer <em>deine</em> Platte! Wenn du einen USB-Stick ansteckst, k&ouml;nnte er <span class="inline-code">/dev/sdb</span> sein &ndash; oder auch <span class="inline-code">/dev/sda</span>, wenn keine andere Platte verbaut ist. <strong>Immer pr&uuml;fen</strong> mit <span class="inline-code">lsblk</span> bevor du irgendetwas machst. Wie das geht, lernst du im n&auml;chsten Kapitel.</p>' +
    '</div>' +
    '<p><strong>Eselsbr&uuml;cke:</strong> <span class="inline-code">sd</span> = SCSI Disk, <span class="inline-code">a</span> = erste, <span class="inline-code">b</span> = zweite. Bei NVMe: <span class="inline-code">nvme</span> + Nummer + <span class="inline-code">n</span> (Namespace) + Nummer.</p>' +

    '<h2 class="section-title"><span class="number">1.4</span> Partitionen &mdash; Eine Platte, mehrere Bereiche</h2>' +
    '<p>Du wei&szligt jetzt: <span class="inline-code">/dev/sda</span> ist die ganze Festplatte. Aber eine Platte ist meistens in <strong>Partitionen</strong> aufgeteilt. Stell dir vor, du schneidest eine Pizza in St&uuml;cke &mdash; jedes St&uuml;ck ist eine Partition.</p>' +
    '<p>Deshalb gibt es Nummern hinter dem Device-Namen:</p>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Device</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">/dev/sda</span></td><td>Die <strong>gesamte</strong> Festplatte (alle Partitionen)</td></tr>' +
    '<tr><td><span class="inline-code">/dev/sda1</span></td><td>Erste Partition auf dieser Platte</td></tr>' +
    '<tr><td><span class="inline-code">/dev/sda2</span></td><td>Zweite Partition</td></tr>' +
    '<tr><td><span class="inline-code">/dev/sda3</span></td><td>Dritte Partition</td></tr>' +
    '</tbody></table></div>' +
    '<p><strong>Warum ist das f&uuml;r dich wichtig?</strong> Wenn du ein forensisches Image erstellst, kannst du entweder die <strong>ganze Platte</strong> (<span class="inline-code">/dev/sda</span>) sichern oder nur eine bestimmte <strong>Partition</strong> (<span class="inline-code">/dev/sda1</span>). In der Regel sicherst du die ganze Platte &ndash; so verpasst du nichts.</p>' +
    '<p>Auf welcher "Stelle" der Platte eine Partition beginnt, wird in der <strong>Partitionstabelle</strong> gespeichert. Die zwei wichtigsten Typen lernst du gleich kennen.</p>' +

    '<h2 class="section-title"><span class="number">1.5</span> Dateisysteme &mdash; Wie Daten organisiert werden</h2>' +
    '<p>OK, du hast eine Partition. Aber eine Partition allein ist wie ein leeres Buch &mdash; erst wenn du Seiten, Kapitel und ein Inhaltsverzeichnis hinzuf&uuml;gst, kannst du etwas damit anfangen. Das <strong>Dateisystem</strong> ist dieses Inhaltsverzeichnis.</p>' +
    '<p>Drei Dateisysteme begegnen dir in der Praxis:</p>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Dateisystem</th><th>Wo?</th><th>Besonderheit f&uuml;r Forensiker</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><strong>NTFS</strong></td><td>Windows</td><td>Speichert viele Metadaten: Zeitstempel, Besitzer, alternative Datenstr&ouml;me (ADS) &ndash; forensischer Goldesel</td></tr>' +
    '<tr><td><strong>ext4</strong></td><td>Linux</td><td>Superblock + Inodes. Gel&ouml;schte Dateien schwerer wiederherzustellen als bei NTFS</td></tr>' +
    '<tr><td><strong>FAT32</strong></td><td>USB-Sticks, Kameras</td><td>Keine Rechteverwaltung, einfach aufgebaut. Sehr h&auml;ufig bei sichergestellten USB-Sticks</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Forensischer Tipp</div>' +
    '<p>Jedes Dateisystem hinterl&auml;sst andere Spuren. Bei NTFS kannst du gel&ouml;schte Dateien oft noch wochenlang wiederherstellen. Bei ext4 ist das schwieriger. Deshalb ist es wichtig zu wissen, <strong>welches</strong> Dateisystem du vor dir hast.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">1.6</span> Das Schichten-Modell</h2>' +
    '<p>Alles was du bisher gelernt hast, l&auml;sst sich als Schichten-Modell darstellen &mdash; von au&szlig;en nach innen:</p>' +
    '<div class="callout callout-info">' +
    '<div class="callout-header">&#9432; Vom Physischen zur Datei</div>' +
    '<p>' +
    '<strong>1. Physische Festplatte</strong> &rarr; das Ger&auml;t in der Hand (<span class="inline-code">/dev/sda</span>)<br>' +
    '<strong>2. Partitionstabelle</strong> &rarr; beschreibt wo die Partitionen liegen (MBR oder GPT)<br>' +
    '<strong>3. Partitionen</strong> &rarr; logische Bereiche auf der Platte (<span class="inline-code">/dev/sda1</span>)<br>' +
    '<strong>4. Dateisystem</strong> &rarr; organisiert Dateien innerhalb einer Partition (NTFS, ext4, FAT32)<br>' +
    '<strong>5. Dateien</strong> &rarr; die eigentlichen Daten die du untersuchst' +
    '</p>' +
    '</div>' +
    '<p><strong>Als Forensiker arbeitest du dich von oben nach unten durch.</strong> Zuerst identifizierst du das Device. Dann schaust du die Partitionstabelle an. Dann mountest du eine Partition read-only. Dann untersuchst du die Dateien.</p>' +
    '<p>Dieses Modell wirst du in jedem Einsatz brauchen &mdash; behalte es im Hinterkopf.</p>' +

    '<h2 class="section-title"><span class="number">1.7</span> Der forensische Workflow</h2>' +
    '<p>Nun wei&szligt du was ein Device, eine Partition und ein Dateisystem ist. Hier ist der Standard-Workflow f&uuml;r eine forensisch saubere Datensicherung:</p>' +
    '<div class="callout callout-info">' +
    '<div class="callout-header">&#9432; Die 5 Kernschritte</div>' +
    '<p>' +
    '<strong>1. Identifizieren</strong> &mdash; Welches Device ist der Beweisgegenstand? Mit <span class="inline-code">lsblk</span> pr&uuml;fen.<br>' +
    '<strong>2. Sichern</strong> &mdash; Ein exaktes Image der gesamten Platte erstellen. Nichts mounten, nichts &ouml;ffnen.<br>' +
    '<strong>3. Verifizieren</strong> &mdash; Hash-Werte (SHA-256) von Original und Image vergleichen. Stimmen sie &uuml;berein, ist die Kopie identisch.<br>' +
    '<strong>4. Analysieren</strong> &mdash; Alle Untersuchungen am Image, nie am Original. Read-only mounten.<br>' +
    '<strong>5. Dokumentieren</strong> &mdash; Jeden Befehl, jeden Zeitpunkt, jedes Ergebnis protokollieren.' +
    '</p>' +
    '</div>' +
    '<p><strong>Was passiert, wenn du einen Schritt &uuml;berspringst?</strong></p>' +
    '<ul>' +
    '<li><strong>Ohne Identifikation:</strong> Du sicherst die falsche Platte &mdash; und verpasst den Beweis.</li>' +
    '<li><strong>Ohne Write-Blocker:</strong> Das Original wird ver&auml;ndert &mdash; das Beweismittel ist kontaminiert.</li>' +
    '<li><strong>Ohne Hash:</strong> Du kannst sp&auml;ter nicht beweisen, dass dein Image identisch mit dem Original ist.</li>' +
    '<li><strong>Ohne Dokumentation:</strong> Vor Gericht wird die Analyse angezweifelt &mdash; "Wie genau haben Sie das gemacht?"</li>' +
    '</ul>' +
    '<p>In den n&auml;chsten Kapiteln gehst du jeden dieser Schritte im Detail durch.</p>' +

    '<h2 class="section-title"><span class="number">1.8</span> Partitionstabellen: MBR &amp; GPT</h2>' +
    '<p>Du wei&szligt: Die Partitionstabelle beschreibt, wo die Partitionen auf der Platte liegen. Daf&uuml;r gibt es zwei Standards:</p>' +
    '<p><strong>MBR</strong> (Master Boot Record) ist der &auml;ltere Standard. Steht in den ersten 512 Bytes der Platte. Problem: Maximal 4 Partitionen, maximal 2 TiB.</p>' +
    '<p><strong>GPT</strong> (GUID Partition Table) ist der moderne Standard. Unterst&uuml;tzt riesige Platten und viele Partitionen. Hat zus&auml;tzlich ein Backup am Ende der Platte &mdash; falls der Anfang zerst&ouml;rt ist.</p>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Eigenschaft</th><th>MBR</th><th>GPT</th><th>Warum wichtig f&uuml;r dich</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>Max. Gr&ouml;&szlig;e</td><td>2 TiB</td><td>18 EiB</td><td>Gro&szlig;e Platten (>2TB) sind immer GPT</td></tr>' +
    '<tr><td>Max. Partitionen</td><td>4 prim&auml;re</td><td>128</td><td>MBR kann erweiterte Partitionen nutzen &mdash; forensisch knifflig</td></tr>' +
    '<tr><td>Backup</td><td>Nein</td><td>Ja (am Ende)</td><td>GPT-Backup rettet zerst&ouml;rte Partitionstabellen</td></tr>' +
    '<tr><td>Integrit&auml;t</td><td>Keine Pr&uuml;fsumme</td><td>CRC32</td><td>GPT erkennt Besch&auml;digung selbst</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; In der Praxis</div>' +
    '<p>Wenn du ein Image einer Platte hast, pr&uuml;fe zuerst ob es MBR oder GPT ist. Das sagt dir, wie du die Partitionen ansprechen musst und ob du mit Offset-Berechnungen rechnen musst (<span class="inline-code">Startsektor &times; 512</span>). Wie das genau geht, lernst du im Kapitel Mounten.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">1.9</span> Typische Anf&auml;ngerfehler</h2>' +
    '<p>Diese drei Fehler passieren am h&auml;ufigsten &mdash; bei Anf&auml;ngern und bei Profis die unter Zeitdruck arbeiten:</p>' +
    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Fehler 1: Falsches Device</div>' +
    '<p>Du denkst <span class="inline-code">/dev/sda</span> ist der USB-Stick, aber es ist die interne Festplatte. Du &uuml;berschreibst dein eigenes System.</p>' +
    '<p><strong>Was ich tue:</strong> Vor jedem Befehl: <span class="inline-code">lsblk</span> ausf&uuml;hren und den Device-Namen verifizieren. Größe, Modell und Mountpoint pr&uuml;fen.</p>' +
    '</div>' +
    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Fehler 2: Vergessen zu unmounten</div>' +
    '<p>Die Platte ist noch gemountet und Linux schreibt im Hintergrund. Das Original wird ver&auml;ndert.</p>' +
    '<p><strong>Was ich tue:</strong> Vor dem Imaging immer <span class="inline-code">umount</span> ausf&uuml;hren. Besser noch: Write-Blocker verwenden.</p>' +
    '</div>' +
    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Fehler 3: Keine Protokollierung</div>' +
    '<p>Ohne <span class="inline-code">script</span>-Log kannst du sp&auml;ter nicht nachweisen, was du getan hast. Vor Gericht wertlos.</p>' +
    '<p><strong>Was ich tue:</strong> <span class="inline-code">script</span> <strong>immer</strong> als erstes starten, <span class="inline-code">exit</span> als letztes. Gewohnheit machen, kein Auslassen.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">1.10</span> Case-Ordnerstruktur</h2>' +
    '<p>Bevor du mit der Untersuchung beginnst, brauchst du eine Ordnerstruktur. So wei&szlig;t jeder im Team wo was liegt &mdash; und du findest Monate sp&auml;ter noch deine Ergebnisse.</p>' +
    '<p>Standardstruktur f&uuml;r einen Fall:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>mkdir -p /cases/case01/{images,mounts,hashes,notes,reports,tools}</code></pre></div>' +
    '<p>Was geh&ouml;rt wohin?</p>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Ordner</th><th>Inhalt</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">images/</span></td><td>Forensische Images (Kopien der Platten)</td></tr>' +
    '<tr><td><span class="inline-code">mounts/</span></td><td>Mountpoints zum Einh&auml;ngen der Images</td></tr>' +
    '<tr><td><span class="inline-code">hashes/</span></td><td>SHA-256 Pr&uuml;fsummen von Original und Image</td></tr>' +
    '<tr><td><span class="inline-code">notes/</span></td><td>Session-Logs, Notizen, Protokolle</td></tr>' +
    '<tr><td><span class="inline-code">reports/</span></td><td>Auswertungen und Berichte</td></tr>' +
    '<tr><td><span class="inline-code">tools/</span></td><td>Hilfsprogramme f&uuml;r diesen Fall</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Brace-Expansion</div>' +
    '<p>Die Klammern <span class="inline-code">{images,mounts,...}</span> sind eine Shell-Abk&uuml;rzung. Statt 6 mal <span class="inline-code">mkdir</span> zu tippen, machst du es in einem Befehl. <span class="inline-code">-p</span> sorgt daf&uuml;r dass &uuml;bergeordnete Ordner automatisch erstellt werden.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">1.11</span> Vorbereitung: Deine erste forensische Untersuchung</h2>' +
    '<div class="exercise-start-banner">' +
    '<div class="exercise-start-icon">&#128187;</div>' +
    '<div class="exercise-start-text"><strong>Terminal-&Uuml;bung beginnt jetzt!</strong><br>Das Terminal unten &ouml;ffnet sich automatisch. Du wirst Schritt f&uuml;r Schritt eine echte forensische Arbeitsumgebung aufbauen.</div>' +
    '</div>' +
    '<p><strong>Was dich erwartet:</strong> Du simulierst den Start einer echten forensischen Untersuchung. Ein USB-Stick wurde als Beweismittel sichergestellt und du musst alles professionell vorbereiten.</p>' +
    '<p>Du wirst in <strong>7 Schritten</strong> lernen:</p>' +
    '<ol>' +
    '<li><strong>Umschauen</strong> &ndash; Mit <span class="inline-code">ls</span> sehen was es gibt</li>' +
    '<li><strong>In den Cases-Ordner wechseln</strong> &ndash; Mit <span class="inline-code">cd /cases</span> ins Arbeitsverzeichnis</li>' +
    '<li><strong>Ordnerstruktur erstellen</strong> &ndash; Einen Fall-Ordner mit <span class="inline-code">mkdir</span> anlegen</li>' +
    '<li><strong>Ergebnis pr&uuml;fen</strong> &ndash; Mit <span class="inline-code">tree</span> kontrollieren</li>' +
    '<li><strong>Protokollierung starten</strong> &ndash; Mit <span class="inline-code">script</span> aufzeichnen</li>' +
    '<li><strong>Systeminfos dokumentieren</strong> &ndash; Mit <span class="inline-code">uname</span> die Umgebung erfassen</li>' +
    '<li><strong>Protokollierung beenden</strong> &ndash; Die Session sauber abschlie&szlig;en</li>' +
    '</ol>' +
    '<div class="callout callout-info">' +
    '<div class="callout-header">&#9432; So funktioniert es</div>' +
    '<p>Auf jeder der n&auml;chsten Slides steht ein Befehl in einem grauen Code-Block. Tippe ihn <strong>exakt so</strong> ins Terminal ein und dr&uuml;cke Enter. Unter dem Befehl siehst du die <strong>erwartete Ausgabe</strong> &ndash; vergleiche sie mit dem, was dein Terminal anzeigt.</p>' +
    '</div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Keine Angst vor Fehlern!</div>' +
    '<p>Du kannst nichts kaputt machen &ndash; das Terminal ist simuliert. Wenn etwas nicht klappt, tippe den Befehl einfach nochmal. Nutze den <strong>Kopieren</strong>-Button neben dem Code-Block zum Kopieren.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">1.12</span> &Uuml;bung: Umschauen was es gibt</h2>' +
    '<p>Bevor du irgendetwas tust, schau dich zuerst um. Auf einem fremden System ist das Erste was ein Forensiker macht: <strong>orientieren</strong>. Mit <span class="inline-code">ls</span> siehst du was im aktuellen Verzeichnis liegt:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ls</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>cases  dev  home  mnt  tmp</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">ls</span></td><td><strong>l</strong>i<strong>s</strong>t &ndash; zeigt den Inhalt des aktuellen Verzeichnisses an</td></tr>' +
    '</tbody></table></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Verzeichnis</th><th>Was ist das?</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">cases/</span></td><td>Dein Arbeitsverzeichnis f&uuml;r forensische F&auml;lle</td></tr>' +
    '<tr><td><span class="inline-code">dev/</span></td><td>Ger&auml;tedateien (Festplatten, USB-Sticks)</td></tr>' +
    '<tr><td><span class="inline-code">home/</span></td><td>Benutzerverzeichnisse</td></tr>' +
    '<tr><td><span class="inline-code">mnt/</span></td><td>Mountpoints (eingeh&auml;ngte Laufwerke)</td></tr>' +
    '<tr><td><span class="inline-code">tmp/</span></td><td>Tempor&auml;re Dateien</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Warum zuerst ls?</div>' +
    '<p>Ein Forensiker tut <strong>niemals</strong> etwas blind. Bevor du Ordner erstellst oder Befehle ausf&uuml;hrst, musst du wissen wo du bist und was bereits existiert. <span class="inline-code">ls</span> ist wie "Licht einschalten bevor du einen Raum betrittst".</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">1.13</span> &Uuml;bung: Ins Arbeitsverzeichnis wechseln</h2>' +
    '<p>Auf dieser Arbeitsstation wurde der Ordner <span class="inline-code">/cases</span> f&uuml;r forensische F&auml;lle eingerichtet. Bevor du etwas erstellst, wechsle dorthin:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>cd /cases</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">cd</span></td><td><strong>c</strong>hange <strong>d</strong>irectory &ndash; Verzeichnis wechseln</td></tr>' +
    '<tr><td><span class="inline-code">/cases</span></td><td>Absoluter Pfad (beginnt mit <span class="inline-code">/</span>) &mdash; der forensische Arbeitsordner auf dieser Station</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Was passiert?</div>' +
    '<p>Der Prompt im Terminal &auml;ndert sich auf <span class="inline-code">/cases</span>. Du bist jetzt im Arbeitsverzeichnis. Alle weiteren Befehle beziehen sich auf diesen Ordner.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">1.14</span> &Uuml;bung: Case-Ordner erstellen</h2>' +
    '<p>Du bekommst einen USB-Stick als Beweismittel. Bevor du &uuml;berhaupt etwas untersuchst, brauchst du eine ordentliche Ordnerstruktur. So geht jeder echte Forensiker vor.</p>' +
    '<p><strong>Dein n&auml;chster Befehl:</strong> Erstelle den Fall-Ordner mit allen Unterordnern auf einmal:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>mkdir -p case-001/{images,mounts,hashes,notes,reports,tools}</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>7 Verzeichnis(se) erstellt.</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">mkdir</span></td><td><strong>m</strong>a<strong>k</strong>e<strong>dir</strong>ectory &ndash; Ordner erstellen</td></tr>' +
    '<tr><td><span class="inline-code">-p</span></td><td><strong>p</strong>arents &ndash; erstellt auch &uuml;bergeordnete Ordner automatisch, kein Fehler wenn schon vorhanden</td></tr>' +
    '<tr><td><span class="inline-code">case-001/</span></td><td>Name des Falls (Hauptordner)</td></tr>' +
    '<tr><td><span class="inline-code">{images,...}</span></td><td>Brace Expansion &ndash; Shell-Abk&uuml;rzung: erstellt alle 6 Unterordner auf einmal</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Was passiert hier?</div>' +
    '<p>Die Klammern <span class="inline-code">{images,mounts,...}</span> sind eine Shell-Abk&uuml;rzung: Linux erstellt automatisch 6 Unterordner in case-001. Der Ordner case-001 selbst ist das 7. Verzeichnis. F&uuml;hrst du den Befehl nochmal aus, steht da "Verzeichnis existiert bereits" &mdash; das ist normal und kein Fehler.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">1.15</span> &Uuml;bung: Pr&uuml;fen ob es geklappt hat</h2>' +
    '<p>Gut, du hast den Ordner erstellt. Aber wie pr&uuml;fst du ob alles da ist? Mit <span class="inline-code">tree</span> kannst du dir die ganze Struktur als Baum anzeigen lassen:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>tree case-001</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>case-001\n&#9500;&#9472;&#9472; images\n&#9500;&#9472;&#9472; mounts\n&#9500;&#9472;&#9472; hashes\n&#9500;&#9472;&#9472; notes\n&#9500;&#9472;&#9472; reports\n&#9492;&#9472;&#9472; tools\n\n6 directories, 0 files</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">tree</span></td><td>Zeigt die Verzeichnisstruktur als Baumdiagramm an</td></tr>' +
    '<tr><td><span class="inline-code">case-001</span></td><td>Der Ordner dessen Inhalt du sehen willst</td></tr>' +
    '<tr><td><span class="inline-code">&#9500;&#9472;&#9472;</span></td><td>Geh zum n&auml;chsten Eintrag (noch mehr folgt)</td></tr>' +
    '<tr><td><span class="inline-code">&#9492;&#9472;&#9472;</span></td><td>Letzter Eintrag in diesem Ordner</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Wof&uuml;r die Ordner?</div>' +
    '<p><span class="inline-code">images/</span> = Festplatten-Kopien, <span class="inline-code">mounts/</span> = Eingeh&auml;ngte Images, <span class="inline-code">hashes/</span> = Pr&uuml;fsummen, <span class="inline-code">notes/</span> = Notizen &amp; Protokolle, <span class="inline-code">reports/</span> = Berichte, <span class="inline-code">tools/</span> = Hilfsprogramme.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">1.16</span> &Uuml;bung: Protokollierung starten</h2>' +
    '<p>In der Forensik muss jeder Schritt nachvollziehbar sein. Der Befehl <span class="inline-code">script</span> nimmt alles auf was du tippst &ndash; wie ein Blackbox-Recorder:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>script case-001/notes/session.log</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>Skript gestartet, Datei ist &#39;case-001/notes/session.log&#39; (befehle werden mitgeloggt)</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">script</span></td><td>Startet die Aufzeichnung einer Terminalsitzung</td></tr>' +
    '<tr><td><span class="inline-code">case-001/notes/session.log</span></td><td>Datei in der alles gespeichert wird (Pfad relativ zum aktuellen Verzeichnis)</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Warum ist das wichtig?</div>' +
    '<p>Ab jetzt wird jeder Befehl in <span class="inline-code">session.log</span> gespeichert. Wenn sp&auml;ter jemand fragt "Wie haben Sie das gemacht?" &ndash; hast du es schwarz auf wei&szlig;. Ohne Protokoll ist forensische Arbeit vor Gericht wertlos.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">1.17</span> &Uuml;bung: Systeminfos dokumentieren</h2>' +
    '<p>Jetzt wo die Protokollierung l&auml;uft, dokumentiere dein System. So kann sp&auml;ter nachvollzogen werden, in welcher Umgebung die Untersuchung stattfand:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>uname -a</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>Linux forensik-workstation 6.1.0-kali9-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">uname</span></td><td><strong>u</strong>nix <strong>name</strong> &ndash; zeigt Systeminformationen an</td></tr>' +
    '<tr><td><span class="inline-code">-a</span></td><td><strong>a</strong>ll &ndash; zeigt alle verf&uuml;gbaren Informationen auf einmal</td></tr>' +
    '</tbody></table></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Ausgabe-Teil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">Linux</span></td><td>Kernel-Name</td></tr>' +
    '<tr><td><span class="inline-code">forensik-workstation</span></td><td>Hostname des Computers</td></tr>' +
    '<tr><td><span class="inline-code">6.1.0-kali9-amd64</span></td><td>Kernel-Version und Architektur</td></tr>' +
    '<tr><td><span class="inline-code">x86_64</span></td><td>Prozessor-Architektur (64-Bit)</td></tr>' +
    '<tr><td><span class="inline-code">GNU/Linux</span></td><td>Betriebssystem-Familie</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Warum dokumentieren?</div>' +
    '<p>Falls jemand behauptet die Analyse sei auf einem anderen System gelaufen, hast du den Beweis. Die Systeminfo wird zusammen mit allen anderen Befehlen im <span class="inline-code">session.log</span> protokolliert.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">1.18</span> &Uuml;bung: Protokollierung beenden</h2>' +
    '<p>Super, du hast die ersten Schritte dokumentiert! Jetzt beendest du die Aufzeichnung:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>exit</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>Protokollierung beendet. Session aufgezeichnet.</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">exit</span></td><td>Beendet die aktuelle Shell oder <span class="inline-code">script</span>-Aufzeichnung</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Was jetzt?</div>' +
    '<p>Die session.log-Datei ist jetzt im Ordner <span class="inline-code">/cases/case-001/notes/</span> gespeichert. Pr&uuml;fe den Inhalt mit <span class="inline-code">cat case-001/notes/session.log</span>. Bei der n&auml;chsten &Uuml;bung startest du die Protokollierung einfach wieder mit <span class="inline-code">script</span>.</p>' +
    '</div>' +
    '<div class="callout callout-success">' +
    '<div class="callout-header">&#10003; Geschafft!</div>' +
    '<p>Du hast deine erste forensische Ordnerstruktur erstellt und eine komplette Arbeitssitzung protokolliert. Das ist die Grundlage f&uuml;r jede professionelle Untersuchung.</p>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch01-grundlagen">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<div></div>' +
    '<button class="nav-btn" data-target="ch02-identifikation">Identifikation &#8594;</button>' +
    '</div>';
};

Chapters['ch02-identifikation'] = function () {
  return '<h1 class="chapter-title">Datentr&auml;ger-Identifikation</h1>' +
    '<div class="chapter-subtitle">Ger&auml;te erkennen, verifizieren und dokumentieren</div>' +
    '<p class="chapter-intro">Der h&auml;ufigste Fehler in der Forensik: das Imaging des falschen Ger&auml;ts. Bevor ein Image erstellt wird, muss das Quell-Device eindeutig identifiziert sein. Ein falsches <span class="inline-code">if=</span> bei <span class="inline-code">dd</span> ist irreversibel.</p>' +

    '<div class="feature-grid chapter-preview-grid">' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128269;</div>' +
    '<div class="feature-text">' +
    '<h3>lsblk</h3>' +
    '<p>Alle Blockger&auml;te im System auflisten</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128196;</div>' +
    '<div class="feature-text">' +
    '<h3>fdisk -l</h3>' +
    '<p>Partitionstabellen inspizieren</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128273;</div>' +
    '<div class="feature-text">' +
    '<h3>Serial Number</h3>' +
    '<p>Ger&auml;te eindeutig identifizieren</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128187;</div>' +
    '<div class="feature-text">' +
    '<h3>Terminal-&Uuml;bung</h3>' +
    '<p>Devices selbstst&auml;ndig identifizieren</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>' +

    '<h2 class="section-title"><span class="number">2.1</span> Warum vorher identifizieren?</h2>' +
    '<p>Stell dir vor: Du stehst vor einem beschlagnahmten Laptop und einem USB-Stick. Dein Kollege sagt: <em>"Mach ein Image von dem Stick."</em> Aber welches Device ist der Stick? <span class="inline-code">/dev/sda</span>? <span class="inline-code">/dev/sdb</span>? Wenn du falsch liegst, &uuml;berschreibst du die interne Festplatte statt den USB-Stick zu sichern.</p>' +
    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Der h&auml;ufigste Anf&auml;ngerfehler</div>' +
    '<p><strong>Device-Namen sind nicht stabil.</strong> <span class="inline-code">/dev/sda</span> kann je nach Reihenfolge des Ansteckens ein anderes Ger&auml;t sein. Deshalb: <strong>Immer identifizieren, nie raten.</strong></p>' +
    '</div>' +

    '<div class="exercise-start-banner">' +
    '<div class="exercise-start-icon">&#128187;</div>' +
    '<div class="exercise-start-text"><strong>Terminal-&Uuml;bung beginnt jetzt!</strong><br>Du wirst in 5 Schritten lernen, Ger&auml;te forensisch sicher zu identifizieren.</div>' +
    '</div>' +
    '<p><strong>Was dich erwartet:</strong></p>' +
    '<ol>' +
    '<li><strong>Alle Blockger&auml;te anzeigen</strong> &ndash; Mit <span class="inline-code">lsblk</span> den &Uuml;berblick gewinnen</li>' +
    '<li><strong>Partitionstabelle lesen</strong> &ndash; Mit <span class="inline-code">fdisk -l</span> Details pr&uuml;fen</li>' +
    '<li><strong>Serial Number dokumentieren</strong> &ndash; Mit <span class="inline-code">hdparm</span> eindeutige ID sichern</li>' +
    '<li><strong>Ger&auml;t verifizieren</strong> &ndash; Mit <span class="inline-code">blkid</span> Dateisystem-Typ bestimmen</li>' +
    '<li><strong>Entscheidungsfrage</strong> &ndash; Das richtige Device w&auml;hlen</li>' +
    '</ol>' +

    '<h2 class="section-title"><span class="number">2.2</span> &Uuml;bung: Alle Blockger&auml;te anzeigen</h2>' +
    '<p>Der wichtigste Befehl in der Forensik: <span class="inline-code">lsblk</span>. Er zeigt dir alle Blockger&auml;te &ndash; Festplatten, USB-Sticks, NVMe-SSDs. Ohne diesen Befehl f&auml;ngst du nichts an.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>NAME        SIZE  TYPE MOUNTPOINT MODEL\nsda         500G  disk            Samsung SSD 860\n├─sda1      512M  part /boot\n├─sda2      499G  part /\nsdb          16G  disk            SanDisk USB\n└─sdb1       16G  part\nnvme0n1     512G  disk            Samsung NVMe 970\n└─nvme0n1p1 512G  part</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">lsblk</span></td><td><strong>l</strong>i<strong>s</strong>t <strong>bl</strong>oc<strong>k</strong> &ndash; zeigt alle Blockger&auml;te an</td></tr>' +
    '<tr><td><span class="inline-code">-o NAME,SIZE,...</span></td><td>Definiert welche Spalten angezeigt werden</td></tr>' +
    '<tr><td><span class="inline-code">NAME</span></td><td>Device-Name (sda, sdb, nvme0n1...)</td></tr>' +
    '<tr><td><span class="inline-code">SIZE</span></td><td>Gesamtgr&ouml;&szlig;e des Ger&auml;ts</td></tr>' +
    '<tr><td><span class="inline-code">TYPE</span></td><td>disk = ganze Platte, part = Partition</td></tr>' +
    '<tr><td><span class="inline-code">MOUNTPOINT</span></td><td>Wo ist das Ger&auml;t eingeh&auml;ngt? <strong>Muss bei Beweismittel leer sein!</strong></td></tr>' +
    '<tr><td><span class="inline-code">MODEL</span></td><td>Hersteller/Modell &ndash; hilft bei der Zuordnung</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Was du sehen musst</div>' +
    '<p>Bevor du ein Image erstellst, pr&uuml;fe: <strong>Ist der Mountpoint leer?</strong> Wenn dort <span class="inline-code">/</span> oder <span class="inline-code">/home</span> steht, ist das die Systemplatte &ndash; nicht der USB-Stick! Der Beweis-Datentr&auml;ger darf <strong>nicht gemountet</strong> sein.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">2.3</span> &Uuml;bung: Partitionstabelle lesen</h2>' +
    '<p>Du hast den USB-Stick als <span class="inline-code">/dev/sdb</span> identifiziert. Jetzt schaust du dir die Partitionen an. Mit <span class="inline-code">fdisk -l</span> siehst du Sektorgr&ouml;&szlig;e, Partitionstyp (MBR/GPT), Start-/Endsektoren und IDs jeder Partition.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>fdisk -l /dev/sdb</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>Disk /dev/sdb: 16 GiB, 17179869184 bytes, 33554432 sectors\nDisk model: SanDisk USB\nUnits: sectors of 1 * 512 = 512 bytes\nSector size (logical/physical): 512 bytes / 512 bytes\nDisklabel type: dos\nDisk identifier: 0xc3d4e5f6\n\nDevice      Boot Start       End   Sectors  Size Id Type\n/dev/sdb1         2048  33554431  33552384   16G  b W95 FAT32</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">fdisk -l</span></td><td><strong>l</strong>ist &ndash; zeigt Partitionstabelle ohne Interaktion an</td></tr>' +
    '<tr><td><span class="inline-code">/dev/sdb</span></td><td>Das Device das du pr&uuml;fen willst</td></tr>' +
    '<tr><td><span class="inline-code">Disklabel type: dos</span></td><td>MBR-Partitionstabelle (modern w&auml;re "gpt")</td></tr>' +
    '<tr><td><span class="inline-code">Start: 2048</span></td><td>Startsektor &ndash; wichtig f&uuml;r Offset-Berechnung beim Mounten</td></tr>' +
    '<tr><td><span class="inline-code">Id: b</span></td><td>Partitionstyp-Code: b = W95 FAT32</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Warum fdisk vor dem Imaging?</div>' +
    '<p>Wenn du sp&auml;ter beim Mounten die Partition einh&auml;ngen willst, brauchst du den Startsektor. Der Offset wird berechnet: <span class="inline-code">Startsektor &times; 512</span>. In diesem Fall: <span class="inline-code">2048 &times; 512 = 1048576</span>. Das merkst du dir f&uuml;r das Kapitel Mounten.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">2.4</span> &Uuml;bung: Serial Number dokumentieren</h2>' +
    '<p>Der Device-Name <span class="inline-code">/dev/sdb</span> kann sich &auml;ndern &ndash; je nachdem in welcher Reihenfolge Ger&auml;te angesteckt werden. Die Serial Number ist <strong>fest</strong> und verkn&uuml;pft das digitale Image eindeutig mit dem physischen Beweisst&uuml;ck.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>hdparm -I /dev/sdb | grep "Serial Number"</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>  Serial Number:      4C5300011602181052</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">hdparm</span></td><td>Tool f&uuml;r ATA/IDE-Ger&auml;te-Informationen</td></tr>' +
    '<tr><td><span class="inline-code">-I</span></td><td>Zeigt alle Identifikationsdaten des Ger&auml;ts an</td></tr>' +
    '<tr><td><span class="inline-code">| grep "Serial Number"</span></td><td>Filtert nur die Seriennummer heraus</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Chain of Custody</div>' +
    '<p>Die Serial Number dokumentierst du im Protokoll. So kann sp&auml;ter nachgewiesen werden: <em>"Das Image X stammt vom USB-Stick mit Seriennummer Y."</em> Das ist die Grundlage der Beweiskette (Chain of Custody).</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">2.5</span> &Uuml;bung: Dateisystem-Typ bestimmen</h2>' +
    '<p>Bevor du mountest, musst du wissen welches Dateisystem auf der Partition liegt. <span class="inline-code">blkid</span> zeigt dir das zusammen mit der eindeutigen PARTUUID:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>blkid /dev/sdb1</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>/dev/sdb1: UUID="a1b2-c3d4-e5f6-7890" TYPE="vfat" PARTUUID="c3d4e5f6-01"</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">blkid</span></td><td>Block Device ID &ndash; identifiziert Dateisystem und UUID</td></tr>' +
    '<tr><td><span class="inline-code">UUID</span></td><td>Eindeutige ID der Partition</td></tr>' +
    '<tr><td><span class="inline-code">TYPE="vfat"</span></td><td>Dateisystem-Typ: vfat = FAT32</td></tr>' +
    '<tr><td><span class="inline-code">PARTUUID</span></td><td>Eindeutige Partitions-ID (f&uuml;r GPT)</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Warum TYPE wichtig ist</div>' +
    '<p>Beim Mounten musst du manchmal den Dateisystem-Typ angeben. <span class="inline-code">TYPE="vfat"</span> bedeutet, du mountest mit <span class="inline-code">-t vfat</span>. Das lernst du im n&auml;chsten Kapitel.</p>' +
    '</div>' +

    '<div class="decision-card">' +
    '<div class="question">Du m&ouml;chtest ein Image von einem USB-Stick erstellen. lsblk zeigt sda (500GB SSD, gemounted auf /) und sdb (16GB USB). Welches Device verwendest du als Quelle?</div>' +
    '<div class="decision-options">' +
    '<div class="decision-option" data-correct="false" data-feedback="/dev/sda ist die System-SSD &ndash; ein Image davon w&auml;re falsch und potenziell gef&auml;hrlich."><span class="inline-code">/dev/sda</span> &ndash; das gr&ouml;&szlig;ere Device</div>' +
    '<div class="decision-option" data-correct="true" data-feedback="Genau! Der USB-Stick ist das Ziel-Device. lsblk best&auml;tigt: 16GB, kein Mountpoint, Modell SanDisk USB."><span class="inline-code">/dev/sdb</span> &ndash; der USB-Stick laut lsblk</div>' +
    '<div class="decision-option" data-correct="false" data-feedback="Es ist kein NVMe-Ger&auml;t vorhanden, und du musst das korrekte Device anhand von lsblk identifizieren."><span class="inline-code">/dev/nvme0n1</span> &ndash; das NVMe-Device</div>' +
    '</div>' +
    '<div class="decision-feedback"></div>' +
    '</div>' +

    '<div class="callout callout-success">' +
    '<div class="callout-header">&#10003; Zusammenfassung</div>' +
    '<p>Du kannst jetzt Ger&auml;te mit <span class="inline-code">lsblk</span> auflisten, mit <span class="inline-code">fdisk -l</span> Partitionen inspizieren, mit <span class="inline-code">hdparm</span> die Serial Number dokumentieren und mit <span class="inline-code">blkid</span> das Dateisystem bestimmen. Das ist die Grundlage f&uuml;r jedes Imaging.</p>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch02-identifikation">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch01-grundlagen">&#8592; Grundlagen</button>' +
    '<button class="nav-btn" data-target="ch03-imaging">Imaging &#8594;</button>' +
    '</div>';
};

Chapters['ch03-imaging'] = function () {
  return '<h1 class="chapter-title">Forensische Datensicherung</h1>' +
    '<div class="chapter-subtitle">Beweismittel-sichere Methoden mit dd, dc3dd &amp; E01</div>' +
    '<p class="chapter-intro">Jetzt wo du das Device identifiziert hast, erstellst du eine bit-genaue Kopie. Das ist der wichtigste Schritt: das forensische Image. Ohne g&uuml;ltiges Image keine Analyse.</p>' +

    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Der kritischste Moment</div>' +
    '<p><span class="inline-code">if=</span> = Quelle (Original), <span class="inline-code">of=</span> = Ziel (Image-Datei). Vertauschst du beide, <strong>zerst&ouml;rst du das Original unwiderruflich</strong>. Pr&uuml;fe immer zweimal vor dem Dr&uuml;cken von Enter.</p>' +
    '</div>' +

    '<div class="feature-grid chapter-preview-grid">' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128190;</div>' +
    '<div class="feature-text">' +
    '<h3>dd</h3>' +
    '<p>Das Standard-Imaging-Tool</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128272;</div>' +
    '<div class="feature-text">' +
    '<h3>dc3dd</h3>' +
    '<p>Forensisches dd mit Hashing</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128230;</div>' +
    '<div class="feature-text">' +
    '<h3>E01</h3>' +
    '<p>Branchenstandard-Format</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128187;</div>' +
    '<div class="feature-text">' +
    '<h3>Terminal-&Uuml;bung</h3>' +
    '<p>Ein Image selbst erstellen</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>' +

    '<h2 class="section-title"><span class="number">3.1</span> Was ist ein forensisches Image?</h2>' +
    '<p>Ein forensisches Image ist eine <strong>bit-genaue Kopie</strong> des gesamten Datentr&auml;gers &ndash; Byte f&uuml;r Byte. Nicht nur die Dateien, sondern auch:</p>' +
    '<ul>' +
    '<li>Der <strong>Master Boot Record</strong> (MBR) mit der Partitionstabelle</li>' +
    '<li><strong>Gel&ouml;schte Dateien</strong> die noch auf der Platte liegen</li>' +
    '<li><strong>Freier Speicherplatz</strong> (Slack Space)</li>' +
    '<li>Die <strong>Partitionstabelle</strong> und versteckte Bereiche</li>' +
    '</ul>' +
    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Warum kein einfaches Kopieren?</div>' +
    '<p>Ein normales <span class="inline-code">cp</span> kopiert nur Dateien. Gel&ouml;schte Daten, der MBR und versteckte Bereiche gehen verloren. Ein forensisches Image sichert <strong>alles</strong>.</p>' +
    '</div>' +

    '<div class="exercise-start-banner">' +
    '<div class="exercise-start-icon">&#128187;</div>' +
    '<div class="exercise-start-text"><strong>Terminal-&Uuml;bung beginnt jetzt!</strong><br>Du wirst in 4 Schritten lernen, ein forensisches Image zu erstellen.</div>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">3.2</span> &Uuml;bung: dd &ndash; Standard-Imaging</h2>' +
    '<p>Das klassische Tool f&uuml;r bit-genaue Kopien. Du hast den USB-Stick als <span class="inline-code">/dev/sdb</span> identifiziert. Jetzt sicherst du ihn:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>dd if=/dev/sdb of=/cases/case-001/images/usb-stick.img bs=16M conv=noerror,sync status=progress</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>1024+0 Datens&#228;tze ein\n1024+0 Datens&#228;tze aus\n17179869184 bytes (16.0 GB) kopiert, 1024 s, 16.0 MB/s</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">dd</span></td><td><strong>d</strong>ata <strong>d</strong>uplicator &ndash; bit-genaues Kopieren</td></tr>' +
    '<tr><td><span class="inline-code">if=/dev/sdb</span></td><td><strong>i</strong>nput <strong>f</strong>ile &ndash; Quelle: der USB-Stick (Original)</td></tr>' +
    '<tr><td><span class="inline-code">of=/cases/.../usb-stick.img</span></td><td><strong>o</strong>utput <strong>f</strong>ile &ndash; Ziel: die Image-Datei</td></tr>' +
    '<tr><td><span class="inline-code">bs=16M</span></td><td><strong>b</strong>lock <strong>s</strong>ize &ndash; 16 MiB pro Lesezugriff (schnell und forensisch ausreichend)</td></tr>' +
    '<tr><td><span class="inline-code">conv=noerror</span></td><td>Bei Lesefehlern weitermachen (wichtig bei besch&auml;digten Datentr&auml;gern)</td></tr>' +
    '<tr><td><span class="inline-code">conv=sync</span></td><td>Fehlende Bytes mit Nullen auff&uuml;llen (Offset-Position bleibt erhalten)</td></tr>' +
    '<tr><td><span class="inline-code">status=progress</span></td><td>Zeigt Fortschrittsanzeige w&auml;hrend des Imaging</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Blocksize-Werte im Vergleich</div>' +
    '<p><span class="inline-code">bs=512</span> = sektor-genau aber sehr langsam | <span class="inline-code">bs=1M</span> = guter Kompromiss | <span class="inline-code">bs=16M</span> = empfohlen f&uuml;r Forensik | <span class="inline-code">bs=64M</span> = sehr schnell, mehr Speicherbedarf</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">3.3</span> &Uuml;bung: dc3dd &ndash; Forensisches dd mit Hashing</h2>' +
    '<p>dc3dd ist eine forensische Erweiterung von dd. Der Vorteil: Es berechnet <strong>automatisch den Hash w&auml;hrend des Imaging</strong> und schreibt ein detailliertes Log. So hast du Hash und Image in einem Durchgang.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>dc3dd if=/dev/sdb of=/cases/case-001/images/usb-stick.img hash=sha256 log=/cases/case-001/notes/imaging.log</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>dd: kopiere /dev/sdb -&gt; /cases/case-001/images/usb-stick.img\n17179869184 bytes (16 GB) kopiert\nsha256: a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456\nLog: /cases/case-001/notes/imaging.log\nImaging abgeschlossen.</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">dc3dd</span></td><td>DoD Computer Forensics Lab dd &ndash; forensische dd-Variante</td></tr>' +
    '<tr><td><span class="inline-code">hash=sha256</span></td><td>Berechnet SHA-256 Hash w&auml;hrend des Imaging</td></tr>' +
    '<tr><td><span class="inline-code">log=</span></td><td>Schreibt detailliertes Protokoll in die angegebene Datei</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; dd vs. dc3dd</div>' +
    '<p>Mit normalem <span class="inline-code">dd</span> musst du den Hash in einem separaten Schritt berechnen. <span class="inline-code">dc3dd</span> macht beides gleichzeitig &ndash; spart Zeit und dokumentiert automatisch. Beide Methoden sind forensisch gleichwertig.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">3.4</span> E01-Format (Expert Witness)</h2>' +
    '<p>E01 ist der <strong>Branchenstandard</strong> in der digitalen Forensik. Es enth&auml;lt nicht nur die Daten, sondern auch Kompression, Hashing und Metadaten in einer Datei:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ewfacquire /dev/sdb -c case-001 -e "Analyst" -d sha256 -t usb-stick</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">ewfacquire</span></td><td>Tool zum Erstellen von E01-Images (libewf)</td></tr>' +
    '<tr><td><span class="inline-code">-c case-001</span></td><td>Case-Nummer f&uuml;r die Metadaten</td></tr>' +
    '<tr><td><span class="inline-code">-e "Analyst"</span></td><td>Name des Untersuchers</td></tr>' +
    '<tr><td><span class="inline-code">-d sha256</span></td><td>Hash-Algorithmus f&uuml;r Verifikation</td></tr>' +
    '<tr><td><span class="inline-code">-t usb-stick</span></td><td>Basis-Dateiname des Images</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-success">' +
    '<div class="callout-header">&#10003; Vorteile E01</div>' +
    '<ul>' +
    '<li>Integrierte <strong>Kompression</strong> (ca. 40-60% Ersparnis)</li>' +
    '<li>Automatische <strong>Hash-Verifikation</strong> eingebaut</li>' +
    '<li><strong>Metadaten</strong> (Case-Nummer, Examiner, Timestamps)</li>' +
    '<li>Unterst&uuml;tzt von EnCase, FTK, Autopsy, Sleuth Kit</li>' +
    '</ul>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">3.5</span> Komprimiertes Image (Pipeline)</h2>' +
    '<p>Wenn du dd-Images mit Kompression erstellen willst, kannst du eine Pipeline verwenden:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>dd if=/dev/sdb bs=16M conv=noerror,sync | gzip &gt; /cases/case-001/images/usb-stick.img.gz</code></pre></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Pipeline erkl&auml;rt</div>' +
    '<p>Das <span class="inline-code">|</span> (Pipe) leitet die Ausgabe von <span class="inline-code">dd</span> direkt an <span class="inline-code">gzip</span> weiter. Das Image wird <strong>w&auml;hrend des Schreibens komprimiert</strong>. F&uuml;r die Analyse musst du es zuerst dekomprimieren: <span class="inline-code">gunzip usb-stick.img.gz</span></p>' +
    '</div>' +

    '<div class="decision-card">' +
    '<div class="question">Was bewirkt <span class="inline-code">conv=sync</span> beim dd-Befehl?</div>' +
    '<div class="decision-options">' +
    '<div class="decision-option" data-correct="false" data-feedback="sync hat nichts mit Synchronisation von Dateisystemen zu tun.">Synchronisiert das Dateisystem nach dem Kopieren</div>' +
    '<div class="decision-option" data-correct="true" data-feedback="Richtig! Bei Lesefehlern f&uuml;llt sync die fehlenden Bytes mit Nullen auf, sodass die Offset-Position erhalten bleibt.">F&uuml;llt fehlende Bytes mit Nullen auf, um Offset-Position zu erhalten</div>' +
    '<div class="decision-option" data-correct="false" data-feedback="sync steuert nicht die Blocksize sondern die Behandlung von Lesefehlern.">Setzt die Blocksize auf die Sektorgr&ouml;&szlig;e</div>' +
    '</div>' +
    '<div class="decision-feedback"></div>' +
    '</div>' +

    '<div class="callout callout-success">' +
    '<div class="callout-header">&#10003; Zusammenfassung</div>' +
    '<p>Du kannst jetzt forensische Images erstellen mit <span class="inline-code">dd</span> (Standard), <span class="inline-code">dc3dd</span> (mit integriertem Hash) und <span class="inline-code">ewfacquire</span> (E01-Format). Im n&auml;chsten Kapitel lernst du, wie du die Integrit&auml;t des Images mit Hashes verifizierst.</p>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch03-imaging">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch02-identifikation">&#8592; Identifikation</button>' +
    '<button class="nav-btn" data-target="ch04-hashing">Hashing &#8594;</button>' +
    '</div>';
};

Chapters['ch04-hashing'] = function () {
  return '<h1 class="chapter-title">Hashing &amp; Beweisintegrit&auml;t</h1>' +
    '<div class="chapter-subtitle">SHA-256, MD5 &amp; gerichtsverwertbare Verifikation</div>' +
    '<p class="chapter-intro">Ein Hash ist der digitale Fingerabdruck eines Datentr&auml;gers. Er beweist, dass das Image bit-genau mit dem Original &uuml;bereinstimmt. Ohne Hash-Werte ist ein forensisches Image vor Gericht nicht verwertbar.</p>' +

    '<div class="feature-grid chapter-preview-grid">' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128273;</div>' +
    '<div class="feature-text">' +
    '<h3>SHA-256</h3>' +
    '<p>Der Standard-Hash f&uuml;r Forensik</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128260;</div>' +
    '<div class="feature-text">' +
    '<h3>Vorher &amp; Nachher</h3>' +
    '<p>Original hashen, Image hashen, vergleichen</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#9989;</div>' +
    '<div class="feature-text">' +
    '<h3>Verifikation</h3>' +
    '<p>Hash-Gleichheit = bit-genau</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128187;</div>' +
    '<div class="feature-text">' +
    '<h3>Terminal-&Uuml;bung</h3>' +
    '<p>Den kompletten Hash-Workflow &uuml;ben</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>' +

    '<h2 class="section-title"><span class="number">4.1</span> Was ist ein Hash?</h2>' +
    '<p>Ein Hash ist eine Art <strong>digitaler Fingerabdruck</strong>: Egal ob die Datei 1 Byte oder 1 Terabyte gro&szlig; ist, der Hash ist immer gleich lang (64 Zeichen bei SHA-256). Wenn sich auch nur <strong>ein einziges Bit</strong> &auml;ndert, ist der Hash komplett anders.</p>' +
    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Avalanche-Effekt</div>' +
    '<p>SHA-256 ist so konzipiert, dass jede &Auml;nderung &ndash; auch ein einzelnes Bit &ndash; einen komplett anderen Hash erzeugt. Das nennt man Avalanche-Effekt. Das ist die Grundlage der Beweisintegrit&auml;t.</p>' +
    '</div>' +

    '<div class="exercise-start-banner">' +
    '<div class="exercise-start-icon">&#128187;</div>' +
    '<div class="exercise-start-text"><strong>Terminal-&Uuml;bung beginnt jetzt!</strong><br>Du wirst in 5 Schritten den kompletten Hash-Workflow durchf&uuml;hren.</div>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">4.2</span> &Uuml;bung: Hash des Originals erstellen</h2>' +
    '<p>Der erste Hash wird <strong>VOR dem Imaging</strong> direkt vom Original-Device erstellt. Das ist dein Referenzwert:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>sha256sum /dev/sdb &gt; /cases/case-001/hashes/original.sha256</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>(keine Ausgabe - Hash wird in Datei geschrieben)</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">sha256sum</span></td><td>Berechnet den SHA-256 Hash der angegebenen Datei/Device</td></tr>' +
    '<tr><td><span class="inline-code">/dev/sdb</span></td><td>Das Original-Device (der USB-Stick)</td></tr>' +
    '<tr><td><span class="inline-code">&gt;</span></td><td>Leitet die Ausgabe in eine Datei um (statt auf dem Bildschirm)</td></tr>' +
    '<tr><td><span class="inline-code">hashes/original.sha256</span></td><td>Datei in der der Hash gespeichert wird</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Warum VOR dem Imaging?</div>' +
    '<p>Dieser Hash ist dein Referenzwert. Sp&auml;ter vergleichst du den Image-Hash damit. Sind beide identisch, beweist das: Das Image ist eine bit-genaue Kopie des Originals.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">4.3</span> &Uuml;bung: Original-Hash anzeigen</h2>' +
    '<p>Lass dir den gespeicherten Hash anzeigen, damit du siehst wie er aussieht:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>cat /cases/case-001/hashes/original.sha256</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456  /dev/sdb</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">a1b2c3d4e5f6...</span></td><td>Der 64-stellige SHA-256 Hash (hexadezimal)</td></tr>' +
    '<tr><td><span class="inline-code">/dev/sdb</span></td><td>Die Datei/Device von der der Hash berechnet wurde</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">4.4</span> &Uuml;bung: Hash des Images erstellen</h2>' +
    '<p>Nach dem Imaging (Kapitel 3) berechnest du den Hash der Image-Datei:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>sha256sum /cases/case-001/images/usb-stick.img &gt; /cases/case-001/hashes/image.sha256</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>(keine Ausgabe - Hash wird in Datei geschrieben)</code></pre></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Das dauert lange!</div>' +
    '<p>Das Hashen des gesamten Devices kann bei gro&szlig;en Datentr&auml;gern sehr lange dauern. Mit <span class="inline-code">dc3dd</span> (Kapitel 3) kannst du Hash und Image in einem Durchgang erstellen.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">4.5</span> &Uuml;bung: Hashes vergleichen</h2>' +
    '<p>Jetzt der entscheidende Moment: Sind beide Hashes identisch? Wenn ja, ist dein Image forensisch verwertbar:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>cat /cases/case-001/hashes/original.sha256 && cat /cases/case-001/hashes/image.sha256</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456  /dev/sdb\na1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456  /cases/case-001/images/usb-stick.img</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">&amp;&amp;</span></td><td>F&uuml;hrt den zweiten Befehl aus wenn der erste erfolgreich war</td></tr>' +
    '<tr><td>Zeile 1 vs. Zeile 2</td><td><strong>Beide Hashes m&uuml;ssen identisch sein!</strong> Dann ist das Image bit-genau.</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">4.6</span> &Uuml;bung: Automatische Verifikation</h2>' +
    '<p>Statt manuell zu vergleichen, nutze den <span class="inline-code">-c</span>-Flag f&uuml;r automatische Verifikation:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>sha256sum -c /cases/case-001/hashes/image.sha256</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>Pruefe /cases/case-001/hashes/image.sha256...\nimage.sha256: OK</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">-c</span></td><td><strong>c</strong>heck &ndash; verifiziert eine Datei gegen einen gespeicherten Hash</td></tr>' +
    '<tr><td><span class="inline-code">: OK</span></td><td>Hash stimmt &uuml;berein &ndash; Image ist intakt</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wenn FEHLGESCHLAGEN erscheint</div>' +
    '<p>Dann wurde das Image nach dem Hashen ver&auml;ndert. Die Integrit&auml;t ist kompromittiert. Ursache untersuchen, nie einfach neu erstellen!</p>' +
    '</div>' +

    '<div class="decision-card">' +
    '<div class="question">Ein einzelnes Bit im Original-Datentr&auml;ger &auml;ndert sich NACH dem Imaging. Was passiert mit dem Original-Hash?</div>' +
    '<div class="decision-options">' +
    '<div class="decision-option" data-correct="false" data-feedback="SHA-256 ist nicht deterministisch &ndash; der Hash &auml;ndert sich bei jedem Bit-Unterschied.">Der Hash bleibt gleich, weil sich nur ein Bit ge&auml;ndert hat</div>' +
    '<div class="decision-option" data-correct="true" data-feedback="Korrekt! SHA-256 ist so konzipiert, dass jede &Auml;nderung &ndash; auch ein einzelnes Bit &ndash; einen komplett anderen Hash erzeugt. Das ist die Grundlage der Integrit&auml;tspr&uuml;fung.">Der Hash &auml;ndert sich komplett (Avalanche-Effekt)</div>' +
    '<div class="decision-option" data-correct="false" data-feedback="Nur neue Hashes w&uuml;rden anders sein &ndash; aber der bereits gespeicherte Hash-Wert bleibt nat&uuml;rlich gleich.">Nur neue Hashes sind betroffen, alte bleiben g&uuml;ltig</div>' +
    '</div>' +
    '<div class="decision-feedback"></div>' +
    '</div>' +

    '<div class="callout callout-success">' +
    '<div class="callout-header">&#10003; Zusammenfassung</div>' +
    '<p>Du kannst jetzt: Original hashen, Image hashen, beide vergleichen und mit <span class="inline-code">sha256sum -c</span> automatisch verifizieren. Wenn beide Hashes identisch sind, ist dein Image forensisch verwertbar. Im n&auml;chsten Kapitel mountest du das Image zur Analyse.</p>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch04-hashing">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch03-imaging">&#8592; Imaging</button>' +
    '<button class="nav-btn" data-target="ch05-mounting">Mounten &#8594;</button>' +
    '</div>';
};

Chapters['ch05-mounting'] = function () {
  return '<h1 class="chapter-title">Mounten &amp; Beweisaufnahme</h1>' +
    '<div class="chapter-subtitle">Read-only Mounts, Loop-Devices &amp; Offset-Berechnung</div>' +
    '<p class="chapter-intro">Du hast das Image erstellt und verifiziert. Jetzt m&ouml;chtest du dir die Dateien ansehen. Daf&uuml;r musst du das Image mounten &ndash; aber <strong>nur read-only</strong>.</p>' +

    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Goldene Regel</div>' +
    '<p>Forensische Images werden <strong>IMMER read-only</strong> gemountet. Ein versehentlicher Schreibzugriff ver&auml;ndert das Image, die Hashes stimmen nicht mehr, und das Image ist forensisch unbrauchbar.</p>' +
    '</div>' +

    '<div class="feature-grid chapter-preview-grid">' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128274;</div>' +
    '<div class="feature-text">' +
    '<h3>Read-Only</h3>' +
    '<p>Image schreibgesch&uuml;tzt einh&auml;ngen</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128250;</div>' +
    '<div class="feature-text">' +
    '<h3>Loop-Device</h3>' +
    '<p>Image-Datei als Device bereitstellen</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#129513;</div>' +
    '<div class="feature-text">' +
    '<h3>Offset</h3>' +
    '<p>Partition innerhalb des Images ansprechen</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128187;</div>' +
    '<div class="feature-text">' +
    '<h3>Terminal-&Uuml;bung</h3>' +
    '<p>Image selbst mounten und analysieren</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>' +

    '<h2 class="section-title"><span class="number">5.1</span> Was ist Mounten?</h2>' +
    '<p>Ein Image ist eine einzelne Datei &ndash; du kannst sie nicht wie einen Ordner &ouml;ffnen. <strong>Mounten</strong> macht die Datei als Verzeichnis zug&auml;nglich. Das Betriebssystem "h&auml;ngt" das Dateisystem aus dem Image in einen Ordner ein.</p>' +
    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Loop-Device</div>' +
    '<p>Da du keine physische Festplatte hast, sondern eine Image-Datei, brauchst du ein <strong>Loop-Device</strong>. Das ist ein virtuelles Device, das eine Datei wie eine Festplatte zug&auml;nglich macht.</p>' +
    '</div>' +

    '<div class="exercise-start-banner">' +
    '<div class="exercise-start-icon">&#128187;</div>' +
    '<div class="exercise-start-text"><strong>Terminal-&Uuml;bung beginnt jetzt!</strong><br>Du wirst in 4 Schritten lernen, ein forensisches Image zu mounten.</div>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">5.2</span> &Uuml;bung: Partitionen im Image finden</h2>' +
    '<p>Bevor du mountest, musst du wissen wo die Partition im Image beginnt. Das ermittelst du mit <span class="inline-code">fdisk -l</span>:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>fdisk -l /cases/case-001/images/usb-stick.img</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>Disk /cases/case-001/images/usb-stick.img: 16 GiB, 17179869184 bytes, 33554432 sectors\nDisk model: SanDisk USB\nUnits: sectors of 1 * 512 = 512 bytes\nSector size (logical/physical): 512 bytes / 512 bytes\nDisklabel type: dos\nDisk identifier: 0xc3d4e5f6\n\nDevice      Boot Start       End   Sectors  Size Id Type\n/dev/sdb1         2048  33554431  33552384   16G  b W95 FAT32</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">fdisk -l</span></td><td>Zeigt die Partitionstabelle des Images an</td></tr>' +
    '<tr><td><span class="inline-code">Start: 2048</span></td><td><strong>Der Startsektor der Partition</strong> &ndash; brauchen wir f&uuml;r den Offset</td></tr>' +
    '<tr><td><span class="inline-code">Sektorgr&ouml;&szlig;e: 512</span></td><td>Bytes pro Sektor &ndash; brauchen wir f&uuml;r die Berechnung</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Offset berechnen</div>' +
    '<p><strong>Offset = Startsektor &times; Sektorgr&ouml;&szlig;e</strong></p>' +
    '<p>In diesem Fall: <span class="inline-code">2048 &times; 512 = 1048576</span></p>' +
    '<p>Diesen Offset brauchst du im n&auml;chsten Schritt beim Mounten.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">5.3</span> &Uuml;bung: Image read-only mounten</h2>' +
    '<p>Jetzt mountest du die Partition innerhalb des Images. Wichtig: <strong>immer -o ro</strong> (read-only)!</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>mkdir -p /cases/case-001/mounts/part1 && mount -o ro,loop,offset=1048576 /cases/case-001/images/usb-stick.img /cases/case-001/mounts/part1</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>/cases/case-001/images/usb-stick.img -&gt; /cases/case-001/mounts/part1 (read-only)</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">mkdir -p</span></td><td>Erstellt den Mountpoint-Ordner (falls nicht vorhanden)</td></tr>' +
    '<tr><td><span class="inline-code">-o ro</span></td><td><strong>r</strong>ead-<strong>o</strong>nly &ndash; verhindert jegliche Schreibzugriffe!</td></tr>' +
    '<tr><td><span class="inline-code">-o loop</span></td><td>Nutzt ein Loop-Device (Image als virtuelle Festplatte)</td></tr>' +
    '<tr><td><span class="inline-code">-o offset=1048576</span></td><td>Startet bei Byte 1048576 (berechnet: 2048 &times; 512)</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">5.4</span> &Uuml;bung: Inhalt anzeigen</h2>' +
    '<p>Pr&uuml;fe ob der Mount funktioniert hat, indem du dir den Inhalt ansiehst:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ls -la /cases/case-001/mounts/part1</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>total 128\ndrwxr-xr-x 4 root root  16384 Jan 15 09:23 .\ndrwxr-xr-x 3 root root   4096 Jan 15 10:00 ..\ndrwxr-xr-x 2 root root   4096 Jan 15 09:23 documents\n-rw-r--r-- 1 root root  45231 Jan 15 09:23 notes.txt\ndrwxr-xr-x 2 root root   4096 Jan 15 09:23 pictures</code></pre></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Was jetzt?</div>' +
    '<p>Das Image ist jetzt gemountet. Du kannst alle Dateien lesen, durchsuchen und analysieren &ndash; aber nicht ver&auml;ndern. Die n&auml;chsten Kapitel (Hex-Analyse, Strings) zeigen dir wie.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">5.5</span> Cleanup: Image wieder unmounten</h2>' +
    '<p>Nach der Analyse r&auml;umst du auf. Immer sauber unmounten:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>umount /cases/case-001/mounts/part1</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>(keine Ausgabe = Erfolg! Image ist ausgeh&auml;ngt.)</code></pre></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; E01-Images mounten</div>' +
    '<p>E01-Images ben&ouml;tigen einen zus&auml;tzlichen Schritt: <span class="inline-code">ewfmount image.E01 /mnt/ewf</span> stellt das E01 als Raw-Device bereit. Danach mountest du das Raw-Device wie oben beschrieben.</p>' +
    '</div>' +

    '<div class="decision-card">' +
    '<div class="question">Du mountest ein forensisches Image und vergisst <span class="inline-code">-o ro</span>. Was passiert?</div>' +
    '<div class="decision-options">' +
    '<div class="decision-option" data-correct="false" data-feedback="Ohne ro wird das Image normal mit Schreibzugriff gemountet.">Das Image wird automatisch read-only gemountet</div>' +
    '<div class="decision-option" data-correct="true" data-feedback="Genau! Ohne -o ro wird das Image read-write gemountet. Schreibzugriffe ver&auml;ndern das Image und machen es forensisch unbrauchbar. Hash-Werte stimmen nicht mehr.">Das Image wird read-write gemountet &ndash; Beweismaterial k&ouml;nnte ver&auml;ndert werden</div>' +
    '<div class="decision-option" data-correct="false" data-feedback="Der Mount-Befehl schl&auml;gt nicht fehl, sondern mountet read-write.">Der Mount-Befehl schl&auml;gt mit einer Fehlermeldung fehl</div>' +
    '</div>' +
    '<div class="decision-feedback"></div>' +
    '</div>' +

    '<div class="callout callout-success">' +
    '<div class="callout-header">&#10003; Zusammenfassung</div>' +
    '<p>Du kannst jetzt: Partitionen im Image finden, den Offset berechnen, das Image read-only mounten und sauber unmounten. Im n&auml;chsten Kapitel lernst du, den Inhalt auf Byte-Ebene zu analysieren.</p>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch05-mounting">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch04-hashing">&#8592; Hashing</button>' +
    '<button class="nav-btn" data-target="ch06-hex">Hex-Analyse &#8594;</button>' +
    '</div>';
};

Chapters['ch06-hex'] = function () {
  return '<h1 class="chapter-title">Hex- &amp; Bin&auml;ranalyse</h1>' +
    '<div class="chapter-subtitle">Hex-Dumps, MBR-Signatur &amp; Beweissicherung auf Byte-Ebene</div>' +
    '<p class="chapter-intro">Manchmal musst du beweisen, dass ein Datentr&auml;ger bootf&auml;hig war. Die Verteidigung bestreitet oft das Vorhandensein eines MBR. Hex-Analyse liefert den unwiderlegbaren Beweis.</p>' +

    '<div class="feature-grid chapter-preview-grid">' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128209;</div>' +
    '<div class="feature-text">' +
    '<h3>xxd</h3>' +
    '<p>Hex-Dumps erstellen und lesen</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#9989;</div>' +
    '<div class="feature-text">' +
    '<h3>MBR-Signatur</h3>' +
    '<p>55 AA am Offset 510-511</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128200;</div>' +
    '<div class="feature-text">' +
    '<h3>Partitionstabelle</h3>' +
    '<p>4 Eintr&auml;ge im MBR lesen</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128187;</div>' +
    '<div class="feature-text">' +
    '<h3>Terminal-&Uuml;bung</h3>' +
    '<p>MBR selbst analysieren</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>' +

    '<h2 class="section-title"><span class="number">6.1</span> Was ist ein Hex-Dump?</h2>' +
    '<p>Ein Hex-Dump zeigt den <strong>rohen Inhalt einer Datei</strong> &ndash; Byte f&uuml;r Byte, in hexadezimaler Darstellung. In der Forensik nutzt du das um zu beweisen, dass bestimmte Datenstrukturen vorhanden sind.</p>' +
    '<div class="callout callout-info">' +
    '<div class="callout-header">&#9432; Hex-Dump Layout</div>' +
    '<p>Ein <span class="inline-code">xxd</span> Hex-Dump hat drei Spalten:</p>' +
    '<pre><code>00000000: 4d5a 9000 0300 0000  MZ..............</code></pre>' +
    '<ul>' +
    '<li><strong>Offset</strong> (links): Dateiposition hexadezimal</li>' +
    '<li><strong>Hex-Werte</strong> (Mitte): Rohe Bytes in hex</li>' +
    '<li><strong>ASCII</strong> (rechts): Lesbare Zeichen (. = nicht druckbar)</li>' +
    '</ul>' +
    '</div>' +

    '<div class="exercise-start-banner">' +
    '<div class="exercise-start-icon">&#128187;</div>' +
    '<div class="exercise-start-text"><strong>Terminal-&Uuml;bung beginnt jetzt!</strong><br>Du wirst in 3 Schritten den MBR des Images analysieren.</div>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">6.2</span> &Uuml;bung: MBR als Hex-Dump anzeigen</h2>' +
    '<p>Der MBR (Master Boot Record) sind die ersten 512 Bytes eines Datentr&auml;gers. Mit <span class="inline-code">xxd</span> zeigst du sie an:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>xxd -l 512 /cases/case-001/images/usb-stick.img</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal (Auszug):</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>00000000: eb3c 904d 5344 4f53 4641 5433 3200 0210  .&lt;.MSDOSFAT32..\n00000010: 0200 0000 00f8 0000 2000 4000 0000 0000  ........ .@.....\n...\n000001f0: 0000 0000 0000 0000 0000 0000 0000 55aa  ..............U.\nMBR-Signatur 55AA an Offset 510 gefunden.</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">xxd</span></td><td>Hex-Dump-Tool</td></tr>' +
    '<tr><td><span class="inline-code">-l 512</span></td><td>Nur die ersten 512 Bytes (1 Sektor = kompletter MBR)</td></tr>' +
    '<tr><td><span class="inline-code">55aa</span></td><td>Die MBR-Signatur an Offset 510&ndash;511 &ndash; beweist Bootf&auml;higkeit</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">6.3</span> &Uuml;bung: MBR-Signatur pr&uuml;fen</h2>' +
    '<p>Die g&uuml;ltige MBR-Signatur <span class="inline-code">55 AA</span> befindet sich an Offset 510&ndash;511. Pr&uuml;fe gezielt nur diese 2 Bytes:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>xxd -s 510 -l 2 /cases/case-001/images/usb-stick.img</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>000001fe: 55aa                                      U.</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">-s 510</span></td><td><strong>s</strong>eek &ndash; springt direkt zu Offset 510</td></tr>' +
    '<tr><td><span class="inline-code">-l 2</span></td><td>Nur 2 Bytes lesen</td></tr>' +
    '<tr><td><span class="inline-code">55aa</span></td><td>G&uuml;ltige MBR-Signatur = Datentr&auml;ger ist bootf&auml;hig</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Was bedeuten 00 00 statt 55 AA?</div>' +
    '<p>Wenn die Signatur <span class="inline-code">00 00</span> statt <span class="inline-code">55 AA</span> zeigt, ist der MBR ung&uuml;ltig. Entweder ist der Datentr&auml;ger nicht initialisiert, besch&auml;digt oder wurde genullt (Anti-Forensik).</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">6.4</span> MBR-Struktur</h2>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Offset</th><th>Gr&ouml;&szlig;e</th><th>Inhalt</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">0 &ndash; 445</span></td><td>446 Bytes</td><td>Bootstrap-Code (Bootloader)</td></tr>' +
    '<tr><td><span class="inline-code">446 &ndash; 509</span></td><td>64 Bytes</td><td>4 Partitionseintr&auml;ge (je 16 Bytes)</td></tr>' +
    '<tr><td><span class="inline-code">510 &ndash; 511</span></td><td>2 Bytes</td><td>Signatur: <span class="inline-code">55 AA</span></td></tr>' +
    '</tbody></table></div>' +

    '<div class="decision-card">' +
    '<div class="question">An welchem Offset befindet sich die MBR-Signatur <span class="inline-code">55 AA</span>?</div>' +
    '<div class="decision-options">' +
    '<div class="decision-option" data-correct="false" data-feedback="Offset 0 ist der Beginn des Bootstrap-Codes.">Offset 0&ndash;1</div>' +
    '<div class="decision-option" data-correct="false" data-feedback="256 ist die Mitte des Bootstrap-Codes.">Offset 256&ndash;257</div>' +
    '<div class="decision-option" data-correct="true" data-feedback="Richtig! Die letzten 2 Bytes des MBR sind die Signatur 55 AA.">Offset 510&ndash;511</div>' +
    '</div>' +
    '<div class="decision-feedback"></div>' +
    '</div>' +

    '<div class="callout callout-success">' +
    '<div class="callout-header">&#10003; Zusammenfassung</div>' +
    '<p>Du kannst jetzt mit <span class="inline-code">xxd</span> Hex-Dumps erstellen, gezielt Bereiche inspizieren und die MBR-Signatur pr&uuml;fen. Das ist wichtig um Bootf&auml;higkeit und Integrit&auml;t eines Datentr&auml;gers zu beweisen.</p>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch06-hex">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch05-mounting">&#8592; Mounten</button>' +
    '<button class="nav-btn" data-target="ch07-strings">Strings &#8594;</button>' +
    '</div>';
};

Chapters['ch07-strings'] = function () {
  return '<h1 class="chapter-title">Strings, Pipes &amp; Vergleich</h1>' +
    '<div class="chapter-subtitle">Zeichenketten-Extraktion, Filterung &amp; forensische Textanalyse</div>' +
    '<p class="chapter-intro">Auf einem forensischen Image verstecken sich Informationen in Bin&auml;rdateien: Passw&ouml;rter, URLs, Email-Adressen, Cloud-Verweise. Das <span class="inline-code">strings</span>-Tool extrahiert sie.</p>' +

    '<div class="feature-grid chapter-preview-grid">' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128270;</div>' +
    '<div class="feature-text">' +
    '<h3>strings</h3>' +
    '<p>Lesbare Zeichen extrahieren</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128269;</div>' +
    '<div class="feature-text">' +
    '<h3>grep + Pipes</h3>' +
    '<p>Ergebnisse filtern und kombinieren</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128200;</div>' +
    '<div class="feature-text">' +
    '<h3>diff / cmp</h3>' +
    '<p>Dateien vergleichen</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128187;</div>' +
    '<div class="feature-text">' +
    '<h3>Terminal-&Uuml;bung</h3>' +
    '<p>Image nach Inhalten durchsuchen</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>' +

    '<h2 class="section-title"><span class="number">7.1</span> Wie funktioniert strings?</h2>' +
    '<p><span class="inline-code">strings</span> durchsucht eine Datei nach zusammenh&auml;ngenden druckbaren Zeichen (mindestens 4 Zeichen lang). Alles was lesbar ist wird ausgegeben &ndash; auch aus Bin&auml;rdateien.</p>' +
    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Pipes verketten Befehle</div>' +
    '<p>Das <span class="inline-code">|</span>-Zeichen (Pipe) leitet die Ausgabe eines Befehls an den n&auml;chsten weiter. So kombinierst du <span class="inline-code">strings</span> mit <span class="inline-code">grep</span> zur gezielten Suche.</p>' +
    '</div>' +

    '<div class="exercise-start-banner">' +
    '<div class="exercise-start-icon">&#128187;</div>' +
    '<div class="exercise-start-text"><strong>Terminal-&Uuml;bung beginnt jetzt!</strong><br>Du wirst in 3 Schritten lernen, forensische Images zu durchsuchen.</div>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">7.2</span> &Uuml;bung: Nach Passw&ouml;rtern und PDFs suchen</h2>' +
    '<p>Durchsuche das Image nach allen lesbaren Zeichen die "password" oder "pdf" enthalten:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>strings /cases/case-001/images/usb-stick.img | grep -i "password\\|pdf"</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>password_reset_2024\nbanking_passwords.pdf\nreport_final_password_protected.pdf\nPassword: xyz123\nconfidential_report.pdf</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">strings</span></td><td>Extrahiert alle druckbaren Zeichenketten</td></tr>' +
    '<tr><td><span class="inline-code">|</span></td><td>Pipe &ndash; leitet Ausgabe an den n&auml;chsten Befehl weiter</td></tr>' +
    '<tr><td><span class="inline-code">grep -i</span></td><td>Filtert nach Suchbegriff, <span class="inline-code">-i</span> = case-insensitive</td></tr>' +
    '<tr><td><span class="inline-code">"\\|"</span></td><span>ODER-Operator in grep: sucht nach beiden Begriffen</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Warum ist das forensisch wichtig?</div>' +
    '<p>Du hast gerade potenzielle Beweise gefunden: ein Klartext-Passwort und ein banking_passwords.pdf. Solche Funde k&ouml;nnen entscheidend f&uuml;r einen Fall sein.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">7.3</span> &Uuml;bung: URLs und Email-Adressen finden</h2>' +
    '<p>Mit regul&auml;ren Ausdr&uuml;cken kannst du gezielt nach Mustern suchen:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>strings /cases/case-001/images/usb-stick.img | grep -E "https?://"</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>https://drive.google.com/file/d/1a2b3c\nhttps://dropbox.com/sh/xyz123\nhttp://temp-mail.org/inbox</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">-E</span></td><td>Extended Regex &ndash; erm&ouml;glicht erweiterte Suchmuster</td></tr>' +
    '<tr><td><span class="inline-code">https?://</span></td><td>Sucht nach http:// oder https:// (das ? macht das s optional)</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">7.4</span> &Uuml;bung: Mit Offset-Positionen suchen</h2>' +
    '<p>Manchmal brauchst du die genaue Position im Image. <span class="inline-code">-t d</span> zeigt den dezimalen Offset an:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>strings -t d /cases/case-001/images/usb-stick.img | grep -i "confidential"</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>    640 confidential_report.pdf\n    768 CONFIDENTIAL - Internal Use Only</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">-t d</span></td><td>Zeigt Offset als <strong>d</strong>ezimale Zahl an</td></tr>' +
    '<tr><td><span class="inline-code">-t x</span></td><td>Zeigt Offset als he<strong>x</strong>adezimale Zahl an (Alternative)</td></tr>' +
    '<tr><td><span class="inline-code">8473621</span></td><td>Die Fundstelle liegt bei Byte 8.473.621 im Image</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">7.5</span> Dateivergleich</h2>' +
    '<p>In der Forensik musst du manchmal zwei Dateien vergleichen &ndash; z.B. Original vs. Kopie:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Textvergleich\ndiff -u file1.txt file2.txt\n\n# Bin&auml;rvergleich (Byte-f&uuml;r-Byte)\ncmp -l file1.bin file2.bin</code></pre></div>' +

    '<div class="decision-card">' +
    '<div class="question">Was zeigt <span class="inline-code">strings -t d</span> an?</div>' +
    '<div class="decision-options">' +
    '<div class="decision-option" data-correct="true" data-feedback="Richtig! -t d zeigt den Offset in Dezimalzahlen.">Dezimalen Offset der Fundstelle</div>' +
    '<div class="decision-option" data-correct="false" data-feedback="Das w&auml;re -t x f&uuml;r hexadezimal.">Hexadezimalen Offset</div>' +
    '<div class="decision-option" data-correct="false" data-feedback="Nicht die Gr&ouml;&szlig;e, sondern die Position.">Dateigr&ouml;&szlig;e</div>' +
    '</div>' +
    '<div class="decision-feedback"></div>' +
    '</div>' +

    '<div class="callout callout-success">' +
    '<div class="callout-header">&#10003; Zusammenfassung</div>' +
    '<p>Du kannst jetzt mit <span class="inline-code">strings</span> lesbare Zeichen aus Bin&auml;rdaten extrahieren, mit <span class="inline-code">grep</span> filtern und mit <span class="inline-code">-t d</span> die Position der Fundstelle bestimmen. Das ist essenziell f&uuml;r die Beweissuche in Images.</p>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch07-strings">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch06-hex">&#8592; Hex</button>' +
    '<button class="nav-btn" data-target="ch08-dateisysteme">Dateisysteme &#8594;</button>' +
    '</div>';
};

Chapters['ch08-dateisysteme'] = function () {
  return '<h1 class="chapter-title">Dateisysteme</h1>' +
    '<div class="chapter-subtitle">Plattform-spezifische Analyse &amp; forensisch relevante Metadaten</div>' +
    '<p class="chapter-intro">In der Praxis triffst du auf verschiedene Dateisysteme: NTFS (Windows), ext4 (Linux), APFS (macOS), FAT32 (USB). Jedes hat eigene Strukturen und versteckte Bereiche die du kennen musst.</p>' +

    '<div class="feature-grid chapter-preview-grid">' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128194;</div>' +
    '<div class="feature-text">' +
    '<h3>Dateisysteme</h3>' +
    '<p>NTFS, ext4, FAT32, APFS verstehen</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128295;</div>' +
    '<div class="feature-text">' +
    '<h3>Sleuth Kit</h3>' +
    '<p>Professionelle Dateisystem-Analyse</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128272;</div>' +
    '<div class="feature-text">' +
    '<h3>Verstecktes</h3>' +
    '<p>ADS, Journal, Snapshots</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128187;</div>' +
    '<div class="feature-text">' +
    '<h3>Terminal-&Uuml;bung</h3>' +
    '<p>Dateisystem selbst analysieren</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>' +

    '<h2 class="section-title"><span class="number">8.1</span> Dateisysteme im &Uuml;berblick</h2>' +
    '<p>Jedes Betriebssystem hat sein eigenes Dateisystem. Als Forensiker musst du wissen, wo versteckte Bereiche liegen:</p>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Dateisystem</th><th>Plattform</th><th>Forensisch relevant</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>NTFS</td><td>Windows</td><td>MFT, USN-Journal, <strong>Alternate Data Streams (ADS)</strong></td></tr>' +
    '<tr><td>exFAT</td><td>Wechselmedien</td><td>Timestamp-Verhalten, wenig Journaling</td></tr>' +
    '<tr><td>FAT32</td><td>USB/Legacy</td><td>4 GB Limit, keine Journaling, einfach</td></tr>' +
    '<tr><td>ext4</td><td>Linux</td><td>Journal, Superblock, Extended Attributes</td></tr>' +
    '<tr><td>APFS</td><td>macOS</td><td>Container/Volumes, <strong>Snapshots</strong>, Verschl&uuml;sselung</td></tr>' +
    '</tbody></table></div>' +

    '<div class="exercise-start-banner">' +
    '<div class="exercise-start-icon">&#128187;</div>' +
    '<div class="exercise-start-text"><strong>Terminal-&Uuml;bung beginnt jetzt!</strong><br>Du wirst in 3 Schritten lernen, Dateisysteme forensisch zu analysieren.</div>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">8.2</span> &Uuml;bung: Sleuth Kit &ndash; Dateien auflisten</h2>' +
    '<p>Das <strong>Sleuth Kit</strong> ist das Standard-Tool f&uuml;r Dateisystem-Analyse. Mit <span class="inline-code">fls</span> listest du alle Dateien auf &ndash; einschlie&szlig;lich gel&ouml;schter:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>fls -r /cases/case-001/images/usb-stick.img</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>r/r 4: documents\nr/r 5: notes.txt\nr/r * 6: deleted_file.pdf (deleted)\nr/r 7: pictures\nr/r 8: pictures/photo.jpg</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">fls</span></td><td><strong>f</strong>ile <strong>l</strong>i<strong>s</strong>t &ndash; listet Dateien und Verzeichnisse</td></tr>' +
    '<tr><td><span class="inline-code">-r</span></td><td><strong>r</strong>ecursive &ndash; listet alle Unterverzeichnisse mit auf</td></tr>' +
    '<tr><td><span class="inline-code">* 6</span></td><td>Das * bedeutet: diese Datei wurde <strong>gel&ouml;scht</strong></td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Gel&ouml;schte Dateien finden</div>' +
    '<p>Gel&ouml;schte Dateien sind oft noch auf der Platte vorhanden &ndash; nur der Verzeichniseintrag wurde entfernt. <span class="inline-code">fls</span> zeigt sie mit einem * markiert an. Mit <span class="inline-code">icat</span> kannst du sie wiederherstellen.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">8.3</span> &Uuml;bung: Partitionen im Image anzeigen</h2>' +
    '<p>Mit <span class="inline-code">mmls</span> zeigst du die Partitionstabelle eines Images an:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>mmls /cases/case-001/images/usb-stick.img</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>DOS Partition Table\nOffset Sector: 0\nUnits are in 512-byte sectors\n\n      Slot      Start        End        Length       Description\n000:  Meta      0000000000   0000000000   0000000001   Primary Table (#0)\n001:  -------   0000000000   0000002047   0000002048   Unallocated\n002:  000:000   0000002048   0033554431   00333552384   FAT32 (0x0B)</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">mmls</span></td><td>Zeigt die Partitionstabelle eines Images an</td></tr>' +
    '<tr><td><span class="inline-code">Start: 2048</span></td><td>Startsektor der FAT32-Partition</td></tr>' +
    '<tr><td><span class="inline-code">FAT32 (0x0B)</span></td><td>Partitionstyp: FAT32</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">8.4</span> &Uuml;bung: Datei-Details anzeigen</h2>' +
    '<p>Mit <span class="inline-code">istat</span> zeigst du die Metadaten einer bestimmten Datei (Inode):</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>istat /cases/case-001/images/usb-stick.img 5</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>inode: 5\nNot Allocated\nGroup: 0\nGeneration Id: 6170\nuid / gid: 1000 / 1000\nmode: rrw-rw-rw\nsize: 22615\nnum of links: 1\n\nAccess Time:\t2024-03-15 09:30:00.000000000 (CET)\nModified Time:\t2024-03-14 16:22:00.000000000 (CET)\nChange Time:\t2024-03-15 09:30:00.000000000 (CET)\nBirth Time:\t2024-03-14 08:00:00.000000000 (CET)\n\nDirect Blocks:\n101 102 103</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">istat</span></td><td>Zeigt Inode-Metadaten an (Timestamps, Gr&ouml;&szlig;e, Bl&ouml;cke)</td></tr>' +
    '<tr><td><span class="inline-code">5</span></td><td>Die Inode-Nummer (aus <span class="inline-code">fls</span> ermittelt)</td></tr>' +
    '<tr><td><span class="inline-code">crtime</span></td><td>Erstellungszeitpunkt (birth time)</td></tr>' +
    '<tr><td><span class="inline-code">mtime</span></td><td>&Auml;nderungszeitpunkt (modification)</td></tr>' +
    '<tr><td><span class="inline-code">atime</span></td><td>Zugriffszeitpunkt (access)</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">8.5</span> Forensisch relevante Artefakte</h2>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Dateisystem</th><th>Versteckte Bereiche</th><th>Forensisch relevant</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>NTFS</td><td>Alternate Data Streams (ADS)</td><td>Versteckte Daten in Dateieigenschaften</td></tr>' +
    '<tr><td>ext4</td><td>Extended Attributes, Journal</td><td>Journal-Datei f&uuml;r gel&ouml;schte Metadaten</td></tr>' +
    '<tr><td>APFS</td><td>Container/Volumes, Snapshots</td><td>Zeitpunkt der Snapshots</td></tr>' +
    '<tr><td>HFS+</td><td>Resource Fork</td><td>Metadaten in separatem Fork</td></tr>' +
    '</tbody></table></div>' +

    '<div class="decision-card">' +
    '<div class="question">Welches Dateisystem kann Artefakte in Alternate Data Streams (ADS) verstecken?</div>' +
    '<div class="decision-options">' +
    '<div class="decision-option" data-correct="true" data-feedback="Richtig! NTFS ADS k&ouml;nnen versteckte Daten enthalten.">NTFS</div>' +
    '<div class="decision-option" data-correct="false" data-feedback="FAT32 hat kein ADS-Konzept.">FAT32</div>' +
    '<div class="decision-option" data-correct="false" data-feedback="ext4 nutzt Extended Attributes, nicht ADS.">ext4</div>' +
    '</div>' +
    '<div class="decision-feedback"></div>' +
    '</div>' +

    '<div class="callout callout-success">' +
    '<div class="callout-header">&#10003; Zusammenfassung</div>' +
    '<p>Du kennst jetzt die wichtigsten Dateisysteme und ihre forensisch relevanten Eigenschaften. Mit dem Sleuth Kit (<span class="inline-code">fls</span>, <span class="inline-code">mmls</span>, <span class="inline-code">istat</span>) kannst du Dateisysteme professionell analysieren.</p>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch08-dateisysteme">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch07-strings">&#8592; Strings</button>' +
    '<button class="nav-btn" data-target="ch09-wipping">Sicheres L&ouml;schen &#8594;</button>' +
    '</div>';
};

Chapters['ch09-wipping'] = function () {
  return '<h1 class="chapter-title">Sicheres L&ouml;schen</h1>' +
    '<div class="chapter-subtitle">HDD/SSD-Sicherheitsl&ouml;schung &amp; Anti-Forensik erkennen</div>' +
    '<p class="chapter-intro">Als Forensiker musst du wissen wie Daten gel&ouml;scht werden &ndash; sowohl um Beweismittel nach der Untersuchung sicher zu entsorgen, als auch um Spuren von Anti-Forensik zu erkennen.</p>' +

    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; KRITISCHER ABSCHNITT</div>' +
    '<p>Alle Befehle in diesem Kapitel sind <strong>irreversibel</strong> und zerst&ouml;ren Daten! Nur auf Testger&auml;ten oder nach expliziter Genehmigung ausf&uuml;hren.</p>' +
    '</div>' +

    '<div class="feature-grid chapter-preview-grid">' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128465;</div>' +
    '<div class="feature-text">' +
    '<h3>HDD l&ouml;schen</h3>' +
    '<p>Festplatten sicher &uuml;berschreiben</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128190;</div>' +
    '<div class="feature-text">' +
    '<h3>SSD Erase</h3>' +
    '<p>Secure Erase f&uuml;r Flash-Speicher</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#9888;</div>' +
    '<div class="feature-text">' +
    '<h3>Wear Leveling</h3>' +
    '<p>Warum dd bei SSDs nicht reicht</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128187;</div>' +
    '<div class="feature-text">' +
    '<h3>Terminal-&Uuml;bung</h3>' +
    '<p>L&ouml;sch-Methoden vergleichen</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>' +

    '<h2 class="section-title"><span class="number">9.1</span> HDD vs. SSD: Warum die L&ouml;schmethode wichtig ist</h2>' +
    '<p>Bei <strong>HDDs</strong> (magnetisch) kannst du Daten durch &Uuml;berschreiben zuverl&auml;ssig l&ouml;schen. Bei <strong>SSDs</strong> funktioniert das nicht &ndash; wegen Wear Leveling werden die Daten nie am selben Ort &uuml;berschrieben.</p>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Warum einfaches &Uuml;berschreiben bei SSDs nicht funktioniert</div>' +
    '<p>SSDs verwenden Wear Leveling, das Schreibzugriffe auf verschiedene Flash-Zellen verteilt. Dadurch werden Daten nie vollst&auml;ndig &uuml;berschrieben und bleiben forensisch rekonstruierbar.</p>' +
    '</div>' +

    '<div class="exercise-start-banner">' +
    '<div class="exercise-start-icon">&#128187;</div>' +
    '<div class="exercise-start-text"><strong>Terminal-&Uuml;bung beginnt jetzt!</strong><br>Du wirst in 3 Schritten die L&ouml;schmethoden f&uuml;r HDD und SSD kennenlernen.</div>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">9.2</span> &Uuml;bung: HDD komplett &uuml;berschreiben</h2>' +
    '<p>Die klassische Methode f&uuml;r magnetische Festplatten: alle Sektoren mit Nullen &uuml;berschreiben:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>dd if=/dev/zero of=/dev/sda bs=16M status=progress conv=sync,noerror && sync</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>32000+0 Datens&#228;tze ein\n32000+0 Datens&#228;tze aus\n536870912000 bytes (500.0 GB) kopiert, 32000 s, 16.0 MB/s</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">if=/dev/zero</span></td><td>Quelle: ein endloser Strom von Nullen</td></tr>' +
    '<tr><td><span class="inline-code">of=/dev/sda</span></td><td>Ziel: die Festplatte die &uuml;berschrieben wird</td></tr>' +
    '<tr><td><span class="inline-code">bs=16M</span></td><td>16 MiB Bl&ouml;cke f&uuml;r schnelles &Uuml;berschreiben</td></tr>' +
    '<tr><td><span class="inline-code">sync</span></td><td>Sichert dass alle Daten auf die Platte geschrieben werden (Puffer leeren)</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">9.3</span> &Uuml;bung: Nur MBR/Header zerst&ouml;ren (schnell)</h2>' +
    '<p>Wenn du nur verhindern willst dass die Daten lesbar sind, reicht es oft, die ersten Sektoren zu zerst&ouml;ren:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>dd if=/dev/zero of=/dev/sda bs=512 count=2048 && sync</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>2+0 Datens&#228;tze ein\n2+0 Datens&#228;tze aus\n1048576 bytes (0.0 GB) kopiert, 2 s, 0.5 MB/s</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">count=2048</span></td><td>Schreibt genau 2048 Bl&ouml;cke (die ersten 1 MB)</td></tr>' +
    '<tr><td><span class="inline-code">bs=512</span></td><td>Sektorgr&ouml;&szlig;e &ndash; &uuml;berschreibt MBR + Partitionstabelle</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Achtung!</div>' +
    '<p>Damit zerst&ouml;rst du nur den MBR und die Partitionstabelle. Die eigentlichen Dateidaten sind noch auf der Platte! Ein Forensiker kann sie mit <span class="inline-code">fls</span> und <span class="inline-code">icat</span> oft wiederherstellen.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">9.4</span> SSD: Secure Erase</h2>' +
    '<p>Bei SSDs musst du den herstellereigenen Secure Erase Befehl verwenden:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># SATA-SSD: Secure Erase Support pr&uuml;fen\nhdparm -I /dev/sda | sed -n \'/Security/,/Transport/p\'\n\n# SATA-SSD: Secure Erase ausf&uuml;hren\nhdparm --user-master u --security-set-pass SecureErase /dev/sda\nhdparm --user-master u --security-erase SecureErase /dev/sda\n\n# NVMe: Secure Erase\nnvme format /dev/nvme0n1 --ses=1</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Tool</th><th>Typ</th><th>Vorteile</th><th>Nachteile</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">hdparm</span></td><td>SATA-SSD</td><td>Hersteller-Standard</td><td>Nur SATA, nicht NVMe</td></tr>' +
    '<tr><td><span class="inline-code">nvme format</span></td><td>NVMe-SSD</td><td>Modern, schnell</td><td>Nur NVMe-Ger&auml;te</td></tr>' +
    '<tr><td><span class="inline-code">shred</span></td><td>Software</td><td>Einfach, plattform&uuml;bergreifend</td><td>Ineffektiv bei SSDs</td></tr>' +
    '<tr><td><span class="inline-code">blkdiscard</span></td><td>Linux</td><td>F&uuml;r SSDs optimiert</td><td>Nur Blockger&auml;te</td></tr>' +
    '</tbody></table></div>' +

    '<div class="decision-card">' +
    '<div class="question">Warum funktioniert <span class="inline-code">dd if=/dev/zero</span> nicht zuverl&auml;ssig bei SSDs?</div>' +
    '<div class="decision-options">' +
    '<div class="decision-option" data-correct="true" data-feedback="Richtig! Wear Leveling verteilt Schreibzugriffe auf andere Zellen.">Wear Leveling verteilt Schreibzugriffe auf andere Zellen</div>' +
    '<div class="decision-option" data-correct="false" data-feedback="TRIM gibt Bl&ouml;cke frei, ist aber nicht das Kernproblem.">TRIM ist das Problem</div>' +
    '<div class="decision-option" data-correct="false" data-feedback="NCQ optimiert die Reihenfolge, ist nicht das Problem.">NCQ verhindert es</div>' +
    '</div>' +
    '<div class="decision-feedback"></div>' +
    '</div>' +

    '<div class="callout callout-success">' +
    '<div class="callout-header">&#10003; Zusammenfassung</div>' +
    '<p>Du kennst jetzt die Unterschiede zwischen HDD- und SSD-L&ouml;schung. HDDs k&ouml;nnen mit <span class="inline-code">dd</span> zuverl&auml;ssig gel&ouml;scht werden, SSDs ben&ouml;tigen Secure Erase. Dieses Wissen hilft dir auch, Anti-Forensik-Spuren zu erkennen.</p>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch09-wipping">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch08-dateisysteme">&#8592; Dateisysteme</button>' +
    '<button class="nav-btn" data-target="ch10-artefakte">Artefaktanalyse &#8594;</button>' +
    '</div>';
};

Chapters['ch10-artefakte'] = function () {
  return '<h1 class="chapter-title">Artefaktanalyse</h1>' +
    '<div class="chapter-subtitle">Gel&ouml;schte Dateien finden, Hex-Dumps lesen, Sleuth Kit anwenden</div>' +
    '<p class="chapter-intro">Nach dem Mounten beginnt die eigentliche Analyse: Welche Dateien waren auf dem Datentr&auml;ger? Welche wurden gel&ouml;scht? Was versteckt sich in den Bin&auml;rdaten?</p>' +

    '<div class="feature-grid chapter-preview-grid">' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128269;</div>' +
    '<div class="feature-text">' +
    '<h3>fls + icat</h3>' +
    '<p>Dateien finden und extrahieren</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128209;</div>' +
    '<div class="feature-text">' +
    '<h3>xxd</h3>' +
    '<p>Hex-Analyse des Images</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128270;</div>' +
    '<div class="feature-text">' +
    '<h3>strings</h3>' +
    '<p>Versteckte Texte extrahieren</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128187;</div>' +
    '<div class="feature-text">' +
    '<h3>Terminal-&Uuml;bung</h3>' +
    '<p>Artefakte selbst analysieren</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>' +

    '<h2 class="section-title"><span class="number">10.1</span> Was sind forensische Artefakte?</h2>' +
    '<p>Artefakte sind alle Spuren die ein Nutzer auf einem System hinterl&auml;sst: Dateien, gel&ouml;schte Daten, Timestamps, Log-Eintr&auml;ge, versteckte Streams. Als Forensiker suchst du gezielt nach diesen Spuren.</p>' +

    '<div class="exercise-start-banner">' +
    '<div class="exercise-start-icon">&#128187;</div>' +
    '<div class="exercise-start-text"><strong>Terminal-&Uuml;bung beginnt jetzt!</strong><br>Du wirst in 4 Schritten lernen, forensische Artefakte zu finden und zu analysieren.</div>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">10.2</span> &Uuml;bung: Alle Dateien auflisten (inkl. gel&ouml;scht)</h2>' +
    '<p>Mit <span class="inline-code">fls</span> listest du alle Dateien auf &ndash; auch gel&ouml;schte. Gel&ouml;schte Dateien sind mit * markiert:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>fls -r -p /cases/case-001/images/usb-stick.img</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>/documents\n/documents/report.pdf\n/notes.txt\n/deleted_secrets.xlsx (deleted)\n/pictures\n/pictures/photo.jpg</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">fls</span></td><td>File list &ndash; listet Dateien aus dem Dateisystem</td></tr>' +
    '<tr><td><span class="inline-code">-r</span></td><td>Recursive &ndash; alle Unterverzeichnisse</td></tr>' +
    '<tr><td><span class="inline-code">-p</span></td><td>Full path &ndash; zeigt komplette Pfade an</td></tr>' +
    '<tr><td><span class="inline-code">(deleted)</span></td><td>Datei wurde gel&ouml;scht, Datenbl&ouml;cke evtl. noch vorhanden</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">10.3</span> &Uuml;bung: Gel&ouml;schte Datei wiederherstellen</h2>' +
    '<p>Du hast eine gel&ouml;schte Datei gefunden. Mit <span class="inline-code">icat</span> und der Inode-Nummer kannst du sie extrahieren:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>icat /cases/case-001/images/usb-stick.img 6 &gt; /cases/case-001/reports/deleted_secrets.xlsx</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>(keine Ausgabe = Erfolg! Datei wurde extrahiert.)</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Bestandteil</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><span class="inline-code">icat</span></td><td><strong>i</strong>node <strong>cat</strong> &ndash; gibt Dateiinhalt anhand der Inode-Nummer aus</td></tr>' +
    '<tr><td><span class="inline-code">6</span></td><td>Die Inode-Nummer (aus <span class="inline-code">fls</span> ermittelt)</td></tr>' +
    '<tr><td><span class="inline-code">&gt;</span></td><td>Leitet die Ausgabe in eine neue Datei um</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Wann funktioniert das?</div>' +
    '<p>Gel&ouml;schte Dateien k&ouml;nnen wiederhergestellt werden, solange die Datenbl&ouml;cke nicht &uuml;berschrieben wurden. Je fr&uuml;her nach dem L&ouml;schen untersucht wird, desto h&ouml;her die Chance.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">10.4</span> &Uuml;bung: MBR-Signatur verifizieren</h2>' +
    '<p>Pr&uuml;fe ob das Image einen g&uuml;ltigen MBR hat:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>xxd -s 510 -l 2 /cases/case-001/images/usb-stick.img</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>000001fe: 55aa                                      U.</code></pre></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; 55 AA = g&uuml;ltig</div>' +
    '<p><span class="inline-code">55 AA</span> bedeutet: der MBR ist g&uuml;ltig und der Datentr&auml;ger war bootf&auml;hig. Das kann ein wichtiges Beweismittel sein.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">10.5</span> &Uuml;bung: Versteckte Strings finden</h2>' +
    '<p>Durchsuche das gesamte Image nach sensiblen Inhalten:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>strings -t d /cases/case-001/images/usb-stick.img | grep -iE "confidential|secret|password"</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>    128 password_reset_2024\n    256 banking_passwords.pdf\n    384 report_final_password_protected.pdf\n    512 Password: xyz123\n    640 confidential_report.pdf\n    768 CONFIDENTIAL - Internal Use Only</code></pre></div>' +

    '<div class="decision-card">' +
    '<div class="question">Du musst in einem 50GB-Image nach allen Vorkommen von "confidential" suchen. Was ist der effizienteste Ansatz?</div>' +
    '<div class="decision-options">' +
    '<div class="decision-option" data-correct="false" data-feedback="xxd erzeugt einen riesigen Hex-Dump eines 50GB-Images. Extrem langsam und unpraktisch."><span class="inline-code">xxd</span> auf das gesamte Image anwenden und die Ausgabe durchsuchen</div>' +
    '<div class="decision-option" data-correct="true" data-feedback="Korrekt! strings extrahiert nur lesbare Zeichenketten und grep filtert effizient. Das ist der schnellste Ansatz f&uuml;r Textsuche in Bin&auml;rdaten."><span class="inline-code">strings image.img | grep -i "confidential"</span></div>' +
    '<div class="decision-option" data-correct="false" data-feedback="fls listet Dateien auf, durchsucht aber nicht den Inhalt der Dateien."><span class="inline-code">fls -r</span> und dann jede Datei einzeln &ouml;ffnen</div>' +
    '</div>' +
    '<div class="decision-feedback"></div>' +
    '</div>' +

    '<div class="callout callout-success">' +
    '<div class="callout-header">&#10003; Zusammenfassung</div>' +
    '<p>Du kannst jetzt Dateien mit <span class="inline-code">fls</span> auflisten, gel&ouml;schte Dateien mit <span class="inline-code">icat</span> wiederherstellen, den MBR mit <span class="inline-code">xxd</span> verifizieren und versteckte Inhalte mit <span class="inline-code">strings</span> finden.</p>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch10-artefakte">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch09-wipping">&#8592; Sicheres L&ouml;schen</button>' +
    '<button class="nav-btn" data-target="ch11-casestudy">Case Study &#8594;</button>' +
    '</div>';
};

Chapters['ch11-casestudy'] = function () {
  return '<h1 class="chapter-title">Case Study: Kompletter forensischer Workflow</h1>' +
    '<div class="chapter-subtitle">12 Schritte &ndash; von der Vorbereitung bis zum Abschluss</div>' +
    '<p class="chapter-intro">Jetzt setzt du alles zusammen was du gelernt hast. Du durchl&auml;ufst den kompletten forensischen Workflow an einem Fallbeispiel &ndash; Schritt f&uuml;r Schritt, mit Erkl&auml;rungen und Entscheidungsfragen.</p>' +

    '<div class="scenario-box">' +
    '<div class="scenario-icon">&#127919;</div>' +
    '<div class="scenario-label">EINSATZ-SZENARIO</div>' +
    '<div class="scenario-text">Ein USB-Stick wurde bei einer Durchsuchung sichergestellt. Dein Auftrag: Erstelle ein forensisches Image, verifiziere es, mounte es zur Analyse und dokumentiere jeden Schritt.</div>' +
    '</div>' +

    '<div class="feature-grid chapter-preview-grid">' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#9881;</div>' +
    '<div class="feature-text">' +
    '<h3>Schritt 1-3</h3>' +
    '<p>Vorbereitung, Identifikation, Unmount</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128272;</div>' +
    '<div class="feature-text">' +
    '<h3>Schritt 4-7</h3>' +
    '<p>Hashing, Imaging, Verifikation</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#128269;</div>' +
    '<div class="feature-text">' +
    '<h3>Schritt 8-10</h3>' +
    '<p>Mounten, Analyse, Hex-Analyse</p>' +
    '</div>' +
    '</div>' +
    '<div class="feature-card chapter-preview-card">' +
    '<div class="feature-icon">&#9989;</div>' +
    '<div class="feature-text">' +
    '<h3>Schritt 11-12</h3>' +
    '<p>Cleanup und Abschluss</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>' +

    '<div class="exercise-start-banner">' +
    '<div class="exercise-start-icon">&#128187;</div>' +
    '<div class="exercise-start-text"><strong>Die komplette Case Study beginnt jetzt!</strong><br>F&uuml;hre jeden Schritt im Terminal aus und beantworte die Entscheidungsfragen.</div>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">11.1</span> &Uuml;bung: Vorbereitung</h2>' +
    '<p>Bevor du forensisch arbeitest, bereite die Umgebung vor: Case-Ordner, Protokollierung, Systeminfos:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>mkdir -p /cases/case-001/{images,mounts,hashes,notes,reports,tools} && script case-001/notes/session.log</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>Skript gestartet, Datei ist \'case-001/notes/session.log\' (befehle werden mitgeloggt)</code></pre></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Warum zuerst script?</div>' +
    '<p>Jeder forensische Schritt muss dokumentiert werden. Ohne Protokoll ist die gesamte Untersuchung vor Gericht fragw&uuml;rdig. Deshalb startest du <span class="inline-code">script</span> <strong>vor</strong> allen anderen Schritten.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">11.2</span> &Uuml;bung: Identifikation</h2>' +
    '<p>Identifiziere das Ziel-Device eindeutig:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL && hdparm -I /dev/sdb | grep "Serial Number"</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>NAME        SIZE  TYPE MOUNTPOINT MODEL\nsda         500G  disk            Samsung SSD 860\n├─sda1      512M  part /boot\n├─sda2      499G  part /\nsdb          16G  disk            SanDisk USB\n└─sdb1       16G  part\nnvme0n1     512G  disk            Samsung NVMe 970\n└─nvme0n1p1 512G  part\n\n  Serial Number:      4C5300011602181052</code></pre></div>' +

    '<h2 class="section-title"><span class="number">11.3</span> &Uuml;bung: Unmount</h2>' +
    '<p>Stelle sicher dass keine Partition gemountet ist:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>umount /dev/sdb1 2>/dev/null; lsblk -o NAME,MOUNTPOINT | grep sdb</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>sdb\n└─sdb1</code></pre></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#128161; Kein Mountpoint = sicher</div>' +
    '<p>Wenn die Spalte MOUNTPOINT leer ist, ist das Device nicht gemountet. Jetzt ist es sicher f&uuml;r das Imaging.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">11.4</span> &Uuml;bung: Hash des Originals</h2>' +
    '<p>Erstelle den SHA-256 Hash VOR dem Imaging:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>sha256sum /dev/sdb &gt; case-001/hashes/original.sha256</code></pre></div>' +

    '<h2 class="section-title"><span class="number">11.5</span> &Uuml;bung: Forensisches Imaging</h2>' +
    '<p>Erstelle das bit-genaue Abbild:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>dd if=/dev/sdb of=case-001/images/usb-stick.img bs=16M conv=noerror,sync status=progress</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>1024+0 Datens&#228;tze ein\n1024+0 Datens&#228;tze aus\n17179869184 bytes (16.0 GB) kopiert, 1024 s, 16.0 MB/s</code></pre></div>' +

    '<h2 class="section-title"><span class="number">11.6</span> &Uuml;bung: Hash des Images</h2>' +
    '<p>Hashe das Image und vergleiche:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>sha256sum case-001/images/usb-stick.img &gt; case-001/hashes/image.sha256 && sha256sum -c case-001/hashes/image.sha256</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>Pruefe case-001/hashes/image.sha256...\nimage.sha256: OK</code></pre></div>' +
    '<div class="callout callout-success">' +
    '<div class="callout-header">&#10003; Image verifiziert!</div>' +
    '<p>Das Image ist bit-genau identisch mit dem Original. Forensisch verwertbar!</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">11.7</span> &Uuml;bung: Mounten (Read-Only)</h2>' +
    '<p>Mounte das Image zur Analyse:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>fdisk -l case-001/images/usb-stick.img</code></pre></div>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>mkdir -p case-001/mounts/part1 && mount -o ro,loop,offset=1048576 case-001/images/usb-stick.img case-001/mounts/part1</code></pre></div>' +

    '<h2 class="section-title"><span class="number">11.8</span> &Uuml;bung: Analyse</h2>' +
    '<p>Untersuche die Inhalte:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ls -laR case-001/mounts/part1/</code></pre></div>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>strings case-001/images/usb-stick.img | grep -iE "password|confidential|secret"</code></pre></div>' +

    '<h2 class="section-title"><span class="number">11.9</span> &Uuml;bung: Hex-Analyse</h2>' +
    '<p>Pr&uuml;fe den MBR:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>xxd -s 510 -l 2 case-001/images/usb-stick.img</code></pre></div>' +
    '<p><strong>Erwartete Ausgabe im Terminal:</strong></p>' +
    '<div class="code-block output-block"><div class="code-header"><span class="lang">ERWARTETE AUSGABE</span></div><pre><code>000001fe: 55aa                                      U.</code></pre></div>' +

    '<h2 class="section-title"><span class="number">11.10</span> &Uuml;bung: Cleanup</h2>' +
    '<p>R&auml;ume auf und beende die Protokollierung:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>umount case-001/mounts/part1 && exit</code></pre></div>' +

    '<h2 class="section-title"><span class="number">11.11</span> Zusammenfassung: Der komplette Workflow</h2>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Schritt</th><th>Befehl</th><th>Ergebnis</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>1. Vorbereitung</td><td><span class="inline-code">mkdir -p, script</span></td><td>Case-Ordner &amp; Protokoll aktiv</td></tr>' +
    '<tr><td>2. Identifikation</td><td><span class="inline-code">lsblk, hdparm</span></td><td>Device /dev/sdb, Serial Number dokumentiert</td></tr>' +
    '<tr><td>3. Unmount</td><td><span class="inline-code">umount</span></td><td>Keine Partitionen gemountet</td></tr>' +
    '<tr><td>4. Hash Original</td><td><span class="inline-code">sha256sum /dev/sdb</span></td><td>Original-Hash erstellt</td></tr>' +
    '<tr><td>5. Imaging</td><td><span class="inline-code">dd if=/dev/sdb</span></td><td>Bit-genaues Image erstellt</td></tr>' +
    '<tr><td>6. Hash Image</td><td><span class="inline-code">sha256sum -c</span></td><td>Verifikation: OK</td></tr>' +
    '<tr><td>7. Mount</td><td><span class="inline-code">mount -o ro,loop,offset=</span></td><td>Image read-only gemountet</td></tr>' +
    '<tr><td>8. Analyse</td><td><span class="inline-code">ls, strings, grep</span></td><td>Artefakte identifiziert</td></tr>' +
    '<tr><td>9. Hex</td><td><span class="inline-code">xxd -s 510 -l 2</span></td><td>MBR-Signatur 55 AA verifiziert</td></tr>' +
    '<tr><td>10. Cleanup</td><td><span class="inline-code">umount, exit</span></td><td>Ressourcen freigegeben, Protokoll geschlossen</td></tr>' +
    '</tbody></table></div>' +

    '<div class="decision-card">' +
    '<div class="question">Gl&uuml;ckwunsch! Du hast den forensischen Workflow abgeschlossen. Was ist das Wichtigste f&uuml;r die gerichtliche Verwertbarkeit?</div>' +
    '<div class="decision-options">' +
    '<div class="decision-option" data-correct="false" data-feedback="Wichtige Tools, aber nicht der wichtigste Faktor f&uuml;r die Verwertbarkeit.">Die Verwendung von teuren Forensik-Tools</div>' +
    '<div class="decision-option" data-correct="true" data-feedback="Genau! L&uuml;ckenlose Dokumentation, verifizierte Hashes und eine durchgehende Chain of Custody sind die Grundlage f&uuml;r gerichtliche Verwertbarkeit.">L&uuml;ckenlose Dokumentation, verifizierte Hashes und Chain of Custody</div>' +
    '<div class="decision-option" data-correct="false" data-feedback="Die Dauer der Untersuchung ist weniger wichtig als die Dokumentation.">Die Schnelligkeit der Untersuchung</div>' +
    '</div>' +
    '<div class="decision-feedback"></div>' +
    '</div>' +

    '<div class="callout callout-success">' +
    '<div class="callout-header">&#10003; Case Study abgeschlossen!</div>' +
    '<p>Du hast den kompletten forensischen Workflow durchlaufen: Vorbereitung, Identifikation, Unmount, Hashing, Imaging, Verifikation, Mounten, Analyse, Hex-Analyse und Cleanup. Das ist der Standard-Workflow den professionelle Forensiker anwenden.</p>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch11-casestudy">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch10-artefakte">&#8592; Artefakte</button>' +
    '<button class="nav-btn" data-target="ch12-image-formate">Image-Formate &#8594;</button>' +
    '</div>';
};

Chapters['ch12-image-formate'] = function () {
  return '<h1 class="chapter-title">Image-Formate</h1>' +
    '<div class="chapter-subtitle">Raw, E01, AFF, VHD - Welches Format wann verwenden?</div>' +

    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div>' +
    '<p>Das Format des forensischen Images beeinflusst die Verwertbarkeit und Effizienz der Untersuchung. ' +
    'Raw-Images sind universell kompatibel, aber groß und enthalten keine Metadaten. ' +
    'E01/AFF enthalten Hashing, Compression und Metadaten, werden aber nicht von allen Tools unterst&uuml;tzt. ' +
    'Ein falsches Format kann zu Inkompatibilit&auml;ten mit Analysetools oder ineffizienter Speicherung f&uuml;hren.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">10.1</span> Raw-Format (dd)</h2>' +
    '<p>Das einfachste und universellste Format. Ein exakter Bit-f&uuml;r-Bit-Kopie des Datentr&auml;gers ohne Dateisystem-Metadaten.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>dd if=/dev/sda of=case01.dd bs=16M conv=noerror,sync status=progress</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Vorteil</th><th>Nachteil</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>Universell kompatibel</td><td>Keine Kompression</td></tr>' +
    '<tr><td>Keine Proprietary-Software</td><td>Keine Metadaten</td></tr>' +
    '<tr><td>Von allen Tools lesbar</td><td>Gro&szlig;e Datei</td></tr>' +
    '<tr><td>Kein Overhead</td><td>Kein automatisches Hashing</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">10.2</span> E01-Format (EnCase)</h2>' +
    '<p>Propriet&auml;res Format von Guidance Software (jetzt OpenText). Enth&auml;lt Metadaten, Compression und Hashing.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>ewfacquire /dev/sda -c case01 -e "Hannes Lang" -d sha256 -t disk01</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Vorteil</th><th>Nachteil</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>Integriertes Hashing (MD5/SHA1/SHA256)</td><td>Nicht von allen Tools unterst&uuml;tzt</td></tr>' +
    '<tr><td>Kompression m&ouml;glich</td><td>Proprietary-Format</td></tr>' +
    '<tr><td>Metadaten (Untersuchern, Zeitstempel)</td><td>Erfordert spezielle Software</td></tr>' +
    '<tr><td>Segmentierung f&uuml;r gro&szlig;e Disks</td><td>Komplexeres Format</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wichtig</div>' +
    '<p>E01 wird von Tools wie FTK, EnCase und Sleuth Kit unterst&uuml;tzt. Andere Tools (Autopsy, Binwalk) ben&ouml;tigen evt. Konvertierung zu Raw.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">10.3</span> AFF-Format (Advanced Forensic Format)</h2>' +
    '<p>Open-Source-Format von The Sleuth Kit. Ähnlich E01, aber mit weniger Proprietary-Lock-in.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>affconvert -c /dev/sda -o case01.aff -d sha256 -a</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Vorteil</th><th>Nachteil</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>Open Source</td><td>Weniger verbreitet als E01</td></tr>' +
    '<tr><td>Von Sleuth Kit nativ unterst&uuml;tzt</td><td>Weniger Tool-Support als E01</td></tr>' +
    '<tr><td>Compression und Hashing</td><td>Format ist komplex</td></tr>' +
    '<tr><td>Segmentierung f&uuml;r gro&szlig;e Disks</td><td>Erfordert spezielle Software</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">10.4</span> VHD-Format (Virtual Hard Disk)</h2>' +
    '<p>Von Microsoft entwickeltes Format f&uuml;r Virtualisierung. N&uuml;tzlich f&uuml;r Analyse in VM-Umgebungen.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code>dd if=/dev/sda of=case01.raw bs=16M\nqemu-img convert -f raw -O vpc case01.raw case01.vhd</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Vorteil</th><th>Nachteil</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>Nativ von Virtualisierungstools unterst&uuml;tzt</td><td>Nicht forensisch optimiert</td></tr>' +
    '<tr><td>Einfach zu mounten</td><td>Kein integriertes Hashing</td></tr>' +
    '<tr><td>Snapshot-Funktionalit&auml;t</td><td>Metadaten begrenzt</td></tr>' +
    '<tr><td>Speicherplatz-effizient (VHD-X)</td><td>Prim&auml;r f&uuml;r Virtualisierung</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#9432; Tipp</div>' +
    '<p>VHD ist ideal f&uuml;r schnelle Analysen in VMs (VirtualBox, VMware). Kopiere das Raw-Image in eine VM und analysiere dort.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">10.5</span> Kompression und Sparse-Images</h2>' +
    '<p>Forensische Images sind oft riesig. Kompression und Sparse-Techniken reduzieren den Speicherplatz.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Raw + Gzip\ndd if=/dev/sda bs=16M | gzip > case01.dd.gz\n\n# E01 mit Compression\newfacquire /dev/sda -c case01 -d sha256 -t disk01 -c gzip\n\n# Sparse-Image (f&uuml;r Datentr&auml;ger mit viel freiem Platz)\ndd if=/dev/sda of=sparse.img conv=sparse bs=16M</code></pre></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wichtig</div>' +
    '<p>Kompression kann Integrit&auml;tspr&uuml;fungen erschweren. De-komprimiere und re-hash vor der Analyse.</p>' +
    '</div>' +

    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Image-Format ausw&auml;hlen</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>W&auml;hle das passende Format f&uuml;r verschiedene Untersuchungsszenarien.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Szenario 1: Untersuchung in verschiedenen Tools, maximale Kompatibilit&auml;t ben&ouml;tigt. Welches Format?</li>' +
    '<li>Szenario 2: Gro&szlig;er Datentr&auml;ger (500 GB), Speicherplatz limitiert. Welches Format?</li>' +
    '<li>Szenario 3: Analyse in VirtualBox VM. Welches Format?</li>' +
    '<li>Szenario 4: Gerichtliche Verwertbarkeit, integriertes Hashing erforderlich. Welches Format?</li>' +
    '</ol></div>' +
    '<div class="toggle-container">' +
    '<div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>' +
    '<div class="toggle-content">' +
    '<p><strong>Szenario 1:</strong> Raw (dd) - Universell kompatibel</p>' +
    '<p><strong>Szenario 2:</strong> E01 oder AFF mit Compression - Speicherplatz sparen</p>' +
    '<p><strong>Szenario 3:</strong> VHD - Nativ von Virtualisierungstools unterst&uuml;tzt</p>' +
    '<p><strong>Szenario 4:</strong> E01 - Integriertes Hashing + Metadaten</p>' +
    '</div></div>' +
    '</div></div>' +

    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Typische Fehler in diesem Kapitel</div>' +
    '<ul>' +
    '<li><strong>Falsches Format gew&auml;hlt:</strong> VHD ist nicht forensisch optimiert, kein integriertes Hashing</li>' +
    '<li><strong>Kompression vergessen zu de-komprimieren:</strong> Hashes vor der Analyse pr&uuml;fen</li>' +
    '<li><strong>Proprietary-Format ohne R&uuml;ckweg:</strong> Nicht alle Tools unterst&uuml;tzen E01/AFF</li>' +
    '<li><strong>Metadaten ignoriert:</strong> E01-Images enthalten wertvolle Metadaten (Untersucher, Zeitstempel)</li>' +
    '</ul>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch12-image-formate">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch11-casestudy">&#8592; Mini-CTF</button>' +
    '<button class="nav-btn" data-target="ch13-vergleich">Vergleich &#8594;</button>' +
    '</div>';
};

Chapters['ch13-vergleich'] = function () {
  return '<h1 class="chapter-title">Vergleich</h1>' +
    '<div class="chapter-subtitle">diff, cmp, hexdiff - Unterschiede zwischen Dateien finden</div>' +

    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div>' +
    '<p>Vergleichswerkzeuge sind essenziell, um Manipulationen, Versionen und Unterschiede zwischen ' +
    'Dateien nachzuweisen. Ein einziger ge&auml;nderter Byte kann eine Datei komplett ver&auml;ndern. ' +
    'Vergleichswerkzeuge helfen, diese Ver&auml;nderungen zu finden und zu dokumentieren.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">11.1</span> diff - Textvergleich</h2>' +
    '<p>Der Standard-Tool f&uuml;r Textdateivergleich. Zeigt Zeilenweise Unterschiede an.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Einfacher Diff\ndiff file1.txt file2.txt\n\n# Unified Diff (besser lesbar)\ndiff -u file1.txt file2.txt\n\n# Kontext-Zeilen anzeigen\ndiff -u -C 3 file1.txt file2.txt\n\n# Nur Zeilen nummern, die sich unterscheiden\ndiff -u | grep "@@"</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Option</th><th>Beschreibung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>-u</td><td>Unified Format (lesbarer)</td></tr>' +
    '<tr><td>-C N</td><td>Kontext: N Zeilen vor/nach dem Unterschied</td></tr>' +
    '<tr><td>-r</td><td>Rekursiv (Verzeichnisse vergleichen)</td></tr>' +
    '<tr><td>-q</td><td>Quiet - nur ob unterschiedlich, nicht was</td></tr>' +
    '<tr><td>--ignore-all-space</td><td>Whitespace ignorieren</td></tr>' +
    '<tr><td>--ignore-blank-lines</td><td>Leere Zeilen ignorieren</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#9432; Tipp</div>' +
    '<p>Unified Diff zeigt <span class="inline-code">-</span> f&uuml;r gel&ouml;sche Zeilen, <span class="inline-code">+</span> f&uuml;r hinzugef&uuml;gte Zeilen. ' +
    '<span class="inline-code">@@ -Start,Count +Start,Count @@</span> zeigt die Zeilennummer im original und modifizierten File.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">11.2</span> cmp - Bin&auml;rvergleich</h2>' +
    '<p>Vergleicht zwei Dateien Byte-f&uuml;r-Byte. Schneller als diff, aber zeigt keinen Kontext.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Einfacher Vergleich (Exit-Code: 0=gleich, 1=unterschiedlich)\ncmp file1.bin file2.bin\n\n# Ausgabe des ersten abweichenden Bytes\ncmp -l file1.bin file2.bin\n\n# Zeilenweise Ausgabe (f&uuml;r Textdateien)\ncmp -l file1.txt file2.txt | head -5\n\n# Alle Unterschiede auf einmal\ncmp -b -l file1.bin file2.bin</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Ausgabe von cmp -l</th><th>Bedeutung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>123 45 67</td><td>Zeile 123, Byte 45 unterscheidet sich (Zeichen 67)</td></tr>' +
    '<tr><td>EOF auf file1</td><td>file2 ist l&auml;nger</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wichtig</div>' +
    '<p>cmp zeigt nur die Position, nicht den Kontext. Nutze <span class="inline-code">diff</span> f&uuml;r Textdateien und ' +
    '<span class="inline-code">hexdiff</span> f&uuml;r Bin&auml;rdateien, wenn du sehen willst, was sich ge&auml;ndert hat.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">11.3</span> hexdiff - Hex-Analyse</h2>' +
    '<p>Kombiniert aus cmp und hexdump. Zeigt Unterschiede im Hex-Format.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Mit xxd vergleichen\nxxd file1.bin | head -20 > /tmp/f1.hex\nxxd file2.bin | head -20 > /tmp/f2.hex\ndiff /tmp/f1.hex /tmp/f2.hex\n\n# Mit vimdiff (interaktiv)\nxxd file1.bin | vim - -c \":vsp %:p\" -c \":normal! g/^/diff \| set ft=diff\" /tmp/f2.hex\n\n# Mit vbindiff (spezielles Tool)\nvbindiff file1.bin file2.bin</code></pre></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#9432; Tipp</div>' +
    '<p><span class="inline-code">xxd</span> und <span class="inline-code">vimdiff</span> kombinieren f&uuml;r einen interaktiven Hex-Vergleich mit Seiten-ansicht.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">11.4</span> Hash-basierter Vergleich</h2>' +
    '<p>Vergleicht Hashes statt Inhalt. Schneller, aber zeigt nicht wo der Unterschied ist.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># SHA-256 Hashes vergleichen\nsha256sum file1.txt file2.txt\n\n# Hashes in Datei speichern\nsha256sum file1.txt file2.txt > hashes.sha256\n\n# Hashes verifizieren\nsha256sum -c hashes.sha256\n\n# Mehrere Dateien vergleichen\nsha256sum *.txt | sort | uniq -D\n\n# Exit-Code: 0=alle gleich, 1=unterschiedliche Hashes</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Scenario</th><th>Befehl</th><th>Ergebnis</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>Alle Dateien identisch?</td><td>sha256sum -c hashes.sha256</td><td>Alle: OK oder ERROR f&uuml;r Unterschiede</td></tr>' +
    '<tr><td>Duplikate finden</td><td>sha256sum *.txt | sort | uniq -D</td><td>Zeigt Dateien mit gleichen Hash</td></tr>' +
    '<tr><td>Nur Unterschiede</td><td>sha256sum -c hashes.sha256 | grep ": FAILED"</td><td>Zeigt nur die nicht-identischen</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wichtig</div>' +
    '<p>Hashes zeigen nur OB etwas unterscheidet, nicht WAS. Wenn Hashes unterschiedlich sind, musst du ' +
    '<span class="inline-code">diff</span>, <span class="inline-code">cmp</span> oder <span class="inline-code">hexdiff</span> nutzen, um den Unterschied zu finden.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">11.5</span> Forensische Anwendung</h2>' +
    '<p>Vergleichswerkzeuge in der forensischen Praxis:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Original vs. Image (Integrit&auml;tspr&uuml;fung)\ncmp /dev/sda case01.dd\n\n# Vorher vs. Nachher (Version)\ndiff -u original.txt modified.txt > change.diff\n\n# Memory-Dump vs. String-Liste\ncmp memory_dump.raw strings.txt\n\n# Multiple Backups vergleichen\nfor backup in backup_*.dd; do\n  sha256sum "$backup" >> backup_hashes.sha256\ndone\nsha256sum -c backup_hashes.sha256 | grep FAILED</code></pre></div>' +

    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Datei-Manipulation nachweisen</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Nutze Vergleichswerkzeuge, um Manipulationen in Dateien nachzuweisen.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Textdatei vergleichen: <span class="inline-code">diff -u original.txt modified.txt</span></li>' +
    '<li>Bin&auml;rdatei vergleichen: <span class="inline-code">cmp -l original.bin modified.bin</span></li>' +
    '<li>Hashes vergleichen: <span class="inline-code">sha256sum original.txt modified.txt</span></li>' +
    '<li>Hex-Analyse: <span class="inline-code">xxd original.bin | head -20</span> und mit modifiziertem vergleichen</li>' +
    '<li>Wann nutzt du diff, wann cmp, wann Hashing?</li>' +
    '</ol></div>' +
    '<div class="toggle-container">' +
    '<div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>' +
    '<div class="toggle-content">' +
    '<p><strong>Vergleichswerkzeuge:</strong></p>' +
    '<ul><li><span class="inline-code">diff</span> - Textdateien, Zeilenweise, Kontext-Anzeige</li>' +
    '<li><span class="inline-code">cmp</span> - Bin&auml;rdateien, Byte-f&uuml;r-Byte, schnell</li>' +
    '<li><span class="inline-code">sha256sum</span> - Integrit&auml;tspr&uuml;fung, schnell, kein Kontext</li>' +
    '<li><span class="inline-code">xxd</span> + <span class="inline-code">diff</span> - Hex-Analyse mit Kontext</li></ul>' +
    '</div></div>' +
    '</div></div>' +

    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Typische Fehler in diesem Kapitel</div>' +
    '<ul>' +
    '<li><strong>diff auf Bin&auml;rdateien:</strong> diff ist f&uuml;r Text, nutze cmp f&uuml;r Bin&auml;rdateien</li>' +
    '<li><strong>Kontext nicht beachtet:</strong> cmp zeigt nur Position, nicht was ge&auml;ndert wurde</li>' +
    '<li><strong>Hashes ohne Verifizierung:</strong> Hashes zeigen OB unterschiedlich, nicht WAS</li>' +
    '<li><strong>Zeilennummern ignoriert:</strong> Unified Diff zeigt @-Zeilen, die wichtig sind</li>' +
    '<li><strong>Whitespace nicht beachtet:</strong> Ein zus&auml;tzliches Leerzeichen &auml;ndert den Hash</li>' +
    '</ul>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch13-vergleich">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch12-image-formate">&#8592; Image-Formate</button>' +
    '<button class="nav-btn" data-target="ch14-protokollierung">Protokollierung &#8594;</button>' +
    '</div>';
};

Chapters['ch14-protokollierung'] = function () {
  return '<h1 class="chapter-title">Protokollierung</h1>' +
    '<div class="chapter-subtitle">script-Befehl, Chain of Custody, Gerichtsverwertbarkeit</div>' +

    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div>' +
    '<p>Ohne Dokumentation ist forensische Arbeit wertlos. Gerichte akzeptieren nur ' +
    'nachvollziehbare, l&uuml;ckenlose Dokumentation. Der <span class="inline-code">script</span>-Befehl ' +
    'protokolliert jeden Schritt. Die Chain of Custody dokumentiert die Beweiskette von der &Uuml;bernahme bis zur Abgabe.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">12.1</span> script-Befehl</h2>' +
    '<p>Der Standard-Tool f&uuml;r Terminal-Protokollierung unter Linux.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Protokoll starten\nscript -f session_$(date +%Y%m%d_%H%M%S).log\n\n# Mit Zeitstempel und Kompression\nscript -f -e "session: %H:%M -- " session_$(date +%Y%m%d_%H%M%S).log\n\n# Automatischer Dateiname (YYYYMMDD_HHMMSS)\nSCRIPT=session_$(date +%Y%m%d_%H%M%S).log; script -f "$SCRIPT"\n\n# Protokoll beenden\nexit</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Option</th><th>Beschreibung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>-f</td><td>Flush immediately (immediate Speicherung)</td></tr>' +
    '<tr><td>-e STRING</td><td>Prompt vor jedem Befehl ausgeben</td></tr>' +
    '<tr><td>-a FILE</td><td>An bestehendes File anh&auml;ngen</td></tr>' +
    '<tr><td>-q</td><td>Quiet mode (weniger Output)</td></tr>' +
    '<tr><td>-c COMMAND</td><td>Alternative Shell nutzen</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#9432; Tipp</div>' +
    '<p>Nutze <span class="inline-code">-f</span> (flush) f&uuml;r kritische Befehle. Wenn der Systemcrasht, ist das Protokoll trotzdem bis dahin gesichert.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">12.2</span> Chain of Custody</h2>' +
    '<p>Dokumentation der kompletten Beweiskette von der &Uuml;bernahme bis zur Abgabe.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># &Uuml;bernahme dokumentieren\necho "=== &Uuml;bernahme ===" >> /cases/case01/notes/chain_of_custody.log\necho "Datum: $(date +\\"%Y-%m-%d %H:%M:%S\\")" >> /cases/case01/notes/chain_of_custody.log\necho "Untersucher: $(whoami)" >> /cases/case01/notes/chain_of_custody.log\necho "Device: /dev/sdb" >> /cases/case01/notes/chain_of_custody.log\necho "Serial: $(hdparm -I /dev/sdb | grep Serial)" >> /cases/case01/notes/chain_of_custody.log\n\n# Hash dokumentieren\necho "Original-Hash: $(sha256sum /dev/sdb)" >> /cases/case01/notes/chain_of_custody.log\n\n# Imaging dokumentieren\necho "Image-Hash: $(sha256sum case01.dd)" >> /cases/case01/notes/chain_of_custody.log\n\n# &Uuml;bergabe dokumentieren\necho "=== &Uuml;bergabe ===" >> /cases/case01/notes/chain_of_custody.log\necho "Empf&auml;nger: Max Mustermann" >> /cases/case01/notes/chain_of_custody.log\necho "Datum: $(date +\\"%Y-%m-%d %H:%M:%S\\")" >> /cases/case01/notes/chain_of_custody.log</code></pre></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wichtig</div>' +
    '<p>Chain of Custody MUSS l&uuml;ckenlos sein. Jede Handlung, jede &Uuml;bergabe, jeder ' +
    'Transport muss dokumentiert werden. L&uuml;cke = Beweis vor Gericht nicht verwertbar.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">12.3</span> Case-Ordnerstruktur</h2>' +
    '<p>Saubere Struktur erleichtert die Dokumentation und sp&auml;ter sp&auml;ter sp&auml;ter.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Case-Ordner erstellen\nmkdir -p /cases/case01/{images,mounts,hashes,notes,reports,tools}\n\n# In notes:\n# - chain_of_custody.log (Beweiskette)\n# - case_notes.log (Untersuchungsnotizen)\n# - commands.log (Alle ausgef&uuml;hrten Befehle)\n\n# In hashes:\n# - original.sha256 (Hash des Originals)\n# - image.sha256 (Hash des Images)\n# - verification.sha256 (Verifizierungsergebnis)</code></pre></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#9432; Tipp</div>' +
    '<p>Hash-Dateien im Format <span class="inline-code">HASHVALUE  FILENAME</span> speichern. ' +
    'Damit kannst du mit <span class="inline-code">sha256sum -c</span> einfach verifizieren.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">12.4</span> Gerichtsverwertbarkeit</h2>' +
    '<p>Was macht forensische Beweise vor Gericht verwertbar?</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">RECHTLICH</span><button class="copy-btn">Kopieren</button></div><pre><code>Anforderungen f&uuml;r gerichtliche Verwertbarkeit:\n\n1. L&uuml;ckenlose Dokumentation\n   - Jeder Schritt protokolliert (script-Befehl)\n   - Chain of Custody dokumentiert\n   - Zeitstempel, Untersucher, Tools dokumentiert\n\n2. Integrit&auml;tspr&uuml;fung\n   - Hashes vor und nach dem Imaging\n   - Verifizierung dokumentiert\n   - Hash-Algorithmus standardisiert (SHA-256)\n\n3. Forensisch saubere Arbeitsweise\n   - Original nicht ver&auml;ndert\n   - Write-Blocker verwendet\n   - Nur read-only Analysis\n\n4. Wiederholbarkeit\n   - Jeder Schritt von unabh&auml;ngiger Person reproduzierbar\n   - Tools dokumentiert mit Version\n   - Befehle exakt dokumentiert</code></pre></div>' +
    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Typische Fehler in diesem Kapitel</div>' +
    '<ul>' +
    '<li><strong>Kein script-Befehl:</strong> Terminal-Sitzung nicht protokolliert</li>' +
    '<li><strong>L&uuml;ckenhafte Chain of Custody:</strong> &Uuml;bergabe nicht dokumentiert</li>' +
    '<li><strong>Hashes nicht verifiziert:</strong> Hash-Erstellung, aber keine Verifizierung</li>' +
    '<li><strong>Zeitstempel fehlen:</strong> Wann wurden welche Schritte durchgef&uuml;hrt?</li>' +
    '<li><strong>Tools nicht dokumentiert:</strong> Welche Version von Sleuth Kit wurde verwendet?</li>' +
    '<li><strong>Original ver&auml;ndert:</strong> Forensische Regel verletzt</li>' +
    '</ul>' +
    '</div>' +

    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Chain of Custody erstellen</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Erstelle eine vollst&auml;ndige Chain of Custody Dokumentation f&uuml;r einen Fall.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Case-Ordner strukturieren</li>' +
    '<li>&Uuml;bernahme dokumentieren (Datum, Untersucher, Device, Serial)</li>' +
    '<li>Original-Hash dokumentieren</li>' +
    '<li>Imaging dokumentieren</li>' +
    '<li>Image-Hash dokumentieren</li>' +
    '<li>Verifizierung dokumentieren</li>' +
    '<li>Alle Schritte mit script-Befehl protokollieren</li>' +
    '<li>Wann ist die Chain of Custody l&uuml;ckenlos?</li>' +
    '</ol></div>' +
    '<div class="toggle-container">' +
    '<div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>' +
    '<div class="toggle-content">' +
    '<p><strong>Chain of Custody ist l&uuml;ckenlos, wenn:</strong></p>' +
    '<ul><li>Jeder Schritt mit Datum &amp; Zeit dokumentiert ist</li>' +
    '<li>Der Untersteller &amp; Untersucher benannt ist</li>' +
    '<li>Das Device eindeutig identifiziert ist</li>' +
    '<li>Alle Hashes dokumentiert und verifiziert sind</li>' +
    '<li>Imaging, Analyse und Abgabe dokumentiert sind</li>' +
    '<li>Alle &Uuml;bergaben mit Empf&auml;nger &amp; Datum dokumentiert sind</li></ul>' +
    '</div></div>' +
    '</div></div>' +

    '<button class="complete-section-btn" data-chapter="ch14-protokollierung">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch13-vergleich">&#8592; Vergleich</button>' +
    '<button class="nav-btn" data-target="ch15-write-blocker">Write-Blocker &#8594;</button>' +
    '</div>';
};

Chapters['ch15-write-blocker'] = function () {
  return '<h1 class="chapter-title">Write-Blocker</h1>' +
    '<div class="chapter-subtitle">Hardware & Software - Original vor Ver&auml;nderungen sch&uuml;tzen</div>' +

    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div>' +
    '<p>Ein Write-Blocker verhindert, dass das Untersuchungssystem auf den ' +
    'Original-Datentr&auml;ger schreibt. Ohne Write-Blocker kann versehentlich oder ' +
    'absichtlich der Datentr&auml;ger ver&auml;ndert werden, was die forensische ' +
    'Integrit&auml;t zerst&ouml;rt.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">13.1</span> Hardware-Write-Blocker</h2>' +
    '<p>Physische Hardware-Ger&auml;te, die Writes blocken.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Hardware-Write-Blocker verifizieren\nlsblk -o NAME,RO\n\n# RO=1 bedeutet Read-Only (Write-Blocker aktiv)\nlsblk -o NAME,RO,SIZE,TYPE,MOUNTPOINT,MODEL</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Typ</th><th>Vorteile</th><th>Nachteile</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>USB Write-Blocker</td><td>Billig, universell kompatibel</td><td>Kann umgangen werden, fragil</td></tr>' +
    '<tr><td>PCIe Write-Blocker</td><td>Schnell, zuverl&auml;ssig, schwer zu umgehen</td><td>Teuer, ben&ouml;tigt freien PCI-Slot</td></tr>' +
    '<tr><td>eSATA/SATA Write-Blocker</td><td>Kompatibel mit SATA-Devices</td><td>L&auml;ngsamer als PCIe, kann umgangen werden</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wichtig</div>' +
    '<p>Hardware-Write-Blocker k&ouml;nnen von kompromittierten Systemen umgangen werden. ' +
    'Verifiziere den RO-Status vor dem Imaging!</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">13.2</span> Software-Write-Blocker</h2>' +
    '<p>Kernel-Level Protection, die Writes blockt.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Linux Kernel Write-Blocker (SysRq)\necho 1 > /proc/sys/kernel/sysrq\necho w > /proc/sysrq-trigger\n\n# Pr&uuml;fen ob RO gesetzt ist\nlsblk -o NAME,RO\n\n# Reset (nur f&uuml;r Entwicklungs-Systeme!)\necho 0 > /proc/sys/kernel/sysrq</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Option</th><th>Beschreibung</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>1</td><td>Alle SysRq-Funktionen aktivieren</td></tr>' +
    '<tr><td>w</td><td>Alle Schreibzugriffe blocken (Write-Blocker)</td></tr>' +
    '<tr><td>0</td><td>SysRq deaktivieren</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Typische Fehler in diesem Kapitel</div>' +
    '<ul>' +
    '<li><strong>Kein Write-Blocker verwendet:</strong> Original wird versehentlich ver&auml;ndert</li>' +
    '<li><strong>RO-Status nicht verifiziert:</strong> Write-Blocker nicht aktiv</li>' +
    '<li><strong>Software-Write-Blocker auf Produktiv-System:</strong> Kann durch Malware umgangen werden</li>' +
    '<li><strong>Kernel-Reset ohne Grund:</strong> RO-Schutz wird aufgehoben</li>' +
    '</ul>' +
    '</div>' +

    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Write-Blocker verifizieren</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Verifiziere, ob ein Write-Blocker aktiv ist und verstehe die Auswirkungen.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>RO-Status pr&uuml;fen: <span class="inline-code">lsblk -o NAME,RO</span></li>' +
    '<li>Hardware vs Software: Was ist zuverl&auml;ssiger?</li>' +
    '<li>Wann ist Software-Write-Blocker akzeptabel?</li>' +
    '<li>Sch&auml;tze vor dem Imaging ohne Write-Blocker!</li>' +
    '</ol></div>' +
    '<div class="toggle-container">' +
    '<div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>' +
    '<div class="toggle-content">' +
    '<p><strong>RO=1 bedeutet Read-Only (Write-Blocker aktiv)</strong></p>' +
    '<ul><li>Hardware-Write-Blocker ist zuverl&auml;ssiger (physisch)</li>' +
    '<li>Software-Write-Blocker kann durch Malware umgangen werden</li>' +
    '<li>Software-Write-Blocker ist nur f&uuml;r Entwicklungs-Systeme akzeptabel</li></ul>' +
    '</div></div>' +
    '</div></div>' +

    '<button class="complete-section-btn" data-chapter="ch15-write-blocker">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch14-protokollierung">&#8592; Protokollierung</button>' +
    '<button class="nav-btn" data-target="ch16-sicheres-loeschen">Sicheres L&ouml;schen &#8594;</button>' +
    '</div>';
};

Chapters['ch16-sicheres-loeschen'] = function () {
  return '<h1 class="chapter-title">Sicheres L&ouml;schen</h1>' +
    '<div class="chapter-subtitle">HDD, SATA-SSD, NVMe - Forensisch sauberes Datenvernichten</div>' +

    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div>' +
    '<p>Forensisch sicheres L&ouml;schen stellt sicher, dass Daten nicht mehr ' +
    'wiederhergestellt werden k&ouml;nnen. Dies ist wichtig, um Beweise zu ' +
    'vernichten oder Speichermedien f&uuml;r neue Eins&auml;tze vorzubereiten. ' +
    'Nicht-forensisches L&ouml;schen kann Datenrekonstruktion erm&ouml;glichen.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">14.1</span> HDD (Hard Disk Drive)</h2>' +
    '<p>Magnetische Speicher - Daten sind durch Bits auf magnetischen Scheiben repr&auml;sent.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Einfaches Null-&Uuml;berschreiben (1x)\ndd if=/dev/zero of=/dev/sda bs=1M status=progress\n\n# Random (besser, aber langsam)\ndd if=/dev/urandom of=/dev/sda bs=1M status=progress\n\n# Gutmann-Algorithmus (35 Passes - sehr langsam)\nshred -n 35 -vz /dev/sda\n\n# DoD 5220.22-M (7 Passes)\nshred -n 7 -vz /dev/sda</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Methode</th><th>Passes</th><th>Zeit</th><th>Sicherheit</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>Null</td><td>1</td><td>Schnell</td><td>Niedrig</td></tr>' +
    '<tr><td>Random</td><td>1</td><td>Mittel</td><td>Mittel</td></tr>' +
    '<tr><td>Gutmann</td><td>35</td><td>Sehr langsam</td><td>Sehr hoch</td></tr>' +
    '<tr><td>DoD 5220.22-M</td><td>7</td><td>Langsam</td><td>Hoch</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wichtig</div>' +
    '<p>Auf modernen HDDs kann der Controller defekte Sektoren remappen. Diese ' +
    'Remapped-Sectors sind schwer zu l&ouml;schen und k&ouml;nnen Daten enthalten.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">14.2</span> SATA-SSD</h2>' +
    '<p>Flash-Speicher - Wear Leveling und Bad Block Management machen L&ouml;schen komplex.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># ATA Secure Erase (Empfohlen)\nhdparm --user-master --secure-erase 0 /dev/sda\n\n# ATA Secure Erase (Enhanced)\nhdparm --user-master --secure-erase-enhanced 0 /dev/sda\n\n# Pr&uuml;fen ob Secure Erase unterst&uuml;tzt wird\nhdparm -I /dev/sda | grep -i security\n\n# Alternativ: TRIM (nicht sicher f&uuml;r forensische L&ouml;schung)\nblkdiscard /dev/sda</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Methode</th><th>Zeit</th><th>Sicherheit</th><th>Hinweis</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>ATA Secure Erase</td><td>Schnell</td><td>Sehr hoch</td><td>Unter Controller-Verwaltung, aber forensisch akzeptabel</td></tr>' +
    '<tr><td>Enhanced Secure Erase</td><td>Mittel</td><td>Sehr hoch</td><td>Zus&auml;tzliche Schl&uuml;ssel-Vernichtung</td></tr>' +
    '<tr><td>shred (Software)</td><td>Langsam</td><td>Mittel</td><td>Wear Leveling kann Daten ungel&ouml;scht lassen</td></tr>' +
    '<tr><td>TRIM</td><td>Schnell</td><td>Niedrig</td><td>Nicht forensisch sicher!</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Typische Fehler</div>' +
    '<ul>' +
    '<li><strong>shred auf SSD nutzen:</strong> Wear Leveling verhindert komplettes L&ouml;schen</li>' +
    '<li><strong>TRIM f&uuml;r forensisches L&ouml;schen:</strong> TRIM ist kein L&ouml;schen!</li>' +
    '<li><strong>Secure Erase nicht verifiziert:</strong> Fehler beim L&ouml;schen nicht bemerkt</li>' +
    '<li><strong>Wear Leveling ignoriert:</strong> SSDs k&ouml;nnen Reservewords haben</li>' +
    '</ul>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">14.3</span> NVMe SSD</h2>' +
    '<p>PCIe-Flash-Speicher - Sanitize-Befehle unterst&uuml;tzen forensisches L&ouml;schen.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># NVMe Sanitize (Empfohlen)\nnvme sanitize /dev/nvme0\n\n# Sanize-Optionen\n# -a: 0=No-Action, 1=Exit-Failure-Maximum-Time, 2=Crypto-Erase, 3=Overwrite, 4=Block-Erase, 5=Exit-Failure-Minimum-Time\nnvme sanitize -a 2 /dev/nvme0  # Crypto-Erase\nnvme sanitize -a 3 /dev/nvme0  # Overwrite\n\n# NVMe Format (Alternativ)\nnvme format /dev/nvme0 -s 1\n\n# Pr&uuml;fen ob Sanitize unterst&uuml;tzt wird\nnvme id-ctrl /dev/nvme0 | grep -i sanitize</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Methode</th><th>Zeit</th><th>Sicherheit</th><th>Hinweis</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>Crypto-Erase</td><td>Schnell</td><td>Sehr hoch</td><td>Vernichtet alle internen Schl&uuml;ssel</td></tr>' +
    '<tr><td>Overwrite</td><td>Mittel</td><td>Hoch</td><td>&Uuml;berschreibt mit Mustern</td></tr>' +
    '<tr><td>Block-Erase</td><td>Schnell</td><td>Hoch</td><td>L&ouml;scht alle Bl&ouml;cke</td></tr>' +
    '<tr><td>Format</td><td>Schnell</td><td>Mittel</td><td>Wiederherstellung theoretisch m&ouml;glich</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#9432; Tipp</div>' +
    '<p>NVMe Crypto-Erase ist die sicherste Methode, wenn der Controller sie unterst&uuml;tzt.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">14.4</span> Warum forensisch sicheres L&ouml;schen?</h2>' +
    '<p>Unterschied zwischen normalem und forensischem L&ouml;schen.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Normal (nicht forensisch)\nrm -rf /data/*\n\n# Forensisch sicher\nshred -n 7 -vz /dev/sda\nhdparm --user-master --secure-erase 0 /dev/sda\nnvme sanitize /dev/nvme0</code></pre></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wichtig</div>' +
    '<p><span class="inline-code">rm -rf</span> l&ouml;scht nur Dateisystem-Metadaten, nicht die Daten selbst. ' +
    'Forensische Werkzeuge k&ouml;nnen die Daten wiederherstellen!</p>' +
    '</div>' +

    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">L&ouml;schen-Methode w&auml;hlen</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>W&auml;hle die passende L&ouml;schen-Methode f&uuml;r verschiedene Szenarien.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Szenario 1: HDD, Zeit ist kritisch (maximal 1 Stunde). Welche Methode?</li>' +
    '<li>Szenario 2: SATA-SSD, maximale Sicherheit ben&ouml;tigt. Welche Methode?</li>' +
    '<li>Szenario 3: NVMe SSD, schnell und sicher. Welche Methode?</li>' +
    '<li>Szenario 4: HDD, forensische Standards (DoD 5220.22-M). Welche Methode?</li>' +
    '</ol></div>' +
    '<div class="toggle-container">' +
    '<div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>' +
    '<div class="toggle-content">' +
    '<p><strong>Szenario 1:</strong> Null- oder Random-Write (1x) - Schnell, aber mittlere Sicherheit</p>' +
    '<p><strong>Szenario 2:</strong> Enhanced Secure Erase - Sehr sicher, schneller als overwrite</p>' +
    '<p><strong>Szenario 3:</strong> NVMe Crypto-Erase - Schnellste und sicherste Methode</p>' +
    '<p><strong>Szenario 4:</strong> DoD 5220.22-M (7 Passes) - Forensischer Standard, sehr langsam</p>' +
    '</div></div>' +
    '</div></div>' +

    '<button class="complete-section-btn" data-chapter="ch16-sicheres-loeschen">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch15-write-blocker">&#8592; Write-Blocker</button>' +
    '<button class="nav-btn" data-target="ch17-best-practices">Best Practices &#8594;</button>' +
    '</div>';
};

Chapters['ch17-best-practices'] = function () {
  return '<h1 class="chapter-title">Best Practices</h1>' +
    '<div class="chapter-subtitle">Dos & Don\'ts - Was du tun solltest und was nicht</div>' +

    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div>' +
    '<p>Best Practices garantieren, dass deine forensische Arbeit ' +
    'sicher, wiederholbar und gerichtlich verwertbar ist. Ein einziger Fehler ' +
    'kann ein ganzes Fall zerst&ouml;ren. Folge diesen Regeln, um Fehler zu vermeiden.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">15.1</span> DOS - Das du immer tun solltest</h2>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BEST PRACTICES</span><button class="copy-btn">Kopieren</button></div><pre><code>1. IMMER Write-Blocker verwenden\n   - Hardware-Write-Blocker (sicherer)\n   - Software-Write-Blocker (entwicklungs-Systeme)\n   - RO-Status verifizieren: lsblk -o NAME,RO\n\n2. IMMER Hashes vor und nach dem Imaging\n   - Original-Hash: sha256sum /dev/sda\n   - Image-Hash: sha256sum case01.dd\n   - Verifizierung: sha256sum -c image.sha256\n\n3. IMMER mit script-Befehl arbeiten\n   - Protokollierung: script -f session_$(date +%Y%m%d_%H%M%S).log\n   - Zeitstempel und Befehle dokumentiert\n\n4. IMMER read-only mounten\n   - Kein Schreibzugriff auf das Image\n   - Nur Analysis-Tools nutzen\n\n5. IMMER Chain of Custody dokumentieren\n   - &Uuml;bernahme, Imaging, Analyse, &Uuml;bergabe\n   - Jeder Schritt mit Datum &amp; Zeit\n\n6. IMMER Original nicht ver&auml;ndern\n   - Nur vom Image arbeiten\n   - Original sicher verwahren\n\n7. IMMER Backups erstellen\n   - Von Images, Hashes, Protokollen\n   - Mindestens 2 Speicherorte</n\n8. IMMER Tools dokumentieren\n   - Welche Version, welche Parameter\n   - Wiederholbarkeit gew&auml;hrleisten</code></pre></div>' +

    '<h2 class="section-title"><span class="number">15.2</span> DON\'TS - Das du niemals tun solltest</h2>' +
    '<div class="code-block"><div class="code-header"><span class="lang">DON\'TS</span><button class="copy-btn">Kopieren</button></div><pre><code>1. NIE Original-Datentr&auml;ger mounten\n   - Original immer read-only bleiben\n   - Kein Dateisystem-Write-Zugriff\n\n2. NIE ohne Hashes arbeiten\n   - Ohne Hashes keine Integrit&auml;tspr&uuml;fung\n   - Verifizierung unm&ouml;glich\n\n3. NIE falsches Device verwenden\n   - Falsches Device = anderer Datentr&auml;ger!\n   - Immer mit lsblk identifizieren\n\n4. NIE Write-Blocker umgehen\n   - Selbst bei "notwendigen" Writes!\n   - Alternative: Software-Write-Blocker\n\n5. NIE ungesichert l&ouml;schen\n   - rm -rf ist NICHT forensisch!\n   - shred, hdparm, nvme sanitize nutzen\n\n6. NIE Protokollierung vergessen\n   - Ohne Protokoll keine Beweiskette\n   - Gerichtliche Verwertbarkeit unm&ouml;glich\n\n7. NIE Tools mit unbekannten Parametern nutzen\n   - Unbekannte Optionen = unbekannte Ergebnisse\n   - Dokumentation lesen, verstehen, anwenden\n\n8. NIE Evidenzen mixen\n   - Jede Evidenz separat behandeln\n   - Cross-Contamination vermeiden</code></pre></div>' +

    '<h2 class="section-title"><span class="number">15.3</span> Qualit&auml;ts-Checkliste</h2>' +
    '<p>Checkliste vor der &Uuml;bergabe:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">CHECKLISTE</span><button class="copy-btn">Kopieren</button></div><pre><code>[ ] 1. Write-Blocker verwendet und verifiziert\n[ ] 2. Original-Hash dokumentiert\n[ ] 3. Image-Hash dokumentiert\n[ ] 4. Hashes verifiziert (identisch!)\n[ ] 5. Script-Protokoll vorhanden und l&uuml;ckenlos\n[ ] 6. Chain of Custody dokumentiert\n[ ] 7. Alle Befehle dokumentiert\n[ ] 8. Tools und Versionen dokumentiert\n[ ] 9. Read-only mounten best&auml;tigt\n[ ] 10. Backups erstellt und verifiziert\n[ ] 11. Keine Original-Ver&auml;nderungen\n[ ] 12. Forensisch sauberes L&ouml;schen (falls n&ouml;tig)\n[ ] 13. Gerichtsverwertbarkeit gepr&uuml;ft\n[ ] 14. Fall-Ordner sauber strukturiert\n[ ] 15. Unterschriften dokumentiert (falls n&ouml;tig)</code></pre></div>' +

    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#9432; Tipp</div>' +
    '<p>Wenn du alle 15 Punkte "Ja" angekreuzt hast, ist dein Fall gerichtlich ' +
    'verwertbar. Fehlendes = Beweis vor Gericht abgelehnt!</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">15.4</span> Fall-Check vor &Uuml;bergabe</h2>' +
    '<p>Fragen, die du dir vor der &Uuml;bergabe stellen solltest:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">SELF-CHECK</span><button class="copy-btn">Kopieren</button></div><pre><code>1. Habe ich alle Evidenzen dokumentiert?\n2. Habe ich alle Hashes erstellt und verifiziert?\n3. Habe ich die Beweiskette l&uuml;ckenlos dokumentiert?\n4. Habe ich alle Befehle protokolliert?\n5. Kann ich jeden Schritt reproduzieren?\n6. Habe ich Backups von allen wichtigen Daten?\n7. Habe ich die Tools dokumentiert?\n8. Habe ich forensisch sauber gearbeitet?\n9. W&auml;re meine Schlussfolgerungen dokumentiert?\n10. Ist der Fall gerichtlich verwertbar?</code></pre></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wichtig</div>' +
    '<p>Wenn du eine dieser Fragen mit "Nein" beantwortest, dann solltest du ' +
    'diesen Schritt &uuml;berarbeiten bevor du den Fall &uuml;bergibst!</p>' +
    '</div>' +

    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Best-Practices-Analyse</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Analysiere Szenarien und entscheide, ob Best Practices befolgt wurden.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Szenario 1: Analyst hat ohne Write-Blocker gearbeitet. Problem?</li>' +
    '<li>Szenario 2: Hashes wurden nach dem Imaging erstellt. Problem?</li>' +
    '<li>Szenario 3: Original wurde versehentlich mountet. Problem?</li>' +
    '<li>Szenario 4: Protokollierung vergessen. Problem?</li>' +
    '<li>Szenario 5: Forensisches L&ouml;schen mit rm. Problem?</li>' +
    '</ol></div>' +
    '<div class="toggle-container">' +
    '<div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>' +
    '<div class="toggle-content">' +
    '<p><strong>Szenario 1:</strong> JA - Massive Verletzung! Original konnte versehentlich ver&auml;ndert werden.</p>' +
    '<p><strong>Szenario 2:</strong> JA - Keine Integrit&auml;tspr&uuml;fung! Kann nicht beweisen, dass Image = Original.</p>' +
    '<p><strong>Szenario 3:</strong> JA - Original-Ver&auml;nderung! Fall m&ouml;glicherweise vor Gericht abgelehnt.</p>' +
    '<p><strong>Szenario 4:</strong> JA - Keine Beweiskette! Gerichtliche Verwertbarkeit unm&ouml;glich.</p>' +
    '<p><strong>Szenario 5:</strong> JA - rm ist NICHT forensisch! Daten k&ouml;nnen wiederhergestellt werden.</p>' +
    '</div></div>' +
    '</div></div>' +

    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Typische Fehler in diesem Kapitel</div>' +
    '<ul>' +
    '<li><strong>Write-Blocker nicht verifiziert:</strong> RO-Status nicht gepr&uuml;ft</li>' +
    '<li><strong>Hashes vergessen:</strong> Keine Integrit&auml;tspr&uuml;fung</li>' +
    '<li><strong>Protokollierung vergessen:</strong> Keine Beweiskette</li>' +
    '<li><strong>Original ver&auml;ndert:</strong> Forensische Regel verletzt</li>' +
    '<li><strong>Falsches Device:</strong> Falscher Datentr&auml;ger bearbeitet</li>' +
    '<li><strong>Unn&ouml;tiges L&ouml;schen:</strong> Daten unwiederbringbar gel&ouml;scht</li>' +
    '<li><strong>Qualit&auml;ts-Check nicht durchgef&uuml;hrt:</strong> Fehler vor &Uuml;bergabe nicht bemerkt</li>' +
    '</ul>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch17-best-practices">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch16-sicheres-loeschen">&#8592; Sicheres L&ouml;schen</button>' +
    '<button class="nav-btn" data-target="ch18-tools">Tools &#8594;</button>' +
    '</div>';
};

Chapters['ch18-tools'] = function () {
  return '<h1 class="chapter-title">Tools</h1>' +
    '<div class="chapter-subtitle">Sleuth Kit, Autopsy, Binwalk, Strings, Xxd - Installation und Konfiguration</div>' +

    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div>' +
    '<p>Die richtigen Tools machen forensische Arbeit effizienter und sicher. ' +
    'Ohne geeignete Tools kann die Analyse Stunden oder Tage l&auml;nger dauern, ' +
    'w&auml;hrend spezialisierte Tools automatisiertes Scannen und ' +
    'Verarbeiten bieten. Tool-Kenntnisse sind essenziell f&uuml;r jeden Forensiker.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">16.1</span> Sleuth Kit (sk) &amp; Autopsy</h2>' +
    '<p>Das Open-Source-Standard-Werkzeug f&uuml;r File-System und Volume Analysis.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation (Debian/Ubuntu)\napt install sleuthkit autopsy\n\n# Version pr&uuml;fen\nfls -V\nautopsy -V\n\n# Filesystem Analyse\nfls -r image.dd\n\n# Metadata\nstat -s image.dd\n\n# Timeline\ntsk_gettimes -o /tmp/timeline.csv image.dd</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Tool</th><th>Funktion</th><th>Besonderheit</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>fls</td><td>Listet Directory-Eintr&auml;ge</td><td>Rekursiv mit -r</td></tr>' +
    '<tr><td>fsstat</td><td>Zeigt Filesystem-Statistiken</td><td>Blocksize, Cluster, Flags</td></tr>' +
    '<tr><td>stat</td><td>Zeigt Metadata</td><td>MAC-Times</td></tr>' +
    '<tr><td>tsk_gettimes</td><td>Timeline-Erstellung</td><td>CSV-Export</td></tr>' +
    '<tr><td>Autopsy</td><td>GUI-Analyse</td><td>Integriert alle sleuthkit-Tools</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#9432; Tipp</div>' +
    '<p>Autopsy integriert alle sleuthkit-Tools in einer GUI. Nutze es f&uuml;r ' +
    'komplexe Analysen, sleuthkit f&uuml;r CLI-Automatisierung.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">16.2</span> Binwalk</h2>' +
    '<p>Signatur-Suche und Forensik-Tool zum Identifizieren von Embedded-Dateien.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation (Debian/Ubuntu)\napt install binwalk\n\n# Signaturen scan (rekursiv)\nbinwalk -e image.dd\n\n# Signaturen scan (tief)\nbinwalk -B image.dd\n\n# Entropy-Analyse\nbinwalk -E image.dd\n\n# Firmware extrahieren\nbinwalk -e -M firmware.bin</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Option</th><th>Beschreibung</th><th>Anwendungsfall</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>-e</td><td>Extract (Dateien extrahieren)</td><td>Embedded-Systeme</td></tr>' +
    '<tr><td>-M</td><td>Matryoshka (rekursiv extrahieren)</td><td>Zip-in-Datei</td></tr>' +
    '<tr><td>-B</td><td>Binwalk-Signaturen (bessere Erkennung)</td><td>Unbekannte Dateien</td></tr>' +
    '<tr><td>-E</td><td>Entropy-Analyse (Verschl&uuml;sselung?)</td><td>Encrypted-Daten</td></tr>' +
    '<tr><td>-R</td><td>Rekursiv (Unterverzeichnisse)</td><td>Komplette Scans</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wichtig</div>' +
    '<p>Binwalk extrahiert in aktuelle Verzeichnis! Nutze <span class="inline-code">--directory</span> ' +
    'oder <span class="inline-code">-d</span> um das Zielverzeichnis anzugeben.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">16.3</span> Strings</h2>' +
    '<p>Extrahiert lesbare Zeichen aus Bin&auml;rdateien.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation (meistens schon installiert)\napt install binutils\n\n# Strings extrahieren\nstrings memory_dump.raw\n\n# Minimale L&auml;nge (default: 4)\nstrings -n 6 memory_dump.raw\n\n# Encoding angeben\nstrings -e l memory_dump.raw  # ASCII\nstrings -e b memory_dump.raw  # 8-bit\n\n# Mit Offset\nstrings -t d memory_dump.raw | grep "password"</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Option</th><th>Beschreibung</th><th>Anwendungsfall</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>-n N</td><td>Minimale L&auml;nge</td><td>L&auml;ngere Strings</td></tr>' +
    '<tr><td>-e X</td><td>Encoding (l=b/L, a=A, b=B, x=X)</td><td>Spezifische Texte</td></tr>' +
    '<tr><td>-t TYPE</td><td>Offset-Typ (d=decimal, x=hex, o=octal)</td><td>Offset-f&uuml;r grep</td></tr>' +
    '<tr><td>-f</td><td>Format mit Feldern</td><td>Automatisierte Analyse</td></tr>' +
    '<tr><td>-a</td><td>Alle Dateien (nur Scan-Files)</td><td>Komplette Scans</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#9432; Tipp</div>' +
    '<p><span class="inline-code">strings -t d</span> ist perfekt f&uuml;r Memory-Dumps. Die Offset ' +
    'zeigen, wo Strings im RAM sind.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">16.4</span> Xxd &amp; Hexdump</h2>' +
    '<p>Hex-Editor und -Analyzer f&uuml;r tiefe Bin&auml;ranalyse.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Xxd Installation\napt install xxd\n\n# Hexdump (readable)\nxxd image.bin | head -20\n\n# Hexdump (offset)\nxxd -s 0x200 -l 0x100 image.bin\n\n# Reverse Hexdump (Hex->File)\necho "48 65 6c 6c 6f" | xxd -r -p > hello.txt\n\n# Hexdump mit grep\nxxd image.bin | grep "Signature"</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Option</th><th>Beschreibung</th><th>Anwendungsfall</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>-s OFFSET</td><td>Start-Offset</td><td>Spezifischer Bereich</td></tr>' +
    '<tr><td>-l LEN</td><td>Anzahl Bytes</td><td>Bereich begrenzen</td></tr>' +
    '<tr><td>-c COLS</td><td>Spalten pro Zeile</td><td>Ausrichtung</td></tr>' +
    '<tr><td>-p</td><td>Plain Hex (ohne ASCII)</td><td>Script-Verarbeitung</td></tr>' +
    '<tr><td>-r</td><td>Reverse (Hex->Bin)</td><td>Hex-Dateien erstellen</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wichtig</div>' +
    '<p>Offsets bei xxd sind in HEX (<span class="inline-code">0x200</span>), aber <span class="inline-code">-s</span> ' +
    'akzeptiert auch Dezimal (<span class="inline-code">-s 512</span>).</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">16.5</span> Weitere Tools</h2>' +
    '<p>Zus&auml;tzliche forensische Tools, die du kennen solltest:</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Foremost (Forensische Carving)\napt install foremost\nforemost -t all -o /tmp/recovered/ image.dd\n\n# PhotoRec (Bild-Wiederherstellung)\napt install testdisk\nphotorec image.dd\n\n# Bulk Extractor (Massenextraktion)\napt install bulk-extractor\nbulk_extractor -o /tmp/output/ image.dd\n\n# Volatility (Memory-Forensik)\napt install volatility-framework\nvol.py -f memory.dump imageinfo\n\n# Wireshark (Network-Forensik)\napt install wireshark\nwireshark capture.pcap</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Tool</th><th>Typ</th><th>Anwendungsfall</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>Foremost</td><td>Carving</td><td>Unvollst&auml;ndige Dateien wiederherstellen</td></tr>' +
    '<tr><td>PhotoRec</td><td>Bilder</td><td>Gel&ouml;schte Fotos wiederherstellen</td></tr>' +
    '<tr><td>Bulk Extractor</td><td>Massenextraktion</td><td>Emails, URLs, etc. aus Image</td></tr>' +
    '<tr><td>Volatility</td><td>Memory-Forensik</td><td>RAM-Dumps analysieren</td></tr>' +
    '<tr><td>Wireshark</td><td>Network-Forensik</td><td>PCAP-Dateien analysieren</td></tr>' +
    '</tbody></table></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#9432; Tipp</div>' +
    '<p>Versuche nicht, alle Tools sofort zu lernen. Beginne mit sleuthkit, ' +
    'strings, xxd und arbeite dich zu spezialisierteren Tools vor!</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">16.6</span> Tool-Kompatibilit&auml;ts-Matrix</h2>' +
    '<p>Welches Tool wof&uuml;r nutzen?</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">MATRIX</span><button class="copy-btn">Kopieren</button></div><pre><code>Analysier-Aufgabe                 | Primary Tool      | Alternative Tool\n--------------------------------|----------------|-------------------\nFilesystem-Analyse              | sleuthkit (fls) | Autopsy\nMetadata                        | sleuthkit (stat) | tsk_gettimes\nEmbedded-Dateien                | binwalk         | foremost\nStrings aus Bin&auml;rdateien        | strings          | hexdump + grep\nHex-Analyse                     | xxd             | hexdump\nCarving (unvollst&auml;ndig)       | foremost         | photorec\nMemory-Forensik                 | volatility       | strings + grep\nNetwork-Forensik                | wireshark       | tshark\nIntegrit&auml;tspr&uuml;fung         | sha256sum        | md5sum</code></pre></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wichtig</div>' +
    '<p>Die Matrix zeigt nur Richtlinien. Einige Aufgaben erfordern mehrere Tools ' +
    'in Kombination!</p>' +
    '</div>' +

    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Tool-Auswahl</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>W&auml;hle die passenden Tools f&uuml;r verschiedene Szenarien.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Szenario 1: Filesystem-Scan des Image. Welches Tool?</li>' +
    '<li>Szenario 2: Embedded-Dateien aus Firmware extrahieren. Welches Tool?</li>' +
    '<li>Szenario 3: Strings aus Memory-Dump finden. Welches Tool?</li>' +
    '<li>Szenario 4: MBR-Signatur verifizieren. Welches Tool?</li>' +
    '<li>Szenario 5: PCAP analysieren. Welches Tool?</li>' +
    '</ol></div>' +
    '<div class="toggle-container">' +
    '<div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>' +
    '<div class="toggle-content">' +
    '<p><strong>Szenario 1:</strong> fls (sleuthkit)</p>' +
    '<p><strong>Szenario 2:</strong> binwalk -e</p>' +
    '<p><strong>Szenario 3:</strong> strings</p>' +
    '<p><strong>Szenario 4:</strong> xxd (oder hexdump)</p>' +
    '<p><strong>Szenario 5:</strong> wireshark</p>' +
    '</div></div>' +
    '</div></div>' +

    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Typische Fehler in diesem Kapitel</div>' +
    '<ul>' +
    '<li><strong>Falsches Tool gew&auml;hlt:</strong> Ein Tool f&uuml;r den falschen Zweck nutzen</li>' +
    '<li><strong>Parameter nicht verstanden:</strong> -e bei xxd ist anders als bei binwalk</li>' +
    '<li><strong>Extrahieren in aktuellem Verzeichnis:</strong> Ohne Zielverzeichnis Chaos!</li>' +
    '<li><strong>Encoding falsch:</strong> strings -e x vs -e b kann ganz andere Ergebnisse</li>' +
    '<li><strong>Offset-Konfussion:</strong> 0x200 = 512, nicht 200!</li>' +
    '<li><strong>Tool-Mix: </strong> Mehrere Tools ohne Strategie nutzlos</li>' +
    '</ul>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch18-tools">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch17-best-practices">&#8592; Best Practices</button>' +
    '<button class="nav-btn" data-target="ch19-datenrettung">Datenrettung &#8594;</button>' +
    '</div>';
};

Chapters['ch19-datenrettung'] = function () {
  return '<h1 class="chapter-title">Datenrettung &amp; File Carving</h1>' +
    '<div class="chapter-subtitle">Gel&ouml;schte Dateien wiederherstellen &ndash; Forensische Rekonstruktion</div>' +

    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div>' +
    '<p>VeRD&auml;chtige l&ouml;schen h&auml;ufig Spuren &ndash; doch L&ouml;schen bedeutet nicht ' +
    '&Uuml;berschreiben. File Carving rekonstruiert Dateien direkt aus dem rohen Datentr&auml;ger-Image, ' +
    'unabh&auml;ngig vom Dateisystem. F&uuml;r die ABB IT-Fahndung ist dies ein zentrales Werkzeug ' +
    'zur Beweissicherung bei Betrugsf&auml;llen.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">19.1</span> Grundlagen: Was passiert beim L&ouml;schen?</h2>' +
    '<p>Wenn eine Datei gel&ouml;scht wird (z.&nbsp;B. mit <code>rm</code>), wird nicht der Dateiinhalt ' +
    'gel&ouml;scht &ndash; nur der Verzeichniseintrag (Inode/Dentry) wird als frei markiert. Die Datenbl&ouml;cke ' +
    'bleiben physisch erhalten, bis sie &uuml;berschrieben werden.</p>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Dateisystem</th><th>L&ouml;schmechanismus</th><th>Wiederherstellbarkeit</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>ext4</td><td>Inode freigegeben, Datenbl&ouml;cke markiert</td><td>Hoch (solange unbenutzt)</td></tr>' +
    '<tr><td>NTFS</td><td>MFT-Eintrag als gel&ouml;scht markiert</td><td>Hoch</td></tr>' +
    '<tr><td>FAT32</td><td>Erstes Zeichen im Dir-Eintrag auf 0xE5</td><td>Hoch</td></tr>' +
    '<tr><td>APFS</td><td>Snapshot-basiert, CoW</td><td>Sehr hoch (Snapshots)</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">19.2</span> TestDisk &ndash; Partitionen und Dateien retten</h2>' +
    '<p>TestDisk ist ein Open-Source-Tool zur Wiederherstellung verlorener Partitionen und gel&ouml;schter Dateien. ' +
    'Es kann auch besch&auml;digte Bootsektoren reparieren.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># TestDisk starten (interaktiv)\ntestdisk image.dd\n\n# Nicht-interaktiver Modus: Gel&ouml;schte Dateien suchen\ntestdisk /list /cmd image.dd "advanced" "list" "quit"\n\n# Partitionstabelle analysieren\ntestdisk /cmd image.dd "analyze" "quick_search" "quit"</code></pre></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#9432; Tipp</div>' +
    '<p>Immer an einer Kopie des Images arbeiten, nie am Original! TestDisk bietet einen ' +
    'interaktiven Assistenten &ndash; am wichtigsten: "Create" f&uuml;r ein Logfile w&auml;hlen.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">19.3</span> Foremost &ndash; File Carving nach Signaturen</h2>' +
    '<p>Foremost sucht anhand von Datei-Headern (Magic Bytes) nach gel&ouml;schten Dateien im Image. ' +
    'Es funktioniert unabh&auml;ngig vom Dateisystem &ndash; selbst fragmentierte oder &uuml;berschriebene ' +
    'Dateien k&ouml;nnen teilweise rekonstruiert werden.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Alle unterst&uuml;tzten Dateitypen suchen\nforemost -i image.dd -o /cases/case01/carved/\n\n# Nur bestimmte Typen (PDF, DOCX, JPG, PNG)\nforemost -t pdf,docx,jpg,png -i image.dd -o /cases/case01/carved/\n\n# Mit verbose-Output\nforemost -v -i image.dd -o /cases/case01/carved/\n\n# Nur Header + Footer suchen (schneller)\nforemost -i image.dd -o /cases/case01/carved/ -t all\n\n# Eigene Signatur-Datei verwenden\nforemost -c /path/to/custom.conf -i image.dd -o /cases/case01/carved/</code></pre></div>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Dateityp</th><th>Magic Bytes (Hex)</th><th>Signatur</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>JPEG</td><td>FF D8 FF</td><td>JFIF/EXIF Header</td></tr>' +
    '<tr><td>PNG</td><td>89 50 4E 47</td><td>\\x89PNG</td></tr>' +
    '<tr><td>PDF</td><td>25 50 44 46</td><td>%PDF</td></tr>' +
    '<tr><td>GIF</td><td>47 49 46 38</td><td>GIF8</td></tr>' +
    '<tr><td>ZIP/DOCX</td><td>50 4B 03 04</td><td>PK\\x03\\x04</td></tr>' +
    '<tr><td>MZIP</td><td>4D 5A</td><td>MZ (PE-Header)</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">19.4</span> Scalpel &ndash; Erweitertes File Carving</h2>' +
    '<p>Scalpel ist eine Weiterentwicklung von Foremost mit besserer Performance und ' +
    'konfigurierbarem Regelsatz. Es unterst&uuml;tzt auch Gr&ouml;&szlig;enbeschr&auml;nkungen.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Scalpel mit Standard-Konfiguration\nscalpel -c /etc/scalpel/scalpel.conf -i image.dd -o /cases/case01/carved/\n\n# Nur JPG und PDF\nscalpel -c /etc/scalpel/scalpel.conf -t jpg,pdf -i image.dd -o /cases/case01/carved/\n\n# Konfigurationsdatei pr&uuml;fen\ncat /etc/scalpel/scalpel.conf | grep -v "^#" | grep -v "^$"</code></pre></div>' +

    '<h2 class="section-title"><span class="number">19.5</span> Photorec &ndash; Dateien aus besch&auml;digten Medien</h2>' +
    '<p>Photorec (Teil von TestDisk) ist spezialisiert auf die Wiederherstellung von ' +
    'Fotos, Dokumenten und Archiven &ndash; selbst von schwer besch&auml;digten Datentr&auml;gern.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Photorec starten (interaktiv)\nphotorec image.dd\n\n# Non-interaktiver Modus\nphotorec /d /cases/case01/photorec_out /cmd image.dd partition_none,options,fileopt,everything,search\n\n# Nur Office-Dokumente und PDF\nphotorec /d /cases/case01/docs/ image.dd</code></pre></div>' +

    '<h2 class="section-title"><span class="number">19.6</span> Sleuth Kit &ndash; Gel&ouml;schte Inodes finden</h2>' +
    '<p>Mit dem Sleuth Kit k&ouml;nnen gel&ouml;schte Inodes direkt im Dateisystem gefunden werden.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Gel&ouml;schte Dateien auflisten (ext)\nfls -r -p image.dd | grep "(deleted)"\n\n# Alle Inodes (auch gel&ouml;schte)\nils -e image.dd\n\n# Metadaten einer gel&ouml;schten Datei\nistat image.dd &lt;inode&gt;\n\n# Datenblock-Inhalt extrahieren\nblkcat image.dd &lt;fs_block&gt; &lt;block_nr&gt;\n\n# Gel&ouml;schte Datei wiederherstellen\nicat -r image.dd &lt;inode&gt; &gt; recovered_file.txt</code></pre></div>' +

    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">File Carving</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Gel&ouml;schte Dateien aus einem Image rekonstruieren.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Erstelle ein Test-Image mit <code>dd if=/dev/zero of=test.img bs=1M count=50</code></li>' +
    '<li>Formatiere und mounte es, lege Dateien an, l&ouml;sche sie</li>' +
    '<li>Unmounte und f&uuml;hre <code>foremost -i test.img -o carved/</code> aus</li>' +
    '<li>&Uuml;berpr&uuml;fe die gefundenen Dateien im <code>carved/</code>-Verzeichnis</li>' +
    '<li>Dokumentiere: Wie viele Dateien wurden gefunden? Welcher Typ?</li>' +
    '</ol></div>' +
    '<div class="toggle-container">' +
    '<div class="toggle-header"><span class="toggle-label">Erwartetes Ergebnis</span><span class="toggle-arrow">&#9654;</span></div>' +
    '<div class="toggle-content">' +
    '<p>Foremost sollte mindestens die meisten Dateien anhand ihrer Header-Signaturen ' +
    'wiederfinden. Textdateien ohne eindeutige Signatur werden nicht erkannt &ndash; ' +
    'diese L&uuml;cke f&uuml;llt <code>strings</code> in Kombination mit <code>grep</code>.</p>' +
    '</div></div>' +
    '</div></div>' +

    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Typische Fehler</div>' +
    '<ul>' +
    '<li><strong>Am Original gearbeitet:</strong> Carving ver&auml;ndert keine Daten, aber Mounten schon!</li>' +
    '<li><strong>Falscher Dateityp:</strong> ZIP und DOCX haben dieselbe Signatur (PK-Header)</li>' +
    '<li><strong>Fragmentierte Dateien:</strong> Foremost kann nur zusammenh&auml;ngende Bl&ouml;cke rekonstruieren</li>' +
    '<li><strong>Ausgabeverzeichnis auf demselben Image:</strong> Niemals auf das untersuchte Image schreiben</li>' +
    '</ul>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch19-datenrettung">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch18-tools">&#8592; Tools</button>' +
    '<button class="nav-btn" data-target="ch20-memory-forensik">Memory-Forensik &#8594;</button>' +
    '</div>';
};

Chapters['ch20-memory-forensik'] = function () {
  return '<h1 class="chapter-title">Memory-Forensik</h1>' +
    '<div class="chapter-subtitle">RAM-Analyse mit Volatility &ndash; Prozesse, Verbindungen und verborgene Spuren</div>' +

    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div>' +
    '<p>Der Arbeitsspeicher (RAM) enth&auml;lt fl&uuml;chtige Beweise, die nach dem Ausschalten ' +
    'verloren gehen: aktive Prozesse, Netzwerkverbindungen, Passw&ouml;rter im Klartext, ' +
    'verschl&uuml;sselte Keys und gel&ouml;schte Dateifragmente. Bei Hausdurchsuchungen ' +
    'sollte der RAM-Snapshot VOR dem Herunterfahren erstellt werden.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">20.1</span> RAM-Dump erstellen</h2>' +
    '<p>Der Memory-Dump muss erstellt werden, w&auml;hrend das System l&auml;uft. ' +
    'Verschiedene Tools stehen zur Verf&uuml;gung, je nach Zugriffsm&ouml;glichkeit.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># LiME (Linux Memory Extractor) - Kernel-Modul\ninsmod lime.ko "path=/cases/case01/images/memory.lime format=lime"\n\n# Alternative: /dev/mem dumpen\n dd if=/dev/mem of=/cases/case01/images/memory.raw bs=1M\n\n# Mit dc3dd (mit Hashing)\ndc3dd if=/dev/mem of=/cases/case01/images/memory.raw hash=sha256\n\n# Belkasoft RAM Capture (Remote-Tool)\n# Auf dem Zielsystem ausf&uuml;hren:\nbelkasoft_ram_capture output.raw</code></pre></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Wichtig</div>' +
    '<p>Der RAM-Dump ver&auml;ndert den Systemzustand (neue Prozesse, Cache-Ver&auml;nderung). ' +
    'Dokumentiere den genauen Zeitstempel und die verwendete Methode.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">20.2</span> Volatility 3 &ndash; Grundlegende Analyse</h2>' +
    '<p>Volatility ist das Standard-Tool f&uuml;r Memory-Forensik. Version 3 (Python 3) ' +
    'erkennt das Betriebssystem automatisch.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation\npip3 install volatility3\n\n# Verf&uuml;gbare Plugins auflisten\nvol -f memory.raw plugins\n\n# Betriebssystem erkennen\nvol -f memory.raw windows.info\nvol -f memory.raw linux.banner\n\n# Laufende Prozesse auflisten\nvol -f memory.raw windows.pslist\nvol -f memory.raw linux.pslist\n\n# Prozessbaum\nvol -f memory.raw windows.pstree\n\n# Versteckte Prozesse finden (Rootkit-Detection)\nvol -f memory.raw windows.psscan</code></pre></div>' +

    '<h2 class="section-title"><span class="number">20.3</span> Netzwerk-Verbindungen aus dem RAM</h2>' +
    '<p>Aktive und k&uuml;rzlich geschlossene Netzwerkverbindungen k&ouml;nnen aus dem RAM extrahiert werden.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Netzwerkverbindungen (Windows)\nvol -f memory.raw windows.netscan\nvol -f memory.raw windows.netstat\n\n# Netzwerkverbindungen (Linux)\nvol -f memory.raw linux.sockstat\n\n# DNS-Cache\nvol -f memory.raw windows.dlllist | grep -i dns\n\n# Offene Dateien pro Prozess\nvol -f memory.raw windows.handles --pid &lt;PID&gt;</code></pre></div>' +

    '<h2 class="section-title"><span class="number">20.4</span> Passw&ouml;rter und Credentials extrahieren</h2>' +
    '<p>Passw&ouml;rter k&ouml;nnen als Klartext im RAM stehen &ndash; besonders in SSH-Agent, ' +
    'Browser-Sessions und Verschl&uuml;sselungs-Tools.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Strings aus Memory-Dump nach Passwort-Mustern\nstrings -n 8 memory.raw | grep -iE "(password|passwd|pwd|secret|key|token)"\n\n# SSH-Keys finden\nstrings memory.raw | grep "BEGIN.*PRIVATE KEY"\n\n# Browser-Passw&ouml;rter (Chrome/Firefox)\nstrings memory.raw | grep -A2 "login_token"\n\n# Hash-Dump (Windows SAM)\nvol -f memory.raw windows.hashdump\nvol -f memory.raw windows.cachedump\n\n# LSA Secrets\nvol -f memory.raw windows.lsadump</code></pre></div>' +

    '<h2 class="section-title"><span class="number">20.5</span> Prozess-Speicher dumpen</h2>' +
    '<p>Einzelne Prozesse k&ouml;nnen aus dem RAM extrahiert werden &ndash; n&uuml;tzlich f&uuml;r ' +
    'Malware-Analyse oder um gel&ouml;schte Dateien aus dem Prozess-Speicher zu retten.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Prozess als Executable dumpen\nvol -f memory.raw windows.procdump --pid &lt;PID&gt; --dump-dir /cases/case01/dumps/\n\n# Prozess-Speicher (Heap + Stack)\nvol -f memory.raw windows.memmap --pid &lt;PID&gt; --dump-dir /cases/case01/dumps/\n\n# DLLs eines Prozesses extrahieren\nvol -f memory.raw windows.dlllist --pid &lt;PID&gt;\nvol -f memory.raw windows.dlldump --pid &lt;PID&gt; --dump-dir /cases/case01/dlls/\n\n# Registrierungsdatenbank (Windows)\nvol -f memory.raw windows.registry.hivelist\nvol -f memory.raw windows.registry.printkey --key "Software\\Microsoft\\Windows\\CurrentVersion\\Run"</code></pre></div>' +

    '<h2 class="section-title"><span class="number">20.6</span> Timeline aus Memory</h2>' +
    '<p>Prozess-Startzeiten und Aktivit&auml;tsmuster k&ouml;nnen als Timeline dargestellt werden.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Prozess-Timelne (Sortiert nach Startzeit)\nvol -f memory.raw windows.pslist | sort -k3\n\n# Datei-Zugriffe\nvol -f memory.raw windows.filescan | head -50\n\n# Mutants (Mutex) finden (Malware-Indikator)\nvol -f memory.raw windows.mutantscan</code></pre></div>' +

    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Memory-Analyse</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>RAM-Dump erstellen und mit Volatility analysieren.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Erstelle einen RAM-Dump auf deinem System mit <code>dd if=/dev/mem</code></li>' +
    '<li>Bestimme mit Volatility das Betriebssystem-Profil</li>' +
    '<li>Liste alle laufenden Prozesse auf</li>' +
    '<li>Suche nach verd&auml;chtigen Netzwerkverbindungen</li>' +
    '<li>Extrahiere alle Strings > 8 Zeichen und filtere nach "password"</li>' +
    '</ol></div>' +
    '<div class="toggle-container">' +
    '<div class="toggle-header"><span class="toggle-label">Hinweis</span><span class="toggle-arrow">&#9654;</span></div>' +
    '<div class="toggle-content">' +
    '<p>Unter modernen Linux-Systemen ist <code>/dev/mem</code> oft durch KPTI gesch&uuml;tzt. ' +
    'Verwende stattdessen LiME oder <code>/proc/kcore</code>. Bei Cloud-VMs kann der ' +
    'Provider Memory-Dumps erm&ouml;glichen.</p>' +
    '</div></div>' +
    '</div></div>' +

    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Typische Fehler</div>' +
    '<ul>' +
    '<li><strong>RAM-Dump vergessen:</strong> System zuerst heruntergefahren &ndash; Beweise vernichtet!</li>' +
    '<li><strong>Falsches OS-Profil:</strong> Volatility kann ohne korrektes Profil keine Analyse durchf&uuml;hren</li>' +
    '<li><strong>Zu gro&szlig;er Dump:</strong> RAM-Dumps k&ouml;nnen 16-64 GB gro&szlig; werden &ndash; Speicherbedarf beachten</li>' +
    '<li><strong>Strings ohne Filter:</strong> Ein roher Strings-Dump ist unbrauchbar &ndash; immer mit grep kombinieren</li>' +
    '</ul>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch20-memory-forensik">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch19-datenrettung">&#8592; Datenrettung</button>' +
    '<button class="nav-btn" data-target="ch21-netzwerkforensik">Netzwerkforensik &#8594;</button>' +
    '</div>';
};

Chapters['ch21-netzwerkforensik'] = function () {
  return '<h1 class="chapter-title">Netzwerkforensik</h1>' +
    '<div class="chapter-subtitle">PCAP-Analyse, Netzwerk-Logs und Kommunikations&uuml;berwachung</div>' +

    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div>' +
    '<p>Netzwerkverkehr liefert Beweise &uuml;ber Datenexfiltration, unbefugten Zugriff ' +
    'und Kommunikationsmuster. Bei ABB-F&auml;llen kann der Netzwerkverkehr zeigen, ' +
    'ob und wann Daten nach au&szlig;en &uuml;bertragen wurden &ndash; z.&nbsp;B. Buchhaltungsdaten ' +
    'an einen Cloud-Speicher oder E-Mail-Anh&auml;nge.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">21.1</span> Traffic Capture &ndash; Pakete mitschneiden</h2>' +
    '<p>Netzwerkverkehr kann mit tcpdump oder tshark aufgezeichnet werden. ' +
    'F&uuml;r forensische Zwecke sollte immer der vollst&auml;ndige Payload erfasst werden.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Vollst&auml;ndigen Traffic aufzeichnen (tcpdump)\ntcpdump -i eth0 -w /cases/case01/capture.pcap -s 0\n\n# Nur HTTP- und HTTPS-Traffic\ntcpdump -i eth0 -w /cases/case01/http.pcap "port 80 or port 443"\n\n# Tshark (Wireshark CLI)\ntshark -i eth0 -w /cases/case01/capture.pcap\n\n# Bestimmter Host\ntshark -i eth0 -f "host 192.168.1.100" -w /cases/case01/target.pcap\n\n# DNS-Queries erfassen\ntshark -i eth0 -f "port 53" -w /cases/case01/dns.pcap</code></pre></div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Rechtlicher Hinweis</div>' +
    '<p>Netzwerk&uuml;berwachung bedarf einer rechtlichen Grundlage (StPO § 135, § 149). ' +
    'Bei Betriebsnetzwerken kann die &Uuml;berwachung durch Betriebsvereinbarungen ' +
    'gedeckt sein. Privater Datenverkehr darf nur mit Genehmigung erfasst werden.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">21.2</span> PCAP-Analyse mit tshark</h2>' +
    '<p>tshark bietet m&auml;chtige Filter und Statistikfunktionen zur Analyse von ' +
    'Paketmitschnitten.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Grundlegende Statistik\ntshark -r capture.pcap -q -z io,phs\n\n# HTTP-Requests extrahieren\ntshark -r capture.pcap -Y "http.request" -T fields -e http.host -e http.request.uri\n\n# DNS-Queries\ntshark -r capture.pcap -Y "dns.qry.name" -T fields -e dns.qry.name\n\n# Top-Talker (meiste Bytes)\ntshark -r capture.pcap -q -z conv,ip\n\n# Exfiltration-Indikatoren: Gro&szlig;e Uploads\ntshark -r capture.pcap -Y "tcp.flags.syn==1 && tcp.flags.ack==0" -T fields -e ip.src -e ip.dst\n\n# Datei&uuml;bertragungen finden (HTTP)\ntshark -r capture.pcap -Y "http.response.code==200" -T fields -e http.content_type -e http.file_data\n\n# E-Mail-Anh&auml;nge (SMTP)\ntshark -r capture.pcap -Y "smtp" -T fields -e smtp.req.parameter\n\n# FTP-Befehle und Dateitransfers\ntshark -r capture.pcap -Y "ftp" -T fields -e ftp.request.command -e ftp.request.arg</code></pre></div>' +

    '<h2 class="section-title"><span class="number">21.3</span> Netzwerk-Log-Analyse</h2>' +
    '<p>Neben PCAPs liefern System-Logs wichtige Netzwerkbeweise.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Auth-Log: SSH-Login-Versuche\ngrep -i "sshd" /var/log/auth.log | grep -i "failed\|accepted"\n\n # Apache/Nginx Access Logs\ngrep -i "POST\|PUT\|DELETE" /var/log/apache2/access.log\n\n# Firewall-Logs (iptables/ufw)\ngrep "UFW" /var/log/ufw.log | tail -100\n\n# Verbindungs-Log (ss/netstat)\nss -tunap > /cases/case01/notes/connections.txt\n\n# Offene Ports scannen\nnetstat -tulpen > /cases/case01/notes/open_ports.txt\n\n# ARP-Tabelle sichern\narp -a > /cases/case01/notes/arp_table.txt\n\n# Routing-Tabelle\ncat /proc/net/route > /cases/case01/notes/routing.txt</code></pre></div>' +

    '<h2 class="section-title"><span class="number">21.4</span> Datenexfiltration erkennen</h2>' +
    '<p>Typische Indikatoren f&uuml;r Datenexfiltration:</p>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Indikator</th><th>Erkennung</th><th>Tool</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>Gro&szlig;e Uploads</td><td>Bytes/sec &uuml;ber Schwellenwert</td><td>tshark -z conv,ip</td></tr>' +
    '<tr><td>Ungew&ouml;hnliche Ports</td><td>Traffic auf nicht-Standard-Ports</td><td>tshark + port-Filter</td></tr>' +
    '<tr><td>DNS-Tunneling</td><td>Sehr lange Subdomains, hohe Query-Rate</td><td>tshark -Y "dns"</td></tr>' +
    '<tr><td>HTTPS zu unbekannten Hosts</td><td>SNI-Analyse, Zertifikats-Check</td><td>tshark -Y "tls.handshake"</td></tr>' +
    '<tr><td>Tor/I2P-Verbindungen</td><td>Verbindung zu bekannten Tor-Relays</td><td>IP-Reputation-DB</td></tr>' +
    '<tr><td>Cloud-Uploads</td><td>Traffic zu Dropbox, GDrive, OneDrive</td><td>tshark + Host-Filter</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">21.5</span> Wireshark &ndash; GUI-basierte Analyse</h2>' +
    '<p>F&uuml;r komplexe PCAP-Analysen bietet Wireshark eine grafische Oberfl&auml;che ' +
    'mit Protokoll-Dekodierung, Stream-Rekonstruktion und Experten-System.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># PCAP in Wireshark &ouml;ffnen\nwireshark capture.pcap &\n\n# PCAP-Informationen\ncapinfos capture.pcap\n\n# PCAP-Datei konvertieren (z.B. ERF -> PCAP)\nedd -r input.erf -w output.pcap</code></pre></div>' +
    '<div class="callout callout-tip">' +
    '<div class="callout-header">&#9432; Wireshark-Display-Filter</div>' +
    '<p><code>http.request.method == "POST"</code> &ndash; Alle POST-Requests<br>' +
    '<code>tcp contains "password"</code> &ndash; Klartext-Passw&ouml;rter<br>' +
    '<code>dns.qry.name contains "cloud"</code> &ndash; Cloud-DNS-Queries<br>' +
    '<code>tcp.port == 22</code> &ndash; SSH-Verkehr<br>' +
    '<code>frame.time >= "2024-03-15 08:00:00"</code> &ndash; Zeitraum-Filter</p>' +
    '</div>' +

    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">PCAP-Analyse</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Netzwerkverkehr aufzeichnen und auf verd&auml;chtige Aktivit&auml;ten analysieren.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Zeichne 60 Sekunden Traffic auf: <code>tcpdump -i any -w test.pcap -c 10000</code></li>' +
    '<li>Zeige alle HTTP-Requests: <code>tshark -r test.pcap -Y "http.request"</code></li>' +
    '<li>Zeige die Top-5 Kommunikationspartner: <code>tshark -r test.pcap -q -z conv,ip</code></li>' +
    '<li>Filtere nach DNS-Queries und identifiziere verd&auml;chtige Domains</li>' +
    '<li>Dokumentiere alle Befunde in der Case-Mappe</li>' +
    '</ol></div>' +
    '<div class="toggle-container">' +
    '<div class="toggle-header"><span class="toggle-label">Erwartetes Ergebnis</span><span class="toggle-arrow">&#9654;</span></div>' +
    '<div class="toggle-content">' +
    '<p>Die Analyse sollte lokale Broadcasts, DNS-Queries an den Resolver und ' +
    'regul&auml;ren HTTPS-Verkehr zeigen. Achte auf unverschl&uuml;sseltes HTTP ' +
    '(Port 80) &ndash; dies kann Klartext-Credentials enthalten.</p>' +
    '</div></div>' +
    '</div></div>' +

    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Typische Fehler</div>' +
    '<ul>' +
    '<li><strong>Capture-Gr&ouml;&szlig;e untersch&auml;tzt:</strong> Voll-Dump kann in Minuten mehrere GB erreichen</li>' +
    '<li><strong>SSL/TLS ignoriert:</strong> Verschluuml;sselte Payloads sind nicht lesbar &ndash; SNI-Header aber schon</li>' +
    '<li><strong>Zeitstempel nicht synchronisiert:</strong> Ohne NTP-Sync sind Korrelationen unbrauchbar</li>' +
    '<li><strong>Nur PCAP, keine Logs:</strong> Immer BEIDES sichern (PCAP + System-Logs)</li>' +
    '</ul>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch21-netzwerkforensik">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch20-memory-forensik">&#8592; Memory-Forensik</button>' +
    '<button class="nav-btn" data-target="ch22-zeitlinienanalyse">Zeitlinienanalyse &#8594;</button>' +
    '</div>';
};

Chapters['ch22-zeitlinienanalyse'] = function () {
  return '<h1 class="chapter-title">Zeitlinienanalyse</h1>' +
    '<div class="chapter-subtitle">Super-Timeline, MAC-Times und zeitliche Beweisf&uuml;hrung</div>' +

    '<div class="callout callout-context">' +
    '<div class="callout-header">&#9432; Warum ist das forensisch wichtig?</div>' +
    '<p>Die zeitliche Rekonstruktion von Ereignissen ist essenziell f&uuml;r die ' +
    'Beweisf&uuml;hrung. Eine Super-Timeline verbindet Dateisystem-Zeitstempel, ' +
    'Log-Eintr&auml;ge, Netzwerk-Events und Browser-Historie zu einem vollst&auml;ndigen ' +
    'Bild. F&uuml;r die ABB IT-Fahndung kann dies belegen, wann ein Verd&auml;chtiger ' +
    'Zugriff auf bestimmte Dateien hatte.</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">22.1</span> MAC-Times verstehen</h2>' +
    '<p>Jede Datei hat drei (bei ext4 vier) Zeitstempel &ndash; die sogenannten MAC(T)-Times:</p>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Zeitstempel</th><th>Bedeutung</th><th>&Auml;ndert bei</th></tr></thead>' +
    '<tbody>' +
    '<tr><td><strong>M</strong>odification</td><td>Inhalt wurde ge&auml;ndert</td><td>Schreibzugriff auf Dateiinhalt</td></tr>' +
    '<tr><td><strong>A</strong>ccess</td><td>Datei wurde gelesen</td><td>Jeder Lesezugriff (mount -o noatime)</td></tr>' +
    '<tr><td><strong>C</strong>hange (Metadata)</td><td>Inode-Metadaten ge&auml;ndert</td><td>chmod, chown, rename, link</td></tr>' +
    '<tr><td><strong>B</strong>irth/Creation</td><td>Datei erstellt</td><td>Nur bei ext4 und NTFS</td></tr>' +
    '</tbody></table></div>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># MAC-Times einer Datei anzeigen\nstat datei.txt\n\n# Formatiert\nstat -c "%n: M=%y A=%x C=%z B=%w" datei.txt\n\n# Alle Dateien eines Verzeichnisses mit Zeitstempel\nfind /pfad -type f -printf "%T+ %p\\n" | sort\n\n# Sleuth Kit: MAC-Times aus Image\nfls -r -m "/" image.dd | sort\n\n# Mit mactime (Sleuth Kit)\nfls -r -m "/" image.dd > body.txt\nmactime -b body.txt &gt; timeline.csv</code></pre></div>' +

    '<h2 class="section-title"><span class="number">22.2</span> Log2Timeline / Plaso</h2>' +
    '<p>Plaso (Python) ist das Standard-Tool f&uuml;r die Erstellung von Super-Timelines. ' +
    'Es aggregiert Zeitstempel aus dutzenden Quellen.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Installation\npip3 install plaso\n\n# Timeline aus Image erstellen\nlog2timeline.py --storage-file /cases/case01/timeline.plaso image.dd\n\n# Timeline aus mehreren Quellen\nlog2timeline.py --storage-file /cases/case01/timeline.plaso \\\n  --source /cases/case01/logs/auth.log \\\n  --source /cases/case01/logs/syslog \\\n  --source image.dd\n\n# Timeline als CSV exportieren\npsort.py -o L2tcsv /cases/case01/timeline.plaso -w /cases/case01/timeline.csv\n\n# Nur bestimmter Zeitraum\npsort.py -o L2tcsv /cases/case01/timeline.plaso \\\n  --slice "2024-03-15 08:00:00" \\\n  --slice_size 3600 \\\n  -w /cases/case01/timeline_0800.csv\n\n# Nur Datei-Events\npsort.py -o L2tcsv /cases/case01/timeline.plaso \\\n  "parser is \'filestat\'" \\\n  -w /cases/case01/timeline_files.csv</code></pre></div>' +

    '<h2 class="section-title"><span class="number">22.3</span> Quellen f&uuml;r Timeline-Events</h2>' +
    '<p>Eine vollst&auml;ndige Super-Timeline kombiniert Daten aus vielen Quellen:</p>' +
    '<div class="table-container"><table>' +
    '<thead><tr><th>Quelle</th><th>Events</th><th>Tool</th></tr></thead>' +
    '<tbody>' +
    '<tr><td>Dateisystem (Inodes)</td><td>M/A/C/B-Times</td><td>fls, istat (sleuthkit)</td></tr>' +
    '<tr><td>auth.log / syslog</td><td>Logins, Services, USB</td><td>grep, log2timeline</td></tr>' +
    '<tr><td>Browser-Historie</td><td>URLs, Downloads, Suchen</td><td>Hindsight, log2timeline</td></tr>' +
    '<tr><td>Windows Registry</td><td>MRU, Run-Keys, USB</td><td>regripper, log2timeline</td></tr>' +
    '<tr><td>Windows Event Logs</td><td>Security, System, App</td><td>winevtlog, log2timeline</td></tr>' +
    '<tr><td>PCAP / Netzwerk</td><td>Verbindungen, DNS</td><td>tshark, networkminer</td></tr>' +
    '<tr><td>Memory-Dump</td><td>Prozesse, Handles</td><td>Volatility</td></tr>' +
    '<tr><td>Shell-History</td><td>Bash-Kommandos</td><td>~/.bash_history</td></tr>' +
    '</tbody></table></div>' +

    '<h2 class="section-title"><span class="number">22.4</span> Sleuth Kit Timeline (mactime)</h2>' +
    '<p>F&uuml;r einfachere F&auml;lle reicht oft die Sleuth Kit Timeline.</p>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Bodyfile erstellen (alle MAC-Times)\nfls -r -m "/" image.dd > /cases/case01/body.txt\n\n# Timeline generieren (CSV)\nmactime -b /cases/case01/body.txt -d &gt; /cases/case01/mactime.csv\n\n# Nur bestimmter Zeitraum\nmactime -b /cases/case01/body.txt -d \\\n  -t "2024-03-15..2024-03-16" &gt; /cases/case01/mactime_range.csv\n\n# Timeline analysieren\nawk -F, \'$1 >= 1710460800 && $1 <= 1710547200\' /cases/case01/mactime.csv\n\n# H&auml;ufigste Zeitstempel finden\nawk -F, \'{print $1}\' /cases/case01/mactime.csv | sort | uniq -c | sort -rn | head -20</code></pre></div>' +

    '<h2 class="section-title"><span class="number">22.5</span> Timeline-basierte Beweisf&uuml;hrung</h2>' +
    '<p>F&uuml;r gerichtsverwertbare Dokumentation muss die Timeline reproduzierbar sein:</p>' +
    '<div class="callout callout-info">' +
    '<div class="callout-header">&#9432; Beweisf&uuml;hrung-Checkliste</div>' +
    '<p><strong>1.</strong> Image-Hash vor und nach der Analyse dokumentieren<br>' +
    '<strong>2.</strong> Alle Tools mit Version dokumentieren<br>' +
    '<strong>3.</strong> Timeline-Generierung vollst&auml;ndig protokollieren<br>' +
    '<strong>4.</strong> Zeitzonen-Konvertierung explizit angeben (UTC vs. CET/CEST)<br>' +
    '<strong>5.</strong> Zeitstempel-Quelle angeben (Dateisystem, Log, Registry)<br>' +
    '<strong>6.</strong> Ergebnis als CSV/PDF exportieren und signieren</p>' +
    '</div>' +
    '<div class="callout callout-warning">' +
    '<div class="callout-header">&#9888; Zeitzone-Problem</div>' +
    '<p>Linux speichert Zeitstempel in UTC (Inodes), w&auml;hrend Logs oft in Lokalzeit. ' +
    'NTFS speichert in UTC, FAT in Lokalzeit. Ohne explizite Zeitzonen-Angabe sind ' +
    'Timeline-Korrelationen unzuverl&auml;ssig!</p>' +
    '</div>' +

    '<h2 class="section-title"><span class="number">22.6</span> Praktische Timeline-Analyse</h2>' +
    '<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Quick-Timeline: Alle Events sortiert\nfind /mnt/image -printf "%T+ %T- %p\\n" | sort &gt; /cases/case01/quick_timeline.txt\n\n# Nur &Auml;nderungen im letzten Zeitraum\nfind /mnt/image -mtime -7 -type f -printf "%T+ %s %p\\n" | sort\n\n# Shell-History als Timeline\nHISTTIMEFORMAT="%F %T " history &gt; /cases/case01/notes/bash_history.txt\n\n# USB-Ger&auml;te-Historie\ngrep -i "usb" /var/log/syslog | grep -i "connected\|disconnected"\n\n# Login-Timeline\ngrep "session opened" /var/log/auth.log | awk \'{print $1,$2,$3,$NF}\' | sort</code></pre></div>' +

    '<div class="exercise-box">' +
    '<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">Timeline erstellen</span></div>' +
    '<div class="exercise-body">' +
    '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Eine Super-Timeline aus mehreren Quellen erstellen und analysieren.</p></div>' +
    '<div class="exercise-steps"><ol class="numbered-list">' +
    '<li>Erstelle eine Sleuth Kit Timeline aus deinem Test-Image</li>' +
    '<li>Exportiere als CSV und &ouml;ffne in einer Tabellenkalkulation</li>' +
    '<li>Identifiziere den Zeitraum der h&ouml;chsten Aktivit&auml;t</li>' +
    '<li>Erstelle einen erweiterten Timeline-Report mit log2timeline (Plaso)</li>' +
    '<li>Dokumentiere die Top-10 verd&auml;chtigen Events mit Begr&uuml;ndung</li>' +
    '</ol></div>' +
    '<div class="toggle-container">' +
    '<div class="toggle-header"><span class="toggle-label">Erwartetes Ergebnis</span><span class="toggle-arrow">&#9654;</span></div>' +
    '<div class="toggle-content">' +
    '<p>Die Timeline sollte zeigen: Dateisystem-Events (mactime), Log-Eintr&auml;ge ' +
    '(auth.log/syslog) und Shell-History in chronologischer Reihenfolge. ' +
    'Achte auf Zeitstempel, die au&szlig;erhalb der normalen Arbeitszeit liegen ' +
    '(z.&nbsp;B. 02:00 Uhr) &ndash; dies sind oft Indikatoren f&uuml;r unbefugten Zugriff.</p>' +
    '</div></div>' +
    '</div></div>' +

    '<div class="callout callout-danger">' +
    '<div class="callout-header">&#9888; Typische Fehler</div>' +
    '<ul>' +
    '<li><strong>Zeitzone ignoriert:</strong> UTC vs. CET = 1 Stunde Verschiebung</li>' +
    '<li><strong>atime durch Analyse ver&auml;ndert:</strong> Image immer mit <code>-o ro,noatime</code> mounten!</li>' +
    '<li><strong>Zu viele Daten:</strong> Super-Timelines k&ouml;nnen Millionen Events haben &ndash; Filtern ist essenziell</li>' +
    '<li><strong>Nur eine Quelle:</strong> Immer mehrere Quellen korrelieren (Dateisystem + Logs + Netzwerk)</li>' +
    '<li><strong>NTP-Offset nicht gepr&uuml;ft:</strong> Wenn die Systemuhr falsch geht, sind alle Zeitstempel unbrauchbar</li>' +
    '</ul>' +
    '</div>' +

    '<button class="complete-section-btn" data-chapter="ch22-zeitlinienanalyse">&#9744; Kapitel als abgeschlossen markieren</button>' +

    '<div class="nav-buttons">' +
    '<button class="nav-btn" data-target="ch21-netzwerkforensik">&#8592; Netzwerkforensik</button>' +
    '<button class="nav-btn" data-target="welcome">Start &#8594;</button>' +
    '</div>';
};
