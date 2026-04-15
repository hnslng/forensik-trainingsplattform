---
icon: '&#128225;'
id: ch07-dns
section: Protokolle
title: DNS – Namensauflösung
---

<h1>DNS &ndash; Namensaufl&ouml;sung</h1>


<div class="chapter-subtitle">Das Telefonbuch des Internets</div>

<p class="chapter-intro">Du tippst <code>google.com</code> in den Browser &ndash; und landest bei <code>142.250.185.206</code>. DNS macht diese &Uuml;bersetzung. Ohne DNS g&auml;be es kein Internet wie wir es kennen.</p>

<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div><p>Du verstehst wie DNS funktioniert, kennst die wichtigsten Record-Typen und kannst DNS-Abfragen mit <code>dig</code> und <code>nslookup</code> selbst durchf&uuml;hren.</p></div>


<div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128269;</div><div class="feature-text"><h3>DNS-Records</h3><p>A, MX, NS, AAAA</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128260;</div><div class="feature-text"><h3>DNS-Aufl&ouml;sung</h3><p>Domain → IP</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128196;</div><div class="feature-text"><h3>Reverse DNS</h3><p>IP → Domain</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>dig, nslookup</p></div></div></div>

<h2 class="section-title"><span class="number">7.1</span> Was ist DNS?</h2>

<strong>DNS</strong> (Domain Name System) = Das Telefonbuch des Internets. Es übersetzt menschenlesbare Namen (<span class="inline-code">google.com</span>) in maschinenlesbare IP-Adressen (<span class="inline-code">142.250.185.206</span>).

Ohne DNS müsstest du für jede Webseite die IP-Adresse auswendig wissen. Stell dir vor, du müsstest <span class="inline-code">142.250.185.206</span> statt <span class="inline-code">google.com</span> eintippen.

<strong>Warum DNS wichtig ist:</strong>
- Menschen merken sich Namen leichter als Zahlen
- IP-Adressen können sich ändern &ndash; der Name bleibt gleich
- Ein Name kann auf mehrere IPs zeigen (Load Balancing)

<h2 class="section-title"><span class="number">7.2</span> Wie DNS funktioniert &ndash; Der Aufl&ouml;sungsprozess</h2>

Wenn du eine Webseite aufrufst, passiert Folgendes im Hintergrund:

<div class="code-block"><div class="code-header"><button class="copy-btn">Kopieren</button></div><pre><code>Du tippst: www.example.com
  → 1. Browser-Cache (schon mal besucht?)
    → 2. OS-Cache (schon mal aufgelöst?)
      → 3. Resolver (dein Router / Provider-DNS)
        → 4. Root-Nameserver (".")
          → 5. TLD-Server (".com")
            → 6. Autoritativer Server (example.com)
              → Antwort: "Die IP ist 93.184.216.34"</code></pre></div>

Das klingt nach vielen Schritten, dauert aber nur Millisekunden. Jede Stufe <strong>cacht</strong> die Ergebnisse &ndash; beim zweiten Aufruf geht es sofort.

<h2 class="section-title"><span class="number">7.3</span> DNS-Record-Typen</h2>

DNS speichert verschiedene Arten von Informationen &ndash; sogenannte <strong>Records</strong>:

| Record | Funktion | Beispiel | Erklärung |
|---|---|---|---|
| <strong>A</strong> | IPv4-Adresse | <span class="inline-code">example.com → 93.184.216.34</span> | Die wichtigste Zuordnung |
| <strong>AAAA</strong> | IPv6-Adresse | <span class="inline-code">example.com → 2606:2800:220:...</span> | Wie A, aber für IPv6 |
| <strong>CNAME</strong> | Alias | <span class="inline-code">www → example.com</span> | Verweis auf einen anderen Namen |
| <strong>MX</strong> | Mail-Server | <span class="inline-code">example.com → mail.example.com</span> | Wohin E-Mails geschickt werden |
| <strong>NS</strong> | Nameserver | <span class="inline-code">example.com → ns1.example.com</span> | Wer für diese Domain zuständig ist |
| <strong>TXT</strong> | Freier Text | SPF, DKIM | Für E-Mail-Sicherheit & Verifikation |
| <strong>PTR</strong> | Reverse DNS | <span class="inline-code">93.184.216.34 → example.com</span> | IP → Name (umgekehrt) |

<blockquote><p><strong>Tipp:</strong> Der Record-Typ sagt dir, <em>welche Art</em> von Information du abfragst. <span class="inline-code">A</span> = IP-Adresse, <span class="inline-code">MX</span> = Mail-Server, <span class="inline-code">NS</span> = Nameserver.</p></blockquote>

<h2 class="section-title"><span class="number">7.4</span> DNS-Tools im Terminal</h2>

<div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Einfache Abfrage (Anfänger-freundlich)
nslookup example.com

# Detaillierte Abfrage mit dig
dig example.com A              # IPv4-Adresse
dig example.com AAAA           # IPv6-Adresse
dig example.com MX             # Mail-Server
dig example.com NS             # Nameserver
dig -x 93.184.216.34           # Reverse-Lookup (IP → Name)
dig @8.8.8.8 example.com       # Spezifischen DNS-Server fragen
dig +short example.com         # Nur die IP, ohne Header
dig +trace example.com         # Den gesamten Auflösungsweg zeigen</code></pre></div>

<strong>dig vs nslookup:</strong>
- <span class="inline-code">nslookup</span> = einfach, gut für Quick-Checks
- <span class="inline-code">dig</span> = detailliert, zeigt den kompletten DNS-Response mit Header und Metadaten

<div class="exercise-box">
<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">DNS-Analyse</span></div>
<div class="exercise-body">
<div class="exercise-goal"><div class="goal-label">Ziel</div><p>DNS-Records verschiedener Typen abfragen und die Ergebnisse verstehen</p></div>
<div class="exercise-steps"><ol class="numbered-list">
<li>A-Record abfragen: <code>dig google.com A</code> &ndash; Welche IPv4-Adresse?</li>
<li>AAAA-Record: <code>dig google.com AAAA</code> &ndash; Hat Google eine IPv6-Adresse?</li>
<li>MX-Record: <code>dig google.com MX</code> &ndash; Wie heißt der Mail-Server?</li>
<li>Reverse-Lookup: <code>dig -x 8.8.8.8</code> &ndash; Welche Domain gehört zu dieser IP?</li>
<li>Kurzform: <code>nslookup example.com</code> &ndash; Vergleiche mit dig</li>
</ol></div>
<div class="toggle-container">
<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>
<div class="toggle-content"><p>Der A-Record zeigt die IPv4-Adresse (z.B. 142.250.185.206). AAAA zeigt die IPv6-Adresse. MX zeigt Mail-Server (z.B. smtp.google.com). Der Reverse-Lookup mit -x zeigt, dass 8.8.8.8 zu dns.google gehört. nslookup zeigt die gleichen Infos, aber weniger Details als dig.</p></div>
</div>
</div>
</div>


<button class="complete-section-btn" data-chapter="ch07-dns">&#9744; Kapitel als abgeschlossen markieren</button>

<div class="nav-buttons">
<button class="nav-btn" data-target="ch06-tcp-udp">&#8592; Zurück</button>
<button class="nav-btn" data-target="ch08-dhcp">Weiter &#8594;</button>
</div>

