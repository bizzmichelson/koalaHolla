var router = require('express').Router();
var pool = require('../modules/pool');

// GET FUNCTION
router.get('/', function(req, res) {
    console.log('in get inventory route');
    pool.connect(function(connectionError, client, done) {
    //     if(connectionError){
    //         console.log(connectionError);
    //         res.sendStatus(500);
    //     } else {
    //         client.query('SELECT * FROM inventory', function(queryError, resultObj) {
    //             done(); // can call done within any part of this query. releases the worker.
    //             // queryError any error that happens in executing the query
    //             // resultObj response object from db via pg (pg builds out that object)
    //             // ^^ resultObj contains the result set
    //             if(queryError){
    //                 console.log(connectionError);
    //                 res.sendStatus(500);
    //             } else {
    //                 // resultObj.rows contains the result set as an array of objects
    //                 console.log('resultObj ->', resultObj.rows);
    //                 res.send(resultObj.rows); // really only need the .row portion of the data
    //             }  
    //         });
    //     }
    // });
    });
});


// POST FUNCTION
router.post('/', function(req, res){
    // var clientItem = req.body.item;
    console.log('in post inventory route -> ');
    //  pool.connect(function(connectionError, client, done) {
    //  if(connectionError){
    //      console.log(connectionError);
    //      res.sendStatus(500);
    //  } else {
    //      // query string, values to insert into query string, & callback
    //      // FOR THE LOVE OF GOD - avoid string concantenation, as it leads to SQL injections
    //      // user $1, $2, ..., $n and variables to avoid this from happening.
    //      var queryString = 'INSERT INTO inventory (item) VALUES ($1);';
    //      var values = [clientItem];
    //      client.query(queryString, values, function(queryError, resultObj) {
    //          done();
    //          if(queryError){
    //              console.log(connectionError);
    //              res.sendStatus(500);
    //          } else {
    //              console.log('Logging resultObj - > ', resultObj);
    //              res.sendStatus(201);
    //          }
    //      });
    //  }
    //  //    res.sendStatus(201);
    //  });
});

module.exports = router;