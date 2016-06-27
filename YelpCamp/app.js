var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
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
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
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
    res.render("campgrounds/new");
});



// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {camp: foundCampground});
        }
    });
});

//=================
// COMMENTS ROUTES
//=================


//  NEW COMMENT ROUTE
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, camp) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {camp: camp});
        }
    });
})

app.post("/campgrounds/:id/comments", function(req, res) {
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

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server run...");
});