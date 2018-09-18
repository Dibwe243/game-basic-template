let mongoose = require('mongoose');

const server = '137.0.0.1:27017';
const database = 'mygame';


mongoose.set('debug', true);

class Database{
	constructor(){
		this._connect();
	}

	_connect(){
		mongoose.connect(`mongodb://localhost/${database}`)
			.then(()=>{
				console.log(`Database connection successfull`)
			})
			.catch(err=>{
				console.error(`Database connection ${error}`)
			})
	}
}

module.exports = new Database();
module.exports.accounts = require('./accounts');


