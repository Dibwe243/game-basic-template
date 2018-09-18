var express = require('express');
var app = express();
var serv = require('http').Server(app);
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const route = require('./routes');
const gameRoute = require('./routes/game');
//const bodyParser = require('body-parser');


let newGame = {		
					player_id:"",
					score:0,
					level:0,

};

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
		secret:'work hard',
		resave:true,
		saveUninitialized: false
}));

app.use(express.static(__dirname +'/client'));




app.use('/',route);
app.use('/game',gameRoute);




var serv= app.listen(process.env.PORT || 4000);
 console.log("Server started.");
 


var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){
	
	console.log('connected');
	socket.on('bombed',function(data){
		
		console.log('bombed');
		console.log(data);

		insert_score(data);
	});
	
	

});

function update_score(data){	
	player_id = data.player_id;
	//Create a game inside the database if this is first the time 
	if(!player_game_exist(player_id)){

		dataObject.games.insert(newGame,{w:1},function(err,result){
			if(err){
				return "Could not create new game "+ err;
			}
		});

	}

	//Update existing game
	let updated_results ={
		score:data.score,
		level:data.level
	}
	dataObject.games.update({user_id:player_id},),updated_results,{w:1},function(err,result){
		if(err){
			return "could not updata game "+err;
		}
	}

}








