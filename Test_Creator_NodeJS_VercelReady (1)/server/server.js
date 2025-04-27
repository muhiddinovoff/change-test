import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const filePath = './tests.json';

app.post('/save-test', (req, res) => {
    const testData = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        let tests = [];
        if (!err && data) {
            tests = JSON.parse(data);
        }

        tests.push(testData);

        fs.writeFile(filePath, JSON.stringify(tests, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: 'Xatolik yuz berdi!' });
            } else {
                res.status(200).send({ message: 'Test saqlandi!' });
            }
        });
    });
});

app.get('/get-tests', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Testlarni o'qishda xatolik!' });
        } else {
            res.status(200).send(JSON.parse(data || '[]'));
        }
    });
});

app.listen(port, () => {
    console.log(`Server ishga tushdi: http://localhost:${port}`);
});