const express = require('express');
const router = express.Router();
const path = require('path');

const accounts = require('../models/accounts');

router.get('/',function(req,res){
	accounts.find()
		.then(data=>{
			res.send(data);
		})
		.catch(err=>{
			res.send(err);
		})
});

module.exports = router;
