let mongoose = require('mongoose');

const server = '137.0.0.1:27017';
const database = 'mygame';


mongoose.set('debug', true);

class Database{
	constructor(){
		this._connect();
	}

	_connect(){
		mongoose.connect(`mongodb://localhost/${database}`,{ useNewUrlParser: true })
			.then(()=>{
				console.log(`Database connection successfull`)
			})
			.catch(error=>{
				console.error(`Oop could not connect ${error}`)
			})
	}
}

module.exports = new Database();
//module.exports.accounts = require('./accounts');


