# Databases (CPSC 471@UofC) final project 
**Version 1.0v** \
API For Stadium Management Project<br/>
<br/>
The database we built is to address the issue in the management of data in stadiums, ticket sales, maintenance of facilities, etc. We created an API that integrates the ticket sale system, item management system, team management system, and other stadium related systems and made it simpler for end users to access related data.

---
### Table of Contents

- [Built With](#built-with)
- [Prerequisites](#prerequisites) 
- [Run](#run)  
- [Usage](#usage)  
- [Our Design](#our-design)
   - [ER Diagram](#er-diagram)
   - [RM Diagram](#rm-diagram)
- [Contributors](#contributors)
- [We did we learn?](#we-did-we-learn)
---

### Built With
We used:\
\
Programming : Node.js with express.\
DB: Microsoft SQL Server hosted on AWS\
DBMS: Microsoft sql server management studio\
Testing and documentation: [Postman](https://documenter.getpostman.com/view/11109555/Szf52oX8?version=latest)

### Prerequisites

Node.js is require.\
To install require dependencies run:

```
npm install
```

You can generate the database use the DMBackupScript it's will create the DB with some sample data, if you do this make sure you change the config.js file to appropriate server you are hosting it on.

## Run 

To run the program

```
node api.js
```

If it's successful it will say in the console. 

```
Server is running..
``` 

## Usage

Now you can run acesss the api endpoints.\
\
You access the endpoints using postman or your browser.\
Example:
```
GET Localhost/EMPLOYEE/SALARYTOTAL
```
Output:
```
[
    {
        "Total.salaries": 6225000.99
    }
]
```
**You can see more information about our endpoints by clicking here for [our postman documentation.](https://documenter.getpostman.com/view/11109555/Szf52oX8?version=latest)**

## Our Design
We used created a relational database(MSSQL) using the diagrams below.


### ER Diagram
![ER](/screenshots/471%20ERD.png)


### RM Diagram


![RM](/screenshots/RM%20.png?raw=true "RM")


## Contributors

**Tony Wong**      | Github:[@hitony7](https://github.com/hitony7) \
**Shiwei Sun**     | Github:[@davidshiwei](https://github.com/davidshiwei) \
**Nicolas Urrego** | Github:[@nicou08](https://github.com/nicou08) 

#### We did we learn? 

RESTful API Design and documentation.  (POSTMAN) \
Relational Database Design and Diagrams.  (ER and RM Diagrams) \
SQL.  ( Queries and Stored procudures ) \
How to use a DBMS.  (Microsoft sql server management studio 18) \
How to use AWS for hosting servers.  (AWS) \
JS  (Express and node.js)








