var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var User = require("./models/user");
var passport = require("passport");
var flash = require("connect-flash");
var LocalStrategy = require("passport-local");
var seedDB = require("./seeds");
var methodOverride = require("method-override");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);
// https://true-chesterfield-86672.herokuapp.com/campgrounds

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());

// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I am a softwaredeveloper",
    resave: false,
    saveUninitialized: false
})); 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

var commentRoutes    = require("./routes/comments.js"),
    campgroundRoutes = require("./routes/campgrounds.js"),
    authRoutes       = require("./routes/index.js");

app.get("/", function(req, res) {
    res.render("landing");
});


app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server run...");
});