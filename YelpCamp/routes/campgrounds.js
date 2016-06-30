var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


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
router.post("/",isLoggedIn, function(req, res){
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
                console.log("Ново созданный городок");
                console.log(campground);
                res.redirect("/campgrounds");
            }
      });
});

router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});




// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {camp: foundCampground});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit",checkCampgroundOwnership, function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground) {
      res.render("campgrounds/edit", {camp: foundCampground});
   });
});    

// EDIT ROUTER
router.put("/:id", checkCampgroundOwnership, function(req, res) {
   var data = req.body.camp;
   // find and update campgorund
   Campground.findByIdAndUpdate(req.params.id, data, function(err, updatedCamp) {
      if(err) {
          res.redirect("/campgrounds");
      } else {
         // resirect to somewhere
         res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

// DESTROY ROUTER
router.delete("/:id", checkCampgroundOwnership, function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err) {
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
   });
});

// middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
     if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
           if(err) {
               res.redirect("back");
           } else {
               // does user own campground?
               if(foundCampground.author.id.equals(req.user._id)) {
                   next();
               } else {
                   res.redirect("back");
               }
           }
        });
     } else {
         res.redirect("back");
    }
}

module.exports = router;