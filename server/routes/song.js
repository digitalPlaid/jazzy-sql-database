const express = require('express');
const router = express.Router();
const pool = require('../pool');


router.get('/', (req, res) => {
    console.log(`In /songs GET`);
    let sqlQuery = `
        SELECT * FROM "song"
        ORDER BY "title";
        `;
    pool.query(sqlQuery).then((dbResponse) => {
        // console.log('song get: ', dbResponse.rows);
        res.send(dbResponse.rows);
    }).catch((error) => {
        console.log('Songs failed to GET', error);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    let sqlQuery = `
        INSERT INTO "song"
            ("title", "length", "released")
        VALUES
            ($1, $2, $3)
        `;
    let sqlParameters = [
        req.body.title,
        req.body.length,
        req.body.released
    ]
    pool.query(sqlQuery, sqlParameters).then((dbResponse) => {
        res.send(dbResponse.rows);
    }).catch((error) => {
        console.log('Failed to post song', error);
        res.sendStatus(500);
    })
});


module.exports = router;