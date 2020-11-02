/**
 * Import express and passport with setup Properties
 */

const express=require('express')
const passport=require('passport')
const { route } = require('./Authorize/customer')
const router=express.Router()
//secured Route to customer Related Actions

router.use('/Authorize/customer',passport.authenticate("customer",{session:false}),require('./Authorize/customer'))




//UnAuthenticated Routes
router.use('/auth',require('./UnAuthenticated/auth'))

module.exports=router