const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const url = (process.env.MONGODB_URI) ? process.env.MONGODB_URI : 'mongodb://localhost/users'
const db = mongoose.createConnection(url);
var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		default: ""
	},
	password: {
		type: String,
		default: ""
	},
	
});


UserSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
};

module.exports = db.model("User", UserSchema, "UserData");
