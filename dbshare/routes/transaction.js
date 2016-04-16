var express = require('express');
var router = express.Router();
var db = require("../db-setup");

router.get('/', function(req, res) {
 	db.offers.find({accepted: true}).toArray(function(e,offers){
  	res.render('transaction',{offers:offers})
  })
});

module.exports = router;