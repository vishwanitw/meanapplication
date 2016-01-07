var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/usersList");

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name:{type:String,required:true},
	email:{type:String,required:true,unique:true},
	mobile:{type:Number,required:true}
},{collection:"User"});

var user = mongoose.model('user',userSchema);

module.exports = user;