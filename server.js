const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let scores = [];

app.get('/leaderboard', (req, res) => {
    res.json(scores);
});

app.post('/leaderboard', (req, res) => {
    const { name, points } = req.body;
    if (name && points >= 0) {
        scores.push({ name, points });
        scores.sort((a, b) => b.points - a.points);
        res.status(201).json({ message: 'Score added successfully' });
    } else {
        res.status(400).json({ message: 'Invalid input' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});