const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg')
let artistRouter = require('./routes/artist');
let songRouter = require('./routes/song');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));
app.use('/artist', artistRouter);
app.use('/song', songRouter);




app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

;



