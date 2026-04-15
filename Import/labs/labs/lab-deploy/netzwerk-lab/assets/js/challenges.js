// ========== CHALLENGE DEFINITION ==========
const Challenges = {
  // Lab 1: USB-Forensik Case
  'lab1': {
    id: 'lab1',
    title: 'USB-Forensik Case',
    type: 'multiple-input',
    description: 'Finde alle sensiblen Daten und das versteckte Flag.',
    file: 'usb_case01.img',
    solution: {
      hash: '5f4dcc3b5aa765d61d8327deb882cf99',
      flag: 'FORENSIK{d4t4_3xf1ltr4t10n_d3t3ct3d}',
      hiddenFile: '/hidden/.secret.txt',
      commands: ['ls -laR', 'strings', 'grep']
    },
    hints: [
      'Nutze "ls -laR" um alle Dateien (auch versteckte) zu finden',
      'Mit "strings usb_case01.img | grep -iE "secret|kunde|confidential" kannst du nach sensiblen Daten suchen',
      'Die Bash-History enthält Befehle, die auf verdächtige Aktivitäten hindeuten'
    ],
    maxAttempts: 3
  },

  // Lab 2: Log-Analyse
  'lab2': {
    id: 'lab2',
    title: 'Log-Analyse',
    type: 'multiple-input',
    description: 'Analysiere die Logs, identifiziere den Angreifer und finde die Angriffszeit.',
    files: ['auth.log', 'syslog', 'apache_access.log'],
    solution: {
      attackerIP: '192.168.100.42',
      attackTime: '03:47:22',
      requests: ['/admin', '/etc/passwd']
    },
    hints: [
      'Nutze "grep "Failed password" auth.log" um fehlgeschlagene Logins zu finden',
      '"awk \'{print $(NF-3)}\'" extrahiert die IP-Adresse',
      'Suche nach "Accepted" nach dem Angriff'
    ],
    maxAttempts: 3
  },

  // Lab 3: Hash-Integrität
  'lab3': {
    id: 'lab3',
    title: 'Hash-Integrität',
    type: 'input',
    description: 'Vergleiche die Hashes und finde den genauen Unterschied.',
    files: ['original.txt', 'manipulated.txt'],
    solution: {
      hashDiff: 'EIN ZUSÄTZLICHES LEERZEICHEN',
      diffPosition: 'Zeile 5, Spalte 12'
    },
    hints: [
      '"sha256sum original.txt manipulated.txt" vergleicht beide Dateien',
      '"diff original.txt manipulated.txt" zeigt die genaue Position'
    ],
    maxAttempts: 3
  },

  // Lab 4: Hex-Analyse
  'lab4': {
    id: 'lab4',
    title: 'Hex-Analyse',
    type: 'input',
    description: 'Finde die MBR-Signatur und die manipulierte Nachricht.',
    file: 'mbr_sample.bin',
    solution: {
      mbrSignature: '55 AA',
      bootcode: 'FA 33',
      message: 'DE AD BE EF'
    },
    hints: [
      'Die MBR-Signatur ist an Offset 510-511',
      '"xxd mbr_sample.bin" zeigt den Hex-Dump',
      'Suche nach wiederkehrenden Mustern'
    ],
    maxAttempts: 3
  },

  // Lab 5: Memory/Strings
  'lab5': {
    id: 'lab5',
    title: 'Memory/Strings',
    type: 'multiple-input',
    description: 'Extrahiere relevante Daten aus einem Memory-Dump.',
    file: 'memory_dump_sample.raw',
    solution: {
      password1: 'Admin2024!',
      password2: 'f0r3ns1c_l4b',
      url: 'https://internal.corp.local/secret',
      email: 'suspicious@darknet-market.onion',
      flag: 'FORENSIK{str1ngs_15_y0ur_fr13nd}'
    },
    hints: [
      '"strings memory_dump_sample.raw | head -50" zeigt die ersten Strings',
      '"strings memory_dump_sample.raw | grep -i "pass" findet Passwörter',
      '"strings memory_dump_sample.raw | grep -E "https?://" findet URLs'
    ],
    maxAttempts: 3
  },

  // CTF 1: Verstecktes Flag
  'ctf1': {
    id: 'ctf1',
    title: 'Verstecktes Flag',
    type: 'input',
    description: 'Finde das versteckte Flag im Memory-Dump.',
    file: 'memory_dump_sample.raw',
    solution: 'FORENSIK{str1ngs_15_y0ur_fr13nd}',
    hints: [
      '"strings memory_dump_sample.raw | grep "FORENSIK" zeigt das Flag',
      'Nutze "head" um nicht zu viele Ergebnisse zu bekommen'
    ],
    maxAttempts: 5
  },

  // CTF 2: MBR-Signatur
  'ctf2': {
    id: 'ctf2',
    title: 'MBR-Signatur',
    type: 'input',
    description: 'Das Flag ist im manipulierten Bereich des MBR versteckt.',
    file: 'mbr_sample.bin',
    solution: 'FORENSIK{mbr_s1gn4tur3_v4l1d}',
    hints: [
      '"xxd mbr_sample.bin | grep -i "FOR" zeigt das Flag',
      'Suche im Hex-Dump nach "FORENSIK"'
    ],
    maxAttempts: 5
  },

  // CTF 3: Hash-Kollision
  'ctf3': {
    id: 'ctf3',
    title: 'Hash-Kollision',
    type: 'input',
    description: 'Finde den genauen Unterschied zwischen den Dateien.',
    files: ['original.txt', 'manipulated.txt'],
    solution: 'FORENSIK{h4sh_m17ch_d3t3ct3d}',
    hints: [
      '"diff original.txt manipulated.txt" zeigt den Unterschied',
      'Das Flag ist das geänderte Wort'
    ],
    maxAttempts: 5
  },

  // CTF 4: Log-Forensik
  'ctf4': {
    id: 'ctf4',
    title: 'Log-Forensik',
    type: 'input',
    description: 'Der Angreifer hat sich erfolgreich eingeloggt. Finde die Uhrzeit des ersten erfolgreichen Logins.',
    file: 'auth.log',
    solution: 'FORENSIK{03:47:22}',
    hints: [
      '"grep "Accepted" auth.log" zeigt erfolgreiche Logins',
      'Filtere nach der Angreifer-IP'
    ],
    maxAttempts: 5
  },

  // CTF 5: USB-Image Deep Dive
  'ctf5': {
    id: 'ctf5',
    title: 'USB-Image Deep Dive',
    type: 'input',
    description: 'Kombiniere strings, hexdump und mount um die versteckte Nachricht zu finden.',
    file: 'usb_case01.img',
    solution: 'FORENSIK{d4t4_3xf1ltr4t10n_d3t3ct3d}',
    hints: [
      '"strings usb_case01.img | grep "FORENSIK" zeigt das Flag',
      'Du kannst auch mount und dann ls -la nutzen'
    ],
    maxAttempts: 5
  },

  // Lab aus Kapitel 10
  'ch10-lab1': {
    id: 'ch10-lab1',
    title: 'Image-Format Wahl',
    type: 'multiple-choice',
    description: 'Wähle das passende Format für verschiedene Szenarien.',
    questions: [
      {
        question: 'Szenario 1: Maximale Kompatibilität benötigt',
        options: ['Raw', 'E01', 'AFF', 'VHD'],
        answer: 'Raw'
      },
      {
        question: 'Szenario 2: Großer Datenträger (500 GB), Speicherplatz limitiert',
        options: ['Raw', 'E01', 'AFF', 'VHD'],
        answer: 'E01 oder AFF mit Compression'
      },
      {
        question: 'Szenario 3: Analyse in VirtualBox VM',
        options: ['Raw', 'E01', 'AFF', 'VHD'],
        answer: 'VHD'
      },
      {
        question: 'Szenario 4: Gerichtliche Verwertbarkeit, integriertes Hashing erforderlich',
        options: ['Raw', 'E01', 'AFF', 'VHD'],
        answer: 'E01'
      }
    ],
    hints: [
      'Raw ist universell kompatibel',
      'E01/AFF bieten Kompression und Hashing',
      'VHD ist nativ von Virtualisierungstools unterstützt'
    ],
    maxAttempts: 2
  },

  // Lab aus Kapitel 11
  'ch11-lab1': {
    id: 'ch11-lab1',
    title: 'Datei-Manipulation nachweisen',
    type: 'multiple-choice',
    description: 'Wann nutzt du diff, wann cmp, wann Hashing?',
    questions: [
      {
        question: 'Wann nutzt du diff?',
        options: ['Binärdateien', 'Textdateien mit Kontext', 'Hash-Prüfung'],
        answer: 'Textdateien mit Kontext'
      },
      {
        question: 'Wann nutzt du cmp?',
        options: ['Textdateien mit Kontext', 'Binärdateien Byte-für-Byte', 'Hash-Vergleich'],
        answer: 'Binärdateien Byte-für-Byte'
      },
      {
        question: 'Wann nutzt du sha256sum?',
        options: ['Zeilenweise Textvergleich', 'Integritätsprüfung', 'Hex-Analyse'],
        answer: 'Integritätsprüfung'
      }
    ],
    hints: [
      'diff = Textdateien, Zeilenweise, Kontext-Anzeige',
      'cmp = Binärdateien, Byte-für-Byte, schnell',
      'sha256sum = Integrität, schnell, kein Kontext'
    ],
    maxAttempts: 2
  },

  // Lab aus Kapitel 12
  'ch12-lab1': {
    id: 'ch12-lab1',
    title: 'Chain of Custody erstellen',
    type: 'input',
    description: 'Wann ist die Chain of Custody lückenlos?',
    solution: 'Lückenlos wenn jeder Schritt mit Datum & Zeit, Untersteller, Device eindeutig, alle Hashes dokumentiert & verifiziert, alle Übergaben dokumentiert ist',
    hints: [
      'Dokumentiere Übernahme, Imaging, Analyse, Übergabe',
      'Hashes vor und nach dem Imaging',
      'Jeder Schritt mit Datum, Uhrzeit und Untersucher'
    ],
    maxAttempts: 3
  },

  // Lab aus Kapitel 13
  'ch13-lab1': {
    id: 'ch13-lab1',
    title: 'Write-Blocker verifizieren',
    type: 'multiple-choice',
    description: 'Verifiziere den RO-Status und verstehe die Auswirkungen.',
    questions: [
      {
        question: 'RO=1 bedeutet?',
        options: ['Read-Only (Write-Blocker aktiv)', 'Read-Write', 'Device ist defekt'],
        answer: 'Read-Only (Write-Blocker aktiv)'
      },
      {
        question: 'Welcher Write-Blocker ist zuverlässiger?',
        options: ['Hardware', 'Software'],
        answer: 'Hardware'
      },
      {
        question: 'Wann ist Software-Write-Blocker akzeptabel?',
        options: ['Produktiv-System', 'Entwicklungs-Systeme'],
        answer: 'Entwicklungs-Systeme'
      }
    ],
    hints: [
      'lsblk -o NAME,RO zeigt den RO-Status',
      'Hardware-Write-Blocker sind physisch, Software kann umgangen werden'
    ],
    maxAttempts: 2
  },

  // Lab aus Kapitel 14
  'ch14-lab1': {
    id: 'ch14-lab1',
    title: 'Löschen-Methode wählen',
    type: 'multiple-choice',
    description: 'Wähle die passende Lösch-Methode für verschiedene Szenarien.',
    questions: [
      {
        question: 'Szenario 1: HDD, Zeit kritisch (max 1 Stunde)',
        options: ['Null-Write (1x)', 'Random-Write', 'Gutmann', 'DoD 5220.22-M'],
        answer: 'Null-Write (1x) oder Random-Write (1x)'
      },
      {
        question: 'Szenario 2: SATA-SSD, maximale Sicherheit',
        options: ['shred', 'ATA Secure Erase', 'TRIM'],
        answer: 'Enhanced Secure Erase'
      },
      {
        question: 'Szenario 3: NVMe SSD, schnell und sicher',
        options: ['Crypto-Erase', 'Overwrite', 'Block-Erase', 'Format'],
        answer: 'Crypto-Erase'
      },
      {
        question: 'Szenario 4: HDD, forensische Standards (DoD 5220.22-M)',
        options: ['Null-Write', 'DoD 5220.22-M', 'ATA Secure Erase'],
        answer: 'DoD 5220.22-M (7 Passes)'
      }
    ],
    hints: [
      'Gutmann ist sehr sicher aber langsam',
      'Crypto-Erase ist die sicherste NVMe-Methode'
    ],
    maxAttempts: 2
  },

  // Lab aus Kapitel 15
  'ch15-lab1': {
    id: 'ch15-lab1',
    title: 'Best-Practices-Analyse',
    type: 'multiple-choice',
    description: 'Analysiere Szenarien und entscheide, ob Best Practices befolgt wurden.',
    questions: [
      {
        question: 'Szenario 1: Analyst hat ohne Write-Blocker gearbeitet. Problem?',
        options: ['JA - Massive Verletzung!', 'NEIN - Kein Problem', 'Vielleicht'],
        answer: 'JA - Massive Verletzung!'
      },
      {
        question: 'Szenario 2: Hashes wurden nach dem Imaging erstellt. Problem?',
        options: ['JA - Keine Integritätsprüfung!', 'NEIN - Kein Problem', 'Vielleicht'],
        answer: 'JA - Keine Integritätsprüfung!'
      },
      {
        question: 'Szenario 3: Original wurde versehentlich gemountet. Problem?',
        options: ['JA - Original-Veränderung!', 'NEIN - Kein Problem', 'Vielleicht'],
        answer: 'JA - Original-Veränderung!'
      },
      {
        question: 'Szenario 4: Protokollierung vergessen. Problem?',
        options: ['JA - Keine Beweiskette!', 'NEIN - Kein Problem', 'Vielleicht'],
        answer: 'JA - Keine Beweiskette!'
      },
      {
        question: 'Szenario 5: Forensisches Löschen mit rm. Problem?',
        options: ['JA - rm ist NICHT forensisch!', 'NEIN - Kein Problem', 'Vielleicht'],
        answer: 'JA - rm ist NICHT forensisch!'
      }
    ],
    hints: [
      'Write-Blocker verhindert Schreibzugriffe auf das Original',
      'Hashes IMMER vor dem Imaging erstellen'
    ],
    maxAttempts: 2
  },

  // Lab aus Kapitel 16
  'ch16-lab1': {
    id: 'ch16-lab1',
    title: 'Tool-Auswahl',
    type: 'multiple-choice',
    description: 'Wähle die passenden Tools für verschiedene Szenarien.',
    questions: [
      {
        question: 'Szenario 1: Filesystem-Scan des Image',
        options: ['fls (sleuthkit)', 'strings', 'xxd', 'wireshark'],
        answer: 'fls (sleuthkit)'
      },
      {
        question: 'Szenario 2: Embedded-Dateien aus Firmware extrahieren',
        options: ['binwalk', 'xxd', 'autopsy', 'wireshark'],
        answer: 'binwalk'
      },
      {
        question: 'Szenario 3: Strings aus Memory-Dump finden',
        options: ['binwalk', 'strings', 'autopsy', 'wireshark'],
        answer: 'strings'
      },
      {
        question: 'Szenario 4: MBR-Signatur verifizieren',
        options: ['strings', 'xxd (oder hexdump)', 'wireshark', 'fls'],
        answer: 'xxd (oder hexdump)'
      },
      {
        question: 'Szenario 5: PCAP analysieren',
        options: ['fls', 'strings', 'wireshark', 'binwalk'],
        answer: 'wireshark'
      }
    ],
    hints: [
      'fls = Filesystem-Listen',
      'binwalk = Embedded-Dateien finden',
      'strings = Klartext aus Binärdateien'
    ],
    maxAttempts: 2
  }
};

// ========== SOLUTION CHECKER ==========
function checkSolution(challengeId, userAnswer, subAnswer = null) {
  const challenge = Challenges[challengeId];
  
  if (!challenge) {
    return { success: false, message: 'Challenge nicht gefunden' };
  }
  
  if (challenge.type === 'input') {
    return checkInputSolution(challenge, userAnswer);
  }
  
  if (challenge.type === 'multiple-choice') {
    return checkMultipleChoiceSolution(challenge, userAnswer, subAnswer);
  }
  
  if (challenge.type === 'multiple-input') {
    return checkMultipleInputSolution(challenge, userAnswer, subAnswer);
  }
  
  return { success: false, message: 'Unbekannter Challenge-Typ' };
}

function checkInputSolution(challenge, userAnswer) {
  const solution = challenge.solution;
  
  // Normalisiere User-Answer
  const normalizedAnswer = userAnswer.trim().toLowerCase();
  const normalizedSolution = solution.toString().trim().toLowerCase();
  
  if (normalizedAnswer === normalizedSolution) {
    return { success: true, message: '✅ Korrekt!' };
  }
  
  // Teilweise Übereinstimmung (für Textantworten)
  if (solution.includes(' ') && normalizedAnswer.includes(normalizedSolution.split(' ')[0])) {
    return { success: false, message: '⚠️ Fast! Versuche nochmal.' };
  }
  
  return { success: false, message: '❌ Falsch. Versuche nochmal.' };
}

function checkMultipleChoiceSolution(challenge, userAnswer, subAnswer) {
  const questions = challenge.questions;
  const answers = userAnswer;
  let correctCount = 0;
  
  for (let i = 0; i < questions.length; i++) {
    if (answers[i] && answers[i].trim().toLowerCase() === questions[i].answer.trim().toLowerCase()) {
      correctCount++;
    }
  }
  
  if (correctCount === questions.length) {
    return { success: true, message: '✅ Alle Fragen korrekt!' };
  }
  
  return { 
    success: false, 
    message: `⚠️ ${correctCount}/${questions.length} korrekt. Versuche nochmal.` 
  };
}

function checkMultipleInputSolution(challenge, userAnswer, subAnswer) {
  const solution = challenge.solution;
  let correctCount = 0;
  let totalFields = 0;
  
  // Hash prüfen
  if (solution.hash && userAnswer.hash) {
    totalFields++;
    if (userAnswer.hash.trim() === solution.hash.trim()) {
      correctCount++;
    }
  }
  
  // Flag prüfen
  if (solution.flag && userAnswer.flag) {
    totalFields++;
    if (userAnswer.flag.trim() === solution.flag.trim()) {
      correctCount++;
    }
  }
  
  // Multiple-Choice-Felder prüfen
  if (solution.multipleChoice) {
    for (let key in solution.multipleChoice) {
      totalFields++;
      if (userAnswer[key] && userAnswer[key].trim().toLowerCase() === solution.multipleChoice[key].trim().toLowerCase()) {
        correctCount++;
      }
    }
  }
  
  if (correctCount === totalFields) {
    return { success: true, message: '✅ Alle Eingaben korrekt!' };
  }
  
  return { 
    success: false, 
    message: `⚠️ ${correctCount}/${totalFields} korrekt. Versuche nochmal.` 
  };
}

// ========== ATTEMPT TRACKING ==========
const LabAttempts = {
  getAttempts: function(challengeId) {
    const attempts = localStorage.getItem('lab-attempts-' + challengeId);
    return attempts ? parseInt(attempts) : 0;
  },
  
  incrementAttempts: function(challengeId) {
    const attempts = this.getAttempts(challengeId);
    localStorage.setItem('lab-attempts-' + challengeId, attempts + 1);
    return attempts + 1;
  },
  
  resetAttempts: function(challengeId) {
    localStorage.removeItem('lab-attempts-' + challengeId);
  },
  
  resetAllAttempts: function() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('lab-attempts-')) {
        localStorage.removeItem(key);
      }
    });
  }
};

// ========== HINT SYSTEM ==========
function showHint(challengeId, attemptNumber) {
  const challenge = Challenges[challengeId];
  
  if (!challenge || !challenge.hints) {
    return 'Keine Hinweise verfügbar.';
  }
  
  if (attemptNumber <= challenge.hints.length) {
    return challenge.hints[attemptNumber - 1];
  }
  
  return 'Keine weiteren Hinweise verfügbar.';
}

// ========== CHALLENGE COMPLETION ==========
function markChallengeCompleted(challengeId) {
  const completed = JSON.parse(localStorage.getItem('challenge-completed') || '{}');
  completed[challengeId] = true;
  localStorage.setItem('challenge-completed', JSON.stringify(completed));
  
  // Progress updaten
  Progress.updateChallengeProgress();
}

function isChallengeCompleted(challengeId) {
  const completed = JSON.parse(localStorage.getItem('challenge-completed') || '{}');
  return completed[challengeId] === true;
}

function getChallengeProgress() {
  const completed = JSON.parse(localStorage.getItem('challenge-completed') || '{}');
  const total = Object.keys(Challenges).length;
  const solved = Object.keys(completed).length;
  
  return {
    total: total,
    solved: solved,
    percentage: Math.round((solved / total) * 100),
    completed: completed
  };
}
