// ========== ZERTIFIZIERUNGSSYSTEM ==========
const Certification = {
  levels: {
    beginner: {
      name: 'Anfänger',
      minPercentage: 60,
      badge: '🌱'
    },
    intermediate: {
      name: 'Fortgeschritten',
      minPercentage: 80,
      badge: '⭐'
    },
    expert: {
      name: 'Experte',
      minPercentage: 95,
      badge: '🏆'
    }
  },

  questions: [
    {
      id: 'cert-q1',
      type: 'multiple-choice',
      chapter: 'ch02-identifikation',
      question: 'Welche Befehle werden zur Identifikation eines Datenträgers genutzt?',
      options: ['lsblk', 'fdisk -l', 'lspci', 'Alle oben genannten'],
      answer: 'Alle oben genannten'
    },
    {
      id: 'cert-q2',
      type: 'multiple-choice',
      chapter: 'ch03-imaging',
      question: 'Welche Optionen muss dd verwenden, um das Image zuverlässig zu erstellen?',
      options: ['if=', 'of=', 'bs=', 'conv=noerror,sync', 'Alle oben genannten'],
      answer: 'Alle oben genannten'
    },
    {
      id: 'cert-q3',
      type: 'multiple-choice',
      chapter: 'ch04-hashing',
      question: 'Welcher Algorithmus wird für forensische Hashing empfohlen?',
      options: ['MD5', 'SHA-1', 'SHA-256', 'CRC32'],
      answer: 'SHA-256'
    },
    {
      id: 'cert-q4',
      type: 'multiple-choice',
      chapter: 'ch05-mounting',
      question: 'Welches Mount-Flag ist für forensische Analyse zwingend?',
      options: ['ro', 'sync', 'loop', 'offset'],
      answer: 'ro'
    },
    {
      id: 'cert-q5',
      type: 'multiple-choice',
      chapter: 'ch10-artefakte',
      question: 'Was ist der Zweck von MAC-Times?',
      options: ['Modifiziert, Zugriffen, Erstellungszeit', 'Alle Informationen oben genannten'],
      answer: 'Alle Informationen oben genannten'
    },
    {
      id: 'cert-q6',
      type: 'multiple-choice',
      chapter: 'ch11-casestudy',
      question: 'Welcher Schritt muss zuerst durchgeführt werden?',
      options: ['Identifikation des Datenträgers', 'Imaging', 'Hashing', 'Mounten'],
      answer: 'Identifikation des Datenträgers'
    },
    {
      id: 'cert-q7',
      type: 'multiple-choice',
      chapter: 'ch12-image-formate',
      question: 'Welches Format ist am universellsten kompatibel?',
      options: ['Raw', 'E01', 'AFF', 'VHD'],
      answer: 'Raw'
    },
    {
      id: 'cert-q8',
      type: 'multiple-choice',
      chapter: 'ch13-vergleich',
      question: 'Welches Tool ist für Binärdateien am schnellsten?',
      options: ['diff', 'cmp', 'xxd', 'sha256sum'],
      answer: 'cmp'
    },
    {
      id: 'cert-q9',
      type: 'multiple-choice',
      chapter: 'ch14-protokollierung',
      question: 'Welcher Befehl protokolliert alle Terminal-Befehle?',
      options: ['history', 'script', 'journalctl', 'last'],
      answer: 'script'
    },
    {
      id: 'cert-q10',
      type: 'multiple-choice',
      chapter: 'ch15-write-blocker',
      question: 'Welcher Write-Blocker-Typ ist zuverlässigster?',
      options: ['Hardware-Write-Blocker', 'Software-Write-Blocker', 'Linux-Kernel SysRq', 'Kein'],
      answer: 'Hardware-Write-Blocker'
    },
    {
      id: 'cert-q11',
      type: 'multiple-choice',
      chapter: 'ch16-sicheres-loeschen',
      question: 'Welche Methode ist für SSDs am sichersten?',
      options: ['shred', 'ATA Secure Erase', 'NVMe Crypto-Erase', 'rm -rf'],
      answer: 'NVMe Crypto-Erase'
    },
    {
      id: 'cert-q12',
      type: 'multiple-choice',
      chapter: 'ch17-best-practices',
      question: 'Was ist NIE zu tun?',
      options: ['Write-Blocker verwenden', 'Original mounten', 'Hashes erstellen', 'Script-Befehl nutzen'],
      answer: 'Original mounten'
    },
    {
      id: 'cert-q13',
      type: 'multiple-choice',
      chapter: 'ch18-tools',
      question: 'Welches Tool wird für Filesystem-Analyse genutzt?',
      options: ['strings', 'fls', 'xxd', 'binwalk'],
      answer: 'fls'
    },
    {
      id: 'cert-q14',
      type: 'multiple-choice',
      chapter: 'ch02-identifikation',
      question: 'Welcher Befehl zeigt Partitionen an?',
      options: ['lsblk', 'fdisk -l', 'parted', 'Alle oben genannten'],
      answer: 'Alle oben genannten'
    },
    {
      id: 'cert-q15',
      type: 'multiple-choice',
      chapter: 'ch03-imaging',
      question: 'Was ist der Zweck von conv=noerror,sync?',
      options: ['Fehler melden', 'Sync beim Schreiben', 'Beides', 'Keines von beiden'],
      answer: 'Beides'
    }
  ]
};

// ========== ZERTIFIZIERUNG-FUNKTIONEN ==========
function getCertificationQuestions() {
  // Randomisiere Reihenfolge
  return Certification.questions.sort(() => Math.random() - 0.5).slice(0, 10);
}

function checkCertificationAnswers(userAnswers) {
  let correctCount = 0;
  let total = Certification.questions.length;
  
  Object.keys(userAnswers).forEach(questionId => {
    const question = Certification.questions.find(q => q.id === questionId);
    if (question && userAnswers[questionId] === question.answer) {
      correctCount++;
    }
  });
  
  return {
    correct: correctCount,
    total: total,
    percentage: Math.round((correctCount / total) * 100)
  };
}

function getCertificationLevel(percentage) {
  if (percentage >= Certification.levels.expert.minPercentage) {
    return Certification.levels.expert;
  } else if (percentage >= Certification.levels.intermediate.minPercentage) {
    return Certification.levels.intermediate;
  } else if (percentage >= Certification.levels.beginner.minPercentage) {
    return Certification.levels.beginner;
  } else {
    return null;
  }
}

function getCertificateId() {
  // Generiere eindeutige Zertifikats-ID
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return 'CERT-' + timestamp + '-' + random;
}

function saveCertificationResult(result) {
  try {
    localStorage.setItem('certification-result', JSON.stringify(result));
  } catch (e) {
    console.error('Fehler beim Speichern des Zertifikats:', e);
  }
}

function getCertificationResult() {
  try {
    const result = localStorage.getItem('certification-result');
    return result ? JSON.parse(result) : null;
  } catch (e) {
    return null;
  }
}

// ========== ZERTIFIKAT-PRÜFUNG (VOR DEM TEST) ==========
function validateCertificationRequirement() {
  // Prüfe ob User alle Kapitel abgeschlossen hat
  const chapterProgress = Progress.getCount();
  
  // Mindestens 80% der Kapitel müssen abgeschlossen sein
  const minChaptersRequired = Math.ceil(17 * 0.8);
  const chaptersCompleted = chapterProgress;
  
  if (chaptersCompleted < minChaptersRequired) {
    return {
      eligible: false,
      reason: `Du hast erst ${chaptersCompleted}/${17} Kapitel abgeschlossen. Mindestens ${minChaptersRequired} sind erforderlich für den Zertifizierungstest.`,
      canTakeTest: false
    };
  }
  
  return {
    eligible: true,
    reason: `Du hast ${chaptersCompleted}/${17} Kapitel abgeschlossen. Du kannst den Zertifizierungstest machen!`,
    canTakeTest: true
  };
}

// ========== EXPORT-FUNKTIONEN ==========
Certification.getQuestions = getCertificationQuestions;
Certification.checkAnswers = checkCertificationAnswers;
Certification.getLevel = getCertificationLevel;
Certification.generateId = getCertificateId;
Certification.saveResult = saveCertificationResult;
Certification.getResult = getCertificationResult;
Certification.validateRequirement = validateCertificationRequirement;

window.Certification = Certification;
