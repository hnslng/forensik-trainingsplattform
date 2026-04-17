# KI Prompt fuer Slide Erstellung

Dieser Prompt ist fuer die Erstellung oder Ueberarbeitung von Slides nach dem internen Konzept gedacht.
Er kann in Cursor, ChatGPT oder aehnlichen Tools verwendet werden.

## Referenzquelle (wichtig)

Nutze als fachlich-didaktische Primärreferenz:

- `docs/cheatsheets/linux-forensik/linux_forensik_cheatsheet_v2.md`
- `docs/cheatsheets/windows-forensik/windows_forensik_cheatsheet_v1.md` (bei Windows-Forensik-Slides)

Daraus werden fuer neue Slides uebernommen:

- Schritt-fuer-Schritt-Struktur
- Erklaerungstiefe bei Parametern/Befehlen
- Praxisfokus (Was tun? Warum? Was ist korrekt?)
- Hinweise zu typischen Fehlern und sauberer Dokumentation

## 1. Kurzprompt (schnell)

```text
Ueberarbeite die folgende Slide fuer Einsteiger auf Linux-Forensik-Qualitaet.
Nutze das Muster: section-title, code-block, erwartete Ausgabe, exercise-box mit Ziel, 3-6 nummerierten Schritten, Loesung anzeigen mit Interpretation.
Sprache: klar, einfach, logisch, ohne unerklaerte Fachspruenge.
Pruefe, dass alle Pflichtkommandos im Simulator verfuegbar sind (terminal.js).
Wenn ein Kommando nicht simuliert ist, ersetze es durch ein kompatibles oder markiere es als Realsystem-Hinweis.
Gib nur den finalen HTML-in-MD-Block zurueck.
```

## 2. Vollprompt (empfohlen)

```text
Rolle:
Du bist didaktischer Redakteur fuer eine Forensik-Trainingsplattform.

Ziel:
Erstelle/ueberarbeite eine Slide so, dass ein absoluter Einsteiger sie ohne Vorwissen nachvollziehen kann.

Referenz:
- Nutze `docs/cheatsheets/linux-forensik/linux_forensik_cheatsheet_v2.md` als stilistische und didaktische Vorlage.
- Nutze fuer Windows-Slides `docs/cheatsheets/windows-forensik/windows_forensik_cheatsheet_v1.md` als fachliche Vorlage.
- Uebernimm den Erklaerstil (kurz, praezise, praxisnah, nachvollziehbar).
- Uebernimm den Workflow-Stil (klarer Ablauf, Kontrollpunkte, typische Fehler vermeiden).

Didaktik:
- Vom Einfachen zum Komplexen.
- Ein neues Konzept pro Slide.
- Jede Slide beantwortet:
  1) Was mache ich?
  2) Warum mache ich es?
  3) Woran erkenne ich, dass es richtig ist?

Pflichtstruktur:
1) <h2 class="section-title"><span class="number">X.Y</span> ...</h2>
2) Kurzer Einleitungssatz
3) code-block (BASH, mit copy-btn)
4) output-block (Erwartete Ausgabe)
5) exercise-box mit:
   - exercise-goal (goal-label = Ziel)
   - exercise-steps (3-6 nummerierte Schritte)
   - toggle-container (toggle-label = Loesung anzeigen)
6) Optional callout-tip/warning fuer typische Fehler

Sprachregeln:
- kurze, aktive Saetze
- Fachbegriffe bei Erstnennung erklaeren
- keine abstrakten Phrasen ohne Praxisbezug

Simulatorregeln:
- Pflichtkommandos muessen simulator-kompatibel sein.
- Verwende nur Befehle, die im aktuellen Lab unter terminal.js verfuegbar sind.
- Nicht-kompatible Realsystembefehle nur als Hinweis, nicht als Pflichtschritt.

Zusatzregel fuer Forensik-Inhalte:
- Falls die Slide Linux-Forensik betrifft, sollen Begriffe, Reihenfolge und Schwerpunkt mit `docs/cheatsheets/linux-forensik/linux_forensik_cheatsheet_v2.md` konsistent sein (z. B. Integritaet, Hashvergleich, read-only, Dokumentation).
- Falls die Slide Windows-Forensik betrifft, sollen Begriffe, Reihenfolge und Schwerpunkt mit `docs/cheatsheets/windows-forensik/windows_forensik_cheatsheet_v1.md` konsistent sein (z. B. Device-Pfade, Imaging/Verify, read-only, Chain of Custody).

Outputregeln:
- Gib nur den finalen HTML-in-MD-Inhalt zurueck.
- Kein Erklaertext ausserhalb des Inhalts.
- Keine Platzhalter wie TODO.

Eingabe:
[HIER DIE BESTEHENDE SLIDE EINFUEGEN]
```

## 3. Prompt fuer Batch-Ueberarbeitung (mehrere Slides)

```text
Ueberarbeite alle folgenden Slides auf ein einheitliches Einsteiger-Niveau.

Zielbild:
- gleiche Struktur wie Linux-Forensik-Uebungen
- klares Ziel, klare Schritte, klare Auswertung
- gleiche Begriffe und Label (Ziel, Loesung anzeigen)
- simulator-kompatible Pflichtbefehle

Arbeite pro Slide in diesem Format:
1) Kurzdiagnose (2-4 Punkte)
2) Verbesserte Version als finaler HTML-in-MD-Block

Wenn ein Befehl nicht kompatibel ist:
- ersetze ihn durch kompatiblen Befehl
- oder verschiebe ihn in einen "Realsystem-Hinweis"

Slides:
[DATEI 1 INHALT]
[DATEI 2 INHALT]
[DATEI 3 INHALT]
```

## 4. Empfohlene Eingabeparameter fuer gute Ergebnisse

- Kontext mitgeben:
  - Lab-Typ (`linux-forensik` oder `netzwerk-forensik`)
  - Lernziel der Lektion
  - Referenzdatei: `docs/cheatsheets/linux-forensik/linux_forensik_cheatsheet_v2.md` (falls Linux-Stil uebernommen werden soll)
  - Referenzdatei: `docs/cheatsheets/windows-forensik/windows_forensik_cheatsheet_v1.md` (falls Windows-Stil uebernommen werden soll)
  - erlaubte Kommandos (oder Verweis auf `terminal.js`)
- Gewuenschte Komplexitaet:
  - "Einsteiger", "Fortgeschritten", "Pruefungsvorbereitung"
- Ausgabeformat explizit:
  - "Nur finalen HTML-in-MD-Block"
