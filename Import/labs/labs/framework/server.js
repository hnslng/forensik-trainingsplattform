const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Lab configurations
const LABS = {
  'netzwerk': {
    title: 'Netzwerktechnik Lab',
    subtitle: 'Interaktives Training',
    icon: '&#x1F310;',
    chaptersPath: path.join(__dirname, '..', 'netzwerk-content', 'chapters'),
    chaptersJsonPath: path.join(__dirname, '..', 'netzwerk-content', 'chapters.json'),
    terminalMode: 'netzwerk'
  },
  'forensik': {
    title: 'ABB IT-Fahndung',
    subtitle: 'Operative forensische Datensicherung',
    icon: '&#x1F50D;',
    chaptersPath: path.join(__dirname, '..', 'forensik-content', 'chapters'),
    chaptersJsonPath: path.join(__dirname, '..', 'forensik-content', 'chapters.json'),
    terminalMode: 'forensik'
  }
};

// Middleware to set base URL
app.use((req, res, next) => {
  const protocol = req.protocol;
  const host = req.get('host');
  req.baseUrl = `${protocol}://${host}`;
  next();
});

// Serve static files from framework
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/editor/assets', express.static(path.join(__dirname, 'assets')));

// Helper to read chapters.json
function getChapters(labId) {
  const lab = LABS[labId];
  if (!lab) return null;
  try {
    return JSON.parse(fs.readFileSync(lab.chaptersJsonPath, 'utf8'));
  } catch (e) {
    console.error(`Error reading chapters.json for ${labId}:`, e.message);
    return { chapters: [] };
  }
}

// API: Get chapters list
app.get('/api/labs/:labId/chapters', (req, res) => {
  const labId = req.params.labId;
  const chapters = getChapters(labId);
  if (!chapters) return res.status(404).json({ error: 'Lab not found' });
  res.json(chapters);
});

// API: Get chapter content
app.get('/api/labs/:labId/chapters/:chapterId', (req, res) => {
  const { labId, chapterId } = req.params;
  const lab = LABS[labId];
  if (!lab) return res.status(404).json({ error: 'Lab not found' });

  const filePath = path.join(lab.chaptersPath, `${chapterId}.md`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Chapter not found' });
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ id: chapterId, content: content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Editor API
app.post('/api/labs/:labId/editor/save', express.json(), (req, res) => {
  const { labId } = req.params;
  const { chapterId, content } = req.body;
  const lab = LABS[labId];
  if (!lab) return res.status(404).json({ error: 'Lab not found' });

  const filePath = path.join(lab.chaptersPath, `${chapterId}.md`);
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Serve lab-specific HTML with config
app.get('/:labId', (req, res) => {
  const labId = req.params.labId;
  if (!LABS[labId]) {
    // Not a lab route, serve hub or 404
    return res.status(404).send('Not found');
  }

  const lab = LABS[labId];
  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  
  // Inject lab config with base URL
  const configScript = `
    <script>
      window.LAB_CONFIG = {
        labId: '${labId}',
        title: '${lab.title}',
        subtitle: '${lab.subtitle}',
        icon: '${lab.icon}',
        terminalMode: '${lab.terminalMode}',
        baseUrl: '${req.baseUrl}'
      };
    </script>
  `;
  
  // Replace placeholder
  html = html.replace('<!-- LAB_CONFIG -->', configScript);
  res.send(html);
});

// Hub landing page
app.get('/', (req, res) => {
  const hubPath = path.join(__dirname, '..', 'lab-deploy', 'index.html');
  if (fs.existsSync(hubPath)) {
    res.sendFile(hubPath);
  } else {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Labs Hub</title><style>body{font-family:sans-serif;padding:40px;}</style></head>
      <body>
        <h1>Labs Hub</h1>
        <ul>
          <li><a href="/netzwerk">Netzwerktechnik Lab</a></li>
          <li><a href="/forensik">Linux Forensik Lab</a></li>
        </ul>
      </body>
      </html>
    `);
  }
});

// Also serve hub assets
app.use('/assets', express.static(path.join(__dirname, '..', 'lab-deploy', 'assets')));

app.listen(PORT, () => {
  console.log(`Unified Framework server running on http://localhost:${PORT}`);
  console.log(`Also accessible via: http://10.0.1.197:${PORT}`);
  console.log(`Available labs:`);
  console.log(`  http://localhost:${PORT}/netzwerk`);
  console.log(`  http://localhost:${PORT}/forensik`);
  console.log(`Hub: http://localhost:${PORT}/`);
});
