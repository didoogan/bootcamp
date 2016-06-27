var express               = require("express"),
    app                   = express(),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user"),    
    mongoose              = require("mongoose");

mongoose.connect("mongodb://localhost/auth_demo");



app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

app.use(require("express-session") ({
    secret: "I am sofrware developer",
    resave: false,
    saveUninitialized: false
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res) {
   res.render("home"); 
});

app.get("/secret", function(req, res) {
   res.render("secret"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server is running..."); 
});