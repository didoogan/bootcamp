var mongoose = require("mongoose"),
Comment      = require("./models/comment"),
Campground   = require("./models/campground");

var data = [
    {
        name: "Голубые озера",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQmRGOYh6RqTja75yY2D5EMYxrvNRTq4aYHLTOkYg1KuS_443Z4",
        description: "Lorem ipsum dolor sit amet, pri an tale convenire, te mel debet tollit expetenda, vim eu phaedrum scribentur appellantur. Mei at denique accommodare vituperatoribus. Mel eu facer menandri, id phaedrum pericula partiendo vel. Voluptatum vituperatoribus vis id, ius ne eirmod propriae constituto. Ne nobis fabellas vis. Zril labores erroribus nam ea.Munere viderer suavitate no eam, facete fabellas dignissim ut eos, an mel dicta semper inimicus. Est facer audiam ut, at vis quod impedit dissentiunt. No putant moderatius suscipiantur usu. Nonumes nusquam mediocrem qui te. Has et facilisis periculis. Eu cum erant placerat dissentias, ea vis prompta comprehensam."
    },
    {
        name: "Оскол",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRRv9OsEwQSFMq9SFTjLbz_Y_s55rav_BJbI4h_pTWqzKTkVOs0WQ",
        description: "Lorem ipsum dolor sit amet, pri an tale convenire, te mel debet tollit expetenda, vim eu phaedrum scribentur appellantur. Mei at denique accommodare vituperatoribus. Mel eu facer menandri, id phaedrum pericula partiendo vel. Voluptatum vituperatoribus vis id, ius ne eirmod propriae constituto. Ne nobis fabellas vis. Zril labores erroribus nam ea.Munere viderer suavitate no eam, facete fabellas dignissim ut eos, an mel dicta semper inimicus. Est facer audiam ut, at vis quod impedit dissentiunt. No putant moderatius suscipiantur usu. Nonumes nusquam mediocrem qui te. Has et facilisis periculis. Eu cum erant placerat dissentias, ea vis prompta comprehensam.ую рыбу."
    },
    {
        name: "Морской отдых",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYmfYo5mzcixMZPBj4Egv5unLb4gF50Md-eWwj3UQSUfz-71Ky",
        description: "Lorem ipsum dolor sit amet, pri an tale convenire, te mel debet tollit expetenda, vim eu phaedrum scribentur appellantur. Mei at denique accommodare vituperatoribus. Mel eu facer menandri, id phaedrum pericula partiendo vel. Voluptatum vituperatoribus vis id, ius ne eirmod propriae constituto. Ne nobis fabellas vis. Zril labores erroribus nam ea.Munere viderer suavitate no eam, facete fabellas dignissim ut eos, an mel dicta semper inimicus. Est facer audiam ut, at vis quod impedit dissentiunt. No putant moderatius suscipiantur usu. Nonumes nusquam mediocrem qui te. Has et facilisis periculis. Eu cum erant placerat dissentias, ea vis prompta comprehensam."
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
