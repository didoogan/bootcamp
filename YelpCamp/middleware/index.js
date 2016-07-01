var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};


middlewareObj.checkCampgroundOwnership = function(req, res, next) {
     if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
           if(err) {
               res.redirect("back");
           } else {
               // does user own campground?
               if(foundCampground.author.id.equals(req.user._id)) {
                   next();
               } else {
                   req.flash("error", "У вас нет прав обладателя");
                   res.redirect("back");
               }
           }
        });
     } else {
         req.flash("error", "Вы должны быть зарегистрированным пользователем");
         res.redirect("back");
     }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
     if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
           if(err) {
               res.redirect("back");
           } else {
               // does user own campground?
               if(foundComment.author.id.equals(req.user._id)) {
                   next();
               } else {
                   req.flash("error", "У вас не достаточно прав пользователя ");
                   res.redirect("back");
               }
           }
        });
     } else {
         res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Вы должны быть зарегистрированным пользователем");
    res.redirect("/login");
};


module.exports = middlewareObj;  