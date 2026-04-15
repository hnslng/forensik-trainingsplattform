/**
 * Markdown Chapter Loader
 * Reads .md files, parses custom directives, renders as HTML slides
 * 
 * Custom directives:
 *   :::callout [type:context|info|warning|tip|danger]
 *   :::exercise [title]
 *   :::code-block [lang]
 *   :::table
 *   :::/
 */
var MarkdownLoader = (function () {

  // ---- Markdown-to-HTML converter (lightweight, no dependency) ----
  function mdToHtml(md) {
    var html = md;
    // Escape HTML first (but preserve our markers)
    // Actually, we want to allow HTML in markdown for flexibility
    
    // Code blocks (``` ... ```)
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, function (_, lang, code) {
      return '<pre><code class="language-' + (lang || 'bash') + '">' + escapeHtml(code.trim()) + '</code></pre>';
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Headings (must be at start of line)
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="section-title">$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Tables
    html = parseTable(html);

    // Lists
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="numbered">$1</li>');
    html = html.replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>');

    // Wrap consecutive <li> in <ol> or <ul>
    html = wrapLists(html);

    // Paragraphs (lines that aren't already wrapped in tags)
    html = html.replace(/^(?!<[a-z/])(.+)$/gm, function (_, line) {
      if (line.trim() === '') return '';
      return '<p>' + line + '</p>';
    });

    // Clean up multiple blank lines
    html = html.replace(/\n{3,}/g, '\n\n');

    return html;
  }

  function parseTable(html) {
    var lines = html.split('\n');
    var result = [];
    var inTable = false;
    var tableRows = [];

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (line.startsWith('|') && line.endsWith('|')) {
        // Separator row (|---|---|)
        if (line.match(/^\|[\s\-:|]+\|$/)) continue;
        inTable = true;
        var cells = line.split('|').filter(function (c) { return c.trim() !== ''; });
        tableRows.push(cells.map(function (c) { return c.trim(); }));
      } else {
        if (inTable) {
          result.push(renderTable(tableRows));
          tableRows = [];
          inTable = false;
        }
        result.push(lines[i]);
      }
    }
    if (inTable) result.push(renderTable(tableRows));
    return result.join('\n');
  }

  function renderTable(rows) {
    if (rows.length === 0) return '';
    var html = '<div class="table-container"><table><thead><tr>';
    // First row = header
    for (var h = 0; h < rows[0].length; h++) {
      html += '<th>' + rows[0][h] + '</th>';
    }
    html += '</tr></thead><tbody>';
    for (var r = 1; r < rows.length; r++) {
      html += '<tr>';
      for (var c = 0; c < rows[r].length; c++) {
        html += '<td>' + rows[r][c] + '</td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table></div>';
    return html;
  }

  function wrapLists(html) {
    // Wrap numbered items in <ol>
    html = html.replace(/((?:<li class="numbered">[\s\S]*?<\/li>\s*)+)/g, '<ol class="numbered-list">$1</ol>');
    // Wrap bullet items in <ul>
    html = html.replace(/((?:<li>[\s\S]*?<\/li>\s*)+)/g, '<ul>$1</ul>');
    return html;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ---- Custom directive parser ----
  function parseDirectives(md) {
    var html = md;

    // :::callout [type]
    // content
    // :::
    html = html.replace(/:::callout\s+(\w+)(?:\s+(.+?))?\n([\s\S]*?):::/g, function (_, type, title, content) {
      var icon = { context: '&#9432;', info: '&#9432;', warning: '&#9888;', tip: '&#128161;', danger: '&#9888;' }[type] || '&#9432;';
      var titleHtml = title ? '<div class="callout-header">' + icon + ' ' + title + '</div>' : '';
      return '<div class="callout callout-' + type + '">' + titleHtml + mdToHtml(content.trim()) + '</div>';
    });

    // :::exercise [title]
    // content with **goal**, **steps**, **solution** sections
    // :::
    html = html.replace(/:::exercise(?:\s+(.+?))?\n([\s\S]*?):::/g, function (_, title, content) {
      var parts = parseExercise(content);
      var exHtml = '<div class="exercise-box">';
      exHtml += '<div class="exercise-header"><span class="exercise-badge">Übung</span>';
      exHtml += '<span class="exercise-name">' + (title || 'Aufgabe') + '</span></div>';
      exHtml += '<div class="exercise-body">';
      if (parts.goal) exHtml += '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>' + parts.goal + '</p></div>';
      if (parts.steps) exHtml += '<div class="exercise-steps"><ol class="numbered-list">' + parts.steps + '</ol></div>';
      if (parts.solution) exHtml += '<div class="toggle-container"><div class="toggle-header"><span class="toggle-label">Lösung</span><span class="toggle-arrow">&#9654;</span></div><div class="toggle-content">' + parts.solution + '</div></div>';
      exHtml += '</div></div>';
      return exHtml;
    });

    // :::code [lang]
    // code content
    // :::
    html = html.replace(/:::code(?:\s+(\w+))?\n([\s\S]*?):::/g, function (_, lang, code) {
      lang = lang || 'bash';
      return '<div class="code-block"><div class="code-header"><span class="lang">' + lang.toUpperCase() + '</span><button class="copy-btn">Kopieren</button></div><pre><code class="language-' + lang + '">' + escapeHtml(code.trim()) + '</code></pre></div>';
    });

    // :::nav-buttons prev=id,next=id
    // :::
    html = html.replace(/:::nav-buttons\s+prev="([^"]+)"\s+next="([^"]+)"/g, function (_, prev, next) {
      return '<div class="nav-buttons"><button class="nav-btn" data-target="' + prev + '">&#8592; Zurück</button><button class="nav-btn" data-target="' + next + '">Weiter &#8594;</button></div>';
    });

    return html;
  }

  function parseExercise(content) {
    var result = { goal: '', steps: '', solution: '' };
    // Parse **Ziel:** or **Goal:**
    var goalMatch = content.match(/\*\*Ziel:\*\*[\s\n]+([\s\S]*?)(?=\n\*\*(?:Schritte|Aufgaben|Steps)|\n\*\*(?:Lösung|Erwartetes)|$)/i);
    if (goalMatch) result.goal = goalMatch[1].trim();

    // Parse **Schritte:** section - get list items
    var stepsMatch = content.match(/\*\*(?:Schritte|Aufgaben|Steps):\*\*\s*\n([\s\S]*?)(?=\n\*\*(?:Lösung|Erwartetes)|$)/i);
    if (stepsMatch) {
      var items = stepsMatch[1].trim().split('\n').filter(function (l) { return l.trim().match(/^[-*]|\d+\./); });
      result.steps = items.map(function (item) {
        return '<li>' + item.replace(/^[-*]\s+|\d+\.\s+/, '') + '</li>';
      }).join('');
    }

    // Parse **Lösung:** section
    var solMatch = content.match(/\*\*(?:Lösung|Erwartetes Ergebnis):\*\*[\s\n]+([\s\S]*?)$/i);
    if (solMatch) result.solution = mdToHtml(solMatch[1].trim());

    return result;
  }

  // ---- Slide splitter ----
  function splitSlides(html) {
    // Split on ## headings (section titles)
    var parts = html.split(/(<h2 class="section-title">[\s\S]*?<\/h2>)/g);
    var slides = [];

    // Everything before first ## is the intro slide
    if (parts[0] && parts[0].trim()) {
      slides.push(parts[0].trim());
    }

    // Each ## + content until next ## is a slide
    for (var i = 1; i < parts.length; i += 2) {
      var heading = parts[i];
      var content = '';
      // Collect content until next heading
      for (var j = i + 1; j < parts.length; j++) {
        if (parts[j] && parts[j].match(/^<h2 class="section-title">/)) break;
        content += parts[j] || '';
      }
      slides.push((heading + content).trim());
    }

    return slides;
  }

  // ---- Public API ----
  var _configCache = null;

  function getConfig(cb) {
    if (_configCache) { cb(_configCache); return; }
    fetch('chapters.json')
      .then(function(r) { return r.json(); })
      .then(function(config) { _configCache = config; cb(config); })
      .catch(function() { cb(null); });
  }

  function loadChapter(chapterId, callback) {
    getConfig(function(config) {
      if (!config) { callback(null); return; }
      var chapter = null;
      for (var i = 0; i < config.chapters.length; i++) {
        if (config.chapters[i].id === chapterId) {
          chapter = config.chapters[i];
          break;
        }
      }
      if (!chapter) { callback(null); return; }

      var basePath = config.basePath || 'chapters/';
      var url = basePath + chapter.file;

      fetch(url)
        .then(function (r) {
          if (!r.ok) throw new Error('Not found: ' + url);
          return r.text();
        })
        .then(function (md) {
          var html = processMarkdown(md, chapterId);
          callback(html);
        })
        .catch(function () {
          callback(null);
        });
    });
  }

  function processMarkdown(md, chapterId) {
    // First parse custom directives
    var html = parseDirectives(md);
    // Then convert markdown to HTML
    html = mdToHtml(html);
    // Make the first <h1> the chapter-title (like Forensik-Lab)
    html = html.replace(/<h1>/, '<h1 class="chapter-title">');
    // Remove any duplicate <h1 class="chapter-title"> that was already in the HTML
    var ctCount = (html.match(/chapter-title/g) || []).length;
    if (ctCount > 1) {
      // Keep only the first chapter-title
      var first = true;
      html = html.replace(/<h1 class="chapter-title">/g, function() {
        if (first) { first = false; return '<h1 class="chapter-title">'; }
        return '<h1>';
      });
    }
    // Add complete button and nav
    // Note: complete-section-btn is already in the .md files via the exercise fix script
    return html;
  }

  function renderSlides(html) {
    var slides = splitSlides(html);
    if (slides.length === 0) slides = [html];
    return slides;
  }

  return {
    loadChapter: loadChapter,
    processMarkdown: processMarkdown,
    renderSlides: renderSlides,
    mdToHtml: mdToHtml
  };
})();
