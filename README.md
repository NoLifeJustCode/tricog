<h2>Project title</h2>
	The project aims at creating a simple api endpoints for customer related information
	
<h3>Code style</h3>
	<code>code-style:eslint coding standards</code>
<h3>Tech/framework used</h3>
Node: backend 
Mysql: Database
Express: Framework to support backend

<h3> Installation and Setup </h3>
<ul>
<li> make sure npm ,node and mysql is previously installed. </li> 
<li> open terminal and make sure pwd is the project foler </li>
<li> Run npm install to run dependencies installations from package.json file </li>
<li> Run npm runs start to run the project </li>
<li> Note 
	<pre>
		The .env file contains configuation properties like database 
		PORT =  port at which the project binds
		dbHost = database host 
		dbUser = database user
		dbPassword = database password
		SECRET_JWT = json signing secret key
		EXPIRY = json token expiry
	</pre>
</li>
</ul>

<h3> API REFERENECE </h3>
<code>Base url : http://localhost:3000/api/v1</code>

1.<h4><code> /auth/Register</code></h4>
	Method:POST 
	content-Type: application/x-www-form-urlencoded 

2.<h4><code> /auth/Login</code></h4>
	Method:POST 
	content-Type: application/x-www-form-urlencoded 
	params: 
				PanNumber :required
				DOB:required and format is  "YY/MM/DD"

3.<h4><code> /Authorize/customer/</code></h4>
	Method:GET 
	content-Type: application/x-www-form-urlencoded
	Authorization : Bearer Token
	params:	Use any combination of fields specified below to filter customer details as response 
				



<h3> Code Example </h3>

	The project basically setups up customer data for login and register 

	There are a exhaustive number of fields which can be used to register ,filter 
	
	Login requires fields PanNumber and DOB matches both to find a row in the database and return it 
	
	<h4> Field paramter to use </h4>
<pre>
	
const fields={
    FirstName:{
        required:true,
    },
    PanNumber:{
        required:true,
        validator:(pan)=>{return panRegex.test(pan);}, // Each Field has its own validation 
        processData:(pan)=>{return pan.toUpperCase();}// processing if field requires processing 
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
	</pre>



On login a signed jwt token is sent as response and on Register a sucessfull registeration message is recieved as response else appropriate errors 


the Customer data filter endpoint dynamically builds statement using the passed field after validation 
In addition to the fields above u can also use limit to set number of results retrieved as response 
	

Sample CURL REQUESTS:
	
	

