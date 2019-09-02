const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./data/db');
const dogRouter = require('./routes/dog-router');

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Doggo Dates!!');
});

app.use('/api', dogRouter);

// for serving profile pictures
app.use('/uploads/profile', express.static(__dirname + '/data/uploads/profile'));

// for serving album images
app.use('/uploads/album', express.static(__dirname + '/data/uploads/album'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));