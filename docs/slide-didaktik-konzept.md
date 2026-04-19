# Slide Didaktik Konzept

Dieser Leitfaden beschreibt das Zielbild fuer Slides in der Forensik-Trainingsplattform.
Ergaenzend zu `docs/slide-authoring-guide.md` fokussiert er auf Didaktik, Sprache, Niveau und Lernfuehrung fuer Einsteiger.

## Referenzdokumente

Fuer Linux-Forensik dient `docs/cheatsheets/linux-forensik/linux_forensik_cheatsheet_v2.md` als inhaltlich-didaktische Basis.
Fuer Windows-Forensik dient `docs/cheatsheets/windows-forensik/windows_forensik_cheatsheet_v1.md` als inhaltlich-didaktische Basis.
Das Slide-Design muss nicht das gleiche Layout wie das Cheatsheet haben, aber soll dessen Logik uebernehmen:

- klare Reihenfolge im Workflow
- begruendete Befehlsauswahl
- typische Fehler aktiv adressieren
- Ergebnisse pruefbar machen (Soll-Ist)

Fuer **Netzwerk-Forensik** ist `docs/cheatsheets/netzwerk-forensik/netzwerktechnik_cheatsheet_v1.md` die inhaltliche Basis (Grundlagen, Protokolle, Tools). Das Lab nutzt Linux-typische Terminalbefehle im Simulator; **Konzepte** sind plattformunabhaengig, **Kommandozeilen** unter Windows weichen ab. Kurze **Windows-Parallelen** (ein `callout-tip` mit Stichwort-Mapping) reduzieren die Sorge „lerne ich hier etwas, das unter Windows nutzlos ist?“ — siehe Abschnitt „Optional: Windows-Parallele“ in `docs/slide-authoring-guide.md`.

## 1. Zielgruppe und Lernniveau

- Zielgruppe: Einsteiger ohne tiefes Admin- oder Forensik-Vorwissen.
- Lernniveau: "Gefuehrt-praktisch" statt "rein theoretisch".
- Grundprinzip: Jede Slide soll die Frage beantworten:
  - Was mache ich?
  - Warum mache ich es?
  - Woran erkenne ich, dass es richtig ist?

## 2. Didaktische Kernprinzipien

- Vom Einfachen zum Komplexen:
  - Erst Beobachten (`ip addr`), dann Interpretieren, dann Fehlerdiagnose.
- Ein neues Konzept pro Slide:
  - Keine Ueberladung mit mehreren neuen Begriffen gleichzeitig.
- Sichtbarer Nutzen:
  - Jeder Schritt hat einen klaren Praxisbezug ("Wofuer brauche ich das in der Analyse?").
- Kontrollierte Selbstpruefung:
  - Erwartete Ausgabe + Loesungstoggle + kurze Interpretation.

## 3. Sprachstil

- Kurz, konkret, aktiv.
- Begriffe bei Erstnennung erklaeren:
  - Beispiel: "Gateway = Router, der dein lokales Netz mit dem Internet verbindet."
- Keine unerklaerten Spruenge:
  - Wenn ein Befehl Ergebnis X zeigt, muss kurz stehen, was X bedeutet.
- Einfache Satzstruktur:
  - 1 Aussage pro Satz, keine verschachtelten Spezialformulierungen.

## 4. Standardaufbau pro Uebungs-Slide

Jede echte Uebung folgt diesem Geruest:

1. `section-title` mit Nummer
2. Kurzer Kontextsatz ("Was wird geprueft?")
3. `code-block` mit einem fokussierten Kommando-Set
4. `output-block` mit realistischer Soll-Ausgabe
5. `exercise-box` mit:
   - `exercise-goal` (1 klares Ziel)
   - `exercise-steps` (3-6 Schritte, nummeriert)
   - `toggle-container` mit Loesung/Interpretation
6. Optional:
   - `callout-warning` fuer typische Fehler
   - `callout-tip` fuer Transferwissen

## 5. Designregeln fuer Konsistenz

- Einheitliche Labels:
  - `goal-label`: immer "Ziel"
  - Toggle: bevorzugt "Loesung anzeigen"
- Einheitliche Reihenfolge:
  - Erklaerung -> Kommando -> Erwartete Ausgabe -> Uebung -> Loesung
- Keine "Pseudo-Uebung":
  - Wenn "Uebung:" im Titel steht, muss `exercise-box` vorhanden sein.
- Kapitelabschluss:
  - Letzte Uebungsseite mit `complete-section-btn` und `nav-buttons`.

## 6. Terminal- und Simulator-Bezug

- Nur simulator-kompatible Kommandos in Pflichtschritten nutzen.
- Quellen fuer Kommandokompatibilitaet:
  - `TerminalBaseCommandNames`
  - `TerminalForensikCommandNames`
  - `TerminalNetzwerkCommandNames`
  - Datei: `forensik-lab/assets/js/terminal.js`
- Realweltbefehle, die nicht simuliert sind:
  - Nur als "Realsystem-Hinweis" markieren, nicht als Pflichtschritt.

## 7. Qualitaetskriterien (Definition of Done)

Eine Slide ist "didaktisch fertig", wenn:

- Ein Einsteiger den Zweck in 10 Sekunden versteht.
- Die Uebung in 3-6 klaren Schritten ausfuehrbar ist.
- Es eine nachvollziehbare Soll-Ausgabe gibt.
- Die Loesung nicht nur "richtig/falsch", sondern "warum" erklaert.
- Keine Pflichtbefehle auf "Befehl nicht gefunden" laufen.

## 8. Redaktionscheck vor Freigabe

- Sprache:
  - Unnoetige Fachbegriffe reduziert?
  - Erstnennungen erklaert?
- Didaktik:
  - Ziel klar?
  - Schrittfolge logisch?
  - Interpretation enthalten?
- Technik:
  - Befehle simulator-kompatibel?
  - `python3 build_content.py` erfolgreich?
  - UI-Quicktest: Auto-Terminal, Try-Button, Navigation, Abschluss?
