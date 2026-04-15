#!/usr/bin/env node
/**
 * Converts Netzwerk-Lab Markdown chapters into a static chapters.js
 * (same pattern as Forensik-Lab)
 */
const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, 'netzwerk-lab', 'chapters');
const CONFIG_FILE = path.join(__dirname, 'netzwerk-lab', 'chapters.json');
const OUTPUT = path.join(__dirname, 'lab-deploy', 'netzwerk-lab', 'assets', 'js', 'chapters.js');

// ---- Markdown processing (mirrors markdown-loader.js) ----

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function parseTable(html) {
  const lines = html.split('\n');
  const result = [];
  let inTable = false;
  let tableRows = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      if (line.match(/^\|[\s\-:|]+\|$/)) continue;
      inTable = true;
      const cells = line.split('|').filter(c => c.trim() !== '');
      tableRows.push(cells.map(c => c.trim()));
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
  let html = '<div class="table-container"><table><thead><tr>';
  for (let h = 0; h < rows[0].length; h++) html += '<th>' + rows[0][h] + '</th>';
  html += '</tr></thead><tbody>';
  for (let r = 1; r < rows.length; r++) {
    html += '<tr>';
    for (let c = 0; c < rows[r].length; c++) html += '<td>' + rows[r][c] + '</td>';
    html += '</tr>';
  }
  html += '</tbody></table></div>';
  return html;
}

function wrapLists(html) {
  html = html.replace(/((?:<li class="numbered">[\s\S]*?<\/li>\s*)+)/g, '<ol class="numbered-list">$1</ol>');
  html = html.replace(/((?:<li>[\s\S]*?<\/li>\s*)+)/g, '<ul>$1</ul>');
  return html;
}

function mdToHtml(md) {
  let html = md;
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
    '<pre><code class="language-' + (lang || 'bash') + '">' + escapeHtml(code.trim()) + '</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="section-title">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = parseTable(html);
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="numbered">$1</li>');
  html = html.replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>');
  html = wrapLists(html);
  html = html.replace(/^(?!<[a-z/])(.+)$/gm, (_, line) => {
    if (line.trim() === '') return '';
    return '<p>' + line + '</p>';
  });
  html = html.replace(/\n{3,}/g, '\n\n');
  return html;
}

function parseExercise(content) {
  const result = { goal: '', steps: '', solution: '' };
  const goalMatch = content.match(/\*\*Ziel:\*\*[\s\n]+([\s\S]*?)(?=\n\*\*(?:Schritte|Aufgaben|Steps)|\n\*\*(?:Lösung|Erwartetes)|$)/i);
  if (goalMatch) result.goal = goalMatch[1].trim();
  const stepsMatch = content.match(/\*\*(?:Schritte|Aufgaben|Steps):\*\*\s*\n([\s\S]*?)(?=\n\*\*(?:Lösung|Erwartetes)|$)/i);
  if (stepsMatch) {
    const items = stepsMatch[1].trim().split('\n').filter(l => l.trim().match(/^[-*]|\d+\./));
    result.steps = items.map(item => '<li>' + item.replace(/^[-*]\s+|\d+\.\s+/, '') + '</li>').join('');
  }
  const solMatch = content.match(/\*\*(?:Lösung|Erwartetes Ergebnis):\*\*[\s\n]+([\s\S]*?)$/i);
  if (solMatch) result.solution = mdToHtml(solMatch[1].trim());
  return result;
}

function parseDirectives(md) {
  let html = md;
  html = html.replace(/:::callout\s+(\w+)(?:\s+(.+?))?\n([\s\S]*?):::/g, (_, type, title, content) => {
    const icon = { context: '&#9432;', info: '&#9432;', warning: '&#9888;', tip: '&#128161;', danger: '&#9888;' }[type] || '&#9432;';
    const titleHtml = title ? '<div class="callout-header">' + icon + ' ' + title + '</div>' : '';
    return '<div class="callout callout-' + type + '">' + titleHtml + mdToHtml(content.trim()) + '</div>';
  });
  html = html.replace(/:::exercise(?:\s+(.+?))?\n([\s\S]*?):::/g, (_, title, content) => {
    const parts = parseExercise(content);
    let exHtml = '<div class="exercise-box">';
    exHtml += '<div class="exercise-header"><span class="exercise-badge">\u00dcbung</span>';
    exHtml += '<span class="exercise-name">' + (title || 'Aufgabe') + '</span></div>';
    exHtml += '<div class="exercise-body">';
    if (parts.goal) exHtml += '<div class="exercise-goal"><div class="goal-label">Ziel</div><p>' + parts.goal + '</p></div>';
    if (parts.steps) exHtml += '<div class="exercise-steps"><ol class="numbered-list">' + parts.steps + '</ol></div>';
    if (parts.solution) exHtml += '<div class="toggle-container"><div class="toggle-header"><span class="toggle-label">L\u00f6sung</span><span class="toggle-arrow">&#9654;</span></div><div class="toggle-content">' + parts.solution + '</div></div>';
    exHtml += '</div></div>';
    return exHtml;
  });
  html = html.replace(/:::code(?:\s+(\w+))?\n([\s\S]*?):::/g, (_, lang, code) => {
    lang = lang || 'bash';
    return '<div class="code-block"><div class="code-header"><span class="lang">' + lang.toUpperCase() + '</span><button class="copy-btn">Kopieren</button></div><pre><code class="language-' + lang + '">' + escapeHtml(code.trim()) + '</code></pre></div>';
  });
  html = html.replace(/:::nav-buttons\s+prev="([^"]+)"\s+next="([^"]+)"/g, (_, prev, next) =>
    '<div class="nav-buttons"><button class="nav-btn" data-target="' + prev + '">\u2190 Zur\u00fcck</button><button class="nav-btn" data-target="' + next + '">Weiter \u2192</button></div>');
  return html;
}

function processMarkdown(md) {
  let html = parseDirectives(md);
  html = mdToHtml(html);
  html = html.replace(/<h1>/, '<h1 class="chapter-title">');
  let ctCount = (html.match(/chapter-title/g) || []).length;
  if (ctCount > 1) {
    let first = true;
    html = html.replace(/<h1 class="chapter-title">/g, () => {
      if (first) { first = false; return '<h1 class="chapter-title">'; }
      return '<h1>';
    });
  }
  return html;
}

// ---- Escape for JS string ----
function escapeJs(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, "' +\n    '")
    .replace(/\r/g, '');
}

// ---- Build chapters.js ----
const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));

let output = 'var Chapters = {};\n\n';

// Welcome page
output += `Chapters.welcome = function () {
  return '<div class="welcome-hero">' +
    '<p class="welcome-hero-eyebrow">NETZWERKTECHNIK TRAINING</p>' +
    '<h1>Netzwerkgrundlagen &amp; Praxis</h1>' +
    '<p class="welcome-hero-desc">Von OSI-Modell bis Troubleshooting &mdash; interaktives Training mit simuliertem Terminal, &Uuml;bungen und Schritt-f&uuml;r-Schritt-Erkl&auml;rungen.</p>' +
    '<button class="welcome-cta" onclick="App.navigateTo(\\'ch01-osi\\')">Training starten &rarr;</button>' +
    '</div>' +

    '<div class="welcome-note">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' +
    '<span>Alle &Uuml;bungen werden im simulierten Terminal durchgef&uuml;hrt.</span>' +
    '</div>' +

    '<div class="welcome-modules">' +

    '<div class="welcome-module" onclick="App.navigateTo(\\'ch01-osi\\')">' +
    '<div class="welcome-module-left"><span class="welcome-module-num">01</span></div>' +
    '<div class="welcome-module-body">' +
    '<h2>Grundlagen &amp; Modelle</h2>' +
    '<p>OSI-Modell, TCP/IP-Stack, Netzwerkger&auml;te, IPv4/IPv6, MAC-Adressen, ARP</p>' +
    '</div>' +
    '<span class="welcome-module-arrow">&rarr;</span>' +
    '</div>' +

    '<div class="welcome-module" onclick="App.navigateTo(\\'ch06-tcp-udp\\')">' +
    '<div class="welcome-module-left"><span class="welcome-module-num">02</span></div>' +
    '<div class="welcome-module-body">' +
    '<h2>Protokolle &amp; Dienste</h2>' +
    '<p>TCP/UDP, DNS, DHCP, HTTP/HTTPS, Verschl&uuml;sselung, ICMP &amp; Troubleshooting</p>' +
    '</div>' +
    '<span class="welcome-module-arrow">&rarr;</span>' +
    '</div>' +

    '<div class="welcome-module" onclick="App.navigateTo(\\'ch12-linux-tools\\')">' +
    '<div class="welcome-module-left"><span class="welcome-module-num">03</span></div>' +
    '<div class="welcome-module-body">' +
    '<h2>Praxis &amp; Analyse</h2>' +
    '<p>Linux-Netzwerktools, Routing, Firewall, Wireshark, Paketanalyse, Case Study</p>' +
    '</div>' +
    '<span class="welcome-module-arrow">&rarr;</span>' +
    '</div>' +

    '</div>';
};\n\n`;

// Process each chapter
for (const ch of config.chapters) {
  const fp = path.join(CHAPTERS_DIR, ch.file);
  if (!fs.existsSync(fp)) {
    console.warn(`WARN: ${ch.file} not found, skipping`);
    continue;
  }
  const md = fs.readFileSync(fp, 'utf8');
  const html = processMarkdown(md);
  
  // Escape for JS string literal
  const escaped = html
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, "\\n");
  
  output += `Chapters['${ch.id}'] = function () {\n  return '${escaped}';\n};\n\n`;
}

fs.writeFileSync(OUTPUT, output, 'utf8');
console.log(`Generated ${OUTPUT} (${Math.round(output.length / 1024)} KB)`);
console.log(`${config.chapters.length} chapters processed`);
