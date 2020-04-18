const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
var mysql = require('mysql');

/////////////////////////////////////////////=>
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
//////////////////////////////////////////////=>

router.get('/', (req,res) => {
	res.send('skin !! ')
});

router.get('/get_all', (req,res)=>{
    let sql = `SELECT * from skin`;

    connection.query( sql, function(error, results, fields) {    
        if (error) throw error;
        console.log( results );
        res.json( results );
    });

})

//params [token : string]
//return an array with owned skin id by the user 
router.get('/get_userOwned?', (req,res)=>{
	let params = req.query, token;
	if ( ! params.token ) res.send( false );else token = params.token;

    let reqUid = `SELECT player_id from player_token WHERE token ='${ token }'`;

    let uid = new Promise( (resolve, reject)=>{
        connection.query( reqUid, function(error, results, fields) {    
            if (error) throw error;
            resolve( results );
        });
    })

    uid.then(( id )=>{
        let reqOwnedSkin = `SELECT skin_id from player_skin WHERE player_id = '${id[0].player_id}'`;
        connection.query( reqOwnedSkin, function(error, results, fields) {    
            if (error) throw error;
            let output = [];
            for (const ind in results) {
                for(const val in results[ind] ){
                    output.push( results[ind][val] );
                }
            }
            res.json( output );
        });        
    })

})

//params [skin : {id/price/etc}, token : string ]

router.post('/ask_skinPurchase', (req,res)=>{ /*POST REQ HERE DONT FORGET TO TOGGLE */

    let token = req.body.token,
        skin = req.body.skin;


    get_uid( token )
    .then((val)=>{
        return isUserGoldEnough( val );
    })
    .then((val)=>{
        return purchase_skin( val );
    })
    .then( val => {
        return update_gold( val )
    })
    .then( val => {
        res.json( val )
    })    
    .catch((val)=>{
        console.log(val)
        res.json(false)
    })

    // Promise.all([promise1, promise2, promise3]).then(function(values) {
    //     console.log(values);
    // });

    //functions for promises chaining 
    function get_uid( token ){
        return new Promise( (resolve, reject)=>{
            let reqUid = `SELECT player_id from player_token WHERE token ='${ token }'`;
            connection.query( reqUid, function(error, results, fields) {    
                if (error) throw error;
                console.log('first floor => ', token )
                resolve( results );
            });
        })    
    }
    
    function isUserGoldEnough( id ){
        return new Promise( (resolve, reject)=>{
            id = id[0].player_id;
            let sql = `SELECT gold FROM player WHERE id='${id}'`;
            connection.query( sql, function(error, results, fields) {   
                console.log('second floor => ', id ) 
                if (error) throw error;

                if( results[0].gold >= skin.price ) 
                    resolve( {id : id, gold : results[0].gold } );
                else 
                    reject( false );
            });
        })        
    }

    function purchase_skin( info ){
        return new Promise( (resolve,reject)=>{
            let sql = `INSERT INTO player_skin (player_id, skin_id ) VALUES ('${info.id}', '${ skin.id }');`;
            connection.query( sql, function(error, results, fields) {   
                console.log('third floor => ', info ) 
                if (error) throw error;
                resolve(  info );
            });
        })
    }

    function update_gold( info ){
        return new Promise((resolve,reject)=>{
            let newGold = info.gold - skin.price;
            let sql = `UPDATE player SET gold ='${ newGold }' WHERE  id='${ info.id }';`;
            connection.query( sql, function(error, results, fields) {   
                console.log('last floor => ', true ) 
                resolve( true );
            });
        })
    }
})


module.exports = router;