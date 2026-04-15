// ========== UI IMPROVEMENTS ==========
(function() {
  'use strict';
  
  // Only proceed if we have a window
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

var UIImprovements = {
  theme: {
    current: 'dark', // 'dark' or 'light'
    prefersDark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  },

  fontSize: {
    current: 14, // 12, 13, 14 (default), 15, 16, 18
    options: [12, 13, 14, 15, 16, 18]
  }
};

// ========== THEME ==========
function toggleTheme() {
  UIImprovements.theme.current = UIImprovements.theme.current === 'dark' ? 'light' : 'dark';
  applyTheme();
  saveUserPreferences();
}

function applyTheme() {
  var root = document.documentElement;
  if (UIImprovements.theme.current === 'dark') {
    root.classList.remove('light-theme');
    root.classList.add('dark-theme');
  } else {
    root.classList.add('light-theme');
    root.classList.remove('dark-theme');
  }
}

function initTheme() {
  var saved = localStorage.getItem('ui-theme');
  if (saved) {
    UIImprovements.theme.current = saved;
  }
  applyTheme();
}

// ========== FONT SIZE ==========
function increaseFontSize() {
  var idx = UIImprovements.fontSize.options.indexOf(UIImprovements.fontSize.current);
  if (idx < UIImprovements.fontSize.options.length - 1) {
    UIImprovements.fontSize.current = UIImprovements.fontSize.options[idx + 1];
    applyFontSize();
    saveUserPreferences();
  }
}

function decreaseFontSize() {
  var idx = UIImprovements.fontSize.options.indexOf(UIImprovements.fontSize.current);
  if (idx > 0) {
    UIImprovements.fontSize.current = UIImprovements.fontSize.options[idx - 1];
    applyFontSize();
    saveUserPreferences();
  }
}

function resetFontSize() {
  UIImprovements.fontSize.current = 14;
  applyFontSize();
  saveUserPreferences();
}

function applyFontSize() {
  var root = document.documentElement;
  root.style.fontSize = UIImprovements.fontSize.current + 'px';
}

function loadUserPreferences() {
  var savedFont = localStorage.getItem('ui-font-size');
  if (savedFont) {
    var size = parseInt(savedFont);
    if (UIImprovements.fontSize.options.includes(size)) {
      UIImprovements.fontSize.current = size;
      applyFontSize();
    }
  }
  initTheme();
}

function saveUserPreferences() {
  localStorage.setItem('ui-font-size', UIImprovements.fontSize.current);
  localStorage.setItem('ui-theme', UIImprovements.theme.current);
}

// ========== NAVIGATION FUNCTIONS ==========
function scrollToSection(chapterId) {
  if (window.App && App.navigateTo) {
    App.navigateTo(chapterId);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== READING TIME ==========
function startReadingTime() {
  const now = Date.now();
  if (!localStorage.getItem('reading-start')) {
    localStorage.setItem('reading-start', now);
  }
}

function getReadingStats() {
  var start = parseInt(localStorage.getItem('reading-start') || '0');
  if (!start) return null;
  
  var duration = Math.floor((Date.now() - start) / 1000 / 60);
  var chaptersCompleted = JSON.parse(localStorage.getItem('completed-chapters') || '[]');
  
  return {
    minutes: duration,
    chapters: chaptersCompleted.length,
    avgMinutesPerChapter: chaptersCompleted.length > 0 ? Math.round(duration / chaptersCompleted.length) : 0
  };
}

// ========== NAVIGATION FUNCTIONS ==========
function jumpToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function jumpBack() {
  var history = JSON.parse(localStorage.getItem('nav-history') || '[]');

  if (history.length > 1) {
    var prev = history[history.length - 2];
    if (window.App && App.navigateTo) {
      App.navigateTo(prev);
    }
  }
}

// ========== SEARCH ==========
function executeSearch(query) {
  var results = [];
  
  if (!query || query.length < 2) {
    return results;
  }
  
  var q = query.toLowerCase();
  
  if (typeof Chapters !== 'undefined') {
    for (var id in Chapters) {
      if (id === 'welcome') continue;
      var content = Chapters[id]().toLowerCase();
      if (content.indexOf(q) !== -1) {
        results.push({ id: id, type: 'chapter', relevance: 1 });
      }
    }
  }
  
  return results.slice(0, 10);
}

function renderSearchBar(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  
  var html = '<div class="search-container">';
  html += '<input type="text" id="global-search-input" class="search-input" placeholder="Suchen..." />';
  html += '<button id="search-btn" class="search-btn">&#128269;</button>';
  html += '</div>';
  html += '<div id="search-results" class="search-results"></div>';
  container.innerHTML = html;
  
  var input = document.getElementById('global-search-input');
  var results = document.getElementById('search-results');
  
  input.addEventListener('input', function() {
    var query = this.value.trim();
    if (query.length >= 2) {
      var res = executeSearch(query);
      renderSearchResults(res, query);
    } else {
      results.innerHTML = '';
    }
  });
  
  document.getElementById('search-btn').addEventListener('click', function() {
    var query = input.value.trim();
    if (query.length >= 2) {
      var res = executeSearch(query);
      renderSearchResults(res, query);
    }
  });
}

function renderSearchResults(results, query) {
  var container = document.getElementById('search-results');
  if (!container || !results.length) {
    container.innerHTML = '<div class="search-no-results">Keine Ergebnisse für "' + query + '"</div>';
    return;
  }
  
  var html = '<div class="search-results-list">';
  for (var i = 0; i < results.length; i++) {
    var r = results[i];
    html += '<div class="search-result-item" data-id="' + r.id + '" onclick="UIImprovements.navigateToResult(\'' + r.id + '\', \'' + r.type + '\')">';
    html += '<span class="result-type">' + (r.type === 'chapter' ? 'Kapitel' : 'Seite') + '</span>';
    html += '<span class="result-title">' + r.id.replace('ch', 'Kapitel ') + '</span>';
    html += '</div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

UIImprovements.navigateToResult = function(id, type) {
  if (type === 'chapter' || type === 'section') {
    var chapterId = id.split('-').length > 1 && Chapters[id] ? id : id.split('-')[0] + '-' + id.split('-').slice(1).join('-');
    if (window.App && App.navigateTo) {
      App.navigateTo(chapterId || id);
    }
  }

  var resultsContainer = document.getElementById('search-results');
  if (resultsContainer) resultsContainer.innerHTML = '';
  
  var input = document.getElementById('global-search-input');
  if (input) input.value = '';
};

// ========== TABLE OF CONTENTS ==========
function renderTOC() {
  var tocContainer = document.getElementById('toc-container');
  if (!tocContainer) return;
  
  var html = '<div class="toc">';
  html += '<h3>Inhaltsverzeichnis</h3>';
  
  var navItems = window.App && window.App.navItems ? window.App.navItems : [];
  var currentSection = '';
  
  for (var i = 0; i < navItems.length; i++) {
    var item = navItems[i];
    if (item.section !== currentSection) {
      if (currentSection !== '') html += '</ul>';
      html += '<h4>' + item.section + '</h4>';
      html += '<ul class="toc-section">';
      currentSection = item.section;
    }
    html += '<li><a href="#' + item.id + '" onclick="UIImprovements.goToChapter(\'' + item.id + '\')">' + item.label + '</a></li>';
  }
  if (currentSection !== '') html += '</ul>';
  html += '</div>';
  
  tocContainer.innerHTML = html;
}

function toggleTOC() {
  var toc = document.getElementById('toc-container');
  if (toc) {
    toc.style.display = toc.style.display === 'none' ? 'block' : 'none';
  }
}

UIImprovements.goToChapter = function(chapterId) {
  if (window.App && App.navigateTo) {
    App.navigateTo(chapterId);
  }
  toggleTOC();
};

// ========== PRINT FUNCTIONS ==========
function printPage() {
  window.print();
}

// ========== ACCESSIBILITY ==========
function enableAccessibilityMode() {
  var html = document.documentElement;
  html.setAttribute('lang', 'de');
  html.setAttribute('aria-label', 'Netzwerktechnik Lab');
  
  var buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    if (!buttons[i].getAttribute('aria-label')) {
      buttons[i].setAttribute('aria-label', buttons[i].textContent);
    }
  }
}

// ========== NAVIGATION HISTORY ==========
function saveNavHistory(chapterId) {
  var history = JSON.parse(localStorage.getItem('nav-history') || '[]');
  history.push(chapterId);
  if (history.length > 10) history.shift();
  localStorage.setItem('nav-history', JSON.stringify(history));
}

// ========== EXPORT ==========
window.UIImprovements = UIImprovements;
window.toggleTheme = toggleTheme;
window.increaseFontSize = increaseFontSize;
window.decreaseFontSize = decreaseFontSize;
window.resetFontSize = resetFontSize;
window.jumpToTop = jumpToTop;
window.jumpBack = jumpBack;
window.executeSearch = executeSearch;
window.toggleTOC = toggleTOC;
window.printPage = printPage;
window.initTheme = initTheme;
window.loadUserPreferences = loadUserPreferences;
window.enableAccessibilityMode = enableAccessibilityMode;
window.renderSearchBar = renderSearchBar;
window.renderSearchResults = renderSearchResults;
window.renderTOC = renderTOC;
window.saveNavHistory = saveNavHistory;

})();