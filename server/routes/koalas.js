var router = require('express').Router();
var pool = require('../modules/pool');

// GET FUNCTION
router.get('/', function (req, res) {
    // console.log('in get inventory route');
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
                    // console.log('console logging resultObj.rows inside /koala GET function', resultObj.rows);
                    res.send(resultObj.rows);
                }
            });
        }
    });
});

// POST FUNCTION
router.post('/', function (req, res) {
    var koalaID = req.body.id;
    console.log('in post inventory route!');
    if (koalaID == undefined) {
        koalaDBPush(req, res);
    } else {
        console.log('Calling koalaDelete on koalaID ' + koalaID);
        koalaDelete(req, res);
    }
}); // end POST function

router.post('/update/:id', function (req, res) {
    var koalaToTransfer = req.params.id;
    console.log('inside /update post of /koalas. Koala to xfer is ->', koalaToTransfer);
    if (koalaToTransfer == undefined) {
        console.log('Logging "undefined" error inside koalas/update');
        res.sendStatus(500);
    } else {
        console.log('Calling /update on koalaID ' + koalaToTransfer);
        koalaUpdate(koalaToTransfer, res);
    }
});

function koalaUpdate(req, res) {
    console.log('logging req inside koalaUpdate() -> ', req);
    console.log('inside koalaUpdate() of /koalas. Koala to xfer is ->', req);
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log('connection error in koalaDelete ', connectionError);
            res.sendStatus(500);
        } else {
            var queryString = "UPDATE koalas_inventory SET ready_for_transfer='Y' WHERE id=($1);";
            var values = [req];
            client.query(queryString, values, function (err, result) {
                done();
                if (err) {
                    console.log(err, ' <- logging queryError in koalaDelete query');
                    res.sendStatus(500);
                } else {
                    console.log('Logging resultObj from koala update- > ', result.rows);
                    res.send(result);
                    // res.sendStatus(result); // sendStatus breaks the function
                }
            });
        }
    });
}

function koalaDelete(req, res) {
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log('connection error in koalaDelete ', connectionError);
            res.sendStatus(500);
        } else {
            var koalaID = req.body.id;
            console.log('deleting koala #', koalaID);
            var queryString = "DELETE FROM koalas_inventory WHERE id=($1);";
            var values = [koalaID];
            client.query(queryString, values, function (err, result) {
                done();
                if (err) {
                    console.log(err, 'logging queryError in koalaDelete query');
                    res.sendStatus(500);
                } else {
                    console.log('Logging resultObj from koala Delete- > ', result.rows);
                    res.send(result.rows);
                }
            });
        }
    });
} // end delete function

function koalaDBPush(req, res) {
    var koalaName = req.body.name;
    var koalaAge = req.body.age;
    var koalaGender = req.body.gender;
    var koalaTransfer = req.body.readyForTransfer;
    var koalaNotes = req.body.notes;
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            // console.log(connectionError, 'logging connection1');
            res.sendStatus(500);
        } else {
            var queryString =
                'INSERT INTO koalas_inventory(name, age, gender, ready_for_transfer, notes) VALUES($1, $2, $3, $4, $5)';
            var values = [
                koalaName,
                koalaAge,
                koalaGender,
                koalaTransfer,
                koalaNotes
            ];
            // console.log('Logging var values in else of first if loop -> ', values);
            client.query(queryString, values, function (queryError, resultObj) {
                done();
                if (queryError) {
                    // console.log(connectionError, 'logging connectionerror2');
                    res.sendStatus(500);
                } else {
                    console.log('Logging resultObj - > ', resultObj.rows);
                    res.send(resultObj.rows);
                }
            });
        }
        //    res.sendStatus(201);
    });
} // end push to DB function

module.exports = router;