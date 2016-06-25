function isEven(num) {
	if(num % 2 == 0) {
		return true;
	}
	return false;
}
 
console.log(isEven(5));
console.log(isEven(144));


function factorial(num) {
	var factorial = num;
	i = num - 1;
	// for(i=num - 1; i > 0; i--){
	// 	factorial *= i;
	// }
	while(i > 0) {
		factorial *= i;
		i--;
	}
	return factorial;
}

console.log(factorial(5));

function replaceChar(string) {
	return string.replace('-', '_');
}

console.log(replaceChar("hi-snake"));