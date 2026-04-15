var App = (function () {
  var currentChapter = null;
  var panelTerminal = null;
  var currentSlide = 0;
  var totalSlides = 0;
  var slides = [];
  var navItems = [];

  // Get lab config
  var labId = window.LAB_CONFIG ? window.LAB_CONFIG.labId : 'netzwerk';
  var labTitle = window.LAB_CONFIG ? window.LAB_CONFIG.title : 'Lab';
  var labSubtitle = window.LAB_CONFIG ? window.LAB_CONFIG.subtitle : 'Interaktives Training';
  var labIcon = window.LAB_CONFIG ? window.LAB_CONFIG.icon : '&#x1F310;';
  var baseUrl = window.LAB_CONFIG ? window.LAB_CONFIG.baseUrl : '';

  function escapeHtml(s) {
    if (!s) return '';
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function init() {
    // Update UI with lab info
    document.getElementById("lab-title").innerHTML = labIcon + ' ' + labTitle;
    document.getElementById("lab-subtitle").textContent = labSubtitle;
    document.querySelector("#breadcrumb span").textContent = labTitle.toUpperCase();

    // Load chapters
    fetch(baseUrl + '/api/labs/' + labId + '/chapters')
      .then(r => r.json())
      .then(data => {
        navItems = data.chapters || [];
        renderNav();
        handleRoute();
      })
      .catch(err => {
        console.error('Failed to load chapters:', err);
        navItems = [];
        renderNav();
      });

    // Setup terminal
    panelTerminal = new InteractiveTerminal(document.getElementById("terminal-container"));
    if (window.LAB_CONFIG && window.LAB_CONFIG.terminalMode) {
      panelTerminal.setMode(window.LAB_CONFIG.terminalMode);
    }

    // Bind events
    bindEvents();
  }

  function renderNav() {
    var navEl = document.getElementById("sidebar-nav");
    if (!navEl) return;

    var html = '';
    var currentSection = '';
    
    for (var i = 0; i < navItems.length; i++) {
      var item = navItems[i];
      if (item.section && item.section !== currentSection) {
        if (currentSection) html += '</div>';
        html += '<div class="nav-section"><div class="nav-section-title">' + escapeHtml(item.section) + '</div>';
        currentSection = item.section;
      }
      
      var completed = Progress.isCompleted(item.id);
      html += '<div class="nav-item' + (completed ? ' completed' : '') + '" data-chapter="' + item.id + '">';
      if (item.icon) html += '<span class="nav-item-icon">' + item.icon + '</span>';
      html += '<span class="nav-item-label">' + escapeHtml(item.title || item.label) + '</span>';
      if (completed) html += '<span class="nav-item-check">&#10003;</span>';
      html += '</div>';
    }
    if (currentSection) html += '</div>';
    
    navEl.innerHTML = html;

    // Highlight current chapter
    highlightNav(currentChapter);
  }

  function handleRoute() {
    var hash = window.location.hash.replace("#", "") || "welcome";
    if (hash === "welcome") {
      showWelcome();
    } else {
      loadChapter(hash);
    }
  }

  function showWelcome() {
    var content = document.getElementById("content");
    if (!content) return;
    
    content.innerHTML = '<div class="welcome-screen">' +
      '<h1>' + labIcon + ' ' + labTitle + '</h1>' +
      '<p class="welcome-subtitle">' + labSubtitle + '</p>' +
      '<div class="welcome-modules">';
    
    // Group chapters by section
    var sections = {};
    for (var i = 0; i < navItems.length; i++) {
      var item = navItems[i];
      if (!sections[item.section]) sections[item.section] = [];
      sections[item.section].push(item);
    }
    
    var sectionIdx = 1;
    for (var section in sections) {
      if (section === "Start") continue;
      var firstChapter = sections[section][0];
      content.innerHTML += 
        '<div class="welcome-module" onclick="App.navigateTo(\'' + firstChapter.id + '\')">' +
        '<div class="welcome-module-left"><span class="welcome-module-num">' + (sectionIdx < 10 ? '0' + sectionIdx : sectionIdx) + '</span></div>' +
        '<div class="welcome-module-body"><h2>' + escapeHtml(section) + '</h2><p>' + 
        sections[section].map(function(it) { return escapeHtml(it.title || it.label); }).join(', ') + '</p></div>' +
        '<span class="welcome-module-arrow">&rarr;</span></div>';
      sectionIdx++;
    }
    
    content.innerHTML += '</div></div>';
    updateBreadcrumb("welcome");
    highlightNav(null);
  }

  function loadChapter(chapterId) {
    fetch(baseUrl + '/api/labs/' + labId + '/chapters/' + chapterId)
      .then(r => r.json())
      .then(data => {
        currentChapter = chapterId;
        MarkdownLoader.render(data.content, function (html) {
          var content = document.getElementById("content");
          if (!content) return;
          
          content.innerHTML = html;
          slides = MarkdownLoader.getSlides();
          totalSlides = slides.length;
          currentSlide = 0;
          
          // Add navigation if multiple slides
          if (totalSlides > 1) {
            addSlideNavigation();
          }
          
          bindContentEvents();
          updateBreadcrumb(chapterId);
          highlightNav(chapterId);
          
          // Auto-open terminal on exercise slides (DISABLED for now)
          // var firstSlide = slides[0] || '';
          // if (firstSlide.includes('exercise-start-banner')) {
          //   setTimeout(function() {
          //     document.getElementById("terminal-toggle").click();
          //   }, 800);
          // }
        });
      })
      .catch(err => {
        console.error('Failed to load chapter:', err);
        document.getElementById("content").innerHTML = '<div class="error">Kapitel konnte nicht geladen werden.</div>';
      });
  }

  function addSlideNavigation() {
    var container = document.getElementById("slide-nav-topbar");
    if (!container) return;
    
    var navHtml = '<button class="slide-prev" onclick="App._prevSlide()">&lsaquo; Zur&uuml;ck</button>';
    navHtml += '<span class="slide-counter">' + (currentSlide + 1) + ' / ' + totalSlides + '</span>';
    navHtml += '<button class="slide-next slide-next-primary" onclick="App._nextSlide()">Weiter &rsaquo;</button>';
    
    container.innerHTML = navHtml;
  }

  function navigateSlide(delta) {
    var newSlide = currentSlide + delta;
    if (newSlide < 0 || newSlide >= totalSlides) return;
    
    currentSlide = newSlide;
    var content = document.getElementById("content");
    if (!content) return;
    
    content.innerHTML = slides[currentSlide];
    bindContentEvents();
    
    // Update navigation counter
    var counter = document.querySelector(".slide-counter");
    if (counter) counter.textContent = (currentSlide + 1) + ' / ' + totalSlides;
    
    // Scroll to top
    var mainContent = document.getElementById("main-content");
    if (mainContent) mainContent.scrollTop = 0;
  }

  function bindEvents() {
    // Sidebar navigation
    var navEl = document.getElementById("sidebar-nav");
    if (navEl) {
      navEl.addEventListener("click", function (e) {
        var item = e.target.closest(".nav-item");
        if (item) {
          navigateTo(item.getAttribute("data-chapter"));
        }
      });
    }

    // Sidebar tabs
    var tabs = document.querySelectorAll(".sidebar-tab");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", function () {
        var tab = this.getAttribute("data-tab");
        document.querySelectorAll(".sidebar-tab").forEach(function (t) {
          t.classList.remove("active");
        });
        this.classList.add("active");
        document.querySelectorAll(".sidebar-tab-content").forEach(function (c) {
          c.classList.remove("active");
        });
        document.getElementById("sidebar-tab-" + tab).classList.add("active");
      });
    }

    // Terminal toggle
    var termToggle = document.getElementById("terminal-toggle");
    if (termToggle) {
      termToggle.addEventListener("click", toggleTerminal);
    }
    
    // Mobile sidebar
    var overlay = document.getElementById("overlay");
    if (overlay) overlay.addEventListener("click", closeMobileSidebar);
    
    var menuToggle = document.getElementById("menu-toggle");
    if (menuToggle) {
      menuToggle.addEventListener("click", function () {
        var sidebar = document.getElementById("sidebar");
        if (sidebar) sidebar.classList.add("open");
        if (overlay) overlay.classList.add("active");
      });
    }
    
    var sidebarClose = document.getElementById("sidebar-close-mobile");
    if (sidebarClose) {
      sidebarClose.addEventListener("click", closeMobileSidebar);
    }
    
    // Reset progress
    var resetBtn = document.getElementById("reset-progress-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        if (confirm("Fortschritt wirklich zurücksetzen?")) {
          Progress.resetAll();
          renderNav();
        }
      });
    }

    // Hash change
    window.addEventListener("hashchange", handleRoute);
  }

  function toggleTerminal() {
    var termEl = document.getElementById("terminal-bottom");
    if (!termEl) return;
    termEl.classList.toggle("open");
    if (termEl.classList.contains("open")) {
      panelTerminal.focus();
    }
  }

  function closeMobileSidebar() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.remove("open");
    
    var overlay = document.getElementById("overlay");
    if (overlay) overlay.classList.remove("active");
  }

  function updateBreadcrumb(chapterId) {
    var item = null;
    for (var i = 0; i < navItems.length; i++) {
      if (navItems[i].id === chapterId) { item = navItems[i]; break; }
    }
    var bc = document.getElementById("breadcrumb");
    if (bc) {
      bc.innerHTML = '<span style="cursor:pointer" onclick="App.navigateTo(\'welcome\')">' + 
        labTitle.toUpperCase() + '</span> / ' + 
        escapeHtml(item ? (item.title || item.label) : "Willkommen");
    }
  }

  function highlightNav(chapterId) {
    var items = document.querySelectorAll(".nav-item");
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle("active", items[i].getAttribute("data-chapter") === chapterId);
    }
  }

  function bindContentEvents() {
    var scope = document.querySelector(".slide.active") || document.getElementById("content");
    if (!scope) return;
    
    // Copy buttons
    var copyBtns = scope.querySelectorAll(".copy-btn");
    for (var i = 0; i < copyBtns.length; i++) {
      copyBtns[i].addEventListener("click", function () {
        var code = this.closest(".code-block").querySelector("code");
        if (code) {
          navigator.clipboard.writeText(code.textContent).then(function () {
            var btn = this;
            btn.textContent = "Kopiert!";
            btn.classList.add("copied");
            setTimeout(function () {
              btn.textContent = "Kopieren";
              btn.classList.remove("copied");
            }, 2000);
          }.bind(this));
        }
      });
    }
    
    // Navigation buttons within content
    var navBtns = scope.querySelectorAll(".nav-btn[data-target]");
    for (var j = 0; j < navBtns.length; j++) {
      navBtns[j].addEventListener("click", function () {
        navigateTo(this.getAttribute("data-target"));
      });
    }
    
    // Complete chapter button
    var completeBtn = scope.querySelector(".complete-section-btn");
    if (completeBtn) {
      completeBtn.addEventListener("click", function () {
        if (currentChapter) {
          Progress.markCompleted(currentChapter);
          renderNav();
          this.textContent = "✓ Abgeschlossen";
          this.disabled = true;
        }
      });
    }
  }

  function navigateTo(chapterId) {
    window.location.hash = chapterId;
  }

  return {
    init: init,
    navigateTo: navigateTo,
    _prevSlide: function () { navigateSlide(-1); },
    _nextSlide: function () { navigateSlide(1); }
  };
})();

// Progress system
var Progress = (function () {
  var PREFIX = "lab-progress-";
  return {
    isCompleted: function (id) { 
      return localStorage.getItem(PREFIX + id) === "1"; 
    },
    markCompleted: function (id) { 
      localStorage.setItem(PREFIX + id, "1"); 
    },
    resetAll: function () {
      var keys = [];
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith(PREFIX)) keys.push(localStorage.key(i));
      }
      keys.forEach(function (k) { localStorage.removeItem(k); });
    }
  };
})();

// Make App global
window.App = App;

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", App.init);
