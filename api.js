
let sql = require("mssql");           //MICROSOFT SQL 
let config = require('./config.js'); //GET AWS INFO 
var express = require('express');   //API INTERFACE WITH FOR NODE.JS 
var app = express();                //EXPRESS

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


// parse application/json
app.use(bodyParser.json());


//ROOT localhost
app.get('/', function(req, res){
    res.send("ROOT");
  });
//End of Root
  
//Customer endpoint  
let customer = `customeralls`; //name of STORED PROCEDURE in DB      
//req = request parameter (Input) || res = result parameter (Output)   this is for express 
app.get('/customer', function(req,res){  
    //CHECK IF req is VALID parameters if needed
    //here
    sql.connect(config, function (err) {//DB CONNECTION 
        if(err) console.log(err);       //IF CONNECTION FAILS ERROR MSG
        var request = new sql.Request();  //NEW REQUEST 
        //run the customer STORED PROCEDURE, with parameter of error, results(output from DB), fields(Input for DB) 
        request.query(customer,(error, results, fields) => { //DB QUERY
            if(error){
                //IF CONNECTION FAILS ERROR MSG
                return console.error(error.message)
            }
            //SUCCESS
            res.send(results.recordset);  //this only has the info 
            //res.send(results);  this include recordset ,output, rowaffected
        });
    });
});


var server = app.listen(80, function () {
    console.log('Server is running..');
});