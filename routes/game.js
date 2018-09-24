var express = require('express');
var routerGame = express.Router();

/*we will always require this middleware before 
where the user supose to be loged in */


//routerGame.use(requiresLogin);
 function requiresLogin(req,res,next){
	if(typeof req.session.account !== "undefined" && req.session.user_in === true){
		res.send(`welcome to your home page :)<br> session: ${JSON.stringify(req.session.account)} <br> user id:  ${req.session.account.userId}`);
		
	}else{
		
		console.log(`you must be logged in to view this page session: ${req.session.account} user id2:  ${req.session.account.userId}`);
		
		res.redirect('/');

	}
}

routerGame.get('/',[requiresLogin],function(req, res) {
	
	//express.static(__dirname +'/client')
	
			res.sendFile(__dirname + './game.html');
		
		
});


module.exports = routerGame;

