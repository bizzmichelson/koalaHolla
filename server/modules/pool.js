var Pool = require('pg').Pool;
var config = {
    host: 'localhost',
    port: 5432,
    database: 'koalas-inventory',
    max: 20 
};
var ourPool = new Pool(config);

module.exports = ourPool;