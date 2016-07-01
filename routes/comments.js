var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//=================
// COMMENTS ROUTES
//=================


//  NEW COMMENT ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, camp) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {camp: camp});
        }
    });
});

// CREATE COMMENT
router.post("/", middleware.isLoggedIn, function(req, res) {
   // take Campground by id
   Campground.findById(req.params.id, function(err, camp) {
      if(err) {
          req.flash("error", "Что-то пошло не так");
          res.redirect("/campgrounds");
      } else {
          // create new comment
          Comment.create(req.body.comment, function(err, comment) {
             if(err) {
                 req.flash("error", "Что-то пошло не так");
                 console.log(err);
             } else {
                // add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                // save comment
                comment.save();
                // connect new comment to campground
                camp.comments.push(comment);
                camp.save();
                // redirect to campground show page
                req.flash("success", "Комментарий успешно добавлен");
                res.redirect("/campgrounds/" + camp._id);
             }
          });

      }
   });
});

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {camp_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE ROUTE
router.put("/:comment_id", function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
       if(err) {
           req.flash("error", "Что-то пошло не так");
           res.redirect("back");
       } else {
           req.flash("success", "Комментарий изменен");
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROU ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            req.flash("error", "Что-то пошло не так");
            res.redirect("back");
        } else {
            req.flash("success", "Комментарий удален");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;