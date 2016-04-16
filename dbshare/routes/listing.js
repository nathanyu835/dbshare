var express = require('express');
var router = express.Router();
var db = require("../db-setup");

router.get('/', function(req, res) {
  db.offers.find({accepted: false}).toArray(function(e,offers){
  	res.render('listing',{offers:offers})
  })
});

router.post('/', function(req, res) {
 	console.log(req.body.name);
 	console.log(req.body.location);
 	db.offers.insert({
 		name: req.body.name, 
 		user: req.session.user.user,
 		location: req.body.location,
 		meal: req.body.meal,
 		price: req.body.price,
 		accepted: false
 	}, function(err) {
		res.redirect('/listing');
	});
});

module.exports = router;