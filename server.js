const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Allow all origins - adjust for production!
app.use(bodyParser.json());

// Connect to SQLite database (file created if missing)
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error('DB error:', err.message);
  else console.log('Connected to SQLite DB');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER,
  email TEXT
)`);

// POST /api/members - add a member
app.post('/api/members', (req, res) => {
  const { name, age, email } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const sql = `INSERT INTO members (name, age, email) VALUES (?, ?, ?)`;
  db.run(sql, [name, age, email], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, age, email });
  });
});

// GET /api/members - get all members
app.get('/api/members', (req, res) => {
  db.all(`SELECT * FROM members ORDER BY id DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
