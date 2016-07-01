var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

// ===========
// AUTH ROUTES
// ===========

// show register form
router.get("/register", function(req, res) {
   res.render("register"); 
});

// handlig sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Добро пожаловать, " + user.username);    
           res.redirect("/campgrounds"); 
        });
    });
});

// show login form
router.get("/login", function(req, res) {
   res.render("login", {message: req.flash("error")}); 
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
       successRedirect: "/campgrounds",
       failureRedirect: "/login"
    }), function(req, res) {
});

// logout
router.get("/logout", function(req, res) {
   req.logout(); 
   req.flash("success", "Вы произвели выход из системы учета пользователей");
   res.redirect("/campgrounds");
});

module.exports = router;