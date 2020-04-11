var express = require('express');
var app = express();

app.get('/game', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'admin',
        password: 'It6cJD8KXL820EwP5HRK',
        server: 'awsstadium471.c1vy3mzyytfc.us-east-2.rds.amazonaws.com', 
        database: 'SPORTDBv2' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT * FROM GAME', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

app.post('/game', function (req, res) {
    console.log("POST REQUEST");
    console.log(req.body.a);
    
});


var server = app.listen(80, function () {
    console.log('Server is running..');
});

