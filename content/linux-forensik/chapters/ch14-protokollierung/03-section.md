<h2 class="section-title"><span class="number">12.3</span> Case-Ordnerstruktur</h2><p>Saubere Struktur erleichtert die Dokumentation und sp&auml;ter sp&auml;ter sp&auml;ter.</p><div class="code-block"><div class="code-header"><span class="lang">BASH</span><button class="copy-btn">Kopieren</button></div><pre><code># Case-Ordner erstellen
mkdir -p /cases/case01/{images,mounts,hashes,notes,reports,tools}

# In notes:
# - chain_of_custody.log (Beweiskette)
# - case_notes.log (Untersuchungsnotizen)
# - commands.log (Alle ausgef&uuml;hrten Befehle)

# In hashes:
# - original.sha256 (Hash des Originals)
# - image.sha256 (Hash des Images)
# - verification.sha256 (Verifizierungsergebnis)</code></pre></div><div class="callout callout-tip"><div class="callout-header">&#9432; Tipp</div><p>Hash-Dateien im Format <span class="inline-code">HASHVALUE  FILENAME</span> speichern. Damit kannst du mit <span class="inline-code">sha256sum -c</span> einfach verifizieren.</p></div>
