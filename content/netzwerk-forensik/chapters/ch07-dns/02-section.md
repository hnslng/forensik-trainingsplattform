<h2 class="section-title"><span class="number">7.2</span> Wie DNS funktioniert &ndash; Der Aufl&ouml;sungsprozess</h2><p>Wenn du eine Webseite aufrufst, passiert Folgendes im Hintergrund:</p><div class="code-block"><div class="code-header"><span class="lang">PRINZIP</span></div><pre><code>Du tippst: www.example.com
  &rarr; 1. Browser-Cache (schon mal besucht?)
    &rarr; 2. OS-Cache (schon mal aufgel&ouml;st?)
      &rarr; 3. Resolver (dein Router / Provider-DNS)
        &rarr; 4. Root-Nameserver (".")
          &rarr; 5. TLD-Server (".com")
            &rarr; 6. Autoritativer Server (example.com)
              &rarr; Antwort: "Die IP ist 93.184.216.34"</code></pre></div><p>Das klingt nach vielen Schritten, dauert aber nur Millisekunden. Jede Stufe <strong>cacht</strong> die Ergebnisse &ndash; beim zweiten Aufruf geht es sofort.</p>