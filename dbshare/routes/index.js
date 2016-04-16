var express = require('express');
var router = express.Router();
var db = require("../db-setup");

/* GET home page. */
router.get('/', function(req, res, next) {

  	/*db.users.insert({user: "Sooraj", yes: [], no: [], pos: 0}, function(err) {

  			db.users.find({user: "Sooraj"}).toArray(function(err, peeps){
            	
            	var currUser = peeps[0].user;
            	console.log(currUser);
            	res.render("index", {title: currUser});
            });


    });*/
	res.render("index", {title: "DBShare"});
});

module.exports = router;
