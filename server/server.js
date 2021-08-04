const express = require('express');
const bodyParser = require('body-parser');
const postgres = require('pg');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// Create a connection "pool" to our postgres DB
const pool = new postgres.Pool({
    database: 'jazzy_sql',
    // optional params
    host: 'localhost',
    port: 5432
});

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

// TODO - Replace static content with a database tables
const artistList = [ 
    {
        name: 'Ella Fitzgerald',
        birthdate: '04-25-1917'
    },
    {
        name: 'Dave Brubeck',
        birthdate: '12-06-1920'
    },       
    {
        name: 'Miles Davis',
        birthdate: '05-26-1926'
    },
    {
        name: 'Esperanza Spalding',
        birthdate: '10-18-1984'
    },
]
const songList = [
    {
        title: 'Take Five',
        length: '5:24',
        released: '1959-09-29'
    },
    {
        title: 'So What',
        length: '9:22',
        released: '1959-08-17'
    },
    {
        title: 'Black Gold',
        length: '5:17',
        released: '2012-02-01'
    }
];

app.get('/artist', (req, res) => {
    console.log(`In /songs GET`);
    let sqlQuery = `
        SELECT * FROM "artist"
        ORDER BY "birthdate" DESC;
        `;
    pool.query(sqlQuery).then((dbResponse) => {
        // console.log(dbResponse.rows);
        res.send(dbResponse.rows);
    }).catch((error) => {
        console.log('Fetching data failed.', error);
        res.sendStatus(500);
    })
});

app.post('/artist', (req, res) => {
    let sqlQuery = `
        INSERT INTO "artist"
            ("name", "birthdate")
        VALUES
            ($1, $2)
        `;
    let sqlParameters = [
        req.body.name,
        req.body.birthdate
    ];
    pool.query(sqlQuery, sqlParameters).then((dbResponse) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Failed to post data.', error);
        res.sendStatus(500);
    })
});

app.get('/song', (req, res) => {
    console.log(`In /songs GET`);
    res.send(songList);
});

app.post('/song', (req, res) => {
    songList.push(req.body);
    res.sendStatus(201);
});


