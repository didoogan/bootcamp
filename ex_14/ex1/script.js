var button = document.querySelector("button");
var isOrenge = false;

// button.addEventListener("click", function() {
// 	if(isOrenge) {
// 		document.body.style.backgroundColor = "white";
// 	} else {
// 		document.body.style.background = "orange";
// 	}
// 	isOrenge = !isOrenge;
	
// });

button.addEventListener("click", function() {
	document.body.classList.toggle("orange");
});

