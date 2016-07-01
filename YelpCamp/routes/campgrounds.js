var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});   

// CREATE ROUTE
// add new camp to db
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name: name, image: image, description: description, author: author};
    Campground.create(newCamp, function(err, campground){
            if(err) {
                console.log(err);
            } else {
                req.flash("success", "Вы успешно создали новое место отдыха");
                res.redirect("/campgrounds");
            }
      });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    // req.flash("error", "Вы- незарегистрированный пользователь");
    res.render("campgrounds/new");
});




// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            // req.flash("error", "Неправильный id пользователя");
            res.redirect("campgrounds")
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {camp: foundCampground});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground) {
      res.render("campgrounds/edit", {camp: foundCampground});
   });
});    

// EDIT ROUTER
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
   var data = req.body.camp;
   // find and update campground
   Campground.findByIdAndUpdate(req.params.id, data, function(err, updatedCamp) {
      if(err) {
          res.redirect("/campgrounds");
      } else {
         // redirect to somewhere
         req.flash("success", "Место отдыха изменено ");
         res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

// DESTROY ROUTER
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err) {
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           req.flash("success", "Место отдыха удалено ");
           res.redirect("/campgrounds");
       }
   });
});


module.exports = router;