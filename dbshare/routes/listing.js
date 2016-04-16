var express = require('express');
var router = express.Router();
var db = require("../db-setup");

router.get('/', function(req, res) {
  res.render('listing');
});

router.post('/', function(req, res) {
 	console.log(req.body.name);
 	db.offers.insert({user: req.body.name}, function(err) {
		res.redirect('/make');
	});
});

module.exports = router;