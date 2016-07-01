var arrMovie = [
	{
		title: "In Brugers",
		rate: 4.5,
		hasWathed: false
	},
	{
		title: "Mad Max Fury Road",
		rate: 5,
		hasWathed: true
	},
	{
		title : "Les Miserables",
		rate: 3.5,
		hasWathed: false
	}

]

arrMovie.forEach(function(element) {
	if(element.hasWathed) {
		console.log("You have wathed " + '"' + element.title + '"' + " -" + element.rate + " stars");
	} else {
		console.log("You have not seen " + '"' + element.title + '"' + " -" + element.rate + " stars");

	}
});