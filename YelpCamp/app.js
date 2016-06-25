var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

seedDB();



app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("index",{campgrounds:allCampgrounds});
       }
    });
});   

app.post("/campgrounds", function(req, res){
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

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

// // SHOW ROUTE
// app.get("/campgrounds/:id", function(req, res) {
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log(foundCamp);
//             res.render("show", {camp: foundCamp});
//         }
//     });
// });

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("show", {camp: foundCampground});
        }
    });
});

//  NEW COMMENT ROUTE
app.get("/campgrounds/:id/comments/new", function(req, res) {
    res.send("New comment page");
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server run...");
});