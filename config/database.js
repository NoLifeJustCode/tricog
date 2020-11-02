const mysql =require('mysql');
const util = require('util');
const {
    customer
} = require('../service/dataService');
const options={
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPassword
  }
var con = mysql.createConnection(options);
con.on('connect',(err)=>{
    if(err)
         return console.log(err);      
    console.log("connection successfull");
});
con.query("create database if not exists tricog",(err,results,fields)=>{
    if(err)
        throw new Error(err.message);
    console.log("database creation",results.affectedRows&&"successFull"||"Failed");
});
con.query("use tricog",(err,results,fields)=>{
    if(err)
        throw new Error(err.message);
})
con.query(customer.table,(err,results,fields)=>{
    if(err)
        throw new Error(err.message);
    process.env.dbInit=true;
});

module.exports.mysql = mysql.createConnection(options);