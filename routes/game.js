var express = require('express');
var routerGame = express.Router();

/*we will always require this middleware before 
where the user supose to be loged in */

const requiresLogin = function (req,res,next){
	if(req.session && req.session.userId){
		console.log('User already logged in');
		next();
	}else{
		
		console.log('you must be logged in to view this page');
		
		res.redirect('/');
		//next();

		
		

	}
}
routerGame.use(requiresLogin);
routerGame.get('/',requiresLogin,function(req, res) {
	
	console.log("console status"+ req.requiresLogin.err.status);
		
		if(!req.requiresLogin.err.status===401){
		
			res.sendFile(__dirname + './game.html');
		
		}else{
			
			console.log(__dirname +'./login.html');

			res.redirect(__dirname +'./login.html');
			
		}
});

//get logout

routerGame.get('/logout',function(req,res){
	if(req.session){
		//delete session object
		req.session.destroy(function(err){
			if(err){
				return next(err);
			}else{

				return res.redirect('/');
			}
		});
	}
});
module.exports = routerGame;

