const pg = require('pg');

// set up db connection
const pool = new pg.Pool({
    database: 'jazzy_sql',
    host: 'localhost',
    port: 5432
});

module.exports = pool;