 const express = require('express');
 const router = express.Router();
// const path = require('path');

const accounts = require('../models/accounts');
// const bcrypt = require('bcrypt');


router.get('/home',function(req, res) {

	if(typeof req.session.account !== "undefined" && req.session.user_in === true){
		//delete session object

	    res.redirect('/game');

	}else{

	    console.log(`you  need to login first`);
		res.redirect('/');	}



});

//check if us is logged inspect

router.get('/isLoggedIn',async function(req,res){
  if(req.session.account){
    res.send({authenticated:true});
  }else{
    res.send({authenticated:false});
  }
});


//user login
router.post('/login', async function(req,res){
/*
	1. Authenticate the user
	2. create a session
	3. Load user data within cookies
	4. Load data game within cookies
	5. Load the game interface( redirect the user to the game page )



*/
console.log('here is the body ', req.body)
	if(req.body.email && req.body.password){
		accounts.authenticate(req.body.email,req.body.password, function(error,user){
			if(error || !user){
				var err = new Error('Wrong email or password.');
        console.log('Wrong email or password.');
				err.status = 401;
        err.msg ='Wrong email or password';
				res.send(err);
			}else{
				//if no error create a session load user data in a cookies
				if(typeof(req.session.account) === 'undefined'){

					req.session.account ={};
					req.session.account.user_in = true;
					req.session.account.userId = user._id;
					console.log(`session created ${req.session.account}`);


				}

				res.send(user);

				//res.send();
			}
		});

	}else{
		var err = new Error('All fields required.');
		err.status = 400;
		res.send(err);
	}
	//res.end();
});



//route to register user

router.post('/register',async function(req,res){

	// confirm that user typed same password twice


  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    err.msg = 'Password don\'t match'
    res.send(err);
    return next(err);
  }
    //validate fields

  if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {

    var userData = {
      email: (req.body.email),
      username: (req.body.username),
      password: (req.body.password),
      passwordConf: (req.body.passwordConf),
    }
}


await accounts.create(userData,function(error,user){
	if(error){
	res.send(error);
	}else{
  user.code =200;
	res.send(user);
	}
});


});



//get logout

router.get('/logout',function(req,res){
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
				res.send(`user sucessfully logged out - existing session ${req.session}`);

			}
		});
	}

});



function game_exist(user_id){
	let stored_user_id = datasource.games.find({game_user_id:user_id}).toArray();
	if (stored_user_id[0]===user_id){
		return true;
	}else{
		return false;
	}
}

async function user_exists(email){
	return new Promise(function(resolve,reject){
		db.accounts.findOne({email:email})
			.then(doc=>{
				if(doc.email===email){
					console.log('user exist');
					resolve(true);
				}else{
					console.log('User does not exist');
					resolve(false);
				}
			})
			.catch(err=>{

				reject(err);
			});
	})

}



 function login_user(user){
 	//check if user is logged in

 	return new Promise((resolve,reject)=>{

 	});
	if(user_exists(user.username)){
		let player = dataObject.accounts.find({username:user.username}).toArray();

		req.session.userId = player[0]._id ;
		req.session.username = player[0].username;
		bcrypt.compare(password,user.password,function(err,result){
			if(result===true && req.session.username=== user.username){
				req.session.password =true;
				return res.redirect('/');
			}else{
				req.session.password = false;
				return res.redirect('/home');
			}
		});


	}else{
		console.log("User does not exist")
		return res.redirect('/home');
	}
}




/* Let create some user accounts

 The following function will:

	1. verify if the user exist using the user_exist() function.
	2. In case the user does not exist the following should happen
		a. Hashing of the password
		b. User to be added to a database
 */

 function sign_up_user(userData){

return new Promise(function(resolve,reject){

user_exists(userData.email)

	.then(data=>{


			let Err = new error(`User exist!`);
			Err.status = 401;

			next(Err);	//false :user wasn't added


	})

	.catch(err=>{

		/*
			user does not exist so we add them
			We first hash the password the add them
		*/
		bcrypt.hash(userData.password,10,async function(err,hash){
				if(err){
					console.log("Could not password "+err);
					console.log("eror status "+err);
					err = new Error('Could not hash password');


				}else{

					userData.password = hash;

						console.log('Done creating a hash for the password '+userData.passwor);

							// we insert the user
							//create user here
					let newAccount = await accounts.create(userData,function(error,user){
						if(!error){
						res.send('success');
						}else{
							res.send(`Oops something went wrong ${err}`)
						}

					})

			 	}
		});



		})
	})
}


module.exports = router;
