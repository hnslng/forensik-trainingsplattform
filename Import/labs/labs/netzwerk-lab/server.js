const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

const LAB_ROOT = path.resolve(__dirname);

app.use(express.json({ limit: '5mb' }));

// Serve static files from netzwerk-lab root
app.use(express.static(LAB_ROOT));

// API endpoints
app.get('/api/chapters', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(path.join(LAB_ROOT, 'chapters.json'), 'utf8'));
    const chDir = path.join(LAB_ROOT, 'chapters');
    const chapters = config.chapters.map(ch => {
      const fp = path.join(chDir, ch.file);
      const exists = fs.existsSync(fp);
      const stats = exists ? fs.statSync(fp) : null;
      return { ...ch, exists, size: stats ? stats.size : 0, modified: stats ? stats.mtime : null };
    });
    res.json({ success: true, chapters });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

app.get('/api/chapters/:id', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(path.join(LAB_ROOT, 'chapters.json'), 'utf8'));
    const ch = config.chapters.find(c => c.id === req.params.id);
    if (!ch) return res.status(404).json({ success: false, error: 'Not found' });
    const fp = path.join(LAB_ROOT, 'chapters', ch.file);
    if (!fs.existsSync(fp)) return res.status(404).json({ success: false, error: 'File missing' });
    res.json({ success: true, id: ch.id, file: ch.file, content: fs.readFileSync(fp, 'utf8') });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

app.put('/api/chapters/:id', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(path.join(LAB_ROOT, 'chapters.json'), 'utf8'));
    const ch = config.chapters.find(c => c.id === req.params.id);
    if (!ch) return res.status(404).json({ success: false, error: 'Not found' });
    fs.writeFileSync(path.join(LAB_ROOT, 'chapters', ch.file), req.body.content, 'utf8');
    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

app.post('/api/chapters', (req, res) => {
  try {
    const { id, title, section, content } = req.body;
    if (!id || !title || !section) return res.status(400).json({ success: false, error: 'id, title, section required' });
    const fileName = id + '.md';
    fs.writeFileSync(path.join(LAB_ROOT, 'chapters', fileName), content || '', 'utf8');
    const config = JSON.parse(fs.readFileSync(path.join(LAB_ROOT, 'chapters.json'), 'utf8'));
    if (config.chapters.find(c => c.id === id)) return res.status(409).json({ success: false, error: 'ID exists' });
    config.chapters.push({ id, file: fileName, title, section });
    fs.writeFileSync(path.join(LAB_ROOT, 'chapters.json'), JSON.stringify(config, null, 2), 'utf8');
    res.json({ success: true, id });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

app.delete('/api/chapters/:id', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(path.join(LAB_ROOT, 'chapters.json'), 'utf8'));
    const idx = config.chapters.findIndex(c => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Not found' });
    const fp = path.join(LAB_ROOT, 'chapters', config.chapters[idx].file);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
    config.chapters.splice(idx, 1);
    fs.writeFileSync(path.join(LAB_ROOT, 'chapters.json'), JSON.stringify(config, null, 2), 'utf8');
    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Netzwerk-Lab + Editor: http://localhost:${PORT}`);
  console.log(`Im Netzwerk:           http://$(ip -4 addr show | grep 'inet ' | grep -v 127 | head -1 | awk '{print $2}' | cut -d/ -f1):${PORT}`);
});
