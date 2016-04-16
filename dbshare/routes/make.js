var express = require('express');
var router = express.Router();
var db = require("../db-setup");

router.get('/', function(req, res) {
  res.render('offer');
});

router.post('/', function(req, res) {
 	console.log(req.body.name);
 	db.offers.insert({user: req.body.name}, function(err) {
		res.redirect('/listing');
	});
});

module.exports = router;