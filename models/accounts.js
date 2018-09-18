let mongoose = require('mongoose');
let validator = require('validator');

let accountSchema = new mongoose.Schema({
	username:{
				type:String,
				required:true,
				unique:true
				
			},

	email: {
				type:String,
				required:true,
				unique:true
				
			},
	password:{

				type:String,
				required:true
			}
})

module.exports = mongoose.model('accounts',accountSchema)