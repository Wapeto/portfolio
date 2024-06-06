import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import process from 'process';
import nodemailer from "nodemailer";
import dotenv from 'dotenv';


if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: '../.env' });
}

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '../backend/database.sqlite');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the database.');
    }
});

app.use(cors());
app.use(bodyParser.json());

app.get('/api/get-projects', (req, res) => {
    const { type, state } = req.query;
    let query = "";

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


app.post('/api/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    let pass = process.env.EMAIL_PASS;
    console.log("pass: ", pass);

    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dupetopetoman@gmail.com',
            pass: pass
        }
    });

    // Set up email data
    let mailOptions = {
        from: 'dupetopetoman@gmail.com',
        to: 'wapetoglock@gmail.com',
        subject: 'New contact email from wapeto.net',
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n ${message}`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Received form submission: ${name} - ${email} - ${message}`);
        res.json({ message: 'Form data received and email sent' });
    } catch (error) {
        console.error(`Error occurred while sending email: ${error}`);
        res.status(500).json({ message: 'Error occurred while sending email' });
    }
});
// Export the app as a serverless function
export default (req, res) => {
    app(req, res);
};

// Start the server locally for development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}