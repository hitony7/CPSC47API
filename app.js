var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json());

//Congfigure the database;
var sql = require("mssql");
var config = {
    user: 'admin',
    password: 'It6cJD8KXL820EwP5HRK',
    server: 'awsstadium471.c1vy3mzyytfc.us-east-2.rds.amazonaws.com', 
    database: 'SPORTDBv2',
    options: {
        "encrypt": true,
        "enableArithAbort": true
    }
};

//Endpoint stadiumlist
app.get('/stadiumlist', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('SELECT * FROM STADIUM', function (err, results) {
            if (err) console.log(err)
            // send records as a response
            var s = []
            for(var i in results.recordset){
                var temp = {
                    "Stadium_ID":results.recordset[i]["Stadium_ID"]
                }
                s.push(temp)
            }
            res.send(s);
        });
    });
});

//Endpoint stadiumlist
app.get('/stadium', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        if(req.query["stadiumid"]!=undefined){
            request.query('SELECT * FROM STADIUM', function (err, results) {
                if (err) console.log(err)
                // send records as a response
                var stadiumid = req.query["stadiumid"]
                for(var i in results.recordset){
                    if(results.recordset[i]["Stadium_ID"]==stadiumid){
                        res.send(results.recordset[i])
                        return
                    }
                }
                var respond = {
                    "status":"Not Found"
                }
                res.send(respond);
            });
        }else{
            var respond = {
                "status":"Not Found"
            }
            res.send(respond)
        }
        
    });
});

//Endpoint Customer
app.get('/customer', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        request.query('SELECT * FROM CUSTOMER', function (err, results) {
            if (err) console.log(err)
            res.send(results.recordset);
        });
        
    });
});

//Endpoint Customer, Update 
app.put('/customer/:ssn', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);
        //console.log(req.params);
        //console.log(req.query);
        //console.log(req.body);
        //Check if all values
        if(req.body["fname"]==undefined || req.body["lname"]==undefined){
            res.send({
                "Status": "Fali: Parameters are not complete"
            });
            return
        };
        
        var request = new sql.Request();
        request.query('SELECT * FROM CUSTOMER', function (err, results) {
            if (err) console.log(err)
            // send records as a response
            for(var i in results.recordset){
                if(results.recordset[i]["SSN"]==req.params["ssn"]){
                    query_construction = "UPDATE CUSTOMER "+"SET [Fname] = '"+ req.body["fname"] + "' ,[Lname] = '"+req.body["lname"] + "' WHERE [SSN] = "+req.params["ssn"] + " ;";

                    request.query(query_construction, function (err, results) {
                        if(err){
                            console.log(err)
                            res.send({
                                "Status": "Fail" + err
                            });
                            return;
                        }
                        res.send({
                            "Status": "Success"
                        });
                    });
                    return
                }
            }
            res.send({
                "status":"Not Found"
            });
        });

        var request = new sql.Request();
        
        
    });
});

//Endpoint Customer, add new customer
app.post('/customer', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);
        //console.log(req.params);
        //console.log(req.query);
        //console.log(req.body);
        //Check if all values
        if(req.body["ssn"] ==undefined || req.body["fname"]==undefined || req.body["lname"]==undefined){
            res.send({
                "Status": "Fali: Parameters are not complete"
            });
            return
        };
        
        var request = new sql.Request();
        query_construction = "INSERT INTO CUSTOMER VALUES " + "("+req.body["ssn"]+ ",'" + req.body["fname"]+ "','"+ req.body["lname"]+"');"
        console.log(query_construction);
        request.query(query_construction, function (err, results) {
            if(err){
                console.log(err)
                res.send({
                    "Status": "Fail " + err
                });
                return;
            }
            res.send({
                "Status": "Success"
            });
        });

        
        
    });
});



//Listen to port 80
var server = app.listen(80, function () {
    console.log('Server is running..');
});
