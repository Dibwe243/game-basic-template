const express = require('express');
const authRouter = express.Router();
const path = require('path');

const accounts = require('../models/accounts');



// login page
authRouter.get('/', (req,res)=>{

	res.render('login');
	
	
});

//Authenticate the user
authRouter.post('/',(req,res)=>{

	/*	
		1. create a session
		2. Load user data within cookies
		3. Load data game within cookies
		4. Load the game interface( redirect the user to the game page )
	*/

	
	if(req.body.username && req.body.password){

		accounts.authenticate(req.body.username,req.body.password,cb );

		function cb(error,user){
			if(error || !user){
				
				res.send('<span>Click <a href="http://localhost:4444/">here</a> to login <br> Wrong email or password</span');
			}else{
				if(typeof(req.session.account) === 'undefined'){

					req.session.account ={};
					req.session.account.user_in = true;
					req.session.account.userId = user._id;
					req.session.account.username = user.username;
					console.log(`session created ${req.session.account.user_in}`);
					res.redirect('/');


			}

				

				
			}
		}

	}else{
			var err = new Error('All fields required.');
			err.status = 400;
			err.msg ='All fields required.';
			res.send(err.msg);
	}
	
	

});



authRouter.get('/register', function(req,res){
	
	res.render('register');

  });

 //register user

 authRouter.post('/register',async function(req,res){

	


  if (req.body.password !== req.body.passwordconfirm) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    //err.msg = 'Password don\'t match'
	res.send("Password don\'t match password: "+req.body.password+" password cof: "+req.body.passwordconfirm);
	return false;
    
  }
    //validate fields

  if (req.body.email && req.body.username && req.body.password && req.body.passwordconfirm) {

    var userData = {
	  email:req.body.email.trim(),
      username:req.body.username.trim(),
      password:req.body.password.trim()
    //   passwordConf: (req.body.passwordconfirm)
    }
}


await accounts.create(userData,function(error,user){
	if(error){
		if(error.code=== 11000){
			res.send("User exist! <br> Please click <a href='http://localhost:4444/'>here</a> to login");

		}
	
	}else{
    
	res.send(`User successfully created here are the details. <br> Please click <a href="http://localhost:4444/">here</a> to login  <br><br> ${user}`);
	}
});


});



//logout user (destroy session)

authRouter.get('/logout',function(req,res){
	if(!req.session){
		res.send(`User already logged out`);
	}
	if(req.session){
		//delete session object
		req.session.destroy(function(err){
			if(err){
				res.send(`could not logout user ${err}` );
			}else{

				//return res.redirect('/');
				res.send(`user sucessfully logged out  `);

			}
		});
	}

});
 

module.exports = authRouter;
