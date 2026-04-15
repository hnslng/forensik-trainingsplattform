const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const LAB_ROOT = path.resolve(__dirname, '..');
const CHAPTERS_DIR = path.join(LAB_ROOT, 'chapters');
const CONFIG_FILE = path.join(LAB_ROOT, 'chapters.json');

app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(LAB_ROOT)));
app.use('/editor', express.static(__dirname));

// List all chapters with metadata
app.get('/api/chapters', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    const chapters = config.chapters.map(ch => {
      const filePath = path.join(CHAPTERS_DIR, ch.file);
      const exists = fs.existsSync(filePath);
      const stats = exists ? fs.statSync(filePath) : null;
      return {
        ...ch,
        exists,
        size: stats ? stats.size : 0,
        modified: stats ? stats.mtime : null
      };
    });
    res.json({ chapters, basePath: config.basePath || 'chapters/' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get single chapter content
app.get('/api/chapters/:id', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    const chapter = config.chapters.find(c => c.id === req.params.id);
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
    const filePath = path.join(CHAPTERS_DIR, chapter.file);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });
    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ ...chapter, content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Update chapter content
app.put('/api/chapters/:id', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    const chapter = config.chapters.find(c => c.id === req.params.id);
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
    const filePath = path.join(CHAPTERS_DIR, chapter.file);
    fs.writeFileSync(filePath, req.body.content, 'utf8');
    res.json({ success: true, file: chapter.file });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Create new chapter
app.post('/api/chapters', (req, res) => {
  try {
    const { id, title, section, content } = req.body;
    if (!id || !title || !section) return res.status(400).json({ error: 'id, title, section required' });

    const fileName = id + '.md';
    const filePath = path.join(CHAPTERS_DIR, fileName);

    // Write file
    fs.writeFileSync(filePath, content || '', 'utf8');

    // Update config
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    if (config.chapters.find(c => c.id === id)) {
      return res.status(409).json({ error: 'Chapter ID already exists' });
    }
    config.chapters.push({ id, file: fileName, title, section });
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');

    res.json({ success: true, id, file: fileName });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Delete chapter
app.delete('/api/chapters/:id', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    const idx = config.chapters.findIndex(c => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Chapter not found' });
    const chapter = config.chapters[idx];
    const filePath = path.join(CHAPTERS_DIR, chapter.file);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    config.chapters.splice(idx, 1);
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Reorder chapters
app.put('/api/chapters-order', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    const order = req.body.order; // array of ids
    const reordered = order.map(id => config.chapters.find(c => c.id === id)).filter(Boolean);
    if (reordered.length !== config.chapters.length) {
      return res.status(400).json({ error: 'Missing chapters in order' });
    }
    config.chapters = reordered;
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Editor running at http://localhost:${PORT}/editor/`);
  console.log(`Lab preview at http://localhost:${PORT}/`);
});
