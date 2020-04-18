const express = require('express');
const router = express.Router();

router.use( '/user' , require('./user.js') );
router.use( '/item' , require('./item.js') );
router.use( '/skin' , require('./skin.js') );


router.get('/', (req,res)=> {
	res.send('coucou c\'est l\'api =)');
});

module.exports = router;


