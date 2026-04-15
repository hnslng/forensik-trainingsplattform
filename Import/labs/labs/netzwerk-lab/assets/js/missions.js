function MissionSystem() {
  this.terminal = null;
  this.currentScenario = null;
  this.currentStep = 0;
  this.originalExecute = null;
  this.hintTimers = [];
  this.scenarios = {
    's01-restaurant': {
      id: 's01-restaurant',
      title: 'Restaurant Luna',
      subtitle: 'Szenario 1: Der Anfang',
      difficulty: 'easy',
      icon: '\uD83C\uDF7D\uFE0F',
      description: 'Kommissar Brunner ruft dich an: Ein Restaurantbetreiber steht unter Verdacht der doppelten Buchfuehrung. Vor Ort findest du PCs, USB-Sticks und ein Kassensystem.',
      objective: 'Geraete identifizieren und den forensischen Workflow verstehen',
      steps: [
        {
          title: 'Vorbereitung',
          narrative: 'Kommissar Brunner: "Guten Morgen. Wir haben einen Fall fuer Sie - Restaurant Luna in der Bahnhofstrasse. Der Pruefer verdaechtigt doppelte Buchfuehrung. Bitte sichern Sie alle Datentraeger forensisch sauber."',
          instructions: 'Erstelle eine Case-Ordnerstruktur fuer den neuen Fall.',
          expectedCmd: 'mkdir',
          successMsg: 'Brunner: "Gut. Die Ordnerstruktur steht. Jetzt muessen wir dokumentieren, was wir vorfinden."',
          hints: ['Nutze mkdir -p /cases/case01/{images,mounts,hashes,notes,reports,logs}', 'Brace-Expansion mit {} erstellt mehrere Ordner gleichzeitig']
        },
        {
          title: 'Geraete identifizieren',
          narrative: 'Du betrittst das Restaurant. Am Tresen steht ein Kassen-PC, im Buero ein weiterer PC. Aus dem Handschuhfach sichert Brunner einen USB-Stick.',
          instructions: 'Uebersicht aller angeschlossenen Blockgeraete erstellen.',
          expectedCmd: 'lsblk',
          successMsg: 'Du siehst 3 Geraete: sda (System-SSD), sdb (SanDisk USB 32GB), nvme0n1. Der USB-Stick ist /dev/sdb.',
          hints: ['Nutze lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL', 'Achte auf den USB-Stick - er ist 32GB gross']
        },
        {
          title: 'Partitionstabelle auslesen',
          narrative: 'Brunner: "Dokumentieren Sie alle Details des USB-Sticks. Wir brauchen Serialnummer und Partitionslayout."',
          instructions: 'Zeige die Partitionstabelle des USB-Sticks an.',
          expectedCmd: 'fdisk',
          successMsg: 'Partitionstabelle dokumentiert: sdb1 startet bei Sektor 2048, FAT32, 32GB. Serial: 4C5300001234567890.',
          hints: ['Nutze fdisk -l /dev/sdb', 'Achte auf Start-Sektor und Sector size fuer spaetere Offset-Berechnung']
        },
        {
          title: 'Systeminformationen sichern',
          narrative: 'Bevor du mit dem Imaging beginnst, sicherst du die Systeminformationen fuer die Akte.',
          instructions: 'Dokumentiere Datum und Systeminformationen.',
          expectedCmd: 'date',
          successMsg: 'Systeminfo dokumentiert. Brunner: "Alles klar. Der USB-Stick muss jetzt forensisch gespiegelt werden - das machen wir im naechsten Szenario."',
          hints: ['Nutze date fuer Datum/Zeit', 'uname -a zeigt Systemdetails']
        }
      ]
    },
    's02-usbstick': {
      id: 's02-usbstick',
      title: 'Der zweite USB-Stick',
      subtitle: 'Szenario 2: Beweissicherung',
      difficulty: 'medium',
      icon: '\uD83D\uDD2C',
      description: 'Der USB-Stick aus dem Handschuhfach muss forensisch gespiegelt werden. Auch die Kassen-PCs muessen gesichert werden.',
      objective: 'Forensisches Imaging mit Hash-Erstellung und Verifikation',
      steps: [
        {
          title: 'Hash des Originals',
          narrative: 'Bevor du das Image erstellst, musst du den Hash des Originals berechnen - der Beweiswert haengt davon ab.',
          instructions: 'Berechne den SHA-256 Hash des USB-Sticks.',
          expectedCmd: 'sha256sum',
          successMsg: 'Original-Hash dokumentiert: a1b2c3d4...abcdef123456. Dieser Wert MUSS spaeter mit dem Image-Hash uebereinstimmen.',
          hints: ['Nutze sha256sum /dev/sdb', 'Leite die Ausgabe in eine Datei um: > /cases/case01/hashes/original.sha256']
        },
        {
          title: 'Write-Blocker aktivieren',
          narrative: 'Dr. Weber am Telefon: "Vergessen Sie nicht den Write-Blocker! Jeder Schreibzugriff auf das Original macht unsere Beweise wertlos."',
          instructions: 'Setze das Geraet auf read-only.',
          expectedCmd: 'blockdev',
          successMsg: 'Geraet /dev/sdb ist jetzt read-only. Keine Schreibzugriffe mehr moeglich.',
          hints: ['Nutze blockdev --setro /dev/sdb', 'Software-Blocker sind kein Ersatz fuer Hardware, aber besser als nichts']
        },
        {
          title: 'Forensisches Image erstellen',
          narrative: 'Brunner: "Jetzt sichern Sie den Stick. Nehmen Sie dc3dd - das macht Hashing automatisch."',
          instructions: 'Erstelle ein forensisches Image mit dc3dd.',
          expectedCmd: 'dc3dd',
          successMsg: 'Image erstellt: usb_sandisk_32gb.img. dc3dd hat den Hash automatisch berechnet und im Log gespeichert.',
          hints: ['dc3dd if=/dev/sdb of=/cases/case01/images/usb_sandisk_32gb.img hash=sha256 log=/cases/case01/images/dc3dd.log', 'dc3dd berechnet den Hash waehrend des Imaging']
        },
        {
          title: 'Image-Hash erstellen',
          narrative: 'Dr. Weber: "Unabhaengig vom dc3dd-Hash brauchen wir einen manuellen Vergleich. Zwei unabhaengige Verifikationen."',
          instructions: 'Berechne den SHA-256 Hash des erstellten Images.',
          expectedCmd: 'sha256sum',
          successMsg: 'Image-Hash: a1b2c3d4...abcdef123456. MATCH mit dem Original! Beweissicherung erfolgreich.',
          hints: ['Nutze sha256sum auf die Image-Datei', 'Vergleiche den Hash mit dem Original']
        },
        {
          title: 'Hash verifizieren',
          narrative: 'Brunner: "Protokollieren Sie den erfolgreichen Hash-Vergleich. Das braucht die Staatsanwaltschaft."',
          instructions: 'Fuehre die Hash-Verifikation mit -c durch.',
          expectedCmd: 'sha256sum',
          successMsg: 'Verifikation: OK. Der Beweis ist gesichert. Brunner: "Ausgezeichnet. Jetzt muessen wir das Image analysieren."',
          hints: ['sha256sum -c /cases/case01/hashes/image.sha256', 'Das -c Flag liest den Hash aus der Datei und verifiziert']
        }
      ]
    },
    's03-spuren': {
      id: 's03-spuren',
      title: 'Spuren im Netz',
      subtitle: 'Szenario 3: Analyse',
      difficulty: 'medium',
      icon: '\uD83D\uDD0D',
      description: 'Dr. Weber fordert lueckenlose Analyse. Auf dem USB-Stick findest du eine verschluesselte Datei und Verweise auf einen Cloud-Dienst.',
      objective: 'Image analysieren, Artefakte finden, versteckte Daten entdecken',
      steps: [
        {
          title: 'Image mounten',
          narrative: 'Dr. Weber: "Arbeiten Sie NIE am Original. Mounten Sie das Image read-only und analysieren Sie es."',
          instructions: 'Mounte das Image read-only mit Offset.',
          expectedCmd: 'mount',
          successMsg: 'Image gemountet unter /cases/case01/mounts/usb01. Dateisystem ist FAT32.',
          hints: ['mount -o ro,loop,offset=1048576 /cases/case01/images/usb_sandisk_32gb.img /cases/case01/mounts/usb01', 'Offset = Startsektor 2048 x 512 = 1048576']
        },
        {
          title: 'Dateiliste erstellen',
          narrative: 'Brunner: "Was ist auf dem Stick? Listen Sie alles auf - auch versteckte Dateien."',
          instructions: 'Erstelle eine vollstaendige Dateiliste.',
          expectedCmd: 'find',
          successMsg: 'Gefunden: Umsatz_intern.xlsx, Umsatz_Finanzamt.xlsx, confidential_report.pdf, passwords.txt, .geheim/Verzeichnis mit Schwarzkasse_Q4_2023.xlsx!',
          hints: ['find /cases/case01/mounts/usb01 -type f', 'Achte auf versteckte Dateien (Punkt-Dateien)']
        },
        {
          title: 'Hex-Dump des MBR',
          narrative: 'Du sicherst den Master Boot Record als Beweisstueck.',
          instructions: 'Erstelle einen Hex-Dump der ersten 512 Bytes.',
          expectedCmd: 'xxd',
          successMsg: 'MBR gesichert. Signatur 55AA an Offset 510 gefunden - gueltiger MBR!',
          hints: ['xxd -l 512 /cases/case01/images/usb_sandisk_32gb.img', 'Die MBR-Signatur 55AA muss an Offset 510-511 stehen']
        },
        {
          title: 'Strings extrahieren',
          narrative: 'Brunner: "Durchsuchen Sie den gesamten Stick nach Vertraulichkeits-Hinweisen, IBANs und dem Wort Schwarzkasse."',
          instructions: 'Extrahiere Strings und filtere nach sensiblen Begriffen.',
          expectedCmd: 'strings',
          successMsg: 'Treffer: "Schwarzkasse_Q4_2023", "IBAN: AT12 3456", "EUR 47.500,00", "confidential", "geheim". Das reicht fuer einen Durchsuchungsbeschluss!',
          hints: ['strings /cases/case01/images/usb_sandisk_32gb.img | grep -i "schwarz\|iban\|geheim\|confidential"', 'Strings extrahiert lesbaren Text aus Binaerdaten']
        },
        {
          title: 'Sleuth Kit Analyse',
          narrative: 'Dr. Weber: "Nutzen Sie das Sleuth Kit fuer eine tiefergehende Analyse. Auch geloeschte Dateien koennen Beweise enthalten."',
          instructions: 'Analysiere das Image mit fls und mmls.',
          expectedCmd: 'fls',
          successMsg: 'Sleuth Kit: Geloeschte Datei gefunden - briefing.docx! Ausserdem verstecktes Verzeichnis .geheim. Die Timeline wird immer deutlicher.',
          hints: ['fls -r /cases/case01/images/usb_sandisk_32gb.img', 'mmls zeigt das Partitionslayout an']
        }
      ]
    },
    's04-lagerhalle': {
      id: 's04-lagerhalle',
      title: 'Die Lagerhalle',
      subtitle: 'Szenario 4: Erweiterte Forensik',
      difficulty: 'hard',
      icon: '\uD83C\uDFE2',
      description: 'Durchsuchung einer Lagerhalle: Drei Laptops, NAS, zwei Handys. Verdacht auf gewerblichen Umsatzsteuerbetrug. Einer der Laptops wurde waehrend der Durchsuchung heruntergefahren.',
      objective: 'Verschiedene Dateisysteme, sicheres Loeschen pruefen, lueckenlose Dokumentation',
      steps: [
        {
          title: 'Dateisysteme erkennen',
          narrative: 'In der Lagerhalle findest du verschiedene Systeme: einen Windows-Laptop (NTFS), ein NAS (ext4/XFS) und einen Mac-Laptop (APFS).',
          instructions: 'Identifiziere die Dateisysteme der Geraete.',
          expectedCmd: 'lsblk',
          successMsg: 'Gefunden: NTFS (Windows-Laptop), ext4 (NAS), APFS (Mac). Verschiedene Dateisysteme erfordern verschiedene Analyse-Strategien.',
          hints: ['lsblk -f zeigt Filesystem-Typen an', 'NTFS hat ADS (Alternate Data Streams), ext4 hat Journal']
        },
        {
          title: 'SSD-Secure-Erase pruefen',
          narrative: 'Brunner: "Einer der Verdaechtigen hat den Laptop gerade noch heruntergefahren. Pruefen Sie, ob Daten geloescht wurden."',
          instructions: 'Pruefe den Secure-Erase-Status der SSD.',
          expectedCmd: 'hdparm',
          successMsg: 'hdparm zeigt: Security NOT enabled, NOT locked. Der Verdaechtige hat KEIN Secure Erase durchgefuehrt - Daten sind noch vorhanden!',
          hints: ['hdparm -I /dev/sda zeigt die Security-Sektion', 'Wenn "supported: enhanced erase" steht, ist die Funktion verfuegbar']
        },
        {
          title: 'Sitzung protokollieren',
          narrative: 'Dr. Weber: "Jeder Schritt muss lueckenlos dokumentiert sein. Starten Sie die Protokollierung JETZT."',
          instructions: 'Starte die Sitzungsprotokollierung mit script.',
          expectedCmd: 'script',
          successMsg: 'Protokollierung aktiv. Alle Befehle werden mit Zeitstempel aufgezeichnet.',
          hints: ['script -f /cases/case01/notes/session_$(date +%Y%m%d_%H%M%S).log', '-f flag schreibt sofort in die Datei (Flush)']
        },
        {
          title: 'Chain of Custody',
          narrative: 'Brunner: "Fuelle die Chain of Custody aus. Jeder Beweisgegenstand muss lueckenlos nachverfolgbar sein."',
          instructions: 'Lies die Chain of Custody Vorlage.',
          expectedCmd: 'cat',
          successMsg: 'Chain of Custody dokumentiert. Beweiskette ist lueckenlos: UEbernahme -> Imaging -> Analyse -> Aufbewahrung.',
          hints: ['cat /cases/case01/reports/chain_of_custody.txt', 'Jede Uebergabe muss mit Unterschrift dokumentiert werden']
        },
        {
          title: 'Logs analysieren',
          narrative: 'Auf dem NAS findest du Login-Logs. Jemand hat sich mehrfach mit falschen Passwoertern versucht.',
          instructions: 'Durchsuche auth.log nach fehlgeschlagenen Logins.',
          expectedCmd: 'grep',
          successMsg: '127 fehlgeschlagene Login-Versuche von 192.168.1.105! Brute-Force-Angriff erkannt. Timeline wird rekonstruiert.',
          hints: ['grep "Failed password" /cases/case01/logs/auth.log', 'Die IP-Adresse 192.168.1.105 taucht immer wieder auf']
        }
      ]
    },
    's05-abschluss': {
      id: 's05-abschluss',
      title: 'Der Abschlussbericht',
      subtitle: 'Szenario 5: Der volle Workflow',
      difficulty: 'expert',
      icon: '\uD83D\uDCDC',
      description: 'Die Staatsanwaltschaft fordert den vollstaendigen Bericht. Fuehre den gesamten forensischen Workflow eigenstaendig durch.',
      objective: 'Kompletten Workflow ohne Vorgaben durchfuehren',
      steps: [
        {
          title: 'Eigenstaendige Vorbereitung',
          narrative: 'Dr. Weber: "Diesmal gibt es keine Vorgaben. Sie kennen den Workflow - fuehren Sie ihn eigenstaendig durch."',
          instructions: 'Erstelle die Case-Struktur und starte die Protokollierung.',
          expectedCmd: 'mkdir',
          successMsg: 'Case-Struktur erstellt. Protokollierung laeuft. Weiter zum naechsten Schritt.',
          hints: ['mkdir -p /cases/case01/{images,mounts,hashes,notes,reports,logs}', 'script -f session.log startet die Protokollierung']
        },
        {
          title: 'Geraete identifizieren',
          narrative: 'Arbeite selbststaendig.',
          instructions: 'Identifiziere alle Geraete und dokumentiere sie.',
          expectedCmd: 'lsblk',
          successMsg: 'Alle Geraete identifiziert und dokumentiert.',
          hints: ['lsblk, fdisk -l, parted print']
        },
        {
          title: 'Beweissicherung',
          narrative: 'Arbeite selbststaendig.',
          instructions: 'Sichere den USB-Stick forensisch.',
          expectedCmd: 'dc3dd',
          successMsg: 'Image erstellt und verifiziert.',
          hints: ['sha256sum /dev/sdb, dc3dd if=/dev/sdb of=... hash=sha256']
        },
        {
          title: 'Hash-Verifikation',
          narrative: 'Arbeite selbststaendig.',
          instructions: 'Vergleiche Original- und Image-Hash.',
          expectedCmd: 'sha256sum',
          successMsg: 'Hashes stimmen ueberein. Beweissicherung abgeschlossen.',
          hints: ['sha256sum -c image.sha256']
        },
        {
          title: 'Analyse',
          narrative: 'Arbeite selbststaendig.',
          instructions: 'Mounte das Image und analysiere den Inhalt.',
          expectedCmd: 'mount',
          successMsg: 'Alle Artefakte gefunden und dokumentiert.',
          hints: ['mount -o ro,loop,offset=..., find, strings, grep, fls']
        },
        {
          title: 'Bericht erstellen',
          narrative: 'Dr. Weber: "Hervorragend. Ihre Dokumentation ist lueckenlos. Brunner, der Fall ist perfekt aufbereitet." Brunner: "Danke. Ohne Sie haetten wir das nicht geschafft." Der Fall "Restaurant Luna" wird der Staatsanwaltschaft uebergeben. Verfahren wird eingeleitet.',
          instructions: 'Schaue dir den Chain of Custody Bericht an.',
          expectedCmd: 'cat',
          successMsg: 'FALL ABGESCHLOSSEN! Du hast den gesamten forensischen Workflow erfolgreich durchgefuehrt. Dr. Weber befieferdert dich zum Senior IT-Forensiker!',
          hints: ['cat /cases/case01/reports/chain_of_custody.txt']
        }
      ]
    }
  };
}

MissionSystem.prototype.init = function (terminal) {
  this.terminal = terminal;
};

MissionSystem.prototype.renderMissionSelection = function (containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var html = '<h3 class="s-heading" style="margin-top:10px"><span class="icon">\uD83C\uDFAF</span> Missionen - Fahndungsstelle Cyber</h3>';
  for (var key in this.scenarios) {
    var s = this.scenarios[key];
    html += '<div class="mission-card" data-mission="' + key + '">';
    html += '<div style="font-size:28px;margin-bottom:8px">' + s.icon + '</div>';
    html += '<div class="mission-card-title">' + s.title + '</div>';
    html += '<div class="mission-card-desc">' + s.description + '</div>';
    html += '<span class="s-badge s-badge-' + s.difficulty + '">' + s.difficulty + '</span>';
    html += '</div>';
  }
  html += '<div id="task-container" style="display:none"></div>';
  container.innerHTML = html;
};

MissionSystem.prototype.startMission = function (key) {
  var scenario = this.scenarios[key];
  if (!scenario) return;
  this.currentScenario = key;
  this.currentStep = 0;
  if (this.originalExecute && this.terminal) {
    this.terminal.executeCommand = this.originalExecute;
    this.originalExecute = null;
  }
  this.renderStep();
};

MissionSystem.prototype.renderStep = function () {
  var scenario = this.scenarios[this.currentScenario];
  if (!scenario) return;
  var step = scenario.steps[this.currentStep];
  if (!step) return;
  var container = document.getElementById('task-container');
  if (!container) return;
  container.style.display = 'block';
  var html = '<div class="task-box">';
  html += '<div class="task-title">' + scenario.icon + ' ' + step.title + ' <span class="s-badge s-badge-' + scenario.difficulty + '">Schritt ' + (this.currentStep + 1) + '/' + scenario.steps.length + '</span></div>';
  if (step.narrative) {
    html += '<div class="s-story"><div class="s-story-text">' + step.narrative + '</div></div>';
  }
  html += '<div class="task-instruction">' + step.instructions + '</div>';
  html += '<div id="step-hints"></div>';
  html += '<div id="step-feedback" style="margin-top:12px"></div>';
  html += '</div>';
  container.innerHTML = html;
  this.startHintTimer(step.hints || []);
  this.interceptTerminal(step);
};

MissionSystem.prototype.startHintTimer = function (hints) {
  this.clearHintTimers();
  this.hintTimers = [];
  var self = this;
  for (var i = 0; i < hints.length; i++) {
    (function (idx, hint) {
      var timer = setTimeout(function () {
        var el = document.getElementById('step-hints');
        if (el) el.innerHTML += '<div class="hint-item">' + hint + '</div>';
      }, (idx + 1) * 10000);
      self.hintTimers.push(timer);
    })(i, hints[i]);
  }
};

MissionSystem.prototype.clearHintTimers = function () {
  for (var i = 0; i < this.hintTimers.length; i++) clearTimeout(this.hintTimers[i]);
  this.hintTimers = [];
};

MissionSystem.prototype.interceptTerminal = function (step) {
  if (!this.terminal) return;
  var self = this;
  var scenario = this.scenarios[this.currentScenario];
  if (this.originalExecute) this.terminal.executeCommand = this.originalExecute;
  this.originalExecute = this.terminal.executeCommand.bind(this.terminal);
  this.terminal.executeCommand = function (cmdLine) {
    self.originalExecute(cmdLine);
    var parts = cmdLine.split(/\s+/);
    var cmd = parts[0];
    if (cmd === step.expectedCmd || cmdLine.indexOf(step.expectedCmd) !== -1) {
      var feedback = document.getElementById('step-feedback');
      if (feedback) {
        feedback.innerHTML = '<div class="s-callout s-callout-success"><div class="s-callout-title">Erfolg</div><div class="s-callout-body">' + step.successMsg + '</div></div>';
      }
      self.clearHintTimers();
      if (typeof App !== 'undefined' && App.getAchievementSystem) {
        var ach = App.getAchievementSystem();
        if (ach) ach.unlock('quick_learner');
      }
      self.currentStep++;
      if (self.currentStep < scenario.steps.length) {
        setTimeout(function () { self.renderStep(); }, 2000);
      } else {
        if (self.originalExecute) {
          self.terminal.executeCommand = self.originalExecute;
          self.originalExecute = null;
        }
        var tc = document.getElementById('task-container');
        if (tc) tc.innerHTML = '<div class="s-callout s-callout-success"><div class="s-callout-title">\uD83C\uDFC6 Mission abgeschlossen!</div><div class="s-callout-body">Du hast alle Schritte von "' + scenario.title + '" erfolgreich abgeschlossen.</div></div>';
        if (typeof App !== 'undefined' && App.getAchievementSystem) {
          var ach2 = App.getAchievementSystem();
          if (ach2) {
            ach2.stats.scenariosCompleted++;
            ach2.save();
          }
        }
      }
    }
  };
};

var missionSystem = new MissionSystem();
