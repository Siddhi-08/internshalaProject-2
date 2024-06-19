const express = require('express');
const app = express();
const port = 3000;

const questions = {
    Technology: [
        { question: "What is your favorite programming language?" },
        { question: "How many years of experience do you have in programming?" }
    ],
    Health: [
        { question: "How often do you exercise?" },
        { question: "What is your diet preference?" }
    ],
    Education: [
        { question: "What is your highest qualification?" },
        { question: "What field of study are you in?" }
    ]
};

app.get('/questions', (req, res) => {
    const topic = req.query.topic;
    if (questions[topic]) {
        res.json(questions[topic]);
    } else {
        res.status(404).send('Topic not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
