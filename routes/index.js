const express = require('express');
const router = express.Router();

const db = require('../models');
const bcrypt = require('bcrypt');











router.get('/',function(req, res) {
	
		

		res.sendFile(__dirname+'/index.html');


});

async function user_exists(email){
	return new Promise(function(resolve,reject){
		db.accounts.findOne({email:email})
			.then(doc=>{
				if(doc.email===email){
					console.log('user exist');
					resolve(true);
				}else{
					console.log('User does not exist');
					reject(false);
				}
			})
			.catch(err=>{
				
				reject(false);
			});
	})
			
}

//route to register user 

router.post('/register', function(req,res){

	// confirm that user typed same password twice


  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
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

//Sign up time

 sign_up_user(userData)
 	.then(data=>{
 		if(data){
			res.send('done!');//Redirect to the game. coming soon( blanc page for now);
 		}
 	})
 	.catch(err=>{
			

			res.redirect('/');//Redirect to signUp pass(failed for some raison)

 	})

 		
		
  	

});



//

async function player_game_exist(user_id){
	let stored_user_id = datasource.games.find({game_user_id:user_id}).toArray();
	if (stored_user_id[0]===user_id){
		return true;
	}else{
		return false;
	}
}


/*let login users 
	1. let check it the user exist 
	2. if the user exist load the user data in the local memory (cookies)
	
*/

async function login_user(user){
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
				return res.redirect('/login.html');
			}
		});


	}else{
		console.log("User does not exist")
		return res.redirect('/login');
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
			
			if(data){
			// user  exist
							
					reject(false);	//false :user wasn't added 	

					}
		})

		.catch(err=>{

		/* 
			user does not exist so we add them
			We first hash the password the add them
		*/
			bcrypt.hash(userData.password,10,function(err,hash){
				if(err){
					console.log("Could not password "+err);
					
				}else{
					
							 userData.password = hash;
							 console.log('Done creating a hash for the password '+userData.passwor);

							// we insert the user
							db.accounts.create(userData) 


				.then(doc=>{
							console.log(`user created ${doc}`);
							value = true;
							resolve(true);//true:user was added 

							
				})
				.catch(err =>{
						   console.error(`could not save ${err}`)
						   reject(false);//false :user wasn't added 
						   
				});
				}
			});
							
			resolve(true);//false :user wasn't added 

		})
	})
}

 
module.exports = router;
