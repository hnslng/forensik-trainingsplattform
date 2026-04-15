var MarkdownLoader = (function () {
  var slides = [];
  var currentChapterId = null;

  // Parse Markdown with basic formatting
  function parseMarkdown(text) {
    if (!text) return '';

    // Replace slide separators
    var slideTexts = text.split(/^---$/m);
    slides = slideTexts.map(function(slide) {
      return slide.trim();
    });

    // Process first slide (welcome/overview)
    return processSlide(slideTexts[0] || '');
  }

  function processSlide(text) {
    return text
      // Headers
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
      // Lists
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/<li>/g, '<ul><li>').replace(/<\/li>/g, '</li></ul>')
      .replace(/<\/ul><ul>/g, '')
      // Bold/Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, lang, code) {
        return '<pre class="code-block"><code class="' + (lang || '') + '">' + 
               escapeHtml(code.trim()) + '</code><button class="copy-btn">Kopieren</button></pre>';
      })
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Blockquotes (callouts)
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      .replace(/^> Merke (.*$)/gm, '<blockquote class="callout-important"><strong>Merke:</strong> $1</blockquote>')
      .replace(/^> Tipp (.*$)/gm, '<blockquote class="callout-tip"><strong>Tipp:</strong> $1</blockquote>')
      .replace(/^> Warnung (.*$)/gm, '<blockquote class="callout-warning"><strong>Warnung:</strong> $1</blockquote>')
      // Tables
      .replace(/\|([^\n]+)\|\n\|([^\n]+)\|\n((?:\|[^\n]+\|\n?)*)/g, function(match, header, separator, rows) {
        var html = '<table><thead><tr>';
        header.split('|').filter(Boolean).forEach(function(cell) {
          html += '<th>' + cell.trim() + '</th>';
        });
        html += '</tr></thead><tbody>';
        rows.split('\n').filter(Boolean).forEach(function(row) {
          html += '<tr>';
          row.split('|').filter(Boolean).forEach(function(cell) {
            html += '<td>' + cell.trim() + '</td>';
          });
          html += '</tr>';
        });
        html += '</tbody></table>';
        return html;
      })
      // Exercise start banner
      .replace(/^::: exercise-start-banner\s*([\s\S]*?)\s*:::/g, 
        '<div class="exercise-start-banner"><h3>Übung starten</h3><p>$1</p><button class="exercise-start-btn">Übung starten &rarr;</button></div>')
      // Exercise boxes
      .replace(/^::: exercise-box\s*([\s\S]*?)\s*:::/g, 
        '<div class="exercise-box">$1</div>')
      // Output blocks
      .replace(/^::: output-block\s*([\s\S]*?)\s*:::/g, 
        '<div class="output-block"><h4>Erwartete Ausgabe</h4><pre>$1</pre><button class="toggle-output-btn">Ausgabe anzeigen/verbergen</button></div>')
      // Feature grids
      .replace(/^::: feature-grid\s*([\s\S]*?)\s*:::/g, 
        '<div class="feature-grid">$1</div>')
      // Feature grid items
      .replace(/^::: feature-item\s*\n!\[(.*?)\]\((.*?)\)\s*\n#### (.*?)\s*\n(.*?)\s*\n:::/gms, 
        '<div class="feature-item"><img src="$2" alt="$1"><h4>$3</h4><p>$4</p></div>')
      // Paragraphs
      .replace(/^([^<\n].*$)/gm, '<p>$1</p>')
      // Remove empty paragraphs
      .replace(/<p><\/p>/g, '');
  }

  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/"/g, "&quot;")
               .replace(/'/g, "&#039;");
  }

  function getSlides() {
    return slides.map(processSlide);
  }

  function loadChapter(chapterId, callback) {
    if (!window.LAB_CONFIG) {
      console.error('LAB_CONFIG not defined');
      return;
    }
    
    currentChapterId = chapterId;
    
    fetch(window.LAB_CONFIG.baseUrl + '/api/labs/' + window.LAB_CONFIG.labId + '/chapters/' + chapterId)
      .then(function(response) {
        if (!response.ok) throw new Error('Chapter not found');
        return response.json();
      })
      .then(function(data) {
        var html = parseMarkdown(data.content);
        if (callback) callback(html);
      })
      .catch(function(err) {
        console.error('Failed to load chapter:', err);
        if (callback) callback('<div class="error">Kapitel konnte nicht geladen werden.</div>');
      });
  }

  function render(text, callback) {
    var html = parseMarkdown(text);
    if (callback) callback(html);
  }

  return {
    loadChapter: loadChapter,
    render: render,
    getSlides: getSlides,
    currentChapterId: function() { return currentChapterId; }
  };
})();
