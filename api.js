
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

//David's Part Start
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





//1. Endpoint medical_staff/treats
app.get('/medical_staff/treats', function (req, res) {
    // connect to your database
    console.log(req.query);
        //console.log(req.query);
        //console.log(req.body);
        //Check if all value
    sql.connect(config, function (err) {
        if (err) console.log(err);
        
        // create Request object
        var request = new sql.Request();
        query_construction = 'SELECT [Player_SSN] FROM [TREATS] WHERE ' + '[Med_SSN] = ' + req.query["med_ssn"] +';'
        request.query(query_construction, function (err, results) {
            if (err) console.log(err)
            var response = {
                "MED_SSN":req.query["med_ssn"],
                "Player_SSN":[]
            }

            for(var i in results.recordset){
                response["Player_SSN"].push(results.recordset[i]["Player_SSN"])
            }
            res.send(response);
        });
        
    });
});


//2. Endpoint ORDER/ORDER_DISH_NAME
app.get('/order/order_dish_name', function (req, res) {
    // connect to your database
    console.log(req.query);
        //console.log(req.query);
        //console.log(req.body);
        //Check if all value
    sql.connect(config, function (err) {
        if (err) console.log(err);
        
        // create Request object
        var request = new sql.Request();
        query_construction = 'SELECT [Dish_Name] FROM [ORDER_DISH_NAME] WHERE ' + '[ORDER_ID] = ' + req.query["order_id"] +';'
        request.query(query_construction, function (err, results) {
            if (err) console.log(err)
            var response = {
                "ORDER_ID":req.query["order_id"],
                "DISH_NAME":[]
            }

            for(var i in results.recordset){
                response["DISH_NAME"].push(results.recordset[i]["Dish_Name"])
            }
            res.send(response);
        });
        
    });
});


//3. Endpoint /team
app.get('/team', function (req, res) {
    // connect to your database
        //console.log(req.query);
        //console.log(req.body);
        //Check if all value
    sql.connect(config, function (err) {
        if (err) console.log(err);
        
        // create Request object
        var request = new sql.Request();
        query_construction = "SELECT  [EMPLOYEE].SSN, [EMPLOYEE].Fname, [EMPLOYEE].LName FROM    [EMPLOYEE], [PLAYER], [TEAM] WHERE   [EMPLOYEE].[SSN] = [PLAYER].[Player_SSN] AND [EMPLOYEE].[Team_Name] = [TEAM].[Team_Name] AND [TEAM].[Team_Name] = \'" + req.query["team_name"] + "\';";
        request.query(query_construction, function (err, results) {
            if (err) console.log(err)
            var response = {
                "PLAYER_ID":req.query["team_name"],
                "PLAYER_NAME":[]
            }
            console.log(results.recordset);
            for(var i in results.recordset){
                var name = results.recordset[i]["Fname"]+' '+results.recordset[i]["LName"]
                response["PLAYER_NAME"].push(name)
            }
            res.send(response);
        });
        
    });
});

//Endpoint /teamrecord
app.put('/teamrecord/:team_name/:amount', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);
        if(req.params["team_name"]==undefined || req.params["amount"]==undefined){
            res.send({
                "Status": "Fali: Parameters are not complete"
            });
            return
        };
        if(req.params["amount"]=='1'){
            stat = 'Win'
        }else if(req.params["amount"]=='-1'){
            stat = 'Lose'
        }else{
            res.send({
                "Status": "Fali: Not Correct Parameter"
            });
            return
        }
        var request = new sql.Request();
        request.query('UpdateTeam'+ stat +' @TEAM_NAME=\'' + req.params["team_name"]+'\'', function (err, results) {
            if (err){
                console.log(err)
                res.send({
                    "status":"fail"
                });
            }

            res.send({
                "status":"Success"
            });
        });

        var request = new sql.Request();
        
        
    });
});

//Endpoint UpdateCUSTOMER, Update Customer Data
app.put('/updatecustomer/:ssn', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);

        if(req.params["ssn"] ==undefined || req.body["fname"]==undefined || req.body["lname"]==undefined){
            res.send({
                "Status": "Fali: Parameters are not complete"
            });
            return
        };
        
        var request = new sql.Request();
        query_construction = "UpdateCustomer @SSN = " + req.params["ssn"] + ", @FNAME = \'" + req.body["fname"] + "\', @LNAME = \'" + req.body["lname"] + "\';";

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


//David's Part End Here



//node is running on localhost
var server = app.listen(80, function () {
    console.log('Server is running..');
});
