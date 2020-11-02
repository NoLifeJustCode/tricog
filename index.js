const config=require('dotenv').config();
const express = require('express');
const app = express();
const {connect} = require('./config/database');
const dataService = require('./service/dataService');
const cookieParser=require('cookie-parser')

//import express-session
const express_session=require('express-session')
//import path
const path=require('path')
//import passportjs
const passport=require('passport')
app.use(passport.initialize())
//import stratergy
const passport_jwt=require('./config/passport_jwt.js')
//const passport_local=require('./config/passport_local')
const body_parser=require('body-parser')
//create instance of framework

app.use(cookieParser())
//
app.use(require('cors')({origin:'http://localhost:3000',credentials:true}))
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))


app.use(express.urlencoded());



app.use('/',require('./routes/index'))
    app.listen(process.env.PORT,(err)=>{
        if(err)
            console.log("error starting server");
        console.log("server running on port",process.env.PORT);
    });

    app.get('/data',async(req,res)=>{
        let results =await dataService.customer.CustomerService.getDataByEmail(req.query.email);
        return res.send(results);
    })