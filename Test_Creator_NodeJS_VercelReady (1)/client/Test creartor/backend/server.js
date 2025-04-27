
async function saveData(data) {
    try {
        const response = await fetch('http://localhost:3000/save-test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Test saqlandi!");
        } else {
            console.error("Serverda xatolik!");
        }
    } catch (error) {
        console.error("Aloqa xatosi:", error);
    }
}


const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const db = new sqlite3.Database('tests.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        // Create tables
        db.run(`
            CREATE TABLE IF NOT EXISTS tests (
                testId TEXT PRIMARY KEY,
                answers TEXT,
                startTime TEXT,
                endTime TEXT,
                scoring TEXT
            )
        `);
        db.run(`
            CREATE TABLE IF NOT EXISTS results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                testId TEXT,
                firstName TEXT,
                lastName TEXT,
                score REAL,
                grade TEXT,
                FOREIGN KEY (testId) REFERENCES tests(testId)
            )
        `);
    }
});

// API to create a test
app.post('/tests', (req, res) => {
    const { testId, answers, startTime, endTime, scoring } = req.body;
    const stmt = db.prepare('INSERT INTO tests (testId, answers, startTime, endTime, scoring) VALUES (?, ?, ?, ?, ?)');
    stmt.run(testId, JSON.stringify(answers), startTime, endTime, JSON.stringify(scoring), (err) => {
        if (err) {
            res.status(500).json({ error: 'Failed to create test' });
        } else {
            res.json({ message: 'Test created successfully', testId });
        }
    });
    stmt.finalize();
});

// API to get a test by ID
app.get('/tests/:testId', (req, res) => {
    const testId = req.params.testId;
    db.get('SELECT * FROM tests WHERE testId = ?', [testId], (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve test' });
        } else if (!row) {
            res.status(404).json({ error: 'Test not found' });
        } else {
            res.json({
                testId: row.testId,
                answers: JSON.parse(row.answers),
                startTime: row.startTime,
                endTime: row.endTime,
                scoring: JSON.parse(row.scoring)
            });
        }
    });
});

// API to submit test results
app.post('/tests/:testId/results', (req, res) => {
    const testId = req.params.testId;
    const { firstName, lastName, score, grade } = req.body;
    const stmt = db.prepare('INSERT INTO results (testId, firstName, lastName, score, grade) VALUES (?, ?, ?, ?, ?)');
    stmt.run(testId, firstName, lastName, score, grade, (err) => {
        if (err) {
            res.status(500).json({ error: 'Failed to save result' });
        } else {
            res.json({ message: 'Result submitted successfully' });
        }
    });
    stmt.finalize();
});

// API to get test results for a test ID
app.get('/tests/:testId/results', (req, res) => {
    const testId = req.params.testId;
    db.all('SELECT * FROM results WHERE testId = ?', [testId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve results' });
        } else {
            res.json(rows.map(row => ({
                firstName: row.firstName,
                lastName: row.lastName,
                score: row.score,
                grade: row.grade
            })));
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});