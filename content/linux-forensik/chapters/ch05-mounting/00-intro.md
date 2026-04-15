---
id: "ch05-mounting"
title: "Mounten & Beweisaufnahme"
icon: "&#128194;"
section: "Trainingsmodul 3"
prev: "ch04-hashing"
next: "ch06-hex"
---

<h1 class="chapter-title">Mounten &amp; Beweisaufnahme</h1><div class="chapter-subtitle">Read-only Mounts, Loop-Devices &amp; Offset-Berechnung</div><p class="chapter-intro">Du hast das Image erstellt und verifiziert. Jetzt m&ouml;chtest du dir die Dateien ansehen. Daf&uuml;r musst du das Image mounten &ndash; aber <strong>nur read-only</strong>.</p><div class="callout callout-danger"><div class="callout-header">&#9888; Goldene Regel</div><p>Forensische Images werden <strong>IMMER read-only</strong> gemountet. Ein versehentlicher Schreibzugriff ver&auml;ndert das Image, die Hashes stimmen nicht mehr, und das Image ist forensisch unbrauchbar.</p></div><div class="feature-grid chapter-preview-grid"><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128274;</div><div class="feature-text"><h3>Read-Only</h3><p>Image schreibgesch&uuml;tzt einh&auml;ngen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128250;</div><div class="feature-text"><h3>Loop-Device</h3><p>Image-Datei als Device bereitstellen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#129513;</div><div class="feature-text"><h3>Offset</h3><p>Partition innerhalb des Images ansprechen</p></div></div><div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>Image selbst mounten und analysieren</p></div></div></div><div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&lsaquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &rsaquo;</span></div>
