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
	

<h3>Sample CURL REQUESTS:</h3>
	<h3>1 Register Customer Details (https://localhost:3000/api/v1/auth/Register)</h3>
	(change --data-urlencode values to alter field values)
		<pre>
			curl --location --request POST 'http://localhost:3000/api/v1/auth/Register' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYW4iOiJBQkNERTEyMzRGIiwiRE9CIjoiMTk5NS0xMi0xMVQxODozMDowMC4wMDBaIiwiaWQiOjEsImlhdCI6MTYwNDMyMzc2OCwiZXhwIjoxNjA0MzI0MzY4fQ.qJwi5y0S76s9zLorjy_LxcrQmxITurOP1fqLyMEQAcA' \
--data-urlencode 'Email=a@a.com' \
--data-urlencode 'Gender=female' \
--data-urlencode 'FirstName=name' \
--data-urlencode 'DOB=95/12/12' \
--data-urlencode 'ProfileImage=image' \
--data-urlencode 'PanNumber=ABCDE1234b'
		</pre>

<h3>2 Login To Recieve Token (https://localhost:3000/api/v1/auth/Login)</h3>
	PanNumber and DOB are parameters Required to Login (change --data-urlencode values )
	<pre>
		curl --location --request POST 'http://localhost:3000/api/v1/auth/Login' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYW4iOiJBQkNERTEyMzRGIiwiRE9CIjoiMTk5NS0xMi0xMVQxODozMDowMC4wMDBaIiwiaWQiOjEsImlhdCI6MTYwNDMyMzc2OCwiZXhwIjoxNjA0MzI0MzY4fQ.qJwi5y0S76s9zLorjy_LxcrQmxITurOP1fqLyMEQAcA' \
--data-urlencode 'PanNumber=ABCDE1234F' \
--data-urlencode 'DOB=95/12/12'
	</pre>



<h3>2 Filter Customer Details  (https://localhost:3000/api/v1/Authorize/customer)</h3>
	Use combination of fields to filter data rows (change --data-urlencode values )
	Use Valid Bearer Token (replace value after Bearer in --header)
	<h4> Filter using Gender and pan number </h4>
	<pre>curl --location --request GET 'http://localhost:3000/api/v1/Authorize/customer/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYW4iOiJBQkNERTEyMzRGIiwiRE9CIjoiMTk5NS0xMi0xMVQxODozMDowMC4wMDBaIiwiaWQiOjEsImlhdCI6MTYwNDMyMzc2OCwiZXhwIjoxNjA0MzI0MzY4fQ.qJwi5y0S76s9zLorjy_LxcrQmxITurOP1fqLyMEQAcA' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYW4iOiJBQkNERTEyMzRGIiwiRE9CIjoiMTk5NS0xMi0xMVQxODozMDowMC4wMDBaIiwiaWQiOjEsImlhdCI6MTYwNDMyMzc2OCwiZXhwIjoxNjA0MzI0MzY4fQ.qJwi5y0S76s9zLorjy_LxcrQmxITurOP1fqLyMEQAcA' \
--data-urlencode 'Gender=Female' \
--data-urlencode 'limit=10' \
--data-urlencode 'PanNumber=ABCDE1234F'
	</pre>
	
<h4>Filter using Gender</h4>
<pre>
curl --location --request GET 'http://localhost:3000/api/v1/Authorize/customer/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYW4iOiJBQkNERTEyMzRGIiwiRE9CIjoiMTk5NS0xMi0xMVQxODozMDowMC4wMDBaIiwiaWQiOjEsImlhdCI6MTYwNDMyMzc2OCwiZXhwIjoxNjA0MzI0MzY4fQ.qJwi5y0S76s9zLorjy_LxcrQmxITurOP1fqLyMEQAcA' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'Gender=Female' \
--data-urlencode 'limit=10'
</pre>

<h3>Formats of fields </h3>
<pre>
DOB: "YY/MM/DD" format and is required for login and registeration
Email: basic email format (No existence validation done)
Pan Number : 10 letter (5char 4Number 1char)
Gender: Enum( male ,female)
</pre>
