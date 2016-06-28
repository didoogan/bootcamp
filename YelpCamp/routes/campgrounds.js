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

// middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;