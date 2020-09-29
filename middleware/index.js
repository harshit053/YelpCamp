var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

// All middlewares go here

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    //is the user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Something went wrong. Please try again later");
            res.redirect("back");
        } else {
            //does this user own the campground
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You do not have permission to do that!!");
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    //is the user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Something went wrong. Please try again later");
            res.redirect("back");
        } else {
            //does this user own the comment
            if(foundComment.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You do not have permission to do that!!");
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}


module.exports = middlewareObj;