<h2 class="section-title"><span class="number">1.4</span> Datenkapselung (Encapsulation)</h2><p>Daten werden beim Senden Schicht für Schicht verpackt &ndash; wie ein Brief in mehreren Umschlägen.</p><div class="code-block"><div class="code-header"><span class="lang">PRINZIP</span></div><pre><code>Anwendungsdaten
  &rarr; + TCP/UDP Header = Segment
    &rarr; + IP Header = Paket
      &rarr; + MAC Header = Frame
        &rarr; Bits auf dem Medium</code></pre></div><p>Der Empfänger entfernt diese Header wieder &ndash; in umgekehrter Reihenfolge.</p>