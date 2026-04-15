---
id: "ch03-imaging"
title: "Forensische Datensicherung"
icon: "&#128190;"
section: "Trainingsmodul 2"
prev: "ch02-identifikation"
next: "ch04-hashing"
---

<h1 class="chapter-title">Forensische Datensicherung</h1><div class="chapter-subtitle">Beweismittel-sichere Methoden mit dd, dc3dd &amp; E01</div><p class="chapter-intro">Jetzt wo du das Device identifiziert hast, erstellst du eine bit-genaue Kopie. Das ist der wichtigste Schritt: das forensische Image. Ohne g&uuml;ltiges Image keine Analyse.</p><div class="callout callout-danger"><div class="callout-header">&#9888; Der kritischste Moment</div><p><span class="inline-code">if=</span> = Quelle (Original), <span class="inline-code">of=</span> = Ziel (Image-Datei). Vertauschst du beide, <strong>zerst&ouml;rst du das Original unwiderruflich</strong>. Pr&uuml;fe immer zweimal vor dem Dr&uuml;cken von Enter.</p></div><div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128190;</div><div class="feature-text"><h3>dd</h3><p>Das Standard-Imaging-Tool</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128272;</div><div class="feature-text"><h3>dc3dd</h3><p>Forensisches dd mit Hashing</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128230;</div><div class="feature-text"><h3>E01</h3><p>Branchenstandard-Format</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>Ein Image selbst erstellen</p></div></div></div><div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>
