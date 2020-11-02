const express=require('express')
const customerController=require('../../../../controller/api/v1/customerController')

const router=express.Router()

router.get('/',customerController.getCustomer)

module.exports=router