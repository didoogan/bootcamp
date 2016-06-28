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

router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCamp = {name: name, image: image, description: description};
    
    // console.log("name: " + name);
    // console.log("image:" + image);
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

router.get("/new", function(req, res) {
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

module.exports = router;