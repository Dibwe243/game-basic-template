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

router.delete('/',(req,res)=>{
	account.remove({_id:req.params.account_id})
	.then(()=>{
		res.json({message: 'Account deleted'});
	})
	.catch((err)=>{
		res.send(`Oop could not delete the account ${err}`);
	});
});



module.exports = router;
