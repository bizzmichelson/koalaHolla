var router = require('express').Router();
var pool = require('../modules/pool');

// GET FUNCTION
router.get('/', function (req, res) {
    console.log('in get inventory route');
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM koalas_inventory', function (queryError, resultObj) {
                done();
                if (queryError) {
                    console.log(connectionError);
                    res.sendStatus(500);
                } else {
                    console.log('resultObj ->', resultObj.rows);
                    res.send(resultObj.rows);
                    console.log('console logging resultObj.rows' + resultObj.rows);
                }
            });
        }
    });
});

// POST FUNCTION
router.post('/', function (req, res) {
    var koalaName = req.body.name;
    var koalaAge = req.body.age;
    var koalaGender = req.body.gender;
    var koalaTransfer = req.body.readyForTransfer;
    var koalaNotes = req.body.notes;
    console.log('in post inventory route -> ');
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log(connectionError, 'logging connection1');
            res.sendStatus(500);
        } else {
            var queryString =
                'INSERT INTO koalas_inventory(name, gender, age, ready_for_transfer, notes) VALUES($1, $2, $3, $4, $5)';
            var values = [
                koalaName,
                koalaAge,
                koalaGender,
                koalaTransfer,
                koalaNotes
            ];
            console.log('Logging var values in else of first if loop -> ', values);

            client.query(queryString, values, function (queryError, resultObj) {
                done();
                if (queryError) {
                    console.log(connectionError, 'logging connectionerror2');
                    res.sendStatus(500);
                } else {
                    console.log('Logging resultObj - > ', resultObj);
                    res.sendStatus(201);
                }
            });
        }
        //    res.sendStatus(201);
    });
});

module.exports = router;