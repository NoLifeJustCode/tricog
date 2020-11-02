/**
 * Import express and passport to authenticate and create Routes to handle routing
 */

const express=require('express')
const passport=require('passport')
const router=express.Router()
//Doctor Controller containing all actions Related to Doctors
const customerController=require('../../../../controller/api/v1/customerController')
/**
 * UnAuthenticated Routes
 */
//Router Doctors Register 
router.post('/register',customerController.Register)
 //Router Login to Login Action
router.post('/Login',customerController.Login)
router.get('/working',function(req,res){
    return res.status('200').send('success')
})
module.exports=router