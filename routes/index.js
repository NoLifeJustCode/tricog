const express=require('express')

const router=express.Router()
//Route APi calls
router.use('/api',require('./api/index'))


module.exports=router