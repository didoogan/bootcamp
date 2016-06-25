var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");

// APP CONFIG    
mongoose.connect("mongodb://localhost/blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  text: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Солнце, море, пляж",
//     image: "https://images.unsplash.com/photo-1440668489262-fd445e16aa35?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=6a0f13577cd5656a9e498b41ca3121bc",
//     body: "Хорошо на море летом"
// });

// RESTFULL ROUTS


// INDEX ROUTE
app.get("/", function(req, res) {
    res.redirect("blogs");
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE POST
app.post("/blogs", function(req, res) {
    req.body.blog.text = req.sanitize(req.body.blog.text);
    Blog.create(req.body.blog, function(err, NewPost) {
        if(err) {
            res.redirect("new");
        } else {
            res.redirect("/blogs")
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundPost) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {post: foundPost})
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundPost) {
       if(err) {
           res.render("/blogs")
       } else {
           res.render("edit", {post: foundPost})
       }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
    req.body.post.text = req.sanitize(req.body.post.text);
    Blog.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost) {
       if(err) {
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs/" + req.params.id);
       }
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
   Blog.findByIdAndRemove(req.params.id, function(err) {
       if(err) {
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   }) ;
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("SERVER IS RUNNING...");
});





