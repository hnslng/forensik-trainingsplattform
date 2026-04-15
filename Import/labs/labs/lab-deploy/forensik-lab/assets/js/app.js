var App = (function () {
  var currentChapter = null;
  var panelTerminal = null;
  var currentSlide = 0;
  var totalSlides = 0;
  var slides = [];

  var navItems = [
    { id: "welcome", label: "Willkommen", icon: "&#8962;", section: "Start" },
    { id: "ch01-grundlagen", label: "Grundlagen", icon: "&#9881;", section: "Trainingsmodul 1" },
    { id: "ch02-identifikation", label: "Datentr&auml;ger-Identifikation", icon: "&#128269;", section: "Trainingsmodul 1" },
    { id: "ch03-imaging", label: "Forensische Datensicherung", icon: "&#128190;", section: "Trainingsmodul 2" },
    { id: "ch04-hashing", label: "Hashing &amp; Beweisintegrit&auml;t", icon: "&#9919;", section: "Trainingsmodul 2" },
    { id: "ch05-mounting", label: "Mounten &amp; Beweisaufnahme", icon: "&#128194;", section: "Trainingsmodul 3" },
    { id: "ch06-hex", label: "Hex-&amp; Bin&auml;ranalyse", icon: "&#128270;", section: "Trainingsmodul 3" },
    { id: "ch07-strings", label: "Strings &amp; Vergleich", icon: "&#128270;", section: "Trainingsmodul 3" },
    { id: "ch08-dateisysteme", label: "Dateisysteme", icon: "&#128193;", section: "Trainingsmodul 3" },
    { id: "ch09-wipping", label: "Sicheres L&ouml;schen", icon: "&#128465;", section: "Trainingsmodul 4" },
    { id: "ch10-artefakte", label: "Artefaktanalyse", icon: "&#128270;", section: "Trainingsmodul 4" },
    { id: "ch11-casestudy", label: "Case Study", icon: "&#9888;", section: "Trainingsmodul 5" },
    { id: "ch12-image-formate", label: "Image-Formate", icon: "&#128190;", section: "Vertiefung" },
    { id: "ch13-vergleich", label: "Vergleich", icon: "&#128270;", section: "Vertiefung" },
    { id: "ch14-protokollierung", label: "Protokollierung", icon: "&#128195;", section: "Vertiefung" },
    { id: "ch15-write-blocker", label: "Write-Blocker", icon: "&#128269;", section: "Vertiefung" },
    { id: "ch16-sicheres-loeschen", label: "Sicheres L&ouml;schen (Details)", icon: "&#128465;", section: "Vertiefung" },
    { id: "ch17-best-practices", label: "Best Practices", icon: "&#9989;", section: "Vertiefung" },
    { id: "ch18-tools", label: "Tools", icon: "&#128187;", section: "Vertiefung" },
    { id: "ch19-datenrettung", label: "Datenrettung &amp; File Carving", icon: "&#128269;", section: "Erweiterte Analyse" },
    { id: "ch20-memory-forensik", label: "Memory-Forensik", icon: "&#9881;", section: "Erweiterte Analyse" },
    { id: "ch21-netzwerkforensik", label: "Netzwerkforensik", icon: "&#127760;", section: "Erweiterte Analyse" },
    { id: "ch22-zeitlinienanalyse", label: "Zeitlinienanalyse", icon: "&#128339;", section: "Erweiterte Analyse" }
  ];

  function init() {
    buildSidebar();
    if (typeof Cheatsheet !== "undefined" && Cheatsheet.render) Cheatsheet.render();
    renderReferenceSidebar();
    bindGlobalEvents();
    handleRoute();
    window.addEventListener("hashchange", handleRoute);
    var mc = document.getElementById("main-content");
    if (mc) mc.addEventListener("scroll", updateScrollFade);
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

    var tabs = document.querySelectorAll(".sidebar-tab");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", function () {
        switchSidebarTab(this.getAttribute("data-tab"));
      });
    }

    document.getElementById("terminal-toggle").addEventListener("click", toggleTerminal);

    document.getElementById("overlay").addEventListener("click", closeMobileSidebar);

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
    var html = "";
    if (typeof Chapters !== "undefined" && Chapters[chapterId]) {
      html = Chapters[chapterId]();
    } else if (typeof Labs !== "undefined" && Labs[chapterId]) {
      html = Labs[chapterId]();
    } else {
      html = Chapters["welcome"]();
      chapterId = "welcome";
    }
    if (chapterId === "welcome") {
      el.innerHTML = '<div class="fade-in">' + html + "</div>";
    } else {
      parseAndRenderSlides(el, html);
    }
    updateBreadcrumb(chapterId);
    highlightNav(chapterId);
    bindContentEvents();
    injectTryButtons();
    var mc = document.getElementById("main-content"); if (mc) mc.scrollTop = 0;
    setTimeout(updateScrollFade, 100);
  }

  function parseAndRenderSlides(container, html) {
    var parts = html.split(/(<h2\s+class="section-title"[^>]*>)/i);
    slides = [];
    var firstChunk = parts[0];
    if (firstChunk && firstChunk.trim()) {
      splitByExercises(slides, firstChunk);
    }
    for (var i = 1; i < parts.length; i += 2) {
      var h2tag = parts[i];
      var content = parts[i + 1] || "";
      var nextH2 = "";
      var j = i + 2;
      while (j < parts.length) {
        if (parts[j].match(/^<h2\s+class="section-title"/i)) break;
        nextH2 += parts[j];
        j++;
      }
      var sectionContent = (content + nextH2).split(/<div\s+class="nav-buttons/i)[0];
      splitByExercises(slides, h2tag + sectionContent);
    }
    if (slides.length === 0) slides = [html];
    for (var s = 0; s < slides.length; s++) {
      slides[s] = slides[s].replace(/<div\s+class="toggle-container">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/gi, function(match) {
        var contentMatch = match.match(/<div\s+class="toggle-content">([\s\S]*?)<\/div>/i);
        if (contentMatch) {
          return '<div class="exercise-solution"><div class="solution-label">Lösung</div>' + contentMatch[1] + '</div></div></div></div>';
        }
        return '';
      });
    }
    totalSlides = slides.length;
    currentSlide = 0;
    var out = '<div class="slide-container">';
    for (var s2 = 0; s2 < slides.length; s2++) {
      var hasExercise = slides[s2].indexOf('exercise-box') !== -1;
      out += '<div class="slide' + (s2 === 0 ? ' active' : '') + '" data-slide="' + s2 + '"' + (hasExercise ? ' data-has-exercise="true"' : '') + '>' + slides[s2] + '</div>';
    }
    out += '</div>';
    container.innerHTML = out;
    var navBar = document.getElementById("slide-nav-topbar");
    if (totalSlides > 1 && navBar) {
      var navHtml = '<button class="slide-prev" onclick="App._prevSlide()">&lsaquo; Zur&uuml;ck</button>';
      navHtml += '<div class="slide-dots">';
      for (var d = 0; d < totalSlides; d++) {
        navHtml += '<span class="slide-dot' + (d === 0 ? ' active' : '') + '" data-slide="' + d + '"></span>';
      }
      navHtml += '</div>';
      navHtml += '<button class="slide-next slide-next-primary" onclick="App._nextSlide()">Weiter &rsaquo;</button>';
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

  function splitByExercises(arr, html) {
    var exParts = html.split(/(<div\s+class="exercise-box">)/i);
    if (exParts.length <= 1) {
      arr.push(html);
      return;
    }
    var before = exParts[0];
    if (before.trim()) arr.push(before);
    for (var i = 1; i < exParts.length; i += 2) {
      var exBox = exParts[i] + (exParts[i + 1] || "");
      var depth = 0;
      var endIdx = -1;
      for (var c = 0; c < exBox.length; c++) {
        if (exBox.substr(c, 4) === '<div') depth++;
        if (exBox.substr(c, 6) === '</div>') { depth--; if (depth === 0) { endIdx = c + 6; break; } }
      }
      var exerciseHtml = endIdx > 0 ? exBox.substring(0, endIdx) : exBox;
      var afterEx = endIdx > 0 ? exBox.substring(endIdx) : '';
      arr.push(exerciseHtml);
      if (afterEx.trim()) {
        var nextExIdx = afterEx.indexOf('<div class="exercise-box">');
        if (nextExIdx > 0) {
          splitByExercises(arr, afterEx);
        } else {
          arr.push(afterEx);
        }
      }
    }
  }

  function goToSlide(idx) {
    if (idx < 0 || idx >= totalSlides) return;
    var allSlides = document.querySelectorAll(".slide");
    for (var i = 0; i < allSlides.length; i++) {
      allSlides[i].classList.toggle("active", i === idx);
    }
    var dots = document.querySelectorAll(".slide-dot");
    for (var d = 0; d < dots.length; d++) {
      dots[d].classList.toggle("active", d === idx);
    }
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
    var steps = slide.querySelectorAll(".exercise-steps .inline-code, .exercise-steps code");
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
          lockMsg.innerHTML = "Übung abgeschlossen!";
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
    if (titleText.indexOf("Übung:") !== -1 || titleText.toLowerCase().indexOf("exercise") !== -1) {
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
    var isExercise = false;
    var titleEl = scope.querySelector(".section-title");
    if (titleEl && (titleEl.textContent.indexOf("Übung:") !== -1 || titleEl.textContent.indexOf("Vorbereitung:") !== -1)) {
      isExercise = true;
    }
    if (!isExercise && !scope.querySelector(".exercise-box")) return;
    var blocks = scope.querySelectorAll(".code-block:not(.output-block)");
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      if (block.querySelector(".try-btn")) continue;
      var header = block.querySelector(".code-header");
      var pre = block.querySelector("pre");
      if (!header || !pre) continue;
      var code = pre.textContent.trim();
      if (!code.match(/^[a-z]/)) continue;
      if (code.match(/^(if|for|while|function|class|var|let|const|import|export)\s/)) continue;
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

  function updateBreadcrumb(chapterId) {
    var item = findNavItem(chapterId);
    var bc = document.getElementById("breadcrumb");
    bc.innerHTML = '<span>ABB IT-FAHNDUNG</span> / ' + escapeHtml(item ? item.label : "Willkommen");
  }

  function highlightNav(chapterId) {
    var items = document.querySelectorAll(".nav-item");
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle("active", items[i].getAttribute("data-chapter") === chapterId);
    }
  }

  function findNavItem(id) {
    for (var i = 0; i < navItems.length; i++) {
      if (navItems[i].id === id) return navItems[i];
    }
    return null;
  }

  function bindContentEvents() {
    var scope = document.querySelector(".slide.active") || document.getElementById("content");
    if (!scope) return;
    bindScoped(scope, ".copy-btn", "click", handleCopy);
    bindScoped(scope, ".toggle-header", "click", handleToggle);
    bindScoped(scope, ".decision-option", "click", handleDecision);
    bindScoped(scope, ".complete-section-btn", "click", handleComplete);
    bindScoped(scope, ".step-indicator", "click", handleStepClick);
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

  function handleDecision() {
    var opt = this;
    var card = opt.closest(".decision-card");
    var correct = opt.getAttribute("data-correct") === "true";
    var fb = card.querySelector(".decision-feedback");
    var opts = card.querySelectorAll(".decision-option");
    for (var i = 0; i < opts.length; i++) {
      opts[i].style.pointerEvents = "none";
      if (opts[i].getAttribute("data-correct") === "true") opts[i].classList.add("correct");
    }
    if (!correct) opt.classList.add("wrong");
    if (fb) {
      fb.classList.add("show", correct ? "correct" : "wrong");
      fb.textContent = correct
        ? "Richtig! " + (opt.getAttribute("data-feedback") || "")
        : "Leider falsch. " + (opt.getAttribute("data-feedback") || "");
    }
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

  function handleStepClick() {
    var step = this.getAttribute("data-step");
    var stepper = this.closest(".stepper");
    var inds = stepper.querySelectorAll(".step-indicator");
    var conts = stepper.parentElement.querySelectorAll(".step-content");
    for (var i = 0; i < inds.length; i++) inds[i].classList.remove("active");
    for (var j = 0; j < conts.length; j++) conts[j].classList.remove("active");
    this.classList.add("active");
    var target = document.getElementById("step-" + step);
    if (target) target.classList.add("active");
    bindContentEvents();
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

document.addEventListener("DOMContentLoaded", App.init);
