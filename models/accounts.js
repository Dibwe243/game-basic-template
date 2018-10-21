let mongoose = require('mongoose');
let validator = require('validator');
const bcrypt = require('bcrypt');

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
});



//authenticate input against database

accountSchema.statics.authenticate = function(email,password,callback){
/*
	1. Authenticate the user

		1. Check if user exist
		2. Check if password is correct

*/

	account.findOne({email:email})
		.exec(function(err,user){
			if(err){
				console.log('there was an error from the query side');

				return callback(err)

			}else if(!user){
				var err = new Error('User not found.');
				console.log('user not found');
				err.status = 401;
				return callback(err)
			}
			bcrypt.compare(password,user.password, function(err,result){
				if(result == true){
					return callback(null,user);

				}else{
					return callback();
				}
			})
		});
}

//hashing a password bafore saving it to the bd
accountSchema.pre('save',function(next){
	var user = this;
	bcrypt.hash(user.password, 10,function(err,hash){
		if(err){
			return next(err);
		}
		user.password=hash;
		next();

	})
});

var account = mongoose.model('accounts',accountSchema);
module.exports = account;
