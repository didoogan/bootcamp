var mongoose = require("mongoose"),
Comment      = require("./models/comment"),
Campground   = require("./models/campground");

var data = [
    {
        name: "Голубые озера",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQmRGOYh6RqTja75yY2D5EMYxrvNRTq4aYHLTOkYg1KuS_443Z4",
        description: "Хороший отдых на озерах. Чистый лес и прозрачная вода."
    },
    {
        name: "Оскол",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRRv9OsEwQSFMq9SFTjLbz_Y_s55rav_BJbI4h_pTWqzKTkVOs0WQ",
        description: "Здесь можно словит большую рыбу."
    },
    {
        name: "Морской отдых",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYmfYo5mzcixMZPBj4Egv5unLb4gF50Md-eWwj3UQSUfz-71Ky",
        description: "Море, пляж"
    }
];


function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "Все клево, только комары жрут и инета нет",
                            author: "Вася Пупкин"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
