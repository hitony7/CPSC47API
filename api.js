
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
app.get('/GAME/SEATS_AVG/SECTION', function(req,res){  
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

//Endpoint /STADIUM/SEATS_AVG (GAME_ID) (SEAT SECTION)
//@return AVG SEAT PRICE 
let AverageSeatPrice = `AverageSeatPrice @GameID`;//name of STORED PROCEDURE in DB    anything with @ is a parameter  
//req = request parameter (Input) || res = result parameter (Output)   this is for express 
app.get('/GAME/SEATS_AVG/ALL', function(req,res){  
    //CHECK IF req is VALID parameters if needed
    if(req.query["GameID"] == undefined || ""){
        //IF NULL THEN 
        res.send({
            "Status": "Fail: A Game needs to be inputed"
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
        //run the customer STORED PROCEDURE, with parameter of error, results(output from DB), fields(Input for DB)
        request.query(AverageSeatPrice ,(error, results, fields) => { //DB QUERY
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

//Endpoint GET EMPLOYEE/PLAYER/ALL_STATS (EMPLOYEE_SSN)  
//@return player stats
let GetPlayerStats = `GetPlayerStats @SSN`;//name of STORED PROCEDURE in DB    anything with @ is a parameter  
//req = request parameter (Input) || res = result parameter (Output)   this is for express 
app.get('/EMPLOYEE/PLAYER/ALL_STATS', function(req,res){  
    //CHECK IF req is VALID parameters if needed
    if(req.query["SSN"] == undefined || ""){
        //IF NULL THEN 
        res.send({
            "Status": "Fail: A SSN needs to be inputed"
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
        request.query(GetPlayerStats ,(error, results, fields) => { //DB QUERY
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

//Game_ID, Date_played, Home_Team, Away_Team, Stadium_ID
//Endpoint  STADIUM/ ALL_GAME_INFO (GAME_ID)
//@return T OF F
let AddNewGame = `AddNewGame @Game_ID, @Date_played, @Home_Team, @Away_Team, @Stadium_ID`;//name of STORED PROCEDURE in DB    anything with @ is a parameter  
//req = request parameter (Input) || res = result parameter (Output)   this is for express 
app.post('/STADIUM/ALL_GAME_INFO', function(req,res){  
    //CHECK IF req is VALID parameters if needed
    if(req.query["Game_ID"] == undefined || ""){
        //IF NULL THEN 
        res.send({
            "Status": "Fail: A Game_ID needs to be inputed"
        });
        return
    }
    //here
    sql.connect(config, function (err) {//DB CONNECTION 
        if(err) console.log(err);       //IF CONNECTION FAILS ERROR MSG
        var request = new sql.Request();  //NEW REQUEST 
        //parameterized SQL queries  if you look at GetEmployeeSalary string it will replace @SSN with the ssn 
                    //Name   //Type    //Input
        request.input('Game_ID', sql.VarChar,req.query["Game_ID"]); 
        request.input('Date_played', sql.Date,req.query["Date_played"]); 
        request.input('Home_Team', sql.VarChar,req.query["Home_Team"]); 
        request.input('Away_Team', sql.VarChar,req.query["Away_Team"]); 
        request.input('Stadium_ID', sql.VarChar,req.query["Stadium_ID"]); 
        //run the customer STORED PROCEDURE, with parameter of error, results(output from DB), fields(Input for DB)
        request.query(AddNewGame ,(error, results, fields) => { //DB QUERY
            if(error){
                //IF QUERY FAILS ERROR MSG
                res.send(error.message);
                return console.error(error.message);
            }
            //SUCCESS
            res.send("Status: Success NewGame Added");  //SUCCESS RETURN
            //res.send(results);  this include recordset ,output, rowaffected
        });
    });
});

// Endpoint ticket, get cost of ticket depending on seat
// @return Cost of a seat in stadium
let GetAvailableSeats = 'GetAvailableSeats @StadiumID' // name of STORED PROCEDURE
let GetSeatPrice = 'GetSeatPrice @SeatNum' // name of STORED PROCEDURE
app.get('/STADIUM/SEATS/TICKET', function (req, res) {
    // Check if stadium is invalid
    if (req.query["StadiumID"] == undefined) {
        res.send({
            "Status": "Fail: StadiumID DNE"
        });
        return
    };
    // Check if seat number is invalid
    if (req.query["SeatNumber"] == undefined) {
        res.send({
            "Status": "Fail: SeatNumber DNE"
        });
        return
    };
    sql.connect(config, function (err) {
        / Check for errors/
        if (err) console.log(err);
        // New request
        var request = new sql.Request();
        request.input('StadiumID', sql.VarChar, req.query["StadiumID"]);
        request.query(GetAvailableSeats, (error, result, fields) => {
            if (error) {
                // If the query fails return error message
                res.send(error.message);
                return console.error(error.message);
            }
            // Go through every seat in the stadium to find the required seat
            for (var i in result.recordset) {
                if (result.recordset[i]["Seat_number"] == req.query["SeatNumber"] && result.recordset[i]["Status"] == 0) {
                    var respond = {
                        "Status": "Seat is occupied"
                    }
                    res.send(respond);
                    return
                } else if (result.recordset[i]["Seat_number"] == req.query["SeatNumber"]) {
                    // If requested seat is not occupied, determine its price
                    var request2 = new sql.Request();
                    request2.input('SeatNum', sql.Int, req.query["SeatNumber"]);
                    request2.query(GetSeatPrice, (error, results, fields) => {
                        if (error) {
                            // If the query fails return error message
                            res.send(error.message);
                            return console.error(error.message);
                        }
                        // If query2 succeeds return results
                        res.send(results.recordset);
                    });
                }
            }
        });
    });
});

// Endpoint /Owner, gets financial data 
// @return the gross profit, losses, and net profit
let GetFinancialData = 'GetFinancialData @OwnerName'; // name of STORED PROCEDURE in DB 
app.get('/OWNER', function (req, res) {
    // Check if there is not name
    if (req.query["oname"] == undefined) {
        res.send({
            "Status": "Fail: DNE Owner Name"
        });
        return
    };
    sql.connect(config, function (err) {
        // Check for errors
        if (err) console.log(err);
        // New request
        var request = new sql.Request();
        request.input('OwnerName', sql.VarChar, req.query["oname"]);
        request.query(GetFinancialData, (error, results, fields) => {
            if (error) {
                // If the query fails return error message
                res.send(error.message);
                return console.error(error.message);
            }
            // If query succeeds return results
            res.send(results.recordset);
        });
    });
});



//node is running on localhost
var server = app.listen(80, function () {
    console.log('Server is running..');
});
