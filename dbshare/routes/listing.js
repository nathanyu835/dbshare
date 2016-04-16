var express = require('express');
var router = express.Router();
var db = require("../db-setup");

router.get('/', function(req, res) {
  db.offers.find().toArray(function(e,offers){
  	res.render('listing',{offers:offers})
  })
});

module.exports = router;