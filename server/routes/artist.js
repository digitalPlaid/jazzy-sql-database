const express = require('express');
const router = express.Router();
const pool = require('../pool');


router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
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
})

module.exports = router;