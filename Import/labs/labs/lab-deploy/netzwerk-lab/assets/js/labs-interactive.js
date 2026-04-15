// ========== INTERACTIVE CHALLENGE UI ==========
(function() {
  'use strict';
  
  // Only proceed if we have a DOM
  if (typeof document === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

function challengeCard(challengeId) {
  const challenge = Challenges[challengeId];
  
  if (!challenge) {
    return '<div class="lab-card"><p>Challenge nicht gefunden.</p></div>';
  }
  
  const completed = isChallengeCompleted(challengeId);
  const attempts = LabAttempts.getAttempts(challengeId);
  
  var label = '';
  var hintClass = '';
  var showButton = '';
  var hintHtml = '';
  
  if (completed) {
    label = '<span class="lab-badge lab-badge-completed">&#10003; Gel&ouml;st</span>';
  } else {
    if (attempts >= challenge.maxAttempts) {
      label = '<span class="lab-badge lab-badge-failed">&#10007; Versuche aufgebraucht</span>';
    } else {
      if (attempts > 0) {
        label = '<span class="lab-badge lab-badge-attempted">&#xFE56; ' + attempts + '/' + challenge.maxAttempts + ' Versuche</span>';
      } else {
        label = '<span class="lab-badge lab-badge-new">Neu</span>';
      }
    }
  }
  
  var stars = '';
  for (var i = 0; i < challenge.stars; i++) { stars += '&#x2605;'; }
  for (var i = challenge.stars; i < 3; i++) { stars += '&#x2606;'; }
  
  var html = '<div class="lab-card">';
  html += '<div class="lab-card-header">';
  html += '<div><span class="lab-name">'+ challenge.name +'</span> <span class="lab-stars">'+ stars +'</span></div>';
  html += label;
  html += '</div>';
  
  html += '<div class="lab-card-body">';
  html += '<div class="lab-desc">'+ challenge.description +'</div>';
  
  if (challenge.type === 'multiple-choice') {
    html += '<div class="challenge-multiple-choice">';
    for (var i=0; i<challenge.choices.length; i++) {
      html += '<label><input type=\"radio\" name=\"ch-\'+challengeId+\'\" value=\"'+i+'\"> '+challenge.choices[i]+'</label>';
    }
    html += '</div>';
    showButton = '<button class=\"btn-challenge\" onclick=\"checkChallenge(\''+ challengeId +'\', \'multiple-choice\')\">\u00dcberpr\u00fcfen</button>';
  }
  else if (challenge.type === 'command-line') {
    html += '<div class="challenge-command-line">';
    html += '<input type=\"text\" id=\"ch-\'+ challengeId +\'\" class=\"challenge-input\" placeholder=\"$ sudo ...\"/>';
    html += '</div>';
    showButton = '<button class=\"btn-challenge\" onclick=\"checkChallenge(\''+ challengeId +'\', \'command-line\')\">\u00dcberpr\u00fcfen</button>';
  }
  
  if (challenge.hint) {
    hintClass = attempts >= Math.floor(challenge.maxAttempts/2) ? 'available' : 'locked';
    hintHtml = '<div class=\"challenge-hint\">';
    hintHtml += '<button class=\"btn-hint\" data-challenge=\"'+ challengeId +'\" onclick=\"showChallengeHint(\''+ challengeId + '\')\"><span class=\"hint-icon\">\ud83d\udca1</span> Tipp</button>';
    hintHtml += '<div class=\"hint-content hidden\" id=\"challenge-\'+challengeId+\'-hint\">'+ challenge.hint +'</div>';
    hintHtml += '</div>';
  }
  
  html += '<div class=\"challenge-footer\">';
  html += showButton;
  if (hintHtml) { html += hintHtml; }
  html += '</div>';
  html += '<div class=\"challenge-feedback\" id=\"challenge-\'+challengeId+\'-feedback\"></div>';
  
  html += '</div>'; 
  return html;
}

function isChallengeCompleted(challengeId) {
  var completed = {};
  try {
    completed = JSON.parse(localStorage.getItem('challenge-completed') || '{}');
  } catch (e) {
    completed = {};
  }
  return completed[challengeId] === true;
}

// ========== CHALLENGE CHECK FUNCTION ==========
window.checkChallenge = function(challengeId, type) {
  const feedback = document.getElementById('challenge-' + challengeId + '-feedback');
  const attempts = LabAttempts.getAttempts(challengeId);
  
  if (attempts >= Challenges[challengeId].maxAttempts) {
    feedback.innerHTML = '\u274c Du hast die maximale Anzahl an Versuchen aufgebraucht.';
    feedback.className = 'challenge-feedback failed';
    return;
  }
  
  LabAttempts.recordAttempt(challengeId);
  
  var answer;
  if (type === 'multiple-choice') {
    var radios = document.querySelectorAll('input[name=\"ch-\'+challengeId+\'\"]');
    var selected = -1;
    for (var i=0; i<radios.length; i++) {
      if (radios[i].checked) { selected = i; break; }
    }
    if (selected === -1) {
      feedback.innerHTML = '\ud83d\udcdb W\u00e4hle eine Antwort aus.';
      feedback.className = 'challenge-feedback info';
      return;
    }
    answer = Challenges[challengeId].choices[selected];
  } else {
    var input = document.getElementById('ch-' + challengeId);
    answer = input.value.trim();
  }
  
  var correct = answer.toLowerCase() === Challenges[challengeId].answer.toLowerCase();
  if (correct) {
    feedback.innerHTML = '\u2705 Sehr gut! Das ist korrekt.';
    feedback.className = 'challenge-feedback success';
    
    var completed = {};
    try {
      completed = JSON.parse(localStorage.getItem('challenge-completed') || '{}');
      completed[challengeId] = true;
      localStorage.setItem('challenge-completed', JSON.stringify(completed));
    } catch (e) {
      console.error('Could not update challenge completion:', e);
    }
    
    setTimeout(function() {
      location.reload();
    }, 1500);
  } else {
    feedback.innerHTML = '\u274c Nicht ganz richtig. Versuche es erneut.';
    feedback.className = 'challenge-feedback failed';
  }
};

// ========== CHALLENGE HINT FUNCTION ==========
window.showChallengeHint = function(challengeId) {
  const attempts = LabAttempts.getAttempts(challengeId);
  const hint = document.getElementById('challenge-' + challengeId + '-hint');
  
  if (hint) {
    hint.style.display = 'block';
    hint.className = 'hint-content visible';
  }
};

// ========== LAB ATTEMPTS MANAGEMENT ==========
var LabAttempts = {
  getAttempts: function(challengeId) {
    var attempts = {};
    try {
      attempts = JSON.parse(localStorage.getItem('lab-attempts') || '{}');
    } catch (e) {
      attempts = {};
    }
    return attempts[challengeId] || 0;
  },
  recordAttempt: function(challengeId) {
    var attempts = {};
    try {
      attempts = JSON.parse(localStorage.getItem('lab-attempts') || '{}');
    } catch (e) {
      attempts = {};
    }
    attempts[challengeId] = (attempts[challengeId] || 0) + 1;
    try {
      localStorage.setItem('lab-attempts', JSON.stringify(attempts));
    } catch (e) {
      console.warn('Could not save attempt count');
    }
  }
};

// ========== ALL CHALLENGES (DUMMY DATA) ==========
var Challenges = {
  'ch01-01': {
    name: 'OSI-Schichten identifizieren',
    type: 'multiple-choice',
    description: 'Welche OSI-Schicht ist für die physikalische Übertragung von Bits verantwortlich?',
    choices: ['1 - Physical', '2 - Datalink', '3 – Network', '4 – Transport'],
    answer: '1 - Physical',
    maxAttempts: 3,
    stars: 2,
    hint: 'Die erste Schicht beginnt mit P.'
  },
  'ch01-02': {
    name: 'TCP Header',
    type: 'command-line',
    description: 'Welches Programm zeigt alle Netzwerk-Schnittstellen?',
    answer: 'ip addr show',
    maxAttempts: 3,
    stars: 1,
    hint: 'Netzwerk-Konfiguration.'
  },
  'ch02-01': {
    name: 'Router-Konfiguration',
    type: 'multiple-choice',
    description: 'Welches Protokoll verwendet ein Router, um MAC-Adressen zu IP-Adressen aufzulösen?',
    choices: ['DNS', 'DHCP', 'ARP', 'ICMP'],
    answer: 'ARP',
    maxAttempts: 3,
    stars: 3,
    hint: 'Zuordnung zwischen Layer 2 und Layer 3.'
  }
};

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
    percentage: total > 0 ? Math.round((solved / total) * 100) : 0
  };
};

window.clearChallengeData = function() {
  localStorage.removeItem('challenge-completed');
  localStorage.removeItem('lab-attempts');
};

})();