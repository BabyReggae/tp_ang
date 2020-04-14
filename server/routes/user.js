const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
var mysql = require('mysql');
var randtoken = require('rand-token');
var nodemailer = require('nodemailer');


const tokenDuration = 30;/* days nb before token expiration */ 




// parse requests of content-type: application/json
router.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));
router.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});



var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bobbles_v0'
});

//////////////////////////////////////////////////////// =>


router.get('/', (req,res,next) => {
	res.send('users !! ');
	next();
});

router.get('/validation_user?', function(req ,res  ) {
	let params = req.query;
	if ( ! params.token ) res.send( false );

	let d = new Date();
	let DateNow = d.toISOString().slice(0,10) + " " + d.toISOString().slice(11,19);

	let reqUpd = `UPDATE player SET confirmation_date= '${ DateNow }' WHERE  confirmation_code= '${ params.token }'`;

    connection.query( reqUpd, function(error, results, fields) {    
      if (error) throw error;
      	console.log( results );
        res.json( results );
    });
});

router.post('/add_user' , function(req ,res ){

    let user = req.body.user;
    let confirmation_code = randtoken.generate(16);
    let reqVals = `'${user.username}','${user.email}','${user.pwd}','${confirmation_code}'`;
    let reqSql = "INSERT INTO player (`user_name`, `email`, `password`, `confirmation_code` ) VALUES (" + reqVals + ")";

    connection.query( reqSql , function(error, results, fields) {
		if (error) {
			//console.log(error.code);console.log(error.sqlMessage );
			res.json( { code : error.code, message : error.sqlMessage  } );
		}else{

			var transporter = nodemailer.createTransport({
			  service: 'gmail',
			  auth: {
			    user: 'g.dock666@gmail.com',
			    pass: 'doudou02'
			  }
			});

			var mailOptions = {
			  from: 'g.dock666@gmail.com',
			  to: 'dockguillaume@gmail.com',
			  subject: 'Bobbles account validation',
			  text: 'Please follow de link below for your Bobbles\'s acc validation\n\r\n http://localhost:8080/api/user/validation_user?token=' + confirmation_code
			};

			transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
			    console.log(error);
			  } else {
			    console.log('Email sent: ' + info.response);
			  }
			});

			res.json( results );
		}
    });
})

router.post('/log_user' , function(req ,res ){

    let loginReq = req.body.loginReq;
    let reqSql = `SELECT p.id FROM player p WHERE p.user_name = '${loginReq.username}' AND p.PASSWORD = '${loginReq.pwd}'`;

    connection.query( reqSql , function(error, results, fields) {
		if (error) throw error;
		let uData = results[0];
		//si la req renvoie un obj.id
      	if (  uData ) {
      		//token creation
      		var id = uData.id;
      		var uid = require('rand-token').uid;
      		var token = uid(16);

      		//token expiration date creation
			let d = new Date();
			d.setDate( d.getDate() + tokenDuration  );
			let tokenExpirationDate = d.toISOString().slice(0,10) + " " + d.toISOString().slice(11,19);

      		//insert token in bdd with expiration date
		    let reqVals = `'${id}','${token}','${tokenExpirationDate}'`;
		    let reqSql = "INSERT INTO player_token (`player_id`, `token`, `expiration_date` ) VALUES (" + reqVals + ")";

		    connection.query( reqSql , function(error, results, fields) {
		      if (error) throw error;
		        uData.token = token;
		        res.json( uData );
		    });
      		//then return to angular token 
      		//then store in angular sessionStorage the relevant token
      	}else res.json( uData );

        
    });
})

router.post('/unlog_user' , function(req ,res ){

    let token = req.body.token;
    let reqSel = `SELECT pt.id FROM player_token pt WHERE pt.token = '${ token }'`;

    console.log( reqSel );

	const getTokenId = new Promise(function(resolve, reject) {

	    connection.query( reqSel , function(error, results, fields) {
			if (error) {
				reject( { code : error.code, message : error.sqlMessage  } );
			}else{
				resolve( results );
			}
	    });
	});

	getTokenId
	.then(function(value) {

		let reqDel = `DELETE FROM player_token WHERE id = '${value[0].id}';`

		console.log( reqDel );

	    connection.query( reqDel , function(error, results, fields) {
	    	if (error) throw error;
	    	res.json( results );
	    });
	})
	.catch(function(value){
		console.log("log de error => " , value);
		res.json( value );
	});
})



module.exports = router;