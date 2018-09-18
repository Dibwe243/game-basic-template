const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');


const url = 'mongodb://localhost:27017/mygame';
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
	  
  if(!err){
  	console.log("connected to data base")
  	module.exports  = {
  				  db:db,
  				  accounts:db.collection('accounts'),
  				  games:db.collection('games')
  				  }
  	

  }
  else
  {
  	
  	return err;

  }
			 
});




