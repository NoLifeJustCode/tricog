const {dateRegex, emailRegex, panRegex}=require('../helpers/regexHelpers');
const {insertQueryBuilder, selectQueryBuilder} = require('../helpers/databaseHelpers')

const table="create table if not exists customer(\
    id int NOT NULL AUTO_INCREMENT,\
    FirstName VARCHAR(255) NOT NULL,\
    PanNumber VARCHAR(10) NOT NULL ,\
    DOB DATE NOT NULL,\
    Gender ENUM ('Male','Female') NOT NULL,\
    Email VARCHAR(100) NOT NULL,\
    ProfileImage VARCHAR(300) NOT NULL,\
    PRIMARY KEY (id),\
    UNIQUE(PanNumber)\
)";
const tableName="customer";
const util = require('util');
const config = require('../config/database');

const fields={
    FirstName:{
        required:true,
    },
    PanNumber:{
        required:true,
        validator:(pan)=>{return panRegex.test(pan);},
        processData:(pan)=>{return pan.toUpperCase();}
    },
    DOB:{
        required:true,
        validator:(date)=>{return dateRegex.test(date);}
    },
    Gender:{
        required:true,
        validator:(gender)=>{return ["Male","Female"].includes(gender);},
        processData:(gender)=>{return gender.charAt(0).toUpperCase()+gender.slice(1).toLowerCase();}
    },
    Email:{
        required:true,
        validator:(email)=>{
            return emailRegex.test(email)
        },
        processData:(email)=>{return email.replace('"',"").replace('"',"");}
    },
    ProfileImage:{
        required:true,
    }
}
class CustomerService{
    
    static validation(customerData){
       let errors=[]; 
       for(let key in fields ){
            if(fields[key].required&&!customerData[key])
                errors.push(`${key} is a required value`);
            if(customerData[key] && fields[key].validator && !fields[key].validator(customerData[key]))
                errors.push(`${key} validation failed ${fields[key].validatonText || ''}`);
       }
       return errors;
    }
    static processData(data){
        for(let key in fields)
            {
                if(data[key] && fields[key].processData)
                    data[key] = fields[key].processData(data[key]);
            }
    }
    static getFilter(data){
        const filters={
            limit: 1
        };
        if(data.limit && !isNaN(data.limit))
            filters.limit=Number(data.limit);
        
        for(let key in fields ){
            if(data[key])
            filters[key]=data[key];
        }
        return filters;
    }
    static async addData(customerData){
        try{
        CustomerService.processData(customerData);
        const errors=CustomerService.validation(customerData);
        if(errors.length)
            return {errors:JSON.stringify(errors)};
        const query = await  CustomerService.queryObj();
        await query('use tricog');
        const results = await query(insertQueryBuilder(customerData,tableName));
        return results.affectedRows;
        }catch(e){
            console.log(e);
            return{ statusCode:500,error:"internal server error" };
        }
    }
    static async queryObj(){
        const mysql=require('../config/database').mysql;
        return util.promisify(mysql.query).bind(mysql);
    }
    static async getDataByEmail(email){
        try{
        email=fields.Email.processData(email);
        if(fields.Email.validator && !fields.Email.validator(email))
            return {error:"invalid email "};
        const query = await  CustomerService.queryObj();
        await query('use tricog');
        const results = await query(`select * from customer where email = "${email}"`);    
        return results;
    }catch(e){
        console.log(e);
        return{ statusCode:500,error:"internal server error" };
    }
    }
    static async findOneByPanAndDOB(PanNumber,DOB){
        try{
            PanNumber = PanNumber.replace('"',"").replace('"',"");
            DOB = DOB.replace('"',"").replace('"',"");
            if(fields.PanNumber.validator && !fields.PanNumber.validator(PanNumber))
                return {error:"invalid PanNumber "};
            if(fields.DOB.validator && !fields.DOB.validator(DOB))
            return {error:"invalid DOB format "};
            const query = await  CustomerService.queryObj();
            await query('use tricog');
            const results = await query(`select * from customer where PanNumber = "${PanNumber}" AND DOB ="${DOB}" limit 1`);    
            return results[0];
        }catch(e){
        console.log(e);
        return{ statusCode:500,error:"internal server error" };
    }
    }
    static async findOneByEmail(Email){
        try{
            Email = Email.replace('"',"").replace('"',"");
            
            if(fields.Email.validator && !fields.Email.validator(Email))
                return {error:"invalid Email "};
            const query = await  CustomerService.queryObj();
            await query('use tricog');
            const results = await query(`select * from customer where Email = "${Email}"  limit 1`);    
            return results[0];
        }catch(e){
        console.log(e);
        return{ statusCode:500,error:"internal server error" };
    }
    }
   static async customerByFilter(filter){
       try{
        CustomerService.processData(filter);
        const errors = CustomerService.validation(filter);
        const query = await  CustomerService.queryObj();
        await query('use tricog');
        const queryStatement = selectQueryBuilder({filter,table:"customer"});
        const results = await query(queryStatement);    
        return results;
       }catch(e){
        console.log(e);
        return{ statusCode:500,error:"internal server error" }; 
       }
   }
}

module.exports={
    table,
    CustomerService,
    tableName
}