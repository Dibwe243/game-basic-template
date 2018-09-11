var express = require('express');
var app = express();
var serv = require('http').Server(app);



app.use(express.static('./client'));

app.get('/',function(req, res) {
	res.sendFile(__dirname + './index.html');
});

var serv= app.listen(process.env.PORT || 3000);
console.log("Server started.");

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
	//socket.id = Math.random();
	//SOCKET_LIST[socket.id] = socket;
	console.log('connected');
	socket.on('bombed',function(data){

		console.log(data);

	});
	
	

});//end of socket connection