var express = require("express");
var app = express();



app.get('/', function (req, res) {
    res.send("Hi there, welcome to my assignment!");
});

// app.get('/speak/pig', function (req, res) {
//     res.send("The pig say 'Oink'");
// });

// app.get('/speak/cow', function (req, res) {
//     res.send("The cow say 'Muuu'");
// });

app.get("/speak/:animal", function (req, res) {
    var animal = req.params.animal;
    if(animal === "pig") {
        res.send("The pig say 'Oink'");
    }
    if(animal === "cow") {
        res.send("The cow say 'Muuu'");
    }
    if(animal === "dog") {
        res.send("The dog say 'Woof - woof'");
    }
    
});

app.get("/:word/:num", function(req, res) {
    var word = req.params.word;
    var num = Number(req.params.num);
    var result = "";
    
    if(word === "hello" || word === "blah") {
        for(var i = 0; i < num; i++) {
            result += word + " ";
        }
        res.send(result);
    }
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found.... What are you doing whith your life?");
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Run the server on port 3000...");
});   