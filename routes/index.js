 const express = require('express');
 const router = express.Router();
// const path = require('path');

const accounts = require('../models/accounts');


router.get('/',function(req, res) {

	if( typeof req.session !== "undefined" ){//is user login?
		
		res.render('index',{username:req.session.account.username});

	 }else{// otherwise redirect them to the login page

		
		res.redirect('/auth');
		
	}
	
});



module.exports = router;
