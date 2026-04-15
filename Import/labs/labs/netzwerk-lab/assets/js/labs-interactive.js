// ========== INTERACTIVE CHALLENGE UI ==========
function challengeCard(challengeId) {
  const challenge = Challenges[challengeId];
  
  if (!challenge) {
    return '<div class="lab-card"><p>Challenge nicht gefunden.</p></div>';
  }
  
  const completed = isChallengeCompleted(challengeId);
  const attempts = LabAttempts.getAttempts(challengeId);
  
  let html = '<div class="lab-card" id="challenge-' + challengeId + '">';
  
  // Header
  html += '<div class="lab-meta">';
  html += '<span class="difficulty-badge difficulty-easy">Challenge</span>';
  html += '<span class="challenge-status">' + (completed ? '✅ Abgeschlossen' : '⏳ Offen') + '</span>';
  html += '</div>';
  
  // Title & Description
  html += '<h3>' + challenge.title + '</h3>';
  html += '<p>' + challenge.description + '</p>';
  
  // Download Links (wenn vorhanden)
  if (challenge.file) {
    html += '<a class="download-btn" href="datasets/' + challenge.file + '" download>&#11015; ' + challenge.file + ' herunterladen</a>';
  }
  if (challenge.files) {
    html += '<div style="display:flex;gap:8px;flex-wrap:wrap">';
    challenge.files.forEach(file => {
      html += '<a class="download-btn" href="datasets/' + file + '" download>&#11015; ' + file + '</a>';
    });
    html += '</div>';
  }
  
  // Multiple Choice Questions
  if (challenge.type === 'multiple-choice' && challenge.questions) {
    html += '<div class="challenge-questions">';
    challenge.questions.forEach((q, idx) => {
      html += '<div class="challenge-question">';
      html += '<p class="question-text"><strong>Frage ' + (idx + 1) + ':</strong> ' + q.question + '</p>';
      html += '<select id="challenge-' + challengeId + '-q' + idx + '" class="challenge-select">';
      q.options.forEach(opt => {
        html += '<option value="' + opt + '">' + opt + '</option>';
      });
      html += '</select>';
      html += '</div>';
    });
    html += '</div>';
  }
  
  // Input Fields
  if (challenge.type === 'input') {
    html += '<div class="challenge-input">';
    html += '<label for="challenge-' + challengeId + '-input">L&ouml;sung:</label>';
    html += '<input type="text" id="challenge-' + challengeId + '-input" class="challenge-input-field" placeholder="Hier L&ouml;sung eingeben...">';
    html += '<button class="challenge-check-btn" onclick="checkChallenge(\'' + challengeId + '\', \'input\')">&#10004; Pr&uuml;fen</button>';
    html += '</div>';
  }
  
  // Multiple Input Fields (f&uuml;r Labs)
  if (challenge.type === 'multiple-input') {
    html += '<div class="challenge-input">';
    
    if (challenge.solution.hash) {
      html += '<label for="challenge-' + challengeId + '-hash">Hash:</label>';
      html += '<input type="text" id="challenge-' + challengeId + '-hash" class="challenge-input-field" placeholder="Hash eingeben...">';
    }
    
    if (challenge.solution.flag) {
      html += '<label for="challenge-' + challengeId + '-flag">Flag:</label>';
      html += '<input type="text" id="challenge-' + challengeId + '-flag" class="challenge-input-field" placeholder="Flag eingeben...">';
    }
    
    if (challenge.solution.attackerIP) {
      html += '<label for="challenge-' + challengeId + '-ip">Angreifer-IP:</label>';
      html += '<input type="text" id="challenge-' + challengeId + '-ip" class="challenge-input-field" placeholder="IP-Adresse">';
    }
    
    if (challenge.solution.attackTime) {
      html += '<label for="challenge-' + challengeId + '-time">Angriffszeit:</label>';
      html += '<input type="text" id="challenge-' + challengeId + '-time" class="challenge-input-field" placeholder="HH:MM:SS">';
    }
    
    if (challenge.solution.multipleChoice) {
      for (let key in challenge.solution.multipleChoice) {
        html += '<label for="challenge-' + challengeId + '-' + key + '">' + key + ':</label>';
        html += '<input type="text" id="challenge-' + challengeId + '-' + key + '" class="challenge-input-field" placeholder="' + key + ' eingeben...">';
      }
    }
    
    html += '<button class="challenge-check-btn" onclick="checkChallenge(\'' + challengeId + '\', \'multiple-input\')">&#10004; Pr&uuml;fen</button>';
    html += '</div>';
  }
  
  // Feedback Area
  html += '<div id="challenge-' + challengeId + '-feedback" class="challenge-feedback"></div>';
  
  // Stats
  html += '<div class="challenge-stats">';
  html += '<span class="challenge-attempts">Versuche: <span id="challenge-' + challengeId + '-attempts">' + attempts + '</span>/' + challenge.maxAttempts + '</span>';
  if (completed) {
    html += '<span class="challenge-completed">&#10003; Gel&ouml;st</span>';
  }
  html += '</div>';
  
  // Hint Button
  html += '<button class="challenge-hint-btn" id="challenge-' + challengeId + '-hint-btn" onclick="showChallengeHint(\'' + challengeId + '\')">💡 Hinweis anzeigen</button>';
  html += '<div id="challenge-' + challengeId + '-hint" class="challenge-hint" style="display:none;"></div>';
  
  html += '</div>';
  
  return html;
}

// ========== CHALLENGE CHECK FUNCTION ==========
window.checkChallenge = function(challengeId, type) {
  const feedback = document.getElementById('challenge-' + challengeId + '-feedback');
  const attempts = LabAttempts.getAttempts(challengeId);
  
  // Max attempts pr&uuml;fen
  if (attempts >= Challenges[challengeId].maxAttempts) {
    feedback.innerHTML = '<div class="feedback feedback-warning">⚠️ Maximale Versuche erreicht. L&ouml;sung anzeigen?</div>';
    const hint = document.getElementById('challenge-' + challengeId + '-hint');
    hint.style.display = 'block';
    hint.textContent = showHint(challengeId, attempts);
    return;
  }
  
  let userAnswer = null;
  
  // Input sammeln
  if (type === 'input') {
    userAnswer = document.getElementById('challenge-' + challengeId + '-input').value;
  } else if (type === 'multiple-input') {
    userAnswer = {};
    
    if (document.getElementById('challenge-' + challengeId + '-hash')) {
      userAnswer.hash = document.getElementById('challenge-' + challengeId + '-hash').value;
    }
    
    if (document.getElementById('challenge-' + challengeId + '-flag')) {
      userAnswer.flag = document.getElementById('challenge-' + challengeId + '-flag').value;
    }
    
    if (document.getElementById('challenge-' + challengeId + '-ip')) {
      userAnswer.attackerIP = document.getElementById('challenge-' + challengeId + '-ip').value;
    }
    
    if (document.getElementById('challenge-' + challengeId + '-time')) {
      userAnswer.attackTime = document.getElementById('challenge-' + challengeId + '-time').value;
    }
    
    if (Challenges[challengeId].solution.multipleChoice) {
      for (let key in Challenges[challengeId].solution.multipleChoice) {
        const elem = document.getElementById('challenge-' + challengeId + '-' + key);
        if (elem) {
          userAnswer[key] = elem.value;
        }
      }
    }
  } else if (type === 'multiple-choice') {
    userAnswer = [];
    const questions = Challenges[challengeId].questions;
    for (let i = 0; i < questions.length; i++) {
      const select = document.getElementById('challenge-' + challengeId + '-q' + i);
      if (select) {
        userAnswer.push(select.value);
      }
    }
  }
  
  // Pr&uuml;fen
  const result = checkSolution(challengeId, userAnswer);
  
  // Versuche incrementieren
  const newAttempts = LabAttempts.incrementAttempts(challengeId);
  document.getElementById('challenge-' + challengeId + '-attempts').textContent = newAttempts;
  
  // Feedback anzeigen
  if (result.success) {
    feedback.innerHTML = '<div class="feedback feedback-success">' + result.message + '</div>';
    markChallengeCompleted(challengeId);
    
    // Completed-Status aktualisieren
    const status = document.querySelector('#challenge-' + challengeId + ' .challenge-status');
    if (status) {
      status.innerHTML = '✅ Abgeschlossen';
    }
    
    // Stats aktualisieren
    const stats = document.querySelector('#challenge-' + challengeId + ' .challenge-stats');
    if (stats) {
      stats.innerHTML += '<span class="challenge-completed">&#10003; Gel&ouml;st</span>';
    }
  } else {
    feedback.innerHTML = '<div class="feedback feedback-error">' + result.message + '</div>';
    
    // Hint nach 2. Fehlversuch
    if (newAttempts >= 2) {
      const hint = document.getElementById('challenge-' + challengeId + '-hint');
      if (hint) {
        hint.style.display = 'block';
        hint.textContent = showHint(challengeId, newAttempts);
      }
    }
  }
}

// ========== CHALLENGE HINT FUNCTION ==========
window.showChallengeHint = function(challengeId) {
  const attempts = LabAttempts.getAttempts(challengeId);
  const hint = document.getElementById('challenge-' + challengeId + '-hint');
  
  if (hint) {
    hint.style.display = 'block';
    hint.textContent = showHint(challengeId, attempts);
  }
}

// ========== UPDATE LABS WITH CHALLENGES ==========
function updateLabsWithChallenges() {
  // Lab 1-5 mit Challenges ersetzen
  Labs['ch10-labs'] = function () {
    let html = '' +
    '<h1 class="chapter-title">Labs &amp; &Uuml;bungen</h1>' +
    '<div class="chapter-subtitle">5 praktische Lab-&Uuml;bungen mit interaktiven Challenges</div>';
    
    // Challenge 1
    html += challengeCard('lab1');
    
    // Challenge 2
    html += challengeCard('lab2');
    
    // Challenge 3
    html += challengeCard('lab3');
    
    // Challenge 4
    html += challengeCard('lab4');
    
    // Challenge 5
    html += challengeCard('lab5');
    
    html += completeBtn('ch10-labs');
    html += navButtons('ch11-casestudy', 'ch11-ctf');
    
    return html;
  };
  
  // CTF Challenges
  Labs['ch11-ctf'] = function () {
    let html = '' +
    '<h1 class="chapter-title">Mini-CTF Challenges</h1>' +
    '<div class="chapter-subtitle">Capture The Flag &ndash; dein forensischer Beweis</div>';
    
    // CTF 1
    html += challengeCard('ctf1');
    
    // CTF 2
    html += challengeCard('ctf2');
    
    // CTF 3
    html += challengeCard('ctf3');
    
    // CTF 4
    html += challengeCard('ctf4');
    
    // CTF 5
    html += challengeCard('ctf5');
    
    html += completeBtn('ch11-ctf');
    html += navButtons('ch10-labs', 'ch12-image-formate');
    
    return html;
  };
}

// ========== CALL ORIGINAL LABS ==========
// Die urspr&uuml;nglichen Labs wurden in challenges.js verschoben
// Diese Funktion stellt sicher, dass Challenges verf&uuml;gbar sind
function getOriginalLab(labId) {
  return challengeCard(labId);
}

// ========== EXPORT FUNCTIONS ==========
window.getChallenge = function(challengeId) {
  return Challenges[challengeId];
};

window.getAllChallenges = function() {
  return Challenges;
};

window.getChallengeProgress = function() {
  var completed = JSON.parse(localStorage.getItem('challenge-completed') || '{}');
  var total = Object.keys(Challenges || {}).length;
  var solved = Object.keys(completed).filter(function(k) { return completed[k] === true; }).length;
  return {
    total: total,
    solved: solved,
    percentage: total > 0 ? Math.round((solved / total) * 100) : 0,
    completed: completed
  };
};

updateLabsWithChallenges();
