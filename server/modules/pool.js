// One pool per project
// pg is node module we need the 'Pool' create functionality
var Pool = require("pg").Pool; // must be captilized

var config = {
  host: "localhost", // where does the db server live
  port: 5432, // what port is it listening on - 5432 default
  database: "koalas-inventory",
  max: 20 // number of clients in the pool
};

// ourPool is an instance of a pool that knows our configuration
var ourPool = new Pool(config);

module.exports = ourPool;