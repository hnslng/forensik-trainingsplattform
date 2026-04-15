var App = (function () {
  var currentChapter = null;
  var panelTerminal = null;
  var currentSlide = 0;
  var totalSlides = 0;
  var slides = [];

  var navItems = [
    { id: "welcome", label: "Willkommen", icon: "&#8962;", section: "Start" },
    { id: "ch01-osi", label: "OSI & TCP/IP", icon: "&#9881;", section: "Grundlagen" },
    { id: "ch02-geraete", label: "Netzwerkger&auml;te", icon: "&#128269;", section: "Grundlagen" },
    { id: "ch03-ipv4", label: "IPv4 & Subnetting", icon: "&#127760;", section: "Grundlagen" },
    { id: "ch04-ipv6", label: "IPv6", icon: "&#127760;", section: "Grundlagen" },
    { id: "ch05-mac-arp", label: "MAC & ARP", icon: "&#128269;", section: "Grundlagen" },
    { id: "ch06-tcp-udp", label: "TCP & UDP", icon: "&#128270;", section: "Protokolle" },
    { id: "ch07-dns", label: "DNS", icon: "&#128270;", section: "Protokolle" },
    { id: "ch08-dhcp", label: "DHCP", icon: "&#128270;", section: "Protokolle" },
    { id: "ch09-http", label: "HTTP & HTTPS", icon: "&#128270;", section: "Protokolle" },
    { id: "ch10-verschluesselung", label: "Verschlüsselung", icon: "&#128274;", section: "Protokolle" },
    { id: "ch11-icmp", label: "ICMP & Troubleshooting", icon: "&#9888;", section: "Protokolle" },
    { id: "ch12-linux-tools", label: "Linux-Netzwerk-Tools", icon: "&#128187;", section: "Praxis" },
    { id: "ch13-routing", label: "Routing & Gateway", icon: "&#128736;", section: "Praxis" },
    { id: "ch14-firewall", label: "Firewall-Grundlagen", icon: "&#128737;", section: "Praxis" },
    { id: "ch15-wireshark", label: "Wireshark & tshark", icon: "&#128187;", section: "Praxis" },
    { id: "ch16-casestudy", label: "Case Study", icon: "&#9888;", section: "Abschluss" }
  ];

  function init() {
    buildSidebar();
    renderReferenceSidebar();
    bindGlobalEvents();
    handleRoute();
    window.addEventListener("hashchange", handleRoute);
    var mc = document.getElementById("main-content");
    if (mc) mc.addEventListener("scroll", updateScrollFade);
  }

  function renderReferenceSidebar() {
    var body = document.getElementById("reference-body");
    if (!body || typeof Reference === "undefined" || !Reference.sections) return;
    var html = '<div class="ref-search-wrap"><input type="text" class="ref-search" id="ref-search-input" placeholder="Befehl suchen..."></div>';
    html += '<div class="ref-commands-list" id="ref-commands-list"></div>';
    html += '<div class="ref-detail-panel" id="ref-detail-panel" style="display:none"><button class="ref-detail-close" id="ref-detail-close">&times;</button><div id="ref-detail-content"></div></div>';
    body.innerHTML = html;
    var allCommands = [];
    for (var i = 0; i < Reference.sections.length; i++) {
      var sec = Reference.sections[i];
      var tmp = document.createElement("div");
      tmp.innerHTML = sec.html();
      var headings = tmp.querySelectorAll(".s-heading");
      var codes = tmp.querySelectorAll(".s-code pre code");
      var forSection = [];
      for (var h = 0; h < headings.length; h++) {
        var cmdText = headings[h].textContent.trim();
        var codeText = codes[h] ? codes[h].textContent.trim().split("\n")[0] : "";
        forSection.push({ label: cmdText, code: codeText, sectionId: sec.id, sectionTitle: sec.title, headingIdx: h });
      }
      if (forSection.length === 0) {
        var inlineCmds = tmp.querySelectorAll(".s-inline");
        var seen = {};
        for (var ic = 0; ic < inlineCmds.length; ic++) {
          var val = inlineCmds[ic].textContent.trim();
          if (!seen[val] && val.length > 1 && val.length < 40 && !val.match(/^\/[a-z]/)) {
            seen[val] = true;
            allCommands.push({ label: val, code: "", sectionId: sec.id, sectionTitle: sec.title, headingIdx: -1 });
          }
        }
      } else {
        for (var f = 0; f < forSection.length; f++) allCommands.push(forSection[f]);
      }
    }
    var listEl = document.getElementById("ref-commands-list");
    var chipsHtml = "";
    for (var a = 0; a < allCommands.length; a++) {
      var cmd = allCommands[a];
      chipsHtml += '<div class="ref-cmd" data-sec="' + cmd.sectionId + '" data-hidx="' + cmd.headingIdx + '" title="' + escapeHtml(cmd.sectionTitle) + '">';
      chipsHtml += '<span class="ref-cmd-label">' + escapeHtml(cmd.label) + '</span>';
      if (cmd.code) chipsHtml += '<span class="ref-cmd-preview">' + escapeHtml(cmd.code) + '</span>';
      chipsHtml += '</div>';
    }
    listEl.innerHTML = chipsHtml;
    var cmds = listEl.querySelectorAll(".ref-cmd");
    for (var cc = 0; cc < cmds.length; cc++) {
      cmds[cc].addEventListener("click", function () {
        var secId = this.getAttribute("data-sec");
        var hidx = parseInt(this.getAttribute("data-hidx"));
        showRefDetail(secId, hidx);
      });
    }
    document.getElementById("ref-detail-close").addEventListener("click", function () {
      document.getElementById("ref-detail-panel").style.display = "none";
      document.getElementById("ref-commands-list").style.display = "";
    });
    var input = body.querySelector("#ref-search-input");
    if (input) {
      input.addEventListener("input", function () {
        var q = this.value.toLowerCase().trim();
        var items = listEl.querySelectorAll(".ref-cmd");
        for (var k = 0; k < items.length; k++) {
          var t = items[k].textContent.toLowerCase();
          items[k].style.display = (!q || t.indexOf(q) !== -1) ? "" : "none";
        }
      });
    }
  }

  function showRefDetail(secId, headingIdx) {
    var sec = null;
    for (var i = 0; i < Reference.sections.length; i++) {
      if (Reference.sections[i].id === secId) { sec = Reference.sections[i]; break; }
    }
    if (!sec) return;
    var tmp = document.createElement("div");
    tmp.innerHTML = sec.html();
    var content = "";
    if (headingIdx >= 0) {
      var headings = tmp.querySelectorAll(".s-heading");
      if (headings[headingIdx]) {
        var el = headings[headingIdx];
        var fragment = "";
        var sibling = el.nextSibling;
        while (sibling && sibling.nodeType !== 1 || (sibling.nodeType === 1 && !sibling.classList.contains("s-heading"))) {
          if (sibling.nodeType === 1) fragment += sibling.outerHTML;
          else if (sibling.nodeType === 3 && sibling.textContent.trim()) fragment += sibling.textContent;
          sibling = sibling.nextSibling;
          if (!sibling) break;
        }
        content = '<h4 class="ref-detail-title">' + headings[headingIdx].innerHTML + '</h4>' + fragment;
      }
    }
    if (!content) content = sec.html();
    document.getElementById("ref-detail-content").innerHTML = '<div class="ref-detail-section">' + escapeHtml(sec.title) + '</div>' + content;
    document.getElementById("ref-commands-list").style.display = "none";
    document.getElementById("ref-detail-panel").style.display = "";
  }

  function buildSidebar() {
    var nav = document.getElementById("sidebar-nav");
    var html = "";
    var curSec = "";
    var total = navItems.length;
    var done = 0;
    for (var i = 0; i < navItems.length; i++) {
      var item = navItems[i];
      if (item.section !== curSec) {
        if (curSec !== "") html += '<div style="height:8px"></div>';
        html += '<div class="nav-section-title">' + item.section + "</div>";
        curSec = item.section;
      }
      var completed = Progress.isCompleted(item.id);
      if (completed) done++;
      html += '<div class="nav-item' + (completed ? " completed" : "") +
        '" data-chapter="' + item.id + '">' +
        '<span class="nav-icon">' + item.icon + "</span>" +
        '<span class="nav-label">' + item.label + "</span>" +
        '<span class="nav-check">' + (completed ? "&#10003;" : "") + "</span></div>";
    }
    nav.innerHTML = html;
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;
    var bar = document.getElementById("progress-bar");
    var txt = document.getElementById("progress-text");
    if (bar) bar.style.width = pct + "%";
    if (txt) txt.textContent = done + " / " + total + " Kapitel abgeschlossen";
  }

  function bindGlobalEvents() {
    document.getElementById("sidebar-nav").addEventListener("click", function (e) {
      var item = e.target.closest(".nav-item");
      if (!item) return;
      navigateTo(item.getAttribute("data-chapter"));
      closeMobileSidebar();
    });

    // Sidebar tabs (like Forensik-Lab)
    var tabs = document.querySelectorAll(".sidebar-tab");
    for (var ti = 0; ti < tabs.length; ti++) {
      tabs[ti].addEventListener("click", function () {
        switchSidebarTab(this.getAttribute("data-tab"));
      });
    }

    document.getElementById("terminal-toggle").addEventListener("click", toggleTerminal);
    document.getElementById("overlay").addEventListener("click", closeMobileSidebar);

    // Init editor
    if (typeof ChapterEditor !== "undefined") ChapterEditor.init();

    document.getElementById("menu-toggle").addEventListener("click", function () {
      document.getElementById("sidebar").classList.toggle("open");
      document.getElementById("overlay").classList.toggle("active");
    });

    document.getElementById("sidebar-close-mobile").addEventListener("click", closeMobileSidebar);

    document.getElementById("reset-progress-btn").addEventListener("click", function () {
      if (confirm("Fortschritt wirklich zur\u00fccksetzen?")) {
        Progress.resetAll();
        buildSidebar();
        handleRoute();
      }
    });

    var resizeHandle = document.getElementById("terminal-resize-handle");
    if (resizeHandle) initTerminalResize(resizeHandle);

    document.addEventListener("keydown", function (e) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;
      if (totalSlides > 1) {
        if (e.key === "ArrowRight") navigateSlide(1);
        else if (e.key === "ArrowLeft") navigateSlide(-1);
      }
    });
  }

  function toggleTerminal() {
    var termEl = document.getElementById("terminal-bottom");
    if (!termEl) return;
    var wasOpen = termEl.classList.contains("open");
    if (wasOpen) {
      termEl.classList.remove("open");
    } else {
      termEl.classList.add("open");
      if (!panelTerminal) {
        panelTerminal = new InteractiveTerminal("terminal-container");
        panelTerminal.init();
      }
    }
    setTimeout(updateScrollFade, 350);
  }

  function initTerminalResize(handle) {
    var dragging = false;
    var startY, startH;
    var termEl = document.getElementById("terminal-bottom");
    handle.addEventListener("mousedown", function (e) {
      dragging = true;
      startY = e.clientY;
      startH = termEl.offsetHeight;
      document.body.style.cursor = "ns-resize";
      document.body.style.userSelect = "none";
      e.preventDefault();
    });
    document.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      var h = Math.max(150, Math.min(window.innerHeight * 0.7, startH + (startY - e.clientY)));
      termEl.style.height = h + "px";
      updateScrollFade();
    });
    document.addEventListener("mouseup", function () {
      if (dragging) {
        dragging = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        updateScrollFade();
      }
    });
  }

  function openTerminalWithCommand(cmd) {
    var termEl = document.getElementById("terminal-bottom");
    if (!termEl) return;
    if (!termEl.classList.contains("open")) {
      termEl.classList.add("open");
    }
    if (!panelTerminal) {
      panelTerminal = new InteractiveTerminal("terminal-container");
      panelTerminal.init();
    }
    if (panelTerminal.inputEl) {
      panelTerminal.inputEl.value = cmd;
      if (panelTerminal.updateMirror) panelTerminal.updateMirror();
      panelTerminal.inputEl.focus();
    }
  }

  function navigateTo(id) {
    window.location.hash = id;
  }

  function handleRoute() {
    loadChapter(window.location.hash.replace("#", "") || "welcome");
  }

  function loadChapter(chapterId) {
    currentChapter = chapterId;
    currentSlide = 0;
    totalSlides = 0;
    slides = [];
    var el = document.getElementById("content");

    if (chapterId === "welcome") {
      el.innerHTML = '<div class="fade-in">' + renderWelcome() + "</div>";
      updateBreadcrumb(chapterId);
      highlightNav(chapterId);
      bindContentEvents();
      injectTryButtons();
      var mc = document.getElementById("main-content"); if (mc) mc.scrollTop = 0;
      return;
    }

    MarkdownLoader.loadChapter(chapterId, function (html) {
      if (!html) {
        el.innerHTML = '<div class="fade-in">' + renderWelcome() + "</div>";
        chapterId = "welcome";
      } else {
        parseAndRenderSlides(el, html);
      }
      updateBreadcrumb(chapterId);
      highlightNav(chapterId);
      bindContentEvents();
      injectTryButtons();
      var mc = document.getElementById("main-content"); if (mc) mc.scrollTop = 0;
      setTimeout(updateScrollFade, 100);
    });
  }

  function parseAndRenderSlides(container, html) {
    var slideParts = MarkdownLoader.renderSlides(html);
    slides = slideParts;
    totalSlides = slides.length;
    currentSlide = 0;

    // Add nav-hint at end of first slide (like Forensik-Lab)
    if (slides.length > 1 && !slides[0].includes('slide-nav-hint')) {
      slides[0] = slides[0] +
        '<div class="slide-nav-hint">&#9654; Nutze die Buttons oben in der Topbar zur Navigation &ndash; <span class="inline-code">&laquo; Zur&uuml;ck</span> und <span class="inline-code">Weiter &raquo;</span></div>';
    }

    var out = '<div class="slide-container">';
    for (var s = 0; s < slides.length; s++) {
      var hasExercise = slides[s].indexOf('exercise-box') !== -1;
      out += '<div class="slide' + (s === 0 ? ' active' : '') + '" data-slide="' + s + '"' +
        (hasExercise ? ' data-has-exercise="true"' : '') + '>' + slides[s] + '</div>';
    }
    out += '</div>';
    container.innerHTML = out;

    var navBar = document.getElementById("slide-nav-topbar");
    if (totalSlides > 1 && navBar) {
      var navHtml = '<button class="slide-prev" onclick="App._prevSlide()">&laquo; Zur&uuml;ck</button>';
      navHtml += '<div class="slide-dots">';
      for (var d = 0; d < totalSlides; d++) {
        navHtml += '<span class="slide-dot' + (d === 0 ? ' active' : '') + '" data-slide="' + d + '"></span>';
      }
      navHtml += '</div>';
      navHtml += '<button class="slide-next slide-next-primary" onclick="App._nextSlide()">Weiter &raquo;</button>';
      navBar.innerHTML = navHtml;
      navBar.style.display = "flex";
      var dots = navBar.querySelectorAll(".slide-dot");
      for (var dd = 0; dd < dots.length; dd++) {
        dots[dd].addEventListener("click", function () {
          goToSlide(parseInt(this.getAttribute("data-slide")));
        });
      }
    } else if (navBar) {
      navBar.innerHTML = "";
      navBar.style.display = "none";
    }
  }

  function goToSlide(idx) {
    if (idx < 0 || idx >= totalSlides) return;
    var allSlides = document.querySelectorAll(".slide");
    for (var i = 0; i < allSlides.length; i++) allSlides[i].classList.toggle("active", i === idx);
    var dots = document.querySelectorAll(".slide-dot");
    for (var d = 0; d < dots.length; d++) dots[d].classList.toggle("active", d === idx);
    currentSlide = idx;
    injectTryButtons();
    bindContentEvents();
    handleExerciseSlide();
    autoOpenTerminalOnExercise();
    var mc = document.getElementById("main-content"); if (mc) mc.scrollTop = 0;
    setTimeout(updateScrollFade, 100);
  }

  function handleExerciseSlide() {
    var activeSlide = document.querySelector(".slide.active");
    if (!activeSlide) return;
    var hasEx = activeSlide.getAttribute("data-has-exercise") === "true";
    var nextBtn = document.querySelector(".slide-next");
    if (hasEx && activeSlide.querySelector(".exercise-box")) {
      var termEl = document.getElementById("terminal-bottom");
      if (termEl && !termEl.classList.contains("open")) {
        termEl.classList.add("open");
        setTimeout(updateScrollFade, 350);
      }
      if (!panelTerminal) {
        panelTerminal = new InteractiveTerminal("terminal-container");
        panelTerminal.init();
      }
      if (!activeSlide.querySelector(".exercise-complete-marker")) {
        if (nextBtn) {
          nextBtn.disabled = true;
          nextBtn.title = "Erst die Übung im Terminal abschließen";
          var lockMsg = activeSlide.querySelector(".exercise-lock-msg");
          if (!lockMsg) {
            var msg = document.createElement("div");
            msg.className = "exercise-lock-msg";
            msg.innerHTML = "Führe die Übung im Terminal unten aus, um fortzufahren.";
            var exBox = activeSlide.querySelector(".exercise-box");
            if (exBox) exBox.parentNode.insertBefore(msg, exBox.nextSibling);
          }
        }
      } else {
        if (nextBtn) { nextBtn.disabled = false; nextBtn.title = ""; }
      }
      monitorExerciseCompletion(activeSlide);
    } else {
      if (nextBtn) { nextBtn.disabled = false; nextBtn.title = ""; }
    }
  }

  function monitorExerciseCompletion(slide) {
    if (slide._exerciseMonitored) return;
    slide._exerciseMonitored = true;
    var steps = slide.querySelectorAll(".exercise-steps code, .exercise-steps .inline-code");
    var requiredCmds = [];
    for (var i = 0; i < steps.length; i++) {
      var t = steps[i].textContent.trim();
      if (t.match(/^[a-z]/) && t.length > 2) requiredCmds.push(t.split(/\s/)[0]);
    }
    if (requiredCmds.length === 0) return;
    var checkInterval = setInterval(function () {
      if (currentSlide !== parseInt(slide.getAttribute("data-slide"))) {
        clearInterval(checkInterval);
        return;
      }
      if (!panelTerminal || !panelTerminal.history) return;
      var ran = 0;
      for (var r = 0; r < requiredCmds.length; r++) {
        for (var h = 0; h < panelTerminal.history.length; h++) {
          if (panelTerminal.history[h].indexOf(requiredCmds[r]) !== -1) { ran++; break; }
        }
      }
      if (ran >= requiredCmds.length) {
        var marker = document.createElement("span");
        marker.className = "exercise-complete-marker";
        marker.style.display = "none";
        slide.appendChild(marker);
        var nextBtn = document.querySelector(".slide-next");
        if (nextBtn) { nextBtn.disabled = false; nextBtn.title = ""; }
        var lockMsg = slide.querySelector(".exercise-lock-msg");
        if (lockMsg) {
          lockMsg.innerHTML = "&#10003; Übung abgeschlossen!";
          lockMsg.style.color = "var(--accent)";
        }
        clearInterval(checkInterval);
      }
    }, 2000);
  }

  function autoOpenTerminalOnExercise() {
    var activeSlide = document.querySelector(".slide.active");
    if (!activeSlide) return;
    var sectionTitle = activeSlide.querySelector(".section-title");
    if (!sectionTitle) return;
    var titleText = sectionTitle.textContent || "";
    if (titleText.indexOf("\u00dcbung:") !== -1 || titleText.toLowerCase().indexOf("exercise") !== -1) {
      var termEl = document.getElementById("terminal-bottom");
      if (termEl && !termEl.classList.contains("open")) {
        termEl.classList.add("open");
      }
      if (!panelTerminal) {
        panelTerminal = new InteractiveTerminal("terminal-container");
        panelTerminal.init();
      }
      if (panelTerminal.inputEl) {
        panelTerminal.inputEl.focus();
      }
      setTimeout(updateScrollFade, 350);
    }
  }

  function navigateSlide(dir) {
    var next = currentSlide + dir;
    if (next < 0 || next >= totalSlides) {
      var adj = findAdjacentChapter(dir);
      if (adj) navigateTo(adj.id);
      return;
    }
    goToSlide(next);
  }

  function findAdjacentChapter(dir) {
    var idx = -1;
    for (var i = 0; i < navItems.length; i++) {
      if (navItems[i].id === currentChapter) { idx = i; break; }
    }
    var t = idx + dir;
    return t >= 0 && t < navItems.length ? navItems[t] : null;
  }

  function injectTryButtons() {
    var scope = document.querySelector(".slide.active") || document.getElementById("content");
    if (!scope) return;
    var blocks = scope.querySelectorAll(".code-block:not(.output-block)");
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      if (block.querySelector(".try-btn")) continue;
      var header = block.querySelector(".code-header");
      var pre = block.querySelector("pre");
      if (!header || !pre) continue;
      var code = pre.textContent.trim();
      if (!code.match(/^[a-z]/)) continue;
      if (code.match(/^(if|for|while|function|class|var|let|const|import|export|sudo)\s/)) continue;
      var btn = document.createElement("button");
      btn.className = "try-btn";
      btn.innerHTML = "&#9654; Terminal";
      btn.setAttribute("data-cmd", code);
      btn.addEventListener("click", function () {
        openTerminalWithCommand(this.getAttribute("data-cmd"));
      });
      header.appendChild(btn);
    }
  }

function renderWelcome() {
    if (typeof Chapters !== 'undefined' && Chapters.welcome) {
      return Chapters.welcome();
    }
    return '<div class="welcome-hero">' +
      '<p class="welcome-hero-eyebrow">NETZWERKTECHNIK LAB</p>' +
      '<h1>Netzwerkgrundlagen</h1>' +
      '<p class="welcome-hero-desc">Interaktives Training &mdash; von OSI-Modell bis Troubleshooting. Mit simuliertem Terminal und Schritt-f&uuml;r-Schritt-&Uuml;bungen.</p>' +
      '<button class="welcome-cta" onclick="App.navigateTo(\'ch01-osi\')">Training starten &rarr;</button>' +
      '</div>' +

      '<div class="welcome-note">' +
      '<span>&#128161; Jeder Fachbegriff wird beim ersten Auftreten erkl&auml;rt. Keine Vorkenntnisse n&ouml;tig.</span>' +
      '</div>' +

      '<div class="welcome-modules">' +

      '<div class="welcome-module" onclick="App.navigateTo(\'ch01-osi\')">' +
      '<div class="welcome-module-left"><span class="welcome-module-num">01</span></div>' +
      '<div class="welcome-module-body">' +
      '<h2>Grundlagen</h2>' +
      '<p>OSI-Modell, TCP/IP, Netzwerkger&auml;te, IPv4, Subnetting, IPv6, MAC-Adressen, ARP</p>' +
      '</div>' +
      '<span class="welcome-module-arrow">&rarr;</span>' +
      '</div>' +

      '<div class="welcome-module" onclick="App.navigateTo(\'ch06-tcp-udp\')">' +
      '<div class="welcome-module-left"><span class="welcome-module-num">02</span></div>' +
      '<div class="welcome-module-body">' +
      '<h2>Protokolle</h2>' +
      '<p>TCP, UDP, DNS, DHCP, HTTP, HTTPS, Verschl&uuml;sselung, ICMP</p>' +
      '</div>' +
      '<span class="welcome-module-arrow">&rarr;</span>' +
      '</div>' +

      '<div class="welcome-module" onclick="App.navigateTo(\'ch12-linux-tools\')">' +
      '<div class="welcome-module-left"><span class="welcome-module-num">03</span></div>' +
      '<div class="welcome-module-body">' +
      '<h2>Praxis</h2>' +
      '<p>Linux-Netzwerktools, Routing, Firewall, Wireshark, Paketanalyse, Troubleshooting</p>' +
      '</div>' +
      '<span class="welcome-module-arrow">&rarr;</span>' +
      '</div>' +

      '</div>';
  }

  function updateBreadcrumb(chapterId) {
    var item = null;
    for (var i = 0; i < navItems.length; i++) {
      if (navItems[i].id === chapterId) { item = navItems[i]; break; }
    }
    var bc = document.getElementById("breadcrumb");
    bc.innerHTML = '<span style="cursor:pointer" onclick="App.navigateTo(\'welcome\')">NETZWERKTECHNIK LAB</span> / ' + escapeHtml(item ? item.label : "Willkommen");
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
    bindScoped(scope, ".copy-btn", "click", handleCopy);
    bindScoped(scope, ".toggle-header", "click", handleToggle);
    bindScoped(scope, ".complete-section-btn", "click", handleComplete);
    bindScoped(scope, ".nav-btn[data-target]", "click", function () {
      navigateTo(this.getAttribute("data-target"));
    });
  }

  function bindScoped(scope, sel, ev, fn) {
    var els = scope.querySelectorAll(sel);
    for (var i = 0; i < els.length; i++) {
      if (els[i]._appBound) continue;
      els[i].addEventListener(ev, fn);
      els[i]._appBound = true;
    }
  }

  function handleCopy() {
    var btn = this;
    var pre = btn.closest(".code-block").querySelector("pre");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pre.textContent).then(function () {
        btn.textContent = "Kopiert!";
        btn.classList.add("copied");
        setTimeout(function () { btn.textContent = "Kopieren"; btn.classList.remove("copied"); }, 1500);
      });
    }
  }

  function handleToggle() {
    this.closest(".toggle-container").classList.toggle("open");
  }

  function handleComplete() {
    var btn = this;
    var id = btn.getAttribute("data-chapter") || currentChapter;
    if (!Progress.isCompleted(id)) {
      Progress.markCompleted(id);
      btn.textContent = "Abgeschlossen";
      btn.classList.add("done");
      btn.disabled = true;
      buildSidebar();
    }
  }

  function switchSidebarTab(tabName) {
    var tabs = document.querySelectorAll(".sidebar-tab");
    var contents = document.querySelectorAll(".sidebar-tab-content");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle("active", tabs[i].getAttribute("data-tab") === tabName);
    }
    for (var j = 0; j < contents.length; j++) {
      contents[j].classList.toggle("active", contents[j].id === "sidebar-tab-" + tabName);
    }
  }

  function closeMobileSidebar() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("active");
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function updateScrollFade() {
    var mc = document.getElementById("main-content");
    var fade = document.getElementById("scroll-fade");
    var termEl = document.getElementById("terminal-bottom");
    if (!mc || !fade) return;
    if (termEl && termEl.classList.contains("open")) {
      fade.style.bottom = termEl.offsetHeight + "px";
    } else {
      fade.style.bottom = "0px";
    }
    var atBottom = mc.scrollHeight - mc.scrollTop - mc.clientHeight < 40;
    var hasOverflow = mc.scrollHeight > mc.clientHeight + 40;
    if (hasOverflow && !atBottom) {
      fade.classList.add("visible");
    } else {
      fade.classList.remove("visible");
    }
  }

  return {
    init: init,
    navigateTo: navigateTo,
    navItems: navItems,
    openTerminalWithCommand: openTerminalWithCommand,
    _prevSlide: function () { navigateSlide(-1); },
    _nextSlide: function () { navigateSlide(1); }
  };
})();
window.App = App;

var Progress = (function () {
  var PREFIX = "netzwerk-lab-progress-";
  return {
    isCompleted: function (id) { return localStorage.getItem(PREFIX + id) === "1"; },
    markCompleted: function (id) { localStorage.setItem(PREFIX + id, "1"); },
    resetAll: function () {
      var keys = [];
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith(PREFIX)) keys.push(localStorage.key(i));
      }
      keys.forEach(function (k) { localStorage.removeItem(k); });
    }
  };
})();

document.addEventListener("DOMContentLoaded", App.init);
