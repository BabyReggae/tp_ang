const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
var mysql = require('mysql');
var randtoken = require('rand-token');
var nodemailer = require('nodemailer');
var DeviceDetector = require('device-detector-js');

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


router.get('/', (req,res) => {
	res.send('user');
});




router.get('/get_all?', (req ,res )=> {
	let token = req.query.token;

	if ( token == undefined ) res.send( false );

    let reqSel = `SELECT pt.player_id FROM player_token pt WHERE pt.token = '${ token }'`;
	console.log( reqSel );

	const getTokenId = new Promise(function(resolve, reject) {

	    connection.query( reqSel , function(error, results, fields) {
			if (error) {
				reject( { code : error.code, message : error.sqlMessage  } );
			}else{
				if( results[0] ) resolve( results[0].player_id );
				else res.send( false );
			}
	    });
	});

	getTokenId
	.then((id)=> {

		let sql = `SELECT * FROM player WHERE id='${ id }'`;

	    connection.query( sql , function(error, results, fields) {
			if (error) {
				res.send( false )
			}else{
				if( results[0]) res.json( results[0] );else res.send( false );
			}
	    });

	})


});


router.get('/get_user?', (req ,res )=> {
	console.log( req.query );
	let token = req.query.token;
	let field = req.query.fieldName;
	if ( token == undefined || field == undefined ) res.send( false );

    let reqSel = `SELECT pt.player_id FROM player_token pt WHERE pt.token = '${ token }'`;
	console.log( reqSel );
	
	const getTokenId = new Promise(function(resolve, reject) {

	    connection.query( reqSel , function(error, results, fields) {
			if (error) {
				reject( { code : error.code, message : error.sqlMessage  } );
			}else{
				if( results[0] ) resolve( results[0].player_id );
				else res.send( false );
				
			}
	    });
	});

	getTokenId
	.then((id)=> {

		let sql = `SELECT ${ field } FROM player WHERE id='${ id }'`;

	    connection.query( sql , function(error, results, fields) {
			if (error) {
				res.send( false )
			}else{
				if( results[0]) res.json( results[0][ field ] );else res.send( false );
				
			}
	    });

	})


});

router.get('/validation_user?', (req ,res )=> {
	let params = req.query;
	if ( ! params.token ) res.send( false );

	let d = new Date();
	let DateNow = d.toISOString().slice(0,10) + " " + d.toISOString().slice(11,19);

	let reqUpd = `UPDATE player SET confirmation_date= '${ DateNow }' WHERE  confirmation_code= '${ params.token }'`;

	let updCallback = new Promise( (resolve,reject) => {
	    connection.query( reqUpd, function(error, results, fields) {    
	      if (error) throw error;
	      	console.log( results );
	        resolve( results );
	    });
	})

	updCallback.then( (info) => {
		let outputReq = `SELECT email FROM player WHERE confirmation_code='${ params.token }'`;
	    connection.query( outputReq, (error, results, fields)=> {    
	      if (error) throw error;
	      res.json( results );
	    });

		
	})
});

router.get('/emailIsValid_user?', (req,res)=>{
	let params = req.query;
	if ( ! params.token ) res.send( false );


	let sql = `SELECT p.confirmation_date FROM player p WHERE p.id = (SELECT pt.player_id FROM player_token pt WHERE pt.token = '${params.token}')`;

	connection.query( sql, (error, results, fields)=>{

		//err sql case
		if ( ! results[0] ) { res.json(false) };
		//suc sql but value == null ( no confirm )
		if ( results[0].confirmation_date == null ) res.json(false);
		//suc sql & val got a filled date
		else res.json(true);

	}).on('error', (error)=>{
		console.log('test ?' , error )
	})

})

router.get('/get_userGold?' , (req, res ) => {
	let params = req.query, token;
	console.log( params );
	if ( ! params.token ) res.send( false );else token = params.token;
	console.log('ITS CONTINUE => ' ,  token);

    let reqUid = `SELECT player_id from player_token WHERE token ='${ token }'`;

    let uid = new Promise( (resolve, reject)=>{
        connection.query( reqUid, function(error, results, fields) {    
			if (error) throw error;
			
			if( results[0] === undefined ) res.send(false);
			else resolve( results[0].player_id );
        });
	})
	
	uid.then((id)=>{
		let goldReq = `SELECT gold FROM player WHERE id='${ id }'`;
		connection.query( goldReq, function(error, results, fields) {    
			if (error) throw error;
			res.json(  results[0].gold );
		});
	})
})

router.post('/add_user' , (req ,res )=>{

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
			    user: 'bobbles.v0@gmail.com',
			    pass: '38syUQ6Ea'
			  }
			});

			var mailOptions = {
			  from: '',
			  to: 'dockguillaume@gmail.com',
			  subject: 'Bobbles account validation',
			  text: 'Please follow de link below for your Bobbles\'s acc validation\n\r\n http://localhost:4200/account-validation/' + confirmation_code
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

router.post('/log_user' , (req ,res )=>{

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

router.post('/unlog_user' , (req ,res )=>{

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

		console.log("ask_tokenValidity Succes=> ", value );


	    connection.query( reqDel , function(error, results, fields) {
	    	if (error) throw error;
	    	res.json( results );
	    });
	})
	.catch(function(value){
		console.log(" delete token ERROR => " , value);
		res.json( value );
	});
})

router.post('/ask_tokenValidity' , (req,res)=>{

    let token = req.body.token;
    let reqSel = `SELECT pt.id FROM player_token pt WHERE pt.token = '${ token }'`;

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
		console.log("ask_tokenValidity Succes=> ", value );
		if ( value[0] ) res.json( true );else res.json( false );

	})
	.catch(function(value){
		console.log("log de error => " , value);
		res.json( false );
	});
})

router.post('/upd_user' , (req,res)=>{

	let token = req.body.token,
		updTargLabel = req.body.fieldName,
		updTargValue = req.body.fieldValue;

	console.log('AT BEGIN UPD => ' , req.body );

	if( token == undefined || updTargLabel == undefined ) res.send( false );

    let reqSel = `SELECT pt.player_id FROM player_token pt WHERE pt.token = '${ token }'`;

	const getTokenId = new Promise(function(resolve, reject) {

	    connection.query( reqSel , function(error, results, fields) {
			if (error) {
				reject( { code : error.code, message : error.sqlMessage  } );
			}else{
				resolve( results[0].player_id );
			}
	    });
	});

	getTokenId
	.then(function(id) {

		let reqUpd = `UPDATE player SET ${ updTargLabel }='${ updTargValue }' WHERE  id= '${ id }'`;
		console.log( reqUpd );
		connection.query( reqUpd , function(error, results, fields) {
			if (error) {
				console.log( { code : error.code, message : error.sqlMessage  } );
				res.send( false ); 
			}else{
				res.send( true );
			}
		});


	})
	.catch(function(value){
		console.log("ERROR => " , value )
		res.json( false );
	});
})







/* /////////////////////////// TEST //////////////////////////// */


router.get('/test_device' , (req, res ) => {

	console.log();

	const deviceDetector = new DeviceDetector();
	const userAgent = req.headers['user-agent'];
	const device = deviceDetector.parse(userAgent);
	 
	console.log(device);
})


module.exports = router;