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

router.post('/login', function(req,res,next){


  var username = req.body.username;
  var password = req.body.password;
 

  db.users.find({user: username, password: password}).toArray(function (err, peeps) {
    if (peeps.length > 0) {
    	req.session.user = peeps[0];
    	db.offers.find({accepted: false}).toArray(function(err, offerList){
    		res.render("listing", {offers: offerList});
    	})
    }
    else{
    	console.log("not valid")
    	res.render("index", {title: "DBShare"});
    }
	});
});

router.get('/transaction', function(req, res) {
	console.log(req.session.user.user);
 	db.offers.find({accepted: true, user: req.session.user.user}).toArray(function(e,offers){
  	res.render('transaction',{offers:offers})
  })
});


router.post('/make', function(req, res) {
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

router.post("/signup", function(req, res, next){

	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var passwordcheck = req.body.passwordcheck;


	
  db.users.find({user: username}).toArray(function (err, peeps) {
    req.session.user = username;
  	//username already in use
    if (peeps.length > 0) { 
      // the user needs to be updated
     res.render("index", {title: "DBSHARE", username: username, message2: "Sorry, that username is already taken!" }); //render index page with notification that the username has already been taken
      }

    else if (password == passwordcheck) { 

      	//Add to users database
        db.users.insert({user: username, password: password, email: email, notifications:[]}, function(err){
          
          db.offers.find({accepted: false}).toArray(function(err,offerList){

          	res.render("listing", {title: "DBSHARE", offers: offerList});
          })
          //Pull user from database
          
      	});
       
      	  
      }

    else{

    	res.render("index", {title: "Closer", username: username, message2: "Your passwords don't match!" }); 

    }

});
});

router.post("/accept", function(req, res, next){

	var user = ""+req.body.button;
	db.offers.update({name: user}, {$set:{accepted: true}}, function(err){
		res.redirect("/listing");
	})

});

module.exports = router;
