// ========== GAMIFIKATION SYSTEM ==========
const Gamification = {
  badges: {
    // Kapitel-Badges
    'chapter-welcome': { icon: '👋', name: 'Erster Schritt', description: 'Willkommen im Lab', condition: 'chapter-welcome' },
    'chapter-grundlagen': { icon: '📚', name: 'Grundlagen', description: 'Grundlagen beherrscht', condition: 'chapter-ch02-grundlagen' },
    'chapter-identifikation': { icon: '🔍', name: 'Sherlock Holmes', description: 'Identifikations-Profi', condition: 'chapter-ch03-identifikation' },
    'chapter-imaging': { icon: '💾', name: 'Image-Meister', description: 'Forensische Imaging-Profi', condition: 'chapter-ch04-imaging' },
    'chapter-hashing': { icon: '#️⃣', name: 'Hash-Wizard', description: 'Hashing-Experte', condition: 'chapter-ch05-hashing' },
    'chapter-mounting': { icon: '🔌', name: 'Mount-König', description: 'Mounten und Analyse-Profi', condition: 'chapter-ch06-mounting' },
    'chapter-artefakte': { icon: '🔎', name: 'Artefakt-Jäger', description: 'Artefakte-Experte', condition: 'chapter-ch07-artefakte' },
    'chapter-casestudy': { icon: '🕵', name: 'Fallstudien-Meister', description: 'Fallstudie gelöst', condition: 'chapter-ch11-casestudy' },
    'chapter-labs': { icon: '🧪', name: 'Lab-Genie', description: 'Alle Labs absolviert', condition: 'chapter-ch10-labs' },
    'chapter-ctf': { icon: '🏁', name: 'CTF-Hunter', description: 'Alle CTFs gelöst', condition: 'chapter-ch11-ctf' },
    'chapter-image-formate': { icon: '💿', name: 'Image-Format-Profi', description: 'Formate verstanden', condition: 'chapter-ch12-image-formate' },
    'chapter-vergleich': { icon: '⚖️', name: 'Vergleichs-Profi', description: 'Diff und cmp beherrscht', condition: 'chapter-ch13-vergleich' },
    'chapter-protokollierung': { icon: '📝', name: 'Chain-of-Custody-König', description: 'Protokollierung beherrscht', condition: 'chapter-ch14-protokollierung' },
    'chapter-write-blocker': { icon: '🛡️', name: 'Write-Blocker-Gardian', description: 'Write-Blocker-Profi', condition: 'chapter-ch15-write-blocker' },
    'chapter-loeschen': { icon: '🗑️', name: 'Lösch-Meister', description: 'Sicheres Löschen', condition: 'chapter-ch16-sicheres-loeschen' },
    'chapter-best-practices': { icon: '✅', name: 'Best-Practices-Profi', description: 'Best Practices beherrscht', condition: 'chapter-ch17-best-practices' },
    'chapter-tools': { icon: '🛠️', name: 'Tool-Experte', description: 'Alle Tools beherrscht', condition: 'chapter-ch18-tools' },
    
    // Challenges-Badges
    'lab1-completed': { icon: '💾', name: 'USB-Forensiker', description: 'USB-Forensik Case gelöst', condition: 'challenge-lab1' },
    'lab2-completed': { icon: '📋', name: 'Log-Analyst', description: 'Log-Analyse gelöst', condition: 'challenge-lab2' },
    'lab3-completed': { icon: '#️⃣', name: 'Hash-Vergleicher', description: 'Hash-Integrität geprüft', condition: 'challenge-lab3' },
    'lab4-completed': { icon: '🖥️', name: 'Hex-Meister', description: 'Hex-Analyse gelöst', condition: 'challenge-lab4' },
    'lab5-completed': { icon: '💻', name: 'Memory-Experte', description: 'Memory-Dump analysiert', condition: 'challenge-lab5' },
    'ctf1-completed': { icon: '🏁', name: 'CTF-Hunter 1', description: 'Verstecktes Flag gefunden', condition: 'challenge-ctf1' },
    'ctf2-completed': { icon: '🏁', name: 'CTF-Hunter 2', description: 'MBR-Signatur gefunden', condition: 'challenge-ctf2' },
    'ctf3-completed': { icon: '🏁', name: 'CTF-Hunter 3', description: 'Hash-Kollision entdeckt', condition: 'challenge-ctf3' },
    'ctf4-completed': { icon: '🏁', name: 'CTF-Hunter 4', description: 'Log-Forensik gelöst', condition: 'challenge-ctf4' },
    'ctf5-completed': { icon: '🏁', name: 'CTF-Hunter 5', description: 'USB-Deep-Dive gelöst', condition: 'challenge-ctf5' },
    
    // Special Achievements
    'all-challenges': { icon: '🏆', name: 'Meister-Forensiker', description: 'Alle Challenges gelöst', condition: 'all-challenges' },
    'all-chapters': { icon: '🎓', name: 'Alles-Gelehrte', description: 'Alle Kapitel abgeschlossen', condition: 'all-chapters' },
    'first-chapter': { icon: '🌱', name: 'Neuling', description: 'Erstes Kapitel abgeschlossen', condition: 'first-chapter' },
    'speed-learner': { icon: '⚡', name: 'Schnell-Lerner', description: 'Alle Kapitel unter 4h', condition: 'speed-learner' },
    'perfectionist': { icon: '💎', name: 'Perfektionist', description: 'Zertifizierung mit 100%', condition: 'perfectionist' },
    'certified-beginner': { icon: '🌱', name: 'Zertifizierter Anfänger', description: 'Anfänger-Zertifikat erhalten', condition: 'certification-beginner' },
    'certified-intermediate': { icon: '⭐', name: 'Zertifizierter Fortgeschrittener', description: 'Fortgeschritten-Zertifikat erhalten', condition: 'certification-intermediate' },
    'certified-expert': { icon: '🏆', name: 'Zertifizierter Experte', description: 'Experten-Zertifikat erhalten', condition: 'certification-expert' },
    'streak-7': { icon: '🔥', name: 'Lernstreak 7 Tage', description: '7 Tage am Stück gelernt', condition: 'streak-7' },
    'streak-30': { icon: '🔥', name: 'Lernstreak 30 Tage', description: '30 Tage am Stück gelernt', condition: 'streak-30' },
    'streak-100': { icon: '🔥', name: 'Lernstreak 100 Tage', description: '100 Tage am Stück gelernt', condition: 'streak-100' },
  },

  achievements: {
    'first-login': { icon: '👋', name: 'Erster Login', description: 'Willkommen im Lab', condition: 'always' },
    'first-chapter': { icon: '📖', name: 'Lese-Anfänger', description: 'Erstes Kapitel gelesen', condition: 'first-chapter' },
    'first-lab': { icon: '🧪', name: 'Erstes Lab', description: 'Erste Aufgabe gelöst', condition: 'first-lab' },
    'first-ctf': { icon: '🏁', name: 'Erster CTF', description: 'Erste CTF gelöst', condition: 'first-ctf' },
    'first-certification': { icon: '📜', name: 'Zertifiziert', description: 'Zertifizierung abgelegt', condition: 'first-certification' },
    'all-labs': { icon: '🧪', name: 'Lab-Meister', description: 'Alle Labs gelöst', condition: 'all-labs' },
    'all-ctfs': { icon: '🏁', name: 'CTF-Meister', description: 'Alle CTFs gelöst', condition: 'all-ctfs' },
    'all-challenges': { icon: '🏆', name: 'Alle-Meister', description: 'Alle Challenges gelöst', condition: 'all-challenges' },
    'quick-learner': { icon: '⚡', name: 'Schnell-Lerner', description: '5 Kapitel in 30 Minuten', condition: 'quick-learner' },
    'dedicated-learner': { icon: '📖', name: 'Engagierter Lerner', description: '10 Kapitel in einem Tag', condition: 'dedicated-learner' },
    'forensic-ninja': { icon: '🥷', name: 'Forensik-Ninja', description: 'Alle Kapitel in 2 Tagen', condition: 'forensic-ninja' },
    'night-owl': { icon: '🦉', name: 'Nachteule', description: 'Nachts lernen', condition: 'night-owl' },
    'morning-bird': { icon: '🐦', name: 'Frühauf', description: 'Morgens lernen', condition: 'morning-bird' },
    'weekend-warrior': { icon: '⚔️', name: 'Wochenend-Krieger', description: 'Am Wochenende lernen', condition: 'weekend-warrior' },
    'streak-3': { icon: '🔥', name: '3er-Streak', description: '3 Tage am Stück gelernt', condition: 'streak-3' },
    'streak-7': { icon: '🔥', name: '7er-Streak', description: '7 Tage am Stück gelernt', condition: 'streak-7' },
    'streak-30': { icon: '🔥', name: 'Monats-Streak', description: '30 Tage am Stück gelernt', condition: 'streak-30' },
    'streak-100': { icon: '🔥', name: 'Jahres-Streak', description: '100 Tage am Stück gelernt', condition: 'streak-100' },
  },

  levels: {
    1: { name: 'Anfänger', xp: 0, maxXP: 100 },
    2: { name: 'Junior', xp: 100, maxXP: 250 },
    3: { name: 'Middle', xp: 250, maxXP: 500 },
    4: { name: 'Senior', xp: 500, maxXP: 1000 },
    5: { name: 'Experte', xp: 1000, maxXP: 2000 },
    6: { name: 'Meister', xp: 2000, maxXP: 5000 },
    7: { name: 'Großmeister', xp: 5000, maxXP: 10000 },
    8: { name: 'Legende', xp: 10000, maxXP: 20000 },
    9: { name: 'Myth', xp: 20000, maxXP: 50000 },
    10: { name: 'Titan', xp: 50000, maxXP: Infinity },
  },

  // XP-Verleihung
  chapterXP: 10,
  labXP: 20,
  ctfXP: 30,
  certificationXP: 50,

  // Level-Ups
  levelUps: {
    1: { message: 'Level Up: Anfänger!', xp: 0 },
    2: { message: 'Level Up: Junior!', xp: 100 },
    3: { message: 'Level Up: Middle!', xp: 250 },
    4: { message: 'Level Up: Senior!', xp: 500 },
    5: { message: 'Level Up: Experte!', xp: 1000 },
    6: { message: 'Level Up: Meister!', xp: 2000 },
    7: { message: 'Level Up: Großmeister!', xp: 5000 },
    8: { message: 'Level Up: Legende!', xp: 10000 },
    9: { message: 'Level Up: Myth!', xp: 20000 },
    10: { message: 'Level Up: Titan!', xp: 50000 },
  },

  // Streak-System
  streak: {
    current: 0,
    lastLogin: null,
    longest: 0,
    history: []
  }
};

// ========== GAMIFIKATION FUNKTIONEN ==========
function getXP(chapterId) {
  // Kapitel-XP für verschiedene Typen
  if (chapterId.startsWith('ch')) {
    return Gamification.chapterXP;
  } else if (chapterId.startsWith('lab')) {
    return Gamification.labXP;
  } else if (chapterId.startsWith('ctf')) {
    return Gamification.ctfXP;
  } else if (chapterId === 'certification') {
    return Gamification.certificationXP;
  }
  return 0;
}

function checkBadgesCondition(badgeId) {
  var completed = JSON.parse(localStorage.getItem('challenge-completed') || '{}');
  var progress = JSON.parse(localStorage.getItem('forensik_lab_progress') || '[]');
  var isChapterDone = function(id) { return progress.indexOf(id) !== -1; };
  var isChallengeDone = function(id) { return completed[id] === true; };
  var allChallengesDone = function() {
    return Object.keys(Challenges || {}).every(function(key) { return completed[key] === true; });
  };
  var allChaptersDone = function() {
    return (App.navItems || []).every(function(item) { return isChapterDone(item.id); });
  };

  switch (badgeId) {
    case 'chapter-welcome':
      return isChapterDone('welcome');
    case 'chapter-grundlagen':
      return isChapterDone('ch01-grundlagen');
    case 'chapter-identifikation':
      return isChapterDone('ch02-identifikation');
    case 'chapter-imaging':
      return isChapterDone('ch03-imaging');
    case 'chapter-hashing':
      return isChapterDone('ch04-hashing');
    case 'chapter-mounting':
      return isChapterDone('ch05-mounting');
    case 'chapter-artefakte':
      return isChapterDone('ch10-artefakte');
    case 'chapter-casestudy':
      return isChapterDone('ch11-casestudy');
    case 'chapter-labs':
      return isChapterDone('ch10-labs');
    case 'chapter-ctf':
      return isChapterDone('ch11-ctf');
    case 'chapter-image-formate':
      return isChapterDone('ch12-image-formate');
    case 'chapter-vergleich':
      return isChapterDone('ch13-vergleich');
    case 'chapter-protokollierung':
      return isChapterDone('ch14-protokollierung');
    case 'chapter-write-blocker':
      return isChapterDone('ch15-write-blocker');
    case 'chapter-loeschen':
      return isChapterDone('ch16-sicheres-loeschen');
    case 'chapter-best-practices':
      return isChapterDone('ch17-best-practices');
    case 'chapter-tools':
      return isChapterDone('ch18-tools');

    case 'lab1-completed':
      return isChallengeDone('lab1');
    case 'lab2-completed':
      return isChallengeDone('lab2');
    case 'lab3-completed':
      return isChallengeDone('lab3');
    case 'lab4-completed':
      return isChallengeDone('lab4');
    case 'lab5-completed':
      return isChallengeDone('lab5');
    case 'ctf1-completed':
      return isChallengeDone('ctf1');
    case 'ctf2-completed':
      return isChallengeDone('ctf2');
    case 'ctf3-completed':
      return isChallengeDone('ctf3');
    case 'ctf4-completed':
      return isChallengeDone('ctf4');
    case 'ctf5-completed':
      return isChallengeDone('ctf5');

    case 'all-challenges':
      return allChallengesDone();
    case 'all-chapters':
      return allChaptersDone();
    case 'first-chapter':
      var chapterCount = progress.length;
      return chapterCount === 1;
    case 'speed-learner':
      var startTime = localStorage.getItem('start-time');
      if (!startTime) return false;
      var elapsedHours = (Date.now() - parseInt(startTime)) / 3600000;
      return elapsedHours < 4 && allChaptersDone();
    case 'perfectionist':
      var certResult = getCertificationResult();
      return certResult && certResult.percentage === 100;
    case 'certified-beginner':
      return getCertificationResult() !== null && getCertificationResult().percentage >= 60;
    case 'certified-intermediate':
      return getCertificationResult() !== null && getCertificationResult().percentage >= 80;
    case 'certified-expert':
      return getCertificationResult() !== null && getCertificationResult().percentage >= 95;
    case 'streak-7':
      return getStreak().current >= 7;
    case 'streak-30':
      return getStreak().current >= 30;
    case 'streak-100':
      return getStreak().current >= 100;

    default:
      return false;
  }
}

function awardXP(chapterId) {
  const xp = getXP(chapterId);
  const currentXP = parseInt(localStorage.getItem('user-xp') || '0');
  const newXP = currentXP + xp;
  
  localStorage.setItem('user-xp', newXP.toString());
  
  checkLevelUp(newXP);
  
  return {
    xp: xp,
    totalXP: newXP,
    oldXP: currentXP
  };
}

function checkLevelUp(newXP) {
  const currentLevel = getCurrentLevel();
  
  // Nächstes Level finden
  for (let level = currentLevel; level < 10; level++) {
    if (newXP >= Gamification.levels[level].xp) {
      if (newXP >= Gamification.levels[level].maxXP) {
        // Level-Up!
        const levelUp = Gamification.levelUps[level + 1] || Gamification.levelUps[level];
        showLevelUpNotification(level, levelUp);
        saveAchievement(level, levelUp);
      }
      return;
    }
  }
}

function showLevelUpNotification(level, levelUp) {
  if (!('Notification' in window)) {
    console.log('Level Up:', levelUp.message);
    return;
  }
  
  if (Notification.permission === 'granted') {
    new Notification('Level Up!', {
      body: levelUp.message,
      icon: '/assets/icons/level-up.png'
    });
  }
}

function saveAchievement(level, levelUp) {
  const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
  
  const achievement = {
    id: 'level-' + level + '-' + levelUp.xp,
    type: 'level-up',
    name: levelUp.message,
    xp: levelUp.xp,
    timestamp: new Date().toISOString()
  };
  
  // Nur speichern, wenn noch nicht vorhanden
  if (!achievements.find(a => a.id === achievement.id)) {
    achievements.push(achievement);
    localStorage.setItem('achievements', JSON.stringify(achievements));
    showAchievementNotification(achievement);
  }
}

function showAchievementNotification(achievement) {
  // Toast-Nachricht anzeigen
  const toast = document.getElementById('achievement-toast');
  if (toast) {
    toast.innerHTML = `
      <div class="achievement-toast">
        <span class="achievement-icon">${Gamification.badges['all-challenges'].icon}</span>
        <span class="achievement-message">${achievement.name}</span>
      </div>
    `;
    toast.style.display = 'block';
    
    setTimeout(() => {
      toast.style.display = 'none';
    }, 5000);
  }
  
  // Audio-Sound abspielen
  const achievementSound = new Audio('/assets/sounds/achievement.mp3');
  achievementSound.play().catch(e => console.log('Audio-Play-Fehler:', e));
}

function getCurrentLevel() {
  const xp = parseInt(localStorage.getItem('user-xp') || '0');
  
  let level = 0;
  for (let i = 0; i < 10; i++) {
    if (xp >= Gamification.levels[i].xp) {
      level = i + 1;
    }
  }
  
  return level;
}

function checkStreak() {
  const today = new Date().toISOString().split('T')[0];
  const lastLogin = localStorage.getItem('last-login-date');
  
  // Streak prüfen
  let streak = parseInt(localStorage.getItem('current-streak') || '0');
  
  if (lastLogin === today) {
    // Schon heute eingeloggt, Streak beibehalten
  } else {
    // Neuer Tag, Streak zurücksetzen
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (lastLogin === yesterdayStr) {
      // Gestern auch eingeloggt, Streak +1
      streak++;
    } else {
      // Streak unterbrochen
      streak = 0;
    }
  }
  
  // Streak speichern
  localStorage.setItem('current-streak', streak.toString());
  localStorage.setItem('last-login-date', today);
  
  // Longest Streak aktualisieren
  const longestStreak = parseInt(localStorage.getItem('longest-streak') || '0');
  if (streak > longestStreak) {
    localStorage.setItem('longest-streak', streak.toString());
    checkBadgesCondition('streak-' + streak);
  }
  
  return streak;
}

function getStreak() {
  return {
    current: parseInt(localStorage.getItem('current-streak') || '0'),
    longest: parseInt(localStorage.getItem('longest-streak') || '0')
  };
}

// ========== EXPORT ==========
window.Gamification = Gamification;
window.getXP = getXP;
window.awardXP = awardXP;
window.checkLevelUp = checkLevelUp;
window.getCurrentLevel = getCurrentLevel;
window.checkStreak = checkStreak;
window.getStreak = getStreak;
