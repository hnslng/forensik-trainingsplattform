// ========== UI-VERBESSERUNGEN ==========
const UIImprovements = {
  search: {
    query: '',
    results: [],
    isSearching: false
  },

  theme: {
    current: 'dark', // 'dark' or 'light'
    prefersDark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  },

  fontSize: {
    current: 14, // 12, 13, 14 (default), 15, 16, 18
    options: [12, 13, 14, 15, 16, 18]
  },

  toc: {
    expanded: false,
    items: []
  },

  readingTime: {
    start: null,
    elapsed: 0,
    interval: null
  }
};

// ========== SEARCH-FUNKTIONEN ==========
function performSearch(query) {
  if (!query || query.length < 2) {
    UIImprovements.search.results = [];
    return;
  }

  query = query.toLowerCase();
  var results = [];

  var navItems = App.navItems || [];
  navItems.forEach(function(item) {
    var chapterId = item.id;
    var contentFn = Chapters[chapterId] || Labs[chapterId];
    if (!contentFn) return;

    var content = contentFn();
    var title = (content.match(/<h1[^>]*>(.*?)<\/h1>/) || ['', ''])[1].toLowerCase();
    var text = content.replace(/<[^>]+>/g, '').toLowerCase();

    if (title.includes(query) || text.includes(query)) {
      results.push({
        type: 'chapter',
        id: chapterId,
        title: (content.match(/<h1[^>]*>(.*?)<\/h1>/) || ['', ''])[1],
        section: item.section
      });
    }

    var sections = content.match(/<h2[^>]*>(.*?)<\/h2>/g) || [];
    sections.forEach(function(section) {
      var sectionTitle = (section.match(/<h2[^>]*>(.*?)<\/h2>/) || ['', ''])[1];
      if (sectionTitle.toLowerCase().includes(query)) {
        results.push({
          type: 'section',
          id: chapterId,
          title: sectionTitle,
          section: sectionTitle,
          sectionType: 'heading'
        });
      }
    });
  });

  UIImprovements.search.results = results;
  UIImprovements.search.query = query;
  UIImprovements.search.isSearching = false;

  saveSearchHistory(query);
}

function saveSearchHistory(query) {
  if (!query) return;

  let history = JSON.parse(localStorage.getItem('search-history') || '[]');

  // Duplikate entfernen
  history = history.filter(h => h !== query);
  history.unshift(query);

  // Maximal 20 Einträge
  if (history.length > 20) history.pop();

  localStorage.setItem('search-history', JSON.stringify(history));
}

function getSearchHistory() {
  return JSON.parse(localStorage.getItem('search-history') || '[]');
}

// ========== THEME-FUNKTIONEN ==========
function toggleTheme() {
  const newTheme = UIImprovements.theme.current === 'dark' ? 'light' : 'dark';

  UIImprovements.theme.current = newTheme;
  localStorage.setItem('theme', newTheme);

  applyTheme(newTheme);
  saveUserPreferences();
}

function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === 'dark') {
    root.classList.remove('theme-light');
    root.classList.add('theme-dark');
  } else {
    root.classList.remove('theme-dark');
    root.classList.add('theme-light');
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';

  // Wenn gespeichert, nutzen wir das
  if (savedTheme !== 'auto') {
    UIImprovements.theme.current = savedTheme;
    applyTheme(savedTheme);
  } else {
    // System-Präferenz nutzen
    if (UIImprovements.theme.prefersDark) {
      UIImprovements.theme.current = 'dark';
      applyTheme('dark');
    } else {
      UIImprovements.theme.current = 'light';
      applyTheme('light');
    }
  }
}

// ========== FONT-SIZE-FUNKTIONEN ==========
function increaseFontSize() {
  const currentIndex = UIImprovements.fontSize.options.indexOf(UIImprovements.fontSize.current);

  if (currentIndex < UIImprovements.fontSize.options.length - 1) {
    UIImprovements.fontSize.current = UIImprovements.fontSize.options[currentIndex + 1];
  }

  applyFontSize();
  saveUserPreferences();
}

function decreaseFontSize() {
  const currentIndex = UIImprovements.fontSize.options.indexOf(UIImprovements.fontSize.current);

  if (currentIndex > 0) {
    UIImprovements.fontSize.current = UIImprovements.fontSize.options[currentIndex - 1];
  }

  applyFontSize();
  saveUserPreferences();
}

function resetFontSize() {
  UIImprovements.fontSize.current = 14; // Standardgröße
  applyFontSize();
  saveUserPreferences();
}

function applyFontSize() {
  document.body.style.fontSize = UIImprovements.fontSize.current + 'px';
}

// ========== TOC-FUNKTIONEN ==========
function generateTOC() {
  var navItems = App.navItems || [];
  var toc = [];

  navItems.forEach(function(item) {
    var contentFn = Chapters[item.id] || Labs[item.id];
    if (!contentFn) return;

    var content = contentFn();

    var chapterItem = {
      type: 'chapter',
      id: item.id,
      title: (content.match(/<h1[^>]*>(.*?)<\/h1>/) || ['', ''])[1],
      section: item.section
    };

    toc.push(chapterItem);

    var sections = content.match(/<h2[^>]*>(.*?)<\/h2>/g) || [];
    sections.forEach(function(section) {
      var sectionTitle = (section.match(/<h2[^>]*>(.*?)<\/h2>/) || ['', ''])[1];
      var sectionId = (sectionTitle.toLowerCase().replace(/\s+/g, '-'));

      toc.push({
        type: 'section',
        id: item.id + '-' + sectionId,
        title: sectionTitle,
        chapterId: item.id
      });
    });
  });

  UIImprovements.toc.items = toc;
  return toc;
}

function toggleTOC() {
  UIImprovements.toc.expanded = !UIImprovements.toc.expanded;
  renderTOC();
}

function scrollToSection(chapterId) {
  if (window.App && App.navigateTo) {
    App.navigateTo(chapterId);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== READING TIME ==========
function startReadingTime() {
  const now = Date.now();
  UIImprovements.readingTime.start = now;
  UIImprovements.readingTime.elapsed = 0;

  // Interval starten
  if (UIImprovements.readingTime.interval) {
    clearInterval(UIImprovements.readingTime.interval);
  }

  UIImprovements.readingTime.interval = setInterval(() => {
    const elapsed = Date.now() - UIImprovements.readingTime.start;
    UIImprovements.readingTime.elapsed = Math.floor(elapsed / 1000);

    // Reading-Time-Display aktualisieren
    updateReadingTimeDisplay();
  }, 1000);
}

function stopReadingTime() {
  if (UIImprovements.readingTime.interval) {
    clearInterval(UIImprovements.readingTime.interval);
    UIImprovements.readingTime.interval = null;
  }
}

function updateReadingTimeDisplay() {
  const display = document.getElementById('reading-time-display');
  if (!display) return;

  const minutes = Math.floor(UIImprovements.readingTime.elapsed / 60);
  const seconds = UIImprovements.readingTime.elapsed % 60;

  if (minutes > 0) {
    display.textContent = `🕱 ${minutes}:${seconds.toString().padStart(2, '0')}`;
  } else {
    display.textContent = `🕱 ${seconds}s`;
  }
}

// ========== NAVIGATIONS-FUNKTIONEN ==========
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

function saveNavHistory(chapterId) {
  const history = JSON.parse(localStorage.getItem('nav-history') || '[]');

  // Duplikate entfernen
  const filtered = history.filter(id => id !== chapterId);
  filtered.push(chapterId);

  // Maximal 50 Einträge
  if (filtered.length > 50) filtered.shift();

  localStorage.setItem('nav-history', JSON.stringify(filtered));
}

// ========== PREFERENCES ==========
function saveUserPreferences() {
  const preferences = {
    theme: UIImprovements.theme.current,
    fontSize: UIImprovements.fontSize.current,
    searchHistory: getSearchHistory(),
    navHistory: JSON.parse(localStorage.getItem('nav-history') || '[]'),
    readingTime: UIImprovements.readingTime.elapsed
  };

  localStorage.setItem('user-preferences', JSON.stringify(preferences));
}

function loadUserPreferences() {
  const preferences = JSON.parse(localStorage.getItem('user-preferences') || '{}');

  // Theme laden
  if (preferences.theme) {
    UIImprovements.theme.current = preferences.theme;
    applyTheme(preferences.theme);
  }

  // Font Size laden
  if (preferences.fontSize) {
    UIImprovements.fontSize.current = preferences.fontSize;
    applyFontSize();
  }

  // Search-History laden
  if (preferences.searchHistory) {
    UIImprovements.search.history = preferences.searchHistory;
  }
}

// ========== PRINT-FUNKTIONEN ==========
function printPage() {
  window.print();
}

// ========== ACCESSIBILITY ==========
function enableAccessibilityMode() {
  // ARIA-Labels hinzufügen
  const buttons = document.querySelectorAll('button, .nav-btn, .lab-btn');
  buttons.forEach(btn => {
    if (!btn.hasAttribute('aria-label')) {
      const text = btn.textContent.trim();
      btn.setAttribute('aria-label', text);
    }
  });

  // Keyboard-Navigation aktivieren
  document.addEventListener('keydown', handleKeyboardShortcuts);
}

function handleKeyboardShortcuts(e) {
  // Strg/Cmd + K für Suche
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }

  // Escape um Modale zu schließen
  if (e.key === 'Escape') {
    closeModals();
  }

  // Strg/Cmd + F für Vollbild
  if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
    e.preventDefault();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
}

function closeModals() {
  // Alle offenen Modale schließen
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    modal.classList.remove('active');
  });
}

// ========== UI-RENDERING ==========
function renderSearchBar() {
  const searchHistory = getSearchHistory();

  let html = '<div class="search-container">';
  html += '<div class="search-input-wrapper">';
  html += '<input type="text" id="search-input" placeholder="Suchen (Strg+K)..." autocomplete="off" aria-label="Suche">';
  html += '<button class="search-btn" onclick="executeSearch()" aria-label="Suchen">&#128269;</button>';
  html += '</div>';

  // Search-History Dropdown
  html += '<div class="search-history" id="search-history-dropdown">';
  searchHistory.forEach(query => {
    html += `<div class="search-history-item" onclick="searchFromHistory('${query}')" aria-label="Suche: ${query}">${query}</div>`;
  });
  html += '</div></div>';

  // Search Results
  if (UIImprovements.search.query) {
    html += '<div class="search-results" id="search-results">';
    html += `<div class="search-results-header">${UIImprovements.search.results.length} Ergebnisse f&uuml;r "${UIImprovements.search.query}"</div>`;

    if (UIImprovements.search.results.length > 0) {
      html += '<div class="search-results-list">';
      UIImprovements.search.results.forEach(result => {
        const icon = result.type === 'chapter' ? '📚' : '🔍';
        html += `<div class="search-result-item" onclick="navigateToSearchResult('${result.type}', '${result.id}')" aria-label="${result.title}">`;
        html += `<span class="search-result-icon">${icon}</span>`;
        html += `<span class="search-result-title">${result.title}</span>`;
        if (result.section) {
          html += `<span class="search-result-section">${result.section}</span>`;
        }
        html += '</div>';
      });
      html += '</div>';
    } else {
      html += '<div class="search-results-empty">Keine Ergebnisse gefunden.</div>';
    }

    html += '</div>';
  } else {
    html += '<div class="search-results" id="search-results" style="display:none;"></div>';
  }

  html += '</div>';

  return html;
}

function renderSearchResults() {
  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;

  const resultsCount = UIImprovements.search.results.length;
  const query = UIImprovements.search.query;

  if (!query) {
    resultsContainer.style.display = 'none';
    return;
  }

  let html = `<div class="search-results-header">${resultsCount} Ergebnisse f&uuml;r "${query}"</div>`;

  if (resultsCount > 0) {
    html += '<div class="search-results-list">';
    UIImprovements.search.results.forEach(result => {
      const icon = result.type === 'chapter' ? '📚' : '🔍';
      html += `<div class="search-result-item" onclick="navigateToSearchResult('${result.type}', '${result.id}')" aria-label="${result.title}">`;
      html += `<span class="search-result-icon">${icon}</span>`;
      html += `<span class="search-result-title">${result.title}</span>`;
      if (result.section) {
        html += `<span class="search-result-section">${result.section}</span>`;
      }
      html += '</div>';
    });
    html += '</div>';
  } else {
    html += '<div class="search-results-empty">Keine Ergebnisse gefunden.</div>';
  }

  resultsContainer.innerHTML = html;
}

function renderTOC() {
  const toc = generateTOC();

  let html = '<div class="toc-container" id="toc-container">';
  html += '<div class="toc-header">';
  html += '<span class="toc-title">Inhalt</span>';
  html += `<button class="toc-close-btn" onclick="toggleTOC()" aria-label="Inhaltsverzeichnis schlie&szlig;en">&times;</button>`;
  html += '</div>';

  if (UIImprovements.toc.expanded) {
    html += '<div class="toc-list" id="toc-list">';
    html += '<div class="toc-section">Kapitel</div>';
    toc.filter(function(item) { return item.type === 'chapter'; }).forEach(function(item) {
      var icon = (App.navItems || []).find(function(n) { return n.id === item.id; });
      icon = icon ? icon.icon : '📖';
      html += '<div class="toc-item" onclick="navigateToSearchResult(\'chapter\', \'' + item.id + '\')" aria-label="' + item.title + '">';
      html += `<span class="toc-icon">${icon}</span>`;
      html += `<span class="toc-title">${item.title}</span>`;
      html += `<span class="toc-section">${item.section}</span>`;
      html += '</div>';
    });
    html += '</div>';

    // Abschnitte
    const sections = toc.filter(item => item.type === 'section');
    if (sections.length > 0) {
      html += '<div class="toc-section">Abschnitte</div>';
      sections.forEach(item => {
        html += `<div class="toc-item" onclick="navigateToSearchResult('section', '${item.id}')" aria-label="${item.title}">`;
        html += `<span class="toc-icon">🔍</span>`;
        html += `<span class="toc-title">${item.title}</span>`;
        html += `<span class="toc-section">in ${item.chapterId}</span>`;
        html += '</div>';
      });
    }
    html += '</div>';
  } else {
    html += '<div class="toc-list" style="display:none;"></div>';
  }

  html += '</div>';

  return html;
}

// ========== EVENT HANDLER ==========
function executeSearch() {
  const query = document.getElementById('search-input').value.trim();

  if (query.length < 2) {
    alert('Bitte mindestens 2 Zeichen eingeben.');
    return;
  }

  performSearch(query);
  renderSearchResults();
}

function searchFromHistory(query) {
  document.getElementById('search-input').value = query;
  executeSearch();
}

function navigateToSearchResult(type, id) {
  if (type === 'chapter' || type === 'section') {
    var chapterId = id.split('-').length > 1 && Chapters[id] ? id : id.split('-')[0] + '-' + id.split('-').slice(1).join('-');
    if (window.App && App.navigateTo) {
      App.navigateTo(chapterId || id);
    }
  }

  var resultsContainer = document.getElementById('search-results');
  if (resultsContainer) {
    resultsContainer.style.display = 'none';
  }

  startReadingTime();
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
