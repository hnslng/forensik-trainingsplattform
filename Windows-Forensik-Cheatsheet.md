# Windows-Forensik-Cheatsheet – Datenträger, Imaging, Hashing und Analyse

**Autor:** MAF, nach linux_forensik_cheatsheet von LAH
**Ziel:** Technische Abläufe verstehen, korrekt anwenden und forensisch sauber dokumentieren.
**Niveau:** Fortgeschrittener Einsteiger – Praxis IT-Forensik
**System:** Windows 10 / 11 (PowerShell 5.1 / 7.x, CMD, forensische Drittanbieter-Tools)
**Version:** 1.0 – Windows-Adaption mit Case-Studie, Quellen und Übungen

---

# Einleitung

Dieses Dokument ist als praktisches Nachschlagewerk für die Windows-basierte Datenträgerforensik entstanden. Es richtet sich an Personen, die erste Erfahrungen mit IT-Forensik sammeln oder ihre bestehenden Kenntnisse strukturieren möchten.

Der Schwerpunkt liegt auf dem forensischen Imaging, der Integritätsprüfung (Hashing) und der Analyse von Datenträgern unter Windows. Alle beschriebenen Befehle und Workflows orientieren sich an etablierten Standards (NIST, ISO/IEC 27037) und sind so aufgebaut, dass sie in der Praxis direkt anwendbar sind.

**Warum dieses Dokument?**

In der forensischen Praxis gibt es keinen Raum für Fehler: Ein falsches Device, ein fehlender Hash-Vergleich oder eine unvollständige Dokumentation können dazu führen, dass Ergebnisse vor Gericht nicht verwertbar sind. Dieses Dokument bietet:

- **Schritt-für-Schritt-Anleitungen** mit erklärten Parametern
- **Eine durchgehende Case-Studie**, die den kompletten Workflow von der Übernahme bis zum Abschluss zeigt
- **Best Practices und typische Fehler** aus der Praxis
- **Übungen**, um das Gelernte selbst auszuprobieren
- **Quellen und Standards** für die weitere Vertiefung

**Besonderheiten der Windows-Forensik:**

Windows bringt als forensisches Zielsystem einige Eigenheiten mit: PhysicalDrive-Notation, NTFS-Strukturen (MFT, $LogFile, Alternate Data Streams), Volume Shadow Copies, BitLocker-Verschlüsselung, eine aktive Auto-Mount-Logik und zahlreiche Hintergrunddienste, die Schreibzugriffe erzeugen können. Die Befehle in diesem Dokument sind so gewählt, dass sie schreibend auf das Original möglichst nicht eingreifen; trotzdem ist der Einsatz eines Hardware-Write-Blockers Pflicht, sobald das Medium gerichtsverwertbar gesichert werden soll.

**Hinweis zu Österreich:** Forensische Untersuchungen müssen hierzulande nachvollziehbar und dokumentiert sein, damit Ergebnisse vor Gericht Bestand haben (StPO § 134, DSGVO). Die Beweiskette (Chain of Custody) muss lückenlos geführt werden.

**Hinweis zum verwendeten Hash-Algorithmus:** Dieses Dokument verwendet durchgängig **MD5** als Integritätshash. MD5 ist kryptografisch gebrochen (Kollisionen berechenbar), für reine Integritätsprüfung im forensischen Alltag – also der Frage „ist das Image bitidentisch mit dem Original?" – aber weiterhin praxistauglich, schnell und von allen gängigen Werkzeugen nativ unterstützt. Für gerichtsverwertbare Untersuchungen mit erhöhten Anforderungen ist SHA-256 oder ein Doppel-Hash (MD5 + SHA-256) zu bevorzugen; alle in diesem Dokument gezeigten Befehle lassen sich über den entsprechenden Parameter (`-Algorithm SHA256`, `--sha256`, `hash=sha256`, `SHA256` bei `certutil`) analog auf SHA-256 umstellen.

**Hinweis zu PowerShell-Versionen:** Die Beispiele funktionieren weitgehend mit PowerShell 5.1 (in Windows 10/11 enthalten) und PowerShell 7.x. Wo ein Unterschied relevant ist, wird er markiert. Alle Befehle sind – wenn nicht anders angegeben – in einer **erhöhten PowerShell-Sitzung (als Administrator)** auszuführen.

---

## Inhaltsverzeichnis

1. Forensischer Ablauf – Datensicherung Schritt für Schritt
2. Grundbegriffe: Device, Partition, Dateisystem
3. Datenträger identifizieren und prüfen
4. Partitionstabellen verstehen (MBR & GPT)
5. Forensisches Imaging (FTK Imager, dd für Windows, PowerShell)
6. Image-Formate (raw, E01, AFF, AD1)
7. Hashing und Integritätsprüfung
8. Mounten und Arbeiten am Image (read-only)
9. Hex- und Binäranalyse
10. Datei- und Artefaktvergleich
11. Strings, Pipes und Filter
12. Dateisysteme und Datenträger-Vorbereitung
13. Datenträger sicher löschen (HDD, SATA-SSD, NVMe)
14. Write-Blocker und Hardware
15. Protokollierung und Chain of Custody
16. Best Practices und typische Fehler
17. **Case-Studie: Kompletter Forensik-Workflow**
18. Kompaktes Befehls-Cheatsheet (1 Seite)
19. Quellen und Standards
20. Tool-Installation
21. **Übungen**

---

# 1. Forensischer Ablauf – Datensicherung Schritt für Schritt

## 1.1 Standard-Workflow

**Beschreibung:**

Empfohlene Reihenfolge zur forensisch sauberen Datensicherung und Analyse unter Windows.

**Ablauf:**

1. Auto-Mount-Verhalten vorab deaktivieren (siehe 14.3)
2. Datenträger identifizieren und prüfen
3. Write-Blocker anschließen (falls verfügbar)
4. Sicherstellen, dass keine Partitionen des Originals eingebunden sind
5. Protokollierung starten (`Start-Transcript`)
6. Initialen Hash des Originals erzeugen (MD5)
7. Forensisches Image erstellen
8. Hash des Images erzeugen
9. Hashwerte vergleichen und dokumentieren
10. Hash-Verifikation durchführen (`Get-FileHash` vs. gespeicherter Wert)
11. Analyse ausschließlich am Image (read-only) durchführen
12. Chain of Custody dokumentieren

**Hinweis:**

Befehle, Pfade, Device-Namen und Zeitstempel sind im Protokoll (Case-Notes) vollständig zu dokumentieren.

## 1.2 Case-Ordnerstruktur anlegen

**Beschreibung:**

Erstellt eine saubere Verzeichnisstruktur für Images, Mountpoints, Hashes und Notizen.

**Befehl (PowerShell):**

```powershell
$case = "C:\Cases\case01"
"images","mounts","hashes","notes","reports","tools" | ForEach-Object {
    New-Item -ItemType Directory -Path "$case\$_" -Force | Out-Null
}
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `New-Item -ItemType Directory` | Erstellt Verzeichnis |
| `-Force` | Erzeugt auch übergeordnete Pfade; kein Fehler, wenn Ordner bereits existiert |
| `C:\Cases\case01\...` | Beispielpfad für einen Case; an Umgebung anpassen |
| `ForEach-Object` | Iteriert über die Unterordnernamen |

**Alternative (CMD):**

```cmd
mkdir C:\Cases\case01\images C:\Cases\case01\mounts C:\Cases\case01\hashes C:\Cases\case01\notes C:\Cases\case01\reports C:\Cases\case01\tools
```

**Empfehlung:** Case-Verzeichnis nicht auf dem Systemlaufwerk `C:` ablegen, sondern auf einem separaten Forensik-Datenträger. Das vermeidet Platzprobleme und verhindert, dass Systemdienste (z. B. Windows Search, Defender) die Images indizieren oder scannen.

## 1.3 Windows-Search und Defender für den Case-Ordner ausschließen

**Beschreibung:**

Windows Search und Microsoft Defender können Image-Dateien indizieren bzw. scannen. Das verbraucht Ressourcen und kann – bei Defender-Quarantäne auf Fund innerhalb eines Images – Artefakte verfälschen oder entfernen.

**Befehle (PowerShell, Administrator):**

```powershell
# Defender-Ausschluss für den Case-Ordner
Add-MpPreference -ExclusionPath "C:\Cases"
# Real-Time-Protection beim Arbeiten mit bekannten Malware-Samples ggf. temporär deaktivieren
# Set-MpPreference -DisableRealtimeMonitoring $true
```

**Hinweis:** Das Deaktivieren der Real-Time-Protection nur auf dediziertem Forensik-System und nur bewusst, dokumentiert und zeitlich begrenzt.

---

# 2. Grundbegriffe: Device, Partition, Dateisystem

## 2.1 Device

**Beschreibung:**

Physischer Blockspeicher, unter Windows adressiert über `\\.\PhysicalDrive0`, `\\.\PhysicalDrive1`, … Die Nummerierung entspricht der Reihenfolge in `Get-Disk` bzw. `diskpart`.

## 2.2 Partition

**Beschreibung:**

Logischer Abschnitt eines Devices. In Windows typischerweise über Laufwerksbuchstaben (`C:`, `D:`, …) oder `\\.\HarddiskVolumeN` angesprochen. Definiert durch Start- und Endsektor der Partitionstabelle.

## 2.3 Dateisystem

**Beschreibung:**

Struktur zur Organisation von Dateien. Unter Windows dominiert NTFS (mit MFT, $LogFile, $UsnJrnl, Alternate Data Streams); auf Wechselmedien verbreitet sind exFAT und FAT32. Je nach Typ unterschiedliche Metadaten und Artefakte.

---

# 3. Datenträger identifizieren und prüfen

## 3.1 Geräteübersicht (PowerShell)

**Beschreibung:**

Listet physische Datenträger mit Nummer, Größe, Modell, Seriennummer und Bus-Typ.

**Befehl:**

```powershell
Get-Disk | Select-Object Number, FriendlyName, SerialNumber, Size, PartitionStyle, BusType, HealthStatus | Format-Table -AutoSize
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `Get-Disk` | Listet alle angeschlossenen physischen Datenträger |
| `Number` | Disk-Nummer (entspricht `\\.\PhysicalDriveN`) |
| `FriendlyName` | Modellbezeichnung |
| `SerialNumber` | Seriennummer (wichtig für Chain of Custody) |
| `Size` | Kapazität in Bytes |
| `PartitionStyle` | MBR oder GPT |
| `BusType` | USB, SATA, NVMe, SCSI, … |

**Partitions- und Volumeübersicht:**

```powershell
Get-Partition | Select-Object DiskNumber, PartitionNumber, DriveLetter, Offset, Size, Type | Format-Table -AutoSize
Get-Volume    | Select-Object DriveLetter, FileSystemLabel, FileSystem, Size, SizeRemaining, HealthStatus | Format-Table -AutoSize
```

**Achtung:**

Wenn das Original ein Laufwerksbuchstabe hat und automatisch eingebunden wurde, besteht Schreib-/Journal-Risiko. Vor Imaging Auto-Mount deaktivieren und ggf. Laufwerksbuchstabe entfernen (siehe 14.3 und 17.4).

## 3.2 Geräteübersicht (diskpart, CMD)

**Beschreibung:**

Klassisches Windows-Tool zur Partitionsverwaltung; im List-Modus rein lesend.

**Befehl:**

```cmd
diskpart
DISKPART> list disk
DISKPART> select disk 1
DISKPART> detail disk
DISKPART> list partition
DISKPART> exit
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `list disk` | Listet alle physischen Datenträger |
| `select disk N` | Wählt Disk N für nachfolgende Befehle |
| `detail disk` | Zeigt Modell, Seriennummer, Pfad, Partitionen |
| `list partition` | Zeigt Partitionen der ausgewählten Disk |
| `exit` | Verlässt diskpart |

**Wichtig:** In `diskpart` niemals `clean`, `format`, `create`, `delete` oder `assign` auf dem Beweisgerät ausführen. Diese Befehle sind destruktiv.

## 3.3 WMI / CIM-Abfrage (Alternative)

**Beschreibung:**

`Get-CimInstance` liefert ähnliche Informationen wie `Get-Disk`, mit Zugriff auf zusätzliche Felder (`Model`, `InterfaceType`, `MediaType`).

**Befehl:**

```powershell
Get-CimInstance Win32_DiskDrive | Select-Object Index, DeviceID, Model, SerialNumber, Size, InterfaceType | Format-Table -AutoSize
```

## 3.4 Seriennummer und Hardwaredetails

**Beschreibung:**

Für die Chain of Custody sind Modell und Seriennummer zu dokumentieren.

**Befehl:**

```powershell
Get-PhysicalDisk | Select-Object DeviceId, FriendlyName, SerialNumber, MediaType, BusType, Size | Format-Table -AutoSize
```

---

# 4. Partitionstabellen verstehen (MBR & GPT)

## 4.1 MBR (Master Boot Record)

**Beschreibung:**

Legacy-Partitionstabelle im ersten Sektor (typisch 512 Byte). Enthält Bootcode und Partitionseinträge.

**Hinweis:**

Typische Grenzen: vier primäre Partitionen; 2 TiB Größenlimit. Unter Windows wird der Stil als `MBR` in `Get-Disk` ausgewiesen.

## 4.2 GPT (GUID Partition Table)

**Beschreibung:**

Moderne Partitionstabelle mit Primary- und Backup-GPT. Partitionseinträge enthalten GUID, Typ und Label. Standard für moderne Windows-Installationen (UEFI).

**Hinweis:**

Für Loop-/Offset-Mounts wird der Byte-Offset aus `Startsektor × Sektorgröße` berechnet. Unter Windows liefert `Get-Partition` den Offset direkt in Bytes (Feld `Offset`), was die Berechnung erspart.

## 4.3 Partitionsoffset direkt auslesen

**Befehl:**

```powershell
Get-Partition -DiskNumber 1 | Select-Object PartitionNumber, Offset, Size, Type
```

Der Wert unter `Offset` ist direkt in Bytes und kann z. B. für Arsenal Image Mounter oder `dd`-Offset-Angaben verwendet werden.

---

# 5. Forensisches Imaging (FTK Imager, dd für Windows, PowerShell)

## 5.1 FTK Imager (GUI) – empfohlenes Standardverfahren

**Beschreibung:**

FTK Imager (AccessData / Exterro) ist der De-facto-Standard für forensisches Imaging unter Windows. Kostenlos, unterstützt raw/dd, E01, AFF, integrierte Hash-Berechnung (MD5 und/oder SHA1/SHA256), Segmentierung, Kompression und Verifikation in einem Schritt.

**Ablauf in der GUI:**

1. **File → Create Disk Image…**
2. **Source:** `Physical Drive` (für Vollimage) oder `Logical Drive` (nur eine Partition)
3. Zielgerät auswählen (z. B. `PHYSICALDRIVE1`)
4. **Add** (Destination)
5. **Image Type:** `Raw (dd)`, `E01` oder `AFF`
6. **Evidence Item Information** ausfüllen: Case Number, Evidence Number, Unique Description, Examiner, Notes
7. **Destination Folder** und **Image Filename** festlegen
8. **Fragment Size** (Segmentierung), **Compression** (bei E01), ggf. Passwort
9. Checkboxen aktivieren:
   - `Verify images after they are created`
   - `Create directory listings of all files in the image after they are created` (optional)
   - `Precalculate Progress Statistics`
10. **Start**

FTK Imager erzeugt automatisch eine Begleitdatei `<Image>.txt` mit Case-Metadaten, MD5, SHA1, Segmentliste und Verifikationsergebnis.

## 5.2 FTK Imager CLI (`ftkimager.exe`)

**Beschreibung:**

Kommandozeilenversion für scriptbare/automatisierbare Imagings.

**Befehl – raw/dd mit MD5:**

```powershell
ftkimager.exe \\.\PHYSICALDRIVE1 "C:\Cases\case01\images\disk01" --md5 --print0
```

**Befehl – E01 mit Metadaten und Kompression:**

```powershell
ftkimager.exe \\.\PHYSICALDRIVE1 "C:\Cases\case01\images\disk01" `
    --e01 `
    --compress 6 `
    --frag 2G `
    --case-number "case01" `
    --evidence-number "E001" `
    --description "SanDisk Cruzer 32GB" `
    --examiner "Hannes Lang" `
    --notes "Imaging ueber Write-Blocker" `
    --md5
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `\\.\PHYSICALDRIVE1` | Quelle (physisches Laufwerk) |
| `"…\disk01"` | Zielpfad **ohne** Endung (wird ergänzt) |
| `--e01` | Ausgabeformat E01 |
| `--compress N` | Kompressionsstufe 0–9 |
| `--frag 2G` | Segmentgröße |
| `--case-number` / `--evidence-number` / `--description` / `--examiner` / `--notes` | Metadaten, die im E01-Container gespeichert werden |
| `--md5` | MD5 während des Imaging berechnen |
| `--verify` | Nach Abschluss Image gegen Original verifizieren |
| `--print0` | Hash am Ende auf stdout ausgeben |

## 5.3 dd für Windows (`dd.exe`)

**Beschreibung:**

Es existieren mehrere Portierungen des Unix-Tools `dd` für Windows. Populär sind **dd for Windows (Chrysocome)** und **dcfldd for Windows**. Funktion und Parameter entsprechen dem Linux-Pendant.

**Befehl (Chrysocome dd):**

```cmd
dd.exe if=\\.\PhysicalDrive1 of=C:\Cases\case01\images\disk01.img bs=16M conv=noerror,sync --progress
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `dd.exe` | dd-Port für Windows |
| `if=\\.\PhysicalDrive1` | Input – physisches Laufwerk in Windows-Notation |
| `of=…\disk01.img` | Output – Image-Datei |
| `bs=16M` | Blockgröße |
| `conv=noerror` | Bei Lesefehlern fortfahren |
| `conv=sync` | Fehlende/kurze Blöcke mit Nullen auffüllen (Offset-Treue) |
| `--progress` | Fortschrittsanzeige (Chrysocome-spezifisch) |

**Verfügbare Geräte listen:**

```cmd
dd.exe --list
```

### 5.3.1 Blocksize (bs) – Wirkung, Vor- und Nachteile

| `bs`-Beispiel | Typische Wirkung | Vorteil | Nachteil | Praxisempfehlung |
|---|---|---|---|---|
| `512` / `4K` | sehr kleine Blöcke, viele I/O-Operationen | feingranulares Verhalten, geringe RAM-Last | deutlich langsamer, hoher Overhead | nur bei bewusstem Sektor-Fokus oder Testzwecken |
| `1M` | moderat | guter Kompromiss, meist stabil | nicht immer maximaler Durchsatz | solide Default-Option |
| `4M`–`16M` | große Blöcke | i. d. R. deutlich schneller, weniger syscalls | höhere RAM-Last; bei fehlerhaften Medien können Retries „teurer" wirken | häufig beste Praxis (z. B. `8M` oder `16M`) |
| `32M`–`128M` | sehr große Blöcke | maximaler Durchsatz bei sehr schnellem Storage möglich | hohe RAM-Last; bei Fehlern/Storage-Stacks teils ungünstig | nur wenn Umfeld stabil und fehlerfrei ist |

## 5.4 Guymager (GUI-Alternative unter Linux-Live)

**Beschreibung:**

Reines Windows-Tool nicht vorhanden, aber in der Praxis gängig: Windows-Workstation mit Linux-Forensik-Live-USB (Kali, CAINE, Tsurugi Acquire) booten, dort Guymager nutzen, Image auf eine NTFS/exFAT-formatierte Zieldisk schreiben und anschließend in Windows verifizieren. Für diesen Workflow siehe die Linux-Variante dieses Cheatsheets.

## 5.5 Image mit PowerShell (Notlösung, kleine Medien)

**Beschreibung:**

Für Notfälle ohne FTK Imager / dd für Windows: PowerShell kann über .NET-Filestreams ein Roh-Image erzeugen. Für produktive Forensik-Arbeit **nicht** empfohlen – es fehlen saubere Fehlerbehandlung, Fortschrittsanzeige und integriertes Hashing. Für kleine USB-Sticks im Notfall dennoch brauchbar.

**Befehl (PowerShell, Administrator):**

```powershell
$src = [System.IO.File]::OpenRead('\\.\PhysicalDrive1')
$dst = [System.IO.File]::Create('C:\Cases\case01\images\disk01.img')
$buf = New-Object byte[] (16MB)
try {
    while (($read = $src.Read($buf, 0, $buf.Length)) -gt 0) {
        $dst.Write($buf, 0, $read)
    }
} finally {
    $src.Close(); $dst.Close()
}
```

## 5.6 Nur Anfangsbereich (Header) sichern

**Beschreibung:**

Sichert einen definierten Anfangsbereich (z. B. Bootsektor/Partitionstabellen-nahe Daten) in eine separate Datei.

**Befehl (dd für Windows):**

```cmd
dd.exe if=\\.\PhysicalDrive1 of=C:\Cases\case01\images\header.img bs=1M count=10 conv=noerror,sync
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `count=` | Anzahl der zu kopierenden Blöcke (Anzahl × `bs`) |

## 5.7 Image komprimiert erzeugen

**Beschreibung:**

FTK Imager erledigt Kompression nativ beim E01-Format (`--compress 6`). Alternative: raw-Image nachträglich mit 7-Zip komprimieren:

```powershell
& "C:\Program Files\7-Zip\7z.exe" a -tgzip "C:\Cases\case01\images\disk01.img.gz" "C:\Cases\case01\images\disk01.img"
```

**Wichtig:** Hash immer **vor** und **nach** Kompression vom ursprünglichen Image berechnen (nicht vom Archiv), bzw. beide dokumentieren.

---

# 6. Image-Formate (raw, E01, AFF, AD1)

## 6.1 RAW-Format (.img / .dd / .001)

**Beschreibung:**

Einfaches 1:1-Abbild ohne Metadaten oder Kompression.

| Vorteil | Nachteil |
|---------|----------|
| Maximale Kompatibilität | Keine Kompression |
| Keine speziellen Tools nötig | Keine integrierten Metadaten |
| Einfache Verarbeitung | Keine integrierte Integritätsprüfung |

## 6.2 E01-Format (EnCase / Expert Witness Format)

**Beschreibung:**

Proprietäres Format mit Kompression, Metadaten und integrierter Integritätsprüfung. Industriestandard, wird von allen gängigen Forensik-Tools gelesen (EnCase, FTK, X-Ways, Autopsy, Magnet Axiom).

**Befehl (FTK Imager CLI):**

```powershell
ftkimager.exe \\.\PHYSICALDRIVE1 "C:\Cases\case01\images\disk01" `
    --e01 --compress 6 --md5 `
    --case-number "case01" --evidence-number "E001" `
    --description "Beweis-Disk 01" --examiner "Hannes Lang"
```

**Vorteile:**

- Integrierte Kompression
- Metadaten (Case-Info, Examiner, Timestamps)
- Integrierte Hash-Verifikation (pro Segment + Gesamtimage)
- Segmentierung bei großen Images
- CRC pro Block (Fehlererkennung)

## 6.3 AFF/AFF4-Format

**Beschreibung:**

Advanced Forensic Format – offen, erweiterbar, mit Metadaten. Unter Windows unterstützt z. B. durch die `libaff`-basierten Tools und Autopsy/Sleuth Kit. Weniger verbreitet als E01.

## 6.4 AD1-Format (FTK Logical Image)

**Beschreibung:**

AccessData-eigenes Format für **logische** Images (z. B. nur ein Benutzerprofil, nur eine Partition als Dateisammlung). Wird in FTK Imager über `File → Create Custom Content Image (AD1)` erstellt. Sinnvoll, wenn nur ein definierter Ausschnitt gesichert werden darf (z. B. DSGVO-Vorgaben, Nur-Mitarbeiterdaten).

## 6.5 Format-Empfehlung

| Anwendungsfall | Empfohlenes Format |
|---|---|
| Gerichtsverwertbares Vollimage | **E01** mit MD5 + FTK-Metadaten |
| Maximale Kompatibilität / spätere Weiterverarbeitung durch Tools ohne E01-Support | **raw/dd** mit separatem `.md5` |
| Selektive Sicherung (DSGVO, Scope-Begrenzung) | **AD1** |
| Archivierung | **E01** mit Kompression 6–9 |

---

# 7. Hashing und Integritätsprüfung

## 7.1 Hash des Originals (MD5)

**Beschreibung:**

Berechnet einen MD5-Hash direkt über das physische Laufwerk. Unter Windows geht das **nicht** einfach über `Get-FileHash \\.\PhysicalDrive1`, weil `Get-FileHash` kein Raw-Device-Handle öffnen kann. Empfohlene Wege:

**Weg A – FTK Imager CLI (empfohlen):**

```powershell
ftkimager.exe --print --md5 --no-write \\.\PHYSICALDRIVE1 > C:\Cases\case01\hashes\original.md5
```

**Weg B – dc3dd für Windows / dcfldd für Windows:**

```cmd
dc3dd.exe if=\\.\PhysicalDrive1 hash=md5 log=C:\Cases\case01\hashes\original.log
```

**Weg C – Hash wird **während** des Imaging erzeugt (FTK Imager oder ftkimager CLI mit `--md5`). In der Praxis ist das der übliche Fall: Original-Hash = Image-Hash, beides gleichzeitig.

## 7.2 Hash des Images (MD5)

**Befehl (PowerShell):**

```powershell
Get-FileHash -Algorithm MD5 "C:\Cases\case01\images\disk01.img" |
    Tee-Object -FilePath "C:\Cases\case01\hashes\image.md5"
```

**Alternative (CMD, `certutil`):**

```cmd
certutil -hashfile "C:\Cases\case01\images\disk01.img" MD5 > C:\Cases\case01\hashes\image.md5
```

## 7.3 Hash eines segmentierten E01-Images

**Beschreibung:**

Bei E01-Segmenten (`*.E01`, `*.E02`, …) ist der Hash im Container gespeichert und wird beim Verify geprüft. Ein externer `Get-FileHash` über die Segmente liefert **nicht** den Hash des rohen Disk-Inhalts. Zum Verifizieren dient:

```powershell
ftkimager.exe --verify "C:\Cases\case01\images\disk01.E01"
```

oder in der FTK-Imager-GUI: **File → Verify Drive/Image**.

## 7.4 Direkter Vergleich zweier Hash-Dateien

**Beschreibung:**

Vergleicht zwei Hash-Werte auf Übereinstimmung.

**Befehl (PowerShell):**

```powershell
$h1 = (Select-String -Path "C:\Cases\case01\hashes\original.md5" -Pattern "[0-9A-Fa-f]{32}" | Select-Object -First 1).Matches.Value
$h2 = (Get-FileHash -Algorithm MD5 "C:\Cases\case01\images\disk01.img").Hash
if ($h1 -ieq $h2) { "MATCH"; } else { "MISMATCH`n$h1`n$h2" }
```

## 7.5 Hash-Verifikation (Batch über mehrere Dateien)

**Beschreibung:**

Berechnet erneut MD5 über alle Image-Dateien im Ordner und vergleicht mit einer Referenzliste.

**Befehl (PowerShell):**

```powershell
Get-ChildItem "C:\Cases\case01\images\*.img" |
    Get-FileHash -Algorithm MD5 |
    Export-Csv -NoTypeInformation "C:\Cases\case01\hashes\recompute.csv"
# Vergleich anschließend mit Referenz-CSV per Compare-Object
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `Get-FileHash` | PowerShell-Cmdlet für Dateihashes |
| `-Algorithm` | `MD5`, `SHA1`, `SHA256`, `SHA384`, `SHA512` (hier durchgängig `MD5`) |
| `certutil -hashfile` | CMD-Alternative, funktioniert ohne PowerShell |
| `ftkimager --verify` | Verifiziert E01/raw-Image gegen gespeicherten Hash |

---

# 8. Mounten und Arbeiten am Image (read-only)

## 8.1 Grundprinzip unter Windows

Windows kennt kein `mount -o ro,loop,offset=…` wie Linux. Stattdessen werden Images über **Mount-Tools** in das System eingebunden, die das Image als virtuelles Laufwerk darstellen. Forensisch relevant ist, dass der Mount **read-only** erfolgt. Empfohlene Tools:

| Tool | Formate | Read-only | Besonderheit |
|---|---|---|---|
| **Arsenal Image Mounter (AIM)** | raw, E01, AFF, VHD, VMDK | ja (Default) | Emuliert echtes Disk-Device (`\\.\PhysicalDriveN`) → gut für Tools, die ein Raw-Device brauchen |
| **FTK Imager (GUI)** | raw, E01, AD1 | ja | „Image Mounting…" einfach per Klick |
| **OSFMount** | raw, E01, VMDK, VHD | ja | Gut für schnellen Zugriff per Laufwerksbuchstabe |
| **Windows `Mount-DiskImage`** | VHD/VHDX/ISO | ja (`-Access ReadOnly`) | Nur VHD/VHDX/ISO – für forensische Rohimages **nicht** geeignet |

## 8.2 E01/raw read-only mounten mit Arsenal Image Mounter (CLI)

**Befehl (PowerShell, Administrator):**

```powershell
& "C:\Program Files\Arsenal Image Mounter\aim_cli.exe" `
    --mount `
    --readonly `
    --filename="C:\Cases\case01\images\disk01.E01" `
    --provider=LibEwf
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `--mount` | Image einbinden |
| `--readonly` | Schreibzugriffe unterbinden |
| `--filename=` | Pfad zur Image-Datei (E01-erstes-Segment oder .img) |
| `--provider=` | `LibEwf` für E01, `DiscUtils` oder Default für raw/VHD |
| `--background` | Prozess im Hintergrund weiterlaufen lassen |

Nach dem Mount erscheint das Image als neues **physisches Laufwerk** in `Get-Disk`. Enthaltene Partitionen werden von Windows erkannt und mit Laufwerksbuchstaben belegt – diese sind read-only (Arsenal setzt den Filter auf Disk-Ebene).

## 8.3 E01/raw read-only mounten mit FTK Imager (GUI)

1. **File → Image Mounting…**
2. **Image File:** Pfad zum .E01 oder .img
3. **Mount Type:** `Physical & Logical`
4. **Mount Method:** `Block Device / Read Only`
5. **Mount**
6. Das Image erscheint anschließend als zusätzliches Laufwerk; beim Abschluss **File → Image Mounting… → Unmount** nicht vergessen.

## 8.4 Image per Laufwerksbuchstabe mit OSFMount

**Befehl (OSFMount CLI):**

```cmd
OSFMount.com -a -t file -f "C:\Cases\case01\images\disk01.img" -m Z: -o ro,offset=1048576,readonly
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `-a` | Attach (mounten) |
| `-t file` | Image aus Datei |
| `-f` | Image-Pfad |
| `-m Z:` | Laufwerksbuchstabe |
| `-o ro` / `readonly` | Read-only |
| `-o offset=N` | Byte-Offset (Startsektor × Sektorgröße) |

**Unmounten:**

```cmd
OSFMount.com -d -m Z:
```

## 8.5 Physische Beweis-Partition schreibgeschützt untersuchen

**Beschreibung:**

Wenn doch einmal direkt am Originalmedium gearbeitet werden muss (z. B. Triage), **zwingend vorher** den Schreibschutz-Registry-Key setzen (siehe 14.3), Hardware-Write-Blocker verwenden, und nach Abschluss des Zugriffs über `diskpart`:

```cmd
DISKPART> select volume 5
DISKPART> remove letter=E
```

So verhindert man unabsichtliches Schreiben über Drittanwendungen, die sonst den Laufwerksbuchstaben ansprechen würden.

## 8.6 Offset-Mount bei einer Image-Partition

Wenn ein Raw-Image mehrere Partitionen enthält und man gezielt eine einzelne einbinden möchte, wird der Offset in Bytes benötigt (Startsektor × Sektorgröße). Den Startsektor liefert FTK Imager (Evidence Tree zeigt Partitionen) oder Sleuth Kit:

```powershell
mmls.exe "C:\Cases\case01\images\disk01.img"
```

**Beispielausgabe:**

```
Slot   Start      End        Length     Description
00:    0000000000 0000000000 0000000001 Primary Table (#0)
01:    0000000001 0000002047 0000002047 Unallocated
02:    0000002048 0062333951 0062331904 Win95 FAT32 (0x0C)
```

Byte-Offset = `2048 × 512 = 1048576`.

Damit dann z. B. in OSFMount:

```cmd
OSFMount.com -a -t file -f "C:\Cases\case01\images\disk01.img" -m Z: -o ro,offset=1048576
```

## 8.7 Mounts prüfen

```powershell
# Arsenal Image Mounter: eingebundene Images anzeigen
& "C:\Program Files\Arsenal Image Mounter\aim_cli.exe" --list

# Windows: alle virtuellen/gemounteten Disks
Get-Disk | Where-Object { $_.BusType -eq 'Virtual' -or $_.Model -match 'Arsenal|OSFMount|FTK' }
```

## 8.8 Unmounten

```powershell
# Arsenal
& "C:\Program Files\Arsenal Image Mounter\aim_cli.exe" --dismount --device=PhysicalDrive3

# OSFMount
OSFMount.com -D -m Z:

# FTK Imager GUI: File → Image Mounting → Unmount
```

---

# 9. Hex- und Binäranalyse

## 9.1 Erste 512 Bytes als Hex ausgeben (PowerShell)

**Beschreibung:**

Gibt die ersten 512 Bytes einer Datei formatiert als Hex-Dump aus (z. B. MBR/Bootsektor).

**Befehl:**

```powershell
Format-Hex -Path "C:\Cases\case01\images\disk01.img" -Count 512 |
    Out-File "C:\Cases\case01\notes\disk01_first512.hex"
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `Format-Hex` | PowerShell-Cmdlet für Hex-Darstellung |
| `-Count` | Anzahl Bytes, die gelesen werden |
| `-Offset` | Startoffset in Bytes (ab PowerShell 6.1) |

## 9.2 Erste 4 KiB dumpen

**Befehl (PowerShell):**

```powershell
Format-Hex -Path "C:\Cases\case01\images\disk01.img" -Count 4096 |
    Out-File "C:\Cases\case01\notes\disk01_first4k.hex"
```

## 9.3 HxD (GUI, Standard unter Windows)

**Beschreibung:**

HxD ist der verbreitetste Hex-Editor für Windows. Er kann Dateien **und** physische Laufwerke öffnen. Für forensische Zwecke immer das Original-Dropdown auf **„Open disk…"** mit aktiver Option **„Open as Read-only"** stellen.

**Typische Aufgaben in HxD:**

- **File → Open…** (Image als Datei) oder **Extras → Open Disk…** (physisches Laufwerk, read-only)
- **Analysis → Checksums…** → MD5 auf Auswahl oder Gesamt
- **Search → Find…** (Hex/Text)
- **Tools → File compare…**

## 9.4 Sektor direkt lesen (PowerShell)

**Beschreibung:**

Liest N Bytes ab einem Offset aus einem Image und gibt sie als Hex aus.

**Befehl:**

```powershell
$path   = "C:\Cases\case01\images\disk01.img"
$offset = 0            # z. B. 0 für MBR, 1048576 für Start Partition 1
$count  = 512
$fs = [System.IO.File]::OpenRead($path)
try {
    $fs.Seek($offset, [System.IO.SeekOrigin]::Begin) | Out-Null
    $buf = New-Object byte[] $count
    [void]$fs.Read($buf, 0, $count)
    $buf | Format-Hex
} finally { $fs.Close() }
```

---

# 10. Datei- und Artefaktvergleich

## 10.1 Textbasierter Vergleich (PowerShell)

**Befehl:**

```powershell
Compare-Object (Get-Content .\file1.txt) (Get-Content .\file2.txt)
```

## 10.2 Windows-Bordmittel `fc` (CMD)

**Befehl:**

```cmd
fc /N file1.txt file2.txt
fc /B file1.bin file2.bin
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `/N` | Zeilennummern anzeigen (Text-Modus) |
| `/B` | Binärer Vergleich |

## 10.3 Visueller Vergleich mit WinMerge

**Beschreibung:**

WinMerge ist ein kostenloses GUI-Tool für Text- und Ordnervergleiche mit Syntax-Highlighting und 3-Way-Diff. Für Hex-Diffs eignen sich HxD („Tools → File compare") oder Beyond Compare.

## 10.4 Binärer Vergleich (PowerShell, hashbasiert)

**Befehl:**

```powershell
(Get-FileHash file1.bin -Algorithm MD5).Hash -eq (Get-FileHash file2.bin -Algorithm MD5).Hash
```

## 10.5 Bytegenauer Diff (PowerShell)

**Befehl:**

```powershell
$a = [System.IO.File]::ReadAllBytes('file1.bin')
$b = [System.IO.File]::ReadAllBytes('file2.bin')
for ($i = 0; $i -lt [Math]::Min($a.Length, $b.Length); $i++) {
    if ($a[$i] -ne $b[$i]) {
        '{0,10:X} : {1:X2} -> {2:X2}' -f $i, $a[$i], $b[$i]
    }
}
```

---

# 11. Strings, Pipes und Filter

## 11.1 Sysinternals `strings.exe`

**Beschreibung:**

Portierung des Unix-Klassikers `strings` von Microsoft/Sysinternals. Extrahiert druckbare Zeichenketten aus Binärdaten.

**Befehl:**

```powershell
& "C:\Tools\Sysinternals\strings.exe" -nobanner -n 6 `
    "C:\Cases\case01\images\disk01.img" |
    Select-String -Pattern "password|pdf" -CaseSensitive:$false
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `-n N` | Mindestlänge für Strings |
| `-a` | Nur ASCII |
| `-u` | Nur Unicode (UTF-16LE) – wichtig unter Windows! |
| `-o` | Offset jedes Fundes |
| `-nobanner` | Banner unterdrücken |
| `Select-String -Pattern` | Filter (Regex) |
| `-CaseSensitive:$false` | Groß-/Kleinschreibung ignorieren |

**Hinweis:** Windows speichert viele Strings als UTF-16LE. `strings.exe` findet standardmäßig ASCII **und** Unicode; bei manchen Portierungen muss `-u` explizit gesetzt werden.

## 11.2 Nur Teilbereich scannen (Laufzeit reduzieren)

**Befehl (PowerShell):**

```powershell
$fs = [System.IO.File]::OpenRead("C:\Cases\case01\images\disk01.img")
$buf = New-Object byte[] (10MB)
[void]$fs.Read($buf, 0, $buf.Length)
$fs.Close()
[System.IO.File]::WriteAllBytes("$env:TEMP\first10m.bin", $buf)
& "C:\Tools\Sysinternals\strings.exe" -nobanner "$env:TEMP\first10m.bin" |
    Select-String "pdf"
```

## 11.3 `findstr` (CMD, bordeigen)

**Befehl:**

```cmd
strings.exe C:\Cases\case01\images\disk01.img | findstr /I "password pdf"
```

`findstr /I` ist case-insensitive.

---

# 12. Dateisysteme und Datenträger-Vorbereitung

## 12.1 Häufige Dateisysteme im Forensik-Alltag (Übersicht)

| Dateisystem | Typische Plattform | Vorteile | Nachteile/Risiken | Forensische Hinweise |
|---|---|---|---|---|
| **NTFS** | Windows | ACL/Permissions, ADS, Journaling | viele Metadaten-„Verstecke" (ADS, Slack) | siehe 12.2 – eigener Abschnitt |
| **ReFS** | Windows Server, Storage Spaces | Checksums, große Volumes | weniger Tool-Support | Integrity Streams, Metadaten-Scrubbing |
| **exFAT** | Wechselmedien | große Dateien, hohe Kompatibilität | wenige Metadaten, kein Journal | Timestamp-Verhalten und FAT-Chain prüfen |
| **FAT32** | Wechselmedien/Legacy | maximale Kompatibilität | 4-GB-Dateigrößenlimit | wenig Journaling-Artefakte, einfache Recovery |
| ext4 | Linux | Journaling, stabile Performance | Linux-spezifische Strukturen | Journal/Superblock/Extent-Struktur relevant |
| btrfs | Linux (Desktop, NAS, Synology) | Copy-on-Write, Snapshots, Subvolumes, Checksums, integrierte RAID-Modi | hohe strukturelle Komplexität (B-Trees, dynamische Metadaten-Chunks), Recovery bei defekten Trees anspruchsvoll, unter Windows nur Lesezugriff (WinBtrfs) | Subvolumes und Snapshots getrennt auswerten (enthalten oft ältere Dateiversionen); `btrfs inspect-internal`, `btrfs restore` aus Linux-Live-Umgebung; Checksum-Fehler können echte Manipulation oder Medium-Defekt sein – unterscheiden |
| ZFS | Solaris/Illumos, FreeBSD, TrueNAS, Linux (OpenZFS) | Pool/Dataset-Modell, Copy-on-Write, Snapshots + Clones, Ende-zu-Ende-Checksums, Deduplikation, Kompression | proprietäre Historie (CDDL), kein natives Windows-Tooling, Recovery ohne Original-Pool-Layout schwierig, hoher RAM-Bedarf beim Import | Pool read-only importieren (`zpool import -o readonly=on -N`); Snapshots (`zfs list -t snapshot`) liefern frühere Zustände – oft Tage bis Monate zurück; bei verschlüsselten Datasets Schlüssel/Passphrase dokumentieren; `zdb` für Low-Level-Analyse |
| APFS | macOS | Snapshots, Verschlüsselung | macOS-spezifisch | Container/Volumes; Encryption prüfen |
| HFS+ | ältere macOS | Legacy | veraltet | Journal/Metadaten beachten |

**Kurz zur Einordnung der beiden neuen Einträge:** **btrfs** triffst du im Forensik-Alltag vor allem auf Synology-NAS und einigen Linux-Desktop-Distributionen (openSUSE, Fedora-Root-Layouts). Die Snapshots sind hier das wichtigste Artefakt – sie liegen als eigene Subvolumes im gleichen Pool und enthalten oft Wochen zurückreichende Dateiversionen. **ZFS** begegnet dir hauptsächlich auf TrueNAS/FreeNAS-Systemen, FreeBSD-Servern und in Proxmox-Umgebungen. Wichtig beim Import: immer `readonly=on` und möglichst `-N` (kein automatisches Mount), sonst schreibt der Kernel Pool-Metadaten zurück und die Integrität ist dahin.


## 12.2 NTFS – Aufbau und forensisch relevante Strukturen

NTFS verwaltet sich selbst als Dateisystem aus Dateien: jede Struktur – Dateitabelle, Journal, Bitmap, Security Descriptors – ist selbst eine Datei mit einem Namen, der mit `$` beginnt. Im laufenden Windows sind diese Dateien unsichtbar; aus einem forensischen Image lassen sie sich gezielt extrahieren und auswerten.

### 12.2.1 NTFS-Metadatendateien (Systemdateien)

Die Systemdateien belegen in jeder NTFS-Partition fixe Positionen in der MFT (Inodes 0–15, einige weitere unter `$Extend\`).

| Datei | Inode | Funktion | Forensische Relevanz |
|---|---|---|---|
| `$MFT` | 0 | Master File Table, je 1024 Byte pro Datei/Verzeichnis | **Zentrales Artefakt:** jede (auch gelöschte) Datei mit Name, Größe, Pfad, Timestamps |
| `$MFTMirr` | 1 | Spiegel der ersten vier MFT-Records | Fallback bei korrupter `$MFT` |
| `$LogFile` | 2 | NTFS-Transaktionsjournal | Frischeste Datei-Operationen, auch zurückgerollte |
| `$Volume` | 3 | Volume-Name, Seriennummer, NTFS-Version | Volume-Serial für LNK/JumpList-Korrelation |
| `$AttrDef` | 4 | Attributsdefinitionen | gering |
| `.` (Root) | 5 | Wurzelverzeichnis | Index-Einträge (`$I30`) |
| `$Bitmap` | 6 | Cluster-Allokations-Bitmap | Freie vs. belegte Cluster, Slack |
| `$Boot` | 7 | Bootsektor + Bootcode (VBR) | BPB: Sektorgröße, MFT-Offset, Cluster-Größe |
| `$BadClus` | 8 | Liste defekter Cluster | gelegentlich Datenversteck |
| `$Secure` (`$SDS`) | 9 | Security Descriptors (ACL) | Besitzer, Berechtigungen historisch |
| `$UpCase` | 10 | Upper-Case-Tabelle | gering |
| `$Extend\` | 11 | Container weiterer Systemdateien | siehe folgende Zeilen |
| `$Extend\$ObjId` | – | Object IDs (für LNK-Tracking) | Cross-System-Korrelation |
| `$Extend\$Quota` | – | Disk Quotas | User-Zuordnung |
| `$Extend\$Reparse` | – | Reparse Points, Junctions, OneDrive-Placeholders | Verzeichnisumleitungen |
| `$Extend\$UsnJrnl` | – | USN Change Journal (`$Max`, `$J`) | **Sehr relevant:** Wochen an Datei-Änderungen |

### 12.2.2 Der Master File Table (`$MFT`) im Detail

Pro Datei **und** pro Verzeichnis existiert ein MFT-Record von 1024 Byte. Gelöschte Dateien bleiben in der MFT stehen, bis ihr Record von einer neuen Datei überschrieben wird – das kann Stunden bis Monate dauern.

**Struktur eines MFT-Records:**

- Header: Signatur `FILE`, Flags (In-Use, Directory), Sequence Number, Hard-Link-Count
- Attribute (TLV-Liste) – die wichtigsten:
  - `$STANDARD_INFORMATION` (`$SI`, Typ 0x10): 4 Zeitstempel, Datei-Attribute
  - `$FILE_NAME` (`$FN`, Typ 0x30): Dateiname, Parent-Referenz, nochmal 4 Zeitstempel
  - `$DATA` (Typ 0x80): Dateiinhalt – **resident** (für Dateien kleiner als ~700 Byte direkt in der MFT) oder **non-resident** (über Data Runs)
  - `$INDEX_ROOT` / `$INDEX_ALLOCATION` (Typ 0x90/0xA0): bei Verzeichnissen – Kind-Einträge (`$I30`)
  - `$ATTRIBUTE_LIST` (Typ 0x20): bei stark fragmentierten/großen Dateien

**Was sich aus der `$MFT` gewinnen lässt:**

- Alle Dateinamen – auch gelöschte, solange Record nicht wiederverwendet
- Parent-Verzeichnis-Referenz (kompletter Pfad rekonstruierbar)
- Dateigrößen (logisch + physisch)
- **Inhalt kleiner Dateien direkt aus der MFT** (resident `$DATA`)
- Achterzeitstempel-Set (siehe 12.2.3)
- Alle Alternate Data Streams (jeder ADS ist ein eigenes `$DATA`-Attribut)

**`$MFT` aus Image extrahieren:**

```powershell
# Sleuth Kit: Inode 0 = MFT selbst. -o erwartet Startsektor der NTFS-Partition.
& "C:\Tools\sleuthkit\bin\mmls.exe" "D:\Cases\case01\images\disk01.E01"
# -> Startsektor notieren, z.B. 2048

& "C:\Tools\sleuthkit\bin\icat.exe" -o 2048 `
    "D:\Cases\case01\images\disk01.E01" 0 `
    > "D:\Cases\case01\notes\MFT.bin"
```

Alternative in FTK Imager (GUI): Evidence Tree → Partition → `[root]` → Rechtsklick auf `$MFT` → **Export Files…**

**`$MFT` parsen mit MFTECmd (Eric Zimmerman):**

```powershell
& "C:\Tools\EZ\MFTECmd.exe" -f "D:\Cases\case01\notes\MFT.bin" `
    --csv "D:\Cases\case01\notes" --csvf MFT.csv
# Bodyfile für Timeline (mactime-Format)
& "C:\Tools\EZ\MFTECmd.exe" -f "D:\Cases\case01\notes\MFT.bin" `
    --body "D:\Cases\case01\notes\MFT.body" --bodyf body
```

Die CSV enthält pro Datei u. a.: vollständigen Pfad, Größe, alle acht Timestamps (0x10 **und** 0x30), Flags, Extension, Parent-Referenz, Residency.

### 12.2.3 NTFS-Zeitstempel: `$SI` vs. `$FN` – Timestomping erkennen

NTFS führt pro Datei **acht** Zeitstempel:

| Set | Attribut | Felder |
|---|---|---|
| `$SI` (Typ 0x10) | `$STANDARD_INFORMATION` | Created, Modified, MFT-Changed, Accessed |
| `$FN` (Typ 0x30) | `$FILE_NAME` | Created, Modified, MFT-Changed, Accessed |

- **`$SI`**-Timestamps sind über die normale Win32-API (`SetFileTime`) schreibbar. Malware setzt sie gerne zurück, um unauffällig zu wirken ("Timestomping").
- **`$FN`**-Timestamps werden ausschließlich durch den NTFS-Kernel bei Create/Rename/Move/Hardlink gesetzt und sind aus dem Userland nicht trivial manipulierbar.

**Typische Indikatoren für Timestomping:**

- `$SI-Modified` **vor** `$FN-Created` (die Datei wurde angeblich geändert, bevor sie angelegt wurde)
- `$SI`-Werte exakt auf die Sekunde gerundet (0 Nanosekunden Sub-Second-Anteil), während `$FN` volle 100-ns-Auflösung zeigt
- `$SI`-Timestamps „zu rund" (z. B. `2019-01-01 00:00:00`)
- Große Spreizung zwischen `$SI` und `$FN` bei Dateien, die nie umbenannt/verschoben wurden

In der MFTECmd-CSV stehen die `$SI`-Zeitstempel in Spalten mit Suffix `0x10`, die `$FN`-Zeitstempel mit Suffix `0x30` (z. B. `Created0x10` vs. `Created0x30`).

**Schnell-Filter in PowerShell:**

```powershell
Import-Csv "D:\Cases\case01\notes\MFT.csv" |
    Where-Object {
        $si = [datetime]$_.'Created0x10'; $fn = [datetime]$_.'Created0x30'
        $si -ne $fn -and $_.IsDirectory -eq 'False'
    } |
    Select-Object FullPath, Created0x10, Created0x30, LastModified0x10, LastModified0x30 |
    Export-Csv -NoTypeInformation "D:\Cases\case01\notes\timestomp_candidates.csv"
```

### 12.2.4 `$LogFile` – NTFS-Transaktionsjournal

`$LogFile` ist ein zirkuläres Journal (Default meist 64 MiB), in das NTFS jede Metadaten-Änderung **vor** der Ausführung schreibt (Write-Ahead Logging). Forensischer Nutzen: Dateisystem-Operationen der letzten Stunden bis wenigen Tage lassen sich rekonstruieren – auch solche, deren Spuren in der `$MFT` bereits überschrieben wurden.

**Was darin steht:**

- Redo/Undo-Records pro Transaktion
- Betroffene MFT-Records und geänderte Attribute
- Partielle alte Werte vor der Änderung

**`$LogFile` extrahieren:**

```powershell
& "C:\Tools\sleuthkit\bin\icat.exe" -o 2048 `
    "D:\Cases\case01\images\disk01.E01" 2 `
    > "D:\Cases\case01\notes\LogFile.bin"
```

**Parsen:**

- **LogFileParser** (Joakim Schicht): `LogFileParser.exe -i LogFile.bin -o LogFile.csv`
- **NTFS Log Tracker** (Junghoon Oh) – GUI, kombiniert `$LogFile` + `$UsnJrnl` + `$MFT`

**Zeitliche Abdeckung:** stark lastabhängig – bei typischen Arbeitsplätzen einige Stunden bis ca. zwei Tage. Bei idle-Systemen deutlich mehr.

### 12.2.5 `$UsnJrnl` – USN Change Journal

Unter `$Extend\$UsnJrnl` führt NTFS ein zweites, langlebigeres Journal. Es besteht aus zwei ADS:

- `$Max`: Header und Konfiguration (Größe, Inhaltsgrenzen)
- `$J`: eigentliche Änderungs-Records – nominell oft mehrere hundert MiB, real viel kleiner, weil sparse

Pro Änderung ein Record mit Zeitstempel, Dateinamen, Parent-Referenz und **Reason-Flags** (kombinierbar):

| Reason | Bedeutung |
|---|---|
| `FILE_CREATE` | Datei angelegt |
| `FILE_DELETE` | Datei gelöscht |
| `DATA_OVERWRITE` | Inhalt überschrieben |
| `DATA_EXTEND` / `DATA_TRUNCATION` | Größe geändert |
| `RENAME_OLD_NAME` / `RENAME_NEW_NAME` | Umbenennung (zwei Records) |
| `BASIC_INFO_CHANGE` | Timestamps/Attribute geändert |
| `SECURITY_CHANGE` | ACL geändert |
| `STREAM_CHANGE` | ADS angelegt/geändert |
| `CLOSE` | Abschluss einer Operation – markiert das „Ende" der Reason-Kette |

**Zeitliche Abdeckung:** meist mehrere Wochen, auf Servern Monate – damit deutlich länger als `$LogFile`.

**Extrahieren (FTK Imager GUI, empfohlen):**

Evidence Tree → Partition → `[root]` → `$Extend` → `$UsnJrnl` → Rechtsklick → **Export Files…** Es werden die beiden Streams `$Max` und `$J` separat als Dateien gespeichert (achten auf `$J` – das ist der relevante).

**Parsen:**

```powershell
# MFTECmd kann $J direkt parsen
& "C:\Tools\EZ\MFTECmd.exe" -f "D:\Cases\case01\notes\UsnJrnl_J.bin" `
    --csv "D:\Cases\case01\notes" --csvf usnjrnl.csv
```

Alternativ: **UsnJrnl2Csv** (Joakim Schicht).

### 12.2.6 Alternate Data Streams (ADS)

NTFS erlaubt pro Datei beliebig viele benannte Datenströme. Der „normale" Inhalt liegt im unbenannten `$DATA` (`datei.txt::$DATA`); zusätzliche Ströme hängen sich per Doppelpunkt an: `datei.txt:versteckt`.

**Häufige legitime ADS:**

| Stream | Quelle | Inhalt |
|---|---|---|
| `Zone.Identifier` | Downloads, E-Mail-Anhänge, kopiert von Netzshares | „Mark of the Web" – Zone + Quell-URL |
| `SmartScreen` | Windows SmartScreen | Scan-Status |
| `OECustomProperty` | Outlook | Mail-Eigenschaften |
| `favicon` | Browser | Icon-Daten |

**Forensische Relevanz:** Malware nutzt ADS zum Verstecken von Payloads, Konfigurationen oder Second-Stage-Binaries. `Zone.Identifier` ist umgekehrt ein starker Herkunftsnachweis.

**ADS auf gemountetem Image auflisten und lesen:**

```powershell
# Alle ADS im gemounteten Image (M:) sammeln
Get-ChildItem M:\ -Recurse -Force -ErrorAction SilentlyContinue |
    ForEach-Object { Get-Item $_.FullName -Stream * -ErrorAction SilentlyContinue } |
    Where-Object { $_.Stream -ne ':$DATA' } |
    Select-Object FileName, Stream, Length |
    Export-Csv -NoTypeInformation "D:\Cases\case01\notes\ads_all.csv"

# Zone.Identifier gezielt auslesen
Get-Content 'M:\Users\alice\Downloads\setup.exe' -Stream 'Zone.Identifier'
```

Typischer `Zone.Identifier`-Inhalt:

```
[ZoneTransfer]
ZoneId=3
ReferrerUrl=https://example.com/
HostUrl=https://example.com/downloads/setup.exe
```

Zone-IDs: `0` = Local Machine, `1` = Local Intranet, `2` = Trusted, `3` = Internet, `4` = Restricted.

### 12.2.7 `$I30` – Verzeichnisindex und Index-Slack

Verzeichnisse speichern ihre Einträge als B+-Baum im `$INDEX_ROOT`/`$INDEX_ALLOCATION`-Attribut mit Indexnamen `$I30`. Die Indexeinträge enthalten kompakte Kopien der `$FN`-Attribute der Kind-Dateien (Name, Parent-Ref, Größe, 4× Timestamps).

**Forensischer Gewinn – Index-Slack:** Wird eine Datei gelöscht und ihr MFT-Record später wiederverwendet, bleiben ihre Spuren oft **in den Slack-Bereichen** des `$I30`-Baums erhalten. Dort lassen sich Dateinamen teils über Monate rekonstruieren, nachdem die MFT-Spur bereits weg ist.

**Tools:** `INDXParse.py` (Willi Ballenthin), `INDXRipper`.

### 12.2.8 Recycle Bin (`$Recycle.Bin`)

Seit Vista liegt der Papierkorb unter `$Recycle.Bin\<SID>\`. Jede gelöschte Datei erzeugt zwei Einträge:

- `$I<ID>` (z. B. `$IABC123`): Metadaten – ursprünglicher Pfad, Originalgröße, Löschzeitstempel
- `$R<ID>` (z. B. `$RABC123`): der eigentliche Dateiinhalt

Die **SID** im Pfad identifiziert den Benutzer, der gelöscht hat.

**Parsen mit RBCmd (Eric Zimmerman):**

```powershell
& "C:\Tools\EZ\RBCmd.exe" -d 'M:\$Recycle.Bin' `
    --csv "D:\Cases\case01\notes" --csvf recyclebin.csv
```

SID → Username auflösen über die Registry (`SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList\<SID>`).

### 12.2.9 Metadaten aus dem Image extrahieren – Übersicht

Typischer Ablauf nach Read-only-Mount des Images bzw. direkt aus den NTFS-Inodes:

| Artefakt | Quelle (Inode / Pfad) | Extraktion | Parser |
|---|---|---|---|
| `$MFT` | Inode 0 | `icat -o <sec> img 0` / FTK Imager Export | **MFTECmd** |
| `$LogFile` | Inode 2 | `icat -o <sec> img 2` | **LogFileParser**, NTFS Log Tracker |
| `$UsnJrnl:$J` | `$Extend\$UsnJrnl:$J` | FTK Imager Export (GUI einfacher) | **MFTECmd**, UsnJrnl2Csv |
| `$I30` eines Verzeichnisses | MFT-Record des Verzeichnisses | FTK Imager Export | **INDXParse**, INDXRipper |
| `$Recycle.Bin\<SID>\$I*` | reguläre Dateien | direkt vom gemounteten Image | **RBCmd** |
| ADS (z. B. `Zone.Identifier`) | beliebige Datei | `Get-Content -Stream` am gemounteten Image | textuell |
| `$Secure:$SDS` (ACLs) | Inode 9 | FTK Imager Export | `secure_sds.py`, X-Ways |

**Partitionsoffset für `icat -o` ermitteln:**

```powershell
& "C:\Tools\sleuthkit\bin\mmls.exe" "D:\Cases\case01\images\disk01.E01"
# Startsektor der NTFS-Partition notieren (z.B. 2048)
```

**Kombinierte Timeline aus mehreren NTFS-Quellen:**

```powershell
# $MFT und $UsnJrnl:$J jeweils als Bodyfile (mactime-Format)
& "C:\Tools\EZ\MFTECmd.exe" -f "D:\Cases\case01\notes\MFT.bin" `
    --body "D:\Cases\case01\notes\MFT.body"     --bodyf mft
& "C:\Tools\EZ\MFTECmd.exe" -f "D:\Cases\case01\notes\UsnJrnl_J.bin" `
    --body "D:\Cases\case01\notes\usn.body" --bodyf usn

# Zusammenführen und per mactime sortieren
Get-Content "D:\Cases\case01\notes\MFT.body","D:\Cases\case01\notes\usn.body" |
    Set-Content "D:\Cases\case01\notes\combined.body"
& "C:\Tools\sleuthkit\bin\mactime.exe" -b "D:\Cases\case01\notes\combined.body" -d `
    > "D:\Cases\case01\notes\timeline.csv"
```

## 12.3 Volume Shadow Copies (VSS)

**Beschreibung:**

Windows erstellt über den Volume Shadow Copy Service automatisch Schattenkopien, die frühere Zustände von Dateien und Registry-Hives enthalten. Forensisch extrem wertvoll – insbesondere, wenn Dateien nach dem Vorfall modifiziert oder gelöscht wurden, aber in einer älteren Shadow Copy noch erhalten sind.

**Live-Triage (am laufenden System, Administrator):**

```cmd
vssadmin list shadows
```

Einbinden per symbolischem Link (nur Triage, nicht forensisch sauber):

```cmd
mklink /D C:\shadow_copy "\\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy1\"
```

**Forensisch sauber – aus dem Image:**

- Arsenal Image Mounter bindet Shadow Copies des eingebundenen Images direkt mit ein (Option „Mount all with shadow copies")
- `libvshadow` / `vshadowinfo.exe`, `vshadowmount.exe` aus dem libyal-Projekt auflistet und mountet einzelne Shadows aus einem raw/E01-Image
- `vss_carver.py` carved VSS-Strukturen auch aus unallokiertem Bereich

```powershell
& "C:\Tools\libvshadow\vshadowinfo.exe" "D:\Cases\case01\images\disk01.img"
& "C:\Tools\libvshadow\vshadowmount.exe" "D:\Cases\case01\images\disk01.img" "D:\Cases\case01\mounts\vss"
# In D:\Cases\case01\mounts\vss\ erscheinen vss1, vss2, ... als raw-Images pro Shadow
```

## 12.4 Partitionstabelle anlegen (GPT) – nur Übungs-/Zielmedium

**Befehl (`diskpart`, Administrator):**

```cmd
DISKPART> list disk
DISKPART> select disk 2
DISKPART> clean
DISKPART> convert gpt
```

**Achtung:** Destruktiv. Nur auf eindeutig verifiziertem Zielgerät ausführen.

## 12.5 Partition erstellen und formatieren

**Befehl (`diskpart`):**

```cmd
DISKPART> select disk 2
DISKPART> create partition primary size=10240
DISKPART> format quick fs=ntfs label="FORENSIK-CASE"
DISKPART> assign letter=F
```

**Alternative (PowerShell):**

```powershell
New-Partition -DiskNumber 2 -Size 10GB -AssignDriveLetter |
    Format-Volume -FileSystem NTFS -NewFileSystemLabel "FORENSIK-CASE" -Confirm:$false
```

## 12.6 Formatieren (Übersicht)

```powershell
# NTFS
Format-Volume -DriveLetter F -FileSystem NTFS     -NewFileSystemLabel "DATA" -Confirm:$false
# exFAT
Format-Volume -DriveLetter F -FileSystem exFAT    -NewFileSystemLabel "USB"  -Confirm:$false
# FAT32 (nur bis 32 GB per GUI/Format-Volume; größer mit fat32format.exe)
Format-Volume -DriveLetter F -FileSystem FAT32    -NewFileSystemLabel "USB"  -Confirm:$false
# ReFS (Servervarianten)
Format-Volume -DriveLetter F -FileSystem ReFS     -NewFileSystemLabel "DATA" -Confirm:$false
```

---

# 13. Datenträger sicher löschen (HDD, SATA-SSD, NVMe)

**Achtung:** Alle Befehle in diesem Kapitel sind irreversibel und zerstören Daten.

## 13.1 HDD vollständig überschreiben (Nullen, `diskpart`)

**Befehl:**

```cmd
DISKPART> select disk 2
DISKPART> clean all
```

`clean all` schreibt Nullen über die gesamte Disk (bei HDDs kann das Stunden dauern).

## 13.2 HDD überschreiben mit Sysinternals SDelete

**Befehl:**

```powershell
& "C:\Tools\Sysinternals\sdelete.exe" -p 3 -z F:
```

| Element | Erklärung |
|---|---|
| `-p N` | Anzahl Überschreibdurchläufe |
| `-z` | Freien Speicher löschen (Zero free space) |
| `-c` | Freien Speicher säubern (Clean) |
| `F:` | Zielvolume |

## 13.3 Freien Platz auf Windows-Volume überschreiben

**Befehl (bordeigen):**

```cmd
cipher /w:F:\
```

`cipher /w` überschreibt den **freien** Speicher auf dem angegebenen Volume (Dateien bleiben erhalten). Ideal, um nach Löschung Reste zu entfernen.

## 13.4 Nur Header/Anfangsbereich zerstören (schnell)

**Befehl (dd für Windows):**

```cmd
dd.exe if=/dev/zero of=\\.\PhysicalDrive2 bs=512 count=2048
```

Hinweis: `if=/dev/zero` funktioniert bei Chrysocome-dd auch unter Windows.

## 13.5 SATA-SSD: Secure-Erase-Support prüfen

**Befehl:**

```powershell
Get-PhysicalDisk | Select-Object FriendlyName, MediaType, BusType, Size
# Detailliert über hersteller-eigene Tools (Samsung Magician, Intel SSD Toolbox, Crucial Storage Executive, WD Dashboard)
# oder CrystalDiskInfo (liest SMART/Secure-Erase-Support aus)
```

## 13.6 SATA-SSD: Secure Erase ausführen

**Empfohlene Wege unter Windows:**

1. **Herstellertool (empfohlen):** Samsung Magician, Intel SSD Toolbox, Crucial Storage Executive, Kingston SSD Manager, WD Dashboard – jeweils mit „Secure Erase"-Funktion. Erfordert meist, dass die SSD **nicht** das Systemlaufwerk ist.
2. **Parted Magic / boot-ISO:** `hdparm --security-erase` von Linux-Live-USB. Unter reinem Windows steht kein äquivalentes CLI-Tool zur Verfügung.
3. **UEFI/BIOS:** Viele Mainboards bieten ATA Secure Erase im Setup.

## 13.7 NVMe: Secure Erase

**Variante A – Herstellertool** (siehe 13.6).

**Variante B – `nvme-cli` für Windows:**

```powershell
# https://github.com/linux-nvme/nvme-cli (Windows-Build erforderlich)
nvme.exe list
nvme.exe format \\.\PhysicalDrive2 --ses=1
```

| Element | Erklärung |
|---|---|
| `--ses=0` | No secure erase |
| `--ses=1` | User Data Erase |
| `--ses=2` | Cryptographic Erase (wenn von der SSD unterstützt) |

---

# 14. Write-Blocker und Hardware

## 14.1 Warum Write-Blocker?

**Beschreibung:**

Hardware-Write-Blocker verhindern physisch jeden Schreibzugriff auf das Originalmedium. Unter Windows ist ein Write-Blocker besonders wichtig, weil das Betriebssystem beim Anstecken von Datenträgern aktiv auf das Medium zugreift (Superfetch-Datei, Papierkorb-Metadaten, Indexdienst, Autorun, Defender-Scan).

## 14.2 Gängige Write-Blocker

| Hersteller | Modell | Schnittstellen |
|------------|--------|----------------|
| Tableau | T35689iu | SATA, IDE, USB, SAS |
| Tableau | TX1 | NVMe, USB-C, SATA |
| Wiebetech | USB WriteBlocker | USB |
| Digital Intelligence | UltraBlock | SATA, IDE, USB |
| CRU | Forensic UltraDock | SATA/IDE/SAS/USB |

## 14.3 Software-Alternative: USB-Schreibschutz per Registry

**Beschreibung:**

Windows unterstützt einen **USB-Storage-Schreibschutz** per Registry-Eintrag. Er ist **nicht** gerichtsfest, schützt aber versehentliche Schreibzugriffe bei der Triage. Ersetzt keinen Hardware-Write-Blocker.

**Aktivieren (PowerShell, Administrator – Neustart erforderlich):**

```powershell
$key = 'HKLM:\SYSTEM\CurrentControlSet\Control\StorageDevicePolicies'
if (-not (Test-Path $key)) { New-Item $key -Force | Out-Null }
New-ItemProperty -Path $key -Name 'WriteProtect' -Value 1 -PropertyType DWord -Force
```

**Deaktivieren:**

```powershell
Set-ItemProperty -Path $key -Name 'WriteProtect' -Value 0
```

**Wirkung:** Nach Neustart sind USB-Massenspeicher schreibgeschützt – Lesen funktioniert weiter. Wirkt **nicht** auf interne SATA/NVMe-Disks.

## 14.4 Automount / Auto-Play deaktivieren

**Beschreibung:**

Automatisches Einbinden von Volumes kann Schreibzugriffe (z. B. Papierkorb, NTFS-Journal) auslösen, sobald ein Beweismedium angesteckt wird.

**Befehl (`diskpart`, Administrator):**

```cmd
DISKPART> automount disable
DISKPART> automount scrub
```

| Befehl | Wirkung |
|---|---|
| `automount disable` | Windows bindet neue Volumes nicht mehr automatisch ein |
| `automount scrub` | Entfernt zwischengespeicherte Volume-Einträge |
| `automount enable` | Wieder aktivieren |

**AutoPlay** in Windows (Einstellungen → Geräte → Automatische Wiedergabe) ebenfalls deaktivieren.

## 14.5 Warnung

Software-Blocker können umgangen werden und sind kein Ersatz für Hardware-Write-Blocker in gerichtsverwertbaren Untersuchungen.

---

# 15. Protokollierung und Chain of Custody

## 15.1 Sitzung protokollieren mit `Start-Transcript`

**Befehl (PowerShell):**

```powershell
$log = "C:\Cases\case01\notes\session_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"
Start-Transcript -Path $log -IncludeInvocationHeader
# … Arbeit …
Stop-Transcript
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `Start-Transcript` | Startet Protokoll der PowerShell-Sitzung |
| `-Path` | Zieldatei |
| `-Append` | An bestehende Datei anhängen |
| `-IncludeInvocationHeader` | Zeitstempel und Aufruf-Kontext pro Befehl |
| `Stop-Transcript` | Beendet Protokoll |

## 15.2 PowerShell-History sichern

**Befehl:**

```powershell
# aktuelle Session
Get-History | Export-Csv -NoTypeInformation "C:\Cases\case01\notes\history_$(Get-Date -Format 'yyyyMMdd_HHmmss').csv"

# persistente PSReadLine-History (Benutzerprofil)
Copy-Item (Get-PSReadlineOption).HistorySavePath "C:\Cases\case01\notes\psreadline_history.txt"
```

## 15.3 Systeminformationen dokumentieren

**Befehl:**

```powershell
$info = "C:\Cases\case01\notes\system_info.txt"
"=== SYSTEM INFORMATION ==="                       | Out-File $info
Get-Date                                            | Out-File $info -Append
Get-ComputerInfo -Property CsName, OsName, OsVersion, OsBuildNumber, OsArchitecture, TimeZone, CsDomain, CsManufacturer, CsModel |
    Format-List                                     | Out-File $info -Append
[System.Environment]::UserName                      | Out-File $info -Append
whoami /all                                         | Out-File $info -Append
```

## 15.4 Chain of Custody Template

**Vorlage für jeden Beweisgegenstand:**

```
CHAIN OF CUSTODY - BEWEISKETTE
================================
Case-ID:              case01
Beweisgegenstand:     USB-Stick 32GB, SanDisk Cruzer
Seriennummer:         [aus Get-Disk / Get-PhysicalDisk]
Modell:               [aus Get-Disk]
Device-Pfad:          \\.\PhysicalDrive1
Laufwerksbuchstabe:   [falls vergeben]

ÜBERNAHME
---------
Datum/Zeit:           [YYYY-MM-DD HH:MM:SS]
Übernommen von:       [Name/Person]
Übergeben durch:      [Name/Person]
Zustand:              [intakt/beschädigt/versiegelt]

AUFBEWAHRUNG
------------
Ort:                  [z.B. Beweiskammer, Schrank 3]
Zugriffskontrolle:    [wer hat Zugriff]

IMAGING
-------
Datum/Zeit:           [YYYY-MM-DD HH:MM:SS]
Durchgeführt von:     [Name]
Methode:              [FTK Imager / dd / dc3dd]
Hash Original:        [MD5]
Hash Image:           [MD5]
Verifiziert:          [JA/NEIN - Datum]

WEITERGABE
----------
Datum/Zeit:           [YYYY-MM-DD HH:MM:SS]
Übergeben an:         [Name/Person]
Grund:                [Analyse/Archivierung/etc.]
Unterschrift Übergabe: _______________
Unterschrift Empfang: _______________
```

---

# 16. Best Practices und typische Fehler

## 16.1 Merksätze

- Niemals am Original arbeiten – immer Image erstellen und daran analysieren
- MD5 als Integritätshash in diesem Workflow (für gerichtsverwertbare Fälle SHA-256 oder Doppel-Hash MD5 + SHA-256 vorsehen)
- Hash vom Original und vom Image vergleichen und dokumentieren
- Read-only Mounts verwenden (Arsenal Image Mounter, FTK Imager, OSFMount)
- Hardware-Write-Blocker nutzen, wenn verfügbar
- Vor dem Anstecken: `automount disable`, USB-Schreibschutz-Registry setzen, Defender-Exklusion konfigurieren
- `bs` bewusst wählen und dokumentieren
- Vollständige Protokollierung aller Befehle via `Start-Transcript`
- Laufwerksbuchstaben nach Analyse entfernen (`diskpart`) statt „rausziehen"
- Zeitzone dokumentieren (Windows-Logs sind lokalzeit-/UTC-abhängig)

## 16.2 Typische Fehler

| Fehler | Konsequenz | Lösung |
|--------|------------|--------|
| Falsches Device (`PhysicalDrive0` vs. `PhysicalDrive1`) | Datenverlust am falschen Gerät | Immer mit `Get-Disk`, Seriennummer und Größe verifizieren |
| Laufwerksbuchstabe aktiv, Automount an | Modifikation des Originals (Papierkorb, Indexdienst, Defender) | `automount disable`, Write-Blocker, Laufwerksbuchstabe vorab entfernen |
| Unvollständige Dokumentation | Nicht gerichtsfest | `Start-Transcript` nutzen |
| Kein Hash-Vergleich | Kein Integritätsnachweis | Immer Hash Original vs. Image, dokumentieren |
| Software- statt Hardware-Write-Blocker | Potenziell angreifbar | Hardware-Blocker bevorzugen |
| Defender-Quarantäne auf Fund im Image | Beweismittel verändert/gelöscht | Case-Ordner von Defender ausschließen |
| Pfad mit Leerzeichen nicht in Anführungszeichen | Befehl schlägt fehl / falsches Ziel | Pfade immer in `"…"` |
| Analyse am Original statt am Image | Integrität zerstört | Immer nur am gemounteten Image arbeiten |
| Zeitzone nicht dokumentiert | Zeitstempel missverständlich | `Get-TimeZone`, UTC vs. Lokalzeit protokollieren |

---

# 17. Case-Studie: Kompletter Forensik-Workflow

## 17.1 Szenario

**Auftrag:** Forensische Untersuchung eines USB-Sticks (32GB, SanDisk), der einem Mitarbeiter einer Firma gehört. Verdacht auf Datenexfiltration.

**Ziel:** Forensisch sauberes Image erstellen, analysieren und dokumentieren.

**System:** Windows 11 Forensik-Workstation mit installiertem FTK Imager, Arsenal Image Mounter, Sysinternals Suite, HxD, Sleuth Kit für Windows.

---

## 17.2 Schritt 1: Vorbereitung

### Case-Ordnerstruktur anlegen

```powershell
$case = "D:\Cases\exfil01"
"images","mounts","hashes","notes","reports" | ForEach-Object {
    New-Item -ItemType Directory -Path "$case\$_" -Force | Out-Null
}
Set-Location $case
```

### Defender-Ausschluss + Automount deaktivieren

```powershell
Add-MpPreference -ExclusionPath "D:\Cases"
```

```cmd
diskpart
DISKPART> automount disable
DISKPART> automount scrub
DISKPART> exit
```

### Protokollierung starten

```powershell
Start-Transcript -Path "D:\Cases\exfil01\notes\session_$(Get-Date -Format 'yyyyMMdd_HHmmss').log" -IncludeInvocationHeader
```

### Systeminfo dokumentieren

```powershell
$info = "D:\Cases\exfil01\notes\system_info.txt"
"=== SYSTEM INFORMATION ===" | Out-File $info
Get-Date                      | Out-File $info -Append
Get-ComputerInfo -Property CsName, OsName, OsVersion, OsBuildNumber, OsArchitecture, TimeZone |
    Format-List               | Out-File $info -Append
Get-TimeZone                  | Out-File $info -Append
whoami /all                   | Out-File $info -Append
```

---

## 17.3 Schritt 2: Datenträger identifizieren

### Vor Anschließen des USB-Sticks

```powershell
Get-Disk | Select-Object Number, FriendlyName, SerialNumber, Size, BusType |
    Format-Table -AutoSize |
    Out-File "D:\Cases\exfil01\notes\disks_before.txt"
```

### USB-Stick anschließen (idealerweise über Write-Blocker) und identifizieren

```powershell
Get-Disk | Select-Object Number, FriendlyName, SerialNumber, Size, BusType | Format-Table -AutoSize
```

**Beispielausgabe:**

```
Number FriendlyName        SerialNumber        Size      BusType
------ ------------        ------------        ----      -------
     0 Samsung SSD 970     S4J2NS0R123456K     512 GB    NVMe
     1 SanDisk Cruzer      4C5300001234567890   32 GB    USB
```

### Device verifizieren

```powershell
Get-Disk -Number 1                | Out-File "D:\Cases\exfil01\notes\disk1_details.txt"
Get-Partition -DiskNumber 1       | Out-File "D:\Cases\exfil01\notes\disk1_partitions.txt" -Append
Get-PhysicalDisk -DeviceNumber 1  | Format-List * | Out-File "D:\Cases\exfil01\notes\disk1_physical.txt"
```

**Chain of Custody - Übernahme:**

```
Beweisgegenstand:     USB-Stick 32GB, SanDisk Cruzer
Device-Pfad:          \\.\PhysicalDrive1
Seriennummer:         4C5300001234567890 (aus Get-PhysicalDisk)
Übernommen am:        2024-03-15 09:30:00
Zustand:              intakt, nicht versiegelt
```

---

## 17.4 Schritt 3: Auto-Mount verhindern / Laufwerksbuchstabe entfernen

### Prüfen, ob gemountet

```powershell
Get-Partition -DiskNumber 1 | Select-Object PartitionNumber, DriveLetter, Offset, Size, Type
```

### Falls Laufwerksbuchstabe vergeben: entfernen

```cmd
diskpart
DISKPART> list volume
DISKPART> select volume 5
DISKPART> remove letter=E
DISKPART> exit
```

### Verifizieren

```powershell
Get-Partition -DiskNumber 1 | Select-Object PartitionNumber, DriveLetter, Offset, Size
```

---

## 17.5 Schritt 4: Initialen Hash des Originals erzeugen

**Üblicher Praxisweg:** Der Hash wird **gleichzeitig** mit dem Imaging erstellt (FTK Imager). Alternativ vorab explizit:

### MD5 direkt über das Device

```powershell
"=== HASH ORIGINAL - START ===" | Tee-Object -FilePath "D:\Cases\exfil01\notes\hashing.txt" -Append
Get-Date                         | Tee-Object -FilePath "D:\Cases\exfil01\notes\hashing.txt" -Append
& ftkimager.exe --print --md5 --no-write \\.\PHYSICALDRIVE1 |
    Tee-Object -FilePath "D:\Cases\exfil01\hashes\original.md5"
Get-Date                         | Tee-Object -FilePath "D:\Cases\exfil01\notes\hashing.txt" -Append
"=== HASH ORIGINAL - ENDE ===" | Tee-Object -FilePath "D:\Cases\exfil01\notes\hashing.txt" -Append
```

**Beispielausgabe:**

```
a1b2c3d4e5f67890abcdef1234567890  \\.\PHYSICALDRIVE1
```

---

## 17.6 Schritt 5: Forensisches Image erstellen

### Mit FTK Imager CLI (empfohlen – integriertes Hashing + Verifikation)

```powershell
"=== IMAGING - START ===" | Tee-Object -FilePath "D:\Cases\exfil01\notes\imaging.txt" -Append
Get-Date                  | Tee-Object -FilePath "D:\Cases\exfil01\notes\imaging.txt" -Append

& ftkimager.exe \\.\PHYSICALDRIVE1 `
    "D:\Cases\exfil01\images\usb_sandisk_32gb" `
    --e01 `
    --compress 6 `
    --frag 2G `
    --case-number "exfil01" `
    --evidence-number "E001" `
    --description "SanDisk Cruzer 32GB" `
    --examiner "Hannes Lang" `
    --notes "Imaging ueber Tableau T35689iu Write-Blocker" `
    --md5 `
    --verify

Get-Date                  | Tee-Object -FilePath "D:\Cases\exfil01\notes\imaging.txt" -Append
"=== IMAGING - ENDE ==="  | Tee-Object -FilePath "D:\Cases\exfil01\notes\imaging.txt" -Append
```

FTK Imager erzeugt:

- `usb_sandisk_32gb.E01`, `usb_sandisk_32gb.E02`, … (Segmente)
- `usb_sandisk_32gb.E01.txt` (Begleitprotokoll mit Hashes und Metadaten)

### Alternative: Raw-Image mit dd für Windows

```cmd
dd.exe if=\\.\PhysicalDrive1 of=D:\Cases\exfil01\images\usb_sandisk_32gb.img bs=16M conv=noerror,sync --progress
```

---

## 17.7 Schritt 6: Hash des Images erzeugen

### E01-Image (FTK Imager hat das Hashing bereits durchgeführt)

Hash aus Begleitprotokoll übernehmen oder explizit verifizieren:

```powershell
& ftkimager.exe --verify "D:\Cases\exfil01\images\usb_sandisk_32gb.E01" |
    Tee-Object -FilePath "D:\Cases\exfil01\hashes\image_verify.txt"
```

### Raw-Image (falls verwendet)

```powershell
"=== HASH IMAGE - START ===" | Tee-Object "D:\Cases\exfil01\notes\hashing.txt" -Append
Get-Date                     | Tee-Object "D:\Cases\exfil01\notes\hashing.txt" -Append
Get-FileHash -Algorithm MD5 "D:\Cases\exfil01\images\usb_sandisk_32gb.img" |
    Tee-Object -FilePath "D:\Cases\exfil01\hashes\image.md5"
Get-Date                     | Tee-Object "D:\Cases\exfil01\notes\hashing.txt" -Append
"=== HASH IMAGE - ENDE ==="  | Tee-Object "D:\Cases\exfil01\notes\hashing.txt" -Append
```

---

## 17.8 Schritt 7: Hashvergleich und Verifikation

### Direkter Vergleich (PowerShell)

```powershell
$v = "D:\Cases\exfil01\notes\verification.txt"
"=== HASH VERGLEICH ===" | Tee-Object -FilePath $v
"Original:"              | Tee-Object -FilePath $v -Append
Get-Content "D:\Cases\exfil01\hashes\original.md5" | Tee-Object -FilePath $v -Append
"Image:"                 | Tee-Object -FilePath $v -Append
Get-Content "D:\Cases\exfil01\hashes\image.md5"    | Tee-Object -FilePath $v -Append

$h1 = (Select-String "D:\Cases\exfil01\hashes\original.md5" -Pattern "[0-9A-Fa-f]{64}" | Select-Object -First 1).Matches.Value
$h2 = (Select-String "D:\Cases\exfil01\hashes\image.md5"    -Pattern "[0-9A-Fa-f]{64}" | Select-Object -First 1).Matches.Value
if ($h1 -ieq $h2) { "ERGEBNIS: MATCH" | Tee-Object $v -Append }
else              { "ERGEBNIS: MISMATCH`n$h1`n$h2" | Tee-Object $v -Append }
```

**Erwartete Ausgabe:**

```
usb_sandisk_32gb.E01: VERIFICATION SUCCEEDED
ERGEBNIS: MATCH
```

### Dokumentation

```
VERIFIKATIONSERGEBNIS
=====================
Original MD5: a1b2c3d4e5f67890abcdef1234567890
Image MD5:    a1b2c3d4e5f67890abcdef1234567890
Ergebnis:         MATCH - Image ist identisch mit Original
Verifiziert am:   2024-03-15 10:15:00
```

---

## 17.9 Schritt 8: Image zur Analyse mounten (read-only)

### Partitionen im Image prüfen

```powershell
& "C:\Tools\sleuthkit\bin\mmls.exe" "D:\Cases\exfil01\images\usb_sandisk_32gb.E01"
```

**Beispielausgabe:**

```
Slot   Start      End        Length     Description
02:    0000002048 0062333951 0062331904 Win95 FAT32 (0x0C)
```

### Mit Arsenal Image Mounter einbinden

```powershell
& "C:\Program Files\Arsenal Image Mounter\aim_cli.exe" `
    --mount --readonly `
    --filename="D:\Cases\exfil01\images\usb_sandisk_32gb.E01" `
    --provider=LibEwf
```

Das Image erscheint als neue Disk, z. B. `\\.\PhysicalDrive3`, und Windows erkennt die Partition und weist (da Automount noch deaktiviert ist, **nicht** automatisch) per diskpart zuweisbar einen Laufwerksbuchstaben zu:

```cmd
DISKPART> list volume
DISKPART> select volume 6
DISKPART> assign letter=M
```

Ergebnis: `M:\` ist read-only-Sicht in das Image.

### Verifizieren

```powershell
Get-Volume -DriveLetter M
Get-ChildItem M:\ -Force | Select-Object -First 20
```

---

## 17.10 Schritt 9: Erste Analyse

### Dateiliste erstellen

```powershell
Get-ChildItem M:\ -Recurse -Force -ErrorAction SilentlyContinue |
    Select-Object FullName, Length, CreationTime, LastWriteTime, LastAccessTime, Attributes |
    Export-Csv -NoTypeInformation "D:\Cases\exfil01\notes\filelist_full.csv"
```

### Nach bestimmten Dateitypen suchen

```powershell
Get-ChildItem M:\ -Recurse -Force -Include *.pdf,*.doc,*.docx,*.xls,*.xlsx,*.zip,*.rar,*.7z -ErrorAction SilentlyContinue |
    Select-Object FullName, Length, LastWriteTime |
    Export-Csv -NoTypeInformation "D:\Cases\exfil01\notes\suspicious_files.csv"
```

### Timeline erstellen (Sleuth Kit für Windows)

```powershell
& "C:\Tools\sleuthkit\bin\fls.exe" -r -m "C:/" "D:\Cases\exfil01\images\usb_sandisk_32gb.E01" > "D:\Cases\exfil01\notes\bodyfile.txt"
& "C:\Tools\sleuthkit\bin\mactime.exe" -b "D:\Cases\exfil01\notes\bodyfile.txt" > "D:\Cases\exfil01\notes\timeline.csv"
```

### Alternate Data Streams auflisten (NTFS)

```powershell
Get-ChildItem M:\ -Recurse -Force -ErrorAction SilentlyContinue |
    ForEach-Object { Get-Item $_.FullName -Stream * -ErrorAction SilentlyContinue } |
    Where-Object { $_.Stream -ne ':$DATA' } |
    Select-Object FileName, Stream, Length |
    Export-Csv -NoTypeInformation "D:\Cases\exfil01\notes\ads.csv"
```

### Strings nach relevanten Begriffen durchsuchen

```powershell
& "C:\Tools\Sysinternals\strings.exe" -nobanner -n 6 `
    "D:\Cases\exfil01\images\usb_sandisk_32gb.E01" |
    Select-String -Pattern "password|confidential|geheim|intern|kunde" |
    Out-File "D:\Cases\exfil01\notes\strings_sensitive.txt"
```

---

## 17.11 Schritt 10: Hex-Dump des MBR sichern

```powershell
Format-Hex -Path "D:\Cases\exfil01\images\usb_sandisk_32gb.img" -Count 512 |
    Out-File "D:\Cases\exfil01\notes\mbr.hex"
```

---

## 17.12 Schritt 11: Cleanup und Abschluss

### Laufwerksbuchstabe entfernen und Image unmounten

```cmd
DISKPART> select volume 6
DISKPART> remove letter=M
```

```powershell
& "C:\Program Files\Arsenal Image Mounter\aim_cli.exe" --dismount --device=PhysicalDrive3
```

### Protokollierung beenden

```powershell
Stop-Transcript
```

### PowerShell-History sichern

```powershell
Get-History | Export-Csv -NoTypeInformation "D:\Cases\exfil01\notes\bash_history.csv"
Copy-Item (Get-PSReadlineOption).HistorySavePath "D:\Cases\exfil01\notes\psreadline_history.txt"
```

### Automount wieder einschalten (am Arbeitsende)

```cmd
DISKPART> automount enable
```

---

## 17.13 Schritt 12: Abschlussdokumentation

### Chain of Custody - Abschluss

```
CHAIN OF CUSTODY - ABSCHLUSS
============================
Case-ID:              exfil01
Beweisgegenstand:     USB-Stick 32GB, SanDisk Cruzer

IMAGING
-------
Datum/Zeit Start:     2024-03-15 09:45:00
Datum/Zeit Ende:      2024-03-15 10:05:00
Durchgeführt von:     Hannes Lang
Methode:              FTK Imager CLI (E01)
Kompression:          6
Write-Blocker:        Tableau T35689iu

HASHES
------
Original MD5:         a1b2c3d4e5f67890abcdef1234567890
Image MD5:            a1b2c3d4e5f67890abcdef1234567890
Vergleich:            MATCH (ftkimager --verify: SUCCEEDED)

DATEIEN
-------
Image:               D:\Cases\exfil01\images\usb_sandisk_32gb.E01 (+ Segmente)
Image-Größe (netto): 32.014.958.592 Bytes
Begleitprotokoll:    D:\Cases\exfil01\images\usb_sandisk_32gb.E01.txt
Hash-Dateien:        D:\Cases\exfil01\hashes\
Protokolle:          D:\Cases\exfil01\notes\

AUFBEWAHRUNG
------------
Original:            Versiegelt in Beweiskammer, Schrank 3
Image:               D:\Cases\exfil01\images\ auf Forensik-Server
Backup-Image:        [falls erstellt]

Unterschrift:        ___________________
Datum:               2024-03-15
```

---

## 17.14 Zusammenfassung der Case-Studie

| Schritt | Befehl/Aktion | Ergebnis |
|---------|---------------|----------|
| 1 | `New-Item`, `Add-MpPreference`, `automount disable`, `Start-Transcript` | Case-Struktur, Defender-Exklusion, Automount aus, Protokollierung aktiv |
| 2 | `Get-Disk`, `Get-Partition`, `Get-PhysicalDisk` | Device als `\\.\PhysicalDrive1` identifiziert |
| 3 | `diskpart remove letter` | Keine Laufwerksbuchstaben auf Original |
| 4 | `ftkimager --print --md5` | Original-Hash dokumentiert |
| 5 | `ftkimager … --e01 --md5 --verify` | E01-Image erstellt + verifiziert |
| 6 | `ftkimager --verify` / `Get-FileHash` | Image-Hash dokumentiert |
| 7 | Hash-Vergleich PowerShell | Hashes stimmen überein |
| 8 | `aim_cli --mount --readonly` | Image read-only gemountet |
| 9 | `Get-ChildItem`, `fls/mactime`, `strings` | Erste Analyse durchgeführt |
| 10 | `Format-Hex` | MBR gesichert |
| 11 | `aim_cli --dismount`, `Stop-Transcript` | Cleanup durchgeführt |
| 12 | Dokumentation | Chain of Custody vollständig |

---

# 18. Kompaktes Befehls-Cheatsheet (1 Seite)

## Identifikation

```powershell
Get-Disk | Select-Object Number, FriendlyName, SerialNumber, Size, BusType
Get-Partition -DiskNumber 1
Get-Volume
```

```cmd
diskpart
  list disk
  select disk 1
  detail disk
  list partition
```

## Vorbereitung

```cmd
diskpart
  automount disable
  automount scrub
```

```powershell
Add-MpPreference -ExclusionPath "C:\Cases"
```

## Imaging

```powershell
# FTK Imager CLI – E01 mit Hash und Verify
ftkimager.exe \\.\PHYSICALDRIVE1 "C:\Cases\case01\images\disk01" `
    --e01 --compress 6 --md5 --verify `
    --case-number "case01" --evidence-number "E001" `
    --description "Beweis-Disk 01" --examiner "Hannes Lang"
```

```cmd
:: dd für Windows
dd.exe if=\\.\PhysicalDrive1 of=C:\Cases\case01\images\disk01.img bs=16M conv=noerror,sync --progress
```

## Hashing

```powershell
Get-FileHash -Algorithm MD5 "C:\Cases\case01\images\disk01.img"
ftkimager.exe --print --md5 --no-write \\.\PHYSICALDRIVE1
ftkimager.exe --verify  "C:\Cases\case01\images\disk01.E01"
```

```cmd
certutil -hashfile "C:\Cases\case01\images\disk01.img" MD5
```

## Mount / Unmount (read-only)

```powershell
& "C:\Program Files\Arsenal Image Mounter\aim_cli.exe" --mount --readonly --filename="C:\...\disk01.E01" --provider=LibEwf
& "C:\Program Files\Arsenal Image Mounter\aim_cli.exe" --dismount --device=PhysicalDrive3
```

```cmd
OSFMount.com -a -t file -f C:\...\disk01.img -m Z: -o ro,offset=1048576
OSFMount.com -d -m Z:
```

## Analyse

```powershell
Format-Hex -Path "C:\...\disk01.img" -Count 512
& "C:\Tools\Sysinternals\strings.exe" -nobanner -n 6 "C:\...\disk01.img" | Select-String "password"
& "C:\Tools\sleuthkit\bin\fls.exe" -r "C:\...\disk01.E01" > filelist.txt
```

## Wipe

```cmd
:: HDD
diskpart -> select disk 2 -> clean all
:: Freier Speicher auf Volume
cipher /w:F:\
:: NVMe
nvme.exe format \\.\PhysicalDrive2 --ses=1
```

## Protokollierung

```powershell
Start-Transcript -Path "C:\...\session.log" -IncludeInvocationHeader
# …
Stop-Transcript
Get-History | Export-Csv -NoTypeInformation "C:\...\history.csv"
```

---

# 19. Quellen und Standards

## 19.1 Internationale Standards

| Standard | Beschreibung | Link |
|----------|--------------|------|
| **NIST SP 800-86** | Guide to Integrating Forensic Techniques into Incident Response | https://csrc.nist.gov/publications/detail/sp/800-86/final |
| **NIST SP 800-101** | Guidelines on Mobile Device Forensics | https://csrc.nist.gov/publications/detail/sp/800-101/rev-1/final |
| **ISO/IEC 27037** | Guidelines for identification, collection, acquisition and preservation of digital evidence | https://www.iso.org/standard/44381.html |
| **ISO/IEC 17025** | General requirements for the competence of testing and calibration laboratories | https://www.iso.org/standard/66912.html |
| **ACPO Guidelines** | Association of Chief Police Officers Digital Evidence Guidelines (UK) | https://www.cps.gov.uk/legal-guidance/digital-evidence |
| **BSI-Leitfaden IT-Forensik** | Bundesamt für Sicherheit in der Informationstechnik | https://www.bsi.bund.de/ |

## 19.2 Österreichische Rechtsgrundlagen

| Gesetz/Verordnung | Relevanz |
|-------------------|----------|
| **StPO § 134** | Beschlagnahme von Beweismitteln |
| **StPO § 177** | Durchsuchung |
| **DSGVO** | Datenschutz bei Verarbeitung personenbezogener Daten |
| **DSG** | Datenschutzgesetz Österreich |

**Wichtig:** In Österreich müssen forensische Untersuchungen dokumentiert sein, damit die Ergebnisse vor Gericht verwertbar sind. Die Beweiskette (Chain of Custody) muss lückenlos nachvollziehbar sein.

## 19.3 Tool-Dokumentationen (Windows)

| Tool | Dokumentation |
|------|---------------|
| **FTK Imager** | https://www.exterro.com/ftk-imager |
| **Arsenal Image Mounter** | https://arsenalrecon.com/products/arsenal-image-mounter |
| **OSFMount** | https://www.osforensics.com/tools/mount-disk-images.html |
| **HxD** | https://mh-nexus.de/en/hxd/ |
| **Sysinternals Suite** (strings, sdelete, handle, autoruns, …) | https://learn.microsoft.com/en-us/sysinternals/ |
| **The Sleuth Kit (Windows build)** | https://www.sleuthkit.org/sleuthkit/ |
| **Autopsy** | https://www.autopsy.com/ |
| **dd for Windows (Chrysocome)** | https://www.chrysocome.net/dd |
| **nvme-cli (Windows build)** | https://github.com/linux-nvme/nvme-cli |
| **CrystalDiskInfo** (SMART) | https://crystalmark.info/en/software/crystaldiskinfo/ |
| **PowerShell `Get-FileHash`** | https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-filehash |
| **`certutil`** | https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/certutil |
| **`diskpart`** | https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/diskpart |

## 19.4 Weiterführende Ressourcen

| Ressource | Beschreibung | Link |
|-----------|--------------|------|
| SANS Digital Forensics | Blog, Poster, Cheatsheets | https://www.sans.org/blog/digital-forensics/ |
| Forensic Focus | Forum und Artikel | https://www.forensicfocus.com/ |
| Volatility Foundation | Memory Forensics | https://github.com/volatilityfoundation/volatility |
| Eric Zimmerman's Tools | Windows-Artefakt-Parser (MFT, Registry, Prefetch, …) | https://ericzimmerman.github.io/ |
| KAPE | Kroll Artifact Parser And Extractor | https://www.kroll.com/en/services/cyber/incident-response-litigation-support/kroll-artifact-parser-extractor-kape |

---

# 20. Tool-Installation

## 20.1 Empfohlene Basis-Installation (Windows 10/11)

| Tool | Download / Bezug | Zweck |
|---|---|---|
| **FTK Imager (GUI + CLI)** | exterro.com (Account-Registrierung) | Imaging, Hashing, Verify, AD1, E01, Mount |
| **Arsenal Image Mounter** | arsenalrecon.com (Free-Version genügt für RO) | Images read-only als Disk mounten |
| **OSFMount** | osforensics.com | Images per Laufwerksbuchstabe mounten |
| **HxD** | mh-nexus.de | Hex-Editor, Disk-Editor |
| **Sysinternals Suite** | learn.microsoft.com/sysinternals (oder `winget`) | strings, sdelete, autoruns, handle, psexec, … |
| **The Sleuth Kit (Windows)** | sleuthkit.org | fls, mmls, mactime, icat, … |
| **Autopsy** | autopsy.com | GUI-Forensikplattform (basiert auf Sleuth Kit) |
| **dd for Windows** | chrysocome.net | Raw-Imaging |
| **nvme-cli (Windows)** | github.com/linux-nvme/nvme-cli | NVMe Secure Erase |
| **CrystalDiskInfo** | crystalmark.info | SMART, Secure-Erase-Support prüfen |
| **7-Zip** | 7-zip.org | Archivierung, Kompression |
| **Eric Zimmerman's Tools** | ericzimmerman.github.io | MFTECmd, RECmd, PECmd, KAPE-Module |

## 20.2 Installation via `winget` (Windows Package Manager)

```powershell
winget install Microsoft.Sysinternals.Suite
winget install 7zip.7zip
winget install MHNexus.HxD
winget install CrystalDewWorld.CrystalDiskInfo
winget install OSForensics.OSFMount
# FTK Imager und Arsenal Image Mounter erfordern Registrierung und manuellen Download
```

## 20.3 Installation via `chocolatey`

```powershell
# Chocolatey einmalig installieren:
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Pakete:
choco install sysinternals 7zip hxd crystaldiskinfo osfmount -y
```

## 20.4 Installation prüfen

```powershell
Get-Command ftkimager.exe, dd.exe, aim_cli.exe, OSFMount.com, strings.exe, sdelete.exe, nvme.exe -ErrorAction SilentlyContinue |
    Select-Object Name, Source
```

## 20.5 Versionen dokumentieren

```powershell
$v = "C:\Cases\case01\notes\versions.txt"
"=== TOOL VERSIONS ===" | Out-File $v
"PowerShell:      $($PSVersionTable.PSVersion)" | Out-File $v -Append
"OS:              $((Get-CimInstance Win32_OperatingSystem).Caption) $((Get-CimInstance Win32_OperatingSystem).Version)" | Out-File $v -Append
& ftkimager.exe --version 2>&1 | Out-File $v -Append
& dd.exe --version         2>&1 | Out-File $v -Append
& "C:\Program Files\Arsenal Image Mounter\aim_cli.exe" --version 2>&1 | Out-File $v -Append
& "C:\Tools\Sysinternals\strings.exe" -nobanner -version 2>&1     | Out-File $v -Append
& "C:\Tools\sleuthkit\bin\fls.exe" -V                             2>&1 | Out-File $v -Append
& nvme.exe version         2>&1 | Out-File $v -Append
```

---

# 21. Übungen

Die folgenden Übungen bauen auf den Inhalten dieses Dokuments auf. Sie können mit einem USB-Stick, einer leeren Festplatte oder einer Windows-Test-VM durchgeführt werden.

**Wichtig:** Verwenden Sie niemals produktive Datenträger für Übungen. Nutzen Sie Testgeräte oder virtuelle Maschinen. Alle Befehle in einer **PowerShell-Sitzung als Administrator** ausführen.

---

## Übung 1: Datenträger identifizieren

**Lernziel:** Geräte richtig erkennen und verifizieren.

1. Schließen Sie einen USB-Stick an Ihr Windows-System an.
2. Führen Sie `Get-Disk | Select Number, FriendlyName, SerialNumber, Size, BusType | Format-Table` aus.
3. Notieren Sie die Disk-Nummer und Seriennummer des USB-Sticks.
4. Führen Sie `Get-Partition -DiskNumber <N>` aus.
5. Dokumentieren Sie: Offset-Werte der Partitionen, Partitionstyp, Gesamtkapazität, Modell, Seriennummer.

**Kontrollfragen:**

- Wie lautet der Device-Pfad in Windows-Notation?
- Wie viele Partitionen hat der Datenträger?
- Welcher Bus-Typ wird angezeigt?

---

## Übung 2: Case-Ordnerstruktur und Protokollierung

**Lernziel:** Einen forensischen Arbeitsplatz vorbereiten.

1. Legen Sie eine Case-Ordnerstruktur an:
   ```powershell
   "images","mounts","hashes","notes" | ForEach-Object {
       New-Item -ItemType Directory -Path "C:\Cases\uebung01\$_" -Force
   }
   ```
2. Starten Sie die Protokollierung mit `Start-Transcript`.
3. Dokumentieren Sie Systeminformationen (`Get-Date`, `Get-ComputerInfo`, `whoami /all`).
4. Beenden Sie die Protokollierung mit `Stop-Transcript`.
5. Prüfen Sie die entstandene Log-Datei.

**Kontrollfragen:**

- Stehen alle Befehle mit Zeitstempeln in der Log-Datei?
- Wurde die Systeminformation korrekt erfasst?

---

## Übung 3: Hashing verstehen

**Lernziel:** Hashes berechnen, vergleichen und verifizieren.

1. Erstellen Sie eine Testdatei:
   ```powershell
   "Forensik Testdatei fuer Hashing-Uebung" | Out-File C:\Cases\uebung01\notes\testfile.txt
   ```
2. Berechnen Sie den MD5-Hash (zwei Wege):
   ```powershell
   Get-FileHash C:\Cases\uebung01\notes\testfile.txt -Algorithm MD5 |
       Export-Csv -NoTypeInformation C:\Cases\uebung01\hashes\testfile.md5.csv
   ```
   ```cmd
   certutil -hashfile C:\Cases\uebung01\notes\testfile.txt MD5 > C:\Cases\uebung01\hashes\testfile_certutil.md5
   ```
3. Verifizieren Sie, indem Sie den Hash erneut berechnen und vergleichen.
4. Ändern Sie die Datei (ein einzelnes Zeichen hinzufügen) und verifizieren Sie erneut.
5. Dokumentieren Sie das Ergebnis.

**Kontrollfragen:**

- Was zeigt der Vergleich vor und nach der Änderung?
- Wie unterscheiden sich die MD5-Hashes?

---

## Übung 4: Forensisches Image erstellen (FTK Imager CLI)

**Lernziel:** Einen Datenträger mit FTK Imager imagen und verifizieren.

1. Verwenden Sie einen Test-USB-Stick (mit beliebigen Daten, aber nicht wichtig).
2. Identifizieren Sie das Device mit `Get-Disk`.
3. Entfernen Sie ggf. vergebene Laufwerksbuchstaben mit `diskpart` (`remove letter=…`).
4. Erstellen Sie das Image im E01-Format mit integriertem Hash:
   ```powershell
   ftkimager.exe \\.\PHYSICALDRIVE<N> "C:\Cases\uebung01\images\usb_uebung" `
       --e01 --compress 6 --md5 --verify `
       --case-number "uebung01" --evidence-number "E001" `
       --description "USB-Uebung" --examiner "<Ihr Name>"
   ```
5. Lesen Sie die Begleitdatei `usb_uebung.E01.txt` und notieren Sie den MD5-Hash.
6. Verifizieren Sie erneut:
   ```powershell
   ftkimager.exe --verify C:\Cases\uebung01\images\usb_uebung.E01
   ```

**Kontrollfragen:**

- Stimmen die Hashes überein (VERIFICATION SUCCEEDED)?
- Wie groß ist die Image-Datei im Vergleich zum Original-Datenträger?
- Welche Felder enthält das Begleitprotokoll?

---

## Übung 5: Raw-Image mit dd für Windows

**Lernziel:** Das klassische `dd`-Verfahren auch unter Windows beherrschen.

1. Installieren Sie `dd.exe` (Chrysocome) nach `C:\Tools\dd\`.
2. Erstellen Sie ein Raw-Image desselben USB-Sticks:
   ```cmd
   dd.exe if=\\.\PhysicalDrive<N> of=C:\Cases\uebung01\images\usb_raw.img bs=16M conv=noerror,sync --progress
   ```
3. Berechnen Sie den MD5 des Raw-Images mit `Get-FileHash`.
4. Vergleichen Sie mit dem MD5 des E01-Images aus Übung 4.

**Kontrollfragen:**

- Welche Vorteile bietet das E01-Format gegenüber dem Raw-Image?
- Wann würden Sie welches Format wählen?

---

## Übung 6: Image mounten und analysieren

**Lernziel:** Ein Image read-only mounten und erste Analysen durchführen.

1. Bestimmen Sie den Offset der ersten Partition:
   ```powershell
   & "C:\Tools\sleuthkit\bin\mmls.exe" C:\Cases\uebung01\images\usb_uebung.E01
   ```
2. Mounten Sie das Image mit Arsenal Image Mounter (read-only):
   ```powershell
   & "C:\Program Files\Arsenal Image Mounter\aim_cli.exe" --mount --readonly `
       --filename="C:\Cases\uebung01\images\usb_uebung.E01" --provider=LibEwf
   ```
3. Weisen Sie in `diskpart` einen Laufwerksbuchstaben zu (`assign letter=M`).
4. Listen Sie alle Dateien auf:
   ```powershell
   Get-ChildItem M:\ -Recurse -Force | Select FullName, Length, LastWriteTime
   ```
5. Suchen Sie nach PDF-Dateien:
   ```powershell
   Get-ChildItem M:\ -Recurse -Force -Filter *.pdf
   ```
6. Unmounten Sie das Image (`remove letter=M`, dann `aim_cli --dismount`).

**Kontrollfragen:**

- Warum ist die `--readonly`-Option zwingend erforderlich?
- Können Sie auf das eingebundene Laufwerk schreiben? (Testen: `New-Item M:\test.txt` – sollte fehlschlagen.)

---

## Übung 7: Hex-Dump erstellen und interpretieren

**Lernziel:** Binärdaten lesen und verstehen.

1. Erstellen Sie einen Hex-Dump der ersten 512 Bytes:
   ```powershell
   Format-Hex -Path C:\Cases\uebung01\images\usb_raw.img -Count 512 |
       Out-File C:\Cases\uebung01\notes\mbr.hex
   ```
2. Öffnen Sie das Image zusätzlich in HxD (read-only).
3. Identifizieren Sie in beiden Darstellungen:
   - Die Offset-Spalte (links)
   - Die Hex-Werte (Mitte)
   - Die ASCII-Darstellung (rechts)
4. Suchen Sie nach bekannten Signaturen:
   - `FA 33` am Anfang = typischer x86-Bootcode-Start
   - `55 AA` an Offset 510-511 = MBR-Signatur
5. Lesen Sie gezielt die ersten 4 KiB:
   ```powershell
   Format-Hex -Path C:\Cases\uebung01\images\usb_raw.img -Count 4096 |
       Out-File C:\Cases\uebung01\notes\first4k.hex
   ```

**Kontrollfragen:**

- Finden Sie die MBR-Signatur `55 AA` an Offset 0x1FE?
- Was bedeuten die Punkte in der rechten ASCII-Spalte?

---

## Übung 8: Strings extrahieren und filtern

**Lernziel:** Mit `strings.exe` (Sysinternals) und `Select-String` relevante Informationen finden.

1. Extrahieren Sie alle Strings:
   ```powershell
   & "C:\Tools\Sysinternals\strings.exe" -nobanner -n 6 C:\Cases\uebung01\images\usb_raw.img |
       Select-Object -First 100
   ```
2. Filtern Sie nach bestimmten Begriffen:
   ```powershell
   & "C:\Tools\Sysinternals\strings.exe" -nobanner -n 6 C:\Cases\uebung01\images\usb_raw.img |
       Select-String -Pattern "pdf|doc|password|user" -CaseSensitive:$false
   ```
3. Scannen Sie nur die ersten 10 MiB (siehe 11.2).
4. Nutzen Sie `-o` um Offsets zu sehen:
   ```powershell
   & "C:\Tools\Sysinternals\strings.exe" -nobanner -o -n 6 C:\Cases\uebung01\images\usb_raw.img |
       Select-String "password" | Select-Object -First 20
   ```

**Kontrollfragen:**

- Was ist der Unterschied zwischen ASCII- und Unicode-Strings unter Windows?
- Warum ist es effizienter, nur einen Teilbereich zu scannen?

---

## Übung 9: Dateien vergleichen

**Lernziel:** Zwei Dateien oder Hex-Dumps vergleichen.

1. Erstellen Sie zwei Testdateien:
   ```powershell
   "Version 1 der Datei" | Out-File C:\Cases\uebung01\notes\datei_v1.txt
   "Version 2 der Datei" | Out-File C:\Cases\uebung01\notes\datei_v2.txt
   ```
2. Vergleichen Sie mit `Compare-Object`:
   ```powershell
   Compare-Object (Get-Content .\datei_v1.txt) (Get-Content .\datei_v2.txt)
   ```
3. Vergleichen Sie binär mit `fc`:
   ```cmd
   fc /B C:\Cases\uebung01\notes\datei_v1.txt C:\Cases\uebung01\notes\datei_v2.txt
   ```
4. Vergleichen Sie hashbasiert:
   ```powershell
   (Get-FileHash .\datei_v1.txt).Hash -eq (Get-FileHash .\datei_v2.txt).Hash
   ```

**Kontrollfragen:**

- Was zeigt `Compare-Object` im Vergleich zu `fc /B`?
- Wann würden Sie welchen Vergleich nutzen?

---

## Übung 10: Kompletter Mini-Case

**Lernziel:** Den gesamten forensischen Workflow selbst durchführen.

**Szenario:** Ein USB-Stick mit Testdaten soll forensisch untersucht werden.

Führen Sie folgende Schritte eigenständig durch (ohne in das Dokument zu schauen):

1. Case-Ordnerstruktur anlegen
2. Defender-Ausschluss + `automount disable` + `Start-Transcript`
3. Systeminformationen dokumentieren (`Get-ComputerInfo`, `Get-TimeZone`, `whoami /all`)
4. USB-Stick identifizieren (`Get-Disk`, `Get-Partition`, `Get-PhysicalDisk`)
5. Etwaige Laufwerksbuchstaben entfernen
6. MD5-Hash des Originals erstellen (`ftkimager --print --md5 --no-write`)
7. Image mit FTK Imager CLI im E01-Format erstellen (`--e01 --md5 --verify`)
8. Verifikation prüfen (`ftkimager --verify`)
9. Offset der ersten Partition ermitteln (`mmls` oder `Get-Partition` auf gemounteter Image-Disk)
10. Image read-only mounten (Arsenal Image Mounter)
11. Laufwerksbuchstaben zuweisen (`diskpart`)
12. Dateiliste erstellen (`Get-ChildItem -Recurse`)
13. Nach PDF- und DOC-Dateien suchen
14. Alternate Data Streams auflisten
15. Strings nach sensitiven Begriffen filtern
16. Hex-Dump der ersten 512 Bytes sichern (`Format-Hex`)
17. Laufwerksbuchstaben entfernen, Image unmounten
18. `Stop-Transcript`, PSReadLine-History sichern
19. `automount enable` (Arbeitsplatz wieder herstellen)
20. Chain of Custody Dokument ausfüllen

**Kontrollfragen:**

- Haben Sie alle Schritte dokumentiert?
- Stimmen die Hashes überein (VERIFICATION SUCCEEDED)?
- Können Sie jeden Befehl mit Zeitstempel nachvollziehen?
- Fehlt etwas in der Chain of Custody?

---

*Dokumentende - Version 2.0 (Windows-Adaption)*
