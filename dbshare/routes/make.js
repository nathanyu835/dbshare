var express = require('express');
var router = express.Router();
var db = require("../db-setup");

router.post('/', function(req, res) {
 	console.log(req.body.name);
 	db.offers.insert({user: req.body.name}, function(err) {
		res.redirect('/listing');
	});
});

module.exports = router;