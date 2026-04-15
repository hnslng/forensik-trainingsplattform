/**
 * Integrated Chapter Editor v2
 * With formatting toolbar, insert helpers, and chapter templates
 */
var ChapterEditor = (function () {
  var chapters = [];
  var currentId = null;
  var isDirty = false;
  var hasAPI = false;

  function init() {
    fetch('/api/chapters').then(function (r) {
      hasAPI = r.ok;
      if (hasAPI) { buildSidebar(); bindEvents(); }
      else { showOffline(); }
    }).catch(function () { showOffline(); });
  }

  function showOffline() {
    var el = document.getElementById('editor-sidebar');
    if (!el) return;
    el.innerHTML = '<div style="padding:14px;color:var(--text-secondary);font-size:0.85rem">' +
      '<p style="margin-bottom:8px">&#9888; Editor nicht verf&uuml;gbar</p>' +
      '<p style="font-size:0.8rem">Starte den Server:</p>' +
      '<code style="font-size:0.75rem;background:var(--bg-card);padding:4px 8px;border-radius:4px;display:block;margin-top:6px">node server.js</code></div>';
    hasAPI = false;
  }

  function buildSidebar() {
    var el = document.getElementById('editor-sidebar');
    if (!el) return;
    el.innerHTML = '<div class="editor-sidebar-actions"><button onclick="ChapterEditor.createNew()">+ Neues Kapitel</button></div>' +
      '<ul class="editor-sidebar-list" id="editor-chapter-list"></ul>';
    loadList();
  }

  function loadList() {
    fetch('/api/chapters').then(function (r) { return r.json(); }).then(function (data) {
      chapters = data.chapters;
      var list = document.getElementById('editor-chapter-list');
      if (!list) return;
      var sections = {};
      chapters.forEach(function (ch) {
        if (!sections[ch.section]) sections[ch.section] = [];
        sections[ch.section].push(ch);
      });
      var html = '';
      for (var sec in sections) {
        html += '<div class="editor-sidebar-section">' + sec + '</div>';
        sections[sec].forEach(function (ch) {
          html += '<li class="editor-sidebar-item' + (ch.id === currentId ? ' active' : '') +
            '" onclick="ChapterEditor.open(\'' + ch.id + '\')">' +
            '<span class="nav-icon">&#128196;</span>' +
            '<span class="nav-label">' + ch.title + '</span></li>';
        });
      }
      list.innerHTML = html;
    });
  }

  function bindEvents() {
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 's' && currentId && isDirty) {
        e.preventDefault();
        save();
      }
    });
  }

  function open(id) {
    if (!hasAPI) return;
    if (isDirty && currentId && currentId !== id) {
      if (!confirm('Ungespeicherte &Auml;nderungen verwerfen?')) return;
    }
    currentId = id;
    fetch('/api/chapters/' + id).then(function (r) { return r.json(); }).then(function (data) {
      showEditorView(data.content || '', data.file);
      isDirty = false;
      loadList();
    });
  }

  // Wrap selected text or insert at cursor
  function wrapSelection(before, after) {
    var ta = document.getElementById('editor-textarea');
    if (!ta) return;
    var start = ta.selectionStart;
    var end = ta.selectionEnd;
    var sel = ta.value.substring(start, end);
    var replacement = before + (sel || 'Text') + after;
    ta.value = ta.value.substring(0, start) + replacement + ta.value.substring(end);
    ta.selectionStart = start + before.length;
    ta.selectionEnd = start + before.length + (sel || 'Text').length;
    ta.focus();
    isDirty = true;
    updatePreview();
  }

  // Insert block at cursor
  function insertBlock(text) {
    var ta = document.getElementById('editor-textarea');
    if (!ta) return;
    var pos = ta.selectionStart;
    var before = ta.value.substring(0, pos);
    var after = ta.value.substring(pos);
    // Add newlines if needed
    if (before.length > 0 && before[before.length - 1] !== '\n') text = '\n' + text;
    ta.value = before + text + after;
    ta.selectionStart = ta.selectionEnd = pos + text.length;
    ta.focus();
    isDirty = true;
    updatePreview();
  }

  function showEditorView(content, filename) {
    var contentEl = document.getElementById('content');
    if (contentEl) contentEl.style.display = 'none';

    var ev = document.getElementById('editor-view');
    if (!ev) {
      ev = document.createElement('div');
      ev.id = 'editor-view';
      ev.className = 'editor-view active';
      ev.innerHTML =
        // Top toolbar with file actions
        '<div class="editor-toolbar">' +
          '<span class="filename" id="editor-filename"></span>' +
          '<span style="flex:1"></span>' +
          '<span id="editor-dirty" class="editor-dirty" style="display:none">&#9679; Ungespeichert</span>' +
          '<button class="ed-action-btn ed-close" onclick="ChapterEditor.close()">Schlie&szlig;en</button>' +
          '<button class="ed-action-btn ed-delete" onclick="ChapterEditor.remove()">L&ouml;schen</button>' +
          '<button class="ed-action-btn ed-save" onclick="ChapterEditor.save()">&#128190; Speichern</button>' +
        '</div>' +
        // Formatting toolbar
        '<div class="editor-format-bar">' +
          '<div class="format-group">' +
            '<button class="fmt-btn" title="&Uuml;berschrift 1" onclick="ChapterEditor._fmt(\'h1\')">H1</button>' +
            '<button class="fmt-btn" title="&Uuml;berschrift 2" onclick="ChapterEditor._fmt(\'h2\')">H2</button>' +
            '<button class="fmt-btn" title="&Uuml;berschrift 3" onclick="ChapterEditor._fmt(\'h3\')">H3</button>' +
          '</div>' +
          '<div class="format-sep"></div>' +
          '<div class="format-group">' +
            '<button class="fmt-btn" title="Fett (Ctrl+B)" onclick="ChapterEditor._fmt(\'bold\')"><b>B</b></button>' +
            '<button class="fmt-btn" title="Kursiv (Ctrl+I)" onclick="ChapterEditor._fmt(\'italic\')"><i>I</i></button>' +
            '<button class="fmt-btn" title="Code" onclick="ChapterEditor._fmt(\'code\')">&lt;/&gt;</button>' +
            '<button class="fmt-btn" title="Code-Block" onclick="ChapterEditor._fmt(\'codeblock\')">[ ]</button>' +
          '</div>' +
          '<div class="format-sep"></div>' +
          '<div class="format-group">' +
            '<button class="fmt-btn" title="Aufz&auml;hlung" onclick="ChapterEditor._fmt(\'ul\')">&#8226; Liste</button>' +
            '<button class="fmt-btn" title="Nummerierung" onclick="ChapterEditor._fmt(\'ol\')">1. Liste</button>' +
            '<button class="fmt-btn" title="Tabelle" onclick="ChapterEditor._fmt(\'table\')">Tabelle</button>' +
          '</div>' +
          '<div class="format-sep"></div>' +
          '<div class="format-group">' +
            '<button class="fmt-btn fmt-insert" title="Callout einf&uuml;gen" onclick="ChapterEditor._fmt(\'callout\')">&#9432; Callout</button>' +
            '<button class="fmt-btn fmt-insert" title="&Uuml;bung einf&uuml;gen" onclick="ChapterEditor._fmt(\'exercise\')">&#9999; &#220;bung</button>' +
            '<button class="fmt-btn fmt-insert" title="L&ouml;sung (Toggle) einf&uuml;gen" onclick="ChapterEditor._fmt(\'toggle\')">&#9654; L&ouml;sung</button>' +
            '<button class="fmt-btn fmt-insert" title="Nav-Buttons" onclick="ChapterEditor._fmt(\'nav\')">&#8592;&#8594; Nav</button>' +
            '<button class="fmt-btn fmt-insert" title="Komplettsiegel" onclick="ChapterEditor._fmt(\'complete\')">&#9744; Fertig</button>' +
          '</div>' +
        '</div>' +
        // Editor split view
        '<div class="editor-split">' +
          '<div class="editor-pane">' +
            '<div class="pane-label">Markdown</div>' +
            '<textarea id="editor-textarea" spellcheck="false"></textarea>' +
          '</div>' +
          '<div class="preview-pane">' +
            '<div class="pane-label">Vorschau</div>' +
            '<div class="preview-md" id="editor-preview"></div>' +
          '</div>' +
        '</div>';
      var mc = document.getElementById('main-content');
      mc.appendChild(ev);

      var ta = document.getElementById('editor-textarea');
      ta.addEventListener('input', function () {
        isDirty = true;
        updatePreview();
        document.getElementById('editor-dirty').style.display = isDirty ? 'inline' : 'none';
      });

      // Keyboard shortcuts in textarea
      ta.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') { e.preventDefault(); ChapterEditor._fmt('bold'); }
        if ((e.ctrlKey || e.metaKey) && e.key === 'i') { e.preventDefault(); ChapterEditor._fmt('italic'); }
      });
    } else {
      ev.classList.add('active');
    }
    document.getElementById('editor-filename').textContent = filename || '';
    document.getElementById('editor-textarea').value = content;
    document.getElementById('editor-dirty').style.display = 'none';
    updatePreview();

    var sn = document.getElementById('slide-nav-topbar');
    if (sn) { sn.innerHTML = ''; sn.style.display = 'none'; }
    var bc = document.getElementById('breadcrumb');
    if (bc) bc.innerHTML = '<span style="cursor:pointer" onclick="ChapterEditor.close()">&#9998; EDITOR</span> / ' + (filename || '');
  }

  function updatePreview() {
    var ta = document.getElementById('editor-textarea');
    var pv = document.getElementById('editor-preview');
    if (!ta || !pv) return;
    var md = ta.value;
    // Use the real markdown parser if available
    if (typeof MarkdownLoader !== 'undefined' && MarkdownLoader.processMarkdown) {
      pv.innerHTML = MarkdownLoader.processMarkdown(md, currentId || 'preview');
    } else {
      // Fallback simple preview
      var html = md
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n\n/g, '</p><p>');
      pv.innerHTML = '<p>' + html + '</p>';
    }
  }

  function format(type) {
    switch (type) {
      case 'bold': wrapSelection('**', '**'); break;
      case 'italic': wrapSelection('*', '*'); break;
      case 'code': wrapSelection('`', '`'); break;
      case 'codeblock': insertBlock('\n```\nCode hier\n```\n'); break;
      case 'h1': insertBlock('\n# Überschrift\n'); break;
      case 'h2': insertBlock('\n## Überschrift\n'); break;
      case 'h3': insertBlock('\n### Überschrift\n'); break;
      case 'ul': insertBlock('\n- Punkt 1\n- Punkt 2\n- Punkt 3\n'); break;
      case 'ol': insertBlock('\n1. Schritt 1\n2. Schritt 2\n3. Schritt 3\n'); break;
      case 'table': insertBlock('\n| Spalte 1 | Spalte 2 | Spalte 3 |\n|---|---|---|\n| Wert 1 | Wert 2 | Wert 3 |\n'); break;
      case 'callout': insertBlock('\n:::callout info Titel hier\nInhalt des Callouts...\n:::\n'); break;
      case 'exercise': insertBlock('\n<div class="exercise-box">\n<div class="exercise-header"><span class="exercise-badge">Übung</span><span class="exercise-name">Titel</span></div>\n<div class="exercise-body">\n<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Beschreibung des Ziels</p></div>\n<div class="exercise-steps"><ol class="numbered-list">\n<li><code>echo "Befehl hier"</code></li>\n</ol></div>\n</div>\n</div>\n'); break;
      case 'toggle': insertBlock('\n<div class="toggle-container">\n<div class="toggle-header"><span class="toggle-label">Lösung anzeigen</span><span class="toggle-arrow">▶</span></div>\n<div class="toggle-content"><p>Lösungstext hier</p></div>\n</div>\n'); break;
      case 'nav': insertBlock('\n<div class="nav-buttons">\n<button class="nav-btn" data-target="welcome">← Zurück</button>\n<button class="nav-btn" data-target="chXX">Weiter →</button>\n</div>\n'); break;
      case 'complete': insertBlock('\n<button class="complete-section-btn" data-chapter="' + (currentId || 'chXX') + '">☐ Kapitel als abgeschlossen markieren</button>\n'); break;
    }
  }

  function save() {
    if (!currentId || !hasAPI) return;
    var content = document.getElementById('editor-textarea').value;
    fetch('/api/chapters/' + currentId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content })
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (data.success) {
        isDirty = false;
        document.getElementById('editor-dirty').style.display = 'none';
        toast('Gespeichert!', 'success');
      } else {
        toast('Fehler: ' + data.error, 'error');
      }
    });
  }

  function remove() {
    if (!currentId || !hasAPI) return;
    if (!confirm('Kapitel wirklich l&ouml;schen?')) return;
    fetch('/api/chapters/' + currentId, { method: 'DELETE' }).then(function (r) { return r.json(); }).then(function (data) {
      if (data.success) { close(); loadList(); toast('Gel&ouml;scht!', 'success'); }
    });
  }

  function close() {
    currentId = null;
    isDirty = false;
    var ev = document.getElementById('editor-view');
    if (ev) ev.classList.remove('active');
    var contentEl = document.getElementById('content');
    if (contentEl) contentEl.style.display = '';
    if (typeof App !== 'undefined' && App.handleRoute) App.handleRoute();
    loadList();
  }

  function createNew() {
    if (!hasAPI) return;
    var id = prompt('Kapitel-ID (z.B. ch16-vpn):');
    if (!id) return;
    var title = prompt('Titel:');
    if (!title) return;
    var section = prompt('Section (Grundlagen, Protokolle, Praxis, Erweitert):') || 'Praxis';

    var content = '<h1 class="chapter-title">' + title + '</h1>\n\n' +
      '<div class="chapter-subtitle">Kurze Beschreibung</div>\n\n' +
      '<p class="chapter-intro">1-2 Sätze was man in diesem Kapitel lernt.</p>\n\n' +
      '<div class="callout callout-info"><div class="callout-header">&#9432; Was du nach diesem Kapitel kannst</div>' +
      '<p>Du kannst...</p></div>\n\n' +
      '<div class="feature-grid chapter-preview-grid">\n' +
      '<div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Thema 1</h3><p>Kurzbeschreibung</p></div></div>\n' +
      '<div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Thema 2</h3><p>Kurzbeschreibung</p></div></div>\n' +
      '<div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Thema 3</h3><p>Kurzbeschreibung</p></div></div>\n' +
      '<div class="feature-card chapter-preview-card"><div class="feature-icon">&#128187;</div><div class="feature-text"><h3>Terminal-&Uuml;bung</h3><p>Befehl testen</p></div></div>\n' +
      '</div>\n\n' +
      '## X.1 Erster Abschnitt\n\nInhalt hier...\n\n' +
      '<div class="exercise-box">\n' +
      '<div class="exercise-header"><span class="exercise-badge">&Uuml;bung</span><span class="exercise-name">' + title + '</span></div>\n' +
      '<div class="exercise-body">\n' +
      '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>Beschreibung des Ziels</p></div>\n' +
      '<div class="exercise-steps"><ol class="numbered-list">\n<li><code>echo "Befehl"</code></li>\n</ol></div>\n' +
      '<div class="toggle-container">\n' +
      '<div class="toggle-header"><span class="toggle-label">L&ouml;sung anzeigen</span><span class="toggle-arrow">&#9654;</span></div>\n' +
      '<div class="toggle-content"><p>L&ouml;sung hier</p></div>\n' +
      '</div></div></div>\n\n' +
      '<button class="complete-section-btn" data-chapter="' + id + '">&#9744; Kapitel als abgeschlossen markieren</button>\n\n' +
      '<div class="nav-buttons">\n<button class="nav-btn" data-target="welcome">&#8592; Willkommen</button>\n<button class="nav-btn" data-target="welcome">Weiter &#8594;</button>\n</div>\n';

    fetch('/api/chapters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, title: title, section: section, content: content })
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (data.success) { loadList(); open(id); toast('Kapitel erstellt!', 'success'); }
      else { toast('Fehler: ' + data.error, 'error'); }
    });
  }

  function toast(msg, type) {
    var t = document.getElementById('editor-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'editor-toast';
      t.className = 'editor-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = 'editor-toast ' + type + ' show';
    setTimeout(function () { t.classList.remove('show'); }, 2500);
  }

  return {
    init: init, open: open, save: save, remove: remove,
    close: close, createNew: createNew, _fmt: format
  };
})();
