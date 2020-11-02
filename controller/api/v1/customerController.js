//import Doctors and patients Model
const { customer }=require('../../../service/dataService');
//import jwt to generate web token
const jwt=require('jsonwebtoken')
//import setup to retrieve setup info
/*
  The module Registers a Doctor based on info passed
  Email is unique
  Validations :
            Email
            Mobile
 */
module.exports.Register=async function(req,res,mysql){
    try{
        const results = await customer.CustomerService.addData(req.body,mysql);
        if(results.errors || !results)
            return res.send(422,results.errors||"internalServerError");
        return res.send(200,{
            message:'Registeration Successfull!!',
        })    
    }catch(err){
        console.log(err);
        return res.send(504,{message:err.message})
    }

}

/*
 * Login generates a web token to be used to authenticate routes and provide access 
 * password is excluded from jwtPayload
 */
module.exports.Login=async function(req,res){
    try{    //console.log(req.body)
            var customerData=await customer.CustomerService.findOneByPanAndDOB(req.body.PanNumber,req.body.DOB);
            if(!customerData||customerData.errors)
                return res.send(422,{
                    message:customerData.errors || 'Invalid Credentials'
                })
            
            const data={
                pan:customerData.PanNumber,
                DOB:customerData.DOB,
                id:customerData.id
            }
            const token=jwt.sign(data,"secret",{expiresIn:process.env.EXPIRY})
            
            res.header('Access-Control-Allow-Origin', "http://localhost:3000");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header( 'Access-Control-Allow-Credentials',true);
            res.cookie('jwt',token,{maxAge:900000,secure:false})
            console.log(token);
             res.send(200,{
                 message:'Login successfull',
                 token:token,
             })
    }
    catch(err){
        return res.send(504,{message:err.message})
    }
}

module.exports.getCustomer =  async function(req,res){
    try{
        const filter=customer.CustomerService.getFilter(req.body);
        var customerData = await customer.CustomerService.customerByFilter(filter);
            if(!customerData||!Array.isArray(customerData))
                return res.send(422,{
                    message:customerData.errors||'Invalid Credentials'
                })
        const data=[];
        for(let item of customerData){
            data.push({
                name:item.FirstName,
                email:item.Email,
                pan:item.PanNumber,
                DOB:item.DOB,
                Gender:item.Gender,
                image:item.ProfileImage
            });
        }
            return res.send(data);
    }catch(err){
        return res.send(504,{message:err.message})
    }
}