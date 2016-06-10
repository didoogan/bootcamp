console.log("Print all naumbers berween -10 and 19");

var count = -10;
while(count < 20) {
	console.log(count);
	count++;
}

console.log("Print all enen naumbers berween 10 and 40");

var count = 10;
while(count < 41) {
	if(count % 2 == 0) {
		console.log(count);	
	}
	
	count++;
}


console.log("Print all odd naumbers berween 300 and 333");

var count = 300;
while(count < 334) {
	if(count % 2 == 1) {
		console.log(count);	
	}
	
	count++;
}


console.log("Print all  naumbers divisible by 5 AND 3 beetween 5 and 30");

var count = 5;
while(count < 51) {
	if(count % 5 === 0 && count % 3 === 0) {
		console.log(count);	
	}
	
	count++;
}