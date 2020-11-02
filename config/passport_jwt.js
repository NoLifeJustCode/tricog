const passport=require('passport')
const jwtStratergy=require('passport-jwt').Strategy
const ExtractJwt=require('passport-jwt').ExtractJwt
const {customer}=require('../service/dataService')
function CookieExtractor(req){
   // console.log('calling Extraction')
  //  console.log(req.cookies)
    var token=null
    if(req&&req.cookies)
        token=req.cookies['jwt']
    return token
}
//ExtractJwt.fromAuthHeaderAsBearerToken(),
const opts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey :"secret"
}
passport.use("customer",new jwtStratergy(opts,async (docData,done )=>{
    try{        
                
                var doc=await customer.CustomerService.findOneByPanAndDOB(docData.pan,docData.DOB);
           
                if(!doc)
                    return done(null,false)
                return done(null,doc)
                    
    }catch(err)
    { //  console.log(err)
        return done(err,null)
    } 
}))


module.exports=passport
