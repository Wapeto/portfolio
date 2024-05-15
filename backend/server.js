import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const db = new sqlite3.Database('./database.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the database.');
    }
});

app.use(cors());
app.use(bodyParser.json());

app.get('/get-projects', (req, res) => {
    const { type, state } = req.query;
    let query = "";

    // Convert query parameters to integers or handle them appropriately
    const stateNum = parseInt(state, 10);

    if (type === 'featured') {
        query = stateNum === 0 ?
            "SELECT id, name as title, description, tags, started_date, finished_date, purpose, link, image FROM projects WHERE purpose = 'school'" :
            "SELECT id, name as title, description, tags, started_date, finished_date, purpose, link, image FROM projects WHERE purpose = 'personal'";
    } else if (type === 'future') {
        query = stateNum === 0 ?
            "SELECT id, name as title, description, tags, started_date, finished_date, purpose, link, image FROM projects WHERE purpose = 'draft'" :
            "SELECT id, name as title, description, tags, started_date, finished_date, purpose, link, image FROM projects WHERE purpose = 'concept'";
    }

    if (query) {
        db.all(query, (err, projects) => {
            if (err) {
                res.status(500).send({ error: err.message });
                return;
            }
            res.json(projects);
        });
    } else {
        res.status(400).send({ error: 'Invalid query parameters' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
