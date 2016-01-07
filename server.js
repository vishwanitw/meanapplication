
var express = require('express');
var app = express();
var users = require('./database/connect.js');
var bodyParser = require('body-parser');


app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get("/usersList",function(req,res){
	users.find({},function(err,users){
		res.json(users);
	})
});

app.post('/usersList',function(req,res){
	var x = req.body;
	var person = new users(x);
	person.save(function(err,person){
	    if(err)
	    	console.log("unsuccessfull");
	    else {
	     	console.log("successfull");
	     	res.json(person);
	    }
	});
});

app.delete("/usersList/:id",function(req,res){
	var id = req.params.id;
	console.log(id);
	users.findByIdAndRemove(id,function(err,users){
		if(err)
		console.log("unsuccessfull");
		else {
			console.log(users);
			res.json(users);
		}
	});
});

app.get("/usersList/:id",function(req,res){
	var id = req.params.id;
	console.log(id);
	users.findOne(id, function(err, users){
		res.json(users);
		console.log(users);
	});
	
});

app.put("/usersList/:id", function(req, res){
	var id = req.params.id;
	console.log('----------');
	console.log(req.body.name);
	console.log(req.body.email);
	console.log(req.body.mobile);

	users.update({
		query : {id: id},
		update : {$set : {name : req.body.name, email : req.body.email, mobile : req.body.mobile}},
		new : true}, function(err, users){
			console.log(">>>>>>>>>>>>>>>>>>>>");
			console.log(users);
				res.json(users)

		});
});


app.listen(3000);
console.log("server running at port no 3000");