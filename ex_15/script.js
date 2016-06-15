
var countOfSquares = 6;
var pickItem;
var pickColor;
var squaresColors;
var pickColorSpan = document.querySelector("#pickColor");
var indicateSuccess = document.querySelector("#indicateSuccess");
var changeColorBotton = document.querySelector("#setColorButton");
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var modeBtns = document.querySelectorAll(".modeBtn");



initGame();

function initGame() {
	modeButnListener();
	playGame();
}

function modeButnListener() {
	for(var i = 0; i < modeBtns.length; i++) {
	modeBtns[i].addEventListener("click", function() {
	modeBtns[0].classList.remove("selected");
	modeBtns[1].classList.remove("selected");	
	this.classList.add("selected");

	this.textContent === "Просто" ? countOfSquares =3 : countOfSquares = 6;
	changeColors(countOfSquares);
	});
	}	
}


changeColorBotton.addEventListener("click", function() {
	changeColors(countOfSquares);
	// playGame();
});

function playGame() {
	for(var i=0; i<squares.length; i++) {
	squares[i].addEventListener("click", function() {
		if(this.style.background === pickColor) {
			winColors(pickColor);
			h1.style.background = pickColor;
			indicateSuccess.textContent = "Угадал";
		} else {
			this.style.background = "#232323";
			indicateSuccess.textContent = "Попробуй еще";
		}
	});
	}
}




function changeColors(num) {
	indicateSuccess.textContent = "";
	changeColorBotton.textContent = "Играть заново";
	h1.style.background = "steelblue";
	squaresColors = arrayOfRandomColors(num);
	pickColor = squaresColors[randomItem(num)];
	for(var i=0; i<num; i++) {
		// var color = randomColor();
		// squares[i].style.background = color;
		// squaresColors[i] = color;
		// pickColor = squaresColors[randomItem(num)]; 
		squares[i].style.background = squaresColors[i];
	}

	// easy mode
	if(num === 3) {
			squares[3].style.background = "#232323";
			squares[4].style.background = "#232323";
			squares[5].style.background = "#232323";
		}

	pickItem  = randomItem(num);
	pickColor = squaresColors[pickItem];
	pickColorSpan.textContent = pickColor;	
}
// changeColors();


function randomColor() {
	red = Math.floor(Math.random() * 256);
	green = Math.floor(Math.random() * 256);
	blue = Math.floor(Math.random() * 256);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function arrayOfRandomColors(num) {
	var arr = [];
	for(var i = 0; i < num; i++) {
		arr[i] = randomColor();
	}
	return arr;
}

function randomItem(num) {
	return Math.floor(Math.random() * num);
}

function winColors(color) {
	for(var i=0; i<countOfSquares; i++) {
		squares[i].style.background = color;

	}
}







