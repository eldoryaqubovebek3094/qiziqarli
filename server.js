const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8001;
const SAVE_TOKEN = process.env.SAVE_TOKEN || 'change-this-token';
const ALLOWED = new Set(['test.json','problems.json','games.json','comparison.json']);

app.use(cors());
app.use(express.json({ limit: '10mb' }));

function safeJoin(base, filename){
  const resolved = path.resolve(base, filename);
  if(!resolved.startsWith(base)) throw new Error('Invalid filename path');
  return resolved;
}

app.post('/save-json', (req, res) => {
  try{
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : (req.body && req.body.token) || req.query.token;
    if(token !== SAVE_TOKEN) return res.status(401).json({ error: 'Unauthorized' });

    const { filename, data } = req.body;
    if(!filename || !ALLOWED.has(filename)) return res.status(400).json({ error: 'Invalid filename' });
    if(typeof data === 'undefined') return res.status(400).json({ error: 'Missing data' });

    const base = path.resolve(__dirname);
    const dest = safeJoin(base, filename);
    fs.writeFileSync(dest, JSON.stringify(data, null, 2), 'utf8');
    return res.json({ ok: true, filename });
  }catch(err){
    console.error('save-json error', err);
    return res.status(500).json({ error: err.message });
  }
});

app.get('/health', (req,res)=> res.json({ok:true}));

app.listen(PORT, ()=> console.log(`Save API listening on http://localhost:${PORT}`));
