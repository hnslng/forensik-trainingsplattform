# Linux-Forensik-Cheatsheet – Datenträger, Imaging, Hashing und Analyse

**Autor:** Hannes Lang  
**Ziel:** Technische Abläufe verstehen, korrekt anwenden und forensisch sauber dokumentieren.  
**Niveau:** Fortgeschrittener Einsteiger – Praxis IT-Forensik  
**System:** Linux (Kali, Debian, Ubuntu)  
**Version:** 2.0 – Mit Case-Studie, Quellen und Übungen

---

# Einleitung

Dieses Dokument ist als praktisches Nachschlagewerk für die Linux-basierte Datenträgerforensik entstanden. Es richtet sich an Personen, die erste Erfahrungen mit IT-Forensik sammeln oder ihre bestehenden Kenntnisse strukturieren möchten.

Der Schwerpunkt liegt auf dem forensischen Imaging, der Integritätsprüfung (Hashing) und der Analyse von Datenträgern unter Linux. Alle beschriebenen Befehle und Workflows orientieren sich an etablierten Standards (NIST, ISO/IEC 27037) und sind so aufgebaut, dass sie in der Praxis direkt anwendbar sind.

**Warum dieses Dokument?**

In der forensischen Praxis gibt es keinen Raum für Fehler: Ein falsches Device, ein fehlender Hash-Vergleich oder eine unvollständige Dokumentation können dazu führen, dass Ergebnisse vor Gericht nicht verwertbar sind. Dieses Dokument bietet:

- **Schritt-für-Schritt-Anleitungen** mit erklärten Parametern
- **Eine durchgehende Case-Studie**, die den kompletten Workflow von der Übernahme bis zum Abschluss zeigt
- **Best Practices und typische Fehler** aus der Praxis
- **Übungen**, um das Gelernte selbst auszuprobieren
- **Quellen und Standards** für die weitere Vertiefung

**Hinweis zu Österreich:** Forensische Untersuchungen müssen hierzulande nachvollziehbar und dokumentiert sein, damit Ergebnisse vor Gericht Bestand haben (StPO § 134, DSGVO). Die Beweiskette (Chain of Custody) muss lückenlos geführt werden.

---

## Inhaltsverzeichnis

1. Forensischer Ablauf – Datensicherung Schritt für Schritt
2. Grundbegriffe: Device, Partition, Dateisystem
3. Datenträger identifizieren und prüfen
4. Partitionstabellen verstehen (MBR & GPT)
5. Forensisches Imaging (dd, dc3dd, dcfldd)
6. Image-Formate (raw, E01, AFF)
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

Empfohlene Reihenfolge zur forensisch sauberen Datensicherung und Analyse.

**Ablauf:**

1. Datenträger identifizieren und prüfen
2. Write-Blocker anschließen (falls verfügbar)
3. Sicherstellen, dass keine Partitionen des Originals gemountet sind
4. Protokollierung starten (`script`-Befehl)
5. Initialen Hash des Originals erzeugen (SHA-256 primär)
6. Forensisches Image erstellen
7. Hash des Images erzeugen
8. Hashwerte vergleichen und dokumentieren
9. Hash-Verifikation durchführen (`-c`)
10. Analyse ausschließlich am Image (read-only) durchführen
11. Chain of Custody dokumentieren

**Hinweis:**

Befehle, Pfade, Device-Namen und Zeitstempel sind im Protokoll (Case-Notes) vollständig zu dokumentieren.

## 1.2 Case-Ordnerstruktur anlegen

**Beschreibung:**

Erstellt eine saubere Verzeichnisstruktur für Images, Mountpoints, Hashes und Notizen.

**Befehl:**

```bash
mkdir -p /cases/case01/{images,mounts,hashes,notes,reports,tools}
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `mkdir` | Erstellt Verzeichnisse |
| `-p` | Legt auch übergeordnete Verzeichnisse an; kein Fehler, wenn Verzeichnisse bereits existieren |
| `/cases/case01/...` | Beispielpfad für einen Case; an Umgebung anpassen |
| `{images,mounts,...}` | Shell-Brace-Expansion, erzeugt mehrere Ordner in einem Schritt |

---

# 2. Grundbegriffe: Device, Partition, Dateisystem

## 2.1 Device

**Beschreibung:**

Physischer Blockspeicher, z. B. `/dev/sda` (SATA/SCSI) oder `/dev/nvme0n1` (NVMe).

## 2.2 Partition

**Beschreibung:**

Logischer Abschnitt eines Devices, z. B. `/dev/sda1`, definiert durch Start- und Endsektor.

## 2.3 Dateisystem

**Beschreibung:**

Struktur zur Organisation von Dateien (z. B. ext4, NTFS, FAT32). Je nach Typ unterschiedliche Metadaten (z. B. Superblock/Inodes bei ext*, MFT bei NTFS, Journal bei journaling-Dateisystemen).

---

# 3. Datenträger identifizieren und prüfen

## 3.1 Geräteübersicht

**Beschreibung:**

Listet Blockgeräte und deren Eigenschaften (Größe, Typ, Mountpoint, Modell) übersichtlich auf.

**Befehl:**

```bash
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `lsblk` | Listet Blockgeräte in Baumstruktur |
| `-o` | Auswahl der Ausgabespalten |
| `NAME` | Gerätename (z. B. `sda`, `sda1`) |
| `SIZE` | Größe des Geräts/der Partition |
| `TYPE` | Gerätetyp (`disk`, `part`, `loop`, …) |
| `MOUNTPOINT` | Mountpunkt (leer, wenn nicht gemountet) |
| `MODEL` | Modellbezeichnung (falls verfügbar) |

**Achtung:**

Wenn das Original gemountet ist, besteht Schreib-/Journal-Risiko. Vor Imaging stets unmounten.

## 3.2 Partitionen und Sektorgrößen (klassisch)

**Beschreibung:**

Zeigt Partitionen, Sektorgrößen (logical/physical) und grundlegende Laufwerksinformationen.

**Befehl:**

```bash
fdisk -l /dev/sda
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `fdisk` | Tool zur Anzeige/Bearbeitung klassischer Partitionstabellen |
| `-l` | Listet Partitionstabellen und Details (List-Modus) |
| `/dev/sda` | Zielgerät (Beispiel; korrektes Device vorher ermitteln) |

**Hinweis:**

Für Offset-Berechnungen sind `Start`-Sektor und `Sector size (logical/physical)` maßgeblich.

## 3.3 Partitionstabelle strukturiert anzeigen

**Beschreibung:**

Gibt Partitionstabelleninformationen strukturiert aus; hilfreich für Offset-Berechnung und Layout-Erkennung.

**Befehl:**

```bash
parted /dev/sda print
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `parted` | Tool zur Anzeige/Bearbeitung von Partitionstabellen (MBR/GPT) |
| `/dev/sda` | Zielgerät |
| `print` | Gibt die aktuelle Partitionstabelle und Geometrie aus |

---

# 4. Partitionstabellen verstehen (MBR & GPT)

## 4.1 MBR (Master Boot Record)

**Beschreibung:**

Legacy-Partitionstabelle im ersten Sektor (typisch 512 Byte). Enthält Bootcode und Partitionseinträge.

**Hinweis:**

Typische Grenzen: vier primäre Partitionen; 2 TiB Größenlimit.

## 4.2 GPT (GUID Partition Table)

**Beschreibung:**

Moderne Partitionstabelle mit Primary- und Backup-GPT. Partitionseinträge enthalten GUID, Typ und Label.

**Hinweis:**

Für Loop-Mounts wird der Byte-Offset aus `Startsektor × Sektorgröße` berechnet.

---

# 5. Forensisches Imaging (dd, dc3dd, dcfldd)

## 5.1 Vollständiges Image mit dd erstellen

**Beschreibung:**

`dd` erstellt ein sektorbasiertes 1:1-Abbild eines Blockgeräts in eine Image-Datei.

**Befehl:**

```bash
dd if=/dev/sda of=/cases/case01/images/disk01.img bs=16M conv=noerror,sync status=progress
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `dd` | Kopiert Rohdaten blockweise von Input nach Output |
| `if=` | Input (Quelldevice oder Datei), z. B. `/dev/sda` |
| `of=` | Output (Zielimage oder Datei), z. B. `disk01.img` |
| `bs=` | Blockgröße (Performance/Buffering), z. B. `16M` |
| `conv=noerror` | Bei Lesefehlern fortfahren (nicht abbrechen) |
| `conv=sync` | Fehlende/kurze Blöcke mit Nullen auffüllen (Offset-Treue) |
| `status=progress` | Fortschrittsanzeige während des Kopiervorgangs |

### 5.1.1 Blocksize (bs) – Wirkung, Vor- und Nachteile

| `bs`-Beispiel | Typische Wirkung | Vorteil | Nachteil | Praxisempfehlung |
|---|---|---|---|---|
| `512` / `4K` | sehr kleine Blöcke, viele I/O-Operationen | feingranulares Verhalten, geringe RAM-Last | deutlich langsamer, hoher Overhead | nur bei bewusstem Sektor-Fokus oder Testzwecken |
| `1M` | moderat | guter Kompromiss, meist stabil | nicht immer maximaler Durchsatz | solide Default-Option |
| `4M`–`16M` | große Blöcke | i. d. R. deutlich schneller, weniger syscalls | höhere RAM-Last; bei fehlerhaften Medien können Retries „teurer“ wirken | häufig beste Praxis (z. B. `8M` oder `16M`) |
| `32M`–`128M` | sehr große Blöcke | maximaler Durchsatz bei sehr schnellem Storage möglich | hohe RAM-Last; bei Fehlern/Storage-Stacks teils ungünstig | nur wenn Umfeld stabil und fehlerfrei ist |

## 5.2 Image mit dc3dd erstellen (mit integriertem Hashing)

**Beschreibung:**

`dc3dd` ist eine forensische Erweiterung von `dd` mit integriertem Hashing und Splitting.

**Befehl:**

```bash
dc3dd if=/dev/sda of=/cases/case01/images/disk01.img hash=sha256 log=/cases/case01/images/dc3dd.log
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `dc3dd` | DoD Cyber Crime Center forensische dd-Variante |
| `if=` | Input (Quelldevice) |
| `of=` | Output (Zielimage) |
| `hash=` | Hash-Algorithmus (`md5`, `sha256`, oder beides: `md5,sha256`) |
| `log=` | Protokolldatei für den Imaging-Prozess |
| `hofs=` | Hash in separate Datei schreiben |
| `cnt=` | Anzahl Sektoren/Blöcke begrenzen |

**Vorteil:** Hash wird während des Imaging berechnet – spart Zeit und garantiert Konsistenz.

## 5.3 Image mit dcfldd erstellen

**Beschreibung:**

`dcfldd` ist eine weitere forensische dd-Variante mit Status- und Hashing-Funktionen.

**Befehl:**

```bash
dcfldd if=/dev/sda of=/cases/case01/images/disk01.img hash=sha256 hashlog=/cases/case01/hashes/dcfldd.sha256 bs=16M
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `dcfldd` | Department of Defense Computer Forensics Lab dd-Variante |
| `hash=` | Hash-Algorithmus |
| `hashlog=` | Datei für Hash-Ausgabe |
| `split=` | Image in Teile splitten (z. B. `2G`) |
| `splitformat=` | Namensformat für gesplittete Images |

## 5.4 Nur Anfangsbereich (Header) sichern

**Beschreibung:**

Sichert einen definierten Anfangsbereich (z. B. Bootsektor/Partitionstabellen-nahe Daten) in eine separate Datei.

**Befehl:**

```bash
dd if=/dev/sda of=/cases/case01/images/header.img bs=16M count=10 conv=noerror,sync
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `count=` | Anzahl der zu kopierenden Blöcke (Anzahl × `bs`) |

## 5.5 Image komprimiert erzeugen (Pipeline)

**Beschreibung:**

Erstellt ein Image und komprimiert es während der Erzeugung; `pv` dient der Durchsatz-/Fortschrittsanzeige.

**Befehl:**

```bash
dd if=/dev/sda bs=16M conv=noerror,sync | pv | gzip > /cases/case01/images/disk01.img.gz
```

---

# 6. Image-Formate (raw, E01, AFF)

## 6.1 RAW-Format (.img)

**Beschreibung:**

Einfaches 1:1-Abbild ohne Metadaten oder Kompression.

| Vorteil | Nachteil |
|---------|----------|
| Maximale Kompatibilität | Keine Kompression |
| Keine speziellen Tools nötig | Keine integrierten Metadaten |
| Einfache Verarbeitung | Keine integrierte Integritätsprüfung |

## 6.2 E01-Format (EnCase / ewfacquire)

**Beschreibung:**

Proprietäres Format mit Kompression, Metadaten und integrierter Integritätsprüfung.

**Befehl (ewfacquire):**

```bash
ewfacquire /dev/sda -c case01 -e "Hannes Lang" -d sha256 -f raw -t /cases/case01/images/disk01
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `ewfacquire` | Tool aus ewf-tools für E01-Erstellung |
| `-c` | Case-Nummer/Bezeichnung |
| `-e` | Examiner-Name |
| `-d` | Hash-Algorithmus (`md5`, `sha1`, `sha256`) |
| `-f` | Input-Format (`raw`, `files`) |
| `-t` | Ziel-Pfad (ohne .E01-Endung) |

**Vorteile:**
- Integrierte Kompression
- Metadaten (Case-Info, Examiner, Timestamps)
- Integrierte Hash-Verifikation
- Segmentierung bei großen Images

## 6.3 AFF/AFV-Format

**Beschreibung:**

Advanced Forensic Format – offen, erweiterbar, mit Metadaten.

**Installation:** `apt install afflib-tools`

---

# 7. Hashing und Integritätsprüfung

## 7.1 Hash des Originals (SHA-256 – primär)

**Beschreibung:**

Berechnet einen SHA-256-Hash des Originaldatenträgers und schreibt ihn in eine Datei.

**Befehl:**

```bash
sha256sum /dev/sda > /cases/case01/hashes/original.sha256
```

## 7.2 Hash des Originals (MD5 – optional)

**Beschreibung:**

MD5 kann zusätzlich berechnet werden, sollte aber nicht als primärer Integritätsnachweis dienen (Kollisionsrisiko).

**Befehl:**

```bash
md5sum /dev/sda > /cases/case01/hashes/original.md5
```

## 7.3 Hash des Images (SHA-256)

**Befehl:**

```bash
sha256sum /cases/case01/images/disk01.img > /cases/case01/hashes/image.sha256
```

## 7.4 Hash des Images (MD5 – optional)

**Befehl:**

```bash
md5sum /cases/case01/images/disk01.img > /cases/case01/hashes/image.md5
```

## 7.5 Direkter Vergleich (SHA-256)

**Beschreibung:**

Berechnet SHA-256-Hashes für Original und Image in einem Lauf.

**Befehl:**

```bash
sha256sum /dev/sda /cases/case01/images/disk01.img
```

## 7.6 Hash-Verifikation

**Beschreibung:**

Verifiziert einen Hash gegen eine gespeicherte Hash-Datei.

**Befehl:**

```bash
sha256sum -c /cases/case01/hashes/image.sha256
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `-c` | Check-Modus: liest Hash aus Datei und verifiziert |
| `--status` | Nur Ergebnis anzeigen (OK/FAILED) |

---

# 8. Mounten und Arbeiten am Image (read-only)

## 8.1 Physische Partition read-only mounten

**Beschreibung:**

Mountet eine Partition read-only, um Schreibzugriffe auf Beweisdatenträger zu vermeiden.

**Befehl:**

```bash
mount -o ro /dev/sdb1 /cases/case01/mounts/usb01
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `mount` | Bindet ein Dateisystem in den Verzeichnisbaum ein |
| `-o` | Übergibt Mount-Optionen |
| `ro` | Read-only (keine Schreibzugriffe) |
| `/dev/sdb1` | Input (Partition/Blockdevice) |
| `/cases/case01/mounts/usb01` | Mountpoint (Zielverzeichnis) |

## 8.2 Unmounten

**Befehl:**

```bash
umount /cases/case01/mounts/usb01
```

## 8.3 Image-Partition per Loop und Offset mounten (read-only)

**Beschreibung:**

Mountet eine Partition innerhalb einer Image-Datei read-only per Loop-Device; Offset wird in Bytes angegeben.

**Befehl:**

```bash
mount -o ro,loop,offset=1048576 /cases/case01/images/disk01.img /cases/case01/mounts/image01
```

**Hinweis:**

Beispielrechnung: Startsektor `2048` × `512` Byte = `1048576` Byte.

## 8.4 E01-Image mounten

**Beschreibung:**

Mountet ein E01-Image über das ewf-Loopback-Device.

**Befehl:**

```bash
ewfmount /cases/case01/images/disk01.E01 /cases/case01/mounts/ewf
mount -o ro,loop /cases/case01/mounts/ewf/ewf1 /cases/case01/mounts/image01
```

## 8.5 Loop-Devices prüfen

**Befehl:**

```bash
losetup -a
```

## 8.6 Loop-Device entfernen

**Befehl:**

```bash
losetup -d /dev/loopX
```

---

# 9. Hex- und Binäranalyse

## 9.1 Erste 512 Bytes dumpen

**Beschreibung:**

Erstellt einen Hexdump der ersten 512 Bytes (z. B. MBR/Bootsektor).

**Befehl:**

```bash
xxd -l 512 /cases/case01/images/disk01.img > /cases/case01/notes/disk01_first512.hex
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `xxd` | Hexdump-Tool |
| `-l` | Anzahl Bytes, die gelesen werden |
| `-c` | Bytes pro Zeile (z. B. `16`) |

## 9.2 Erste 4 KiB dumpen (16 Bytes pro Zeile)

**Befehl:**

```bash
xxd -l 4096 -c 16 /cases/case01/images/disk01.img > /cases/case01/notes/disk01_first4k.hex
```

---

# 10. Datei- und Artefaktvergleich

## 10.1 Textbasierter Vergleich (Unified Diff)

**Befehl:**

```bash
diff -u file1.txt file2.txt
```

## 10.2 Visueller Vergleich in Vim (Diff-Modus)

**Befehl:**

```bash
vim -d file1.hex file2.hex
```

## 10.3 Binärer Vergleich

**Befehl:**

```bash
cmp -l file1.bin file2.bin
```

---

# 11. Strings, Pipes und Filter

## 11.1 Strings extrahieren und filtern

**Befehl:**

```bash
strings /cases/case01/images/disk01.img | grep -i "password\|pdf"
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `strings` | Extrahiert druckbare Zeichenketten aus Binärdaten |
| `-n` | Mindestlänge für Strings (Standard: 4) |
| `-t` | Offset anzeigen (`d`=dezimal, `x`=hex) |
| `grep -i` | Case-insensitive Filterung |

## 11.2 Nur Teilbereich scannen (Laufzeit reduzieren)

**Befehl:**

```bash
dd if=/cases/case01/images/disk01.img bs=1M count=10 2>/dev/null | strings | grep -i pdf
```

---

# 12. Dateisysteme und Datenträger-Vorbereitung

## 12.1 Häufige Dateisysteme im Forensik-Alltag (Übersicht)

| Dateisystem | Typische Plattform | Vorteile | Nachteile/Risiken | Forensische Hinweise |
|---|---|---|---|---|
| NTFS | Windows | ACL/Permissions, ADS, Journaling | ADS kann Artefakte „verstecken“ | MFT/USN-Journal, $LogFile und ADS berücksichtigen |
| exFAT | Wechselmedien | große Dateien, hohe Kompatibilität | weniger Metadaten | Timestamp-Verhalten prüfen |
| FAT32 | Wechselmedien/Legacy | maximale Kompatibilität | 4-GB-Dateigrößenlimit | wenig Journaling-Artefakte |
| ext4 | Linux | Journaling, stabile Performance | Linux-spezifische Strukturen | Journal/Superblock/Extent-Struktur relevant |
| XFS | Linux/NAS | skalierbar, performant | Recovery teils anspruchsvoller | Metadaten-lastig; Tooling prüfen |
| Btrfs | Linux | Snapshots, Checksums | sehr komplex | Snapshots/Subvolumes berücksichtigen |
| APFS | macOS | Snapshots, Verschlüsselung | macOS-spezifisch | Container/Volumes; Encryption prüfen |
| HFS+ | ältere macOS | Legacy | veraltet | Journal/Metadaten beachten |

## 12.2 Partitionstabelle anlegen (GPT)

**Befehl:**

```bash
parted /dev/sda --script mklabel gpt
```

**Achtung:** Destruktiv. Nur auf eindeutig verifiziertem Zielgerät ausführen.

## 12.3 Partition erstellen

**Befehl:**

```bash
parted /dev/sda --script mkpart primary ext4 1MiB 10%
parted /dev/sda --script mkpart primary ext4 10% 100%
```

## 12.4 Dateisystem erstellen

**Befehle:**

```bash
mkfs.ext4 -L DATA /dev/sda1
mkfs.ntfs -f -L DATA /dev/sda2
mkfs.vfat -F 32 -n USB /dev/sda3
mkfs.exfat -n USB /dev/sda4
```

---

# 13. Datenträger sicher löschen (HDD, SATA-SSD, NVMe)

**Achtung:** Alle Befehle in diesem Kapitel sind irreversibel und zerstören Daten.

## 13.1 HDD vollständig überschreiben (Nullen)

**Befehl:**

```bash
dd if=/dev/zero of=/dev/sda bs=16M status=progress conv=sync,noerror
sync
```

## 13.2 Nur Header/Anfangsbereich zerstören (schnell)

**Befehl:**

```bash
dd if=/dev/zero of=/dev/sda bs=512 count=2048
sync
```

## 13.3 SATA-SSD: Secure-Erase-Support prüfen

**Befehl:**

```bash
hdparm -I /dev/sda | sed -n '/Security/,/Transport/p'
```

## 13.4 SATA-SSD: Secure Erase ausführen

**Befehle:**

```bash
hdparm --user-master u --security-set-pass SecureErase /dev/sda
hdparm --user-master u --security-erase SecureErase /dev/sda
```

## 13.5 NVMe: Secure Erase

**Befehle:**

```bash
nvme list
nvme format /dev/nvme0n1 --ses=1
```

---

# 14. Write-Blocker und Hardware

## 14.1 Warum Write-Blocker?

**Beschreibung:**

Hardware-Write-Blocker verhindern physisch jeden Schreibzugriff auf das Originalmedium. Dies ist für gerichtsfeste Beweissicherung essenziell.

## 14.2 Gängige Write-Blocker

| Hersteller | Modell | Schnittstellen |
|------------|--------|----------------|
| Tableau | T35689iu | SATA, IDE, USB, SAS |
| Wiebetech | USB WriteBlocker | USB |
| Digital Intelligence | UltraBlock | SATA, IDE, USB |

## 14.3 Software-Alternative (nicht gerichtsfest)

Wenn kein Hardware-Write-Blocker verfügbar:

```bash
blockdev --setro /dev/sda
```

**Warnung:** Software-Blocker können umgangen werden und sind kein Ersatz für Hardware-Write-Blocker in forensischen Untersuchungen.

---

# 15. Protokollierung und Chain of Custody

## 15.1 Sitzung protokollieren mit script

**Befehl:**

```bash
script -f /cases/case01/notes/session_$(date +%Y%m%d_%H%M%S).log
```

**Wichtige Parameter / Optionen:**

| Element | Erklärung |
|---|---|
| `script` | Protokolliert Terminal-Sitzung |
| `-f` | Flush: schreibt sofort in Datei |
| `-a` | Append: an bestehende Datei anhängen |

**Beenden:** `exit` oder `Ctrl+D`

## 15.2 Bash-History sichern

**Befehl:**

```bash
history > /cases/case01/notes/history_$(date +%Y%m%d_%H%M%S).txt
```

## 15.3 Systeminformationen dokumentieren

**Befehl:**

```bash
date > /cases/case01/notes/system_info.txt
uname -a >> /cases/case01/notes/system_info.txt
lsb_release -a >> /cases/case01/notes/system_info.txt
```

## 15.4 Chain of Custody Template

**Vorlage für jeden Beweisgegenstand:**

```
CHAIN OF CUSTODY - BEWEISKETTE
================================
Case-ID:              case01
Beweisgegenstand:     USB-Stick 32GB, SanDisk Cruzer
Seriennummer:         [falls vorhanden]
Modell:               [aus lsblk]
Device-Pfad:          /dev/sdb

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
Methode:              [dd/dc3dd/E01]
Hash Original:        [SHA-256]
Hash Image:           [SHA-256]
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
- SHA-256 als primärer Hash; MD5 optional
- Hash vom Original und vom Image vergleichen und dokumentieren
- Read-only Mounts verwenden
- Hardware-Write-Blocker nutzen wenn verfügbar
- `bs` bewusst wählen und dokumentieren
- Vollständige Protokollierung aller Befehle

## 16.2 Typische Fehler

| Fehler | Konsequenz | Lösung |
|--------|------------|--------|
| Falsches Device (`/dev/sda` vs `/dev/sdb`) | Datenverauf am falschen Gerät | Immer mit `lsblk` verifizieren |
| Mountpoints übersehen | Modifikation des Originals | Vor Imaging unmounten |
| Unvollständige Dokumentation | Nicht gerichtsfest | `script`-Befehl nutzen |
| Kein Hash-Vergleich | Kein Integritätsnachweis | Immer Hash Original vs Image |
| Software- statt Hardware-Write-Blocker | Potenziell angreifbar | Hardware-Blocker bevorzugen |

---

# 17. Case-Studie: Kompletter Forensik-Workflow

## 17.1 Szenario

**Auftrag:** Forensische Untersuchung eines USB-Sticks (32GB, SanDisk), der einem Mitarbeiter einer Firma gehört. Verdacht auf Datenexfiltration.

**Ziel:** Forensisch sauberes Image erstellen, analysieren und dokumentieren.

**System:** Kali Linux 2024.x

---

## 17.2 Schritt 1: Vorbereitung

### Case-Ordnerstruktur anlegen

```bash
mkdir -p /cases/exfil01/{images,mounts,hashes,notes,reports}
cd /cases/exfil01
```

### Protokollierung starten

```bash
script -f /cases/exfil01/notes/session_$(date +%Y%m%d_%H%M%S).log
```

### Systeminfo dokumentieren

```bash
echo "=== SYSTEM INFORMATION ===" > /cases/exfil01/notes/system_info.txt
date >> /cases/exfil01/notes/system_info.txt
uname -a >> /cases/exfil01/notes/system_info.txt
cat /etc/os-release >> /cases/exfil01/notes/system_info.txt
```

---

## 17.3 Schritt 2: Datenträger identifizieren

### Vor Anschließen des USB-Sticks

```bash
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL > /cases/exfil01/notes/lsblk_before.txt
```

### USB-Stick anschließen und identifizieren

```bash
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL
```

**Beispielausgabe:**

```
NAME   SIZE TYPE MOUNTPOINT MODEL
sda    500G disk            Samsung_SSD_860
├─sda1 512M part /boot
└─sda2 499G part /
sdb     32G disk            SanDisk_Cruzer
└─sdb1  32G part /media/user/USB
```

### Device verifizieren

```bash
fdisk -l /dev/sdb > /cases/exfil01/notes/fdisk_sdb.txt
parted /dev/sdb print > /cases/exfil01/notes/parted_sdb.txt
```

**Chain of Custody - Übernahme:**

```
Beweisgegenstand:     USB-Stick 32GB, SanDisk Cruzer
Device-Pfad:          /dev/sdb
Seriennummer:         4C5300001234567890 (aus dmesg | grep -i serial)
Übernommen am:        2024-03-15 09:30:00
Zustand:              intakt, nicht versiegelt
```

---

## 17.4 Schritt 3: Automount verhindern / unmounten

### Prüfen ob gemountet

```bash
findmnt /dev/sdb1
```

### Unmounten falls gemountet

```bash
umount /dev/sdb1
```

### Verifizieren

```bash
lsblk -o NAME,MOUNTPOINT /dev/sdb
```

---

## 17.5 Schritt 4: Initialen Hash des Originals erzeugen

### SHA-256 (primär)

```bash
echo "=== HASH ORIGINAL - START ===" | tee -a /cases/exfil01/notes/hashing.txt
date | tee -a /cases/exfil01/notes/hashing.txt
sha256sum /dev/sdb | tee /cases/exfil01/hashes/original.sha256
date | tee -a /cases/exfil01/notes/hashing.txt
echo "=== HASH ORIGINAL - ENDE ===" | tee -a /cases/exfil01/notes/hashing.txt
```

**Beispielausgabe:**

```
a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456  /dev/sdb
```

### MD5 (optional, zusätzlich)

```bash
md5sum /dev/sdb | tee /cases/exfil01/hashes/original.md5
```

---

## 17.6 Schritt 5: Forensisches Image erstellen

### Mit dc3dd (empfohlen - integriertes Hashing)

```bash
echo "=== IMAGING - START ===" | tee -a /cases/exfil01/notes/imaging.txt
date | tee -a /cases/exfil01/notes/imaging.txt
dc3dd if=/dev/sdb \
      of=/cases/exfil01/images/usb_sandisk_32gb.img \
      hash=sha256 \
      log=/cases/exfil01/images/dc3dd.log \
      hofs=/cases/exfil01/hashes/dc3dd_image.sha256 \
      bs=16M \
      conv=noerror,sync
date | tee -a /cases/exfil01/notes/imaging.txt
echo "=== IMAGING - ENDE ===" | tee -a /cases/exfil01/notes/imaging.txt
```

### Alternative: Mit dd

```bash
dd if=/dev/sdb \
   of=/cases/exfil01/images/usb_sandisk_32gb.img \
   bs=16M \
   conv=noerror,sync \
   status=progress
```

---

## 17.7 Schritt 6: Hash des Images erzeugen

```bash
echo "=== HASH IMAGE - START ===" | tee -a /cases/exfil01/notes/hashing.txt
date | tee -a /cases/exfil01/notes/hashing.txt
sha256sum /cases/exfil01/images/usb_sandisk_32gb.img | tee /cases/exfil01/hashes/image.sha256
date | tee -a /cases/exfil01/notes/hashing.txt
echo "=== HASH IMAGE - ENDE ===" | tee -a /cases/exfil01/notes/hashing.txt
```

---

## 17.8 Schritt 7: Hashvergleich und Verifikation

### Direkter Vergleich

```bash
echo "=== HASH VERGLEICH ===" | tee /cases/exfil01/notes/verification.txt
echo "Original:" | tee -a /cases/exfil01/notes/verification.txt
cat /cases/exfil01/hashes/original.sha256 | tee -a /cases/exfil01/notes/verification.txt
echo "Image:" | tee -a /cases/exfil01/notes/verification.txt
cat /cases/exfil01/hashes/image.sha256 | tee -a /cases/exfil01/notes/verification.txt
```

### Verifikation mit -c

```bash
cd /cases/exfil01/images
sha256sum -c /cases/exfil01/hashes/image.sha256 | tee -a /cases/exfil01/notes/verification.txt
```

**Erwartete Ausgabe:**

```
usb_sandisk_32gb.img: OK
```

### Dokumentation

```
VERIFIKATIONSERGEBNIS
=====================
Original SHA-256: a1b2c3d4e5f6...abcdef123456
Image SHA-256:    a1b2c3d4e5f6...abcdef123456
Ergebnis:         MATCH - Image ist identisch mit Original
Verifiziert am:   2024-03-15 10:15:00
```

---

## 17.9 Schritt 8: Image zur Analyse mounten

### Offset berechnen

```bash
fdisk -l /cases/exfil01/images/usb_sandisk_32gb.img
```

**Beispielausgabe:**

```
Device     Start End Sectors Size Type
/img1      2048  ...  ...     32G Microsoft basic data
```

**Offset-Berechnung:** 2048 × 512 = 1048576 Bytes

### Mounten (read-only)

```bash
mount -o ro,loop,offset=1048576 \
      /cases/exfil01/images/usb_sandisk_32gb.img \
      /cases/exfil01/mounts/usb01
```

### Verifizieren

```bash
mount | grep usb01
ls -la /cases/exfil01/mounts/usb01
```

---

## 17.10 Schritt 9: Erste Analyse

### Dateiliste erstellen

```bash
find /cases/exfil01/mounts/usb01 -type f -ls > /cases/exfil01/notes/filelist_full.txt
```

### Nach bestimmten Dateitypen suchen

```bash
find /cases/exfil01/mounts/usb01 -type f \( -name "*.pdf" -o -name "*.doc*" -o -name "*.xls*" -o -name "*.zip" \) > /cases/exfil01/notes/suspicious_files.txt
```

### Timeline erstellen (mit Sleuth Kit)

```bash
mmls /cases/exfil01/images/usb_sandisk_32gb.img > /cases/exfil01/notes/mmls.txt
fls -r /cases/exfil01/images/usb_sandisk_32gb.img > /cases/exfil01/notes/fls_recursive.txt
```

### Strings nach relevanten Begriffen durchsuchen

```bash
strings /cases/exfil01/images/usb_sandisk_32gb.img | grep -iE "password|confidential|geheim|intern|kunde" > /cases/exfil01/notes/strings_sensitive.txt
```

---

## 17.11 Schritt 10: Hex-Dump des MBR sichern

```bash
xxd -l 512 /cases/exfil01/images/usb_sandisk_32gb.img > /cases/exfil01/notes/mbr.hex
```

---

## 17.12 Schritt 11: Cleanup und Abschluss

### Unmounten

```bash
umount /cases/exfil01/mounts/usb01
```

### Protokollierung beenden

```bash
exit  # beendet script-Aufzeichnung
```

### History sichern

```bash
history > /cases/exfil01/notes/bash_history.txt
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
Methode:              dc3dd
Blocksize:            16M

HASHES
------
Original SHA-256:     a1b2c3d4e5f67890...abcdef123456
Image SHA-256:        a1b2c3d4e5f67890...abcdef123456
Vergleich:            MATCH

DATEIEN
-------
Image:               /cases/exfil01/images/usb_sandisk_32gb.img
Image-Größe:         32,014,958,592 Bytes
Hash-Dateien:        /cases/exfil01/hashes/
Protokolle:          /cases/exfil01/notes/

AUFBEWAHRUNG
------------
Original:            Versiegelt in Beweiskammer, Schrank 3
Image:               /cases/exfil01/images/ auf Forensik-Server
Backup-Image:        [falls erstellt]

Unterschrift:        ___________________
Datum:               2024-03-15
```

---

## 17.14 Zusammenfassung der Case-Studie

| Schritt | Befehl/Aktion | Ergebnis |
|---------|---------------|----------|
| 1 | `mkdir`, `script` | Case-Struktur, Protokollierung aktiv |
| 2 | `lsblk`, `fdisk`, `parted` | Device als `/dev/sdb` identifiziert |
| 3 | `umount` | Keine Mountpoints auf Original |
| 4 | `sha256sum /dev/sdb` | Original-Hash dokumentiert |
| 5 | `dc3dd` | Image erstellt mit integriertem Hash |
| 6 | `sha256sum image` | Image-Hash dokumentiert |
| 7 | `sha256sum -c` | Hashes stimmen überein |
| 8 | `mount -o ro,loop,offset=` | Image read-only gemountet |
| 9 | `find`, `fls`, `strings` | Erste Analyse durchgeführt |
| 10 | `xxd` | MBR gesichert |
| 11 | `umount`, `exit` | Cleanup durchgeführt |
| 12 | Dokumentation | Chain of Custody vollständig |

---

# 18. Kompaktes Befehls-Cheatsheet (1 Seite)

## Identifikation

```bash
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL
fdisk -l /dev/sda
parted /dev/sda print
```

## Imaging

```bash
# Standard dd
dd if=/dev/sda of=disk.img bs=16M conv=noerror,sync status=progress

# dc3dd mit integriertem Hash
dc3dd if=/dev/sda of=disk.img hash=sha256 log=imaging.log

# E01-Format
ewfacquire /dev/sda -c case01 -e "Examiner" -d sha256 -t disk01
```

## Hashing

```bash
sha256sum /dev/sda > original.sha256
sha256sum disk.img > image.sha256
sha256sum -c image.sha256  # Verifikation
```

## Mount / Unmount

```bash
mount -o ro /dev/sdb1 /mnt/usb
mount -o ro,loop,offset=1048576 disk.img /mnt/image
umount /mnt/usb
```

## Analyse

```bash
xxd -l 512 disk.img > mbr.hex
strings disk.img | grep -i "password"
fls -r disk.img > filelist.txt
```

## Wipe

```bash
# HDD
dd if=/dev/zero of=/dev/sda bs=16M conv=sync,noerror
# SSD
hdparm --user-master u --security-erase p /dev/sda
# NVMe
nvme format /dev/nvme0n1 --ses=1
```

## Protokollierung

```bash
script -f session.log
history > history.txt
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
| **BSI-Leitfaden** | Bundesamt für Sicherheit in der Informationstechnik - IT-Forensik | https://www.bsi.bund.de/ |

## 19.2 Österreichische Rechtsgrundlagen

| Gesetz/Verordnung | Relevanz |
|-------------------|----------|
| **StPO § 134** | Beschlagnahme von Beweismitteln |
| **StPO § 177** | Durchsuchung |
| **DSGVO** | Datenschutz bei Verarbeitung personenbezogener Daten |
| **DSG** | Datenschutzgesetz Österreich |

**Wichtig:** In Österreich müssen forensische Untersuchungen dokumentiert sein, damit die Ergebnisse vor Gericht verwertbar sind. Die Beweiskette (Chain of Custody) muss lückenlos nachvollziehbar sein.

## 19.3 Tool-Dokumentationen

| Tool | Dokumentation |
|------|---------------|
| **dd** | `man dd` |
| **dc3dd** | https://sourceforge.net/projects/dc3dd/ |
| **dcfldd** | https://github.com/adulau/dcfldd |
| **ewf-tools / libewf** | https://github.com/libyal/libewf |
| **The Sleuth Kit** | https://www.sleuthkit.org/sleuthkit/ |
| **guymager** | https://guymager.sourceforge.io/ |
| **hdparm** | `man hdparm` |
| **nvme-cli** | https://github.com/linux-nvme/nvme-cli |
| **xxd** | `man xxd` |

## 19.4 Weiterführende Ressourcen

| Ressource | Beschreibung | Link |
|-----------|--------------|------|
| SANS Digital Forensics | Blog, Poster, Cheatsheets | https://www.sans.org/blog/digital-forensics/ |
| Forensic Focus | Forum und Artikel | https://www.forensicfocus.com/ |
| Volatility Foundation | Memory Forensics | https://github.com/volatilityfoundation/volatility |
| Autopsy | Open Source Digital Forensics | https://www.autopsy.com/ |

---

# 20. Tool-Installation

## 20.1 Debian/Ubuntu/Kali

```bash
# System aktualisieren
sudo apt update && sudo apt upgrade -y

# Core-Tools (meist schon installiert)
sudo apt install -y coreutils util-linux parted fdisk

# Hash-Tools
sudo apt install -y coreutils

# Imaging-Tools
sudo apt install -y dc3dd
sudo apt install -y dcfldd
sudo apt install -y ewf-tools
sudo apt install -y guymager

# Analyse-Tools
sudo apt install -y sleuthkit
sudo apt install -y xxd  # oder vim-common
sudo apt install -y binutils  # für strings

# SSD/NVMe-Tools
sudo apt install -y hdparm
sudo apt install -y nvme-cli

# Nützliche Zusatztools
sudo apt install -y pv
sudo apt install -y autopsy
```

## 20.2 Installation prüfen

```bash
which dd dc3dd dcfldd ewfacquire fls xxd strings hdparm nvme
```

## 20.3 Versionen dokumentieren

```bash
echo "=== TOOL VERSIONS ===" > /cases/case01/notes/versions.txt
dc3dd --version >> /cases/case01/notes/versions.txt 2>&1
ewfacquire --version >> /cases/case01/notes/versions.txt 2>&1
fls -V >> /cases/case01/notes/versions.txt 2>&1
nvme version >> /cases/case01/notes/versions.txt 2>&1
```

---

# 21. Übungen

Die folgenden Übungen bauen auf den Inhalten dieses Dokuments auf. Sie können mit einem USB-Stick, einer leeren Festplatte oder einer Test-VM durchgeführt werden.

**Wichtig:** Verwenden Sie niemals produktive Datenträger für Übungen. Nutzen Sie Testgeräte oder virtuelle Maschinen.

---

## Übung 1: Datenträger identifizieren

**Lernziel:** Geräte richtig erkennen und verifizieren.

1. Schließen Sie einen USB-Stick an Ihr Linux-System an.
2. Führen Sie `lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL` aus.
3. Notieren Sie den Device-Namen des USB-Sticks.
4. Führen Sie `fdisk -l` für das gefundene Device aus.
5. Dokumentieren Sie: Sektorgröße (logical/physical), Startsektoren der Partitionen, Gesamtkapazität.

**Kontrollfragen:**
- Wie lautet der Device-Pfad des USB-Sticks?
- Wie viele Partitionen hat der Datenträger?
- Was ist die logische Sektorgröße?

---

## Übung 2: Case-Ordnerstruktur und Protokollierung

**Lernziel:** Einen forensischen Arbeitsplatz vorbereiten.

1. Legen Sie eine Case-Ordnerstruktur an:
   ```bash
   mkdir -p /cases/uebung01/{images,mounts,hashes,notes}
   ```
2. Starten Sie die Protokollierung mit `script`.
3. Dokumentieren Sie Systeminformationen (`date`, `uname -a`, `cat /etc/os-release`).
4. Beenden Sie die Protokollierung mit `exit`.
5. Prüfen Sie die entstandene Log-Datei.

**Kontrollfragen:**
- Stehen alle Befehle mit Zeitstempeln in der Log-Datei?
- Wurde die Systeminformation korrekt erfasst?

---

## Übung 3: Hashing verstehen

**Lernziel:** Hashes berechnen, vergleichen und verifizieren.

1. Erstellen Sie eine Testdatei:
   ```bash
   echo "Forensik Testdatei fuer Hashing-Uebung" > /cases/uebung01/notes/testfile.txt
   ```
2. Berechnen Sie SHA-256 und MD5:
   ```bash
   sha256sum /cases/uebung01/notes/testfile.txt > /cases/uebung01/hashes/testfile.sha256
   md5sum /cases/uebung01/notes/testfile.txt > /cases/uebung01/hashes/testfile.md5
   ```
3. Verifizieren Sie mit `-c`:
   ```bash
   sha256sum -c /cases/uebung01/hashes/testfile.sha256
   ```
4. Ändern Sie die Datei (ein einzelnes Zeichen hinzufügen) und verifizieren Sie erneut.
5. Dokumentieren Sie das Ergebnis.

**Kontrollfragen:**
- Was zeigt die Verifikation vor und nach der Änderung?
- Wie unterscheiden sich die SHA-256-Hashes?

---

## Übung 4: Forensisches Image erstellen

**Lernziel:** Einen Datenträger mit dd imagen und verifizieren.

1. Verwenden Sie einen Test-USB-Stick (mit beliebigen Daten, aber nicht wichtig).
2. Identifizieren Sie das Device mit `lsblk`.
3. Stellen Sie sicher, dass keine Partition gemountet ist (`umount` falls nötig).
4. Erstellen Sie den SHA-256-Hash des Originals:
   ```bash
   sha256sum /dev/sdX > /cases/uebung01/hashes/original.sha256
   ```
5. Erstellen Sie das Image:
   ```bash
   dd if=/dev/sdX of=/cases/uebung01/images/usb_uebung.img bs=16M conv=noerror,sync status=progress
   ```
6. Erstellen Sie den Hash des Images:
   ```bash
   sha256sum /cases/uebung01/images/usb_uebung.img > /cases/uebung01/hashes/image.sha256
   ```
7. Vergleichen Sie beide Hashes.

**Kontrollfragen:**
- Stimmen die Hashes überein?
- Wie groß ist die Image-Datei im Vergleich zum Original-Datenträger?
- Warum ist `conv=noerror,sync` wichtig?

---

## Übung 5: dc3dd mit integriertem Hashing

**Lernziel:** dc3dd als Alternative zu dd kennenlernen.

1. Installieren Sie dc3dd falls nicht vorhanden: `sudo apt install dc3dd`
2. Erstellen Sie ein Image mit dc3dd:
   ```bash
   dc3dd if=/dev/sdX of=/cases/uebung01/images/usb_dc3dd.img hash=sha256 log=/cases/uebung01/images/dc3dd.log hofs=/cases/uebung01/hashes/dc3dd_image.sha256
   ```
3. Vergleichen Sie den dc3dd-Hash mit Ihrem manuell erstellten SHA-256-Hash.
4. Lesen Sie das dc3dd-Log und identifizieren Sie die dokumentierten Informationen.

**Kontrollfragen:**
- Welche Vorteile bietet dc3dd gegenüber dd?
- Welche Informationen stehen im dc3dd-Log?

---

## Übung 6: Image mounten und analysieren

**Lernziel:** Ein Image read-only mounten und erste Analysen durchführen.

1. Bestimmen Sie den Offset der ersten Partition im Image:
   ```bash
   fdisk -l /cases/uebung01/images/usb_uebung.img
   ```
2. Berechnen Sie den Byte-Offset (Startsektor × Sektorgröße).
3. Mounten Sie die Partition read-only:
   ```bash
   mount -o ro,loop,offset=BERECHNETER_OFFSET /cases/uebung01/images/usb_uebung.img /cases/uebung01/mounts/usb01
   ```
4. Listen Sie alle Dateien auf:
   ```bash
   find /cases/uebung01/mounts/usb01 -type f -ls
   ```
5. Suchen Sie nach PDF-Dateien:
   ```bash
   find /cases/uebung01/mounts/usb01 -name "*.pdf"
   ```
6. Unmounten Sie das Image.

**Kontrollfragen:**
- Warum ist die `ro`-Option zwingend erforderlich?
- Was passiert, wenn der Offset falsch berechnet wurde?

---

## Übung 7: Hex-Dump erstellen und interpretieren

**Lernziel:** Binärdaten lesen und verstehen.

1. Erstellen Sie einen Hex-Dump der ersten 512 Bytes:
   ```bash
   xxd -l 512 /cases/uebung01/images/usb_uebung.img > /cases/uebung01/notes/mbr.hex
   ```
2. Erstellen Sie einen Hex-Dump der ersten 4 KiB mit 16 Bytes pro Zeile:
   ```bash
   xxd -l 4096 -c 16 /cases/uebung01/images/usb_uebung.img > /cases/uebung01/notes/first4k.hex
   ```
3. Öffnen Sie die Datei und identifizieren Sie:
   - Die Offset-Spalte (links)
   - Die Hex-Werte (Mitte)
   - Die ASCII-Darstellung (rechts)
4. Suchen Sie nach bekannten Signaturen (z. B. `FA 33` am Anfang = x86-Bootcode, `55 AA` an Offset 510-511 = MBR-Signatur).

**Kontrollfragen:**
- Finden Sie die MBR-Signatur `55 AA` an Offset 510?
- Was bedeuten die Punkte in der rechten ASCII-Spalte?

---

## Übung 8: Strings extrahieren und filtern

**Lernziel:** Mit strings und grep relevante Informationen finden.

1. Extrahieren Sie alle Strings aus dem Image:
   ```bash
   strings /cases/uebung01/images/usb_uebung.img | head -100
   ```
2. Filtern Sie nach bestimmten Begriffen:
   ```bash
   strings /cases/uebung01/images/usb_uebung.img | grep -i "pdf\|doc\|password\|user"
   ```
3. Scannen Sie nur die ersten 10 MiB:
   ```bash
   dd if=/cases/uebung01/images/usb_uebung.img bs=1M count=10 2>/dev/null | strings | grep -i "pdf"
   ```
4. Nutzen Sie `-t d` um Offsets zu sehen:
   ```bash
   strings -t d /cases/uebung01/images/usb_uebung.img | grep -i "password" | head -20
   ```

**Kontrollfragen:**
- Was ist der Unterschied zwischen `-t d` und `-t x`?
- Warum ist es effizienter, nur einen Teilbereich zu scannen?

---

## Übung 9: Dateien vergleichen

**Lernziel:** Zwei Dateien oder Hex-Dumps vergleichen.

1. Erstellen Sie zwei Testdateien:
   ```bash
   echo "Version 1 der Datei" > /cases/uebung01/notes/datei_v1.txt
   echo "Version 2 der Datei" > /cases/uebung01/notes/datei_v2.txt
   ```
2. Vergleichen Sie mit `diff`:
   ```bash
   diff -u /cases/uebung01/notes/datei_v1.txt /cases/uebung01/notes/datei_v2.txt
   ```
3. Vergleichen Sie zwei Hex-Dumps binär:
   ```bash
   cmp -l /cases/uebung01/notes/datei_v1.txt /cases/uebung01/notes/datei_v2.txt
   ```

**Kontrollfragen:**
- Was zeigt `diff -u` im Vergleich zu `cmp -l`?
- Wann würden Sie welchen Vergleich nutzen?

---

## Übung 10: Kompletter Mini-Case

**Lernziel:** Den gesamten forensischen Workflow selbst durchführen.

**Szenario:** Ein USB-Stick mit Testdaten soll forensisch untersucht werden.

Führen Sie folgende Schritte eigenständig durch (ohne in das Dokument zu schauen):

1. Case-Ordnerstruktur anlegen
2. Protokollierung starten
3. Systeminformationen dokumentieren
4. USB-Stick identifizieren (`lsblk`, `fdisk`)
5. Automount verhindern / unmounten
6. SHA-256-Hash des Originals erstellen
7. Image mit `dd` oder `dc3dd` erstellen
8. SHA-256-Hash des Images erstellen
9. Hashes vergleichen und dokumentieren
10. Hash-Verifikation mit `-c` durchführen
11. Offset der ersten Partition berechnen
12. Image read-only mounten
13. Dateiliste erstellen
14. Nach PDF- und DOC-Dateien suchen
15. Strings nach sensitiven Begriffen filtern
16. Hex-Dump der ersten 512 Bytes sichern
17. Image unmounten
18. Protokollierung beenden
19. Bash-History sichern
20. Chain of Custody Dokument ausfüllen

**Kontrollfragen:**
- Haben Sie alle Schritte dokumentiert?
- Stimmen die Hashes überein?
- Können Sie jeden Befehl mit Zeitstempel nachvollziehen?
- Fehlt etwas in der Chain of Custody?

---

*Dokumentende - Version 2.0*
