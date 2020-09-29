var express    = require("express");
var router     = express.Router();
var passport   = require("passport");
var User       = require("../models/user");


//Landing page route
router.get("/", function(req, res){
    res.render("landing");
});

// ****AUTHENTICATION ROUTES****

// show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});


// Show login form
router.get("/login", function(req, res){
    res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome back!'
    }), function(req, res){
});


//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You are successfully logged out of your account");
    res.redirect("/campgrounds");
});


module.exports = router;