const mongoose = require('mongoose');
const url = (process.env.MONGODB_URI) ? process.env.MONGODB_URI : 'mongodb://localhost/users'
const db = mongoose.createConnection(url);
var PostSchema = new mongoose.Schema({
	title:
	{
		type:String,
		default:""

	},
	text_box_input: {
		type: String,
		default: ""
	},
	content: {
		type: Array,
		default: []
    },
    user:{
        type:String,
        default:'Guest'
	},
	url:
	{
		type:String,
		default:''
	}
});



module.exports = db.model("Post", PostSchema, "UserData");
