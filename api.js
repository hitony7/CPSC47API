
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
//@return first and last name and SSN   
let customer = `CustomerAll`; //name of STORED PROCEDURE in DB      
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
                //IF QUERY FAILS ERROR MSG
                res.send(error.message);
                return console.error(error.message);
            }
            //SUCCESS
            res.send(results.recordset);  //this only has the info 
            //res.send(results);  this include recordset ,output, rowaffected
        });
    });
});

//Endpoint EMPLOYEE/SALARY (SSN INPUT)
//@return first and last name and SALARY
let GetEmployeeSalary = `GetEmployeeSalary @SSN`;//name of STORED PROCEDURE in DB    anything with @ is a parameter  
//req = request parameter (Input) || res = result parameter (Output)   this is for express 
app.get('/EMPLOYEE/SALARY', function(req,res){  
    //CHECK IF req is VALID parameters if needed
    if(req.query["SSN"] == undefined || ""){
        //IF NULL THEN 
        res.send({
            "Status": "Fail: SSN needs to be inputed"
        });
        return
    }
    //here
    sql.connect(config, function (err) {//DB CONNECTION 
        if(err) console.log(err);       //IF CONNECTION FAILS ERROR MSG
        var request = new sql.Request();  //NEW REQUEST 
        //parameterized SQL queries  if you look at GetEmployeeSalary string it will replace @SSN with the ssn 
                    //Name   //Type    //Input
        request.input('SSN', sql.Int,req.query["SSN"]); 
        //run the customer STORED PROCEDURE, with parameter of error, results(output from DB), fields(Input for DB)
        request.query(GetEmployeeSalary ,(error, results, fields) => { //DB QUERY
            if(error){
                //IF QUERY FAILS ERROR MSG
                res.send(error.message);
                return console.error(error.message);
            }
            //SUCCESS
            res.send(results.recordset);  //this only has the info 
            //res.send(results);  this include recordset ,output, rowaffected
        });
    });
});


//EMPLOYEE/SALARYTOTAL
//@return first and last name and SSN   
let GetTotalSalary = `GetTotalSalarires`; //name of STORED PROCEDURE in DB      
//req = request parameter (Input) || res = result parameter (Output)   this is for express 
app.get('/EMPLOYEE/SALARYTOTAL', function(req,res){  
    //CHECK IF req is VALID parameters if needed
    //here
    sql.connect(config, function (err) {//DB CONNECTION 
        if(err) console.log(err);       //IF CONNECTION FAILS ERROR MSG
        var request = new sql.Request();  //NEW REQUEST 
        //run the customer STORED PROCEDURE, with parameter of error, results(output from DB), fields(Input for DB) 
        request.query(GetTotalSalary,(error, results, fields) => { //DB QUERY
            if(error){
                //IF QUERY FAILS ERROR MSG
                res.send(error.message);
                return console.error(error.message);
            }
            //SUCCESS
            res.send(results.recordset);  //this only has the info 
            //res.send(results);  this include recordset ,output, rowaffected
        });
    });
});

//PUT EMPLOYEE/SALARY (Employee_SSN)  (AMOUNT) 
//@return updatedsalary
let UpdateSalary = `UpdateSalary @SSN, @AMOUNT`; //name of STORED PROCEDURE in DB      
//req = request parameter (Input) || res = result parameter (Output)   this is for express 
app.put('/EMPLOYEE/SALARY', function(req,res){  
    //CHECK IF req is VALID parameters if needed
    if(req.query["SSN"] == undefined || ""){
        //IF NULL THEN 
        res.send({
            "Status": "Fail: SSN needs to be inputed"
        });
        return
    } 
    if(req.query["Amount"] == undefined || ""){
        //IF NULL THEN 
        res.send({
            "Status": "Fail: Amount needs to be inputed"
        });
        return
    } else if (req.query["Amount"] < 0){
         //IF Negative
        res.send({
            "Status": "Fail: Amount needs Postive Value"
        });
        return
    }
    //here
    sql.connect(config, function (err) {//DB CONNECTION 
        if(err) console.log(err);       //IF CONNECTION FAILS ERROR MSG
        var request = new sql.Request();  //NEW REQUEST 
        //parameterized SQL queries  
                    //Name   //Type    //Input
        request.input('SSN', sql.Int,req.query["SSN"]); 
        request.input('AMOUNT', sql.Float,req.query["Amount"]); 
        //run the customer STORED PROCEDURE, with parameter of error, results(output from DB), fields(Input for DB) 
        request.query(UpdateSalary,(error, results, fields) => { //DB QUERY
            if(error){
                //IF QUERY FAILS ERROR MSG
                res.send(error.message);
                return console.error(error.message);
            }
            //SUCCESS
            res.send(results.recordset);  //this only has the info 
            //res.send(results);  this include recordset ,output, rowaffected
        });
    });
});

//AverageSeatPriceInSec 'Regular Season: Game 21', South


//Endpoint /STADIUM/SEATS_AVG (GAME_ID) (SEAT SECTION)
//@return AVG SEAT PRICE 
let AverageSeatPriceInSec = `AverageSeatPriceInSec @GameID ,@SeatSection`;//name of STORED PROCEDURE in DB    anything with @ is a parameter  
//req = request parameter (Input) || res = result parameter (Output)   this is for express 
app.get('/STADIUM/SEATS_AVG', function(req,res){  
    //CHECK IF req is VALID parameters if needed
    if(req.query["GameID"] == undefined || ""){
        //IF NULL THEN 
        res.send({
            "Status": "Fail: A Game needs to be inputed"
        });
        return
    }

    if(req.query["SeatSection"] == undefined || ""){
        //IF NULL THEN 
        res.send({
            "Status": "Fail: A SeatSection needs to be inputed"
        });
        return
    }
    //here
    sql.connect(config, function (err) {//DB CONNECTION 
        if(err) console.log(err);       //IF CONNECTION FAILS ERROR MSG
        var request = new sql.Request();  //NEW REQUEST 
        //parameterized SQL queries  if you look at GetEmployeeSalary string it will replace @SSN with the ssn 
                    //Name   //Type    //Input
        request.input('GameID', sql.VarChar,req.query["GameID"]); 
        request.input('SeatSection', sql.VarChar,req.query["SeatSection"]); 
        //run the customer STORED PROCEDURE, with parameter of error, results(output from DB), fields(Input for DB)
        request.query(AverageSeatPriceInSec ,(error, results, fields) => { //DB QUERY
            if(error){
                //IF QUERY FAILS ERROR MSG
                res.send(error.message);
                return console.error(error.message);
            }
            //SUCCESS
            res.send(results.recordset);  //this only has the info 
            //res.send(results);  this include recordset ,output, rowaffected
        });
    });
});

//node is running on localhost
var server = app.listen(80, function () {
    console.log('Server is running..');
});