var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
//=================
// COMMENTS ROUTES
//=================


//  NEW COMMENT ROUTE
router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, camp) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {camp: camp});
        }
    });
});

router.post("/",isLoggedIn, function(req, res) {
   // take Campground by id
   Campground.findById(req.params.id, function(err, camp) {
      if(err) {
          res.redirect("/campgrounds");
      } else {
          // create new comment
          Comment.create(req.body.comment, function(err, comment) {
             if(err) {
                 console.log(err);
             } else {
                // connect new comment to campground
                camp.comments.push(comment);
                camp.save();
                // redirect to campground show page
                res.redirect("/campgrounds/" + camp._id);
             }
          });

      }
   });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;